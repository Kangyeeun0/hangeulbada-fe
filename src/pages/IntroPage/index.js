import React from 'react';
import styled from 'styled-components';
import SignUp from './SignUp';

const IntroPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    align-items: center;
`;
const IntroInputBox = styled.div`
    margin: 70%;
    height: 300px;
    width: 100%;
    // background-color: red;
`;

const IntroPage = () => {
    return (
        <IntroPageLayout>
            <IntroInputBox>
                <SignUp />
            </IntroInputBox>
        </IntroPageLayout>
    );
};

export default IntroPage;
