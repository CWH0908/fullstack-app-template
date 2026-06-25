import { proxy } from "valtio";

export type AppState = {
  colorScheme: "light" | "dark" | "system";
};

export const appState = proxy<AppState>({
  colorScheme: "system"
});
