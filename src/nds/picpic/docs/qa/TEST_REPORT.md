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
| 选档（3槽+进度）→ 手绘建档 → mode select | TitleScene | ✅ | 走查（对齐截图 7252/8134；见 BUG-007） |
| 选关 → GAME SETUP → gaming | StateSelectScene | ✅ | 代码走查 |
| 涂色/撤销/重做 | engine.paintCell/undo/redo | ✅ | 逻辑核对 |
| 完成判定 | checkComplete 逐像素比对 | ✅ | 与 puzzle.grid 比对 |
| 完成 → 0x0E → achieve | processServiceState | ✅ | result==2 |
| 存档写槽（通关/最佳/解锁） | writeSlot | ✅ | 逻辑核对 |
| map 数据完整性 | 392 谜题 grid 尺寸>0 | ✅ | 转换脚本过滤 |
| lap 数据完整性 | 407（400+7 教学），索引数组=407 | ✅ | convert_lap_fap.py 全量转换 |
| fap 数据完整性 | 405（400+5 教学），索引数组=405 | ✅ | convert_lap_fap.py 全量转换 |
| lap/fap 编译接入 | stage-data SOURCES.lap/fap 非空，lint 0 错误 | ✅ | tsc 仅剩既有环境错误（DOM lib） |

## 3. 待执行
| 用例 | 说明 |
|------|------|
| 单元测试脚本化 | 建立 tools/test_*.cjs 无界面断言 |
| 黄金帧采集 | melonDS 驱动 + 像素 diff |
| 自动通关 | 状态可达矩阵 + 垂直切片 |
| 真机验证 | 小程序预览手动跑通全流程（含 lap/fap 模式进关） |
| lap/fap 视觉校验 | 默认调色板渲染 vs 原版截图（待 BUG-008 调色板转换后） |

## 4. 测试结果汇总
- 核心逻辑（状态机/玩法/存档）：✅ 通过（代码走查 + 逻辑核对）
- 视觉还原：⚠️ 占位渲染，待资源就绪（L3 未达成）
- 数据完整性：map ✅ / lap ✅（407）/ fap ✅（405）
