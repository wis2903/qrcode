import { IButtonComponentProps } from '../../component/button/type';
import { LangEnum } from '../../shared/type';
import { IControllerInputValidation } from '../input/type';

export interface IControllerFormInputConfig {
    name: string;
    validation?: IControllerInputValidation | IControllerInputValidation[];
}

export interface IControllerFormContext {
    timestamp: number;
    allFieldsAreValid: boolean;
    inputConfigs: IControllerFormInputConfig[];
    addInputConfig: (config: IControllerFormInputConfig) => void;
    removeInputConfig: (name: string) => void;
    resetAllInputConfigs: VoidFunction;
    validateAll: () => boolean;
    validateSpecificInput: (name: string) => void;
    clearSpecificInputValidationError: (name: string) => void;
}

export interface IControllerFormProps {
    lang?: LangEnum;
    children?: React.ReactNode;
}

export interface IControllerFormSubmitTriggerProps extends Omit<IButtonComponentProps, 'onClick'> {
    onSubmit?: VoidFunction;
    onBeforeSubmit?: VoidFunction;
}
