import cLocale from './calendar.json';
import pLocale from './pagination.json';
import tLocale from './table.json';
import vLocale from './validation.json';

import { PandaObject } from '../lib/object';
import { LangEnum } from '../type';

export const getLocale = (json: Record<string, unknown>, lang?: LangEnum): PandaObject => {
    const pObj = new PandaObject(json);
    const enLocale = new PandaObject(pObj.get('en'));
    if (!lang) return enLocale;
    const langLocale = pObj.get(lang);
    if (!langLocale) return enLocale;
    return new PandaObject(Object(langLocale));
};

export const getCalendarLocale = (lang?: LangEnum): PandaObject => getLocale(cLocale, lang);
export const getPaginationLocale = (lang?: LangEnum): PandaObject => getLocale(pLocale, lang);
export const getTableLocale = (lang?: LangEnum): PandaObject => getLocale(tLocale, lang);
export const getValidationLocale = (lang?: LangEnum): PandaObject => getLocale(vLocale, lang);
