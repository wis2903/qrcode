/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import axios from 'axios';
import React from 'react';

import { ButtonComponent } from '../../core/component/button';
import { DatePickerComponent } from '../../core/component/datepicker';
import { useDialogProvider } from '../../core/component/dialog/provider';
import { DividerComponent } from '../../core/component/divider';
import { FlexboxComponent } from '../../core/component/flexbox';
import { PaginationComponent } from '../../core/component/pagination';
import { PlainTextComponent } from '../../core/component/plain';
import { ScrollAreaComponent } from '../../core/component/scrollarea';
import { SkeletonComponent } from '../../core/component/skeleton';
import { TextboxComponent } from '../../core/component/textbox';
import { DownloadIconOutline } from '../../core/foundation/icon/outline/download';
import { SearchIconOutline } from '../../core/foundation/icon/outline/search';
import { token } from '../../core/foundation/token';
import { FlexboxVariant } from '../../core/shared/constant';
import { PandaDate } from '../../core/shared/lib/date';
import { PandaDebouncer } from '../../core/shared/lib/debouncer';
import { PandaObject } from '../../core/shared/lib/object';
import { DialogTypeEnum } from '../../core/shared/type';
import { formatNumber } from '../../core/shared/util';
import { QRCodeIcon } from '../../icon/qr-code';

interface IOrderScreenProps {
    onRequestScan?: VoidFunction;
}
interface IHandleFetchingOrdersResult {
    total: number;
    records: Record<string, unknown>[];
}

