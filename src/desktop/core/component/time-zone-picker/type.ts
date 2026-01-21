import { ISingleSelectComponentProps } from '../select/type';

export interface ITimeZonePickerComponentProps
    extends Omit<ISingleSelectComponentProps, 'options' | 'onChange'> {
    onChange?: (value?: string, meta?: Record<string, unknown>) => void;
}
