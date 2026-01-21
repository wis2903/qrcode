import styled from 'styled-components';

import { token } from '../../foundation/token';

export const StyledButtonContainer = styled.button<{
    $link?: boolean;
    $primary?: boolean;
    $circle?: boolean;
    $disabled?: boolean;
    $large?: boolean;
    $width?: string;
    $padding?: string;
    $gap?: string;
    $borderColor?: string;
    $borderRadius?: string;
    $fontWeight?: string;
}>`
    cursor: pointer;
    outline: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    gap: ${(props): string => props.$gap || token.get<string>('global.space.xxs')};
    border-radius: ${(props): string =>
        props.$borderRadius || token.get<string>('component.button.radius')};
    font-size: ${token.get<string>('component.button.font-size')};
    font-weight: ${(props): string =>
        props.$fontWeight || token.get<string>('component.button.font-weight')};
    background-color: ${token.get<string>('component.button.background-color.secondary.default')};
    border-color: ${token.get<string>('component.button.border-color.secondary')};
    color: ${token.get<string>('component.button.text-color.secondary')};
    width: ${(props): string => props.$width || 'auto'};
    padding: ${(props): string =>
        props.$padding || token.get<string>('component.button.padding.default')};

    &:hover {
        background-color: ${token.get<string>('component.button.background-color.secondary.hover')};
    }

    &:active {
        background-color: ${token.get<string>(
            'component.button.background-color.secondary.active'
        )};
    }

    ${(props): string => {
        if (!props.$primary) return '';

        return `
            background-color: ${token.get<string>(
                'component.button.background-color.primary.default'
            )};
            border-color: ${token.get<string>('component.button.border-color.primary')};
            color: ${token.get<string>('component.button.text-color.primary')};

            &:hover {
                background-color: ${token.get<string>(
                    'component.button.background-color.primary.hover'
                )};
            }
        
            &:active {
                background-color: ${token.get<string>(
                    'component.button.background-color.primary.active'
                )};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$disabled) return '';

        if (props.$primary) {
            return `
                cursor: not-allowed;
                background-color: ${token.get<string>(
                    'component.button.background-color.disabled.default'
                )};
                border-color: ${token.get<string>('component.button.border-color.disabled')};
                color: ${token.get<string>('component.button.text-color.disabled')};

                &:hover {
                    background-color: ${token.get<string>(
                        'component.button.background-color.disabled.hover'
                    )};
                }
            
                &:active {
                    background-color: ${token.get<string>(
                        'component.button.background-color.disabled.active'
                    )};
                }
            `;
        }

        return `
            cursor: not-allowed;
            border-color: ${token.get<string>('global.color.grey-4')};
            color: ${token.get<string>('global.color.grey-4')};

            &:hover {
                background-color: ${token.get<string>(
                    'component.button.background-color.secondary.default'
                )};
            }
        
            &:active {
                background-color: ${token.get<string>(
                    'component.button.background-color.secondary.default'
                )};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$circle) return '';

        return `
            border-radius: ${token.get<string>('global.radius.circle')};
            padding: ${props.$padding || token.get<string>('component.button.padding.circle')};
        `;
    }}

    ${(props): string => {
        if (!props.$link) return '';

        return `
            border-radius: 0;
            padding: 0;
            border: 0 !important;
            background: 0 !important;
            color: ${token.get<string>('global.color.primary')};
            font-weight: ${
                props.$fontWeight || token.get<string>('global.typo.font-weight-super-bold')
            } !important;

            &:disabled {
                color: ${token.get<string>('global.color.grey-4')};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$large) return '';

        return `
            padding: ${token.get<string>('component.button.padding.large')};
        `;
    }}

    ${(props): string => {
        if (!props.$borderColor) return '';
        return `
            border-color: ${props.$borderColor} !important;
        `;
    }}
`;
