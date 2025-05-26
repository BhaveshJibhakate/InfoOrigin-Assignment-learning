
const express = require('express');
const bodyParser = require('body-parser');
const mappingRoutes = require('./routes/mapping');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

app.use('/', mappingRoutes);

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
