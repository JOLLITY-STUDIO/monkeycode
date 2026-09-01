# numclo*.data 格式完全破解 (V0.17.10)

> Essential Sudoku DS — Picture Logic / 图画谜题模式
> 来源: 15 个 numclo*.data 字节级分析 + numclo.srl ARM9 反汇编验证
> 解码器: `scripts/decode_numclo_full.py` (ROM → JSON)
> TS catalog 再生: `scripts/gen_numclo_ts_from_json.cjs` (JSON → numclo_puzzles.ts)

## 1. 概要

| 字段             | 值                                           |
| ---------------- | -------------------------------------------- |
| 文件数           | 15 (numclo0-9, numclo_00-03, numclo_tu)      |
| 单文件 size      | 7710 B (main) / 87 B (tutorial)              |
| 平均每文件 puzzles | 100 (main) / 1 (tutorial)                   |
| 总 puzzles       | **1401** (14×100 main + 1 tutorial)          |
| 网格尺寸         | **15 × 15**                                  |
| 每 cell 颜色数   | **6** (0=empty/背景, 1..5=调色板颜色)         |
| Format           | Custom Imagineer base-6 packed bitmap        |

## 2. 文件头

```
bytes 0..9   = "str_numclo" ASCII magic
byte 10      = 0xAA (numclo0..9, numclo_00..03) OR 0xFF (numclo_tu)
```

## 3. Puzzle Record

每个 puzzle 占用 **77 bytes**：

```
bytes 0..75  = 76 byte body (base-6 packed cell data)
byte 76      = separator (值可变: 0xAA / 0xDD / 0xFF, 仅作记录分隔)
```

Main files 布局：
- 10 byte magic + 1 byte init separator
- 99 × (76 byte body + 1 byte separator)
- 1 × 76 byte body (最后一个 puzzle 无 trailing separator)
- 总计: 11 + 99×77 + 76 = **7710 bytes** ✓

Tutorial 文件：
- 10 byte magic + 1 byte 0xFF
- 1 × 76 byte body
- 总计: **87 bytes** ✓

## 4. Body 解码 (Base-6 Packed Bitmap)

每个 body byte 编码 3 个 cell 颜色值：

```
byte = c0 + 6*c1 + 36*c2,  ci ∈ [0..5]
```

解码步骤：
1. 对每个 body byte 计算 `(b % 6)`, `((b / 6) % 6)`, `((b / 36) % 6)`
2. 76 bytes → 228 values
3. 取前 **225 个值** = 15×15 网格（row-major）

颜色语义（NDS 原始调色板，H5 可自由映射）：
- `0` = empty / 背景
- `1..5` = 5 种画笔颜色（对应 numclo_00.nbm 中红黄蓝绿紫/黑等调色按钮）

## 5. 谜底名称 (numclo_seikai00-09.dat)

`numclo0.data` ~ `numclo9.data` 各对应一个 `numclo_seikaiNN.dat` 答案文件。

答案文件是纯文本，每行一个动物名，行尾 `\r\n`：

```
Crab
Cat
Raccoon Dog
Pig
Rabbit
...
```

每文件 100 行，按 index 0..99 与 puzzle 一一对应。

> ⚠️ NUL padding 坑 (V0.17.11 修复):
> 答案文件按 sector 对齐填充 NUL (FAT size ≈ 1024 B/sector)，
> 用 FAT/FNT 表的真实 size 读取后必须截断到第一个 `\x00`，
> 否则 `numclo_answers.ts` 会出现 `\u0000` 垃圾条目。
> 解码器 `load_seikai_names()` 现在从 `rom-data/fnt-mapping.json`
> 动态读取 offset + size，再 `data.find(b'\x00')` 截断。

## 6. V0.17.11 产物

- `rom-data/extracted/numclo-puzzles.json` — 完整 1525 puzzles JSON
- `miniprogram/utils/sudoku/numclo_puzzles.ts` — TypeScript catalog + unpack 函数
- `miniprogram/utils/sudoku/numclo_answers.ts` — numclo0-9 谜底名称表 (NUL 截断干净版)
- `miniprogram/utils/sudoku/picture_game_service.ts` — 图画谜题游戏会话服务
- `miniprogram/pages/picture/` — 图画谜题玩法页面 (15×15 上色/调色板/完成检测)
- `miniprogram/app.json` — 注册 `pages/picture/picture`
- `pages/index` — 新增 "🎨 图画谜题" 入口 (onOpenPicture)

## 7. 与 V0.6.0 旧推断的差异

| 项目            | V0.6.0 (错误)                    | V0.17.10 (正确)                  |
| --------------- | -------------------------------- | -------------------------------- |
| 玩法            | 猜测为 Sudoku 变体               | Picture Logic / 图画谜题          |
| 网格            | 9×9                              | **15×15**                        |
| 数据语义        | low nibble = 数独数字 0-9        | base-6 packed 3 cells/byte       |
| high nibble     | 待解状态位                       | 根本不存在状态位，是 base-6 组合  |
| separator       | 0xAA/0xFF                        | 0xAA/0xDD/0xFF (值可变)          |
| body 长度       | variable / 假设 76               | **固定 76 bytes**                |
| 答案文件        | 未知                             | numclo_seikaiNN.dat 动物名列表    |

## 8. 验证

已批量生成 1525 张 15×15 网格预览图（`work/numclo_brute3/`），例如：
- numclo0.data_000 = Crab（螃蟹）
- numclo0.data_001 = Cat（猫）
- numclo0.data_026 = Tiger（老虎）
- numclo0.data_099 = Puffer Fish（河豚）

所有图案均与谜底名称一致，证明解码正确。
