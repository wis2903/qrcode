import React from 'react';

import { ChipComponent } from '../../../core/component/chip';
import { FlexboxComponent } from '../../../core/component/flexbox';
import { PlainTextComponent } from '../../../core/component/plain';
import { AngleIconOutline } from '../../../core/foundation/icon/outline/angle';
import { token } from '../../../core/foundation/token';
import { FlexboxVariant } from '../../../core/shared/constant';
import { PandaDate } from '../../../core/shared/lib/date';
import { PandaObject } from '../../../core/shared/lib/object';

interface IOrderItemProps {
    order: Record<string, unknown>;
}

export const OrderItem = ({ order: orderFromProps }: IOrderItemProps): JSX.Element => {
    const [isExpanded, setIsExpanded] = React.useState<boolean>(true);

    const order = new PandaObject(orderFromProps);

    return (
        <button
            style={{
                outline: 0,
                background: 0,
                border: 0,
                padding: '12px',
                margin: 0,
                fontSize: '16px',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#000000',
            }}
            onClick={(): void => {
                setIsExpanded(!isExpanded);
            }}
        >
            <FlexboxComponent width="100%" gap="4px" direction={FlexboxVariant.direction.column}>
                <FlexboxComponent width="100%" align={FlexboxVariant.alignment.center}>
                    <PlainTextComponent
                        ellipsis
                        width="calc(100% - 104px)"
                        maxWidth="calc(100% - 104px)"
                        whiteSpace="nowrap"
                        text={`PO #${order.get('po_number')}`}
                        padding="0 6px 0 0"
                    />

                    <FlexboxComponent
                        width="104px"
                        gap="8px"
                        align={FlexboxVariant.alignment.center}
                        justify={FlexboxVariant.alignment.end}
                    >
                        {order.get('status') === 'shipped' ? (
                            <ChipComponent
                                backgroundColor="transparent"
                                borderColor="#0747a6"
                                textColor="#0747a6"
                                padding="0 6px"
                            >
                                Shipped
                            </ChipComponent>
                        ) : (
                            <ChipComponent
                                backgroundColor="transparent"
                                borderColor="transparent"
                                textColor="transparent"
                                padding="0 6px"
                            >
                                --
                            </ChipComponent>
                        )}
                        <span
                            style={{
                                width: '14px',
                                height: '14px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: isExpanded ? 'rotateZ(180deg)' : undefined,
                            }}
                        >
                            <AngleIconOutline
                                width={14}
                                height={14}
                                color={token.get<string>('global.color.grey-3')}
                            />
                        </span>
                    </FlexboxComponent>
                </FlexboxComponent>

                {isExpanded && (
                    <>
                        <PlainTextComponent
                            ellipsis
                            width="100%"
                            color={token.get<string>('global.color.grey-3')}
                            fontSize="13px"
                            text={`Created at ${new PandaDate(
                                String(order.get('date_created'))
                            ).toDateTimeString()}`}
                        />
                        <PlainTextComponent
                            ellipsis
                            width="100%"
                            color={token.get<string>('global.color.grey-3')}
                            fontSize="13px"
                            text={`Created by ${String(order.get('created_user_id'))}`}
                        />
                    </>
                )}
            </FlexboxComponent>
        </button>
    );
};
