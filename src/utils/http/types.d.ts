import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";

export interface resultType {
  accessToken?: string;
}

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface PureHttpResponse extends AxiosResponse<any, any> {
  config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void;

  beforeResponseCallback?: (response: PureHttpResponse) => void;
  headers?: any;
  isNeedLoading?: boolean;
  isNeedToken?: boolean;
  roleName?: string;
  serverName?: string;
}

export interface PureHttpInstance {
  get<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P>;
  post<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P>;
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T>;
}

declare const PureHttp: PureHttpInstance;
export default PureHttp;
