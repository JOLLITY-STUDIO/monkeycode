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
- [x] 音频（B4 修正，S87）：真实音乐在隐藏标准 SDAT（0x1924800，161 文件/27 BGM），全可解码（详见 G6）

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
  - `PR.sdat`（14,196B）非标准 SDAT 魔数、XOR 全 key 可读率 ≤0.59 → 加密/压缩暂不可解（**已被 S87/G6 推翻**：该文件非音频本体）
  - 实现 `src/audio/sfx.ts`：WebAudio 振荡器合成五类音效（tap 涂黑 / cross 画叉 / clear 清除 / mistake 失误 / win 完成），微信 `wx.createWebAudioContext` + HTML `AudioContext` 双平台，不支持环境静默降级
- [x] G5 BUG-007 原版 5 次失误判负：
  - 引擎：`failed` 标志 + `maxMistakes=5`，第 5 次误填 → failed=true + 停表 + 后续操作忽略（types.ts GameState.failed）
  - 页面：失败结算面板（GAME OVER / 失误次数已用完 / 重试），`syncState` 同步 failed
  - `test_headless` 新增失败流用例（5 次误填 → failed、操作忽略、onStateChange 收到 failed）
- [x] G6 B4 修正：隐藏标准 SDAT 音频（S87 系列，推翻 BUG-010 加密结论）：
  - **发现**：ARM7 `/Sound/PR.sdat` 仅 14KB；真实音频位于 ROM 0x1924800 的**隐藏标准 SDAT**——夹在 file_94（end=0x19246F4）与 file_95（start=0x1ED1A20）之间，未注册 FAT（`_s87p_bound.py` 确认 file_95 侧 0 间隙）
  - **结构**：`SDAT ff fe 00 01` 头、4 块（SYMB@0x40 / INFO@0x1230 / FAT@0x1A38 / FILE@0x2454），161 文件 = 27 SSEQ + 27 SSAR + 52 SBNK + 55 SWAR
  - **符号表**（`_s87i_symb_full.py`）：SEQ 27 首 BGM 全名（title / stage_jazz~house / stage_sine / how_to_play / SMB_arr1~2 / SFC_copy1~3 / game_clear_jingle+loop / game_over_jingle / result / edit_mode / event / today / vs / multi / mini_game / complete_jingle）；BANK 52（bank_stay / pr_se000~024 / bank_edit / title / stage_*…）；WAR 2（PLAYER_BGM / PLAYER_SE1）
  - **SSEQ 解码**（`_s87j`/`_s87n`）：标准头 + `93 xx u16 00` 轨道表（title 7 轨 @0x0229/0x053C/0x074A/0x08BD/0x0B1A/0x0DC8/0x0FC8）+ `key vel delay` 音符三元组 → 事件流可转 MIDI/WebAudio
  - **全量提取**：`extracted/SDAT/files/file_000~160.bin`；SE 波形库（arc_se_stay / arc_se_edit 等）→ WAV（`extracted/SDAT/wav/`，`wav_manifest.csv`）
  - **结论**：BGM/SE 全部真实可解码，后续将 SSEQ → 播放格式替换合成 BGM
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
5. **B4 音频误判**：G1 只分析了 FAT 内 `/Sound/PR.sdat`（14KB，非标准魔数 → 误判加密不可解）；S87 深挖发现真实音频是 ROM 0x1924800 的**隐藏标准 SDAT**（未注册 FAT，夹在 file_94/file_95 之间，file_95 侧 0 间隙）——`ff fe 00 01` 头、4 块结构、161 文件、27 首 BGM 全部标准可解码（BUG-010 结论推翻，BUG-016）。
6. **引导 LZ 解压脚本 REF 读源错误**（BUG-017）：脚本先递减写指针再读源，汇编却是 `ldrb r0,[r2,r7]; strb r0,[r2,#-1]!`（先读当前 r2+off 再递减写）→ desc0.zero 误读 0x60206020、BL 目标全垃圾；修正后 desc 表/池区几何自洽、全部 BL 目标恢复合法 ARM 函数（S100 定案）。

