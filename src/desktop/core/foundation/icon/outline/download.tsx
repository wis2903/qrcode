import { token } from '../../token';
import { IIconProps } from '../type';

export const DownloadIconOutline = ({
    width = 16,
    height = 16,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="h7eu0kqgra" d="M0 0h12v5.571H0z"></path>
        </defs>
        <g fill="none" fillRule="evenodd">
            <path
                d="M11.324 8.157a.356.356 0 0 0-.506 0l-2.462 2.475-.014-8.273A.358.358 0 0 0 7.984 2a.359.359 0 0 0-.357.36l.014 8.269-2.46-2.472a.356.356 0 0 0-.505 0 .36.36 0 0 0 0 .508l3.071 3.087c.033.033.073.06.117.078l.006.002a.353.353 0 0 0 .26 0l.006-.002a.357.357 0 0 0 .117-.078l3.07-3.087a.36.36 0 0 0 0-.508"
                fill={color}
            ></path>
            <g transform="translate(2 8.429)">
                <mask id="r99z8dtufb" fill="#fff">
                    <use xlinkHref="#h7eu0kqgra"></use>
                </mask>
                <path
                    d="M10.342 5.571H1.658C.744 5.571 0 4.885 0 4.041V.362C0 .166.162.008.36.008c.2 0 .362.158.362.353v3.68c0 .455.42.824.936.824h8.684c.516 0 .936-.37.936-.823V.353c0-.195.162-.353.361-.353.2 0 .361.158.361.353v3.689c0 .843-.744 1.53-1.658 1.53"
                    fill={color}
                    mask="url(#r99z8dtufb)"
                ></path>
            </g>
        </g>
    </svg>
);
