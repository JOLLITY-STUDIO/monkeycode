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

### Phase 1: 测试基础设施与代码规范 ✓ (待验证)
- [ ] 创建统一测试运行入口 `game-engine/test/run-all.ts`
- [ ] 修复 test-boot.ts 中的 runner boot 调用
- [ ] 修复 test-input.ts 中的 holdButton 逻辑
- [ ] 打通 Node.js CLI 运行全部测试
- [ ] 添加测试覆盖率框架
- [ ] Git commit: `phase-1: test infrastructure`

### Phase 2: ROM 数据对接
- [ ] 实现 `SceneManager._readScriptByte()` — 从 ROM 数据读取字节码
- [ ] 创建 RomReader 类，封装 PRG-ROM bank 地址解析
- [ ] 导入 PRG-ROM 数据到 game-engine 层
- [ ] 编写字节码读取单元测试（验证读到的字节与原始 ROM 一致）
- [ ] Git commit: `phase-2: rom data integration`

### Phase 3: 字节码脚本引擎
- [ ] 实现完整 `_handleSubControl()` — 滚动、调色板渐变、骰子等
- [ ] 实现文本渲染管线（字节码 → nametable → Canvas 显示）
- [ ] 实现光标闪烁（脚本引擎定时器）
- [ ] 编写脚本引擎单元测试（注入已知字节码序列，验证 nametable 输出）
- [ ] Git commit: `phase-3: bytecode script engine`

### Phase 4: 对话/过场系统
- [ ] 实现 `_runDialogScene()` — 对话引擎
- [ ] 实现多行文本渲染与分页
- [ ] 实现选择菜单（はい/いいえ、战术选择）
- [ ] 编写对话场景测试
- [ ] Git commit: `phase-4: dialog system`

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

## 当前状态: Phase 1 ✓ 已完成 → 进入 Phase 2

### Phase 1: 测试基础设施与代码规范 ✓ 已完成
- [x] 创建统一测试运行入口 `game-engine/test/run-all.ts`
- [x] 修复 test-boot.ts 中的 runner boot 调用
- [x] 修复 test-script.ts 中的 palette 未初始化问题
- [x] 打通 Node.js CLI 运行全部测试 (`npm run test:engine`)
- [x] 添加 `test:engine` / `test:engine:verbose` npm 脚本
- [x] 4/4 测试全部通过
- [x] Git commit: `phase-1: test infrastructure — all 4 tests passing`
