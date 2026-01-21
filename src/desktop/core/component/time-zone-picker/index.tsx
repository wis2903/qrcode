import { SingleSelectComponent } from '../select/single';
import { ITimeZonePickerComponentProps } from './type';

const TimeZonePickerComponent = ({
    onChange,
    ...rest
}: ITimeZonePickerComponentProps): JSX.Element => {
    return (
        <SingleSelectComponent
            {...rest}
            options={[
                {
                    label: 'GMT +07:00',
                    value: 'GMT+0700',
                    meta: {
                        valueInt: 7,
                    },
                },
                {
                    label: 'GMT +08:00',
                    value: 'GMT+0800',
                    meta: {
                        valueInt: 8,
                    },
                },
            ]}
            onChange={(option): void => {
                if (!option?.value) return onChange?.();
                return onChange?.(String(option.value), Object(option.meta));
            }}
        />
    );
};

TimeZonePickerComponent.displayName = 'TimeZonePickerComponent';

export { TimeZonePickerComponent };

