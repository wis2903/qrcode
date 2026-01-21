import React from 'react';

import { AngleIconOutline } from '../../foundation/icon/outline/angle';
import { token } from '../../foundation/token';
import { FlexboxVariant } from '../../shared/constant';
import { ButtonComponent } from '../button';
import { DividerComponent } from '../divider';
import { FlexboxComponent } from '../flexbox';
import { StyledAccordionAngleIconWrapper } from './styled';

import {
    IAccordionComponentContentProps,
    IAccordionComponentContext,
    IAccordionComponentProps,
    IAccordionComponentTriggerProps,
} from './type';

const AccordionComponentContext = React.createContext<IAccordionComponentContext>({});

export const AccordionComponent = ({
    children,
    ...rest
}: IAccordionComponentProps): JSX.Element => {
    const [expanded, setExpanded] = React.useState<boolean>(true);

    return (
        <AccordionComponentContext.Provider value={{ expanded, setExpanded }}>
            <FlexboxComponent {...rest} direction={FlexboxVariant.direction.column}>
                {children}
            </FlexboxComponent>
        </AccordionComponentContext.Provider>
    );
};

export const AccordionComponentTrigger = ({
    children,
    ...rest
}: IAccordionComponentTriggerProps): JSX.Element => {
    const { expanded, setExpanded } = React.useContext(AccordionComponentContext);

    const handleToggleExpanded = (): void => {
        setExpanded?.(!expanded);
    };

    return (
        <FlexboxComponent
            {...rest}
            width="100%"
            align={FlexboxVariant.alignment.center}
            justify={FlexboxVariant.alignment.justify}
            gap={token.get<string>('global.space.xxs')}
        >
            {children}
            <ButtonComponent circle borderColor="transparent" onClick={handleToggleExpanded}>
                <StyledAccordionAngleIconWrapper $expanded={expanded}>
                    <AngleIconOutline width={14} height={14} />
                </StyledAccordionAngleIconWrapper>
            </ButtonComponent>
        </FlexboxComponent>
    );
};

export const AccordionComponentContent = ({
    children,
    noDivider,
    ...rest
}: IAccordionComponentContentProps): JSX.Element => {
    const { expanded } = React.useContext(AccordionComponentContext);
    return expanded ? (
        <>
            {!noDivider && <DividerComponent color={token.get<string>('global.color.grey-7')} />}
            <FlexboxComponent {...rest} width="100%">
                {children}
            </FlexboxComponent>
        </>
    ) : (
        <></>
    );
};
