# Bank 15 — 开场动画 BGM 数据范围精确分析

> 分析日期：2026-08-08  
> 分析工具：`npx tsx mini-audio/trace.ts 4500`  
> ROM 配置：精简 8 bank（00-03, 07, 12, BGM00→15, 30-31）
> 独立模块：`mini-audio/bgm-data/BGM00.ts`

## 概述

| 属性 | 值 |
|------|-----|
| Bank 编号 | 15 |
| ROM 区域 | `0x01E010 - 0x02000F` |
| PRG 偏移 | `15 × 8192 = 0x1E000` |
| CPU 窗口 | MMC3 可切换 ($8000 或 $A000) |
| 类型 | 纯数据 (BGM 音乐数据) |
| 数据密度 | 2119B / 8192B = **25.9%** |
| 独立模块 | `BGM00` — 从 Bank 15 提取的 2117 字节独立 BGM 数据 |

## 数据段划分（0xFF 分隔）

```
Bank 15 (8192 字节)：
├── $0000-$16FF  (5888 bytes)  未使用 ❌
├── $1700-$1701  (2 bytes)     标志/计数器 📍 F1225 首读
├── $1702-$17AC  (171 bytes)   未使用 ❌
├── $17AD-$1FF1  (2117 bytes)  ⭐ BGM00 主数据段 📍 F280 首读
│   ├── $17AD-$17B8 (12 bytes) HEADER — 歌曲头 (0x04 + 配置数据)
│   ├── $17BA-$19A0 (487 bytes) TRACK_SQ1 — 主旋律 📍 0xFF → $17B9
│   ├── $19A2-$1C41 (672 bytes) TRACK_SQ2 — 副旋律/和声 📍 0xFF → $19A1
│   ├── $1C43-$1E67 (549 bytes) TRACK_TRI — 低音线 📍 0xFF → $1C42
│   └── $1E69-$1FD5 (365 bytes) TRACK_NOISE — 鼓点 📍 0xFF → $1E68
└── $1FF2-$1FFF  (14 bytes)    未使用 ❌
```

## 段 1: $1700-$1701 — 标志/计数器（2 bytes）

```
偏移    值      首帧     说明
$1700   0x01    F1225    可能为音轨状态标志
$1701   0x01    F1225    可能为 BGM 选择索引
```

这两个字节在 F1225 被读取（远晚于 BGM 开始），可能是 BGM 循环/切换判断逻辑中使用的标志。

## 段 2: $17AD-$1FF1 — BGM00 主数据段（2117 bytes）⭐

### 2.1 HEADER ($17AD-$17B8, 12 bytes)

```
$17AD  0x04     可能为音轨数/格式标记
$17AE  0xBA     |
$17AF  0xB7     |→ Track 1 指针? $B7BA (CPU addr) → bank15 $17BA
$17B0  0x05     |
$17B1  0xBD     |→ Track 2 指针? $BD05 (CPU addr) → bank15 $1D05
$17B2  0xBA     |
$17B3  0x06     |→ Track 3 指针? $06BA ⚠ 无效
$17B4  0x5E     |
$17B5  0xBD     |→ Track 4 指针? $BD5E (CPU addr) → bank15 $1D5E
$17B6  0x07     |
$17B7  0x3F     |
$17B8  0xBF     |→ 额外指针? $BF3F (CPU addr) → bank15 $1F3F
```

> ⚠ 指针解析存疑：部分 CPU 地址超出 bank15 范围，实际轨道通过 0xFF 分隔符划分更可靠。

### 2.2 TRACK_SQ1 ($17BA-$19A0, 487 bytes) — 主旋律

```
$17B9  0xFF     ← 分隔符
$17BA  0xE0 0x22  设置音符 0x22
$17BC  0xE2 0x00  设置音色 0x00
$17BE  0xE3 0x08  设置音长 8 帧
$17C0  0x87 0x45  参数块
$17C2  0x40 0x38 0x37 0x35 0x30 0x2A 0x27  音符数据
...
$19A0  0xEF       ← End effect block
$19A1  0xFF       ← 分隔符
```

### 2.3 TRACK_SQ2 ($19A2-$1C41, 672 bytes) — 副旋律/和声

```
$19A2  0xED 0x01  颤音/装饰
$19A4  0xE0 0x23  设置音符 0x23
$19A6  0x8C 0x20  配置参数
...
$1C41  0xEF       ← End effect block
$1C42  0xFF       ← 分隔符
```

### 2.4 TRACK_TRI ($1C43-$1E67, 549 bytes) — 低音线

```
$1C43  0xE0 0x23  设置音符 0x23
$1C45  0x8C 0x25  配置参数
...
$1E67  0xEC       ← Loop end
$1E68  0xFF       ← 分隔符
```

### 2.5 TRACK_NOISE ($1E69-$1FD5, 365 bytes) — 鼓点/节奏

