export interface ITextareaComponentProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
    label?: string;
    width?: string;
    hasError?: boolean;
    value?: string;
}
