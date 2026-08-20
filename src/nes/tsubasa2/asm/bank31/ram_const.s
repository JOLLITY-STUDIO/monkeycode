; ============================================================
; bank31/ram_const.s
; RAM 地址与硬件寄存器常量定义
; 来源: ROM Hacking Guide (Whipon) + 反汇编 ram_NN 标号
; ============================================================

; --- PPU 寄存器 ($2000-$2007) ---
PPU_CTRL        = $2000
PPU_MASK        = $2001
PPU_STATUS      = $2002
OAM_ADDR        = $2003
OAM_DATA        = $2004
PPU_SCROLL      = $2005
PPU_ADDR        = $2006
PPU_DATA        = $2007
OAM_DMA         = $4014

; --- APU 寄存器 ---
APU_STATUS      = $4015
APU_DMC_FREQ    = $4010
APU_FRAME       = $4017

; --- 手柄 ---
JOY1            = $4016
JOY2            = $4017

; --- MMC3 寄存器 ---
MMC3_BANK_SEL   = $8000
MMC3_BANK_DATA  = $8001
MMC3_PRG_RAM    = $A001
MMC3_CHR_SEL    = $A000
MMC3_CHR_DATA   = $A001

; --- 游戏状态机枚举 (game_state 取值) ---
STAGE_BOOT      = $00
STAGE_TITLE     = $01
STAGE_PASSWORD  = $02
STAGE_MEETING   = $03
STAGE_MATCH     = $04
STAGE_HALFTIME  = $05
STAGE_ENDING    = $06

; --- 零页 RAM 变量 ($00-$FF) ---
nmi_counter     = $07    ; NMI 计数器 (每帧 +1)
nmi_flag        = $08    ; 主循环同步标志 (NMI 设置, 主循环清零)
pal_dirty       = $09    ; 1 = 调色板需更新到 PPU
nt_dirty        = $0A    ; 1 = NT 需更新
game_state      = $0B    ; 当前游戏状态 (STAGE_*)
pad1            = $0D    ; 手柄1 状态 (8 位)
pad2            = $0E    ; 手柄2 状态

; --- 场景/比赛 RAM ---
ram_00ED        = $ED    ; 场景索引 ($0A = 开场)
ram_005B        = $5B    ; 场景标志 (bit7 = ?)
ram_005E        = $5E    ; 比赛配置字段 0
ram_0062        = $62    ; 场景终止标志 (bit5 = 终场)
ram_0072        = $72    ; 比赛配置字段 3

; --- 调色板 RAM ($80-$9F, NMI 时写入 PPU $3F00-$3F1F) ---
pal_bg_ram      = $80    ; BG 调色板 16B
pal_spr_ram     = $90    ; SPR 调色板 16B

; --- OAM 缓冲区 ($0200-$02FF) ---
OAM_BUFFER      = $0200
