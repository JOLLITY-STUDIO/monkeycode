# .codebuddy 项目跟踪目录

> 本目录存放项目级任务日志、agent tracking、决策记录。

## 文件清单

| 文件 | 用途 |
| ---- | ---- |
| `TASK_LOG.md` | 详细任务执行日志 (每个版本的细粒度记录) |
| `WIP.md` | 当前 working-tree 状态 (频繁更新) |
| `DECISIONS.md` | 项目级架构决策记录 (ADR 风格) |

## 不放什么

- 不要把大文件 (>100 KB) 放到这里
- 不要把临时调试日志 (使用 `*.tmp` 自动 ignore)
- 不要把 ROM 二进制本身放这里 (应在 `rom-data/`)
