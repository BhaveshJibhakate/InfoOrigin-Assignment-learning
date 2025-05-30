import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Button } from "react-bootstrap";

const theme = {
    primaryColor: 'aqua',
    secondaryColor: 'green',
    fontSize: '16px',
    buttonPadding: '10px 20px',
  };


  const StyledWrapper=styled.div`
   background-color:${(props)=>props.theme.primaryColor};
   padding:15px;
   height:300px;
   width:300px; 
  `

  const StyledButton=styled(Button)`
  background-color:${(props)=>props.theme.secondaryColor}
  `

  const MyComponent=()=>{
    return (
        <>
        <ThemeProvider theme={theme}>
        <StyledWrapper>
          <div>Some text inside the styledwrapper</div>
        <StyledButton>Click me</StyledButton>
        </StyledWrapper>
        </ThemeProvider>
        </>
    );
  }

  export default MyComponent;