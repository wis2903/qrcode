import styled from 'styled-components';
import { token } from '../../foundation/token';
import { scrollbar } from '../../shared/styled';

export const StyledBlockAreaComponent = styled.div<{
    $blocked?: boolean;
    $width?: string;
    $minWidth?: string;
    $height?: string;
    $maxHeight?: string;
    $spinnerMargin?: string;
}>`
    position: relative;
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$minWidth || 'unset'};
    height: ${(props): string => props.$height || 'auto'};
    max-height: ${(props): string => props.$maxHeight || 'unset'};
    overflow: auto;
    ${scrollbar}

    > div {
        width: 100%;
        position: relative;
        z-index: 0;
    }

    > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: ${token.get<string>('global.space.xxs')};
        margin: ${(props): string => props.$spinnerMargin || 'auto'};
        background-color: ${token.get<string>('global.color.white')};
        border-radius: ${token.get<string>('global.radius.s')};
        z-index: 2;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    ${(props): string => {
        if (!props.$blocked) return '';

        return `
            overflow: hidden;

            &::after{
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 1;
                opacity: 0.06;
                background-color: ${token.get('global.color.black')};
            }
        `;
    }}
`;
