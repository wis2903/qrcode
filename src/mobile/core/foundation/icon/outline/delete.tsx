import { token } from '../../token';
import { IIconProps } from '../type';

export const DeleteIconOutline = ({
    width = 20,
    height = 20,
    color = token.get<string>('global.color.grey-1'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.263 2c.93 0 1.684.716 1.684 1.6h4.632A.41.41 0 0 1 18 4c0 .22-.189.4-.421.4h-1.263v11.2c0 1.325-1.131 2.4-2.527 2.4H6.211c-1.396 0-2.527-1.075-2.527-2.4V4.4H2.421A.41.41 0 0 1 2 4c0-.22.189-.4.421-.4h4.632c0-.884.754-1.6 1.684-1.6h2.526zm4.21 2.4H4.527v11.2c0 .843.687 1.535 1.559 1.596l.126.004h7.578c.888 0 1.616-.653 1.68-1.48l.005-.12V4.4zM8.317 7.6a.41.41 0 0 1 .42.4v5.6c0 .22-.188.4-.42.4a.41.41 0 0 1-.421-.4V8c0-.22.188-.4.42-.4zm3.368 0a.41.41 0 0 1 .421.4v5.6c0 .22-.188.4-.42.4a.41.41 0 0 1-.422-.4V8c0-.22.189-.4.421-.4zm-.42-4.8H8.736c-.432 0-.788.309-.837.707l-.005.093h4.21c0-.41-.325-.748-.744-.795l-.098-.005z"
            fill={color}
            fillRule="nonzero"
        />
    </svg>
);
