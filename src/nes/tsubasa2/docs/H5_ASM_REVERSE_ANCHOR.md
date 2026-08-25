# H5 → asm 反推锚点表

> 反推方向：H5 Service method / Service call log → PRG 字节 (PC + 注释)
>
> 时序：H5 frame 0-13 跟 emu 100% 对齐后（BUG #012 v1 修复 + BUG #005/#009/#011 v3 修复），
>   翻译产物的每个 Service 调用可以一对一锚定到具体 PRG $XXXX 子程序或单条指令。
>
> 数据源：`docs/roms/tecmo/13.log` (fnes log) + `docs/roms/tecmo/Captain Tsubasa II - Super Striker (Japan).nes` (ROM)。

---

## 1. Scene0 阶段 (frame 0-13)

### 1.1 Scene0Controller.onEnter() — boot 一性 init (frame 0)

| H5 Service call | PRG 字节 | 注释 |
|---|---|---|
| `loadChrConfig(0x17)` | `$A000+0x17*2=$A02E` → `:LDA (PTR),Y` × 6 | PRG bank2 配置表 PRG_OFFS+0x30 给 CHR banks |
| `loadScene0Palettes()` | `$A200+` (`OPENING_BG_PALETTES[1]` + `loadPalette(21)`) | BG 调色板组 1 + SPR palette 21 (OPENING PALETTE 21 = Tecmo logo 调色板) |
| `loadSceneData(1)` | `$A8CA` (`OPENING_SCENE_TABLE[1]` 装载器) | r79=0x40 / r7c=0x80 / r5b=1 mask enable |
| `this.store.writeByte(0x005b, 1)` | `$A8CA+9: STA $005B` | r5b = 1 (mask enable) |
| **`prim.hideOam()`** ← **BUG #012 修复** | **`$01:A8E2: 99 00 02 STA $0200,Y @ $0200 = #$F8`** | **ROM boot 标准动作：DMA 写 0xF8 × 256 字节 → 全 sprite 隐藏** |
| `audio.playBgm(0x01)` | `$C000+` (NSF BGM init, 调 PRG bank 切换 → $8000=0x80+bgm*16) | BGM 01 (Opening theme) |

**关键 asm 提取**（13.log）：
```
f9   c244960  $01:A8E2: 99 00 02  STA $0200,Y @ $0200 = #$F8     ← hideOam 锚点
```

### 1.2 Scene0Controller.InitBlack — 黑屏期 (frame 1-8)

- emu trace 显示前 8 帧 `$01:AA0B-: (RAM clear loop)` 连续填充 `$0483, $0484, ...$04A0+`
  - 这是 RAM clear 子程序 — **不是 OAM clear**（那是上面 $A8E2）
  - H5 没翻译这段（清零 RAM $0468-$0567 已经由 `DataStore.reset()` 在启动时做了）
- 此阶段 ROM 跑 RAM clear + NMI 增量 `$001B++` (counter)

### 1.3 Scene0Controller.FadeInNt.fadeStep===0 — frame 9/10 NT 部分 (16 cells) ← **BUG #009 v3 修复**

| H5 Service call | PRG 字节 | 注释 |
|---|---|---|
| `prim.queueScene0LogoNt(0)` ← step=0 (16 cells 写入) | `$00:9A89 CPY #$10` + `$9A8B BNE $9A7E` + `$9A86 JSR $9AA2` | **内循环 16 次写 NT buffer** |

**asm 路径**（13.log frame 12 实证）：
```
$00:9A89: C0 10       CPY #$10           ; 16-iter counter
$00:9A8B: D0 F1       BNE $9A7E          ; Y < 16 ? loop
$00:9A86: 20 A2 9A    JSR $9AA2          ; 调 inner sub → TAX → LDA $9EA2,X → ORA $062A,Y → STA $05E8,X
$00:9A7E: B9 2A 06    LDA $062A,Y        ; load source byte (NT data stream, OPENING_TILE_STREAMS)
$00:9A81: 29 30       AND #$30           ; mask palette hi bits
$00:9A83: 18          CLC
$00:9A84: 65 4A       ADC $4A            ; + scene fade base
$00:9A86: 20 A2 9A    JSR $9AA2          ; call inner TX
$00:9AA2: AA          TAX                ; X = base pattern idx
$00:9AA3: BD A2 9E    LDA $9EA2,X        ; PRG $9EA2 16-byte pattern base (bank0 fixed)
$00:9AA6: 85 E6       STA $E6
$00:9AA8: B9 2A 06    LDA $062A,Y        ; 低 4-bit palette data
$00:9AAB: 29 0F       AND #$0F
$00:9AAD: 05 E6       ORA $E6            ; merge
$00:9AAF: A6 E7       LDX $E7            ; NT buffer ptr
$00:9AB1: 9D E8 05    STA $05E8,X        ; **写 NT buffer $05E8 + offset**
$00:9AB4: E6 E7       INC $E7            ; ptr++
$00:9AB6: C8          INY                ; src idx++
$00:9AB7: 60          RTS
```