## 下一步（G 纵深已全部收口）
- [x] G1：B4 PR.sdat 音频逆向 + 小程序音效接入
- [x] G2：B5 default_data_*.pmd 存档格式逆向
- [x] G3：E4 纵深 Msg/*.dat 模式索引接入 ROM 原版全量文本（定案：数据即代码 + 记录非文本非代码，FR/ES 过小 → 不接入）
- [x] G4：B1 纵深 记录区↔解法区映射（BUG-008）→ 定案无映射，引擎从解法推导提示
- [x] G5：BUG-007 原版 5 次失误判负（引擎 + UI + 测试）
- [x] G6：B4 修正——隐藏标准 SDAT 音频（0x1924800，161 文件/27 BGM，BUG-010 加密结论推翻，BUG-016）
- [x] BUG-009：空拼图过滤（256→223 题，保留原 ROM id）
- [x] BUG-010：界面/素材/音乐还原原版（用户反馈"不是移植"专项）
  - 渲染器 `src/render/renderer.ts`：全面还原 NDS 原版 Picross DS 视觉——白底 `#fff`、黑填充块 `#111`、红叉 `#e60000`、浅黄提示区 `#fff6c8`、顶部黄标签条 `#ffd800`、5 格一组粗分隔线、黑色提示数字（行列满足变红 `#e60000`）
  - 页面样式 `app.wxss` / `pages/index/index.wxss` / `pages/select/select.wxss` / `app.json`：统一由深蓝黑自造主题改为原版黄/白/黑（黄按钮黑描边、白卡片、黑字、黄星、进度条黄）
  - 素材：新增 `tools/gen_thumbs.cjs`——从 `src/data/puzzles.ts` 的 ROM 解法位图（file_94）生成 223 张 64×64 黑白缩略图 PNG（`assets/thumbs/{id}.png`，标准库 zlib 手写 PNG 编码），选择页卡片显示真实拼图图案（原版选择界面有缩略图）
  - 音乐：新增 `src/audio/bgm.ts`——当时以「PR.sdat 加密不可解」（G1）为前提，用 WebAudio 方波/三角波/噪声多轨合成 8 小节循环 BGM（旋律+贝斯+底鼓+踩镲，112BPM），游戏页 `onReady` 播放、`onHide/onUnload` 停止；选择页 `onShow` 播放（**G6 已推翻前提**：真实音乐在隐藏 SDAT 可解码，合成曲降级为占位，待 SSEQ→播放器替换）
- [x] BUG-011：启动流程还原（用户反馈"原始游戏进来就是教程页面"）
  - 新增 `pages/tutorial/tutorial`（How to Play 教程页）设为 app.json 启动页：4 步流程——步骤指示器 + 三步规则讲解（[3]=连续 3 格 / [1,1]=逗号多组隔空 / ✕ 标记空位）+ 第 4 步实战 5×5 教程拼图（复用 `PicrossEngine` + `PicrossRenderer`，触摸涂黑/画叉/清除）
  - 教程拼图数据 `src/data/tutorial.ts`：5×5 三角形（行提示 1/3/5/5/5，列提示 3/4/5/4/3），单数字提示适合入门
  - 完成/跳过 → reLaunch 选择页并写 `picross_tutorial_done`（wx.storage/localStorage）；教程拼图失误 5 次不判负，自动重置重来
  - `pages/select` 顶栏新增 HOW TO PLAY 按钮可重看教程（白底黑描边，与播放按钮同排）；`src/i18n/index.ts` 新增教程文案 zh/en/fr/es（howtoRule*/howtoGroup/howtoCross/howtoPlay/howtoDone 等）
