/**
 * 微信小程序 wx API Mock — 浏览器环境兼容层
 *
 * 让 tsubasa2-h5-src 在普通浏览器中运行。
 * 仅 mock 游戏运行必需的 API：
 *   - canvas.requestAnimationFrame / cancelAnimationFrame
 *   - wx.createSelectorQuery (返回 canvas 节点)
 *   - wx.createWebAudioContext → 标准 AudioContext
 */
declare function installWxMock(targetCanvas: HTMLCanvasElement): void;
export { installWxMock };
