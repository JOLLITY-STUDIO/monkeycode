; ============================================================
; bank31/irq.s
; IRQ 处理器 - MMC3 scanline 中断
;
; 天使之翼2 用 IRQ 实现 horizontal scroll mid-screen 切换
; (例如对话窗口的下半屏滚动)
; 此处简化实现: 关闭 IRQ 后返回
; ============================================================

.segment "PRG_BANK31"

IRQ_HANDLER:
    PHA
    ; 关闭 MMC3 IRQ (命令 5 = IRQ disable, 数据 0)
    LDA #$05
    STA MMC3_BANK_SEL
    LDA #$00
    STA MMC3_BANK_DATA
    PLA
    RTI
