import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { SelectComponent } from '../select';
import { ISelectComponentAPI, ISelectionComponentOption } from '../select/type';
import { IAutocompleteComponentProps } from './type';

const SpinnerIcon = IconCollection.outline.spinner;

const AutocompleteComponent = (props: IAutocompleteComponentProps): JSX.Element => {
    const { forcedTriggerSearchOnDropdownOpen, search, searchByValue, onReady, ...rest } = props;
    const { onOpenDropdown, onKeywordChange, onChange, suffix, value } = rest;

    const [debouncer500] = React.useState<PandaDebouncer>(new PandaDebouncer(500));
    const [debouncer100] = React.useState<PandaDebouncer>(new PandaDebouncer(100));
    const [options, setOptions] = React.useState<ISelectionComponentOption[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<ISelectionComponentOption[]>([]);
    const [searching, setSearching] = React.useState<boolean>(false);
    const [searchingByValue, setSearchingByValue] = React.useState<boolean>(false);

    const selectAPIRef = React.useRef<ISelectComponentAPI>();
    const isOpeningDropdownRef = React.useRef<boolean>(false);

    const distinctOptions = (opts?: ISelectionComponentOption[]): ISelectionComponentOption[] => {
        const arr: ISelectionComponentOption[] = [...(opts || options)];
        selectedOptions.forEach((opt) => {
            if (!arr.find((item) => item.value === opt.value)) {
                arr.push(opt);
            }
        });
        return arr;
    };

    const handleSearch = async (kwd: string): Promise<void> => {
        try {
            setSearching(true);
            const response = await search(kwd);
            setOptions(distinctOptions(response));
            setSearching(false);

            debouncer100.execute(() => {
                selectAPIRef.current?.updateDropdownPosition();
            });
        } catch (e) {
            //
        }
    };

    const handleOnKeywordChange = (kwd: string): void => {
        onKeywordChange?.(kwd);
        debouncer500.execute((): void => {
            isOpeningDropdownRef.current && handleSearch(kwd);
        });
    };

    const handleOnOpenDropdown = (): void => {
        isOpeningDropdownRef.current = true;
        onOpenDropdown?.();
        if (!forcedTriggerSearchOnDropdownOpen && options.length > 1) return;
        handleSearch('');
    };

    const handleOnCloseDropdown = (): void => {
        isOpeningDropdownRef.current = false;
        setOptions(distinctOptions());
    };

    const handleOnChange = (
        option: ISelectionComponentOption | ISelectionComponentOption[]
    ): void => {
        if (!onChange) return;
        onChange(option);

        let opt: ISelectionComponentOption[];
        if (Array.isArray(option)) opt = option;
        else opt = [option];
        setSelectedOptions(opt.filter((item) => !!item.value));
    };

    const handleOnLoad = (api: ISelectComponentAPI): void => {
        selectAPIRef.current = api;
    };

    React.useEffect(() => {
        const val = !value ? [] : Array.isArray(value) ? value : [value];
        if (val.length) {
            setSearchingByValue(true);
            searchByValue?.(value)
                .then((response) => {
                    const opts = !response ? [] : Array.isArray(response) ? response : [response];
                    setSelectedOptions(opts);
                    setOptions(opts);
                })
                .finally(() => {
                    setSearchingByValue(false);
                });
        }

        onReady?.({
            clearSelectedOptions: () => setSelectedOptions([]),
        });

        return (): void => {
            debouncer100.destroy();
            debouncer500.destroy();
        };
    }, []);

    React.useEffect(() => {
        const val = !value ? [] : Array.isArray(value) ? value : [value];
        if (!val.length) setSelectedOptions([]);
    }, [value]);

    return (
        <SelectComponent
            {...rest}
            ssr
            ssrLoading={searching || searchingByValue}
            onOpenDropdown={handleOnOpenDropdown}
            onCloseDropdown={handleOnCloseDropdown}
            options={options}
            suffix={
                searchingByValue || (searching && options.length) ? (
                    <SpinnerIcon width={16} height={16} />
                ) : (
                    suffix
                )
            }
            onKeywordChange={handleOnKeywordChange}
            onChange={handleOnChange}
            onLoad={handleOnLoad}
        />
    );
};

AutocompleteComponent.displayName = 'AutocompleteComponent';

export { AutocompleteComponent };
