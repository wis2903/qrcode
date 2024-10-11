import React from 'react';

import { PandaDebouncer } from '../../shared/lib/debouncer';
import { DialogTypeEnum } from '../../shared/type';
import { DialogComponent } from '../dialog';
import { IToastContext, IToastProviderProps, ToastTypeEnum } from './type';

interface IToastProviderState {
    type: DialogTypeEnum;
    message: string;
}

export const ToastContext = React.createContext<IToastContext>({
    open: () => undefined,
});

export const ToastProvider = ({ lang, children }: IToastProviderProps): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(5000));
    const [state, setState] = React.useState<IToastProviderState>({
        type: DialogTypeEnum.success,
        message: '',
    });

    React.useEffect(() => {
        return (): void => {
            debouncer.destroy();
        };
    }, []);

    return (
        <ToastContext.Provider
            value={{
                open: ({ type, message }): void => {
                    debouncer.destroy();
                    switch (type) {
                        case ToastTypeEnum.error:
                            setState({
                                type: DialogTypeEnum.error,
                                message,
                            });
                            break;
                        default:
                            setState({
                                type: DialogTypeEnum.success,
                                message,
                            });
                            break;
                    }
                    setIsOpen(true);
                    if (type === ToastTypeEnum.success) {
                        debouncer.execute(() => {
                            setIsOpen(false);
                        });
                    }
                },
            }}
        >
            {children}
            {isOpen && (
                <DialogComponent
                    zIndex={999999}
                    type={state.type}
                    lang={lang}
                    onClose={(): void => {
                        setIsOpen(false);
                    }}
                >
                    {state.message}
                </DialogComponent>
            )}
        </ToastContext.Provider>
    );
};

export const useToastProvider = (): IToastContext => React.useContext(ToastContext);
