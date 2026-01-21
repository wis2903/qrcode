export class PandaObject {
    private _instance: Record<string, unknown>;

    constructor(data: unknown) {
        this._instance = Object(data || {});
    }

    get raw(): Record<string, unknown> {
        return this._instance;
    }

    get<T>(keyChain: string): T {
        const splitedKeyChain = keyChain.trim().split('.');
        let value: unknown = this._instance;

        for (let i = 0; i < splitedKeyChain.length; i++) {
            value =
                typeof value === 'object'
                    ? (value as Record<string, unknown>)[splitedKeyChain[i]]
                    : undefined;
            if (value === null) return null as T;
            if (value === undefined) return undefined as T;
        }

        return value as T;
    }

    update<T>(keyChain: string, value: T): void {
        const splitedKeyChain = keyChain.trim().split('.');
        let parentEl: unknown = this._instance;
        let el: unknown = this._instance;

        for (let i = 0; i < splitedKeyChain.length; i++) {
            const key = splitedKeyChain[i];
            if (i === splitedKeyChain.length - 1) {
                (el as Record<string, unknown>)[key] = value;
                return;
            }

            parentEl = el;
            el = (el as Record<string, unknown>)[key];
            if (el === undefined) {
                el = {};
                (parentEl as Record<string, unknown>)[key] = el;
            } else if (typeof el !== 'object') return;
        }
    }

    static deepCopy(obj: Record<string, unknown> | Record<string, unknown>[]): Record<string, unknown> {
        if (typeof obj !== 'object') return obj;
        return JSON.parse(JSON.stringify(obj));
    }
}
