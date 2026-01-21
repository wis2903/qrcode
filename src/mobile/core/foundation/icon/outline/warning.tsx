import { token } from '../../token';
import { IIconProps } from '../type';

export const WarningIconOutline = ({
    width = 20,
    height = 20,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
            <path d="M10 13.028a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6" fill={color} />
            <path
                d="M10 13.028a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z"
                stroke="transpa"
                strokeWidth=".96"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.096 5.315h-.192a.704.704 0 0 0-.704.704v4.735c0 .389.315.704.704.704h.192a.704.704 0 0 0 .704-.704V6.019a.704.704 0 0 0-.704-.704"
                fill={color}
            />
            <path
                d="M10.096 5.315h-.192a.704.704 0 0 0-.704.704v4.735c0 .389.315.704.704.704h.192a.704.704 0 0 0 .704-.704V6.019a.704.704 0 0 0-.704-.704z"
                stroke={color}
                strokeWidth=".64"
            />
        </g>
    </svg>
);
