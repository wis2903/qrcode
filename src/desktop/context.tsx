import React from 'react';

import { OrderScanningModeEnum, OrderStatusEnum } from './_type';

export interface IAppContextState {
    orders: {
        isFetching: boolean;
        isExporting: boolean;
        total: number;
        page: number;
        size: number;
        timestamp: number;
        records: Record<string, unknown>[];
        filters: {
            search: string;
            status: OrderStatusEnum | undefined;
            createdDateFrom: Date | undefined;
            createdDateTo: Date | undefined;
        };
    };
    scanner: {
        mode: OrderScanningModeEnum;
        text: string;
        isPlaying: boolean;
        isProcessing: boolean;
        isProcessedSuccess: boolean;
        isProcessedFailed: boolean;
        isConnectedDevice: boolean;
    };
}

export interface IAppContext {
    state: IAppContextState;
    setState: React.Dispatch<React.SetStateAction<IAppContextState>>;
}

export const APP_CONTEXT_INITIAL_STATE: IAppContextState = {
    orders: {
        isFetching: true,
        isExporting: false,
        total: 0,
        page: 0,
        size: 20,
        timestamp: +new Date(),
        records: [],
        filters: {
            search: '',
            status: undefined,
            createdDateFrom: undefined,
            createdDateTo: undefined,
        },
    },
    scanner: {
        isPlaying: false,
        isProcessing: false,
        isProcessedSuccess: false,
        isProcessedFailed: false,
        isConnectedDevice: false,
        mode: OrderScanningModeEnum.Pack,
        text: '',
    },
};

export const AppContext = React.createContext<IAppContext>({
    state: APP_CONTEXT_INITIAL_STATE,
    setState: () => undefined,
});

export const useAppContext = (): IAppContext => React.useContext(AppContext);
