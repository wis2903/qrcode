import { token } from '../../token';
import { IIconProps } from '../type';

export const PlusIconOutline = ({
    width = 18,
    height = 18,
    color = token.get<string>('global.color.grey-1'),
}: IIconProps): JSX.Element => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M10 5L10 15" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="M15 10L5 10" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
);
