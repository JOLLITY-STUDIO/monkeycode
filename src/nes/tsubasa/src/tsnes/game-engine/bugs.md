# BUG 追踪文档 — game-engine bank 翻译引擎

## 版本信息
- 版本: v1.2.0 (第二阶段分析)
- 日期: 2026-07-29
- 总模块: 8/32 (25.0%) | CODE bank: 6/15 (40.0%) | 运行时代码路径: ~15-18%

---

## 第一阶段遗留 BUG

### BUG-012: bank-31 `_call_bank00_XX` 全是空 stub
- **严重度**: **P0**
- **档案**: `game-engine/banks/bank-31.ts` (第 433-450 行)
- **数量**: 18 个函数
- **描述**: 比赛主循环通过这些 stub 调用 bank-00 的场景分派/字节码/精灵渲染等入口。全部为 `{}` 空体 → 场景状态永远不变、画面永远不更新
- **修复方向**: 
  - `_call_bank00_0C` (bytecode dispatch) → 连到 `bank00_execBytecode`
  - `_call_bank00_24` (bytecode exec) → 同上核心
  - `_call_bank00_0F/12` (player/sprite render) → bank-22 精灵引擎
  - `_call_bank00_03` (scene tick) → `bank00_tickTimers`
  - 其余见 bank00 跳转表 $800D-$803C

### BUG-013: Bank 引擎与 CPU 模拟器启动流程不同
- **严重度**: **P0**
- **描述**: CPU 路径走：RESET → initScene → TECMO logo 场景 → 标题画面 → 菜单 → 比赛。Bank 路径在 initScene 后直接跳到 bank-31 主循环，跳过了整个启动序列
- **根因**: 
  - `entryToBank00_dispatch` 调了 `bank00_dispatchScene`，但：
    1. 场景状态变量（$0027 等）未初始化
    2. bank-16（场景逻辑）缺失
    3. 字节码数据 bank-24 缺失
- **方案**: 详见 `bank-translation.md` 第二阶段计划

### BUG-014: `tick_BANK31_mainLoop` 在非比赛上下文覆写 $0628
- **严重度**: P1
- **档案**: `game-engine/banks/bank-31.ts`
- **描述**: 主循环假设处于比赛状态，清除场景 flag $0628。当场景状态机位于标题画面时，$0628=0 导致 `bank02_nmiHandler` 跳过渲染

### BUG-017: `initScene` → `$CEFE` → bank00 dispatch 链路 stub
- **严重度**: **P0**
- **档案**: `game-engine/banks/bank-30.ts`
- **状态**: 调用链已串联 ✅，但 `bank00_dispatchScene` 内部：
  - 读取 $0027 子状态 → 部分状态处理为 stub
  - 字节码解释器中「讀取 scene 數據」步骤依赖 bank-16/24 → stub
- **影响**: dispatch 链路正确但实际渲染逻辑待补全

---

## 已修复

| BUG | 修复 |
|-----|------|
| BUG-006 | PPU 对接 OK，h5-compare 两路均用真实 PPU |
| BUG-007 | ROM bank 全注册：`registerAllBanks()` |
| BUG-015 | NMI 初始化收回引擎：`translate_BANK31_RESET` → `nmiInit_$C71A` |
| BUG-016 | ppuScrollUpdate 调用：main.ts 每帧加入 `bank02_ppuScrollUpdate()` |
| — | RESET 补全：`translate_BANK31_RESET` → `initScene_$C64E` |
| — | main.ts 清理重复调用：移除 `ppuScreenInit`/`clearOam`/`initScene` |
| — | tsconfig: 加 `DOM` lib；`TSEngine` 重复导出修复；`miniprogram.d.ts` |

---

## 架构澄清

### BUG-018: NMI 两路数据源不同 — 非 BUG
- **澄清**: CPU 路径和 Bank 路径各拥有独立的 SystemState，各自内部一致：
  - CPU 路径：写 `$0498`/`$4A-$4B` → CPU NMI 读
  - Bank 路径：写 `$05E8`/`$7A-$44` → Bank NMI 读
- **结论**: 两个独立渲染管线，非数据源不一致。对比测试的差异来自游戏逻辑翻译不完整

### 内存架构：cpu.mem vs sys.mem
- 两路径均为 `new Uint8Array(0x10000)`，64KB 一致 ✅
- CPU 路径: ROM 数据通过 `copyArrayElements` 复制到 `cpu.mem[$8000-$FFFF]`
- Bank 路径: ROM 数据在 `bankRomTable` 中独立存储，`readMem()` 按需读取
- sys.mem[$8000-$FFFF] 在 Bank 路径中未使用（设计如此，非浪费）
