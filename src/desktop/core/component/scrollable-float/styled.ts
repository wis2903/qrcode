import SimpleBar from 'simplebar-react';
import styled from 'styled-components';

import { token } from '../../foundation/token';

export const StyledScrollableFloatComponentContainer = styled(SimpleBar)<{
    $isVerticalScrollbarMouseDown?: boolean;
    $isHorizontalScrollbarMouseDown?: boolean;
    $scrollbarOpacity?: number;
}>`
    .simplebar-track.simplebar-vertical {
        pointer-events: auto;
        width: 12px;

        .simplebar-scrollbar {
            pointer-events: auto;
            width: ${(props): string => (props.$isVerticalScrollbarMouseDown ? '12px' : '8px')};
            right: 0;
            left: auto;
            transition: width linear 0.1s;

            &::before {
                opacity: ${(props): number => props.$scrollbarOpacity ?? 1};
                top: 12px;
                bottom: 12px;
                right: 0;
                left: 4px;
                background: ${(props): string =>
                    props.$isVerticalScrollbarMouseDown
                        ? token.get<string>('global.color.grey-4')
                        : token.get<string>('global.color.grey-6')};
                transition: background-color linear 0.1s;
            }

            &:hover {
                width: 12px;

                &::before {
                    background: ${token.get<string>('global.color.grey-4')};
                }
            }
        }
    }

    .simplebar-track.simplebar-horizontal {
        pointer-events: auto;
        height: 14px;

        .simplebar-scrollbar {
            height: ${(props): string => (props.$isHorizontalScrollbarMouseDown ? '12px' : '8px')};
            bottom: 0;
            top: auto;
            transition: height linear 0.1s;

            &::before {
                opacity: ${(props): number => props.$scrollbarOpacity ?? 1};
                left: 12px;
                right: 12px;
                background: ${(props): string =>
                    props.$isHorizontalScrollbarMouseDown
                        ? token.get<string>('global.color.grey-4')
                        : token.get<string>('global.color.grey-6')};
                transition: background-color linear 0.1s;
            }

            &:hover {
                height: 12px;

                &::before {
                    background: ${token.get<string>('global.color.grey-4')};
                }
            }
        }
    }
`;
