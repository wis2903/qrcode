import styled from 'styled-components';

import { token } from '../../foundation/token';
import { ellipsis } from '../../shared/styled';
import { AlignEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';

export const StyledTextboxLabel = styled.span`
    display: inline-block;
    padding: 0px 4px 0px;
    position: absolute;
    top: -12px;
    left: 12px;
    background-color: white;
    border-radius: 4px;
    z-index: 2;
    font-size: 12px !important;
    color: ${token.get<string>('global.color.grey-3')} !important;

    > span {
        color: ${token.get<string>('global.color.red-4')};
    }
`;

export const StyledTextboxInput = styled.input<{ $align?: AlignEnum }>`
    outline: 0;
    border: 0;
    background-color: transparent;
    width: 100%;
    padding: 8px 0 6px;
    z-index: 1;
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
    $hasLabel?: boolean;
    $hasError?: boolean;
    $isFocusing?: boolean;
    $disabled?: boolean;
    $readOnly?: boolean;
    $align?: AlignEnum;
    $width?: string;
    $minWidth?: string;
    $maxWidth?: string;
    $placeholderColor?: string;
    $zIndex?: number;
    $suffixWidth?: string;
    $highlighted?: boolean;
}>`
    position: relative;
    border: 1px solid;
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
    padding: 0px ${token.get<string>('component.textbox.padding').split(' ')[1]} 0px;

    * {
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

            &:hover {
                border-color: ${token.get<string>('component.textbox.border-color.focus')};
                background-color: ${token.get<string>(
                    'component.textbox.background-color.default'
                )};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$disabled && !props.$readOnly) return '';

        return `
            cursor: not-allowed;
            background-color: ${token.get<string>('component.textbox.background-color.disabled')};
            border-color: ${token.get<string>('component.textbox.border-color.default')};
            
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
    }}

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
                }
                &::-moz-placeholder {
                    color: ${_color};
                }
                &:-ms-input-placeholder {
                    color: ${_color};
                }
                &:-moz-placeholder {
                    color: ${_color};
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

    ${(props): string => {
        if (!props.$hasLabel) return '';
        return `
            ${StyledTextboxInput} {
                padding: 8px 0 6px;
            }
        `;
    }}
`;
