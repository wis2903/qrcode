import styled from 'styled-components';

import { scrollbar } from '../../shared/styled';
import { FlexboxComponent } from '../flexbox';

export const StyledScrollAreaComponentContainer = styled(FlexboxComponent)<{
    $alwaysDisplayScrollbarPlaceholder?: boolean;
}>`
    position: relative;
    overflow-x: ${(props): string =>
        props.$alwaysDisplayScrollbarPlaceholder ? 'scroll' : 'auto'};
    overflow-y: ${(props): string =>
        props.$alwaysDisplayScrollbarPlaceholder ? 'scroll' : 'auto'};
    ${scrollbar}
`;
