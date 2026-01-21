import React from 'react';

import { ButtonComponent } from '../../component/button';
import { token } from '../../foundation/token';
import { PandaDate } from '../../shared/lib/date';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { PandaObject } from '../../shared/lib/object';
import { getValidationLocale } from '../../shared/locale';
import { EMAIL_REGEX, PHONE_REGEX } from '../../shared/regex';
import { ValidationTypeEnum } from '../../shared/type';
import { animateScroll } from '../../shared/util/dom';
import { link } from '../../store';
import { ILinkedComponentProps } from '../../store/type';
import { IControllerInputValidation } from '../input/type';

import {
    IControllerFormContext,
    IControllerFormInputConfig,
    IControllerFormProps,
    IControllerFormSubmitTriggerProps,
} from './type';

export const ControllerFormContext = React.createContext<IControllerFormContext>({
    allFieldsAreValid: false,
    timestamp: +new Date(),
    inputConfigs: [],
    addInputConfig: () => undefined,
    removeInputConfig: () => undefined,
    resetAllInputConfigs: () => undefined,
    validateAll: () => true,
    validateSpecificInput: () => undefined,
    clearSpecificInputValidationError: () => undefined,
});

export const useControllerFormContext = (): IControllerFormContext =>
    React.useContext(ControllerFormContext);

