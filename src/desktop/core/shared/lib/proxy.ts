import { PandaObject } from './object';

interface IProxy {
    data: Record<string, unknown>;
}

export interface IProxyOnChangeListener {
    watch?: string[];
    callback: VoidFunction;
}

export class PandaProxy {
    private _onChangeListeners: IProxyOnChangeListener[];
    private _proxy: IProxy;
    private _temp: Record<string, unknown>;

    constructor(data: Record<string, unknown>) {
        this._onChangeListeners = [];
        this._temp = {};
        const _watcher = {
            set: (): boolean => {
                const pObj = new PandaObject(this.data);
                this._onChangeListeners.forEach((listener) => {
                    if (!listener.watch?.length) return listener.callback();

                    for (let i = 0; i < listener.watch.length; i++) {
                        const name = listener.watch[i];
                        if (pObj.get(name) !== this._temp[name]) {
                            return listener.callback();
                        }
                    }
                });
                
                return true;
            },
        };
        this._proxy = new Proxy({ data }, _watcher) as IProxy;
    }

    get data(): Record<string, unknown> {
        return this._proxy.data;
    }

    get temp(): Record<string, unknown> {
        return this._temp;
    }

    update(data: Record<string, unknown>): void {
        this._proxy.data = data;
        const pObj = new PandaObject(data);
        Object.keys(this._temp).forEach((key) => {
            this._temp[key] = pObj.get(key);
        });
    }

    addOnChangeListener(listener: IProxyOnChangeListener): void {
        const pObj = new PandaObject(this.data);
        listener.watch?.forEach((name) => {
            this._temp[name] = pObj.get(name);
        });
        this._onChangeListeners.push(listener);
    }

    removeOnChangeListener(listener: IProxyOnChangeListener): void {
        const idx = this._onChangeListeners.findIndex((c) => c === listener);
        if (idx >= 0) this._onChangeListeners.splice(idx, 1);
    }
}
