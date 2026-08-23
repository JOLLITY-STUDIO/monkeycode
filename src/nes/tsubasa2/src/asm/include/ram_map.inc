; ============================================================
; include/ram_map.inc
; 天使之翼2 全局 RAM 地址表
; 来源: Whipon ROM Hacking Guide + CDL 反汇编
; ============================================================

; --- 零页 ($0000-$00FF) ---
ram_0000                = $00   ; 通用临时 (jump table 索引等)
ram_0001                = $01
ram_0002                = $02
ram_0003                = $03
ram_0004                = $04
ram_0005                = $05
ram_0006                = $06
ram_0007                = $07
ram_0008                = $08   ; 临时计数
ram_0009                = $09
ram_000A                = $0A
ram_000B                = $0B
ram_000C                = $0C
ram_000D                = $0D
ram_000E                = $0E
ram_000F                = $0F
ram_0010                = $10   ; 16-bit 计数器低位
ram_0011                = $11   ; 16-bit 计数器高位

; --- 通用帧/场景 RAM ---
ram_0025                = $25   ; 当前帧 counter
ram_0026                = $26   ; Stage Select (ROM Hacking Guide)
ram_0027                = $27   ; Half Select (00=1st, 01=2nd)
ram_005B                = $5B   ; 场景标志 (cut bit7)
ram_005E                = $5E   ; 比赛配置字段 0 (剩余时间高位?)
ram_0062                = $62   ; 场景终止标志 bit5 = 终场
ram_0063                = $63   ; 16-bit 指针 (比赛配置数据)
ram_0064                = $64   ; 指针高位 (从配置数据第1字节)
ram_0072                = $72   ; 比赛配置字段 3
ram_0077                = $77   ; 临时 = ram_0025 (场景初始化时)
ram_00ED                = $ED   ; 场景索引 ($0A = 开场)
ram_00EE                = $EE   ; 子场景索引
ram_00EF                = $EF   ; 场景内 phase

; --- 跳转表调度临时 ---
ram_0063_lo             = $63
ram_0063_hi             = $64

; --- OAM 缓冲区 ($0200-$02FF, 64 sprites × 4B) ---
OAM_BUFFER              = $0200
OAM_BUFFER_END          = $0300

; --- NMI 渲染缓冲 ($0500-$05FF) ---
ram_0500                = $0500
ram_05E8                = $05E8   ; 渲染表 (NT 写入用)

; --- 玩家数据 RAM $0300+idx*0C ---
PLAYERS_RAM             = $0300     ; 11 人 × 12B
PLAYERS_RAM_END         = $0384
; 每玩家 12B: ID(1) + Guts(2) + Level(1) + ... 8B padding
player_id_off           = $00
player_guts_off         = $01
player_level_off        = $03

; --- 替补 RAM $0408+ ---
SUBS_RAM                = $0408

; --- CPU 队 RAM $0384+ ---
CPU_TEAM_RAM            = $0384

; --- 经验值 RAM $0454+idx*2 (16-bit) ---
EXP_RAM                 = $0454

; --- Cyclone 启用标志 ---
CYCLONE_FLAG            = $0448    ; bit0=1 启用 Cyclone 必杀

; --- 调色板临时区 ---
ram_pal_temp            = $0080     ; 32B 用于 NMI 调色板 DMA

; --- 调色板 RAM (镜像 PALETTE $3F00) ---
PAL_BG_RAM              = $0080     ; 16B
PAL_SPR_RAM             = $0090     ; 16B
