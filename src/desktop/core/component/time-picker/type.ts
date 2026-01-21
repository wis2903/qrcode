import { ISingleSelectComponentProps } from '../select/type';

export interface ITimePickerComponentProps
    extends Omit<ISingleSelectComponentProps, 'options' | 'onChange'> {
    stepInMinutes?: number;
    onChange?: (value?: string) => void;
}
