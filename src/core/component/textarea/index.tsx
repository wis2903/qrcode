import React from 'react';

import { PandaDebouncer } from '../../shared/lib/debouncer';
import { StyledTextareaComponentContainer, StyledTextareaComponentInput } from './styled';
import { ITextareaComponentProps } from './type';
import { StyledTextboxLabel } from '../textbox/styled';

const TextareaComponent = (props: ITextareaComponentProps): JSX.Element => {
    const { label, width, hasError, onFocus, onBlur, onChange, ...rest } = props;
    const { rows, disabled, readOnly, value: valueFromProps } = rest;

    const [isFocusing, setIsFocusing] = React.useState<boolean>(false);
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));
    const [updateValueFromPropsDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));
    const [resetTypingStateDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(1000));
    const [value, setValue] = React.useState<string>(valueFromProps || '');

    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const isTypingRef = React.useRef<boolean>(false);

    const handleOnInputFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>): void => {
        setIsFocusing(true);
        onFocus?.(e);
    };

    const handleOnInputBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>): void => {
        setIsFocusing(false);
        onBlur?.(e);
    };

    const handleFocusInput = (): void => {
        inputRef.current?.focus();
    };

    const handleOnInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        resetTypingStateDebouncer.destroy();
        updateValueFromPropsDebouncer.destroy();
        isTypingRef.current = true;
        setValue(e.target.value);
        resetTypingStateDebouncer.execute(() => {
            isTypingRef.current = false;
        });
        debouncer.execute(() => {
            onChange?.(e);
        });
    };

    React.useEffect(() => {
        updateValueFromPropsDebouncer.execute(() => {
            if (!isTypingRef.current) setValue(valueFromProps || '');
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
        <StyledTextareaComponentContainer
            $isFocusing={isFocusing}
            $width={width}
            $disabled={disabled}
            $readOnly={readOnly}
            $hasError={hasError}
        >
            {!!label && <StyledTextboxLabel onClick={handleFocusInput}>{label}</StyledTextboxLabel>}
            <StyledTextareaComponentInput
                {...rest}
                $hasLabel={!!label}
                rows={rows || 5}
                ref={inputRef}
                value={value}
                onFocus={handleOnInputFocus}
                onBlur={handleOnInputBlur}
                onChange={handleOnInputChange}
            />
        </StyledTextareaComponentContainer>
    );
};

TextareaComponent.displayName = 'TextareaComponent';

export { TextareaComponent };
