import { token } from '../../token';
import { IIconProps } from '../type';

export const SearchIconOutline = ({
    width = 22,
    height = 22,
    color = token.get<string>('global.color.grey-1'),
}: IIconProps): JSX.Element => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="9.16667" cy="9.16663" r="5" stroke={color} />
        <path d="M16.6667 16.6666L14.1667 14.1666" stroke={color} strokeLinecap="round" />
    </svg>
);
