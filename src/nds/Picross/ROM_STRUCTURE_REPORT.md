# Picross DS (USA) ROM Structure Report

> 逆向分析对象：`Picross DS (USA) (En,Fr,Es).nds` (32MB, 33,554,432 bytes)
> 游戏码：AXPE | 厂商：01 (Nintendo) | 发行：Jupiter Corporation (2007)

## 1. NTR Header 解析 (0x000-0x1FF)

| 字段 | 偏移 | 值 | 说明 |
|---|---|---|---|
| Game Title | 0x000 | `PICROSSDS` | 12 字节 ASCII |
| Game Code | 0x00C | `AXPE` | 美版（E=English，P=?） |
| Maker Code | 0x010 | `01` | Nintendo |
| Unit Code | 0x012 | 0x00 | NDS |
| Device Capacity | 0x014 | 8 | 2^(8+1)=512Mbit = 32MB |
| ROM Version | 0x01D | 0 | |
| ARM9 ROM Offset | 0x020 | `0x4000` (16384) | 紧跟 4KB secure area 之后 |
| **ARM9 Entry** | 0x024 | `0x2000800` | 复位后入口 |
| ARM9 RAM Addr | 0x028 | `0x2000000` | 装载到主内存基址 |
| ARM9 Code Size | 0x02C | `0x80DA8` (527,784) | 约 528KB |
| ARM7 ROM Offset | 0x030 | `0x148E00` (1,347,072) | |
| **ARM7 Entry** | 0x034 | `0x2380000` | |
| ARM7 RAM Addr | 0x038 | `0x2380000` | |
| ARM7 Code Size | 0x03C | `0x289C0` (166,336) | 约 162KB |
| FNT Offset | 0x040 | `0x171800` (1,513,472) | 文件名表 |
| FNT Size | 0x044 | 736 | |
| FAT Offset | 0x048 | `0x171C00` (1,514,496) | 文件分配表 |
| FAT Size | 0x04C | 1,176 | 98 文件 × 12B |
| ARM9 Overlay Offset | 0x050 | `0x84E00` (544,256) | |
| ARM9 Overlay Size | 0x054 | `0xF80` (3,968) | |
| ARM7 Overlay | 0x058/0x05C | 0 / 0 | 无 ARM7 Overlay |
| Icon Title Offset | 0x068 | `0x172200` | 图标与标题 |
| Secure Area Checksum | 0x06C | `0x0D7E854D` | |

### 内存/ROM 布局图

```
ROM 偏移            大小        内容
0x0000             0x200       NTR Header
0x0200             0x3E00      Secure Area (加密，前 0x800 为反汇编垃圾数据)
0x4000             0x80DA8     ARM9 代码段 (装载到 0x2000000，入口 0x2000800)
0x84E00            0xF80       ARM9 Overlay (1 个 overlay)
0x85200            ...         未使用区域 / 文件数据对齐
0x148E00           0x289C0     ARM7 代码段 (装载到 0x2380000)
0x171800           0x2E0       FNT 文件名表 (自定义紧凑格式)
0x171C00           0x498       FAT 文件分配表 (98 文件)
0x172200           ...         Icon/标题 + 数据文件区
...                24.8MB      file_94: 拼图主数据库
```

## 2. 双 CPU 架构

### ARM9 (主处理器) — `arm9.bin`
- 入口 `0x2000800`：标准 libnds 启动代码
  - `mov ip,#0x4000000; str ip,[ip,#0x208]` → 禁用中断
  - 等待主内存就绪 → 设置 SVC/IRQ/User 模式 SP
  - 清 .bss (0x2000000~0x2004000)、0x23A0000 区域、0x2700200 区域
  - 加载/复制数据段（`bl 0x2000950` = 自定义 LZ 解压器，处理 0x880000 数据）
  - 设置 IRQ handler → `bl 0x20116BC` → 进入主程序 → `bx` 切 Thumb
- 线性反汇编（首遍）：131,946 条指令
- SDK 标识字符串：
  - `[SDK+NINTENDO:WiFi1.1.30000.0606161619]`
  - `[SDK+NINTENDO:DWC1.2.30006.061019.2254_DWC_1_2_PLUS6]`
  - `[SDK+UBIQUITOUS:SSL]` / `[SDK+UBIQUITOUS:CPS]`
  - `[SDK+NINTENDO:BACKUP]`
