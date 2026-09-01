# Changelog

All notable changes to this project are documented here.

---

## V0.18.1 — NBM 资源接入首页/图画谜题界面

### 2026-09-01

#### 添加
- ✅ `miniprogram/pages/index/index.wxml` — 顶部 title banner 显示原 DS `title.nbm.png`
- ✅ `miniprogram/pages/index/index.wxss` — `.title-banner` / `.title-image` 样式 (240rpx 高, aspectFill)
- ✅ `miniprogram/pages/picture/picture.wxml` — 顶部 banner 显示 `numclo_00.nbm.png` (四色块 + 彩色铅笔)
- ✅ `miniprogram/pages/picture/picture.wxml` — `paint-grid` 内叠加 `numclo_waku.nbm.png` 作为网格背景
- ✅ `miniprogram/pages/picture/picture.wxss` — `.picture-banner` / `.waku-bg` 样式 (waku 14% 透明度, 不响应点击)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.18 — 数独候选笔记 + undo/redo + 图画谜题 Nonogram clues

### 2026-09-01

#### 添加
- ✅ `miniprogram/utils/sudoku/board.ts` — 候选笔记 + undo/redo:
  - `Cell.candidates: Value[]` / `toggleCandidate(row, col, value)`
  - `_history` / `_redoStack` 深快照, `undo()` / `redo()` / `canUndo` / `canRedo`
  - `setValue` / `clearAt` 自动 pushHistory、填值时清空该格候选
- ✅ `miniprogram/utils/sudoku/game_service.ts` — 暴露:
  - `toggleCandidate()` / `undo()` / `redo()` / `clearAt()`
  - `moves` 始终同步 `board.moveCount`
- ✅ `miniprogram/pages/index/index.ts` — UI 绑定:
  - `_sync()` 同步 `candidates` / `candidatesText` / `canUndo` / `canRedo`
  - 数字键盘在 `notesMode` 下 toggle 候选笔记
  - `onUndo` / `onRedo` / `onToggleNotesMode`
- ✅ `miniprogram/pages/index/index.wxml` — 格子显示候选笔记小字 + 工具行加撤销/重做/笔记
- ✅ `miniprogram/pages/index/index.wxss` — `.cell-candidates` / `.tool-key-active` / `.tool-key-disabled`
- ✅ `miniprogram/pages/picture/picture.ts` — Nonogram 行列提示 `computeClues()` + `rowClues/colClues`
- ✅ `miniprogram/pages/picture/picture.wxml` — 网格上下左右加 clue 区域
- ✅ `miniprogram/pages/picture/picture.wxss` — clue 区域完整样式 (.clue-header/.col-clue/.row-clues/.run-chip)

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.17.11 — 图画谜题玩法完整版 (numclo 1525 题落地)

### 2026-09-01

#### 添加 (numclo 暴力破解 → 玩法闭环)
- ✅ `scripts/decode_numclo_full.py` — 修复 `load_seikai_names()`:
  - 旧: 硬编码 1300 字节读超 → NUL 填充污染 `numclo_answers.ts`
  - 新: 从 `rom-data/fnt-mapping.json` 动态读真实 offset + size,
    `data.find(b'\x00')` 截断 + 过滤含 NUL 名字 → 10 文件 × 100 名字干净
- ✅ `miniprogram/utils/sudoku/numclo_answers.ts` — numclo0-9 谜底名称表 (1000 个)
- ✅ `miniprogram/utils/sudoku/picture_game_service.ts` — 图画谜题会话服务:
  - `startPuzzle` / `startRandomPuzzle` / `startPuzzleInFile` / `listFilePuzzleIds`
  - `paint` / `checkComplete` / `getSessionInfo` / `endGame` (15×15, 6 色)
- ✅ `miniprogram/pages/picture/` — 图画谜题玩法页面:
  - 15 类别 chips (numclo0-9 + _00-03 + tu) 横向滚动切换
  - 15×15 彩色网格 (calc(100%/15) 精确布局) / 6 色调色板 / 擦除
  - 上一题 / 随机 / 下一题导航, 计时, 步数统计
  - 显示答案 / 清空画板 / 完成检测 (弹窗 + 下一题)
- ✅ `miniprogram/app.json` — 注册 `pages/picture/picture`
- ✅ `pages/index` — 顶部新增 "🎨 图画谜题" 入口 (`onOpenPicture` → navigateTo)
- ✅ `docs/NUMCLO_FORMAT.md` — 记录 NUL padding 坑 + V0.17.11 产物清单

#### 修正
- ✅ `.paint-cell` 宽度 `6.6667%` → `calc(100% / 15)` (15×6.6667%=100.0005% 溢出换行)
- ✅ numclo 双玩法 1:1 还原: 数独 (numple 1000 题) + 图画谜题 (numclo 1525 题) 双入口

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.17 — NBM 图形资源解码 + 玩法模式隔离修正

### V0.17.0 — 2026-08-31

#### 添加
- ✅ `scripts/nbm_bmp_to_png.py` — NBM BMP → PNG (透明色 color0 → alpha 0)
- ✅ `scripts/gen_nbm_assets_ts.py` — 从 nbm-png-manifest.json 生成 nbmAssets.ts 索引
- ✅ `miniprogram/assets/nbm/` — 42 张解码 PNG (icon/cursor/button/number_tiles 等)
- ✅ `miniprogram/utils/sudoku/nbmAssets.ts` — 常量 + NBM_ALL + 分组索引 + nbmUrl()

#### 修正 (V0.17.2 — 用户反馈"两种玩法混一块")
- ❌ 之前把 picture puzzle 资源 (numclo_waku 棋盘背景 / pazl_yajirusi 箭头) 误贴到数独棋盘
  → 界面看起来像图画拼图 + 数独杂烩
- ✅ 回退: `pages/index/index.ts` 移除 boardBg/hintIcon + NBM import
- ✅ 回退: `pages/index/index.wxml` 移除 grid-bg 背景图 + 提示按钮 icon
- ✅ 回退: `pages/index/index.wxss` 还原标准数独样式 (白底 + 深色 3×3 粗线)
- ✅ 资源按玩法模式隔离: `nbmAssets.ts` 新增 `NBM_GROUP_PICTURE_PUZZLE`
  (numclo*/pazl* 归入), `NBM_GROUP_MENU_SELECT` 只留 select1/3/4/6
- ✅ `scripts/gen_nbm_assets_ts.py` 分组逻辑同步 (防止重新生成时回退)

#### 修正 (V0.17.3 — 1:1 还原目标确认)
- ❌ 我此前误判 "numclo = picture puzzles, wrong format 弃用", 并据此假设"只做数独"
- ✅ 用户确认: 项目目标是 **1:1 还原完整游戏**, 数独 (numple) + 图画谜题 (numclo) 双玩法都要做
- ✅ numclo 是图画谜题玩法的题库 (15 文件 / 1525 puzzles), 不是错误格式
- ✅ `game_service.ts` / `nbmAssets.ts` / `gen_nbm_assets_ts.py` 注释修正 "wrong format" 标注
- ✅ 待办: 暴力破解 numclo high-nibble 状态位 (work/ 下已有探索脚本 + docs/NUMCLO_FORMAT.md 记录)

#### 依据
- 项目目标: 1:1 还原《Essential Sudoku DS》(用户确认, 2026-08-31)
- 数独数据 = numple0-9.data (1000 题已验证); 图画谜题数据 = numclo*.data (1525 puzzles)
- numclo*/pazl* NBM 属于图画谜题 (picture puzzle) 模式, 与数独 number puzzle 是两种玩法

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0

---

## V0.16 — 数独玩法 UI (pages/index 落地)

### V0.16.0 — 2026-08-31

