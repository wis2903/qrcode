import styled from 'styled-components';
import { token } from '../../token';
import { WarningIconOutline } from '../outline/warning';
import { IIconProps } from '../type';

const StyledWarningIconFilledContainer = styled.span<{
    $width?: number;
    $height?: number;
    $color?: string;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: ${(props): string => `${props.$width || 20}px`};
    height: ${(props): string => `${props.$height || 20}px`};
    position: relative;
    border-radius: ${token.get<string>('global.radius.circle')};
    background-color: ${(props): string => props.$color || token.get('global.color.grey-2')};

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const WarningIconFilled = ({ width = 20, height = 20, color }: IIconProps): JSX.Element => (
    <StyledWarningIconFilledContainer
        className="filled-icon"
        $width={width}
        $height={height}
        $color={color}
    >
        <WarningIconOutline
            width={width * 1.2}
            height={height * 1.2}
            color={token.get<string>('global.color.white')}
        />
    </StyledWarningIconFilledContainer>
);
