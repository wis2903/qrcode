/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { OrderStatusEnum } from '../../../../_type';
import { useAppContext } from '../../../../context';
import { ChipComponent, GreenChipComponent } from '../../../../core/component/chip';
import { FlexboxComponent } from '../../../../core/component/flexbox';
import { PaginationComponent } from '../../../../core/component/pagination';
import { TableComponent } from '../../../../core/component/table';
import { Alignment } from '../../../../core/shared/constant';
import { PandaDate } from '../../../../core/shared/lib/date';
import { PandaDebouncer } from '../../../../core/shared/lib/debouncer';
import { upperCaseFirtLetter } from '../../../../core/shared/util';

export const MainContentOrderListTable = (): JSX.Element => {
    const appCtx = useAppContext();

    const { page, total, size, records, isFetching } = appCtx.state.orders;
    const { setState } = appCtx;

    const [windowHeight, setWindowHeight] = React.useState<number>(Infinity);
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(500));

    const handleOnWindowResize = React.useCallback((): void => {
        debouncer.execute(() => {
            setWindowHeight(window.innerHeight);
        });
    }, []);

    React.useEffect(() => {
        handleOnWindowResize();
        window.addEventListener('resize', handleOnWindowResize);
    }, []);

    return (
        <>
            <TableComponent
                noBorder
                width="100%"
                loading={isFetching}
                maxHeight={
                    total > size
                        ? windowHeight < 780
                            ? 'max(calc(100vh - 284px), 200px)'
                            : '480px'
                        : windowHeight < 780
                        ? 'max(calc(100vh - 228px), 200px)'
                        : '528px'
                }
                records={records}
                columns={[
                    {
                        title: 'PO number',
                        name: 'po-number',
                        whiteSpace: 'nowrap',
                        maxWidth: '232px',
                        verticalAlign: Alignment.verticle.middle,
                        render: (record) => `PO #${Object(record).po_number}`,
                    },
                    {
                        title: '',
                        name: 'space',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        verticalAlign: Alignment.verticle.middle,
                        loadingPlaceholder: <></>,
                        render: () => <></>,
                    },
                    {
                        title: 'Created by',
                        name: 'created-by',
                        maxWidth: '260px',
                        whiteSpace: 'nowrap',
                        verticalAlign: Alignment.verticle.middle,
                        render: (record) => Object(record).created_user_id,
                    },
                    {
                        title: 'Created at',
                        name: 'created-at',
                        whiteSpace: 'nowrap',
                        verticalAlign: Alignment.verticle.middle,
                        render: (record) =>
                            new PandaDate(Object(record).date_created).toDateTimeString(),
                    },
                    {
                        title: 'Status',
                        name: 'status',
                        whiteSpace: 'nowrap',
                        verticalAlign: Alignment.verticle.middle,
                        render: (record): React.ReactNode => {
                            switch (Object(record).status) {
                                case OrderStatusEnum.Shipped:
                                    return <GreenChipComponent>Shipped</GreenChipComponent>;
                                default:
                                    return (
                                        <ChipComponent>
                                            {upperCaseFirtLetter(record.status)}
                                        </ChipComponent>
                                    );
                            }
                        },
                    },
                ]}
            />
            {total > size && (
                <FlexboxComponent
                    width="100%"
                    padding="12px 16px"
                    borderWidth="1px 0 0"
                    borderColor="#e5e5e5"
                >
                    <PaginationComponent
                        disabledPageSizeControl
                        minimal
                        value={page}
                        total={total}
                        pageSize={size}
                        width="100%"
                        onChange={({ value }): void => {
                            setState((current) => {
                                const _cloned = { ...current };
                                _cloned.orders.page = value;
                                return _cloned;
                            });
                        }}
                    />
                </FlexboxComponent>
            )}
        </>
    );
};
