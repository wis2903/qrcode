import styled from 'styled-components';
import { token } from '../../foundation/token';
import { ellipsis } from '../../shared/styled';

export const StyledFilterChipLabel = styled.span`
    display: inline-block;
    white-space: nowrap;
    width: max-content;
    max-width: calc(100% - 12px);
    flex: 1;
    font-size: ${token.get<string>('global.typo.font-size-7')};
    padding: 0 ${token.get<string>('global.space.xxs')};
    ${ellipsis}
`;

export const StyledFilterChipContainer = styled.div<{ $readOnly?: boolean }>`
    border-radius: ${token.get<string>('global.radius.m')};
    background: white;
    display: inline-flex;
    align-items: center;
    width: max-content;
    white-space: nowrap;
    border: 1px solid ${token.get<string>('global.color.grey-6')};
    max-width: 100%;
    padding: ${(props): string => {
        if (!props.$readOnly) {
            return `
                ${token.get<string>('global.space.xxxxs')} ${token.get<string>('global.space.xxs')} ${token.get<string>('global.space.xxxxs')} 0;
            `;
        }

        return `
            ${token.get<string>('global.space.xxxxs')} 0 ${token.get<string>('global.space.xxxxs')} 0;
        `;
    }};

    &:hover {
        background-color: ${token.get<string>('global.color.grey-9')};
    }

    ${(props): string => {
        if (!props.$readOnly) return '';
        return `
            ${StyledFilterChipLabel} {
                max-width: 100%;
            }
        `;
    }}
`;
