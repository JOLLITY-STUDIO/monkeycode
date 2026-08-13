// 画布尺寸工具（兼容小程序：无 window 时从 wx 取 pixelRatio）
export function canvasSize(ctx: CanvasRenderingContext2D): { w: number; h: number } {
  const canvas = (ctx as any).canvas;
  let dpr = 1;
  try {
    dpr = (window as any).devicePixelRatio || 1;
  } catch (e) {
    try {
      const wxAny = (wx as any);
      dpr = (wxAny.getWindowInfo ? wxAny.getWindowInfo() : wxAny.getSystemInfoSync()).pixelRatio || 1;
    } catch (e2) {
      dpr = 1;
    }
  }
  return { w: canvas.width / dpr, h: canvas.height / dpr };
}
