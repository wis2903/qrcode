import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { AlignEnum, FlexboxAlignEnum } from '../../shared/type';
import { formatNumber } from '../../shared/util';
import { FlexboxComponent } from '../flexbox';
import { INumberboxComponentProps } from './type';

import {
    StyledBottomLayer,
    StyledTextboxContainer,
    StyledTextboxInput,
    StyledTextboxPrefix,
    StyledTextboxSuffix,
} from '../textbox/styled';

import {
    REGEX_NUMBER_NEGATIVE_DECIMAL,
    REGEX_NUMBER_NEGATIVE_NO_DECIMAL,
    REGEX_NUMBER_NO_NEGATIVE_DECIMAL,
    REGEX_NUMBER_NO_NEGATIVE_NO_DECIMAL,
} from './regex';

const CloseIcon = IconCollection.filled.close;

const NumberboxComponent = (props: INumberboxComponentProps): JSX.Element => {
    const {
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
        align = AlignEnum.right,
        clearable,
        highlighted,
        selectValueOnFocus,
        disabledUpdateValueFromPropsDebouncer,
        zIndex,
        max,
        allowNegative,
        allowDecimal,
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
    const [value, setValue] = React.useState<string>(String(valueFromProps || ''));

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

        let val = e.target.value.replace(/[^0-9-.]/g, '');
        if (!validateInputValue(val)) val = value;
        else if (max !== undefined && !isNaN(Number(val)) && Number(val) > max) val = value;

        if (!val.length) {
            setValue('');
            onChange?.(undefined);
        } else {
            setValue(val);
            debouncer.execute(() => {
                if (!/[0-9]+/.test(val)) return onChange?.(undefined);
                onChange?.(Number(val));
            });
        }
    };

    const validateInputValue = (val: string): boolean => {
        if (!allowDecimal) {
            switch (allowNegative) {
                case true:
                    return REGEX_NUMBER_NEGATIVE_NO_DECIMAL.test(val);
                default:
                    return REGEX_NUMBER_NO_NEGATIVE_NO_DECIMAL.test(val);
            }
        }
        if (!allowNegative) return REGEX_NUMBER_NO_NEGATIVE_DECIMAL.test(val);
        if (val === '-.' || val === '.') return false;
        return REGEX_NUMBER_NEGATIVE_DECIMAL.test(val);
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

        setValue('');
        onChange?.(undefined);
        onClear?.();
        handleFocusInput();
    };

    const input = (
        <StyledTextboxInput
            {...rest}
            $align={align}
            spellCheck={false}
            autoComplete="none"
            ref={inputRef}
            value={((): string | undefined => {
                if (value === undefined) return undefined;
                if (/^(-?)(\d+)([.])(0+)?$/.test(value)) return value;
                if (/^-?[0-9]\d*(\.\d+)?$/.test(value)) {
                    return isFocusing ? value : formatNumber(value, 10);
                }
                return value;
            })()}
            onFocus={handleOnInputFocus}
            onBlur={handleOnInputBlur}
            onChange={handleOnInputChange}
            onKeyUp={handleOnInputKeyUp}
        />
    );

    React.useEffect(() => {
        if (/^(-?)(\d+)([.])(0+)?$/.test(value) && Number(value) === valueFromProps) return;
        updateValueFromPropsDebouncer.execute(() => {
            if (!isTypingRef.current) setValue(String(valueFromProps ?? ''));
        });
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
        >
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

NumberboxComponent.displayName = 'NumberboxComponent';

export { NumberboxComponent };

