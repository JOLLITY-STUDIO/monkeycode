; ============================================================
; include/mmc3.inc
; MMC3 Mapper 4 - 寄存器定义与 bank 切换宏
; ============================================================

; --- MMC3 寄存器 ($8000-$FFFF 映射区) ---
PPU_BANK_SELECT    = $8000   ; R6/R7 选择 + 命令
PPU_BANK_DATA      = $8001   ; 数据
PRG_RAM_PROTECT    = $A001   ; PRG RAM 写保护
CHR_BANK_SELECT    = $A000   ; 命令
CHR_BANK_DATA      = $A001   ; 数据

; --- PRG Bank 选择命令 (写 $8000 高 6 位) ---
PRG_CMD_SWAP_8000  = %00000000   ; R6: 切换 $8000-$9FFF
PRG_CMD_SWAP_A000  = %00000001   ; R7: 切换 $A000-$BFFF
PRG_CMD_SWAP_C000  = %00000010   ; R6 swap mode (在 $C000-$DFFF)
PRG_CMD_IRQ_LATCH  = %00000011
PRG_CMD_IRQ_RELOAD  = %00000100
PRG_CMD_IRQ_DISABLE = %00000101   ; 数据位 = disable
PRG_CMD_IRQ_ENABLE  = %00000110
PRG_CMD_MIRRORING   = %00000111

; --- RAM (PRG RAM $6000-$7FFF) ---
PRG_RAM             = $6000

; --- 切换 bank N 到 $8000 窗口 ($8000-$9FFF) ---
; 入口: A = bank index (0-31)
.macro SETBANK_8000
    sta PPU_BANK_DATA          ; 防御性写入
    pha
    lda #PRG_CMD_SWAP_8000
    sta PPU_BANK_SELECT
    pla
    sta PPU_BANK_DATA
.endmacro

; --- 切换 bank N 到 $A000 窗口 ($A000-$BFFF) ---
; 入口: A = bank index (0-31)
.macro SETBANK_A000
    pha
    lda #PRG_CMD_SWAP_A000
    sta PPU_BANK_SELECT
    pla
    sta PPU_BANK_DATA
.endmacro

; --- 启用 PRG RAM 写 ---
.macro ENABLE_PRG_RAM
    lda #$80
    sta PRG_RAM_PROTECT
    lda #$00
    sta PRG_RAM_PROTECT
.endmacro

; --- 设置水平镜像 (天使之翼2 默认) ---
.macro SET_H_MIRROR
    lda #PRG_CMD_MIRRORING
    sta CHR_BANK_SELECT
    lda #$01
    sta CHR_BANK_DATA
.endmacro

; --- 启用 NMI 中断 (PPU $2000 bit7=1) ---
.macro ENABLE_NMI
    lda PPU_STATUS
    lda #%10001000   ; NMI on, BG+SPR from $1000, 8x16 sprites
    sta PPU_CTRL
.endmacro

; --- 关闭 NMI ---
.macro DISABLE_NMI
    lda PPU_STATUS
    lda #$00
    sta PPU_CTRL
.endmacro
