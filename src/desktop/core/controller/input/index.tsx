import React from 'react';
import uuid from 'react-uuid';

import { AutocompleteComponent } from '../../component/autocomplete';
import { IAutocompleteComponentProps } from '../../component/autocomplete/type';
import { CodeboxComponent } from '../../component/codebox';
import { ICodeboxComponentProps } from '../../component/codebox/type';
import { ComboboxComponent } from '../../component/combobox';
import { IComboboxProps } from '../../component/combobox/type';
import { DatePickerComponent } from '../../component/datepicker';
import { IDatePickerComponentProps } from '../../component/datepicker/type';
import { EditorComponent } from '../../component/editor';
import { IEditorComponentProps } from '../../component/editor/type';
import { FlexboxComponent } from '../../component/flexbox';
import { NumberboxComponent } from '../../component/numberbox';
import { INumberboxComponentProps } from '../../component/numberbox/type';
import { PaginationComponent } from '../../component/pagination';
import { IPaginationComponentProps } from '../../component/pagination/type';
import { PlainTextComponent } from '../../component/plain';
import { SelectComponent } from '../../component/select';
import { MultipleSelectComponent } from '../../component/select/multiple';
import { SingleSelectComponent } from '../../component/select/single';
import { TextareaComponent } from '../../component/textarea';
import { ITextareaComponentProps } from '../../component/textarea/type';
import { TextboxComponent } from '../../component/textbox';
import { ITextboxComponentProps } from '../../component/textbox/type';
import { TimePickerComponent } from '../../component/time-picker';
import { ITimePickerComponentProps } from '../../component/time-picker/type';
import { TimeZonePickerComponent } from '../../component/time-zone-picker';
import { ITimeZonePickerComponentProps } from '../../component/time-zone-picker/type';
import { WarningIconFilled } from '../../foundation/icon/filled/warning';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { ValidationTypeEnum } from '../../shared/type';
import { isSingleElementChildren } from '../../shared/util';
import { link } from '../../store';
import { ILinkedComponentProps } from '../../store/type';
import { useControllerFormContext } from '../form';
import { StyledValidationMessage } from './styled';
import { IControllerInputProps } from './type';

import {
    IMultipleSelectComponentProps,
    ISelectComponentProps,
    ISingleSelectComponentProps,
} from '../../component/select/type';

