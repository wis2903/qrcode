import { token } from '../core/foundation/token';

export const QRCodeIcon = ({
    color,
    width = '32px',
    height = '32px',
}: {
    color?: string;
    width?: string;
    height?: string;
}): JSX.Element => (
    <svg
        width={width}
        height={height}
        preserveAspectRatio="xMinYMin"
        viewBox="-2 -2 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill={color || token.get<string>('global.color.grey-1')}
            d="m13 18h3a2 2 0 0 0 2-2v-3a1 1 0 0 1 2 0v3a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4-4v-3a1 1 0 0 1 2 0v3a2 2 0 0 0 2 2h3a1 1 0 0 1 0 2h6a1 1 0 0 1 0-2zm-11-11a1 1 0 1 1 -2 0v-3a4 4 0 0 1 4-4h3a1 1 0 1 1 0 2h-3a2 2 0 0 0 -2 2zm16 0v-3a2 2 0 0 0 -2-2h-3a1 1 0 0 1 0-2h3a4 4 0 0 1 4 4v3a1 1 0 0 1 -2 0z"
        />
    </svg>
);
