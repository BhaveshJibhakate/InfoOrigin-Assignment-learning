import React, { useEffect, useState } from "react";

export const EffectDemo=()=>{
     const [data,setData]=useState(null)

     useEffect(()=>{
       setTimeout(()=>{
         setData("this is the new fetched data")
       },4000)
     },[])

     return (
         <>
             <div>
                <h4>This is for the testing of useEffect</h4>
                {data ? <div style={{backgroundColor:"aqua"}}>{data}</div>: <p style={{backgroundColor:"red"}}>...Loading</p>}
             </div>
         </>
     );

}