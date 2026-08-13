# 资源索引 / 单元清单（RESOURCE_INDEX）

> 由 06 资源提取工程师输出。ROM 资源 → 解包单元 → 转写产物映射。来源可溯（源偏移记录于转换脚本）。

## 1. 资源目录清单（roms/extracted/）
| 目录 | 内容 | 状态 |
|------|------|------|
| title/ | 标题画面 | 已提取目录，未解码 |
| f_make/ | 建档命名 UI（btn_*/file_*/clr_res_*，NCLR/NCER/NSCR/LZ） | 已提取目录 |
| select/ | 选关窗口 | 已提取目录 |
| map/ lap/ fap/ | 三大模式关卡图形 | 已提取目录 |
| map_d/ lap_d/ fap_d/ | 关卡数据（解包） | map_d 已转换；lap/fap 待转换 |
| map_comp/ lap_comp/ fap_comp/ | 通关完成画面 | 已提取目录 |
| clear/ | 清除动画 kami_* | 已提取目录 |
| option/ tutorial/ taiken/ kakuninn/ | 设置/教学/体验/确认 | 已提取目录 |
| _system/ | header.bin + arm9.bin + arm7.bin | 已反汇编 |

## 2. 已转写数据单元（miniprogram/engine/data/）
### 调色板 `data/palettes/`
| 文件 | 内容 | 就绪度 |
|------|------|--------|
| index.ts | PALETTES 索引（key `P<id>` → 16 色 RGB 表） | L2 |
| pal_batch_1..8.ts | 8 批调色板数据 | L2 |

### 谜题 `data/puzzles/`
| 文件 | 内容 | 就绪度 |
|------|------|--------|
| index.ts | PUZZLES 索引（P4000101...P 各关） | L2 |
| map_batch_1..9.ts | 392 个有效 map 谜题（grid 4bit/像素） | L2 |

### 关卡数据访问 `data/stage-data.ts`
- `getStagesForMode(mode)` / `getStageDetail(mode, stage)` / `getAvailableStageCount(mode)`
- SOURCES：map 已接入；lap/fap 为空（待转换）

## 3. 转换工具（tools/）
| 工具 | 用途 |
|------|------|
| convert_maps.py / convert_maps2.py | map_d → 谜题 TS（含有效性过滤 404→392） |
| convert_palettes.py | NCLR → 16 色 RGB 表 TS |
| convert_completions.py | 完成画面解析（开发中） |
| debug_comp.py / debug_comp2.py | 完成画面校验 |

## 4. 单元 ID 规则
- 谜题 ID：`P<关号>`（如 `P4000101` = 关号 4000101）
- 调色板 key：`P<id>`（与谜题 ID 对应，NCLR 同名）
- map 关号范围：4000001~4000404（有效 392 个）

## 5. 就绪度分级
| 资源 | L0 未提取 | L1 调色板 | L2 数据/解码 | L3 像素级 |
|------|:---:|:---:|:---:|:---:|
| map 谜题+调色板 | | | ✅ | ⏳ |
| lap 谜题 | ✅ | | | |
| fap 谜题 | ✅ | | | |
| UI/场景图形（title/f_make/select 等） | ✅ | | | |
| 音频 Nurie_sd.sdat | ✅ | | | |

## 6. 待办
- [ ] lap_d/ fap_d/ 转换（复用 convert_maps 管线）
- [ ] title/f_make/select UI 资源解码为可渲染单元
- [ ] Nurie_sd.sdat 音频解析
