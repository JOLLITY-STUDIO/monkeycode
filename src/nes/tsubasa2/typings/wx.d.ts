/**
 * 微信小程序全局类型声明 (根目录 typings — 微信开发者工具与 tsc 均自动识别)
 *
 * 覆盖 pages 下全部页面 TS 用到的全局小程序 API：
 *   - 页面/组件注册: Page / App / Component / Behavior / getApp / getCurrentPages
 *   - wx 核心 API: createSelectorQuery / getSystemInfoSync / canvasToTempFilePath / showToast / navigateTo / createWebAudioContext
 */

declare const wx: any;

/** 页面实例 (this 绑定, 方法内可访问 data/setData 与自定义属性) */
type WxPageInstance = Record<string, any>;

/** 页面构造参数 (data 类型由子类约束) */
interface WxPageOptions extends Record<string, any> {
  data?: Record<string, any>;
}

/** 全局对象声明 (H5/TS 编译环境兼容, ThisType 绑定实例) */
declare function Page(options: WxPageInstance & ThisType<WxPageInstance>): void;
declare function App(options: WxPageInstance & ThisType<WxPageInstance>): void;
declare function Component(options: WxPageInstance & ThisType<WxPageInstance>): void;
declare function Behavior(options: WxPageInstance & ThisType<WxPageInstance>): any;
declare function getApp(): any;
declare function getCurrentPages(): any[];
