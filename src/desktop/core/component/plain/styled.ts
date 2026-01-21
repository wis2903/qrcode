import styled from 'styled-components';

import { FlexboxAlignEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';

export const StyledPlainTextComponentContainer = styled(FlexboxComponent)<{
    $fontSize?: string;
    $fontWeight?: string;
    $lineHeight?: string;
    $color?: string;
    $ellipsis?: boolean;
    $justify?: FlexboxAlignEnum;
    $decoration?: string;
    $decorationColor?: string;
    $decorationStyle?: string;
}>`
    font-size: ${(props): string => props.$fontSize || 'inherit'};
    font-weight: ${(props): string => props.$fontWeight || 'inherit'};
    line-height: ${(props): string => props.$lineHeight || 'inherit'};
    color: ${(props): string => props.$color || 'inherit'};
    word-break: break-word;
    text-decoration: ${(props): string => props.$decoration || 'none'};
    text-decoration-color: ${(props): string => props.$decorationColor || 'initial'};
    text-decoration-style: ${(props): string => props.$decorationStyle || 'none'};

    ${(props): string => {
        if (!props.$ellipsis) return '';
        return `
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;

            ${((): string => {
                switch (props.$justify) {
                    case FlexboxAlignEnum.end:
                        return 'text-align: right;';
                    case FlexboxAlignEnum.center:
                        return 'text-align: center;';
                    default:
                        return '';
                }
            })()}
        `;
    }}
`;
