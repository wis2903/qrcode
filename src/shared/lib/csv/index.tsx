import csvToJson from 'csvtojson';
import ReactDOMServer from 'react-dom/server';

import { CSVLink } from 'react-csv';
import { isNumberAdvance } from '../../../mobile/core/shared/util';
import { ICVSDownloadParams } from './type';

export class CSV {
    static downloadFromJson({ data, name, separator }: ICVSDownloadParams): void {
        const link = (
            <CSVLink
                uFEFF
                data={!data?.length ? [{ 'No records found': '' }] : data}
                filename={`${name}.csv`}
                separator={separator}
                enclosingCharacter=""
            />
        );
        const html = ReactDOMServer.renderToStaticMarkup(link);
        const div = document.createElement('div');
        div.innerHTML = html;
        div.getElementsByTagName('a')[0]?.click();
    }

    static async toJson(text: string): Promise<Record<string, unknown>[]> {
        try {
            const result = await csvToJson({
                delimiter: [',', '\t'],
            }).fromString(text);
            return result;
        } catch (e) {
            return [];
        }
    }

    static formatValue(value: unknown): string | number {
        if (value === undefined) return '';
        if (typeof value === 'number') return value;
        return String(value).replace(/,/g, '.').replace(/\r/g, '').replace(/\n/g, '');
    }

    static formatValueAdvance(value: unknown): string | number {
        if (value === undefined || value === null || String(value).trim() === '') return '';
        if (value === false) return '"FALSE"';
        if (value === true) return '"TRUE"';
        if (isNumberAdvance(value)) return Number(value);
        return `"${String(value).replace(/\r/g, '').replace(/\n/g, '')}"`;
    }
}
