import styled from 'styled-components';

import { token } from '../../foundation/token';
import { scrollbar } from '../../shared/styled';
import { HorizontalDirectionEnum, VerticalDirectionEnum } from '../../shared/type';
import { ScrollAreaComponent } from '../scrollarea';

interface IStyledDropdownComponentItemProps {
    $bold?: boolean;
    $preSelected?: boolean;
    $disabled?: boolean;
    $backgroundColor?: string;
}
const dropdownComponentItemStyle = (props: IStyledDropdownComponentItemProps): string => `
    outline: 0;
    border: 0;
    width: 100%;
    position: relative;
    cursor: ${props.$disabled ? 'not-allowed' : 'pointer'};
    font-size: ${token.get<string>('component.dropdown.item.font-size')};
    padding: ${token.get<string>('component.dropdown.item.padding')};
    color: ${props.$disabled ? token.get<string>('global.color.grey-4') : 'unset'};
    background-color: ${
        props.$backgroundColor ||
        (props.$disabled
            ? token.get<string>('global.color.grey-9')
            : token.get<string>('component.dropdown.item.background-color.default'))
    };
    font-weight: ${
        props.$bold
            ? token.get('global.typo.font-weight-bold')
            : token.get('global.typo.font-weight-regular')
    };

    > div {
        z-index: 2;
    }

    &:not(:last-child) {
        &::after {
            content: '';
            position: absolute;
            height: 1px;
            bottom: 0;
            z-index: 0;
            left: ${token.get<string>('component.dropdown.item.padding').split(' ')[1]};
            background-color: ${token.get<string>('component.dropdown.item.divider-color')};
            width: ${`
                calc(
                    100% - ${token.get<string>('component.dropdown.item.padding').split(' ')[1]} -
                        ${token.get<string>('component.dropdown.item.padding').split(' ')[1]}
                )
            `};
        }
    }

    ${((): string => {
        const _style = `
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: calc(100% + 2px);
                top: -1px;
                left: 0;
                z-index: 1;
                background-color: ${
                    props.$backgroundColor ||
                    (props.$disabled
                        ? token.get<string>('global.color.grey-9')
                        : token.get<string>('component.dropdown.item.background-color.hover'))
                };
            }
        `;

        return `
            ${!props.$preSelected ? '' : _style};

            &:hover{
                ${_style};
            }
        `;
    })()}

    &:active {
        &::before {
            background-color: ${
                props.$disabled
                    ? token.get<string>('global.color.grey-9')
                    : token.get<string>('component.dropdown.item.background-color.active')
            };
        }
    }
`;

export const StyledDropdownComponentMenu = styled(ScrollAreaComponent)`
    width: 100%;
    position: relative;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    padding: ${token.get<string>('component.dropdown.menu.padding')};
    border-radius: 6px;
    border-color: ${token.get<string>('component.dropdown.menu.border-color')};
    background-color: ${token.get<string>('component.dropdown.menu.background-color')};

    .panda-dropdown-react-window-ls {
        ${scrollbar}
    }
`;

export const StyledDropdownComponentItem = styled.button<IStyledDropdownComponentItemProps>`
    ${(props): string => dropdownComponentItemStyle(props)}
`;
export const StyledDropdownComponentItemDiv = styled.div<IStyledDropdownComponentItemProps>`
    ${(props): string => dropdownComponentItemStyle(props)}
`;

export const StyledDropdownComponentTrigger = styled.div<{
    $highZIndex?: boolean;
    $width?: string;
    $minWidth?: string;
    $disabled?: boolean;
    $cursor?: string;
}>`
    display: inline-block;
    position: relative;
    z-index: ${(props): string => (props.$highZIndex ? '99998' : 'auto')};
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$minWidth || 'auto'};

    ${(props): string => {
        if (!props.$cursor) return '';
        return `
            cursor: ${props.$cursor};
        `;
    }}

    ${(props): string => {
        if (!props.$disabled) return '';
        return `
            cursor: not-allowed;
        `;
    }}
`;

export const StyledDropdownComponentContent = styled.div<{
    $isTooltip?: boolean;
    $hasBefore?: boolean;
    $verticleDirection?: VerticalDirectionEnum;
    $horizontalDirection?: HorizontalDirectionEnum;
    $controlDropdown?: boolean;
    $marginRight?: string;
    $marginLeft?: string;
    $maxWidth?: string;
    $bottom?: string;
}>`
    position: relative;
    display: inline-block;
    z-index: 99993;
    width: ${(props): string => (props.$controlDropdown ? '100%' : 'max-content')};
    min-width: 100%;
    max-width: ${(props): string => props.$maxWidth || '540px'};
    border-radius: 6px;
    box-shadow: ${token.get<string>('global.shadow.default')};

    ${(props): string => {
        if (!props.$isTooltip)
            return `
                ${((): string => {
                    switch (props.$horizontalDirection) {
                        case HorizontalDirectionEnum.left:
                            return `
                                margin-left: ${props.$marginLeft || '0'};
                            `;
                        case HorizontalDirectionEnum.right:
                            return `
                                margin-right: ${props.$marginRight || '0'};
                            `;
                        default:
                            return '';
                    }
                })()}
        `;

        return `
            color: white;
            position: relative;
            padding: ${token.get<string>('global.space.xxs')} ${token.get<string>(
                'global.space.xs'
            )};
            background: ${token.get<string>('global.color.grey-2')};
            border-radius: ${token.get<string>('global.radius.m')};
            word-break: break-word;
            line-height: ${token.get<string>('global.space.l')};

            ${((): string => {
                switch (props.$horizontalDirection) {
                    case HorizontalDirectionEnum.left:
                        return `
                            margin-left: ${props.$marginLeft || '-12px'};
                        `;
                    case HorizontalDirectionEnum.right:
                        return `
                            margin-right: ${props.$marginRight || '-12px'};
                        `;
                    default:
                        return '';
                }
            })()}

            &::after {
                width: 8px;
                height: 8px;
                content: '';
                position: absolute;
                transform: rotate(45deg);
                background: ${token.get<string>('global.color.grey-2')};

                ${((): string => {
                    switch (props.$verticleDirection) {
                        case VerticalDirectionEnum.top:
                            return `
                                bottom: -3px;
                                top: auto;
                            `;
                        default:
                            return `
                                top: -3px;
                                bottom: auto;
                            `;
                    }
                })()}

                ${((): string => {
                    switch (props.$horizontalDirection) {
                        case HorizontalDirectionEnum.left:
                            return `
                                left: 12px;
                                right: auto;
                            `;
                        case HorizontalDirectionEnum.center:
                            return `
                                left: 50%;
                                right: auto;
                                transform: translateX(-50%) rotate(45deg);
                            `;
                        default:
                            return `
                                right: 12px;
                                left: auto;
                            `;
                    }
                })()}
            }
        `;
    }}

    ${(props): string => {
        if (props.$horizontalDirection !== HorizontalDirectionEnum.center) return '';
        return `
            transform: translateX(calc(-50% + 10px));
        `;
    }}

    ${(props): string => {
        if (!props.$hasBefore) return '';
        return `
            &::before {
                content: '';
                position: absolute;
                bottom: ${props.$verticleDirection === VerticalDirectionEnum.top ? 'auto' : '99%'};
                top: ${props.$verticleDirection === VerticalDirectionEnum.top ? '99%' : 'auto'};
                left: 0;
                background: transparent;
                width: 100%;
                height: ${token.get<string>('global.space.s')};
            }
        `;
    }}
`;
