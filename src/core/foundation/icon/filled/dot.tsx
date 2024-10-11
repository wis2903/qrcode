import { token } from '../../token';
import { IIconProps } from '../type';

export const DotIconFilled = ({
    width = 14,
    height = 14,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg
        fill={color}
        width={width}
        height={height}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" />
    </svg>
);
