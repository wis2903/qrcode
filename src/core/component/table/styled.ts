import styled from 'styled-components';

import { token } from '../../foundation/token';
import { ellipsis } from '../../shared/styled';
import { AlignEnum, VerticalAlignEnum } from '../../shared/type';
import { BlockAreaComponent } from '../blockarea';
import { FlexboxComponent } from '../flexbox';

interface ITableColumnProps {
    $align?: AlignEnum;
    $verticalAlign?: VerticalAlignEnum;
    $whiteSpace?: string;
    $width?: string;
    $minWidth?: string;
    $maxWidth?: string;
    $fixedWidth?: string;
    $height?: string;
    $padding?: string;
}

const columnContent = (props: ITableColumnProps): string => {
    return `
        ${ellipsis}
        vertical-align: ${props.$verticalAlign || 'top'};
        white-space: ${props.$whiteSpace || 'normal'};
        word-break: break-word;
        height: ${props.$height || 'auto'};
        
        ${((): string => {
            if (props.$fixedWidth) {
                return `
                    width: ${props.$fixedWidth};
                    min-width: ${props.$fixedWidth};
                    max-width: ${props.$fixedWidth};
                  `;
            }

            return `
                width: ${props.$width || 'auto'};
                min-width: ${props.$minWidth || 'unset'};
                max-width: ${props.$maxWidth || 'unset'};
            `;
        })()}

        ${((): string => {
            switch (props.$align) {
                case AlignEnum.right:
                    return `
                        text-align: right;
                    `;
                case AlignEnum.center:
                    return `
                            text-align: center;
                        `;
                default:
                    return `
                        text-align: left;
                    `;
            }
        })()}

        ${((): string => {
            if (!props.$padding) return '';
            return `
                padding: ${props.$padding} !important;
            `;
        })()}
    `;
};

export const StyledTableComponentCell = styled.td<ITableColumnProps>`
    ${(props): string => columnContent(props)}
`;

export const StyledTableComponentHeading = styled.th<ITableColumnProps>`
    ${(props): string => columnContent(props)}
`;

export const StyledTableComponentCaption = styled.caption<{ $transparent?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    white-space: nowrap;
    opacity: ${(props): number => (props.$transparent ? 0 : 1)};
    padding: ${token.get<string>('component.table.body.column.padding')};
    color: ${token.get<string>('global.color.grey-3')};
    gap: ${token.get<string>('global.space.xxs')};
`;

export const StyledTableComponentContainer = styled(FlexboxComponent)<{
    $noBorder?: boolean;
    $freezeFirstColumn?: boolean;
    $freezeLastColumn?: boolean;
}>`
    border: ${(props): string => (props.$noBorder ? '0px' : '1px')} solid;
    border-radius: ${(props): string =>
        props.$noBorder ? '0' : token.get<string>('component.table.radius')};
    border-color: ${(props): string =>
        props.$noBorder ? 'transparent' : token.get<string>('component.table.border-color')};

    table {
        width: 100%;
        border: none;
        border-spacing: 0;
        border-collapse: collapse;
        background-color: transparent;
        caption-side: bottom;
    }

    thead {
        position: relative;
        position: sticky;
        top: 0;
        z-index: 2;

        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            z-index: 2;
            border-bottom: 1px solid ${token.get<string>('component.table.head.divider-color')};
        }

        ${StyledTableComponentHeading} {
            color: ${token.get<string>('component.table.head.column.text-color')};
            background-color: ${token.get<string>('component.table.head.column.background-color')};
            padding: ${token.get<string>('component.table.head.column.padding')};
            font-size: ${token.get<string>('component.table.head.column.font-size')};
            font-weight: ${token.get<string>('component.table.head.column.font-weight')};

            button.panda-table-sort-button {
                outline: 0;
                border: 0;
                padding: 0;
                background: 0;
                height: 20px;
                display: inline-flex;
                flex-direction: column;
                width: 14px;
                transform: translateX(2px);

                svg {
                    min-width: 14px;
                    min-height: 14px;

                    &:first-child {
                        transform: rotate(180deg) translateY(2px);
                    }
                    &:nth-child(2) {
                        transform: translate(0.2px, -6px);
                    }
                }
            }
        }
    }

    tbody {
        ${StyledTableComponentCell} {
            color: ${token.get<string>('component.table.body.column.text-color')};
            background-color: ${token.get<string>('component.table.body.column.background-color')};
            padding: ${token.get<string>('component.table.body.column.padding')};
            font-size: ${token.get<string>('component.table.body.column.font-size')};
            font-weight: ${token.get<string>('component.table.body.column.font-weight')};
        }

        tr:not(:last-child) {
            ${StyledTableComponentCell} {
                border-bottom: 1px solid ${token.get<string>('component.table.body.divider-color')};
            }
        }
    }

    ${(props): string => {
        if (!props.$freezeFirstColumn) return '';
        return `
            table{
                tr{
                    th:first-child, td:first-child{
                        position: sticky;
                        left: 0;
                        z-index: 1;

                        &::after{
                            content: "";
                            position: absolute;
                            right: 4px;
                            top: 0;
                            height: 100%;
                            width: 4px;
                            box-shadow: 4px 0 4px #0000000d;
                        }
                    }
                    td:first-child{
                        background-color: white;
                    }
                }
            }
        `;
    }}

    ${(props): string => {
        if (!props.$freezeLastColumn) return '';
        return `
            table{
                tr{
                    th:last-child, td:last-child{
                        position: sticky;
                        right: 0;
                        z-index: 1;

                        &::before{
                            content: "";
                            position: absolute;
                            left: 4px;
                            top: 0;
                            height: 100%;
                            width: 4px;
                            box-shadow: -4px 0 4px #0000000d;
                        }
                    }
                    td:last-child{
                        background-color: white;
                    }
                }
            }
        `;
    }}
`;

export const StyledCustomBlockAreaComponent = styled(BlockAreaComponent)<{
    $isDisplayScrollbar?: boolean;
}>`
    .panda-table-scrollbars-container {
        width: 100%;

        &.simplebar-scrolling {
            .simplebar-track.simplebar-vertical,
            .simplebar-track.simplebar-horizontal {
                opacity: 1;
            }
        }

        .simplebar-track.simplebar-vertical {
            opacity: ${(props): number => (props.$isDisplayScrollbar ? 1 : 0)};

            .simplebar-scrollbar {
                &::before {
                    right: 0;
                    left: 4px;
                }
            }
        }

        .simplebar-track.simplebar-horizontal {
            opacity: ${(props): number => (props.$isDisplayScrollbar ? 1 : 0)};

            .simplebar-scrollbar {
                &::before {
                    bottom: 0;
                    top: 4px;
                    left: 16px;
                    right: 16px;
                }
            }
        }
    }
`;
