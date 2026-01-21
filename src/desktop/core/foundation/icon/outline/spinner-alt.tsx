import styled from 'styled-components';

import { rotate } from '../../../shared/styled';
import { token } from '../../token';
import { IIconProps } from '../type';

const StyledSpinnerIconOutlineContainer = styled.svg`
    animation: ${rotate} linear 1.5s infinite;
`;

export const SpinnerIconAltOutline = ({
    width = 16,
    height = 16,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <StyledSpinnerIconOutlineContainer
        width={width}
        height={height}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m13.022 6.684 1.402 1.692a.4.4 0 0 1-.616.51l-.777-.937c-.064 1.834-.853 3.4-2.297 4.303-1.9 1.187-4.448.936-6.205-.614a.5.5 0 1 1 .662-.75c1.43 1.262 3.493 1.465 5.013.515 1.174-.733 1.813-2.045 1.831-3.628l-1.023.865a.4.4 0 0 1-.505.01l-.058-.056a.4.4 0 0 1 .046-.564l1.677-1.421a.601.601 0 0 1 .85.075zm-1.51-2.632a.5.5 0 0 1-.662.75C9.42 3.54 7.357 3.336 5.836 4.286c-1.173.734-1.812 2.046-1.83 3.63l1.022-.866a.4.4 0 0 1 .506-.01l.058.056a.4.4 0 0 1-.046.564L3.869 9.08a.601.601 0 0 1-.85-.074L1.617 7.314a.4.4 0 0 1 .615-.51l.778.938c.064-1.835.853-3.402 2.296-4.304 1.902-1.188 4.449-.936 6.206.614z"
            fill={color}
            fillRule="nonzero"
        />
    </StyledSpinnerIconOutlineContainer>
);
