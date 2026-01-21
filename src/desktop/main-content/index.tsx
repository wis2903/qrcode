import styled from 'styled-components';

import { MainContentBody } from './body';
import { MainContentHeader } from './header';

const StyledMainContentContainer = styled.div`
    height: 100%;
    width: calc(100% - 260px - 20px);
    min-width: 640px;
    max-width: 840px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border: 2px solid #ffffff;
    background-color: #f2f2f2;
`;

export const MainContent = (): JSX.Element => {
    return (
        <StyledMainContentContainer>
            <MainContentHeader />
            <MainContentBody />
        </StyledMainContentContainer>
    );
};
