import styled from 'styled-components';
import { token } from '../../foundation/token';
import { FlexboxComponent } from '../flexbox';

export const StyledComboboxChips = styled.div`
    overflow: hidden;
    width: max-content;
    max-width: calc(100% - 60px);
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
    height: 20px;
    padding-right: ${token.get<string>('global.space.xxs')};
    padding-left: 0;

    ${(props): string => {
        if (!props.$selected) return '';
        return `
            background-color: ${token.get<string>('global.color.grey-4')};
            border-color: ${token.get<string>('global.color.grey-4')};
            color: white;
        `;
    }}
`;

export const StyledComboboxChipLabel = styled.span`
    display: inline-block;
    white-space: nowrap;
    width: max-content;
    flex: 1;
    padding: 0 ${token.get<string>('global.space.xxs')};
`;

export const StyledComboboxInput = styled.input`
    outline: 0;
    border: 0;
    background: transparent;
    min-width: 60px;
    flex: 1;
    padding: ${token.get<string>('global.space.xxxs')} ${token.get<string>('global.space.xxs')};
    padding-left: 0;

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
    $hasChips?: boolean;
    $active?: boolean;
    $focusingInput?: boolean;
    $width?: string;
    $minWidth?: string;
    $maxWidth?: string;
}>`
    display: inline-flex;
    align-items: center;
    background: white;
    position: relative;
    gap: ${token.get<string>('global.space.xxs')};
    border: 1px solid ${token.get<string>('global.color.grey-5')};
    border-radius: 4px;
    height: 32px;
    padding-top: 2px;
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$minWidth || 'unset'};
    max-width: ${(props): string => props.$maxWidth || 'unset'};

    &:hover {
        background-color: ${token.get<string>('global.color.grey-9')};
    }

    ${(props): string => {
        if (!props.$focusingInput) return '';
        return `
            background-color: white !important;
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
        if (!props.$hasChips) return 'padding-left: 2px;';
        return `
            padding-left: 8px;
        `;
    }}
`;
