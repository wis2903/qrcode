import { StyledButtonContainer } from './styled';
import { IButtonComponentProps } from './type';

const ButtonComponent = (props: IButtonComponentProps): JSX.Element => {
    const {
        primary,
        link,
        circle,
        large,
        width,
        height,
        color,
        borderColor,
        borderRadius,
        padding,
        gap,
        children,
        ...rest
    } = props;
    const { disabled } = rest;

    return (
        <StyledButtonContainer
            {...rest}
            $disabled={disabled}
            $circle={circle}
            $link={link}
            $primary={primary}
            $large={large}
            $width={width}
            $height={height}
            $padding={padding}
            $gap={gap}
            $color={color}
            $borderColor={borderColor}
            $borderRadius={borderRadius}
        >
            {children}
        </StyledButtonContainer>
    );
};

ButtonComponent.displayName = 'ButtonComponent';

export { ButtonComponent };
