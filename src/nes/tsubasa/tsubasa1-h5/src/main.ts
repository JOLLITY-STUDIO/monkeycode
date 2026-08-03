/**
 * 向后兼容入口 - 重定向到新的平台架构
 *
 * @deprecated 请使用 src/platform/web/main.ts 或 miniprogram/pages/game/game.ts
 */
export { Tsubasa } from './core/Tsubasa';
export { WebPlatform } from './platform/web/WebPlatform';
export { MpPlatform } from './platform/miniprogram/MpPlatform';
export { Button, GameInput } from './core/types';
