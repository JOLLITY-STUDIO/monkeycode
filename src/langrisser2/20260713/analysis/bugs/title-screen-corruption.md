# Bug #001: 标题画面花屏 (Title Screen Corruption)

**状态**: ✅ FIXED (2026-07-17)
**严重性**: Blocker — 进入游戏后标题画面完全不可辨认
**影响范围**: 所有正常流程 (标题画面显示)

---

## 现象

进入游戏后标题画面显示花屏/乱码，tile 索引错乱，颜色失真。

## 根因分析

### Cause #1: `Vram.readWordLE()` 字节序错误

**文件**: `game/vdp/Vram.ts:138-143`

```ts
// ❌ Bug: 函数声称"小端序"但实现与大端序 readWord() 完全相同
readWordLE(vramAddr: number): number {
    const a = vramAddr & 0xFFFF;
    const hi = this.data[a];      // 高位字节
    const lo = this.data[a + 1];  // 低位字节
    return (hi << 8) | lo;         // 实际是 (高字节<<8)|低字节 = 大端序!
}
```

**背景**: 标题画面 nametable 数据 (`TITLE_NAMETABLE_A/B`) 来自 game-old 预提取，存储为 `[lo, hi]` 小端字节对。例如第一个 entry 字节 `[4, 16]` 代表 Genesis word `0x1004`（tile index=4, palette=0）。

VRAM 通过 `writeBytes()` 原样写入：`VRAM[C000]=4, VRAM[C001]=16`。

**后果**: `readWordLE` 返回 `(4<<8)|16 = 0x0410` → tile index=16，而非正确的 4。所有 nametable entry 的 tile 索引全部错误 → 花屏。

**修复**: 交换字节读取顺序，改为真正的小端序：
```ts
const lo = this.data[a];      // 低地址 = 低字节 (小端序)
const hi = this.data[a + 1];  // 高地址 = 高字节
return (hi << 8) | lo;         // (高字节<<8)|低字节
```
由于变量 `lo`/`hi` 的值已经变更 (lo=原hi的值, hi=原lo的值)，计算公式 `(hi<<8)|lo` 结果仍正确。

---

### Cause #2: `Cram.toRGBA()` 颜色格式与 game-old 数据不一致

**文件**: `game/vdp/Cram.ts:93-119`

```ts
// ❌ Bug: 错误按标准 Genesis 格式提取, 但 TITLE_CRAM 实际是 game-old 格式
const r = genesisColor & 0x07;          // 标准格式: R 在 bit 0-2
const g = (genesisColor >> 4) & 0x07;   // 标准格式: G 在 bit 4-6
const b = (genesisColor >> 8) & 0x07;   // 标准格式: B 在 bit 8-10
```

**背景**: 标题画面 CRAM 数据 (`TITLE_CRAM`) 来自 game-old 预提取，其 16-bit word 格式为 `(byte1<<8)|byte0`:
```
  byte0 = B2 B1 B0 G2 G1 G0 R2 R1
  byte1 = R0 + 7位填充 (bit7 为 R2 的高位)
```
因此：
```
  R = (word & 0x03) | ((word >> 13) & 0x04)
  G = (word >> 2) & 0x07
  B = (word >> 5) & 0x07
```

**后果**: 标题画面颜色被错误解析。例如 game-old 红色 `0x8003` 被解析为 R=3, G=1, B=0，而非纯红。

**修复**:
```ts
const r = ((genesisColor & 0x03) | ((genesisColor >> 13) & 0x04)) & 0x07;
const g = (genesisColor >> 2) & 0x07;
const b = (genesisColor >> 5) & 0x07;
```

同步将 CRAM mask 从 `0x0EEE`（标准 Genesis 格式）改为 `0x80FF`（保留 game-old 的 byte0 全部 8 位 + byte1 的 bit7）。

---

### Cause #3: `VdpChip.planeBAddr` 地址乘数错误

**文件**: `game/vdp/VdpChip.ts:263-264`

```ts
// ❌ Bug: Plane B 使用与 Plane A 相同的 *0x400 公式
get planeBAddr(): number {
    return this.reg[0x04] * 0x400;  // 0x07*0x400 = 0x1C00
}
```

**背景**: Genesis VDP 规格中，Plane B nametable 基地址使用 `reg * 0x2000`（而非 Plane A 的 `reg * 0x400`）。reg $04=0x07 → 正确地址为 `0x07 * 0x2000 = 0xE000`。

**后果**: 当前因 `_initPlaneBNametable` 也写 0x1C00，读写地址一致，渲染未直接出错。但与 Genesis 硬件不符，且 `VDP_VRAM_LAYOUT.PLANE_B_TABLE` 已正确定义为 0xE000。

**修复**:
```ts
get planeBAddr(): number {
    return this.reg[0x04] * 0x2000;  // 0xE000
}
```
同步修改 `_initPlaneBNametable()` 从 `this.vdp.reg[0x04] * 0x2000` 计算写入地址。

---

### Cause #4: `Cram.getRGBA()` 背景色索引错误 (黑屏)

**文件**: `game/vdp/Cram.ts:112-122`

```ts
// ❌ Bug: colorIndex 0 错误使用 CRAM 端口地址指针 + 只取部分位
getRGBA(palette: number, colorIndex: number): RGBA {
  if (colorIndex === 0) {
    const bg = this.colors[this._address & 0x3F]; // 实际应由 VDP reg $07 指定
    const bgr = (bg >> 0) & 0x0E;               // 只取 R 的 bit 1-3!
    return Cram.toRGBA(bgr);                     // 几乎总是黑色
  }
  ...
}
```

