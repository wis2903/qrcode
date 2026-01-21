import styled from 'styled-components';

import { token } from '../../foundation/token';
import { FlexboxComponent } from '../flexbox';

export const StyledCalendarComponentContainer = styled.div<{ $noBorder?: boolean }>`
    border: 1px solid;
    border-radius: 6px;
    padding: ${token.get<string>('component.calendar.padding')};
    background-color: ${token.get<string>('component.calendar.background-color')};
    border-color: ${(props): string =>
        props.$noBorder ? 'transparent' : token.get<string>('component.calendar.border-color')};
`;

export const StyledCalendarComponentHeader = styled(FlexboxComponent)`
    padding: ${token.get<string>('component.calendar.header.padding')};
    font-size: ${token.get<string>('component.calendar.header.font-size')};
    font-weight: ${token.get<string>('component.calendar.header.font-weight')};
    border-bottom: 1px solid ${token.get<string>('component.calendar.header.divider-color')};
    color: ${token.get<string>('component.calendar.header.text-color')};
`;

export const StyledCalendarComponentHeaderNav = styled.button<{ $type: 'forward' | 'backward' }>`
    outline: 0;
    background: 0;
    padding: 0;
    border: 0;
    width: 26px;
    height: 26px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${token.get<string>('component.calendar.header.nav.radius')};
    background-color: ${token.get<string>(
        'component.calendar.header.nav.background-color.default'
    )};

    &:hover {
        background-color: ${token.get<string>(
            'component.calendar.header.nav.background-color.hover'
        )};
    }

    &:active {
        background-color: ${token.get<string>(
            'component.calendar.header.nav.background-color.active'
        )};
    }

    ${(props): string => {
        switch (props.$type) {
            case 'backward':
                return `
                    svg{
                        transform: rotate(90deg);
                    }
                `;
            case 'forward':
                return `
                    svg{
                        transform: rotate(-90deg);
                    }
                `;
            default:
                return '';
        }
    }}
`;

export const StyledCalendarComponentBodyDateItem = styled.button<{
    $invisible?: boolean;
    $today?: boolean;
    $selected?: boolean;
}>`
    width: 24px;
    height: 24px;
    outline: 0;
    background: 0;
    padding: 0;
    border: 0;
    text-align: center;
    visibility: ${(props): string => (props.$invisible ? 'hidden' : 'visible')};
    border-radius: ${token.get<string>('component.calendar.body.date.radius')};

    ${(props): string => {
        if (!props.$today) return '';
        return `
            color: ${token.get<string>('global.color.blue-3')} !important;
            font-weight: ${token.get<string>('global.typo.font-weight-bold')} !important;

            &:disabled{
                color: ${token.get<string>('component.calendar.body.date.text-color.disabled')} !important;
                font-weight: ${token.get<string>('component.calendar.body.date.font-weight')} !important;
            }
        `;
    }}

    ${(props): string => {
        if (!props.$selected) return '';
        return `
            color: ${token.get<string>('global.color.white')} !important;
            font-weight: ${token.get<string>('component.calendar.body.date.font-weight')} !important;
            background-color: ${token.get<string>('global.color.primary')} !important;
        `;
    }}
`;

export const StyledCalendarComponentBody = styled(FlexboxComponent)`
    padding: ${token.get<string>('component.calendar.body.padding')};

    ${StyledCalendarComponentBodyDateItem} {
        font-size: ${token.get<string>('component.calendar.body.font-size')};
    }
`;

export const StyledCalendarComponentBodyWeekDays = styled(FlexboxComponent)`
    ${StyledCalendarComponentBodyDateItem} {
        color: ${token.get<string>('component.calendar.body.weekday.text-color')};
        font-weight: ${token.get<string>('component.calendar.body.weekday.font-weight')};
    }
`;

export const StyledCalendarComponentBodyDates = styled(FlexboxComponent)`
    ${StyledCalendarComponentBodyDateItem} {
        cursor: pointer;
        color: ${token.get<string>('component.calendar.body.date.text-color.default')};
        font-weight: ${token.get<string>('component.calendar.body.date.font-weight')};
        background-color: ${token.get<string>(
            'component.calendar.body.date.background-color.default'
        )};

        &:hover {
            background-color: ${token.get<string>(
                'component.calendar.body.date.background-color.hover'
            )};
        }

        &:active {
            background-color: ${token.get<string>(
                'component.calendar.body.date.background-color.active'
            )};
        }

        &:disabled {
            cursor: not-allowed;
            background-color: ${token.get<string>(
                'component.calendar.body.date.background-color.disabled'
            )};
            color: ${token.get<string>('component.calendar.body.date.text-color.disabled')};
        }
    }
`;
