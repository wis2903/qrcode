import styled from 'styled-components';

import { token } from '../../foundation/token';
import { FlexboxComponent } from '../flexbox';

export const StyledComboboxChips = styled.div`
    overflow: hidden;
    width: max-content;
    max-width: calc(100% - 48px);
`;

export const StyledComboboxChip = styled.button<{ $selected?: boolean }>`
    outline: 0;
    border-radius: 4px;
    background: #ffffff;
    display: inline-flex;
    align-items: center;
    width: max-content;
    min-width: max-content;
    white-space: nowrap;
    border: 1px solid ${token.get<string>('global.color.grey-5')};
    padding-right: ${token.get<string>('global.space.xxs')};

    > span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: -1px 0 0;
    }

    ${(props): string => {
        if (!props.$selected) return '';
        return `
            background-color: ${token.get<string>('global.color.grey-3')};
            border-color: ${token.get<string>('global.color.grey-3')};
            color: white;
        `;
    }}
`;

export const StyledComboboxChipLabel = styled.span`
    display: inline-block;
    white-space: nowrap;
    width: max-content;
    flex: 1;
    padding: 0 6px 0 0;
`;

export const StyledComboboxInput = styled.input`
    outline: 0;
    border: 0;
    background: transparent;
    min-width: 40px;
    flex: 1;
    padding: 8px 0 8px;
    padding-left: 0;
    font-size: 14px;

    ${(): string => {
        const _color = token.get<string>('component.textbox.placeholder-color');

        return `
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
        `;
    }}
`;

export const StyledCloseIconWrapper = styled(FlexboxComponent)`
    cursor: pointer;
`;

export const StyledComboboxContainer = styled.div<{
    $highZIndex?: boolean;
    $hasLabel?: boolean;
    $hasChips?: boolean;
    $active?: boolean;
    $focusingInput?: boolean;
    $width?: string;
    $minWidth?: string;
    $maxWidth?: string;
    $readOnly?: boolean;
}>`
    display: inline-flex;
    align-items: center;
    background: ${(props): string =>
        props.$readOnly ? token.get<string>('global.color.grey-7') : 'white'};
    gap: ${token.get<string>('global.space.xxs')};
    border: 1px solid ${token.get<string>('global.color.grey-4')};
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$minWidth || 'unset'};
    max-width: ${(props): string => props.$maxWidth || 'unset'};
    border-radius: 4px;
    position: relative;

    &:hover {
        background-color: ${(props): string =>
            props.$readOnly
                ? token.get<string>('global.color.grey-7')
                : token.get<string>('global.color.grey-9')};
    }

    ${(props): string => {
        if (!props.$focusingInput) return '';
        return `
            background-color: ${props.$readOnly ? token.get<string>('global.color.grey-7') : 'white'} !important;
        `;
    }}

    ${(props): string => {
        if (!props.$active) return '';
        return `
            border-color: ${token.get<string>('global.color.primary')};
        `;
    }}

    ${(props): string => {
        if (!props.$highZIndex) return '';
        return `
            z-index: 99998;
        `;
    }}

    ${(props): string => {
        if (!props.$hasChips)
            return `
            padding-left: 8px;
        `;
        return `
            padding-left: 10px;
        `;
    }}

    ${(props): string => {
        if (!props.$hasLabel) return '';
        return `
            ${StyledComboboxInput} {
                padding: 10px 0 6px;
            }

            ${StyledComboboxChips} {
                padding: 3px 0 0;
            }
        `;
    }}

    ${(props): string => {
        if (!props.$readOnly) return '';
        return `
            ${StyledComboboxInput} {
                min-width: 1px;
            }

            ${StyledComboboxChips} {
                max-width: calc(100% - 10px);
            }
        `;
    }}
`;
