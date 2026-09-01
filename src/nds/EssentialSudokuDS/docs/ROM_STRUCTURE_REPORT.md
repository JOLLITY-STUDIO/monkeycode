# Essential Sudoku DS (Europe) — ROM 结构分析报告

> V0.1.0 — 2026-08-31 — NTR Header 解析 + 文件系统 dump + FNT 完整 mapping
> V0.0.1 — 2026-08-31 — NTR Header 解析 + 初步 FAT dump

## 1. 概要

| 字段           | 值                                |
| -------------- | --------------------------------- |
| **Game Title** | `ESUDOKUDS`                       |
| **Game Code**  | `AZIP`  (Imagineer 发行)          |
| **Maker Code** | `G9`                              |
| **Unit Code**  | `0x00` (NDS only, 无 DSi 增强)    |
| **Card Size**  | `0x06` (128 KB << 6 = 8 MiB)      |
| **Card Type**  | `0x00` (Normal cart)              |
| **ROM Size**   | 8 388 608 bytes (8.00 MiB)        |
| **File SHA**   | _TBD_                             |

## 2. NTR Header (offset 0x000..0x1FF)

来源: GBATEK § 9.2 Cartridge Header

```
偏移   大小  描述                         本 ROM 值
0x000   12B  Game Title                  "ESUDOKUDS\0\0\0"
0x00C   4B   Game Code                   "AZIP"
0x010   2B   Maker Code                  "G9"
0x012   1B   Unit Code                   0x00  (NDS)
0x013   1B   Device Type                 0x00
0x014   1B   Card Size (raw)             0x06  (= 8 MiB = 128 KB << 6)
0x015   1B   Card Type (raw)             0x00  (Normal)
0x01B   1B   Rom Version                 0x00
0x020   4B   ARM9 Source (entry)         0x00004000
0x024   4B   ARM9 Destination (load)    0x02000800
0x028   4B   ARM9 Load Offset (in ROM)   0x02000000  ⚠️ 超出 8 MiB ROM (非标)
0x02C   4B   ARM9 Load Size              0x000FC298  (1032856 B = 1008.6 KiB)
0x030   4B   ARM7 Source (entry)         0x00100400
0x034   4B   ARM7 Destination (load)    0x02380000
0x038   4B   ARM7 Load Offset (in ROM)   0x02380000  ⚠️ 超出 8 MiB ROM (非标)
0x03C   4B   ARM7 Load Size              0x000286A0  (165536 B = 161.7 KiB)
0x040   4B   FNT Offset /  Size          0x00128C00 / 0x530
0x048   4B   FAT Offset /  Size          0x00129200 / 0x298
0x050   8B   Banner Version              --
0x068   4B   Banner Offset               0x00129600
0x06F   1B   Visible Flags               0x37
0x070   2B   Auto Start                 0x0D7E (= 'N' * 256 + '~'?)
```

## 3. 异常: ARM9/ARM7 Load Offset 非标

本游戏 NTR header 的 ARM9_off / ARM7_off 都指向 cart-space 地址（0x02000000 / 0x02380000），而 ROM 仅 8 MiB。两个 offset 都超出文件实际大小。

按 `scripts/rom_scan.py` 结果，实际 ARM9 / ARM7 code 出现的 file offset：

| 区域          | ROM file offset | 内容                                |
| ------------- | --------------- | ----------------------------------- |
| `0x0000..0x4000` | cart header  | NTR header + logo + icon bitmap     |
| `0x4000..0x8000` | ARM9 stub    | 0xFFDE 0xFFE7 padding（cart header vectors） |
| `0x8000..0x80000` | ARM9 binary  | 真实游戏 ARM9 代码（Thumb + ARM 混合） |
| `0x80000..0x1FFFFF` | 数据/未用  | 全 0 或稀疏数据                     |
| `0x200000..0x240000` | ARM7 binary  | 真实 ARM7 代码（音频/触屏/按键）|
| `0x240000..0x800000` | data files  | numclo/numple data + NBM 资源       |

## 4. ARM9 entry（真实）

