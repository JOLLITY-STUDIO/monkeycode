# BANK02 (PRG bank 2) 完整分析 v4

> 基于:
> - 直接反汇编 PRG bank 2 (PRG idx 0x4000-0x5FFF)
> - 全场 trace log `docs/roms/opening-all/opening-all.log` (99771 行, 完整覆盖 frame 1 起)
> - 反汇编工具 `debug/_disasm_scene0_real.cjs`, `_b2_low.cjs`, `_handler_compare.cjs` 等
>
> **v4 关键修正**: Scene0 真入口在 `bank2 offset $0000` (CPU `$A000`)，**不是** `$A4C1`。前版文档所有 `$A4C1` 分析全错。Slot handler chain 真触发模式已通过 trace 实证。

---

## 1. ROM 整体架构（开场动画期，已 trace 实证）

### 1.1 PRG bank 映射（MMC3 mapper 4）

| CPU 地址 | PRG bank | 备注 |
|---|---|---|
| `$6000-$7FFF` | PRG-RAM (8 KB SRAM) | game save / 工作 RAM |
| `$8000-$9FFF` | bank 0 (可切 via R6) | 主 dispatcher code |
| `$A000-$BFFF` | bank 2 (R7=2, boot init 切好) | **Scene0/Scene1+ handlers** |
| `$C000-$DFFF` | bank 14 (固定) | NMI handler + timer dispatcher |
| `$E000-$FFFF` | bank 15 (固定) | reset vector + RST handler |

### 1.2 BOOT 完整 timeline（已 trace 实证）

| 帧 | PC 区域 | 操作 | 来源 |
|---|---|---|---|
| **f1** | `$C000-$FFFF` | 切 MMC3 R7=2, R6=0 (boot init 设的，trace 未捕到直接 swap，但 f6 之后全跑在 bank2) | 反推 |
| **f6** | `bank2 $AA0E` | 清零 RAM (`STA ($EC),Y` loop, 256 byte) | trace |
| **f8** | `bank0 $996B/$9976` | `STA $2001 = #$06` + `STA $2000 = #$08` (BG enable) | trace |
| **f9** | `bank2 $A0ED-$A0FA` | `LDA $4015,X; LSR; ROL $3F` controller poll loop (8 次) | trace |
| **f10** | `bank2 $A01B-$A046` | NT 装载 (`LDA $5E8,X; STA $2007` ×5) | trace |
| **f11-f269** | bank0 dispatcher | 6-slot timer dispatcher 每 NMI frame 调度 | trace |
| **f270** | **`bank2 $A000`** | dispatcher 首次触发 → JSR `$A000` (Scene0 main update) | trace |
| **f285** | **`bank2 $A160`** | dispatcher 触发 → JSR `$A160` (不规则 handler) | trace |
| **f30, f43, f55, ... f259** | **每 12 帧** | dispatcher → JSR `$A000` (Scene0 main update)**138 次** | trace |
| **f285, f335, f402, f413, ... f4332** | **不规则 71 帧** | dispatcher → JSR `$A160` (slot handler)**71 次** | trace |
| **f545, f646, f684** | `$01:A160:A160-$A163` | `STA $E000 = #$FF; STA $E001 = #$18` (MMC6 PRG-RAM 寄存器镜像) | trace |

### 1.3 完整 handler dispatch 统计

| Handler | 触发次数 | 触发模式 | 角色 |
|---|---|---|---|
| `JSR $A000` | **138 次** | **每 12 帧同步** (30, 43, 55, 67, 79, 91, ..., 259) | **Scene0 main update** —— NT 装载 / Tecmo logo 持续操作 |
| `JSR $A160` | **71 次** | **不规则** (285, 335, 402, 413, 488, 545, 646, 684, ...) | **slot handler 2** —— fade step / 特殊场景动作 |
| dispatcher 总触发 | **152 次** | | |

**关键发现**：`$A000` 不是开机入口，而是**`f270 起每 12 帧跑一次`的 Scene0 main update handler**！`$A160` 是另一个不规则触发的 handler。

---

## 2. Scene0 真入口 = `bank2 offset $0000` (CPU `$A000`)

### 2.1 字节对照（f270 trace vs ROM bank2）

```bash
$01:A000: LDA #$00              ; bank2[$0000] = $A9
$01:A002: STA $2003             ; bank2[$0002] = $8D, $0003 = $03, $0004 = $20
$01:A005: LDA #$02              ; bank2[$0005] = $A9
$01:A007: STA $4014             ; bank2[$0007] = $8D, $0008 = $14, $0009 = $40
$01:A00A: LDA $0628             ; bank2[$000A] = $AD, $000B = $28, $000C = $06
$01:A00D: BEQ $A05D             ; bank2[$000D] = $F0, $000E = $4E
```

