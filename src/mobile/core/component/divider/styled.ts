import styled from 'styled-components';
import { token } from '../../foundation/token';

export const StyledDividerComponentHorizontalContainer = styled.div<{
    $width?: string;
    $margin?: string;
    $color?: string;
}>`
    height: 1px;
    width: ${(props): string => props.$width || '100%'};
    margin: ${(props): string => props.$margin || 'unset'};
    border-bottom: 1px solid
        ${(props): string => props.$color || token.get<string>('global.color.grey-6')};
`;

export const StyledDividerComponentVerticalContainer = styled.div<{
    $height?: string;
    $margin?: string;
    $color?: string;
}>`
    width: 1px;
    height: ${(props): string => props.$height || '100%'};
    margin: ${(props): string => props.$margin || 'auto'};
    border-right: 1px solid
        ${(props): string => props.$color || token.get<string>('global.color.grey-6')};
`;
