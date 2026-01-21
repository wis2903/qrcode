import React from 'react';

export const useEffectOnMounted = (callback: VoidFunction, dependencies: unknown[]): void => {
    const mountedRef = React.useRef<boolean>(false);

    React.useEffect(() => {
        if (!mountedRef.current) return;
        callback();
    }, [dependencies]);

    React.useEffect(() => {
        mountedRef.current = true;

        return (): void => {
            mountedRef.current = false;
        };
    }, []);
};