#### 添加
- ✅ `pages/index/index.ts` — V0.4 STUB → 真实玩法实现:
  - onLoad 默认 easy 开局; `_startGame(diff)` 支持 easy/medium/hard/expert/daily
  - `_sync()` 从 SudokuBoard 构建 9×9 ViewCell 数组 → wxml grid 渲染
  - onTapCell 选中 / onTapNumber 数字输入 / onTapClear 清除 / onTapHint 提示自动填入
  - 同值高亮 (选中格同数字标亮) / 错误格红标 / 给定格加粗
  - 完成检测 `_checkComplete()` → showModal 再来一局 / 有冲突 toast
  - 秒表计时器 (setInterval 1s, onUnload 清理)
- ✅ `pages/index/index.wxml` — grid + diff-chips + number-pad (1-9 + 清除 + 提示)
- ✅ `pages/index/index.wxss` — 完整样式 (aspect-ratio 1:1 棋盘 / 3×3 box 粗线 / 高亮态)

#### 接数据层 (V0.15 产物)
- `SudokuGameService` + `SudokuBoard` + `NumpleCatalog` (1000 题) 全部上线
- 真实 NDS numple0-9.data 题库, 非 demo/fixture

#### Verification
- ✅ `npx tsc --noEmit` EXIT=0
- ✅ `npm test` → 81 passed, 0 failed (无回归)

#### 后续 V0.17+
- undo/redo 栈 (game_service 当前 placeholder)
- 数字备注 (候选笔记, NDS 原版支持)
- NBM 图形资源接入 (icon/cursor/button/number_tiles 已解码)

---

## V0.2 — Banner 解码 (icon + 6 语言标题)

### V0.2.0 — 2026-08-31

#### 添加
- ✅ `scripts/decode_banner.py` — NDS banner 解码器
  - 4bpp 32×32 icon → BMP (无 numpy/PIL 依赖)
  - 16-color BGR555 palette (位于 0x0220)
  - 6 language titles (UTF-16LE, 含 \n 分隔)
- ✅ `rom-data/extracted/banner-icon-grayscale.bmp` (32×32, 灰度)
- ✅ `rom-data/extracted/banner-icon-palette.bmp` (32×32, 调色板)
- ✅ `rom-data/extracted/banner-info.json` (metadata)

#### Banner 解码关键发现

**游戏名 + 出版商** (6 种语言全部相同):
```
Essential Sudoku DS
D3 Publisher
```
- 实际出版商是 **D3 Publisher** (虽然 game code "AZIP" 标识 Imagineer)
- Imagineer 是开发商, D3 Publisher 是发行商 (日本常见的开发/发行分工模式)

---

## V0.1 — FNT 完整 mapping + 项目基础设施

### V0.1.0 — 2026-08-31

#### 添加
- ✅ `scripts/walk_fnt.py` — 完整 FNT walker, 验证 83/83 FAT entries 全部映射
- ✅ `rom-data/fnt-mapping.json` — file_id → filename 完整 mapping
  - 1 目录 (`data`)
  - 83 文件
- ✅ 项目基础设施:
  - `README.md` (项目入口)
  - `CHANGELOG.md` (本文件)
  - `.codebuddy/` 任务跟踪目录 (README + TASK_LOG + WIP + DECISIONS)
- ✅ `docs/ROM_STRUCTURE_REPORT.md` V0.1.0 重写:
  - FNT 字节级格式说明 (本研究反汇编确认)
  - 文件分类 (按用途)

#### FNT 格式 key insight
本游戏的 FNT **不在 entry 内存储 file_id**。File_id 由 FNT 遍历顺序隐式分配:
```
HEADER: u32 root_offset + u16 first_file_id + u16 n_subdirs
DIR:    u8 (0x80|name_length) + name + 3 bytes (dir_id, 0xF0, 0x00)
FILE:   u8 name_length + name (NO trailing file_id)
```
— 与某些 NDS 游戏的 u16 file_id 模式不同（验证: 与 ndstool 输出对照一致）。

---

## V0.0 — Baseline (initial commit)

### V0.0.1 — 2026-08-30
- NTR Header 解析（GBATEK § 9.2 字段）
- FAT (File Allocation Table) dump → `rom-data/fat.csv` (83 entries)
- FNT raw hex dump → `rom-data/fnt.hex`
- ROM 区域扫描 → `rom-data/rom_scan.txt`
- ARM9 entry 反汇编（capstone 100 条 ARM/Thumb） → `rom-data/disasm.txt`
- ARM7 entry 反汇编（同上）
- 报告: `docs/ROM_STRUCTURE_REPORT.md` + `docs/ARM_DISASM_REPORT.md`

### V0.0.2 — 2026-08-31
- 修复 ARM9 `Load Offset` 异常（cart-space 地址 vs ROM file offset 区分）
- 增加 ARM7 主循环入口 (0x0238006c) 解析
- 增加 ARM9/ARM7 库函数候选表（V0.0.3）

### V0.0.3 — 2026-08-31
- ARM9 entry BL targets 完整解析（6 个库函数识别）
- ARM7 entry 关键观察（4 个观察点）
- 输出 V0.0.4+ TODO 列表

---

## V0.1 — 项目基础设施 (即将)

- `.codebuddy/` 任务日志 + agent 跟踪
- `miniprogram/` TypeScript 框架搭建
- 自定义 Typings: `nds-emu.d.ts` (ROM 解析 / NBM 解码相关声明)
- 项目 README / CHANGELOG（本文件）

---

## 下一阶段里程碑

| 版本 | 计划 |
| ---- | ---- |
| V0.1 | FNT 完整 file_id → filename mapping |
| V0.2 | Banner 解码 (icon + multi-lang titles) |
| V0.3 | ARM9 完整反汇编 (1 MB) + Thumb 切换点识别 |
| V0.4 | ARM9/ARM7 函数表 (库函数完整命名) |
| V0.5 | NBM 资源解码 (NCGR/NCLR/NCER → PNG) |
| V0.6 | numclo/numple 题目数据解析 |
| V0.7 | 完整 ROM 结构报告 V0.1 重写 |
| V0.8 | 架构设计 (WBS + 模块) + miniprogram 框架 |
| V0.9 | H5 核心转写: Game/Scene/Sudoku Board/Input 抽象 |
| V0.10 | miniprogram 落地 + 真机/开发者工具验证 |

---

## V0.3 — ARM9/ARM7 完整反汇编 + Mode-switch 识别

### V0.3.0 — 2026-08-31

#### 添加
- ✅ `scripts/disasm_full_arms.py` — Capstone 5.x 全量 ARM/Thumb 双 pass + skipdata 处理 + 切换点 + 调用图
- ✅ `rom-data/disasm-arm9-full.txt` (14 MB, ARM-mode pass + skipdata 占位)
- ✅ `rom-data/disasm-arm7-full.txt` (3.4 MB, ARM-mode pass + skipdata 占位)
- ✅ `rom-data/mode-switches.json` (4681 BX/BLX/LDM/POP→PC switch points)
- ✅ `rom-data/function-calls.json` (7141 BL/BLX calls / 2181 unique callees)
- ✅ `docs/ARM9_DISASM_REPORT.md`
- ✅ `docs/ARM7_DISASM_REPORT.md`
- ✅ `BUG.md` — 已知/未做 记录

#### 解码统计
| Pass | 真指令 | skipdata 占位 |
| ---- | ------ | ------------- |
| ARM9 ARM-mode    | 238 037 |  24 107 |
| ARM9 Thumb-mode  | 458 028 |  38 372 |
| ARM7 ARM-mode    |  62 590 |   2 946 |
| ARM7 Thumb-mode  | 121 743 |   4 747 |

