import React from "react";

const Divcheck = () => {

    return (
        <>
            <div 
            role="presentation"
            onClick={() => {
                console.log("you have clikced on div tag of Divcheck  ok");
            }}><a href="https://www.npmjs.com/package/styled-components">BhaveshJibhakate</a></div>
        </>
    );
}

export default Divcheck;