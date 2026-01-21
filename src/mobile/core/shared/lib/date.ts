import { getCalendarLocale } from '../locale';
import { LangEnum } from '../type';

export class PandaDate {
    private _instance: Date;

    constructor(data?: Date | string | number) {
        this._instance = data ? new Date(data) : new Date();
    }

    static fromUnixTimestamp(value: number): PandaDate {
        return new PandaDate(value * 1000);
    }

    static get today(): PandaDate {
        return new PandaDate();
    }

    static minus(days: number): PandaDate {
        const dt = new Date();
        dt.setDate(dt.getDate() - days);
        return new PandaDate(dt);
    }

    static getEndDateOfTheMonth(month: number, year?: number): Date {
        const _year = year || new Date().getFullYear();
        const dt = new Date(_year, month, 0);
        return new PandaDate(dt).endOfTheDay.raw;
    }

    static getBeginDateOfTheMonth(month: number, year?: number): Date {
        const _year = year || new Date().getFullYear();
        const dt = new Date(_year, month - 1, 1);
        return new PandaDate(dt).beginOfTheDay.raw;
    }

    get raw(): Date {
        return this._instance;
    }

    get unixTimestamp(): number {
        return Math.round(this._instance.valueOf() / 1000);
    }

    get beginOfTheDay(): PandaDate {
        const dt = new Date(this._instance);
        dt.setHours(0, 0, 0, 0);
        return new PandaDate(dt);
    }

    get endOfTheDay(): PandaDate {
        const dt = new Date(this._instance);
        dt.setHours(23, 59, 59, 0);
        return new PandaDate(dt);
    }

    toString(lang?: LangEnum): string {
        const locale = getCalendarLocale(lang);
        const d = this._instance.getDate();
        const m = this._instance.getMonth();
        const y = this._instance.getFullYear();

        return `${d < 10 ? `0${d}` : d} ${locale.get(`month-short.m${m}`)}, ${y}`;
    }

    toStringWithoutComma(lang?: LangEnum): string {
        const locale = getCalendarLocale(lang);
        const d = this._instance.getDate();
        const m = this._instance.getMonth();
        const y = this._instance.getFullYear();

        return `${d < 10 ? `0${d}` : d} ${locale.get(`month-short.m${m}`)} ${y}`;
    }

    toDateTimeString(lang?: LangEnum): string {
        const locale = getCalendarLocale(lang);
        const d = this._instance.getDate();
        const m = this._instance.getMonth();
        const y = this._instance.getFullYear();
        const hours = this._instance.getHours();
        const minutes = this._instance.getMinutes();
        const seconds = this._instance.getSeconds();

        return `${d < 10 ? `0${d}` : d} ${locale.get(`month-short.m${m}`)}, ${y} - ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    toTimeString(): string {
        const hours = this._instance.getHours();
        const minutes = this._instance.getMinutes();

        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    }

    toDateTimeStringWithoutComma(lang?: LangEnum): string {
        const locale = getCalendarLocale(lang);
        const d = this._instance.getDate();
        const m = this._instance.getMonth();
        const y = this._instance.getFullYear();
        const hours = this._instance.getHours();
        const minutes = this._instance.getMinutes();

        return `${d < 10 ? `0${d}` : d} ${locale.get(`month-short.m${m}`)} ${y} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    }

    toLocaleString(): string {
        const str = this._instance.toLocaleString();
        return str.match(/[0-9]+\/[0-9]+\/[0-9]+/)?.[0] || this.toStringAlt();
    }

    toStringAlt(): string {
        const d = this._instance.getDate();
        const m = this._instance.getMonth() + 1;
        const y = this._instance.getFullYear();

        return `${d < 10 ? `0${d}` : d}/${m < 10 ? `0${m}` : m}/${y}`;
    }

    toDateTimeStringAlt(): string {
        const d = this._instance.getDate();
        const m = this._instance.getMonth() + 1;
        const y = this._instance.getFullYear();
        const hours = this._instance.getHours();
        const minutes = this._instance.getMinutes();

        return `${d < 10 ? `0${d}` : d}/${m < 10 ? `0${m}` : m}/${y} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    }
}
