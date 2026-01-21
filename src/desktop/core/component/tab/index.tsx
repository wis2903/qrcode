import { StyledTabComponentContainer, StyledTabComponentItem } from './styled';
import { ITabComponentProps } from './type';

export const TabComponent = ({ value, items, onChange }: ITabComponentProps): JSX.Element => {
    return (
        <StyledTabComponentContainer>
            {items.map((item, idx) => (
                <StyledTabComponentItem
                    key={item.value ?? idx}
                    $active={!!value && item.value === value}
                    onClick={(): void => {
                        if (!!value && item.value === value) return;
                        onChange?.(item);
                    }}
                >
                    {item.label}
                </StyledTabComponentItem>
            ))}
        </StyledTabComponentContainer>
    );
};
