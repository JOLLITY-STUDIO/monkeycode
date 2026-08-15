# 开发日志进度跟踪表（PROGRESS_LOG）

> 由 01 PM 维护。记录任务进度、卡点、问题修复与攻克过程。

## 进度总览
| 阶段 | 日期 | 内容 | 结果 |
|------|------|------|------|
| M0 初始化 | v0.1 | 项目脚手架 + Agent 体系 15 角色 | ✅ |
| M1 逆向 | v0.2 | header/文件系统/反汇编/状态机/资源清单 | ✅ |
| M2 架构 | v0.3 | MVC 架构 + 接口契约 + 数据字典 | ✅ |
| M3 核心 | v0.4 | 引擎 + 状态机转写 + 6 场景骨架 | ✅ |
| M4 数据 | v0.5 | map 关卡 404→392 + 调色板 8 batch 转换 | ✅ 部分 |
| M5 场景/适配 | v0.6 | 小程序 Canvas 接线 + 触摸绘制闭环 | ✅ 基本 |
| M4 补 | v0.7 | lap 407（400+7 教学）+ fap 405（400+5 教学）全量转换并接入 stage-data | ✅ |

## 卡点与攻克记录
### 0. map/lap/fap 模式身份反汇编确认（04/05, 2026-08-14）
- **任务**：确认三种模式分别代表什么玩法（用户：反汇编确认 map lap fap 各代表什么游戏模式）
- **攻克**：沿 `0x3172C`(选关装配) → `0x31884 → 0x34BAC`(模式 UI) → 选关 handler `0x35xxx/0x36xxx`（`cmp sl,#0/#1/#2` → `mov r0,#0/#1/#2; bl 0x34CF0`）→ `0x34CF0` 三套路径（`map_comp/M%03d` / `lap_comp/L%03d` / `fap_comp/F%03d`，ARM9 偏移 0x80898）→ `0x204D31C`(加载) → 数据文件 hex 对比（lap 方向编码 / fap nibble 数字提示 / UI 精灵 l_num·fap_pen_*）
- **结论**：map=参照图填色（mode 0，无门槛）、lap=连线路径（mode 1，需 `0x204D18C` 号段校验）、fap=数字提示填涂（mode 2，同门槛）；差异在"路径构造→数据格式"三层，无独立游戏逻辑代码路径
- **产物**：`docs/reverse/MODE_CONFIRMATION.md`（含证据地址索引）+ SCENE_MAPPING/ROM_STRUCTURE_REPORT 更新

### 1. map 关卡 404 → 392 有效（06/07）
- **卡点**：`map_d/` 解包 404 个单元，但部分文件损坏/空（NSCR 头校验失败）
- **攻克**：转换脚本 `tools/convert_maps.py` + `convert_maps2.py` 增加有效性过滤（尺寸>0、调色板引用存在），产出 392 个有效谜题
- **产物**：`engine/data/puzzles/map_batch_1..9.ts`（含 `P4000101` 等，id 规则 `P<关号>`）

### 2. 调色板 16 色合并（06/07）
- **卡点**：NCLR 原始 1bit/像素索引 → RGB 需按 bank 组合
- **攻克**：`tools/convert_palettes.py` 解析 NCLR 并合并 16 色 RGB 表，产出 `pal_batch_1..8.ts`（key `P<id>`）

### 3. 状态机双层分派（04/05）
- **卡点**：NDS 主调度器 `0x205113c` 并非单层 STATE 分派，含 SUBSTATE 段
- **攻克**：确认 SUBSTATE=1(boot/槽位 0x00~0x0A) / =2(主流程 0x0B~0x14) / =3(extra 0x16~0x19)
- **产物**：`rom-states.ts` ROM_STATE 常量表（真实 ROM 值）

### 4. 小程序帧循环兼容（08/10）
- **卡点**：小程序无全局 rAF/performance
- **攻克**：Canvas 2D 节点 rAF → 全局 rAF → setTimeout(16ms) 三级回退（`engine.ts createFrameLooper`）

### 5. lap/fap 全量转换（06/07, 2026-08-14）
- **卡点**：LAP 26 字节头 + 每格 1 字节（含方向编码位）；FAP nibble 打包 + 尾部 bitmap，两格式与 map（6 字节头 + nibble）均不同；batch_9 教学关名重复（`Ptu`×7/×5）导致编译冲突
- **攻克**：`tools/convert_lap_fap.py` 按格式分路解析；batch_9 重命名为 `Ptu0..Ptu6`/`Ptu0..Ptu4`；索引文件同步更新
- **产物**：`engine/data/puzzles/lap_batch_1..9.ts` + `lap_index.ts`（LAP_PUZZLES=407）、`fap_batch_1..9.ts` + `fap_index.ts`（FAP_PUZZLES=405）
- **接入**：`stage-data.ts` SOURCES.lap/fap 填充 + DEFAULT_PALETTE（16 色默认，真实调色板待转）；选关上限 MODE_STAGE_COUNT（lap 400/fap 405）与常规关卡数一致，教学关排末尾

## 当前进度之外的工作内容
- 工具脚本沉淀：`tools/` 下 disasm_*.py / convert_*.py / _state_machine.py 等 30+ 分析脚本
- 反汇编成果：`arm9-full.dis.txt`（4.16MB）+ `arm9-functions.tsv`（函数表）
- 截图基准：`screenshots/` 32 张（含黄金帧候选）

## 待办
- [x] lap/fap 关卡转换（M4 剩余，v0.7 完成：lap 407 / fap 405）
- [ ] lap/fap 真实调色板转换（NCLR → 每关 16 色，替换 DEFAULT_PALETTE）
- [ ] fap 提示数字渲染（1~9 画数字而非色块，见 BUG-008）
- [ ] lap 关卡按 ROM 难度 1~5 顺序表重排（见 BUG-009）
- [ ] 数据服务层 Repository 接口化（M4 剩余）
- [ ] 黄金帧采集与视觉校准（M6）
- [ ] 单元测试/无界面脚本（M6）
