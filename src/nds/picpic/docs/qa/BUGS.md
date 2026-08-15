# BUG 记录（BUGS）

> 由 11 测试/12 审查维护。记录汇编与 ROM 差异、汇编与 TS 差异、数据误判等，含修复状态。格式：ID | 描述 | 环节 | 状态 | 修复记录。

## 已记录 BUG
### BUG-001 map 关卡 404 → 392 有效
- **描述**：`map_d/` 解包 404 个单元，部分文件损坏/空（NSCR 头校验失败或尺寸为 0），转换后仅 392 个有效谜题
- **环节**：06 资源提取
- **状态**：✅ 已解决（workaround）
- **修复**：`tools/convert_maps.py`/`convert_maps2.py` 增加有效性过滤；`P<id>` 索引按有效集生成。注：lap/fap 转换时需复用同一过滤策略
- **影响**：map 模式实际可选关 392 关（< 声明的 404）

### BUG-002 小程序帧循环无 rAF
- **描述**：小程序环境无全局 requestAnimationFrame/performance，直接调用会崩溃
- **环节**：08 引擎
- **状态**：✅ 已解决
- **修复**：`engine.ts createFrameLooper()` 三级回退：Canvas 节点 rAF → 全局 rAF → setTimeout(16ms)

### BUG-003 存档读写环境差异
- **描述**：非小程序环境调用 wx.getStorageSync/setStorageSync 抛异常
- **环节**：08 引擎
- **状态**：✅ 已解决
- **修复**：try/catch 包裹（loadSlotsFromStorageSafe/writeSlot），非小程序环境忽略

## 待确认/待修复
### BUG-004 场景资源为占位渲染
- **描述**：title/f_make/select/comp 场景图形为 Canvas 手绘占位，未使用 ROM 提取的 NCGR/NCLR/NSCR 数据（FIDELITY-PENDING）
- **环节**：09 场景 + 06 资源
- **状态**：⏳ 待资源就绪后替换（L0→L2/L3）

### BUG-005 lap/fap 数据未转换
- **描述**：lap_d/ fap_d/ 未执行转换管线，getStageDetail 返回 null
- **环节**：06 资源提取
- **状态**：✅ 已解决（v0.7）
- **修复**：`tools/convert_lap_fap.py` 全量转换 lap 407（400+7 教学）+ fap 405（400+5 教学），batch_9 教学关重命名（`Ptu`→`Ptu0..N`）消除重复声明；`stage-data.ts` SOURCES.lap/fap 接入 LAP_PUZZLES/FAP_PUZZLES + 默认 16 色调色板

### BUG-006 Nurie_sd.sdat 音频未接入
- **描述**：音频档案未解析，游戏无 BGM/SE
- **环节**：06/08
- **状态**：⏳ 待办

### BUG-008 lap/fap 真实调色板缺失
- **描述**：lap/fap 每关真实 NCLR 调色板未转换，暂用默认 16 色 DEFAULT_PALETTE；fap 中 1~9 为提示数字（真实游戏画数字而非色块）
- **环节**：06 资源提取 + 09 场景
- **状态**：⏳ 待办（默认色可玩，视觉未对齐 ROM）

### BUG-009 lap 关卡顺序表未校正
- **描述**：lap 关卡按纯数字 ID 排序，ROM 内部按难度 1~5 分组（1_dat~5_dat）顺序表可能不同；map 也存在类似问题（map 数字第 7 关实际是 Cowboy，而 maze-007 截图是 Rooster，需 ROM 顺序表）
- **环节**：06/09
- **状态**：⏳ 待办（待 ROM 内部顺序表逆向）

### BUG-007 建档界面严重偏差（5槽键盘输入 → 3槽手绘）
- **描述**：原实现自造 5 槽 Profile Select + 键盘文字输入 + START 按钮。欧版截图 7252/8134 对照：真实为 **3 个手绘存档槽**，上方展示三模式完成进度（完成标红 OK），new profile 为**手绘输入**（Pencil/Eraser + Delete/OK/Quit），非键盘输入；有 Delete file、无 Download Trial
- **环节**：03/05 逆向文档（错误记录"5 槽初始化"）+ 09 场景（无依据自造）+ 11 测试（走查未对照截图）
- **状态**：✅ 已修复
- **修复**：`SAVE_SLOT_COUNT=3`；`SaveSlot` 增加 `icon`（64x64 1bit 手绘像素）；`title-scene.ts` 重构为选档（进度+3槽+Delete）/手绘建档/删除确认三阶段；`engine.ts` 增加 `writeSlotsToStorageSafe()`
- **影响**：存档流程与 NDS 一致；存档包含手绘图标 + 三模式进度（通关数/总关数）

### BUG-010 map 模式 MazeScene 完全错误实现（线稿描画 ≠ 迷宫走格）
- **描述**：原实现将 map 模式臆想为"线稿描画迷宫"：把 `.map` 数据二值化后做 Zhang-Suen 细化得到 1 格宽灰色细线，手指按住拖描沿线走过留绿色足迹。这与 NDS 原游戏截图 `maze-007.png` 完全不符。原游戏 map 模式是**迷宫走格填色**：下屏黑白迷宫（0=黑墙，>0=白路径），玩家点击相邻路径格移动，走过的格子上屏填充对应颜色。当前实现本质上是自造的玩法，不基于 ROM 数据或截图。
- **根因**：早期分析未对照 NDS 游玩截图，仅凭`.map` 文件名含"map"臆想为"迷宫描画"。`convert_maps.py` 数据解析正确（nibble 0-15），但场景层误用为线稿细化。
- **环节**：09 场景（MazeScene）+ 12 审查（截图对照缺失）
- **状态**：✅ 已修复
- **修复**：`maze-scene.ts` 完全重写：下屏渲染迷宫网格（0=黑墙，>0=白路径，已走=绿高亮），玩家点击相邻白格移动；上屏 renderTop 按 visited 状态用 palette 填充颜色；完成检查 = 所有路径格 visited。`state-select-scene.ts` 修正注释。
- **影响**：map 模式从"自造描画"变为对齐原游戏的"迷宫走格填色"

## 关联
- 测试报告：docs/qa/TEST_REPORT.md
- 审查记录：docs/qa/REVIEW_LOG.md
