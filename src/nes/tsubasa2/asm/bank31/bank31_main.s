; ============================================================
; bank31/bank31_main.s
; bank 31 - 固定区 ($E000-$FFFF)
;   - Reset handler: 初始化系统, 进入主循环
;   - NMI handler: OAM DMA, 调色板, 滚动
;   - 主循环: 状态机调度
;   - IRQ handler: 简单 RTI
;   - 中断向量表 @ $FFFA
; ============================================================

.segment "PRG_BANK31"

; ============================================================
; 内存常量 (ROM Hacking Guide 提取)
; ============================================================
PPU_CTRL        = $2000
PPU_MASK        = $2001
PPU_STATUS      = $2002
OAM_ADDR        = $2003
OAM_DATA        = $2004
PPU_SCROLL      = $2005
PPU_ADDR        = $2006
PPU_DATA        = $2007
OAM_DMA         = $4014
JOY1            = $4016
JOY2            = $4017
APU_STATUS      = $4015
APU_FRAME       = $4017
APU_DMC_FREQ    = $4010
MMC3_BANK_SEL   = $8000
MMC3_BANK_DATA  = $8001
MMC3_PRG_RAM    = $A001
MMC3_CHR_SEL    = $A000
MMC3_CHR_DATA   = $A001

; ============================================================
; Reset Handler - CPU 上电第一条指令
; ============================================================
RESET_HANDLER:
    ; 关中断
    SEI
    CLD

    ; 关 APU 帧中断, 静音
    LDX #$40
    STX APU_FRAME
    LDX #$00
    STX APU_STATUS
    STX PPU_CTRL
    STX PPU_MASK
    STX APU_DMC_FREQ

    ; 等待 PPU 稳定 (2 个 VBlank)
    BIT PPU_STATUS
.wait_vbl1:
    BIT PPU_STATUS
    BPL .wait_vbl1
.wait_vbl2:
    BIT PPU_STATUS
    BPL .wait_vbl2

    ; 清零内部 RAM $0000-$07FF
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

    ; 清零 PRG RAM $6000-$7FFF
    LDA #$80
    STA MMC3_PRG_RAM
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

    ; 设置 MMC3 PRG bank 配置
    ; R6 = bank0 ($8000-$9FFF)
    LDA #$00
    STA MMC3_BANK_SEL
    LDA #$00
    STA MMC3_BANK_DATA
    ; R7 = bank2 ($A000-$BFFF)
    LDA #$01
    STA MMC3_BANK_SEL
    LDA #$02
    STA MMC3_BANK_DATA

    ; 设置水平镜像 (天使之翼2)
    LDA #$07
    STA MMC3_CHR_SEL
    LDA #$01
    STA MMC3_CHR_DATA

    ; 初始化调色板 (全黑)
    JSR INIT_PALETTE

    ; 初始化 CHR banks
    JSR INIT_CHR

    ; 初始化游戏 RAM
    JSR INIT_GAME_RAM

    ; 设置栈
    LDX #$FD
    TXS

    ; 启用 NMI + 8x16 精灵 + BG $1000
    LDA PPU_STATUS
    LDA #%10001000
    STA PPU_CTRL

    ; 启用显示 (BG + SPR)
    LDA #%00011110
    STA PPU_MASK

    ; 进入主循环
    JMP MAIN_LOOP

; ============================================================
; NMI Handler - 每帧 VBlank 触发
; ============================================================
NMI_HANDLER:
    PHA
    TXA
    PHA
    TYA
    PHA

    ; OAM DMA: 传送 $0200-$02FF 到 PPU
    LDA #$02
    STA OAM_DMA

    ; 调色板更新 (如果脏)
    LDA pal_dirty
    BEQ .skip_pal
    ; 写 PPU 调色板
    LDA PPU_STATUS
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
    LDA #$00
    STA pal_dirty
.skip_pal:

    ; 设置滚动 (0, 0)
    LDA PPU_STATUS
    LDA #$00
    STA PPU_SCROLL
    STA PPU_SCROLL

    ; 帧同步标志
    INC nmi_counter
    LDA nmi_counter
    STA nmi_flag

    PLA
    TAY
    PLA
    TAX
    PLA
    RTI

