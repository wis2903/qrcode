import { token } from '../../token';
import { IIconProps } from '../type';

export const CloseIconOutline = ({
    width = 20,
    height = 20,
    strokeWidth = 0.5,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="m10.674 10 7.186-7.187a.476.476 0 1 0-.673-.673L10 9.326 2.813 2.14a.476.476 0 1 0-.673.673L9.327 10 2.14 17.187a.476.476 0 1 0 .673.673L10 10.673l7.187 7.187a.476.476 0 1 0 .673-.673L10.674 10z"
            fill={color}
            stroke={color}
            strokeWidth={strokeWidth}
            fillRule="evenodd"
        />
    </svg>
);
