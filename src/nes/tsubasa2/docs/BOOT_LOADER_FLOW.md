# Bank00 Boot Loader 全帧流转图（trace 实证）

**目的**: 不再硬编码 "3644 帧等待" / "Scene0.onEnter 装载" 等任意数字，反推出 ROM 全 frame 1-1725 的真实行为语义，落成可实现的 H5 service。

---

## 1. trace 来源清单

| 路径 | frames | banks | 覆盖 |
|---|---|---|---|
| `docs/roms/tecmo/13.log` | 6-13 | 00,01 | Capcom logo 明细 |
| `docs/roms/tecmo/Captain...frame13.cdl` | 6-13 | CDL | Code/Data Log |
| `docs/roms/tecmo/strippeddataframe13.nes` | 6-13 | NES ROM | f13 状态 ROM |
| `docs/roms/opening-all/opening-all.log` | 6-4355 | 00,01,06,0F | 全 boot+开场 |
| `docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log` | 6-380 | 00,01,06,0F | f1-380 全帧 |
| `docs/roms/aftertecmo/tsubasa-when-show274-275.log` | 6-380 | 00,01,06,0F | 近似 |
| `docs/roms/aftertecmo/tsubasa-when-showfirsttextscript-820-1047-...` | 6-816 | 00,01,06,0F | 大空翼结束 |
| `docs/roms/aftertecmo/tsubasa-when-showfirsttextscript-820-tsubasa-tx.log` | 822-1047 | 00,01,06,0F | 大空翼 dialog |
| `docs/roms/aftertecmo/tsubasa1045.log` | 6-1056 | 00,01,06,0F | 长 trace |
| `docs/roms/rixiang/rixiang-1492-end.log` | 1048-1487 | 00,01,06,0F | rixiang 入口 |
| `docs/roms/rixiang/rixiang-1492-1725end.log` | 1497-1725 | 00,01,06,0F | 开场结束 |
| `docs/roms/Captain Tsubasa II - Super Striker (Japan).nes` | - | - | 原始 ROM |
| `docs/roms/Captain...Japan.cdl` | - | - | 全 CDL |
| `docs/roms/Captain...Japan.log` | - | - | 19M 主 log |

**tecmo/readme.md（用户笔记）**:
> log 的 bank 是 16KB 粒度（真实 8KB bank >> 1），共 16 种 (0x00-0x0F)，$0F 占 15076 条对应固定 $C000-$FFFF。真实 PRG bank = trace bank。

---

## 2. bank 命名映射（综合表）

| trace bank | 8KB 实际 | asm 等价 |
|---|---|---|
| `bank00` | real 0 | **asm bank00**（主循环） |
| `bank01` | real 1 | **asm bank02**（driver/PPU） |
| `bank02-bank05` | real 2-5 | asm bank03-06（场景） |
| `bank06` | real 6 | **asm bank12**（音频） |
| `bank07-bank0E` | real 7-14 | asm bank13-30 |
| `bank0F` | **fixed** | **asm 固定区（IRQ+lib）** |

实测只出现 4 种：00, 01, 06, 0F。
- bank00 = 主循环（sprite unpack、NT write 准备）
- bank01 = driver 层（OAM DMA、PPU ctrl、APU 入口）
- bank06 = 音频引擎（$06:810C-$83DC）
- bank0F = 固定 PRG

---

## 3. 全 frame 1-1725 时间线（trace 实证）

### Phase A: 冷启动清屏 f6-f9
- F6: bank02 `$AA0B` 内存清零循环
- F8: bank00 `$9958 CLC` 主循环入口
- F9: bank02 `$A0ED` LDA $4015 APU
- F9: bank00 `$9F34 TXS` init stack
- **tecmo/readme 验证**: f1/f5 NT 全 0 + palette 全 0；f9 nt0 48 个非零 tile，palette 仍 0x0F

