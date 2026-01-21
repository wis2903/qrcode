import { IFlexboxComponentProps } from '../flexbox/type';

export interface IPlainTextComponentProps extends IFlexboxComponentProps {
    text: React.ReactNode;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    color?: string;
    ellipsis?: boolean;
    decoration?: string;
    decorationColor?: string;
    decorationStyle?: string;
}
