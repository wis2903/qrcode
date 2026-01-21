import React from 'react';

import { DialogComponent } from '.';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { DialogTypeEnum, LangEnum } from '../../shared/type';
import { IDialogContext, IOpenDialogParams } from './type';

interface IDialogProviderState {
    title?: React.ReactNode;
    content: React.ReactNode;
    type?: DialogTypeEnum;
    cancelButtonText?: string;
    confirmButtonText?: string;
    closeButtonText?: string;
    hiddenFooter?: boolean;
    hiddenCloseButton?: boolean;
    footer?: React.ReactNode;
    width?: string;
    maxWidth?: string;
    padding?: string;
}

export const DialogContext = React.createContext<IDialogContext>({
    open: () => undefined,
    close: () => undefined,
    setLoading: () => undefined,
    updateLoadingMessage: () => undefined,
});

export const DialogProvider = ({
    children,
    lang,
}: {
    children?: React.ReactNode;
    lang?: LangEnum;
}): JSX.Element => {
    const [state, setState] = React.useState<IDialogProviderState>({
        type: DialogTypeEnum.info,
        content: undefined,
    });
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [customLoadingMessage, setCustomLoadingMessage] = React.useState<string | undefined>();
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(3000));

    const onConfirmRef = React.useRef<VoidFunction>();
    const onCloseRef = React.useRef<VoidFunction>();
    const onCancelRef = React.useRef<VoidFunction>();

    React.useEffect(() => {
        return (): void => {
            debouncer.destroy();
        };
    }, []);

    return (
        <DialogContext.Provider
            value={{
                isLoading,
                open: ({
                    title,
                    content,
                    confirmButtonText,
                    cancelButtonText,
                    closeButtonText,
                    type,
                    hiddenFooter,
                    hiddenCloseButton,
                    footer,
                    width,
                    maxWidth,
                    padding,
                    onClose,
                    onConfirm,
                    onCancel,
                }: IOpenDialogParams): void => {
                    debouncer.destroy();
                    onConfirmRef.current = onConfirm;
                    onCloseRef.current = onClose;
                    onCancelRef.current = onCancel;

                    setState({
                        title,
                        content,
                        type,
                        hiddenFooter,
                        hiddenCloseButton,
                        footer,
                        width,
                        maxWidth,
                        padding,
                        cancelButtonText,
                        confirmButtonText,
                        closeButtonText,
                    });
                    setIsOpen(true);

                    if (type === DialogTypeEnum.success) {
                        debouncer.execute((): void => {
                            setIsOpen(false);
                        });
                    }
                },
                close: (): void => {
                    debouncer.destroy();
                    setState((current) => ({
                        ...current,
                        width: undefined,
                        maxWidth: undefined,
                    }));
                    setIsOpen(false);
                },
                setLoading: (val: boolean): void => {
                    setIsLoading(val);
                },
                updateLoadingMessage: (message: string | undefined): void => {
                    setCustomLoadingMessage(message);
                },
            }}
        >
            {children}
            {isOpen && (
                <DialogComponent
                    isLoading={isLoading}
                    customLoadingMessage={customLoadingMessage}
                    lang={lang}
                    type={state.type}
                    title={state.title}
                    hiddenFooter={state.hiddenFooter}
                    hiddenCloseButton={state.hiddenCloseButton}
                    footer={state.footer}
                    width={state.width}
                    maxWidth={state.maxWidth}
                    padding={state.padding}
                    confirmButtonText={state.confirmButtonText}
                    cancelButtonText={state.cancelButtonText}
                    closeButtonText={state.closeButtonText}
                    onClose={(): void => {
                        setIsOpen(false);
                        onCloseRef.current?.();
                    }}
                    onCancel={onCancelRef.current}
                    onConfirm={onConfirmRef.current}
                >
                    {state.content}
                </DialogComponent>
            )}
        </DialogContext.Provider>
    );
};

export const useDialogProvider = (): IDialogContext => {
    return React.useContext(DialogContext);
};