- [x] BUG-012：教程页重做为原版 ROM 交互式逐步教程（用户反馈"这个跟原始rom哪里一样的"专项）
  - **原版教程并非静态讲解页**：经 `MESSAGES[37]~[89]` 全文还原，ROM 教程是 5×5 真实拼图上的**分步交互教学**——欢迎 → 列提示(5)整列涂满 → 行提示(3,1)涂前 3 格 → X Mode 在 (3,0) 画 X → 列 3 填 X 下方 3 格 → X Mode 在 (3,4) 画 X → 填 (4,0) → 行 1 连接已填格 (1,1)(2,1) → 列 4 重叠推理填中间 3 格 → 自由完成
  - **教程拼图定案**（由教程文本逐步约束复原，校验通过）：
    ```
    ###.#  行 3,1
    #####     5
    #####     5
    #####     5
    #....     1
    列 5 4 4 3 4
    ```
    `src/data/tutorial.ts` solutionHex = `EFFFF800`（EF FF F8 00，引擎 MSB-first 连续位流；此前 `EFFFFFF800` 为手算错误，解码为第 4 行全 5，已用脚本校验）
  - **页面重写 `pages/tutorial/tutorial.ts`**：脚本化步骤表（`STEPS[]`，15 步）逐条绑定 ROM 原文（`MESSAGES` 索引切片拼接）；讲解步 OK 继续、动作步完成自动推进、需求已满足提供 OK 跳过；错误操作被拦截并弹出 ROM 原文错误提示（`ERR` 由 `MESSAGES[84]~[89]` 程序化截取：switchX/switchPen/notYet/notX/cantFill 五种）
  - **Pen/X 模式教学**：工具栏（左上角，原版位置）强制模式切换——X 步骤需先点 X 图标（错误提示引导 "Go to the X icon..."），填涂步骤需回 Pen 模式
  - 完成遮罩显示 ROM 原文 "Well done!..."（CLEAR!），OK → 结束语 "That brings us to the end of the tutorial...Have fun!" → 进选择页；`src/i18n/index.ts` 清理自造教程文案，新增 tutOk/tutPen/tutX/tutPenMode/tutXMode
- [x] BUG-013：教程步骤文本半截单词修复（BUG-012 遗留）
  - 发现：`MESSAGES[]` 按定长块切分（约 100 字符/块），单词被截断在块边界——旧 `MSG(40,41,42)` 拼接出 "sliding the st"、`MSG(44)` 出 "correct numbe"、步骤 11 出 "one above and one below"（缺 X）、solved 文案 "res..." 在 `MESSAGES[70]` 未被包含
  - 修复 `pages/tutorial/tutorial.ts`：拼出全文 `ALL = MSG(37~70)` 去换行后，用 `grabIn(from,to)` 按**完整句子**截取（含 `to` 结尾标记），15 步 + solved + end + 6 条错误文案全部脚本校验通过（`tools/_check_tutorial_text.cjs`，用后删除）；ERR 的 `src` 同步去换行归一化
  - 陷阱记录：步骤 11 原文是 "place **one X above** and one below the filled square."（含 X）；"some of the other features..." 的 "res..." 在 `MESSAGES[70]`，`ALL` 范围需扩至 70
- [x] BUG-014：语言支持从简中/英/法/西改为繁中/英/日/韩，修复当前截图语言混乱
  - 问题：截图中顶部标题 "HOW TO PLAY" 为英文，但按钮 "跳过"、工具栏 "笔/叉/笔模式" 为中文，造成"不知道现在是什么语言"；根因是 `src/i18n/index.ts` 中文 `howtoTitle` 被错误写成英文 "HOW TO PLAY"
  - 改动：`Lang` 与 `LANGS` 从 `zh/en/fr/es` 改为 `en/tc/ja/ko`（英文/繁中/日文/韩文），默认 `tc`；`LANG_LABELS` 同步；UI 文案 `T[lang]` 四语翻译；`pages/select/select.ts` 默认语言改 `tc`、回退改 `tc`；`pages/index/index.ts` 默认 `tc`
  - 拼图名：`puzzleName` 改为 ROM 只提供 EN/FR/ES，非英文一律回退英文；`PUZZLE_NAMES` 类型断言为 `any` 读取 `en`
