# 反汇编 / 函数表（DISASSEMBLY）

> 由 04 反汇编/代码分析师输出。数据来源：`tools/arm9-full.dis.txt`（4.16MB）、`tools/arm9-functions.tsv`、`tools/core_disasm*.txt`、`_dump_funcs_out.txt`。

## 1. 分析方法
- 工具：`tools/disasm_full.py` / `disasm_entry.py` / `disasm_core.py` / `disasm_main_full.py`
- 输入：`roms/extracted/_system/arm9.bin`
- 输出：ARM 反汇编文本 + 函数表 TSV + 场景引用分析

## 2. 函数表（节选，完整见 arm9-functions.tsv）
| 地址 | 函数/用途 |
|------|-----------|
| `0x205113c` | 主调度器（SUBSTATE 双层分派） |
| `0x205171c` | SUBSTATE=3 分派 |
| `0x2052a00` | setState：exit 回调 → 写 STATE → enter 回调 |
| `0x2052a64` | 选关内部状态分派（STATE>9） |
| `0x2053bf4` | 模式初始化（RNG） |
| `0x205418c` | 模式初始化续 |
| `0x2051be8` | 存档写槽 |
| `0x2051d5c` | 5 槽初始化 |
| `0x2055bc8` | GAME SETUP（游玩装配） |
| `0x2055d9c` | 完成检查（返回 2=完成） |
| `0x20558f0` | 路径/场景初始化 |

## 3. 状态机相关交叉引用
- 全局基址 `0x020DEB70` 字段读写点集中在 `0x205113c`~`0x2055d9c` 区间
- 状态常量与地址映射 → 见 `docs/reverse/STATE_MACHINE.md`

## 4. 汇编 → TS 转写对照（07 转写）
| ROM 地址 | TS 文件/符号 |
|----------|-------------|
| `0x205113c` | `engine.ts` `tick()`（SUBSTATE→STATE 分派） |
| `0x2052a00` | `engine.ts` `setState()` |
| `0x020DEB70` | `rom-states.ts` `GBL` |
| `0x2055bc8` | `state-select-scene.ts` START → `GameScene` 装配 |
| `0x2055d9c` | `engine.ts` `checkCompleteResult()` |
| `0x2051be8`/`0x2051d5c` | `engine.ts` `writeSlot()`/`loadSlotsFromStorageSafe()` |

## 5. 已知 BUG/偏差
- map 关卡 404→392：`map_d/` 原始单元存在损坏，非反汇编问题（记录于 BUGS.md）
- 音频 Bank 分析属 NES 项目（见记忆），与本 NDS 项目无关
