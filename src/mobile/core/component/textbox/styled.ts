import styled from 'styled-components';

import { token } from '../../foundation/token';
import { ellipsis } from '../../shared/styled';
import { AlignEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';

export const StyledTextboxInput = styled.input<{ $align?: AlignEnum }>`
    outline: 0;
    border: 0;
    background-color: transparent;
    width: 100%;
    margin: -1px 0 0;
    z-index: 1;
    padding: 0;
    ${ellipsis}

    ${(props): string => {
        switch (props.$align) {
            case AlignEnum.right:
                return 'text-align: right;';
            case AlignEnum.center:
                return 'text-align: center;';
            default:
                return 'text-align: left;';
        }
    }}
`;

export const StyledTextboxLabel = styled.span`
    position: absolute;
    top: -10px;
    left: 8px;
    font-size: 12px;
    background: white;
    padding: 0 6px;
    display: inline-flex;
    align-items: center;
    height: 14px;
    border-radius: 4px;
    color: ${token.get<string>('global.color.grey-2')};
`;

export const StyledBottomLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

export const StyledTextboxPrefix = styled(FlexboxComponent)<{
    $color?: string;
    $fontSize?: string;
}>`
    z-index: 1;
    color: ${(props): string =>
        props.$color || token.get<string>('global.color.grey-1')} !important;
    font-size: ${(props): string =>
        props.$fontSize || token.get<string>('global.typo.font-size-7')} !important;
`;

export const StyledTextboxSuffix = styled(FlexboxComponent)<{
    $isPointer?: boolean;
    $disabled?: boolean;
}>`
    z-index: 1;
    cursor: ${(props): string => {
        if (props.$disabled) return 'not-allowed';
        if (props.$isPointer) return 'pointer';
        return 'default';
    }};
`;

export const StyledTextboxContainer = styled.div<{
    $hasError?: boolean;
    $isFocusing?: boolean;
    $disabled?: boolean;
    $readOnly?: boolean;
    $align?: AlignEnum;
    $height?: string;
    $width?: string;
    $minWidth?: string;
    $maxWidth?: string;
    $placeholderColor?: string;
    $zIndex?: number;
    $suffixWidth?: string;
    $highlighted?: boolean;
    $hasLabel?: boolean;
    $small?: boolean;
}>`
    position: relative;
    border: 1px solid;
    height: ${(props): string => props.$height || (props.$small ? '28px' : '32px')};
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    overflow: ${(props): string => (props.$hasLabel ? 'visible' : 'hidden')};
    z-index: ${(props): string | number => props.$zIndex || 'auto'};
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$minWidth || 'unset'};
    max-width: ${(props): string => props.$maxWidth || 'unset'};
    gap: ${token.get<string>('global.space.xxs')};
    border-radius: ${token.get<string>('component.textbox.radius')};
    background-color: ${token.get<string>('component.textbox.background-color.default')};
    border-color: ${token.get<string>('component.textbox.border-color.default')};
    padding: ${(props): string =>
        props.$hasLabel
            ? '4px 12px 0'
            : `0 ${token.get<string>('component.textbox.padding').split(' ')[1]}`};

    :not(${StyledTextboxLabel}) {
        font-size: ${token.get<string>('component.textbox.font-size')};
        color: ${token.get<string>('component.textbox.text-color.default')};
    }

    > div:first-child {
        width: 100%;
    }

    &:hover {
        background-color: ${token.get<string>('component.textbox.background-color.hover')};
    }

    ${StyledTextboxSuffix} {
        color: ${(props): string =>
            props.$placeholderColor || token.get<string>('component.textbox.placeholder-color')};
        margin-top: ${(props): string => (props.$hasLabel ? '-4px' : '0px')};
    }

    ${(props): string => {
        if (!props.$highlighted) return '';
        return `
            background-color: ${token.get<string>('global.color.grey-3')};
            border-color: ${token.get<string>('global.color.grey-3')};
            
            ${StyledTextboxInput}{
                color: white;
            }

            &:hover {
                background-color: ${token.get<string>('global.color.grey-2')};
                border-color: ${token.get<string>('global.color.grey-2')};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$isFocusing) return '';

        return `
            background-color: ${token.get<string>('component.textbox.background-color.default')};
            border-color: ${token.get<string>('component.textbox.border-color.focus')};

            ${StyledTextboxInput}{
                color: ${token.get<string>('component.textbox.text-color.default')};
            }

            ${StyledTextboxLabel}{
                color: ${token.get<string>('global.color.primary')};
            }

            &:hover {
                border-color: ${token.get<string>('component.textbox.border-color.focus')};
                background-color: ${token.get<string>(
                    'component.textbox.background-color.default'
                )};
            }
        `;
    }}

    /* ${(props): string => {
        if (!props.$disabled && !props.$readOnly) return '';

        return `
            cursor: not-allowed;
            background-color: ${token.get<string>('component.textbox.background-color.disabled')};
            border-color: ${token.get<string>('component.textbox.border-color.disabled')};
            
            * {
                cursor: not-allowed;
                color: ${
                    props.$readOnly
                        ? token.get<string>('component.textbox.text-color.default')
                        : token.get<string>('component.textbox.text-color.disabled')
                };
            }

            &:hover {
                background-color: ${token.get<string>(
                    'component.textbox.background-color.disabled'
                )};
            }
        `;
    }} */

    ${(props): string => {
        switch (props.$align) {
            case AlignEnum.right:
                return `
                    ${StyledTextboxInput}{
                        text-align: right;
                    }
                `;
            case AlignEnum.center:
                return `
                    ${StyledTextboxInput}{
                        text-align: center;
                    }
                `;
            default:
                return '';
        }
    }}

    ${(props): string => {
        const _color =
            props.$placeholderColor || token.get<string>('component.textbox.placeholder-color');

        return `
            ${StyledTextboxInput}{
                &::-webkit-input-placeholder {
                    color: ${_color};
                    opacity: 1;
                }
                &::-moz-placeholder {
                    color: ${_color};
                    opacity: 1;
                }
                &:-ms-input-placeholder {
                    color: ${_color};
                    opacity: 1;
                }
                &:-moz-placeholder {
                    color: ${_color};
                    opacity: 1;
                }
            }
        `;
    }}

    ${(props): string => {
        if (!props.$hasError) return '';
        return `
            border-color: ${token.get<string>('global.color.red-4')} !important;
        `;
    }}
`;
