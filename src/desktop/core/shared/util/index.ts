/* eslint-disable @typescript-eslint/no-explicit-any */
export function isPromise(p?: unknown): boolean {
    if (!p) return false;
    return typeof p === 'object' && typeof Object(p).then === 'function';
}

export function upperCaseFirtLetter(str: string): string {
    if (!str) return '';
    return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
}

export function capitalize(str: string): string {
    const words = str.split(' ');
    return words
        .filter((word) => !!word)
        .map((word) => upperCaseFirtLetter(word))
        .join(' ');
}

export function toCamelCase(str: string): string {
    if (!str) return '';

    const splitedStringByUnderscore = str.trim().split('_');
    let result = '';
    splitedStringByUnderscore.forEach((word, idx) => {
        if (idx) {
            result += upperCaseFirtLetter(word);
        } else {
            result += word;
        }
    });

    return result;
}

export function toSnakeCase(str: string): string {
    if (!str) return '';
    const splitedStringByUpperCaseLetter = str.trim().split(/\B(?=[A-Z])/);
    return splitedStringByUpperCaseLetter.map((word) => word.toLowerCase()).join('_');
}

export function toCaseTransformed(data: unknown, type: 'camelCase' | 'snakeCase'): unknown {
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    if (Array.isArray(data)) {
        const _arr: unknown[] = [];
        data.forEach((item, idx) => {
            _arr[idx] = toCaseTransformed(item, type);
        });
        return _arr;
    }

    const _obj: Record<string, unknown> = {};
    const keys = Object.keys(data);

    keys.forEach((key) => {
        const value = Object(data)[key];
        if (type === 'camelCase') {
            _obj[toCamelCase(key)] = toCaseTransformed(value, type);
        } else {
            _obj[toSnakeCase(key)] = toCaseTransformed(value, type);
        }
    });

    return _obj;
}

export function isSingleElementChildren(children?: JSX.Element): boolean {
    if (!children) return false;
    if (Object(children.props).children) return false;
    return true;
}

export function formatNumber(value: string | number, digitsAfterComma?: number): string {
    if (!value) return '0';

    let _value = value;

    if (typeof _value === 'number') {
        const tmp =
            _value > 0 && _value < 1
                ? Math.pow(10, 6)
                : Math.pow(10, digitsAfterComma === undefined ? 2 : Number(digitsAfterComma));
        _value = Math.round(_value * tmp) / tmp;
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 21,
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 21,
    }).format(Number(_value));
}

export function hasSameType(value1: any, value2: any, type: string): boolean {
    if (type === 'date') return value1 instanceof Date && value2 instanceof Date;
    if (type === 'array') return Array.isArray(value1) && Array.isArray(value2);
    if (type === 'object' && (Array.isArray(value1) || Array.isArray(value2))) return false;
    return typeof value1 === type && typeof value2 === type;
}

export function deepEquals(value1: any, value2: any): boolean {
    if (hasSameType(value1, value2, 'number') && isNaN(value1) && isNaN(value2)) return true;

    if (hasSameType(value1, value2, 'array')) {
        if (value1.length !== value2.length) {
            // console.log(value1, value2);
            return false;
        }

        for (let i = 0; i < value1.length; i++) {
            if (!deepEquals(value1[i], value2[i])) return false;
        }

        return true;
    }

    if (hasSameType(value1, value2, 'date')) return value1.valueOf() === value2.valueOf();

    if (hasSameType(value1, value2, 'object') && value1 !== null && value2 !== null) {
        const keysOfValue1 = Object.keys(value1);
        const keysOfValue2 = Object.keys(value2);

        if (!deepEquals(keysOfValue1, keysOfValue2)) return false;

        for (let i = 0; i < keysOfValue1.length; i++) {
            const key = keysOfValue1[i];
            const valuesOfValue1 = value1[key];
            const valuesOfValue2 = value2[key];
            if (!deepEquals(valuesOfValue1, valuesOfValue2)) return false;
        }

        return true;
    }

    // if (value1 !== value2) console.log(value1, value2);

    return value1 === value2;
}

export function deepCompare(value1: any, value2: any): number {
    // if value1 < value2 -> -1, otherwise 1
    if (hasSameType(value1, value2, 'number') || hasSameType(value1, value2, 'string')) {
        return value1 < value2 ? -1 : 1;
    }

    if (hasSameType(value1, value2, 'array')) {
        return value1.length < value2.length ? -1 : 1;
    }

    if (hasSameType(value1, value2, 'date')) {
        return value1.valueOf() < value2.valueOf() ? -1 : 1;
    }

    if (hasSameType(value1, value2, 'object')) {
        return JSON.stringify(value1) < JSON.stringify(value2) ? -1 : 1;
    }

    return -1;
}

export function parseJwt(token: string): Record<string, unknown> {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        return {};
    }
}

export function classname(...params: (string | boolean | undefined)[]): string {
    return params
        .filter((item) => !!item)
        .map((item) => String(item))
        .join(' ');
}

export function isNumber(value: unknown): boolean {
    return /^[0-9]+$/.test(String(value));
}

export function isNumberAdvance(value: unknown): boolean {
    if (value === undefined || value === null || String(value).trim() === '') return false;
    const valueParsedToNumber = Number(String(value).trim());
    return !isNaN(valueParsedToNumber);
}

export function encodeSearchKeyword(value: unknown): string | undefined {
    const valueAsString = value ? String(value).trim() : '';
    if (!valueAsString) return undefined;
    return encodeURIComponent(valueAsString);
}

export function convertPageSizeToLimitOffset({ page, size }: { page: number; size: number }): {
    limit: number;
    offset: number;
} {
    return {
        limit: size,
        offset: page * size,
    };
}

export function isEmptyValue(value: any): boolean {
    return [undefined, null, ''].includes(value);
}

export function formatTime(value: number): string {
    if (isNaN(value)) return '-';
    if (value < 10) return `0${value}`;
    return value.toString();
}

export function string2Color(str: string): string {
    let hash = 0;
    str.split('').forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += value.toString(16).padStart(2, '0');
    }
    return colour;
}

export function shorten(s: string, length?: number): string {
    const len = length || 20;
    if (s.length <= len) return s;
    const firstPart = `${s.substring(0, Math.floor(len * 0.4))}.....`;
    const restLen = len - firstPart.length;
    const rest = s.substring(s.length - restLen, s.length);
    return `${firstPart}${rest}`;
}

export function formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
