import { LangEnum } from '../../shared/type';

export interface ICalendarComponentAPI {
    reset: VoidFunction;
}

export interface ICalendarComponentProps {
    min?: Date;
    max?: Date;
    value?: Date;
    lang?: LangEnum;
    noBorder?: boolean;
    onChange?: (date: Date) => void;
    onClickDateItem?: VoidFunction;
    onLoad?: (api: ICalendarComponentAPI) => void;
}
