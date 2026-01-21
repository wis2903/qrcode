import styled from 'styled-components';
import { token } from '../../foundation/token';

export const StyledPaginationComponentItemIcon = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
`;

export const StyledPaginationComponentItem = styled.button<{
    $selected?: boolean;
    $nav?: 'forward' | 'backward';
}>`
    cursor: pointer;
    outline: 0;
    border: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: ${token.get<string>('global.space.l')};
    min-height: ${token.get<string>('global.space.l')};
    font-size: ${token.get<string>('component.pagination.item.font-size')};
    line-height: ${token.get<string>('component.pagination.item.font-size')};
    padding: ${token.get<string>('component.pagination.item.padding')};
    border-radius: ${token.get<string>('component.pagination.item.radius')};
    background-color: ${token.get<string>('component.pagination.item.background-color.default')};
    color: ${token.get<string>('component.pagination.item.text-color.default')};
    position: relative;

    &:hover {
        background-color: ${token.get<string>('component.pagination.item.background-color.hover')};
    }

    &:active {
        background-color: ${token.get<string>('component.pagination.item.background-color.active')};
    }

    ${(props): string => {
        if (!props.$selected) return '';
        return `
            background-color: ${token.get<string>('component.pagination.item.background-color.selected')};
            color: ${token.get<string>('component.pagination.item.text-color.selected')};

            &:hover {
                background-color: ${token.get<string>('component.pagination.item.background-color.selected')};
            }
        
            &:active {
                background-color: ${token.get<string>('component.pagination.item.background-color.selected')};
            }
        `;
    }}

    ${(props): string => {
        switch (props.$nav) {
            case 'backward':
                return `
                    ${StyledPaginationComponentItemIcon} {
                        margin-left: -1px;
                    }
                    svg {
                        transform: rotate(90deg);
                    }
                `;
            case 'forward':
                return `
                        ${StyledPaginationComponentItemIcon} {
                            margin-left: 1px;
                        }
                        svg {
                            transform: rotate(-90deg);
                        }
                    `;
            default:
                return '';
        }
    }}
`;

export const StyledPaginationComponentLeftArea = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${token.get<string>('global.space.xs')};
    font-size: ${token.get<string>('component.pagination.font-size')};
    width: calc(100% - 360px);
    overflow: hidden;
    white-space: nowrap;
`;

export const StyledPaginationComponentLeftAreaDivider = styled.span`
    width: 1px;
    min-width: 1px;
    height: 12px;
    display: inline-block;
    background-color: ${token.get<string>('global.color.grey-4')};
`;
