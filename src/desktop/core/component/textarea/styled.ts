import styled from 'styled-components';

import { token } from '../../foundation/token';
import { scrollbar } from '../../shared/styled';

export const StyledTextareaComponentInput = styled.textarea`
    outline: 0;
    border: 0;
    padding: 0;
    background-color: transparent;
    width: 100%;
    padding: ${token.get<string>('component.textbox.padding')};
    overflow-x: auto;
    overflow-y: auto;
    position: relative;
    resize: vertical;
    ${scrollbar}
`;

export const StyledTextareaComponentContainer = styled.div<{
    $isFocusing?: boolean;
    $disabled?: boolean;
    $readOnly?: boolean;
    $width?: string;
    $hasError?: boolean;
    $hasLabel?: boolean;
}>`
    width: ${(props): string => props.$width || 'auto'};
    border: 1px solid;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: ${token.get<string>('global.space.xxs')};
    border-radius: ${token.get<string>('component.textbox.radius')};
    background-color: ${token.get<string>('component.textbox.background-color.default')};
    border-color: ${token.get<string>('component.textbox.border-color.default')};
    position: relative;

    * {
        font-size: ${token.get<string>('component.textbox.font-size')};
        color: ${token.get<string>('component.textbox.text-color.default')};
    }

    &:hover {
        background-color: ${token.get<string>('component.textbox.background-color.hover')};
    }

    ${(props): string => {
        if (!props.$isFocusing) return '';

        return `
            background-color: ${token.get<string>('component.textbox.background-color.default')};
            border-color: ${token.get<string>('component.textbox.border-color.focus')};
        
            &:hover {
                background-color: ${token.get<string>(
                    'component.textbox.background-color.default'
                )};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$disabled) return '';

        return `
            cursor: not-allowed;
            background-color: ${token.get<string>('component.textbox.background-color.disabled')};
            border-color: ${token.get<string>('component.textbox.border-color.default')};
            
            * {
                cursor: not-allowed;
                color: ${token.get<string>('component.textbox.text-color.disabled')};
            }

            &:hover {
                background-color: ${token.get<string>(
                    'component.textbox.background-color.disabled'
                )};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$readOnly) return '';

        return `
                background-color: ${token.get<string>(
                    'component.textbox.background-color.disabled'
                )};
                border-color: ${token.get<string>('component.textbox.border-color.default')};
                
                * {
                    color: ${token.get<string>('component.textbox.text-color.default')};
                }

                &:hover {
                    background-color: ${token.get<string>(
                        'component.textbox.background-color.disabled'
                    )};
                }
            `;
    }}

    ${(): string => {
        const _color = token.get<string>('component.textbox.placeholder-color');

        return `
            ${StyledTextareaComponentInput}{
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
            ${StyledTextareaComponentInput} {
                padding-top: 10px;
            }
        `;
    }}
`;
