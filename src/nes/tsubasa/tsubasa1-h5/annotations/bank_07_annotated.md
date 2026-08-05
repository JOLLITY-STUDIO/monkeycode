# Bank 07 - Fixed Bank 完整分析报告

> **源文件**: `_tmp_disasm_out/banks/bank_07_fixed.asm`
> **CPU地址**: $C000-$FFFF (MMC1 PRG Mode 2: 固定高16KB)
> **Mapper**: MMC1, PRG Bank 7 (last bank)
> **状态**: ✅ 已分析

---

## 1. 概述

Bank 07 是 MMC1 的固定 bank，始终映射在 $C000-$FFFF。内容分为：
- **$C000-$FFBF**: 数据表（事件脚本指针表、剧情数据）(~16KB)
- **$FFC0-$FFD5**: RESET 向量代码 (MMC1 初始化)
- **$FFD7-$FFD9**: `JMP ($8000)` → 跳入 Bank 0 主初始化
- **$FFDA-$FFEF**: 填充 ($00)
- **$FFF0-$FFF9**: 填充 ($00, 部分非零为中断向量数据区)
- **$FFFA-$FFFF**: 中断向量表

---

## 2. RESET 启动流程

### 2.1 硬件向量 ($FFFA-$FFFF)

| 向量 | 地址 | 值 | 目标 |
|------|------|-----|------|
| **NMI** | $FFFA-$FFFB | $8002 | Bank 0: `JMP $80E0` (NMI处理器) |
| **RESET** | $FFFC-$FFFD | $FFC0 | Bank 7: MMC1初始化 |
| **IRQ/BRK** | $FFFE-$FFFF | $8002 | 同 NMI |

### 2.2 RESET 代码 ($FFC0-$FFD5)

```asm
$FFC0: SEI              ; 禁用中断
$FFC1: CLD              ; 清除十进制模式
$FFC2: LDA #$10         ; PPU: NMI关闭
$FFC4: STA $2000
$FFC7: LDA #$80         ; MMC1: 重置移位寄存器 (bit7=1)
$FFC9: STA $8000
$FFCC: LDA #$1A         ; 初始值 = $1A (bit0=0)
$FFCE: LDX #$05         ; 循环6次
$FFD0: STA $8000         ; MMC1 串行写入
$FFD3: LSR               ; 右移 → 下一位
$FFD4: DEX
$FFD5: BNE $FFD0         ; 循环
```

**MMC1 串行写入序列**（每次只使用 bit0）:

| 次数 | 值 | bit0 | 移位寄存器状态 |
|------|-----|------|---------------|
| 初始 | - | - | $80 写入 → 重置 = $10, PRG模式=3 |
| 1 | $1A | 0 | $08 |
| 2 | $0D | 1 | $14 |
| 3 | $06 | 0 | $0A |
| 4 | $03 | 1 | $15 |
| 5 | $01 | 1 | **$1A** → 提交! (count=5) |
| 6 | $00 | 0 | $0D → 新周期开始 |

**MMC1 控制寄存器提交值 = $1A (00011010)**:
- bit 1-0 = 10: **水平镜像** (Horizontal)
- bit 3-2 = 10: **PRG模式 2** (固定 $8000-$BFFF=bank0, 切换 $C000-$DFFF)
- bit 4   = 1:  **CHR模式 1** (双4KB bank)

### 2.3 跳转到主初始化 ($FFD7-$FFD9)

```asm
$FFD7: JMP ($8000)      ; 间接跳转到 $8000 处存储的地址
```

Bank 0 的 $8000-$8001 存有: `$9B, $80` → 地址 `$809B`

---

## 3. 数据段分析

### 3.1 总体布局

| 地址范围 | 大小 | CDL标记 | 描述 |
|----------|------|---------|------|
| $C000-$C02B | 44B | D2/D3 | 指针表 (22个指向Bank 7内部的指针) |
| $C02C-$C063 | 56B | D2/D3 | 指针表续 (指向$41xx-$42xx, 可能为偏移量) |
| $C064-$E28D | ~8KB | D2/D3/others | 事件脚本数据 / 剧情文本数据 |
| $E28E-$FFBF | ~7KB | 大部分未访问 | 预留/备用数据区 |
| $FFC0-$FFDF | 32B | 代码 | RESET向量代码 |
| $FFE0-$FFEF | 16B | 未使用 | 填充 |
| $FFF0-$FFF9 | 10B | 未使用 | 填充 |
| $FFFA-$FFFF | 6B | D3 | 中断向量表 |

