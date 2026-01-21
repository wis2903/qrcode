import styled from 'styled-components';

import { useAppContext } from '../../../../../context';
import { TextboxComponent } from '../../../../../core/component/textbox';
import { SearchIconOutline } from '../../../../../core/foundation/icon/outline/search';

const StyledMainContentOrderListSearchContainer = styled.div`
    width: 60%;

    .panda-textbox-component {
        padding: 0 10px;
    }
`;

export const MainContentOrderListSearch = (): JSX.Element => {
    const appCtx = useAppContext();

    return (
        <StyledMainContentOrderListSearchContainer>
            <TextboxComponent
                clearable
                width="100%"
                placeholder="Enter PO number to search"
                value={appCtx.state.orders.filters.search}
                prefix={<SearchIconOutline width={22} height={22} />}
                onChange={(e): void => {
                    appCtx.setState((current) => {
                        const _cloned = { ...current };
                        _cloned.orders.filters.search = e.target.value;
                        return _cloned;
                    });
                }}
            />
        </StyledMainContentOrderListSearchContainer>
    );
};
