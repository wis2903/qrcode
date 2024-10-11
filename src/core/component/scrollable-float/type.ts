import { PropsWithChildren } from 'react';

export interface IScrollableFloatComponentProps extends PropsWithChildren {
    className?: string;
    maxHeight?: string;
    height?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    padding?: string;
    scrollbarOpacity?: number;
}