export const ControllerForm = link(
    ({ store, lang, children }: IControllerFormProps & ILinkedComponentProps): JSX.Element => {
        const [timestamp, setTimestamp] = React.useState<number>(+new Date());
        const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));
        const [controllerInputs, setControllerInputs] = React.useState<
            IControllerFormInputConfig[]
        >([]);

        const locale = getValidationLocale(lang);
        const controllerInputsRef = React.useRef<IControllerFormInputConfig[]>(controllerInputs);

        const validateSpecificInputWithSpecificRule = (
            name: string,
            rule: IControllerInputValidation
        ): boolean => {
            const val = store.state.get(name);

            switch (rule.type) {
                case ValidationTypeEnum.required:
                    if (
                        val === undefined ||
                        val === '' ||
                        (Array.isArray(val) && !val.length) ||
                        (typeof val === 'string' && !String(val).trim())
                    ) {
                        store.update(`validation.${name}`, {
                            type: rule.type,
                            message: rule.message || locale.get<string>('required'),
                        });
                        return false;
                    }
                    if (
                        store.state.get<IControllerInputValidation>(`validation.${name}`)?.type ===
                        rule.type
                    ) {
                        clearSpecificInputValidationError(name);
                    }
                    return true;
                case ValidationTypeEnum.email:
                    if (val !== undefined && val !== '' && !EMAIL_REGEX.test(String(val))) {
                        store.update(`validation.${name}`, {
                            type: rule.type,
                            message: rule.message || locale.get<string>('invalid-email'),
                        });
                        return false;
                    }
                    if (
                        store.state.get<IControllerInputValidation>(`validation.${name}`)?.type ===
                        rule.type
                    ) {
                        clearSpecificInputValidationError(name);
                    }
                    return true;
                case ValidationTypeEnum.phone:
                    if (val !== undefined && val !== '' && !PHONE_REGEX.test(String(val))) {
                        store.update(`validation.${name}`, {
                            type: rule.type,
                            message: rule.message || locale.get<string>('invalid-phone'),
                        });
                        return false;
                    }
                    if (
                        store.state.get<IControllerInputValidation>(`validation.${name}`)?.type ===
                        rule.type
                    ) {
                        clearSpecificInputValidationError(name);
                    }
                    return true;
                case ValidationTypeEnum.future:
                    if (
                        val !== undefined &&
                        val !== '' &&
                        val instanceof Date &&
                        new PandaDate(val).beginOfTheDay.raw.valueOf() <
                            new PandaDate().beginOfTheDay.raw.valueOf()
                    ) {
                        store.update(`validation.${name}`, {
                            type: rule.type,
                            message: rule.message || locale.get<string>('future-date'),
                        });
                        return false;
                    }
                    if (
                        store.state.get<IControllerInputValidation>(`validation.${name}`)?.type ===
                        rule.type
                    ) {
                        clearSpecificInputValidationError(name);
                    }
                    return true;
                default:
                    if (
                        store.state.get<IControllerInputValidation>(`validation.${name}`)?.type ===
                        rule.type
                    ) {
                        clearSpecificInputValidationError(name);
                    }
                    return true;
            }
        };

        const validateSpecificInput = (name: string): boolean => {
            const input = controllerInputs.find((item) => item.name === name);
            if (!input || !input.validation) return true;
            const _validations = Array.isArray(input.validation)
                ? [...input.validation]
                : !input.validation
                ? []
                : [input.validation];
            if (!_validations.length) return true;
            for (const rule of _validations) {
                if (!validateSpecificInputWithSpecificRule(name, rule)) return false;
            }
            clearSpecificInputValidationError(name);
            return true;
        };

        const clearSpecificInputValidationError = (name: string): void => {
            if (!store.state.get(`validation.${name}`)) return;
            store.update(`validation.${name}`, undefined);
        };

        React.useEffect(() => {
            controllerInputsRef.current = controllerInputs;
        }, [controllerInputs]);

        React.useEffect(() => {
            return (): void => {
                const validationInStore = store.state.get<Record<string, unknown>>('validation');
                if (typeof validationInStore !== 'object') return;
                const p = new PandaObject(validationInStore);
                controllerInputsRef.current.forEach((input) => {
                    if (!input.validation) return;
                    p.update(input.name, undefined);
                });
                store.update('validation', p.raw);

                debouncer.destroy();
            };
        }, []);

        return (
            <ControllerFormContext.Provider
                value={{
                    timestamp,
                    inputConfigs: controllerInputs,
                    allFieldsAreValid: ((): boolean => {
                        if (!controllerInputs.length) return false;

                        for (const input of controllerInputs) {
                            const _validations = Array.isArray(input.validation)
                                ? [...input.validation]
                                : !input.validation
                                ? []
                                : [input.validation];
                            if (!_validations.length) continue;
                            for (const valiation of _validations) {
                                if (valiation.type !== ValidationTypeEnum.required) continue;
                                const val = store.state.get(input.name);
                                if (
                                    val === undefined ||
                                    val === '' ||
                                    (Array.isArray(val) && !val.length) ||
                                    (typeof val === 'string' && !String(val).trim())
                                ) {
                                    return false;
                                }
                            }
                            if (store.state.get(`validation.${input.name}.message`)) return false;
                        }

                        return true;
                    })(),
                    addInputConfig: (config) =>
                        setControllerInputs((current) => [...current, config]),
                    removeInputConfig: (name) =>
                        setControllerInputs((current) =>
                            current.filter((input) => input.name !== name)
                        ),
                    resetAllInputConfigs: (): void => {
                        setControllerInputs([]);
                        setTimestamp(+new Date());
                    },
                    validateSpecificInput: (name): void => {
                        debouncer.execute(() => validateSpecificInput(name));
                    },
                    validateAll: (config): boolean => {
                        let flag = true;
                        controllerInputs.forEach((input) => {
                            if (!validateSpecificInput(input.name)) flag = false;
                        });
                        setTimeout(() => {
                            const fullWidthLayoutContent = document.getElementsByClassName(
                                token.get<string>('global.util.full-width-layout-content.class')
                            )?.[0];
                            const validationErrorEl = document.getElementsByClassName(
                                'controller-input-validation-error'
                            )?.[0];
                            if (validationErrorEl && !config?.withoutScrollingToInvalidInput) {
                                animateScroll({
                                    el: fullWidthLayoutContent as HTMLDivElement,
                                    target: Math.max(
                                        validationErrorEl.getBoundingClientRect().top +
                                            window.scrollY -
                                            100,
                                        0
                                    ),
                                    duration: 500,
                                });
                            }
                        }, 300);
                        return flag;
                    },
                    clearSpecificInputValidationError,
                }}
            >
                {children}
            </ControllerFormContext.Provider>
        );
    }
);

export const ControllerFormSubmitTrigger = ({
    onSubmit,
    onBeforeSubmit,
    ...rest
}: IControllerFormSubmitTriggerProps): JSX.Element => {
    const controllerFormCtx = useControllerFormContext();
    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(300));

    return (
        <ButtonComponent
            {...rest}
            disabled={!controllerFormCtx.allFieldsAreValid || rest.disabled}
            onClick={(): void => {
                onBeforeSubmit?.();
                debouncer.execute(() => {
                    if (!controllerFormCtx.validateAll()) return;
                    onSubmit?.();
                });
            }}
        />
    );
};
