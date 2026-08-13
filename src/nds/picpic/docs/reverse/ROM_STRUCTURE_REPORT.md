# ROM 结构分析报告（ROM_STRUCTURE_REPORT）

> 由 03 ROM 结构分析师输出。数据来源：`roms/extracted/` + `tools/` 分析脚本。来源可溯。

## 1. ROM 概览
| 项目 | 值 |
|------|-----|
| 游戏 | Pic Pic（ピクピク）NDS |
| 主文件 | `roms/extracted/Child.srl`（1.13MB） |
| 音效档案 | `Nurie_sd.sdat`（1.74MB） |
| Header | `_system/header.bin`（512B） |
| ARM9 主逻辑 | `_system/arm9.bin`（586.52KB） |
| ARM7 辅助固件 | `_system/arm7.bin`（162.44KB） |

## 2. 文件系统（Nitfs 目录树）
```
roms/extracted/
├── Child.srl / Nurie_sd.sdat / banner.nbfc / banner.nbfp
├── _system/   (header/arm9/arm7)
├── title/     (标题画面)
├── f_make/    (建档命名 UI: btn_* / file_* / clr_res_* 等)
├── select/    (选关窗口)
├── main/      (主流程公共)
├── map/ lap/ fap/           (三大模式关卡图形)
├── map_d/ lap_d/ fap_d/     (关卡数据解包)
├── map_comp/ lap_comp/ fap_comp/ (通关完成画面)
├── clear/     (清除动画 kami_ce/kami_cg/kami_pc)
├── option/ tutorial/ taiken/ kakuninn/
```

## 3. 资源格式说明（NDS 标准）
| 后缀 | 含义 | 说明 |
|------|------|------|
| `.NCGR` | 字符图形（瓦片） | 4bpp 瓦片数据 |
| `.NCLR` | 调色板 | 16 色/256 色索引 |
| `.NSCR` | 屏幕映射 | 瓦片布局 |
| `_LZ.bin` | LZ 压缩数据 | 运行时 TS 解码器解压 |
| `.nbfc/.nbfp` | banner 字体 | 图标/字库 |

## 4. 全局结构基址（04 反汇编交叉确认）
- `0x020DEB70`：全局结构
  - `[+0x0c]` SCENE ID
  - `[+0x14]` SUBSTATE
  - `[+0x28]` STATE
  - `[+0x34]` 回调表（enter/exit）
  - `[+0x38]` 状态附加参数
  - `[+0x3c]` 场景 widget 尺寸

## 5. 关键例程（地址 → 用途）
| 地址 | 用途 |
|------|------|
| `0x205113c` | 主调度器（双层分派：SUBSTATE→STATE） |
| `0x205171c` | SUBSTATE=3 再分派（0x16~0x19） |
| `0x2052a00` | 状态切换（exit→写STATE→enter） |
| `0x2053bf4` / `0x205418c` | 模式初始化（RNG/模式） |
| `0x2055bc8` | GAME SETUP（游玩场景装配） |
| `0x2055d9c` | 完成检查（result==2 → achieve） |
| `0x2051be8` / `0x2051d5c` | 存档写槽 / 5 槽初始化 |

## 6. 关卡规模（真实数据，来自 05 确认 + 06 转换）
| 模式 | 关卡数 | 已转换 | 数据源 |
|------|--------|--------|--------|
| map | 404 | 392 | `map_d/` |
| lap | 400 | 0 | `lap_d/` |
| fap | 405 | 0 | `fap_d/` |

## 7. 已知问题/未决
- map_d 部分单元损坏/空（404→392 有效），转换脚本已过滤
- lap/fap 未转换（L0）
- Nurie_sd.sdat 音频未解析
