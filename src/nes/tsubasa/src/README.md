# 天使之翼2 (Captain Tsubasa II - Super Striker) NES 逆向工程

## 目标

**不依赖 `.nes` 原始 ROM 文件，完全还原游戏。**

通过静态离线解析 ROM 中所有 code 和 data，将 6502 汇编逐函数翻译为 TypeScript，配合从 PRG/CHR 提取的静态资源（调色板、nametable、tile patterns），用自己的 PPU 渲染器和游戏逻辑引擎跑起来。

## 架构

```
src/nes/tsubasa/
├── code/                   # 从 6502 汇编翻译的 TypeScript 游戏逻辑
│   ├── Boot.ts             # RESET handler / 启动初始化 ($00:8000~)
│   ├── CoreUtils.ts        # PPU 操作、VBlank 等待、bank 切换等底层
│   ├── Memory.ts           # MMC3 内存映射 (PRG/CHR bank 管理)
│   ├── NMIHandler.ts       # NMI 帧处理器 ($01:8000) NEW
│   ├── ProgressCounter.ts  # 游戏总进度计数器系统 ($26) NEW
│   ├── RomLoader.ts        # .nes 文件解析器 (过渡阶段用)
│   ├── SceneData.ts        # ROM 静态数据表 + 常量/枚举 NEW
│   ├── SceneInterpreter.ts # 场景脚本 bytecode 解释器 ($84E7) NEW
│   └── TitleScreen.ts      # 标题画面逻辑 (当前为临时硬编码数据，待替换)
├── canvas/
│   └── Renderer.ts         # 自研 NES PPU → Canvas 渲染器
├── disasm/
│   ├── prg.txt             # 原始 6502 反汇编 (da65 输出)
│   └── prg_annotated.txt   # CDL 标注版反汇编 (逐行中文注释)
├── data/                   # ROM 数据提取与可视化工具
│   ├── _dump_player_data.html  # 球员数据伴侣(HTML): roster/属性/技能浏览+导出
│   ├── _player_data.ts      # 提取的常量数据(TypeScript模块)
│   ├── _player_data.json    # 提取的常量数据(JSON)
│   ├── _x_dump_players.cjs  # 数据提取脚本(roster→pointer→attrBlock)
│   └── _data_blocks.json    # CDL标注的PRG data段
├── docs/
│   ├── UPGRADE.md           # 球员升级系统 ROM 说明书
│   └── BUGS.md              # Bug 记录与已知问题跟踪
├── romdata/                # ROM 静态分析素材
│   ├── …_prg.bin           # PRG ROM (256KB, MMC3 bank 0x10)
│   ├── …prg-not-logged-15.13.cdl  # FCEUX Code/Data Logger
│   └── …Super Striker (Japan).nes # 原始 ROM (过渡阶段用)
├── index.ts                # 主入口 (加载 ROM, 初始化, 帧循环)
├── index.html              # 页面
├── types.ts                # 类型定义 & NES 常量
└── README.md               # 本文档
```

## ROM 规格

