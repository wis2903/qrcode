import styled from 'styled-components';

import { useHandleOrdersListEvents } from '../../_handler/orders';
import { MainContentOrderList } from './order-list';
import { MainContentPageTitle } from './page-title';

const StyleMainContentBody = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
`;

export const MainContentBody = (): JSX.Element => {
    useHandleOrdersListEvents();

    return (
        <StyleMainContentBody>
            <MainContentPageTitle />
            <MainContentOrderList />
        </StyleMainContentBody>
    );
};
