/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import './app.css';

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { DialogProvider, useDialogProvider } from './core/component/dialog/provider';
import { FlexboxComponent } from './core/component/flexbox';
import { PlainTextComponent } from './core/component/plain';
import { token } from './core/foundation/token';
import { FlexboxVariant } from './core/shared/constant';
import { PandaObject } from './core/shared/lib/object';
import { DialogTypeEnum } from './core/shared/type';

const StyledScannerContainer = styled(FlexboxComponent)`
    border-radius: 8px;
    overflow: hidden;

    .scanner {
        svg {
            path {
                stroke: white;
            }
        }
    }
`;

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

    const [processing, setProcessing] = React.useState<boolean>(false);

    const handleShowErrorDialog = (message?: string): void => {
        dialog.open({
            type: DialogTypeEnum.error,
            content: message || 'An error occurred',
            onClose: (): void => setProcessing(false),
        });
    };

    const handleOnScanSuccess = (data: IDetectedBarcode[]): void => {
        try {
            if (!Array.isArray(data)) throw new Error();
            const po = new PandaObject(data[0]).get('rawValue');
            if (!po) return;
            setProcessing(true);
            dialog.setLoading(true);
            dialog.open({ content: '' });
            setTimeout(() => {
                axios
                    .post('https://goku.dev/api/v1/pack-order', {
                        po_number: po,
                    })
                    .then(() => {
                        dialog.open({
                            type: DialogTypeEnum.info,
                            title: 'Success',
                            content: (
                                <PlainTextComponent
                                    text="Order has been created successfully"
                                    color={token.get<string>('global.color.green-3')}
                                />
                            ),
                            onClose: (): void => setProcessing(false),
                        });
                    })
                    .catch(() => handleShowErrorDialog('An error occurred while creating order'))
                    .finally(() => {
                        dialog.setLoading(false);
                    });
            }, 1000);
        } catch (e) {
            handleShowErrorDialog('An error occurred while scanning the QR code');
        }
    };

    const handleOnScanError = (): void =>
        handleShowErrorDialog('An error occurred while accessing camera');

    return (
        <FlexboxComponent
            width="100%"
            height="100svh"
            align={FlexboxVariant.alignment.center}
            justify={FlexboxVariant.alignment.center}
        >
            <FlexboxComponent
                width="100%"
                gap="20px"
                align={FlexboxVariant.alignment.center}
                justify={FlexboxVariant.alignment.center}
                direction={FlexboxVariant.direction.column}
            >
                <FlexboxComponent
                    width="260px"
                    height="260px"
                    borderRadius="8px"
                    backgroundColor={token.get<string>('global.color.grey-8')}
                >
                    <StyledScannerContainer width="100%">
                        <Scanner
                            paused={processing}
                            classNames={{ container: 'scanner' }}
                            onScan={handleOnScanSuccess}
                            onError={handleOnScanError}
                        />
                    </StyledScannerContainer>
                </FlexboxComponent>
            </FlexboxComponent>
        </FlexboxComponent>
    );
};
