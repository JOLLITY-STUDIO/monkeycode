# 天使之翼2 (Captain Tsubasa II: Super Striker) - 6502 ASM 还原工程

本目录还原 1990 年 Tecmo 在 FC/NES 平台发布《天使之翼2》时的 6502 汇编开发工程。
基于 ROM hacking guide (Whipon) + CDL 反汇编资料，从零编写 asm 源码并编译为 .nes 文件。

## ROM 规格 (iNES Header)
- PRG ROM: 256KB (32 × 8KB banks)
- CHR ROM: 128KB (16 × 8KB)
- Mapper: 4 (MMC3)
- Mirroring: Horizontal
- PRG RAM: 8KB battery-backed

## 工程结构

```
asm/
├── README.md              # 本文档
├── build_nes.py           # 自包含 6502 汇编器 + NES 构建器
├── verify_nes.py          # py65 启动验证
├── cfg/
│   └── mmc3.cfg           # MMC3 内存布局参考 (ca65 链接器配置, 文档用)
├── include/               # 公共定义 (ca65 风格, 文档参考用)
│   ├── mmc3.inc           # MMC3 寄存器与 bank 切换宏
│   ├── ppu.inc            # PPU 寄存器与常量
│   ├── apu.inc            # APU/手柄寄存器
│   └── ram_map.inc        # 全局 RAM 地址表 (ROM Hacking Guide)
├── bank00/
│   └── bank00.s           # bank 0: 主程比赛/场景子程 (stub)
├── bank01_template.s      # bank 1 模板
└── bank31/
    └── bank31_main.s      # bank 31: Reset/NMI/IRQ/主循环 (已实现)
```

## 构建产物

```
dist/tsubasa2.nes          # 393232B = 16B header + 256KB PRG + 128KB CHR
dist/tsubasa2.sym         # 符号表 dump (66 个符号)
```

## 构建方法

```powershell
cd d:/studio/github/monkeycode/src/nes/tsubasa2
python asm/build_nes.py    # 编译所有 .s, 输出 dist/tsubasa2.nes
python asm/verify_nes.py    # 用 py65 验证 CPU 启动序列
```

## 当前实现状态

### bank31 (固定 $E000-$FFFF) - 完整实现

| 模块 | 地址 | 状态 |
|---|---|---|
| Reset handler | $E000 | ✓ SEI/CLD/APU/PPU 初始化/RAM 清零/PRG RAM 清零/MMC3 配置/调色板/CHR/游戏 RAM/主循环 |
| NMI handler | $E15E (估) | ✓ OAM DMA/调色板刷新/滚动/帧同步 |
| IRQ handler | $E19E (估) | ✓ MMC3 IRQ 关闭 |
| INIT_PALETTE | ✓ | 全黑调色板 |
| INIT_CHR | ✓ | MMC3 6 个 CHR bank |
| INIT_GAME_RAM | ✓ | ram_00ED=$0A (开场), 场景 RAM 清零 |
| MAIN_LOOP | ✓ | 帧同步 + 状态机调度 |
| READ_PADS | ✓ | 手柄1+2 读取 |
| 状态机 | ✓ | STAGE_BOOT/TITLE/PASSWORD/MEETING/MATCH/ENDING (stub) |
| 中断向量 | $FFFA | ✓ NMI/Reset/IRQ |

### 验证 (py65)

CPU 启动序列正确:
```
$E000: SEI
$E001: CLD
$E002: LDX #$40
$E004: STX $4017    ; APU frame IRQ disable
$E007: LDX #$00
$E009: STX $4015    ; APU 静音
$E00C: STX $2000    ; PPU_CTRL = 0
$E00F: STX $2001    ; PPU_MASK = 0 (黑屏)
$E012: STX $4010    ; APU_DMC_FREQ = 0
$E015: BIT $2002    ; 读 PPU_STATUS
$E018: BIT $2002    ; .wait_vbl1: 等 VBlank
$E01B: BPL $E018    ; 循环等待
```

## 自汇编器 (build_nes.py) 支持特性

- 完整 6502 指令集 (151 opcodes)
- 地址模式: implied/accumulator/immediate/zp/zpx/zpy/abs/abx/aby/ind/indx/indy/rel
- 伪指令: `.byte` `.word` `.res` `.org` `.segment`
- 常量定义: `NAME = value`
- 标号: 全局 `LABEL:` 与局部 `.label:`
- 表达式: `$XX`, `%binary`, 数字 + 标号, `+ - * /`
- 2-pass 汇编: 第一遍收集符号, 第二遍生成机器码
- bank 段: `.segment "PRG_BANK00"` ~ `"PRG_BANK31"` (32 个 8KB bank)

## 后续工作

1. 从 `_tmp_bzk_out/bank_NN/bank_NN_partMM.asm` 反汇编文件逐 bank 还原真实代码
2. 优先级: bank0 (主程比赛) → bank2 (标题) → bank7 (比赛配置) → bank30 (NMI 渲染) → 其余
3. CHR 数据: 已从 `_tmp_bzk_out/CHR_ROM.chr` 加载, 验证图像正确性
4. MMC3 IRQ: 实现 scanline 中断做横向滚动切换