; ============================================================
; IRQ Handler - MMC3 scanline IRQ
; ============================================================
IRQ_HANDLER:
    PHA
    LDA #$05
    STA MMC3_BANK_SEL
    LDA #$00
    STA MMC3_BANK_DATA
    PLA
    RTI

; ============================================================
; INIT_PALETTE - 调色板初始化 (全黑)
; ============================================================
INIT_PALETTE:
    LDX #$00
    LDA #$0F
.init_pal:
    STA pal_bg_ram,X
    STA pal_spr_ram,X
    INX
    CPX #$10
    BNE .init_pal
    LDA #$01
    STA pal_dirty
    RTS

; ============================================================
; INIT_CHR - MMC3 CHR bank 初始化
; ============================================================
INIT_CHR:
    LDA #$00
    STA MMC3_BANK_SEL
    LDA #$00
    STA MMC3_BANK_DATA
    LDA #$01
    STA MMC3_BANK_SEL
    LDA #$02
    STA MMC3_BANK_DATA
    LDA #$02
    STA MMC3_BANK_SEL
    LDA #$04
    STA MMC3_BANK_DATA
    LDA #$03
    STA MMC3_BANK_SEL
    LDA #$06
    STA MMC3_BANK_DATA
    LDA #$04
    STA MMC3_BANK_SEL
    LDA #$08
    STA MMC3_BANK_DATA
    LDA #$05
    STA MMC3_BANK_SEL
    LDA #$0A
    STA MMC3_BANK_DATA
    RTS

; ============================================================
; INIT_GAME_RAM - 初始化游戏状态
; ============================================================
INIT_GAME_RAM:
    LDA #$0A
    STA ram_00ED          ; 默认场景 = 开场
    LDA #$00
    STA ram_005B
    STA ram_005E
    STA ram_0072
    STA ram_0062
    STA game_state        ; game_state = STAGE_BOOT = 0
    RTS

; ============================================================
; MAIN_LOOP - 主循环
; ============================================================
MAIN_LOOP:
    ; 等待 NMI
    LDA nmi_flag
    BEQ MAIN_LOOP
    LDA #$00
    STA nmi_flag

    ; 读手柄
    JSR READ_PADS

    ; 状态调度
    LDA game_state
    ASL A
    TAX
    LDA .state_table+1,X
    PHA
    LDA .state_table,X
    PHA
    RTS

.state_table:
    .word STATE_BOOT       ; 0
    .word STATE_TITLE      ; 1
    .word STATE_PASSWORD   ; 2
    .word STATE_MEETING    ; 3
    .word STATE_MATCH      ; 4
    .word STATE_ENDING     ; 5

; ============================================================
; READ_PADS - 读取手柄
; ============================================================
READ_PADS:
    LDA #$01
    STA JOY1
    LDA #$00
    STA JOY1
    LDX #$08
.pad_loop:
    LDA JOY1
    LSR A
    ROL pad1
    LDA JOY2
    LSR A
    ROL pad2
    DEX
    BNE .pad_loop
    RTS

; ============================================================
; 状态处理 stub
; ============================================================
STATE_BOOT:
    LDA #$01               ; STAGE_TITLE
    STA game_state
    JMP MAIN_LOOP

STATE_TITLE:
    JMP MAIN_LOOP

STATE_PASSWORD:
    JMP MAIN_LOOP

STATE_MEETING:
    JMP MAIN_LOOP

STATE_MATCH:
    JMP MAIN_LOOP

STATE_ENDING:
    JMP MAIN_LOOP

; ============================================================
; RAM 变量定义 (零页 $00-$0F, 主循环常用)
; ============================================================
nmi_counter     = $07
nmi_flag        = $08
pal_dirty       = $09
nt_dirty        = $0A
game_state      = $0B
ram_00ED        = $ED
ram_005B        = $5B
ram_005E        = $5E
ram_0072        = $72
ram_0062        = $62
pad1            = $0D
pad2            = $0E
pal_bg_ram      = $80
pal_spr_ram     = $90

; ============================================================
; 中断向量表 (位于 $FFFA-$FFFF, bank31 末尾 6 字节)
; ============================================================
.segment "PRG_BANK31"
.org $FFFA
    .word NMI_HANDLER    ; $FFFA: NMI
    .word RESET_HANDLER  ; $FFFC: Reset
    .word IRQ_HANDLER    ; $FFFE: IRQ
