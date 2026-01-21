import styled, { keyframes } from 'styled-components';

import { token } from '../../foundation/token';
import { StyledDialogComponentCloseButton } from '../dialog/styled';
import { ScrollableFloatComponent } from '../scrollable-float';

const slideIn = keyframes`
    0%{ transform: translateX(100%); }
    100% { transform: translateX(0); }
`;

export const StyledDrawerComponentContent = styled(ScrollableFloatComponent)<{ $width?: string }>`
    width: ${(props): string => props.$width || '320px'};
    height: 100vh;
    position: fixed;
    flex-direction: column;
    top: 0;
    right: 0;
    background: white;
    z-index: 99992;
    padding: ${token.get<string>('global.space.l')};
    animation: ${slideIn} cubic-bezier(0.42, 0, 0.58, 1) 0.2s;
`;

export const StyledDrawerComponentCloseButton = styled(StyledDialogComponentCloseButton)`
    cursor: pointer;
    top: ${token.get<string>('global.space.s')};
    right: 22px;
`;

export const StyledDrawerComponentContainer = styled.div<{ $open?: boolean; $popup?: boolean }>`
    display: ${(props): string => (props.$open ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;

    ${(props): string => {
        if (!props.$popup) return '';
        return `
            ${StyledDrawerComponentContent}{
                top: ${token.get<string>('global.space.xxxxl')};
                left: 50%;
                transform: translateX(-50%);
                height: auto;
                maxHeight: calc(100vh - ${token.get<string>('global.space.xxxxl')} * 2);
                animation: none;
            }
        `;
    }}
`;
