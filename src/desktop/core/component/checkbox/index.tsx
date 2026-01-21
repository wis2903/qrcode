import React from 'react';

import { IconCollection } from '../../foundation/icon';
import { token } from '../../foundation/token';
import { ICheckboxComponentProps } from './type';

import {
    StyledCheckboxComponentBox,
    StyledCheckboxComponentBoxSpan,
    StyledCheckboxComponentContainer,
    StyledCheckboxComponentLabel,
    StyledMinusIcon,
} from './styled';

const CheckIcon = IconCollection.outline.check;

const CheckboxComponent = (props: ICheckboxComponentProps): JSX.Element => {
    const { isSpan, isSwitch, label, checked, disabled, indeterminate, onChange } = props;

    const boxRef = React.useRef<HTMLButtonElement>(null);

    const handleOnClickLabel = (): void => {
        boxRef.current?.click();
    };

    const handleOnClickBox = (): void => {
        if (disabled) return;
        onChange?.(!checked);
    };

    const BoxContainer = isSpan ? StyledCheckboxComponentBoxSpan : StyledCheckboxComponentBox;

    return (
        <StyledCheckboxComponentContainer>
            <BoxContainer
                ref={boxRef}
                $disabled={disabled}
                $checked={checked}
                $isSwitch={isSwitch}
                onClick={handleOnClickBox}
            >
                {!isSwitch && !indeterminate && checked && (
                    <CheckIcon
                        width={12}
                        height={12}
                        color={token.get<string>(
                            disabled ? 'global.color.grey-2' : 'global.color.white'
                        )}
                    />
                )}

                {indeterminate && <StyledMinusIcon />}
            </BoxContainer>

            {!!label && (
                <StyledCheckboxComponentLabel
                    $isSwitch={isSwitch}
                    onClick={handleOnClickLabel}
                    $disabled={disabled}
                >
                    {label}
                </StyledCheckboxComponentLabel>
            )}
        </StyledCheckboxComponentContainer>
    );
};

CheckboxComponent.displayName = 'CheckboxComponent';

export { CheckboxComponent };
