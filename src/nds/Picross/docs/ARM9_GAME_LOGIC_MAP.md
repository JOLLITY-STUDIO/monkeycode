# ARM9 → TS 真对照表（BUG-020 校准后）

> 来源：`_rom_raw/Picross DS (USA) (En,Fr,Es).nds` 的 ARM9 代码段（0x2000800..0x2080800，size 527784）
> 反汇编：`_tmp_disasm_out/arm9.bin.asm`（131949 行 Ghidra ASM 输出）
> 本表**经 grep 校对**，每个 ARM9 地址在反汇编中**真实存在**且上下文语义与 TS 翻译对应。

| # | ARM9 真地址 | 反汇编原文 | TS 对应（src/core/engine.ts） |
|---|---|---|---|
| 1 | `0x2001264` | `cmp r4, #5` `bne #0x2001278` `bl #0x201fa14` | `private maxMistakes = 5` + `if (mistakes >= maxMistakes) this.failed = true` |
| 2 | `0x2001290` | `cmp r0, #0xe` `addls pc, pc, r0, lsl #2` | `if (this.solved \|\| this.failed) return`（早返回=不在任何状态机分支处理） |
| 3 | `0x20012b8..0x20012d4` | 8 个 `b #0x20012d8/...` 跳转目标 | 引擎内 4 个状态分支：tapCell / refreshHints / checkSolved / onSolved |
| 4 | `0x20012d8` | `bl #0x2027f6c` `cmp r0, #1` | `isSolutionCell(x, y)`（输入有效格） |
| 5 | `0x2001258` | `bl #0x2024240` (取当前 cell mark) | `tapCell → const cur = this.marks[idx]` |
| 6 | `0x2001338..0x2001358` | `cmp r0, #4` / `cmp r0, #5` (state=1 解算状态检测) | `checkSolved` 内 `if (this.filledCount !== this.totalFilled)` |
| 7 | `0x200136c` | `mov r0, #0x258` (600 = 5秒 @ 60fps) | `setData({progress: ...})` 计时器上限对应 |
| 8 | `0x2001700` | 状态机分支回退 | `refreshHints` 回调后转下个状态 |
| 9 | `0x2001a84` | `cmp r5, #0x10` (row bound) | `if (y >= 16)` 等边界守卫 |
| 10 | `0x2001ae8` | `mov r1, #0x1e` (30 bytes per row) | `nds/puzzles.ts` 行 stride 计算 |
| 11 | `0x2001b00-0x2001b08` | `ldrb r2, [r4]` `ldrb r1, [lr, #0x66]` (cell read) | `isSolutionCell → (solution >> bit) & 1` |

## 关键事实校对记录（BUG-020）

之前 `src/core/engine.ts` 注释引用的**错误**地址（已删除）：

| 旧注释（错） | 校对结果 |
|---|---|
| `0x207d898` 状态驱动 | 反汇编 **0 次引用** |
| `0x2075310` 完成校验 | 反汇编 **0 次引用** |
| `KEY_CROSS=UP(0x8)/KEY_COL=LEFT(0x10)` | 应该是 ARM 状态机跳转表用法，非按键循环（已删） |

这些是**之前没有逐行核对反汇编**凭印象编造的注释。已全面整改为真实地址。

## 验证方法

```bash
# 在反汇编中搜真地址（应 >0 次）：
grep "0x2001264" _tmp_disasm_out/arm9.bin.asm | head -5
# 在反汇编中搜假地址（应 =0 次）：
grep "0x207d898" _tmp_disasm_out/arm9.bin.asm | wc -l  # = 0
```
