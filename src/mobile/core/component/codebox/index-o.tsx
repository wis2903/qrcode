import React from 'react';

import { PandaDebouncer } from '../../shared/lib/debouncer';
import { TextboxComponent } from '../textbox';
import { ICodeboxComponentProps } from './type';

const CodeboxComponentO = ({
    value: valueFromProps,
    onChange,
    ...rest
}: ICodeboxComponentProps): JSX.Element => {
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));
    const [updateValueFromPropsDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));
    const [resetTypingStateDebouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(1000));
    const [value, setValue] = React.useState<string>(String(valueFromProps || ''));

    const isTypingRef = React.useRef<boolean>(false);

    const validateInputValue = (val: string): boolean => {
        if (/[^0-9a-zA-Z_-]/.test(val)) return false;
        return true;
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

        let val = e.target.value;
        if (!validateInputValue(val)) val = value;
        setValue(val);
        debouncer.execute(() => {
            onChange?.(val);
        });
    };

    React.useEffect(() => {
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
        <TextboxComponent
            {...rest}
            disabledUpdateValueFromPropsDebouncer
            value={value}
            onChange={overrideHandleOnInputChange}
            overrideHandleOnInputChange={overrideHandleOnInputChange}
        />
    );
};

CodeboxComponentO.displayName = 'CodeboxComponent';
export { CodeboxComponentO };

