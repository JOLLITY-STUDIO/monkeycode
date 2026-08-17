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

### 阶段 3：游戏内核 + 渲染 + 页面
- [x] `src/core/types.ts` / `hints.ts` / `engine.ts` / `puzzle-loader.ts`
- [x] `src/render/renderer.ts`（平台无关 Canvas 渲染）
- [x] `src/data/puzzles.ts`（256 条真实拼图，v0.4）
- [x] 小程序页面 `pages/index`（type=2d Canvas + 触摸涂黑/画叉/循环 + 拖动绘制 + 进度/计时/完成遮罩）

### 阶段 3.5：游戏流程与 UI（E1/E2 完成）
- [x] E1 拼图选择界面 `pages/select`：
  - 按难度（简单/普通/困难）分组展示 256 条真实拼图
  - 拼图名优先取 `PUZZLE_NAMES.en`（B3 ROM 提取），无名称回退 `Picross N`
  - 点击卡片 `navigateTo` 解谜页并携带拼图 id
- [x] E2 解谜流程升级 `pages/index`：
  - `onLoad` 接收 `puzzle` 参数 → 直接进入对应拼图
  - 结算星级：0 失误=3★ / 1-2 失误=2★ / 其余=1★（starsFor）
  - 完成动画：卡片弹入 + 星星逐个旋转弹出（CSS animation，延迟 0.2s/0.4s/0.6s）
  - 结算面板新增「返回选择」按钮（navigateBack）
- [x] E3 存档 `src/core/save.ts`：
  - `SaveData { records: id → {stars, bestTime, solvedAt} }`，key=`picross_save_v1`
  - 平台无关：微信 `wx.storage`，其他环境回退 `localStorage`（HTML 测试可直接用）
  - `recordPuzzle`：星级更高或同星更快才覆盖；`loadSave`/`getRecord` 读取
  - 解谜完成自动写档（onSolved → recordPuzzle）
  - 选择页 `onShow` 刷新：已通关卡片边框高亮 + 三颗星标记（★数量=星级）
- [x] HTML5 测试环境 `test/`（`build_web.cjs` 用 tsc 编译 TS → ES 模块，`index.html` 直接可玩）
- [x] 无界面测试 `tools/test_headless.mjs`：14 项断言全部通过

### 阶段 4：优化与重构（F1/F2 完成）
- [x] F2a 引擎状态缓存 `src/core/engine.ts`：
  - `getState()` 结果缓存 + dirty 标记，tapCell/clearCell/timer 变更后重建
  - 减少每帧/每秒操作的 GameState 对象分配（GC 压力）
- [x] F2b 渲染器脏区局部重绘 `src/render/renderer.ts`：
  - 布局快照缓存：画布/拼图尺寸未变时跳过全量重绘
  - 脏区 diff：仅重绘变化的格子 + 受影响行列提示（先擦除旧数字再重绘）
  - 顶部标签/进度条每帧单独更新
- [x] F1a 解谜页 UI 反馈 `pages/index`：
  - 顶栏新增返回按钮（‹），无返回栈时 reLaunch 兜底
  - 失误红闪：mistakes 上升 → board 红框闪烁动画 + 震动
  - 工具栏/返回按钮按压态（pressed：缩放+透明度）
- [x] F1b 选择页通关进度 `pages/select`：
  - 顶部统计：★ 已通关数/总数 + 渐变进度条（蓝→绿）
  - onShow 刷新时同步更新统计

### 阶段 3.6：多语言（E4 完成）
- [x] `src/i18n/index.ts`：
  - 语言：`zh/en/fr/es`，持久化 key=`picross_lang`（wx.storage / localStorage）
  - `puzzleName(lang, id)`：优先 `PUZZLE_NAMES[lang]`（B3 提取），中文/空值回退英文，再回退 `Picross N`
  - UI 文案表 `T[lang]` + `uiStrings(lang)`（仅字符串键，可安全 setData）
- [x] `pages/select`：顶栏语言切换胶囊（激活态高亮），难度标签与拼图名随语言切换
- [x] `pages/index`：结算标题/用时/失误/按钮/工具栏全部按语言渲染

### 阶段 5：纵深拓展（G）
- [x] G2 B5 存档格式逆向（结论定案）：
  - `default_data_00.pmd`（23,444B）：无 256×R 记录周期，XOR 全 key 可读率 ≤0.56 → 加密/压缩，静态不可逆
  - `01.pmd`=4B、`02.pmd`=20B、`03.pmd`=368B 均 FF 填充/极小配置，无明文文本
  - 结论：原版存档加密，导入/兼容价值低；wx.storage 方案（E3）跨平台可读可迁移 → **不迁移，保留 E3 方案**（B5 取舍）
