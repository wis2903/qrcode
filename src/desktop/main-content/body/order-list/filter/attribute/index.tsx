import { useAppContext } from '../../../../../context';
import { DatePickerComponent } from '../../../../../core/component/datepicker';
import { FlexboxComponent } from '../../../../../core/component/flexbox';
import { SingleSelectComponent } from '../../../../../core/component/select/single';
import { PandaDate } from '../../../../../core/shared/lib/date';
import { OrderStatusEnum } from '../../../../../_type';

export const MainContentOrderListFilterAttribute = (): JSX.Element => {
    const appCtx = useAppContext();

    return (
        <FlexboxComponent width="100%" gap="6px">
            <SingleSelectComponent
                clearable
                width="100%"
                placeholder="Status"
                label={appCtx.state.orders.filters.status ? 'Status' : ''}
                value={appCtx.state.orders.filters.status}
                options={[
                    {
                        label: 'Packed',
                        value: OrderStatusEnum.Packed,
                    },
                    {
                        label: 'Shipped',
                        value: OrderStatusEnum.Shipped,
                    },
                ]}
                onChange={(option): void => {
                    appCtx.setState((current) => {
                        const _cloned = { ...current };
                        _cloned.orders.filters.status = option.value as OrderStatusEnum;
                        return _cloned;
                    });
                }}
            />

            <DatePickerComponent
                clearable
                width="100%"
                placeholder="Created from"
                label={appCtx.state.orders.filters.createdDateFrom ? 'Created from' : ''}
                value={appCtx.state.orders.filters.createdDateFrom}
                max={new PandaDate(appCtx.state.orders.filters.createdDateTo).endOfTheDay.raw}
                onChange={(dt): void => {
                    appCtx.setState((current) => {
                        const _cloned = { ...current };
                        _cloned.orders.filters.createdDateFrom = dt;
                        return _cloned;
                    });
                }}
            />
            <DatePickerComponent
                clearable
                width="100%"
                placeholder="Created to"
                label={appCtx.state.orders.filters.createdDateTo ? 'Created to' : ''}
                value={appCtx.state.orders.filters.createdDateTo}
                max={new PandaDate().endOfTheDay.raw}
                min={
                    appCtx.state.orders.filters.createdDateFrom
                        ? new PandaDate(appCtx.state.orders.filters.createdDateFrom).beginOfTheDay.raw
                        : undefined
                }
                onChange={(dt): void => {
                    appCtx.setState((current) => {
                        const _cloned = { ...current };
                        _cloned.orders.filters.createdDateTo = dt;
                        return _cloned;
                    });
                }}
            />
        </FlexboxComponent>
    );
};
