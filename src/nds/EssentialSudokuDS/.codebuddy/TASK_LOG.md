# TASK LOG — Essential Sudoku DS 逆向 + H5 转写

> 详细任务执行日志。**记录卡点 / 问题修复 / 攻克难关的过程**，以及一些**当前进度之外**的工作内容（如工具类开发、已分析但尚未实现的代码段）。

---

## V0.16 — 数独玩法 UI 落地 (已完成)

### 2026-08-31: V0.16.0
- ✅ pages/index/index.ts V0.4 STUB → 真实玩法 (grid/选中/数字输入/清除/提示/完成检测/计时)
- ✅ pages/index/index.wxml + wxss — 棋盘 + 难度 chips + 数字键盘
- ✅ 接 SudokuGameService + NumpleCatalog (1000 题), 4 难度 + 每日一题
- ✅ tsc EXIT=0 / npm test 81 passed 0 failed

#### 关键设计
- ViewCell 视图模型 (r/c/v/given/err/sel/same) 与 SudokuCell 解耦, wxml 只读 view 层
- aspect-ratio 1:1 棋盘 + flex 均分, 适配任意屏宽 (Skyline/WebView 均支持)
- 提示 = 自动填入下一空/错格 (复用 hint() + inputValue()), 不单独弹窗
- 完成弹 modal 带用时/步数, 支持再来一局

#### 下一阶段: V0.17
- undo/redo 栈 (game_service placeholder)
- 数字备注 (candidates, NDS 原版支持)
- NBM 图形资源接入 (已解码 42 张)

---

## V0.4 — Library 函数分类 + SudokuBoard 业务逻辑 (已完成)

### 2026-08-31: V0.4.0
- ✅ miniprogram/utils/sudoku/board.ts V0.4 真实业务 (select/setValue/clear/isComplete/hint/_validate)
- ✅ real_puzzle.ts 3 难度等级 REAL puzzles (EASY 38 / MEDIUM 30 / HARD 26 clues)
- ✅ scripts/test_sudoku.ts — 12 测试组 / 81 passed
- ✅ npm test 包装 (tsc emit + node run)
- ✅ LIBRARY_MAP.md — V0.4 ARM9/ARM7 lib 函数分类
- ✅ ADR-005 soft float 发现

#### 重大发现 (V0.4 ADR-005)
1. NDS 无硬件 FPU, ARM9 0x0204C000..0x0204DFFF region 全是 __aeabi_* 软浮点 lib
2. 0x0204D8E8 (136 callers) __aeabi_fadd 推测 — sign bit 0x80000000 mask + CLZ
3. 0x0204DB1C (38) __aeabi_fsub
4. 0x0204D86C __aeabi_fabs — bic r1, r0, #0x80000000
5. TS 端 JS Number (IEEE 754 double) 直接覆盖, **不写 service wrapper**

#### Game-Specific Lib (12 / 2181 ≈ 0.5% named)
- 0x02028434 `vec2_set_inline` (221 callers) — 8-byte 直接写 (STR r1,[r0]; STR r2,[r0+4]; BX LR)
- 0x02029A58 `simple_set_var` — str r0, [r1]; bx lr
- 0x02029AB8 `state_switch_8way` — cmp r0, #7 + addls pc,pc,r0,lsl #2 → 8-way dispatch
- 0x02029BB0 (104 callers) 队列/链表 helper
- 0x0202F0E8 (79) bl 0x2039F38 / 0x2039F4C = register_attach
- 0x02039F4C (154) + 0x02039F38 (118) 中型 byte-array helper

#### ARM7 Top (callers ≥ 20, named)
- 0x023913B8 `ipc_fifo_recv_handler` (92)
- 0x02391398 (77, brother)
- 0x02384350 `touch_sample_xy` (53)
- 0x023920B0 `lid_close_handler` (35)
- 0x0239EEF4 `spi_transfer` (33)
- 0x0238863C `key_sample` (26)
- 0x023942A4 `rtc_read` (25)
- 0x0239F164 FIFO/SPI control (24)
- 0x02391B48 `cart_slot_detect` (22)
- 0x02399594 `gba_slot_detect` (21)
- 0x02391CE4 `mic_sample` (21)
- 0x02394548 `spi_ack_wait` (20)

#### 测试 (V0.4)
- npm test → 81 passed, 0 failed
- 12 测试组覆盖: construct×3 / initial !complete / given lock×3 / clearAt×2 / row conflict×3 / col conflict×2 / box conflict×2 / solve complete / hint walk×43 / select OOR / setValue bad value×3 / clearSelected×3

#### 下一阶段: V0.5
- IDA Free 自动识别 ARM9 函数边界 → 提升命名覆盖率 0.5% → ≥ 80%
- Lib命名收尾 (2181 - 12 = 2169 待命名)
- 真 _start 定位 (ARM7 entry 0x2380000 实际是 IRQ handler, 待 V0.4 解决 → V0.5 重排)
- NBM 资源解码 (NCGR/NCLR/NCER → PNG) 数独界面图标

---

## V0.3 — ARM9/ARM7 完整反汇编 + Mode-switch 识别

### 2026-08-31: V0.3.0
- ✅ scripts/disasm_full_arms.py — capstone 全量双 pass (capstone skipdata=True)
- ✅ ARM9: 262K ARM-mode + 496K Thumb-mode (1 MB / 4B) — 真实 ARM instr ~23.8 万
- ✅ ARM7: 65K ARM-mode + 126K Thumb-mode (256 KB / 4B) — 真实 ARM instr ~6.3 万
- ✅ 4681 mode-switch points (BX/BLX/LDM/POP→PC)
- ✅ 7141 BL/BLX calls / 2181 unique callees (range-filtered)
- ✅ docs/ARM9_DISASM_REPORT.md + ARM7_DISASM_REPORT.md
- ✅ BUG.md 7 条记录

