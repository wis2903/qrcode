import styled, { keyframes } from 'styled-components';

import { ButtonComponent } from '../../core/component/button';
import { FlexboxComponent } from '../../core/component/flexbox';

const rotate = keyframes`
    100% {
		transform: translate(-50%, -50%) rotate(1turn);
	}
`;

const bounce = keyframes`
    0%{
        border-width: 45px;
    }
    12.5%{
        border-width: 40px;
    }
    25%{
        border-width: 45px;
    }
    37.5%{
        border-width: 40px;
    }
    50%{
        border-width: 45px;
    }
    62.5%{
        border-width: 40px;
    }
    75%{
        border-width: 45px;
    }
    87.5%{
        border-width: 40px;
    }
    100% {
		border-width: 45px;
	}
`;

export const StyledScanScreenContainer = styled(FlexboxComponent)`
    overflow: hidden;
`;

export const StyledScanScreenOverlayLayler = styled(FlexboxComponent)`
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    z-index: 0;
`;

export const StyledCenterBoxContainer = styled(FlexboxComponent)`
    overflow: hidden;
`;

export const StyledCenterBox = styled(FlexboxComponent)`
    &::before {
        content: '';
        z-index: -1;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0deg);
        position: absolute;
        width: 99999px;
        height: 99999px;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-image: conic-gradient(rgba(0, 0, 0, 0), #0747a6, rgba(0, 0, 0, 0) 25%);
        animation: ${rotate} 3s linear infinite;
    }
`;

export const StyledScannerContainer = styled(FlexboxComponent)`
    border: 4px solid white;
    border-radius: 0px;
    overflow: hidden;
    z-index: 1;

    .scanner {
        svg {
            opacity: 0.5;
            animation: ${bounce} 4s linear forwards;

            path {
                stroke: white;
            }
        }
    }
`;

export const StyledCloseButton = styled(ButtonComponent)`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(32%, -32%);
    z-index: 1;
    background-color: white;
    padding: 8px;
`;
