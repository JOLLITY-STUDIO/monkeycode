# 第2章: ゲームをはじめる (Starting the Game)

> 说明书原文: タイトル画面で KICKOFF → スタート / CONTINUE → 密码入力

## 对应的 Bank 代码

| Bank | 文件 | 作用 |
|:---:|------|------|
| **31** | `bank-31-code.ts` | **RESET 向量** — 系统初始化/主循环 |
| 00 | `bank-00-code.ts` | **场景分派** — 标题画面 / 密码 / 新游戏 |
| 01 | `bank-01-code.ts` | 标题画面渲染 / 菜单交互 / 光标 |
| 30 | `bank-30-code.ts` | 系统库 — 内存清零/协程/跨 bank 调用 |
| 02 | `bank-02-nmi-code.ts` | NMI 渲染 — 手柄输入读取 |

## Bank 31 — 启动向量 ($E000-$FFFF, 固定映射)
```
$FFF0 → RESET 向量
→ 初始化 MMC3 寄存器
→ 清除 RAM/VRAM
→ 初始化调色板
→ 切换到 Bank 00 → 标题画面
```

## Bank 00 — 场景分派引擎
```typescript
// 跳转表 $800D: 根据 $0027 (子状态) 分派
// state 0: 初始化
// state 1: 标题画面 (调用 bank 01 render)
// state 2: CONTINUE 密码输入 → 调用 bank 20
// state 3: 新游戏 → 团队选择 → 比赛
```

## 密码系统 (Score Memo)

| 功能 | 对应代码 |
|------|----------|
| 密码加密 | Bank 00 bytecode 解释器 → ED 子脚本 |
| 密码输入 UI | Bank 20 队伍选择菜单 |
| 密码解码恢复 | Bank 28 球员属性引擎(载入状态) |
| 密码字符映射表 | Bank 19 数据表 (スクリプトエンジン) |

### 说明书操作流程
1. **KICKOFF**: 按 START → Bank 01 标题渲染 → `$8017` 切换 bank 02
2. **CONTINUE**: 选 CONTINUE → Bank 20 密码输入画面
3. **密码输入**: 十字键选字 → R(→)按钮写入 → SELECT前进 → E(结束)或START开始
4. **密码错误**: 右下提示画面 → Bank 24 过场引擎显示警告

## 代码入口追踪
```
Boot → Bank 31 RESET ($FFF0)
     → Bank 30 系统初始化
     → Bank 00 场景分派 ($800D)
     → Bank 01 标题画面渲染 ($80EC)
     → 等待 START 按钮 → Bank 02 NMI 手柄输入
     → KICKOFF 或 CONTINUE
```
