import { useMutation } from "@tanstack/react-query";
import { useSnapshot } from "valtio";
import { APP_NAME } from "@template/shared";
import { authState, setAuthSession } from "@template/store";
import { authApi } from "./api";

export function App() {
  const auth = useSnapshot(authState);
  const loginMutation = useMutation({
    mutationFn: () => authApi.loginByWechatCode({ code: "web-demo-code" }),
    onSuccess: (session) => setAuthSession(session)
  });

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Monorepo seed</p>
        <h1>{APP_NAME}</h1>
        <p className="summary">
          Web 端用于 H5、用户门户或活动页。它通过共享 api-client、schemas 和 Valtio
          store 接入后端，不直接复制接口类型。
        </p>
        <div className="actions">
          <button type="button" onClick={() => loginMutation.mutate()}>
            模拟登录
          </button>
          <span>{auth.user ? `已登录：${auth.user.nickname}` : "未登录"}</span>
        </div>
      </section>

      <section className="flow" aria-label="architecture flow">
        {["UI", "Valtio", "Query", "api-client", "NestJS", "Kysely", "MySQL"].map((item) => (
          <div className="step" key={item}>
            {item}
          </div>
        ))}
      </section>
    </main>
  );
}