#### 关键发现
1. ARM9 entry 0x2008000 是 main_stage 启动 (注册 IPC/touch handler via 4 service_register_* 函数)
2. ARM9 0x02024000-0x02028000 是 mode-switch 热点 (449 个) — game loop / IPC handler
3. ARM7 entry 0x2380000 不是 _start, 而 IPC handler
4. ARM9 0x02028434 (221 callers) 是最常用 lib — 推测 memcpy2 / hash-update
5. ARM9 0x0204D8E8 (136 callers) 是 alloc
6. ARM7 0x23913B8 (92 callers) 是 IPC FIFO 接收

#### BUG.md V0.3.0 (7 条)
- [V0.3.0-001] skipdata 1MB walk 占满 (minor)
- [V0.3.0-002] ; skipdata 行包含 raw bytes (cosmetic)
- [V0.3.0-003] blx LSB 反推 mode 不总准确 (medium → range filter fixed)
- [V0.3.0-004] bx rX 静态不可解析 (medium → 待 V0.4 emulation)
- [V0.3.0-005] ARM7 entry 不是真 _start (major → 待 V0.4)
- [V0.3.0-006] 0x201F1xxx 数据 vs 代码混淆 (medium)
- [V0.3.0-007] b #0x0/#0x2 自循环噪声 (minor → range filter fixed)

#### 下一阶段: V0.4
- ARM9/ARM7 真 _start 定位 (SVC vector + BIOS handler)
- 完整函数表 + 命名 (libnds / devkitPro / game-specific)
- ARM emulation 用 unicorn-engine 跑 trace (resolves 'bx rX')

---

## V0.2 — Banner 解码 (icon + 6 语言标题)

### 2026-08-31: V0.2.0
- ✅ NDS banner 解码 (`scripts/decode_banner.py`)
- ✅ 6 语言标题完整提取: "Essential Sudoku DS\nD3 Publisher"
- ✅ 32×32 icon → BMP (灰度版 + 调色板版)
- ✅ banner-info.json metadata
- ✅ `rom-data/extracted/` 目录创建

#### 关键发现
- Game code "AZIP" (Imagineer) + 实际 publisher "D3 Publisher" = 模拟日本开发/发行分工
- v1 banner 有 palette 区域 (0x0220) 但默认使用 index → 灰度映射
- 多语言模块在 v1 banner 仍有 (UTF-16LE @ 0x0240+), 标准 NDS layout

---

## V0.0 — Baseline (已完成)

### V0.0.1 — 2026-08-30
- ✅ NTR Header 解析（GBATEK § 9.2）
- ✅ FAT dump → fat.csv (83 entries)
- ✅ FNT raw hex dump
- ✅ ARM9/ARM7 entry 反汇编 (capstone 100 条)
- 输出: ROM_STRUCTURE_REPORT.md / ARM_DISASM_REPORT.md
- 工具: scripts/parse_nds_header.py / dump_fat.py / extract_arms.py / disasm_arms.py / rom_scan.py

### V0.0.2 — 2026-08-31
- ✅ 修复 ARM9/ARM7 Load Offset 异常（cart-space vs file-offset）
- ✅ ARM7 主循环入口 0x0238006c 解析
- ✅ 库函数候选表

### V0.0.3 — 2026-08-31
- ✅ ARM9 entry BL targets 完整解析
- ✅ ARM7 entry 关键观察 (4 项)
- 输出: V0.0.4+ TODO 列表

---

## V0.1 — 项目基础设施 (已完成)

### 2026-08-31: V0.1.0
- ✅ 创建 `README.md` (项目入口 + 进度跟踪说明)
- ✅ 创建 `CHANGELOG.md` (按版本的演进记录)
- ✅ 创建 `.codebuddy/` (任务跟踪目录)
- ✅ 创建 `DECISIONS.md` (3 条 ADR)
- ✅ FNT 完整 walker (`scripts/walk_fnt.py`)
- ✅ 83/83 FAT entries 全部映射 (`rom-data/fnt-mapping.json`)
- ✅ `docs/ROM_STRUCTURE_REPORT.md` V0.1.0 重写

#### FNT 格式反推过程 (V0.1.0 主要探索)

1. **起点**: fnt.hex 可视化 hex dump, 看到 ASCII 字符串 "download.nbm" 在 FNT+0x18
2. **理论尝试 1**: 文件 entry = 1 byte len + name + 2 byte u16 file_id → 大部分 name 解错位 (off-by-one)
3. **理论尝试 2**: 文件 entry = 1 byte len + name + 1 byte file_id (u8) → 13 文件映射, 大部分 name 仍错
4. **理论尝试 3**: dir = 1+name+4, file = 1+name+4 → 全错
5. **理论尝试 4 (成功)**:
   - dir = 1 byte (0x80|len) + name + 3 bytes (dir_id, 0xF0, 0x00)
   - file = 1 byte len + name (NO trailing)
   - file_id 从 FNT 顺序隐式分配
6. **验证**: 83/83 FAT entries 全部映射 (unmapped = 0)

#### 关键发现 (V0.1.0)
- 本游戏 FNT **不在 entry 内嵌 file_id**, 与某些 NDS 游戏 (含 u16 file_id) 不同
- file_id 起点 = HEADER.first_file_id (本游戏 = 0)
- 仅 1 根目录 `data/` (dir_id=1)
- 全部 83 文件直接列在根目录 (单 sub-alloc)
- 文档分类: 下载图标 / 菜单 / 子 ROM / 数独题 / 数墙题 / 制作名单 / 无线图标 等 9 类别
