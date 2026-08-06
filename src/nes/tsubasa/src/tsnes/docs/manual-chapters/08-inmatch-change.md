# 第8章: 試合中のチームデータ変更 (In-Match Team Data Change)

> 说明书原文: 得分/犯规/出界后 → チームデータをかえる / そのまま再開

## 对应的 Bank 代码

| Bank | 文件 | 作用 |
|:---:|------|------|
| **26** | `bank-26-match-engine-code.ts` | **比赛引擎** — 比赛中断处理/事件管理 |
| **20** | `bank-20-team-select-code.ts` | 队伍选择 — 阵容编辑菜单 |
| **28** | `bank-28-player-attrs-code.ts` | 阵型引擎 — 换人/阵型变更 |

## Bank 26 比赛中断流程

```
$8015 → event manager (事件管理)
  → 检测: 得分 / 犯规 / 球出界
  → 触发中断菜单:
     "チームデータをかえる" / "そのまま再開"
  → 选择"变更": 调用 Bank 20 队伍数据界面
  → 选择"再开":  长按 R 跳过菜单 → 立即重启比赛
```

## 赛中操作 & 代码映射

| 操作 | 代码路径 |
|------|----------|
| 十字键选命令 | Bank 26 → Bank 20 menu handler |
| 显示各球员残りガッツ | Bank 20 → Bank 28 `$800C` player data → 显示当前体力 |
| フォーメーション変更 | Bank 28 `$8003` formation select |
| ポジションチェンジ | Bank 28 `$8027` substitute handler |
| メンバーチェンジ | Bank 28 `$8027` → Bank 20 roster update |
| 全日本 ベンチ换人 | Bank 20 → Bank 28 (vs Club 只有 on-field 换位) |
| 换人限制: 3人/场 | Bank 28 `$8027` — 计数器检查 |

## 赛中换人特殊逻辑

| 规则 | 代码实现 |
|------|----------|
| 全日本可从 bench 换 | Bank 20 → 显示 bench 球员列表 |
| Club 无 bench → 只能换位 | Bank 20 → 隐藏 bench 切换入口 |
| ハーフタイム (半场) | Bank 26 `$801B` match flow → half-time menu |
| 延长时间包含在内 | Bank 26 `$8015` event → 总比赛时间 |
| 最多 3 人次 | Bank 28 → 换人计数器 (per match) |

## 密码更新
比赛中途记录比分密码 (スコアメモ):
- Bank 20 → 加密当前状态 → 输出密码字符串
- 半场/换人后 → 密码内容更新
