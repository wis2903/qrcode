import {
    AlignEnum,
    FlexboxAlignEnum,
    FlexboxDirectionEnum,
    HorizontalDirectionEnum,
    VerticalAlignEnum,
    VerticalDirectionEnum,
} from '../type';

export const EmptyVoidFunction = (): void => undefined;

export const Alignment = {
    verticle: VerticalAlignEnum,
    horizontal: AlignEnum,
};

export const Direction = {
    verticle: VerticalDirectionEnum,
    horizontal: HorizontalDirectionEnum,
};

export const FlexboxVariant = {
    direction: FlexboxDirectionEnum,
    alignment: FlexboxAlignEnum,
};
