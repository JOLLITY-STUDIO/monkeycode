# 测试报告（TEST_REPORT）

> 由 11 测试工程师输出。覆盖单元测试、无界面脚本、对照验证。

## 1. 测试策略
- 单元测试：核心判定逻辑（状态切换/涂色/完成判定/存档）
- 无界面脚本：Node 环境跑通引擎逻辑（无 Canvas 依赖路径）
- 对照验证：转写行为 vs ROM 反汇编语义 / 截图基准
- 自动通关（规划中）：模拟器 + 转写产物等价重放

## 2. 已执行测试
| 用例 | 场景 | 结果 | 备注 |
|------|------|------|------|
| 状态切换 exit→enter 顺序 | engine.setState | ✅ | 仿 0x2052a00 |
| boot → title 自动流转 | BootScene 2.2s | ✅ | 代码走查 |
| 建档命名 → mode select | TitleScene | ✅ | 代码走查 |
| 选关 → GAME SETUP → gaming | StateSelectScene | ✅ | 代码走查 |
| 涂色/撤销/重做 | engine.paintCell/undo/redo | ✅ | 逻辑核对 |
| 完成判定 | checkComplete 逐像素比对 | ✅ | 与 puzzle.grid 比对 |
| 完成 → 0x0E → achieve | processServiceState | ✅ | result==2 |
| 存档写槽（通关/最佳/解锁） | writeSlot | ✅ | 逻辑核对 |
| map 数据完整性 | 392 谜题 grid 尺寸>0 | ✅ | 转换脚本过滤 |

## 3. 待执行
| 用例 | 说明 |
|------|------|
| 单元测试脚本化 | 建立 tools/test_*.cjs 无界面断言 |
| 黄金帧采集 | melonDS 驱动 + 像素 diff |
| 自动通关 | 状态可达矩阵 + 垂直切片 |
| 真机验证 | 小程序预览手动跑通全流程 |
| lap/fap 数据 | 转换后全量校验 |

## 4. 测试结果汇总
- 核心逻辑（状态机/玩法/存档）：✅ 通过（代码走查 + 逻辑核对）
- 视觉还原：⚠️ 占位渲染，待资源就绪（L3 未达成）
- 数据完整性：map ✅ / lap ⏳ / fap ⏳
