import styled from 'styled-components';
import { token } from '../../token';
import { IIconProps } from '../type';
import { CloseIconOutline } from '../outline/close';

const StyledCloseIconFilledContainer = styled.span<{
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

export const CloseIconFilled = ({
    width = 20,
    height = 20,
    color,
    strokeWidth,
}: IIconProps): JSX.Element => (
    <StyledCloseIconFilledContainer
        className="filled-icon"
        $width={width}
        $height={height}
        $color={color}
    >
        <CloseIconOutline
            width={width * 0.5}
            height={height * 0.5}
            color={
                color === 'white' || color === '#ffffff' || color === '#FFFFFF'
                    ? token.get<string>('global.color.grey-2')
                    : token.get<string>('global.color.white')
            }
            strokeWidth={
                strokeWidth ||
                (color === 'white' || color === '#ffffff' || color === '#FFFFFF' ? 1 : 0.5)
            }
        />
    </StyledCloseIconFilledContainer>
);
