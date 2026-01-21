export interface IButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    link?: boolean;
    circle?: boolean;
    large?: boolean;
    width?: string;
    padding?: string;
    borderColor?: string;
    borderRadius?: string;
    gap?: string;
    fontWeight?: string;
}
