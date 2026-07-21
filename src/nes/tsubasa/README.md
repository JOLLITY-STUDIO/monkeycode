# 天使之翼 2 — NES ROM TypeScript 反汇编

> 将 48 个 MMC3 PRG bank 逐指令翻译为 TypeScript，实现完全可调试的 NES 游戏逻辑复现。

## 架构

```
src/disasm/banks/
├── bank_00_dispatch.ts   # 场景状态机 + 跳转表分派
├── bank_01_match.ts      # 比赛逻辑
├── bank_02_nmi.ts        # NMI 中断处理
├── bank_11_bg.ts         # 背景渲染
├── bank_12_audio.ts      # 音频系统
├── bank_16_scene.ts      # 场景加载
├── ...
├── bank_31_boot.ts       # RESET/NMI 向量 + 启动初始化
├── _romdata/             # 48 个 bank 的原始 ROM 字节数据 (JSON→TS)
├── _crossbank.ts         # 跨 bank 函数调用分发
├── _bank_types.ts        # 类型定义
└── worklog.md            # 排错记录 + 阻塞点追踪
```

### 关键概念

| 概念 | 说明 |
|------|------|
| `$27` (jumpIdx) | 场景状态机跳转索引，由 bank_00 dispatch 分派 |
| `$26` (scene) | 当前场景编号 |
| `$4C` (sceneStatus) | 场景处理状态码 |
| `$1B/$1C` | 手柄输入 (当前/新按下) |
| MMC3 R6/R7 | 控制 `$8000` / `$A000` 窗口映射的 bank 编号 |
| `xcall` | 跨 bank JSR: 根据 CPU 地址解析 bank→执行函数 |

---

## 自动测试

### 设计原则

1. **全自动推进**: 模拟手柄操作，按照游戏流程 (标题→菜单→剧情→比赛) 持续运行 TS 反汇编
2. **阻塞即报**: 遇到任何 crash、缺失 handler、场景卡死等情况立即报告
3. **状态追踪**: 记录每帧关键 RAM 状态 ($26/$27/$4C/MMC3)，生成 JSON 日志
4. **联动 worklog**: 检测到的阻塞点自动追加到 `worklog.md`

### 运行方式

```bash
# 自动测试 (TS 反汇编，不需要 jsnes)
npx tsx _auto_test.ts                    # 快速模式: 跳过 PPU 字节码解释
npx tsx _auto_test.ts --verbose          # 调试模式: 恢复完整日志 + 字节码解释
npx tsx _auto_test.ts --max-frames 1200  # 最大帧数 (默认 1800)
npx tsx _auto_test.ts --json             # 仅输出 JSON
```

### 游戏阶段模拟

| 阶段 | 场景范围 | 操作策略 | 预期推进 |
|------|----------|----------|----------|
| BOOT | $FF | RESET 向量 → 初始化 | → $00 |
| OPENING | $00-$01 | 等待开场动画，间歇按 START 跳过 | → $02 |
| TITLE/MENU | $02-$04 | 等待标题菜单，按 START/A 选「新游戏」 | → $12 |
| STORY | $12-$1E | 连续按 A/START 翻页 | → $20 |
| MEETING | $20-$3F | DOWN 键选底部「試合開始」→ 按 A | → $40+ |
| MATCH | $40+ | 模拟 A/B/方向 比赛操作 | → 半场/结束 |

### 阻塞类型

| 类型 | 检测方式 | 等级 |
|------|----------|------|
| CRASH | try/catch 捕获异常 | ❌ 致命 |
| NO_HANDLER | crossBankCall 中无匹配 handler | 🔴 阻塞 |
| STUCK | 同一场景连续 300 帧无变化 | 🟡 卡死 |
| WARN | console.warn 捕获 (缺失函数) | 🟠 警告 |
| LOOP | 同一 jumpIdx 循环超 200 次且场景未变 | 🟡 僵直 |

### 输出

- **控制台**: 实时帧日志 + 阻塞报告
- `test_output/auto_test_xxx.json`: 完整帧状态时间线
- `src/disasm/banks/worklog.md`: 自动追加阻塞点条目

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [docs/screenshots/README.md](docs/screenshots/README.md) | 游戏界面流程截图对照表 |
| [src/disasm/banks/worklog.md](src/disasm/banks/worklog.md) | 排错记录 + 阻塞点追踪 |
| [docs/BUGS.md](docs/BUGS.md) | 已知 Bug 记录 |
| [docs/UPGRADE.md](docs/UPGRADE.md) | 球员赛后升级/经验系统说明书 |
| [docs/AA47-ROSTER-ANALYSIS.md](docs/AA47-ROSTER-ANALYSIS.md) | 阵容数据表完整分析 |
