import styled from 'styled-components';
import { token } from '../../foundation/token';
import { overlayFadeIn } from '../../shared/styled';

export const StyledOverlayComponentContainer = styled.div<{
    $backgroundColor?: string;
    $opacity?: number;
    $zIndex?: number;
    $fadeIn?: boolean;
}>`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${(props): string =>
        props.$backgroundColor || token.get<string>('global.color.black')};
    opacity: ${(props): string => `${props.$opacity ?? 0.5}`};
    z-index: ${(props): string => `${props.$zIndex ?? 99990}`};

    &.fade-in {
        animation: ${overlayFadeIn} linear 0.2s;
    }
`;
