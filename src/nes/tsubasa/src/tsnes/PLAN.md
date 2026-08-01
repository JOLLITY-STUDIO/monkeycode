# 天使之翼2 H5 移植 — 项目计划

## 项目目标
将 NES《天使之翼2》(Captain Tsubasa 2) 从 6502 汇编机器码，移植为纯 TypeScript + Canvas 的 H5 游戏，同时支持 Web 浏览器和微信小程序。

## 架构概述
```
NES 架构                     →    H5 架构
CPU (6502)                  →    GameLoop + SceneManager
PPU (Picture Processing)    →    CanvasRenderer
MMC3 Mapper                 →    ChrTileStore + 内存 Bank 引用
Joypad                      →    InputManager
PRG-ROM (程序逻辑)            →    TypeScript 代码翻译
CHR-ROM (图形数据)            →    ChrTileStore (预解码缓存)
```

## 阶段划分

### Phase 1: 测试基础设施与代码规范 ✓
- [x] 创建统一测试运行入口 `game-engine/test/run-all.ts`
- [x] 修复 test-boot.ts 中的 runner boot 调用
- [x] 修复 test-script.ts 中的 palette 未初始化问题
- [x] 打通 Node.js CLI 运行全部测试 (`npm run test:engine`)
- [x] 添加 `test:engine` / `test:engine:verbose` npm 脚本
- [x] 4/4 测试全部通过
- [x] Git commit ✓

### Phase 2: ROM 数据对接 ✓
- [x] 创建 `RomReader` 类 — 封装 MMC3 bank 映射与 PRG-ROM 字节读取
- [x] 实现 `SceneManager._readScriptByte()` — 从 ROM 读取实际字节码
- [x] `SceneManager.boot()` 同步 ROM 读取器 bank 状态
- [x] 创建 ROM 读取测试 (6 个子测试)
- [x] 6/6 测试全部通过
- [x] Git commit ✓

### Phase 3: 字节码脚本引擎 ✓
- [x] 扩展 `_handleControlCode()` 支持全部 20+ 操作码
- [x] 实现 `_handleSubControl()` — 滚动、PPU 控制、CHR bank 选择
- [x] 实现文本渲染管线 — 字节码 → nametable tile 写入
- [x] 实现等待帧状态 (WAIT_FRAMES)
- [x] 创建全面字节码引擎测试 (9 个子测试)
- [x] 7/7 测试全部通过
- [x] Git commit ✓

### Phase 4: 对话/过场系统 ✓
- [x] 实现 `_runDialogScene()` — 对话引擎 (TEXT / WAIT_INPUT / CHOICE / DONE 状态机)
- [x] 实现多行文本渲染与分页 (A 按钮翻页)
- [x] 实现选择菜单 (↑↓ 导航, A 确认, showChoices API)
- [x] 编写对话框测试 (6 个子测试: 状态转换、输入驱动、文本渲染、多页、稳定性)
- [x] 8/8 测试全部通过
- [x] Git commit ✓

### Phase 5: 比赛引擎 ✓
- [x] 实现 `MatchEngine` 类 — 完整比赛主循环
- [x] 实现球员阵列与 4-4-2 阵型
- [x] 实现足球物理（传球 B、射门 A、空中飞行）
- [x] 实现球门检测与得分 (goal at X=0 and X=88, Y=18-42)
- [x] 实现比赛计时 (上下半场、暂停)
- [x] 实现 COM AI 基本行为 (追球、防守)
- [x] 编写比赛引擎测试 (8 个子测试: 初始化、阵型、移动、射门、进球、全场、COM AI、计分)
- [x] 9/9 测试全部通过
- [x] Git commit ✓

### Phase 6: 全场景串联 ✓
- [x] 实现场景注册表 (18 个场景定义 + 故事推进序列)
- [x] 实现 `initScene()` — 场景初始化（bank 切换、scriptPtr 设置）
- [x] 实现 `getNextScene()` — 故事推进逻辑
- [x] 接线 `_defaultDispatch` — 场景 ID=0 时自动初始化当前场景
- [x] 编写 E2E 回归测试 (7 阶段: Logo→标题→加载→菜单→开场→状态验证→内存稳定性)
- [x] 10/10 测试全部通过
- [x] Git commit ✓

### Phase 7: 微信小程序适配与上线
- [ ] 小程序 Canvas 性能优化
- [ ] 触屏操作打磨
- [ ] 音效系统对接
- [ ] 完整 E2E 测试（小程序环境）
- [ ] Git commit: `phase-7: miniprogram polish`

### Phase 8: Bank 关系链审计与修复 ✓
- [x] 修复 bank-24 未使用的 `frameInit_$CC02` import
- [x] 修复 bank-26 全部 bank30 import 被注释问题
- [x] 修正 bank-20 关于 bank-27 的误导性注释
- [x] 修正 bank-12 关于 bank-15 的误导性注释
- [x] 连线 bank-26 → bank30: 21 audiotrigger + 9 farCallDispatch + 5 playerStateHandler + 2 randomGen = 37 个调用
- [x] 连线 bank-20 → bank-27: `bank27_entry` 球员数据加载
- [x] 连线 bank-26 → bank-28: `bank28_entry` 球员属性计算（import + TODO 调用点）
- [x] 审计结果: 6 bank 已正确连接, 15 孤儿数据 bank 已文档化, 2 功能 bank (27/28) 已连接
- [x] Git commit: `phase-8: bank cross-dependency audit & fix`

