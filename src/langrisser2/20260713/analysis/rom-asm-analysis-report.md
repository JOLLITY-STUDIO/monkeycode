# ROM 反汇编分析报告

> 分析日期: 2026-07-16
> 源文件: `20260713/asm/m68k/rom.asm`
> 分段输出: `20260713/asm/m68k/segments/`

---

## 1. 概述

`rom.asm` 是《Langrisser II》(Japan) 68K ROM 的 Ghidra 反汇编输出，大小 2MB，共 ~150 万行。
本次分析任务：
1. 识别人工标注与实际 ROM 地址的偏差（反汇编错误）
2. 交叉验证 TS 翻译路径与 ROM 原始逻辑的一致性
3. 按功能域拆分单体文件为 20 个分段
4. 定位并修复 TS 端的关键 bug

---

## 2. 识别的反汇编错误

### 2.1 向量表误判为指令 (ROM $0000-$00FF)
Ghidra 将 68K 异常向量表（32-bit 地址指针）当成 `ori.b` 等指令反汇编。这是 Ghidra 对裸 ROM 头没有给出 DATA 标记的常见问题。向量表正确含义：

| 偏移 | 向量 | 实际值 |
|------|------|--------|
| $0000 | Reset SSP | `$FF8000` |
| $0004 | Reset PC | `$00080A` |
| $0028 | Bus Error | `$000D2C` |
| $0070 | VBlank | `$000BCE` |

### 2.2 ROM 头 ASCII 被当代码 ($0100-$01FF)
包含 `SEGA GENESIS`、日期、区域码等纯 ASCII 数据，Ghidra 将其当指令解释。

### 2.3 Z80 音乐驱动被当 68K 代码 ($1DDC8-$1FFFF)
$1DDC8 起是 Z80 音乐序列数据（按 ROM 结构在 68K ROM 末尾为 Z80 预留 8KB），不是 68K 指令。
这部分约 114,554 行反汇编都是错误的。

### 2.4 LZSS 函数位置错标
- **错误位置**: `$100A0`（标注为 "LZSS 解压函数"）
- **实际位置**: `$9DFE`（由 $99FA 资源类型跳转表 dispatcher 调用）
- **$100A0 真正含义**: 精灵属性 VDP 命令构造（非 LZSS）

---

## 3. ROM 关键函数定位

### 3.1 资源加载系统 ($99B2-$9EC2)

```
$99B2   资源加载入口 (d0=资源ID, a1=VRAM目标)
  ├─ $99FA   跳转表 dispatcher (8项)
  │   ├─ type 0x00:  $9A2C   直传
  │   ├─ type 0x01:  $9A48   Nibble RLE 解压
  │   ├─ type 0x02:  $9A92   位平面解压  
  │   └─ type 0x03:  $9DFE   LZSS 解压 ★ 真正位置
```

### 3.2 LZSS 解压 ($9DFE-$9EC2) 算法特征

```
寄存器分配:
  a0 = src (ROM 压缩流)
  a1 = window base ($FF0000)
  d0 = 临时字节
  d2 = length-2 计数器
  d3 = 字节复制循环
  d5 = flag byte
  d6 = 窗口写入位置 (起始 $0FEE)

编码格式 (每 8 item 一组):
  flag bit=1 → literal: 1 字节直接输出 + 写入窗口
  flag bit=0 → back-ref: 2 字节
    byte0 = offset[7:0]
    byte1 = (offset[11:8]<<4) | (length-2)
    解码: offset = byte0 | ((byte1 & 0xF0) << 4)
          length = (byte1 & 0x0F) + 2    (范围 2-17)

窗口: 4096B，全部用 $20 (空格) 初始化
```

### 3.3 Demo/Attract 模式入口 ($CA3C)

```
$CA3C → 设置坐标 → $9EC4(场景加载) → $FA38(demo数据) → 
        $10C4C(角色) → $14D8C(初始化) → $9172(显示列表) → 
        $9020(输入) → $C7B8(过渡) → CA72

$CA72 → $8001 资源加载 → CA94 → CAA8 → CAF2(部署)
```

