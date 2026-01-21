import styled from 'styled-components';

import { MainContentHeaderAccount } from './account';
import { MainContentHeaderAppName } from './app-name';

const StyledMainContentHeader = styled.div`
    background: #ffffff;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    height: 48px;
    padding: 0 20px;
`;

export const MainContentHeader = (): JSX.Element => {
    return (
        <StyledMainContentHeader>
            <MainContentHeaderAppName />
            <MainContentHeaderAccount />
        </StyledMainContentHeader>
    );
};
