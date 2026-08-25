# WBS — frame 1-13 一致性修复

> 范围: 把 H5 帧 1, 5, 9, 13 的 PT / OAM / Palette / NT / CHR slots 与 emulator (tsnes) 完全对齐.
> 前置条件: BUG #005 SCENE_END_BANK_TABLE 已修, frame 1-13 slot 0-3 现在 = `[124,125,126,127,124,113,82,83]`.

| ID | 严重性 | 标题 | 父 BUG | 状态 |
|----|--------|------|--------|------|
| F1 | 🔴 | emu-reference/frame-013 基线 (跑 ROM 13 帧并 dump) | #006 | ⬜ |
| F2 | 🔴 | _verify_300frame.ts 写 state.json (PC/chrBanks/prgBankMap/bgTable/spTable) | #007 | ⬜ |
| F3 | 🟠 | emu & H5 NT/Pal 字段名统一 (`bg`/`spr`) | #008 | ⬜ |
| F4 | 🔴 | OAM DMA: boot 阶段强制 64 sprite hidden (=y=0) + Tecmo logo sprite 数据先存 | #004-1 | ⬜ |
| F5 | 🔴 | Palette boot 装载: `store.palette.bg/spr` 即时推 PPU `$3F00/$3F10` | #004-2 | ⬜ |
| F6 | 🟠 | CHR banks boot 时推 ppu.ptTile (slot 0-3 立即为 124-127, slot 4 = 124/252) | #004-3 | ⬜ |
| F7 | 🔴 | BANK19 sprite 帧流解析 → SpriteFrame[40] | #001 | ⬜ |
| F8 | 🟠 | 删除 headTileBase 公式 + SpriteService 用 BANK19 SpriteFrame | #002 / #010 | ⬜ |
| F9 | 🟠 | PlayerTileService 用 SpriteFrame 重写 body 拼接 | #003 | ⬜ |
| F10 | 🟠 | 跑验证: _verify_300frame + _verify_frame13 + _consistency_check | ALL | ⬜ |
| F11 | 🟠 | git commit + push | ALL | ⬜ |

---

## F1 — emu-reference frame-013 基线

**目标**：`output/emu-reference/frame-013/` 含 pt/nt[0..3]/oam/palette/chr-switches/state。

**工具**: `debug/_emu_ref13.ts` 已写, 但未跑过.

**步骤**:
1. `npx esbuild debug/_emu_ref13.ts --bundle --platform=node --outfile=debug/_emu_ref13_bundle.cjs`
2. `node debug/_emu_ref13_bundle.cjs` → 写 `debug/_emu_ref13.json`
3. 拆 4 frame 写到 `output/emu-reference/frame-{001,005,009,013}/state.json` (从 json 拆)

**验收**: `output/emu-reference/frame-013/state.json` 与 `output/ppu-trace/frame-013/state.json` 可一比一对比。

---

## F2 — `_verify_300frame.ts` 写 state.json

**现状**: 现有 output/ppu-trace/frame-NNN/ 缺 state.json (`pc`, `chrBanks[8]`, `prgBankMap`, `bgTable`, `spTable`, `ram_001B`, `ram_0628`, `sceneId`).

**修复**:
```ts
function dumpState(frame: number) {
  const nes = (runtime as any).nes;          // nes 含 mmap/ppu/cpu
  const state = {
    frame,
    pc: nes?.cpu?.REG_PC ?? nes?.cpu?.pc ?? 0,
    chrSlots: [...runtime.chrSlots],
    ram_001B: store.readByte(0x001B),
    ram_0628: store.readByte(0x0628),
    sceneId: store.scene.currentSceneId,
  };
  fs.writeFileSync(path.join(outDir, 'state.json'), JSON.stringify(state, null, 1));
}
```
在每个 FRAMES_LIST 帧 dump 之前调.

**验收**: `output/ppu-trace/frame-013/state.json` 存在, chrSlots = `[124,125,126,127,124,113,82,83]`.

---

## F3 — emu & H5 NT/Pal 字段名统一

**现状**: emu palette `{bg, sp}`, H5 palette `{bg, spr}` — 一致性检查报错.

**修复**: 在 `debug/_emu_ref13.ts` 写盘前把字段 `sp` → `spr`.

**验收**: `_consistency_check.cjs` 不再有 `p.sp undefined`.

---

## F4 — OAM DMA 通路 (boot 时)

**根因**: `bootOamInit()` 写 `store.oam.oam` 但 `oamDma()` 仅在 `renderCommit` 路径, 而 frame 1-13 期间 `renderCommit` 未跑完一整 cycle → PPU 的 spriteMem 仍为 0.

