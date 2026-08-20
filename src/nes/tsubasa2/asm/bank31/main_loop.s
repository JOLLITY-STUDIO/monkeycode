; ============================================================
; bank31/main_loop.s
; 主循环 - 帧同步 + 状态机调度
;
; 主循环结构:
;   1. 等待 nmi_flag (NMI 设置)
;   2. 清除 nmi_flag
;   3. 读取手柄
;   4. 根据 game_state 跳转到对应 STATE_xxx 处理函数
; ============================================================

.segment "PRG_BANK31"

MAIN_LOOP:
    ; --- 等待 NMI 标志 (帧同步) ---
    LDA nmi_flag
    BEQ MAIN_LOOP
    LDA #$00
    STA nmi_flag

    ; --- 读取手柄 ---
    JSR READ_PADS

    ; --- 状态机调度 (跳转表) ---
    LDA game_state
    ASL A                  ; ×2 (每个表项 2 字节)
    TAX
    LDA .state_table+1,X   ; 高字节先 PHA (RTS 时在返回地址高位)
    PHA
    LDA .state_table,X     ; 低字节后 PHA (返回地址低)
    PHA
    RTS                    ; RTS 弹出栈顶作为返回地址 → 跳转

; 状态跳转表 (16 个槽, 当前只用前 6 个, 其余保留)
.state_table:
    .word STATE_BOOT       ; 0 = STAGE_BOOT
    .word STATE_TITLE      ; 1 = STAGE_TITLE
    .word STATE_PASSWORD   ; 2 = STAGE_PASSWORD
    .word STATE_MEETING    ; 3 = STAGE_MEETING
    .word STATE_MATCH      ; 4 = STAGE_MATCH
    .word STATE_HALFTIME   ; 5 = STAGE_HALFTIME
    .word STATE_ENDING     ; 6 = STAGE_ENDING
    .word MAIN_LOOP        ; 7 (保留)
    .word MAIN_LOOP        ; 8 (保留)
    .word MAIN_LOOP        ; 9 (保留)
    .word MAIN_LOOP        ; 10 (保留)
    .word MAIN_LOOP        ; 11 (保留)
    .word MAIN_LOOP        ; 12 (保留)
    .word MAIN_LOOP        ; 13 (保留)
    .word MAIN_LOOP        ; 14 (保留)
    .word MAIN_LOOP        ; 15 (保留)

; ------------------------------------------------------------
; READ_PADS - 读取手柄 1 和 2 (各 8 位)
; 结果存入 pad1, pad2 (bit7=右, bit6=左, bit5=下, bit4=上, bit3=Start, bit2=Select, bit1=B, bit0=A)
; ------------------------------------------------------------
READ_PADS:
    LDA #$01
    STA JOY1              ; strobe high
    LDA #$00
    STA JOY1              ; strobe low (锁存状态)
    LDX #$08              ; 8 个按键
.pad_loop:
    LDA JOY1
    LSR A                 ; bit0 → C
    ROL pad1              ; C → pad1 高位
    LDA JOY2
    LSR A
    ROL pad2
    DEX
    BNE .pad_loop
    RTS

; ============================================================
; 状态处理函数 (stub, 后续从 bank0/2 反汇编填充)
; ============================================================

; --- 开场画面 ---
STATE_BOOT:
    ; 简化: 直接进入标题画面
    LDA #STAGE_TITLE
    STA game_state
    JMP MAIN_LOOP

; --- 标题画面 (bank2 实现) ---
STATE_TITLE:
    ; 切 bank2 到 $A000, 调用 bank2 标题入口
    ; LDA #$02
    ; STA MMC3_BANK_SEL    ; 命令 1 = R7 swap
    ; LDA #$02
    ; STA MMC3_BANK_DATA
    ; JSR $A000            ; bank2 title entry
    JMP MAIN_LOOP

; --- 密码输入 (bank2 实现) ---
STATE_PASSWORD:
    JMP MAIN_LOOP

; --- 赛前对话 (bank0 实现) ---
STATE_MEETING:
    JMP MAIN_LOOP

; --- 比赛中 (bank0 实现) ---
STATE_MATCH:
    JMP MAIN_LOOP

; --- 中场 ---
STATE_HALFTIME:
    JMP MAIN_LOOP

; --- 结束画面 ---
STATE_ENDING:
    JMP MAIN_LOOP
