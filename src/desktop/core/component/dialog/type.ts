import { DialogTypeEnum, LangEnum } from '../../shared/type';

export interface IDialogComponentProps {
    isLoading?: boolean;
    customLoadingMessage?: string;
    lang?: LangEnum;
    children?: React.ReactNode;
    type?: DialogTypeEnum;
    title?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    closeButtonText?: string;
    hiddenFooter?: boolean;
    hiddenCloseButton?: boolean;
    footer?: React.ReactNode;
    zIndex?: number;
    width?: string;
    maxWidth?: string;
    padding?: string;
    onClose?: VoidFunction;
    onConfirm?: VoidFunction;
    onCancel?: VoidFunction;
}

export interface IOpenDialogParams extends Omit<IDialogComponentProps, 'children'> {
    content: React.ReactNode;
}
export interface IDialogContext extends Pick<IDialogComponentProps, 'lang' | 'isLoading'> {
    open: (params: IOpenDialogParams) => void;
    close: VoidFunction;
    setLoading: (value: boolean) => void;
    updateLoadingMessage: (message: string | undefined) => void;
}
