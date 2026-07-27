# 天使之翼 (Captain Tsubasa) NES 游戏逻辑 Step 分析

> 基于 `tsubasa-hex2asm` 已验证可跑的源代码 trace 而来  
> 对应 ROM: MMC3 mapper 4, 256KB PRG, 128KB CHR

---

## 整体架构

```
┌──────────────────────────────────────────────────────┐
│  6502 硬件层 (不模拟)                                 │
│  ├── CPU (6502)                                      │
│  ├── PPU (2C02)                                      │
│  └── APU (2A03)                                      │
└──────────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────────┐
│  启动层 (Bank 31 $C000-$FFFF)                        │
│  ├── RESET $FFF0 → $C64E  硬件初始化 + 内存清零      │
│  └── $C400  PPU 显示配置                             │
└──────────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────────┐
│  场景引擎层 (Bank 0 $8000-$9FFF)                     │
│  ├── $800D  分派跳转表 (via $27 dispatch index)      │
│  ├── $8017  $27=0: 场景初始化 (根据 $26 查表)        │
│  ├── $80DF  $27=1: 标题画面 / 场景过场状态机         │
│  ├── $81D4  $27=2: 场景脚本推进                      │
│  ├── $8464  场景脚本 bytecode 解释器                  │
│  └── $83DC-$8463  场景进度控制表                      │
└──────────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────────┐
│  比赛引擎层 (Bank 1 $8000-$9FFF)                     │
│  ├── $8003  球员数据初始化                           │
│  ├── $80EC  比赛主循环                               │
│  ├── $822B  过人/跳跃计算                            │
│  └── $90F6  bytecode 命令分派                        │
└──────────────────────────────────────────────────────┘
                         │
┌──────────────────────────────────────────────────────┐
│  NMI 渲染层 (Bank 2 $8000-$9FFF)                     │
│  ├── $8000  NMI 入口: OAM DMA + scroll                │
│  ├── $8073  PPU scroll 寄存器更新                     │
│  └── $8107  joypad 读取 + 随机种推进                 │
└──────────────────────────────────────────────────────┘
```

---

## Step 1: RESET 向量入口

**ROM 地址**: `$FFF0` (Bank 31, 固定后 16KB: `$C000-$FFFF`)

```asm
; $FFF0 (RESET / NMI / IRQ 共用入口)
LDA #$00        ; MMC3 bank 选择模式 = 0
STA $8000       ; 写入 MMC3 寄存器
JMP $C503       ; 间接跳转到主初始化
```

Mapped to `tsubasanes` → `boot.ts`: `boot()` 函数

---

## Step 2: 主初始化流程图

**ROM 地址**: `$C64E` → `$CEFE` → `$C400` (Bank 31)

```
$C503:  JMP $C64E       ; → 主初始化

$C64E (init):
  ├── 等待 PPU 两帧 VBlank 稳定 (LDA $2002, BPL loop)
  ├── SEI              ; 关中断
  ├── CLD              ; 关闭十进制模式
  ├── LDX #$FF, TXS    ; 栈指针 → $01FF
  ├── 清零 $0000-$07FF  ; ZP ($0000-$00FF) + WRAM ($0200-$07FF)
  ├── 清零 VRAM         ; 写 $2007 填充 nametables
  ├── 关闭 APU          ; 写 $4015 = 0
  ├── MMC3 映射初始化   ; 写 $8000 / $8001 设置 bank
  ├── CLI              ; 开中断
  └── JMP $CEFE

$CEFE:  JMP $C400       ; → PPU 设置

$C400:
  ├── LDA #$08, STA $2000  ; PPUCTRL: NMI off, BG tile $0000, VRAM inc +1
  ├── LDA #$1E, STA $2001  ; PPUMASK: show BG + sprites
  ├── LDA #$00, STA $2005  ; scroll X = 0
  ├── STA $2005             ; scroll Y = 0
  └── JMP $A200             ; → Bank 1 主循环地址 (实际跳转)
```

Mapped to `tsubasanes` → `engine.ts`: `reset()` 方法

- PPU: `ppuCtrl(0x08)`, `ppuMask(0x1e)`, `ppuScroll(0, 0)`
- 内存: `clearMem()`
- MMC3: `createMmc3()`, `initMmc3()`

---

## Step 3: 场景分派引擎入口

**ROM 地址**: `$800D` (Bank 0, CPU `$8000-$9FFF`)

