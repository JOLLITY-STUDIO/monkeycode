; ============================================================
; bank00/bank00.s
; bank 0 - 主程比赛/场景子程 (8KB)
; 运行时映射: $8000-$9FFF (R6 可切换窗口)
; ============================================================

.segment "PRG_BANK00"

; bank0 入口 $8000: 场景初始化
.org $8000
BANK00_SCENE_INIT:
    RTS

; bank0 入口 $8100: 比赛更新
.org $8100
BANK00_MATCH_UPDATE:
    RTS

; bank0 $8B0D: 切 bank7 到 $A000
.org $8B0D
BANK00_SWITCH_BANK7_A000:
    RTS

; bank0 $8B1C: 加载比赛配置
.org $8B1C
BANK00_LOAD_MATCH_CONFIG:
    RTS

; bank0 $8AF7: cut 场景初始化
.org $8AF7
BANK00_CUTSCENE_INIT:
    RTS

; bank0 $9A0D: 清屏
.org $9A0D
BANK00_CLEAR_SCREEN:
    RTS

; bank0 $890C: 写 NT 字符
.org $890C
BANK00_WRITE_NT_CHARS:
    RTS

; bank0 $98EA: 写 NT tile
.org $98EA
BANK00_WRITE_NT_TILE:
    RTS

; 填充到 8KB 结束 (不要写超出 $9FFF)
.org $9FFE
    .byte $00, $00
