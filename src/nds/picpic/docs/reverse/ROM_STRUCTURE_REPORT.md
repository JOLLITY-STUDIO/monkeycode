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
| `0x2055d9c` | 完成检查（`[game+0xc]` 标志读取，result==2 → achieve） |
| `0x2051be8` / `0x2051d5c` | 存档写槽 / 槽位初始化（欧版实为 3 槽，见 BUG-007） |
| `0x2034cf0` | 模式路径构造器（mode 0/1/2 → map_comp/lap_comp/fap_comp 三套 `%03d` 路径） |
| `0x2034bac` | 模式选择 UI 构建（No_window_map/lap/fap 三窗口） |
| `0x204d31c` | 谜题加载器（NiFi 读档 → 瓦片解码 → VRAM 上传） |
| `0x204d18c` | 谜题号段门槛（仅 lap/fap 关卡选择时校验，map 直通） |

> 模式身份完整证据链见 `MODE_CONFIRMATION.md`。

## 6. 关卡规模（真实数据，来自 05 确认 + 06 转换）
| 模式 | 关卡数 | 已转换 | 数据源 | 教学关 |
|------|--------|--------|--------|--------|
| map | 404 | 392 | `map_d/` | - |
| lap | 400 | 407 | `lap_d/`（`1_dat`~`5_dat` 分级 + `tutorial`） | 7（lap_00~06） |
| fap | 405 | 405 | `fap_d/` | 5（fap_00~04） |

## 7. 关卡数据格式（06 转换确认，tools/convert_lap_fap.py）
### 7.1 LAP（连线模式）
- 26 字节头：`[0]=H, [1]=W`，主体 `data[26:26+H*W]` 每格 1 字节
- 值如 01/09/11/19/21/29 等：低 4 位为格子内容，**bit3~bit6 为方向连接编码**（路径走向）
- 难度分组：`1_dat`=50、`2_dat`=115、`3_dat`=130、`4_dat`=60、`5_dat`=45、`tutorial`=7
- 转换：去重值→0..15 稳定映射（value_map），产出 `puzzles/lap_batch_1..9.ts` + `lap_index.ts`（导出 `LAP_PUZZLES`）

### 7.2 FAP（数格子模式）
- 2 字节头：`[0]=H, [1]=W`，主体自偏移 2 起 **nibble 打包**（低半字节在前，2 格/字节）
- 尾部 bitmap 恰为 `floor(W×H/8)+1` 字节（15×15→144B，20×20→253B，25×25→394B）
- 值 0=空，1~9=提示数字，15=填充色（占位后需真实调色板）
- 转换：产出 `puzzles/fap_batch_1..9.ts` + `fap_index.ts`（导出 `FAP_PUZZLES`）

## 8. 已知问题/未决
- map_d 部分单元损坏/空（404→392 有效），转换脚本已过滤
- lap/fap 真实调色板未从 ROM 转换（暂用默认 16 色 DEFAULT_PALETTE）
- fap 1~9 为提示数字：真实游戏绘制数字而非色块，需渲染层增强（见 BUG-008）
- lap 排序为纯数字 ID 排序，与 ROM 内部按难度 1~5 分组的顺序表可能不同（见 BUG-009）
- Nurie_sd.sdat 音频未解析