初始化完成后，实际进入 Bank 0 的场景引擎。`$26` = 当前场景编号, `$27` = 分派子状态。

### 3.1 分派跳转表 (`$800D`)

```asm
$800D:
  LDA $27          ; dispatch index
  ASL              ; ×2 (word table)
  TAX
  LDA $800E, X     ; 取高字节
  PHA
  LDA $800D, X     ; 取低字节
  PHA
  RTS              ; → 间接跳转到目标地址
```

跳转表地址映射:

| $27 | ROM 地址 | 功能 | 场景 |
|-----|---------|------|------|
| 0 | `$8065` (`$8017`) | 场景初始化 (根据 $26 查表加载) | - |
| 1 | `$818A` | 场景过场状态机 | title, cutscene |
| 2 | `$81AD` | 场景脚本推进 | story advance |
| 3 | `$81B4` | 比赛引擎 | match |
| 4 | `$81DA` | 赛后结算 | result |

### 3.2 $27=0: 场景初始化

```asm
$8017:
  LDX #02
  JSR $C4B9       ; MMC3 bank 切换到 X=2
  JMP $A203       ; JMP to Bank 1 init → then back
  ; ...
  ; 清零各种状态变量:
  STA $05, STA $06, STA $09, STA $0A
  STA $11, STA $12, STA $0D, STA $0E
  STA $4C, STA $5B
  ; ...
  ; 根据 $26 (scene number) 查场景进度表
  LDX $26
  LDA $83DC, X    ; 查表 → 下一场景
  ...
```

**场景编号表 `$83DC`** (对应 `$26`):

| $26 | 场景 | 描述 |
|-----|------|------|
| 0 | TECMO_LOGO | 游戏启动 Logo |
| 2 | TITLE | 标题画面 |
| 6 | OPENING | 开场动画 |
| 7 | - | - |
| 12 | MATCH | 第1场比赛 |
| 14 | - | - |
| 16 | RESULT | 比赛结果 |
| 18 | - | - |
| 24 | STORY | 剧情 demo |
| 30 | - | - |
| 32 | ENDING | 通关画面 |

Mapped to `tsubasanes` → `scene/manager.ts`: `switchImmediate(SceneId.TECMO_LOGO)`

---

## Step 4: 场景 bytecode 解释器

**ROM 地址**: `$8464` (Bank 0) — 核心驱动

每个场景都有一段 bytecode 脚本，由这个解释器逐指令执行。

```asm
$8464 (bytecode 入口):
  LDY #0
  ; 查找匹配的脚本编号 (从 $8AEC-$8AEE 表)
$8467:
  INY, INY
  CMP $8AEC, Y     ; 比较编号
  BCS $8467        ; 继续找
  SEC
  SBC $8AEC, Y
  LDX $8AED, Y     ; 取高字节
  ASL              ; ×2
  ADC #00
  STA $4D          ; $4D-$4E = bytecode 指针
  LDA #0
  ADC #$A0         ; 基址 $A000
  STA $4E

  STX $56
  ; 继续执行 bytecode 指令...
```

### Bytecode 指令集 (opcode 范围)

| Opcode | 指令含义 |
|--------|---------|
| `$00-$D7` | 写入 VRAM: 高 3 位 = 行数, 低 5 位 = 列号 → 复制 tiles 数据 |
| `$D8-$E0` | 控制字: D8=分支1, D9=分支2, DA=分支3 ... |
| `$E1-$E7` | 设置文本位置/行 |
| `$E8-$FF` | 系统命令: 跳转、等待帧、调用子程序等 |

**关键系统命令**:
| Opcode | 含义 | `$8545` 跳转表目标 |
|--------|------|---------------------|
| E8 | 调用子场景脚本 | $8575 |
| E9 | 设置 PPU 属性表 | $857F |
| EA | 清空 nametable | $858C |
| EB | 设置精灵布局 | $85C3 |
| EC | 等待 VBlank | $85D1 |
| ED | 设置滚动 | $85EB |
| EE | 播放音乐 | $8603 |
| EF | 播放音效 | $8617 |
| F0 | 设置调色板 | $862B |
| F1 | 设置 sprite 0 | $8649 |
| F2 | 切换 MMC3 bank | $8677 |
| F3 | 设置文本速度 | $8681 |
| F4 | 跳转到指定地址 | $86B7 |
| F5 | 等待 N 帧 | $87CA |
| F6 | 设置 game 参数 | $87D8 |
| F7 | 读取输入 | $87F7 |

