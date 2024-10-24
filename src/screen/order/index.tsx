/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

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
import { OutIconOutline } from '../../core/foundation/icon/outline/out';
import { SearchIconOutline } from '../../core/foundation/icon/outline/search';
import { token } from '../../core/foundation/token';
import { FlexboxVariant } from '../../core/shared/constant';
import { PandaDate } from '../../core/shared/lib/date';
import { PandaObject } from '../../core/shared/lib/object';
import { DialogTypeEnum } from '../../core/shared/type';
import { formatNumber } from '../../core/shared/util';
import { QRCodeIcon } from '../../icon/qr-code';
import { useAuthProvider } from '../../shared/provider/auth';
import { axiosInstanceWithAccessToken } from '../../shared/util/axios-instance';

import {
    DropdownComponent,
    DropdownComponentContent,
    DropdownComponentItem,
    DropdownComponentMenu,
    DropdownComponentTrigger,
} from '../../core/component/dropdown';

interface IOrderScreenProps {
    onRequestScan?: VoidFunction;
}
interface IHandleFetchingOrdersResult {
    total: number;
    records: Record<string, unknown>[];
}

export default ({ onRequestScan }: IOrderScreenProps): JSX.Element => {
    const dialog = useDialogProvider();

    const [fetching, setFetching] = React.useState<boolean>(true);
    const [orders, setOrders] = React.useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [createdFrom, setCreatedFrom] = React.useState<Date | undefined>();
    const [createdTo, setCreatedTo] = React.useState<Date | undefined>();
    const [keyword, setKeyword] = React.useState<string>('');
    const [limit] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(0);

    const generateSearchUrlForCallingAPI = (config?: { forExporting: boolean }): string => {
        let url = `/api/v1/pack-order${config?.forExporting ? '/export' : ''}`;
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
            const response = await axiosInstanceWithAccessToken.get(
                generateSearchUrlForCallingAPI()
            );
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
            const response = await axiosInstanceWithAccessToken.get(url);

            const invisibleDownloadButton = document.createElement('a');
            invisibleDownloadButton.setAttribute(
                'href',
                'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURI(response.data)
            );
            invisibleDownloadButton.setAttribute('download', `scanned-orders-${+new Date()}.csv`);
            invisibleDownloadButton.click();
            dialog.setLoading(false);
            dialog.close();
        } catch (e) {
            console.log(e);
            dialog.setLoading(false);
            dialog.open({
                type: DialogTypeEnum.error,
                content: 'An error occurred while exporting orders',
            });
        }
    };

    React.useEffect(() => {
        setFetching(true);
        handleFetchingOrders().then(({ total: _total, records: _records }) => {
            setTotal(_total);
            setOrders(_records);
            setFetching(false);
        });
    }, [
        JSON.stringify({
            keyword,
            createdFrom,
            createdTo,
            page,
        }),
    ]);

    return (
        <FlexboxComponent
            width="100%"
            minHeight="100vh"
            backgroundColor="white"
            direction={FlexboxVariant.direction.column}
        >
            <Header />
            <FlexboxComponent
                width="100%"
                gap="8px"
                padding="16px 16px 0"
                align={FlexboxVariant.alignment.center}
                justify={FlexboxVariant.alignment.justify}
            >
                <PlainTextComponent
                    ellipsis
                    whiteSpace="nowrap"
                    width="140px"
                    minWidth="140px"
                    text={`Orders ${total ? `(${formatNumber(total)})` : ''}`}
                    fontSize="18px"
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
                    maxHeight={total > 10 ? 'calc(100svh - 280px)' : 'calc(100svh - 240px)'}
                    backgroundColor="white"
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
                                    padding="2px 0"
                                    direction={FlexboxVariant.direction.column}
                                >
                                    <SkeletonComponent width="60%" height="20px" />
                                    <SkeletonComponent width="80%" height="12px" />
                                    <SkeletonComponent width="80%" height="12px" />
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
                                            fontSize="13px"
                                            text={`Scanned at ${new PandaDate(
                                                String(order.get('date_created'))
                                            ).toDateTimeString()}`}
                                        />
                                        {!!order.get('created_user_id') && (
                                            <PlainTextComponent
                                                ellipsis
                                                width="100%"
                                                whiteSpace="nowrap"
                                                color={token.get<string>('global.color.grey-3')}
                                                fontSize="13px"
                                                text={`Scanned by ${String(
                                                    order.get('created_user_id')
                                                )}`}
                                            />
                                        )}
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
        </FlexboxComponent>
    );
};

const Header = (): JSX.Element => {
    const authProvider = useAuthProvider();

    return (
        <FlexboxComponent
            width="100%"
            gap="8px"
            padding="8px 16px"
            backgroundColor="white"
            align={FlexboxVariant.alignment.center}
            justify={FlexboxVariant.alignment.justify}
            style={{
                boxShadow:
                    'rgba(50, 50, 93, 0.1) 0px 0px 8px 0px, rgba(0, 0, 0, 0.1) 0px 3px 7px -3px',
            }}
        >
            <PlainTextComponent
                ellipsis
                width="240px"
                minWidth="240px"
                whiteSpace="nowrap"
                text="Panda scanning"
                fontSize="20px"
                fontWeight="bold"
            />
            <DropdownComponent closeOnClickInside toggleOnClickTrigger>
                <DropdownComponentTrigger>
                    <FlexboxComponent
                        width="40px"
                        height="40px"
                        borderRadius="50%"
                        backgroundColor={token.get<string>('global.color.grey-7')}
                        align={FlexboxVariant.alignment.center}
                        justify={FlexboxVariant.alignment.center}
                    >
                        <PlainTextComponent
                            fontSize="20px"
                            fontWeight="bold"
                            text={String(authProvider.profile?.email || '')
                                .substring(0, 1)
                                .toUpperCase()}
                        />
                    </FlexboxComponent>
                </DropdownComponentTrigger>

                <DropdownComponentContent>
                    <DropdownComponentMenu>
                        <>
                            {authProvider.profile?.email && (
                                <FlexboxComponent
                                    width="100%"
                                    padding="8px 12px 0"
                                    gap="8px"
                                    direction={FlexboxVariant.direction.column}
                                >
                                    <PlainTextComponent
                                        ellipsis
                                        whiteSpace="nowrap"
                                        width="100%"
                                        maxWidth="280px"
                                        text={String(authProvider.profile?.email || '')}
                                    />
                                    <DividerComponent />
                                </FlexboxComponent>
                            )}
                            <DropdownComponentItem onClick={authProvider.signOut}>
                                Sign out
                                <FlexboxComponent
                                    justify={FlexboxVariant.alignment.end}
                                    width="40px"
                                    margin="4px 0 0"
                                >
                                    <OutIconOutline />
                                </FlexboxComponent>
                            </DropdownComponentItem>
                        </>
                    </DropdownComponentMenu>
                </DropdownComponentContent>
            </DropdownComponent>
        </FlexboxComponent>
    );
};
