import React from 'react';
import uuid from 'react-uuid';

import { CloseIconFilled } from '../../foundation/icon/filled/close';
import { CloseIconOutline } from '../../foundation/icon/outline/close';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { KeyboardEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { OverlayComponent } from '../overlay';
import { StyledTextboxLabel } from '../textbox/styled';
import { IComboboxChip, IComboboxProps } from './type';

import {
    StyledCloseIconWrapper,
    StyledComboboxChip,
    StyledComboboxChipLabel,
    StyledComboboxChips,
    StyledComboboxContainer,
    StyledComboboxInput,
} from './styled';

interface IStateRef {
    isActive: boolean;
    focusingInput: boolean;
    inputValue: string;
    chips: IComboboxChip[];
    selectedChipId: string | undefined;
}

const closeIcon = <CloseIconOutline width={10} height={10} strokeWidth={1} />;
const whiteCloseIcon = <CloseIconOutline width={10} height={10} strokeWidth={1} color="white" />;

const ComboboxComponent = ({
    label,
    value: valueFromProps,
    placeholder,
    prefix,
    width,
    minWidth,
    maxWidth,
    readOnly,
    onChange,
}: IComboboxProps): JSX.Element => {
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [focusingInput, setFocusingInput] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [selectedChipId, setSelectedChipId] = React.useState<string | undefined>();
    const [pushingChipsDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));
    const [updateValueFromPropsDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(200));
    const [scrollChipToTheEndDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(200));
    const [chips, setChips] = React.useState<IComboboxChip[]>(
        valueFromProps
            ? valueFromProps.map((item) => ({
                  text: item,
                  id: uuid(),
              }))
            : []
    );

    const chipGroupRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const stateRef = React.useRef<IStateRef>({
        isActive,
        focusingInput,
        inputValue,
        chips,
        selectedChipId,
    });

    const handleRemoveChip = (id: string): void => {
        setChips(stateRef.current.chips.filter((item) => item.id !== id));
    };

    const handleOnInputFocus = (): void => {
        setFocusingInput(true);
        setSelectedChipId(undefined);
        handleScrollChipGroupToTheEnd();
    };

    const handleOnInputBlur = (): void => {
        setFocusingInput(false);
    };

    const handleBreakValueToChips = (val: string): void => {
        setSelectedChipId(undefined);
        const splitedValue = val.split(/\n|\r\n|\t/);
        if (splitedValue.length > 1) {
            setInputValue('');
            setChips((current) => {
                const _current = [...current];
                splitedValue.forEach(
                    (item) =>
                        !!item.trim() &&
                        _current.push({
                            id: uuid(),
                            text: item.trim(),
                        })
                );
                return _current;
            });
            pushingChipsDebouncer.execute(() => {
                handleScrollChipGroupToTheEnd();
            });
        }
    };

    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
        handleBreakValueToChips(e.target.value);
    };

    const handleOnClickContainer = (): void => {
        setIsActive(true);
        window.addEventListener('keydown', handleKeyboardEvent);
    };

    const handleOnClickOverlay = (): void => {
        setIsActive(false);
        setSelectedChipId(undefined);
        handleScrollChipGroupToTheEnd();
        handleConvertTypingValueToChip();
        window.removeEventListener('keydown', handleKeyboardEvent);
    };

    const handleConvertTypingValueToChip = (): void => {
        if (inputRef.current?.value?.trim()) {
            setChips((current) => {
                const _current = [...current];
                _current.push({
                    id: uuid(),
                    text: inputRef.current?.value.trim() || '',
                });
                return _current;
            });
            setInputValue('');
            pushingChipsDebouncer.execute(() => {
                handleScrollChipGroupToTheEnd();
            });
        }
    };

    const handleScrollChipGroupToTheEnd = (): void => {
        scrollChipToTheEndDebouncer.execute(() => {
            if (!chipGroupRef.current) return;
            chipGroupRef.current.scrollLeft = 10000000000;
        });
    };

    const handleScrollChipIntoView = (id: string | undefined): void => {
        if (!id) return;
        if (!chipGroupRef.current) return;
        const el = chipGroupRef.current.querySelector(`.combobox-chip[data-id="${id}"]`);
        chipGroupRef.current.scrollLeft = (el as HTMLElement)?.offsetLeft ?? 10000000000;
    };

    const handleFocusInput = (): void => {
        inputRef.current?.focus();
    };

    const handleClearAll = (): void => {
        setChips([]);
        setInputValue('');
        handleFocusInput();
    };

    const handleKeyboardEvent = React.useCallback((e: KeyboardEvent): void => {
        switch (e.key) {
            case KeyboardEnum.arrowLeft: {
                if (!stateRef.current.isActive || !stateRef.current.chips.length) return;
                if (stateRef.current.focusingInput && stateRef.current.inputValue) return;
                inputRef.current?.blur();
                if (!stateRef.current.selectedChipId) {
                    const chipId = stateRef.current.chips[stateRef.current.chips.length - 1]?.id;
                    setSelectedChipId(chipId);
                    handleScrollChipIntoView(chipId);
                    return;
                }
                const idx = stateRef.current.chips.findIndex(
                    (item) => item.id === stateRef.current.selectedChipId
                );
                if (idx < 0) return;
                const chipId = stateRef.current.chips[Math.max(idx - 1, 0)]?.id;
                setSelectedChipId(chipId);
                handleScrollChipIntoView(chipId);
                return;
            }
            case KeyboardEnum.arrowRight: {
                if (!stateRef.current.isActive || !stateRef.current.chips.length) return;
                if (stateRef.current.focusingInput && stateRef.current.inputValue) return;
                inputRef.current?.blur();
                const idx = stateRef.current.chips.findIndex(
                    (item) => item.id === stateRef.current.selectedChipId
                );
                if (idx < 0) return;
                const chipId =
                    stateRef.current.chips[Math.min(idx + 1, stateRef.current.chips.length - 1)]
                        ?.id;
                setSelectedChipId(chipId);
                handleScrollChipIntoView(chipId);
                return;
            }
            case KeyboardEnum.backspace: {
                if (readOnly) return;
                if (!stateRef.current.isActive || !stateRef.current.chips.length) return;
                if (stateRef.current.focusingInput && stateRef.current.inputValue) return;
                inputRef.current?.blur();
                if (!stateRef.current.selectedChipId) {
                    const chipId = stateRef.current.chips[stateRef.current.chips.length - 1]?.id;
                    setSelectedChipId(chipId);
                    handleScrollChipIntoView(chipId);
                    return;
                }
                if (stateRef.current.selectedChipId) {
                    const idx = stateRef.current.chips.findIndex(
                        (item) => item.id === stateRef.current.selectedChipId
                    );
                    if (idx >= 0) {
                        const chipId = stateRef.current.chips[Math.max(idx - 1, 0)]?.id;
                        setSelectedChipId(chipId);
                        handleScrollChipIntoView(chipId);
                    }
                    handleRemoveChip(stateRef.current.selectedChipId);
                }
                return;
            }
            case KeyboardEnum.enter:
            case KeyboardEnum.tab: {
                if (stateRef.current.focusingInput && !stateRef.current.inputValue?.trim()) {
                    setIsActive(false);
                    return;
                }
                if (!stateRef.current.focusingInput || !stateRef.current.inputValue) return;
                e.preventDefault();
                handleConvertTypingValueToChip();
                return;
            }
            case KeyboardEnum.delete: {
                if (!stateRef.current.isActive || !stateRef.current.chips.length) return;
                if (stateRef.current.focusingInput && stateRef.current.inputValue) return;
                if (stateRef.current.selectedChipId) {
                    const idx = stateRef.current.chips.findIndex(
                        (item) => item.id === stateRef.current.selectedChipId
                    );
                    if (idx >= 0) {
                        const chipId = stateRef.current.chips[Math.max(idx - 1, 0)]?.id;
                        setSelectedChipId(chipId);
                        handleScrollChipIntoView(chipId);
                    }
                    handleRemoveChip(stateRef.current.selectedChipId);
                }
                return;
            }
            default:
                return;
        }
    }, []);

    React.useEffect(() => {
        stateRef.current = { isActive, focusingInput, inputValue, chips, selectedChipId };
    }, [isActive, focusingInput, inputValue, chips, selectedChipId]);

    React.useEffect(() => {
        onChange?.(chips.map((item) => item.text.trim()));
    }, [chips]);

    React.useEffect(() => {
        updateValueFromPropsDebouncer.execute(() => {
            const _chips = valueFromProps
                ? valueFromProps.map((item) => ({
                      text: item,
                      id: uuid(),
                  }))
                : [];

            setChips(_chips);
            setSelectedChipId(
                selectedChipId && _chips.length ? _chips[_chips.length - 1].id : undefined
            );
        });
    }, [JSON.stringify(valueFromProps)]);

    React.useEffect(() => {
        handleScrollChipGroupToTheEnd();

        return (): void => {
            window.removeEventListener('keydown', handleKeyboardEvent);
            pushingChipsDebouncer.destroy();
            updateValueFromPropsDebouncer.destroy();
            scrollChipToTheEndDebouncer.destroy();
        };
    }, []);

    return (
        <>
            <StyledComboboxContainer
                $readOnly={readOnly}
                $active={isActive}
                $focusingInput={focusingInput}
                $hasLabel={!!label}
                $hasChips={!!chips.length || !!prefix}
                $highZIndex={isActive}
                $width={width}
                $minWidth={minWidth}
                $maxWidth={maxWidth}
                onClick={handleOnClickContainer}
            >
                {!!label && (
                    <StyledTextboxLabel onClick={handleFocusInput}>{label}</StyledTextboxLabel>
                )}
                {prefix ? (
                    <FlexboxComponent
                        margin="0 -4px 0 0"
                        onClick={(): void => inputRef.current?.focus()}
                    >
                        {prefix}
                    </FlexboxComponent>
                ) : !chips.length ? (
                    <FlexboxComponent width="0" onClick={(): void => inputRef.current?.focus()}>
                        {prefix}
                    </FlexboxComponent>
                ) : (
                    <></>
                )}
                {!!chips.length && (
                    <StyledComboboxChips ref={chipGroupRef}>
                        <FlexboxComponent gap={token.get<string>('global.space.xxxs')}>
                            {chips.map((item) => (
                                <StyledComboboxChip
                                    key={item.id}
                                    className="combobox-chip"
                                    tabIndex={-1}
                                    data-id={item.id}
                                    $selected={item.id === selectedChipId}
                                >
                                    <StyledComboboxChipLabel
                                        onClick={(): void => setSelectedChipId(item.id)}
                                    >
                                        {item.text}
                                    </StyledComboboxChipLabel>
                                    {!readOnly && (
                                        <span
                                            tabIndex={-1}
                                            onClick={(): void => handleRemoveChip(item.id)}
                                        >
                                            {item.id === selectedChipId
                                                ? whiteCloseIcon
                                                : closeIcon}
                                        </span>
                                    )}
                                </StyledComboboxChip>
                            ))}
                        </FlexboxComponent>
                    </StyledComboboxChips>
                )}
                <StyledComboboxInput
                    ref={inputRef}
                    value={inputValue}
                    placeholder={chips.length ? ' ' : placeholder}
                    readOnly={readOnly}
                    onChange={handleOnInputChange}
                    onFocus={handleOnInputFocus}
                    onBlur={handleOnInputBlur}
                />

                {!readOnly && (!!chips.length || inputValue) && (
                    <StyledCloseIconWrapper
                        tabIndex={-1}
                        padding={`0 ${token.get<string>('global.space.xxs')} 0 0`}
                        onClick={handleClearAll}
                    >
                        <CloseIconFilled
                            width={16}
                            height={16}
                            color={token.get('global.color.grey-5')}
                        />
                    </StyledCloseIconWrapper>
                )}
            </StyledComboboxContainer>
            {isActive && (
                <OverlayComponent onClick={handleOnClickOverlay} backgroundColor="transparent" />
            )}
        </>
    );
};

ComboboxComponent.displayName = 'ComboboxComponent';
export { ComboboxComponent };