### Bytecode 文本渲染 (`$88CA`)

负责将 bytecode 中的文本数据写入 VRAM 的 nametable:

```asm
$88CA:
  ; 每字节可能是:
  ; $00-$9F: 直接字符 (查字体表)
  ; $A0-$BF: 特殊控制 (换行/颜色/等待)
  ; $C0-$DF: 分支跳转
  ; $E0-$FF: 结束指令
```

---

## Step 5: 每帧主循环

### 5.1 NMI 入口 (Bank 2 `$8000`)

每帧 VBlank 触发 NMI → Bank 2 NMI handler:

```asm
$8000 (NMI):
  LDA #00, STA $2003   ; OAMADDR = 0
  LDA #02, STA $4014   ; OAMDMA (复制 sprite 数据)
  
  ; 处理 OAM 缓冲区 $05E8-$0629
  ; 逐条写入 PPU OAM
  ...
  
  ; 滚动寄存器更新
  LDA $45, LSR         ; coarse X bit  
  ROL                  ; nametable select
  STA $20              ; PPUCTRL
  LDA $7B, LSR
  ROL
  ROL
  ; ...
  LDA $7A, STA $2005   ; scroll X
  LDA $44, STA $2005   ; scroll Y

  ; MMC3 bank 切换
  LDA #02, STA $8000
  LDA $9E, STA $8001
  LDA #03, STA $8000
  LDA $9F, STA $8001

  ; Joypad 读取
  ; ...
  ; 随机数推进 ($E1-$E3)
  LDA $E1, ADC #$83, STA $E1
  LDA $E2, ADC #$0D, STA $E2
  LDA $E3, ADC #$11, STA $E3
  
  LDA $1B, ORA #$80, STA $1B  ; NMI done flag
  INC $3A                     ; frame counter
  RTI
```

### 5.2 主循环等待

```asm
; 游戏主循环 (每个 bank 都有类似的等待循环)
wait_nmi:
  LDA #01
  JSR delay_frame   ; wait 1 frame
  LDA $1E            ; joypad press
  BIT $1E
  ; ... check buttons ...
  ; 等待 NMI flag
  LDA $1B, BPL wait_nmi
  LDA $1B, AND #$7F, STA $1B  ; clear NMI flag
```

Mapped to `tsubasanes` → `engine.ts`: `tick()` = 每帧循环
- 输入 → `_mapInput()`
- 场景更新 → `scenes.update()`
- PPU 渲染 → `ppu.render()`
- 输出 → `renderToCanvas()` / `onFrame()`

---

## Step 6: 比赛引擎 (Bank 1 `$8000`)

当场景切换到比赛 ($27=3) 时，MMC3 切换到 Bank 1。

### 6.1 比赛入口流程

```asm
$8003:
  JMP $A10D      ; RTS 跳转技巧，实际跳到 Bank 1 各子程序

; 子程序跳转表:
$8003: 比赛初始化入口  → $A10D
$8006: 过场渲染       → $A4EB
$8009: 球员移动       → $A64C
$800C: 射门计算       → $A6D2
$800F: AI 策略       → $AFC2
$8012: 守门员判断     → $AF79
$8015: 受伤/犯规      → $AF8A
$8018: 结束处理       → $B050

; 球员数据计算 $801B:
  LDA $0448          ; 比赛类型 (友谊赛/联赛)
  LSR
  LDA $26            ; 当前场景 = 比赛场景号
  ROL
  ADC $0446          ; 难度/队伍信息
  ROL
  STA $0660          ; 合并标志
  LDA $044D          ; 主队/客队
  ROR
  LDA $E1            ; 随机数
  ROR
  AND #$B0
  STA $0661          ; 初始化参数
```

### 6.2 球员状态机 `$80EC`

```asm
$80EC:
  ; 每个球员 (0-17, 共18个) 依次处理
  ; 球员属性从 ROM 数据表读取:
  ; $0566-$05XX: 球员状态 (位置/体力/持球等)
  ; 每 4 字节一个球员:
  ;   +0: X 坐标 pixel
  ;   +1: sprite 属性
  ;   +2: 方向/flags
  ;   +3: Y 坐标
```

**球员数据格式 (每 2 字节)**:
```
Byte 0: 低 4 位 = 某种属性 index, 高 2 位 = sprite 属性
Byte 1: 属性值
```

### 6.3 过人/跳跃判断 `$822B`

