import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { PandaDebouncer } from '../../shared/lib/debouncer';
import { getTableLocale } from '../../shared/locale';
import { AlignEnum, FlexboxAlignEnum, SortTypeEnum } from '../../shared/type';
import { FlexboxComponent } from '../flexbox';
import { ScrollableFloatComponent } from '../scrollable-float';
import { SkeletonComponent } from '../skeleton';
import { ITableComponentProps } from './type';

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
    records,
    noBorder,
    noCaption,
    freezeFirstColumn,
    freezeLastColumn,
    sort,
    skeletonHeight,
    onSortChange,
    ...rest
}: ITableComponentProps): JSX.Element => {
    const locale = React.useMemo(() => getTableLocale(lang), [lang]);
    const isMouseInRef = React.useRef<boolean>(false);

    const [debouncer] = React.useState<PandaDebouncer>(new PandaDebouncer(2500));
    const [isDisplayScrollbar, setIsDisplayScrollbar] = React.useState<boolean>(false);

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
                width="100%"
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
                >
                    <table cellPadding={0} cellSpacing={0}>
                        <thead>
                            <tr>
                                {columns.map((col) => (
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
                                                        if (!sort?.[1] || col.name !== sort?.[0]) {
                                                            return onSortChange?.([
                                                                col.name,
                                                                SortTypeEnum.ascending,
                                                            ]);
                                                        }
                                                        if (sort?.[1] === SortTypeEnum.ascending) {
                                                            return onSortChange?.([
                                                                col.name,
                                                                SortTypeEnum.descending,
                                                            ]);
                                                        }
                                                        return onSortChange?.([
                                                            col.name,
                                                            undefined,
                                                        ]);
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
                        <tbody>
                            {records.map((record, idx) => (
                                <tr key={Object(record.id) || idx}>
                                    {columns.map((col) => (
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
                            ))}
                        </tbody>
                        {!records.length && loading && (
                            <StyledTableComponentCaption $transparent={noCaption}>
                                {noCaption ? (
                                    '-'
                                ) : (
                                    <>
                                        <SpinnerIcon width={16} height={16} />
                                        {locale.get<string>('loading')}{' '}
                                    </>
                                )}
                            </StyledTableComponentCaption>
                        )}
                        {!records.length && !loading && (
                            <StyledTableComponentCaption $transparent={noCaption}>
                                {noCaption ? '-' : locale.get<string>('empty')}
                            </StyledTableComponentCaption>
                        )}
                    </table>
                </StyledTableComponentContainer>
            </ScrollableFloatComponent>
        </StyledCustomBlockAreaComponent>
    );
};

TableComponent.displayName = 'TableComponent';

export { TableComponent };
