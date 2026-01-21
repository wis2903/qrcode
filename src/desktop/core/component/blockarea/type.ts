import { IScrollAreaComponentProps } from '../scrollarea/type';

export interface IBlockAreaComponentProps extends IScrollAreaComponentProps {
    width?: string;
    height?: string;
    blocked?: boolean;
    hasLoader?: boolean;
    spinnerMargin?: string;
}
