import styled from 'styled-components';
import { DropdownComponentContent, DropdownComponentTrigger } from '../dropdown';
import { TextboxComponent } from '../textbox';

export const StyledCustomTextboxComponent = styled(TextboxComponent)<{ $focusing?: boolean }>`
    cursor: ${(props): string => (props.$focusing ? 'unset' : 'pointer')};
`;

export const StyledCustomDropdownComponentContent = styled(DropdownComponentContent)`
    min-width: unset;
`;

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
