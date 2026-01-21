import { token } from '../../token';
import { IIconProps } from '../type';

export const GlobeIconOutine = ({
    width = 20,
    height = 20,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="s28t0hc2ha" d="M0 0h12.8v12.8H0z" />
        </defs>
        <g transform="translate(1.6 1.6)" fill="none" fillRule="evenodd">
            <mask id="ptdxn7amrb" fill="#fff">
                <use xlinkHref="#s28t0hc2ha" />
            </mask>
            <path
                d="M8.056 11.784c.453-1.637.692-3.317.717-5.001h3.247a5.646 5.646 0 0 1-3.964 5.001zm-2.57.17a19.112 19.112 0 0 1-.8-5.171h3.322a19.106 19.106 0 0 1-.804 5.188c-.263.038-.53.064-.804.064-.312 0-.616-.031-.915-.08zm-.93-10.477a19.906 19.906 0 0 0-.631 4.54H.78a5.645 5.645 0 0 1 3.89-4.975l-.114.435zM.78 6.783H3.92c.025 1.67.26 3.336.705 4.96A5.643 5.643 0 0 1 .78 6.783zm4.517-5.114L5.512.84c.29-.046.585-.076.888-.076.265 0 .523.025.778.06l.22.844c.37 1.43.571 2.888.607 4.348H4.69c.035-1.46.236-2.919.607-4.348zm6.723 4.348H8.77a19.898 19.898 0 0 0-.632-4.54L8.014 1a5.647 5.647 0 0 1 4.006 5.016zM6.4 0C2.871 0 0 2.87 0 6.4c0 3.529 2.871 6.4 6.4 6.4 3.529 0 6.4-2.871 6.4-6.4C12.8 2.87 9.929 0 6.4 0z"
                fill={color}
                mask="url(#ptdxn7amrb)"
            />
        </g>
    </svg>
);
