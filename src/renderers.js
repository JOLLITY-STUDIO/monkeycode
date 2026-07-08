/**
 * Canvas 渲染工具 —— 将捕获数据绘制到页面的 Canvas 上
 */

/**
 * 将 Uint32Array buffer 绘制到 Canvas
 */
export function drawBufferToCanvas(canvas, buf, w, h) {
  if (!canvas || !buf) return;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;
  for (let i = 0; i < w * h; i++) {
    const val = buf[i];
    data[i * 4] = (val >> 16) & 0xFF;
    data[i * 4 + 1] = (val >> 8) & 0xFF;
    data[i * 4 + 2] = val & 0xFF;
    data[i * 4 + 3] = 0xFF;
  }
  ctx.putImageData(imgData, 0, 0);
}

/**
 * 绘制小色块（调色板显示用）
 */
export function drawColorSwatch(canvas, color, size) {
  if (!canvas) return;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `rgb(${(color>>16)&0xFF},${(color>>8)&0xFF},${color&0xFF})`;
  ctx.fillRect(0, 0, size, size);
}

/**
 * 渲染 Pattern Table 到 Canvas
 */
export function renderPatternTable(canvas, buf) {
  if (!canvas || !buf) return;
  drawBufferToCanvas(canvas, buf, 128, 128);
}

/**
 * 渲染 Nametable 到 Canvas
 */
export function renderNametable(canvas, buf) {
  if (!canvas || !buf) return;
  drawBufferToCanvas(canvas, buf, 256, 240);
}

/**
 * 渲染精灵可视化到 Canvas
 */
export function renderSpriteViz(canvas, buf) {
  if (!canvas || !buf) return;
  drawBufferToCanvas(canvas, buf, 256, 240);
}
