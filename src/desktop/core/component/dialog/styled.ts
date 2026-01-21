import styled from 'styled-components';

import { token } from '../../foundation/token';
import { DialogTypeEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { ScrollAreaComponent } from '../scrollarea';

export const StyledDialogComponentWrapper = styled.div`
    top: ${token.get<string>('global.space.xxxxl')};
    left: 0;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 99999;
`;

export const StyledDialogComponentCloseButton = styled.button`
    outline: 0;
    border: 0;
    background-color: transparent;
    padding: 0 ${token.get<string>('global.space.xxs')};
    border-radius: ${token.get<string>('global.radius.round')};
    aspect-ratio: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 2;
    cursor: pointer;

    &:hover {
        background-color: ${token.get<string>('component.button.background-color.secondary.hover')};
    }

    &:active {
        background-color: ${token.get<string>(
            'component.button.background-color.secondary.active'
        )};
    }
`;

export const StyledDialogComponentTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: ${token.get<string>('global.typo.font-weight-super-bold')};
    width: max-content;
    word-break: break-word;
    max-width: 100%;
    padding: 32px ${token.get<string>('global.space.xl')} 0 32px;
`;

export const StyledDialogComponentFooter = styled(FlexboxComponent)`
    margin-top: ${token.get<string>('global.space.xxxs')};
    padding: 0 ${token.get<string>('global.space.l')} ${token.get<string>('global.space.l')};
`;

export const StyledDialogComponentContent = styled(ScrollAreaComponent)`
    font-size: 13px;
    max-height: calc(100vh - 240px);
    display: flex;
    align-items: flex-start;
    gap: ${token.get<string>('global.space.xxxs')};
    padding: 0 32px;
`;

export const StyledDialogComponentBody = styled(FlexboxComponent)<{
    $width?: string;
    $maxWidth?: string;
    $padding?: string;
    $hiddenFooter?: boolean;
}>`
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$width || '400px'};
    max-width: ${(props): string => props.$maxWidth || '440px'};
    background: white;
    position: relative;
    flex-direction: column;
    word-break: break-word;
    gap: ${token.get<string>('global.space.m')};
    border-radius: 6px;

    ${(props): string => {
        if (!props.$hiddenFooter) return '';
        return `
            ${StyledDialogComponentContent} {
                padding-bottom: ${token.get<string>('global.space.l')};
            }
        `;
    }}

    ${(props): string => {
        if (!props.$padding) return '';
        return `
            ${StyledDialogComponentContent} {
                padding: ${props.$padding};
            }
        `;
    }}
`;

export const StyledDialogComponentContainer = styled(FlexboxComponent)<{
    $isLoading?: boolean;
    $type?: DialogTypeEnum;
    $zIndex?: number;
}>`
    ${(props): string => {
        if (props.$zIndex === undefined) return '';
        return `
            z-index: ${props.$zIndex};
        `;
    }}

    ${(props): string => {
        switch (props.$type) {
            case DialogTypeEnum.error:
                return `
                    ${StyledDialogComponentContent} {
                        color: ${token.get<string>('global.color.red-4')}
                    };
                `;
            case DialogTypeEnum.info:
                return `
                    ${StyledDialogComponentContent} {
                        color: ${token.get<string>('global.color.yellow-2')};
                        font-weight: ${token.get<string>('global.typo.font-weight-medium')};
                    }
                `;
            case DialogTypeEnum.success:
                return `
                    ${StyledDialogComponentWrapper} {
                        width: auto;
                        top: 26px;
                        bottom: auto;
                        left: auto;
                        right: calc(50% - 506px);
                        transform: none;

                        ${StyledDialogComponentBody}{
                            background-color: ${token.get<string>('global.color.grey-2')};
                            border-radius: 6px;
                            padding: ${token.get<string>('global.space.xs')} ${token.get<string>(
                                'global.space.s'
                            )};
                        }
                    }

                    ${StyledDialogComponentCloseButton} {
                        top: 10px;
                        right: ${token.get<string>('global.space.xs')};

                        svg {
                            path{
                                fill: white !important;
                                stroke: white !important;
                                stroke-width: 1px !important;
                            }
                        }

                        &:hover {
                            background-color: ${token.get<string>('global.color.grey-3')};
                        }
                    
                        &:active {
                            background-color: ${token.get<string>('global.color.grey-3')};
                        }
                    }

                    ${StyledDialogComponentContent} {
                        gap: ${token.get<string>('global.space.xs')};
                        padding: ${token.get<string>('global.space.xxxxs')} 0;
                        color: ${token.get<string>('global.color.white')};
                        font-weight: ${token.get<string>('global.typo.font-weight-regular')};
                        font-size: ${token.get<string>('global.typo.font-size-7')};

                        .filled-icon{
                            margin-top: -1px;
                        }
                    }
                `;
            default:
                return '';
        }
    }}
`;
