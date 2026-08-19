/** 微信小程序全局 wx 声明 (H5 编译环境兼容) */
declare const wx: any;

/** 微信小程序页面实例类型 (this 绑定, 方法内可任意访问 setData/data 等) */
type WxPageInstance = Record<string, any>;

/** 微信小程序全局对象声明 (H5/TS 编译环境兼容) */
declare function Page(options: WxPageInstance & ThisType<WxPageInstance>): void;
declare function App(options: WxPageInstance & ThisType<WxPageInstance>): void;
declare function Component(options: WxPageInstance & ThisType<WxPageInstance>): void;
declare function Behavior(options: WxPageInstance & ThisType<WxPageInstance>): any;
declare function getApp(): any;
declare function getCurrentPages(): any[];
