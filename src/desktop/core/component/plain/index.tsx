import { StyledPlainTextComponentContainer } from './styled';
import { IPlainTextComponentProps } from './type';

export const PlainTextComponent = ({
    text,
    fontSize,
    fontWeight,
    lineHeight,
    color,
    ellipsis,
    decoration,
    decorationColor,
    decorationStyle,
    ...rest
}: IPlainTextComponentProps): JSX.Element => {
    return (
        <StyledPlainTextComponentContainer
            {...rest}
            $fontSize={fontSize}
            $fontWeight={fontWeight}
            $lineHeight={lineHeight}
            $color={color}
            $ellipsis={ellipsis}
            $justify={rest.justify}
            $decoration={decoration}
            $decorationColor={decorationColor}
            $decorationStyle={decorationStyle}
        >
            {text}
        </StyledPlainTextComponentContainer>
    );
};
