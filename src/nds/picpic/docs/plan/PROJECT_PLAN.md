# Pic Pic 逆向转写项目计划（WBS / 里程碑 / 任务队列）

> 由 01 PM 维护，02 架构师细化 Bank 级 WBS。状态：进行中。

## 里程碑
| 里程碑 | 内容 | 状态 |
|--------|------|------|
| M0 | 项目初始化：game-context、Agent 体系、WBS | ✅ 完成 |
| M1 | ROM 结构分析 + 反汇编 + 状态机 + 资源清单 | ✅ 完成（docs/reverse/） |
| M2 | 架构设计 + 接口契约 + 代码骨架 | ✅ 完成（docs/design/ + miniprogram/engine） |
| M3 | 核心逻辑转写（状态机/玩法/存档）+ 引擎 | ✅ 完成（engine.ts + rom-states.ts + 6 场景） |
| M4 | 数据层：map 模式关卡/调色板转换 | ⚠️ 部分完成（map 404→392 有效；lap/fap 未转换） |
| M5 | 场景开发 + 平台适配（小程序） | ⚠️ 骨架完成，画面待黄金帧校准 |
| M6 | 测试验证（单元测试/无界面脚本/路径覆盖） | ⏳ 未开始 |
| M7 | 收尾交付（审查门禁/版本/发布） | ⏳ 未开始 |

## 任务队列（按 Bank/模块）
| # | 任务 | 负责 | 状态 |
|---|------|------|------|
| 1 | ROM Header/文件系统分析 → ROM_STRUCTURE_REPORT.md | 03 | ✅ |
| 2 | ARM9 反汇编 → 函数表/交叉引用 → DISASSEMBLY.md | 04 | ✅ |
| 3 | 主调度器/状态机分析 → STATE_MACHINE.md + SCENE_MAPPING.md | 05 | ✅ |
| 4 | 资源清单/单元分解 → RESOURCE_INDEX.md | 06 | ✅ |
| 5 | 总体架构 + 接口契约 + 数据字典 → ARCHITECTURE/INTERFACES/DATA_DICTIONARY | 02 | ✅ |
| 6 | 引擎 core：状态机/帧循环/场景调度/存档/KV 缓存 | 08 | ✅ |
| 7 | 核心玩法逻辑：涂色/撤销重做/完成判定 | 07 | ✅ |
| 8 | 场景：boot/title/mode-select/state-select/game/achieve | 09 | ✅ 骨架 |
| 9 | 数据：map 模式关卡转换（392 个）+ 调色板（8 batch） | 06/07 | ✅ |
| 10 | 数据：lap/fap 模式关卡转换 | 06/07 | ⏳ |
| 11 | 数据服务层（Repository 接口化） | 08 | ⏳ |
| 12 | 平台适配：wx API 封装/触摸接线 | 10 | ✅ 基本 |
| 13 | 黄金帧采集（melonDS）+ UI 规格反推 | 11/05 | ⏳ |
| 14 | 单元测试 + 无界面脚本 + 自动通关 | 11 | ⏳ |
| 15 | 代码审查 + BUG 闭环 | 12 | ⏳ |
| 16 | 收尾：版本/CHANGELOG/Tag/DELIVERY_REPORT | 13 | ⏳ |

## 数据就绪度（L0-L3）
| 资源 | 就绪度 | 备注 |
|------|--------|------|
| 调色板（P4000101...） | L2 | `engine/data/palettes/` 8 batch 已解码 |
| map 谜题（392 个） | L2 | `engine/data/puzzles/` map_batch_1..9 |
| lap 谜题 | L0 | `roms/extracted/lap_d/` 待转换 |
| fap 谜题 | L0 | `roms/extracted/fap_d/` 待转换 |
| 完成画面/标题/UI 图形 | L0 | 占位渲染（Canvas 绘制），FIDELITY-PENDING |
| 音频（Nurie_sd.sdat） | L0 | 未接入 |
