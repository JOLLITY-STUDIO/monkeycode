# 第4章: チームデータを見てみよう (Team Data / 队伍数据)

> 说明书原文: フォーメーション/ディフェンスタイプ/チェンジ/レベル

## 对应的 Bank 代码

| Bank | 文件 | 作用 |
|:---:|------|------|
| **20** | `bank-20-team-select-code.ts` | **队伍选择 UI** — 阵容编辑/菜单 |
| **27** | `bank-27-player-data-code.ts` | **球员数据** — 名称/属性记录查询 |
| **28** | `bank-28-player-attrs-code.ts` | **阵型引擎** — 阵型选择/换人/属性计算 |
| **29** | `bank-29-player-value-code.ts` | 数值矩阵 — 球员数值行/场地位置属性 |
| 19 | `bank-19-script-engine-code.ts` | 查找表 — metatile映射/碰撞/调色板 |

## 子界面 & 代码映射

### (1) フォーメーション (阵型 4种)

| 阵型 | 阵型 ID | 代码 |
|------|:---:|------|
| **4-3-3** | 0 | Bank 28 `$8003` formation select → `$801B` formation loader |
| **4-4-2** | 1 | Bank 28 阵型数据 (Bank 28 $9460) |
| **3-5-2** | 2 | Bank 28 阵型数据 |
| **ブラジルタイプ** | 3 | Bank 28 巴西型变体 |

**Bank 28 `$801B` formation loader** 从 Bank 29 读取阵型站位坐标数据。

### (2) ディフェンスタイプ (防守类型 3种)

| 类型 | 说明 | 代码 |
|------|------|------|
| **ノーマル** | 普通 | Bank 28 → 属性分发 `$800C` |
| **プレス** | 逼抢 | Bank 26 → 防守 AI 策略 |
| **カウンター** | 防反 | Bank 26 → 防守 AI 策略 |

### (3) チェンジ (变更)

| 操作 | 代码 |
|------|------|
| **ポジションチェンジ** | Bank 28 `$8027` substitute handler → `$802A` formation check |
| **メンバーチェンジ** | Bank 28 → Bank 20 roster update → 读取 Bank 27 球员表 |
| 限制 (全日本3人/场) | Bank 28 `$8027` — 换人计数器检查 |

### (4) レベル (等级/能力值)

| 查看内容 | 数据来源 |
|----------|----------|
| 球员名称 | Bank 27 `$801C` 球员名称表 |
| 能力值 (射门/速度/技术等) | Bank 27 — 球员属性记录 (16字节格式) |
| ガッツ (体力) | Bank 30 运行时状态 (初始值从 Bank 29) |
| 必殺技 | Bank 27 数据 → Bank 19 查找表 |
| レベルアップ | Bank 28 `$8015` 球员属性初始化 | Bank 29 数值曲线 |

## 球员属性记录格式 (Bank 27 + Bank 28)
```
16 字节/球员:
  [0]:   号码 (1-99)
  [1-4]: 名字 (4字节 tile编码)
  [5]:   位置 (0=GK, 1=DF, 2=MF, 3=FW)
  [6]:   射门力
  [7]:   速度
  [8]:   技术
  [9]:   体力
  [10]:  传球
  [11]:  拦截
  [12]:  头球
  [13]:  守门
  [14-15]: 保留/特殊技能标志
```

## 数据模型
- `data-model-schema.ts`: PlayerBaseRecord, TeamRecord, FormationRecord
- `data-extractor.ts`: parseAttrRecords(), parsePlayerNamesByTeam()
- `RomDatabase.ts`: getPlayer(), getTeam(), getFormation()
