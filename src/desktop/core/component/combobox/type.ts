export interface IComboboxChip {
    text: string;
    id: string;
}

export interface IComboboxProps {
    label?: string;
    value?: string[];
    readOnly?: boolean;
    prefix?: React.ReactNode;
    placeholder?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    onChange?: (value?: string[]) => void;
}
