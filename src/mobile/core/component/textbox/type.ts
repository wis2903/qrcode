import { AlignEnum } from '../../shared/type';

export interface ITextboxComponentAPI {
    clear: VoidFunction;
}

export interface ITextboxComponentProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'value'> {
    label?: string;
    value?: string;
    small?: boolean;
    hasError?: boolean;
    height?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    prefix?: React.ReactNode;
    prefixColor?: string;
    prefixFontSize?: string;
    suffix?: React.ReactNode;
    suffixCursor?: 'default' | 'pointer';
    suffixWidth?: string;
    align?: AlignEnum;
    selectValueOnFocus?: boolean;
    highlighted?: boolean;
    disabledUpdateValueFromPropsDebouncer?: boolean;
    clearable?: boolean;
    placeholderColor?: string;
    zIndex?: number;
    onClear?: VoidFunction;
    onEnter?: VoidFunction;
    overrideOnClickSuffix?: VoidFunction;
    overrideHandleOnInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLoaded?: (api: ITextboxComponentAPI) => void;
}