### Phase B: Capcom logo 装载 f10-f275
- F10: bank02 `$A036` 读 audio engine
- **F12-F13: bank00 `$9A7E-$9AB7` Capcom logo OAM unpack**（拆 $062A 高/低 nibble → $05E8）
- **F13: bank02 `$A8D3-A8FB` OAM DMA 循环**（`LDX $0468,Y` → `STA $0200,Y`）
- F30: bank00 `$9F04 LDA $1B = #$40` vsync flag 轮询起
- F60-F120: bank02 `$A0ED` APU 持续
- F193+: bank00 vsync 稳定循环
- F275: Capcom logo fade-out 完成

**关键发现**: F9 NT 已写 48 个 tile；F12-F13 OAM unpack 在 bank00；F13 OAM 64 精灵可见 (y=72..), CHR banks 0-3 = 252/113/82/83
**结论**: Capcom logo **tilemap write 在 bank00, sprite 装配在 bank00, OAM push 在 bank02**

### Phase C: 标题屏画面装载 f276-f380
- F276-F379: bank00 `$8300-$83F0` 标题屏 NT tile 写循环
- F320+: bank00 + bank06 audio 第二画面 spritesetup
- **F380: bank00 `$91A1-$95FA` 第二画面 OAM/attr load**（位运算 $0578 → $0468/$046B）

### Phase D: 标题屏显示 + 等待 Start f381-f819
- F381+: bank00 `$9F04-$9F06` 持续 vsync 轮询
- F500+: bank06 `$810C` 音频 tick
- F820: bank00 仍 vsync 轮询 — 大空翼介绍起
- **结论**: title 屏可见后是"等待玩家按 Start" idle 状态

### Phase E: 大空翼介绍 dialog f820-f1047
- F820-F816: bank00 + bank06 dialog 显示 "おおぞら つばさ についに..."
- F822-F1047: dialog 逐字 fade-in (typewriter effect)
- F1047: bank06 `$8119 DEC $F3` 文字结束，音频 timer 重新 tick

### Phase F: rixiang phase f1048-f1487
- F1048-F1487: bank06 持续 audio tick
- F1487: bank06 `$83DC: STA $F5 = #$00` rixiang 结束标记
- **440 帧绝大部分 bank06 音频 + 偶发 bank00/bank01 = 等待阶段**

### Phase G: 开场过渡 f1497-f1725
- F1497: bank01 `$A0ED` APU 活跃
- F1500-F1700: 三 bank 混合进入 gameplay 准备
- F1725: bank06 `$8119: DEC $F3` 开场结束

### Phase H: 全场结束（opening-all 到 f4355）
- F2000-F3000: bank00 drift/scroll
- **F2510: bank02 首次 `STA $2000` PPU ctrl**
- F3644: bank06 首次 `$8119: DEC $F3` audio timer
- F4100: bank00 `$9F06: BPL $9F04` vsync
- F4355: bank00 `$9AA8: LDA $062A,Y` sprite unload 末

---

## 4. bank00 主循环（src/asm/bank00/code_main.s $8000-$8AB2）

```
entry ($801F):
  JSR $9BA0                  → awaitVsync()
  JSR $8464 (mode=00)        → PpuTransferService.loadCfgBlock(0)
  JSR $9FA8 (mode=01)        → Bank00SchedulerService.tick(1)
$8027:
  LDA $001E; AND #$10; BEQ $8027   → pollBootComplete()
; 完成后:
  clear $0005-$005B          → bootInit()
  LDA #$01; STA $0700        → setSchedulerEntry(1)
  LDA $001B; AND #$01
  JSR $9B11                  → enableNmiIrq()
  JSR $9FA8 (mode=2)         → Bank00SchedulerService.tick(2)
  JSR $9B7F; JSR $98A0       → enablePpu() + disablePpu()
  LDA #$0D; JSR $8297        → spriteMode(0x0D)
  LDA #$17; JSR $8AF7        → spriteMode(0x17)
  LDA #$30; JSR $890C; JSR $88FB → applyDriftY()
  JSR $9A35                  → unpackLogoOam() [CAPCOM LOGO OAM UNPACK]
  LDA #$00; JSR $8920        → setSchedulerEntry(0)
$80A7 复杂状态机（按 $001E 切路径）
$80D4 if ($001C & $C0) == $C0:
        → audio enable path ($826A)
       else:
        → JSR $9BA0; JSR $8464(mode=01)
        → JMP $80FD   ← 跳回顶部
$80E6-$8282: sub state machine 按 $0026 sceneId + $0027 mode
        → 切场景 (JMP $8017)
```

