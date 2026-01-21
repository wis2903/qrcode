import { FlexboxAlignEnum, FlexboxDirectionEnum } from '../../shared/type';

export interface IFlexboxComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: FlexboxDirectionEnum;
    inline?: boolean;
    wrap?: boolean;
    hidden?: boolean;
    gap?: string;
    align?: FlexboxAlignEnum;
    justify?: FlexboxAlignEnum;
    padding?: string;
    margin?: string;
    whiteSpace?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    reference?: React.RefObject<HTMLDivElement>;
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    backgroundColor?: string;
    fontSize?: string;
    color?: string;
}