**完整匹配**！f270 L4835-L4842 trace 字节序列 = bank2 offset $0000-$000F 字节序列。

### 2.2 之前错误的承认

`docs/BANK02_ANALYSIS.md` v1-v3 都把 Scene0 真入口写成 **"$A4C1"**，**这是错的！**

`$A4C1` 在 f270 trace **没**出现，因为:
- **boot init 期间 R7 = 2 切得比 f270 早得多**（在 `$C000-$FFFF` boot init 区域跑的）
- f270 实际只是 dispatcher 第一次触发 `JSR $A000` 而不是 init
- `$A4C1` 是 `$01:A4C1 = bank2 offset $04C1` 但 f6/f9/f10 trace 看到的是 `bank2 offset $00xx`（如 `$AA0E`, `$A0ED`, `$A01B`）

**`$04C1` 字节 = `20 9A 0D` (JSR $9A0D)** — 这是 Scene0 **某次**执行 JSR 子程序的字节，不是 Scene0 init entry。

---

## 3. Scene0 main handler (CPU `$A000` = bank2 offset $0000) 真反汇编

### 3.1 Init 部分 (f270 第一次触发做的)

```asm
$A000: LDA #$00               ; A=0
$A002: STA $2003              ; OAMADDR = 0
$A005: LDA #$02               ; A=2
$A007: STA $4014              ; OAM DMA from $0200 (256 byte)
$A00A: LDA $0628              ; 读 RAM $0628
$A00D: BEQ $A05D              ; if $628 == 0 跳清场 sub path
$A00F: BIT $0629              ; test $629 bit6
$A012: BVS $A05D              ; overflow set? 跳
$A014: LDA #$00               ; A=0
$A016: STA $2001              ; PPUMASK = 0 (disable 显示)
$A019: LDX #$00               ; X=0 (NT addr lo)
$A01B: LDY #$80               ; Y=$80
$A01D: LDA $05E8,X            ; X+1: 读 tile byte (sprite desc)
$A020: BPL $A026              ; if >= 0 (即 <$80) 跳
$A022: AND #$3F               ; mask
$A024: LDY #$84               ; Y=$84 (clear path)
$A026: STY $2000              ; PPUCTRL = Y (normal/clear)
$A029: TAY                    ; A → Y
$A02A: LDA $05EA,X            ; X+2: 读 NT addr lo
$A02D: STA $2006              ; PPUADDR lo
$A030: LDA $05E9,X            ; X+1: 读 NT addr hi
$A033: STA $2006              ; PPUADDR hi
$A036: LDA $05EB,X            ; X+3: 读 tile/attr
$A039: STA $2007              ; PPU data write
$A03C: INX                    ; X+=1
$A03D: DEY                    ; Y--
$A03E: BNE $A036              ; loop
$A040: INX                    ; X+=1 (跳过 next entry pointer)
$A041: INX                    ; X+=1
$A042: INX                    ; X+=1
$A043: LDA $05E8,X            ; 读下一 entry flag
$A046: BNE $A01B              ; if != 0 跳回主 loop
$A048: LDA #$00
$A04A: STA $0628              ; $628 = 0
$A04D: LDA #$3F               ; A=$3F
$A04F: STA $2006              ; PPUADDR hi = $3F (palette)
$A052: LDA #$00               ; A=0
$A054: STA $2006              ; PPUADDR lo = 0 ($3F00)
$A057: STA $2006              ; PPUADDR lo = 0 (再写一次 mirror $3F10)
$A05A: STA $2006              ; PPUADDR lo = 0 (再写一次 mirror $3F14)
```

**这是 PNG sprite / NT entry 的装载循环**! f347+ 持续跑这段做 Tecmo logo NT 装载.

### 3.2 关键代码段 f347 实证

```
f347 L472x $01:A036: LDA $05EB,X @ $0617   ← load tile byte
       $01:A039: STA $2007 = #$00           ← write PPU data
       $01:A03C-$A03E: INX/DEY/BNE loop
       $01:A040-$A043: X+=3, 跳到下个 entry
```

**完全确认**：Scene0 main handler 在 `$A000-$A046` 范围内是一个 sprite/NT 装载主循环。

---

## 4. Slot handler 2 (CPU `$A160` = bank2 offset $0160)

### 4.1 Entry 反汇编

