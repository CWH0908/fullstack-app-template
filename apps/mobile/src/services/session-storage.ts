import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth.token";

export function persistToken(token: string) {
  return SecureStore.setItemAsync(TOKEN_KEY, token);
}

export function readPersistedToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export function clearPersistedToken() {
  return SecureStore.deleteItemAsync(TOKEN_KEY);
}
