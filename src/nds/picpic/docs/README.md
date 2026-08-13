# Pic Pic 逆向转写项目 —— 文档总索引（Docs TOC）

> 由文档与知识库管理员（14 docs-manager）维护。全部文档必须落位于本目录体系，**禁止根目录平铺文档**。
> 目录规范唯一权威：`agents/docs-manager.md`

## 目录结构

| 子目录 | 用途 | 归属 agent |
|--------|------|-----------|
| `context/` | 游戏上下文 | 01 PM |
| `plan/` | 计划 / 进度 | 01 PM |
| `reverse/` | 逆向层报告 | 03-06 |
| `design/` | 架构设计 | 02 |
| `qa/` | 质量层记录 | 11-12 |
| `release/` | 发布收尾 | 13 |
| `_archive/` | 归档区 | 14 |

## 文档清单

| 状态 | 文档 | 路径 | 负责 | 最近更新 | 备注 |
|------|------|------|------|----------|------|
| 待建 | 游戏上下文 | `docs/context/game-context.md` | 01 | - | 首次初始化 |
| 待建 | 项目计划/WBS | `docs/plan/PROJECT_PLAN.md` | 01 | - | - |
| 待建 | 开发日志 | `docs/plan/PROGRESS_LOG.md` | 01 | - | - |
| 待建 | ROM 结构报告 | `docs/reverse/ROM_STRUCTURE_REPORT.md` | 03 | - | - |
| 待建 | 反汇编/函数表 | `docs/reverse/DISASSEMBLY.md` | 04 | - | - |
| 待建 | 状态机 | `docs/reverse/STATE_MACHINE.md` | 05 | - | - |
| 待建 | 场景映射表 | `docs/reverse/SCENE_MAPPING.md` | 05 | - | - |
| 待建 | 资源索引/单元清单 | `docs/reverse/RESOURCE_INDEX.md` | 06 | - | - |
| 待建 | 架构设计 | `docs/design/ARCHITECTURE.md` | 02 | - | - |
| 待建 | 接口契约 | `docs/design/INTERFACES.md` | 02 | - | - |
| 待建 | BUG 记录 | `docs/qa/BUGS.md` | 11/12 | - | - |
| 待建 | 审查记录 | `docs/qa/REVIEW_LOG.md` | 12 | - | - |
| 待建 | 测试报告 | `docs/qa/TEST_REPORT.md` | 11 | - | - |
| 待建 | 版本记录 | `docs/release/CHANGELOG.md` | 13 | - | - |
| 待建 | 收尾验收报告 | `docs/release/DELIVERY_REPORT.md` | 13 | - | - |

## 命名规范

- 报告类：`K8S-风格大写短横线`（如 `ROM_STRUCTURE_REPORT.md`）
- 上下文/日志类：`小写短横线`（如 `game-context.md`）
- 禁止中文文件名、禁止根目录平铺、禁止无版本标注的覆盖式修改
