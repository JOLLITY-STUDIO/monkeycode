# 版本记录（CHANGELOG）

> 由 13 发布/收尾工程师维护。版本号 + 变更摘要 + Tag 列表。

## 版本线
| 版本 | 日期 | 摘要 | Tag |
|------|------|------|-----|
| v0.1 | - | 项目初始化：Agent 体系 15 角色 + game-context + WBS | - |
| v0.2 | - | M1 逆向：ROM 结构/反汇编/状态机/资源清单 | - |
| v0.3 | - | M2 架构：MVC + 接口契约 + 数据字典 | - |
| v0.4 | - | M3 核心：引擎 + 状态机转写 + 6 场景 | - |
| v0.5 | - | M4 数据：map 404→392 + 调色板 8 batch | - |
| v0.6 | 2026-08-14 | M5 场景/适配：小程序 Canvas 接线 + 触摸绘制闭环 + 文档补齐（context/plan/reverse/design/qa/release 16 篇） | - |
| v0.7 | 2026-08-14 | M4 补：lap 407（400+7 教学）+ fap 405（400+5 教学）全量转换接入 stage-data + 默认 16 色调色板 + 文档更新（BUG-005 关闭 / 新增 BUG-008/009） | - |
| v0.8 | 2026-08-14 | 逆向确认：map/lap/fap 模式身份（反汇编证据链 0x34CF0/0x34BAC/0x204D18C/0x204D31C + 数据文件 hex 对比），新增 MODE_CONFIRMATION.md，更新 SCENE_MAPPING/ROM_STRUCTURE_REPORT/PROGRESS_LOG | - |

## Git 提交记录（本仓库）
- `02d74da` feat(picpic): 第一个 picpic 版本 - NDS Pic Pic 逆向转写项目初始化
- `f03d86b` agents: 更正资源策略 - 资源最小化 + Code/Data分离 + 单元分解 + 元数据JSON化
- （本次）agents: 静态数据模型职责显式化 + docs 缺失输出补齐

## 发布状态
- ⏳ 未发布正式版（Phase 1 还原版未达成 L3 视觉对齐）
- 发布前须：占位符清零、BUG 关闭、自动通关通过、审查门禁关闭
