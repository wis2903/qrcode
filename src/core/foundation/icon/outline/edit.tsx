import { token } from '../../token';
import { IIconProps } from '../type';

export const EditIconOutline = ({
    width = 20,
    height = 20,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="8akwp7vcxa" d="M0 0h9.398v9.844H0z" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <path
                d="M13.493 18H3.795C2.805 18 2 17.15 2 16.104v-9.48c0-1.045.805-1.896 1.795-1.896h6.098a.48.48 0 1 1 0 .96H3.795c-.46 0-.834.42-.834.936v9.48c0 .516.374.936.834.936h9.698c.46 0 .834-.42.834-.936v-5.698a.48.48 0 0 1 .96 0v5.698c0 1.045-.804 1.896-1.794 1.896"
                fill={color}
            />
            <g transform="translate(8.602 2)">
                <mask id="isc9rugvjb" fill="#fff">
                    <use xlinkHref="#8akwp7vcxa" />
                </mask>
                <path
                    d="m1.281 7.275-.227 1.51 1.435-.231a2.712 2.712 0 0 0 1.37-.813l4.267-4.69c.43-.456.41-1.166-.04-1.59l-.21-.198a1.124 1.124 0 0 0-1.586.047L1.901 6.134a2.73 2.73 0 0 0-.62 1.141zm-.8 2.569a.48.48 0 0 1-.476-.551l.33-2.185a3.692 3.692 0 0 1 .855-1.62L5.585.658a2.089 2.089 0 0 1 2.95-.094l.21.198c.835.787.874 2.106.087 2.94L4.57 8.387c-.501.551-1.15.933-1.875 1.106-.011.003-.023.004-.035.006l-2.103.34a.478.478 0 0 1-.076.006z"
                    fill={color}
                    mask="url(#isc9rugvjb)"
                />
            </g>
        </g>
    </svg>
);
