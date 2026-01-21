import { HorizontalDirectionEnum, VerticalDirectionEnum } from '../../shared/type';

export interface IDropdownComponentAPI {
    close: VoidFunction;
    open: VoidFunction;
}

export interface IDropdownComponentContentAPI {
    updatePosition: VoidFunction;
}

export interface IDropdownComponentTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string;
    minWidth?: string;
    cursor?: string;
}

export interface IDropdownComponentContentProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onLoad'> {
    reference?: React.RefObject<HTMLDivElement>;
    isTooltip?: boolean;
    isEnabledTransition?: boolean;
    marginRight?: string;
    marginLeft?: string;
    maxWidth?: string;
    bottom?: string;
    onLoad?: (api: IDropdownComponentContentAPI) => void;
}

export interface IDropdownComponentMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    reference?: React.RefObject<HTMLDivElement>;
    enabledReactWindow?: boolean;
    items?: IDropdownComponentItemProps[];
    width?: string;
}

export interface IDropdownComponentItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    preSelected?: boolean;
    selected?: boolean;
    bold?: boolean;
    isDiv?: boolean;
    backgroundColor?: string;
}

export interface IDropdownComponentProps {
    disabled?: boolean;
    children?: React.ReactNode;
    toggleOnClickTrigger?: boolean;
    toggleOnMouseMove?: boolean;
    closeOnClickInside?: boolean;
    horizontalDirection?: HorizontalDirectionEnum;
    verticleDirection?: VerticalDirectionEnum;
    controlDropdown?: boolean;
    invertedZIndex?: boolean;
    allowOtherDropdownsToOpen?: boolean;
    onClose?: VoidFunction;
    onOpen?: VoidFunction;
    onDropdownContentVisible?: (container: HTMLDivElement) => void;
    onLoad?: (api: IDropdownComponentAPI) => void;
    onClickOverlay?: VoidFunction;
    overrideOnClickTrigger?: VoidFunction;
}

export interface IDropdownComponentContext extends IDropdownComponentProps {
    open?: boolean;
    dropdownTriggerRef?: React.RefObject<HTMLDivElement>;
    dropdownContentRef?: React.RefObject<HTMLDivElement>;
    setOpen?: (value: boolean) => void;
    overrideOnClickTrigger?: VoidFunction;
    handleOnMouseEnter?: VoidFunction;
    handleOnMouseLeave?: VoidFunction;
}
