import styled, { keyframes } from 'styled-components';

import { StyledDialogComponentCloseButton } from '../dialog/styled';
import { ScrollAreaComponent } from '../scrollarea';
import { token } from '../../foundation/token';

const slideIn = keyframes`
    0%{ transform: translateX(100%); }
    100% { transform: translateX(0); }
`;

export const StyledDrawerComponentContainer = styled.div<{ $open?: boolean }>`
    display: ${(props): string => (props.$open ? 'block' : 'none')};
`;

export const StyledDrawerComponentContent = styled(ScrollAreaComponent)<{ $width?: string }>`
    width: ${(props): string => props.$width || '320px'};
    height: 100vh;
    position: fixed;
    flex-direction: column;
    top: 0;
    right: 0;
    background: white;
    z-index: 99992;
    padding: ${token.get<string>('global.space.m')};
    animation: ${slideIn} linear 0.1s;
`;

export const StyledDrawerComponentCloseButton = styled(StyledDialogComponentCloseButton)`
    cursor: pointer;
    top: ${token.get<string>('global.space.xs')};
    right: ${token.get<string>('global.space.s')};
`;
