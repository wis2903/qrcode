/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortTypeEnum } from '../type';
import { PandaObject } from './object';

export class PandaCollection<T> {
    private _instance: T[];

    constructor(data: T[]) {
        this._instance = Array.isArray(data) ? [...data] : [];
    }

    get raw(): T[] {
        return this._instance;
    }

    sort(key: string, type?: SortTypeEnum): T[] {
        this._instance.sort((a, b) => {
            let aVal = new PandaObject(a).get(key);
            let bVal = new PandaObject(b).get(key);

            switch (typeof aVal) {
                case 'string':
                    aVal = String(aVal || '');
                    bVal = String(bVal || '');
                    break;
                case 'number':
                    aVal = Number(aVal || 0);
                    bVal = Number(bVal || 0);
                    break;
                default:
                    return -1;
            }

            if (type === SortTypeEnum.descending) return (aVal as any) > (bVal as any) ? -1 : 1;
            return (aVal as any) < (bVal as any) ? -1 : 1;
        });

        return this.raw;
    }
}
