import React, { useState } from "react";
import Child1 from "./Child1";
// import Child2 from "./Child2";

const Parent=()=>{

   const [count, setCount]=useState(0)
   const handleclick=()=>{
    setCount((prevstate)=>prevstate+1)
   }

   const anotherhandler=()=>{
    setCount(count+1);
   }

     return(<>
     <h1>value of count is {count}</h1>
     <h3>header from parent 1</h3>
     <Child1 passedfunction={handleclick}/>
     <button onClick={anotherhandler}>another click me</button>
     </>)
}

export default Parent;