### Phase 9: 孤儿数据 Bank 连线 ✓
- [x] 音乐曲谱 bank(13/14/15) → bank-12 audio-engine (import + 公开 accessor)
- [x] 场景脚本 bank(03/04/05/25) → bank-16 scene-engine + bank-19 script-engine (import + 公开 accessor)
- [x] UI/Sprite bank(08/18/21) → bank-22 sprite-engine (import + 公开 accessor)
- [x] 球员数值 bank(29) → bank-27 player-data + bank-28 player-attrs (import + 公开 accessor)
- [x] 比赛AI bank(17) → bank-26 match-engine (import + 公开 accessor)
- [x] 关卡元数据 bank(23) → bank-16 scene-engine + bank-00 code (import + 公开 accessor)
- [x] 验证: 13/13 孤儿 bank 全部已连接消费者
- [x] Git commit: `phase-9: orphan data bank wiring — 13/13 connected`

---

## 当前状态: Phase 9 ✓ 已完成 → 下一步 Phase 10 (Bank30 扩展/剩余调用)

### Phase 1: 测试基础设施与代码规范 ✓ 已完成
- [x] 创建统一测试运行入口 `game-engine/test/run-all.ts`
- [x] 修复 test-boot.ts 中的 runner boot 调用
- [x] 修复 test-script.ts 中的 palette 未初始化问题
- [x] 打通 Node.js CLI 运行全部测试 (`npm run test:engine`)
- [x] 添加 `test:engine` / `test:engine:verbose` npm 脚本
- [x] 4/4 测试全部通过
- [x] Git commit: `phase-1: test infrastructure — all 4 tests passing`

### Phase 2: ROM 数据对接 ✓ 已完成
- [x] 创建 `RomReader` 类 — 封装 MMC3 bank 映射与 PRG-ROM 字节读取
- [x] 实现 `SceneManager._readScriptByte()` — 从 ROM 读取实际字节码
- [x] `SceneManager.boot()` 同步 ROM 读取器 bank 状态
- [x] 创建 ROM 读取测试 (6 个子测试: bank 读取、bank 切换、word 读取、越界、bank3 数据、工厂函数)
- [x] 创建场景管理器字节码读取测试 (scriptPtr 递增、字符输出)
- [x] 6/6 测试全部通过
- [x] Git commit: `phase-2: rom data integration — RomReader + bytecode reading from ROM`

### Phase 3: 字节码脚本引擎 ✓ 已完成
- [x] 扩展 `_handleControlCode()` 支持全部 20+ 操作码 (SCENE_TRANS, BRIGHT_FADE, CLEAR_SCREEN, PPU_MODE_SET, TEXT_SETUP, FILL_DISP, CURSOR_SET, BANK_LOAD, CROSS_BANK, FADE_SCENE, FADE_SETUP 等)
- [x] 实现 `_handleSubControl()` 支持滚动、PPU 控制、CHR bank 选择
- [x] 实现文本渲染管线 — 字节码 → nametable tile 写入
- [x] 实现等待帧状态 (WAIT_FRAMES)
- [x] 创建全面字节码引擎测试 (9 个子测试: 字符输出、清屏、场景切换、TERMINATOR、光标定位、列控制、等待帧、连续字符输出、清屏验证)
- [x] 7/7 测试全部通过
- [x] Git commit: `phase-3: bytecode script engine — full opcode support, 7/7 tests passing`

### Phase 4: 对话/过场系统 ✓ 已完成
- [x] 实现 `_runDialogScene()` — 对话引擎 (TEXT / WAIT_INPUT / CHOICE / DONE 状态机)
- [x] 实现多行文本渲染与 A 按钮翻页
- [x] 实现选择菜单 (↑↓ 导航, A 确认, showChoices API)
- [x] 创建对话框测试 (6 个子测试)
- [x] 8/8 测试全部通过
- [x] Git commit: `phase-4: dialog system — state machine, 8/8 tests passing`

### Phase 5: 比赛引擎 ✓ 已完成
- [x] 实现 `MatchEngine` 类 — 完整比赛主循环
- [x] 实现球员阵列与 4-4-2 阵型、边界限制
- [x] 实现足球物理（传球 B、射门 A、空中飞行、球员拦截）
- [x] 实现球门检测与得分 (goal posts Y=18-42)
- [x] 实现比赛计时 (上下半场、中场暂停)
- [x] 实现 COM AI 基本行为 (追球、位置防守)
- [x] 创建比赛引擎测试 (8 个子测试)
- [x] 9/9 测试全部通过
- [x] Git commit: `phase-5: match engine — full football gameplay, 9/9 tests passing`

### Phase 6: 全场景串联 ✓ 已完成
- [x] 实现场景注册表 (18 个场景定义 + 故事推进序列)
- [x] 实现 `initScene()` — 场景初始化（bank 切换、scriptPtr 设置、nametable 清除）
- [x] 实现 `getNextScene()` / `getSceneDefinition()` — 场景查找工具
- [x] 接线 `_defaultDispatch` — 场景 ID=0 时自动初始化当前场景 + ROM 同步
- [x] 创建 E2E 回归测试 (7 阶段: Logo→标题→加载→菜单→开场→状态→内存)
- [x] 10/10 测试全部通过
- [x] Git commit: `phase-6: full scene integration — scene registry, 10/10 tests passing`
