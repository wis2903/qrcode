/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import React from 'react';

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useDialogProvider } from '../../core/component/dialog/provider';
import { FlexboxComponent } from '../../core/component/flexbox';
import { CloseIconOutline } from '../../core/foundation/icon/outline/close';
import { token } from '../../core/foundation/token';
import { FlexboxVariant } from '../../core/shared/constant';
import { PandaDebouncer } from '../../core/shared/lib/debouncer';
import { PandaObject } from '../../core/shared/lib/object';
import { DialogTypeEnum } from '../../core/shared/type';
import { axiosInstanceWithAccessToken } from '../../shared/util/axios-instance';

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

export default ({ onClose }: IScanScreenProps): JSX.Element => {
    const dialog = useDialogProvider();

    const [processing, setProcessing] = React.useState<boolean>(false);
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(2000));

    const handleShowErrorDialog = (message?: string): void => {
        dialog.open({
            type: DialogTypeEnum.error,
            content: message || 'An error occurred',
            onClose: (): void => setProcessing(false),
        });
    };

    const handleOnScanSuccess = (data: IDetectedBarcode[]): void => {
        if (processing) return;

        try {
            if (!Array.isArray(data)) throw new Error();
            const po = new PandaObject(data[0]).get('rawValue');
            if (!po) return;
            setProcessing(true);
            dialog.setLoading(true);
            dialog.open({ content: '' });
            setTimeout(() => {
                axiosInstanceWithAccessToken
                    .post('https://api.goku.dev/api/v1/pack-order', {
                        po_number: po,
                    })
                    .then(() => {
                        dialog.setLoading(false);
                        dialog.open({
                            type: DialogTypeEnum.success,
                            content: 'Order has been created',
                            width: '260px',
                        });
                    })
                    .catch(() => {
                        dialog.setLoading(false);
                        handleShowErrorDialog('An error occurred while creating order');
                    })
                    .finally(() => {
                        debouncer.execute(() => {
                            setProcessing(false);
                        });
                    });
            }, 500);
        } catch (e) {
            handleShowErrorDialog('An error occurred while scanning the QR code');
        }
    };

    const handleOnScanError = (): void =>
        handleShowErrorDialog('An error occurred while accessing camera');

    React.useEffect(() => {
        return (): void => {
            debouncer.destroy();
        };
    }, []);

    return (
        <StyledScanScreenContainer
            width="100%"
            height="100svh"
            gap="20px"
            align={FlexboxVariant.alignment.center}
            justify={FlexboxVariant.alignment.center}
            direction={FlexboxVariant.direction.column}
        >
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
