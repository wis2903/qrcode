import { IScrollAreaComponentProps } from '../scrollarea/type';

export interface IDrawerComponentProps extends IScrollAreaComponentProps {
    popup?: boolean;
    open?: boolean;
    onClose?: VoidFunction;
}
