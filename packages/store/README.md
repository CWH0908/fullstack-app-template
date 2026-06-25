# @template/store

Valtio 公共状态模型。这里只保存可跨端理解的状态和 action，不处理平台持久化。

示例：

- `authState.token` 可以在这里定义。
- “token 存到哪里”不要放在这里：小程序用 Taro storage，App 用 SecureStore，Web 用 localStorage 或 cookie。
