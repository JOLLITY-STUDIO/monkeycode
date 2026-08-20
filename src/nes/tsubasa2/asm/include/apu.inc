; ============================================================
; include/apu.inc
; APU + 手柄寄存器定义
; ============================================================

; --- APU 寄存器 ($4000-$4017) ---
APU_SQ1_VOL     = $4000
APU_SQ1_SWEEP   = $4001
APU_SQ1_LO      = $4002
APU_SQ1_HI      = $4003
APU_SQ2_VOL     = $4004
APU_SQ2_SWEEP   = $4005
APU_SQ2_LO      = $4006
APU_SQ2_HI      = $4007
APU_TRI_LINEAR  = $4008
APU_TRI_LO      = $400A
APU_TRI_HI      = $400B
APU_NOISE_VOL   = $400C
APU_NOISE_LO    = $400E
APU_NOISE_HI    = $400F
APU_DMC_FREQ    = $4010
APU_DMC_RAW     = $4011
APU_DMC_START   = $4012
APU_DMC_LEN     = $4013
APU_STATUS      = $4015   ; RW: 声道开关
APU_FRAME       = $4017   ; W: 帧计数器模式 + IRQ

; --- 手柄 ($4016/$4017) ---
JOY1            = $4016   ; W: strobe ; R: pad1 状态 (bit0)
JOY2            = $4017   ; R: pad2 状态 (bit0)

; --- 手柄按键位 (LSB first) ---
JOY_A           = %00000001
JOY_B           = %00000010
JOY_SELECT      = %00000100
JOY_START       = %00001000
JOY_UP          = %00010000
JOY_DOWN        = %00100000
JOY_LEFT        = %01000000
JOY_RIGHT       = %10000000

; --- 读取手柄1 到 A 寄存器 ---
.macro READ_JOY1
    lda #$01
    sta JOY1
    lda #$00
    sta JOY1            ; strobe
    ldx #$08            ; 8 buttons
@@:
    lda JOY1
    lsr a
    rol <pad1_tmp       ; (外部定义)
    dex
    bne @-
    lda <pad1_tmp
.endmacro
