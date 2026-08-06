# 第1章: ストーリー (Story)

> 说明书原文: 全国大会V3達成 → 国际Jr.ユース大会 → 3年後ブラジルへ

## 对应的 Bank 代码

| Bank | 文件 | 作用 |
|:---:|------|------|
| **24** | `bank-24-cutscene-engine-code.ts` | **过场引擎** — 分镜切换/文本显示/对话 |
| 31 | `bank-31-code.ts` | 启动向量 — RESET → 游戏入口 |
| 00 | `bank-00-code.ts` | 场景分派 — 控制故事线流程跳转 |
| 16 | `bank-16-scene-script-engine-code.ts` | 场景脚本引擎 — 逐帧 tick 场景脚本 |
| 19 | `bank-19-script-engine-code.ts` | 脚本解析器 — PPU 上传包/文本控制码 |

## Bank 24 过场引擎详解
- **入口**: 场景状态机四通道并行引擎 (tick/data/render/aux)
- **JMP vectors at $8000**:
  - `$8000` → scene state machine (主入口)
  - `$8003` → channel 1: palette/scene tick
  - `$8006` → channel 2: scroll/data load
  - `$8009` → channel 3: render queue
  - `$800C` → channel 4: aux/helper dispatch
- **场景**: TECMO logo、intro/mid/half/match select cutscenes

## 说明书故事线 & 代码映射

| 故事段落 | 代码位置 |
|----------|----------|
| 全国大会 V3 达成 | Bank 24 过场引擎 → 开场故事分镜 |
| 国际 Jr.ユース大会苦战 | Bank 24 过场引擎 → 滚动文本/对话 |
| 3年后翼去巴西 | Bank 00 场景分派 → 切换到 Rio Cup 场景 |
| 新战斗开始 | Bank 31 boot → 场景初始化为巴西篇 |

## 数据支撑
- **Bank 25**: 场景脚本数据（被过场引擎读取）
- **Bank 06**: 调色板数据（故事场景用）
- **Bank 07**: 场景初始化数据（开场分镜的精灵/背景）

## 实现要点
- 故事推进由 Bank 00 的状态机控制场景跳转
- 文本显示由 Bank 19 的脚本解析器处理 bytecode → PPU 字符串上传
- 不需要 CPU 模拟，直接根据场景 ID 决定显示的对话文本
