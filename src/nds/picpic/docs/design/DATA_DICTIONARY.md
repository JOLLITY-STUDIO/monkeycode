# 静态数据字典与关系映射（DATA_DICTIONARY）

> 由 02 系统架构师输出（本体系数据建模/DB 设计职责）。定义静态数据实体、字段、关系、索引 Schema。数据关系一律来自 03/04/05 逆向分析 + 06 落地，禁止凭空设计。落地为 `data/meta/*.json`（当前在 `engine/data/` TS 模块等价物）。

## 1. 实体总览（ER 摘要）
```
SaveSlot(存档槽) 1 ── N ModeProgress(模式进度) 1 ── N StageResult(关卡结果)
                     N ── 1 Stage(谜题) 1 ── 1 Palette(调色板)
```

## 2. 实体定义

### 2.1 SaveSlot（存档槽）
| 字段 | 类型 | 约束 | 说明 | 来源 |
|------|------|------|------|------|
| index | int | 0..4，唯一 | 槽号 | ROM 0x2051D5C（5 槽） |
| name | string(≤8) | 非空（建档后） | 玩家名 | f_make/ 命名 UI |
| createdAt | timestamp | - | 建档时间 | 转写设计 |
| unlocked | map<ModeId,int> | ≥1 | 每模式已解锁关号 | ROM 解锁规则 |
| cleared | map<ModeId,int[]> | 升序、去重 | 已通关列表 | ROM 0x2051BE8 |
| bestTime | map<ModeId,map<int,int>> | 秒 | 每关最短用时 | 转写设计 |

### 2.2 Stage（谜题）
| 字段 | 类型 | 约束 | 说明 | 来源 |
|------|------|------|------|------|
| id | string | 唯一，`P<关号>` | 谜题 ID | map_d/ 文件名 |
| stage | int | 1..N（模式内唯一） | 关号 | 转换脚本排序 |
| mode | ModeId | map/lap/fap | 所属模式 | 目录 map_d/lap_d/fap_d |
| w / h | int | >0 | 宽高（格） | 转换脚本 |
| grid | Uint8Array | 4bit/像素 | 目标图案（0=空白，1..15=色号） | 转换脚本 |

### 2.3 Palette（调色板）
| 字段 | 类型 | 约束 | 说明 | 来源 |
|------|------|------|------|------|
| id | string | 唯一，`P<id>` | 调色板 key | NCLR 文件名 |
| colors | number[16] | RGB 合并值 | 16 色 | NCLR 解析 |

### 2.4 Mode / 模式
| 字段 | 类型 | 值 | 说明 | 来源 |
|------|------|-----|------|------|
| id | ModeId | 'map'/'lap'/'fap' | 模式 ID | ROM |
| resDir | string | 'map/' 等 | 关卡资源目录 | 反汇编字符串表 |
| compDir | string | 'map_comp/' 等 | 完成画面目录 | 反汇编字符串表 |
| stageCount | int | 404/400/405 | 关卡数 | 05 确认 |

## 3. 关系映射
| 关系 | 基数 | 说明 | 落地 |
|------|------|------|------|
| SaveSlot → ModeProgress | 1:N | 每槽每模式一份进度 | SaveSlot.unlocked/cleared/bestTime |
| Stage → Palette | N:1 | 每关 1 调色板（key 同名 P<id>） | stage-data.ts palette 查找 |
| State → 资源目录 | 1:1 | STATE→title/select/map_comp 等 | rom-states.ts MODES + STATE_MACHINE |

## 4. 索引 Schema（data/index.json 等价物）
当前以 TS 模块实现（Code/Data 分离入口）：
- `engine/data/puzzles/index.ts`：PUZZLES 索引（id → 模块引用）
- `engine/data/palettes/index.ts`：PALETTES 索引（P<id> → 16 色表）
- `engine/data/stage-data.ts`：运行时索引（mode → 排序后 StageEntry[] + 缓存）

未来落地 JSON：
```jsonc
// data/meta/index.json（目标结构）
{
  "puzzles":  { "map": 392, "lap": 0, "fap": 0, "source": "map_d/" },
  "palettes": { "count": 392, "keyRule": "P<id>" },
  "stages":   { "map": 404, "lap": 400, "fap": 405 }
}
```

## 5. 约束与完整性
- 谜题 grid 每像素 4bit（0..15），超出按 0 处理
- 调色板 16 色，索引 0 为背景/透明
- 已通关列表升序去重（writeSlot 保证）
- 解锁关号单调不减（≥ 当前最大通关+1）
- lap/fap 未转换（L0）时 getStageDetail 返回 null，UI 显示数据未就绪

## 6. 来源可溯
| 数据 | 来源 |
|------|------|
| 状态/地址 | 反汇编 `0x205113c` 等（见 DISASSEMBLY.md） |
| 关卡数 | rom-states.ts MODE_STAGE_COUNT（05 确认） |
| 谜题/调色板 | `roms/extracted/map_d/` + NCLR（06 转换） |
| 资源目录映射 | 反汇编字符串表 `map_comp/M%03d_LZ.bin` 等（tools/_scene_resources_result.txt） |