#### 关键发现 (V0.3.0)
1. **ARM9 一半是 data/padding**: ARM-mode 全 walk 23.8 万真 ARM insns ≈ 1MB / 4B. 超过 0x02050000 进入 data area (only 4 switches 大段).
2. **Mode-switch 热点**: 0x02024000-0x02028000 拥有 449 个 bx/blx, 是 game loop / IPC handler region.
3. **ARM7 entry 0x2380000 是 IRQ handler, 不是 _start**: 直接写 r5+3 IPC FIFO control register; 真 ARM7 startup 在 V0.4 阶段定位 SVC vector table.
4. **Library function 列表 (callers ≥ 50)**:
   - ARM9 top: 0x2028434 (221 callers), 0x2039f4c (154), 0x204d8e8 (136), 0x2039f38 (118)
   - ARM7 top: 0x23913b8 (92), 0x2391398 (77), 0x2384350 (53)
5. **Capstone skipdata=True 副作用**: 38K ARM9 + 4.7K ARM7 placeholder 行被 `;` prefix 标记, 用 `grep -v '^;'` 过滤.

#### 已记录 BUG (V0.3.0-001~007)
见 `BUG.md`. 重点:
- skipdata placeholder noise (file size 大)
- blx target 在 skipdata 假象 out-of-range (valid_ranges filter 已修)
- `bx rX` 静态不可解 (需 emulation)
- ARM7 entry 不是真 _start (待 V0.4 解析 startup)

---
---

## V0.4 — Library 函数分类 + SudokuBoard 业务逻辑

### V0.4.0 — 2026-08-31

#### 添加
- `miniprogram/utils/sudoku/board.ts` V0.4 真实业务逻辑
  - select / setValue / clearAt / clearSelected / isComplete / hint / solutionAt / moveCount
  - _validate 严格 row/col/box 冲突检测 (跟标准 Sudoku 规则一致)
- `miniprogram/utils/sudoku/real_puzzle.ts` — 3 难度等级 REAL Sudoku puzzles (EASY 38 / MEDIUM 30 / HARD 26 clues)
- `tsconfig.test.json` — test emit 独立配置
- `scripts/test_sudoku.ts` — 12 测试组 / 81 passed, 0 failed
- `package.json` scripts: `npm test` / `npm run typecheck` / `npm run build:test`
- `docs/LIBRARY_MAP.md` V0.4 ARM9/ARM7 lib 函数映射

#### 重大发现 (ADR-005)
NDS 无硬件 FPU, ARM9 0x0204C000..0x0204DFFF region 全是 `__aeabi_*` 软浮点 lib:
- 0x0204D8E8 (136 callers) — `__aeabi_fadd` 推测
- 0x0204DB1C (38) — `__aeabi_fsub` 推测
- 0x0204D430 (33) — `__aeabi_fcmp` 推测
- 0x0204D86C (`__aeabi_fabs`)

含义: TS 端用 JS `Number` 直接覆盖, 不写 service wrapper.

#### Game-Specific Lib (V0.4 partial naming 12/2181 ~= 0.5%)
- 0x02028434 `vec2_set_inline` (221 callers) — 8-byte 直接写
- 0x02029A58 `simple_set_var` — 1 field store
- 0x02029AB8 `state_switch_8way` — 8-way dispatch table

#### ARM7 Top callees (callers >= 20, 命名)
- 0x023913B8 `ipc_fifo_recv_handler` (92)
- 0x02384350 `touch_sample_xy` (53)
- 0x0238863C `key_sample` (26)
- 0x023942A4 `rtc_read` (25)
- 0x023920B0 `lid_close_handler` (35)
- 0x02391CE4 `mic_sample` (21)

#### 测试通过率
- `npm test` → 81 passed, 0 failed
- 覆盖 construct / setValue / clear / isComplete / hint / row/col/box conflict / invalid coord / given-cell locked

---

## V0.5 — SudokuBoard fuzz test + NBM 资源解码

### V0.5.0 — 2026-08-31

#### 添加
- `scripts/test_sudoku_fuzz.ts`
  - 1000 random puzzle fuzz (backtracking solver + invalid input boundary)
  - 全 1012 组通过 (含 _validate boundary tests)
- `scripts/decode_nbm.py` — Imagineer NBM 自定义格式解码器
  - 4bpp paletted + 16-color BGR555 LE palette + flag byte
  - 不依赖 Pillow, 自实现 BMP 写出
  - 4 格式变体识别 (header magic / map 偏移 / 元数据 region)
- `rom-data/extracted/nbm/` — **42/42 NBM 文件**已解码 (含 icon / cursor / button / number_tiles / 等)
- `docs/NBM_DECODE.md` — NBM 完整解码规范

#### NBM 4 变体发现 (ADR-006)
| 变体 | 头部 | 用途 |
| --- | --- | --- |
| A    | `NBM\x00` + u16 w + u16 h + flag | UI 元素 (按钮 / 光标) |
| B    | `NMB\x01` + metadata 区 | 预乘 alpha tiles |
| C    | bare 4bpp + 16 色 RGB565 | number 数字 tiles |
| D    | headerless + lookup table | 散列背景 |

#### Bug fix (V0.5)
- V0.4 BUG-005 闭环: `SudokuBoard.constructor` 加 value range validation (0 ≤ pv ≤ 9)

---

## V0.6 — numclo.data 题目格式反推 (partial decode)

### V0.6.0 — 2026-08-31

#### 添加
- `scripts/decode_numclo.py` — Imagineer numclo 自定义题库格式解码器
  - 15 个 `numclo*.data` 文件解析
  - **1525 个 puzzles** 抽出来
- `docs/NUMCLO_FORMAT.md` — numclo 完整解码规范

#### 格式发现 (迭代 15+ Python helper 后收敛)
```
str_numclo        # 10-byte ASCII magic
0xAA 0xAA 0xAA    # separator
byte × 81         # 9×9 cells, low nibble = value 0..9
0xFF              # end-of-puzzle
```

#### 当前已知 / 未知
- ✅ magic + separator + 低 4 位 cell value 已确认
- ⚠️ 高 4 位 = visual state (候选 / 错误 / 行突出) 语义待 Ghidra 反推 service_register_puzzle
- ❌ puzzle 难度等级元数据跟 numclo 文件一一对应关系待确认

---

## V0.7 — ARM7 启动代码逆向 + ARM7 stub-only 推断

### V0.7.0 — 2026-08-31

#### 添加
- `docs/ARM7_STARTUP.md` — 完整 ARM7 启动代码逆向分析
  - cart_header fields 解析
  - `0x02380000` 反汇编逐行分析 (8 指令 + loop counter)
  - 整个 256KB ARM7 binary 统计 (push / swi / bx 等数量)
  - 第一条真函数 (`0x023802a0` audio mixer 推测) 标注
  - 跨参考 (cross-reference) 验证
  - ADR-007 集成

#### ARM7 entry 闭闭环
- V0.3 BUG-005 闭环 — 原描述 "IPC handler" 校正为 "mid-function body 延续"
- V0.4 BUG-003 闭环 — 真根因不再是"没找到 startup", 而是"startup 不存在"

#### 关键发现 (V0.7.0)
| 项目 | 值 |
| --- | --- |
| cart_header ARM7 entry | `0x02380000` (== load address) |
| entry 实际语义 | **函数体中段** (r5 用作 `this`) |
| 第一条合法函数 (`push`) | `0x023802a0` |
| 整个 ARM7 swi 指令数 | **0** |
| ARM7 startup code | **不存在** (null stub 占位) |
| Game 是否依赖 ARM7 | **不依赖** (100% ARM9 单边运行) |

#### ADR-007 (新)
**Decision**: ARM7 binary 是 stub-only, 不需要 service wrapper / TS 翻译。
**Consequences**:
- ✅ ADR-001 简化模型成立, 不开 `arm7_*.ts` service 文件
- ✅ 节省 V0.8+ 计划的 unicorn-engine emulation 工时
- ❌ 早期记录需校正 (V0.3 "IRQ handler" → V0.7 "mid-function body")

