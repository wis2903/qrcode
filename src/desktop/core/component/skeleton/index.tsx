import { token } from '../../foundation/token';
import { StyledSkeletonComponentContainer } from './styled';
import { ISkeletonComponentProps } from './type';

export const SkeletonComponent = ({
    width,
    minWidth,
    margin,
    marginLeft,
    marginRight,
    borderRadius,
    enabledAnimation,
    height = token.get<string>('global.space.s'),
}: ISkeletonComponentProps): JSX.Element => {
    return (
        <StyledSkeletonComponentContainer
            className="skeleton-loader"
            $width={width}
            $minWidth={minWidth}
            $height={height}
            $margin={margin}
            $marginLeft={marginLeft}
            $marginRight={marginRight}
            $borderRadius={borderRadius}
            $enabledAnimation={enabledAnimation}
        />
    );
};
