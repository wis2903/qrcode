import styled from 'styled-components';

import { FlexboxComponent } from '../../core/component/flexbox';
import { ButtonComponent } from '../../core/component/button';

export const StyledScannerContainer = styled(FlexboxComponent)`
    border-radius: 8px;
    overflow: hidden;

    .scanner {
        svg {
            path {
                stroke: white;
            }
        }
    }
`;

export const StyledCloseButton = styled(ButtonComponent)`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    z-index: 1;
    background-color: white;
    padding: 8px;
`;
