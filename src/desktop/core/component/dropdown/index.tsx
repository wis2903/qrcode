/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import uuid from 'react-uuid';

import { FixedSizeList as List } from 'react-window';
import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { FlexboxComponent } from '../flexbox';
import { OverlayComponent } from '../overlay';
import { DropdownComponentUtil } from './util';

import {
    FlexboxAlignEnum,
    HorizontalDirectionEnum,
    KeyboardEnum,
    VerticalDirectionEnum,
} from '../../shared/type';

import {
    StyledDropdownComponentContent,
    StyledDropdownComponentItem,
    StyledDropdownComponentItemDiv,
    StyledDropdownComponentMenu,
    StyledDropdownComponentTrigger,
} from './styled';

import {
    IDropdownComponentContentProps,
    IDropdownComponentContext,
    IDropdownComponentItemProps,
    IDropdownComponentMenuProps,
    IDropdownComponentProps,
    IDropdownComponentTriggerProps,
} from './type';

const CheckIcon = IconCollection.outline.check;

const DropdownComponentContext = React.createContext<IDropdownComponentContext>({});

const DropdownComponentMenu = (props: IDropdownComponentMenuProps): JSX.Element => {
    const { reference, enabledReactWindow, items, ...rest } = props;

    if (!enabledReactWindow || !items?.length) {
        return <StyledDropdownComponentMenu {...rest} reference={reference} maxHeight="302px" />;
    }

    if (items.length <= 20) {
        return (
            <StyledDropdownComponentMenu {...rest} reference={reference} maxHeight="302px">
                {items.map((item, idx) => (
                    <DropdownComponentItem key={idx} {...item} />
                ))}
            </StyledDropdownComponentMenu>
        );
    }

    return (
        <StyledDropdownComponentMenu {...rest} reference={reference}>
            <List
                className="panda-dropdown-react-window-ls"
                itemData={items || []}
                height={320}
                itemCount={items.length}
                itemSize={36}
                width={rest.width || 300}
            >
                {({ data, index, style }): React.ReactElement => {
                    return <DropdownComponentItem {...data[index]} style={style} />;
                }}
            </List>
        </StyledDropdownComponentMenu>
    );
};

const DropdownComponentItem = (props: IDropdownComponentItemProps): JSX.Element => {
    const {
        disabled,
        preSelected,
        selected,
        bold,
        children,
        backgroundColor,
        isDiv,
        onClick,
        ...rest
    } = props;

    const StyledContainer = (
        isDiv ? StyledDropdownComponentItemDiv : StyledDropdownComponentItem
    ) as any;

    return (
        <StyledContainer
            $bold={bold}
            $preSelected={preSelected}
            $disabled={disabled}
            $backgroundColor={backgroundColor}
            onClick={disabled ? undefined : onClick}
            {...rest}
        >
            <FlexboxComponent
                align={FlexboxAlignEnum.start}
                justify={FlexboxAlignEnum.justify}
                gap={token.get<string>('global.space.s')}
            >
                {children}
                {selected && (
                    <FlexboxComponent padding="1px 0 0">
                        <CheckIcon
                            width={16}
                            height={16}
                            color={token.get<string>('global.color.primary')}
                        />
                    </FlexboxComponent>
                )}
            </FlexboxComponent>
        </StyledContainer>
    );
};

const DropdownComponentTrigger = (props: IDropdownComponentTriggerProps): JSX.Element => {
    const { width, minWidth, cursor, ...rest } = props;
    const {
        dropdownTriggerRef,
        toggleOnClickTrigger,
        disabled,
        open,
        setOpen,
        overrideOnClickTrigger,
        handleOnMouseEnter,
        handleOnMouseLeave,
    } = React.useContext(DropdownComponentContext);

    const handleOnClickTrigger = (): void => {
        if (disabled) return;
        if (overrideOnClickTrigger) return overrideOnClickTrigger();
        setOpen?.(toggleOnClickTrigger ? !open : true);
    };

    return (
        <StyledDropdownComponentTrigger
            {...rest}
            $highZIndex={open}
            $width={width}
            $minWidth={minWidth}
            $disabled={disabled}
            $cursor={cursor}
            ref={dropdownTriggerRef}
            onClick={handleOnClickTrigger}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        />
    );
};

