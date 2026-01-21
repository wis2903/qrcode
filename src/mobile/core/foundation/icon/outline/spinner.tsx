import styled from 'styled-components';

import { rotate } from '../../../shared/styled';
import { token } from '../../token';
import { IIconProps } from '../type';

const StyledSpinnerIconOutlineContainer = styled.svg`
    animation: ${rotate} linear 1s infinite;
`;

export const SpinnerIconOutline = ({
    width = 20,
    height = 20,
    color = token.get<string>('global.color.grey-4'),
}: IIconProps): JSX.Element => (
    <StyledSpinnerIconOutlineContainer
        width={width}
        height={height}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.094 0c3.344 0 6.615 1.641 8.54 4.641A9.918 9.918 0 0 1 20 7.984l-1.898.325a8.008 8.008 0 0 0-1.093-2.647c-1.51-2.353-4.094-3.757-6.915-3.757-1.547 0-3.06.436-4.373 1.262C1.913 5.559.783 10.57 3.2 14.338c1.509 2.353 4.093 3.757 6.914 3.757 1.547 0 3.06-.436 4.373-1.261a8.115 8.115 0 0 0 1.619-1.342l1.454 1.249a10.073 10.073 0 0 1-2.041 1.7A10.132 10.132 0 0 1 10.114 20c-3.343 0-6.615-1.641-8.54-4.64C-1.415 10.696-.02 4.518 4.69 1.558A10.133 10.133 0 0 1 10.094 0z"
            fill={color}
            fillRule="evenodd"
        />
    </StyledSpinnerIconOutlineContainer>
);
