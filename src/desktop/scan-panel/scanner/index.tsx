import React from 'react';
import styled from 'styled-components';

import { keyframes } from 'styled-components';
import { useHandleToggleScanning } from '../../_handler/scanner';
import { useAppContext } from '../../context';
import { CheckIconFilled } from '../../core/foundation/icon/filled/check';
import { PlayIconFilled } from '../../core/foundation/icon/filled/play';
import { SpinnerIconOutline } from '../../core/foundation/icon/outline/spinner';
import { token } from '../../core/foundation/token';
import { useHandleConnectDevice } from '../../_handler/device';
import { CloseIconFilled } from '../../core/foundation/icon/filled/close';

const slide = keyframes`
    0%{
        left: 0;
    }

    50% {
        left: calc(100% - 4px);
    }

    100% {
        left: 0;
    }
`;

const StyledRightPanelScanner = styled.div`
	width: 100%;
	aspect-ratio: 1;
	background-color: #ffffff;
	border-radius: 4px;
	border: 1px solid #e5e5e5;
	position: relative;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	padding: 10px;

	&::before {
		content: '';
		width: 4px;
		height: 100%;
		position: absolute;
		left: 12px;
		top: 0;
		background: #dfdfdf;
		z-index: 0;
	}

	&.playing {
		&::before {
			animation: ${slide} linear 2s infinite;
		}
	}

	button {
		background-color: #eeeeee;
		font-size: 13px;
		padding: 2px 12px 0 8px;
		border: 0;
		outline: 0;
		border-radius: 4px;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		position: relative;
		z-index: 1;

		> span {
			height: 24px;
			padding: 1px 0 0;
		}

		&:disabled {
			background-color: ${token.get<string>('global.color.grey-8')};
			color: ${token.get<string>('global.color.grey-4')};
			cursor: not-allowed;

			&:hover {
				background: ${token.get<string>('global.color.grey-8')};
			}
		}

		&:hover {
			background: #e5e5e5;
		}
	}
`;

const StyledConnectDeviceButton = styled.button<{ $isConnected?: boolean }>`
	position: absolute !important;
	top: 10px;
	right: 10px;
	left: auto;
	padding: 2px 6px 0 !important;

	${(props): string => {
		if (!props.$isConnected) return '';
		return `
            background-color: ${token.get<string>(
				'global.color.green-5'
			)} !important;
            color: ${token.get<string>('global.color.green-3')} !important;
            cursor: default !important;
        `;
	}}
`;

const StyledRightPanelScannerProcessing = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
	border-radius: 4px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	gap: 8px;
	padding: 10px;

	.scanner-text-result-container {
		background: white;
		padding: 8px 12px 6px 12px;
		border-radius: 4px;
		display: flex;
		width: max-content;
		max-width: 100%;
		gap: 8px;
		align-items: flex-end;
		justify-content: flex-end;
	}

	span.scanner-text-result {
		display: block;
		max-width: 160px;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
		overflow: hidden;
		margin: 0 0 -1px;

		&.success {
			color: ${token.get<string>('global.color.green-2')};
		}

		&.failed {
			color: ${token.get<string>('global.color.red-4')};
		}
	}

	.icon {
		min-width: 16px;
		height: 16px;
		display: inline-flex;
		align-items: center;

		&.success,
		&.failed {
			transform: translateY(-1px);
		}
	}
`;

export const RightPanelScanner = (): JSX.Element => {
	const appCtx = useAppContext();
	const controlButtonRef = React.useRef<HTMLButtonElement>(null);

	const { scanner } = appCtx.state;
	const {
		isPlaying,
		isProcessing,
		isConnectedDevice,
		isProcessedSuccess,
		isProcessedFailed,
		text,
	} = scanner;
	const { start: startScanning, stop: stopScanning } =
		useHandleToggleScanning();

	const handleConnectDevice = useHandleConnectDevice();

	return (
		<StyledRightPanelScanner className={isPlaying ? 'playing' : ''}>
			{
				<StyledConnectDeviceButton
					$isConnected={isConnectedDevice}
					disabled={isPlaying}
					onClick={
						!isConnectedDevice ? handleConnectDevice : undefined
					}
				>
					{appCtx.state.scanner.isConnectedDevice
						? 'Alternative device connected'
						: 'Connect alternative device'}
				</StyledConnectDeviceButton>
			}

			<button
				ref={controlButtonRef}
				onClick={(): void => {
					if (appCtx.state.scanner.isPlaying) stopScanning();
					else startScanning();

					controlButtonRef.current?.blur();
				}}
			>
				<span>
					{appCtx.state.scanner.isPlaying ? (
						<span
							style={{
								background: token.get<string>(
									'global.color.grey-2'
								),
								display: 'inline-block',
								margin: '6px 5px 0',
								width: 8,
								height: 8,
								borderRadius: 2,
							}}
						/>
					) : (
						<PlayIconFilled />
					)}
				</span>
				{appCtx.state.scanner.isPlaying
					? 'Stop scanning'
					: 'Start scanning'}
			</button>

			{(isProcessing || isProcessedSuccess || isProcessedFailed) &&
				!!text && (
					<StyledRightPanelScannerProcessing>
						<div className="scanner-text-result-container">
							{isProcessedSuccess ? (
								<span className="icon success">
									<CheckIconFilled
										width={16}
										height={16}
										color={token.get<string>(
											'global.color.green-3'
										)}
									/>
								</span>
							) : isProcessedFailed ? (
								<span className="icon failed">
									<CloseIconFilled
										width={16}
										height={16}
										color={token.get<string>(
											'global.color.red-4'
										)}
									/>
								</span>
							) : (
								<span className="icon">
									<SpinnerIconOutline
										width={16}
										height={16}
									/>
								</span>
							)}
							<span
								className={`scanner-text-result ${
									isProcessedSuccess
										? 'success'
										: isProcessedFailed
										? 'failed'
										: ''
								}`}
							>
								{text}
							</span>
						</div>
					</StyledRightPanelScannerProcessing>
				)}
		</StyledRightPanelScanner>
	);
};
