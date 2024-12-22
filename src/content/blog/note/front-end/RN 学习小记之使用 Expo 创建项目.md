---
title: RN 学习小记之使用 Expo 创建项目
link: react-native-note-1
catalog: true
date: 2023-06-20T01:33:00.000Z
tags:
  - react-native
  - 跨端
  - 前端
categories:
- [笔记, 前端]
---
由于业务需要，开始学习RN以备后面的需求，而虽然之前有用过 RN 但是项目搭建等都是封装好的脚手架，对本身其实了解不算太多，于是打算记录一下个人从头搭建 RN 项目的一个过程。顺带进行一个资料收集。

> 适合：有前端基础，有前端基本开发环境，想了解一下 Expo 搭建 RN 项目过程的人群

## RN 相关资料

- 官方网站：[Site Unreachable](https://reactnative.dev/)
  - [Introduction · React Native](https://reactnative.dev/docs/getting-started)
  - [Core Components and APIs · React Native](https://reactnative.dev/docs/components-and-apis)
- 中文网：[简介 · React Native 中文网](https://www.reactnative.cn/docs/getting-started)
- Expo 官网： [Expo](https://expo.dev/)
- Github 资源
  - [GitHub - jondot/awesome-react-native](https://github.com/jondot/awesome-react-native) Awesome React Native是一个很棒的风格列表，它策划了最好的React Native库、工具、教程、文章等。
  - [GitHub - infinitered/ignite](https://github.com/infinitered/ignite)  Ignite 是 Expo 和裸 React Native 中最受欢迎的 React Native 应用程序样板，是六年多持续 React Native 开发的结晶。
- 博文
  - [📝 没 2 年 React Native 开发经验，你都遇不到这些坑 - 掘金](https://juejin.cn/post/7012804162249293854)

## 开发环境

### win 下搭建安卓开发环境

- [Setting up the development environment · React Native](https://reactnative.dev/docs/environment-setup?package-manager=npm&guide=native)
- [搭建开发环境 · React Native 中文网](https://www.reactnative.cn/docs/environment-setup)

安卓上，要注意的就是安装 Android Studio & Android SDK，Android Studio 默认会安装最新版本的 Android SDK。目前编译 React Native 应用需要的是 `Android 13 (Tiramisu)` 版本的 SDK（注意 SDK 版本不等于终端系统版本，RN 目前支持 android 5 以上设备）。你可以在 Android Studio 的 SDK Manager 中选择安装各版本的 SDK。

#### 1. 安装 Android Studio

[Download and install Android Studio](https://developer.android.com/studio/index.html) 下载并安装 Android Studio。在 Android Studio 安装向导中，确保选中以下所有项目旁边的框：

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`
- 如果您尚未使用 Hyper-V： `Performance (Intel ® HAXM)` （有关 AMD 或 Hyper-V，请 [参见此处](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html)）

#### 2. 安装安卓 SDK

Android Studio 默认安装最新的 Android SDK。 使用本机代码构建 React Native 应用程序尤其需要 `Android 13 (Tiramisu)` SDK。可以通过 Android Studio 中的 SDK 管理器安装其他 Android SDK。

1. 打开 Android Studio，单击“More Actions”按钮并选择“SDK Manager”。
2. 从SDK Manager中选择“SDK Platforms”选项卡，然后勾选右下角“Show Package Details”旁边的框。查找并展开  `Android 13 (Tiramisu)`  条目，然后确保选中以下项目：

- `Android SDK Platform 33`
- `Intel x86 Atom_64 System Image`  或者  `Google APIs Intel x86 Atom System Image`

![Pasted image 20230620141725.png](https://backblaze.cosine.ren/juejin/128cf0def1354e2e99164dc0380f56e9~tplv-k3u1fbpfcp-watermark.png)

3. 接下来，选择“SDK Tools”选项卡并选中“Show Package Details”旁边的复选框。查找并展开 `Android SDK Build-Tools` 条目，然后确保选择了 `33.0.0` （**ps: 现在是 `34.0.0`了**）
4. 配置 `ANDROID_HOME` 环境变量
   高级系统设置 - 环境变量 -  单击 New... 创建一个新的 `ANDROID_HOME` 用户变量，指向您的 Android SDK 的路径：

![Pasted image 20230620141904.png](https://backblaze.cosine.ren/juejin/57ae0d6c666e475e9f2eb3e771c28073~Tplv-K3u1fbpfcp-Watermark.png)

默认情况下，SDK 安装在以下位置：

```
%LOCALAPPDATA%\Android\Sdk
```

eg: `C:\Users\xxxx\AppData\Local\Android\Sdk`

可以在 Android Studio 设置中的**Appearance & Behavior** → **System Settings** → **Android SDK** 下找到 SDK 的实际位置。

![Pasted image 20230620141558.png](https://backblaze.cosine.ren/juejin/ab6cbc95e11f424b86024a05d0e5d569~tplv-k3u1fbpfcp-watermark.png)

验证环境变量已添加：

- 打开powershell
- 复制并粘贴 `Get-ChildItem -Path Env:\` 到 powershell
- 验证 `ANDROID_HOME` 已添加

![Pasted image 20230620142037.png](https://backblaze.cosine.ren/juejin/dc7821c7201846eb80c1b1885a62e423~tplv-k3u1fbpfcp-watermark.png)

## 使用 Expo

#### 为什么用 Expo ？

> Expo是一组工具、库和服务，可以通过编写JavaScript来构建本地的iOS和android应用程序。说人话，就是在React Native的基础上再封装了一层，让我们的开发更方便，更快速。
>
> - 做过移动端的同学在做跨平台之前肯定会担心一个点，就是各种原生功能（相机，相册，定位，蓝牙等等），使用expo的话，会比你开发一个裸的React Native真的会快很多，而且会少踩很多坑
> - 没有做过移动端的前端那就更需要这个了，不然移动端的一些隐藏的限制和坑，会让你很头疼
>   ——[`<cite>`React Native 基于Expo开发（一）项目搭建 - 掘金`</cite>`](https://juejin.cn/post/7102802785355169806)

接下来将根据官网教程，搭建一个Expo的应用程序： [Create your first app - Expo Documentation](https://docs.expo.dev/tutorial/create-your-first-app/)

### 初始化 Expo 项目

使用 `create-expo-app` 来初始化一个新的 Expo 应用程序。它是一个命令行工具，允许创建一个安装了 `expo` 包的新 React Native 项目。

```bash
npx create-expo-app StickerSmash
cd StickerSmash
```

> 在官方文档里下载演示项目所需的图片等静态资源，将项目中的 assets 替换： [Download assets](https://docs.expo.dev/static/images/tutorial/sticker-smash-assets.zip)

现在，让我们在我们最喜欢的代码编辑器或 IDE 中打开项目目录。在本教程中，我们将使用 VS Code 作为示例。

### 启动项目

- [Install dependencies 安装依赖](https://docs.expo.dev/tutorial/create-your-first-app/#install-dependencies)

要在 Web 上运行该项目，我们需要安装以下有助于在 Web 上运行该项目的依赖项：

```bash
npx expo install react-dom react-native-web @expo/webpack-config
```

启动

```bash
npx expo start
```

| Scan QR code                                                                                                                                                                | 启动成功                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Screenshot_2023-06-20-14-37-42-694_host.exp.expon.jpg](https://backblaze.cosine.ren/juejin/Ef171bf33f904e0ca8bddbdbc9c25001~Tplv-K3u1fbpfcp-Watermark.png) | ![Screenshot_2023-06-20-14-37-23-383_host.exp.expon.jpg](https://backblaze.cosine.ren/juejin/ab571910785e4c34aebec93a0d5a06b0~tplv-k3u1fbpfcp-watermark.png) |

### Expo 推荐配合库

以下是一些 Expo 官方推荐与之配合的库：

- 安全区域库 [react-native-safe-area-context](https://docs.expo.dev/develop/user-interface/safe-areas/)
  - `react-native-safe-area-context` 提供了一个灵活的 API，用于访问 Android 和 iOS 的设备安全区域插入信息。它还提供了一个 SafeAreaView 组件，您可以使用该组件代替 View 来插入视图以自动考虑安全区域。
- 动画库 [react-native-reanimated](https://docs.expo.dev/develop/user-interface/animation/)
  - 在您的 Expo 项目中，您可以使用 React Native 的动画 API。然而，如果你想使用性能更好的更高级的动画，你可以使用 `react-native-reanimated` 库。它提供了一个 API，可以简化创建流畅、强大且可维护的动画的过程。
- 存储数据 [Store data - Expo Documentation](https://docs.expo.dev/develop/user-interface/store-data/)
  - `expo-secure-store` 提供了一种在设备本地加密和安全存储键值对的方法。

还有其他的一些推荐库，可以看这里

[开始使用React Native和Expo SDK - 掘金](https://juejin.cn/post/7067103345361567775)

- [AppAuth](https://docs.expo.io/versions/v34.0.0/sdk/app-auth/)，[AuthSession](https://docs.expo.io/versions/v34.0.0/sdk/auth-session/)：通过OAuth对用户进行认证
- [SplashScreen](https://docs.expo.io/versions/v34.0.0/sdk/splash-screen/)：在启动应用程序时制作一个闪屏（官方文档）
- [localization](https://docs.expo.io/versions/v34.0.0/sdk/localization/) 管理你的应用程序的l10n/i18n，以达到本地化的目的
- [AppLoading](https://docs.expo.io/versions/v34.0.0/sdk/app-loading/)：加载资产、字体等。
- [MapView](https://docs.expo.io/versions/v34.0.0/sdk/map-view/)：在应用程序中使用地图
- [ImagePicker](https://docs.expo.io/versions/v34.0.0/sdk/imagepicker/) or [ImageManipulator](https://docs.expo.io/versions/v34.0.0/sdk/imagemanipulator/) ：从设备上打开图像或视频
- [Sharing](https://docs.expo.io/versions/v34.0.0/sdk/sharing/)：在应用程序和设备之间共享数据
- [SecureStore](https://docs.expo.io/versions/v34.0.0/sdk/securestore/): 在设备存储器上保存数据
- [Camera](https://docs.expo.io/versions/v34.0.0/sdk/camera/): 使用设备的摄像头拍摄照片和视频
- [Notifications](https://link.juejin.cn?target=https%3A%2F%2Fdocs.expo.io%2Fversions%2Fv34.0.0%2Fsdk%2Fnotifications%2F "https://docs.expo.io/versions/v34.0.0/sdk/notifications/")：来自 Expo 推送服务的推送通知
