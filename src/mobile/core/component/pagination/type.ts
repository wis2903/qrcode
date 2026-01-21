import { LangEnum } from '../../shared/type';

export interface IPaginationComponentOnChangeData {
    value: number;
    pageSize: number;
}

export interface IPaginationComponentProps {
    disabledPageSizeControl?: boolean;
    minimal?: boolean,
    lang?: LangEnum;
    value?: number;
    total: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    width?: string;
    onChange?: (data: IPaginationComponentOnChangeData) => void;
}
