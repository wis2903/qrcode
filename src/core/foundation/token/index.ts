import color from './global/color.json';
import radius from './global/radius.json';
import space from './global/space.json';
import typo from './global/typo.json';
import shadow from './global/shadow.json';
import util from './global/util.json';
import textbox from './component/textbox.json';
import button from './component/button.json';
import dropdown from './component/dropdown.json';
import checkbox from './component/checkbox.json';
import calendar from './component/calendar.json';
import table from './component/table.json';
import pagination from './component/pagination.json';

import { PandaObject } from '../../shared/lib/object';

const global = new PandaObject({
    color,
    radius,
    space,
    typo,
    shadow,
    util,
});

const parseComponentToken = (data: Record<string, unknown>): Record<string, unknown> => {
    const results: Record<string, unknown> = {};
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = Object(data)[key];
        if (typeof value === 'object') {
            results[key] = parseComponentToken(value);
        } else {
            let parsedValue = '';
            const splitedValue = String(value).trim().split(' ');
            splitedValue.forEach((token) => {
                parsedValue += ` ${global.get(token)}`;
            });
            results[key] = parsedValue.trim();
        }
    }

    return results;
};

export const token = new PandaObject({
    global: global.raw,
    component: {
        textbox: parseComponentToken(textbox),
        button: parseComponentToken(button),
        dropdown: parseComponentToken(dropdown),
        checkbox: parseComponentToken(checkbox),
        calendar: parseComponentToken(calendar),
        table: parseComponentToken(table),
        pagination: parseComponentToken(pagination),
    },
});
