import { ITextboxComponentProps } from '../textbox/type';

export interface INumberboxComponentProps
    extends Omit<ITextboxComponentProps, 'onChange' | 'value'> {
    label?: string;
    value?: number;
    max?: number;
    allowNegative?: boolean;
    allowDecimal?: boolean;
    onChange?: (value?: number) => void;
}
