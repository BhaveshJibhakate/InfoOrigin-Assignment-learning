import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";



const StyledWrapper = styled.div`
height:300px;
width:400px;
background-color:red;
`

const StyledButton = styled(Button)`

`

const Home = () => {
    return (
        <>
            <StyledWrapper>
                <label>Enter the value inside input field</label>
                <input type="text" />
                <Button variant="primary"> This is Bootstraped button</Button>
                <StyledButton variant="primary"> This is Bootstraped button</StyledButton>

            </StyledWrapper>
        </>);



}

export default Home;