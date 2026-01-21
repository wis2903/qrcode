import React from 'react';

import { ClockIconOutline } from '../../foundation/icon/outline/clock';
import { formatTime } from '../../shared/util';
import { SingleSelectComponent } from '../select/single';
import { ISelectionComponentOption } from '../select/type';
import { ITimePickerComponentProps } from './type';

const TimePickerComponent = ({
    stepInMinutes = 15,
    onChange,
    ...rest
}: ITimePickerComponentProps): JSX.Element => {
    const options = React.useMemo(() => {
        const hours = Array.from({ length: 24 }).map((_, idx) => idx);
        const minutes: number[] = [];
        for (let i = 0; i < 60; i++) {
            const lastItemInMinutesArray = minutes[minutes.length - 1];
            if (lastItemInMinutesArray === undefined) {
                minutes.push(i);
            } else if (i - lastItemInMinutesArray === stepInMinutes) {
                minutes.push(i);
            }
        }

        const items: ISelectionComponentOption[] = [];

        hours.forEach((h) => {
            minutes.forEach((m) => {
                items.push({
                    label: `${formatTime(h)} : ${formatTime(m)}`,
                    value: `${formatTime(h)}:${formatTime(m)}`,
                });
            });
        });

        return items;
    }, []);

    return (
        <SingleSelectComponent
            {...rest}
            options={options}
            suffix={<ClockIconOutline width={16} height={16} />}
            onChange={(option): void => {
                onChange?.(!option.value ? undefined : String(option.value));
            }}
        />
    );
};

TimePickerComponent.displayName = 'TimePickerComponent';
export { TimePickerComponent };

