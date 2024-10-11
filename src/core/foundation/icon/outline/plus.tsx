import { token } from '../../token';
import { IIconProps } from '../type';

export const PlusIconOutline = ({
    width = 14,
    height = 14,
    color = token.get<string>('global.color.grey-2'),
    strokeWidth = 0.5,
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17.517 9.517h-7.034V2.483a.483.483 0 0 0-.966 0v7.034H2.483a.483.483 0 0 0 0 .966h7.034v7.034a.483.483 0 0 0 .966 0v-7.034h7.034a.483.483 0 0 0 0-.966"
            fill={color}
            stroke={color}
            strokeWidth={strokeWidth}
            fillRule="evenodd"
        />
    </svg>
);
