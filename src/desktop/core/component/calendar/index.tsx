import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { getCalendarLocale } from '../../shared/locale';
import { PandaDate } from '../../shared/lib/date';
import { FlexboxAlignEnum, FlexboxDirectionEnum } from '../../shared/type';
import { ICalendarComponentProps } from './type';

import {
    StyledCalendarComponentBody,
    StyledCalendarComponentBodyDateItem,
    StyledCalendarComponentBodyDates,
    StyledCalendarComponentBodyWeekDays,
    StyledCalendarComponentContainer,
    StyledCalendarComponentHeader,
    StyledCalendarComponentHeaderNav,
} from './styled';

const AngleIcon = IconCollection.outline.angle;
const _angleIcon = <AngleIcon width={14} height={14} />;

const CalendarComponent = ({
    value,
    min,
    max,
    lang,
    noBorder,
    onChange,
    onLoad,
    onClickDateItem,
}: ICalendarComponentProps): JSX.Element => {
    const locale = React.useMemo(() => getCalendarLocale(lang), [lang]);
    const [_year, _month] = React.useMemo((): number[] => {
        const dt = new PandaDate(value).raw;
        return [dt.getFullYear(), dt.getMonth()];
    }, [value]);

    const [year, setYear] = React.useState<number>(_year);
    const [month, setMonth] = React.useState<number>(_month);

    const handleOnClickDate =
        (date: number): VoidFunction =>
        (): void => {
            onClickDateItem?.();
            const dt = new PandaDate(`${year}/${month + 1}/${date}`).beginOfTheDay.raw;
            if (!value) return onChange?.(dt);
            const valueWithBeginOfTheDay = new PandaDate(value).beginOfTheDay.raw;
            if (dt.valueOf() !== valueWithBeginOfTheDay.valueOf()) return onChange?.(dt);
        };

    const handleGoForward = (): void => {
        const dt = new Date();
        dt.setHours(0, 0, 0, 0);
        dt.setDate(1);
        dt.setFullYear(year);
        dt.setMonth(month + 1);

        setYear(dt.getFullYear());
        setMonth(dt.getMonth());
    };

    const handleGoBackward = (): void => {
        const dt = new Date();
        dt.setHours(0, 0, 0, 0);
        dt.setDate(1);
        dt.setFullYear(year);
        dt.setMonth(month - 1);

        setYear(dt.getFullYear());
        setMonth(dt.getMonth());
    };

    const dates = ((): number[][] => {
        const _row = [-1, -1, -1, -1, -1, -1, -1];
        const matrix: number[][] = [
            [..._row],
            [..._row],
            [..._row],
            [..._row],
            [..._row],
            [..._row],
        ];
        let r = 0;
        for (let i = 1; i <= 31; i++) {
            const dt = new Date(`${year}/${month + 1}/${i}`);
            // dt.setHours(0, 0, 0, 0);
            // dt.setMonth(month);
            // dt.setFullYear(year);
            // dt.setDate(i);
            const day = dt.getDay();

            if (dt.getMonth() === month && dt.getFullYear() === year) matrix[r][day] = dt.getDate();
            if (day === 6) r += 1;
        }
        return matrix;
    })();

    React.useEffect(() => {
        setYear(_year);
        setMonth(_month);
    }, [_year, _month]);

    React.useEffect(() => {
        onLoad?.({
            reset: (): void => {
                setYear(_year);
                setMonth(_month);
            },
        });
    }, []);

    return (
        <StyledCalendarComponentContainer $noBorder={noBorder}>
            <StyledCalendarComponentHeader
                align={FlexboxAlignEnum.center}
                justify={FlexboxAlignEnum.justify}
                gap={token.get<string>('global.space.xxs')}
            >
                <StyledCalendarComponentHeaderNav $type="backward" onClick={handleGoBackward}>
                    {_angleIcon}
                </StyledCalendarComponentHeaderNav>
                {locale.get<string>(`month.m${month}`)} {year}
                <StyledCalendarComponentHeaderNav $type="forward" onClick={handleGoForward}>
                    {_angleIcon}
                </StyledCalendarComponentHeaderNav>
            </StyledCalendarComponentHeader>

            <StyledCalendarComponentBody
                direction={FlexboxDirectionEnum.column}
                gap={token.get<string>('global.space.mxxxs')}
            >
                <StyledCalendarComponentBodyWeekDays
                    align={FlexboxAlignEnum.center}
                    justify={FlexboxAlignEnum.justify}
                    gap={token.get<string>('global.space.xxs')}
                >
                    {Array.from({ length: 7 }).map((_, idx) => (
                        <StyledCalendarComponentBodyDateItem key={idx}>
                            {locale.get<string>(`day.d${idx}`)}
                        </StyledCalendarComponentBodyDateItem>
                    ))}
                </StyledCalendarComponentBodyWeekDays>

                {dates.map((row, rowIdx) => (
                    <StyledCalendarComponentBodyDates
                        key={rowIdx}
                        align={FlexboxAlignEnum.center}
                        justify={FlexboxAlignEnum.justify}
                        gap={token.get<string>('global.space.xxs')}
                    >
                        {row.map((date, idx) => (
                            <StyledCalendarComponentBodyDateItem
                                key={idx}
                                disabled={
                                    date < 0 ||
                                    (min &&
                                        new PandaDate(`${year}/${month + 1}/${date}`).beginOfTheDay
                                            .raw < new PandaDate(min).beginOfTheDay.raw) ||
                                    (max &&
                                        new PandaDate(`${year}/${month + 1}/${date}`).beginOfTheDay
                                            .raw > new PandaDate(max).endOfTheDay.raw)
                                }
                                $invisible={date < 0}
                                $today={((): boolean => {
                                    const dt = new PandaDate();
                                    if (dt.raw.getDate() !== date) return false;
                                    if (dt.raw.getMonth() !== month) return false;
                                    if (dt.raw.getFullYear() !== year) return false;
                                    return true;
                                })()}
                                $selected={((): boolean => {
                                    if (!value) return false;
                                    const dt = new PandaDate(value);
                                    if (dt.raw.getDate() !== date) return false;
                                    if (dt.raw.getMonth() !== month) return false;
                                    if (dt.raw.getFullYear() !== year) return false;
                                    return true;
                                })()}
                                onClick={handleOnClickDate(date)}
                            >
                                {date}
                            </StyledCalendarComponentBodyDateItem>
                        ))}
                    </StyledCalendarComponentBodyDates>
                ))}
            </StyledCalendarComponentBody>
        </StyledCalendarComponentContainer>
    );
};

CalendarComponent.displayName = 'CalendarComponent';

export { CalendarComponent };
