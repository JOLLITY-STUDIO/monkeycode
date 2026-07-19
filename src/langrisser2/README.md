# Langrisser II — TypeScript Web 实现

> **项目定位**: Sega 梦幻模拟战 II 的 ROM-to-TypeScript 翻译器。将 68K 汇编直接翻译为 TypeScript 逻辑，不使用 CPU 模拟器。

> **架构原则**: 所有界面通过 Canvas 渲染 (VDP tile + Canvas 2D UI 叠加)，**不使用 HTML DOM 渲染游戏界面**。

---

此项目将 ROM 68K 汇编按照 execution-trace.md 追踪的执行流逐函数翻译为 TypeScript。ROM 视为"源代码"，TypeScript 是"编译结果"。

## 一、项目结构

```
src/langrisser2/
├── 20260713/                    # ROM 分析和 RAM dump 数据
│   ├── analysis/                 # execution-trace.md + rom-analysis-report
│   ├── asm/                      # Ghidra C 反编译 + M68K 反汇编
│   │   ├── Langrisser II (Japan).md.c  # Ghidra 反编译 (39K行)
│   │   └── m68k/rom.asm               # M68K 反汇编
│   └── output/                  # 验证截图
├── game/                        # ★ TypeScript ROM 翻译
│   ├── core/                    # ROM 加载器 + RAM + 类型定义
│   │   ├── RomLoader.ts         # ROM 文件解析
│   │   ├── Ram.ts               # 68K RAM (64KB)
│   │   └── types.ts             # VDP/GENESIS 常量
│   ├── cpu/                     # CPU 模拟器 (备选路径, 非翻译路径)
│   │   ├── Cpu.ts               # 68K CPU
│   │   └── Memory.ts            # 地址空间映射
│   ├── vdp/                     # VDP 显示系统
│   │   ├── VdpChip.ts           # VDP 芯片 (24寄存器)
│   │   ├── VdpPorts.ts          # 端口 I/O
│   │   ├── Vram.ts              # VRAM (64KB)
│   │   ├── Cram.ts              # CRAM (64色)
│   │   └── Renderer.ts          # Canvas 渲染器
│   ├── rom/                     # ★ ROM 翻译路径 (核心)
│   │   ├── RomProgram.ts        # 翻译基类 (VDP桥接/解压/寄存器)
│   │   ├── RomInits.ts          # 步骤6-13: 系统初始化 (866C/C80C等)
│   │   ├── RomTaskSystem.ts     # 任务调度 (1C834→C92C→C93A→C944→C9AA→CA00)
│   │   └── RomDisplayQueue.ts   # 显示队列处理器 (8A6C/9400/9498/9232)
│   ├── boot/                    # ROM Boot (步骤1-5)
│   │   └── BootRom.ts           # TMSS/VDP/Z80/校验/RAM
│   └── resource/                # 解压算法
│       ├── Lzss.ts              # LZSS 解压
│       ├── NibbleRle.ts         # Nibble RLE 解压
│       └── Bitplane.ts          # 位平面解压
├── main-rom.ts                  # ★ 翻译路径入口 (不使用 CPU 模拟器)
├── main.ts                      # 模拟器路径入口 (使用 CPU 模拟器)
├── index-rom.html               # 翻译路径 HTML
└── index.html                   # 模拟器路径 HTML
```

---

## 二、翻译架构

### 2.1 翻译 vs 模拟器

项目有两条并行路径:

| 路径 | 入口 | CPU | 原理 |
|------|------|-----|------|
| **翻译路径** | `main-rom.ts` | ❌ 不使用 | ROM 68K 汇编 → 逐函数翻译为 TS |
| **模拟器路径** | `main.ts` | ✅ 使用 | M68K 模拟器逐指令执行 ROM |

翻译路径的流程:

```
ROM 文件 → RomLoader 解析
  → BootRom (步骤1-5): TMSS/VDP/Z80/校验/RAM
  → RomInits (步骤6-13): 控制器/显示队列/输入/任务/游戏初始化(C80C)
  → RomTaskSystem: 任务链推进 (1C834→1C854→C92C→C93A→C944→C9AA→CA00)
  → RomDisplayQueue: 显示队列处理 (8A6C: VRAM/CRAM DMA)
  → VDP + Canvas: 每帧渲染
```

### 2.2 翻译函数覆盖

