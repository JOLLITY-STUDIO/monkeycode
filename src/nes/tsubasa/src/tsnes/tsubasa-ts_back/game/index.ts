/**
 * game 層統一匯出
 *
 * 子模組：
 *   - unit/    場上實體（球員、球、背景）
 *   - match/   比賽邏輯（場地、比分、規則）
 *   - scene/   場景實現（Manager + 各場景）
 */
export * from './unit';
export * from './match/stage';
export * from './match/field';
export * from './match/status';
export * from './match/referee';
export * from './team';
export * from './progress';
export * from './script';
export { SceneManager, getSceneManager, resetSceneManager } from './scene/scene';
export { Scene, SceneState, NO_INPUT } from './scene/base';
export type { SceneId, JoypadInput } from './scene/base';
export { TecmoScene } from './scene/tecmo';
export { TitleScene } from './scene/title';
export { DialogScene, DIALOG_SCENES } from './scene/dialog';
export { MatchScene } from './scene/match_scene';
