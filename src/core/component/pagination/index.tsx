import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { getPaginationLocale } from '../../shared/locale';
import { FlexboxAlignEnum } from '../../shared/type';
import { formatNumber } from '../../shared/util';
import { FlexboxComponent } from '../flexbox';
import { SelectComponent } from '../select';
import { ISelectionComponentOption } from '../select/type';
import { IPaginationComponentProps } from './type';

import {
    StyledPaginationComponentItem,
    StyledPaginationComponentItemIcon,
    StyledPaginationComponentLeftArea,
    StyledPaginationComponentLeftAreaDivider,
} from './styled';

const AngleIcon = IconCollection.outline.angle;
const _angleIcon = <AngleIcon width={12} height={12} />;

const PaginationComponent = ({
    disabledPageSizeControl,
    minimal,
    lang,
    value = 0,
    total,
    pageSize = 10,
    pageSizeOptions: pageSizeOptionsFromProps,
    width,
    onChange,
}: IPaginationComponentProps): JSX.Element => {
    const pagesCount = React.useMemo(
        () => Math.max(Math.ceil(total / pageSize), 1),
        [total, pageSize]
    );
    const locale = React.useMemo(() => getPaginationLocale(lang), [lang]);

    const pageSizeOptions = React.useMemo((): number[] => {
        const arr = pageSizeOptionsFromProps ? [...pageSizeOptionsFromProps] : [10, 20, 50, 100];
        if (!arr.includes(pageSize)) {
            arr.push(pageSize);
            arr.sort((a, b) => (a < b ? -1 : 1));
        }
        return arr;
    }, [pageSize]);

    const items = React.useMemo((): number[] => {
        const maxDisplayedEls = 9;
        const distanceFromSelectedItem = Math.floor((maxDisplayedEls - 4) / 2);
        const arr: number[] = [];

        if (pagesCount === 0 || value < 0) return arr;
        if (value >= pagesCount) return [0, -1, value];

        for (let i = 1; i <= distanceFromSelectedItem; i++) {
            const pg = value - i;
            if (pg > 0 && !arr.includes(pg)) arr.unshift(pg);
        }

        if (!arr.includes(value)) arr.push(value);

        for (let i = 1; i <= distanceFromSelectedItem; i++) {
            const pg = value + i;
            if (pg < pagesCount - 1 && !arr.includes(pg)) arr.push(pg);
        }

        if (arr[0] !== 0 && arr[0] !== 1) {
            arr.unshift(-1);
        } else {
            const length = arr[0] === 0 ? arr.length - 1 : arr.length;
            for (let i = 0; i < maxDisplayedEls - 3 - length; i++) {
                const pg = arr[arr.length - 1] + 1;
                if (pg < pagesCount - 1 && !arr.includes(pg)) arr.push(pg);
            }
        }

        if (arr[arr.length - 1] !== pagesCount - 1 && arr[arr.length - 1] !== pagesCount - 2) {
            arr.push(-2);
        } else {
            if (arr[0] <= 0) arr.splice(0, 1);
            const length = arr.length;
            for (let i = 0; i < maxDisplayedEls - 3 - length; i++) {
                const pg = arr[0] - 1;
                if (pg > 0 && !arr.includes(pg)) arr.unshift(pg);
            }
            if (arr.length && arr[0] !== 0 && arr[0] !== 1) arr.unshift(-1);
        }

        if (!arr.includes(0)) arr.unshift(0);
        if (!arr.includes(pagesCount - 1)) arr.push(pagesCount - 1);
        return arr;
    }, [value, total, pageSize]);

    const handleOnClickItem =
        (item: number): VoidFunction =>
        (): void => {
            if (item !== value)
                onChange?.({
                    pageSize,
                    value: item,
                });
        };

    const handleGoBackward = (): void => {
        if (value <= 0) return;
        onChange?.({
            pageSize,
            value: value - 1,
        });
    };

    const handleGoForward = (): void => {
        if (value >= pagesCount - 1) return;
        onChange?.({
            pageSize,
            value: value + 1,
        });
    };

    const handleOnPageSizeChange = (
        option: ISelectionComponentOption | ISelectionComponentOption[]
    ): void => {
        if (Array.isArray(option)) return;
        onChange?.({
            value: 0,
            pageSize: Number(option.value),
        });
    };

    return (
        <FlexboxComponent
            align={FlexboxAlignEnum.center}
            justify={FlexboxAlignEnum.justify}
            gap={token.get<string>('global.space.xxs')}
            width={width}
        >
            {!disabledPageSizeControl ? (
                <StyledPaginationComponentLeftArea>
                    {!minimal && (
                        <>
                            <FlexboxComponent
                                align={FlexboxAlignEnum.center}
                                gap={token.get<string>('global.space.xxs')}
                                whiteSpace="nowrap"
                            >
                                <SelectComponent
                                    width="72px"
                                    minWidth="72px"
                                    value={pageSize}
                                    options={pageSizeOptions.map((opt) => ({
                                        label: `${opt}`,
                                        value: opt,
                                    }))}
                                    onChange={handleOnPageSizeChange}
                                />
                                {locale.get<string>('entries-per-page')}
                            </FlexboxComponent>
                            <StyledPaginationComponentLeftAreaDivider />
                        </>
                    )}
                    <span>
                        {formatNumber(Math.min(value * pageSize + 1, total))}
                        {' - '}
                        {formatNumber(Math.min((value + 1) * pageSize, total))}{' '}
                        {locale.get<string>('of')} {formatNumber(total)}{' '}
                        {locale.get<string>('entries')}
                    </span>
                </StyledPaginationComponentLeftArea>
            ) : (
                <div />
            )}

            {(value > 0 || pagesCount > 1) && (
                <FlexboxComponent
                    align={FlexboxAlignEnum.end}
                    gap={token.get<string>('global.space.xxxs')}
                >
                    <StyledPaginationComponentItem $nav="backward" onClick={handleGoBackward}>
                        <StyledPaginationComponentItemIcon>
                            {_angleIcon}
                        </StyledPaginationComponentItemIcon>
                    </StyledPaginationComponentItem>
                    {items.map((item) =>
                        item < 0 ? (
                            <FlexboxComponent
                                key={item}
                                width="24px"
                                padding={token.get('global.space.xxxs')}
                            >
                                ...
                            </FlexboxComponent>
                        ) : (
                            <StyledPaginationComponentItem
                                key={item}
                                $selected={item === value}
                                onClick={handleOnClickItem(item)}
                            >
                                {item + 1}
                            </StyledPaginationComponentItem>
                        )
                    )}
                    <StyledPaginationComponentItem $nav="forward" onClick={handleGoForward}>
                        <StyledPaginationComponentItemIcon>
                            {_angleIcon}
                        </StyledPaginationComponentItemIcon>
                    </StyledPaginationComponentItem>
                </FlexboxComponent>
            )}
        </FlexboxComponent>
    );
};

PaginationComponent.displayName = 'PaginationComponent';

export { PaginationComponent };
