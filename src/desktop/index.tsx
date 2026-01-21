import React from 'react';
import styled from 'styled-components';
import SignIn from '../shared/component/sign-in';

import { FullScreenLoader } from '../mobile/shared/component/full-screen-loader';
import { AuthProvider, useAuthProvider } from '../shared/provider/auth';
import { APP_CONTEXT_INITIAL_STATE, AppContext, IAppContextState } from './context';
import { token } from './core/foundation/token';
import { MainContent } from './main-content';
import { RightPanel } from './scan-panel';

const StyledAppContainer = styled.div`
    width: 100%;
    min-width: 960px;
    height: 100vh;
    min-height: 480px;
    padding: 20px;
    background: #d3d3d3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    * {
        font-family: Oxanium;
        letter-spacing: 0;
    }
`;

const StyledAppContainerWrapper = styled.div`
    height: 100%;
    width: 100%;
    max-height: 720px;
    min-height: 440px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 14px;
    gap: 20px;
`;

const StyledAppContainerOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
    top: 0;
    left: 0;
`;

const App = (): JSX.Element => {
    const [state, setState] = React.useState<IAppContextState>(APP_CONTEXT_INITIAL_STATE);

    const authCtx = useAuthProvider();

    if (authCtx.isAuthenticating) return <FullScreenLoader />;
    if (!authCtx.isAuthenticated) return <SignIn />;

    return (
        <AppContext.Provider value={{ state, setState }}>
            <StyledAppContainer
                id={token.get<string>('global.util.root.id')}
                className={token.get<string>('global.util.root.class')}
            >
                <StyledAppContainerWrapper>
                    <MainContent />
                    <RightPanel />
                </StyledAppContainerWrapper>
            </StyledAppContainer>
            {state.scanner.isPlaying && <StyledAppContainerOverlay />}
        </AppContext.Provider>
    );
};

const AppWithProviders = (): JSX.Element => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default AppWithProviders;