- [x] BUG-015：教程消息框增加原版打字机效果
  - 问题：教程文本一次性整段显示，缺少原版对话框逐字出现效果
  - 改动：`pages/tutorial/tutorial.ts` 新增 `typingTimer/typingFull/typingIdx` + `startTyping/tickTyping/finishTyping`；`enterStep` 启动打字机；OK 按钮在文本显示完后出现；打字期间禁止棋盘操作，点击 OK 立即显示完整文本；需求满足后只在文本显示完才自动推进；完成面板后结束语也使用打字机输出
  - 多语言：抽象 `STEP_DEFS`（纯流程）+ `TUTORIAL_TEXTS[lang]`（文本包），英文保留 ROM 原文（`EN_STEPS`/`EN_ERR`/`EN_SOLVED`/`EN_END`），繁中/日/韩提供完整翻译；错误提示随语言从 `TUTORIAL_TEXTS[this.lang].err` 读取
  - 导航栏：`tutorial.ts` `onLoad` 调用 `wx.setNavigationBarTitle({ title: t.howtoTitle })`，标题随当前语言变化
  - 编译：`tsconfig.test.json` 增加 `typings/**/*.d.ts`，修复 `tsc -p tsconfig.test.json` 因 `wx` 未声明而失败；修复 `getLang` 中 `saved` 可能为 `null` 的类型错误

### 阶段 6：ARM9 引导区 LZ 解压逆向（S100 定案）
- [x] **引导流程定案**（0x2000800-0x2000b68 逐指令还原）：
  - 固件加载 `arm9.bin`（恰 0x80da8B，末端=0x02080da8=LZ 头）→ 入口 0x2000800
  - memset [0x027e0000, 0x027e4000) → LZ 解压（0x2000898）→ 描述符拷贝（0x200089c）→ 池区清零 [0x020da9c0, 0x020f2340)（0x20008a0+）→ 跳 0x20116bc → 0x2000b64 → 0x2011800
- [x] **LZ 格式定案**（0x2000950-0x20009f8，自定义格式，非 LZ10/11）：
  - 头 8B：`[packed:u32][decomp_size:u32]`；packed 高 8 位=dest_off(0x0a)、低 24 位=comp_size(0x7cda8)
  - 读指针从 r0-dest_off 往下、写指针从 r0+decomp_size 往下（均递减）；输入区=[0x02004000,0x02080d9e)、输出区=[0x02004000,0x020db058)（原地，写指针始终在读指针上方）
  - 控制字节 8 位 bit7→bit0；bit=1 REF、bit=0 LIT（字面量 1 字节）
  - REF 读 2 字节 `(ip,lo)`：`off=((ip<<8|lo)&0xFFF)+2`、长度=`(ip/0x10)+3` 字节
  - **关键语义**：REF 拷贝 `ldrb r0,[r2,r7]; strb r0,[r2,#-1]!` —— **读源=当前 r2+off（写指针递减之前）**，此前脚本先递减再读，读源整体偏低 1 字节（BUG-017）
- [x] **load-info 表**（0x0200b68 静态数据）：`[0]=0x020db040(desc表起点) [1]=0x020db058(desc表终点) [2]=0x020da9c0(池) [3]=0x020da9c0 [4]=0x020f2340(清零终点) [5]=0x02080da8(LZ头)`
- [x] **描述符**（12B×2，copy/zero 按**字节**计）：
  - desc0 = `(0x01ff8000, 0x620B, 0x0B)`：池 [0x020da9c0, 0x020dafe0) 的 0x620B **ARM 代码** → 拷至 0x01ff8000
  - desc1 = `(0x027e0000, 0x60B, 0x20B)`：池 [0x020dafe0, 0x020db040) 的 0x60B 数据表 → 拷至 0x027e0000 + 清零 0x20B
  - 池区恰好 0x680B = 0x620+0x60，紧接 desc 表 24B 至输出终点 0x020db058 —— 几何完美自洽
- [x] **解压产物 `extracted/arm9_decomp.bin`**（0xd7058B = [0x02004000, 0x020db058)）：
  - 池起点 0x020da9c0 为合法 ARM 代码（`push {r4,lr}` / `mov ip,#12` / `add ip,r4,#0x40000000`（0x04000000 IO 基址）/ 卡带寄存器写）
  - **全部 BL 目标恢复合法**：0x20116bc=`bx lr` 序列、0x2011800=`push {r4,lr}`、0x201f974 / 0x2024240 / 0x2026884 / 0x2026b24 均为合法函数序言 → 解压数据已是可继续逆向的完整主程序
