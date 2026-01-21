import React from 'react';
import l from '../../shared/locale/select.json';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { EmptyVoidFunction } from '../../shared/constant';
import { PandaText } from '../../shared/lib/text';
import { getLocale } from '../../shared/locale';
import { FlexboxDirectionEnum } from '../../shared/type';
import { CheckboxComponent } from '../checkbox';
import { DropdownComponent, DropdownComponentItem } from '../dropdown';
import { IDropdownComponentAPI, IDropdownComponentContentAPI } from '../dropdown/type';
import { FlexboxComponent } from '../flexbox';
import { ITextboxComponentAPI } from '../textbox/type';
import { ISelectComponentProps, ISelectionComponentOption } from './type';

import {
    StyledCustomDropdownComponentContent,
    StyledCustomDropdownComponentContentEmpty,
    StyledCustomDropdownComponentMenu,
    StyledCustomDropdownComponentTrigger,
    StyledCustomTextboxComponent,
    StyledSelectComponentDropdownFooter,
} from './styled';

const AngleIcon = IconCollection.outline.angle;
const CloseIcon = IconCollection.filled.close;
const SpinnerIcon = IconCollection.outline.spinner;

const SelectComponent = (props: ISelectComponentProps): JSX.Element => {
    const {
        lang,
        ssr,
        ssrLoading,
        invisibleMenu,
        invertedZIndex,
        hasError,
        value,
        placeholder,
        multiple,
        noFooter,
        highlightWhenHasValue,
        options,
        previousOptions,
        suffix,
        clearable,
        width,
        minWidth,
        horizontalDirection,
        controlDropdown,
        label,
        onChange,
        onBlur,
        onKeywordChange,
        onOpenDropdown,
        onCloseDropdown,
        onLoad,
        ...rest
    } = props;

    const { suffixWidth, disabled, readOnly, placeholderColor } = rest;

    const dropdownAPIRef = React.useRef<IDropdownComponentAPI>();
    const dropdownContentAPIRef = React.useRef<IDropdownComponentContentAPI>();
    const dropdownMenuRef = React.useRef<HTMLDivElement>(null);
    const textboxAPIRef = React.useRef<ITextboxComponentAPI>();

    const [keyword, setKeyword] = React.useState<string>('');
    const [isFocusingTextbox, setIsFocusingTextbox] = React.useState<boolean>(false);

    const locale = React.useMemo(() => getLocale(l, lang), [lang]);
    const val = value === undefined ? [] : Array.isArray(value) ? value : [value];
    const hasClearButton = clearable && !disabled && !readOnly && !!val.length && !ssrLoading;

    const selectedOptions = options.filter((item) => val.includes(item.value));
    const filteredOptions = ssr
        ? options
        : options
              .filter((item) =>
                  new PandaText(item.label).noneViAccent.includes(
                      new PandaText(keyword).noneViAccent
                  )
              )
              .slice(0, 160);

    const handleOnTextboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        onKeywordChange?.(e.target.value);
        setKeyword(e.target.value);
    };

    const handleOnFocusTextbox = (): void => {
        if (disabled || readOnly) return;
        setIsFocusingTextbox(true);
        dropdownAPIRef.current?.open();
    };

    const handleOnBlurTextbox = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
        onBlur?.(e);
        setIsFocusingTextbox(false);
    };

    const handleOnDropdownClose = (): void => {
        onCloseDropdown?.();
        textboxAPIRef.current?.clear();
    };

    const handleOnDropdownOpen = (): void => {
        onOpenDropdown?.();
    };

    const handleOnDropdownContentVisible = (): void => {
        const opt = selectedOptions[0];
        if (!opt?.value || !dropdownMenuRef.current) return;

        const sOptEl = dropdownMenuRef.current.querySelector(`[data-value="${opt.value}"]`);
        if (!sOptEl) return;

        const rect = sOptEl.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > dropdownMenuRef.current.clientHeight) {
            dropdownMenuRef.current.scrollTop = (sOptEl as HTMLDivElement).offsetTop;
        }
    };

    const handleOnDropdownLoaded = (api: IDropdownComponentAPI): void => {
        dropdownAPIRef.current = api;
    };

    const handleOnDropdownContentLoaded = (api: IDropdownComponentContentAPI): void => {
        dropdownContentAPIRef.current = api;
    };

    const handleOnTextboxLoaded = (api: ITextboxComponentAPI): void => {
        textboxAPIRef.current = api;
    };

    const handleClearValue = (): void => {
        dropdownAPIRef.current?.close();
        if (multiple) return onChange?.([]);
        return onChange?.({
            label: '',
            value: undefined,
        });
    };

    const handleSelectAll = (): void => {
        onChange?.(options);
    };

    const handleDeselectAll = (): void => {
        onChange?.([]);
    };

    const handleOnSelectOption =
        (option: ISelectionComponentOption): VoidFunction =>
        (): void => {
            if (!multiple) {
                if (option.value !== value) onChange?.(option);
                return;
            }

            const tmp = [...selectedOptions];

            const idx = tmp.findIndex((so) => so.value === option.value);
            if (idx >= 0) tmp.splice(idx, 1);
            else tmp.push(option);

            return onChange?.(tmp);
        };

    React.useEffect(() => {
        onLoad?.({
            updateDropdownPosition: (): void => {
                dropdownContentAPIRef.current?.updatePosition?.();
            },
        });
    }, []);

    return (
        <DropdownComponent
            disabled={disabled || readOnly}
            closeOnClickInside={!multiple}
            horizontalDirection={horizontalDirection}
            controlDropdown={controlDropdown}
            invertedZIndex={invertedZIndex}
            onOpen={handleOnDropdownOpen}
            onClose={handleOnDropdownClose}
            onLoad={handleOnDropdownLoaded}
            onDropdownContentVisible={handleOnDropdownContentVisible}
            overrideOnClickTrigger={EmptyVoidFunction}
        >
            <StyledCustomDropdownComponentTrigger
                $focusing={isFocusingTextbox}
                $disabled={disabled || readOnly}
                width={width}
                minWidth={minWidth}
            >
                <StyledCustomTextboxComponent
                    {...rest}
                    width="100%"
                    highlighted={highlightWhenHasValue && !!selectedOptions.length}
                    hasError={hasError}
                    value={keyword}
                    label={selectedOptions.length ? label : undefined}
                    suffixWidth={suffixWidth || '16px'}
                    suffixCursor="pointer"
                    suffix={((): React.ReactNode => {
                        if (hasClearButton) {
                            let _color: string = token.get('global.color.grey-5');
                            if (isFocusingTextbox) _color = token.get('global.color.grey-5');
                            else if (!selectedOptions.length)
                                _color = token.get('global.color.grey-5');
                            else if (highlightWhenHasValue) _color = 'white';
                            return <CloseIcon width={16} height={16} color={_color} />;
                        }

                        return suffix || <AngleIcon width={14} height={14} />;
                    })()}
                    placeholder={((): string | undefined => {
                        if (!multiple) {
                            return selectedOptions[0]?.label || placeholder;
                        }

                        if (!selectedOptions.length) return placeholder;
                        if (selectedOptions.length === 1) {
                            return selectedOptions[0].label;
                        }
                        return `${selectedOptions[0].label} (+${selectedOptions.length - 1})`;
                    })()}
                    placeholderColor={((): string | undefined => {
                        if (isFocusingTextbox) return undefined;
                        if (!selectedOptions.length) return placeholderColor;
                        if (highlightWhenHasValue) return 'white';
                        return token.get<string>('component.textbox.text-color.default');
                    })()}
                    onChange={handleOnTextboxChange}
                    onFocus={handleOnFocusTextbox}
                    onBlur={handleOnBlurTextbox}
                    onLoaded={handleOnTextboxLoaded}
                    overrideOnClickSuffix={hasClearButton ? handleClearValue : undefined}
                />
            </StyledCustomDropdownComponentTrigger>

            <StyledCustomDropdownComponentContent
                $invisible={invisibleMenu}
                onLoad={handleOnDropdownContentLoaded}
            >
                <StyledCustomDropdownComponentMenu
                    data-name="dropdown-menu"
                    reference={dropdownMenuRef}
                    $hasFooter={multiple && filteredOptions.length >= 3}
                >
                    {filteredOptions.length ? (
                        <FlexboxComponent width="100%" direction={FlexboxDirectionEnum.column}>
                            {filteredOptions.map((opt) =>
                                multiple ? (
                                    <DropdownComponentItem
                                        data-value={opt.value}
                                        key={opt.value}
                                        bold={opt.bold}
                                        disabled={opt.disabled}
                                        onClick={handleOnSelectOption(opt)}
                                    >
                                        <CheckboxComponent
                                            isSpan
                                            disabled={opt.disabled}
                                            checked={
                                                !!selectedOptions.find(
                                                    (so) => so.value === opt.value
                                                )
                                            }
                                            label={opt.display || opt.label}
                                        />
                                    </DropdownComponentItem>
                                ) : (
                                    <DropdownComponentItem
                                        data-value={opt.value}
                                        key={opt.value}
                                        disabled={opt.disabled}
                                        bold={opt.bold}
                                        selected={
                                            !!selectedOptions.find((so) => so.value === opt.value)
                                        }
                                        onClick={handleOnSelectOption(opt)}
                                    >
                                        {opt.display || opt.label}
                                    </DropdownComponentItem>
                                )
                            )}
                        </FlexboxComponent>
                    ) : (
                        <StyledCustomDropdownComponentContentEmpty>
                            {ssrLoading ? (
                                <>
                                    {locale.get<string>('loading')}
                                    <SpinnerIcon width={16} height={16} />
                                </>
                            ) : (
                                locale.get<string>('empty')
                            )}
                        </StyledCustomDropdownComponentContentEmpty>
                    )}
                </StyledCustomDropdownComponentMenu>

                {!noFooter && multiple && filteredOptions.length >= 3 && (
                    <StyledSelectComponentDropdownFooter>
                        <button onClick={handleSelectAll}>
                            {locale.get<string>('select-all')}
                        </button>
                        <button onClick={handleDeselectAll}>
                            {locale.get<string>('deselect-all')}
                        </button>
                    </StyledSelectComponentDropdownFooter>
                )}
            </StyledCustomDropdownComponentContent>
        </DropdownComponent>
    );
};

SelectComponent.displayName = 'SelectComponent';
export { SelectComponent };

