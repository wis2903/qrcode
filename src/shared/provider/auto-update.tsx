/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react';
import env from '../../env.json';

import { ButtonComponent } from '../../mobile/core/component/button';
import { useDialogProvider } from '../../mobile/core/component/dialog/provider';
import { FlexboxComponent } from '../../mobile/core/component/flexbox';
import { PlainTextComponent } from '../../mobile/core/component/plain';
import { token } from '../../mobile/core/foundation/token';
import { FlexboxVariant } from '../../mobile/core/shared/constant';
import { DialogTypeEnum } from '../../mobile/core/shared/type';

export const AutoUpdateProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
    const dialog = useDialogProvider();
    const intervalHandlerRef = React.useRef<NodeJS.Timeout>();

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
                        width: 'min(90vw, 420px)',
                        hiddenCloseButton: true,
                        hiddenFooter: true,
                        type: DialogTypeEnum.info,
                        title: 'New version available',
                        content: (
                            <FlexboxComponent
                                direction={FlexboxVariant.direction.column}
                                gap="32px"
                            >
                                <PlainTextComponent
                                    text="New version has been released. Please refresh to start using the latest version"
                                    color={token.get<string>('global.color.grey-2')}
                                />

                                <FlexboxComponent
                                    width="100%"
                                    justify={FlexboxVariant.alignment.end}
                                >
                                    <ButtonComponent
                                        padding="6px 12px"
                                        borderRadius="4px"
                                        onClick={(): void => {
                                            window.location.reload();
                                        }}
                                    >
                                        Refresh to update
                                    </ButtonComponent>
                                </FlexboxComponent>
                            </FlexboxComponent>
                        ),
                    });
                }
            });
        }, 1000 * 10); // 2 mins
    };

    React.useEffect(() => {
        handleStartCheckingForUpdates();
        return (): void => {
            clearInterval(intervalHandlerRef.current);
        };
    }, []);

    return <>{children}</>;
};
