/* eslint-disable import/no-anonymous-default-export */
import './App.css';

import React from 'react';
import OrderScreen from './screen/order';
import ScanScreen from './screen/scan';

import { DialogProvider } from './core/component/dialog/provider';
import { token } from './core/foundation/token';

export default (): JSX.Element => {
    return (
        <DialogProvider>
            <div
                className={token.get<string>('global.util.root.class')}
                id={token.get<string>('global.util.root.id')}
            >
                <Comp />
            </div>
        </DialogProvider>
    );
};

const Comp = (): JSX.Element => {
    const [screen, setScreen] = React.useState<string>('order');

    switch (screen) {
        case 'order':
            return <OrderScreen onRequestScan={(): void => setScreen('scan')} />;
        case 'scan':
            return <ScanScreen onClose={(): void => setScreen('order')} />;
        default:
            return <></>;
    }
};
