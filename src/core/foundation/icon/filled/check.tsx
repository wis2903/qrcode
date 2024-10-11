import styled from 'styled-components';
import { token } from '../../token';
import { CheckIconOutline } from '../outline/check';
import { IIconProps } from '../type';

const StyledCheckIconFilledContainer = styled.span<{ $width?: number; $height?: number; $color?: string }>`
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

export const CheckIconFilled = ({ width = 20, height = 20, color }: IIconProps): JSX.Element => (
    <StyledCheckIconFilledContainer className='filled-icon' $width={width} $height={height} $color={color}>
        <CheckIconOutline width={width * 0.5} height={height * 0.5} strokeWidth={1} color={token.get<string>('global.color.white')} />
    </StyledCheckIconFilledContainer>
);
