import styled from 'styled-components';

import { useHandleFetchOrdersList } from '../../../_handler/orders';
import { useAppContext } from '../../../context';
import { FlexboxComponent } from '../../../core/component/flexbox';
import { DownloadIconOutline } from '../../../core/foundation/icon/outline/download';
import { ReloadIconOutline } from '../../../core/foundation/icon/outline/reload';
import { SpinnerIconOutline } from '../../../core/foundation/icon/outline/spinner';
import { FlexboxVariant } from '../../../core/shared/constant';
import { formatNumber } from '../../../core/shared/util';

const StyledMainContentPageTitle = styled.div`
    width: 100%;
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        padding: 0;
        white-space: nowrap;
    }

    button {
        border: 1px solid #e3e3e3;
        border-radius: 25px;
        background: #ffffff;
        outline: 0;
        padding: 6px 16px 4px;
        height: 30px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        gap: 4px;

        span {
            display: inline-block;
            height: 16px;
            margin-top: -2px;
        }

        &:hover {
            background-color: #f8f8f8;
        }
    }
`;

export const MainContentPageTitle = (): JSX.Element => {
    const appCtx = useAppContext();

    const handleFetchOrdersList = useHandleFetchOrdersList();

    return (
        <StyledMainContentPageTitle>
            <h3>
                Orders{' '}
                {appCtx.state.orders.total ? `(${formatNumber(appCtx.state.orders.total)})` : ''}
            </h3>
            <FlexboxComponent width="100%" gap="8px" justify={FlexboxVariant.alignment.end}>
                <button
                    onClick={(): void => {
                        appCtx.setState((current) => {
                            const _cloned = { ...current };
                            _cloned.orders.isFetching = true;
                            _cloned.orders.timestamp = +new Date();
                            return _cloned;
                        });
                    }}
                >
                    <span>
                        <ReloadIconOutline width={17} height={17} />
                    </span>
                    Refresh
                </button>

                <button
                    onClick={
                        appCtx.state.orders.isExporting
                            ? undefined
                            : (): void => {
                                  handleFetchOrdersList({ export: true });
                              }
                    }
                >
                    {appCtx.state.orders.isExporting ? (
                        <SpinnerIconOutline width={16} height={16} />
                    ) : (
                        <>
                            <span>
                                <DownloadIconOutline />
                            </span>
                            Export
                        </>
                    )}
                </button>
            </FlexboxComponent>
        </StyledMainContentPageTitle>
    );
};
