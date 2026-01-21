import React from 'react';

import { PandaDebouncer } from '../../shared/lib/debouncer';
import { formatNumber } from '../../shared/util';
import { StyledCustomTextboxComponent } from './styled';
import { INumberboxComponentProps } from './type';

import {
    REGEX_NUMBER_NEGATIVE_DECIMAL,
    REGEX_NUMBER_NEGATIVE_NO_DECIMAL,
    REGEX_NUMBER_NO_NEGATIVE_DECIMAL,
    REGEX_NUMBER_NO_NEGATIVE_NO_DECIMAL,
} from './regex';

const NumberboxComponentO = ({
    value: valueFromProps,
    max,
    align,
    allowNegative,
    allowDecimal,
    onChange,
    onBlur,
    ...rest
}: INumberboxComponentProps): JSX.Element => {
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));
    const [updateValueFromPropsDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));
    const [resetTypingStateDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(1000));
    const [value, setValue] = React.useState<string>(String(valueFromProps || ''));

    const isTypingRef = React.useRef<boolean>(false);

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

    const overrideHandleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        debouncer.destroy();
        updateValueFromPropsDebouncer.destroy();
        resetTypingStateDebouncer.destroy();

        isTypingRef.current = true;
        resetTypingStateDebouncer.execute(() => {
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

    const handleOnInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
        onBlur?.(e);
        if (value === '-0') {
            setValue('0');
        } else if (value.endsWith('.')) {
            setValue(value.substring(0, value.length - 1));
        } else if (!/[0-9]+/.test(value)) {
            setValue('');
        }
    };

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
        <StyledCustomTextboxComponent
            {...rest}
            $align={align}
            disabledUpdateValueFromPropsDebouncer
            value={((): string | undefined => {
                if (value === undefined) return undefined;
                if (/^(-?)(\d+)([.])(0+)?$/.test(value)) return value;
                if (/^-?[0-9]\d*(\.\d+)?$/.test(value)) return formatNumber(value, 10);
                return value;
            })()}
            onChange={overrideHandleOnInputChange}
            overrideHandleOnInputChange={overrideHandleOnInputChange}
            onBlur={handleOnInputBlur}
        />
    );
};

NumberboxComponentO.displayName = 'NumberboxComponent';
export { NumberboxComponentO };
