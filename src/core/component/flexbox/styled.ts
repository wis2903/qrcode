import styled from 'styled-components';
import { FlexboxAlignEnum, FlexboxDirectionEnum } from '../../shared/type';

export const StyledFlexboxComponentContainer = styled.div<{
    $direction?: FlexboxDirectionEnum;
    $wrap?: boolean;
    $hidden?: boolean;
    $align?: FlexboxAlignEnum;
    $justify?: FlexboxAlignEnum;
    $gap?: string;
    $inline?: boolean;
    $padding?: string;
    $margin?: string;
    $whiteSpace?: string;
    $width?: string;
    $height?: string;
    $minWidth?: string;
    $maxWidth?: string;
    $maxHeight?: string;
    $minHeight?: string;
    $borderWidth?: string;
    $borderColor?: string;
    $borderRadius?: string;
    $backgroundColor?: string;
    $color?: string;
    $fontSize?: string;
    $fontWeight?: string;
}>`
    border: 1px solid;
    position: relative;
    display: ${(props): string =>
        props.$hidden ? 'none' : props.$inline ? 'inline-flex' : 'flex'};
    flex-direction: ${(props): string => props.$direction || 'row'};
    flex-wrap: ${(props): string => (props.$wrap ? 'wrap' : 'unset')};
    align-items: ${(props): string => props.$align || 'flex-start'};
    justify-content: ${(props): string => props.$justify || 'flex-start'};
    gap: ${(props): string => props.$gap || '0px'};
    padding: ${(props): string => props.$padding || '0px'};
    margin: ${(props): string => props.$margin || '0px'};
    white-space: ${(props): string => props.$whiteSpace || 'normal'};
    width: ${(props): string => props.$width || 'auto'};
    height: ${(props): string => props.$height || 'auto'};
    min-width: ${(props): string => props.$minWidth || 'unset'};
    max-width: ${(props): string => props.$maxWidth || 'unset'};
    max-height: ${(props): string => props.$maxHeight || 'unset'};
    min-height: ${(props): string => props.$minHeight || 'unset'};
    border-width: ${(props): string => props.$borderWidth || '0px'};
    border-color: ${(props): string => props.$borderColor || 'transparent'};
    border-radius: ${(props): string => props.$borderRadius || '0px'};
    background-color: ${(props): string => props.$backgroundColor || 'transparent'};
    color: ${(props): string => props.$color || 'inherit'};
    font-size: ${(props): string => props.$fontSize || 'inherit'};
    font-weight: ${(props): string => props.$fontWeight || 'inherit'};
`;
