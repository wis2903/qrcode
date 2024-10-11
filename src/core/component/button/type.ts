export interface IButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    link?: boolean;
    circle?: boolean;
    large?: boolean;
    width?: string;
    height?: string;
    padding?: string;
    color?: string;
    borderColor?: string;
    borderRadius?: string;
    gap?: string;
}
