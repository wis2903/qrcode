import { HorizontalDirectionEnum, LangEnum } from '../../shared/type';
import { ITextboxComponentProps } from '../textbox/type';

export type SelectionComponentOptionValueType = string | number | undefined;

export interface ISelectionComponentOption {
    label: string;
    value: SelectionComponentOptionValueType;
    display?: React.ReactNode;
    meta?: unknown;
    bold?: boolean;
    disabled?: boolean;
}

export interface ISelectComponentAPI {
    updateDropdownPosition: VoidFunction;
}

export interface ISelectComponentProps
    extends Omit<ITextboxComponentProps, 'onChange' | 'value' | 'onLoad'> {
    lang?: LangEnum;
    ssr?: boolean;
    ssrLoading?: boolean;
    invisibleMenu?: boolean;
    invertedZIndex?: boolean;
    allowOtherDropdownsToOpen?: boolean;
    hasError?: boolean;
    value?: SelectionComponentOptionValueType | SelectionComponentOptionValueType[];
    multiple?: boolean;
    noFooter?: boolean;
    highlightWhenHasValue?: boolean;
    options: ISelectionComponentOption[];
    previousOptions?: ISelectionComponentOption[];
    horizontalDirection?: HorizontalDirectionEnum;
    controlDropdown?: boolean;
    onChange?: (option: ISelectionComponentOption | ISelectionComponentOption[]) => void;
    onKeywordChange?: (search: string) => void;
    onOpenDropdown?: VoidFunction;
    onCloseDropdown?: VoidFunction;
    onLoad?: (api: ISelectComponentAPI) => void;
}

export interface ISingleSelectComponentProps
    extends Omit<ISelectComponentProps, 'onChange' | 'multiple'> {
    onChange?: (option: ISelectionComponentOption) => void;
}

export interface IMultipleSelectComponentProps
    extends Omit<ISelectComponentProps, 'onChange' | 'multiple'> {
    onChange?: (option: ISelectionComponentOption[]) => void;
}
