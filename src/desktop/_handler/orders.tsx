/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { axiosInstanceWithAccessToken } from '../../shared/util';
import { useAppContext } from '../context';
import { PandaDate } from '../core/shared/lib/date';

interface IHandleFetchOrdersListConfig {
    export?: boolean;
}

export const useHandleFetchOrdersList = (): ((config?: IHandleFetchOrdersListConfig) => Promise<void>) => {
    const appCtx = useAppContext();

    return async (config) => {
        const { page, size, filters } = appCtx.state.orders;
        const { search, status, createdDateFrom, createdDateTo } = filters;

        let url = `/api/v1/pack-order${config?.export ? '/export' : ''}`;
        url += `?limit=${size}&page=${page + 1}`;

        if (search) url += `&keyword=${search}`;
        if (status) url += `&status=${status}`;

        const createdDateFromAsPandaDate = new PandaDate(createdDateFrom || new Date('1970/01/01'));
        const createdDateToAsPandaDate = new PandaDate(createdDateTo || new Date());
        url += `&date_created_from=${createdDateFromAsPandaDate.beginOfTheDay.raw.toISOString()}`;
        url += `&date_created_to=${createdDateToAsPandaDate.endOfTheDay.raw.toISOString()}`;

        try {
            if (!config?.export) {
                //
            } else {
                appCtx.setState((current) => {
                    const _cloned = { ...current };
                    _cloned.orders.isExporting = true;
                    return _cloned;
                });
            }

            const response = await axiosInstanceWithAccessToken.get(url);
            const data = response.data.data;

            if (!config?.export && !Array.isArray(data)) throw new Error();

            if (!config?.export) {
                appCtx.setState((current) => {
                    const _cloned = { ...current };
                    _cloned.orders.total = Number(response.data.total) || 0;
                    _cloned.orders.records = data;
                    _cloned.orders.isFetching = false;
                    return _cloned;
                });
            } else {
                const invisibleDownloadButton = document.createElement('a');
                invisibleDownloadButton.setAttribute(
                    'href',
                    'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURI(response.data)
                );
                invisibleDownloadButton.setAttribute('download', `scanned-orders-${+new Date()}.csv`);
                invisibleDownloadButton.click();

                appCtx.setState((current) => {
                    const _cloned = { ...current };
                    _cloned.orders.isExporting = false;
                    return _cloned;
                });
            }
        } catch (e) {
            if (!config?.export) {
                appCtx.setState((current) => {
                    const _cloned = { ...current };
                    _cloned.orders.total = 0;
                    _cloned.orders.records = [];
                    _cloned.orders.isFetching = false;
                    return _cloned;
                });
            } else {
                appCtx.setState((current) => {
                    const _cloned = { ...current };
                    _cloned.orders.isExporting = false;
                    return _cloned;
                });
            }
        }
    };
};

export const useHandleOrdersListEvents = (): void => {
    const appCtx = useAppContext();
    const mountedRef = React.useRef<boolean>(false);

    const handleFetchOrdersList = useHandleFetchOrdersList();

    React.useEffect(() => {
        if (!mountedRef.current) return;
        appCtx.setState((current) => {
            const _cloned = { ...current };
            _cloned.orders.timestamp = +new Date();
            if (!current.orders.page) {
                _cloned.orders.isFetching = true;
                return _cloned;
            }

            _cloned.orders.page = 0;
            return _cloned;
        });
    }, [
        appCtx.state.orders.filters.search,
        appCtx.state.orders.filters.status,
        appCtx.state.orders.filters.createdDateFrom,
        appCtx.state.orders.filters.createdDateTo,
    ]);

    React.useEffect(() => {
        if (!mountedRef.current) return;
        handleFetchOrdersList();
    }, [appCtx.state.orders.timestamp]);

    React.useEffect(() => {
        if (!mountedRef.current) return;
        appCtx.setState((current) => {
            const _cloned = { ...current };
            _cloned.orders.isFetching = true;
            return _cloned;
        });
        handleFetchOrdersList();
    }, [appCtx.state.orders.page]);

    React.useEffect(() => {
        handleFetchOrdersList().then(() => {
            mountedRef.current = true;
        });
    }, []);
};
