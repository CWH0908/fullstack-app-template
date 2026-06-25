import Taro from "@tarojs/taro";

const TOKEN_KEY = "auth.token";

export function persistToken(token: string) {
  return Taro.setStorage({ key: TOKEN_KEY, data: token });
}

export async function readPersistedToken() {
  const result = await Taro.getStorage<string>({ key: TOKEN_KEY }).catch(() => undefined);
  return result?.data;
}

export function clearPersistedToken() {
  return Taro.removeStorage({ key: TOKEN_KEY });
}
