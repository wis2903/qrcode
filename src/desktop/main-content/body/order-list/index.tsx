import styled from 'styled-components';

import { MainContentOrderListFilter } from './filter';
import { MainContentOrderListTable } from './table';

const StyledMainContentOrderList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
`;

export const MainContentOrderList = (): JSX.Element => {
    return (
        <StyledMainContentOrderList>
            <MainContentOrderListFilter />
            <MainContentOrderListTable />
        </StyledMainContentOrderList>
    );
};
