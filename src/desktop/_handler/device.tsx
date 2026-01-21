import React from 'react';

import { IAppContextState, useAppContext } from '../context';
import { useHandleToggleScanning } from './scanner';

let port: any;
let timeout: NodeJS.Timeout | undefined = undefined;
let barcodeFromSerialPort = '';

export const useHandleConnectDevice = (): VoidFunction => {
    const appCtx = useAppContext();
    const appCtxStateRef = React.useRef<IAppContextState>(appCtx.state);

    const { submit: handleSubmitBarcode } = useHandleToggleScanning();

    React.useEffect(() => {
        appCtxStateRef.current = appCtx.state;
    }, [appCtx.state]);

    React.useEffect(() => {
        return (): void => {
            clearTimeout(timeout);
        };
    }, []);

    return async () => {
        if (port) return;

        try {
            port = await (navigator as any).serial.requestPort({
                filters: [{ usbVendorId: 0x067b, usbProductId: 0x2303 }],
            });

            port.addEventListener('disconnect', () => {
                port = undefined;

                appCtx.setState((current) => {
                    const _cloned = { ...current };
                    _cloned.scanner.isConnectedDevice = false;
                    return _cloned;
                });
            });

            await port.open({ baudRate: [115200] });

            appCtx.setState((current) => {
                const _cloned = { ...current };
                _cloned.scanner.isConnectedDevice = true;
                return _cloned;
            });

            const appendStream = new WritableStream({
                write(chunk) {
                    clearTimeout(timeout);

                    barcodeFromSerialPort += chunk;
                    timeout = setTimeout(() => {
                        if (
                            barcodeFromSerialPort &&
                            appCtxStateRef.current.scanner.isPlaying &&
                            !appCtxStateRef.current.scanner.isProcessing
                        ) {
                            handleSubmitBarcode(
                                barcodeFromSerialPort.replace(/(\r)|(\n)|(\r\n)/g, '')
                            );
                        }
                        barcodeFromSerialPort = '';
                    }, 100);
                },
            });

            port.readable.pipeThrough(new TextDecoderStream()).pipeTo(appendStream);
        } catch (e) {
            console.error(e);
            // Handle error
        }
    };
};
