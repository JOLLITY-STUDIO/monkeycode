# 游戏界面流程截图

本文档记录《天使之翼 II》自动测试中遇到的关键界面，以及它们在游戏流程中的顺序。

## 游戏流程

```
BOOT → OPENING → TITLE/MENU → STORY → MEETING → MATCH
                │               │          │
                │               │          └ 4 个选项，选最下面一个（試合開始）
                │               └ 连续翻页
                └ 按 START 跳过
```

## 阶段详解

### 1. BOOT → OPENING
- 系统启动，播放开场动画。
- 操作：按 **START** 跳过。

| 截图 | 说明 |
|------|------|
| `game description anmiation-opening.png` | 游戏介绍动画（开场） |

### 2. TITLE / MENU（标题兼菜单画面）
- 标题 logo + 菜单选项在同一画面。
- 操作：选择「しんゲーム」（新游戏）。

### 3. STORY
- 剧情画面，连续翻页。
- 操作：连按 **A / START**。

| 截图 | 说明 |
|------|------|
| `story-in-batchstart or half or ending.png` | 赛前 / 中场 / 终场剧情 |
| `story-inbattle.png` | 比赛中的剧情对话 |

### 4. MEETING（赛前会议）
> 4 个选项，用方向键选中第 4 项（最下面），按 **A** 确认。

| 截图 | 选项说明 |
|------|----------|
| `new_batch_meeting-00-information.png` | 信息 |
| `new_batch_meeting-01-password.png` | 暗号 |
| `new_batch_meeting-02-teammanage.png` | チーム編成（队伍管理） |
| `new_batch_meeting-03-startbatch.png` | 試合開始（比赛开始） ← **目标** |

### 5. MATCH（比赛）

#### 5.1 赛前
| 截图 | 说明 |
|------|------|
| `new_batch_level_update.png` | 能力值更新（进入比赛前的数据展示） |

#### 5.2 比赛中 — 通用
| 截图 | 说明 |
|------|------|
| `batch-enter-idle-no-press.png` | 持球待机，未操作 |
| `batch-enter-A-BATLLE-vs-attack-choose.png` | 进攻选择：持球人面对防守方的行动菜单 |
| `batch-enter-A-BATLLE-vs-attack-choose-配合二过一选择队友.png` | 配合（二过一）：选择接球队友 |

#### 5.3 比赛中 — 禁区内场景
| 截图 | 说明 |
|------|------|
| `...-禁区-争抢-多人对决.png` | 禁区混战：多人争抢对决 |
| `...-禁区内-低空技能选择.png` | 禁区内低空空战技能选择 |
| `...-禁区内-高空技能选择.png` | 禁区内高空争顶技能选择 |
| `...-禁区内-空中特有选择（按下）-假动作.png` | 禁区空中：按下后的特殊操作（假动作） |

#### 5.4 比赛中 — 角球
| 截图 | 说明 |
|------|------|
| `...-角球选技能.png` | 角球：选择发球技能 |
| `...-角球更换位置.png` | 角球：更换发球落点 |
| `...-角球传球选落点或者直接射门.png` | 角球：选落点传球 or 直接射门 |

#### 5.5 其他
| 截图 | 说明 |
|------|------|
| `batch-enter-A-BATLLE-SPRITES.png` | 场上 Sprite 层渲染 |
| `half time.png` | 中场休息 |

## 对应自动测试阶段

参见根目录 `_auto_test.ts` 中的阶段函数：

- `phaseOpening()` — 等待并跳过 OPENING
- `phaseTitle()` → `phaseMenu()` — 等待标题菜单出现，选「新游戏」
- `phaseStory()` — 连续翻页推进剧情
- `phaseMeeting()` — DOWN 键选中底部选项，按 A
- `phaseMatch()` — 模拟比赛操作（A / B / 方向键）

## 相关文档

| 文档 | 说明 |
|------|------|
| [../README.md](../../README.md) | 项目总览 + 架构 + 自动测试 |
| [../BUGS.md](../BUGS.md) | 已知 Bug 记录 |
| [../AA47-ROSTER-ANALYSIS.md](../AA47-ROSTER-ANALYSIS.md) | 阵容数据表分析 |
| [../../src/disasm/banks/worklog.md](../../src/disasm/banks/worklog.md) | 排错记录 + 阻塞点追踪 |
