import { HorizontalDirectionEnum } from '../../shared/type';
import { ICalendarComponentProps } from '../calendar/type';

export interface IDatePickerComponentProps extends Omit<ICalendarComponentProps, 'onChange'> {
    disabled?: boolean;
    readOnly?: boolean;
    hasError?: boolean;
    placeholder?: string;
    width?: string;
    minWidth?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    suffixWidth?: string;
    clearable?: boolean;
    horizontalDirection?: HorizontalDirectionEnum;
    highlightWhenHasValue?: boolean;
    label?: string;
    onChange?: (dt: Date | undefined) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
