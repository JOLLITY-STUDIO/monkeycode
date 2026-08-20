; ============================================================
; bank31/vectors.s
; 中断向量表 (位于 $FFFA-$FFFF, bank31 末尾 6 字节)
;
; NES CPU 在以下事件时读取这些向量:
;   $FFFA-$FFFB: NMI   - PPU VBlank 触发
;   $FFFC-$FFFD: Reset - 上电/复位
;   $FFFE-$FFFF: IRQ   - MMC3 scanline / BRK 指令
; ============================================================

.segment "PRG_BANK31"

.org $FFFA
    .word NMI_HANDLER     ; $FFFA: NMI 入口
    .word RESET_HANDLER   ; $FFFC: Reset 入口
    .word IRQ_HANDLER     ; $FFFE: IRQ 入口
