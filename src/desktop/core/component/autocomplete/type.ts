import {
    ISelectComponentProps,
    ISelectionComponentOption,
    SelectionComponentOptionValueType,
} from '../select/type';

export interface IAutocompleteComponentAPI {
    clearSelectedOptions: VoidFunction;
}

export interface IAutocompleteComponentProps extends Omit<ISelectComponentProps, 'options'> {
    forcedTriggerSearchOnDropdownOpen?: boolean;
    search: (keyword: string) => Promise<ISelectionComponentOption[]>;
    searchByValue?: (
        value: SelectionComponentOptionValueType | SelectionComponentOptionValueType[]
    ) => Promise<ISelectionComponentOption | ISelectionComponentOption[] | undefined>;
    onReady?: (api: IAutocompleteComponentAPI) => void
}