```asm
$822B:
  LDA $0648          ; 当前动作类型
  ...
  ; 根据 joystick 输入执行不同动作:
  ; $0468-$046B: 球的位置 (X/Y)
  ; $1C: joypad 状态
  ; $1E: joypad press
```

### 6.4 bytecode 命令分派 `$90F6`

```asm
$90F6:
  ; 类似 Bank 0 的 bytecode，但指令更偏比赛逻辑
  ; 跳转表:
  .dw $B0F7  ; 命令 0: JSR to sub
  .dw $B102  ; 命令 1: set VRAM
  .dw $B113  ; 命令 2: set palette
  .dw $B11E  ; 命令 3: scroll
  .dw $B12F  ; 命令 4: clear screen
  .dw $B13B  ; 命令 5: text box
  .dw $B14D  ; 命令 6: sprite layout
  .dw $B160  ; 命令 7: sound
  .dw $B173  ; 命令 8: music
  .dw $B186  ; 命令 9: wait frames
  .dw $B199  ; 命令 A: branch
  .dw $B1A4  ; 命令 B: end/cmd
  .dw $B1AC  ; 命令 C: jump
  .dw $B1BA  ; 命令 D: return
```

---

## Step 7: 完整启动序列 (Power-On → 游戏画面)

```
┌───────────────────────────────────────────────────┐
│ ROM 复位 $FFF0                                     │
│   LDA #0, STA $8000  (MMC3 模式 0)               │
│   JMP $C503                                       │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ $C503 → $C64E  硬件初始化                          │
│   · 等待 2 帧 VBlank                               │
│   · SEI, CLD, TXS ($01FF)                         │
│   · 清零 $0000-$07FF                               │
│   · 清零 VRAM (4 个 nametables)                    │
│   · 音频静音                                       │
│   · MMC3 映射                                      │
│   · CLI                                            │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ $CEFE → $C400  PPU 配置                            │
│   · PPUCTRL = $08 (NMI off, BG=$0000)             │
│   · PPUMASK = $1E (BG + sprites on)               │
│   · scroll = (0, 0)                                │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ 进入 Bank 0 场景引擎                               │
│   $26 = 0 (TECMO_LOGO)                            │
│   $27 = 0 (场景初始化)                             │
│   · 查 $83DC 表获取 init 脚本编号                  │
│   · 设置 $8464 bytecode 解释器                     │
│   · 加载 CHR 数据                                   │
│   · 加载调色板                                      │
│   · 加载 nametable from ROM                       │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ Bytecode 解释器执行                                 │
│   · 渲染标题文本                                   │
│   · 播放 Logo 音效                                  │
│   · 等待 N 帧 / 等待按键                           │
│   · 完成后 $26++ → 下一场景                        │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ 场景推进 $27 = 1                                   │
│   $26 = 2  标题画面                                │
│   · 显示菜单                                       │
│   · 等待玩家选择                                   │
│   · 新游戏 → 设置进度变量                          │
│   · 继续 → 读取 SRAM                               │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ 场景推进 $27 = 2                                   │
│   $26 = 6  开场动画                                │
│   · 加载过场文本                                   │
│   · 播放动画                                       │
│   · $26 递增遍历故事场景                           │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ 场景推进 $27 = 3                                   │
│   $26 = 12  第 1 场比赛                            │
│   · MMC3 切换到 Bank 1                             │
│   · 初始化球员位置和数据                           │
│   · 进入比赛主循环                                  │
│   · 用户操作 → 过人/传球/射门                      │
│   · AI 操作                                         │
│   · 半场/终场判断                                  │
└──────────┬────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────┐
│ 场景推进 $27 = 4                                   │
│   赛后结算                                          │
│   · 显示比分                                       │
│   · 经验值计算                                     │
│   · 进入下一场比赛或故事                           │
└───────────────────────────────────────────────────┘
```

---

## Step 8: VRAM 布局

| 地址范围 | 大小 | 内容 |
|---------|------|------|
| `$0000-$0FFF` | 4KB | Pattern Table 0 (BG tiles, MMC3 switchable) |
| `$1000-$1FFF` | 4KB | Pattern Table 1 (sprite tiles, MMC3 switchable) |
| `$2000-$23FF` | 1KB | Nametable A (top-left) |
| `$2400-$27FF` | 1KB | Nametable B (top-right) |
| `$2800-$2BFF` | 1KB | Nametable C (bottom-left) |
| `$2C00-$2FFF` | 1KB | Nametable D (bottom-right) |
| `$3F00-$3F1F` | 32B | 调色板 (BG: 16色 + Sprite: 16色) |

