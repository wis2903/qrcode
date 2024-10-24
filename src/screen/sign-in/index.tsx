/* eslint-disable import/no-anonymous-default-export */

import { ButtonComponent } from '../../core/component/button';
import { FlexboxComponent } from '../../core/component/flexbox';
import { PlainTextComponent } from '../../core/component/plain';
import { FlexboxVariant } from '../../core/shared/constant';
import { AppNameComponent } from '../../shared/component/app-name';
import { useAuthProvider } from '../../shared/provider/auth';
import { GoogleIcon } from './google-icon';
import { StyledSignInButtonContainer, StyledSignInButtonDecoration } from './styled';

export default (): JSX.Element => {
    const authProvider = useAuthProvider();

    return (
        <FlexboxComponent
            width="100%"
            minHeight="calc(100svh - 100px)"
            gap="20px"
            direction={FlexboxVariant.direction.column}
            align={FlexboxVariant.alignment.center}
            justify={FlexboxVariant.alignment.center}
        >
            <FlexboxComponent
                margin="0 0 0 -60px"
                gap="8px"
                direction={FlexboxVariant.direction.column}
            >
                <PlainTextComponent text="Sign In to" fontSize="16px" fontWeight="300" />
                <AppNameComponent />
            </FlexboxComponent>

            <StyledSignInButtonContainer
                width="240px"
                align={FlexboxVariant.alignment.center}
                justify={FlexboxVariant.alignment.center}
            >
                <StyledSignInButtonDecoration></StyledSignInButtonDecoration>

                <ButtonComponent link onClick={authProvider.signIn}>
                    <PlainTextComponent
                        text={
                            <FlexboxComponent
                                width="100%"
                                gap="8px"
                                align={FlexboxVariant.alignment.center}
                            >
                                Continue with
                                <FlexboxComponent gap="4px" align={FlexboxVariant.alignment.center}>
                                    <GoogleIcon /> Google
                                </FlexboxComponent>
                            </FlexboxComponent>
                        }
                        fontSize="16px"
                    />
                </ButtonComponent>
            </StyledSignInButtonContainer>
        </FlexboxComponent>
    );
};
