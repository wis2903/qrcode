import styled from 'styled-components';

import { MainContentOrderListFilterAttribute } from './attribute';
import { MainContentOrderListSearch } from './search';
import { DividerComponent } from '../../../../../mobile/core/component/divider';

const StyledMainContentOrderListFilter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    gap: 12px;
`;

export const MainContentOrderListFilter = (): JSX.Element => {
    return (
        <StyledMainContentOrderListFilter>
            <MainContentOrderListSearch />
            <DividerComponent vertical height="20px" margin="0" />
            <MainContentOrderListFilterAttribute />
        </StyledMainContentOrderListFilter>
    );
};
