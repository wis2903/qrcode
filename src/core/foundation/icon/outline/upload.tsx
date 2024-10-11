import { token } from '../../token';
import { IIconProps } from '../type';

export const UploadIconOutline = ({
    width = 20,
    height = 20,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="hn0bfmthva" d="M0 0h11v11.688H0z" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <path
                d="M10.224 2.113a.443.443 0 0 0-.59 0L7.416 4.065a.495.495 0 0 0-.056.676.444.444 0 0 0 .646.058L9.47 3.51v8.396c0 .265.206.48.459.48a.47.47 0 0 0 .458-.48V3.511l1.464 1.288a.444.444 0 0 0 .646-.058.495.495 0 0 0-.056-.676l-2.217-1.952z"
                fill={color}
            />
            <g transform="translate(4.5 6.312)">
                <mask id="7gwkzv0keb" fill="#fff">
                    <use xlinkHref="#hn0bfmthva" />
                </mask>
                <path
                    d="M9.685 11.688h-8.37C.578 11.688 0 10.874 0 9.835V1.853C0 .814.578 0 1.315 0h2.16a.47.47 0 0 1 .459.48.47.47 0 0 1-.459.48h-2.16c-.14 0-.398.339-.398.893v7.982c0 .554.258.894.398.894h8.37c.14 0 .398-.34.398-.894V1.853c0-.554-.258-.894-.398-.894H7.898A.47.47 0 0 1 7.44.48.47.47 0 0 1 7.898 0h1.787C10.422 0 11 .814 11 1.853v7.982c0 1.04-.578 1.853-1.315 1.853"
                    fill={color}
                    mask="url(#7gwkzv0keb)"
                />
            </g>
        </g>
    </svg>
);
