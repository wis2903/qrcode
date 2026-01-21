import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { FlexboxAlignEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { ITextboxComponentProps } from './type';

import {
    StyledBottomLayer,
    StyledTextboxContainer,
    StyledTextboxInput,
    StyledTextboxLabel,
    StyledTextboxPrefix,
    StyledTextboxSuffix,
} from './styled';

const CloseIcon = IconCollection.filled.close;

const TextboxComponent = (props: ITextboxComponentProps): JSX.Element => {
    const {
        label,
        small,
        hasError,
        placeholderColor,
        height,
        width,
        minWidth,
        maxWidth,
        suffix,
        suffixWidth,
        suffixCursor,
        prefix,
        prefixColor,
        prefixFontSize,
        align,
        clearable,
        highlighted,
        selectValueOnFocus,
        disabledUpdateValueFromPropsDebouncer,
        zIndex,
        onFocus,
        onBlur,
        onClear,
        onEnter,
        overrideOnClickSuffix,
        overrideHandleOnInputChange,
        onLoaded,
        ...rest
    } = props;

    const { disabled, readOnly, value: valueFromProps, onChange, onKeyUp } = rest;

    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));
    const [updateValueFromPropsDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));
    const [resetTypingStateDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(1000));
    const [isFocusing, setIsFocusing] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>(valueFromProps || '');

    const isTypingRef = React.useRef<boolean>(false);
    const valueFromPropsRef = React.useRef<string | undefined>(valueFromProps);

    const hasClearButton = clearable && !disabled && !readOnly && !!value;
    const _suffix = hasClearButton ? (
        <CloseIcon
            width={16}
            height={16}
            color={highlighted && !isFocusing ? 'white' : token.get('global.color.grey-5')}
        />
    ) : (
        suffix
    );
    const inputRef = React.useRef<HTMLInputElement>(null);
    const prefixRef = React.useRef<HTMLDivElement>(null);
    const suffixRef = React.useRef<HTMLDivElement>(null);

    const handleOnInputFocus = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
        e.target.setAttribute('autocomplete', 'none');
        setIsFocusing(true);
        onFocus?.(e);
        if (selectValueOnFocus) e.target.select();
    };

    const handleOnInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
        setIsFocusing(false);
        onBlur?.(e);
    };

    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (overrideHandleOnInputChange) return overrideHandleOnInputChange?.(e);

        resetTypingStateDebouncer.destroy();
        updateValueFromPropsDebouncer.destroy();
        isTypingRef.current = true;
        const val = e.target.value;
        setValue(val);
        resetTypingStateDebouncer.execute(() => {
            isTypingRef.current = false;
        });
        debouncer.execute(() => {
            onChange?.(e);
        });
    };

    const handleOnInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') onEnter?.();
        onKeyUp?.(e);
    };

    const handleFocusInput = (): void => {
        inputRef.current?.focus();
    };

    const handleOnClickSuffix = (): void => {
        if (overrideOnClickSuffix) return overrideOnClickSuffix();
        if (!hasClearButton) return handleFocusInput();

        const el: HTMLInputElement = document.createElement('input');
        el.value = '';
        const e = new Event('change');
        Object.defineProperty(e, 'target', { writable: false, value: el });
        setValue('');
        onChange?.(e as never);
        onClear?.();
        handleFocusInput();
    };

    const input = (
        <StyledTextboxInput
            {...rest}
            spellCheck={false}
            autoComplete="none"
            ref={inputRef}
            value={value}
            onFocus={handleOnInputFocus}
            onBlur={handleOnInputBlur}
            onChange={handleOnInputChange}
            onKeyUp={handleOnInputKeyUp}
        />
    );

    React.useEffect(() => {
        valueFromPropsRef.current = valueFromProps;

        if (disabledUpdateValueFromPropsDebouncer) {
            setValue(valueFromProps || '');
        } else {
            updateValueFromPropsDebouncer.execute(() => {
                if (!isTypingRef.current) setValue(valueFromProps || '');
            });
        }
    }, [valueFromProps]);

    React.useEffect(() => {
        onLoaded?.({
            clear: (): void => {
                setValue('');
                const el: HTMLInputElement = document.createElement('input');
                el.value = '';

                if (valueFromPropsRef.current) {
                    const e = new Event('change');
                    Object.defineProperty(e, 'target', { writable: false, value: el });
                    onChange?.(e as never);
                }
            },
        });

        return (): void => {
            isTypingRef.current = false;
            debouncer.destroy();
            updateValueFromPropsDebouncer.destroy();
            resetTypingStateDebouncer.destroy();
        };
    }, []);

    return (
        <StyledTextboxContainer
            $hasError={hasError}
            $isFocusing={isFocusing}
            $disabled={disabled}
            $readOnly={readOnly}
            $align={align}
            $height={height}
            $width={width}
            $minWidth={minWidth}
            $maxWidth={maxWidth}
            $placeholderColor={placeholderColor}
            $zIndex={zIndex}
            $suffixWidth={suffixWidth}
            $highlighted={highlighted}
            $hasLabel={!!label}
            $small={small}
        >
            {!!label && <StyledTextboxLabel onClick={handleFocusInput}>{label}</StyledTextboxLabel>}
            <StyledBottomLayer onClick={handleFocusInput} />
            {prefix ? (
                <FlexboxComponent
                    width="100%"
                    align={FlexboxAlignEnum.center}
                    gap={token.get<string>('global.space.xxxs')}
                >
                    <StyledTextboxPrefix
                        $color={prefixColor}
                        $fontSize={prefixFontSize}
                        reference={prefixRef}
                        whiteSpace="nowrap"
                        onClick={handleFocusInput}
                    >
                        {prefix}
                    </StyledTextboxPrefix>
                    {input}
                </FlexboxComponent>
            ) : (
                input
            )}
            {!!_suffix && (
                <StyledTextboxSuffix
                    $isPointer={hasClearButton || suffixCursor === 'pointer'}
                    $disabled={disabled || readOnly}
                    reference={suffixRef}
                    whiteSpace="nowrap"
                    onClick={handleOnClickSuffix}
                    width={suffixWidth}
                >
                    {_suffix}
                </StyledTextboxSuffix>
            )}
        </StyledTextboxContainer>
    );
};

TextboxComponent.displayName = 'TextboxComponent';

export { TextboxComponent };
