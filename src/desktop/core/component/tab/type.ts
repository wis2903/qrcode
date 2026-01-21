export interface ITabComponentItem {
    label: React.ReactNode;
    value?: string | number;
}

export interface ITabComponentProps {
    value?: string | number;
    items: ITabComponentItem[];
    onChange?: (item: ITabComponentItem) => void;
}
