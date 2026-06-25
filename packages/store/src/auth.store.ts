import { proxy } from "valtio";
import type { User } from "@template/shared";

export type AuthState = {
  token?: string;
  user?: User;
  isBootstrapped: boolean;
};

export const authState = proxy<AuthState>({
  token: undefined,
  user: undefined,
  isBootstrapped: false
});

export function setAuthSession(session: Pick<AuthState, "token" | "user">) {
  authState.token = session.token;
  authState.user = session.user;
  authState.isBootstrapped = true;
}

export function clearAuthSession() {
  authState.token = undefined;
  authState.user = undefined;
  authState.isBootstrapped = true;
}
