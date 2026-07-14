/**
 * Genesis VDP 完整帧渲染器
 *
 * 渲染顺序 (从底层到顶层):
 *   1. 背景色 (R7)
 *   2. Plane B (低优先级 tile)
 *   3. Sprite (低优先级精灵)
 *   4. Plane A (低优先级 tile)
 *   5. Plane B (高优先级 tile)
 *   6. Sprite (高优先级精灵)
 *   7. Plane A (高优先级 tile)
 *
 * 实际优先级规则 (Genesis VDP):
 *   低 → 高: PlaneB(low) → Sprite(low) → PlaneA(low) → PlaneB(high) → Sprite(high) → PlaneA(high)
 *
 * 简化版本: 先画所有低优先级, 再画所有高优先级
 *   低优先级层: Plane B → Sprite → Plane A
 *   高优先级层: Plane B → Sprite → Plane A
 *
 * @see execution-trace.md "第一部分附录: VDP 硬件结构与初始配置"
 */

import { VDP, cramToRGB } from './vdp.js';
import { renderPlane } from './plane.js';
import { renderSprites } from './sprite.js';

/**
 * 渲染完整一帧到输出缓冲
 *
 * @param vdp VDP 实例
 * @param output 输出像素缓冲 (RGBA, width*height*4)
 * @param scrollAX Plane A 水平滚动
 * @param scrollAY Plane A 垂直滚动
 * @param scrollBX Plane B 水平滚动
 * @param scrollBY Plane B 垂直滚动
 */
export function renderFrame(
  vdp: VDP,
  output: Uint8Array,
  scrollAX: number = 0,
  scrollAY: number = 0,
  scrollBX: number = 0,
  scrollBY: number = 0
): void {
  const width = vdp.width;
  const height = vdp.height;

  // 1. 背景色填充
  fillBackgroundColor(vdp, output, width, height);

  // 2. 低优先级 Plane B
  renderPlane(vdp, vdp.planeBBaseAddr, scrollBX, scrollBY, false, output, width, height, 0);

  // 3. 低优先级 Sprite
  renderSprites(vdp, output, width, height, 0);

  // 4. 低优先级 Plane A
  renderPlane(vdp, vdp.planeABaseAddr, scrollAX, scrollAY, true, output, width, height, 0);

  // 5. 高优先级 Plane B
  renderPlane(vdp, vdp.planeBBaseAddr, scrollBX, scrollBY, false, output, width, height, 1);

  // 6. 高优先级 Sprite
  renderSprites(vdp, output, width, height, 1);

  // 7. 高优先级 Plane A
  renderPlane(vdp, vdp.planeABaseAddr, scrollAX, scrollAY, true, output, width, height, 1);
}

/**
 * 用背景色填充输出缓冲
 *
 * 背景色来自 R7 (调色板 0 的指定索引)
 * execution-trace.md: "R7 = 0x00 背景色: 调色板0 索引0"
 */
export function fillBackgroundColor(
  vdp: VDP,
  output: Uint8Array,
  width: number,
  height: number
): void {
  const bgColorIdx = vdp.backgroundColor;
  const cramValue = vdp.readCRAM(bgColorIdx);

  const { r, g, b } = cramToRGB(cramValue);

  for (let i = 0; i < width * height; i++) {
    output[i * 4] = r;
    output[i * 4 + 1] = g;
    output[i * 4 + 2] = b;
    output[i * 4 + 3] = 255;
  }
}

/**
 * 将 RGBA 像素缓冲绘制到 Canvas 2D Context
 *
 * 方便在浏览器中查看渲染结果
 */
export function drawToCanvas(
  ctx: CanvasRenderingContext2D,
  pixels: Uint8Array,
  width: number,
  height: number
): void {
  const imgData = ctx.createImageData(width, height);
  imgData.data.set(pixels);
  ctx.putImageData(imgData, 0, 0);
}