- 工具：`tools/lz_fixed.py`（修正语义验证）、`tools/lz_verify.py`（池/desc/代码区 dump）、`tools/lz_dump.py`（产物落盘）、`tools/token_log.py` / `trace_tail.py`（token 追踪，BUG-017 后需同步修正）

### 阶段 7：ARM9 主程序逆向（S101，用户反馈"核心没有变化"专项）
- [x] **主入口定案**：`0x2003000` 才是 ARM9 main 入口（0x2000b64 → `bx r1` 到达）；`0x2011800` 只是通用初始化表遍历器（init 表 @0x20c856c 为空表 → 非游戏入口）
- [x] **主循环 `0x2003388-0x2003534`**（`tools/disasm_main_entry.py` → `tools/_main_entry.txt`）：
  - 初始化序列：IRQ 设置 / DMA / VRAM / 输入 / 定时器 / 字库 / 卡带检测 / 声音
  - 每帧：`bl 0x2012254/0x2012268` 轮询按键（掩码 0x30c/0xc，边沿检测）→ 刷新触摸坐标（0x2058b88）→ 手势检测（0x2017c88）→ 更新选中格与场景状态
- [x] **场景状态机 `gSceneUpdate @0x202bea8`**（`gCurScene->bc0` 字节相位 0-4，`tools/_slice_202bc.txt`）：
  - phase 0/1 = 空闲 → 返回 4
  - phase 2 = 初始化（0x202beec）：0x203a588（当前拼图记录）→ 0x203a4dc（列表基址）→ 0x207fd98（装载）→ **0x207f888**（写会话记录：拼图名→`+0x2e`、r2→`+0x70`、r3→`+0x74`）→ 分配 2×0x80 缓冲 → `c42=0` → phase=3；失败则 phase=4
  - phase 3 = 游戏中（0x202c010）：`+0x38` 忙标志；`+0x24` 空 → 回 phase 2（返回选择）；`c42` 待办位寄存器（gCurScene+0xc42）：
    - `0x01` 名字/结算菜单；`0x02` 菜单已处理；`0x04` 保留
    - `0x08` **完成待执行 → phase 4 结算**（0x202c204：result=3、播音、c42&=~3、c42|=0x80、0x202c474 切场景）
    - `0x10` 动作已验证；`0x20` 动作待处理；`0x40` 拼图完成标记；`0x80` 结算已展示
  - phase 3 推进逻辑（0x202c144-0x202c1e4）：`byte@0x20df624（会话拼图索引）>= gCurScene+0x28（会话拼图数）` → c42|=0x08 结束会话；否则 `getPuzzleRecord(idx)` + `0x202af1c(idx)` 填充，完成后 c42|=0x40、结果屏后索引++
- [x] **会话结构定案**：`gCurScenePtr @0x20df650`；会话拼图计数 `+0x28`（scene 初始化清零 @0x202b918；注册拼图时自增 @0x202a690；上限 0x40=64 条 @0x202a60c `cmp #0x40` 拒绝装载）；当前拼图索引 byte@`0x20df624`
- [x] **游戏状态驱动 `0x207d898`**（`tools/_slice_207d.txt`）：`bl 0x2075310` 校验板面 → 内部态映射结果码：态≤1→0、2-6→1、7-8→2、0xc-0xf→3、**0x10→5=全对**、0x11→4、≥0x12→0x207657c（错误路径）
  - 结果码 5（全对）→ `+4`=state 4、`+6`=1 → 返回 4（完成）
  - 结果码 <0（-10..-1 错误）→ 0x207d3a8 处理 → state 7/8（**失败态**）→ 返回 7/8
  - 其余 → 返回 2（进行中）；0x202bd78 以 `sub r0,#7; cmp r1,#1` 拦截 7/8 失败态