### code_sub.s vsync 轮询循环

| ROM PC | 注释 | H5 method |
|---|---|---|
| `$9EEF-$9F06` | vsync flag 轮询循环 | `waitVsync()` |
| `$9F04 LDA $1B; BPL $9F04` | 等 vsync flag 清除 | `pollVsyncFlag()` |

### routine 方法名一览

| ROM PC | 用途 | method |
|---|---|---|
| `$9B11` | unmask IRQ/NMI | `enableNmiIrq()` |
| `$9B7F` | PPU 启用 palette | `enablePpuRendering()` |
| `$98A0` | PPU 关闭 | `disablePpu()` |
| `$8297` (mode $0D) | sprite subroutine | `spriteMode(0x0D)` |
| `$8AF7` (mode $17) | sprite subroutine | `spriteMode(0x17)` |
| `$890C/$88FB` | Y 滚动 + finalize | `applyDriftY()` |
| `$9A35` | **Capcom logo OAM unpack** | `unpackLogoOam()` |
| `$9A7E-$9AB7` | logo tile unpack（内联） | `unpackLogoOam_inner()` |
| `$91A1-$95FA` | 第二画面 OAM/attr load | `loadTitleScreenOam()` |
| `$8920` | scheduler mode 开关 | `setSchedulerEntry(m)` |
| `$9FA8` | scheduler tick dispatcher | `Bank00SchedulerService.tick()` |
| `$8464` | CFG block loader | `PpuTransferService.loadCfgBlock(id)` |
| `$9BA0` | NMI/vblank sync | `awaitVsync()` |
| `$C4B9`+$8000/$8001 | PRG-bank-switch 抽象 | **直接 import module 函数**（无硬件模拟） |
| `$A006,$A009,...$A20F` | bank02 multi-mode sub entry | `Bank02Driver.dispatch(subMode)` |
| `$C572,$C578,$C57B` | bank02 mode change | `subModeChange()` |

---

## 5. 关键变量语义

| RAM | 用途 | 来源 |
|---|---|---|
| `$0000` | frame counter (NMI 每帧 +1) | HW |
| `$001B` | vsync flag ($80=in vblank, cleared by main) | HW |
| `$001C` | input/state selector | NMI handler |
| `$001E` | boot state mask (bit4=boot done, bit3=audio ready) | 服务端 set |
| `$0026` | scene id（dispatch 目标） | service set |
| `$0027` | scheduler mode (0-4) | service set |
| `$0028-$0029` | 16-bit 内存指针 | service set |
| `$0044,$004C,$005B,$0628,$0700` | 各种小型 state | 多处 |
| `$0468-$046F` | sprite slot pack (4 sprite × 2 byte) | bank00 prep |
| `$05E8-$05F7` | logo OAM slot | bank00 prep |
| `$0578-$05FF` | 第二画面 packed data | PRG bank02 |
| `$062A+` | packed sprite data (logo OAM) | PRG bank02 |
| `$0700` | scheduler entry pointer | service set |
| `$E0-$ED` | service 内部指针 | code_sub.s |

---

## 6. 当前 H5 实现问题（修正目标）

### 问题 1: Scene0.onEnter 装载 boot logo = 错

| 当前 H5 | ROM 实测 |
|---|---|
| frame 1 进 Scene0.onEnter → loadCfgBlock(0) → 立即画 Capcom logo | frame 6 bank02 清零 → frame 8 bank00 主循环 → frame 13 logo OAM unpack → frame 2510+ PPU 开 |

**修正**：
- ❌ 删除 `Scene0.onEnter → loadCfgBlock(sceneId=0)`
- ✅ `Bank00MainLoopService.tick()` 主循环 $8027-$8051 段执行 `unpackLogoOam()`
- ✅ 等 bank00 轮询 `$001E` bit 4 (boot complete) 后才 PPU enable

### 问题 2: 硬编码 Drift / Wait timer = 错

| 当前 H5 | ROM 实测 |
|---|---|
| `Scene0Controller.scheduleAfter(3600, callback)` | bank00 vsync flag `$001B` 自然推进；`applyDriftY()` 内部循环 `$30` 次 |