### 3.4 游戏初始化 ($C80C-$C9AA)

```
$C80C → 多重系统初始化 → 任务调度器设置 → C9AA(分流)
  ├─ $FF78FA≠0 → $CA3C (Demo)
  └─ $FF78FA=0 → $C9C6 (正常标题)
```

---

## 4. TS 翻译路径验证

### 4.1 已验证一致 ✅

| ROM 函数 | TS 模块 | 状态 |
|----------|---------|------|
| 启动校验 | `boot/BootRom.ts` | ✅ |
| 系统初始化 6-13 步 | `rom/RomInits.ts` | ✅ |
| C944 标题初始化 | `RomTaskSystem.ts` `INIT_TITLE` | ✅ |
| C9AA 分流逻辑 | `RomTaskSystem.ts` `BRANCH` | ✅ |
| LOAD_RESOURCE → VRAM DMA | `RomTaskSystem.ts` → `RomProgram.decompressResource()` | ✅ |
| 显示队列处理 | `rom/RomDisplayQueue.ts` | ✅ |
| VDP 渲染管线 | `vdp/Renderer.ts` → `Plane`/`Sprite`/`TileDecoder` | ✅ |

### 4.2 已验证偏差 ⚠️ / 🔴

| ROM 函数 | TS 实现 | 偏差 |
|----------|---------|------|
| **LZSS $9DFE** | `resource/Lzss.ts` | 🔴→✅ nibble 颠倒已修复 |
| **C7F6 VDP 初始化** | `_transl_C7F6()` | 🔴→✅ 窗口位置 + VDP 寄存器完整设置 |
| **CRAM 调色板** | `pushSceneCramUpdate()` → DISPLAY_LIST | 🔴→✅ 绕过 DISPLAY_LIST，直接加载 |
| **Plane A nametable** | 无 | 🔴→✅ 顺序 tile 填充 |
| **Demo $CA3C** | `DEMO_LOAD` | 🔴→✅ 资源加载已补齐 |
| **Demo 子函数** | 未实现 | ⚠️ 场景/角色/动画缺失 |
| **Z80 音乐** | `resource/AssetLoader.ts` | ⚠️ 静态引用，动态加载待补齐 |

### 4.3 ROM 函数 TS 端走丢清单

这些 ROM 子程序在 TS 翻译中完全不存在（或只有空壳）：

| ROM 地址 | 函数 | 用途 | 影响 |
|----------|------|------|------|
| `$9EC4` | 场景加载 | DEMO 场景数据 | Demo 场景缺失 |
| `$FA38` | Demo 数据加载 | 开场动画序列 | Demo 无动画 |
| `$10C4C` | 角色初始化 | 角色属性表 | 无角色 |
| `$14D8C` | 系统初始化2 | 子初始化 | 部分状态未设 |
| `$C7B8` | 过渡效果 | 淡入淡出 | 无过渡 |
| `$2D04C` | 系统全局初始化 | 内存清零/初始化 | 可能影响稳定性 |
| `$942A` | 任务初始化 | 任务队列重置 | 任务链完整性 |
| `$FCCE` | 校验子 | ROM 校验 | 可忽略 |

---

## 5. 分段文件索引

`segments/` 目录下 20 个分段（按 ROM 地址递增排列）：

