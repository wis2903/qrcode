/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import React from 'react';
import OrderScreen from './screen/order';
import ScanScreen from './screen/scan';
import SignInScreen from '../shared/component/sign-in';

import { AuthProvider, useAuthProvider } from '../shared/provider/auth';
import { AutoUpdateProvider } from '../shared/provider/auto-update';
import { DialogProvider } from './core/component/dialog/provider';
import { token } from './core/foundation/token';
import { FullScreenLoader } from './shared/component/full-screen-loader';

export default (): JSX.Element => {
    return (
        <DialogProvider>
            <Root>
                <RouterControlledByStateWithProviders />
            </Root>
        </DialogProvider>
    );
};

const Container = ({ children }: React.PropsWithChildren): JSX.Element => {
    return <div className="app-container">{children}</div>;
};

const Root = ({ children }: React.PropsWithChildren): JSX.Element => (
    <div
        className={token.get<string>('global.util.root.class')}
        id={token.get<string>('global.util.root.id')}
    >
        {children}
    </div>
);

const RouterControlledByStateWithProviders = (): JSX.Element => (
    <AuthProvider>
        <AutoUpdateProvider>
            <RouterControlledByState />
        </AutoUpdateProvider>
    </AuthProvider>
);

const RouterControlledByState = (): JSX.Element => {
    const authProvider = useAuthProvider();

    const [screen, setScreen] = React.useState<string>('order');

    if (authProvider.isAuthenticating) return <FullScreenLoader />;
    if (!authProvider.isAuthenticated) return <SignInScreen />;

    switch (screen) {
        case 'order':
            return (
                <Container>
                    <OrderScreen onRequestScan={(): void => setScreen('scan')} />
                </Container>
            );
        case 'scan':
            return (
                <Container>
                    <ScanScreen onClose={(): void => setScreen('order')} />
                </Container>
            );
        default:
            return <></>;
    }
};