> **H5 翻译对应**：`queueScene0LogoNt(step=0)` 写入 16 cells ≈ emu f12 trace 看到的"CPY #$10" 16 次循环。
> step=0 = 写 16 cells (上半 NT) — `OPENING_SCENE0_NT_CELLS` 中的 row 12 前 16 cells。

### 1.4 Scene0Controller.FadeInNt.fadeStep===1 — frame 10/11 NT 完整 + OAM 装载

| H5 Service call | PRG 字节 | 注释 |
|---|---|---|
| `prim.queueScene0LogoNt(1)` ← step=1 (剩余 9 cells) | 同 `$9A7E-$9AB7` 内循环 | 写满 25 cells (Tecmo logo + © NTV 行) |
| `prim.loadScene0Oam()` ← **f11 装载 40 sprite** | frame 11 trace 中找 (13.log 跑到 f13 没显示) | emu f11 OAM 装载用 BOOT_TECMO_OAM_TABLE，但 13.log 没看到对应 STA $0200，可能是间接 DMA 调用 |
| `prim.fadeInStep()` ← fade=0 → 1 切换调色板 | `$8C56-: JSR fadeLookup` + `$8C81: STA $062A+Y` | BG palette 高 4-bit 切换 |
| (pass Counter) | `$8D3F BPL $8CB0` (counter A→0) | — |

### 1.5 Scene0Controller.LoadLogoNt — frame 13 (原本)

| H5 Service call | PRG 字节 | 注释 |
|---|---|---|
| `prim.queueScene3NametableRows(row, count)` *(旧实现)* | `$8BB0-$8D1D` (stream parser) | **旧翻译 — 跟 emu 写错位（写了满行 32 cells 而不是 25 cell 稀疏），BUG #009 v2 已修** |
| **新** `prim.queueScene0NtCells()` | `$8BB0-$8D1D` (NT stream loader) | 调用同样的 PRG 函数，但是 H5 翻译到正确 25 cell |

---

## 2. CHR bank 反推

### 2.1 CHR bank select by scanline

| H5 端 (frame 30+ emu) | PRG 字节 |
|---|---|
| `mmap.chrBanks = [124,125,126,127, 252,113,82,83]` (sc=6, 上半 NT) | `$8C09 STA $8000` / `$8C0C STA $8001` (MMC3 bank-select) |
| `mmap.chrBanks = [0,1,2,3, 252,113,82,83]` (sc=150, 下半 NT) | 同上但写不同 bank id |

### 2.2 loadChrConfig(0x17)

| H5 | PRG |
|---|---|
| `CFG[0x17]` 6-byte 配置 | `$A02E + 0x17*2=$A05E` (ptr table) → PTR→`$A***: CFG[0]=BG base / CFG[1]=SPR base / CFG[2..5]=params` |

**CFG[0x17] 解析**（emu f9 trace 验证）：
- BG base = 0x7C (= 124) → slot 0 = (124/4)*4=124 ... 等下需重读 — 0x7C / 4 = 31 bank of 4 = bank 124
- SPR base = ? (待查 reverse — f9 trace 还没拿到)

---

## 3. 反推验证路线 (Phase 2)

### 3.1 当前已知锚点 (已确认)