| 属性 | 值 |
|------|-----|
| 平台 | NES / Famicom |
| Mapper | MMC3 (iNES #4) |
| PRG ROM | 256KB (16 × 16KB banks) |
| CHR ROM | 128KB (16 × 8KB banks) |
| 工作 RAM | 2KB ($0000-$07FF) |
| VRAM | 2KB (CIRAM, nametables) |
| 镜像 | 水平 / 垂直 (MMC3 可控) |

### ⚠️ MMC3 Bank 映射注意

`$8000-$9FFF` 和 `$A000-$BFFF` 使用**不同的** MMC3 bank 寄存器，不能简单用线性 `bankOffset()` 映射相同 bank 号。

- `$8000-$9FFF` → MMC3 寄存器 6
- `$A000-$BFFF` → MMC3 寄存器 7（`$8001` 的 `bit6=1` 模式）

实例：代码 `$01:8893 LDA $AA47,X` 读取 roster 数据时，`$AA47` 位于 `$A000-$BFFF` 窗口，实际映射到 **ROM Bank 3**（而非 Bank 1）。

详见 [docs/BUGS.md](docs/BUGS.md)。 |

## 游戏架构概览

### Bank 分布与职责

PRG ROM 256KB = 16 banks × 16KB：

| Bank | 行数 | 职责 |
|------|------|------|
| **$00** | 6,688 | **核心引擎**：场景调度、bytecode 脚本解释器(`$84E7`)、PPU 底层、调色板/输入/音效 |
| **$01** | 894 | **NMI 处理器**：OAM DMA、VRAM 队列刷新、手柄轮询、滚屏、CHR 切换 |
| **$02-$03** | ~10 | 几乎为空（data） |
| **$04** | 939 | 球员/队伍属性数据表 |
| **$05** | 1,828 | AI/脚本解释器、事件处理 |
| **$06-$08** | ~3,500 | 中等代码 bank |
| **$09-$0A** | ~3,150 | **场景数据**：nametable、调色板、精灵布局（指针表在 $A000+） |
| **$0B** | 2,130 | 混合 code/data |
| **$0C** | 6,198 | **比赛引擎主体**：球员移动、物理、碰撞 |
| **$0D** | 4,856 | **比赛引擎**：AI 决策、必杀技触发 |
| **$0E** | 9,166 | 比赛引擎（续）+ 过场动画 |
| **$0F** | 4,934 | 中断向量（RESET/NMI/IRQ）+ 初始化 + 音频 |

### 中断向量

```
$0F:FFFA  .dw $C500  → NMI 入口
$0F:FFFC  .dw $FFF0  → RESET 入口
$0F:FFFE  .dw $C506  → IRQ 入口
```

### 核心 RAM 变量

| 地址 | 名称 | 说明 |
|------|------|------|
| `$1B` | 游戏阶段/场景 ID | 核心状态机变量，bit0=初始化标志 |
| `$1C` | 场景子状态 | 配合 $1B 使用 |
| `$2A` | 比赛状态 | 0=上半场 1=中场 2=下半场 3=结束 |
| `$26` | **游戏总进度计数器** | 不是简单难度值，而是宏观阶段索引（开场合→过场1→标题→选队→比赛…），查 `$83DC`/`$83FE`/`$8420`/`$8398` 表决定加载哪个场景 |
| `$27` | 函数跳转表索引 | Bank $00 主循环依此分发（0=初始化, 1/2/3/4=关卡推进…） |
| `$60` | 球员属性-射门 | 升级系统输入 (见 [UPGRADE.md](docs/UPGRADE.md)) |
| `$61` | 球员属性-传球 | 升级系统输入 |
| `$62` | 球员属性-盘带 | bit7=好/差表现, bit6=路径 |
| `$63` | 球员属性-速度 | → 复制到 $65 |
| `$64` | 球员属性-体力 | → 复制到 $66 |
| `$65` | 球员属性-防守 | = $63 复制 |
| `$66` | 球员属性-技能 | = $64 复制 |
| `$67` | 球员位置 | GK=0, DF=1, MF=2, FW=3 |
| `$69` | 球员等级 | 升级系统输出 |
| `$6A` | 球员经验值 | 升级系统输出 |
| `$6F` | 防守值 | → 汇入 $65 → $63 (防守映射链) |
| `$30/$31` | 球 X/Y 坐标 | |
| `$1E/$1F` | 控制器1按下/按住 | NMI 每帧刷新 |
| `$E6/$E7` | VRAM 缓冲区指针 | |

### 场景脚本解释器（$8464 + $84E7）

过场动画不是硬编码的，而是 **bytecode 脚本引擎** 驱动：

```
$8464(A=场景索引) → 查表定位脚本 ROM 地址 → 设 $4D/$4E 指针
  │
  ▼
$84E7 主循环 (逐字节解释):
  ├─ $00–$D7: 写 tile 数据到 nametable (逐 tile 填屏)
  ├─ $D8–$DF: 帧延时 1–8 帧 (控制动画速度)
  ├─ $E0–$E7: 属性表位置跳转
  ├─ $E8–$FF: 24 种控制操作码
  │   ├─ $EA: 清屏+开PPU (场景切换过渡)
  │   ├─ $F0: 加载新数据块
  │   ├─ $F2: 播放音乐
  │   ├─ $F4: 等待按键输入
  │   ├─ $F5: 画面闪烁/溶解/对话框
  │   ├─ $F8: 滚屏开/关
  │   ├─ $F9: 进入比赛引擎
  │   ├─ $FC: 加载调色板
  │   └─ $FD: 推进滚屏 (平滑卷轴)
  └→ $8879: 递增指针 → 读下一条
```

### 渲染管道（逐帧）

```
脚本 bytecode → $84E7 解释 → $88CA 写入 VRAM 队列 ($05E8)
                                  │
NMI ($01:8000) 每帧:
  ├→ OAM DMA → 清 VRAM 队列 → 写 PPU $2006/$2007
  ├→ 写调色板 $3F00
  ├→ 写滚屏 $2005 (实现平滑卷轴)
  ├→ CHR bank 切换 $8000/$8001 (精灵动画翻页)
  └→ 手柄轮询
                                  │
Bank $0F 动画效果引擎 ($C500–$D000, 30+ 种):
  ├→ 比赛事件视觉效果 (射门/扑救/过人特效)
  ├→ 过场转场效果
  └→ MMC3 bank 切换封装
```

### 游戏启动流程

```
RESET → Bank $0F 初始化
  → Bank $00 主循环 ($27=0)
  → $83DC[$26] 表查开场场景索引
  → $8464 运行开场动画 bytecode (过场1, 过场2…)
  → $26 ++ → $27=1,2,3,4 推进更多过场
  → 到达标题画面 → 等按键 → Start
  → $C578 过渡效果 → $8464 场景 #$01 → 比赛引擎
```

## romdata 文件用途

| 文件 | 用途 | 状态 |
|------|------|------|
| `.nes` | 完整 ROM，包含 PRG + CHR，CHR tiles 可从此直接提取 | 过渡阶段使用，最终移除依赖 |
| `_prg.bin` | 纯 PRG ROM 数据，与 .nes 中 PRG 段完全一致 | 静态分析使用 |
| `.cdl` | FCEUX Code/Data Logger，每个 PRG 字节标记是 Code / Data / Unvisited | **核心参考**：区分代码段和数据段，知道哪些地址是 nametable/palette table 等 |
| `prg_annotated.txt` | 6502 完整反汇编 + 中文注释 (da65 + CDL 标注) | **翻译代码的唯一依据** |

### CDL 解析方式

CDL 文件每个字节对应 PRG 的一个字节，标记含义：
- `0x00` = Unvisited（未执行，可能是 data 或 unused code）
- `0x01` = Code（确认被执行过的指令字节）
- `0x02` = Data（确认被作为 data 读取的字节）

## 整体策略

**不是针对某一个场景做一帧渲染，而是做全量静态解析。** 标题画面、选队、比赛、过场动画……所有场景应该是这套流程自动覆盖到的结果，而不是单独目标。

### 三步走

```
第1步: CDL 全量扫描
  └→ 标记 PRG 每个字节是 code / data / unvisited
  └→ 按 bank 统计，识别纯 data bank vs 纯 code bank
  └→ 找出所有连续 data 块，按大小推测用途
      (如 960 bytes → nametable, 32 bytes → palette, 256 bytes → OAM page, …)

第2步: Data 段批量提取
  └→ 从 CDL 标注的 data 段里，把 nametable、palette table、tile map、
      文本表、关卡数据、球队/球员属性表、脚本数据……全部导出为 JS/TS 模块
  └→ 从 CHR ROM 导出 8×8 tile patterns (128KB / 16 banks)

第3步: Code 逐函数翻译
  └→ 参考 prg_annotated.txt，逐个 bank 翻译
  └→ Bank $00:  主循环 / 场景调度 / PPU 底层操作
  └→ Bank $01~$0F: 标题画面、选队菜单、比赛引擎、剧情对白、过场动画
  └→ Bank $Fx:   中断向量 / MMC3 入口
  └→ 翻译结果直接引用第 2 步导出的数据模块
```

> **标题画面只是 Bank 里某个函数 + 某段 nametable + 某组 palette 的自然结果，不是单独列一个待办的目标。**

## 当前状态 & 待办

### ✅ 已完成
- MMC3 内存映射（PRG/CHR bank 切换）
- 自研 PPU → Canvas 渲染器（pattern table → nametable → 输出）
- ROM 解析器 (iNES header)
- 场景脚本 bytecode 解释器 (`$84E7`) → `SceneInterpreter.ts`
- 场景脚本入口 (`$8464`) → `SceneInterpreter.ts`
- 游戏总进度计数器系统 (`$26` + 查表) → `ProgressCounter.ts`
- NMI 帧处理器 (`$01:8000`) → `NMIHandler.ts`
- ROM 静态数据表提取 (4 张进度映射表 + 延时表 + bank选择表) → `SceneData.ts`
- CHR tile 数据提取 (16 banks × 512 tiles) → `data/chrBanks.ts`
- PRG data 块提取 (590 块) → `data/_data_blocks.json`
- 球员赛后升级/经验系统 (`$00:8CC1-$8D90`) → `code/PlayerUpgrade.ts` + `docs/UPGRADE.md` (ROM 说明书)

### 📋 待办

**阶段 1 — CDL / Data 提取（基础设施）**
- [x] CDL 全量扫描脚本：每 bank code/data 分布统计
- [x] 从 CHR ROM 批量导出 8×8 tile Uint8Array 数据
- [x] 导出 data 段为 `data/` 模块
- [ ] 识别所有 nametable/palette 数据源 (通过代码链路追踪 $2007 写入)

**阶段 2 — Code 翻译**
- [x] Bank $00 核心循环 & 场景调度
- [x] Bank $00 场景脚本引擎 ($84E7 + $8464 + 进度系统)
- [x] Bank $01 NMI 帧处理器
- [ ] Bank $0C/$0D/$0E 比赛引擎（球员移动、AI、物理、必杀技）
- [ ] Bank $0F 动画效果函数 ($C500-$D000, 15+ 种)
- [ ] Bank $06 音乐/音效系统
- [ ] Bank $09/$0A 场景数据指针表 + bytecode 提取

**阶段 3 — 集成**
- [ ] SceneInterpreter + ProgressCounter 集成到 Boot.ts 主循环
- [ ] NMIHandler 集成到 index.ts 帧循环
- [ ] 提取 Bank $09/$0A 场景 bytecode → 标题画面自动还原
- [ ] 移除 `.nes` 文件依赖

## 开发规范

- 翻译 6502 代码时需在注释中标明原 ROM 地址和原指令
- 例如：`// $00:802F  LDA #$0D  → 加载调色板组号`
- CDL 标注中 `Data` 段的字节是静态数据，直接提取为常量/Uint8Array
- CDL 标注中 `Code` 段对应需要逐函数翻译的 6502 指令

## 数据伴侣工具

`data/_dump_player_data.html` — 独立 HTML 工具，直接加载 `.nes` ROM 文件，无需构建：

- **阵容浏览**: 按比赛场次查看双方球队 11 人阵容
- **球员详情**: 查看 classType、属性指针、Bank $03 基础能力、属性块 RLE 解码、特技/类型标记/动作表
- **全球员搜索**: 按 ID 或 dec 值搜索所有出现过的球员
- **数据导出**: JSON 导出全部提取数据

使用：浏览器打开 `_dump_player_data.html` → 选择 `.nes` 文件即可。
