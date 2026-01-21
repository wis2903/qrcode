import { IFlexboxComponentProps } from '../flexbox/type';

export interface IAccordionComponentProps extends IFlexboxComponentProps {
    children?: React.ReactNode;
}

export interface IAccordionComponentTriggerProps extends IFlexboxComponentProps {
    children?: React.ReactNode;
}

export interface IAccordionComponentContentProps extends IFlexboxComponentProps {
    children?: React.ReactNode;
    noDivider?: boolean;
}

export interface IAccordionComponentContext {
    expanded?: boolean;
    setExpanded?: (value: boolean) => void;
}
