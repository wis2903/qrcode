import React from 'react';
import uuid from 'react-uuid';

import 'simplebar-react/dist/simplebar.min.css';

import { StyledScrollableFloatComponentContainer } from './styled';
import { IScrollableFloatComponentProps } from './type';

export const ScrollableFloatComponent = ({
    className,
    children,
    width,
    minWidth,
    maxWidth,
    height,
    maxHeight,
    padding,
    scrollbarOpacity,
}: IScrollableFloatComponentProps): JSX.Element => {
    const [containerElementId] = React.useState<string>(uuid());
    const [isVerticalScrollbarMouseDown, setIsVerticalScrollbarMouseDown] =
        React.useState<boolean>(false);
    const [isHorizontalScrollbarMouseDown, setIsHorizontalScrollbarMouseDown] =
        React.useState<boolean>(false);

    const scrollableNodeRef = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        const containerEl = document.getElementById(containerElementId);
        const verticalScrollbar = containerEl?.querySelector(
            '.simplebar-vertical .simplebar-scrollbar'
        );
        const horizontalScrollbar = containerEl?.querySelector(
            '.simplebar-horizontal .simplebar-scrollbar'
        );
        let timeoutHandler: NodeJS.Timeout | undefined = undefined;

        const handleOnVerticalScrollbarMouseDown = (e: Event): void => {
            e.preventDefault();
            setIsVerticalScrollbarMouseDown(true);
            registerResetScrollbarTimeout();
        };

        const handleOnHorizontalScrollbarMouseDown = (e: Event): void => {
            e.preventDefault();
            setIsHorizontalScrollbarMouseDown(true);
            registerResetScrollbarTimeout();
        };

        const handleOnScrollableNodeScrolling = (): void => {
            registerResetScrollbarTimeout();
        };

        const registerResetScrollbarTimeout = (): void => {
            clearTimeout(timeoutHandler);
            timeoutHandler = setTimeout(() => {
                setIsVerticalScrollbarMouseDown(false);
                setIsHorizontalScrollbarMouseDown(false);
            }, 500);
        };

        verticalScrollbar?.addEventListener('mousedown', handleOnVerticalScrollbarMouseDown);
        horizontalScrollbar?.addEventListener('mousedown', handleOnHorizontalScrollbarMouseDown);
        scrollableNodeRef.current?.addEventListener('scroll', handleOnScrollableNodeScrolling);

        return (): void => {
            clearTimeout(timeoutHandler);
            verticalScrollbar?.removeEventListener('mousedown', handleOnVerticalScrollbarMouseDown);
            horizontalScrollbar?.removeEventListener(
                'mousedown',
                handleOnHorizontalScrollbarMouseDown
            );
            scrollableNodeRef.current?.removeEventListener(
                'scroll',
                handleOnScrollableNodeScrolling
            );
        };
    }, []);

    return (
        <StyledScrollableFloatComponentContainer
            scrollableNodeProps={{ ref: scrollableNodeRef }}
            id={containerElementId}
            className={className}
            style={{ height, maxHeight, width, minWidth, maxWidth, padding }}
            $isVerticalScrollbarMouseDown={isVerticalScrollbarMouseDown}
            $isHorizontalScrollbarMouseDown={isHorizontalScrollbarMouseDown}
            $scrollbarOpacity={scrollbarOpacity}
        >
            {children}
        </StyledScrollableFloatComponentContainer>
    );
};
