import { HorizontalDirectionEnum } from '../../shared/type';
import { ICalendarComponentProps } from '../calendar/type';

export interface IDatePickerComponentProps extends Omit<ICalendarComponentProps, 'onChange'> {
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    hasError?: boolean;
    label?: string;
    placeholder?: string;
    width?: string;
    minWidth?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    suffixWidth?: string;
    clearable?: boolean;
    horizontalDirection?: HorizontalDirectionEnum;
    highlightWhenHasValue?: boolean;
    onChange?: (dt: Date | undefined) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