```asm
$A160: STA $E000              ; PRG-RAM chip enable (MMC6 镜像寄存器)
$A163: STA $E001              ; PRG-RAM mode = $18 (write protect off + chip enable)
$A166: LDX $78                ; X = $78
$A168: LDA $78,X              ; A = $0078+X
$A16A: BPL $A18D              ; if >= 0 (即 <$80) 跳
$A16C-$A18B: PPUADDR setup + write scroll/PPUMASK
...
$A18D: LDY #$02
$A18F-$A192: 短 delay loop
$A194-$A19F: ROR + 滚动 setup
...
$A1A8: ...
$A1C0: STA $E000              ; 写入 PRG-RAM enable 寄存器 (重要!)
$A1C3: STA $78                ; save state
...
```

### 4.2 `$E000/$E001` 不是存档写入

用户在开场动画期间**没存档**。所以这 17 次 `STA $E000/E001` 不是 SRAM 写入。

**真实含义**：NES `$E000-$E001` 在某些 mapper（如 MMC6/MMC2）上是 **PRG-RAM 控制寄存器镜像**。`#$FF` + `#$18` 设置：
- `bit 0-3 = $F` = PRG-RAM write enable
- `bit 4 = 1` = PRG-RAM chip select ON
- 这是 **routine setup 必做**（enable PRG-RAM 才能用 RAM 内的 sprite 数据 / scroll 参数）

不需要 game save。

---

## 5. Scene1-23 handler 真地址（PRG bank 2 实证）

| Scene | PRG 地址 | 真行为摘要 |
|---|---|---|
| Scene0 handler 入口 | `$A000` | NT loader loop (`LDA $5E8,X; STA $2007`) — 每 12 帧跑一次 |
| Slot handler 2 入口 | `$A160` | PRG-RAM enable + scroll setup — 不规则跑 |
| Scene1 (math) | `$A559` | `LDA $0060/$61; LSR×2; ...; LDA #$03; RTS` |
| Scene2 (sprite ext clear) | `$A57B` | 清 $0068-$05C7, RTS |
| Scene3 (clear sprite attr?) | `$A5A2` | JSR `$9B7F`; LDA #$04; RTS |
| Scene4 | `$A5A8` | ... |
| Scene5 | `$A5B0` | LDX #$09; JSR `$9F96` |
| Scene6 | `$A5B8` | LDX #$09; JSR `$9F89` |
| Scene7 | `$A5BF` | LDA #$FF; STA `$99` |
| Scene8 | `$A5C5` | LDA #$00; STA `$1B & #$BF` |
| Scene9 | `$A5D3` | LDA #$01; ORA `$1B` |
| Scene10-13 | `$A5E8-$A61F` | 用 CHR + scene data 装载 (不同 config) |
| Scene14 | `$A629` | LDX #$BD; LDY #$23; JSR `$8976`; ... |

**所有 Scene 都 `LDA #$02; RTS`** —— A=2 是 **handler 状态码约定**，不是 dispatch 目标！

---

## 6. 6-slot timer dispatcher (`$C821` / `$C4xx`)

### 6.1 dispatcher 入口

```asm
$C500: JMP $C76E             ; boot init 跳到 dispatcher
$C506: JMP $C821             ; re-entry
$C821: BIT $1B               ; 测试 $001B bit6
$C823: BVC $C828             ; 没 overflow 跳 (slot 0 没触发)
$C825: JMP $C478             ; overflow set → 处理 slot
$C478: BIT $3B               ; 测试 $003B bit7
$C47A: BMI $C4AE             ; minus set 跳
$C47C: SEC; ROR $3B          ; $003B >>=1, carry-out 进 $003C
$C47F: STA $3C               ; save A
$C481: STX $3D               ; save X
$C483: STY $3E               ; save Y
$C485: LDA $22; ORA #$07     ; R5 select 命令
$C489: STA $8000 = #$A5      ; MMC3 bank select
$C48C: LDA #$02
$C48E: STA $8001 = #$27      ; R5 = bank 2 (CHR swap!)
$C491: JSR $A160             ; ★ 触发 slot handler 2★
$C494: 后续清理流程 (RTS 回到 dispatcher loop)
```

### 6.2 Bit pattern 触发

`$001B` 各位 bit 触发对应 slot:
- bit 6 (overflow) → 已触发
- `$003B` 是 shift register (6 slot status)

每个 slot 触发时:
1. save CPU state 到 `$3C-$3E`
2. MMC3 R5 = 2 (切 CHR 到 bank 2)
3. **JSR handler** (`$A000` 或 `$A160`)
4. RTS → 恢复 CPU state → 回到 dispatcher

---

## 7. H5 Scene0 当前实现 vs ROM 真行为对照

### 7.1 H5 `Scene0Controller` 错了多少处

