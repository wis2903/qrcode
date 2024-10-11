import { IFlexboxComponentProps } from '../flexbox/type';

export interface IPlainTextComponentProps extends IFlexboxComponentProps {
    text: React.ReactNode;
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
    fontStyle?: string;
    color?: string;
    ellipsis?: boolean;
    decoration?: string;
    decorationColor?: string;
    decorationStyle?: string;
}