const ControllerInputTemplate = ({
    store,
    children,
    name,
    subname,
    label: labelFromProps,
    validation,
    triggerValidateOnBlur,
}: IControllerInputProps & ILinkedComponentProps): JSX.Element => {
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(100));

    const controllerFormCtx = useControllerFormContext();
    const mountedRef = React.useRef<boolean>(false);
    const testId = name.replace(/[.]/g, '-');
    const label = ((): React.ReactNode => {
        if (!labelFromProps) return undefined;
        const required = Array.isArray(validation)
            ? validation.find((rule) => rule.type === ValidationTypeEnum.required)
            : validation?.type === ValidationTypeEnum.required;
        return (
            <FlexboxComponent width="100%" gap={token.get<string>('global.space.xxxs')}>
                <PlainTextComponent
                    text={labelFromProps}
                    fontSize={token.get<string>('global.typo.font-size-8')}
                />
                {required && (
                    <PlainTextComponent
                        text="*"
                        fontSize={token.get<string>('global.typo.font-size-8')}
                        color={token.get<string>('global.color.red-4')}
                    />
                )}
            </FlexboxComponent>
        );
    })();
    const validationErrorMessage = ((): React.ReactNode => {
        const message = store.state.get<string>(`validation.${name}.message`);
        if (!message) return undefined;
        return (
            <StyledValidationMessage className="controller-input-validation-error">
                <WarningIconFilled
                    width={12}
                    height={12}
                    color={token.get<string>('global.color.red-4')}
                />
                {message}
            </StyledValidationMessage>
        );
    })();

    React.useEffect(() => {
        if (!mountedRef.current) return;

        if (!controllerFormCtx.inputConfigs.find((item) => item.name === name)) {
            controllerFormCtx.addInputConfig({ name, validation });
        }
    }, [controllerFormCtx.timestamp]);

    React.useEffect(() => {
        debouncer.execute(() => {
            mountedRef.current = true;
        });
        if (!controllerFormCtx.inputConfigs.find((item) => item.name === name)) {
            controllerFormCtx.addInputConfig({ name, validation });
        }
        return (): void => {
            mountedRef.current = false;
            debouncer.destroy();
            controllerFormCtx.removeInputConfig(name);
            controllerFormCtx.clearSpecificInputValidationError(name);
        };
    }, []);

    if (!isSingleElementChildren(children))
        return (
            <>
                {label}
                {children}
            </>
        );

    switch (Object(children?.type).displayName) {
        case 'TextboxComponent': {
            const { onChange, onBlur, value, ...rest } = children?.props as ITextboxComponentProps;
            return (
                <>
                    {label}
                    <TextboxComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get<string>(name)}
                        onChange={(e): void => {
                            store?.update(name, e.target.value);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(e);
                        }}
                        onBlur={(): void => {
                            if (triggerValidateOnBlur)
                                controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'TextareaComponent': {
            const { onChange, onBlur, value, ...rest } = children?.props as ITextareaComponentProps;
            return (
                <>
                    {label}
                    <TextareaComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get<string>(name)}
                        onChange={(e): void => {
                            store?.update(name, e.target.value);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(e);
                        }}
                        onBlur={(): void => {
                            if (triggerValidateOnBlur)
                                controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'NumberboxComponent': {
            const { onChange, onBlur, value, ...rest } =
                children?.props as INumberboxComponentProps;

            return (
                <>
                    {label}
                    <NumberboxComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get<number>(name)}
                        onChange={(val?: number): void => {
                            store?.update(name, val);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(val);
                        }}
                        onBlur={(): void => {
                            if (triggerValidateOnBlur)
                                controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'CodeboxComponent': {
            const { onChange, onBlur, value, ...rest } = children?.props as ICodeboxComponentProps;

            return (
                <>
                    {label}
                    <CodeboxComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get<string>(name)}
                        onChange={(val?: string): void => {
                            store?.update(name, val);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(val);
                        }}
                        onBlur={(): void => {
                            if (triggerValidateOnBlur)
                                controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'SelectComponent': {
            const { onChange, onBlur, value, ...rest } = children?.props as ISelectComponentProps;
            return (
                <>
                    {label}
                    <SelectComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get(name)}
                        onChange={(option): void => {
                            if (!Array.isArray(option)) {
                                store.update(name, option.value);
                                controllerFormCtx.validateSpecificInput(name);
                            } else {
                                store?.update(
                                    name,
                                    option.map((item) => item.value)
                                );
                                controllerFormCtx.validateSpecificInput(name);
                            }
                            onChange?.(option);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'AutocompleteComponent': {
            const { onChange, onBlur, value, ...rest } =
                children?.props as IAutocompleteComponentProps;

            return (
                <>
                    {label}
                    <AutocompleteComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get(name)}
                        onChange={(option): void => {
                            if (!Array.isArray(option)) {
                                store?.update(name, option.value);
                                controllerFormCtx.validateSpecificInput(name);
                            } else {
                                store?.update(
                                    name,
                                    option.map((item) => item.value)
                                );
                                controllerFormCtx.validateSpecificInput(name);
                            }
                            onChange?.(option);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'SingleSelectComponent': {
            const { onChange, onBlur, value, ...rest } =
                children?.props as ISingleSelectComponentProps;
            return (
                <>
                    {label}
                    <SingleSelectComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get(name)}
                        onChange={(option): void => {
                            store?.update(name, option.value);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(option);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'MultipleSelectComponent': {
            const { onChange, onBlur, value, ...rest } =
                children?.props as IMultipleSelectComponentProps;
            return (
                <>
                    {label}
                    <MultipleSelectComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get(name)}
                        onChange={(option): void => {
                            store?.update(
                                name,
                                option.map((item) => item.value)
                            );
                            onChange?.(option);
                            controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'DatePickerComponent': {
            const { onChange, onBlur, value, ...rest } =
                children?.props as IDatePickerComponentProps;
            return (
                <>
                    {label}
                    <DatePickerComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get(name)}
                        onChange={(date): void => {
                            store?.update(name, date);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(date);
                        }}
                        onBlur={(): void => {
                            if (triggerValidateOnBlur)
                                controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'TimePickerComponent': {
            const { onChange, onBlur, value, ...rest } =
                children?.props as ITimePickerComponentProps;
            return (
                <>
                    {label}
                    <TimePickerComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get(name)}
                        onChange={(time): void => {
                            store?.update(name, time);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(time);
                        }}
                        onBlur={(): void => {
                            if (triggerValidateOnBlur)
                                controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'TimeZonePickerComponent': {
            const { onChange, onBlur, value, ...rest } =
                children?.props as ITimeZonePickerComponentProps;
            return (
                <>
                    {label}
                    <TimeZonePickerComponent
                        {...rest}
                        data-testid={testId}
                        hasError={!!validationErrorMessage}
                        value={store?.state.get(name)}
                        onChange={(timeZone, meta): void => {
                            store?.update(name, timeZone);
                            controllerFormCtx.validateSpecificInput(name);
                            onChange?.(timeZone, meta);
                        }}
                        onBlur={(): void => {
                            if (triggerValidateOnBlur)
                                controllerFormCtx.validateSpecificInput(name);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'ComboboxComponent': {
            const { onChange, value, ...rest } = children?.props as IComboboxProps;
            return (
                <>
                    {label}
                    <ComboboxComponent
                        {...rest}
                        data-testid={testId}
                        value={store?.state.get(name)}
                        onChange={(value): void => {
                            store?.update(name, value);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'EditorComponent': {
            const { onChange, value, ...rest } = children?.props as IEditorComponentProps;
            return (
                <>
                    {label}
                    <EditorComponent
                        {...rest}
                        data-testid={testId}
                        value={store?.state.get(name)}
                        onChange={(value): void => {
                            store?.update(name, value);
                        }}
                    />
                    {validationErrorMessage}
                </>
            );
        }
        case 'PaginationComponent': {
            const { onChange, value, pageSize, ...rest } =
                children?.props as IPaginationComponentProps;
            return (
                <PaginationComponent
                    {...rest}
                    data-testid={testId}
                    value={store?.state.get(name)}
                    pageSize={subname ? Number(store?.state.get(subname)) : 10}
                    onChange={({ value, pageSize }): void => {
                        store?.update(name, value);
                        store?.update(subname || '', pageSize);
                    }}
                />
            );
        }
        default:
            return (
                <>
                    {label}
                    {children}
                </>
            );
    }
};

export const ControllerInput = ({ children, ...rest }: IControllerInputProps): JSX.Element => {
    const { name, subname } = rest;

    const ControllerInputWithStore = link(ControllerInputTemplate, {
        watch: [name || uuid(), subname || uuid()],
    });
    return <ControllerInputWithStore {...rest}>{children}</ControllerInputWithStore>;
};
