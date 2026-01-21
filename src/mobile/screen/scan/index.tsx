/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import React from 'react';
import styled from 'styled-components';

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { axiosInstanceWithAccessToken } from '../../../shared/util';
import { useDialogProvider } from '../../core/component/dialog/provider';
import { FlexboxComponent } from '../../core/component/flexbox';
import { CloseIconOutline } from '../../core/foundation/icon/outline/close';
import { token } from '../../core/foundation/token';
import { FlexboxVariant } from '../../core/shared/constant';
import { PandaDebouncer } from '../../core/shared/lib/debouncer';
import { PandaObject } from '../../core/shared/lib/object';
import { DialogTypeEnum } from '../../core/shared/type';

import {
    StyledCenterBox,
    StyledCenterBoxContainer,
    StyledCloseButton,
    StyledScannerContainer,
    StyledScanScreenContainer,
} from './styled';

interface IScanScreenProps {
    onClose?: VoidFunction;
}

export const StyledRadio = styled.button`
    outline: 0;
    border: 0;
    border: 0;
    font-size: 17px;
    padding: 8px 0;
    color: #b5b5b5;
    cursor: pointer;
    width: 136px;
    font-weight: 600;
    clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
    background-color: #f0f0f0;

    &.active {
        background-color: #222222;
        border-color: #222222;
        color: white;
    }

    &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-width: 1px 0 1px 1px;
    }

    &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-width: 1px 1px 1px 0;
        margin-left: -12px;
    }
`;

export const StyledRadioContainer = styled.div`
    position: relative;

    &.active {
        &::before {
            content: '';
            position: absolute;
            width: 16px;
            height: 10px;
            background: #222222;
            left: 50%;
            bottom: calc(100% + 8px);
            transform: translateX(-50%);
            clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
    }
`;

export const StyledRadioGroup = styled(FlexboxComponent)`
    padding-left: 16px;
`;

export default ({ onClose }: IScanScreenProps): JSX.Element => {
    const [mode, setMode] = React.useState<string>('creation');
    const [processing, setProcessing] = React.useState<boolean>(false);
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(2000));

    const dialog = useDialogProvider();
    const modeRef = React.useRef<string>(mode);
    const processingRef = React.useRef<boolean>(processing);

    const handleShowErrorDialog = (message?: string): void => {
        dialog.open({
            type: DialogTypeEnum.error,
            content: message || 'An error occurred',
            onClose: (): void => setProcessing(false),
        });
    };

    const handleOnScanSuccess = (data: IDetectedBarcode[]): void => {
        if (processingRef.current) return;

        try {
            if (!Array.isArray(data)) throw new Error();
            const po = String(new PandaObject(data[0]).get('rawValue') || '');
            if (!po) throw new Error();
            handleProcessOrderNumber(po);
        } catch (e) {
            // TODO: handle error if needed
        }
    };

    const handleProcessOrderNumber = (orderNumber: string): void => {
        if (processingRef.current) return;
        if (!orderNumber) return;

        try {
            setProcessing(true);
            dialog.setLoading(true);
            dialog.open({ content: '' });
            const apiUrl =
                modeRef.current === 'delivery'
                    ? '/api/v1/pack-order/goods-issue'
                    : '/api/v1/pack-order';
            axiosInstanceWithAccessToken
                .post(apiUrl, {
                    po_number: orderNumber,
                })
                .then(() => {
                    // dialog.setLoading(false);
                    // dialog.open({
                    //     type: DialogTypeEnum.success,
                    //     content: 'Order has been processed',
                    //     width: '286px',
                    // });
                })
                .catch((err) => {
                    // dialog.setLoading(false);
                    // handleShowErrorDialog('An error occurred while creating order');
                })
                .finally(() => {
                    dialog.setLoading(false);
                    dialog.open({
                        type: DialogTypeEnum.success,
                        content: 'Order has been processed',
                        width: '286px',
                    });
                    debouncer.execute(() => {
                        setProcessing(false);
                    });
                });
        } catch (e) {
            // TODO: handle error if needed
        }
    };

    const handleOnScanError = (): void => {
        // TODO: handle show error if needed
    };

    React.useEffect(() => {
        // let barcode = '';
        // let interval: ReturnType<typeof setInterval>;

        // const handleScannerDevice = (e: KeyboardEvent): void => {
        //     e.preventDefault();

        //     if (interval) clearInterval(interval);

        //     if (e.key === 'Enter') {
        //         if (barcode) {
        //             console.log(barcode);
        //             handleProcessOrderNumber(barcode);
        //         }
        //         barcode = '';
        //         return;
        //     }

        //     if (e.key !== 'Shift') barcode += e.key;

        //     interval = setInterval(() => (barcode = ''), 100);
        // };

        // window.addEventListener('keydown', handleScannerDevice);

        return (): void => {
            debouncer.destroy();
            // window.removeEventListener('keydown', handleScannerDevice);
        };
    }, []);

    React.useEffect(() => {
        modeRef.current = mode;
    }, [mode]);

    React.useEffect(() => {
        processingRef.current = processing;
    }, [processing]);

    return (
        <StyledScanScreenContainer
            width="100%"
            height="100svh"
            gap="16px"
            align={FlexboxVariant.alignment.center}
            justify={FlexboxVariant.alignment.center}
            direction={FlexboxVariant.direction.column}
        >
            <StyledRadioGroup
                width="max-content"
                margin="0 auto 32px"
                justify={FlexboxVariant.alignment.center}
            >
                <StyledRadioContainer className={mode === 'creation' ? 'active' : ''}>
                    <StyledRadio
                        className={mode === 'creation' ? 'active' : ''}
                        onClick={(): void => {
                            setMode('creation');
                        }}
                    >
                        Pack
                    </StyledRadio>
                </StyledRadioContainer>
                <StyledRadioContainer className={mode === 'delivery' ? 'active' : ''}>
                    <StyledRadio
                        className={mode === 'delivery' ? 'active' : ''}
                        onClick={(): void => {
                            setMode('delivery');
                        }}
                    >
                        Ship
                    </StyledRadio>
                </StyledRadioContainer>
            </StyledRadioGroup>

            <FlexboxComponent width="264px" height="264px">
                <StyledCenterBoxContainer
                    width="264px"
                    height="264px"
                    align={FlexboxVariant.alignment.center}
                    justify={FlexboxVariant.alignment.center}
                >
                    <StyledCenterBox
                        width="260px"
                        height="260px"
                        backgroundColor={token.get<string>('global.color.grey-6')}
                    >
                        <StyledScannerContainer width="100%" height="260px">
                            <Scanner
                                classNames={{ container: 'scanner' }}
                                onScan={handleOnScanSuccess}
                                onError={handleOnScanError}
                            />
                        </StyledScannerContainer>
                    </StyledCenterBox>
                </StyledCenterBoxContainer>
                <StyledCloseButton circle borderColor="transparent" onClick={onClose}>
                    <CloseIconOutline width={16} height={16} />
                </StyledCloseButton>
            </FlexboxComponent>
        </StyledScanScreenContainer>
    );
};