### 3.2 指针表 ($C000-$C02B)

22个16位小端指针，全部指向 Bank 7 内部:

```
[00] $C02C  [01] $E2F8  [02] $DCCC  [03] $DD62
[04] $DDF8  [05] $DE8E  [06] $DDF8  [07] $E178
[08] $E21D  [09] $E238  [10] $E314  [11] $E325
[12] $F94F  [13] $F967  [14] $F967  [15] $F9AF
[16] $F9C7  [17] $F9C7  [18] $F9EB  [19] $E395
[20] $E365  [21] $E2EC
```

这些是指向 Bank 7 内部数据结构的指针，可能被 Bank 2/Bank 3 中的代码通过 JSR 间接调用或作为数据引用。

### 3.3 指针表续 ($C02C-$C063)

指针值在 $41xx-$42xx 范围。在 MMC1 PRG Mode 2 下，$8000-$BFFF 映射到可切换 bank。这些值可能是：
- ROM 偏移量（被代码+$8000 转换后使用）
- Bank 2/Bank 3 内的地址

具体含义需要分析 Bank 2/Bank 3 中访问此表的代码来确定。

### 3.4 事件脚本数据 ($C064-$E28D)

这是 Bank 7 的主体数据，约 8KB。内容为：
- 比赛事件脚本
- 对话/剧情文本数据
- 特殊事件触发条件

CDL 标记显示这些数据在 Bank 2 和 Bank 3 映射时被访问（`D 2`、`D 3`），说明剧情/事件系统在 Bank 2/3 中运行并读取 Bank 7 的脚本数据。

---

## 4. 启动流程完整时序

```
1. CPU 上电 → 读取 $FFFC 向量 → $FFC0
2. Bank 7 RESET: MMC1 初始化 (控制=$1A)
3. JMP ($8000) → $809B (Bank 0)
4. Bank 0 主初始化:
   a. 清空 RAM $0000-$07FF
   b. 设置 PPU ctrl=$10, mask=$06
   c. JSR $82CC (PPU初始化?)
   d. JSR $8371 (图形初始化?)
   e. JSR $838F (调色板初始化?)
   f. JSR $82F5 (MMC1配置?)
   g. JMP $81EE → 主循环
5. 主循环 ($81EE):
   a. JSR $8314 (检查/预处理)
   b. JSR $81F7:
      LDA ram_03CA (当前状态ID)
      JSR $834D (跳转表分发)
      跳转表 $81FD: State 0→$82A1, State 1→$82A7, ...
   c. JMP $81EE (永远循环)
6. NMI 每帧触发 ($80E0):
   a. 保存寄存器
   b. OAM DMA
   c. PPU队列处理
   d. 滚动更新
   e. 声音引擎 ($DB00)
   f. 帧计数++ (ram_0300)
   g. 恢复寄存器
   h. RTI
```

---

## 5. 关键内存变量 (确认)

| 地址 | 变量 | 说明 |
|------|------|------|
| $0016 | scrollX | PPU 水平滚动 |
| $0017 | scrollY | PPU 垂直滚动 |
| $0018 | ppuMask | PPU $2001 镜像 (当前=$06) |
| $0019 | ppuCtrl | PPU $2000 镜像 (当前=$10) |
| $001A | ppuCtrlTemp1 | PPU控制临时值1 |
| $001B | ppuCtrlTemp2 | PPU控制临时值2 |
| $001C | ppuCtrlTemp3 | PPU控制临时值3 |
| $0093 | bankLock | Bank切换锁定标志 (0=允许) |
| $0300 | frameCounter | 帧计数器 |
| $0305 | ppuQueueCount | PPU队列条目数 |
| $0306 | ppuQueue | PPU队列数据区 |
| $0339 | ppuQueueFlag | PPU队列活动标志 |
| $03CA | gameState | 当前游戏状态ID |
| $03CB | subState | 子状态/Bank内状态 |
| $03CC | subState2 | 子状态2 |

---

## 6. 待确认/疑问点

- [ ] $C02C-$C063 指针值 ($41xx-$42xx) 的确切含义
- [ ] $C064-$E28D 事件脚本的具体编码格式
- [ ] Bank 2/Bank 3 如何解析 Bank 7 的脚本数据
- [ ] $82CC, $8371, $838F, $82F5 等初始化子程序的具体功能

---

*分析日期: 2026-08-05*
*基于 CDL 文件 + ASM 反汇编交叉验证*
