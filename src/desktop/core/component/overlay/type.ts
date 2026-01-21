export interface IOverlayComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    backgroundColor?: string;
    opacity?: number;
    zIndex?: number;
    fadeIn?: boolean;
    blur?: boolean;
}
