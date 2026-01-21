import styled from 'styled-components';
import { token } from '../../foundation/token';

export const StyledTabComponentContainer = styled.div`
    display: flex;
    gap: ${token.get<string>('global.space.xs')};
`;

export const StyledTabComponentItem = styled.button<{ $active?: boolean }>`
    outline: 0;
    background: 0;
    border: 0;
    font-weight: ${token.get<string>('global.typo.font-weight-bold')};
    padding: ${token.get<string>('global.space.xxxs')} 0;
    color: ${token.get<string>('global.color.grey-3')};
    border-bottom: 2px solid transparent;

    &:hover {
        color: ${token.get<string>('global.color.primary')};
    }

    ${(props): string => {
        if (!props.$active) return '';
        return `
            color: ${token.get<string>('global.color.primary')};
            border-color: ${token.get<string>('global.color.primary')};

            &:hover{
                color: ${token.get<string>('global.color.primary')};
            }
        `;
    }}
`;
