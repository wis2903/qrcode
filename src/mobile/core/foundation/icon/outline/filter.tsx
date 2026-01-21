import { token } from '../../token';
import { IIconProps } from '../type';

export const FilterIconOutline = ({
    width = 16,
    height = 16,
    color = token.get<string>('global.color.grey-1'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="bzt818o31a" d="M0 0h13.333v13.333H0z" />
        </defs>
        <g transform="translate(1.333 1.333)" fill="none" fillRule="evenodd">
            <mask id="0cb4wyj9kb" fill="#fff">
                <use xlinkHref="#bzt818o31a" />
            </mask>
            <path
                d="M1.274.796a.473.473 0 0 0-.433.243.334.334 0 0 0 .034.365l4.87 6.59c.15.201.228.437.228.682v3.798l1.164-.559c.148-.071.24-.205.24-.348L7.362 8.68a1.138 1.138 0 0 1 .226-.687l4.87-6.589a.334.334 0 0 0 .034-.365.473.473 0 0 0-.434-.243H1.274zm4.588 12.537a.71.71 0 0 1-.377-.108.654.654 0 0 1-.313-.556V8.676a.352.352 0 0 0-.072-.21L.23 1.876A1.121 1.121 0 0 1 .125.68C.34.26.78 0 1.274 0h10.785c.495 0 .935.26 1.148.68.2.392.161.839-.103 1.196l-4.87 6.588a.352.352 0 0 0-.07.212l.013 2.887c.003.453-.263.863-.692 1.069l-1.313.63a.719.719 0 0 1-.31.071z"
                fill={color}
                mask="url(#0cb4wyj9kb)"
            />
        </g>
    </svg>
);
