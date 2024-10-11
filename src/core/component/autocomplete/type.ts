import {
    ISelectComponentProps,
    ISelectionComponentOption,
    SelectionComponentOptionValueType,
} from '../select/type';

export interface IAutocompleteComponentProps extends Omit<ISelectComponentProps, 'options'> {
    search: (keyword: string) => Promise<ISelectionComponentOption[]>;
    searchByValue?: (
        value: SelectionComponentOptionValueType | SelectionComponentOptionValueType[]
    ) => Promise<ISelectionComponentOption | ISelectionComponentOption[] | undefined>;
}
