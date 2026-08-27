/**
 * scene/index.ts — 场景控制器集中导出
 *
 * BootRouter 从本入口统一 import 全部 Scene0-23 controller，
 * 避免硬编码 ../scene/SceneXController 路径。
 */

// Scene 0 (Tecmo logo 开场)
export { Scene0Controller } from './Scene0Controller';
// Scene 1-13 (utility chain)
export { Scene1Controller } from './Scene1Controller';
export { Scene2Controller } from './Scene2Controller';
export { Scene3Controller } from './Scene3Controller';
export { Scene4Controller } from './Scene4Controller';
export { Scene5Controller } from './Scene5Controller';
export { Scene6Controller } from './Scene6Controller';
export { Scene7Controller } from './Scene7Controller';
export { Scene8Controller } from './Scene8Controller';
export { Scene9Controller } from './Scene9Controller';
export { Scene10Controller } from './Scene10Controller';
export { Scene11Controller } from './Scene11Controller';
export { Scene12Controller } from './Scene12Controller';
export { Scene13Controller } from './Scene13Controller';
// Scene 14-23 (主游戏)
export { Scene14Controller } from './Scene14Controller';
export { Scene15Controller } from './Scene15Controller';
export { Scene16Controller } from './Scene16Controller';
export { Scene17Controller } from './Scene17Controller';
export { Scene18Controller } from './Scene18Controller';
export { Scene19Controller } from './Scene19Controller';
export { Scene20Controller } from './Scene20Controller';
export { Scene21Controller } from './Scene21Controller';
export { Scene22Controller } from './Scene22Controller';
export { Scene23Controller } from './Scene23Controller';

// 场景控制器基类 + 行为表
export { SceneController } from './SceneController';
export { SCENE_TABLE, getSceneEntry } from './SceneTable';
export type { SceneEntry } from './SceneTable';

// 片头序列（附加场景 sceneId=100，boot 后进、播完切 Scene0）
export { OpeningSceneController, OPENING_SCENE_ID } from './OpeningSceneController';

// 主菜单 title（附加场景 sceneId=200，ROM 主菜单；由 OpeningScene START 触发）
export { TitleMenuSceneController, TITLE_MENU_SCENE_ID } from './TitleMenuSceneController';

// 第一关 meeting 页面（附加场景 sceneId=300，Scene14-23 chain 链路终点）
export { MeetingSceneController, MEETING_SCENE_ID } from './MeetingSceneController';

// Meeting 完后进入主比赛（附加场景 sceneId=400，链路 continue 终点）
export { MatchStartSceneController, MATCH_START_SCENE_ID } from './MatchStartSceneController';