- [x] G3 E4 文本纵深（定案）：
  - 结构：开头 ARM 函数 `f(x)=(x+1)*0x190+base`（ENG_JP_Easy 基址 `0x020E396C` 为 RAM 加载地址），0x18 起为模块代码段，0x1A8 起为 400B×N 记录区
  - **新发现（本轮）**：Msg 模块为「数据即代码」——`SPA_JP_Easy`(160B) 整文件即编译 ARM 代码（ldr/mov/bl/bx 全合法），含 RAM 导入表（0x020F23C0 / 0x020DE4DC / 0x020F235C）与**调试字符串 `Seq_AotoSampleA_Init()`**（旧记录 `SqAtSmlAIi(e_ooape_nt)` 系错位误读）
  - `FRE_JP_Easy` 尾部含资源路径碎片（`Classic/Seq_Edit`、`BJ_CHR1`、`PackDat`）→ 模块内嵌资源引用
  - 记录区（0x1A8 起）验证：非有效文本（XOR 0x20/0x40/0x80、±0x10、奇偶分离可读率均 ≤0.63，无 UTF-16/ASCII 明文）且非有效代码（Thumb 指令密度仅 1 条/10B）→ **自定义消息脚本编译器产物**，需 ARM9 记录解释器逆向
  - 12 个 `Msg/*.dat`（id 5-16）仅 6 个有内容：ENG 36KB/28KB（93+ 记录）、FRE 2.3KB/5.4KB、SPA 8.1KB/0.2KB → **FR/ES 模块过小，即使解码也不含完整本地化文本**
  - 结论：Msg 模块无用户可见增量（B3 file_86 已提取 372 条 EN 全文 + i18n 四语 UI + EN/FR/ES 拼图名覆盖全部面向文本）→ **维持 B3+i18n 管线，不接入**；记录为深度逆向专项（ARM9 记录解释器）
- [x] G1 B4 音频（务实方案）：
  - `PR.sdat`（14,196B）非标准 SDAT 魔数、XOR 全 key 可读率 ≤0.59 → 加密/压缩暂不可解
  - 实现 `src/audio/sfx.ts`：WebAudio 振荡器合成五类音效（tap 涂黑 / cross 画叉 / clear 清除 / mistake 失误 / win 完成），微信 `wx.createWebAudioContext` + HTML `AudioContext` 双平台，不支持环境静默降级
- [x] G5 BUG-007 原版 5 次失误判负：
  - 引擎：`failed` 标志 + `maxMistakes=5`，第 5 次误填 → failed=true + 停表 + 后续操作忽略（types.ts GameState.failed）
  - 页面：失败结算面板（GAME OVER / 失误次数已用完 / 重试），`syncState` 同步 failed
  - `test_headless` 新增失败流用例（5 次误填 → failed、操作忽略、onStateChange 收到 failed）
- [x] BUG-009 空拼图过滤（数据修正）：
  - file_94 解法区 33 块全零（id 5/6/13/14/21/22/29/30/37/38/181/189-195/237-251）→ 全 0 解法不可玩（开局即 solved）
  - `extract_puzzles.py` 过滤空块并重新生成 `src/data/puzzles.ts`（256→223 题，保留原 ROM id，名称/存档映射不受影响）
  - `pages/index` 修复：onLoad 由 `id % length` 改为按 id `findIndex`（数组索引与 id 不再一致）
  - `test_headless` 重构：适配 16×16 真实数据、动态找非解法格做失误/失败用例、数据合法性断言（非空 + 223 题）

### 工具类开发
- `tools/parse_ntr_header.py`、`tools/extract_rom.py`、`tools/disasm.py`、`tools/sniff_files.py`、`tools/extract_puzzles.py`、`tools/build_web.cjs`、`tools/test_headless.mjs`
- `tools/_g3_*.py`（Msg 结构分析：ARM 前导/400B 块/交错文本）、`tools/_g2_*.py`（存档周期/XOR 探测）、`tools/_g1_probe.py`（PR.sdat 探测）
- `tools/_g3_dump.py`（Msg 文件/记录转储 + 字节频率 + 简单变换可读率）、`tools/_g3_rec_code.py`（记录区 ARM/Thumb 反汇编，验证非代码）

## 卡点与攻关记录
1. **FNT 解析溢出**：标准 NDS FNT 布局不适用 Picross DS → 按二进制特征自定义解析。
2. **capstone 提前停止**：数据字节被当指令 → `skipdata=True` 后指令数从 63 提升至 131,946。
3. **Node ESM 扩展名**：tsc 产物 import 无 `.js` 后缀 → 无界面测试用 `--experimental-specifier-resolution=node`。
4. **引擎完成检测 bug**：`checkSolved` 曾要求全格 filled（永远无法完成）→ 改为"filledCount==totalFilled 且无误填格"（见 BUGS.md）。

## 下一步（G 纵深已全部收口）
- [x] G1：B4 PR.sdat 音频逆向 + 小程序音效接入
- [x] G2：B5 default_data_*.pmd 存档格式逆向
- [x] G3：E4 纵深 Msg/*.dat 模式索引接入 ROM 原版全量文本（定案：数据即代码 + 记录非文本非代码，FR/ES 过小 → 不接入）
- [x] G4：B1 纵深 记录区↔解法区映射（BUG-008）→ 定案无映射，引擎从解法推导提示
- [x] G5：BUG-007 原版 5 次失误判负（引擎 + UI + 测试）
- [x] BUG-009：空拼图过滤（256→223 题，保留原 ROM id）

### 深度逆向专项（候选，非当前主线）
- [ ] ARM9 记录解释器：解码 Msg/*.dat 记录区自定义消息脚本（G3 遗留，无用户可见增量，优先级低）
- [ ] ARM9 拼图提示编码：确认记录区提示生成算法（G4 已定案引擎从解法推导，提示完全一致无需接入）
