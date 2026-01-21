import { StyledButtonContainer } from './styled';
import { IButtonComponentProps } from './type';

const ButtonComponent = (props: IButtonComponentProps): JSX.Element => {
    const { primary, link, circle, large, width, borderColor, borderRadius, padding, gap, fontWeight, children, ...rest } = props;
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
            $padding={padding}
            $gap={gap}
            $borderColor={borderColor}
            $borderRadius={borderRadius}
            $fontWeight={fontWeight}
        >
            {children}
        </StyledButtonContainer>
    );
};

ButtonComponent.displayName = 'ButtonComponent';

export { ButtonComponent };
