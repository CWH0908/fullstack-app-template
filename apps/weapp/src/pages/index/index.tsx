import { Button, Text, View } from "@tarojs/components";
import { useMutation } from "@tanstack/react-query";
import { useSnapshot } from "valtio";
import { APP_NAME } from "@template/shared";
import { authState, setAuthSession } from "@template/store";
import { authApi } from "../../services/api";
import { persistToken } from "../../services/session-storage";
import "./index.scss";

export default function IndexPage() {
  const auth = useSnapshot(authState);
  const loginMutation = useMutation({
    mutationFn: () => authApi.loginByWechatCode({ code: "weapp-demo-code" }),
    onSuccess: async (session) => {
      setAuthSession(session);
      await persistToken(session.token);
    }
  });

  return (
    <View className="page">
      <Text className="eyebrow">Taro WeChat seed</Text>
      <Text className="title">{APP_NAME}</Text>
      <Text className="summary">
        小程序端负责微信生态能力。类型、schema、api-client 和 Valtio 状态与其他端共享。
      </Text>
      <Button className="button" onClick={() => loginMutation.mutate()}>
        模拟登录
      </Button>
      <Text className="status">{auth.user ? `已登录：${auth.user.nickname}` : "未登录"}</Text>
    </View>
  );
}
