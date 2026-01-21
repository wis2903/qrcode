import { ITextboxComponentProps } from '../textbox/type';

export interface ICodeboxComponentProps extends Omit<ITextboxComponentProps, 'onChange' | 'value'> {
    value?: string;
    onChange?: (val: string | undefined) => void;
}
