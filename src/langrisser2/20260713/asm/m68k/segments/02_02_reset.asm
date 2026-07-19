; ==================================================================
; Reset 入口 ($800A)
; ROM: $008000–$0082B0 | Lines: 21915–22316
; Type: CODE
; ==================================================================
;
; VDP 寄存器初始化 (ROM $80B2 表)。
;

; $007FFE
	dc.w	$FFFF

loc_008000:				; $008000
	lea	(rom).w,a1
; $008004
	movea.l	(a1)+,a7
; $008006
	movea.l	(a1),a1
; $008008
	jmp	(a1)

EntryPoint:				; $00800A
	tst.l	($A10008).l
; $008010
	bne.s	loc_008018
; $008012
	tst.w	($A1000C).l

loc_008018:				; $008018
	bne.s	loc_008096
; $00801A
	lea	loc_008098(pc),a5
; $00801E
	movem.w	(a5)+,a0/a1/a2
; $008022
	movem.l	(a5)+,d3/d4/d5/d6/d7
; $008026
	move.b	-$10FF(a1),d0
; $00802A
	andi.b	#$0F,d0
; $00802E
	beq.s	loc_008038
; $008030
	move.l	#$53454741,$2F00(a1)

loc_008038:				; $008038
	move.w	(a4),d0
; $00803A
	moveq	#0,d0
; $00803C
	movea.l	d0,a6
; $00803E
	move.l	a6,usp
; $008040
	moveq	#23,d1

loc_008042:				; $008042
	move.b	(a5)+,d5
; $008044
	move.w	d5,(a4)
; $008046
	add.w	d7,d5
; $008048
	dbf	d1,loc_008042
; $00804C
	move.l	(a5)+,(a4)
; $00804E
	move.w	d0,(a3)
; $008050
	move.w	d7,(a1)
; $008052
	move.w	d7,(a2)

loc_008054:				; $008054
	btst	d0,(a1)
; $008056
	bne.s	loc_008054
; $008058
	moveq	#37,d2

loc_00805A:				; $00805A
	move.b	(a5)+,(a0)+
; $00805C
	dbf	d2,loc_00805A
; $008060
	move.w	d0,(a2)
; $008062
	move.w	d0,(a1)
; $008064
	move.w	d7,(a2)

loc_008066:				; $008066
	move.l	d0,-(a6)
; $008068
	dbf	d6,loc_008066
; $00806C
	move.l	(a5)+,(a4)
; $00806E
	move.l	(a5)+,(a4)
; $008070
	moveq	#31,d3

loc_008072:				; $008072
	move.l	d0,(a3)
; $008074
	dbf	d3,loc_008072
; $008078
	move.l	(a5)+,(a4)
; $00807A
	moveq	#19,d4

loc_00807C:				; $00807C
	move.l	d0,(a3)
; $00807E
	dbf	d4,loc_00807C
; $008082
	moveq	#3,d5

loc_008084:				; $008084
	move.b	(a5)+,$11(a3)
; $008088
	dbf	d5,loc_008084
; $00808C
	move.w	d0,(a2)
; $00808E
	movem.l	(a6),d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $008092
	not.?	#$2700

loc_008096:				; $008096
	bra.s	loc_008104
; $008098
	or.b	d0,d0
; $00809A
	move.w	?ea(7,7),?ea(7,7)
; $00809C
	btst	d0,d0
; $00809E
	ori.l	#$000000A1,-(a0)
; $0080A4
	move.b	d0,-(a0)
; $0080A6
	ori.l	#$120000C0,-(a1)
; $0080AC
	ori.b	#$C0,d0
; $0080B0
	ori.b	#$14,d4
; $0080B4
	move.w	#$076C,d0
; $0080B8
	ori.b	#$00,d0
; $0080BC
	dc.w	$FF00
; $0080BE
	or.b	d0,($1,a7,d0.w)
; $0080C2
	btst	d0,d0
; $0080C4
	ori.?	#?,?ea(7,7)
; $0080C6
	dc.w	$FF00
; $0080C8
	ori.l	#$40000080,d0
; $0080CE
	dc.w	$AF01
; $0080D0
	add.b	d4,(a7)+
; $0080D2
	move.b	-(a7),-(a0)
; $0080D4
	ori.b	#$00,-(a1)
; $0080D8
	dc.w	$F977
; $0080DA
	roxl.l	d6,d0
; $0080DC
	adda.l	-(a1),a6
; $0080DE
	dc.w	$FDE1
; $0080E0
	roxl.w	#6,d7
; $0080E2
	roxl.w	#6,d7
; $0080E4
	adda.l	-(a1),a0
; $0080E6
	dc.w	$F108
; $0080E8
	adda.l	d1,a4
; $0080EA
	adda.l	-(a1),a0
; $0080EC
	dc.w	$F1F9
; $0080EE
	dc.w	$F3ED
; $0080F0
	addq.b	#3,(-$17,a6,a6.l)
; $0080F4
	sbcd	d4,d0
; $0080F6
	sbcd	d2,d7
; $0080F8
	and.b	d0,d0
; $0080FA
	ori.b	#$00,d0
; $0080FE
	ori.b	#$BF,(a0)
; $008102
	adda.l	?ea(7,7),a7

