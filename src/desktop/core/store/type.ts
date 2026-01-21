import { PandaObject } from '../shared/lib/object';
import { PandaProxy } from '../shared/lib/proxy';

export type IStoreState = Record<string, unknown>;
export type StoreUpdate = (key: string, value: unknown) => void;

export interface IStore {
    state: PandaObject;
    update: StoreUpdate;
}

export interface IStoreContext extends IStore {
    proxy: PandaProxy;
}

export interface ILinkedComponentProps extends Record<string, unknown> {
    store: IStore;
}

export interface IStoreProviderProps {
    state: IStoreState;
    children?: React.ReactNode;
}

export interface ILinkConfig {
    watch?: string[];
    debugName?: string;
}
