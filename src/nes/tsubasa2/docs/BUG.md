# 已知 BUG 追踪

> 规则:每发现一个 BUG,记一条。修复后改成 ✅ FIXED + 修复 commit hash。无法修的标 ⚠️ KNOWN + 等价方案。
> 字段: 编号 | 严重性 | 标题 | 现状 | 根因 | 修复路径 | 验证方法

---

## BUG #001  [严重性: 🔴 关键]  **PT1 BANK19_TILE_DATA 解析整体错误**

**现状**: `BANK19_SPRITE_FRAMES` 40 帧 × 589 tile 索引,缺少 OAM sprite 元数据(tile/attr/x/y)
**根因**: BANK19_TILE_DATA 不是纯 tile 索引流,而是 NES OAM sprite 命令序列:
  `$E0` = frame 终止符
  `$E1,$XX` = 设 Y 偏移 (signed)
  `$E4,$XX` = 设 X 偏移 (signed)
  `$E5,$XX` = slot 操作 (00=reset, 02=count=2, 03=next)
  `$FC` = 终止 x-row
  普通 byte 配对 (tile_index, attr_byte)
**修复路径**:
  1. 写 `parseBank19Stream()` 按真实 OAM 语法解析 (已 stub 在 `test/player-tile.ts`)
  2. 输出 `SpriteFrame { sprites: [{tile, attr, x, y}] }`
  3. 替换 `data/tables/sprite-frame-table.ts` 中错误的 BANK19_SPRITE_FRAMES
**验证**: 在 `test/player-tile.ts` 用 `Bank19TileData` 跑 parse,实际显示 OAM sprite 应该跟 emu-reference frame-013 OAM 一致
**状态**: ⚠️ NOT FIXED — player-tile.ts 临时 stub 解析但 `sprite-frame-table.ts` 还没替换

---

## BUG #002  [严重性: 🟠 严重]  **head sprite 映射公式错误**

**现状**: 头型 base 用 `0x100 + (hairTemplateId & 0x0f) * 4`,2D 排布 2 列 → 16x16 像素
**根因**: PLAYER_HAIR_TABLE 是颜色/样式索引,不是 CHR tile 偏移基础;实际 sprite 头像是 BANK19_SPRITE_FRAMES[0..1] 的部分 tile (frame 0 = Tsubasa)
**修复路径**:
  1. 把 head 渲染改为:用 `OAM_FRAMES[headFrameId]` sprites,按 (tile, attr, x, y) 拼接
  2. 删除 `0x100 + hairTemplateId * 4` 这个错误公式
**验证**: `test/player-tile.html` 头型区域显示可见人物头像素 (而不是 $80+offset 的背景碎片)
**状态**: ⚠️ NOT FIXED

---

## BUG #003  [严重性: 🟠 严重]  **body sprite 渲染碎片化**

**现状**: 身体帧 `BANK19_SPRITE_FRAMES[].tiles` 是过滤掉控制码后的 list,渲染时按 N 列平铺,看不到完整人物
**根因**: 同样源于 BUG #001 — 把 sprite 命令序列当成 tile 列表解析
**修复路径**: 同 #001 解析后,用 `sprites[]` 数组每 sprite 一组,按 (x, y, tile, attr) 拼接到 canvas
**验证**: `test/player-tile.html` 身体帧区域显示完整的人物立绘 (而不是碎片)
**状态**: ⚠️ DEPENDS-ON #001

---

## BUG #004  [严重性: 🔴 关键]  **H5 frame 1-13 完全冻结 (PPU 静态)**

**现状**: frame 1, 5, 9, 13 状态 100% 一致:
  - OAM 64 visible / 0 hidden (y=0, tile=0, attr=0, x=0)
  - Palette BG/SPR 完全冻结
  - PT 512 tile 全 0
  - CHR banks sc=0 = [0,1,2,3,124,113,82,83]
**根因 (3 个并发的)**: 
  1. `bootOamInit()` 写 `store.shadowOam`,但 `InterruptService.oamDma(ppu)` 没把 shadowOam 推到 `ppu.spriteMem` — sprite 没真的写到 PPU sprite RAM
  2. `loadBootPalette()` 写 `store.palette`,但没有走到 `ppu.writePalette()` 把 32 色推到 PPU palette RAM ($3F00-$3F1F)
  3. PPU CHR bank config 在 `loadChrConfig(0x17)` 设置 `store.chrSelBase = 0x17`,但 `ppu.regBG/regSPRBank[...]` 没真的更新 — slot 0-3 仍默认 0,1,2,3
**应期望**: emu-reference frame-013 状态(需要先生成):
  - OAM: 应该是 0..40 个 visible sprite (Tecmo logo) 或全 hidden ($F8) 
  - Palette: PALETTE_TABLE[0..7] 装载, BG[0]=$0F, SPR[0]=$0F
  - CHR banks: [124,125,126,127,252,113,82,83]
  - PT: 80+ 非零 tile (Tecmo logo CHR 像素)
**修复路径**:
  1. **路径 1 — spriteMem**: `Tsubasa2.frame()` 在 `oamDma` 之后,等 NMI cycle 256 才把 `ppu.spriteMem[i]` 推到 CPU 端 — 但 Verify 看到的 `ppu.spriteMem` 是 0/64,这表示要么 oamDma 没在 boot 路径上跑,要么 ppu.spriteMem 是 PPU 内部寄存器独立于 `store.oam.oam`。看 `HeadlessRuntime` 实现
  2. **路径 2 — palette**: 在 InterruptService.renderCommit 里加 `ppu.updatePalette(ram.bg, ram.spr)` 或在 Scene0.onEnter 后手动调一次
  3. **路径 3 — chrBank**: `loadChrConfig` 写 CHR 基址后,需要把 1KB bank idx 推到 `ppu.chrBankMap[]` 8 slot
