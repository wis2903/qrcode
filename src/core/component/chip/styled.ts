import styled from 'styled-components';
import { FlexboxComponent } from '../flexbox';
import { token } from '../../foundation/token';

export const StyledChipComponentContainer = styled(FlexboxComponent)<{
    $backgroundColor?: string;
    $borderColor?: string;
    $textColor?: string;
    $width?: string;
    $padding?: string;
    $fontWeight?: string;
}>`
    display: inline-flex;
    justify-content: center;
    border: 1px solid;
    white-space: nowrap;
    width: ${(props): string => props.$width || 'max-content'};
    border-radius: ${token.get<string>('global.radius.m')};
    font-weight: ${(props): string =>
        props.$fontWeight || token.get<string>('global.typo.font-weight-medium')};
    font-size: ${token.get<string>('global.typo.font-size-7')};
    padding: ${(props): string =>
        props.$padding ||
        `${token.get<string>('global.space.xxxxs')} ${token.get<string>('global.space.xxs')}`};
    color: ${(props): string => props.$textColor || token.get<string>('global.color.grey-2')};
    border-color: ${(props): string =>
        props.$borderColor || token.get<string>('global.color.transparent')};
    background-color: ${(props): string =>
        props.$backgroundColor || token.get<string>('global.color.grey-8')};
`;
