; ============================================================
; bank31/nmi.s
; NMI 处理器 - 每帧 VBlank 时由 PPU 触发
; 职责:
;   1. OAM DMA: 把 $0200-$02FF 传送到 PPU 精灵内存
;   2. 调色板更新 (如果 pal_dirty=1)
;   3. 滚动复位 (0,0)
;   4. 帧同步标志 nmi_flag → 主循环
; ============================================================

.segment "PRG_BANK31"

NMI_HANDLER:
    ; --- 保存寄存器 (中断可能打断任何代码) ---
    PHA
    TXA
    PHA
    TYA
    PHA

    ; --- OAM DMA: 传送 $0200-$02FF 到 PPU ---
    LDA #$02
    STA OAM_DMA          ; 写 $4014 触发 256B DMA

    ; --- 调色板更新 (脏标志) ---
    LDA pal_dirty
    BEQ .skip_pal

    ; 写 PPU 调色板 $3F00 (BG 16B + SPR 16B)
    LDA PPU_STATUS       ; 复位地址 latch
    LDA #$3F
    STA PPU_ADDR
    LDA #$00
    STA PPU_ADDR
    LDX #$00
.pal_loop:
    LDA pal_bg_ram,X
    STA PPU_DATA
    INX
    CPX #$10
    BNE .pal_loop
.pal_spr:
    LDA pal_spr_ram,X
    STA PPU_DATA
    INX
    CPX #$10
    BNE .pal_spr

    ; 清脏标志
    LDA #$00
    STA pal_dirty
.skip_pal:

    ; --- 滚动复位到 (0, 0) ---
    LDA PPU_STATUS       ; 复位 latch
    LDA #$00
    STA PPU_SCROLL
    STA PPU_SCROLL

    ; --- 帧同步标志 ---
    INC nmi_counter
    LDA nmi_counter
    STA nmi_flag          ; 主循环等待此标志

    ; --- 恢复寄存器 ---
    PLA
    TAY
    PLA
    TAX
    PLA
    RTI
