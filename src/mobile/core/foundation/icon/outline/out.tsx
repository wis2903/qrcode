import { token } from '../../token';
import { IIconProps } from '../type';

export const OutIconOutline = ({
    width = 16,
    height = 16,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <g fill={color} fillRule="evenodd">
            <path d="M18 10.173v-.002a.48.48 0 0 0-.034-.175l-.002-.007a.473.473 0 0 0-.105-.158L13.742 5.7a.478.478 0 0 0-.678 0 .482.482 0 0 0 0 .68l3.302 3.313-11.039.019a.48.48 0 0 0 .001.962h.001l11.032-.02-3.297 3.31a.482.482 0 0 0 .339.821.477.477 0 0 0 .339-.14l4.118-4.133a.481.481 0 0 0 .104-.157l.002-.007a.487.487 0 0 0 .034-.175"></path>
            <path d="M12.28 18H4.078C2.932 18 2 17.008 2 15.79V4.21C2 2.993 2.932 2 4.077 2h8.193a.48.48 0 0 1 0 .962H4.077c-.617 0-1.118.56-1.118 1.249v11.578c0 .689.501 1.249 1.118 1.249h8.204a.48.48 0 0 1 0 .962"></path>
        </g>
    </svg>
);
