import Constants from "expo-constants";
import { createApiClient, createAuthApi, createUserApi } from "@template/api-client";
import { authState } from "@template/store";

const extra = Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined;
const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? extra?.apiBaseUrl ?? "http://localhost:3000";

export const apiClient = createApiClient({
  baseUrl,
  getToken: () => authState.token
});

export const authApi = createAuthApi(apiClient);
export const userApi = createUserApi(apiClient);