**修复 (H5)**:
```ts
// src/game/index.ts → boot()
this.sprite.bootOamInit();
// NEW: 直接把 shadow OAM → ppu.spriteMem (写入 4 byte × 64 sprite)
const oam = this.store.oam.oam;
const sm = (runtime.ppu as any).spriteMem;
for (let i = 0; i < 0x100; i++) sm[i] = oam[i];
```
或在 `Tsubasa2.boot()` 末尾注入一个 `primeOamToPpu(runtime)` 工具.

---

## F5 — Palette boot 装载

**根因**: `loadBootPalette()` 写 `store.palette.bg/spr`, 但 `InterruptService.flushPalette()` 只在 `renderCommit` step 8 → frame 1-13 时序错.

**修复**: `boot()` 末尾调 `interrupts.flushPalette(target.ppu)`.

或更直接: `HardwareInitService.reset()` 末尾直接写 PPU palette 寄存器的 32 byte:
```ts
const ppuRegs = (runtime.ppu as any).vramMem ?? null;
if (ppuRegs) {
  for (let i = 0; i < 0x10; i++) ppuRegs[0x3f00 + i] = bg[i];
  for (let i = 0; i < 0x10; i++) ppuRegs[0x3f10 + i] = spr[i];
}
```
+ `store.ppuState.paletteBg/paletteSpr` 字段同步.

---

## F6 — CHR banks boot 推 ppu.ptTile

**根因**: BUG #005 修了 `SCENE_END_BANK_TABLE`, 但 `HeadlessRuntime.loadChrSlot` 只在 `runtime.frame()` 期间被 `applyChrRequest` 触发. Boot 期 `Tsubasa2.boot()` 未触发任何 CHR 装载 → first `frame()` 之前, ppu.ptTile 都是 0.

**修复**: 在 `HeadlessRuntime` 构造器或 `Tsubasa2.boot()` 末尾直接跑一次 `loadChrSlotsByFrame(0)`:
```ts
// src/game/runtime/HeadlessRuntime.ts → bootInitialChrBanks()
for (let i = 0; i < 8; i++) this.loadChrSlot(i, SCENE_END_BANK_TABLE[0].banks[i]);
```

---

## F7 — BANK19 sprite 帧流解析

**目标**: `scripts/_parse_bank19_sprite.cjs` → `data/tables/sprite-frame-table.ts` 落地.

**真实数据 (来自 `_emu_ref13.ts`)**:
- `$E0` = frame/row 终止符
- `$E5, $XX` = OAM slot 操作 (`00=reset, 02=count, 03=next`)
- `$E4, $XX` = 设 X 偏移 (signed)
- `$E1, $XX` = 设 Y 偏移 (signed)
- `$FC` = end of x-row
- 普通 byte 配对 (tile_index, attr)
- 产出: `BANK19_SPRITE_FRAMES: SpriteFrame[] = { sprites: [{tile, attr, x, y}, ...] }[]`

**步骤**:
1. 写 `scripts/_parse_bank19_sprite.cjs` (解析已有字节)
2. 输出 `src/game/prg/data/tables/sprite-frame-table.ts` 替换 BANK19_SPRITE_FRAMES
3. 验证 player-tile.ts 渲染 (用 SpriteFrame 替代 raw tile list)

---

## F8 / F9 — SpriteService 收口

**F8**:
- 删除 `headTileBase = 0x100 + (hairTemplateId & 0x0f) * 4` (BUG #002 / #010)
- `SpriteService.putSpriteByFrame(playerId, frameId)` 用 BANK19 SpriteFrame 拼 OAM

**F9**:
- PlayerTileService 暴露 `getPlayerSpriteFrame(playerId, frameId)` 4 段 (head/body-left/arm/leg)
- 渲染用 vromTilesByBank1k + sprite frame metadata

---

## F10 — 全链路验证

跑:
```bash
node scripts/_verify_300frame_bundle.cjs    # H5 dump
node debug/_emu_ref13_bundle.cjs           # emu dump
node scripts/_consistency_check.cjs        # 对比
```

**期望 (frame 1)**:
- chrSlots: `[124,125,126,127,124,113,82,83]` ✓ (跟 emu 符合, #005 已修)
- OAM visible: 0..22 sprite (跟 emu 同样 23 sprite)
- Palette: BG[0]=$0F, SPR[0]=$0F (或 #005 后 stage 阶段值)
- PT: 100+ non-zero tile (Tecmo logo tile 数据)
- NT0..NT3: 0/0/0/0 (frame 1 早期, NT 后续阶段填)

---

## F11 — git commit + push

`git add . && git commit -m "..." && git push`