- [x] **记录/结算 `0x207f888`**：校验 0x207d3cc + `+0x24` 无当前记录 → 存名（strlen≤0x19 → memset+0x2e 0x34B → memcpy）→ 检查 0x207d898==4 → 0x207f970 完成路径：0x207f000（保存记录：旧指针 +0x24→+0x28，写入新记录 +0x24）+ 0x20b8b0c（落盘）；否则播放 SE(2) → 返回 1
- [x] **拼图数据层**（`tools/_slice_203a.txt`）：`gPuzzleList` 64×12B、`gPuzzleRecords` 64×0x1aB @ 列表基址+0x40（0x202a540 迭代 0x40 项、0x202a598 `idx*0x1a+base+0x40`）、`findHitPuzzle()` 0x203a3a0、`hintAll(0)` 返回 0-4
- [x] **TS 引擎语义对照**：ARM9 完成检测（内部态 0x10→全对）与 TS `checkSolved`（filledCount==totalFilled 且无误填）一致；失败态 7/8（失误超限）与 TS `maxMistakes=5 → failed` 一致（BUG-007 成立）；触摸循环 fill→cross→erase 对应 KEY_CROSS=UP(0x8)/KEY_COL=LEFT(0x10)
- 工具：`tools/slice_asm.py`（切片）、`tools/dump_init_tbl.py`、`tools/dump_boot_again.py`、`tools/disasm_main_entry.py`、`tools/analyze_calls.py`、`tools/_slice_*.txt`

### 阶段 8：NDS 下屏渲染素材 ROM 化（用户反馈"画布还是造旧"专项）
- [x] **解码 ROM 调色板与 UI tile**：file_94.bin 0x80 起为 4bpp 8x8 tile 数据，file_97.bin（512B）为 16 色调色板（扩展 256 槽，仅首 16 色有效）。调色板关键色：
  - 索引 0 透明、1 `#a8b8d8` 细线、2 `#184070` 深蓝暗部、3 `#3088e8` 填充主蓝、4 `#70b0f0` 填充高光、5 `#e8f0f8` 阴影、6 `#f8a000` 金黄、7 `#f8f8f8` 白、8 `#b8c8f8` 提示区浅蓝
- [x] **生成 ROM tile atlas**：`tools/build_nds_tile_atlas.py` 从 `file_94.bin` 提取 tile 0-31 + `file_97.bin` 调色板 → `assets/nds_tiles.png`（256×8，8×8 tile 横向排列）
- [x] **渲染器 `src/render/renderer.ts` 改用 ROM 素材**：
  - 整体下屏背景：ROM tile 0（黑）外框 + 浅蓝→白渐变（#b8c8f8 → #e8f0f8）
  - 提示区：ROM tile 2（浅蓝）逐格铺底，5 的倍数格换 ROM tile 5（金黄），叠加渐变高光
  - 单元格：空格 ROM tile 3（白）+ 左上 #ffffff / 右下 #e8f0f8 立体倒角；填充格 ROM tile 4（蓝）+ 左上 #70b0f0 / 主体 #3088e8 / 右下 #184070 立体倒角
  - 网格线：细线 `#a8b8d8`（索引 1），5 格粗线 `#f8a000`（索引 6）
  - 提示数字：统一使用 ROM `assets/digits.png`；满足后 `source-atop` 叠加 ROM 金黄 #f8a000
- [x] **页面预加载**：`pages/tutorial/tutorial.ts` 与 `pages/index/index.ts` 的 `onReady` 改为并行加载 `digits.png` + `nds_tiles.png`，失败也继续渲染（renderer 有兜底）

