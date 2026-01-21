import { DialogTypeEnum, LangEnum } from '../../shared/type';

export enum ToastTypeEnum {
    success = DialogTypeEnum.success,
    error = DialogTypeEnum.error,
}

export interface IToastOpenParams {
    type: ToastTypeEnum;
    message: string;
}

export interface IToastContext {
    open: (data: IToastOpenParams) => void;
}

export interface IToastProviderProps {
    lang?: LangEnum;
    children?: React.ReactNode;
}
