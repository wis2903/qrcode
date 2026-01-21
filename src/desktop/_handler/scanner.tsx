/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { axiosInstanceWithAccessToken } from '../../shared/util';
import { OrderScanningModeEnum } from '../_type';
import { IAppContextState, useAppContext } from '../context';
import { PandaObject } from '../core/shared/lib/object';

let barcode = '';
let clearBarcodeInterval: NodeJS.Timeout;
let clearScannerStateTimeout: NodeJS.Timeout;

export const useHandleToggleScanning = (): {
	start: VoidFunction;
	stop: VoidFunction;
	submit: (code: string) => void;
} => {
	const appCtx = useAppContext();
	const appCtxStateRef = React.useRef<IAppContextState>(appCtx.state);

	const handleSubmitBarcode = (code: string): void => {
		if (appCtxStateRef.current.scanner.isProcessing) return;

		appCtx.setState((current) => {
			const _cloned = { ...current };
			_cloned.scanner.isProcessing = true;
			_cloned.scanner.text = code;
			return _cloned;
		});

		// console.log(code);

		const endpoint =
			appCtxStateRef.current.scanner.mode === OrderScanningModeEnum.Ship
				? '/api/v1/pack-order/goods-issue'
				: '/api/v1/pack-order';
		axiosInstanceWithAccessToken
			.post(endpoint, { po_number: code })
			.then(() => {
				appCtx.setState((current) => {
					const _cloned = { ...current };
					_cloned.scanner.isProcessedSuccess = true;
					_cloned.scanner.isProcessedFailed = false;
					_cloned.orders.timestamp = +new Date();
					return _cloned;
				});
			})
			.catch((e) => {
				appCtx.setState((current) => {
					const _cloned = { ...current };
					if (
						new PandaObject(e).get('response.data.error_code') === 50000
					) {
						_cloned.scanner.isProcessedSuccess = true;
						_cloned.scanner.isProcessedFailed = false;
					} else {
						_cloned.scanner.isProcessedSuccess = false;
						_cloned.scanner.isProcessedFailed = true;
					}
					return _cloned;
				});
			})
			.finally(() => {
				clearScannerStateTimeout = setTimeout(() => {
					appCtx.setState((current) => {
						const _cloned = { ...current };
						_cloned.scanner.isProcessing = false;
						_cloned.scanner.isProcessedSuccess = false;
						_cloned.scanner.isProcessedFailed = false;
						_cloned.scanner.text = '';
						return _cloned;
					});
				}, 1000);
			});
	};

	const handleOnScannerDeviceCapture = React.useCallback(
		(e: KeyboardEvent): void => {
			e.preventDefault();

			if (clearBarcodeInterval) clearInterval(clearBarcodeInterval);

			if (e.key === 'Enter') {
				if (barcode) handleSubmitBarcode(barcode);
				barcode = '';
				return;
			}

			if (e.key !== 'Shift' && e.key !== 'Capslock') barcode += e.key;

			clearBarcodeInterval = setInterval(() => (barcode = ''), 100);
		},
		[]
	);

	const start = (): void => {
		window.addEventListener('keydown', handleOnScannerDeviceCapture);
		appCtx.setState((current) => {
			const _cloned = { ...current };
			_cloned.scanner.isPlaying = true;
			return _cloned;
		});
	};

	const stop = (): void => {
		window.removeEventListener('keydown', handleOnScannerDeviceCapture);
		clearInterval(clearBarcodeInterval);
		clearTimeout(clearScannerStateTimeout);
		appCtx.setState((current) => {
			const _cloned = { ...current };
			_cloned.scanner.isPlaying = false;
			return _cloned;
		});
	};

	React.useEffect(() => {
		appCtxStateRef.current = appCtx.state;
	}, [appCtx.state]);

	React.useEffect(() => {
		return stop;
	}, []);

	return { start, stop, submit: handleSubmitBarcode };
};