- 文本使用**自定义字体编码**（ROM 内文本区域无明显 ASCII 明文，需通过字符映射表解码）

### ARM7 (协处理器) — `arm7.bin`
- 入口 `0x2380000`：标准启动代码（同 ARM9 模式）
- 线性反汇编：41,584 条指令
- 职责：音频（`Sound/PR.sdat` 自定义音频库）、触摸屏、按键、WiFi

## 3. FAT/FNT 文件系统

### FNT 格式（自定义紧凑格式，非标准）
```
u32        未知计数 (0x38)
...        目录元数据预表（12B/项，内容待进一步确认）
目录名表:  [0x80|len][name][dirID][0xF0]  × N
文件表:    按目录分组: [len][name]..., 00 结尾
```

### 目录结构（6 个目录 + root）

| 目录 | 文件数 | 内容 |
|---|---|---|
| `/` (root) | 1 | 启动资源 |
| `/backup` | 4 | `default_data_00~03.pmd`（存档默认数据） |
| `/dwc` | 1 | `utility.bin`（WiFi 工具库） |
| `/Msg` | 12 | `PicrossDS_messageList_{ENG,FRE,SPA}_JP[_Easy|_Free|_Normal].dat`（3 语言 × 4 难度消息） |
| `/PackData` | 1 | `_out.pck`（填充数据） |
| `/Sound` | 1 | `PR.sdat`（自定义音频档案，非标准 SDAT） |
| `/wireless` | 4 | `icon_multi.chr/.plt`, `icon_otameshi.chr/.plt`（WiFi 图标） |

### 未命名文件（75 个）关键内容

| 文件 | 大小 | 推测用途 | 依据 |
|---|---|---|---|
| file_94 | 24,845,044 | **拼图主数据库** | 头部含规律位图模式 |
| file_95 | 1,100,768 | 大填充数据 | 全 0xFF |
| file_86 | 54,822 | **消息/索引数据库** | 嵌套偏移表：头 6B + 372×u32 偏移 |
| file_30 | 31,556 | 压缩数据 | 无头部魔数 |
| file_24 | 17,092 | 数据 | |
| file_0 | 23,444 | 启动资源 | 装载地址 0x8BA00 |

### 索引文件 file_86 结构
```
0x00  u16 0xFFFE (版本/标记)
0x02  u32 0
0x06  372 × u32 offset  → 指向子偏移表（嵌套两级索引，叶节点指向实际数据）
```
叶子数据区起始偏移 `0x76`，内容为下一级 u32 偏移表（0x116C, 0x1242, 0x12DC...）。

### 拼图数据库 file_94 结构（初步）
```
0x000-0x037  56 字节零填充
0x038+       出现 00 00 00 FF 标记与 0xFF 填充行
0x080+       AA/BB 交替位图（4B 周期）→ 疑为 2bpp 图形或拼图预览
0x0C0+       混合位图区域（含 FF/AA/FA/EE/FE 图案）→ 疑为拼图解法位图
0x180+       后续拼图条目
```
> 注：精确格式需结合 ARM9 代码中读取 file_94 的加载函数反推（开发阶段任务）。

## 4. 消息文件格式
- `messageList_*.dat`：开头为一段 ARM 机器码前导（`ldr r2,[pc,#0xc]` 等），文本使用自定义编码，需从 ROM 字库表映射。

## 5. 开发要点（转写规划）
1. **数据管线**：Python 脚本解析 file_94 拼图数据库 → 生成结构化 TS 数据（Puzzle[]: width/height/solution/hints）
2. **游戏内核**：纯 TS 实现拼图引擎（网格状态、行列提示计算、标记/填充/叉号、完成校验、计时）
3. **渲染**：Canvas 双视图（主屏拼图区 + 触摸屏操作区，微信小程序触摸事件绑定）
4. **音频**：PR.sdat 自定义格式 → 转写为 WebAudio/小程序音频资源（可选阶段）
5. **UI 流程**：标题 → 模式选择（教程/普通/自由/无尽）→ 拼图选择（难度/大小）→ 解谜 → 结算

## 6. 产物
- 反汇编：`_tmp_disasm_out/arm9.bin.asm` (131,946 insn)、`arm7.bin.asm` (41,584 insn)
- 提取文件：`extracted/`（98 文件，含 manifest.json / fnt_parsed.json）
- 本报告：`ROM_STRUCTURE_REPORT.md`
