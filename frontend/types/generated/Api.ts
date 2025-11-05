/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** @example 1 */
  id: number;
  /** @example "ユーザー太朗" */
  name: string;
  /** @example "user@example.com" */
  email: string;
  /** @example "user" */
  role?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://{defaultHost}";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API V1
 * @version v1
 * @baseUrl http://{defaultHost}
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags PasswordResets
     * @name V1PasswordResetRequestCreate
     * @summary パスワード変更メール
     * @request POST:/api/v1/password/reset/request
     */
    v1PasswordResetRequestCreate: (
      data: {
        /**
         * @format email
         * @example "user@example.com"
         */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。" */
          message: string;
        },
        any
      >({
        path: `/api/v1/password/reset/request`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags EmailVerify
     * @name V1PasswordVerifyCreate
     * @summary トークン&メールアドレスチェック
     * @request POST:/api/v1/password/verify
     */
    v1PasswordVerifyCreate: (
      data: {
        /**
         * @format email
         * @example "user@example.com"
         */
        email: string;
        /** @example "abc123reset_token_here" */
        token: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "トークンは有効です。" */
          message?: string;
        },
        | {
            /** @example "無効なトークンです" */
            message?: string;
          }
        | {
            /** @example "ユーザーが見つかりません。" */
            message?: string;
          }
      >({
        path: `/api/v1/password/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PasswordUpdate
     * @name V1PasswordResetPartialUpdate
     * @summary パスワード更新
     * @request PATCH:/api/v1/password/reset
     */
    v1PasswordResetPartialUpdate: (
      data: {
        /**
         * @format email
         * @example "user@example.com"
         */
        email: string;
        /** @example "abc123reset_token_here" */
        token: string;
        /** @example "password123" */
        password: string;
        /** @example "password123" */
        password_confirmation: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "パスワードを更新しました。" */
          message?: string;
        },
        | {
            /** @example "無効なトークンです" */
            message?: string;
          }
        | {
            /** @example "ユーザーが見つかりません。" */
            message?: string;
          }
        | {
            /** @example "パスワードと確認用パスワードを入力してください。" */
            message?: string;
          }
      >({
        path: `/api/v1/password/reset`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UserCreate
     * @summary ユーザーのサインアップ
     * @request POST:/api/v1/user
     */
    v1UserCreate: (
      data: {
        user: {
          /** @example "test@example.com" */
          email: string;
          /** @example "password123" */
          password: string;
          /** @example "password123" */
          password_confirmation: string;
          /** @example "test" */
          name: string;
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example 200 */
          status?: number;
          /** @example "サインアップに成功しました" */
          message?: string;
          user?: {
            /** @example 1 */
            id: number;
            /** @example "test@example.com" */
            email: string;
            /** @example "test" */
            name: string;
          };
        },
        {
          /** @example 422 */
          status?: number;
          /** @example "サインアップに失敗しました" */
          message?: string;
          errors?: string[];
        }
      >({
        path: `/api/v1/user`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1LoginCreate
     * @summary ユーザーのログイン
     * @request POST:/api/v1/login
     */
    v1LoginCreate: (
      data: {
        user?: {
          /** @example "test@example.com" */
          email: string;
          /** @example "password123" */
          password: string;
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example 200 */
          status?: number;
          /** @example "ログインに成功しました" */
          message?: string;
          user?: {
            /** @example 1 */
            id: number;
            /** @example "test@example.com" */
            email: string;
            /** @example "テストユーザー" */
            name: string;
          };
        },
        {
          /** @example 401 */
          status?: number;
          /** @example "メールアドレスか、パスワードが不正です" */
          message?: string;
        }
      >({
        path: `/api/v1/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1LogoutDelete
     * @summary ユーザーのログアウト
     * @request DELETE:/api/v1/logout
     */
    v1LogoutDelete: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example 200 */
          status?: number;
          /** @example "ログアウトに成功しました" */
          message?: string;
        },
        void
      >({
        path: `/api/v1/logout`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description ログイン中のユーザー情報（プロフィール）を取得します。
     *
     * @tags Profile
     * @name GetProfile
     * @summary プロフィール取得
     * @request GET:/api/v1/profile
     */
    getProfile: (params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/api/v1/profile`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