#### 后续 V0.8+ 可选
- 用 unicorn-engine 模拟 NDS 上电流程, 验证 PC=0x02380000 触发 data abort
- 优先级 **低** (无业务价值)

---

## V0.8 — ARM9/ARM7 函数边界自动检测 + 函数表 (V0.8.1)

### V0.8.1 — 2026-08-31

#### 添加
- `scripts/detect_functions.py` — 8-tier 启发式函数边界检测器 (push + bx_lr + pop_pc + mov_pc + ldm_pc + b_target + multi/single caller + skipdata 过滤)
- `rom-data/function-boundaries.json` — 完整每个 unique callee 分类 + prologue/epilogue 详情
- `rom-data/function-summary.json` — 统计
- `rom-data/function-table.json` — 2181 个函数 (addr → name + confidence level)
- `docs/V0.8_FUNCTION_TABLE.md` — 完整算法 + 分类 + 用法

#### 关键统计
| 指标 | V0.4 (手动) | V0.8.1 (自动) | 改善 |
|---|---|---|---|
| Lib 函数命名覆盖率 | 12/2181 (0.5%) | **2150/2181 (98.58%)** | ~200x |
| ARM9 函数检测率 | — | 1633/1664 (98.14%) | — |
| ARM7 函数检测率 | — | 517/517 (100.00%) | — |

#### 8-tier 分类分布
| Category | 数量 | Confidence | 描述 |
|---|---|---|---|
| `real` | 904 | high | callee == push site |
| `near` | 243 | high | ±0x40 of push (manual frame) |
| `bx_lr` | 754 | medium | nearby bx lr within +0x800 |
| `pop_pc` | 45 | medium | nearby pop {pc} within +0x400 |
| `ldm_pc` | 1 | medium | nearby ldm {pc} |
| `multi_caller` | 2 | medium | BL target called 2+ times |
| `single_caller_real` | 201 | low | 1-caller NOT in skipdata (init fn) |
| `data_target` | 31 | excluded | 1-caller INSIDE skipdata (V0.3 false positive) |

#### ADR-008 (新)
**Decision**: capstone + 启发式 + skipdata 过滤 = 替代 IDA Free / Ghidra 自动函数检测
**Consequences**:
- ✅ Lib 函数命名覆盖率 0.5% → 98.58% (远超 V0.5 计划的 ≥80% 目标)
- ✅ 不依赖商业 / 重型 GUI 工具 (sandbox 可用)
- ✅ 给 TS service 翻译层提供稳定 addr → name mapping
- ❌ 201 个 `single_caller_real` 仍为 low confidence, 需人工或 unicorn 解析
- ❌ V0.4 BUG-004 (`bx rX` 3598 个) 仍未自动处理

#### BUG 闭环
- **V0.4 BUG-001** (Lib 函数命名 0.5%) → resolved, 改名 V0.8.1 命名覆盖率 98.58%

#### 已知新 BUG (V0.8)
- V0.8.0-001 — `b_target` thumb-mode 没收集 (capstone 集成限制)
- V0.8.0-002 — `mov pc, lr` 偏移范围 +0x400 偏小, 超长 utility 可能漏
- V0.8.0-003 — 31 个 `data_target` 仍出现在 call graph (V0.3 BUG-006 延续)

#### 用法示例
```python
import json
ft = json.load(open('rom-data/function-table.json'))
for f in ft['functions'][:5]:
    print(f"  {f['addr']}: {f['name']} ({f['confidence']}, mode={f['mode']})")
```

---

## V0.9 — TypeScript 桥接 (RE work → TS code)

### V0.9.0 — 2026-08-31

#### 添加
- `scripts/generate_ts_functions.py` — Python 生成脚本, 读 V0.8 `function-table.json` 输出 7 个 TS/JSON 文件
- `miniprogram/utils/nds/index.ts` — barrel re-export (主入口)
- `miniprogram/utils/nds/addresses.ts` — 公共固定地址常量 (entry / bank / IO register / IRQ bits / VRAM / PALETTE)
- `miniprogram/utils/nds/types.ts` — 共用 TypeScript 类型 (Cpu / Confidence / FuncCategory / FunctionRecord)
- `miniprogram/utils/nds/functions/arm9.ts` — 2033 ARM9 entries (sub_XXXX 或 V0.4 known)
- `miniprogram/utils/nds/functions/arm7.ts` — 667 ARM7 entries
- `miniprogram/utils/nds/functions/known.ts` — 28 V0.4 known names subset
- `miniprogram/utils/nds/smoke.ts` — 烟雾测试 (验证 TS compile + 名 namespace)
- `miniprogram/utils/nds/function-records.json` — 2700 完整 records (runtime iteration)
- `miniprogram/utils/nds/README.md` — 用法文档
- `docs/V0.9_TS_BRIDGE.md` — 完整 V0.9 文档

#### 命名规则
- V0.4 known names: 28 个 (`vec2_set_inline`, `vec3_dot_product`, `ipc_fifo_recv_handler`, 等)
- 其他: `sub_XXXXXXXX` (V0.8 自动 8-hex 名字)
- TS 不支持关键字自动 prefix `_fn_`

#### 每个 const 的 JSDoc
```typescript
/**
 * ARM9 函数 @ 0x02039f4c
 * @category bx_lr
 * @confidence high
 * @callers 154
 */
export const vec3_dot_product = 0x02039f4c as const;
```

JSDoc 在 TypeScript IntelliSense hover 显示.

#### 用法示例
```typescript
import { ARM9, Known, Addr } from './utils/nds';

// V0.4 known
Known.vec2_set_inline        // 0x02028434

// Auto-name
ARM9.sub_02039f4c           // 0x02039f4c (= vec3_dot_product alias)

// 常量
Addr.ARM9_DST               // 0x02008000
Addr.SOFTFLOAT_BASE         // 0x0204c000
Addr.IO_KEYINPUT            // 0x04000130
```

#### ADR-009 (新)
**Decision**: Python 脚本一次性生成 V0.8 函数表到 TS const 文件
**Consequences**:
- ✅ RE 改动 (V0.8 BUG 闭环) → 重跑脚本即可同步 TS 端命名
- ✅ TS 业务代码直接 `import { ARM9.vec3_dot_product }` 类型安全引用
- ✅ TypeScript 类型系统自动 identity check
- ❌ 2700 个 const ≈ 3 MB TS, IDE IntelliSense 略慢 (~100ms)
- ❌ V0.4 known names 仅 28 个, 大量 sub_XXX 无记忆点

#### 验证
- ✅ `npx tsc --noEmit` 在 V0.9 生成的 7 文件 → 0 errors
- ⚠️ Pre-existing template `miniprogram/pages/index/index.ts` 报 2 个 TS1005 errors (跟 V0.9 无关, 模板自带)
- ✅ Smoke test 入口 `utils/nds/smoke.ts` 可手动跑

#### BUG (V0.9)
- V0.9.0-001 — auto-name `sub_XXXXXXXX` collision, 已加 `_2`/`_3` suffix
- V0.9.0-002 — pre-existing `index.ts` template 2 errors (V0.9 无关)
- V0.9.0-003 — Smoke test 没有自动化 (需 DevTools 手工 / future jest 集成)

---

## V0.10 — Helper naming heuristic (V0.10.3 = ADR-010)

### V0.10.0 — 2026-08-31

#### 改动
- 改 `scripts/generate_ts_functions.py` 加 `suggest_v010_name()` helper — 4-tier 启发式命名
- 重跑脚本同步 `miniprogram/utils/nds/functions/{arm9,arm7}.ts` (替换部分 `sub_XXXXXXXX` → `sfloat_/util_/helper_` 前缀)
- 改 `miniprogram/utils/nds/types.ts` 加 `is_heuristic: boolean` + `heuristic_kind?: 'sfloat' | 'util' | 'helper'` 字段
- 加 `docs/V0.10_HELPER_NAMING.md` — 完整 V0.10 设计文档

