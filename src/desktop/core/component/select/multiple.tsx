import { SelectComponent } from '.';
import { IMultipleSelectComponentProps, ISelectionComponentOption } from './type';

const MultipleSelectComponent = ({
    onChange,
    ...rest
}: IMultipleSelectComponentProps): JSX.Element => {
    const handleOnChange = (
        option: ISelectionComponentOption | ISelectionComponentOption[]
    ): void => {
        if (!Array.isArray(option)) return;
        onChange?.(option);
    };

    return <SelectComponent {...rest} multiple onChange={handleOnChange} />;
};

MultipleSelectComponent.displayName = 'MultipleSelectComponent';
export { MultipleSelectComponent };
