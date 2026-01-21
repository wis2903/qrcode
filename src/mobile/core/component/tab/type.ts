export interface ITabComponentItem {
    label: string;
    value?: string | number;
}

export interface ITabComponentProps {
    value?: string | number;
    items: ITabComponentItem[];
    onChange?: (item: ITabComponentItem) => void;
}
