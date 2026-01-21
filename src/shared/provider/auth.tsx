/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react';
import env from '../../env.json';

import { StorageKeyEnum } from '../type/common';
import { axiosInstanceWithAccessToken } from '../util';

interface IAuthContextValue {
    isAuthenticated?: boolean;
    isAuthenticating?: boolean;
    profile?: Record<string, unknown>;
    signIn: VoidFunction;
    signOut: VoidFunction;
}

export const AuthContext = React.createContext<IAuthContextValue>({
    signIn: () => undefined,
    signOut: () => undefined,
});

export const useAuthProvider = (): IAuthContextValue => React.useContext(AuthContext);

export const AuthProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
    const [isAuthenticating, setIsAuthenticating] = React.useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [profile, setProfile] = React.useState<Record<string, unknown> | undefined>({});

    const handleCheckAuthentication = async (): Promise<void> => {
        const tokenInStorage = String(localStorage.getItem(StorageKeyEnum.AccessToken) || '');
        if (!tokenInStorage) {
            setIsAuthenticated(false);
            setIsAuthenticating(false);
            return;
        }

        await handleFetchUserProfile();
    };

    const handleAuthByGoogleCode = async (code: string): Promise<void> => {
        try {
            const frm = new FormData();
            frm.set('grant_type', 'authorization_code');
            frm.set('redirect_uri', window.location.origin);
            frm.set('code', code);
            frm.set('client_id', env['oauth-client-id']);
            frm.set('client_secret', env['oauth-client-secret']);

            const oauthTokenResponse = await axios.post('https://oauth2.googleapis.com/token', frm);
            const oauthToken = oauthTokenResponse.data.id_token;

            const beTokenResponse = await axios.post('https://api.goku.dev/api/v1/user/sign-in', {
                provider: 'string',
                token: oauthToken,
            });

            const accessToken = beTokenResponse.data.access_token;
            if (!accessToken) throw new Error('empty access token');
            localStorage.setItem(StorageKeyEnum.AccessToken, accessToken);
            axiosInstanceWithAccessToken.interceptors.request.use(function (config) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                return config;
            });

            await handleFetchUserProfile();
        } catch (e) {
            setIsAuthenticated(false);
            setIsAuthenticating(false);
        } finally {
            window.history.replaceState(null, '', window.location.pathname);
        }
    };

    const handleFetchUserProfile = async (): Promise<void> => {
        try {
            const response = await axiosInstanceWithAccessToken.get('/api/v1/me/profile');
            setProfile(response.data);
            setIsAuthenticated(true);
        } catch (e) {
            setIsAuthenticated(false);
        } finally {
            setIsAuthenticating(false);
        }
    };

    const extractGoogleCodeFromURLSearchParams = (): string => {
        const srch = window.location.search;
        try {
            const params = JSON.parse(
                '{"' + srch.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                function (key, value) {
                    return key === '' ? value : decodeURIComponent(value);
                }
            );

            return params.code || '';
        } catch (e) {
            return '';
        }
    };

    const handleSignIn = (): void => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env['oauth-client-id']}&redirect_uri=${window.location.origin}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email%20openid`;
        window.location.replace(url);
    };

    const handleSignOut = (): void => {
        localStorage.clear();
        window.location.reload();
    };

    React.useEffect(() => {
        const googleAccessTokenFromHash = extractGoogleCodeFromURLSearchParams();
        if (googleAccessTokenFromHash) handleAuthByGoogleCode(googleAccessTokenFromHash);
        else handleCheckAuthentication();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticating,
                isAuthenticated,
                profile,
                signIn: handleSignIn,
                signOut: handleSignOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
