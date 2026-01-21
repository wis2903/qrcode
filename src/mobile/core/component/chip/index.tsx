import { token } from '../../foundation/token';
import { StyledChipComponentContainer } from './styled';
import { IChipComponentProps } from './type';

export const ChipComponent = ({
    backgroundColor,
    borderColor,
    textColor,
    width,
    padding,
    fontWeight,
    ...rest
}: IChipComponentProps): JSX.Element => {
    return (
        <StyledChipComponentContainer
            {...rest}
            $backgroundColor={backgroundColor}
            $borderColor={borderColor}
            $textColor={textColor}
            $width={width}
            $padding={padding}
            $fontWeight={fontWeight}
        />
    );
};

export const GreenChipComponent = (props: IChipComponentProps): JSX.Element => (
    <ChipComponent
        {...props}
        backgroundColor={token.get<string>('global.color.green-5')}
        textColor={token.get<string>('global.color.green-1')}
    />
);

export const RedChipComponent = (props: IChipComponentProps): JSX.Element => (
    <ChipComponent
        {...props}
        backgroundColor={token.get<string>('global.color.red-5')}
        textColor={token.get<string>('global.color.red-3')}
    />
);
