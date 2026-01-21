import { StyledFlexboxComponentContainer } from './styled';
import { IFlexboxComponentProps } from './type';

const FlexboxComponent = (props: IFlexboxComponentProps): JSX.Element => {
    const {
        inline,
        wrap,
        hidden,
        width,
        minWidth,
        maxWidth,
        height,
        maxHeight,
        minHeight,
        direction,
        align,
        justify,
        gap,
        padding,
        margin,
        whiteSpace,
        borderWidth,
        borderColor,
        borderRadius,
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        reference,
        ...rest
    } = props;

    return (
        <StyledFlexboxComponentContainer
            {...rest}
            ref={reference}
            $direction={direction}
            $hidden={hidden}
            $wrap={wrap}
            $align={align}
            $justify={justify}
            $gap={gap}
            $inline={inline}
            $padding={padding}
            $margin={margin}
            $whiteSpace={whiteSpace}
            $width={width}
            $minWidth={minWidth}
            $maxWidth={maxWidth}
            $height={height}
            $maxHeight={maxHeight}
            $minHeight={minHeight}
            $borderWidth={borderWidth}
            $borderColor={borderColor}
            $borderRadius={borderRadius}
            $backgroundColor={backgroundColor}
            $color={color}
            $fontSize={fontSize}
            $fontWeight={fontWeight}
        />
    );
};

FlexboxComponent.displayName = 'FlexboxComponent';

export { FlexboxComponent };