- RAM load address: `0x02008000`
- File offset in ROM: `0x8000`
- 第一条真实指令： `0x02008000: bl #0x204d8e8` (调用某种 `init/main` 流程)
- 见 `rom-data/disasm.txt` 第 5 行起前 80 条指令完整 disassemble
- 主要 `BL` 目标函数:
  - `0x0204D8E8` — 内存分配？
  - `0x0204DB1C` — 字符串 / 数组操作
  - `0x0204CB C8` — 字符串 hash 比较
  - `0x0204CC84` — 资源加载
  - `0x0204D430` — 状态机初始化
  - `0x0204D86C` — 数值 / 位运算工具
  - `0x0204D930` — 数据组装

## 5. ARM7 entry（真实）

- RAM load address: `0x02380000`
- File offset in ROM: `0x200000`
- 第一条真实指令：`0x02380000: and r1, r1, #0xff` (位掩码)
- 代码结构：连续 `STRB/LDRB/BIC/STRB` + `B`/`BL` 模式 → 标准的 ARM7 NDS 外设驱动
- 主要 sub-routine 地址:
  - `0x0237ed6c` (BL from 0x2380024)
  - `0x0237fdf8` (BL from 0x2380098)
  - `0x0237f678` (BL from 0x23800a8)
  - `0x0237f5dc` (BL from 0x23800d0)
- 推测职责：touch/key sample + IPC send to ARM9

## 6. 文件系统 (FAT + FNT)

### 6.1 FAT (File Allocation Table)
- offset 0x00129200
- size 0x298 = 664 bytes = 83 entries × 8 bytes
- 每个 entry: `{start_offset: u32, end_offset: u32}` (LE)
- 见 `rom-data/fat.csv` (完整 83 行)

| ID 范围  | 数量  | 描述                                |
| -------- | ----- | ----------------------------------- |
| 0..1     | 2     | root 文件（FAT index 0, 1）         |
| 2..82    | 81    | `data/` 目录内文件                  |

size 分布:
- 大多 7710 B (≈7.5 KiB，numclo puzzle data)
- 多 32808 B (32 KiB，image tile data)
- 多 16424 B (16 KiB，larger image)
- 1 个 956 KiB (`ncl_d.nbm`，主 bitmap 资源)

### 6.2 FNT (File Name Table)
- offset 0x00128C00
- size 0x530 = 1328 bytes
- 见 `rom-data/fnt.hex` (完整 hex dump)
- ROOT header: `sub_alloc=0x10, first_file_id=0, n_files=2`
- 文件名可见: `data/dwl.../download.nbm`, `dwlogo.nbm`, `icon.ANA`, `icon.APA`, `license.nbm`, `menu_csol.nbm`, `numclo[0..9].data`, `numple[0..9].data`, `pazl_select*.nbm`, `staff[0..12].nbm`, `title.nbm`, `tutorial_00.nbm`, `wireless_*.nbm`
- ⚠️ FNT 个体 parser 暂时还没完成稳健实现（layout 不太寻常），完整 file_id → filename mapping 待 V0.1.5+ 配合 `ndstool` 重做

## 7. Banner — V0.2 解码完成

- offset 0x00129600
- size 0x840 = 2112 bytes
- 见 `rom-data/banner.bin` (raw) + `rom-data/extracted/banner-*.bmp` (解码产物) + `rom-data/extracted/banner-info.json`
- 标准 NDS banner layout:
  - bytes 0x000-0x01FF: Icon (4bpp 32x32 bitmap, 512 B)
  - bytes 0x0200-0x0203: u16 version (= 1 = v1 simple)
  - bytes 0x0220-0x023F: 16-color palette BGR555 (LE u16 each)
  - bytes 0x0240-0x083F: 6-language titles × 256 B UTF-16LE
    (Japanese / English / French / German / Italian / Spanish — `\n` 分隔游戏名 + 出版商)

### 7.1 解码结果 (V0.2)

**Games name**: Essential Sudoku DS
**Publisher**: D3 Publisher
**All 6 languages same**:
```
Essential Sudoku DS
D3 Publisher
```

**图标**: 32x32 pixel BGR5A5 + grayscale (见 banner-icon-*.bmp)
- 灰度版用于 v1 banner 验证
- 调色板版若有 palette 数据则用其颜色
- 灰度解释: 16 个像素索引映射到 16 级灰阶 (index 0 = 黑, 15 = 白)

### 7.2 解码工具

