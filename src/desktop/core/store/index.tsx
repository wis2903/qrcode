/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import uuid from 'react-uuid';

import { PandaObject } from '../shared/lib/object';
import { PandaProxy } from '../shared/lib/proxy';

import {
    ILinkConfig,
    ILinkedComponentProps,
    IStore,
    IStoreContext,
    IStoreProviderProps,
} from './type';

const _map = new Map<any, any>();

export const StoreContext = React.createContext<IStoreContext>({
    proxy: new PandaProxy({}),
    state: new PandaObject({}),
    update: () => undefined,
});

export const StoreProvider = ({ state, children }: IStoreProviderProps): JSX.Element => {
    const stateWithAdditionalInfo = {
        ...state,
        validation: {},
    };

    const proxy = new PandaProxy(stateWithAdditionalInfo);

    return (
        <StoreContext.Provider
            value={{
                proxy,
                state: new PandaObject(stateWithAdditionalInfo),
                update: (key: string, value: unknown): void => {
                    const obj = new PandaObject(proxy.data);
                    obj.update(key, value);
                    proxy.update(obj.raw);
                },
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export function link<T>(
    Component: React.ComponentType<T & ILinkedComponentProps>,
    config?: ILinkConfig
): (props: T) => JSX.Element {
    const linked = _map.get(Component);
    if (linked) return linked;

    const result = (props: T): JSX.Element => {
        const { proxy } = React.useContext(StoreContext);
        const pObj = new PandaObject({ ...proxy.data });

        const [, setUuid] = React.useState<string>(uuid());

        const store: IStore = React.useMemo(
            () => ({
                state: pObj,
                update: (key: string, value: unknown): void => {
                    pObj.update(key, value);
                    proxy.update(pObj.raw);
                },
            }),
            []
        );

        const _props: T & ILinkedComponentProps = {
            ...props,
            store,
        };

        React.useEffect(() => {
            const listener = {
                watch: config?.watch,
                callback: (): void => {
                    setUuid(uuid());
                },
            };

            proxy.addOnChangeListener(listener);
            return (): void => {
                proxy.removeOnChangeListener(listener);
            };
        }, []);

        return <Component {..._props} />;
    };

    _map.set(Component, result);

    return result;
}

export const useStoreProvider = (): IStoreContext => {
    return React.useContext(StoreContext);
};