const DropdownComponentContent = (props: IDropdownComponentContentProps): JSX.Element => {
    const {
        onLoad,
        reference,
        isTooltip,
        isEnabledTransition,
        marginRight,
        marginLeft,
        maxWidth,
        bottom,
        ...rest
    } = props;

    const {
        open,
        horizontalDirection,
        verticleDirection,
        controlDropdown,
        invertedZIndex,
        closeOnClickInside,
        toggleOnMouseMove,
        dropdownTriggerRef,
        setOpen,
        onDropdownContentVisible,
        onClickOverlay,
        handleOnMouseEnter,
        handleOnMouseLeave,
    } = React.useContext(DropdownComponentContext);

    const containerRef = React.useRef<HTMLDivElement>();
    const rootRef = React.useRef<ReactDOM.Root>();

    const handleUpdateContentPosition = (): void => {
        if (!containerRef.current || !dropdownTriggerRef?.current) return;

        let gap = Number(token.get<string>('global.space.mxxxs').replace(/[^0-9]+/, ''));
        if (isTooltip) gap += 2;

        const {
            width: triggerWidth,
            height: triggerHeight,
            x: triggerX,
            y: triggerY,
        } = dropdownTriggerRef.current.getBoundingClientRect();

        containerRef.current.style.minWidth = `${triggerWidth}px`;
        containerRef.current.style.width = controlDropdown ? `${triggerWidth}px` : 'max-content';
        containerRef.current.style.top = `${triggerY + triggerHeight + gap}px`;
        containerRef.current.style.bottom = 'auto';
        containerRef.current.style.left = `${triggerX}px`;
        containerRef.current.style.right = 'auto';

        const {
            width: contentWidth,
            height: contentHeight,
            x: contentX,
            y: contentY,
        } = containerRef.current.getBoundingClientRect();

        if (
            verticleDirection === VerticalDirectionEnum.top ||
            contentHeight + contentY >= document.documentElement.clientHeight - 20
        ) {
            containerRef.current.style.top = 'auto';
            containerRef.current.style.bottom = `${
                document.documentElement.clientHeight - triggerY + gap / 2
            }px`;
        }

        if (
            horizontalDirection === HorizontalDirectionEnum.right ||
            contentWidth + contentX >= document.documentElement.clientWidth
        ) {
            containerRef.current.style.left = 'auto';
            containerRef.current.style.right = `${
                document.documentElement.clientWidth - triggerX - triggerWidth
            }px`;
        }
    };

    const handleOnClickOverlay = (): void => {
        setOpen?.(false);
        onClickOverlay?.();
    };

    const handleOnClickContent = (): void => {
        if (closeOnClickInside) setOpen?.(false);
    };

    const comp = (
        <>
            {!toggleOnMouseMove && (
                <OverlayComponent backgroundColor="transparent" onClick={handleOnClickOverlay} />
            )}
            <StyledDropdownComponentContent
                {...rest}
                $isTooltip={isTooltip}
                $verticleDirection={verticleDirection}
                $horizontalDirection={horizontalDirection}
                $controlDropdown={controlDropdown}
                $marginRight={marginRight}
                $marginLeft={marginLeft}
                $maxWidth={maxWidth}
                $bottom={bottom}
                ref={reference}
                onClick={handleOnClickContent}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            />
        </>
    );

    React.useEffect(() => {
        onLoad?.({
            updatePosition: handleUpdateContentPosition,
        });

        containerRef.current = document.createElement('div');
        containerRef.current.style.zIndex = invertedZIndex ? '99999' : '99996';
        containerRef.current.style.position = 'fixed';
        containerRef.current.style.display = 'none';
        if (isEnabledTransition) containerRef.current.style.transition = 'inset linear 0.12s';
        else containerRef.current.style.transition = 'none';

        rootRef.current = ReactDOM.createRoot(containerRef.current);
        dropdownTriggerRef?.current
            ?.closest(`.${token.get<string>('global.util.root.class')}`)
            ?.appendChild(containerRef.current);

        return (): void => {
            if (containerRef.current) {
                containerRef.current.parentElement?.removeChild(containerRef.current);
            }
        };
    }, []);

    React.useEffect(() => {
        if (!open) {
            rootRef.current?.render(<></>);
        } else {
            rootRef.current?.render(comp);
        }
    }, [comp]);

    React.useEffect(() => {
        if (!containerRef.current) return;

        if (open) {
            containerRef.current.style.display = 'unset';
            setTimeout(() => {
                if (!containerRef.current) return;

                handleUpdateContentPosition();
                onDropdownContentVisible?.(containerRef.current);
                containerRef.current.style.opacity = '1';
            }, 50);
        } else {
            containerRef.current.style.opacity = '0';
            containerRef.current.style.display = 'none';
        }
    }, [open]);

    return <></>;
};

