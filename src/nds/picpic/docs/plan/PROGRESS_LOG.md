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

## 卡点与攻克记录
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

## 当前进度之外的工作内容
- 工具脚本沉淀：`tools/` 下 disasm_*.py / convert_*.py / _state_machine.py 等 30+ 分析脚本
- 反汇编成果：`arm9-full.dis.txt`（4.16MB）+ `arm9-functions.tsv`（函数表）
- 截图基准：`screenshots/` 32 张（含黄金帧候选）

## 待办
- [ ] lap/fap 关卡转换（M4 剩余）
- [ ] 数据服务层 Repository 接口化（M4 剩余）
- [ ] 黄金帧采集与视觉校准（M6）
- [ ] 单元测试/无界面脚本（M6）