### 深度逆向专项（候选，非当前主线）
- [x] ARM9 主程序函数级逆向（S100 已产出合法解压产物 `arm9_decomp.bin`）：从 0x2011800 入口沿 BL 调用图还原场景管理器/拼图网格/触摸输入/谜题数据结构，指导 TS 核心重写（S101 已定案：主入口 0x2003000、主循环、场景状态机 0x202bea8、状态驱动 0x207d898）
- [x] **SSEQ→BGM 播放器（v1.4.0 重大里程碑，G9）**：
  - 自研 SSEQ 解码器（`tools/sseq_decode3.py`）：基于 ndspy 完整命令表（0x80 Rest / 0x81 InstrumentSwitch / 0x93 BeginTrack / 0x94 Jump / 0x95 Call / 0xC0 Pan / 0xC1 TrackVolume / 0xC5..CD 端口等 / 0xD5 Expression / 0xD4 BeginLoop / 0xE1 Tempo（u16）/ 0xFC EndLoop / 0xFE DefineTracks / 0xFF EndTrack 等），修正 varint 小端 + Tempo u16 + Jump/Call u24 + DefineTracks 3B
  - SDAT 关联解析（`tools/sdat_link.py`）：ndspy.soundArchive.SDAT → SEQ 记录（`<3H4B` = fileID/unk/bankID/vol/cpr/ppr/playerID）+ BANK 记录（`<HH4h` fileID/unk + 4×swarID）+ WAR 记录（`<HH`）；每首 BGM 精确锁定 bank + war 名称
  - SBNK 乐器分类：`RegionalInstrument`（type 0x11，按音高区段+ADSR）、`RangeInstrument`（type 0x10，按音高+1 增量）、`SingleNoteInstrument`（type 0x01-0x0F）；每个 NoteDefinition 含 waveID/waveArchiveIDID/pitch/ADSR/pan
  - SWAV 解码：PCM8/PCM16 直接读、ADPCM IMA 自实现解码（89 步阶表 + 16 索引表）
  - 资源打包（`tools/build_bgm_assets.py`）：精选 12 首 BGM（title/how_to_play/6 stage music/game_clear_jingle/loop/over_jingle/complete_jingle），输出 `assets/audio/bgm/waves.bin`（5.5MB PCM16 LE 串接）+ `waves.json`（swav 索引）+ `songs.json`（精简事件流）；TS 模块化 `src/data/bgm/songs.ts` + `waves.ts`
  - TS 实时播放器（`src/audio/sseq-player.ts`）：WebAudio BufferSource 调度 + playbackRate 移调 + ADSR 包络 + StereoPanner；tick 调度 lookahead 0.05s，整曲循环；降级到合成 BGM 不变
  - 包装器 `src/audio/bgm.ts` 保持旧 API（`bgm.start(kind)` / `stop()` / `setMuted()`），kind 映射：title→title、game→stage_jazz、tutorial→how_to_play、clear→game_clear_jingle、over→game_over_jingle、complete→complete_jingle
  - 验证：ndspy 反向对照 title.json m0 头 5 音完全一致（首音 t=48 k=40 E vel 127 dur 12 ✓）；test_headless ALL PASS
- [ ] ARM9 记录解释器：解码 Msg/*.dat 记录区自定义消息脚本（G3 遗留，无用户可见增量，优先级低）
- [ ] ARM9 拼图提示编码：确认记录区提示生成算法（G4 已定案引擎从解法推导，提示完全一致无需接入）

### 2026-08-30 U1 unlock chain + completion linkage
- [x] **U1 real unlock chain (v1.5.0)**: puzzle select U1 unlock mechanism
  - save.ts added UnlockState / unlockPuzzle / isPuzzleUnlocked / getUnlockedSet / unlockNextInChain / clearSave
  - Default: first puzzle per difficulty unlocked (id=0,2,53); chain-unlock 2 next puzzles per diff after clear
  - index.ts onSolved callback now invokes unlockNextInChain(puzzleId, diff, PUZZLES)
  - select.ts rebuild/refreshFromSave reads real unlocked from save; onPick shows toast for locked
  - select.wxml added .locked card with grayscale + lock overlay + "clear previous" hint
  - select.wxss .puzzle-card.locked with grayscale filter + .lock-overlay + .p-locked-hint
  - i18n 4 langs got lockedTitle / lockedHint
  - group-head added per-difficulty progress bar
  - Tests: headless added 8 U1 cases (3 seeds / chain +2 / 5 levels star rules)
  - TSC EXIT=0, headless ALL PASS (33 cases)
