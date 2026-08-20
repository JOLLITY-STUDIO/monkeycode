; ============================================================
; bank31/init.s
; 初始化子程: 调色板 / CHR banks / 游戏 RAM
; 被 RESET_HANDLER 调用
; ============================================================

.segment "PRG_BANK31"

; ------------------------------------------------------------
; INIT_PALETTE - 调色板初始化 (全黑)
; 设置 pal_bg_ram 和 pal_spr_ram 为全 $0F (黑), 标记 pal_dirty
; ------------------------------------------------------------
INIT_PALETTE:
    LDX #$00
    LDA #$0F              ; 颜色 $0F = 黑
.init_pal:
    STA pal_bg_ram,X
    STA pal_spr_ram,X
    INX
    CPX #$10
    BNE .init_pal
    LDA #$01
    STA pal_dirty         ; 标记调色板需更新到 PPU
    RTS

; ------------------------------------------------------------
; INIT_CHR - MMC3 CHR bank 初始化
; MMC3 CHR 布局: 2 × 1KB ($0000/$0400) + 4 × 2KB ($1000/$1400/$1800/$1C00)
; 设置 6 个 CHR bank 寄存器指向 CHR ROM 的前 8KB
; ------------------------------------------------------------
INIT_CHR:
    ; R0: 1KB @ PPU $0000
    LDA #$00
    STA MMC3_BANK_SEL
    LDA #$00
    STA MMC3_BANK_DATA
    ; R1: 1KB @ PPU $0400
    LDA #$01
    STA MMC3_BANK_SEL
    LDA #$02
    STA MMC3_BANK_DATA
    ; R2: 2KB @ PPU $1000 (sprite bank 0-1)
    LDA #$02
    STA MMC3_BANK_SEL
    LDA #$04
    STA MMC3_BANK_DATA
    ; R3: 2KB @ PPU $1400
    LDA #$03
    STA MMC3_BANK_SEL
    LDA #$06
    STA MMC3_BANK_DATA
    ; R4: 2KB @ PPU $1800
    LDA #$04
    STA MMC3_BANK_SEL
    LDA #$08
    STA MMC3_BANK_DATA
    ; R5: 2KB @ PPU $1C00
    LDA #$05
    STA MMC3_BANK_SEL
    LDA #$0A
    STA MMC3_BANK_DATA
    RTS

; ------------------------------------------------------------
; INIT_GAME_RAM - 初始化游戏状态 RAM
; 设置默认场景 = 开场 (ram_00ED = $0A), game_state = BOOT
; ------------------------------------------------------------
INIT_GAME_RAM:
    LDA #$0A
    STA ram_00ED          ; 默认场景索引 = 开场
    LDA #$00
    STA ram_005B
    STA ram_005E
    STA ram_0072
    STA ram_0062
    STA game_state        ; game_state = STAGE_BOOT = 0
    RTS
