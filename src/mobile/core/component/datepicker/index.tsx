import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { EmptyVoidFunction } from '../../shared/constant';
import { PandaDate } from '../../shared/lib/date';
import { CalendarComponent } from '../calendar';
import { ICalendarComponentAPI } from '../calendar/type';
import { DropdownComponent } from '../dropdown';
import { IDropdownComponentAPI } from '../dropdown/type';
import { IDatePickerComponentProps } from './type';

import {
    StyledCustomDropdownComponentContent,
    StyledCustomDropdownComponentTrigger,
    StyledCustomTextboxComponent,
} from './styled';

const CloseIcon = IconCollection.filled.close;
const CalendarIcon = IconCollection.outline.calendar;

const DatePickerComponent = (props: IDatePickerComponentProps): JSX.Element => {
    const {
        disabled,
        readOnly,
        hasError,
        placeholder,
        width,
        minWidth,
        prefix,
        suffix,
        suffixWidth,
        clearable,
        highlightWhenHasValue,
        horizontalDirection,
        label,
        onChange,
        onLoad,
        onBlur,
        ...rest
    } = props;

    const { value, lang } = rest;

    const [isFocusingTextbox, setIsFocusingTextbox] = React.useState<boolean>(false);
    const [typingText, setTypingText] = React.useState<string>('');

    const dropdownAPIRef = React.useRef<IDropdownComponentAPI>();
    const calendarAPIRef = React.useRef<ICalendarComponentAPI>();
    const hasClearButton = clearable && !disabled && !readOnly && !!value;

    const handleOnFocusTextbox = (): void => {
        if (disabled || readOnly) return;
        setIsFocusingTextbox(true);
        dropdownAPIRef.current?.open();
    };

    const handleOnCalendarChange = (dt: Date): void => {
        onChange?.(dt);
    };

    const handleOnClickCalendarDateItem = (): void => {
        dropdownAPIRef.current?.close();
    };

    const handleOnBlurTextbox = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
        onBlur?.(e);
        setIsFocusingTextbox(false);
    };

    const handleOnTextboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTypingText(e.target.value);
    };

    const handleOnDropdownLoaded = (api: IDropdownComponentAPI): void => {
        dropdownAPIRef.current = api;
    };

    const handleOnCalendarLoaded = (api: ICalendarComponentAPI): void => {
        calendarAPIRef.current = api;
        onLoad?.(api);
    };

    const parseDateFromTypingText = (): Date | undefined => {
        if (!/^[0-9]{1,4}[-/]{1}[0-9]{1,2}[-/]{1}[0-9]{1,4}$/.test(typingText)) return undefined;
        const dt = new Date(typingText);
        dt.setHours(0, 0, 0, 0);
        if (isNaN(dt.getTime())) return undefined;
        return dt;
    };

    const handleSubmitTypingText = (): void => {
        setTypingText('');
        const dt = parseDateFromTypingText();
        if (!dt) return;
        if (!value) return onChange?.(dt);
        if (dt.valueOf() !== new PandaDate(value).beginOfTheDay.raw.valueOf()) {
            return onChange?.(dt);
        }
    };

    const handleOnTextboxEnter = (): void => {
        handleSubmitTypingText();
    };

    const handleOnDropdownClose = (): void => {
        handleSubmitTypingText();
        calendarAPIRef.current?.reset();
    };

    const handleOnDropdownOpen = (): void => undefined;

    const handleClearValue = (): void => {
        onChange?.(undefined);
        dropdownAPIRef.current?.close();
    };

    return (
        <DropdownComponent
            disabled={disabled || readOnly}
            horizontalDirection={horizontalDirection}
            onOpen={handleOnDropdownOpen}
            onClose={handleOnDropdownClose}
            onLoad={handleOnDropdownLoaded}
            overrideOnClickTrigger={EmptyVoidFunction}
        >
            <StyledCustomDropdownComponentTrigger
                $focusing={isFocusingTextbox}
                $disabled={disabled || readOnly}
                width={width}
                minWidth={minWidth}
            >
                <StyledCustomTextboxComponent
                    $focusing={isFocusingTextbox}
                    hasError={hasError}
                    highlighted={highlightWhenHasValue && !!value}
                    disabled={disabled}
                    readOnly={true}
                    value={typingText}
                    label={label}
                    width="100%"
                    prefix={prefix}
                    suffixCursor="pointer"
                    suffix={((): React.ReactNode => {
                        if (hasClearButton) {
                            let _color: string = token.get('global.color.grey-5');
                            if (isFocusingTextbox) _color = token.get('global.color.grey-5');
                            else if (!value) _color = token.get('global.color.grey-5');
                            else if (highlightWhenHasValue) _color = 'white';
                            return <CloseIcon width={16} height={16} color={_color} />;
                        }

                        return suffix || <CalendarIcon width={18} height={18} />;
                    })()}
                    suffixWidth={suffixWidth || '18px'}
                    placeholder={value ? new PandaDate(value).toString(lang) : placeholder}
                    placeholderColor={((): string | undefined => {
                        if (isFocusingTextbox) return undefined;
                        if (!value) return undefined;
                        if (highlightWhenHasValue) return 'white';
                        return token.get<string>('component.textbox.text-color.default');
                    })()}
                    onFocus={handleOnFocusTextbox}
                    onBlur={handleOnBlurTextbox}
                    onChange={handleOnTextboxChange}
                    onEnter={handleOnTextboxEnter}
                    overrideOnClickSuffix={hasClearButton ? handleClearValue : undefined}
                />
            </StyledCustomDropdownComponentTrigger>

            <StyledCustomDropdownComponentContent>
                <CalendarComponent
                    {...rest}
                    onLoad={handleOnCalendarLoaded}
                    onChange={handleOnCalendarChange}
                    onClickDateItem={handleOnClickCalendarDateItem}
                />
            </StyledCustomDropdownComponentContent>
        </DropdownComponent>
    );
};

DatePickerComponent.displayName = 'DatePickerComponent';

export { DatePickerComponent };
