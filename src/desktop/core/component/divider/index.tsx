import { IDividerComponentProps } from './type';

import {
    StyledDividerComponentHorizontalContainer,
    StyledDividerComponentVerticalContainer,
} from './styled';

export const DividerComponent = ({
    vertical,
    width,
    height,
    margin,
    color,
}: IDividerComponentProps): JSX.Element => {
    if (vertical) {
        return <StyledDividerComponentVerticalContainer $height={height} $color={color} $margin={margin} />;
    }
    return (
        <StyledDividerComponentHorizontalContainer $width={width} $color={color} $margin={margin} />
    );
};
