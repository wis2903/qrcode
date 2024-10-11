import { CloseIconOutline } from '../../foundation/icon/outline/close';
import { ButtonComponent } from '../button';
import { StyledFilterChipContainer, StyledFilterChipLabel } from './styled';
import { IFilterChipComponentProps } from './type';

const closeIcon = <CloseIconOutline width={11} height={11} strokeWidth={1} />;

export const FilterChipComponent = ({
    children,
    readOnly,
    onRemove,
}: IFilterChipComponentProps): JSX.Element => {
    return (
        <StyledFilterChipContainer $readOnly={readOnly}>
            <StyledFilterChipLabel>{children}</StyledFilterChipLabel>
            {!readOnly && (
                <ButtonComponent circle borderColor="transparent" padding="0" onClick={onRemove}>
                    {closeIcon}
                </ButtonComponent>
            )}
        </StyledFilterChipContainer>
    );
};