| ROM 地址 | 函数 | 翻译状态 | 对应 TS 文件 |
|---------|------|:---:|------|
| `$800A` | Reset 入口 | ✅ | BootRom.ts |
| `$866C` | 控制器初始化 | ✅ | RomInits.initController() |
| `$86B4` | Z80/DMA 初始化 | ✅ | RomInits.initZ80Dma() |
| `$8A6C` | **显示队列处理器** | ✅ | RomDisplayQueue.processDisplayQueue() |
| `$9020` | 输入状态初始化 | ✅ | RomInits.initInputState() |
| `$9172` | 显示列表初始化 | ✅ | RomInits.initDisplayList() |
| `$9232` | 调色板插值 | ✅ | RomDisplayQueue.paletteInterpolate() |
| `$92E6` | 调色板淡入淡出 | ✅ | RomDisplayQueue.paletteFadeDriver() |
| `$93B0` | CRAM DMA 推送 | ✅ | RomDisplayQueue.pushCramDmaCommand() |
| `$9400` | 场景更新推送 | ✅ | RomDisplayQueue.pushSceneCramUpdate() |
| `$942A` | 任务列表清零 | ✅ | RomDisplayQueue.clearTaskLists() |
| `$9498` | 主任务列表迭代器 | ✅ | RomDisplayQueue.iterateTaskList() |
| `$99B2` | 资源加载+解压+DMA | ✅ | RomProgram.decompressResource() + RomTaskSystem |
| `$C80C` | 游戏主初始化 | ✅ | RomInits.initGameMain() |
| `$C92C` | 标题入口 | ✅ | RomTaskSystem._transl_C92C() |
| `$C93A/C944` | 标题画面设置 | ✅ | RomTaskSystem._transl_C93A/_transl_C944() |
| `$C9AA` | 场景过渡+资源加载 | ✅ | RomTaskSystem._transl_C9AA() |
| `$CA00` | 部署主循环 | △ 占位 | RomTaskSystem._transl_CA00() |

### 2.3 显示队列命令 (FUN_00008a6c)

| 命令 | 作用 | TS 处理 |
|:---:|------|---------|
| `$FFF5` | VRAM fill | ✅ `_cmdVramFill()` |
| `$FFF6` | VRAM copy DMA | ✅ `_cmdVramCopy()` |
| `$FFF7` | VRAM read→RAM | ✅ `_cmdVramRead()` |
| `$FFF9` | VRAM DMA (ROM→VRAM) | ✅ `_cmdVramDma()` |
| `$FFFA` | CRAM DMA (调色板) | ✅ `_cmdCramDma()` |
| `$FFFB` | VSRAM DMA | ✅ `_cmdVsramDma()` |
| `$FFFC` | VRAM fill single | ✅ `_cmdVramFillSingle()` |
| `$FFFE` | VDP CTRL write | ✅ `_cmdVdpCtrl()` |
| `$FFFF` | VDP DATA write | ✅ `_cmdVdpData()` |
| 默认 | VRAM word write | ✅ `_cmdVramDefault()` |

---

## 三、ROM 内存映射

| 地址范围 | 大小 | 用途 |
|---------|------|------|
| `$000000-$0000FF` | 256B | 中断向量表 |
| `$000100-$0001FF` | 256B | ROM 头 (SEGA 标志) |
| `$000200-$007FFF` | 31.5KB | 启动代码 |
| `$008000-$00FFFF` | 56KB | 核心系统 (VBLANK/显示队列) |
| `$010000-$05DFFF` | 312KB | 游戏逻辑 |
| `$05E000-$06FFFF` | 88KB | 角色能力/对话 |
| `$0B0000-$0B7FFF` | 32KB | **资源指针表** |
| `$0B8000-$1DBFFF` | ~1.2MB | 压缩图形资源 |
| `$1DC000-$1FFFFF` | 256KB | Z80 音乐数据 |

---

## 四、开发指南

### 翻译路径使用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开 index-rom.html → 选择 ROM 文件 → 自动启动
```

## 五、参考文档

- `20260713/analysis/execution-trace.md` — 启动流程追踪
- `20260713/asm/Langrisser II (Japan).md.c` — Ghidra 反编译
- `20260713/asm/m68k/rom.asm` — M68K 反汇编
3. [rom-analysis-report.md](file:///d:/studio/github/monkeycode/src/langrisser2/20260713/analysis/rom-analysis-report.md) - ROM分析报告
4. Langrisser专题站 - 游戏资料(职业/道具/魔法表)