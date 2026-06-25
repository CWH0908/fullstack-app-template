import { loginByWechatCodeSchema, loginResponseSchema } from "@template/schemas";
import type { LoginByWechatCodeInput } from "@template/schemas";
import type { ReturnTypeOfCreateApiClient } from "./types";

export function createAuthApi(client: ReturnTypeOfCreateApiClient) {
  return {
    loginByWechatCode(input: LoginByWechatCodeInput) {
      const body = loginByWechatCodeSchema.parse(input);

      return client.request({
        method: "POST",
        path: "/auth/wechat",
        body
      }, loginResponseSchema);
    }
  };
}