**背景**: Genesis VDP 中 colorIndex 0 对 sprites 是透明，对 Plane BG 则显示由 VDP reg $07 指定的背景色。`this._address` 是 CRAM 端口当前访问地址，与背景色无关。

**后果**: 标题画面 tile 中绝大多数像素是 colorIndex 0，被错误渲染为黑色，导致整个标题画面黑屏（即使资源、nametable、调色板都正确）。

**修复**:
1. `Cram` 增加 `backgroundColorIndex` 属性
2. `VdpChip.writeRegister(0x07, value)` 调用 `cram.setBackgroundColorIndex(value)`
3. `Cram.getRGBA()` 中 colorIndex 0 返回 `Cram.toRGBA(colors[backgroundColorIndex])`

---

### Cause #5: `Plane.renderPlane()` 按屏幕行遍历，tile 被重复覆盖到错误 Y 位置

**文件**: `game/vdp/Plane.ts:105-159`

```ts
// ❌ Bug: 按屏幕行遍历，每个 tile 被画到 line & ~7 的位置
for (let line = 0; line < lines; line++) {
  for (let col = 0; col < 40; col++) {
    ...
    this.decoder.decodeToImageData(
      tileData, cram, entry.palette, false,
      dst, screenX, line & ~7, // 整行 tile 都写到 8 像素对齐的 Y
      entry.hFlip, entry.vFlip,
    );
  }
}
```

**背景**: Genesis Plane 由 8×8 tile 组成，正确做法是一次性解码整个 tile 并写到对应的屏幕坐标 `(col*8, row*8)`。按行遍历会把 tile 的第 0-7 行重复写到同一个 `line & ~7` 位置，导致后画的 tile 行覆盖先画的，最终整屏只剩背景色。

**后果**: 标题画面只显示背景色（深蓝色），看不到任何 logo/文字 tile。

**修复**: 改为按 tile 坐标遍历（类似 game-old `hw/vdp/plane.ts`）：
```ts
for (let ty = 0; ty < tilesPerCol; ty++) {
  for (let tx = 0; tx < tilesPerRow; tx++) {
    const ntX = (startTileX + tx) % planeWidth;
    const ntY = (startTileY + ty) % planeHeight;
    const word = vram.readWordLE(nametableBase + (ntY * planeWidth + ntX) * 2);
    const entry = Plane.parseEntry(word);
    this.decoder.decodeToImageData(
      vram.readTileData(entry.tileIdx * 32), cram, entry.palette, false,
      dst, tx * 8 - startPixelX, ty * 8 - startPixelY,
      entry.hFlip, entry.vFlip,
    );
  }
}
```

同步修正 `VdpChip` 中 plane size 解析：`reg $10` bits 0-1 是水平尺寸（planeWidth），bits 4-5 是垂直尺寸（planeHeight），而不是 planeA/planeB 分别的尺寸。

---

## 关联修复

### CRAM 数据加载字节序

**文件**: `game/rom/RomTaskSystem.ts:_loadTitleCram()`

`TITLE_CRAM` 数据同样是 `[lo, hi]` 小端字节对。加载代码变量命名修正从 `hi=TITLE_CRAM[i*2], lo=TITLE_CRAM[i*2+1]` 改为 `lo=TITLE_CRAM[i*2], hi=...`，计算公式 `(hi<<8)|lo` 不变。

---

## 验证方法

1. **单元测试**: `test/title-vram-decode.test.ts` 验证 `readWordLE`、`toRGBA`、`getRGBA` 背景色正确性
2. **手动验证**: 启动游戏 → 观察标题画面显示正常 (Langrisser II logo, 背景文字, 颜色正确)
3. **日志验证**: 控制台确认 `[TaskSystem] 标题画面初始化完成 → 进入 TITLE_LOOP` 且渲染输出非全黑

---

## 修复文件清单

| 文件 | 变更 |
|---|---|
| `game/vdp/Vram.ts:138-143` | `readWordLE()` 字节序修正 |
| `game/vdp/Cram.ts:49-67` | CRAM mask `0x0EEE`→`0x80FF` (匹配 game-old 格式) |
| `game/vdp/Cram.ts:93-119` | `toRGBA()` 改为 game-old 9-bit 格式提取 |
| `game/vdp/Cram.ts:121-135` | 新增 `backgroundColorIndex`；修正 `getRGBA()` colorIndex 0 处理 |
| `game/vdp/VdpChip.ts:137-142` | `writeRegister()` 写 $07 时同步 CRAM 背景色索引 |
| `game/vdp/VdpChip.ts:246-266` | 修正 plane size 解析: `planeWidth`/`planeHeight` (reg $10 共享) |
| `game/vdp/VdpChip.ts:273-281` | `planeBAddr` 乘数 0x400→0x2000 |
| `game/vdp/Plane.ts:67-162` | 重写 `renderPlane()` 为按 tile 遍历，修复 tile 被错误覆盖 |
| `game/rom/RomTaskSystem.ts:1054-1063` | `_loadTitleCram()` 字节序修正；mask `0x0EEE`→`0x80FF` |
| `game/rom/RomTaskSystem.ts:1083-1089` | `_initPlaneBNametable()` 地址修正 |
| `game/rom/RomTaskSystem.ts:1031` | `_transl_C7F6()` 注释修正 |
