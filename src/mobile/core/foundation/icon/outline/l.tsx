import { token } from '../../token';
import { IIconProps } from '../type';

export const VerticalDotsIconOutline = ({ width, height, color }: IIconProps): JSX.Element => (
    <svg width={width || 20} height={height || 20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(8.5 2.5)" fill={color || token.get('global.color.grey-2')} fillRule="evenodd">
            <circle cx="1.5" cy="13.5" r="1.5" />
            <circle cx="1.5" cy="7.5" r="1.5" />
            <circle cx="1.5" cy="1.5" r="1.5" />
        </g>
    </svg>
);
