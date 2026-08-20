; ============================================================
; bank31/bank31.s
; bank 31 顶层文件 - 固定区 ($E000-$FFFF)
;
; 通过 .include 把按功能拆分的子文件合并:
;   ram_const.s   - 常量定义 (RAM 地址/寄存器/状态枚举)
;   reset.s       - RESET_HANDLER (CPU 上电入口)
;   nmi.s         - NMI_HANDLER (每帧 VBlank)
;   irq.s         - IRQ_HANDLER (MMC3 scanline)
;   init.s        - INIT_PALETTE / INIT_CHR / INIT_GAME_RAM
;   main_loop.s   - MAIN_LOOP / READ_PADS / 状态机
;   vectors.s     - 中断向量表 @ $FFFA
; ============================================================

.include "ram_const.s"
.include "reset.s"
.include "nmi.s"
.include "irq.s"
.include "init.s"
.include "main_loop.s"
.include "vectors.s"
