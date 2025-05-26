const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get('/requirement-titles', async (req, res) => {
  try {
    const rows = await db('REQUIREMENT_TITLE').select('*');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching requirement titles:', err);
    res.status(500).json({ error: 'Error fetching data from the database' });
  }
});

// put request
router.put('/requirement-title/:id', async (req, res) => {
  const { id } = req.params;
  const { levelCount } = req.body;
  try {
    const updated = await db('REQUIREMENT_TITLE')
      .where({ REQUIREMENT_TITLE_ID: id })
      .update({ REQUIREMENT_TITLE_LEVEL_COUNT: levelCount });

    if (updated === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: ' Updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

////////////////////////////////////////////////////////////////////////////

router.post('/backfill-requirement-title', async (req, res) => {
  try {

    const {associationType, performedBy}=req.body
  
    const rowsToUpdate = await db('TEST_CASE_REQUIREMENT as tcr')
      .join('REQUIREMENT as r', 'tcr.REQUIREMENT_UUID', 'r.REQUIREMENT_UUID')
      .select(
        'tcr.TEST_CASE_REQUIREMENT_UUID',
        'tcr.REQUIREMENT_UUID',
        'r.REQUIREMENT_ASSOCIATION_UUID'
      )
      .whereNull('tcr.REQUIREMENT_TITLE_UUID')
      .andWhere('r.REQUIREMENT_ASSOCIATION_TYPE', associationType);

    if (rowsToUpdate.length === 0) {
      return res.status(200).json({ message: 'No rows need updating.' });
    }

    await db.raw(`
      UPDATE TEST_CASE_REQUIREMENT tcr
      JOIN REQUIREMENT r
        ON tcr.REQUIREMENT_UUID = r.REQUIREMENT_UUID
      SET tcr.REQUIREMENT_TITLE_UUID = r.REQUIREMENT_ASSOCIATION_UUID
      WHERE tcr.REQUIREMENT_TITLE_UUID IS NULL
        AND r.REQUIREMENT_ASSOCIATION_TYPE = ?
    `,[associationType]);
     
	  const auditRows = rowsToUpdate.map(row => ({
      // ...row,
      TEST_CASE_REQUIREMENT_UUID:row.TEST_CASE_REQUIREMENT_UUID,
      REQUIREMENT_UUID:row.REQUIREMENT_UUID,
      REQUIREMENT_TITLE_UUID: row.REQUIREMENT_ASSOCIATION_UUID,
      AE_AUDIT_UUID: uuidv4(),
      AE_TRANSACTION_ID: uuidv4(),
      AE_TIMESTAMP: new Date(),
      AE_OPERATION_TYPE: 'UPDATE',
      OPERATION_PERFORMED_BY:performedBy,
      AE_INSERT_ID: performedBy,
      AE_INSERT_TS: new Date(),
      AE_UPDATE_ID: null,
      AE_UPDATE_TS: null,
      AE_OLD_NEW_COMPARISION_DETAILS: JSON.stringify({
        old: { REQUIREMENT_TITLE_UUID: null },
        new: { REQUIREMENT_TITLE_UUID: row.REQUIREMENT_ASSOCIATION_UUID }
      }),
      TENANT_ID: null
    }));

    await db
      .withSchema('audit_test_schema') 
      .insert(auditRows)
      .into('TEST_CASE_REQUIREMENT_AUDIT');
	 
    return res.status(200).json({
      message: `Backfill complete. Updated ${rowsToUpdate.length} row(s).`
    });

  } catch (err) {
    console.error('Error during backfill:', err);
    res.status(500).json({ error: 'Failed to backfill requirement title.'});
  }
});

module.exports = router;




////////////////////////////////////////////////////////////////////////////////////////


router.post('/backfill-test-set', async (req, res) => {
  try {
    const rows = await db('REQUIREMENT_TITLE as rt')
      .leftJoin('TEST_SET as ts', 'rt.REQUIREMENT_TITLE_UUID', 'ts.FEATURE_UUID')
      .select('rt.REQUIREMENT_TITLE_UUID', 'rt.FUNCTIONAL_AREA_UUID', 'REQUIREMENT_TITLE' ,'rt.AE_INSERT_ID','rt.AE_UPDATE_ID')
      .whereNull('ts.FEATURE_UUID');

    if (rows.length === 0) {
      return res.status(200).json({ message: 'No feature requirements need test sets.' });
    }

    const result = await db('SEQUENCE')
      .select('MAX_TABLE_SEQ_ID')
      .where('TABLE_NAME', 'TEST_SET');

    let maxSeqId = result.length > 0 ? result[0].MAX_TABLE_SEQ_ID : 0;

    // const AE_INSERT_ID = 'ee600bf3-4f9d-463b-a63f-f279748679a6';
   
    const insert_test_set = rows.map((row, index) => ({
      TEST_SET_UUID: uuidv4(),
      TEST_SET_ID: maxSeqId+index+1,
      TEST_SET_NAME: row.REQUIREMENT_TITLE,
      TEST_SET_TYPE: "Feature",
      AE_INSERT_ID: row["AE_UPDATE_ID"] ? row["AE_UPDATE_ID"] : row["AE_INSERT_ID"],
      AE_INSERT_TS: new Date(),
      AE_TRANSACTION_ID: uuidv4(),
      FUNCTIONAL_AREA_UUID: row.FUNCTIONAL_AREA_UUID,
      FEATURE_UUID: row.REQUIREMENT_TITLE_UUID,
    }));

    await db('TEST_SET').insert(insert_test_set);

    const newMaxSeqId = maxSeqId + rows.length;
    await db('SEQUENCE')
      .where('TABLE_NAME', 'TEST_SET')
      .update({ MAX_TABLE_SEQ_ID: newMaxSeqId });

   
    //// from this place

    const auditobject=insert_test_set.map(item=>{
      
      const auditDetails = Object.keys(item).reduce((acc, key) => {
        acc[key] = {
          oldValue: null,
          newValue: item[key],
        };
        return acc;
      }, {});

      return {
        ...item,
        AE_AUDIT_UUID: uuidv4(),
        OPERATION_PERFORMED_BY: item.AE_INSERT_ID,
        AE_OLD_NEW_COMPARISION_DETAILS: JSON.stringify({
          ...auditDetails,
          APPLICATION_SOURCE_TYPE: { newValue: "STANDALONE", oldValue: null },
          CONFIG_RELEASE_NAME: { newValue: "infoapps", oldValue: null },
          isRowlocked: false,
        }),
        AE_OPERATION_TYPE: "Insert",
        AE_TIMESTAMP: new Date(),
      };
    })

    await db.withSchema('audit_test_schema').insert(auditobject).into('TEST_SET_AUDIT');
     

    res.status(200).json({
      message: `Inserted ${rows.length} new TEST_SET records, updated sequence and audit table updated.`,
    });

  } catch (err) {
    console.error('Error in backfill-test-set:', err);
    res.status(500).json({
      message: 'Failed to backfill test sets',
      error: err.message || err,
    });
  }
});