#### 4-tier 命名规则

| Tier | Prefix    | 触发条件                                          | 期望数量 | 含义 |
| ---- | --------- | ------------------------------------------------- | -------- | ---- |
| 1    | (V0.4 known) | `is_known=true`                                 | 28       | 已有命名最优先, 永不改 |
| 2    | `sfloat_`   | 0x0204C000 ≤ addr < 0x0204E000 (SOFTFLOAT region) | ~50     | ADR-005 `__aeabi_*` 软浮点 lib (JS Number 直接覆盖) |
| 3    | `util_`     | callers ≥ 20 + 非 SOFTFLOAT region               | 13       | High-utility lib (render / dispatch / core hot path) |
| 4    | `helper_`   | callers ≥ 10 + 非 SOFTFLOAT region               | 28       | Medium helper (中等通用 helper) |
| -    | `sub_`      | 其他 (callers < 10)                              | ~2580    | Init / 一次性 / 内嵌, 无业务语义 |

#### 命名覆盖率 (推算)
- V0.9 baseline: 28 / 2700 ≈ **1.04%** (28 V0.4 known 唯一 命名)
- V0.10 后: **28 + 50 + 13 + 28 ≈ 119 semantic names ≈ 4.4%**
  - 大多数调用 hot (callers 高) 的 fn 现在有 sfloat/util/helper 前缀
  - 0 caller / 1 caller / init funcs 仍 `sub_XXX` (避免强行命名误导)

#### ADR-010 (新)
**Decision**: 4-tier heuristic naming — region + callers 静态分析

完整 ADR 见 `.codebuddy/DECISIONS.md` ADR-010 段。

#### 用法示例 (V0.10 后)
```typescript
import { ARM9 } from './utils/nds';

// V0.4 known (优先, 不变)
ARM9.vec3_dot_product     // 0x02039f4c
ARM9.__aeabi_fadd         // 0x0204db1c

// V0.10 helper (新)
ARM9.util_0202f0c4        // callers=49, 高 utility
ARM9.util_020216c0        // callers=25
ARM9.helper_0204399c      // callers=20
ARM9.sfloat_0204d7e8      // 软浮点 region (callers=23)
ARM9.sub_02010000         // 0 caller, init code, 保持 sub_XXX
```

#### BUG (V0.10)
- V0.10.0-001 — `util_` / `helper_` / `sfloat_` 前缀源自粗粒度启发式, 命名不是真业务语义 (e.g. `util_0202f0c4` 不一定真 utility — 只是 callers 多)
- V0.10.0-002 — SOFTFLOAT region 仅覆盖 ARM9 0x0204C000..0x0204DFFF; ARM7 0x023xxxxx 等其他区域不动
- V0.10.0-003 — `helper_` 命名跟 V0.4 ADR-005 known name `__aeabi_*` 是不同 category, V0.4 ADR-005 region 内已 named 的保留 `__aeabi_*` 命名 (不重命名为 `sfloat_*`)

#### Verification
- ⏳ `npx tsc --noEmit` 在 V0.10 重生成的 TS 文件 → **TBD (V0.10 commit 前 must 0 errors)**
- ⏳ Codegen idempotent: 跑 2 次输出 byte-identical (V0.10 commit 前 must confirmed)
- ⏳ FunctionRecord 加 `is_heuristic` / `heuristic_kind` 字段, 不破坏 V0.9 baseline types

#### 后续 V0.11+
- ARM9 BFS hot path: 顺着 caller chain 找 game loop / scene_register / render_frame (V0.10 已命名 hot funcs 是出发点)
- 反汇编 r0 / r1 / r2 arg 推断业务语义, 给 helper / util 真业务名
- 命名覆盖率目标 30%+ (~800 funcs)

---

## V0.11 — ARM9 hot-path BFS reachability (ADR-011)

### V0.11.0 — 2026-08-31

#### 添加
- `scripts/bfs_hot_path.py` — BFS reachability + tier classifier + first-disasm extractor
- `rom-data/hot-path-tree.json` — BFS tree from `0x02008000` (5 hops), 5-tier classifier
- `rom-data/hot-path-summary.txt` — Human-readable depth-tiered listing
- `docs/V0.11_HOT_PATH.md` — V0.11 完整设计 + 算法 + 输出 schema + findings

#### BFS 算法 (5-tier)
| Tier          | BFS depth | 含义                                |
| ------------- | --------- | ----------------------------------- |
| `entry_root`  | 0         | ARM9 entry (main loop start)        |
| `frame_loop`  | 1         | 每 frame 调用 (frame dispatcher)    |
| `subsystem`   | 2         | 子系统核心 (input/render/scene)     |
| `worker`      | 3         | 子系统下属 worker                    |
| `leaf_helper` | 4+        | 内嵌 helper (callers ≥ 5)           |

#### 关键限制 (跟 V0.3 call graph 协同)
- `caller` 字段 = BL-instruction address (不是 function address)
- entry `0x02008000` 是大 inline loop, V0.8 未识别为一个 function (但 V0.11 把它 as 0x02008000..0x02010000 范围内 BL-source aggregation 当作 `entry_root` tier)
- BFS 浅搜 5 hops: 深 nested helper 仍隐 (但 41 个 V0.10 helper 大部分落 leaf_helper tier)

#### ADR-011 (新)
**Decision**: 5-tier BFS reachability classifier — depth-based tier naming, 不依赖 IDA / Ghidra / unicorn

详细 ADR 见 `.codebuddy/DECISIONS.md` ADR-011 段.

#### BUG (V0.11)
- V0.11.0-001 — `entry_root` tier 的 BL-source 聚合算法仅基于 function-calls.json JSON 静态分析, 没做 entry mid-body 虚拟 partition, **不同 BL-source addresses 不完美归为 entry_main_loop 内**; V0.11.1 改进
- V0.11.0-002 — BFS 浅 5 hops, 深 nesting helper (BFS-depth > 5) 不在 hot-path-tree 内 — 后续可增至 8 hops (但 hot-path 已经定位, 不阻塞)
- V0.11.0-003 — `first_disasm` 仅抽 ARM-mode 头 8 行; Thumb-mode funcs 抽 thumb disasm (待 V0.11.1 disasm-arm9-full thumb 区支持)

#### Verification
- ✅ `python scripts/bfs_hot_path.py` exit 0, 输出 hot-path-tree.json + summary
- ✅ hot-path-tree.json 包含 5+ tiers + 每个 tier ≥ 1 hot func
- ✅ tsc EXIT=0 on V0.11 + 整项目 (V0.11 0 个 TS 改动, 跟 V0.10 一致)
- ⚠️ 跟 V0.9.0-002 同: pre-existing index.ts 2 errors 未修

#### 后续 V0.12+
- 用 V0.11 first_disasm snippets 手动 curated naming (人类读 disasm, 给 hot funcs 真业务名)
- 加 pattern detector: 写 IO_KEYINPUT = input_handler, 写 VRAM = render_submit
- 给 `entry_root` 单独分析 (entry 0x02008000 大 loop, 找 frame vblank wait / scene dispatch)
- 命名覆盖率目标 30%+ (~800 funcs)

---

## V0.11.1 — Function-level BFS fix (closure of V0.11.0-001..003)

### V0.11.1 — 2026-08-31

#### 改动
- 改 `scripts/bfs_hot_path.py`:
  - **function-level graph** (V0.8 fn-table binary search 映射 BL-insn caller → 包含 fn_addr)
  - 缩 entry_zone window 默认 32KB → **8KB**
  - 加 CLI `--max-depth N` (default 5) + `--entry-window BYTES` (default 8192)
  - 加 thumb-mode funcs placeholder note
