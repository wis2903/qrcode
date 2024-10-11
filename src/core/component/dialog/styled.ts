import styled, { keyframes } from 'styled-components';

import { token } from '../../foundation/token';
import { DialogTypeEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { ScrollAreaComponent } from '../scrollarea';

const slideIn = keyframes`
    0%{ transform: translateY(150%); }
    100% { transform: translateY(0); }
`;

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
    top: ${token.get<string>('global.space.s')};
    right: ${token.get<string>('global.space.s')};
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
    font-size: ${token.get<string>('global.typo.font-size-4')};
    font-weight: ${token.get<string>('global.typo.font-weight-super-bold')};
    width: max-content;
    word-break: break-word;
    max-width: 100%;
    padding: ${token.get<string>('global.space.l')} ${token.get<string>('global.space.xl')} 0
        ${token.get<string>('global.space.l')};
`;

export const StyledDialogComponentFooter = styled(FlexboxComponent)`
    margin-top: ${token.get<string>('global.space.xxxs')};
    padding: 8px ${token.get<string>('global.space.l')} ${token.get<string>('global.space.l')};
`;

export const StyledDialogComponentContent = styled(ScrollAreaComponent)`
    font-size: 14px;
    max-height: calc(100vh - 200px);
    display: flex;
    align-items: flex-start;
    gap: ${token.get<string>('global.space.xxxs')};
    padding: 0 ${token.get<string>('global.space.l')};
`;

export const StyledDialogComponentBody = styled(FlexboxComponent)<{
    $width?: string;
    $maxWidth?: string;
    $padding?: string;
    $hiddenFooter?: boolean;
}>`
    width: ${(props): string => props.$width || 'auto'};
    min-width: ${(props): string => props.$width || '340px'};
    max-width: ${(props): string => props.$maxWidth || '340px'};
    background: white;
    position: relative;
    flex-direction: column;
    word-break: break-word;
    border-radius: ${token.get<string>('global.radius.none')};
    gap: ${token.get<string>('global.space.s')};

    &.success {
        animation: ${slideIn} cubic-bezier(0.42, 0, 0.58, 1) 0.2s;
    }

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
                        top: auto;
                        left: 50%;
                        transform: translate(-50%, 0);
                        right: auto;
                        bottom: 20px;

                        ${StyledDialogComponentBody}{
                            padding: ${token.get<string>('global.space.xs')} ${token.get<string>(
                    'global.space.s'
                )};
                            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                            border-top-left-radius: ${token.get<string>('global.radius.m')};
                            border-bottom-left-radius: ${token.get<string>('global.radius.m')};
                            border-top-right-radius: 0;
                            border-bottom-right-radius: 0;
                        }
                    }

                    ${StyledDialogComponentCloseButton} {
                        top: 10px;
                        right: ${token.get<string>('global.space.xs')};
                    }

                    ${StyledDialogComponentContent} {
                        align-items: center;
                        gap: ${token.get<string>('global.space.xxs')};
                        padding: ${token.get<string>('global.space.xxxxs')} 0;
                        font-weight: ${token.get<string>('global.typo.font-weight-regular')};
                        font-size: ${token.get<string>('global.typo.font-size-7')};
                    }
                `;
            default:
                return '';
        }
    }}
`;
