import { token } from '../../token';
import { IIconProps } from '../type';

export const SearchIconOutline = ({ width, height, color }: IIconProps): JSX.Element => (
    <svg
        width={width || 16}
        height={height || 16}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <path id="x0negtlqoa" d="M0 0h16v16H0z" />
        </defs>
        <g transform="translate(2 2)" fill="none" fillRule="evenodd">
            <mask id="lmdu5wghmb" fill="#fff">
                <use xlinkHref="#x0negtlqoa" />
            </mask>
            <path
                d="m14.906 14.844-.054.053a.476.476 0 0 1-.675 0l-2.28-2.296a.48.48 0 0 1 0-.68l.028-.028.027-.027a.472.472 0 0 1 .675 0l2.279 2.297a.485.485 0 0 1 0 .68M.956 6.096C.955 3.265 3.24.962 6.048.962c2.808 0 5.093 2.303 5.093 5.133s-2.285 5.133-5.093 5.133c-2.81 0-5.094-2.302-5.094-5.133m14.626 7.388-2.279-2.297a1.419 1.419 0 0 0-1.013-.423c-.23 0-.449.06-.648.163l-.936-.945a6.096 6.096 0 0 0 1.392-3.886C12.097 2.735 9.384 0 6.05 0 2.713 0 0 2.734 0 6.095c0 3.361 2.713 6.095 6.049 6.095 1.527 0 2.92-.578 3.986-1.522l.93.938a1.44 1.44 0 0 0 .258 1.675l2.279 2.297a1.423 1.423 0 0 0 2.026 0l.053-.054a1.454 1.454 0 0 0 0-2.041"
                fill={color || token.get<string>('global.color.grey-2')}
                mask="url(#lmdu5wghmb)"
            />
        </g>
    </svg>
);