**修正**：
- ❌ 删除 `scheduleAfter(timer, callback)` 硬编码
- ✅ `waitVsync()` = `while (ram.$001B & $80) {}`
- ✅ `applyDriftY()` = bank00 主循环内按 ROM LDY #$30 循环
- ✅ idle 状态 = bank00 主循环每帧 `waitVsync()` + bank06 音频 tick

### 问题 3: "frame 3644 后切 Scene0" = 错

| 当前 H5 | ROM 实测 |
|---|---|
| `if (frame > 3644) startScene0()` | frame 1-4355 都在 bank00 main loop，无"切到 Scene0"概念 |

**修正**：
- ❌ 删除 frame 计数器硬编码切换
- ✅ Bank00MainLoopService 持续 run，每帧从 `$8027` 顶部开始
- ✅ Scene0 = bank00 scheduler mode 的一种，由 `$0027` mode + `$0026` sceneId 决定

---

## 7. 正确 H5 架构骨架

```ts
class Bank00MainLoopService {
  tick(): void {
    // $801F entry 每帧开始
    this.nmiIrqSync()         // JSR $9BA0
    this.ppuTransfer(0)       // JSR $8464 (mode=00)
    this.schedulerTick(1)     // JSR $9FA8 (mode=1)
    this.pollBootComplete()   // LDA $001E; AND #$10; BEQ back to top
    if (this.bootDone) {
      this.bootInit()         // clear $0005-$005B
      this.schedulerTick(2)   // JSR $9FA8 (mode=2)
      this.enableNmiIrq()     // JSR $9B11
      this.enablePpu()        // JSR $9B7F
      this.disablePpuInit()   // JSR $98A0
      this.spriteMode(0x0D)   // JSR $8297
      this.spriteMode(0x17)   // JSR $8AF7
      this.applyDriftY()      // JSR $890C + $88FB
      this.unpackLogoOam()    // JSR $9A35
      this.setSchedulerEntry(0) // JSR $8920
      this.dispatcherByState()// $80A7-$8282 按 $0027 mode
    }
    // dispatcher 内部最终 JMP $80FD 跳回顶部
  }
}
```

### Scene 与 Bank00MainLoop 关系

```
Bank00MainLoop（每帧调用）
  ├─ 由 $0026 sceneId 决定当前 scene
  ├─ Scene controller 仅作为 state holder（累积 scene 状态）
  ├─ scene 转换通过 dispatcherByState() → JMP $8017 → entry 重入
  └─ 不存在"硬切 frame"概念
```

**Scene0 旧 controller 处置**：
- 保留 Scene0Controller 但 **不再触发 loadCfgBlock/scheduleAfter/Drift30** 等行为
- 仅作为 Scene0 状态容器（内部 phase 由 bank00 `$80BC-$8282` 状态机映射）
- 等 Bank00MainLoopService 实现完毕后再合并

---

## 8. 验证方法

### 运行验证
```bash
cd docs/roms
# 1. 对照所有 trace 跑 frame 1-4355 模拟，确认每帧首个 PC+bank 与 trace 一致
# 2. 确认 OAM unpack 末 ($05E8) 与 trace $9AB7 退出时一致
# 3. 确认 vsync flag: 每帧 ram.$001B 在 IRQ 后变 $80，主循环读到后清 $00
# 4. 确认 frame 3644+ 才有 $06:8119 DEC $F3 (audio first tick)
```

### 关键 RAM 校验

| 校验点 | 期望 |
|---|---|
| frame 13 OAM $0200 | 应全 $F8 (bank02 init) 或 unpack 后 sprite |
| frame 13 nt0 非零 tile 数 | = 57 (readme 验证) |
| frame 13 chrBanks[0..3] | = [252, 113, 82, 83] |
| frame 2510 PPUCTRL $2000 | = $89 (NMI + BG + sprite + H==0) |
| frame 3644 audio timer $F3 | 首次从 $XX 减到 $XX-1 |
| frame 4355 mainLoopEnd | `LDA $062A,Y = #$00` (sprite unload 末) |
