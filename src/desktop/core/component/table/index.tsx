import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { FlexboxVariant } from '../../shared/constant';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { getTableLocale } from '../../shared/locale';
import { AlignEnum, FlexboxAlignEnum, SortTypeEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { PlainTextComponent } from '../plain';
import { ScrollableFloatComponent } from '../scrollable-float';
import { SkeletonComponent } from '../skeleton';
import { ITableComponentProps, TableSort } from './type';

import {
    StyledCustomBlockAreaComponent,
    StyledTableComponentCaption,
    StyledTableComponentCell,
    StyledTableComponentContainer,
    StyledTableComponentHeading,
} from './styled';

const SpinnerIcon = IconCollection.outline.spinner;
const AngleIcon = IconCollection.outline.angle;
const _angleIcon = (
    <AngleIcon width={14} height={14} color={token.get<string>('global.color.grey-3')} />
);
const _angleIconActive = (
    <AngleIcon width={14} height={14} color={token.get<string>('global.color.primary')} />
);

const TableComponent = ({
    lang,
    width,
    minWidth,
    maxHeight,
    loading,
    columns,
    records: recordsFromProps,
    alternativeRecords,
    noBorder,
    noHeader,
    noCaption,
    enabledBorderBottomForLastRow,
    captionText,
    captionStyle,
    loaderStyle,
    freezeFirstColumn,
    freezeLastColumn,
    sort,
    autoColumnWidth,
    skeletonHeight,
    selectedRecordId,
    onSortChange,
    onSelectRecord,
    onSelectChildRecord,
    ...rest
}: ITableComponentProps): JSX.Element => {
    const locale = React.useMemo(() => getTableLocale(lang), [lang]);
    const isMouseInRef = React.useRef<boolean>(false);
    const records = alternativeRecords || recordsFromProps || [];

    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(2500));
    const [isDisplayScrollbar, setIsDisplayScrollbar] = React.useState<boolean>(false);

    const _columns = !autoColumnWidth
        ? columns
        : columns.map((col) => ({
              ...col,
              width: 'max-content',
              maxWidth: '400px',
          }));

    const handleOnMouseMove = (): void => {
        isMouseInRef.current = true;
        setIsDisplayScrollbar(true);
        debouncer.execute(() => {
            setIsDisplayScrollbar(false);
        });
    };

    const handleOnMouseLeave = (): void => {
        isMouseInRef.current = false;
        debouncer.execute(() => {
            setIsDisplayScrollbar(false);
        });
    };

    React.useEffect(() => {
        return (): void => {
            debouncer.destroy();
        };
    }, []);

    return (
        <StyledCustomBlockAreaComponent
            hasLoader
            width={width}
            minWidth={minWidth}
            onMouseMove={handleOnMouseMove}
            onMouseLeave={handleOnMouseLeave}
            $isDisplayScrollbar={isDisplayScrollbar}
        >
            <ScrollableFloatComponent
                maxHeight={maxHeight}
                className={`panda-table-scrollbars-container data-table-scrollable-container ${
                    loading ? 'loading' : ''
                }`}
            >
                <StyledTableComponentContainer
                    {...rest}
                    $noBorder={noBorder}
                    $freezeFirstColumn={freezeFirstColumn}
                    $freezeLastColumn={freezeLastColumn}
                    $enabledBorderBottomForLastRow={enabledBorderBottomForLastRow}
                >
                    <table cellPadding={0} cellSpacing={0}>
                        {!noHeader && (
                            <thead>
                                <tr>
                                    {_columns.map((col) => (
                                        <StyledTableComponentHeading
                                            key={col.name}
                                            $align={col.align}
                                            $whiteSpace={col.whiteSpace}
                                            $width={col.width}
                                            $minWidth={col.minWidth}
                                            $maxWidth={col.maxWidth}
                                            $fixedWidth={col.fixedWidth}
                                        >
                                            {!col.sortable ? (
                                                col.title
                                            ) : (
                                                <FlexboxComponent
                                                    whiteSpace={col.whiteSpace}
                                                    gap={token.get<string>('global.space.mxxxs')}
                                                    align={FlexboxAlignEnum.center}
                                                    maxWidth="100%"
                                                    width="100%"
                                                    minWidth="100%"
                                                    justify={((): FlexboxAlignEnum => {
                                                        switch (col.align) {
                                                            case AlignEnum.right:
                                                                return FlexboxAlignEnum.end;
                                                            case AlignEnum.center:
                                                                return FlexboxAlignEnum.center;
                                                            default:
                                                                return FlexboxAlignEnum.start;
                                                        }
                                                    })()}
                                                >
                                                    {col.title}
                                                    <button
                                                        className="panda-table-sort-button"
                                                        onClick={(): void => {
                                                            if (
                                                                !sort?.[1] ||
                                                                col.name !== sort?.[0]
                                                            ) {
                                                                return onSortChange?.([
                                                                    col.name,
                                                                    SortTypeEnum.ascending,
                                                                ]);
                                                            }
                                                            if (
                                                                sort?.[1] === SortTypeEnum.ascending
                                                            ) {
                                                                return onSortChange?.([
                                                                    col.name,
                                                                    SortTypeEnum.descending,
                                                                ]);
                                                            }
                                                            return onSortChange?.([]);
                                                        }}
                                                    >
                                                        {sort?.[0] === col.name &&
                                                        sort?.[1] === SortTypeEnum.ascending
                                                            ? _angleIconActive
                                                            : _angleIcon}
                                                        {sort?.[0] === col.name &&
                                                        sort?.[1] === SortTypeEnum.descending
                                                            ? _angleIconActive
                                                            : _angleIcon}
                                                    </button>
                                                </FlexboxComponent>
                                            )}
                                        </StyledTableComponentHeading>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {records.map((record, idx) => (
                                <React.Fragment
                                    key={Object(record).key || Object(record).id || idx}
                                >
                                    <tr onClick={(): void => onSelectRecord?.(Object(record))}>
                                        {_columns.map((col) => (
                                            <StyledTableComponentCell
                                                key={col.name}
                                                $align={col.align}
                                                $whiteSpace={col.whiteSpace}
                                                $width={col.width}
                                                $minWidth={col.minWidth}
                                                $maxWidth={col.maxWidth}
                                                $fixedWidth={col.fixedWidth}
                                                $height={col.height}
                                                $verticalAlign={col.verticalAlign}
                                                $padding={col.padding}
                                                $clickable={!!onSelectRecord}
                                                $isInSelectedRow={
                                                    !!selectedRecordId &&
                                                    Object(record).id === selectedRecordId
                                                }
                                                $hasChildren={
                                                    Array.isArray(Object(record).children) &&
                                                    !!Object(record).children.length &&
                                                    !loading
                                                }
                                            >
                                                {col.loading || (loading && !!records.length)
                                                    ? col.loadingPlaceholder || (
                                                          <FlexboxComponent
                                                              width="100%"
                                                              height={skeletonHeight}
                                                              align={FlexboxAlignEnum.center}
                                                          >
                                                              <SkeletonComponent width="100%" />
                                                          </FlexboxComponent>
                                                      )
                                                    : col.render(record, idx)}
                                            </StyledTableComponentCell>
                                        ))}
                                    </tr>

                                    {Array.isArray(Object(record).children) &&
                                        !loading &&
                                        Object(record).children.map(
                                            (child: Record<string, unknown>, childIdx: number) => (
                                                <tr
                                                    key={
                                                        Object(child).key ||
                                                        Object(child).id ||
                                                        `child-${childIdx}`
                                                    }
                                                    onClick={(): void =>
                                                        onSelectChildRecord?.(child, Object(record))
                                                    }
                                                >
                                                    {_columns.map((col) => (
                                                        <StyledTableComponentCell
                                                            key={col.name}
                                                            $align={col.align}
                                                            $whiteSpace={col.whiteSpace}
                                                            $width={col.width}
                                                            $minWidth={col.minWidth}
                                                            $maxWidth={col.maxWidth}
                                                            $fixedWidth={col.fixedWidth}
                                                            $height={col.height}
                                                            $verticalAlign={col.verticalAlign}
                                                            $isInChildRow={true}
                                                            $padding={col.padding}
                                                            $clickable={!!onSelectChildRecord}
                                                        >
                                                            {col.render(child, idx)}
                                                        </StyledTableComponentCell>
                                                    ))}
                                                </tr>
                                            )
                                        )}
                                </React.Fragment>
                            ))}
                        </tbody>
                        {!records.length && loading && (
                            <StyledTableComponentCaption
                                style={captionStyle}
                                $transparent={noCaption}
                            >
                                {noCaption ? (
                                    '-'
                                ) : (
                                    <FlexboxComponent
                                        width="100%"
                                        gap={token.get<string>('global.space.xxs')}
                                        align={FlexboxVariant.alignment.center}
                                        style={loaderStyle}
                                    >
                                        <SpinnerIcon width={16} height={16} />
                                        {locale.get<string>('loading')}{' '}
                                    </FlexboxComponent>
                                )}
                            </StyledTableComponentCaption>
                        )}
                        {!records.length && !loading && (
                            <StyledTableComponentCaption
                                style={captionStyle}
                                $transparent={noCaption}
                            >
                                {noCaption ? '-' : captionText || locale.get<string>('empty')}
                            </StyledTableComponentCaption>
                        )}
                    </table>
                </StyledTableComponentContainer>
            </ScrollableFloatComponent>
        </StyledCustomBlockAreaComponent>
    );
};

const TableComponentSortableHeading = ({
    sort,
    align,
    title,
    name,
    onSortChange,
}: {
    title: string;
    name: string;
    sort?: TableSort;
    align?: AlignEnum;
    onSortChange?: (sort: TableSort) => void;
}): JSX.Element => {
    return (
        <FlexboxComponent
            whiteSpace="nowrap"
            gap={token.get<string>('global.space.mxxxs')}
            align={FlexboxAlignEnum.center}
            justify={((): FlexboxAlignEnum => {
                switch (align) {
                    case AlignEnum.right:
                        return FlexboxAlignEnum.end;
                    case AlignEnum.center:
                        return FlexboxAlignEnum.center;
                    default:
                        return FlexboxAlignEnum.start;
                }
            })()}
        >
            <PlainTextComponent
                ellipsis
                text={title}
                whiteSpace="nowrap"
                fontWeight={token.get<string>('global.font-weight-super-bold')}
            />
            <button
                className="panda-table-sort-button"
                onClick={(): void => {
                    if (!sort?.[1] || name !== sort?.[0]) {
                        return onSortChange?.([name, SortTypeEnum.ascending]);
                    }
                    if (sort?.[1] === SortTypeEnum.ascending) {
                        return onSortChange?.([name, SortTypeEnum.descending]);
                    }
                    return onSortChange?.([]);
                }}
            >
                {sort?.[0] === name && sort?.[1] === SortTypeEnum.ascending
                    ? _angleIconActive
                    : _angleIcon}
                {sort?.[0] === name && sort?.[1] === SortTypeEnum.descending
                    ? _angleIconActive
                    : _angleIcon}
            </button>
        </FlexboxComponent>
    );
};

TableComponent.displayName = 'TableComponent';
TableComponentSortableHeading.displayName = 'TableComponentSortableHeading';

export { TableComponent, TableComponentSortableHeading };

