import React from "react";

const Child1=({passedfunction})=>{
  

    return (<>

    <button onClick={passedfunction}>click me</button>
    <h2>child componnet header</h2>
    </>)
}


export default Child1