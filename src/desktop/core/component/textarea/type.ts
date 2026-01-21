export interface ITextareaComponentProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
    width?: string;
    hasError?: boolean;
    value?: string;
    label?: string;
    required?: boolean;
}
