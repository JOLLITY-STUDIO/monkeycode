# Essential Sudoku DS → H5 微信小程序逆向工程

> 把 Nintendo DS 游戏 **Essential Sudoku DS (Europe)** 重新实现为 TypeScript + Canvas 的 H5 微信小程序版本。

## 项目状态

| 项目 | 状态 |
| ---- | ---- |
| 当前版本 | V0.0.x (baseline) — 仅完成 ROM header 解析、entry 反汇编、FAT dump |
| 目标版本 | V1.0 — 完整移植数独玩法 + 菜单系统 + 资源解码 |
| 项目阶段 | 1. 逆向分析 (V0.0x ~ V0.7) → 2. H5 架构 (V0.8) → 3. 核心转写 (V0.9) → 4. 真机落地 (V0.10+) |

## 技术栈

- **目标平台**: 微信小程序 (Skyline / Canvas 2D)
- **语言**: TypeScript
- **数据**: 解析 NDS ROM（NTR cart header / FAT / FNT / NBM）
- **图像**: NCGR / NCLR / NCER / NSCR → PNG 资源
- **CPU**: 不做硬件模拟；按 NDS 行为语义直接 TypeScript 重写

## 工作流

- `docs/` — ROM 分析报告 + ARM 反汇编报告 + 架构设计
- `rom-data/` — 抽取出的 ROM 二进制文件 + 中间解析产物
- `scripts/` — Python 抽取脚本（capstone 反汇编 / NDS 文件解析）
- `typings/` — TypeScript 声明文件（nds / wx / 自定义）
- `miniprogram/` — H5 微信小程序源码

## 进度跟踪

见 [CHANGELOG.md](./CHANGELOG.md) + [.codebuddy/](./.codebuddy/) 日志。

## 关键约定

- **翻译 = 行为语义** (类似 `agents-cosplay` 的原则): 不模拟 NDS 硬件 CPU，TypeScript 直接表达**做了什么**。
- **数据 = 声明式**: 所有 CHR / 图形 / 题目数据 转为 PNG / JSON；不保留十六进制硬编码。
- **mvc 分离**: Page (视图) / Component (组件) / Service (业务) / DataStore (状态) 四层。