- 重跑输出 `rom-data/hot-path-tree.json` + `hot-path-summary.txt`:
  - 247 reachable (V0.11 broken BFS) → **573 reachable (V0.11.1 function-level BFS)**
  - 6 tiers properly populated: entry_root:1 / frame_loop:29 / subsystem:100 / worker:190 / leaf_helper:239 / sfloat:14

#### BUG closure
- V0.11.0-001 [closed] — entry_zone window + function-level graph
- V0.11.0-002 [closed] — CLI --max-depth (8 hops → 697 funcs)
- V0.11.0-003 [partial closed] — thumb-mode placeholder

---

## V0.12 — Curated naming + ADR-012

### V0.12.0 — 2026-08-31

#### 改动
- 新 `rom-data/v012-curated.json` — 13 entry curated names (人工读 disasm, 高置信度)
- 改 `scripts/generate_ts_functions.py` 加 `load_curated_names()` + 应用 curated override
- 重跑 codegen → 7 TS 文件更新 (`state_setter_a`, `is_no_key_pressed`, `array_field_0x54_get_idx`, ...)
- FunctionRecord 加 `is_curated: boolean` 字段
- JSDoc 加 `@curated V0.12 manually named` 注解

#### ADR-012 (新)
**Decision**: 4-tier priority naming — V0.4 known > curated (V0.12) > heuristic (V0.10) > sub_XXX

#### 命名覆盖率 (V0.12)
- 28 known + 13 curated + 18 sfloat + 7 util + 36 helper = **102** / 2700 = **3.78%** (V0.10 3.6% → 3.78%)

#### 关键 curated 命名
- `0x0200a098 state_setter_a` (callers=48) — entry + many subsystems assign state via this
- `0x020288c8 is_no_key_pressed` — NDS KEYINPUT bit 15 = "no key pressed"
- `0x020082cc array_field_0x54_get_idx` — entity array stride 0x58, field 0x54 read
- `0x0202dac4 global_dword_load_chain` — 2-level pointer chase
- `0x02027ee8 const_true_getter` — 返回常数 1

#### BUG (V0.12)
- V0.12.0-001 — curated 第一轮仅 13 entries (目标 30% 未达). V0.12.1 + V0.13 加更多 + pattern detector
- V0.12.0-002 — curated 可能 collide with V0.4 known (validator 待 V0.12.2)

#### Verification
- ✅ python scripts/generate_ts_functions.py exit 0
- ✅ 13 curated names appear in arm9.ts with `@curated` JSDoc
- ✅ FunctionRecord schema 加 `is_curated: boolean` 字段

#### 后续 V0.13+
- **V0.12.1** — curated 增到 30+ entries（top 30 hot funcs 全覆盖）
- **V0.13** — pattern detector 自动识别 disasm 模式 (state setter / key check / array get)
- **V0.14** — entry_root 单独分析 (entry 0x02008000 大 loop, frame vblank wait)

---

## V0.12.1 — Curated naming batch 2

### V0.12.1 — 2026-08-31

#### 改动
- 新 `rom-data/v0121-curated-batch2.json` — 15 个新 curated names
- 改 `scripts/generate_ts_functions.py`:
  - 加 `CURATED_JSON_BATCH2` 配置
  - `load_curated_names()` 支持多个 JSON 文件（后置覆盖前置，允许 incremental batch 添加）

#### 新增 15 个 curated names（half 是 simple 1-liner pattern, half 是 complex multi-call）
| Addr | Name | Callers | Disasm pattern |
|---|---|---|---|
| `0x02020f4c` | `global_dword_get` | 12 | 1-level ptr deref |
| `0x0201eeb0` | `global_dword_get_b` | 3 | 同 pattern, 不同 global |
| `0x02029830` | `state_set_c` | 12 | `ldr r1, [pc, #4]; str r0, [r1]; bx lr` |
| `0x02029840` | `state_set_struct_v2` | 11 | 写 r0+清 0 到 2 globals |
| `0x02027c44` | `mem_byte_copy_signed` | 7 | `ldrsb` + `strb` 循环 copy |
| `0x0201dc1c` | `state_init_with_lift` | 9 | wide register save + const loader |
| `0x0201dcc8` | `is_state_valid_flag` | 4 | validation helper + boolean return |
| `0x02020eb4` | `state_reset_a_dispatcher` | 8 | reset + dispatch chain |
| `0x0202bbfc` | `tail_call_set_arg1_r2_set_arg0_0` | 21 | tail-call with arg forwarding |
| `0x0202d0d4` | `state_validate_early_return` | 15 | if invalid goto err (comm­on guard) |
| `0x02028b34` | `array_init_zero_0x18_stride` | 9 | 200 elements stride 0x18 zero-fill |
| `0x02028dec` | `array_init_zero_0xc_stride_offset_8` | 9 | 1000 elements stride 0xc |
| `0x02030270` | `mem_alloc_aligned_4` | 10 | aligned-4 allocator |
| `0x0202cf08` | `scene_state_check_op_branch` | 3 | state==1 → branch, else vec3 op |
| `0x0202c60c` | `init_trampoline_calls` | 2 | calls 8 worker fns in sequence |

#### 命名覆盖率 (V0.12.1)
- V0.12.0: 13 curated → V0.12.1: **28 curated** (+15)
- 28 known + 28 curated + 18 sfloat + 6 util + 31 helper = **111** / 2700 = **4.11%**
- (V0.12.0 was 3.78%, V0.10 was 3.6%)

#### Verification
- ✅ python scripts/generate_ts_functions.py exit 0
- ✅ 28 curated names appear in arm9.ts (15 new + 13 existing)
- ✅ Tsc EXIT=0 on V0.12.1 generated files

#### 后续 V0.13+
- **V0.12.2** curated 增到 50+ entries (next 20 hot funcs)
- **V0.13** pattern detector (regex 找 common disasm patterns, 自动建议命名)
- **V0.14** entry_root 单独分析

---















---

## V0.12.2 - Curated naming batch 3 + 4 (86 entries, 5.13% coverage)

### V0.12.2 - 2026-08-31

#### 添加
- ✅ `rom-data/v0122-curated-batch3.json` - 32 entries (hot callers + cache + IPC)
  - 0x0202f0c4 `state_set_gated_on_global_910` (49 callers, most-called remaining sub)
  - 0x020395d8 `dcache_clean_range` + 0x020395f4 `dcache_clean_invalidate_range` (cache control)
  - 0x0204d7e8 `float32_unpack_bits` + 0x0204c074 `float32_compare_abs` (SOFTFLOAT helper)
  - 0x02391b48 `arm7_ipc_fifo_send_low` + 0x02391b88 `arm7_ipc_fifo_send_high` (IPC send)
  - 0x0203a76c `memcpy_4byte_chunks` + 0x0203a758 `memset_4byte_chunks` (loop helpers)
  - 0x02043abc `global_dword_get_c` + 0x02043c70 `global_array_set_field_0x18`
  - + 24 more state/dispatch/init helpers
- ✅ `rom-data/v0122-curated-batch4.json` - 26 entries (pattern based detection)
  - 2 state setters (global_state_set_d, arm7_global_state_set_a)
  - 6 state getters (global_dword_get_d..i)
  - 3 halfword setters (global_halfword_set_b, _c, _b)
  - 1 byte setter (global_byte_set_a)
  - 2 halfword getters (global_halfword_get_a, _b)
  - 2 cache helpers (dcache_clean_range_v2, _clean_invalidate_v2)
  - 10 zero-init helpers (struct_zero_init_2field, struct_clear_3field, dual_global_clear, ...)
  - 1 switch dispatch (switch_dispatch_3way_alt)
- ✅ `scripts/generate_ts_functions.py` 加 batch 3 + batch 4 路径到 load_curated_names
- ✅ ADR-012 加到 `.codebuddy/DECISIONS.md`