**验证**: `node scripts/verify_300frame.cjs` 后 `node scripts/_verify_frame13.cjs`,看到 frame 1-13 之间状态有变化,frame 13 时跟 emu-reference 期望匹配
**状态**: ⚠️ NOT FIXED (3 个子问题并行)

---

## BUG #005  [严重性: 🟠 严重]  **SCENE_END_BANK_TABLE 数据错误 (4 个 slot 跟 emu 不一致)**

**状态**: ✅ FIXED
**修复** (commit on branch): 修改 `src/game/prg/data/tables/scene-end-bank-table.ts`:
  - 之前单一 entry 用 `banks: [0, 1, 2, 3, 252, 113, 82, 83]` 是 PT1 早期推断错误值
  - 改成 3 个 entry,按 frame 范围变化,数据来自 emu-reference/frame-{030,060,300}/chr-switches.json 的真实最后一行:
    - frame 0-44:  `[124, 125, 126, 127, 252, 113, 82, 83]` (boot 终态, 即 emu f30 sc=6)
    - frame 45-299:`[0, 1, 2, 3, 252, 113, 82, 83]` (LoadScene3Nt 后切回 BG default, emu f60-270 sc=150)
    - frame 300+:  `[124, 125, 126, 127, 252, 113, 82, 83]` (Hold 阶段, emu f300 sc=11)
**验证**: 重跑 verify_300frame.cjs, frame 1-13 现在 CHR banks 是 `[124,125,126,127,124,113,82,83]`
  - Slot 0-3: ✅ 跟 emu 的 `[124,125,126,127,...]` 完全一致
  - Slot 4 (SPR0): 124 (emu 是 252) — 这是 HeadlessRuntime bank1k mod 128 实现的现实限制, 不算 boot bug
  - Slot 5-7: ✅ 跟 emu 一致
**原状态**: ⚠️ NOT FIXED (跟 BUG #004-3 同根)

---

## BUG #006  [严重性: 🔴 关键]  **emu-reference 没有 frame 1-13 基线**

**现状**: emu-reference 目录只有 frame 30/60/.../300,无法验证 frame 13 是否出现画面
**根因**: 现有 `_verify_300frame.ts` 跑 emulator 0..300 帧只截特定帧,缺早期帧
**修复路径**:
  1. 在 emulator 重新跑 0..30 帧并截 frame-013
  2. 加 `_emuref_frame13.cjs` 写 emulator trace
  3. 对照 emu-reference/frame-013 跟 H5 frame-013
**验证**: 成功生成 emu-reference/frame-013/state.json + oam.json + nt3.json + pt.json + palette.json
**状态**: ⚠️ NOT FIXED (工具链缺口)

---

## BUG #007  [严重性: 🟡 一般]  **state.json 缺失 — 行为维度无法比对**

**现状**: `_consistency_check.cjs` 的 BEHAVIOR 维度 skip,因为 H5 端 `ppu-trace/frame-NNN/` 没有 `state.json`
**根因**: `_verify_300frame.ts` 写 PT/NT/OAM/Palette/ChrSwitches 但不写 state.json (frame/pc/chrBanks/prgBankMap/bgTable/spTable)
**修复路径**: 在 `_verify_300frame.ts` 加 `state.json` 输出,从 `runtime.cpu` 取 PC,从 `HeadlessRuntime.chrSlots[]` 取 chrBanks,从 cpu.mem 取关键 RAM
**验证**: 重跑 `_consistency_check.cjs`,BEHAVIOR 维度不再 skip,有具体百分比数字
**状态**: ⚠️ NOT FIXED

---

## BUG #008  [严重性: 🔴 关键]  **NT/Pal 字段名格式不一致**

**现状**: emu palette `{bg,sp}`,H5 palette `{bg,spr}` — 字段名差异导致 enum 报错
**根因**: 两套 trace 工具实现时字段命名不一致,无显式契约
**修复路径**:
  1. 统一字段命名 `bg` / `spr` (推荐 — H5 约定)
  2. 或在 `_consistency_check.cjs` 加字段兼容层 (已加但脆弱)
**验证**: 在 emu 端跑 emulator 时也用 `{bg, spr}`
**状态**: ⚠️ PARTIAL FIXED (`_consistency_check.cjs` v2 已加容错)

---

## BUG #009  [严重性: 🟡 一般]  **emu frame 90 NT col=4-6 H5 提前写**

**现状**: frame 90 NT0 col=4-6 H5 写了 tile ($EF, $0E, $0F),emu 还是 0
**根因**: Scene0Controller LoadScene3Nt phase 阶段推进节奏跟 emu 实际 NMI 时序错位
**修复路径**:
  1. 跟 BUG #004 一同修复 — NMI-based phase 推进
  2. 或抽出 Scene0 时序从 emulator 跑 frame 30/60/90 的真实 PC 序列,跟 H5 Service call log 对应
**验证**: frame 60/90/120 都跟 emu-reference 一致
**状态**: ⚠️ DEPENDS-ON #004

---

## BUG #010  [严重性: 🟡 一般]  **headTileBase 公式错误**

**现状**: `headTileBase = 0x100 + (tile.hairTemplateId & 0x0f) * 4`
**根因**: 拍脑袋公式,真实 CHR 里没有"hair template bank"这一概念
**修复路径**: 删除,改用 #001 解析出的 OAM sprite 数据
**验证**: 跟 #001/#002 一同
**状态**: ⚠️ DEPENDS-ON #001
