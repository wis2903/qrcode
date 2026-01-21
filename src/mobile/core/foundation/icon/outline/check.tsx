import { token } from '../../token';
import { IIconProps } from '../type';

export const CheckIconOutline = ({
    width,
    height,
    color,
    strokeWidth,
}: IIconProps): JSX.Element => (
    <svg
        width={width || 20}
        height={height || 20}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.85 16h-.013a.48.48 0 0 1-.35-.167l-4.37-5.067a.484.484 0 0 1 .05-.682.48.48 0 0 1 .678.05L6.871 14.8 17.173 4.147a.48.48 0 0 1 .68-.01.485.485 0 0 1 .011.683L7.196 15.853a.48.48 0 0 1-.345.147"
            fill={color || token.get<string>('global.color.grey-2')}
            stroke={color || token.get<string>('global.color.grey-2')}
            strokeWidth={strokeWidth || 0.5}
            fillRule="evenodd"
        />
    </svg>
);
