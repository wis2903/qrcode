import { IScrollAreaComponentProps } from '../scrollarea/type';

export interface IDrawerComponentProps extends IScrollAreaComponentProps {
    open?: boolean;
    onClose?: VoidFunction;
}
