# 开发日志进度跟踪表

> 记录卡点、问题修复、攻关过程与计划外工作内容。

## v0.1.0（骨架 + 引擎 + 渲染 + 页面）

### 阶段 1：ROM 结构
- [x] NTR Header 解析：游戏码 `AXPE`，ARM9 入口 `0x2000800`，ARM7 入口 `0x2380000`，FNT=0x171800 / FAT=0x171C00
- [x] FAT/FNT 文件系统解包：98 个文件 → `extracted/` + `manifest.json` + `fnt_parsed.json`
  - 卡点：FNT 为非标准格式，目录项为 `[0x80|len][name][dirID][0xF0]`，文件按目录分组、`00` 终止；初版按标准格式解析导致计数溢出，改为经验格式扫描修复
- [x] ARM9/ARM7 反汇编（capstone, skipdata=True）：ARM9=131,946 条指令，ARM7=41,584 条指令

### 阶段 2：数据格式逆向
- [x] file_86 识别为 UTF-16LE 消息索引表（头 6B + 372×u32 嵌套偏移），可解码出 "Congratulations!" 等字符串
- [x] file_94 拼图记录格式（B1 完成，v0.4）：
  - 提示记录区：`0xb2fd00` 起 90 条记录，每条 `0x2000` 字节；90 条中 72 条唯一 + 3 组各 6 条完全相同
  - 记录结构：`[0x34B 零头部][提示数字段]`，提示段为 ASCII `0x30-0x3F` 每字节=值0-15（`'0'-'9'`=0-9、`':'`=10...`'?'`=15），以 `00` 分隔；单记录约 801 个 hint list
  - 解法区：`0x10c0000` 起 256B/块（16×16，每格1字节），空=0/1/2、填充=3-9（BUG-006 定案）
  - 记录内 `+0x1A34` 的 256B 为共享背景图案（记录间重复，非解法）
  - `_b1_d1` 验证：记录区提示与解法区【不顺序对应】（匹配率 3/32，记录0-2提示相同解法不同）→ 记录↔解法映射未确认（BUG-008）
  - `tools/extract_puzzles.py` v0.4 → `src/data/puzzles.ts`（256 条 16×16 真实拼图）；提示由引擎从解法自动推导（`hints.ts`），不依赖 ROM 提示
- [x] 文本解码（B3 完成）：
  - 格式定案：UTF-16LE `[FF FE][6B 头][u32 偏移表][00 00 终止的文本]`
  - `file_86.bin`：372 条 EN 主消息（教程/规则/提示全文，369 条非空）
  - `file_88.bin`：165 条 EN 拼图名；`file_90.bin`：165 条 FR 拼图名；`file_92.bin`：15 条 ES 拼图名（不完整）
  - `tools/extract_messages.py` → `src/data/messages.ts`（MESSAGES + PUZZLE_NAMES{en,fr,es}）
  - 注：`extracted/Msg/*.dat`（ENG_JP_Easy/Normal/Free 等）仍为编码二进制，疑似按模式索引指向文本表，待 E4 时确认
- [ ] PR.sdat 音频（B4，非标准 SDAT）

### 阶段 3：游戏内核 + 渲染 + 页面（本日完成）
- [x] `src/core/types.ts` / `hints.ts` / `engine.ts` / `puzzle-loader.ts`
- [x] `src/render/renderer.ts`（平台无关 Canvas 渲染）
- [x] `src/data/puzzles.ts`（stub 数据，TODO(B1) 待真实解析替换）
- [x] 小程序页面 `pages/index`（type=2d Canvas + 触摸涂黑/画叉/循环 + 拖动绘制 + 进度/计时/完成遮罩）
- [x] HTML5 测试环境 `test/`（`build_web.cjs` 用 tsc 编译 TS → ES 模块，`index.html` 直接可玩）
- [x] 无界面测试 `tools/test_headless.mjs`：14 项断言全部通过

### 工具类开发
- `tools/parse_ntr_header.py`、`tools/extract_rom.py`、`tools/disasm.py`、`tools/sniff_files.py`、`tools/extract_puzzles.py`、`tools/build_web.cjs`、`tools/test_headless.mjs`

## 卡点与攻关记录
1. **FNT 解析溢出**：标准 NDS FNT 布局不适用 Picross DS → 按二进制特征自定义解析。
2. **capstone 提前停止**：数据字节被当指令 → `skipdata=True` 后指令数从 63 提升至 131,946。
3. **Node ESM 扩展名**：tsc 产物 import 无 `.js` 后缀 → 无界面测试用 `--experimental-specifier-resolution=node`。
4. **引擎完成检测 bug**：`checkSolved` 曾要求全格 filled（永远无法完成）→ 改为"filledCount==totalFilled 且无误填格"（见 BUGS.md）。

## 下一步
- [ ] E1/E2：拼图选择界面（用 PUZZLE_NAMES 拼图名）+ 结算动画
- [ ] E3：存档
- [ ] E4：多语言接入（MESSAGES/PUZZLE_NAMES 已就绪；Msg/*.dat 模式索引待确认）
- [ ] F1/F2：UI 与架构优化
- [ ] B4：PR.sdat 音频（非标准 SDAT）
- [ ] B1 纵深（可选）：ARM9 反汇编确认记录区↔解法区映射（BUG-008），接入 ROM 原版提示
