import styled from 'styled-components';

import { FlexboxComponent } from '../../core/component/flexbox';
import { token } from '../../core/foundation/token';

export const StyledSignInButtonContainer = styled(FlexboxComponent)`
    height: 44px;
    margin: 0 0 0 40px;

    &::before {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        height: 12px;
        background-color: ${token.get<string>('global.color.primary')};
        transform: rotate(60deg);
        transform-origin: 0 0;
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 1px;
        height: 12px;
        background-color: ${token.get<string>('global.color.primary')};
        transform: rotate(60deg);
        transform-origin: 100% 100%;
    }
`;

export const StyledSignInButtonDecoration = styled(FlexboxComponent)`
    border: solid ${token.get<string>('global.color.primary')};
    border-width: 1px 0;
    position: absolute;
    width: 240px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    clip-path: polygon(50% 0%, 100% 0%, 50% 100%, 0% 100%);
`;
