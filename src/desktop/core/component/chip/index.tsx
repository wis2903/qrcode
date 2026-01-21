import { StyledChipComponentContainer } from './styled';
import { IChipComponentProps } from './type';

export const ChipComponent = ({
    backgroundColor,
    borderColor,
    textColor,
    ...rest
}: IChipComponentProps): JSX.Element => {
    return (
        <StyledChipComponentContainer
            {...rest}
            $backgroundColor={backgroundColor}
            $borderColor={borderColor}
            $textColor={textColor}
        />
    );
};

export const GreenChipComponent = (props: IChipComponentProps): JSX.Element => (
    <ChipComponent
        {...props}
        backgroundColor="rgba(0, 212, 120, 0.20)"
        borderColor="rgba(0, 212, 120, 0.90)"
        textColor="#009554"
    />
);

export const RedChipComponent = (props: IChipComponentProps): JSX.Element => (
    <ChipComponent
        {...props}
        backgroundColor="rgba(254, 84, 84, 0.20)"
        borderColor="rgba(254, 84, 84, 0.90)"
        textColor="#B50000"
    />
);

export const YellowChipComponent = (props: IChipComponentProps): JSX.Element => (
    <ChipComponent
        {...props}
        backgroundColor="rgba(255, 174, 0, 0.20)"
        borderColor="rgba(255, 174, 0, 0.90)"
        textColor="#BA7F01"
    />
);
