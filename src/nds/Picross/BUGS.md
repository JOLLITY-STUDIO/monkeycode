# BUG 记录

> 记录逆向/转写过程中发现的差异与缺陷。状态：🔄待修 / ✅已修 / ⬜待确认

| ID | 描述 | 状态 | 说明 |
|---|---|---|---|
| BUG-001 | extract_puzzles.py 硬编码偏移 0x232A28 触发断言崩溃 | ✅ | 该偏移并非 (5,5) 记录头，实际维度标记在 0x232A2C 起的提示序列中；改为扫描式工具 + stub 输出 |
| BUG-002 | 引擎 checkSolved 要求所有格均为 filled | ✅ | 正确解法只要求"所有解法格已填 + 无误填格"；已改为 filledCount==totalFilled 且无错误填充 |
| BUG-003 | FNT 标准解析溢出 | ✅ | Picross DS 使用自定义 FNT 格式，按 `[0x80|len][name][dirID][0xF0]` 特征解析 |
| BUG-004 | capstone 数据误识别为指令 | ✅ | 启用 skipdata=True，ARM9 指令数 63 → 131,946 |
| BUG-005 | 终端/Node ESM import 缺少扩展名 | ✅ | test-build 使用 `--experimental-specifier-resolution=node` 运行无界面测试 |
| BUG-006 | file_94 解法位图字段位置 | ✅ | 解法区定案：`0x10c0000` 起 256B/块（16×16 每格1字节），空=0/1/2、填充=3-9；256 块全部提取为真实拼图（v0.4） |
| BUG-008 | 记录区提示与解法区映射未确认 | ✅ | G4 全量匹配定案：`tools/_g4_match.py` 对 90 条记录 hint lists × 256 解法提示全量比对 → 223/256 无匹配、33/256 多匹配（命中 24 条提示稀疏记录）→ **记录区与解法区无提示映射**；保持引擎从解法推导提示（hints.ts），正确性自动保证，不接入 ROM 记录区 |
| BUG-007 | 失误达到 maxMistakes 未触发游戏结束 | ✅ | G5：引擎实现 5 次失误判负（failed + 停表），页面失败结算（GAME OVER 面板/重试）；`test_headless` 增加失败流用例 |
| BUG-009 | file_94 解法区 33 块全零（空拼图） | ✅ | 全 0 解法块无填充、不可玩（开局即 solved）；`extract_puzzles.py` 过滤（保留原 ROM id），256→223 题；`pages/index` 改为按 id 定位（数组索引与 id 不再一致） |
| BUG-010 | 界面使用自造深色主题、素材/音乐缺失，与原版 NDS 不一致 | ✅ | 渲染器/页面统一还原原版黄白黑配色（白底、黑填充、红叉、黄标签条、5 格粗线）；选择页新增 ROM 解法位图缩略图（`assets/thumbs/{id}.png`，`tools/gen_thumbs.cjs`）；**修正（S87）**：当时判定的「PR.sdat 加密不可解」有误——真实音乐位于 ROM 0x1924800 的隐藏标准 SDAT（161 文件/27 首 BGM，完全可解码，见 BUG-016）；`src/audio/bgm.ts` 合成 BGM 仅作临时占位，待替换为 ROM 原曲 |
| BUG-011 | 启动直接进游戏页，缺少原版 How to Play 教程 | ✅ | 新增 `pages/tutorial/tutorial` 教程页并设为 app.json 启动页；完成/跳过进选择页并写 `picross_tutorial_done`；选择页顶栏新增 HOW TO PLAY 可重看（详见 BUG-012 重做说明） |
| BUG-012 | 教程页曾为自造静态讲解页（自造文案/自造三角形拼图），与原版 ROM 交互式教程不一致 | ✅ | 按 `MESSAGES[37]~[89]` 复原原版逐步交互流程并重写教程页：真实 5×5 拼图（行 3,1/5/5/5/1、列 5/4/4/3/4，`solutionHex=EFFFF800`，脚本校验）、15 步脚本驱动 + ROM 原文逐条展示、错误操作拦截并提示 ROM 原文（`MESSAGES[84]~[89]` 程序化截取）、Pen/X 模式强制教学（原版左上角工具栏） |
| BUG-013 | 教程步骤文本用 `MSG(...)` 按块拼接出现半截单词（如 "sliding the st"、"row need"、"one above and one below"） | ✅ | `MESSAGES[]` 按定长块切分，单词被截断在块边界；改为拼出全文（`MESSAGES[37]~[70]`）去换行后按**完整句子**截取（`grabIn(from,to)`），15 步 + solved + end + 6 条错误文案全部脚本校验通过；步骤 11 的 X 短语原文为 "place one X above"（含 X），solved 文案 "res..." 在 `MESSAGES[70]`（ALL 范围需扩至 70） |
| BUG-014 | 教程页语言状态混乱（顶部英文标题 + 中文按钮），且 ROM 教程文本仅英文；用户要求繁中/英/日/韩四语 | ✅ | `src/i18n/index.ts` 语言表从 `zh/en/fr/es` 改为 `en/tc/ja/ko`（英文/繁中/日文/韩文），默认 `tc`；UI 文案四语翻译；`pages/tutorial/tutorial.ts` 抽象 `STEP_DEFS` + `TUTORIAL_TEXTS[lang]`，英文保留 ROM 原文（`EN_STEPS`/`EN_ERR`/`EN_SOLVED`/`EN_END`），繁中/日/韩提供完整翻译；错误提示随语言切换；`pages/select/select.ts` 语言切换条同步改为四语 |
| BUG-015 | 教程消息文本一次性全部显示，缺少原版对话框打字机效果 | ✅ | `pages/tutorial/tutorial.ts` 新增打字机：`startTyping`/`tickTyping`/`finishTyping`，进入步骤时逐字显示（约 24ms/字），OK 按钮在文本打完后出现；打字期间禁止棋盘操作，点击 OK 立即显示完整文本；需求满足后只在当前文本显示完才自动推进；完成面板后结束语同样打字机输出 |
| BUG-016 | BUG-010 误判：`/Sound/PR.sdat`（14KB）被当作全部音频且「加密不可解」 | ✅ | S87 定案：ROM 在 file_94 与 file_95 之间内嵌**隐藏标准 SDAT**（0x1924800，5.95MB，未注册 FAT），含 27 SSEQ BGM + 27 SSAR + 52 SBNK + 55 SWAR；SYMB 符号表全解析；SSEQ 轨道事件流（`93 xx u16 00` 轨道表 + `key vel delay` 音符三元组）已解码；SE 波形库已转 WAV（`extracted/SDAT/wav/`）；161 文件全量提取（`extracted/SDAT/files/`） |
| BUG-017 | ARM9 引导 LZ 解压脚本 REF 读源偏移错误：脚本先递减写指针再读源，而汇编 `ldrb r0,[r2,r7]; strb r0,[r2,#-1]!` 是**先读当前 r2+off 再递减写** | ✅ | 错误导致：desc0.zero 误读为 0x60206020、desc 表与池区几何不吻合、BL 目标（0x2024240 等）反汇编全为垃圾。修正读源语义后全部自洽：desc0=(0x01ff8000,0x620B,0x0B)、desc1=(0x027e0000,0x60B,0x20B)（copy/zero 按**字节**计），池区 0x680B 与 desc 表无缝衔接至输出终点 0x020db058；BL 目标全为合法 ARM 函数（S100，`tools/lz_fixed.py`/`lz_dump.py`） |
| BUG-018 | 旧解读「失误计数 mErrCnt≥0x40 才判负（64 次失误）」不成立 | ✅ | S101 直接反汇编定案（`_slice_202a5/202a6/202c/207d/207f0.txt`）：(1) `gCurScene+0x28` 是**会话拼图计数**非失误数——scene 初始化清零（0x202b918）、注册拼图自增（0x202a690）、`cmp #0x40` 是会话 64 条上限拒绝装载（0x202a60c）；(2) `byte@0x20df624` 是**会话当前拼图索引**（getPuzzleRecord/0x202af1c 入参，0x202c150 `idx>=puzzleCount` → c42|=0x08 结束会话）；(3) 真正的失败判负在**状态驱动 0x207d898**：0x2075310 校验板面，内部态 0x10=全对→结果 5→state 4 完成；≥0x12 或负值→0x207d3a8→state 7/8 失败态（0x202bd78 拦截）。TS 引擎 `checkSolved`（全填且无误填）与 `maxMistakes=5 → failed` 与 ARM9 语义一致，BUG-007 维持成立 |