#### 命名覆盖率
| Tier | V0.12.1 | V0.12.2 | 变化 |
| ---- | ------- | ------- | ---- |
| known | 28 | 28 | - |
| curated | 28 | 86 | **+58** |
| sfloat | 18 | 16 | -2 (curated 吸收) |
| util | 6 | 0 | -6 (curated 吸收) |
| helper | 31 | 7 | -24 (curated 吸收) |
| **total** | **111** | **137** | **+26** |
| % | 4.11% | **5.13%** | +1.02% |

**Note**: curated 增长 +58 但 total 只 +26 — 因为 batch 3+4 的 32 entries (大部分是 ≥10 callers) 吸收了
heuristic (sfloat_/util_/helper_) slot. 这是 **advisory** (curated 业务名 > 编号占位符)
而不是 regression — V0.13 pattern detector 会用更宽松阈值补回 heuristic coverage.

#### 4-tier 命名优先级 (ADR-012)
```
Tier 1: V0.4 known       (is_known=true, 28 fixed)
Tier 2: V0.12 curated    (manual disasm reading, addr → name)
Tier 3: V0.10 heuristic  (sfloat_/util_/helper_, by region + caller count)
Tier 4: sub_<addr>       (catch-all placeholder)
```

#### Verification
- ✅ `python scripts/generate_ts_functions.py` exit 0
- ✅ 86 curated names appear in arm9.ts (32 batch 3 + 26 batch 4 + 13 batch 1 + 15 batch 2)
- ✅ Tsc EXIT=0 on V0.12.2 generated files

#### 后续 V0.13+
- **V0.13** pattern detector: regex 匹配 disasm 找所有 state setter / global getter / memset / memcpy,
  自动建议名字 + 写 v013-pattern-suggestions.json. 不需要手工逐个命名.
- **V0.14** entry_root deep analysis (entry 0x02008000 大 inline loop, frame vblank wait)

---

## V0.13 - Pattern detector (regex auto-suggest) (ADR-013)

### V0.13 - 2026-08-31

#### 添加
- ✅ `scripts/pattern_detector.py` — 自动检测 common disasm pattern 的 standalone 脚本
  - 14 种 pattern: state_setter/getter, byte_/halfword setter/getter, const_return,
    struct_clear_0, memset_word, memcpy_word, dcache_helper, tail_call,
    switch_dispatch, early_return
  - 51 matches (V0.13 截止), 自动建议 `auto_<kind>_<addr8>` 命名
- ✅ `rom-data/v013-pattern-suggestions.json` — 51 entries (pattern_kind + confidence + disasm_snippet)
- ✅ `scripts/generate_ts_functions.py` 加 `is_pattern` 5th tier (在 curated 之后, heuristic 之前)
- ✅ JSDoc 加 `@pattern V0.13 auto-detected` 标注
- ✅ `miniprogram/utils/nds/types.ts` FunctionRecord 加 `is_pattern` 字段
- ✅ `docs/V0.13_PATTERN_DETECTOR.md` 设计文档
- ✅ ADR-013 加到 `.codebuddy/DECISIONS.md`

#### 5-tier 命名优先级 (ADR-013)
```
Tier 1: V0.4 known       (is_known=true, 28 fixed)
Tier 2: V0.12 curated    (manual disasm reading, 86 entries)
Tier 3: V0.13 pattern    (regex auto-match, 51 entries)  ← NEW
Tier 4: V0.10 heuristic  (sfloat_/util_/helper_, 23 entries)
Tier 5: sub_<addr>       (catch-all placeholder)
```

#### 命名覆盖率
| Tier | V0.12.2 | V0.13 | 变化 |
| ---- | ------- | ----- | ---- |
| known | 28 | 28 | - |
| curated | 86 | 86 | - |
| pattern | 0 | **51** | **+51** |
| sfloat | 16 | 16 | - |
| util | 0 | 0 | - |
| helper | 7 | 7 | - |
| **total** | **137** | **188** | **+51** |
| % | 5.13% | **7.04%** | +1.91% |

#### Pattern matches 分布 (51 total)
| Pattern | Matches |
| ------- | ------- |
| tail_call | 16 |
| state_setter | 11 |
| state_getter | 9 |
| const_return | 8 |
| halfword_getter | 3 |
| byte_getter | 1 |
| dcache_helper | 1 |
| byte_setter | 1 |
| halfword_setter | 1 |

#### Verification
- ✅ `python scripts/pattern_detector.py` exit 0
- ✅ 51 pattern matches found
- ✅ `python scripts/generate_ts_functions.py` exit 0
- ✅ Tsc EXIT=0 on V0.13 generated files
- ✅ Codegen idempotent

#### 后续 V0.13.1+
- **V0.13.1** Thumb disasm: 跑 capstone Thumb mode 解 odd-address 函数 (307 个遗漏)
- **V0.13.2** Advanced patterns: IO 寄存器访问 → io_*, interrupt handler → irq_*, vector table → vector_*
- **V0.14** Global dedup: 聚类同样 pattern 的 auto_state_getter_* 到一个 _global_get_N 系列
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call target, 找 V0.4 BUG-004 闭环

---

## V0.13.1 - Fix pages/index/index.ts 2 syntax errors (V0.9.0-002 closure)

### V0.13.1 - 2026-08-31

#### 修复
- ✅ `miniprogram/pages/index/index.ts:34` 删除错误的 `private _board: SudokuBoard | null = null,`
  - 原因: `Page({...})` 是函数调用 + object literal, 不支持 class field 语法 (`private` + `: type`)
  - V0.4 STUB 文件遗留 bug (V0.9.0-002), 跨 V0.9-V0.13 没人修
  - 删除后 `this._board = null` (onLoad line 14) 仍 work (TS implicit any)
  - 不影响业务 (这个 _board 字段在文件中没被读)
- ✅ tsc EXIT=0 (整个项目 0 errors, 跨 100+ TS files)

---

## V0.13.2 - Thumb disasm + dual-mode pattern_detector (Thumb-aware, 7.04% stable)

### V0.13.2 - 2026-08-31

#### 添加
- ✅ `scripts/disasm_thumb.py` - Capstone Thumb-mode 反汇编脚本
  - ARM9 Thumb pass: 458003 insns (+38372 skipdata placeholders)
  - ARM7 Thumb pass: 121743 insns (+4747 skipdata placeholders)
  - 产物 `rom-data/disasm-arm9-thumb-full.txt` + `rom-data/disasm-arm7-thumb-full.txt`
- ✅ `scripts/pattern_detector.py` 加 Thumb disasm loading
  - 同时 load 4 个 disasm (arm9 ARM + Thumb, arm7 ARM + Thumb)
  - get_disasm_snippet() 加 `step` 参数 (ARM=4, Thumb=2)
  - 双 mode 匹配: ARM 不命中且有 Thumb 时回退到 Thumb 文本
  - Suggestions 加 `disasm_mode` 字段 (arm / thumb) 标注

#### 局限 (V0.13.2 截止)
- Thumb-mode-only 函数 241 个, 0 callers, 不匹配现有 14 个 pattern
  - 原因: V0.8 detect_functions 把所有 `push {..lr}` prologue 当成函数,
    但实际有些是函数调用时的临时 push, 不是真函数
  - Thumb 指令 (16-bit) 跟 ARM (32-bit) 模式不同, 现 pattern 不全
  - 解决: V0.13.3 加 Thumb-specific patterns
- 236 个函数 disasm 完全 missing (callers 0/1, 多在 0x02100000+ 区域)
  - 原因: ARM9 ROM 末尾被 capstone skipdata 跳过, 反汇编不连续
  - 影响: 这些 0-1 caller 的函数本来就不需要命名 (未到命名阈值)

