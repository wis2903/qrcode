import { token } from '../../token';
import { IIconProps } from '../type';

export const CopyIconOutline = ({
    width = 20,
    height = 20,
    color = token.get<string>('global.color.grey-1'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="7scevlhm2a" d="M0 0h11.48v12.915H0z" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <path
                d="M14.126 3.728 16.424 6.2H14.27a.144.144 0 0 1-.143-.143v-2.33zm-.988 11.187h3.427c.792 0 1.435-.643 1.435-1.435V6.63L13.695 2h-5.74c-.792 0-1.435.642-1.435 1.435v1.893h.861V3.435c0-.317.258-.574.574-.574h5.31v3.196c0 .554.45 1.004 1.004 1.004h2.87v6.419a.575.575 0 0 1-.574.574h-3.414l-.013.86z"
                fill={color}
            />
            <g transform="translate(2 5.085)">
                <mask id="y5x5gkeb9b" fill="#fff">
                    <use xlinkHref="#7scevlhm2a" />
                </mask>
                <path
                    d="M10.045 12.054h-8.61a.575.575 0 0 1-.574-.574V1.434c0-.316.257-.573.574-.573h5.31v3.196c0 .554.45 1.004 1.004 1.004h2.87v6.419a.575.575 0 0 1-.574.574zM7.605 1.728 9.904 4.2H7.749a.144.144 0 0 1-.144-.143v-2.33zM7.175 0h-5.74C.643 0 0 .643 0 1.435V11.48c0 .792.643 1.435 1.435 1.435h8.61c.792 0 1.435-.643 1.435-1.435V4.63L7.175 0z"
                    fill={color}
                    mask="url(#y5x5gkeb9b)"
                />
            </g>
        </g>
    </svg>
);