| 反推项 | 状态 | 锚点 |
|---|---|---|
| hideOam (OAM clear DMA) | ✅ | `$01:A8E2: STA $0200,Y #$F8` (13.log f9) |
| queueScene0LogoNt inner loop | ✅ | `$00:9A7E-$9AB7` (13.log f12-f13) |
| queueScene0LogoNt outer loop | ✅ | `$00:9A86-$9A8B` (CPY #$10 / BNE) |
| NT buffer write target | ✅ | `$9AB1: STA $05E8,X` |
| NT base pattern table | ✅ | `$9AA3: LDA $9EA2,X` (PRG bank0 fixed 16-byte) |
| Palette lookup | ✅ | `$9AA8: LDA $062A,Y` (OPENING_PALETTE buffer) |

### 3.2 待反推锚点 (Phase 2)

| 反推项 | 路径 | 计划 |
|---|---|---|
| loadScene0Oam frame 11 装载 | 13.log 没显示 STA $0200，需 emu frame 11 trace | 跑 `_emu_reference` 加 FRAME=11 后看 OAM 写 |
| loadChrConfig(0x17) bank 解析 | CHR slots[0..7] = [124,125,126,127,252,113,82,83] | 反查 PRG bank select (`$8000`/`$8001` 写) |
| fadeInStep (fade=0→1 调色板切换) | $8C56-onwards | 已经基本清楚 — palette.bg view |
| hold 阶段 296 帧 | 13.log 没跑到 f300 | 跑 emu frame 1-300 全程看 trace |

### 3.2.1 ⚠️ Magic Number 警示：Scene0Controller.Hold `counter = 314`

**当前状态**：H5 `Scene0Controller.ts:111` 写 `this.counter = 314` — 这是**经验估算值**，**没有 asm 反推**。

**估算逻辑**（可能有错）：
- 注释说 "f25 fade 满亮 → 静止显示至 f339"
- H5 算法：`if (--counter > 0)` 直到 counter=0 → frame 25 + 314 = f339 进 FadeOut
- 估算前提：**注释描述"f25-f339"是正确的**

**实证反查**（已部分完成）：
- f338 trace: ROM 在跑 OAM clear + bank switch ($0F:C4C1) — **此时已在 fade-out 中期**（不是 hold 末段）
- f344-f376: ROM `DEC $F3 = #$07` 计数器, 是 fade-step **内** counter（不直接代表 hold 时长）
- f339/340/341 在 ROM trace 中是 gap（dump 不连续）— 不能直接验证

**修复路径**（如果要消除 magic number）：

| 方向 | 工作量 | 描述 |
|---|---|---|
| A. 跑 emu frame 339-343 完整 trace | 1-2 小时 | 用 trace dump 拿到 f339-f340 的 6502 PC，验证 ROM 在该帧做什么 |
| B. 加 r5b 或类似 RAM state check | 30 分钟 | 改 H5：删 counter=314，改成 "等 ROM 自动清 r5b" (pull model 限制) |
| C. 接受 magic number,加注释警告 | 10 分钟 | 在 `Scene0Controller.ts:111` 加 `// ⚠️ Magic 314 — 估算依据注释 f25-f339` |

**待办**：跑 emu 验证 f339 真实 frame。如果发现 magic number 错（+1/-1 帧），修正为正确值。

### 3.3 反推工作流（最终目标）

```
1. 跑 emulator output/emu-reference/frame-{1,5,9,11,13,...300}/state.json
   → 包含 cpu.PC (每帧最后 PC)
2. 对照 H5 Service call log （跑 _verify_300frame 时通过 tracer 加）
3. 列出每个 H5 Service call 的"可能 PC 锚点"：
   - loadChrConfig(0x17) → bank2 routine @ $A02E
   - loadScene0Palettes → bank2 routine @ $A200
   - hideOam → bank1/A8E2
   - queueScene0LogoNt → bank0 $9A7E-$9AB7
   - loadScene0Oam → bank0/1 OAM loader (待找)
4. asm 反推完成了，相当于"翻译验证通过"
```

---

## 4. 反推产物

| 文档 | 内容 | 状态 |
|---|---|---|
| `H5_ASM_REVERSE_ANCHOR.md` (本文) | H5 ↔ PRG $XXXX 锚点表 | ✅ v1 |
| `BUG.md` | asm 翻译偏差清单 | 同步更新中 (BUG #001-#012) |
| `rom-data-locations.md` | ROM file offset → PRG index | ✅ (Captain Tsubasa II 1059 数据布局) |
| `WBS_FRAME13.md` | WBS_F1-F11 完成度表 | ✅ (F1-F11 已标"猬?"状态) |

---

## 5. 后续路线

**Phase 1 - 现有 H5 → asm 锚点（v1 ✅）**：
- 6 个已知锚点（已 anchor）
- 4 个待 anchor（Phase 2 跑 trace 完成）

**Phase 2 - 跑 emulator 完整 300 帧 trace 反查 asm**：
- 加 emu FRAMES = [11, 100, 200, 274, 296] 看 trace 找 OAM 装载 / fade out / scene 切换 anchor
- 跑 _verify_300frame 时开 tracer 加 H5 Service call log → emu PC → 1-to-1 map
- 写 `H5_ASM_REVERSE_ANCHOR_v2.md` 包含全部 frame 0-300 反推表

**Phase 3 - H5 不再依赖 asm**：
- 翻译锚点表完成后，H5 是 ground truth
- asm 文件可归档 (旧反推注释保留为备份)
- H5 维护时不需要每次跑 emulator — 已有 anchor 文档足以验证新加的 Service method
