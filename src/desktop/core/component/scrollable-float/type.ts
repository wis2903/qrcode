import { PropsWithChildren } from 'react';

export interface IScrollableFloatComponentProps extends PropsWithChildren {
    maxHeight?: string;
    minHeight?: string;
    height?: string;
    width?: string;
    className?: string;
    scrollbarsPadding?: string;
    scrollbarsOpacity?: number;
    padding?: string;
    margin?: string;
}