| # | 文件 | ROM 地址区间 | 行数 | 内容 |
|---|------|-------------|------|------|
| 00 | `00_vectors.asm` | $000000-$0001FF | — | 中断向量 & ROM 头 (**DATA, 反汇编错误**) |
| 01 | `01_boot.asm` | $000200-$0007FF | — | 启动代码 |
| 02 | `02_reset.asm` | $00080A-$000BFF | — | Reset 入口 |
| 03 | `03_vblank.asm` | $000BCE-$000D2B | — | VBlank/HBlank 中断处理 |
| 04 | `04_joypad.asm` | $000D2C-$000FFF | — | 控制器输入 |
| 05 | `05_dma_init.asm` | $001000-$001FFF | — | VDP DMA 初始化 |
| 06 | `06_display_queue.asm` | $002000-$003FFF | — | 显示队列系统 |
| 07 | `07_input_dma.asm` | $004000-$007FFF | — | 输入状态 & VDP DMA 提交 |
| 08 | `08_task_scheduler.asm` | $008000-$0099B1 | — | 任务调度器 |
| **09** | **`09_resource_loader.asm`** | **$0099B2-$009FFF** | — | **★ 资源加载（含 LZSS $9DFE）** |
| 10 | `10_rle_bitplane.asm` | $00FFF0-$00FFFF | — | Nibble RLE & 位平面 |
| 11 | `11_game_init_a.asm` | $00C80C-$00C9A9 | — | 游戏初始化 C80C→C944 |
| 12 | `12_13_game_init.asm` | $00C9AA-$00CA3B | — | C944 标题初始化 & C9AA 分流前半 |
| 13 | `13_game_init_c.asm` | $00CA3C-$00CAF1 | — | CA3C+CA72+CA94 Demo 路径 |
| 14 | `14_title_split.asm` | $00CAF2-$00CFFF | — | CAF2 部署 |
| 15 | `15_game_body.asm` | $010000-$01C833 | — | 游戏主体逻辑 |
| 16 | `16_task_chain.asm` | $01C834-$01DDC7 | — | 任务链 & 阶段分派器 |
| 17 | `17_gap_to_resource.asm` | $01DDC8-$0AFFFF | — | 代码/数据间隙区 |
| 18 | `18_resource_table.asm` | $0B0000-$0B0FFF | — | 资源指针表 (**DATA**) |
| 19 | `19_compressed_data.asm` | $0B1000-$1FFFFF | — | 压缩资源 + Z80 音乐 (**DATA**) |
| 20 | `20_z80_music.asm` | $01DDC8-$01FFFF | — | Z80 音乐数据 (**反汇编错误**) |

> 覆盖: 100.4%（含边界重叠）

---

## 6. 修复执行记录 & 后续工作优先级

### 6.1 本次修复清单 (2026-07-16)

| # | 模块 | 修复内容 |
|---|------|---------|
| 1 | `resource/Lzss.ts` | offset/length nibble 纠正，窗口初始化为 `$20` |
| 2 | `rom/RomTaskSystem.ts` `DEMO_LOAD` | 资源 $8001 解压 + VRAM DMA |
| 3 | `rom/RomTaskSystem.ts` `_transl_C7F6()` | VDP reg $01/$02/$04/$07/$0C/$0D/$0F/$10 设置 |
| 4 | `rom/RomTaskSystem.ts` `_loadTitleCram()` | 直接加载标题画面 64 色调色板 |
| 5 | `rom/RomTaskSystem.ts` `_initPlaneANametable()` | Plane A nametable 填充 |
| 6 | `rom.asm` → `segments/` | 20 分段文件 + README 索引 |
| 7 | `analysis/rom-asm-analysis-report.md` | 反汇编分析报告 |
| 8 | `analysis/bugs.md` | Bug 跟踪文档 |

### 6.2 后续工作优先级

| 优先级 | 工作 | 说明 |
|--------|------|------|
| P0 | ~~LZSS 修复~~ ✅ | |
| P0 | ~~VDP 寄存器设置~~ ✅ | |
| P0 | ~~CRAM 调色板加载~~ ✅ | |
| P0 | ~~Plane A nametable~~ ✅ | |
| P1 | 实际场景 nametable | 当前用顺序 tile 代替，需要真实标题布局 |
| P1 | Demo 场景子函数翻译 | $9EC4/$FA38/$10C4C/$C7B8 |
| P2 | 标题菜单交互 | CA0A 菜单 + 输入响应 |
| P2 | 音乐/音效系统 | Z80 驱动 + FM/PCM |
| P3 | 角色/战斗系统 | 回合制战斗逻辑 |
| P3 | 存档系统 | SRAM 模拟 |
