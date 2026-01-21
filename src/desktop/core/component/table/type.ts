/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlignEnum, LangEnum, SortTypeEnum, VerticalAlignEnum } from '../../shared/type';
import { IScrollAreaComponentProps } from '../scrollarea/type';

export interface ITableComponentColumn {
    title: React.ReactNode;
    name: string;
    align?: AlignEnum;
    verticalAlign?: VerticalAlignEnum;
    whiteSpace?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    fixedWidth?: string;
    height?: string;
    loading?: boolean;
    loadingPlaceholder?: React.ReactNode;
    padding?: string;
    sortable?: boolean;
    render: (record: any, idx: number) => React.ReactNode;
}

export type TableSort = [string, SortTypeEnum | undefined] | [];

export interface ITableComponentProps extends IScrollAreaComponentProps {
    lang?: LangEnum;
    columns: ITableComponentColumn[];
    records?: Record<string, unknown>[];
    alternativeRecords?: unknown[];
    loading?: boolean;
    noBorder?: boolean;
    noHeader?: boolean;
    noCaption?: boolean;
    captionText?: string;
    captionStyle?: React.CSSProperties;
    loaderStyle?: React.CSSProperties;
    enabledBorderBottomForLastRow?: boolean;
    freezeFirstColumn?: boolean;
    freezeLastColumn?: boolean;
    skeletonHeight?: string;
    sort?: TableSort;
    autoColumnWidth?: boolean;
    selectedRecordId?: string;
    onSortChange?: (sort: TableSort) => void;
    onSelectRecord?: (record: Record<string, unknown>) => void;
    onSelectChildRecord?: (
        record: Record<string, unknown>,
        parentRecord: Record<string, unknown>
    ) => void;
}
