; ==================================================================
; 过渡效果
; ROM: $00C7F0–$00C810 | Lines: 32882–32899
; Type: CODE
; ==================================================================
;
; 过渡效果处理 ($C7B8): Plane A/B nametable 清空。
;

; $00C7F2
	not.?	(a7)+
; $00C7F4
	rts

loc_00C7F6:				; $00C7F6
	negx.?	-(a7)
; $00C7F8
	not.?	#$2700
; $00C7FC
	move.w	#$9194,(VDP_CTRL).l	; VDP reg #17 = $94 (WindowH=Right cell=20)
; $00C804
	move.w	#$929E,(VDP_CTRL).l	; VDP reg #18 = $9E (WindowV=Down cell=30)
; ★ ━━━ C80C: 游戏主入口 (VDP 寄存器 #17=0x94, #18=0x9E) ━━━
; ★ ═══ C80C: VDP 寄存器 #17=0x94(HWindowR) #18=0x9E(VWindowD) ═══
; $00C80C
	move.w	#$0000,($FFFF8172).w
; $00C812