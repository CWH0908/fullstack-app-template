import { createApiClient, createAuthApi, createUserApi } from "@template/api-client";
import { authState } from "@template/store";

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const apiClient = createApiClient({
  baseUrl,
  getToken: () => authState.token
});

export const authApi = createAuthApi(apiClient);
export const userApi = createUserApi(apiClient);
