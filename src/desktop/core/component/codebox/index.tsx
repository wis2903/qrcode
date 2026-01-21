import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { FlexboxAlignEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { ICodeboxComponentProps } from './type';

import {
    StyledBottomLayer,
    StyledTextboxContainer,
    StyledTextboxInput,
    StyledTextboxLabel,
    StyledTextboxPrefix,
    StyledTextboxSuffix,
} from '../textbox/styled';

const CloseIcon = IconCollection.filled.close;

const CodeboxComponent = (props: ICodeboxComponentProps): JSX.Element => {
    const {
        label,
        required,
        hasError,
        placeholderColor,
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
        ...rest
    } = props;

    const { disabled, readOnly, value: valueFromProps, onChange, onKeyUp } = rest;

    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));
    const [updateValueFromPropsDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));
    const [resetTypingStateDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(1000));
    const [isFocusing, setIsFocusing] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>(valueFromProps || '');

    const isTypingRef = React.useRef<boolean>(false);

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

        resetTypingStateDebouncer.execute((): void => {
            isTypingRef.current = false;
        });

        if (!e.target.value) {
            setValue('');
            debouncer.execute(() => {
                onChange?.(undefined);
            });
            return;
        }

        let val = e.target.value;
        if (!validateInputValue(val)) val = value;
        else {
            debouncer.execute(() => {
                onChange?.(val);
            });
        }
        setValue(val);
    };

    const validateInputValue = (val: string): boolean => {
        if (/[^0-9a-zA-Z_-]/.test(val)) return false;
        return true;
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

        onChange?.(undefined);
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
        if (disabledUpdateValueFromPropsDebouncer) {
            setValue(valueFromProps || '');
        } else {
            updateValueFromPropsDebouncer.execute(() => {
                if (!isTypingRef.current) setValue(valueFromProps || '');
            });
        }
    }, [valueFromProps]);

    React.useEffect(() => {
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
            $width={width}
            $minWidth={minWidth}
            $maxWidth={maxWidth}
            $placeholderColor={placeholderColor}
            $zIndex={zIndex}
            $suffixWidth={suffixWidth}
            $highlighted={highlighted}
            $hasLabel={!!label}
        >
            <StyledBottomLayer onClick={handleFocusInput} />
            {!!label && (
                <StyledTextboxLabel>
                    {label} {required && !readOnly ? <span>*</span> : ''}
                </StyledTextboxLabel>
            )}
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

CodeboxComponent.displayName = 'CodeboxComponent';

export { CodeboxComponent };
