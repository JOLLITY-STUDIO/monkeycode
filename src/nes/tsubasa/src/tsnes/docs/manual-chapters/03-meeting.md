# 第3章: ミーティング (Meeting / 赛前会议)

> 说明书原文: 試合前ミーティング → 情報/スコアメモ/チームデータ/キックオフ

## 对应的 Bank 代码

| Bank | 文件 | 作用 |
|:---:|------|------|
| **20** | `bank-20-team-select-code.ts` | **队伍选择 UI** — 菜单/阵容/球员数据管理 |
| **28** | `bank-28-player-attrs-code.ts` | **阵型引擎** — 阵型选择/换人/属性计算 |
| 19 | `bank-19-script-engine-code.ts` | 脚本解析器 — 查找表/数据读取 |
| 27 | `bank-27-player-data-code.ts` | 球员数据查询 — 名称/属性 |
| 00 | `bank-00-code.ts` | 场景分派 — 控制 meeting 流程 |

## Bank 20 — 队伍选择 ($8000-$9FFF)
```
JMP vectors:
  $8000 → team select init/tick (菜单初始化/每帧)
  $8003 → player data load (球员数据加载)
  $8006 → roster update (阵容更新)
  $8009 → formation/setup (阵型设置)
  $800C → menu handler (菜单处理)
```
**控制码分派**: F0(退出), F1(JUMP), F2-FE(子分派→阵型数据加载, 球员属性读取)

## 会议菜单命令 & 代码映射

| 命令 | 代码路径 |
|------|----------|
| **情報** (对手情报) | Bank 20 → `$800C` menu handler → 读取对手队伍数据 |
| **スコアメモ** (密码) | Bank 20 → 显示密码字符 → Bank 00 bytecode 加密 |
| **チームデータ** (队伍数据) | Bank 20 → 跳转到 Team Data 子界面 (见第4章) |
| **キックオフ** (开球) | Bank 20 → 切换到 Bank 26 比赛引擎 |

## Bank 28 — 阵型引擎入口
```
Bank 28 JMP vectors:
  $8000 → 属性计算入口
  $8003 → formation select (阵型选择)
  $8006 → player sprite load (球员精灵加载)
  $800C → player data dispatch
  $8012 → formation init dispatch
```

## 操作流程
1. 场景分派 → Bank 00 进入 meeting 状态
2. Bank 20 绘制菜单 UI (`$8000` init)
3. 十字键选命令 → R按钮确定
4. 执行对应子功能 (Bank 20/28 协作)
5. 完成后 → Bank 00 切换到开球/下一步
