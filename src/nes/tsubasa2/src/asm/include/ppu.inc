; ============================================================
; include/ppu.inc
; PPU 寄存器与常量定义
; ============================================================

; --- PPU 寄存器 ($2000-$2007, CPU 侧) ---
PPU_CTRL        = $2000   ; $W: NMI/地址自增/精灵BG基址/镜像/IRQ
PPU_MASK        = $2001   ; $W: 显示开关 (BG/SPR/clip/color)
PPU_STATUS      = $2002   ; $R: VBlank/Sprite0/SpriteOverflow
OAM_ADDR        = $2003   ; $W: OAM 地址
OAM_DATA        = $2004   ; $RW: OAM 数据
PPU_SCROLL      = $2005   ; $W: 滚动 ($2x: X, Y)
PPU_ADDR        = $2006   ; $W2: PPU 显存地址
PPU_DATA        = $2007   ; $RW: PPU 显存数据
OAM_DMA         = $4014   ; $W: OAM DMA (写 $02 传输 $0200-$02FF)

; --- $2000 PPU_CTRL bit ---
PPU_NMI         = %10000000   ; bit7 NMI on VBlank
PPU_SLAVE       = %01000000   ; bit6 slave mode (一般0)
SPR_8x16        = %00100000   ; bit5 sprite size (1=8x16)
BG_BASE_1000    = %00010000   ; bit4 BG pattern table $1000
SPR_BASE_1000   = %00001000   ; bit3 sprite pattern table $1000
INC_32          = %00000100   ; bit2 PPU 地址自增 32 (vblank 用)
NT_BASE_2400    = %00000010   ; bit1 NT base $2400 (垂直镜像)
NT_BASE_2800    = %00000001   ; bit0 NT base $2800

; --- $2001 PPU_MASK bit ---
EMPH_BLUE       = %10000000
EMPH_GREEN      = %01000000
EMPH_RED        = %00100000
SPR_ENABLE      = %00010000
BG_ENABLE       = %00001000
SPR_NOCLIP      = %00000100
BG_NOCLIP       = %00000100
SPR_BW          = %00000010
BG_BW           = %00000001

; --- PPU 显存地址 ($0000-$3FFF) ---
PALETTE         = $3F00     ; 调色板
PALETTE_BG      = $3F00
PALETTE_SPR     = $3F10

; --- NT 4 个 (每屏 1KB) ---
NT_0            = $2000     ; NT0 PPU 地址
NT_1            = $2400
NT_2            = $2800
NT_3            = $2C00
NT_AT_0         = $23C0     ; NT0 attribute table
NT_AT_1         = $27C0
NT_AT_2         = $2BC0
NT_AT_3         = $2FC0

; --- 等待 VBlank (轮询 PPU_STATUS bit7) ---
.macro WAIT_VBLANK
@@:
    bit PPU_STATUS
    bpl @-
.endmacro

; --- 设置 PPU 写地址 (X:Y = 16-bit 地址, 写 $2006 两次) ---
.macro SET_PPU_ADDR
    stx PPU_ADDR
    sty PPU_ADDR
.endmacro
