import { token } from '../../token';
import { IIconProps } from '../type';

export const ChildRowIconOutline = ({
    width = 12,
    height = 12,
    color = token.get<string>('global.color.grey-4'),
}: IIconProps): JSX.Element => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 10 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M1 0.5V8.5H9.5" stroke={color} />
    </svg>
);
