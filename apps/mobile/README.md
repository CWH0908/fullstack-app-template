# Mobile

Expo / React Native Android 应用。

## 职责

- Android 原生体验。
- 移动端路由、页面、权限和系统能力。
- 使用 `expo-secure-store` 等平台存储保存 token。
- 通过 `@template/api-client` 访问后端。

## 注意

移动端使用 Expo 56，对应 React Native 0.86 和 React 19。小程序使用 Taro 4，对 React 18 更友好，所以不要把 React 提到根目录强制统一版本。

pnpm 可能提示 `expo-modules-core` 对 `react-native-worklets` 的 peer 范围偏旧。模板使用 `react-native-worklets@0.10.x` 是为了匹配 React Native 0.86 和 Reanimated 4.5。
