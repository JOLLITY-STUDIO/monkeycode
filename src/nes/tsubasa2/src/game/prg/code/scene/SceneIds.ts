/**
 * SceneIds — 场景 ID 常量集中定义
 *
 * 目的：
 *   1. 打破循环依赖：OpeningSceneController ↔ TitleMenuSceneController ↔ BootRouter
 *      （原 OPENING_SCENE_ID 定义在 OpeningSceneController、TITLE_MENU_SCENE_ID 定义在
 *        TitleMenuSceneController、SceneId enum 定义在 BootRouter，三处互相 import 成环）
 *   2. 消除 `const enum` 跨模块访问：esbuild / 微信小程序编译器不支持跨模块内联 const enum
 *
 * 使用规则：所有场景控制器只从本文件 import 场景 ID，不得定义本地场景号常量。
 */

/** 片头序列场景（附加场景，sceneId=100；boot 后进、播完自动切 Scene0） */
export const OPENING_SCENE_ID = 100;
/** 标题菜单场景（附加场景，sceneId=200；ROM 主菜单，由 OpeningScene START 触发） */
export const TITLE_MENU_SCENE_ID = 200;
/** 第一关 meeting 页面（附加场景，sceneId=0x300；Scene14-23 chain 链路终点） */
export const MEETING_SCENE_ID = 0x300;
/** Meeting 完后进入主比赛（附加场景，sceneId=0x400；链路 continue 终点） */
export const MATCH_START_SCENE_ID = 0x400;

/** TitleMenu 菜单项 A 键确认后的跳转目标场景 */
export const SCENE_14_ID = 14;

/**
 * 场景号枚举（0-23 + 附加场景）。
 * 原 `export const enum SceneId`（TS 编译期内联）→ 改为普通 const 对象，
 * 兼容 esbuild/微信小程序编译（运行时可访问，不再要求编译器内联）。
 */
export const SceneId = {
  Scene0: 0, Scene1: 1, Scene2: 2, Scene3: 3, Scene4: 4, Scene5: 5,
  Scene6: 6, Scene7: 7, Scene8: 8, Scene9: 9, Scene10: 10, Scene11: 11,
  Scene12: 12, Scene13: 13, Scene14: 14, Scene15: 15, Scene16: 16,
  Scene17: 17, Scene18: 18, Scene19: 19, Scene20: 20, Scene21: 21,
  Scene22: 22, Scene23: 23,
  Opening: OPENING_SCENE_ID,
  TitleMenu: TITLE_MENU_SCENE_ID,
} as const;