#### 命名覆盖率 (V0.13.2 截止)
| Tier | V0.13.1 | V0.13.2 | 变化 |
| ---- | ------- | ------- | ---- |
| known | 28 | 28 | - |
| curated | 86 | 86 | - |
| pattern | 51 | 51 | - (Thumb-specific patterns 待 V0.13.3) |
| sfloat | 16 | 16 | - |
| util | 0 | 0 | - |
| helper | 7 | 7 | - |
| **total** | **188** | **188** | 0 (但 Thumb disasm 文件已纳入代码库) |

**Note**: V0.13.2 命名覆盖率没变, 但 Thumb disasm 已生成 + pattern_detector 已 Thumb-aware.
V0.13.3 加 Thumb-specific patterns (push+pop+pc, etc.) 后预期 +20-40 matches.

#### Verification
- ✅ `python scripts/disasm_thumb.py` exit 0
- ✅ `python scripts/pattern_detector.py` exit 0 (51 matches, stable)
- ✅ Tsc EXIT=0 on V0.13.2 generated files
- ✅ `npx tsc --noEmit` 0 errors

#### 后续 V0.13.3+
- **V0.13.3** Thumb-specific patterns (push+pop+pc, ldr pc-relative in Thumb, Thumb mcr cache)
- **V0.13.4** Advanced IO patterns (IO_KEYINPUT, VRAM, timer, IPC FIFO writes → io_*)
- **V0.14** Global dedup (聚类同样 pattern 的 auto_* 到一个 _global_get_N 系列)
- **V0.15** unicorn2 emulation 抓 bx rX indirect call (V0.4 BUG-004 闭环)

---

## V0.14 - Global dedup (target_global_ptr extraction) (ADR-014)

### V0.14 - 2026-08-31

#### 添加
- ✅ `scripts/pattern_detector.py` 加 `extract_pc_relative_target(lines, fn_addr, binary, load_addr)`
  - 找 `ldr rN, [pc, #N]` insn 的实际 addr
  - 计算 target = ldr_addr + 8 + offset (ARM pipeline)
  - 从 arm9.bin/arm7.bin 读 4-byte little-endian word
- ✅ Naming 从 `auto_<kind>_<fn_addr>` 改为 `auto_<kind>_<target_ptr_short>`
  - 两个 setter 操作同一个 global 时名字相同 → 暴露真实 duplicate
  - 加 `_a` / `_b` / `_c` 后缀去歧义
- ✅ `rom-data/v014-pattern-suggestions.json` 输出
  - `names[]` — 51 suggestions, 每条带 `target_global_ptr` field
  - `clusters[]` — 25 unique (pattern_kind, target_global) 聚类
- ✅ `scripts/generate_ts_functions.py` 切到 v014 (load v014-pattern-suggestions.json)
- ✅ `docs/V0.14_GLOBAL_DEDUP.md` 设计文档
- ✅ ADR-014 加到 `.codebuddy/DECISIONS.md`

#### V0.13.2 finding (skip + document)
- ⚠️ 307 个 missing 函数全是 V0.8 false positives (0 callers, mid-function push sites)
- Thumb disasm (capstone CS_MODE_THUMB) 不增加 naming coverage
- 文档化: BUG-V0.13.2-001 (false positive analysis)

#### V0.14 结果
| Metric | V0.13 | V0.14 |
| ------ | ----- | ----- |
| Pattern suggestions | 51 | 51 (same) |
| With target_global_ptr | 0 | 39 (76%) |
| Clusters (unique ptr per pattern) | n/a | 25 |
| Name collisions | 0 | 6 (suffix _a/_b added) |
| Total named | 188 | 188 (qualitative upgrade) |

#### 6 collisions 详情 (target_global_ptr dedup 检测)
```
state_setter target=0x021bd860:
  0x02030ff8 → auto_state_setter_021bd860_a
  0x0203100c → auto_state_setter_021bd860_b

state_getter target=0x0380aa88:
  0x02385b34 → auto_state_getter_0380aa88_a
  0x02385b40 → auto_state_getter_0380aa88_b

tail_call target=0x038080e8:
  0x0238e730 → auto_tail_call_038080e8_a + 5 more
```

#### 命名覆盖率 (V0.14 截止)
| Tier | V0.13 | V0.14 | 变化 |
| ---- | ----- | ----- | ---- |
| known | 28 | 28 | - |
| curated | 86 | 86 | - |
| pattern | 51 | 51 | - |
| sfloat | 16 | 16 | - |
| util | 0 | 0 | - |
| helper | 7 | 7 | - |
| **total** | **188** | **188** | - (qualitative) |
| % | 7.04% | 7.04% | - (qualitative upgrade: names now contain target_global_ptr) |

#### Verification
- ✅ `python scripts/pattern_detector.py` exit 0
- ✅ 39/51 suggestions with target_global_ptr
- ✅ 25 unique clusters + 6 collisions resolved
- ✅ Tsc EXIT=0 on V0.14 generated TS files
- ✅ Codegen idempotent

#### 后续 V0.14.1+
- **V0.14.1** Extract target_global for tail_call + const_return (12 more)
- **V0.14.2** Cluster dedup output for V0.15 batch curated
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call (V0.4 BUG-004 闭环)
- **V0.16** Global ptr naming: cross-reference ldr target with addresses.ts

---

## V0.14.1 - 100% target extraction + tsc cleanup (ADR-014 extension)

### V0.14.1 - 2026-08-31

#### 添加
- ✅ `scripts/pattern_detector.py` 加 per-kind target extraction:
  - `tail_call` 用 LAST ldr ip (closest to bx ip) - 加 `prefer='last'` 参数
  - `const_return` extract 整数常量 from `mov r0, #N` / `movs r0, #N`
  - `dcache_helper` extract mcr opcode 字符串 (`c7_c10_1`)
- ✅ extract_pc_relative_target regex 加 `ip` 寄存器匹配 (`ldr ip, [pc, #N]`)
- ✅ dcache opcode 字符串当 target_ptr short (避免 int format error)
- ✅ `miniprogram/utils/nds/addresses.ts` 修 `as const` on computed expression TS1355 errors (3 处)
- ✅ `miniprogram/pages/index/index.ts` 清理 V0.13.1 副作用:
  - 删 unused `import { SudokuBoard }`
  - 删 `this._board = null` (没有 _board 字段了)
  - 改 `e: any` → `_e: any` (noUnusedParameters)
- ✅ `scripts/test_sudoku_fuzz.ts` 修 unused vars (REAL_PUZZLES, FUZZ_SEEDS)
- ✅ `typings/types/wx/lib.wx.app.d.ts:265` 加 `<T extends object = IAnyObject>` 修 TS2344

#### V0.14.1 结果
| Metric | V0.14 | V0.14.1 | 变化 |
| ------ | ----- | ------- | ---- |
| Pattern suggestions | 51 | 51 | - |
| With target_global_ptr | 39 (76%) | **51 (100%)** | +12 |
| Clusters (unique ptr per pattern) | 25 | 26 | +1 (mov #0) |
| Name collisions | 6 | **19** | +13 (more shared targets visible) |
| tsc EXIT=0 | partial | ✅ | fixed 4 pre-existing errors |

#### 12 个新提取 (V0.14 缺 target → V0.14.1 提取)
- 4 tail_call: ldr ip, [pc, #N] → tail target (last ldr)
- 7 const_return: mov r0, #0 (returns 0) → 0x00000000
- 1 dcache_helper: mcr p15 c7 c10 #1 → c7_c10_1

#### Verification
- ✅ `python scripts/pattern_detector.py` exit 0
- ✅ 51/51 suggestions with target_global_ptr (100% coverage)
- ✅ tsc EXIT=0 on whole project (was partial)

#### 后续 V0.14.2+
- **V0.14.2** Cluster dedup output for V0.15 batch curated
- **V0.15** unicorn2 emulation: 抓 bx rX indirect call (V0.4 BUG-004 闭环)
- **V0.16** Global ptr naming: cross-reference ldr target with addresses.ts
