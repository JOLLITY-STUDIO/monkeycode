// OAM 精灵定义 [{ tile, palette, x, y, flipH, flipV, bank }]
// 由各 Bank 在业务逻辑中写入，渲染器逐帧消费
export interface SpriteDef {
  tile: number;
  palette: number;
  x: number;
  y: number;
  flipH: boolean;
  flipV: boolean;
  bank: number;
}
export const oamTable: SpriteDef[] = [];
