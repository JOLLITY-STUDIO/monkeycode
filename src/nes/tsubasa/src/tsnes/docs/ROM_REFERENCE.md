# 🎮 Angel Wing (天使之翼 / Captain Tsubasa II: Super Striker) — ROM 完整参考手册

> **ROM:** Captain Tsubasa II - Super Striker (Japan)  
> **Mapper:** 4 (MMC3 / TxROM)  
> **PRG-ROM:** 32 × 8KB = 256KB (Banks 0–31)  
> **CHR-ROM:** 16 × 8KB = 128KB (Banks 0–15)  
> **NES CPU:** 6502, NTSC @ 60Hz  
> **自动生成日期:** 2026-08-06  
> **最后更新:** 2026-08-07 (Bank 依赖关系)

---

## 目录

1. [整体架构](#整体架构)
2. [MMC3 Bank 映射机制](#mmc3-bank-映射机制)
3. [Bank 总览表](#bank-总览表)
4. [固定 Bank 详解](#固定-bank-详解)
   - [Bank 31 — Interrupt Vectors & Utils (FIXED)](#bank-31-e000ffff--interrupt-vectors--utils-fixed--中断向量--通用工具)
   - [Bank 30 — Core System Library (FIXED)](#bank-30-c000dfff--core-system-library-fixed--核心系统层)
5. [可切换 Bank 详解](#可切换-bank-详解)
   - [Bank 00 — Boot & Main Menu](#bank-00--boot--main-menu--系统初始化--标题菜单主循环)
   - [Bank 01 — Data Query Service](#bank-01--data-query-service--数据查询服务球员队伍赛事数据检索)
   - [Bank 02 — Scene Controller & Field Setup](#bank-02--scene-controller--field-setup--场景控制器--场地渲染初始化--多-bank-数据迭代器)
   - [Bank 03 — Narration Typewriter Text (PT1)](#bank-03--narration-typewriter-text-pt1--解说过场打字机文本数据)
   - [Bank 04 — Narration Typewriter Text (PT2)](#bank-04--narration-typewriter-text-pt2--解说过场打字机文本-part-2)
   - [Bank 05 — Team Formation & Tactics](#bank-05--team-formation--tactics--队伍阵型策略数据--纯数据)
   - [Bank 06 — Story Script Data (PT1)](#bank-06--story-script-data-pt1--剧情脚本数据块含大量未访问)
   - [Bank 07 — Story Script Data (PT2)](#bank-07--story-script-data-pt2--剧情脚本数据块)
   - [Bank 08 — Dialog Text Data (PT1)](#bank-08--dialog-text-data-pt1--对话文本数据-part-1)
   - [Bank 09 — Dialog Text Data (PT2)](#bank-09--dialog-text-data-pt2--对话文本数据-part-2)
   - [Bank 10 — Scene Map & Location](#bank-10--scene-map--location--场景描述地图定位数据)
   - [Bank 11–12 — Match Turn Logic](#bank-11--match-turn-logic-pt1--比赛回合逻辑--行动数据)
   - [Bank 13–15 — Animation Data](#bank-13--animation-frames-pt1--动画过场帧数据-part-1--纯数据)
   - [Bank 16 — Special Moves & Skills](#bank-16--special-moves--skills--特殊动作技能逻辑数据)
   - [Bank 17–18 — Large Data Blocks](#bank-17--large-data-block-pt1--大型数据块-part-1--纯数据)
   - [Bank 19–25 — Auxiliary & Extended Data](#bank-19--auxiliary-logic--data--辅助逻辑--数据低利用率)
   - [Bank 26 — Match Core Engine](#bank-26--match-core-engine--比赛核心引擎)
   - [Bank 27–29 — Data & Extended](#bank-27--data--minimal-code--数据密集型--极少量代码)
6. [CPU 内存映射](#cpu-内存映射)
7. [CHR-ROM Bank 映射](#chr-rom-bank-映射)
8. [RAM 变量速查](#ram-变量速查)
9. [中断向量表](#中断向量表)
10. [ROM 数据文件结构 (TypeScript 侧)](#rom-数据文件结构-typescript-侧)

---

## 整体架构

```
┌──────────────────────────────────────────────────────────────┐
│                    NES CPU 6502 地址空间                        │
│                                                              │
│  $FFFA–$FFFF │ 中断向量 (Bank 31 尾部)  │ NMI / RESET / IRQ   │
│  $E000–$FFF9 │ Bank 31 (固定/FIXED)     │ 8KB — 系统服务层     │
│  $C000–$DFFF │ Bank 30 (固定/FIXED)     │ 8KB — 核心系统层     │
│  $A000–$BFFF │ Bank Switch (0-29任意)   │ 8KB — 数据/逻辑      │
│  $8000–$9FFF │ Bank Switch (0-29任意)   │ 8KB — 数据/逻辑      │
│  $6000–$7FFF │ WRAM (电池存档)          │ 8KB                  │
│  $4020–$5FFF │ 扩展寄存器               │                      │
│  $2000–$401F │ PPU / APU 寄存器         │                      │
│  $0000–$1FFF │ RAM (零页+堆栈+工作区)   │ 2KB                  │
└──────────────────────────────────────────────────────────────┘
```

游戏采用 **MVC 架构思路**:  
- **Model**: Banks 03–10, 13–15, 17–18, 21, 23, 25, 27, 29（纯数据）  
- **View**: PPU 渲染（CHR Bank + 属性表 + 调色板）  
- **Controller**: Banks 00, 02, 11–12, 16, 19–20, 22, 24, 26, 28（代码 + 逻辑）

---

## MMC3 Bank 映射机制

```
MMC3 Bank 选择寄存器 ($8000 / $8001):

  $8000 写入 bank select (command):
    bit 7:     PRG bank mode (0=swap $8000, 1=swap $A000)
    bit 6:     CHR bank inversion
    bits 2-0:  target register index (0-7)
    
  $8001 写入 data (value):
    对应当前 register index 的 bank 编号

PRG 寄存器 (reg 6/7):
  reg 6 → $8000-$9FFF 窗口
  reg 7 → $A000-$BFFF 窗口
  
固定窗口:
  $C000-$DFFF → 倒数第2个 bank (Bank 30)
  $E000-$FFFF → 最后1个 bank (Bank 31)

初始映射 (PRG mode 0):
  $8000-$9FFF ← Bank 0
  $A000-$BFFF ← Bank 1
  $C000-$DFFF ← Bank 30 (FIXED)
  $E000-$FFFF ← Bank 31 (FIXED)
```

---

## Bank 总览表

| Bank | English Name | 地址映射 | 代码B | 数据B | 未访问 | 类型 | 功能描述 |
|------|-------------|---------|-------|-------|--------|------|---------|
| 0 | Boot & Main Menu | $8000 (SWITCHABLE) | 7274 (89%) | 427 (5%) | 491 (6%) | 🔧 代码密集型 | 系统初始化 & 标题/菜单主循环 — 通过 $9FA8 切换 PRG bank |
| 1 | Data Query Service | $8000 (SWITCHABLE) | 4239 (52%) | 3556 (43%) | 397 (5%) | 🔧 代码密集型 | 球员/队伍数据查询服务 → 调用 Bank 02 $A72C |
| 2 | Scene Selector & Password | $8000 (SWITCHABLE) | 1828 (22%) | 245 (3%) | 6119 (75%) | 📭 低利用率 | 场景/密码/选择界面 & 多 bank 交织数据迭代器 ($A72C) |
| 3 | Narration Typewriter Text (PT1) | $8000 (SWITCHABLE) | 0 (0%) | 8186 (100%) | 6 (0%) | 📦 数据密集型 | 解说/过场打字机文本 — CHR tile 索引序列，$FC 分隔，被 $A72C 以 mask=$03 交织读取 |
| 4 | Narration Typewriter Text (PT2) | $8000 (SWITCHABLE) | 0 (0%) | 8158 (100%) | 34 (0%) | 📦 数据密集型 | 解说/过场打字机文本 — CHR tile 索引序列，$FC 分隔，Bank 03 的 Part 2 |
| 5 | Team Formation & Tactics | $8000 (SWITCHABLE) | 0 (0%) | 8157 (100%) | 35 (0%) | 📦 数据密集型 | 队伍阵型/策略数据 — 纯数据 |
| 6 | Story Script Data (PT1) | $8000 (SWITCHABLE) | 0 (0%) | 3345 (41%) | 4847 (59%) | 📦 数据密集型 | 剧情/脚本数据块 (Part 1) |
| 7 | Story Script Data (PT2) | $8000 (SWITCHABLE) | 0 (0%) | 3908 (48%) | 4284 (52%) | 📦 数据密集型 | 剧情/脚本数据块 (Part 2) — 被 $A72C 以 mask=$07 读取 |
| 8 | Dialog Text Data (PT1) | $8000 (SWITCHABLE) | 0 (0%) | 6358 (78%) | 1834 (22%) | 📦 数据密集型 | 对话文本数据 (Part 1) |
| 9 | Dialog Text Data (PT2) | $8000 (SWITCHABLE) | 0 (0%) | 6645 (81%) | 1547 (19%) | 📦 数据密集型 | 对话文本数据 (Part 2) |
| 10 | Scene Map & Location | $8000 (SWITCHABLE) | 0 (0%) | 7039 (86%) | 1153 (14%) | 📦 数据密集型 | 场景描述/地图定位数据 |
| 11 | Match Turn Logic (PT1) | $8000 (SWITCHABLE) | 1477 (18%) | 5958 (73%) | 757 (9%) | 📦 数据密集型 | 比赛回合逻辑 & 行动数据 |
| 12 | Match Turn Logic (PT2) | $8000 (SWITCHABLE) | 1674 (20%) | 6088 (74%) | 430 (5%) | 📦 数据密集型 | 比赛回合逻辑 & 行动数据 |
| 13 | Animation Frames (PT1) | $8000 (SWITCHABLE) | 0 (0%) | 8176 (100%) | 16 (0%) | 📦 数据密集型 | 动画/过场帧数据 (Part 1) — 纯数据 |
| 14 | Animation Data (PT2) | $8000 (SWITCHABLE) | 0 (0%) | 8177 (100%) | 15 (0%) | 📦 数据密集型 | 动画/演出数据 (Part 2) — 纯数据 |
| 15 | Animation Data (PT3) | $8000 (SWITCHABLE) | 0 (0%) | 8134 (99%) | 58 (1%) | 📦 数据密集型 | 动画/演出数据 (Part 3) — 纯数据 |
| 16 | Special Moves & Skills | $8000 (SWITCHABLE) | 1860 (23%) | 4599 (56%) | 1733 (21%) | 📦 数据密集型 | 特殊动作/技能逻辑+数据 |
| 17 | Large Data Block (PT1) | $8000 (SWITCHABLE) | 0 (0%) | 7239 (88%) | 953 (12%) | 📦 数据密集型 | 大型数据块 (Part 1) — 纯数据 |
| 18 | Large Data Block (PT2) | $8000 (SWITCHABLE) | 0 (0%) | 7616 (93%) | 576 (7%) | 📦 数据密集型 | 大型数据块 (Part 2) — 纯数据 |
| 19 | Auxiliary Logic & Data | $8000 (SWITCHABLE) | 877 (11%) | 5021 (61%) | 2294 (28%) | 📦 数据密集型 | 辅助逻辑 & 数据（低利用率） |
| 20 | Match Auxiliary Logic | $8000 (SWITCHABLE) | 2002 (24%) | 6070 (74%) | 120 (1%) | 📦 数据密集型 | 比赛辅助逻辑 & 数据 |
| 21 | Extended Data Storage | $8000 (SWITCHABLE) | 0 (0%) | 6901 (84%) | 1291 (16%) | 📦 数据密集型 | 扩展数据存储 — 纯数据 |
| 22 | Data+Code Hybrid | $8000 (SWITCHABLE) | 453 (6%) | 7388 (90%) | 351 (4%) | 📦 数据密集型 | 数据密集型 + 少量代码 |
| 23 | Extended Data Storage | $8000 (SWITCHABLE) | 0 (0%) | 8047 (98%) | 145 (2%) | 📦 数据密集型 | 扩展数据存储 — 纯数据 |
| 24 | AI & Decision Logic | $8000 (SWITCHABLE) | 2774 (34%) | 4686 (57%) | 732 (9%) | 📦 数据密集型 | AI/决策逻辑 & 数据 |
| 25 | Extended Data Storage | $8000 (SWITCHABLE) | 0 (0%) | 7520 (92%) | 672 (8%) | 📦 数据密集型 | 扩展数据存储 — 纯数据 |
| 26 | Match Core Engine | $8000 (SWITCHABLE) | 7331 (89%) | 584 (7%) | 277 (3%) | 🔧 代码密集型 | 比赛核心引擎（最大代码 Bank，7331B 代码） |
| 27 | Data + Minimal Code | $8000 (SWITCHABLE) | 384 (5%) | 6021 (73%) | 1787 (22%) | 📦 数据密集型 | 数据密集型 + 极少量代码 |
| 28 | Auxiliary Logic & Data | $8000 (SWITCHABLE) | 2871 (35%) | 4189 (51%) | 1132 (14%) | 📦 数据密集型 | 辅助逻辑 & 数据 |
| 29 | Extended Data (Low Usage) | $8000 (SWITCHABLE) | 0 (0%) | 3866 (47%) | 4326 (53%) | 📦 数据密集型 | 扩展数据（低利用率）— 纯数据 |
| 30 | Core System Library (FIXED) | $C000 (FIXED) | 6350 (78%) | 1495 (18%) | 347 (4%) | 🔧 代码密集型 | 核心系统库（PPU/APU/控制器/数学）FIXED @ $C000 — 被 Bank 00, 31 调用 |
| 31 | Interrupt Vectors & Utils (FIXED) | $E000 (FIXED) | 3951 (48%) | 3387 (41%) | 854 (10%) | 🔧 代码密集型 | 中断向量 & 通用工具 FIXED @ $E000 — 依赖 Bank 30, 被 Boot 调用 |

---

## 固定 Bank 详解

### Bank 31 ($E000–$FFFF) — Interrupt Vectors & Utils (FIXED) — 中断向量 & 通用工具

**最后 8KB PRG，永远映射到 $E000–$FFFF**

**内容统计:** 代码 3951 bytes, 数据 3387 bytes

#### 中断向量表 ($9FF0–$9FFF)

| 地址 | 内容 | 说明 |
|------|------|------|
| `$9FF0` | `LDA #$00; STA $8000` | IRQ 入口：重置 MMC3 IRQ 锁存 |
| `$9FF3` | `JMP $C503` | 跳转到 Bank 30 的 IRQ 处理 |
| `$9FFA` | `NMI` (低字节) | ALWAYS = $00 |
| `$9FFB` | `NMI` (高字节) | ALWAYS = $C5 → NMI 向量 = $C500 |
| `$9FFC` | `RESET` (低字节) | ALWAYS = $F0 |
| `$9FFD` | `RESET` (高字节) | ALWAYS = $FF → RESET 向量 = $FFF0 |
| `$9FFE` | `IRQ` (低字节) | ALWAYS = $06 |
| `$9FFF` | `IRQ` (高字节) | ALWAYS = $C5 → IRQ 向量 = $C506 |

#### Bank 31 核心子程序

Bank 31 包含 ~3951 bytes 代码，主要提供：

1. **Bank 切换辅助函数** — 调用其他 bank 前的封装
2. **数据解压/格式转换** — 将压缩数据从 ROM 写入 RAM/VRAM
3. **通用工具函数** — 被所有 bank 共享的底层例程
4. **$9F00–$9FEF** — 大段未使用空间 ($FF 填充)

---

### Bank 30 ($C000–$DFFF) — Core System Library (FIXED) — 核心系统层

**倒数第2个 8KB PRG，永远映射到 $C000–$DFFF**

**内容统计:** 代码 6350 bytes, 数据 1495 bytes

Bank 30 是游戏最重要的系统层，包含所有 bank 共享的核心基础设施。也是 **Bank 31 的唯一对外接口**——Bank 31 固定于 $E000-$FFFF，无法安全访问 $8000-$BFFF 可切换窗口，所有跨 bank 调用统一通过 Bank 30 的 JMP 跳转表转发：
- PPU 通信服务（写 VRAM、切换 NT、加载调色板）
- MMC3 Bank 切换封装（切换后自动转发到目标 bank）
- 音频引擎 API
- 控制器读取
- 通用数学/比较/数据复制工具
- 事件/场景跳转调度

**启动时 Bank 30 负责将 Bank 00 映射到 $8000（常驻工具层）、Bank 02 映射到 $A000（首屏场景），然后跳入 Bank 02 启动游戏。**

---

## 可切换 Bank 详解

### Bank 00 — 系统服务层 + 主循环引擎（System Service Layer & Main Loop）

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (7274B 代码 + 427B 数据 + 491B 未访问)

> **⚠️ 注意**: Bank 00 不是"系统初始化"——硬件初始化在 Bank 30($C64E) 完成。Bank 00 的角色是：
> - **主循环引擎** (`$9EED`)：6 槽位定时器调度器，驱动整个游戏流程
> - **系统服务层**：PPU 控制($98A0)、VRAM 操作($9A43/$99F0)、定时器注册($9F69)、Bank 切换($9FA8)
> - **标题/菜单逻辑**：通过主循环驱动标题画面和主菜单

#### 依赖关系

| 方向 | Bank |
|------|------|
| 使用 → | Bank 02, 30, 31 |
| 被使用 ← | Bank 30（启动时通过 R6=0 映射到 $8000 常驻）、**Bank 02**（场景初始化时密集调用 Bank 00 的 PPU/VRAM/定时器服务） |

- 通过 `$9FA8` 切换任意 PRG bank
- 调用 Bank 02 的子程序进行关卡加载
- **被 Bank 30 在 RESET 时映射到 $8000-$9FFF 作为常驻服务层**
- **Bank 02 启动时密集依赖 Bank 00**：场景初始化路径中至少 8 处 `JSR $9xxx` 调用（$9A43 VRAM初始化、$98A0 PPU重置、$9B7F nametable设置、$9F69×3 定时器注册）
- **`$9EED` 是主循环入口**（最终目的地）：6 槽定时器调度 → 到期时切换 MMC3 bank → 等 NMI(Bank 30) → 循环

#### 内容特点

- 📏 ROM 区域: 0x000010-0x00200F

**类型:** 重量级代码 bank — 包含大量可执行逻辑

---

### Bank 01 — Data Query Service — 数据查询服务（球员/队伍/赛事数据检索）

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (4239B 代码 + 3556B 数据 + 397B 未访问)

#### 依赖关系

| 方向 | Bank |
|------|------|
| 使用 → | Bank 02, 03, 04, 07 |
| 被使用 ← | — |

- 调用 Bank 02 的 `$A72C` 关卡数据加载器来读取 Bank 03/04/07 的数据

#### 内容特点

- 📏 ROM 区域: 0x002010-0x00400F

**类型:** 中等代码 bank — 功能模块逻辑

---

### Bank 02 — Scene Controller & Field Setup — 场景控制器 / 场地渲染初始化 / 多 Bank 数据迭代器

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (1828B 代码 + 245B 数据 + 6119B 未访问)

#### 依赖关系

| 方向 | Bank |
|------|------|
| 使用 → | Bank 03, 04, 07 |
| 被使用 ← | Bank 00, 01 |

#### 核心子程序: `$A72C` — 多 Bank 交织数据表迭代器

该函数按 mask 过滤机制从多个 Bank 中交替读取记录：

```
输入:
  ram_00E9 = A     → 参数/记录类型
  ram_00EA         → 计数器
  ram_00EB         → mask (写间隔: $03→每4次, $07→每8次)
  ram_00EC         → 高字节步进 (通常 $FE/$FF)
  ram_00ED         → 低字节步进

循环 X 次:
  ram_04E4 += ram_00ED       // 推进 16-bit 指针
  ram_04E7 += ram_00EC
  if (ram_04E7 & ram_00EB) != 0:  // mask 决定写间隔
    skip write
  else:
    ram_0468+Y = ram_04E4    // 写 4 字节记录
    ram_0469+Y = ram_00E9
    ram_046A+Y = ram_00EA
    ram_046B+Y = ram_04E7
    Y += 4
  JSR $9FA8  → 切换 PRG bank (下一个 bank/下一数据)

输出: ram_0468~04EF 内的 4 字节记录数组
```

关键发现：这是**记录表迭代器**而非数据解包器（不做压缩展开，只做 mask 过滤+bank 切换）。

#### 内容特点

- 📏 ROM 区域: 0x004010-0x00600F

**类型:** 场景选择器 + 密码界面 + 数据迭代器 — 核心数据表密集区域

---

#### 数据表结构化解析

Bank 02 包含 **16 张已识别的数据表**，覆盖场景跳转、场地渲染、OAM 修正、镜头滚动等领域。
以下按 CPU 地址升序排列：

##### 1. 计数初始值表 `$A677` (4 bytes)

位置: `$8000` bank 内偏移 `$2677`（PRG offset `$4677`）
代码引用: `$8767`

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | counterA | 计数器 A 初始值 |
| 1 | 1 | counterB | 计数器 B 初始值 |
| 2 | 1 | flagC | 标志 C |
| 3 | 1 | flagD | 标志 D |

##### 2. 球门/场地数据 `$8792` (48 bytes, recordSize=4)

代码引用: `$87C2`

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | x | X 坐标 tile 索引 |
| 1 | 1 | y | Y 坐标 tile 索引 |
| 2 | 1 | w | 宽度 tiles |
| 3 | 1 | h | 高度 tiles |

> 共 12 条记录，定义球门区域及矩形填充。

##### 3. 球门后/边界数据 `$87FF` (52 bytes)

代码引用: `$8833`

| off | size | name | desc |
|-----|------|------|------|
| 0 | 4 | goalType | 球门类型标识 |
| 4 | 16 | goalTiles | 球门后方 tile 序列 |
| 20 | 16 | boundTiles | 边界 tile 序列 |
| 36 | 16 | colorAttrs | 颜色属性区 |

##### 4. 场景跳转/分发表 `$83DC` (165 bytes, recordSize=3)

代码引用: `$849E` 等
> 每个条目 3 字节: `[BANK, ADDR_LO, ADDR_HI]`，场景选择时查表跳转。共 55 条。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | bank | 目标 PRG Bank 号 ($00-$1F) |
| 1 | 1 | addrLo | 目标地址低字节 |
| 2 | 1 | addrHi | 目标地址高字节 |

##### 5. 初始跳转表 `$806A` (13 bytes)

代码引用: `$8080`

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | flag | 未知标志 |
| 1 | 12 | jumpTargets | 跳转地址 (12×1 byte = 6×16-bit entries) |

##### 6. 帧同步参数区 `$813C` (40 bytes)

> NMI 退出后加载到零页，PPU 控制 / MMC3 配置参数。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 8 | ppuCtrl | PPU 控制寄存器碎片(scroll/nametable/nmi/vram) |
| 8 | 4 | mmc3Regs | MMC3 Bank 寄存器写入序列 |
| 12 | 8 | bankSwitch | PRG/CHR Bank 选择值 |
| 20 | 4 | scrollXY | 卷轴 X/Y (2×16-bit) |
| 24 | 4 | irqLatch | IRQ latch 参数 |
| 28 | 12 | padding | 保留/未使用 |

##### 7. IRQ 参数区 `$81E8` (28 bytes)

> IRQ 处理完成后配置，scanline 中断后续参数。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 4 | mmc3Cmd | MMC3 命令序列 |
| 4 | 8 | scrollSet | 滚动参数设置 |
| 12 | 8 | irqNext | 下一次 IRQ 参数 |
| 20 | 8 | padding | 保留区域 |

##### 8. 场地大段数据 Header `$8902` (213 bytes)

代码引用: `$84C1`–`$85DC`

| off | size | name | desc |
|-----|------|------|------|
| 0 | 2 | ppuAddr | PPU 目标地址 (16-bit) |
| 2 | 1 | length | 写入字节数 |
| 3 | 20 | palette | 调色板/属性数据 |
| 23 | 6 | ntScroll | NT 卷轴/坐标参数 |
| 29 | 8 | chrBanks | CHR Bank 选择 |
| 37 | 16 | sprSetup | 精灵初始化参数 |
| 53 | 160 | blockData | 场地块数据 (→ ram_0500 区域) |

##### 9. AA47 前导段 `$8A24` (39 bytes)

代码引用: `$88B7` 通过 `$88BD` 读取写入 `ram_0300`（11 次每 12 字节步进）

| off | size | name | desc |
|-----|------|------|------|
| 0 | 12 | block0 | 写入 ram_0300+$00..+$0B |
| 12 | 12 | block1 | 写入 ram_0300+$0C..+$17 |
| 24 | 12 | block2 | 写入 ram_0300+$18..+$23 |
| 36 | 3 | tail | 末尾 3 字节 |

##### 10. Metatile→Tile 展开表 ($AA47) `$8A47` (79 bytes)

代码引用: `$8895`
> 3 组 × 12×2=72B + 额外 7B。组 0=上半场(草地), 组 1=中场中圈, 组 2=下半场(禁区)。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 10 | tiles_g0 | 组 0: 10 个 tile 索引 → ram_0408 |
| 10 | 1 | attr_g0 | 组 0: 属性字节 → ram_002C |
| 11 | 1 | scrollX_g0 | 组 0: 水平滚动索引 → ram_002A |
| 12 | 10 | tiles_g1 | 组 1: 10 个 tile 索引 |
| 22 | 1 | attr_g1 | 组 1: 属性字节 |
| 23 | 1 | scrollX_g1 | 组 1: 水平滚动索引 |
| 24 | 10 | tiles_g2 | 组 2: 10 个 tile 索引 |
| 34 | 1 | attr_g2 | 组 2: 属性字节 |
| 35 | 1 | scrollX_g2 | 组 2: 水平滚动索引 |
| 36 | 43 | extra | 附加数据 (备用/对齐填充) |

##### 11. 场地参数表 ($AA97) `$8A97` (82 bytes)

代码引用: `$8655`
> 由 $8655 循环读取。每 3 字节一组。第 0 字节高位置 1 表示循环继续，bit6=1 表示换 VRAM 页面。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | ctrl | 控制字节 — bit7=循环标志 bit6=翻页标志 |
| 1 | 1 | srcBankOfs | 数据来源 Bank:偏移 (到 $9B28 查询) |
| 2 | 1 | xDstCount | 目标写入次数+1 (=实际次数-1) |

##### 12. 滚动参数表 `$8AF3` (10 bytes, recordSize=2)

代码引用: `$8300`
> 5 组 × 2 字节 signed 16-bit，在不同场地段应用的水平滚动 delta。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | scrollLo | 滚动增量低字节 (signed 8) |
| 1 | 1 | scrollHi | 滚动增量高字节 (signed 8) |

##### 13. OAM 边界修正表 v1 `$8B03` (10 bytes)

代码引用: `$8379`–`$839E`
> Y = 0,4,8,12 查表，修正精灵 X/Y 坐标。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 2 | group0 | Y=0: [cmpThresh, addend] — 若 X>=cmpThresh 则置0，然后 X+=addend(lo) & Y+=addend(hi) |
| 2 | 2 | group1 | Y=4 |
| 4 | 2 | group2 | Y=8 |
| 6 | 2 | group3 | Y=12 |
| 8 | 2 | group4 | Y=16 |

##### 14. OAM 边界修正表 v2 `$8B13` (10 bytes)

> 与 v1 结构相同，用于不同场地类型的边界修正。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 2 | group0 | Y=0: [cmpThresh, addend] |
| 2 | 2 | group1 | Y=4 |
| 4 | 2 | group2 | Y=8 |
| 6 | 2 | group3 | Y=12 |
| 8 | 2 | group4 | Y=16 |

##### 15. 镜头滚动低字节表 (AADF) `$8ADF` (64 bytes, recordSize=2)

代码引用: `$8308`
> `LDA $AADF,Y → ADC ram_00E6,X`。每 2 字节 signed 16-bit 增量加到 X 方向滚动。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | dxLo | 水平滚动 delta 低字节 (signed 8) |
| 1 | 1 | dxHi | 水平滚动 delta 高字节 (signed 8) |

##### 16. 镜头滚动高字节表 (AAE0) `$8AE0` (63 bytes, recordSize=2)

代码引用: `$8312`
> `LDA $AAE0,Y → ADC ram_007A,X`。Y 方向滚动 delta。

| off | size | name | desc |
|-----|------|------|------|
| 0 | 1 | dyLo | 垂直滚动 delta 低字节 (signed 8) |
| 1 | 1 | dyHi | 垂直滚动 delta 高字节 (signed 8) |

---

### Bank 03 — Narration Typewriter Text (PT1) — 解说/过场打字机文本数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 8186B 数据 + 6B 未访问)

#### 依赖关系

| 方向 | Bank |
|------|------|
| 使用 → | — |
| 被使用 ← | Bank 02 |

- 被 Bank 02 的 `$A72C` 以 `ram_00EB=$03` (mask=每4次写1记录) 交织读取
- 输出 4 字节记录到 `ram_0468`–`04EF` 工作缓冲区

#### 内容特点

- 📏 ROM 区域: 0x006010-0x00800F
- 数据分布: 全谱系均匀 (0x00–0x0F 占 25.6%, 0xF0–0xFF 占 13.4%)
- 高频值: $00 (481次), $FC (353次), $FD (111次)
- 🔍 **已确认**: 数据为 <strong>CHR tile 索引序列</strong>，映射 CHR Bank 00 PT0 (tile #0–255)
- 每个字节对应一个 8×8 图块，$FC 作为记录分隔符
- 典型内容: 日文假名/汉字（平假名+片假名+日文汉字），用于比赛解说和过场旁白
- 以「打字机」效果逐字输出到 Nametable — 已通过 CHR tile 映射验证（可见「大空翼」「シュート」等）
- ⚠️ **复合文字图块**: 部分 tile 索引（如 `$AF`、`$A0` 等高位区段）并非直接显示单个字符，而是与 CHR 中的 **浊点（゛）/半浊点（゜）** 图块上下拼合，形成「が/ざ/だ/ば/ぱ」等带变音符号的假名。这与密码输入界面（password entry UI）中的日文假名键盘布局一致，CHR 内约有 20 个上下组合用 tile。
- 因此 Bank 03 的某些字节需要按「基础假名 tile + 浊点/半浊点 tile」组合解读，而非单个 tile 直译。

**类型:** 纯文本数据 bank — CHR tile 索引序列（解说/旁白，含复合假名 tile）

---

### Bank 04 — Narration Typewriter Text (PT2) — 解说/过场打字机文本 (Part 2)

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 8158B 数据 + 34B 未访问)

#### 依赖关系

| 方向 | Bank |
|------|------|
| 使用 → | — |
| 被使用 ← | Bank 02 |

- 与 Bank 03 格式相同，同为 $A72C 以 mask=$03 交织读取
- CHR tile 索引序列，$FC 分隔，含浊点/半浊点复合 tile

#### 内容特点

- 📏 ROM 区域: 0x008010-0x00A00F
- 数据分布与 Bank 03 高度一致 ($00–0x0F 占 23.3%, 0xF0–0xFF 占 15.2%)
- 高频值: $00 (414次), $FC (333次), $FD (117次)

**类型:** 纯文本数据 bank — CHR tile 索引序列（解说/旁白 Part 2）

---

### Bank 05 — Team Formation & Tactics — 队伍阵型/策略数据 — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 8157B 数据 + 35B 未访问)

#### 依赖关系

| 方向 | Bank |
|------|------|
| 使用 → | — |
| 被使用 ← | Bank 01 |

- 被 Bank 01 的数据查询服务读取

#### 内容特点

- 📏 ROM 区域: 0x00A010-0x00C00F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 06 — Narration Typewriter Text (PT3) — 解说/过场打字机文本 (Part 3)

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 3345B 数据 + 4847B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x00C010-0x00E00F
- 🅿️ 指针表 + 变长记录结构（同 Bank 03/04）
- 🔹 `$FC` 作为记录分隔符
- 🔹 CHR tile 索引序列，含浊点（`$94`）/半浊点复合假名 tile

**类型:** 纯数据 bank — 打字机文本序列

---

### Bank 07 — Field Metatile Layout — 足球场地 Metatile 布局数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 3908B 数据 + 4284B 未访问)

#### 依赖关系

| 方向 | Bank |
|------|------|
| 使用 → | — |
| 被使用 ← | Bank 02 |

- 被 Bank 02 的 `$A72C` 以 `ram_00EB=$07` (mask=每8次写1记录) 读取
- 输出 4 字节记录到 `ram_0468`–`04EF`

#### 内容特点

- 📏 ROM 区域: 0x00E010-0x01000F

**类型:** 混合型 — 代码 0% / 数据 48%

---

### Bank 08 — Dialog Text Data (PT1) — 对话文本数据 (Part 1)

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 6358B 数据 + 1834B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x010010-0x01200F

**类型:** 数据密集型 — 以数据为主，少量辅助逻辑

---

### Bank 09 — Dialog Text Data (PT2) — 对话文本数据 (Part 2)

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 6645B 数据 + 1547B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x012010-0x01400F

**类型:** 数据密集型 — 以数据为主，少量辅助逻辑

---

### Bank 10 — Scene Map & Location — 场景描述/地图定位数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 7039B 数据 + 1153B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x014010-0x01600F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 11 — Match Turn Logic (PT1) — 比赛回合逻辑 & 行动数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (1477B 代码 + 5958B 数据 + 757B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x016010-0x01800F

**类型:** 数据密集型 — 以数据为主，少量辅助逻辑

---

### Bank 12 — Audio Engine (入口) 🎵 — 音频引擎核心代码 + 音乐数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (839B 代码 + 6088B 数据 + 440B 未访问)  
**确认:** 2026-08-08 trace 验证 — 开场 BGM 依赖此 bank

#### 音频引擎入口点

| PC 地址 | 功能 |
|---------|------|
| `$818E` | 音轨状态更新 / 音符参数读取 |
| `$81A0` | 音色/效果处理 |
| `$81B7` | 频率值写入 APU ($4002-$4003) |
| `$81CC` | 音长/帧计数更新 |
| `$8002` | 音频请求处理入口 (NMI 触发) |

#### 内容特点

- 📏 ROM 区域: 0x018010-0x01A00F
- 🎵 代码只占 11.4%，其余是音频引擎内部数据 + SID 音效数据
- 🔗 与 Bank 15 配合：引擎代码读取 Bank 15 的 BGM 序列数据 → 解析 E0/E2/E3 指令 → 写入 APU 寄存器

**类型:** 音频引擎 — 少量引擎代码 + 大量音频数据

---

### Bank 13 — Animation Frames (PT1) — 动画/过场帧数据 (Part 1) — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 8176B 数据 + 16B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x01A010-0x01C00F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 14 — Animation Data (PT2) — 动画/演出数据 (Part 2) — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 8177B 数据 + 15B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x01C010-0x01E00F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 15 — Opening BGM Data 🎵 — 开场动画 BGM 音乐序列数据 — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 2119B 被读取数据 + 6073B 未使用)  
**确认:** 2026-08-08 trace 验证 — 4500 帧中 2119 个唯一字节被音频引擎读取

#### BGM 数据段划分

```
$0000-$16FF  (5888 bytes)  未使用
$1700-$1701  (2 bytes)     标志/计数器
$1702-$17AC  (171 bytes)   未使用
$17AD-$1FF1  (2117 bytes)  ⭐ 4轨BGM音序器数据
  $17AD-$17B8 (12 bytes)   音轨指针表 (4 tracks × 2B 指针)
  $17B9-$1FF1 (~2105 bytes) 音轨序列 (E0=音符 E2=音色 E3=音长 E9=跳转 FF=结束)
$1FF2-$1FFF  (14 bytes)    未使用
```

#### 内容特点

- 📏 ROM 区域: 0x01E010-0x02000F
- 🎵 4 通道音序器数据：SQ1(主旋律) + SQ2(副旋律) + TRI(低音) + NOISE(鼓点)
- 🔗 被 Bank 12 音频引擎读取，在 F280 首帧开始访问
- 📊 数据密度 25.9%，底部 2117 字节为有效 BGM 数据
- 详细分析见: [bank15-opening-bgm-analysis.md](./bank15-opening-bgm-analysis.md)

**类型:** 纯音乐数据 bank — 开场动画 BGM 专用

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 16 — Special Moves & Skills — 特殊动作/技能逻辑+数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (1860B 代码 + 4599B 数据 + 1733B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x020010-0x02200F

**类型:** 数据密集型 — 以数据为主，少量辅助逻辑

---

### Bank 17 — Large Data Block (PT1) — 大型数据块 (Part 1) — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 7239B 数据 + 953B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x022010-0x02400F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 18 — Large Data Block (PT2) — 大型数据块 (Part 2) — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 7616B 数据 + 576B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x024010-0x02600F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 19 — Auxiliary Logic & Data — 辅助逻辑 & 数据（低利用率）

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (877B 代码 + 5021B 数据 + 2294B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x026010-0x02800F

**类型:** 数据密集型 — 以数据为主，少量辅助逻辑

---

### Bank 20 — Match Auxiliary Logic — 比赛辅助逻辑 & 数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (2002B 代码 + 6070B 数据 + 120B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x028010-0x02A00F

**类型:** 中等代码 bank — 功能模块逻辑

---

### Bank 21 — Extended Data Storage — 扩展数据存储 — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 6901B 数据 + 1291B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x02A010-0x02C00F

**类型:** 数据密集型 — 以数据为主，少量辅助逻辑

---

### Bank 22 — Data+Code Hybrid — 数据密集型 + 少量代码

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (453B 代码 + 7388B 数据 + 351B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x02C010-0x02E00F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 23 — Extended Data Storage — 扩展数据存储 — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 8047B 数据 + 145B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x02E010-0x03000F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 24 — AI & Decision Logic — AI/决策逻辑 & 数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (2774B 代码 + 4686B 数据 + 732B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x030010-0x03200F

**类型:** 中等代码 bank — 功能模块逻辑

---

### Bank 25 — Extended Data Storage — 扩展数据存储 — 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 7520B 数据 + 672B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x032010-0x03400F

**类型:** 纯数据 bank — 大容量静态数据表

---

### Bank 26 — Match Core Engine — 比赛核心引擎

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (7331B 代码 + 584B 数据 + 277B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x034010-0x03600F

**类型:** 重量级代码 bank — 包含大量可执行逻辑

---

### Bank 27 — Data + Minimal Code — 数据密集型 + 极少量代码

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (384B 代码 + 6021B 数据 + 1787B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x036010-0x03800F

**类型:** 数据密集型 — 以数据为主，少量辅助逻辑

---

### Bank 28 — Auxiliary Logic & Data — 辅助逻辑 & 数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (2871B 代码 + 4189B 数据 + 1132B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x038010-0x03A00F

**类型:** 中等代码 bank — 功能模块逻辑

---

### Bank 29 — Extended Data (Low Usage) — 扩展数据（低利用率）— 纯数据

**地址:** `$8000 或 $A000` (可切换)  
**大小:** 8192 bytes (0B 代码 + 3866B 数据 + 4326B 未访问)

#### 内容特点

- 📏 ROM 区域: 0x03A010-0x03C00F

**类型:** 混合型 — 代码 0% / 数据 47%

---


## 补充：各 Bank 数据用途推测

> 由于反汇编文件无语义标签，以下从 CDL 访问模式、代码交叉引用和数据结构推测

### Bank 03–04: Narration Text / Player Attributes

- **Bank 03 (Narration Typewriter Text PT1)**: 🔍 已确认为 CHR tile 索引序列，映射 CHR Bank 00 PT0，$FC 分隔记录 → 解说/过场打字机文本（日文假名+汉字）
- **Bank 04 (Player Attributes)**: 8KB 数据块 (8158B)，全谱系字节分布，同为 $A72C 交织迭代器读取
- 被 Bank 02 的 `$A72C` **多 bank 交织迭代器**读取，不是解包器
- `ram_00EB=$03` 作为 mask（每4次迭代写入1条记录），输出 4 字节记录到 RAM `$0468`
- 每条记录包含: 2字节指针 + 1字节参数 + 1字节类型标志

### Bank 05: 队伍/阵型数据
- 8157B 纯数据，队伍成员列表、阵型编号、策略偏好
- Story Mode 对手队伍定义

### Bank 06–07: 剧情/比赛脚本
- Bank 06: 3345B 数据 (4847B 未使用)，Bank 07: 3908B 数据
- 按场景/章节组织的剧情事件序列
- 触发条件 → 对话/动画/比分修改 → 下一事件链接
- Bank 07 被 Bank 02 的 `$A72C` (mask=$07) 以交织迭代方式读取

### Bank 08–09: Dialog Text Data
- Bank 08: 6358B, Bank 09: 6645B — 日文对话文本（CHR tile 索引序列）
- 球员台词、解说文字、菜单字符串

### Bank 11–12: 比赛回合逻辑 + 音频引擎

- Bank 11: 1477B 代码 + 5958B 数据
- **Bank 12: 🎵 音频引擎入口 (839B 代码 + 6088B 数据)** — 4个核心子例程 ($818E/$81A0/$81B7/$81CC) 驱动 BGM 播放
- 球员移动 AI、球物理/轨迹计算、抢断/拦截判定、体力消耗计算
- 数据定义动作阈值、概率表、裁判判定规则

### Bank 13–15: 动画/演出数据 + BGM

- 纯数据 Bank: Bank 13 (8176B), Bank 14 (8177B)
- **Bank 15: 🎵 开场 BGM 数据 (2119B 被读取)** — 4 轨道音序器，$17AD-$1FF1 为主数据段
- 动画帧序列、过场演出参数、特殊效果定义
- 💡 **音频最小集**: Bank 12(引擎) + Bank 15(BGM) = 完整开场动画音乐

### Bank 26: 比赛核心引擎
- **7331B 代码** — 所有 bank 中最大的代码量 (89% 代码覆盖率)
- 核心比赛循环：攻防转换 → 动作选择 → 动画触发 → 结果判定 → 状态更新
- 包含完整的球员状态机和比赛规则引擎

### Bank 30 ($C000): 核心系统库 — Bank 31 的唯一对外接口
- 6350B 代码 + 1495B 数据 — 被所有 bank 调用的底层服务
- VRAM 写入、Palette 加载、Controller 读取、MMC3 控制、音频引擎 API
- **JMP 跳转表模式**: Bank 31 不直接调用 $8000-$BFFF 可切换窗口，全部通过 Bank 30 跳转表转发
- **启动映射**: RESET 时将 R6=Bank0($8000常驻工具), R7=Bank2($A000首屏场景)
- **依赖**: Bank 0, 2（启动时映射/装载）
- **被调用**: Bank 0（$C4B9 等切换函数）、Bank 31（所有外部调用走跳转表）

### Bank 31 ($E000): 中断向量 + 系统工具（FIXED 顶层）
- 3951B 代码 + 3387B 数据 — RESET 启动入口、比赛主循环
- `$FFFA-$FFFF` 中断向量表：NMI→$C500, RESET→$FFF0, IRQ→$C506（全部跳 Bank 30）
- `$FFF0` RESET 代码：仅复位 MMC3 后 JMP $C503，真正初始化全在 Bank 30
- **代码中无任何直接 $8000-$BFFF 调用** — 防止调用当前未映射的 bank
- **依赖**: Bank 30（唯一直接依赖），**被调用**: Bank 0（通过 Bank 30 间接）

---
```

## Bank 依赖关系图

> 根据汇编代码中 JSR / JMP 调用链和 MMC3 bank 切换分析确定

```
┌─────────────────────────────────────────────────────────────┐
│                     PRG Bank 依赖关系图                        │
│                                                             │
│  [31] FIXED 中断向量 ($E000-$FFFF)                          │
│   │ 仅依赖 → [30]（所有外部调用走 Bank 30 JMP 跳转表）        │
│   │ 不直接调 $8000-$BFFF 任何地址                            │
│   ▼                                                        │
│  [30] FIXED 系统库 ($C000-$DFFF) — Bank 31 的唯一对外接口      │
│   │ 启动: R6=0→$8000(Bank 00), R7=2→$A000(Bank 02)          │
│   │ NMI 处理、PPU/APU/控制器服务                              │
│   │ 被调用 ← [00] [31]                                      │
│   │ 映射/装载 → [00] [02]（启动时 MMC3 配置）                 │
│   ▼                                                        │
│  [00] 系统服务层 + 主循环引擎 ($9EED) ← 最终目的地            │
│   │ 使用 → [02] + [30] + [31]                               │
│   │ PPU/VRAM/定时器/bank切换 服务                            │
│   │ 被调用 ← [30](启动映射) + [02](场景初始化密集调用)        │
│   ▼                                                        │
│  [02] 场景控制器 ($A200 启动入口)                             │
│   │ 使用 → [00] + [03] + [04] + [07]                        │
│   │ 场景初始化→JMP $9EED 进入主循环                        │
│   │ 被调用 ← [00], [01], [30](启动映射)                      │
│   ▼                                                        │
│  [01] 数据查询服务                                          │
│   │ 使用 → [02] + [03] + [04] + [07]                        │
│   ▼                                                        │
│    ┌────────┼────────┐                                      │
│    ▼        ▼        ▼                                      │
│  [03]     [04]     [07]                                     │
│  游戏数据  游戏数据  游戏数据                                 │
│                                                             │
│  [05] 队伍/阵型 — 被 [01] 读取                               │
│                                                             │
│  ─── 完整启动链 ───                                          │
│  RESET → [31]→[30]→[00+02]→[02] 初始化→[00]$9EED 主循环      │
└─────────────────────────────────────────────────────────────┘
```

### 关系速查表

| Bank | 角色 | 使用 → | 被 ← |
|------|------|--------|------|
| **00** | 系统服务层 + 主循环引擎 ($9EED) | 02, 30, 31 | 30（启动时映射$8000）、02（场景初始化密集调用） |
| **01** | 数据查询服务 | 02, 03, 04, 07 | — |
| **02** | 场景控制器 ($A200 启动入口) | 03, 04, 07 , **00** | 00, 01, 30（启动时映射$A000） |
| **03** | 游戏数据表 Part 1 | — | 02 |
| **04** | 游戏数据表 Part 2 | — | 02 |
| **05** | 队伍阵型/策略 | — | 01 |
| **07** | 游戏数据表 Part 3 | — | 02 |
| **30** | 核心系统库 (FIXED) — Bank 31 的唯一对外接口 | 00, 02（启动时 MMC3 映射装载） | 00, 31 |
| **31** | 中断向量 (FIXED) — 不直调 $8000-$BFFF | 30（唯一直接依赖） | 00（通过 Bank 30 间接） |



===

## 附录 A: 代码 Bank 速查（按代码量排序）

| Bank | 代码量 | 数据量 | 未访问 | 特征 |
|------|--------|--------|--------|------|
| 26 | 7331B | 584B | 277B | ⭐ 核心引擎 — 比赛核心引擎（最大代码 Bank，7331B 代码） |
| 0 | 7274B | 427B | 491B | ⭐ 核心引擎 — 系统服务层 + 主循环引擎($9EED) → 依赖 Bank 02/30/31 |
| 30 | 6350B | 1495B | 347B | 🔒 FIXED (系统级) — 核心系统库（PPU/APU/控制器/数学）FIXED @ $C000 |
| 1 | 4239B | 3556B | 397B | 🔧 逻辑模块 — 数据查询服务 → 调用 Bank 02 $A72C |
| 31 | 3951B | 3387B | 854B | 🔒 FIXED (系统级) — 中断向量 & 通用工具 FIXED @ $E000 |
| 28 | 2871B | 4189B | 1132B | ⚡ 混合型 — 辅助逻辑 & 数据 |
| 24 | 2774B | 4686B | 732B | ⚡ 混合型 — AI/决策逻辑 & 数据 |
| 20 | 2002B | 6070B | 120B | ⚡ 混合型 — 比赛辅助逻辑 & 数据 |
| 16 | 1860B | 4599B | 1733B | ⚡ 混合型 — 特殊动作/技能逻辑+数据 |
| 2 | 1828B | 245B | 6119B | 🔧 逻辑模块 — 场景控制器（$A200 启动入口，依赖 Bank 00 服务） |

## 附录 B: 纯数据 Bank 速查（按数据量排序）

| Bank | 数据量 | 未访问 | 数据密度 | 推测内容 |
|------|--------|--------|---------|---------|
| 3 | 8186B | 6B | 100% | 游戏数据表 (Part 1) — 被 $A72C 以 mask=$03 交织读取 |
| 14 | 8177B | 15B | 100% | 动画/演出数据 (Part 2) — 纯数据 |
| 13 | 8176B | 16B | 100% | 动画/过场帧数据 (Part 1) — 纯数据 |
| 4 | 8158B | 34B | 100% | 游戏数据表 (Part 2) — 被 $A72C 交织读取 |
| 5 | 8157B | 35B | 100% | 队伍阵型/策略数据 — 纯数据 |
| 15 | 8134B | 58B | 99% | 动画/演出数据 (Part 3) — 纯数据 |
| 23 | 8047B | 145B | 98% | 扩展数据存储 — 纯数据 |
| 18 | 7616B | 576B | 93% | 大型数据块 (Part 2) — 纯数据 |
| 25 | 7520B | 672B | 92% | 扩展数据存储 — 纯数据 |
| 17 | 7239B | 953B | 88% | 大型数据块 (Part 1) — 纯数据 |
| 10 | 7039B | 1153B | 86% | 场景描述/地图定位数据 |
| 21 | 6901B | 1291B | 84% | 扩展数据存储 — 纯数据 |
| 9 | 6645B | 1547B | 81% | 文本/对话数据 (Part 2) |
| 8 | 6358B | 1834B | 78% | 文本/对话数据 (Part 1) |
| 7 | 3908B | 4284B | 48% | 游戏数据表 (Part 3) — 被 $A72C 以 mask=$07 读取 |
| 29 | 3866B | 4326B | 47% | 扩展数据（低利用率）— 纯数据 |
| 6 | 3345B | 4847B | 41% | 中型数据块（剧情/脚本）（含大量未访问） |

## 附录 C: 混合 Bank 速查

| Bank | 代码量 | 数据量 | 角色 |
|------|--------|--------|------|
| 22 | 453B | 7388B | 数据密集型 + 少量代码 |
| 12 | 1674B | 6088B | 比赛回合逻辑 & 行动数据 |
| 27 | 384B | 6021B | 数据密集型 + 极少量代码 |
| 11 | 1477B | 5958B | 比赛回合逻辑 & 行动数据 |
| 19 | 877B | 5021B | 辅助逻辑 & 数据（低利用率） |

## 附录 D: ROM 数据文件对应关系

| ROM Offset | Bank | TS 文件 | 大小 |
|------------|------|---------|------|
| 0x000000 | 0 | `rom-data/prg-bank-00.ts` | 49.1KB |
| 0x002000 | 1 | `rom-data/prg-bank-01.ts` | 49.1KB |
| 0x004000 | 2 | `rom-data/prg-bank-02.ts` | 49.1KB |
| 0x006000 | 3 | `rom-data/prg-bank-03.ts` | 49.1KB |
| 0x008000 | 4 | `rom-data/prg-bank-04.ts` | 49.1KB |
| 0x00A000 | 5 | `rom-data/prg-bank-05.ts` | 49.1KB |
| 0x00C000 | 6 | `rom-data/prg-bank-06.ts` | 49.1KB |
| 0x00E000 | 7 | `rom-data/prg-bank-07.ts` | 49.1KB |
| 0x010000 | 8 | `rom-data/prg-bank-08.ts` | 51.6KB |
| 0x012000 | 9 | `rom-data/prg-bank-09.ts` | 49.1KB |
| 0x014000 | 10 | `rom-data/prg-bank-10.ts` | 49.1KB |
| 0x016000 | 11 | `rom-data/prg-bank-11.ts` | 49.1KB |
| 0x018000 | 12 | `rom-data/prg-bank-12.ts` | 49.1KB |
| 0x01A000 | 13 | `rom-data/prg-bank-13.ts` | 49.1KB |
| 0x01C000 | 14 | `rom-data/prg-bank-14.ts` | 49.1KB |
| 0x01E000 | 15 | `rom-data/prg-bank-15.ts` | 49.1KB |
| 0x020000 | 16 | `rom-data/prg-bank-16.ts` | 49.1KB |
| 0x022000 | 17 | `rom-data/prg-bank-17.ts` | 49.1KB |
| 0x024000 | 18 | `rom-data/prg-bank-18.ts` | 49.1KB |
| 0x026000 | 19 | `rom-data/prg-bank-19.ts` | 49.1KB |
| 0x028000 | 20 | `rom-data/prg-bank-20.ts` | 49.1KB |
| 0x02A000 | 21 | `rom-data/prg-bank-21.ts` | 49.1KB |
| 0x02C000 | 22 | `rom-data/prg-bank-22.ts` | 49.1KB |
| 0x02E000 | 23 | `rom-data/prg-bank-23.ts` | 49.1KB |
| 0x030000 | 24 | `rom-data/prg-bank-24.ts` | 49.1KB |
| 0x032000 | 25 | `rom-data/prg-bank-25.ts` | 49.1KB |
| 0x034000 | 26 | `rom-data/prg-bank-26.ts` | 49.1KB |
| 0x036000 | 27 | `rom-data/prg-bank-27.ts` | 49.1KB |
| 0x038000 | 28 | `rom-data/prg-bank-28.ts` | 49.1KB |
| 0x03A000 | 29 | `rom-data/prg-bank-29.ts` | 49.1KB |
| 0x03C000 | 30 | `rom-data/prg-bank-30.ts` | 49.1KB |
| 0x03E000 | 31 | `rom-data/prg-bank-31.ts` | 49.1KB |


> **总计:** PRG-ROM 256KB (32 banks × 8KB) + CHR-ROM 128KB (16 banks × 8KB) = 384KB

## 附录 E: 关键 RAM 变量高频使用排行

| 地址 | 变量 | 访问次数 | 类型 |
|------|------|---------|------|
| $003A | ram_003A | 251 | 通用工作变量 |
| $0034 | ram_0034 | 231 | 数据指针 (间接,Y) |
| $003C | ram_003C | 148 | 球员索引 |
| $003B | ram_003B | 119 | 比赛阶段 |
| $0094 | ram_0094 | 101 | 缓冲区位置 |
| $001E | ram_001E | 87 | 帧计数器 |
| $003E | ram_003E | 87 | 临时工作区 |
| $0032 | ram_0032 | 80 | 指针 (间接,Y) |
| $0025 | ram_0025 | 75 | 临时数据 |
| $0022 | ram_0022 | 70 | 通用计数器 |
| $0024 | ram_0024 | 68 | 参数存储 |
| $0033 | ram_0033 | 65 | 循环索引 |
| $003D | ram_003D | 60 | 玩家状态 |
| $005D | ram_005D | 58 | 中场数据 |
| $0040 | ram_0040 | 56 | 动画帧 |
| $0020 | ram_0020 | 54 | 计数器 |
| $004D | ram_004D | 51 | 映射指针 |
| $004C | ram_004C | 44 | 间接指针 |
| $0026 | ram_0026 | 42 | 循环计数 |
| $0048 | ram_0048 | 40 | 间接数据 |

## CPU 内存映射

| 区域 | 大小 | 用途 |
|------|------|------|
| `$0000–$00FF` | 256B | 零页 RAM（最频繁访问的变量） |
| `$0100–$01FF` | 256B | CPU 堆栈 |
| `$0200–$02FF` | 256B | OAM (Sprite 属性) DMA 区域 |
| `$0300–$03FF` | 256B | 通用工作 RAM |
| `$0400–$04FF` | 256B | 游戏状态变量（队伍、比分、球员） |
| `$0500–$05FF` | 256B | 扩展游戏状态 |
| `$0600–$06FF` | 256B | 比赛运行时数据 |
| `$0700–$07FF` | 256B | 缓冲区（VRAM写入缓冲等） |
| `$2000–$2007` | 8B | PPU 控制寄存器 |
| `$4000–$4017` | 24B | APU + 控制器寄存器 |
| `$8000–$FFFF` | 32KB | PRG-ROM (via MMC3 bank switching) |

### 关键 RAM 变量

| 地址 | 变量名 | 用途 |
|------|--------|------|
| `$001B` | ram_001B | 游戏阶段/状态标志 |
| `$001C` | ram_001C | 输入/选择状态 |
| `$001E` | ram_001E | 帧计数器 / 控制器读取 |
| `$0034` | ram_0034 | 数据指针（极高访问频率: 231次） |
| `$003A` | ram_003A | 通用工作变量（访问频率: 251次） |
| `$003B` | ram_003B | 比赛回合/阶段号 |
| `$003C` | ram_003C | 球员索引指针 |
| `$004C` | ram_004C | 间接寻址指针 |
| `$0094` | ram_0094 | 数据缓冲区索引/位置 |
| `$00E6` | ram_00E6 | 动画帧索引 |
| `$00E7` | ram_00E7 | 动画类型/状态 |
| `$00ED` | ram_00ED | 菜单选中项/光标位置 |
| `$043B` | ram_043B | 当前队伍编号 |
| `$043D` | ram_043D | 球员类型/动作类型 |
| `$0441` | ram_0441 | 比赛子阶段 |
| `$0600` | ram_0600 | 场上球员数量 |
| `$0606` | ram_0606 | 球员数据数组起始 |
| `$0617` | ram_0617 | 处理标志 |
| `$0621` | ram_0621 | 动画播放状态 |
| `$0700` | ram_0700 | VRAM 更新缓冲区起始 |

---

## CHR-ROM Bank 映射

共 16 个 CHR Bank（各 8KB），通过 MMC3 的 CHR bank 寄存器映射到 PPU:

| PPU 地址 | Window | MMC3 reg | 内容 |
|----------|--------|----------|------|
| `$0000–$07FF` | Pattern Table 0 (low) | R0+R1 (2KB each) | 球员/角色 sprite 图形 |
| `$0800–$0FFF` | Pattern Table 0 (high) | R2+R3 (2KB each) | 字体/HUD/UI 图形 |
| `$1000–$17FF` | Pattern Table 1 (low) | R4+R5 (2KB each) | 背景/场景 tile 图形 |
| `$1800–$1FFF` | Pattern Table 1 (high) | R6+R7 (2KB each) | 特效/过场动画图形 |

---

## 中断向量表

| 中断 | 向量地址 | 处理入口 | Bank |
|------|---------|---------|------|
| **NMI** | `$FFFA`→`$C500` | VBlank 处理 | Bank 30 |
| **RESET** | `$FFFC`→`$FFF0` | 系统启动 | Bank 31→Bank 30 |
| **IRQ** | `$FFFE`→`$C506` | MMC3 扫描线 IRQ | Bank 30 |

**启动流程（完整追踪）:**
1. 6502 RESET 向量 ($FFFC) → 跳转 `$FFF0` (Bank 31)
2. Bank 31 `$FFF0`：`LDA #$00; STA $8000` (复位 MMC3) → `JMP $C503` (跳 Bank 30)
3. Bank 30 `$C503`→`$C64E`：PPU/APU/RAM/OAM 完整初始化（~190B NES 启动序列）
4. Bank 30 `$C400`：配置 MMC3 — `R6=0`（Bank 00→$8000 常驻服务层），`R7=2`（Bank 02→$A000 场景控制器）
5. `JMP $A200` → Bank 02 `$A200`→`$A21B` 场景初始化：
   - 清零 RAM 工作区 + 初始化精灵属性
   - **密集调用 Bank 00 服务**：`JSR $9A43`(VRAM属性)、`JSR $98A0`(PPU关闭)、`JSR $9B7F`(nametable指针)、`JSR $9F69`(注册定时器回调×3)
   - 设置游戏状态变量后 `JMP $9EED`（进入 Bank 00 主循环）
6. **Bank 00 `$9EED` 主循环**（最终目的地，永不退出）：
   - 轮询 6 个定时器槽位（每个 4 字节：计数器+回调地址+bank号）
   - 定时器到期 → 通过 `$8000/$8001` 写 MMC3 R6/R7 切 bank → 跳转回调
   - 等待 `ram_001B` bit7（NMI 帧同步信号，由 Bank 30 NMI handler 设置）
   - 循环驱动标题画面 → 主菜单 → 密码 → 比赛 → 场景切换 → 回到主循环

> **关键设计**: Bank 31 代码中没有任何 `JSR $8000`/`JMP $9000` 直接访问可切换窗口的指令。所有跨 bank 调用全部通过 Bank 30 跳转表（$C509-$C5FF 约 80+ 条目）间接完成。Bank 00 的 `$9EED` 是游戏真正的主循环——Bank 31/30 只负责 RESET 一次性初始化 + 每帧 NMI，其余所有游戏逻辑都由 Bank 00 主循环的定时器调度机制驱动 bank 切换来衔接。

---

## ROM 数据文件结构 (TypeScript 侧)

### rom-data/index.ts — 数据聚合器

```typescript
// 来源: Captain Tsubasa II - Super Striker (Japan)
// Mapper: 4 (MMC3)
// PRG: 32 × 8KB, CHR: 16 × 8KB

import _prg00 from './prg-bank-00';  // ... to _prg31
import _chr00 from './chr-bank-00';  // ... to _chr15

export const NES_PRG_ROM: readonly number[] = [..._prg00, ..._prg31];
export const NES_CHR_ROM: readonly number[] = [..._chr00, ..._chr15];
export const PRG_ROM_SIZE = 262144;  // 256KB
export const CHR_ROM_SIZE = 131072;  // 128KB
export const NES_MAPPER = 4;
```

### 单个 Bank 文件格式

```typescript
// prg-bank-00.ts
// 自动生成，每个 bank 8192 bytes
export default [
  0xA5, 0x27, 0x0A, 0xAA, 0xBD, 0x0E, 0x80, 0x48,
  0xBD, 0x0D, 0x80, 0x48, 0x60, 0x65, 0x81, 0x8A,
  // ... 共 8192 个 hex 字节
] as const;
```

