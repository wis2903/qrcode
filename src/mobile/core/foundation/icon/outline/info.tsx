import { token } from '../../token';
import { IIconProps } from '../type';

export const InfoIconOutline = ({
    width = 16,
    height = 16,
    color = token.get<string>('global.color.grey-2'),
}: IIconProps): JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
            <path d="M8 4.414a.64.64 0 1 0 0 1.28.64.64 0 0 0 0-1.28" fill={color}></path>
            <path
                d="M8 4.414a.64.64 0 1 0 0 1.28.64.64 0 0 0 0-1.28z"
                stroke={color}
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M8.077 6.946h-.154a.563.563 0 0 0-.563.563v3.788c0 .311.252.563.563.563h.154a.563.563 0 0 0 .563-.563V7.509a.563.563 0 0 0-.563-.563"
                fill={color}
            ></path>
            <path
                d="M8.077 6.946h-.154a.563.563 0 0 0-.563.563v3.788c0 .311.252.563.563.563h.154a.563.563 0 0 0 .563-.563V7.509a.563.563 0 0 0-.563-.563z"
                stroke={color}
                strokeWidth={0.5}
            ></path>
            <path
                d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6m0 .768A5.638 5.638 0 0 1 13.632 8 5.638 5.638 0 0 1 8 13.632 5.638 5.638 0 0 1 2.368 8 5.638 5.638 0 0 1 8 2.368"
                fill={color}
            ></path>
        </g>
    </svg>
);
