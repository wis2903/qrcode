import styled from 'styled-components';

import { token } from '../../foundation/token';
import { empty } from '../../shared/styled';
import { TextboxComponent } from '../textbox';

import {
    DropdownComponentContent,
    DropdownComponentMenu,
    DropdownComponentTrigger,
} from '../dropdown';

export const StyledCustomTextboxComponent = styled(TextboxComponent)``;

export const StyledCustomDropdownComponentTrigger = styled(DropdownComponentTrigger)<{
    $focusing?: boolean;
    $disabled?: boolean;
}>`
    ${(props): string => {
        if (props.$focusing) return '';
        return `
            cursor: ${props.$disabled ? 'not-allowed' : 'pointer'};

            ${StyledCustomTextboxComponent}{
                cursor: ${props.$disabled ? 'not-allowed' : 'pointer'};
            }
        `;
    }}
`;

export const StyledCustomDropdownComponentMenu = styled(DropdownComponentMenu)<{
    $hasFooter?: boolean;
}>`
    ${(props): string => {
        if (!props.$hasFooter) return '';
        return `
            border-bottom: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        `;
    }}
`;

export const StyledCustomDropdownComponentContent = styled(DropdownComponentContent)<{
    $invisible?: boolean;
}>`
    ${(props): string => {
        if (!props.$invisible) return '';

        return `
            opacity: 0;
        `;
    }}
`;

export const StyledCustomDropdownComponentContentAlt = styled(StyledCustomDropdownComponentContent)`
    opacity: 1 !important;
`;

export const StyledCustomDropdownComponentContentEmpty = styled.div`
    padding: ${token.get<string>('global.space.xxxs')} ${token.get<string>('global.space.xs')};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: ${token.get<string>('global.space.xxs')};
    ${empty};
`;

export const StyledSelectComponentDropdownFooter = styled.div`
    display: flex;
    border-width: 1px;
    border-style: solid;
    padding: ${token.get<string>('component.dropdown.item.padding')};
    gap: ${token.get<string>('global.space.s')};
    border-color: ${token.get<string>('component.dropdown.menu.border-color')};
    background-color: ${token.get<string>('global.color.white')};
    border-bottom-left-radius: ${token.get<string>('component.dropdown.menu.radius')};
    border-bottom-right-radius: ${token.get<string>('component.dropdown.menu.radius')};
    border-top-color: ${token.get<string>('global.color.grey-7')};

    button {
        cursor: pointer;
        outline: 0;
        border: 0;
        background: 0;
        padding: 0;
        letter-spacing: -0.2px;
        text-decoration: underline;
        font-size: ${token.get<string>('component.dropdown.item.font-size')};
        font-weight: ${token.get<string>('global.typo.font-weight-regular')};
        color: ${token.get<string>('global.color.grey-3')};
    }
`;
