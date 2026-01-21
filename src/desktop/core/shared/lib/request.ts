import { toCaseTransformed } from '../util';
import { PandaDebouncer } from './debouncer';

export enum TransformTypeEnum {
    camelCase = 'camelCase',
    snakeCase = 'snakeCase',
}

export enum RequestMethodEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum RequestConfigTypeEnum {
    transformRequest = 'transformRequest',
    transformResponse = 'transformResponse',
}

interface IRequestConfigs {
    [RequestConfigTypeEnum.transformRequest]?: TransformTypeEnum;
    [RequestConfigTypeEnum.transformResponse]?: TransformTypeEnum;
}

export interface IResponse {
    status: number;
    error?: boolean;
    message?: string;
    data?: unknown;
    headers?: Headers;
}

type OverrideResponseCallback = (response: IResponse) => IResponse;
type OnCompleteCallListenerCallback = (response: IResponse) => void;

export class PandaHTTPRequest {
    private _baseURL: string;
    private _headers: Record<string, string>;
    private _controller: AbortController;
    private _params: Record<string, unknown>;
    private _body?: FormData | URLSearchParams;
    private _debouncer = new PandaDebouncer(500);
    private _method: RequestMethodEnum;
    private _configs: IRequestConfigs;
    private _timeoutInMilliseconds?: number;

    private _overrideResponse?: OverrideResponseCallback;
    private _onCompleteCallListener?: OnCompleteCallListenerCallback;

    constructor() {
        this._baseURL = '';
        this._controller = new AbortController();
        this._params = {};
        this._method = RequestMethodEnum.GET;
        this._configs = {};
        this._headers = {
            'Content-Type': 'application/json;charset=UTF-8',
        };
    }

    public get aborted(): boolean {
        return this._controller.signal.aborted;
    }

    public setBaseURL(url: string): void {
        this._baseURL = url;
    }

    public extendsBaseURL(value: string): void {
        this._baseURL += value;
    }

    public setMethod(method: RequestMethodEnum): void {
        this._method = method;
    }

    public setHeader(key: string, value: string): void {
        this._headers[key] = value;
    }

    public removeHeader(key: string): void {
        delete this._headers[key];
    }

    public setConfig(key: RequestConfigTypeEnum, value: TransformTypeEnum): void {
        this._configs[key] = value;
    }

    public setTimeout(value: number): void {
        this._timeoutInMilliseconds = value;
    }

    public setParams(params: Record<string, unknown>): void {
        const _params: Record<string, unknown> = {};
        Object.keys(params).forEach((key) => {
            const _val = params[key];
            if (_val === undefined) return;
            if (typeof _val === 'string') _params[key] = _val.trim();
            else _params[key] = _val;
        });
        this._params = _params;
    }

    public setBody(data: FormData | URLSearchParams): void {
        this._body = data;
    }

    public overrideResponse(callback: OverrideResponseCallback): void {
        this._overrideResponse = callback;
    }

    public onCompleteCall(callback: OnCompleteCallListenerCallback): void {
        this._onCompleteCallListener = callback;
    }

    public call(): Promise<IResponse> {
        return new Promise((resolve) => {
            const transformRequest = this._configs[RequestConfigTypeEnum.transformRequest];
            let _url = `${this._baseURL}`;
            let _params: Record<string, unknown> = { ...this._params };

            if (transformRequest) {
                _params = toCaseTransformed(_params, transformRequest) as Record<string, unknown>;
            }

            if ([RequestMethodEnum.GET, RequestMethodEnum.DELETE].includes(this._method)) {
                let search = '';
                Object.keys(_params).forEach((key) => {
                    if (Array.isArray(_params[key])) {
                        (_params[key] as unknown[]).forEach((item) => {
                            search += `&${key}=${item}`;
                        });
                    } else {
                        search += `&${key}=${_params[key]}`;
                    }
                });
                if (search) search = `?${search.substring(1)}`;
                _url = `${_url}${search}`;
            }

            const handleOnFetchRequestError = (e: unknown): void => {
                const result: IResponse = {
                    status: Object(e).status || 500,
                    message: Object(e).message,
                    error: true,
                };
                this._debouncer.execute(() => {
                    this._onCompleteCallListener?.(result);
                    !this._overrideResponse
                        ? resolve(result)
                        : resolve(this._overrideResponse(result));
                });
            };

            // setup request max timeout
            let requestMaxTimeoutHandler: NodeJS.Timeout | undefined = undefined;
            if (this._timeoutInMilliseconds) {
                requestMaxTimeoutHandler = setTimeout(() => {
                    handleOnFetchRequestError({
                        status: 500,
                        message: 'request timeout',
                    });
                    this._controller.abort();
                    this._controller = new AbortController();

                    // eslint-disable-next-line no-console
                    console.error(
                        `[request timeout after ${this._timeoutInMilliseconds}ms] ${this._baseURL}`
                    );
                }, this._timeoutInMilliseconds);
            }

            fetch(_url, {
                signal: this._controller.signal,
                method: this._method,
                headers: this._headers,
                body: this._body
                    ? this._body
                    : [
                            RequestMethodEnum.POST,
                            RequestMethodEnum.PUT,
                            RequestMethodEnum.PATCH,
                        ].includes(this._method)
                      ? JSON.stringify(_params)
                      : undefined,
            })
                .then((response) => {
                    this._processResponse(response, this._configs).then((result) => {
                        if (this._timeoutInMilliseconds) clearTimeout(requestMaxTimeoutHandler);

                        this._debouncer.execute(() => {
                            this._onCompleteCallListener?.(result);
                            !this._overrideResponse
                                ? resolve(result)
                                : resolve(this._overrideResponse(result));
                        });
                    });
                })
                .catch((e) => {
                    if (this._timeoutInMilliseconds) clearTimeout(requestMaxTimeoutHandler);
                    handleOnFetchRequestError(e);
                });
        });
    }

    public abort(): void {
        this._controller.abort();
    }

    private _processResponse(response: Response, configs?: IRequestConfigs): Promise<IResponse> {
        return new Promise((resolve) => {
            response
                .text()
                .then((text) => {
                    let json: Record<string, unknown> | undefined;
                    try {
                        json = JSON.parse(text);
                        if (configs?.transformResponse) {
                            json = toCaseTransformed(json, configs.transformResponse) as Record<
                                string,
                                unknown
                            >;
                        }
                    } catch (e) {
                        json = undefined;
                    }

                    if (200 <= response.status && response.status < 300) {
                        resolve({
                            headers: response.headers,
                            status: response.status,
                            data: json || text,
                        });
                    } else {
                        resolve({
                            status: response.status,
                            message: `Request failed with status ${response.status}`,
                            data: text,
                            error: true,
                        });
                    }
                })
                .catch((e) => {
                    resolve({
                        status: 500,
                        message: Object(e).message,
                        error: true,
                    });
                });
        });
    }
}
