import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useSnapshot } from "valtio";
import { APP_NAME } from "@template/shared";
import { authState, setAuthSession } from "@template/store";
import { authApi } from "../src/services/api";
import { persistToken } from "../src/services/session-storage";

export default function HomeScreen() {
  const auth = useSnapshot(authState);
  const loginMutation = useMutation({
    mutationFn: () => authApi.loginByWechatCode({ code: "mobile-demo-code" }),
    onSuccess: async (session) => {
      setAuthSession(session);
      await persistToken(session.token);
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Expo Android seed</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.summary}>
          Mobile 端负责原生体验。业务类型、schema、api-client 和 Valtio 状态与其他端共享。
        </Text>
        <Pressable style={styles.button} onPress={() => loginMutation.mutate()}>
          <Text style={styles.buttonText}>模拟登录</Text>
        </Pressable>
        <Text style={styles.status}>{auth.user ? `已登录：${auth.user.nickname}` : "未登录"}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f4f0e8",
    flex: 1
  },
  container: {
    flex: 1,
    gap: 18,
    justifyContent: "center",
    padding: 28
  },
  eyebrow: {
    color: "#a34225",
    fontSize: 14,
    fontWeight: "700"
  },
  title: {
    color: "#141414",
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 46
  },
  summary: {
    color: "#55514a",
    fontSize: 16,
    lineHeight: 26
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1d4d4f",
    borderRadius: 8,
    marginTop: 10,
    padding: 14
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700"
  },
  status: {
    color: "#333",
    fontSize: 15
  }
});
