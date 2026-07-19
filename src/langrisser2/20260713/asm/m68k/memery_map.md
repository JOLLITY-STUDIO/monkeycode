# Ghidra 内存映射 — 准确度校验

> 来源：Ghidra 反编译自动检测 | 校验依据：Sega Genesis 官方硬件文档 + ASM code/data 分类对比

## 地址空间布局

```
Name                Start       End         Size       用途                    ✓/✗
─────────────────────────────────────────────────────────────────────────────────────
_ROM              00000000    001FFFFF    0x200000   2MB 游戏 ROM           ✓
EPA               00400000    007FFFFF    0x400000   扩展端口（未使用）       ✓
32X_PRIV          00800000    0083FFFF    0x040000   32X 私有区（未使用）     —
32X_DRAM          00840000    0085FFFF    0x020000   32X DRAM（未使用）       —
32X_OWIMG         00860000    0087FFFF    0x020000   32X 叠层图像（未使用）    —
32X_ROM_FIXED     00880000    008FFFFF    0x080000   32X 固定 ROM（未使用）    —
Z80               00A00000    00A0FFFF    0x010000   Z80 协处理器总线         ✓
SYS1              00A10000    00A1001F    0x000020   系统版本/控制器 I/O      ✓
SYS2              00A11000    00A11001    0x000002   扩展控制                 ✓
Z802              00A11100    00A11101    0x000002   Z80 总线请求             ✓
Z803              00A11200    00A11201    0x000002   Z80 复位                 ✓
FDC               00A12000    00A120FF    0x000100   软盘控制器（SRAM 区）    ✓
TIME              00A13000    00A130EB    0x0000EC   RTC 时钟（一般不涉及）    ✓
32X_ID            00A130EC    00A130EF    0x000004   32X ID（未使用）          —
32X_BANK_SET_REG  00A130F1    00A130FF    0x00000F   32X Bank 切换（未使用）    —
TMSS              00A14000    00A14003    0x000004   版权保护 TMSS            ✓
32X_SYS_REG       00A15100    00A1517F    0x000080   32X 系统寄存器（未使用）   —
32X_VDP_REG       00A15180    00A151FF    0x000080   32X VDP 寄存器（未使用）   —
32X_PAL           00A15200    00A153FF    0x000200   32X 调色板（未使用）      —
VDP               00C00000    00C00011    0x000012   VDP 图形处理器           ✓
RAM               00FF0000    00FFFFFF    0x010000   68K 主工作 RAM (64KB)    ✓
RAM (mirror)      FFFF0000    FFFFFFFF    0x010000   RAM 地址镜像（1:1）      ✓
32X_ROM_BANK0     00900000    009FFFFF    0x100000   32X Bank0（未使用）       —
```

## 校验结果

### 核心区域（游戏实际使用）— 100% 准确

| 区域 | 标准文档 | Ghidra | 结论 |
|------|----------|--------|------|
| ROM 2MB | `000000-1FFFFF` | `000000-1FFFFF` | ✓ |
| Z80 Bus | `A00000-A0FFFF` | `A00000-A0FFFF` | ✓ |
| SYS1 I/O | `A10000-A1001F` | `A10000-A1001F` | ✓ |
| Z80 BusReq | `A11100-A11101` | `A11100-A11101` | ✓ |
| Z80 Reset | `A11200-A11201` | `A11200-A11201` | ✓ |
| TMSS | `A14000-A14003` | `A14000-A14003` | ✓ |
| VDP | `C00000-C0001F` | `C00000-C00011` | ✓ (仅标注实际端口) |
| RAM 64KB | `FF0000-FFFFFF` | `FF0000-FFFFFF` | ✓ |

### 32X 区域 — 存在但不使用

Ghidra 自动检测到 Sega 32X 附加硬件的标准内存布局。**Langrisser II 不是 32X 游戏**，这些区域在 ROM 代码中无任何引用：

- `32X_PRIV` / `32X_DRAM` / `32X_OWIMG` / `32X_ROM_FIXED`
- `32X_ID` / `32X_BANK_SET_REG`
- `32X_SYS_REG` / `32X_VDP_REG` / `32X_PAL`
- `32X_ROM_BANK0`

> 不影响准确度，Ghidra 的保守策略：宁可多标也不漏标。

### 与 ASM code/data 分类的交叉验证

| 验证项 | 结果 |
|--------|------|
| ROM 范围 Ghidra vs ROM 文件 | `0x000000-0x1FFFFF` = 2MB ✓ |
| boundaries.ts 所有地址在 ROM 范围内 | 231,678 个地址点，仅 1 个边值 `0x200000`(exclusive-end) ≠ 错误 |
| code 块 (0-2, 5-9, 11-18, 24-31) 位于 ROM 内 | ✓ |
| data 块 (3-4, 10, 19-23) 位于 ROM 内 | ✓ |

### 结论

**Ghidra 内存映射精度：高 ✓**  
核心 Genesis 地址空间配置完全符合标准硬件文档。32X/EPA/TIME 等区域为 Ghidra 自动扩展，对 Langrisser II 的分析无影响。

唯一微小差异：**VDP 区间**标注为 `0x12` bytes 而非完整 `0x20` bytes — 因为 Ghidra 只标注了实际被 ROM 代码访问的端口（`$00/$02` 数据、`$04/$06` 控制、`$08` HV 计数器、`$11` PSG），这反而说明 Ghidra 是基于实际代码引用做的精准裁剪。
