interface IPandaDebouncerConfig {
    triggerFirstTimeActionRightAway?: boolean;
}

export class PandaDebouncer {
    private _timeoutHandler?: ReturnType<typeof setTimeout> | number;
    private _timeout: number;
    private _config: IPandaDebouncerConfig | undefined;
    private _isBlocking: boolean;

    constructor(milliseconds: number, config?: IPandaDebouncerConfig) {
        this._timeoutHandler = undefined;
        this._timeout = milliseconds;
        this._config = config;
        this._isBlocking = false;
    }

    destroy(): void {
        window.clearTimeout(this._timeoutHandler);
    }

    execute(callback: unknown): void {
        if (!callback || typeof callback !== 'function') return;

        if (!this._config?.triggerFirstTimeActionRightAway) {
            this.destroy();
            this._timeoutHandler = setTimeout(callback, this._timeout);
            return;
        }

        if (this._isBlocking) return;

        callback();

        this._isBlocking = true;
        const customCallback = (): void => {
            this._isBlocking = false;
        };
        this._timeoutHandler = setTimeout(customCallback, this._timeout);
    }
}
