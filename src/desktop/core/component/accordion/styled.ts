import styled from 'styled-components';

export const StyledAccordionAngleIconWrapper = styled.span<{ $expanded?: boolean }>`
    ${(props): string => {
        if (!props.$expanded) return '';
        return `
            transform: rotateZ(-180deg);
        `;
    }}
`;
