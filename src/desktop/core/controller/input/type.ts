import { ValidationTypeEnum } from '../../shared/type';

export interface IControllerInputValidation {
    type: ValidationTypeEnum;
    message?: string;
}

export interface IControllerInputProps {
    children?: JSX.Element;
    name: string;
    subname?: string;
    label?: string;
    validation?: IControllerInputValidation | IControllerInputValidation[];
    triggerValidateOnBlur?: boolean;
}
