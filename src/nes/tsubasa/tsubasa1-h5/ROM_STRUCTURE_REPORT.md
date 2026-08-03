# 天使之翼 (Captain Tsubasa) NES ROM 结构分析报告

> **版本**: v1.0  
> **日期**: 2026-08-03  
> **ROM文件**: `Captain Tsubasa (Japan).nes`  
> **对应游戏**: キャプテン翼 (Captain Tsubasa / 天使之翼) - Famicom版

---

## 目录

1. [NES Header 分析](#1-nes-header-分析)
2. [Mapper 分析 (MMC1)](#2-mapper-分析-mmc1)
3. [PRG-ROM Bank 布局](#3-prg-rom-bank-布局)
4. [CHR-ROM Bank 布局](#4-chr-rom-bank-布局)
5. [中断向量与启动流程](#5-中断向量与启动流程)
6. [内存映射 (Memory Map)](#6-内存映射-memory-map)
7. [Bank 切换机制](#7-bank-切换机制)
8. [各 Bank 详细分析](#8-各-bank-详细分析)
9. [H5 转写架构设计](#9-h5-转写架构设计)

---

## 1. NES Header 分析

```
偏移量  字节数  字段             值           说明
------  ------  ---------------  -----------  ----------------------------
$0000   4       Magic            NES\x1A      NES 文件标识
$0004   1       PRG-ROM 大小     0x08         8 个 Bank × 16KB = 128KB
$0005   1       CHR-ROM 大小     0x10         16 个 Bank × 8KB = 128KB
$0006   1       Flags 6          0x10         Mapper 低4位=0, 水平镜像, Battery=0
$0007   1       Flags 7          0x08         NES 2.0 标识, Mapper 高4位=1
$0008   1       PRG-RAM 大小     0x00         无额外 PRG-RAM
$0009   1       Flags 9          0x00         PAL=NTSC
$000A   1       Flags 10         0x00         未使用
```

**ROM 文件总大小**: 262,160 字节 (16 字节 Header + 131,072 字节 PRG + 131,072 字节 CHR)

### Flags 6 详细解析 (0x10 = 0b0001_0000):

| 位   | 值 | 含义                         |
|------|----|------------------------------|
| 0    | 0  | 水平镜像 (Horizontal)        |
| 1    | 0  | 无 Battery-backed PRG-RAM    |
| 2    | 0  | 无 Trainer                   |
| 3    | 0  | 四屏幕镜像: 否               |
| 4-7  | 0  | Mapper 编号低4位 = 0         |

### Flags 7 详细解析 (0x08 = 0b0000_1000):

| 位   | 值 | 含义                         |
|------|----|------------------------------|
| 0-1  | 0  | VS Unisystem: 否             |
| 2-3  | 0  | NES 2.0 标识 (10=是)        |
| 4-7  | 1  | Mapper 编号高4位 = 1         |

**完整 Mapper 编号**: `(0x08 >> 4) << 4 | 0x10 & 0x0F = 1 << 4 | 0 = 1` → **MMC1 (Mapper #1)**

---

## 2. Mapper 分析 (MMC1)

### 2.1 MMC1 概述

MMC1 (Memory Management Controller 1) 是任天堂官方设计的第一个 ASIC mapper 芯片（型号 SxROM），广泛应用于 NES/FC 游戏。

### 2.2 MMC1 寄存器

MMC1 有 4 个内部寄存器，通过向 `$8000-$FFFF` 写入数据来配置（写 5 次组成一个完整的配置字，因为 MMC1 使用串行接口）：

| 寄存器 | CPU 地址范围 | 功能                                       |
|--------|-------------|--------------------------------------------|
| R0     | $8000-$9FFF | 控制寄存器 (Mirroring, PRG模式, CHR模式)   |
| R1     | $A000-$BFFF | CHR Bank 0 选择 (PPU $0000-$0FFF)         |
| R2     | $C000-$DFFF | CHR Bank 1 选择 (PPU $1000-$1FFF)         |
| R3     | $E000-$FFFF | PRG Bank 选择                              |

### 2.3 R0 控制寄存器

```
位   功能
---  ------------------------------
0-1  Mirroring: 0=单屏A, 1=单屏B, 2=垂直, 3=水平
2    PRG-ROM Bank 模式: 0=32KB, 1=16KB
3    CHR-ROM Bank 模式: 0=8KB, 1=4KB
4    未使用
```

### 2.4 本游戏 MMC1 配置

从 RESET 代码分析，游戏使用：

- **Mirroring**: 水平镜像 (Mirroring = 3，由 header 中硬连线决定，但 MMC1 可覆盖)
- **PRG 模式**: 16KB 模式 (R0 bit2=1)，固定 Bank 在 $C000-$FFFF，可切换 Bank 在 $8000-$BFFF
- **CHR 模式**: 4KB 模式 (R0 bit3=1)，PPU $0000-$0FFF 和 $1000-$1FFF 分别可切换

---

## 3. PRG-ROM Bank 布局

```
Bank #  ROM 偏移    CPU 地址范围      大小     类型      说明
------  ----------  ----------------  ------  --------  -----------------------------------
PRG $00 $00000      $8000-$BFFF       16KB    可切换    游戏主循环/NMI/核心逻辑 (Bank 0)
PRG $01 $04000      $8000-$BFFF       16KB    可切换    游戏场景/菜单逻辑 (Bank 1)
PRG $02 $08000      $8000-$BFFF       16KB    可切换    NMI 图形处理/比赛逻辑 (Bank 2)
PRG $03 $0C000      $8000-$BFFF       16KB    可切换    数据表/动画数据 (Bank 3)
PRG $04 $10000      $8000-$BFFF       16KB    可切换    比赛流程/AI逻辑 (Bank 4)
PRG $05 $14000      $8000-$BFFF       16KB    可切换    数据表/角色数据 (Bank 5)
PRG $06 $18000      $8000-$BFFF       16KB    可切换    比赛事件/特殊技 (Bank 6)
PRG $07 $1C000      $C000-$FFFF       16KB    固定     固定Bank (中断向量/RESET/跳转表)
```

### PRG 映射关系

在 MMC1 16KB 模式下：
- **$8000-$BFFF**: 可切换 Bank（通过 R3 寄存器选择 Bank 0-7 之一）
- **$C000-$FFFF**: 固定 Bank（始终为 PRG $07 / 最后一个 16KB Bank）

---

## 4. CHR-ROM Bank 布局

```
CHR Bank #  ROM 偏移    PPU 地址范围      大小     非零字节数  推测内容
----------  ----------  ----------------  ------  ----------  ----------------------
CHR $00     $20000      $0000-$1FFF       8KB     5474        标题/菜单图形
CHR $01     $22000      $0000-$1FFF       8KB     6470        球员精灵
CHR $02     $24000      $0000-$1FFF       8KB     6473        球场/背景
CHR $03     $26000      $0000-$1FFF       8KB     6106        字体/UI元素
CHR $04     $28000      $0000-$1FFF       8KB     6018        球员动作帧
CHR $05     $2A000      $0000-$1FFF       8KB     5867        特效/动画
CHR $06     $2C000      $0000-$1FFF       8KB     6276        球员动作帧
CHR $07     $2E000      $0000-$1FFF       8KB     6384        球员动作帧
CHR $08     $30000      $0000-$1FFF       8KB     6015        剧情对话图形
CHR $09     $32000      $0000-$1FFF       8KB     6237        球员/场景
CHR $0A     $34000      $0000-$1FFF       8KB     5462        特写/过场
CHR $0B     $36000      $0000-$1FFF       8KB     5753        比赛图形
CHR $0C     $38000      $0000-$1FFF       8KB     6290        比赛图形
CHR $0D     $3A000      $0000-$1FFF       8KB     5202        球员特写
CHR $0E     $3C000      $0000-$1FFF       8KB     6328        比赛图形
CHR $0F     $3E000      $0000-$1FFF       8KB     (未统计)    备用/结尾
```

### CHR 映射关系

在 MMC1 4KB CHR 模式下：
- **PPU $0000-$0FFF** (Pattern Table 0): 通过 R1 寄存器选择 CHR Bank N
- **PPU $1000-$1FFF** (Pattern Table 1): 通过 R2 寄存器选择 CHR Bank N

---

## 5. 中断向量与启动流程

### 5.1 中断向量表 (位于 PRG Bank $07 末尾)

```
地址       向量值      说明
--------  ----------  ------------------------------
$FFFA     $8002       NMI 向量 → Bank $00 的 NMI 入口
$FFFC     $FFC0       RESET 向量 → Bank $07 的启动代码
$FFFE     $8002       IRQ/BRK 向量 → 同 NMI 入口
```

### 5.2 RESET 启动流程

```
$FFC0 (Bank $07 - 固定Bank):
  ├── SEI              ; 禁用中断
  ├── CLD              ; 清除十进制模式
  ├── LDA #$10
  ├── STA $2000        ; 配置 PPU (NMI禁用, 使用Pattern Table 0)
  ├── LDA #$80
  ├── STA $8000        ; MMC1 复位 (写带bit7=1的值到$8000)
  ├── LDA #$1A         ; MMC1 控制字:
  │   LDX #$05         ;   bit4-3=11: 水平镜像
  │   STA $8000        ;   bit2=1: 16KB PRG模式
  │   LSR A            ;   bit3=1: 4KB CHR模式
  │   DEX              ;   循环5次完成MMC1串行写入
  │   BNE loop         ;
  └── JMP ($8000)      ; 跳转到 $8000 (Bank $00 入口)
```

### 5.3 Bank $00 启动流程 ($809B)

```
$809B (Bank $00):
  ├── SEI              ; 禁用中断
  ├── CLD              ; 清除十进制模式
  ├── 等待 VBlank (两次 $2002 轮询)
  ├── LDX #$FF / TXS   ; 初始化堆栈指针
  ├── LDA #$06
  ├── STA $2001        ; PPUMASK: 显示背景+精灵(左8列裁剪)
  ├── 清零 $0000-$07FF  ; 清零内部RAM (Zero Page + Stack + 部分WRAM)
  ├── 初始化 $16-$19   ; 滚动/控制变量
  │   $16 = 0, $17 = 0 (Scroll X/Y)
  │   $19 = $10 (PPUCTRL 基础值)
  │   $18 = $06 (PPUMASK 基础值)
  ├── JSR $82CC        ; 初始化 PPU 写入缓冲区指针
  ├── JSR $8371        ; 初始化 OAM (精灵属性内存)
  ├── JSR $838F        ; 清除 PPU Name Table 和 Attribute Table
  ├── JSR $82F5        ; 启用 NMI
  └── JMP $81EE        ; 进入主游戏循环
```

### 5.4 NMI 处理流程 ($80E0)

```
$80E0 (Bank $00 - NMI入口):
  ├── PHA              ; 保存 A
  ├── JSR $82EB        ; 禁用 NMI (清除 $19 bit7)
  ├── STA $2001        ; 应用 PPUMASK
  ├── TXA / PHA        ; 保存 X
  ├── TYA / PHA        ; 保存 Y
  ├── LDA #$00
  ├── STA $2003        ; OAMADDR = 0
  ├── LDA #$02
  ├── STA $4014        ; OAMDMA = $02 (从 $0200 传输256字节精灵数据)
  ├── JSR $812F        ; 处理 PPU 写入队列
  ├── JSR $81B9        ; 读取手柄输入
  ├── JSR $82AD        ; 随机数生成器更新
  ├── 如果 $93==0:
  │   ├── 设置 PPU Scroll ($1A/$1B)
  │   ├── 切换 MMC1 Bank (通过 $83C7)
  │   └── JSR $DB00    ; 切换 Bank 后调用
  ├── LDA #$00
  ├── STA $05FA        ; 清除某标志
  ├── INC $0300        ; 帧计数器++
  ├── 恢复 Y, X
  ├── JSR $82F5        ; 重新启用 NMI
  ├── LDA $2002        ; 读取 PPUSTATUS (清除 VBlank 标志)
  ├── PLA              ; 恢复 A
  └── RTI              ; 中断返回
```

### 5.5 主游戏循环 ($81EE)

```
$81EE:
  ├── JSR $8314        ; 等待 VBlank (等待 $0300 非零)
  ├── JSR $81F7        ; 执行当前游戏状态逻辑
  └── JMP $81EE        ; 无限循环
```

---

## 6. 内存映射 (Memory Map)

### 6.1 CPU 内存映射

```
地址范围        大小     说明
--------------  ------  -------------------------------------------
$0000-$00FF     256B    Zero Page - 游戏核心变量
$0100-$01FF     256B    堆栈区 ($01FF-$0100, 向下增长)
$0200-$02FF     256B    OAM 镜像 (精灵属性内存)
$0300-$07FF     1.25KB  通用工作 RAM
$2000-$2007     8B      PPU 寄存器
$2008-$3FFF     ~8KB    PPU 寄存器镜像
$4000-$4017     18B     APU + 手柄寄存器
$4018-$5FFF     ~8KB    扩展区域 (未使用)
$6000-$7FFF     8KB     SRAM (本游戏未使用)
$8000-$BFFF     16KB    PRG-ROM 可切换 Bank
$C000-$FFFF     16KB    PRG-ROM 固定 Bank
```

### 6.2 关键 Zero Page 变量 (从反汇编分析)

| 地址   | 变量名推测 | 用途                                       |
|--------|-----------|--------------------------------------------|
| $00-$01 | ptr       | 通用指针                                   |
| $02-$07 | tmp       | 临时变量                                   |
| $10-$11 | ret_addr  | 返回地址暂存                               |
| $12-$13 | ppu_ptr   | PPU 写入队列指针                           |
| $14-$15 | jmp_ptr   | 跳转表指针                                 |
| $16      | scroll_x  | PPU 水平滚动                               |
| $17      | scroll_y  | PPU 垂直滚动                               |
| $18      | ppu_mask  | PPUMASK 缓存值                             |
| $19      | ppu_ctrl  | PPUCTRL 缓存值                             |
| $1A      | bank_l    | MMC1 Bank 选择低字节                       |
| $1B      | bank_m    | MMC1 Bank 选择中字节                       |
| $1C      | bank_h    | MMC1 Bank 选择高字节                       |
| $3A      | acc_temp  | 累加器暂存                                 |
| $93      | mmc1_lock | MMC1 写入锁                                |

### 6.3 关键 RAM 变量 ($0300-$07FF)

| 地址范围        | 用途                                       |
|----------------|-------------------------------------------|
| $0300           | 帧计数器 (每 NMI 递增)                    |
| $0301-$0302     | 手柄1 当前/前一帧状态                      |
| $0303-$0304     | 手柄2 当前/前一帧状态                      |
| $0305           | PPU 写入队列长度                           |
| $0306-$0317     | PPU 写入队列 (地址/数据对)                 |
| $0318-$0337     | 调色板缓冲区                               |
| $0339           | PPU 批量写入队列长度                       |
| $033A-$03??     | PPU 批量写入队列                           |
| $03CA           | 游戏状态机编号                             |
| $03CB           | 子状态/场景编号                            |
| $03D6           | 动画帧索引                                 |
| $05BA-$05BB     | 随机数种子                                 |
| $05FA           | 临时标志                                   |
| $05FB-$05FC     | 间接跳转指针                               |
| $06xx           | 比赛相关数据 (比分、球员状态等)            |
| $07xx           | 球员属性数据                               |

---

## 7. Bank 切换机制

### 7.1 MMC1 Bank 切换代码

游戏通过以下函数切换 PRG Bank：

```asm
$83C5: STA $1C        ; 保存 Bank 选择值
$83C7: ORA #$60       ; 添加 MMC1 R3 寄存器标识 (bit5-6)
       JSR $83FD      ; 执行 MMC1 写入
       RTS

$83FD: LDX $93        ; 检查 MMC1 锁
       BNE $8417      ; 如果锁住则跳过
       LDX #$05       ; 5次串行写入
       STX $93        ; 设置锁
       TAX
       AND #$60       ; 提取寄存器选择位
       ORA #$9F       ; 构建地址高字节
       STA $9F
       LDY #$FF
loop:  TXA
       STA ($9E),Y    ; 实际地址 = $9FFF (带 bit7 数据位)
       NOP
       LSR A          ; 右移准备下一位
       DEC $93
       BNE loop
       RTS
```

### 7.2 Bank 切换时机

Bank 切换发生在 NMI 处理期间，通过 `$1A/$1B/$1C` 变量控制：
- `$1A`: 控制 CHR Bank 0 (PPU $0000-$0FFF)
- `$1B`: 控制 CHR Bank 1 (PPU $1000-$1FFF)
- `$1C`: 控制 PRG Bank ($8000-$BFFF)

---

## 8. 各 Bank 详细分析

### 8.1 PRG Bank $00 - 核心引擎 (ROM $00000-$03FFF)

**文件**: `bank_00_code.asm` (8,054 行)  
**CPU 地址**: $8000-$BFFF (可切换)  
**功能**: 游戏核心引擎

**跳转表** ($8000-$8098):
```
$8000: 入口/初始化跳转
$8003: JMP $80E0    → NMI 处理入口
$8005: JMP $8314    → 等待 VBlank
$8008: JMP $831F    → 等待多帧
$800B: JMP $82F5    → 启用 NMI
$800E: JMP $82EB    → 禁用 NMI
$8011: JMP $82FF    → 禁用 NMI + 设置 PPUMASK
$8014: JMP $830A    → 启用 NMI + 设置 PPUMASK (显示精灵+背景)
$8017: JMP $834D    → 跳转表分发器
$801A: JMP $8364    → 取负数 (X,Y)
$801D: JMP $8371    → 初始化 OAM
$8020: JMP $838F    → 清除 Name Table
$8023: JMP $8471    → PPU 写入队列添加
$8026: JMP $83FD    → MMC1 寄存器写入
$8029: JMP $ADB2    → (Bank 内函数)
$802C: JMP $8373    → OAM 初始化(带参数)
$802F: JMP $84A3    → PPU 批量写入队列添加
$8032: JMP $812F    → PPU 写入队列处理
$8035: JMP $8418    → 调色板加载
$8038: JMP $841F    → 调色板数据解码
$803B: JMP $8468    → 调色板加载+等待VBlank
$803E: JMP $83E0    → 手柄输入读取(带去抖)
$8041: JMP $8528    → 16位除法
$8044: JMP $84F9    → 16位乘法
$8047: JMP $AB6F    → (Bank 内函数)
$804A: JMP $B240    → (Bank 内函数)
$804D: JMP $B402    → (Bank 内函数)
$8050: JMP $AB7C    → (Bank 内函数)
$8053: JMP $AD66    → (Bank 内函数)
$8056: JMP $AD9A    → (Bank 内函数)
$8059: JMP $84EF    → 声音/数据写入
$805C: JMP $AB94    → (Bank 内函数)
$805F: JMP $B4A8    → (Bank 内函数)
$8062: JMP $B4B1    → (Bank 内函数)
$8065: JMP $827C    → 设置 PPU Bank 选择
$8068: JMP $8281    → 设置 PPU Bank 选择
$806B: JMP $8286    → 设置 PPU Bank 选择
$806E: JMP $8592    → (Bank 内函数)
$8071: JMP $828B    → 间接函数调用
$8074: JMP $8563    → (Bank 内函数)
$8077: JMP $A4CC    → (Bank 内函数)
$807A: JMP $83EE    → Bank $07 数据表读取
$807D: JMP $8295    → MMC1 Bank 切换
$8080: JMP $B934    → (Bank 内函数)
$8083: JMP $A3E3    → (Bank 内函数)
$8086: JMP $8BBB    → (Bank 内函数)
$8089: JMP $88F9    → (Bank 内函数)
$808C: JMP $86D0    → (Bank 内函数)
$808F: JMP $ADEC    → (Bank 内函数)
$8092: JMP $B458    → (Bank 内函数)
$8095: JMP $910F    → (Bank 内函数)
$8098: JMP $A53C    → (Bank 内函数)
```

**核心组件**:
- **RESET 启动代码** ($809B-$80DD)
- **NMI 中断处理** ($80E0-$812E)
- **手柄输入读取** ($81B9-$81ED, 使用 $4016/$4017)
- **PPU 写入队列系统** ($812F-$81B8)
- **主游戏循环** ($81EE-$81F4)
- **游戏状态机** ($81F7-$8263, 状态由 $03CA 索引)
- **随机数生成器** ($82AD-$82CB)
- **PPU 初始化** ($82CC-$82EA, $838F-$83C4)
- **MMC1 控制** ($82EB-$82FE, $83C5-$83CC, $83FD-$8417)
- **调色板系统** ($8418-$8467)
- **16位数学运算** ($84F9-$8527: 乘法, $8528-$8562: 除法)
- **三角函数表** ($84B3-$84D1)

### 8.2 PRG Bank $01 - 场景/菜单逻辑 (ROM $04000-$07FFF)

**文件**: `bank_01_code.asm` (8,615 行)  
**CPU 地址**: $8000-$BFFF (可切换)  
**功能**: 标题画面、菜单系统、剧情选择

**跳转表** ($8000-$8012):
```
$8000: JMP $C015    → 主入口
$8003: JMP $C454    → 子函数
$8006: JMP $CAAA    → 子函数
$8009: JMP $C9FC    → 子函数
$800C: JMP $C6D8    → 子函数
$800F: JMP $806E    → 子函数
$8012: JMP $C535    → 子函数
```

**关键逻辑**:
- 状态机使用 `$03CB` 作为场景/菜单状态索引
- 支持标题画面 → 菜单选择 → 进入比赛的流程
- 包含密码/存档系统 (通过 `$03CB` 判断值)

### 8.3 PRG Bank $02 - NMI/比赛逻辑 (ROM $08000-$0BFFF)

**文件**: `bank_02_nmi.asm` (8,967 行)  
**CPU 地址**: $8000-$BFFF (可切换)  
**功能**: NMI 期间的图形更新、比赛核心逻辑

**跳转表** ($8000-$801B):
```
$8000: JMP $C01E    → 主入口
$8003: JMP $C2FF    → 子函数
$8006: JMP $C355    → 子函数
$8009: JMP $C362    → 子函数
$800C: JMP $C416    → 子函数
$800F: JMP $C375    → 子函数
$8012: JMP $C3BA    → 子函数
$8015: JMP $C3BA    → 子函数 (同上)
$8018: JMP $C7AA    → 子函数
$801B: JMP $C960    → 子函数
```

**关键功能**:
- **比赛精灵渲染** ($801E-$80FF): 将球员数据转换为 OAM 条目
- **图形数据传输** ($8100-$81??): 将 tile 数据写入 PPU
- **球员位置计算**: 将逻辑坐标转换为屏幕坐标
- **图形元数据解析** ($B800-$BFFF 区域): 包含大量 tile 布局数据

### 8.4 PRG Bank $03 - 数据表 (ROM $0C000-$0FFFF)

**文件**: `bank_03_data.asm` (8,789 行)  
**CPU 地址**: $8000-$BFFF (可切换)  
**功能**: 动画数据、角色属性表

**跳转表** ($8000-$8015):
```
$8000: JMP $C018    → 动画数据读取
$8003: JMP $C12D    → 子函数
$8006: JMP $C38F    → 子函数
$8009: JMP $C403    → 子函数
$800C: JMP $FEC0    → 数据表读取
$800F: JMP $FEC3    → 数据表读取
$8012: JMP $FEC6    → 数据表读取
$8015: JMP $C191    → 子函数
```

**关键数据结构**:
- 球员动画帧数据 (通过 `$C000-$CFFF` 区域的跳转表索引)
- 动作脚本 (移动、射门、传球等动画序列)
- 通过 `($31),Y` 间接寻址访问动画数据

### 8.5 PRG Bank $04 - 比赛流程/AI (ROM $10000-$13FFF)

**文件**: `bank_04_code.asm` (9,356 行)  
**CPU 地址**: $8000-$BFFF (可切换)  
**功能**: 比赛流程控制、AI 决策

**跳转表** ($8000-$8008):
```
$8000: JMP $C107    → 主入口
$8003: JMP $C05B    → 子函数
$8006: JMP $C009    → 子函数
```

**关键功能**:
- 比赛状态机 (使用 `$0677`, `$0678` 等变量)
- AI 决策系统
- 比赛事件触发和处理
- 球员移动逻辑

### 8.6 PRG Bank $05 - 数据表 (ROM $14000-$17FFF)

**文件**: `bank_05_data.asm` (8,678 行)  
**CPU 地址**: $8000-$BFFF (可切换)  
**功能**: 角色数据、球队数据

**跳转表** ($8000-$802D):
```
$801E: JMP $C030    → 数据读取入口
$8021: JMP $C38E    → 子函数
$8024: JMP $C26D    → 子函数
$8027: JMP $D600    → 数据表读取
$802A: JMP $D603    → 数据表读取
$802D: JMP $D606    → 数据表读取
```

**关键数据**:
- 球员属性 (体力、速度、射门、传球等)
- 球队阵容
- 比赛脚本数据
- 通过 `$D42F` 开始的指针表访问数据

### 8.7 PRG Bank $06 - 比赛事件/特殊技 (ROM $18000-$1BFFF)

**文件**: `bank_06_code.asm` (7,867 行)  
**CPU 地址**: $8000-$BFFF (可切换)  
**功能**: 特殊技能、比赛事件处理

**跳转表** ($8000-$8009):
```
$8000: JMP $C00C    → 主入口
$8003: JMP $CF97    → 子函数
$8006: JMP $CDFC    → 子函数
$8009: JMP $D27F    → 子函数
```

**关键功能**:
- 必杀技系统 (ドライブシュート等)
- 比赛事件动画
- 球员排序算法 ($805F-$808B: 冒泡排序)
- 比赛数据统计

### 8.8 PRG Bank $07 - 固定Bank (ROM $1C000-$1FFFF)

**文件**: `bank_07_fixed.asm` (8,992 行)  
**CPU 地址**: $C000-$FFFF (固定)  
**功能**: 中断向量、跳转表、共享数据

**关键区域**:
- **$C000-$CFFF**: 数据跳转表 (各种函数指针表)
- **$D000-$FCBF**: 更多数据/代码
- **$FCC0-$FFBF**: 未使用区域 (填充 $00)
- **$FFC0-$FFD9**: RESET 向量代码
- **$FFDA-$FFF9**: 未使用
- **$FFFA-$FFFF**: 中断向量表

**RESET 代码** ($FFC0):
```asm
$FFC0: SEI              ; 禁用中断
$FFC1: CLD              ; 清除十进制模式
$FFC2: LDA #$10         ; PPUCTRL: NMI off, PT0, 递增模式
$FFC4: STA $2000
$FFC7: LDA #$80         ; MMC1 复位序列开始
$FFC9: STA $8000
$FFCC: LDA #$1A         ; MMC1 R0: 水平镜像, 16KB PRG, 4KB CHR
$FFCE: LDX #$05         ; 5 次写入
$FFD0: STA $8000
$FFD3: LSR A
$FFD4: DEX
$FFD5: BNE $FFD0
$FFD7: JMP ($8000)      ; 跳转到 $8000 (Bank $00)
```

---

## 9. H5 转写架构设计

### 9.1 整体架构

```
┌─────────────────────────────────────────────────┐
│                   Game Loop                       │
│  ┌───────────┐  ┌───────────┐  ┌─────────────┐  │
│  │  Input    │→ │  Update   │→ │   Render    │  │
│  │  Manager  │  │  Manager  │  │   Manager   │  │
│  └───────────┘  └───────────┘  └─────────────┘  │
└─────────────────────────────────────────────────┘
         │               │               │
         ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Joypad     │ │  Game State │ │  PPU        │
│  Emulation  │ │  Machine    │ │  Emulation  │
└─────────────┘ └─────────────┘ └─────────────┘
                         │               │
                         ▼               ▼
                ┌─────────────┐ ┌─────────────┐
                │  Bank       │ │  Sprite/    │
                │  Manager    │ │  Tile       │
                └─────────────┘ │  Manager    │
                                └─────────────┘
```

### 9.2 核心模块设计

#### 模块 1: ROM Loader (`RomLoader.ts`)

```typescript
interface NesRom {
  header: NesHeader;
  prgRom: Uint8Array[];   // 8 个 16KB PRG Bank
  chrRom: Uint8Array[];   // 16 个 8KB CHR Bank
}

interface NesHeader {
  prgRomSize: number;     // 8 banks
  chrRomSize: number;     // 16 banks
  mapper: number;         // 1 (MMC1)
  mirroring: 'horizontal' | 'vertical';
  hasBattery: boolean;
}
```

#### 模块 2: MMC1 模拟 (`Mmc1Mapper.ts`)

```typescript
class Mmc1Mapper {
  private shiftRegister: number = 0x10;  // 移位寄存器
  private shiftCount: number = 0;
  
  // 4 个内部寄存器
  private reg0: number = 0x0C;  // 控制寄存器
  private reg1: number = 0;     // CHR Bank 0
  private reg2: number = 0;     // CHR Bank 1  
  private reg3: number = 0;     // PRG Bank
  
  // 配置状态
  prgBankMode: '32KB' | '16KB';   // reg0.2
  chrBankMode: '8KB' | '4KB';     // reg0.3
  mirroring: number;               // reg0.0-1
  
  write(address: number, value: number): void;
  getPrgBank(cpuAddress: number): number;
  getChrBank(ppuAddress: number): number;
  reset(): void;
}
```

#### 模块 3: CPU 内存 (`CpuMemory.ts`)

```typescript
class CpuMemory {
  zeroPage: Uint8Array;       // $0000-$00FF
  stack: Uint8Array;          // $0100-$01FF
  oamBuffer: Uint8Array;      // $0200-$02FF (256B)
  workRam: Uint8Array;        // $0300-$07FF (1280B)
  
  // PPU 寄存器
  ppuCtrl: number;            // $2000
  ppuMask: number;            // $2001
  ppuStatus: number;          // $2002
  oamAddr: number;            // $2003
  oamData: number;            // $2004
  ppuScroll: number;          // $2005
  ppuAddr: number;            // $2006
  ppuData: number;            // $2007
  
  // APU/Input 寄存器
  joypad1: number;            // $4016
  joypad2: number;            // $4017
  oamDma: number;             // $4014
  
  read(address: number): number;
  write(address: number, value: number): void;
}
```

#### 模块 4: PPU 模拟 (`PpuEmulator.ts`)

```typescript
class PpuEmulator {
  // Name Tables (2KB)
  nameTable0: Uint8Array;     // $2000-$23FF
  nameTable1: Uint8Array;     // $2400-$27FF
  nameTable2: Uint8Array;     // $2800-$2BFF
  nameTable3: Uint8Array;     // $2C00-$2FFF
  
  // Attribute Tables
  attributeTable0: Uint8Array; // $23C0-$23FF
  // ...
  
  // Palettes (32B)
  bgPalette: Uint8Array;      // $3F00-$3F0F
  spritePalette: Uint8Array;  // $3F10-$3F1F
  
  // Pattern Tables (通过 MMC1 映射)
  patternTable0: Uint8Array;  // $0000-$0FFF
  patternTable1: Uint8Array;  // $1000-$1FFF
  
  // 渲染状态
  scanline: number;
  cycle: number;
  
  // Canvas 渲染
  renderFrame(ctx: CanvasRenderingContext2D): void;
  renderBackground(ctx: CanvasRenderingContext2D): void;
  renderSprites(ctx: CanvasRenderingContext2D): void;
}
```

#### 模块 5: 游戏状态机 (`GameStateMachine.ts`)

```typescript
enum GameState {
  RESET        = 0,
  TITLE_SCREEN = 1,
  MENU         = 2,
  TEAM_SELECT  = 3,
  MATCH_INTRO  = 4,
  MATCH_PLAY   = 5,
  MATCH_EVENT  = 6,
  HALF_TIME    = 7,
  MATCH_END    = 8,
  CREDITS      = 9,
}

class GameStateMachine {
  currentState: GameState;
  subState: number;           // $03CA
  sceneIndex: number;         // $03CB
  
  // 各状态处理函数
  processTitleScreen(): void;
  processMenu(): void;
  processMatch(): void;
  processEvent(): void;
  
  // 对应 Bank $00 中的状态跳转表 ($81F7)
  dispatchState(): void;
}
```

#### 模块 6: 输入管理器 (`InputManager.ts`)

```typescript
class InputManager {
  // 手柄按键映射
  buttons: {
    a: boolean;
    b: boolean;
    select: boolean;
    start: boolean;
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  };
  
  // 对应 $0301-$0304 的手柄状态
  currentState: number;
  previousState: number;
  
  // 读取当前帧输入 (对应 $81B9)
  readInput(): void;
  
  // 按键检测
  isPressed(button: Button): boolean;
  isHeld(button: Button): boolean;
  isReleased(button: Button): boolean;
}
```

#### 模块 7: 精灵系统 (`SpriteManager.ts`)

```typescript
interface SpriteEntry {
  y: number;          // Y 坐标
  tileIndex: number;  // 图块索引
  attributes: number; // 属性 (调色板, 翻转, 优先级)
  x: number;          // X 坐标
}

class SpriteManager {
  oamBuffer: SpriteEntry[];  // 64 个精灵 (对应 $0200-$02FF)
  
  // DMA 传输 (对应 STA $4014)
  performDma(pageAddress: number): void;
  
  // 渲染精灵
  renderSprites(ctx: CanvasRenderingContext2D, 
                patternTable: ImageData[]): void;
}
```

#### 模块 8: 图形资源管理器 (`AssetManager.ts`)

```typescript
class AssetManager {
  // CHR Bank → PNG 转换
  chrBankImages: ImageData[];      // 16 个 CHR Bank 的图块图像
  tileSetImages: HTMLImageElement[]; // 每个 CHR Bank 渲染为一个 tileset PNG
  
  // 调色板
  palettes: Palette[];
  
  // 加载 CHR ROM 并转换为 PNG
  async loadChrBanks(chrRom: Uint8Array[]): Promise<void>;
  
  // 将 2bpp NES 图块数据转换为 RGBA
  convertTileToRGBA(tileData: Uint8Array, palette: Palette): ImageData;
  
  // 渲染完整 tileset
  renderTileSet(chrBankIndex: number): HTMLImageElement;
}
```

#### 模块 9: 音频系统 (`AudioManager.ts`)

```typescript
class AudioManager {
  // APU 寄存器
  square1: SquareChannel;
  square2: SquareChannel;
  triangle: TriangleChannel;
  noise: NoiseChannel;
  dmc: DmcChannel;
  
  // 对应 $84EF 的声音数据写入
  writeSoundData(data: number): void;
  
  // Web Audio API 集成
  initAudioContext(): void;
  playNote(channel: number, frequency: number): void;
}
```

### 9.3 文件结构

```
tsubasa1-h5/
├── index.html                  # 主 HTML 文件
├── package.json
├── tsconfig.json
├── public/
│   ├── sprites/
│   │   ├── chr_00.png         # CHR Bank 0 tileset
│   │   ├── chr_01.png         # CHR Bank 1 tileset
│   │   ├── ...
│   │   ├── chr_0F.png         # CHR Bank 15 tileset
│   │   └── manifest.json      # 资源清单
│   └── audio/
│       └── (可选: 音频资源)
├── src/
│   ├── main.ts                 # 入口文件
│   ├── rom/
│   │   ├── RomLoader.ts        # ROM 文件加载与解析
│   │   ├── NesHeader.ts        # NES Header 结构定义
│   │   └── types.ts            # ROM 相关类型定义
│   ├── mapper/
│   │   └── Mmc1Mapper.ts       # MMC1 映射器模拟
│   ├── memory/
│   │   ├── CpuMemory.ts        # CPU 内存空间
│   │   └── MemoryMap.ts        # 内存映射常量
│   ├── ppu/
│   │   ├── PpuEmulator.ts      # PPU 模拟器
│   │   ├── NameTable.ts        # Name Table 管理
│   │   ├── Palette.ts          # 调色板管理
│   │   └── PatternTable.ts     # 图块数据管理
│   ├── game/
│   │   ├── GameLoop.ts         # 主游戏循环
│   │   ├── GameStateMachine.ts # 游戏状态机
│   │   ├── states/
│   │   │   ├── ResetState.ts   # RESET 状态
│   │   │   ├── TitleState.ts   # 标题画面
│   │   │   ├── MenuState.ts    # 菜单
│   │   │   ├── MatchState.ts   # 比赛
│   │   │   └── EventState.ts   # 事件/剧情
│   │   └── NmiHandler.ts       # NMI 中断处理
│   ├── input/
│   │   └── InputManager.ts     # 手柄输入管理
│   ├── sprites/
│   │   ├── SpriteManager.ts    # 精灵管理
│   │   └── OamBuffer.ts        # OAM 缓冲区
│   ├── assets/
│   │   └── AssetManager.ts     # 图形/音频资源管理
│   ├── audio/
│   │   └── AudioManager.ts     # 音频管理
│   ├── data/
│   │   ├── playerData.ts       # 球员数据 (来自 Bank 05)
│   │   ├── teamData.ts         # 球队数据
│   │   ├── animationData.ts    # 动画数据 (来自 Bank 03)
│   │   └── matchScripts.ts     # 比赛脚本数据
│   ├── math/
│   │   ├── FixedPoint.ts       # 定点数运算
│   │   └── Trig.ts             # 三角函数表
│   └── utils/
│       ├── BitUtils.ts         # 位操作工具
│       └── Rng.ts              # 随机数生成器 (对应 $82AD)
└── tools/
    └── chr2png/                 # CHR → PNG 转换工具
        └── convert.ts
```

### 9.4 关键数据结构映射

#### 球员属性结构 (对应 Bank $05 数据)

```typescript
interface PlayerStats {
  id: number;           // 球员ID
  name: string;         // 球员名
  number: number;       // 球衣号码
  position: Position;   // 位置 (GK/DF/MF/FW)
  
  // 基础能力值
  speed: number;        // 速度
  stamina: number;      // 体力
  shoot: number;        // 射门
  pass: number;         // 传球
  dribble: number;      // 盘带
  defense: number;      // 防守
  catch: number;        // 扑救
  
  // 特殊技能
  specialMoves: SpecialMove[];
}

enum Position {
  GK = 0,  // 守门员
  DF = 1,  // 后卫
  MF = 2,  // 中场
  FW = 3,  // 前锋
}

interface SpecialMove {
  id: number;
  name: string;          // 技能名称
  type: 'shoot' | 'pass' | 'dribble' | 'defense' | 'catch';
  staminaCost: number;   // 体力消耗
  animationId: number;   // 动画索引
}
```

#### 动画帧结构 (对应 Bank $03 数据)

```typescript
interface AnimationFrame {
  tileIndex: number;     // CHR 图块索引
  attributes: number;    // 属性 (翻转, 调色板)
  duration: number;      // 持续帧数
  offsetX: number;       // X 偏移
  offsetY: number;       // Y 偏移
}

interface AnimationSequence {
  id: number;
  frames: AnimationFrame[];
  loop: boolean;
}
```

#### 比赛状态 (对应 $06xx RAM 区域)

```typescript
interface MatchState {
  scoreHome: number;       // 主队得分
  scoreAway: number;       // 客队得分
  halfTime: 1 | 2;        // 上半场/下半场
  matchTime: number;       // 比赛时间
  possession: 'home' | 'away';  // 控球方
  ballPosition: Point;     // 球的位置
  activePlayer: number;    // 当前控球球员索引
  cameraPosition: Point;   // 摄像机位置
}
```

### 9.5 实现优先级

| 优先级 | 模块                   | 说明                                       |
|--------|------------------------|--------------------------------------------|
| P0     | ROM Loader + MMC1      | 基础框架，必须首先完成                      |
| P0     | CPU Memory + PPU 基础  | 内存映射和 PPU 寄存器模拟                   |
| P0     | CHR → PNG 转换工具     | 图形资源准备                               |
| P1     | 主游戏循环 + NMI       | 帧同步机制                                 |
| P1     | 输入管理器             | 手柄输入                                   |
| P1     | 精灵管理器             | 精灵渲染                                   |
| P1     | Game State Machine     | 游戏状态机                                 |
| P2     | Bank 07 固定代码转写   | RESET/NMI/MMC1 初始化                      |
| P2     | Bank 00 核心引擎转写   | 核心游戏逻辑                               |
| P2     | Bank 01 菜单系统转写   | 标题画面和菜单                             |
| P3     | Bank 04 比赛流程转写   | 比赛核心逻辑                               |
| P3     | Bank 02 图形系统转写   | 图形渲染                                   |
| P3     | Bank 06 事件系统转写   | 必杀技和比赛事件                           |
| P4     | Bank 03/05 数据整理    | 球员数据、动画数据                         |
| P4     | 音频系统               | 音效和音乐                                 |
| P5     | 调试工具和优化         | 性能优化、Bug 修复                         |

---

## 附录

### A. 参考资源

- NESDev Wiki: https://www.nesdev.org/wiki/
- MMC1 文档: https://www.nesdev.org/wiki/MMC1
- 天使之翼攻略: (游戏机制参考)
- 6502 指令集参考: https://www.masswerk.at/6502/

### B. 文件清单

| 文件                                     | 大小      | 行数   | 说明                 |
|------------------------------------------|-----------|--------|----------------------|
| Captain Tsubasa (Japan).nes              | 262,160B  | -      | 原始 ROM 文件        |
| _tmp_disasm_out/tsubasa_disasm.asm       | 1.78 MB   | ~70K   | 完整反汇编           |
| _tmp_disasm_out/banks/bank_00_code.asm   | 215.5 KB  | 8,054  | Bank 0 反汇编        |
| _tmp_disasm_out/banks/bank_01_code.asm   | 225.1 KB  | 8,615  | Bank 1 反汇编        |
| _tmp_disasm_out/banks/bank_02_nmi.asm    | 234.6 KB  | 8,967  | Bank 2 反汇编        |
| _tmp_disasm_out/banks/bank_03_data.asm   | 228.7 KB  | 8,789  | Bank 3 反汇编        |
| _tmp_disasm_out/banks/bank_04_code.asm   | 244.0 KB  | 9,356  | Bank 4 反汇编        |
| _tmp_disasm_out/banks/bank_05_data.asm   | 225.6 KB  | 8,678  | Bank 5 反汇编        |
| _tmp_disasm_out/banks/bank_06_code.asm   | 213.0 KB  | 7,867  | Bank 6 反汇编        |
| _tmp_disasm_out/banks/bank_07_fixed.asm  | 236.5 KB  | 8,992  | Bank 7 反汇编        |

---

> **文档版本**: v1.0  
> **最后更新**: 2026-08-03  
> **下一步**: 基于此分析报告，开始 H5 转写的第一阶段实现（ROM Loader + MMC1 + PPU 基础框架）
