/**
 * 微信小程序全局类型声明（最小集，供 pages/ 编译）
 *
 * 仅声明页面编译所需的 API 面；更多 API 按需补充。
 */
/**
 * 注意：options 使用 any —— 页面/组件的 `this` 将继承为 any，
 * 避免对象字面量方法内的 this 访问报错（小程序 page 实例化机制）。
 */
declare function App(options: any): void;
declare function Page(options: any): void;
declare function Component(options: any): void;
declare function getApp(): any;
declare function getCurrentPages(): any[];
declare const wx: any;
declare const tt: any;
