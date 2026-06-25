import { updateUserProfileSchema, userSchema } from "@template/schemas";
import type { UpdateUserProfileInput } from "@template/schemas";
import type { ReturnTypeOfCreateApiClient } from "./types";

export function createUserApi(client: ReturnTypeOfCreateApiClient) {
  return {
    getMe() {
      return client.request({
        method: "GET",
        path: "/users/me"
      }, userSchema);
    },

    updateMe(input: UpdateUserProfileInput) {
      const body = updateUserProfileSchema.parse(input);

      return client.request({
        method: "PATCH",
        path: "/users/me",
        body
      }, userSchema);
    }
  };
}
