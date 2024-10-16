/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import './App.css';

import axios from 'axios';
import React from 'react';
import env from './env.json';
import OrderScreen from './screen/order';
import ScanScreen from './screen/scan';

import { DialogProvider, useDialogProvider } from './core/component/dialog/provider';
import { PlainTextComponent } from './core/component/plain';
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
    const dialog = useDialogProvider();
    const intervalHandlerRef = React.useRef<NodeJS.Timeout>();

    const [screen, setScreen] = React.useState<string>('order');

    const getLatestVersionFromGithub = async (): Promise<string | undefined> => {
        try {
            const response = await axios.get(
                'https://api.github.com/repos/wis2903/qrcode/releases/latest'
            );
            return String(Object(response.data).name);
        } catch (e) {
            return undefined;
        }
    };

    const handleStartCheckingForUpdates = (): void => {
        intervalHandlerRef.current = setInterval(() => {
            getLatestVersionFromGithub().then((version) => {
                if (env.version !== version) {
                    clearInterval(intervalHandlerRef.current);
                    dialog.open({
                        title: 'New version available',
                        content: (
                            <PlainTextComponent
                                text="New version has been released. Reload app to starting using the latest version"
                                color={token.get<string>('global.color.grey-2')}
                            />
                        ),
                        cancelButtonText: 'Close',
                        confirmButtonText: 'Reload',
                        onClose: handleStartCheckingForUpdates,
                        onCancel: () => {
                            dialog.close();
                            handleStartCheckingForUpdates();
                        },
                        onConfirm: (): void => window.location.reload(),
                    });
                }
            });
        }, 1000 * 60 * 2); // 2 mins
    };

    React.useEffect(() => {
        handleStartCheckingForUpdates();
        return (): void => {
            clearInterval(intervalHandlerRef.current);
        };
    }, []);

    switch (screen) {
        case 'order':
            return <OrderScreen onRequestScan={(): void => setScreen('scan')} />;
        case 'scan':
            return <ScanScreen onClose={(): void => setScreen('order')} />;
        default:
            return <></>;
    }
};
