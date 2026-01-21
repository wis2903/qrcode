export interface ICheckboxComponentProps {
    isSpan?: boolean;
    isSwitch?: boolean;
    label?: React.ReactNode;
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (value: boolean) => void;
}