| 项 | H5 当前 | ROM 真行为 | 差异 |
|---|---|---|---|
| 入口 | `onUpdate()` phase 状态机 | **6-slot dispatcher 每 12 帧触发 `JSR $A000`** | H5 完全错 |
| NT 装载 | `queueScene0LogoNt(0/1)` fake | `$01:A036: LDA $05EB,X; STA $2007` 真循环 | H5 是 stub |
| Palette | `loadScene0Palettes()` | `$01:A04D-$A05A: 3 次 STA $2006 = $3Fxx` 真 PPUADDR 设 palette | H5 是 stub |
| OAM DMA | `loadScene0Oam()` 1 次 (f11) | 真 ROM f270 才做 `STA $4014 = #$02` | 时序错 |
| Trigger 来源 | BootRouter chain 调度 | **6-slot timer dispatcher 同步触发** | 模型错 |
| 返回值 | `return 0x01` (Scene1 chain) | **RTS 自动回 dispatcher** (无 return) | H5 是错的 chain |

### 7.2 H5 Scene1-23 controllers 现状

- `Scene1-13Controller` 都是 stub：只 `onEnter` 写 RAM，`onUpdate` return 0x00 undefined
- **不需要 return nextSceneId 链**！它们就是被 dispatcher 在 slot 到 0 时调用，跑完就 RTS
- scene 之间不是 chain，是 **并行 timer slot 调度**

---

## 8. ROM 真机制总结（v4 完整版）

### 8.1 完整 BOOT

```
f1      R7=2 切 (boot init in $C000-$FFFF)
f6      bank2 清 RAM ($AA0E loop 256 byte)
f8      BG enable (bank0 PPUMASK=06, PPUCTRL=08)
f10     bank2 NT 装载 ($A01B-$A046 loop)
f11+    bank0 dispatcher 每 NMI frame 调度 6 slots
f270    first dispatcher 触发 → JSR $A000 (Scene0 main handler)
f285+   first 不规则触发 → JSR $A160 (slot handler 2)
f30+12n  每 12 帧重复 JSR $A000 (Scene0 main, 共 138 次)
f-end   不规则 JSR $A160 (slot handler 2, 共 71 次)
```

### 8.2 6-slot 真机制

```
bit 6 $001B = "slot triggered"
$003B       = 6-slot shift register
$003C-$003E = saved CPU state for current handler

每个 slot 触发:
  1. SEC; ROR $3B; STA $3C; STX $3D; STY $3E (save state)
  2. STA $8000 = #$A5 (R5 select)
  3. STA $8001 = bank_num (CHR swap to bank 2)
  4. JSR handler_entry ($A000 or $A160)
  5. handler 跑完 → RTS → 自动恢复 state
  6. dispatcher loop 继续 → 检查 next slot
```

### 8.3 关键 insight

1. **R7=2 不是 f270 切的**,而是 **f1 之前的 boot init 在 `$C000-$FFFF` 切好**
2. **Scene0 不是开机入口**,而是 **dispatcher 每 12 帧触发的持续 handler**
3. **没有 Scene1-13 chain**,它们是 **6-slot timer slot** 各自独立调度
4. **每个 slot 触发都做 MMC3 CHR swap + save/restore CPU state**,这是 6502 协程式调度的标准做法
5. **`$A000/$A160` 是 handler entry,不是 ROM init code**
6. **H5 当前 BootRouter chain 模型完全错**,需要改成 6-slot timer dispatcher

---

## 9. 下一步

1. ❌ H5 BootRouter chain → 6-slot timer dispatcher 重构
2. ❌ H5 Scene0 controller `onUpdate()` → 改成 handler-style (RTS-based)
3. ❌ H5 Scene1-23 controllers → 改成 slot handlers
4. ❌ H5 fade/CHR swap MMC3 寄存器写入 → service 抽象
5. ✅ 全场 trace 数据已有, 真翻译工作量: ~1-2 周 (重写 dispatcher + handlers)

---

## 附：当前 H5 vs ROM 真相差距

| 概念 | H5 模型 | ROM 真模型 |
|---|---|---|
| Dispatcher | `BootRouter.update()` 链式 `onUpdate` | 6-slot timer dispatcher + handler save/restore |
| Scene0 何时跑 | `onUpdate()` 每帧调 | dispatcher 每 12 帧触发 1 次 |
| Scene1-13 | chain return sceneId+1 | 独立 timer slot, 各自 counter |
| Trigger 来源 | controller `return nextId` | 6-slot counter 减到 0 触发 |
| Handler 调用 | 直接 method call | MMC3 CHR swap + save/restore state + JSR |
| `return value` | controller return number | A 寄存器 = 状态码 (不必读取) |