`scripts/decode_banner.py`:
- 读 4bpp icon → 32x32 RGB pixels
- 写 BMP (无 numpy/PIL 依赖，universal 可读)
- 读 6 语言 title → JSON
- 调色板位于 0x0220 (BGR555 LE u16 per color)

## 8. 已落地产物 (V0.1.0 + V0.2 + V0.3)

```
rom-data/
├── cart_header.bin       0x0000..0x4000    (16 KB, cart header area)
├── arm9.bin              0x8000..0x108000  (1 MB, ARM9 binary)
├── arm7.bin              0x200000..0x240000 (256 KB, ARM7 binary)
├── banner.bin            0x129600..0x129E40 (2112 B, icon + titles)
├── disasm-arm9-full.txt  V0.3 1 MB ARM-mode walk + skipdata 占位 (14 MB)
├── disasm-arm7-full.txt  V0.3 256 KB ARM-mode walk + skipdata 占位 (3.4 MB)
├── mode-switches.json    V0.3 4681 BX/BLX/LDM/POP→PC switch points
├── function-calls.json   V0.3 7141 BL/BLX calls + 2181 unique callees
├── fat.csv               83 FAT entries  (id, offset, end, size)
├── fnt.hex               FNT 0x530 bytes hex dump + ASCII
├── fnt-mapping.json      V0.1.0 完整 file_id → filename mapping (83 files)
├── probe.txt             ROM offsets 探针 log
├── rom_scan.txt          ROM 区域扫描
├── disasm.txt            V0.0 entry-only 100-line baseline
└── extracted/            V0.2 banner icon BMPs + banner-info.json

scripts/
├── parse_nds_header.py   1× NTR header + 初步 FAT/FNT walker
├── dump_fat.py           FAT → CSV / FNT → hex
├── rom_scan.py           ROM 不同 offset 扫描找 code-like bytes
├── extract_arms.py       ARM9 + ARM7 + banner 抽取
├── disasm_arms.py        V0.0 80-line entry baseline
├── disasm_full_arms.py   V0.3 capstone 全量双 pass + 切换点 + 调用图
├── decode_banner.py      V0.2 NDS banner 解码
└── walk_fnt.py           V0.1.0 FNT 完整 walker (positional file_id)

docs/
├── ROM_STRUCTURE_REPORT.md  本文件 (V0.1 + V0.2 + V0.3 + V0.4+ TODO)
├── ARM_DISASM_REPORT.md     V0.0 baseline (100-line entry-only)
├── ARM9_DISASM_REPORT.md    V0.3 1 MB 全 walk + library 函数表
└── ARM7_DISASM_REPORT.md    V0.3 256 KB 全 walk + library 函数表

BUG.md                      V0.3.0 7 条 known issues
```

## 9. V0.4+ 待办

1. ARM9/ARM7 真 _start 定位 (SVC vector table + BIOS handler) — V0.3.0-005 BUG
2. ARM9/ARM7 完整函数表 + 命名 (libnds / devkitPro / game-specific) — function-calls.json → 推测 function name table
3. NBM 资源解码 (NCGR/NCLR/NCER/NSCR → PNG) — 数独界面图标 + subtitle font
4. SDAT 音频解码 — sound_data.sdat → sseq 序列 / swav 波形
5. numclo*.data 数独题数据格式 (推测: 9×9 = 81 cells × N bytes)
6. numple*.data 数墙 (Number Place / Kakuro) 题数据格式
7. unicorn-engine ARM emulation 跑 trace (resolves 'bx rX') — V0.3.0-004 BUG

---

## 10. V0.3 ARM 反汇编里程碑摘要

| 维度         | 数值                                       |
| ------------ | ------------------------------------------ |
| ARM9 文件大小 | 1 MB (262 144 × 4B)                         |
| ARM9 真指令   | 238 037 ARM + 458 028 Thumb                 |
| ARM9 函数表   | 7141 calls / 2181 unique                   |
| ARM7 文件大小 | 256 KB (65 536 × 4B)                        |
| ARM7 真指令   | 62 590 ARM + 121 743 Thumb                  |
| Mode switches | 4681 (BX 3598 / BLX 1043 / LDM 37 / POP 3) |
| 热点区间      | 0x02024000-0x02028000 (449 switches)        |
| Top lib func  | 0x02028434 (221 callers) - ARM9             |
| Top lib func  | 0x023913B8 (92 callers) - ARM7              |

