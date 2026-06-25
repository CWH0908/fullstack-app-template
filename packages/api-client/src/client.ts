import type { z } from "zod";
import { ApiClientError } from "./errors";

export type ApiClientOptions = {
  baseUrl: string;
  getToken?: () => string | undefined | Promise<string | undefined>;
  fetchImpl?: typeof fetch;
};

export type RequestOptions<TBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: TBody;
};

export function createApiClient(options: ApiClientOptions) {
  const fetcher = options.fetchImpl ?? fetch;

  async function request<TBody, TResponse>(
    requestOptions: RequestOptions<TBody>,
    responseSchema: z.ZodType<TResponse>
  ): Promise<TResponse> {
    const token = await options.getToken?.();
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetcher(`${options.baseUrl}${requestOptions.path}`, {
      method: requestOptions.method ?? "GET",
      headers,
      body: requestOptions.body ? JSON.stringify(requestOptions.body) : undefined
    });

    const payload = await response.json().catch(() => undefined);

    if (!response.ok) {
      throw new ApiClientError(
        payload?.error?.message ?? "请求失败",
        response.status,
        payload?.error?.code,
        payload?.error?.details
      );
    }

    return responseSchema.parse(payload?.data ?? payload);
  }

  return {
    request
  };
}
