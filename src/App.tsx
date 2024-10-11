/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import './App.css';

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { DialogProvider, useDialogProvider } from './core/component/dialog/provider';
import { FlexboxComponent } from './core/component/flexbox';
import { PlainTextComponent } from './core/component/plain';
import { token } from './core/foundation/token';
import { FlexboxVariant } from './core/shared/constant';
import { PandaObject } from './core/shared/lib/object';
import { DialogTypeEnum } from './core/shared/type';
import { ScrollAreaComponent } from './core/component/scrollarea';
import { PandaDate } from './core/shared/lib/date';

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

    const [timestamp, setTimestamp] = React.useState<number>(+new Date());
    const [processing, setProcessing] = React.useState<boolean>(false);
    const [orders, setOrders] = React.useState<Record<string, unknown>[]>([]);

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
                    .post('https://api.goku.dev/api/v1/pack-order', {
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
                            onClose: (): void => {
                                setTimestamp(+new Date());
                                setProcessing(false);
                            },
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

    React.useEffect(() => {
        axios
            .get('https://api.goku.dev/api/v1/pack-order')
            .then((response) => {
                const data = response.data.data;
                if (Array.isArray(data)) setOrders(data);
            })
            .catch((e) => {
                // handle error
            });
    }, [timestamp]);

    return (
        <FlexboxComponent
            width="100%"
            height="100svh"
            gap="20px"
            align={FlexboxVariant.alignment.center}
            justify={FlexboxVariant.alignment.center}
            direction={FlexboxVariant.direction.column}
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

            <ScrollAreaComponent width="260px" maxHeight="calc(100svh - 360px)" minHeight="200px">
                <FlexboxComponent
                    width="100%"
                    borderWidth="1px"
                    borderRadius="8px"
                    padding="12px"
                    gap="20px"
                    borderColor={token.get<string>('global.color.grey-7')}
                    direction={FlexboxVariant.direction.column}
                >
                    <PlainTextComponent text="Created orders" fontSize="16px" fontWeight="bold" />
                    {orders.length ? (
                        orders
                            .map((order) => new PandaObject(order))
                            .map((order) => (
                                <FlexboxComponent
                                    key={order.get('id')}
                                    direction={FlexboxVariant.direction.column}
                                >
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
                                        text={`Created at ${new PandaDate(
                                            String(order.get('date_created'))
                                        ).toDateTimeString()}`}
                                    />
                                </FlexboxComponent>
                            ))
                    ) : (
                        <PlainTextComponent
                            text="No records found"
                            color={token.get<string>('global.color.grey-3')}
                        />
                    )}
                </FlexboxComponent>
            </ScrollAreaComponent>
        </FlexboxComponent>
    );
};
