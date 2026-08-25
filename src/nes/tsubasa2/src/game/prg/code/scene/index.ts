/**
 * scene/index.ts — 场景控制器集中导出
 *
 * BootRouter 从本入口统一 import 全部 Scene0-23 controller，
 * 避免硬编码 ../scene/SceneXController 路径。
 */

// Scene 0 (Tecmo logo 开场)
export { Scene0Controller } from './Scene0Controller';
// Scene 1-13 (utility chain)
export {
  Scene1Controller,
  Scene2Controller,
  Scene3Controller,
  Scene4Controller,
  Scene5Controller,
  Scene6Controller,
  Scene7Controller,
  Scene8Controller,
  Scene9Controller,
  Scene10Controller,
  Scene11Controller,
  Scene12Controller,
  Scene13Controller,
} from './SceneUtilitiesControllers';
// Scene 14-23 (主游戏)
export {
  Scene14Controller,
  Scene15Controller,
  Scene16Controller,
  Scene17Controller,
  Scene18Controller,
  Scene19Controller,
  Scene20Controller,
  Scene21Controller,
  Scene22Controller,
  Scene23Controller,
} from './Scene14to23Controllers';

// 场景控制器基类 + 行为表
export { SceneController } from './SceneController';
export { SCENE_TABLE, getSceneEntry } from './SceneTable';
export type { SceneEntry } from './SceneTable';