const DropdownComponent = (props: IDropdownComponentProps): JSX.Element => {
    const {
        disabled,
        children,
        toggleOnClickTrigger,
        toggleOnMouseMove,
        closeOnClickInside,
        horizontalDirection,
        verticleDirection,
        controlDropdown,
        invertedZIndex,
        allowOtherDropdownsToOpen,
        onClose,
        onOpen,
        onLoad,
        onDropdownContentVisible,
        onClickOverlay,
        overrideOnClickTrigger,
    } = props;

    const [open, setOpen] = React.useState<boolean>(false);
    const [uid] = React.useState<string>(uuid());
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));

    const dropdownTriggerRef = React.useRef<HTMLDivElement>(null);
    const dropdownContentRef = React.useRef<HTMLDivElement>(null);

    const handleOnWindowScrollOrResize = React.useCallback((): void => {
        setOpen(false);
        const inputs = dropdownTriggerRef.current?.getElementsByTagName('input');
        if (!inputs?.length) return;
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].blur();
        }
    }, []);

    const handleOnPressEscButton = React.useCallback((e: KeyboardEvent) => {
        if (e.key === KeyboardEnum.escape) handleOnWindowScrollOrResize();
    }, []);

    const handleOnLoaded = (): void => {
        onLoad?.({
            close: (): void => {
                setOpen(false);
            },
            open: (): void => {
                setOpen(true);
            },
        });
    };

    React.useEffect(() => {
        if (open === undefined) return;
        if (!open) {
            DropdownComponentUtil.requestCloseForOpeningComps.delete(uid);
            return onClose?.();
        }

        if (!allowOtherDropdownsToOpen) DropdownComponentUtil.closeAllOpeningComps();
        DropdownComponentUtil.requestCloseForOpeningComps.set(uid, (): void => {
            setOpen(false);
        });

        return onOpen?.();
    }, [open]);

    React.useEffect(() => {
        handleOnLoaded();
        window.addEventListener('scroll', handleOnWindowScrollOrResize);
        window.addEventListener('resize', handleOnWindowScrollOrResize);
        window.addEventListener('keyup', handleOnPressEscButton);

        return (): void => {
            window.removeEventListener('scroll', handleOnWindowScrollOrResize);
            window.removeEventListener('resize', handleOnWindowScrollOrResize);
            window.removeEventListener('keyup', handleOnPressEscButton);
            debouncer.destroy();
        };
    }, []);

    return (
        <DropdownComponentContext.Provider
            value={{
                open,
                disabled,
                toggleOnClickTrigger,
                toggleOnMouseMove,
                closeOnClickInside,
                horizontalDirection,
                verticleDirection,
                controlDropdown,
                invertedZIndex,
                dropdownContentRef,
                dropdownTriggerRef,
                setOpen,
                onDropdownContentVisible,
                onClickOverlay,
                overrideOnClickTrigger,
                handleOnMouseEnter: (): void => {
                    if (disabled || !toggleOnMouseMove) return;
                    debouncer.execute(() => {
                        setOpen?.(true);
                    });
                },
                handleOnMouseLeave: (): void => {
                    if (disabled || !toggleOnMouseMove) return;
                    debouncer.execute(() => {
                        setOpen?.(false);
                    });
                },
            }}
        >
            {children}
        </DropdownComponentContext.Provider>
    );
};

DropdownComponentTrigger.displayName = 'DropdownComponentTrigger';
DropdownComponentContent.displayName = 'DropdownComponentContent';
DropdownComponentMenu.displayName = 'DropdownComponentMenu';
DropdownComponentItem.displayName = 'DropdownComponentItem';
DropdownComponent.displayName = 'DropwdownComponent';

export {
    DropdownComponent,
    DropdownComponentContent,
    DropdownComponentItem,
    DropdownComponentMenu,
    DropdownComponentTrigger,
};
