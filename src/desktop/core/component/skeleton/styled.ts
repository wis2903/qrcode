import styled from 'styled-components';

import { token } from '../../foundation/token';
import { shimmer } from '../../shared/styled';

export const StyledSkeletonComponentContainer = styled.div<{
    $width?: string;
    $minWidth?: string;
    $height?: string;
    $margin?: string;
    $marginLeft?: string;
    $marginRight?: string;
    $borderRadius?: string;
    $enabledAnimation?: boolean;
}>`
    display: block;
    position: relative;
    overflow: hidden;
    background-color: ${token.get('global.color.grey-8')};
    border-radius: ${(props): string => props.$borderRadius || token.get('global.radius.round')};
    height: ${(props): string => props.$height || 'auto'};
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$minWidth || 'unset'};
    margin: ${(props): string => props.$margin || 'unset'};
    margin-left: ${(props): string => props.$marginLeft || 'unset'};
    margin-right: ${(props): string => props.$marginRight || 'unset'};

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(256, 256, 256, 0) 0,
            rgba(256, 256, 256, 0.2) 20%,
            rgba(256, 256, 256, 0.5) 60%,
            rgba(256, 256, 256, 0)
        );
        transform: translateX(30%);
        animation: ${shimmer} linear 1s infinite;
        ${(props): string => {
            if (props.$enabledAnimation) return '';
            return 'animation: none;';
        }}
    }
`;
