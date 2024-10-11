import l from '../../shared/locale/dialog.json';

import { IconCollection } from '../../foundation/icon';
import { SpinnerIconOutline } from '../../foundation/icon/outline/spinner';
import { token } from '../../foundation/token';
import { getLocale } from '../../shared/locale';
import { DialogTypeEnum, FlexboxAlignEnum, FlexboxDirectionEnum } from '../../shared/type';
import { ButtonComponent } from '../button';
import { FlexboxComponent } from '../flexbox';
import { OverlayComponent } from '../overlay';
import { PlainTextComponent } from '../plain';
import { IDialogComponentProps } from './type';

import {
    StyledDialogComponentBody,
    StyledDialogComponentCloseButton,
    StyledDialogComponentContainer,
    StyledDialogComponentContent,
    StyledDialogComponentFooter,
    StyledDialogComponentTitle,
    StyledDialogComponentWrapper,
} from './styled';

const CloseIcon = IconCollection.outline.close;
const CheckIcon = IconCollection.filled.check;

export const DialogComponent = ({
    isLoading,
    customLoadingMessage,
    lang,
    children,
    type,
    title,
    hiddenFooter,
    footer,
    zIndex,
    width,
    maxWidth,
    padding,
    confirmButtonText,
    cancelButtonText,
    closeButtonText,
    onClose,
    onCancel,
    onConfirm,
}: IDialogComponentProps): JSX.Element => {
    const locale = getLocale(l, lang);

    return (
        <StyledDialogComponentContainer
            justify={FlexboxAlignEnum.center}
            $type={type}
            $zIndex={zIndex}
        >
            {type !== DialogTypeEnum.success && <OverlayComponent />}

            <StyledDialogComponentWrapper>
                <StyledDialogComponentBody
                    $width={width}
                    $maxWidth={maxWidth}
                    $padding={padding}
                    $hiddenFooter={hiddenFooter}
                    className={`${token.get<string>('global.util.root.class')} ${type === DialogTypeEnum.success ? 'success' : ''}`}
                >
                    {isLoading ? (
                        <FlexboxComponent
                            width="100%"
                            direction={FlexboxDirectionEnum.column}
                            align={FlexboxAlignEnum.center}
                            justify={FlexboxAlignEnum.center}
                            gap={token.get<string>('global.space.s')}
                            padding={`${token.get<string>('global.space.xl')} 0`}
                        >
                            <SpinnerIconOutline width={22} height={22} />
                            <FlexboxComponent
                                width="100%"
                                direction={FlexboxDirectionEnum.column}
                                align={FlexboxAlignEnum.center}
                                justify={FlexboxAlignEnum.center}
                                gap={token.get<string>('global.space.xxxxs')}
                            >
                                <PlainTextComponent
                                    text={locale.get('processing-line-1')}
                                    fontSize={token.get<string>('global.typo.font-size-6')}
                                />
                                <PlainTextComponent
                                    text={customLoadingMessage || locale.get('processing-line-2')}
                                    fontSize={token.get<string>('global.typo.font-size-6')}
                                />
                            </FlexboxComponent>
                        </FlexboxComponent>
                    ) : (
                        <>
                            <StyledDialogComponentCloseButton onClick={onClose}>
                                {type === DialogTypeEnum.success ? (
                                    <CloseIcon width={14} height={14} />
                                ) : (
                                    <CloseIcon width={18} height={18} />
                                )}
                            </StyledDialogComponentCloseButton>

                            {type !== DialogTypeEnum.success && (
                                <StyledDialogComponentTitle>
                                    {((): React.ReactNode => {
                                        switch (type) {
                                            case DialogTypeEnum.error:
                                                return title || locale.get('error');
                                            case DialogTypeEnum.info:
                                                return title || locale.get('notification');
                                            default:
                                                return title || locale.get('confirm');
                                        }
                                    })()}
                                </StyledDialogComponentTitle>
                            )}
                            <StyledDialogComponentContent>
                                {type === DialogTypeEnum.success && (
                                    <CheckIcon
                                        width={22}
                                        height={22}
                                        color={token.get<string>('global.color.green-3')}
                                    />
                                )}
                                {children}
                            </StyledDialogComponentContent>

                            {!hiddenFooter && !footer && type !== DialogTypeEnum.success && (
                                <StyledDialogComponentFooter
                                    width="100%"
                                    justify={FlexboxAlignEnum.end}
                                    gap={token.get<string>('global.space.xxs')}
                                >
                                    {type === DialogTypeEnum.error ||
                                    type === DialogTypeEnum.info ? (
                                        <ButtonComponent large onClick={onClose}>
                                            {closeButtonText || locale.get('close')}
                                        </ButtonComponent>
                                    ) : (
                                        <>
                                            <ButtonComponent large primary onClick={onConfirm}>
                                                {confirmButtonText || locale.get('yes')}
                                            </ButtonComponent>
                                            <ButtonComponent large onClick={onCancel}>
                                                {cancelButtonText || locale.get('no')}
                                            </ButtonComponent>
                                        </>
                                    )}
                                </StyledDialogComponentFooter>
                            )}

                            {!!footer && footer}
                        </>
                    )}
                </StyledDialogComponentBody>
            </StyledDialogComponentWrapper>
        </StyledDialogComponentContainer>
    );
};