---

## Step 9: Zero-Page 关键变量

| 地址 | 名称 | 说明 |
|------|------|------|
| `$1B` | nmi_flag | bit7=NMI 完成, bit0=帧奇偶 |
| `$1C` | joy_press | 当前帧按键 (A/B/Sel/Start/Up/Down/Left/Right) |
| `$1E` | joy_edge | 按键上升沿 (刚按下) |
| `$20` | ppu_ctrl | PPUCTRL 镜像 |
| `$21` | ppu_mask | PPUMASK 镜像 |
| `$26` | scene_id | 当前场景编号 |
| `$27` | dispatch | 分派子状态 (0-4) |
| `$28` | param_lo | 通用参数低 |
| `$29` | param_hi | 通用参数高 |
| `$44` | scroll_y | 滚动 Y fine |
| `$45` | scroll_ytile | 滚动 Y coarse + NT select |
| `$4D` | bytecode_ptr_lo | bytecode 指针低 |
| `$4E` | bytecode_ptr_hi | bytecode 指针高 |
| `$4C` | time_delay | 通用帧延时计数器 |
| `$7A` | scroll_x_fine | 滚动 X fine |
| `$7B` | scroll_x_coarse | 滚动 X coarse |
| `$8E` | sprite_ptr_lo | 精灵指针低 |
| `$8F` | sprite_ptr_hi | 精灵指针高 |
| `$90` | sprite_bank_lo | 精灵 bank 低 |
| `$91` | sprite_bank_hi | 精灵 bank 高 |
| `$99` | mirroring | 镜像控制 (bit7=水平/垂直) |
| `$E1-$E3` | rng_state | 24-bit 随机数状态 |
| `$E4` | max_scene | 已解锁最高场景 |
| `$E0` | scene_flags | 场景流程标志 |

---

## Step 10: 对应到 tsubasanes 的语义映射

| ROM 层 | ROM 地址 | tsubasanes 文件 | 函数/类 |
|--------|---------|-----------------|---------|
| RESET 向量 | `$FFF0` | `boot.ts` | `boot()` |
| 硬件初始化 | `$C64E` | `engine.ts` | `Engine.reset()` |
| PPU 配置 | `$C400` | `engine.ts` | `reset()` 内 ppuCtrl/ppuMask/ppuScroll |
| 场景分派 | `$800D` (Bank 0) | `scene/manager.ts` | `SceneManager.switchImmediate()` |
| 场景初始化 | `$8017` (Bank 0) | `scene/manager.ts` | `SceneManager.update()` |
| bytecode 解释器 | `$8464` (Bank 0) | `scene/` 各场景文件 | `Scene.update()` 中的逻辑 |
| 标题画面 | `$80DF` (Bank 0) | `scene/title.ts` | `TitleScene` |
| 开场动画 | `$80DF` (Bank 0) | `scene/opening.ts` | `OpeningScene` |
| 比赛引擎 | `$8000` (Bank 1) | 待实现 | - |
| NMI 渲染 | `$8000` (Bank 2) | `ppu/ppu.ts` | `Ppu.render()` |
| 输入读取 | `$8107` (Bank 2) | `core/input.ts` | `createJoypad()` |
| MMC3 管理 | `$9EED` (Bank 0/2) | `core/mmc3.ts` | `mmc3Write()` |
| 内存管理 | ZP + WRAM | `core/memory.ts` | `wram`, `zp`, `clear()` |

---

## 附录: MMC3 Bank 映射总览

| Bank # | CPU 窗口 | 功能 | 文件 |
|--------|---------|------|------|
| 0 | `$8000-$9FFF` | 场景引擎 + bytecode | `prg_bank_00_dispatch_scene_engine.ts` |
| 1 | `$8000-$9FFF` | 比赛引擎 + 跳跃 | `prg_bank_01_match_jump.ts` |
| 2 | `$8000-$9FFF` | NMI 渲染器 | `prg_bank_02_nmi_renderer.ts` |
| 3-29 | 可变 | 数据: 场景数据/球员属性/文本/图形 | 各 bank |
| 30 | `$8000-$9FFF` | 系统库 (通用子程序) | `prg_bank_30_system_lib.ts` |
| 31 | `$C000-$FFFF` | 启动向量 + 初始化 | `prg_bank_31_boot_vectors.ts` |
