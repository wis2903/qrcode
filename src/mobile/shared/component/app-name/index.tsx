import { PlainTextComponent } from '../../../core/component/plain';
import { FlexboxVariant } from '../../../core/shared/constant';
import { StyledAppNameComponentContainer } from './styled';

export const AppNameComponent = (): JSX.Element => {
    return (
        <StyledAppNameComponentContainer align={FlexboxVariant.alignment.center} gap="10px">
            <img src="/logo.png" alt="panda-logo" />
            <PlainTextComponent
                ellipsis
                whiteSpace="nowrap"
                text="Panda scanning"
                fontSize="20px"
                fontWeight="bold"
            />
        </StyledAppNameComponentContainer>
    );
};
