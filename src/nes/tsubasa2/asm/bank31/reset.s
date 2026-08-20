; ============================================================
; bank31/reset.s
; RESET 入口 - CPU 上电/复位执行的第一条指令
; 位于 $E000 (bank31 固定区起点)
; ============================================================

.segment "PRG_BANK31"

.org $E000
RESET_HANDLER:
    ; --- 关中断, 清十进制 ---
    SEI
    CLD

    ; --- 关 APU 帧中断, 静音所有声道 ---
    LDX #$40
    STX APU_FRAME       ; $4017 = $40 → 禁用 frame IRQ
    LDX #$00
    STX APU_STATUS      ; $4015 = 0 → 关闭所有声道
    STX PPU_CTRL        ; $2000 = 0 → 关闭 NMI
    STX PPU_MASK        ; $2001 = 0 → 黑屏
    STX APU_DMC_FREQ    ; $4010 = 0 → 关闭 DMC

    ; --- 等待 PPU 稳定 (2 个 VBlank) ---
    BIT PPU_STATUS      ; 复位 PPU_STATUS latch
.wait_vbl1:
    BIT PPU_STATUS
    BPL .wait_vbl1
.wait_vbl2:
    BIT PPU_STATUS
    BPL .wait_vbl2

    ; --- 清零内部 RAM $0000-$07FF ---
    LDX #$00
    LDA #$00
.clear_ram:
    STA $0000,X
    STA $0100,X
    STA $0200,X
    STA $0300,X
    STA $0400,X
    STA $0500,X
    STA $0600,X
    STA $0700,X
    INX
    BNE .clear_ram

    ; --- 清零 PRG RAM $6000-$7FFF (battery-backed) ---
    LDA #$80
    STA MMC3_PRG_RAM    ; 启用写
    LDA #$00
    STA MMC3_PRG_RAM
    LDX #$00
    LDA #$00
.clear_prg_ram:
    STA $6000,X
    STA $6100,X
    STA $6200,X
    STA $6300,X
    STA $6400,X
    STA $6500,X
    STA $6600,X
    STA $6700,X
    STA $6800,X
    STA $6900,X
    STA $6A00,X
    STA $6B00,X
    STA $6C00,X
    STA $6D00,X
    STA $6E00,X
    STA $6F00,X
    STA $7000,X
    STA $7100,X
    STA $7200,X
    STA $7300,X
    STA $7400,X
    STA $7500,X
    STA $7600,X
    STA $7700,X
    STA $7800,X
    STA $7900,X
    STA $7A00,X
    STA $7B00,X
    STA $7C00,X
    STA $7D00,X
    STA $7E00,X
    STA $7F00,X
    INX
    BNE .clear_prg_ram

    ; --- 设置 MMC3 初始 PRG bank ---
    ;   R6 = bank0 → $8000-$9FFF
    ;   R7 = bank2 → $A000-$BFFF
    ;   $C000-$DFFF = bank30 (固定)
    ;   $E000-$FFFF = bank31 (本文件, 固定)
    LDA #$00
    STA MMC3_BANK_SEL
    LDA #$00
    STA MMC3_BANK_DATA

    LDA #$01
    STA MMC3_BANK_SEL
    LDA #$02
    STA MMC3_BANK_DATA

    ; --- 设置水平镜像 (天使之翼2 默认) ---
    LDA #$07
    STA MMC3_CHR_SEL
    LDA #$01
    STA MMC3_CHR_DATA

    ; --- 初始化子程 ---
    JSR INIT_PALETTE
    JSR INIT_CHR
    JSR INIT_GAME_RAM

    ; --- 设置栈 ---
    LDX #$FD
    TXS

    ; --- 启用 NMI + 8x16 精灵 + BG pattern $1000 ---
    LDA PPU_STATUS
    LDA #%10001000
    STA PPU_CTRL

    ; --- 启用显示 (BG + SPR + 不裁剪) ---
    LDA #%00011110
    STA PPU_MASK

    ; --- 进入主循环 ---
    JMP MAIN_LOOP