export default ({ onRequestScan }: IOrderScreenProps): JSX.Element => {
    const dialog = useDialogProvider();

    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(500));
    const [fetching, setFetching] = React.useState<boolean>(true);
    const [orders, setOrders] = React.useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [createdFrom, setCreatedFrom] = React.useState<Date | undefined>();
    const [createdTo, setCreatedTo] = React.useState<Date | undefined>();
    const [keyword, setKeyword] = React.useState<string>('');
    const [limit] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(0);

    const generateSearchUrlForCallingAPI = (config?: { forExporting: boolean }): string => {
        let url = `https://api.goku.dev/api/v1/pack-order${config?.forExporting ? '/export' : ''}`;
        if (!config?.forExporting) url += `?limit=${limit}&page=${page + 1}`;
        else url += `?ts=${+new Date()}`;
        if (keyword) url += `&keyword=${keyword}`;

        const _createdFrom = createdFrom || new Date('2000/01/01');
        const _createdTo = createdTo || PandaDate.today.endOfTheDay.raw;
        url += `&date_created_from=${new PandaDate(_createdFrom).beginOfTheDay.raw.toISOString()}`;
        url += `&date_created_to=${new PandaDate(_createdTo).endOfTheDay.raw.toISOString()}`;
        return url;
    };

    const handleFetchingOrders = async (): Promise<IHandleFetchingOrdersResult> => {
        try {
            const response = await axios.get(generateSearchUrlForCallingAPI());
            const data = response.data.data;
            return {
                total: Number(response.data.total) || 0,
                records: Array.isArray(data) ? data : [],
            };
        } catch (e) {
            return {
                total: 0,
                records: [],
            };
        }
    };

    const handleExportOrders = async (): Promise<void> => {
        dialog.setLoading(true);
        dialog.open({ content: '' });
        try {
            const url = generateSearchUrlForCallingAPI({ forExporting: true });
            const response = await axios.get(url);

            const invisibleDownloadButton = document.createElement('a');
            invisibleDownloadButton.setAttribute(
                'href',
                'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURI(response.data)
            );
            invisibleDownloadButton.setAttribute('download', `scanned-orders-${+new Date()}.csv`);
            setTimeout(() => {
                invisibleDownloadButton.click();
                dialog.setLoading(false);
                dialog.close();
            }, 500);
        } catch (e) {
            console.log(e);
            dialog.setLoading(false);
            dialog.open({
                type: DialogTypeEnum.error,
                content: 'An error occurred while exporting orders',
            });
        }

        // const countingTotalResponse = await handleFetchingOrders({
        //     page: 0,
        //     limit: 1,
        // });
        // const numberOfRequests = Math.ceil(countingTotalResponse.total / limit);
        // let results: Record<string, unknown>[] = [];
        // for (let i = 0; i < numberOfRequests; i++) {
        //     const fetchingOrdersResponse = await handleFetchingOrders({ page: i, limit });
        //     results = results.concat(fetchingOrdersResponse.records);
        // }
        // setTimeout(() => {
        //     CSV.downloadFromJson({
        //         name: `scanned-orders-${+new Date()}`,
        //         data: results
        //             .map((item) => new PandaObject(item))
        //             .map((item) => ({
        //                 'PO number': CSV.formatValueAdvance(`'${String(item.get('po_number'))}`),
        //                 'Created date': CSV.formatValueAdvance(
        //                     new PandaDate(
        //                         String(item.get('date_created'))
        //                     ).toDateTimeStringWithoutComma()
        //                 ),
        //             })),
        //     });
        //     dialog.setLoading(false);
        //     dialog.close();
        // }, 500);
    };

    React.useEffect(() => {
        setFetching(true);
        handleFetchingOrders().then(({ total: _total, records: _records }) => {
            debouncer.execute(() => {
                setTotal(_total);
                setOrders(_records);
                setFetching(false);
            });
        });
    }, [
        JSON.stringify({
            keyword,
            createdFrom,
            createdTo,
            page,
        }),
    ]);

    React.useEffect(() => {
        return (): void => {
            debouncer.destroy();
        };
    }, []);

    return (
        <>
            <FlexboxComponent
                width="100%"
                gap="8px"
                padding="16px 16px"
                align={FlexboxVariant.alignment.center}
                justify={FlexboxVariant.alignment.justify}
                style={{
                    boxShadow:
                        'rgba(50, 50, 93, 0.1) 0px 0px 8px 0px, rgba(0, 0, 0, 0.1) 0px 3px 7px -3px',
                }}
            >
                <PlainTextComponent
                    ellipsis
                    whiteSpace="nowrap"
                    width="140px"
                    minWidth="140px"
                    text={`Orders ${total ? `(${formatNumber(total)})` : ''}`}
                    fontSize="20px"
                    fontWeight="bold"
                />
                <FlexboxComponent width="100%" gap="8px" justify={FlexboxVariant.alignment.end}>
                    <ButtonComponent onClick={handleExportOrders}>
                        <DownloadIconOutline width={16} height={16} />
                        Export
                    </ButtonComponent>
                    <ButtonComponent primary onClick={onRequestScan}>
                        <QRCodeIcon width="16px" height="16px" color="white" />
                        <PlainTextComponent
                            ellipsis
                            whiteSpace="nowwrap"
                            margin="-1px 0 0"
                            text="Scan"
                        />
                    </ButtonComponent>
                </FlexboxComponent>
            </FlexboxComponent>

            <FlexboxComponent
                width="100%"
                padding="16px"
                gap="20px"
                direction={FlexboxVariant.direction.column}
            >
                <FlexboxComponent
                    width="100%"
                    gap="8px"
                    direction={FlexboxVariant.direction.column}
                >
                    <FlexboxComponent width="100%" gap="8px">
                        <DatePickerComponent
                            clearable
                            width="50%"
                            placeholder="Created from"
                            label={!!createdFrom ? 'Created from' : ''}
                            value={createdFrom}
                            max={
                                createdTo
                                    ? new PandaDate(createdTo).endOfTheDay.raw
                                    : new PandaDate().endOfTheDay.raw
                            }
                            onChange={(dt): void => {
                                setPage(0);
                                setCreatedFrom(dt);
                            }}
                        />
                        <DatePickerComponent
                            clearable
                            width="50%"
                            placeholder="Created to"
                            label={!!createdTo ? 'Created to' : ''}
                            value={createdTo}
                            max={new PandaDate().endOfTheDay.raw}
                            min={
                                createdFrom
                                    ? new PandaDate(createdFrom).beginOfTheDay.raw
                                    : undefined
                            }
                            onChange={(dt): void => {
                                setPage(0);
                                setCreatedTo(dt);
                            }}
                        />
                    </FlexboxComponent>

                    <FlexboxComponent width="100%">
                        <TextboxComponent
                            clearable
                            width="100%"
                            placeholder="Search"
                            suffix={<SearchIconOutline width={18} height={18} />}
                            onChange={(e): void => {
                                setPage(0);
                                setKeyword(e.target.value || '');
                            }}
                        />
                    </FlexboxComponent>
                </FlexboxComponent>

                <ScrollAreaComponent
                    width="100%"
                    maxHeight="calc(100svh - 240px)"
                    gap="12px"
                    padding="12px"
                    borderRadius="4px"
                    borderWidth="1px"
                    borderColor={token.get<string>('global.color.grey-7')}
                    direction={FlexboxVariant.direction.column}
                >
                    {fetching ? (
                        Array.from({ length: 10 }).map((_, idx) => (
                            <React.Fragment key={idx}>
                                <FlexboxComponent
                                    width="100%"
                                    gap="8px"
                                    padding='2px 0'
                                    direction={FlexboxVariant.direction.column}
                                >
                                    <SkeletonComponent width="50%" />
                                    <SkeletonComponent width="100%" />
                                </FlexboxComponent>
                                {idx !== 9 && (
                                    <DividerComponent
                                        color={token.get<string>('global.color.grey-7')}
                                    />
                                )}
                            </React.Fragment>
                        ))
                    ) : orders.length ? (
                        orders
                            .map((order) => new PandaObject(order))
                            .map((order, idx) => (
                                <React.Fragment key={order.get('id')}>
                                    <FlexboxComponent direction={FlexboxVariant.direction.column}>
                                        <PlainTextComponent
                                            ellipsis
                                            width="100%"
                                            whiteSpace="nowrap"
                                            text={`PO #${order.get('po_number')}`}
                                        />
                                        <PlainTextComponent
                                            ellipsis
                                            width="100%"
                                            whiteSpace="nowrap"
                                            color={token.get<string>('global.color.grey-3')}
                                            text={`Created at ${new PandaDate(
                                                String(order.get('date_created'))
                                            ).toDateTimeString()}`}
                                        />
                                    </FlexboxComponent>
                                    {idx !== orders.length - 1 && (
                                        <DividerComponent
                                            color={token.get<string>('global.color.grey-7')}
                                        />
                                    )}
                                </React.Fragment>
                            ))
                    ) : (
                        <PlainTextComponent
                            text="No records found"
                            color={token.get<string>('global.color.grey-3')}
                        />
                    )}
                </ScrollAreaComponent>

                <PaginationComponent
                    disabledPageSizeControl
                    pageSize={limit}
                    width="100%"
                    total={total}
                    value={page}
                    onChange={({ value }): void => {
                        setPage(value);
                    }}
                />
            </FlexboxComponent>
        </>
    );
};
