import styled from 'styled-components';

import { useAppContext } from '../../context';
import { OrderScanningModeEnum } from '../../_type';

const StyledRightPanelSelection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        background-color: #dfdfdf;
        color: #888888;
        font-weight: 500;
        border: 0;
        width: 100%;
        padding: 8px 6px 6px;
        position: relative;
        cursor: pointer;
        outline: none;

        &:hover {
            background-color: #d5d5d5;
        }

        &:first-child {
            border-radius: 4px 0 0 4px;
        }

        &:last-child {
            border-radius: 0 4px 4px 0;
        }

        &.active {
            background-color: #4f5999;
            color: #ffffff;

            &::before {
                content: '';
                position: absolute;
                bottom: calc(100% + 10px);
                left: 50%;
                transform: translateX(-50%);
                width: 14px;
                height: 8px;
                background: #4f5999;
                clip-path: polygon(50% 100%, 0 0, 100% 0);
            }
        }
    }
`;

export const RightPanelSelection = (): JSX.Element => {
    const appCtx = useAppContext();

    return (
        <StyledRightPanelSelection>
            {[
                { label: 'Pack', value: OrderScanningModeEnum.Pack },
                { label: 'Ship', value: OrderScanningModeEnum.Ship },
            ].map((item) => (
                <button
                    key={item.value}
                    className={appCtx.state.scanner.mode === item.value ? 'active' : ''}
                    onClick={(): void => {
                        appCtx.setState((current) => {
                            const _cloned = { ...current };
                            _cloned.scanner.mode = item.value;
                            return _cloned;
                        });
                    }}
                >
                    {item.label}
                </button>
            ))}
        </StyledRightPanelSelection>
    );
};
