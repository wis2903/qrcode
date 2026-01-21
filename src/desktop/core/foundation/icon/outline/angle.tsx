import { token } from '../../token';
import { IIconProps } from '../type';

export const AngleIconOutline = ({ width, height, color }: IIconProps): JSX.Element => (
    <svg
        className="outline-icon"
        width={width || 20}
        height={height || 20}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 14.5a.461.461 0 0 1-.337-.148L2.14 6.363a.528.528 0 0 1 0-.715.457.457 0 0 1 .673 0L10 13.278l7.187-7.63a.457.457 0 0 1 .673 0 .528.528 0 0 1 0 .715l-7.523 7.989A.461.461 0 0 1 10 14.5"
            fill={color || token.get<string>('global.color.grey-2')}
            stroke={color || token.get<string>('global.color.grey-2')}
            strokeWidth=".5"
            fillRule="evenodd"
        />
    </svg>
);
