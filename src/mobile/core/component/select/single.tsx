import { SelectComponent } from '.';
import { ISelectionComponentOption, ISingleSelectComponentProps } from './type';

const SingleSelectComponent = ({ onChange, ...rest }: ISingleSelectComponentProps): JSX.Element => {
    const handleOnChange = (
        option: ISelectionComponentOption | ISelectionComponentOption[]
    ): void => {
        if (Array.isArray(option)) return;
        onChange?.(option);
    };

    return <SelectComponent {...rest} onChange={handleOnChange} />;
};

SingleSelectComponent.displayName = 'SingleSelectComponent';
export { SingleSelectComponent };
