import styled from 'styled-components';
import { ButtonComponent } from '../button';

export const StyledAccordionAngleIconWrapper = styled.span<{ $expanded?: boolean }>`
    width: 12px;
    height: 12px;

    ${(props): string => {
        if (!props.$expanded) return '';
        return `
            transform: rotateZ(-180deg);
        `;
    }}
`;

export const StyledAccordionArrowButton = styled(ButtonComponent)`
    width: 24px;
    height: 24px;
`;