loc_008104:				; $008104
	tst.w	(VDP_CTRL).l

loc_00810A:				; $00810A
	move.w	(VDP_CTRL).l,d0
; $008110
	btst	#1,d0
; $008114
	bne.s	loc_00810A
; $008116
	not.?	#$2700
; $00811A
	cmpi.l	#$FFFFFF00,($53454741).l
; $008124
	beq.w	loc_00817E
; $008128
	tst.w	($00018E).w
; $00812C
	beq.s	loc_00815A
; $00812E
	lea	($0001A4).w,a0
; $008132
	move.l	(a0),d0
; $008134
	addq.l	#1,d0
; $008136
	lea	($000200).w,a0
; $00813A
	sub.l	a0,d0
; $00813C
	lsr.l	#1,d0
; $00813E
	move.w	d0,d2
; $008140
	subq.w	#1,d2
; $008142
	pea	d0
; $008144
	moveq	#0,d1

loc_008146:				; $008146
	add.w	(a0)+,d1
; $008148
	dbf	d2,loc_008146
; $00814C
	dbf	d0,loc_008146
; $008150
	lea	($00018E).w,a0
; $008154
	cmp.w	(a0),d1
; $008156
	bne.w	loc_008582

loc_00815A:				; $00815A
	lea	($FFFF00).l,a1
; $008160
	move.w	#$003F,d1

loc_008164:				; $008164
	clr.l	(a1)+
; $008166
	dbf	d1,loc_008164
; $00816A
	move.l	#$53454741,($FFFFFF00).l
; $008174
	move.l	#$20202020,($FFFFFF04).l

loc_00817E:				; $00817E
	not.?	#$2700
; $008182
	lea	($FF0000).l,a1
; $008188
	move.w	#$3FBF,d1

loc_00818C:				; $00818C
	clr.l	(a1)+
; $00818E
	dbf	d1,loc_00818C
; $008192
	move.w	#$0000,($FFFF8160).l
; $00819A
	clr.w	($FFFF815E).l
; $0081A0
	moveq	#-1,d0
; $0081A2
	jsr	($01DE1C).l
; $0081A8
	move.l	#$FFFF81CC,($FFFF81C4).w
; $0081B0
	bsr.w	loc_0086B4
; $0081B4
	bsr.w	loc_00866C
; $0081B8
	bsr.w	loc_009172
; $0081BC
	lea	($FFFF8DCC).w,a1
; $0081C0
	move.w	#$009F,d1

loc_0081C4:				; $0081C4
	clr.l	(a1)+
; $0081C6
	dbf	d1,loc_0081C4
; $0081CA
	move.b	#$40,(IO_CTRL_1).l
; $0081D2
	move.b	#$40,(IO_CTRL_2).l
; $0081DA
	move.b	#$40,(IO_CTRL_EXP).l
; $0081E2
	movea.l	($FFFF81C4).w,a1
; $0081E6
	move.w	#$FFFC,(a1)+
; $0081EA
	move.w	#$0000,(a1)+
; $0081EE
	move.w	#$0000,(a1)+
; $0081F2
	move.w	#$FFFF,(a1)+
; $0081F6
	move.w	#$0001,(a1)+
; $0081FA
	move.l	a1,($FFFF81C4).w
; $0081FE
	bsr.w	loc_009020
; $008202
	bsr.w	loc_008A6C
; $008206
	bsr.w	loc_00942A
; $00820A
	move.l	#$FFFF8108,($FFFF8000).l
; $008214
	move.l	#$0000C936,($FFFF8004).l
; $00821E
	cmpi.l	#$FFFFFF04,($50414452).l
; $008228
	bne.w	loc_00823C
; $00822C
	move.l	#$0002A2D0,d0
; $008232
	jsr	($0085EE).l
; $008238
	bra.w	loc_008248

loc_00823C:				; $00823C
	move.l	#$0002D0C2,d0
; $008242
	jsr	($0085EE).l

loc_008248:				; $008248
	clr.w	($FFFF816A).l
; $00824E
	bsr.w	loc_008294
; $008252
	jsr	($00C816).l
; $008258
	not.?	#$2000

loc_00825C:				; $00825C
	lea	($FFFF810C).l,a6
; $008262
	movea.l	(a6),a1
; $008264
	cmpa.l	#$00000000,a1
; $00826A
	beq.s	loc_00825C
; $00826C
	jsr	(a1)
; $00826E
	movea.l	#$FFFF8134,a0
; $008274
	movea.l	#$FFFF810C,a1
; $00827A
	moveq	#9,d0

loc_00827C:				; $00827C
	move.l	(a0)+,(a1)+
; $00827E
	dbf	d0,loc_00827C
; $008282
	clr.l	($FFFF8134).l
; $008288
	subi.l	#$FFFF8108,($000028).l
; $008292
	bra.s	loc_00825C

; ★ FUN_00008294 — 任务队列清空
loc_008294:				; $008294
	movem.l	a7/d6,-(a7)
; $008298
	lea	($FFFF810C).l,a1
; $00829E
	move.l	a1,($FFFF8108).l
; $0082A4
	move.w	#$0013,d0

loc_0082A8:				; $0082A8
	clr.l	(a1)+
; $0082AA
	dbf	d0,loc_0082A8
; $0082AE