```
$1E69  0x81 0x40  持续时长
$1E6B  0x3B 0x3A 0x39 0x38 0x37  节奏数据
...
$1FD5  0xEC       ← Loop end
$1FD6  0xFF       ← 分隔符
```

数据特征表明这是 **NES 音乐音序器标准的指令序列**：

| 指令 | 含义 | 出现情况 |
|------|------|---------|
| `0xE0 xx` | 设置音符音高 | 频繁出现（如 E0 22, E0 25） |
| `0xE2 xx` | 设置音色/音量 | E2 00（初始），E2 C0（带调制） |
| `0xE3 xx` | 设置音长/节奏 | E3 08（八分音符），E3 09, E3 0A 等 |
| `0xE9 xx xx` | 子程序调用（相对偏移） | E9 A2 B9 → 跳到子音轨 |
| `0xF3` | 滑音/portamento | 只出现 1 次 |
| `0xE5 xx` | 效果/重复 | E5 01, E5 02... E5 06 |
| `0xEB`/`0xEC` | 循环开始/结束 | 音轨循环标记 |
| `0xED` | 效果/装饰 | 偶尔出现 |
| `0x81 xx` | 音符持续时间 | 81 27 = 持续 0x27 帧 |
| `0x87 xx` | 音符相关 | 87 45 |
| `0xFF` | 音轨结束标记 | 各音轨结尾 |

### 2.6 音轨结构（基于 0xFF 分隔符）

| 片段 | 范围 | 大小 | 通道 |
|------|------|------|------|
| HEADER | $17AD-$17B8 | 12B | 歌曲配置头 |
| TRACK_SQ1 | $17BA-$19A0 | 487B | SQ1 主旋律 |
| TRACK_SQ2 | $19A2-$1C41 | 672B | SQ2 副旋律 |
| TRACK_TRI | $1C43-$1E67 | 549B | TRI 低音线 |
| TRACK_NOISE | $1E69-$1FD5 | 365B | NOISE 鼓点 |

## 通道写入统计（4500 帧）

| 通道 | 写入次数 | 活跃状态 |
|------|---------|---------|
| SQ1 (主旋律) | 11,144 | ✅ |
| SQ2 (副旋律) | 11,145 | ✅ |
| TRI (低音) | 4,427 | ✅ |
| NOISE (鼓点) | 13,182 | ✅ |
| DMC (采样) | 730 | ✅ (从 F365 开始) |
| $4015 开关 | 585 | — |

**BGM 实际活跃时间线**: F280-F4500+（首帧 F280 开始读取 bank 15 数据，F281 开始写入 APU 寄存器）

## 与 Bank 12（音频引擎）的关系

```
Bank 12 ($8000) ← 音频引擎代码（4 个关键入口）
├── $818E → 音轨状态更新 / 音符参数读取
├── $81A0 → 音色/效果处理
├── $81B7 → 频率写入 APU
└── $81CC → 音长/帧计数更新

BGM00 ($A000 window) ← BGM 音乐数据
└── $17AD-$1FF1 → HEADER + 4 轨音序器数据
```

**数据流**: Bank 12 引擎 → 读取 BGM00 音序器数据 → 解析 E0/E2/E3 等指令 → 写入 $4000-$4013 APU 寄存器 → 播放 BGM

## BGM00 独立模块

数据已从 Bank 15 中提取为独立模块：

| 文件 | 内容 |
|------|------|
| `mini-audio/bgm-data/BGM00.ts` | 主模块 — 2117B 原始数据 + 5 个分段导出 |
| `mini-audio/bgm-data/index.ts` | BGM 数据集索引 |
| `mini-audio/rom-data/index.ts` | ROM 数据源（Bank 15 由 `fillBGM00Bank()` 填充） |

**模块导出**:
```ts
import { BGM00_RAW, BGM00_META, fillBGM00Bank } from './bgm-data/BGM00';
import { BGM00_HEADER, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } from './bgm-data/BGM00';
```

## 精简 ROM 验证

当前精简 ROM（8 bank: 00-03, 07, 12, BGM00→15, 30-31）与完整 32 bank ROM 的 APU 输出**完全一致**：

- 砍掉的 bank: 04-06, 13-14（共 5 个 bank）
- 不需要的 bank: 08-11, 16-29（游戏逻辑/图形 bank）
- **Bank 15 不再依赖 rom-data/prg-bank-15.ts**，改用 BGM00 独立数据

## 完整 bank 15 数据十六进制

```
$1700: 01 01
$17AD: 04 BA B7 05 BD BA 06 5E BD 07 3F BF
$17B9: FF E0 22 E2 00 E3 08 87 45 40 38 37 35 30 2A 27
$17C9: 25 E3 08 25 E3 09 25 E3 0A 25 E2 C0 E3 08 E9 A2 B9
$17D9: E0 25 81 27 F3 E5 01 27 E5 02 27 E5 03 27 E5 04
$17E9: 27 E5 05 27 E5 06 27 ...
```
