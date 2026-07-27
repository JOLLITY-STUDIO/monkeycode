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

### Phase 5: 比赛引擎
- [ ] 实现 `_runMatchScene()` — 比赛主循环
- [ ] 实现球员动画与移动逻辑
- [ ] 实现足球物理（传球、射门）
- [ ] 实现门将与球门碰撞检测
- [ ] 实现比赛 UI 渲染（比分、时间、球员状态）
- [ ] 编写比赛引擎模拟测试
- [ ] Git commit: `phase-5: match engine`

### Phase 6: 全场景串联
- [ ] 实现全部 19 个场景的注册与切换
- [ ] 场景间过场动画（淡入淡出）
- [ ] 存档/读档机制
- [ ] 编写端到端回归测试（自动跑 TECMO logo → 标题 → 密码 → 开场 → 比赛）
- [ ] Git commit: `phase-6: full scene integration`

### Phase 7: 微信小程序适配与上线
- [ ] 小程序 Canvas 性能优化
- [ ] 触屏操作打磨
- [ ] 音效系统对接
- [ ] 完整 E2E 测试（小程序环境）
- [ ] Git commit: `phase-7: miniprogram polish`

---

## 当前状态: Phase 4 ✓ 已完成 → 进入 Phase 5

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
