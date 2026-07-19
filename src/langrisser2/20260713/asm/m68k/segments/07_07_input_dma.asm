; ==================================================================
; 输入状态 & VDP DMA 传输
; ROM: $009020–$009430 | Lines: 24410–24990
; Type: CODE
; ==================================================================
;
; 输入状态初始化 ($9020)。VDP VRAM DMA ($9074)。显示列表 ($9172)。
;

; $00901E
	rte

; ★ ═══ 输入状态初始化 $9020 ═══
loc_009020:				; $009020
	movem.l	a7/a6/a5/d7,-(a7)
; $009024
	clr.w	($FFFF9050).l
; $00902A
	clr.w	($FFFF9052).l
; $009030
	clr.w	($FFFF9054).l
; $009036
	clr.w	($FFFF9056).l
; $00903C
	move.w	#$0000,($FFFF905A).l
; $009044
	move.w	#$0000,($FFFF9058).l
; $00904C
	lea	($FFFF905C).l,a0
; $009052
	move.w	#$00EF,d0
; $009056
	moveq	#0,d1

loc_009058:				; $009058
	move.l	d1,(a0)+
; $00905A
	move.w	d0,d2
; $00905C
	andi.w	#$0003,d2
; $009060
	bne.w	loc_00906A
; $009064
	subi.l	#$00010001,d1

loc_00906A:				; $00906A
	dbf	d0,loc_009058
; $00906E
	movem.l	(a7)+,d7/a5/a6/a7
; $009072
	rts

; ★ ═══ VDP VRAM DMA 传输 (双缓冲) $9074 ═══
loc_009074:				; $009074
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $009078
	negx.?	-(a7)
; $00907A
	not.?	#$2700
; $00907E
	cmpi.w	#$9058,($01FFFF).l
; $009086
	beq.w	loc_0090CC
; $00908A
	move.w	($FFFF9050).l,d0
; $009090
	neg.w	d0
; $009092
	pea	d0
; $009094
	move.w	($FFFF9054).l,d0
; $00909A
	neg.w	d0
; $00909C
	move.l	#$74000003,(VDP_CTRL).l	; VDP VRAM write addr=$F400
; $0090A6
	move.w	#$00B7,d1

loc_0090AA:				; $0090AA
	move.l	d0,(VDP_DATA).l
; $0090B0
	dbf	d1,loc_0090AA
; $0090B4
	cmpi.w	#$905A,($01FFFF).l
; $0090BC
	bne.w	loc_009114
; $0090C0
	move.w	#$0001,($FFFF9058).l
; $0090C8
	bra.w	loc_009114

loc_0090CC:				; $0090CC
	move.w	($FFFF9050).l,d0
; $0090D2
	neg.w	d0
; $0090D4
	pea	d0
; $0090D6
	move.w	($FFFF9054).l,d0
; $0090DC
	neg.w	d0
; $0090DE
	move.l	#$74000003,(VDP_CTRL).l	; VDP VRAM write addr=$F400
; $0090E8
	lea	($FFFF905C).l,a0
; $0090EE
	move.w	#$00B7,d1

loc_0090F2:				; $0090F2
	move.l	d0,d2
; $0090F4
	add.l	(a0)+,d2
; $0090F6
	move.l	d2,(VDP_DATA).l
; $0090FC
	dbf	d1,loc_0090F2
; $009100
	cmpi.w	#$905A,($00FFFF).l
; $009108
	bne.w	loc_009114
; $00910C
	move.w	#$0000,($FFFF9058).l

loc_009114:				; $009114
	move.w	($FFFF9052).l,d0
; $00911A
	pea	d0
; $00911C
	move.w	($FFFF9056).l,d0
; $009122
	move.l	#$40000010,(VDP_CTRL).l	; VDP VSRAM write addr=$0000
; $00912C
	move.l	d0,(VDP_DATA).l
; $009132
	not.?	(a7)+
; $009134
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $009138
	rts

loc_00913A:				; $00913A
	movem.l	a6/a5,-(a7)
; $00913E
	moveq	#11,d1
; $009140
	moveq	#3,d2
; $009142
	jsr	($00899A).l
; $009148
	move.w	#$0001,($FFFF905A).l
; $009150
	movem.l	(a7)+,a5/a6
; $009154
	rts

loc_009156:				; $009156
	movem.l	a6/a5,-(a7)
; $00915A
	moveq	#11,d1
; $00915C
	moveq	#0,d2
; $00915E
	jsr	($00899A).l
; $009164
	move.w	#$0000,($FFFF905A).l
; $00916C
	movem.l	(a7)+,a5/a6
; $009170
	rts

; ★ ═══ 显示列表初始化 $9172 ═══
loc_009172:				; $009172
	movem.l	a6/d6,-(a7)
; $009176
	lea	($FFFF9422).l,a1
; $00917C
	moveq	#31,d1

loc_00917E:				; $00917E
	clr.l	(a1)+
; $009180
	dbf	d1,loc_00917E
; $009184
	move.w	#$0001,($FFFF95AE).l
; $00918C
	movem.l	(a7)+,d6/a6
; $009190
	rts

loc_009192:				; $009192
	movem.l	a6/a5/d6/d5,-(a7)
; $009196
	lea	($FFFF9422).l,a2
; $00919C
	lsl.w	#5,d1
; $00919E
	adda.w	d1,a2
; $0091A0
	moveq	#7,d2

loc_0091A2:				; $0091A2
	move.l	(a1)+,(a2)+
; $0091A4
	dbf	d2,loc_0091A2
; $0091A8
	move.w	#$0001,($FFFF95AE).l
; $0091B0
	movem.l	(a7)+,d5/d6/a5/a6
; $0091B4
	rts

loc_0091B6:				; $0091B6
	movem.l	a6/d6/d5,-(a7)
; $0091BA
	moveq	#7,d1

loc_0091BC:				; $0091BC
	move.l	(a1)+,(a2)+
; $0091BE
	dbf	d1,loc_0091BC
; $0091C2
	move.w	#$0001,($FFFF95AE).l
; $0091CA
	movem.l	(a7)+,d5/d6/a6
; $0091CE
	rts

loc_0091D0:				; $0091D0
	movem.l	a6/d6/d5,-(a7)
; $0091D4
	lea	($FFFF9422).l,a2
; $0091DA
	moveq	#31,d1

loc_0091DC:				; $0091DC
	move.l	(a2)+,(a1)+
; $0091DE
	dbf	d1,loc_0091DC
; $0091E2
	movem.l	(a7)+,d5/d6/a6
; $0091E6
	rts
; $0091E8
	movem.l	a6/d6/d5,-(a7)
; $0091EC
	lea	($FFFF9422).l,a2
; $0091F2
	moveq	#31,d1

loc_0091F4:				; $0091F4
	move.l	(a1)+,(a2)+
; $0091F6
	dbf	d1,loc_0091F4
; $0091FA
	move.w	#$0001,($FFFF95AE).l
; $009202
	movem.l	(a7)+,d5/d6/a6
; $009206
	rts

loc_009208:				; $009208
	movem.l	a6/d5/d4/d3,-(a7)

loc_00920C:				; $00920C
	move.w	(a2)+,d1
; $00920E
	bmi.w	loc_009224
; $009212
	movea.l	a1,a3
; $009214
	lsl.w	#5,d1
; $009216
	adda.w	d1,a3
; $009218
	movea.l	(a2)+,a4
; $00921A
	moveq	#7,d1

loc_00921C:				; $00921C
	move.l	(a4)+,(a3)+
; $00921E
	dbf	d1,loc_00921C
; $009222
	bra.s	loc_00920C

loc_009224:				; $009224
	move.w	#$0001,($FFFF95AE).l
; $00922C
	movem.l	(a7)+,d3/d4/d5/a6
; $009230
	rts

loc_009232:				; $009232
	movem.l	a6/a5/a4/a3/a2/a1/a0/d6/d5,-(a7)
; $009236
	lea	($FFFF9422).l,a2
; $00923C
	lsl.w	#5,d1
; $00923E
	adda.w	d1,a2
; $009240
	move.w	d2,($FFFF941C).l
; $009246
	moveq	#0,d0
; $009248
	moveq	#15,d1

loc_00924A:				; $00924A
	lsr.w	#1,d0
; $00924C
	lsr.w	($FFFF941C).l
; $009252
	bcc.w	loc_0092CA
; $009256
	move.w	(a1),d2
; $009258
	move.w	(a2),d3
; $00925A
	cmp.w	d2,d3
; $00925C
	beq.w	loc_0092CA
; $009260
	moveq	#0,d6
; $009262
	move.w	d2,d4
; $009264
	move.w	d3,d5
; $009266
	andi.w	#$000E,d4
; $00926A
	andi.w	#$000E,d5
; $00926E
	cmp.w	d4,d5
; $009270
	beq.w	loc_00927C
; $009274
	blt.w	loc_00927A
; $009278
	subq.w	#4,d5

loc_00927A:				; $00927A
	addq.w	#2,d5

loc_00927C:				; $00927C
	or.w	d5,d6
; $00927E
	move.w	d2,d4
; $009280
	move.w	d3,d5
; $009282
	andi.w	#$00E0,d4
; $009286
	andi.w	#$00E0,d5
; $00928A
	cmp.w	d4,d5
; $00928C
	beq.w	loc_00929C
; $009290
	blt.w	loc_009298
; $009294
	subi.w	#$0040,d5

loc_009298:				; $009298
	addi.w	#$0020,d5

loc_00929C:				; $00929C
	or.w	d5,d6
; $00929E
	move.w	d2,d4
; $0092A0
	move.w	d3,d5
; $0092A2
	andi.w	#$0E00,d4
; $0092A6
	andi.w	#$0E00,d5
; $0092AA
	cmp.w	d4,d5
; $0092AC
	beq.w	loc_0092BC
; $0092B0
	blt.w	loc_0092B8
; $0092B4
	subi.w	#$0400,d5

loc_0092B8:				; $0092B8
	addi.w	#$0200,d5

loc_0092BC:				; $0092BC
	or.w	d5,d6
; $0092BE
	cmp.w	d3,d6
; $0092C0
	beq.w	loc_0092CA
; $0092C4
	bchg	#15,d0
; $0092C8
	move.w	d6,(a2)

loc_0092CA:				; $0092CA
	addq.w	#2,a1
; $0092CC
	addq.w	#2,a2
; $0092CE
	dbf	d1,loc_00924A
; $0092D2
	tst.w	d0
; $0092D4
	beq.w	loc_0092E0
; $0092D8
	move.w	#$0001,($FFFF95AE).l

loc_0092E0:				; $0092E0
	movem.l	(a7)+,d5/d6/a0/a1/a2/a3/a4/a5/a6
; $0092E4
	rts
; $0092E6
	movem.l	a7/a6/a5/a4/a3/a2/d6/d5,-(a7)
; $0092EA
	movea.l	a1,a2
; $0092EC
	subq.b	#1,$1(a2)
; $0092F0
	bcc.s	loc_009326
; $0092F2
	move.b	d5,$1(a2)
; $0092F6
	lea	($FFFF941E).l,a1
; $0092FC
	move.w	d2,d5
; $0092FE
	add.w	d5,d5
; $009300
	sub.w	d5,d1
; $009302
	btst	#0,(a2)
; $009306
	beq.s	loc_00930A
; $009308
	move.w	d4,d3

loc_00930A:				; $00930A
	move.w	d3,($FFFF941E).l
; $009310
	move.w	d2,d5
; $009312
	moveq	#0,d2
; $009314
	bchg	d5,d2
; $009316
	bsr.w	loc_009232
; $00931A
	btst	d5,d0
; $00931C
	bne.s	loc_009326
; $00931E
	add.b	d6,$1(a2)
; $009322
	bclr	#0,(a2)

loc_009326:				; $009326
	move.w	#$0001,($FFFF95AE).l
; $00932E
	movem.l	(a7)+,d5/d6/a2/a3/a4/a5/a6/a7
; $009332
	rts
; $009334
	move.w	($FFFF95A6).l,($FFFF9420).l
; $00933E
	move.l	#$00009346,($FFFF8004).w
; $009346
	subq.w	#1,($FFFF9420).l
; $00934C
	bgt.w	loc_0093AE
; $009350
	move.w	($FFFF95A6).l,($FFFF9420).l
; $00935A
	moveq	#0,d6
; $00935C
	tst.w	($FFFF95A6).l
; $009362
	bne.w	loc_009368
; $009366
	moveq	#1,d6

loc_009368:				; $009368
	movea.l	($FFFF95A2).l,a1
; $00936E
	moveq	#0,d1
; $009370
	moveq	#-1,d2
; $009372
	move.w	($FFFF95A8).l,d3
; $009378
	moveq	#0,d4
; $00937A
	moveq	#3,d5

loc_00937C:				; $00937C
	lsr.w	#1,d3
; $00937E
	bcc.w	loc_009388
; $009382
	bsr.w	loc_009232
; $009386
	or.w	d0,d4

loc_009388:				; $009388
	addq.w	#1,d1
; $00938A
	lea	$20(a1),a1
; $00938E
	dbf	d5,loc_00937C
; $009392
	tst.w	d4
; $009394
	bne.w	loc_0093A2
; $009398
	jsr	($008608).l
; $00939E
	bra.w	loc_0093A6

loc_0093A2:				; $0093A2
	dbf	d6,loc_009368

loc_0093A6:				; $0093A6
	move.w	#$0001,($FFFF95AE).l

loc_0093AE:				; $0093AE
	rts

loc_0093B0:				; $0093B0
	movem.l	a7,-(a7)
; $0093B4
	move.w	#$0450,d0
; $0093B8
	bsr.w	loc_00955C
; $0093BC
	movem.l	(a7)+,a7
; $0093C0
	move.w	#$0450,(a0)
; $0093C4
	move.l	a1,$2(a0)
; $0093C8
	move.w	a2,$6(a0)
; $0093CC
	move.w	d0,$8(a0)
; $0093D0
	move.w	d0,$A(a0)
; $0093D4
	move.w	d1,$C(a0)
; $0093D8
	rts
; $0093DA
	move.l	#$0005DF40,($FFFF95A2).l
; $0093E4
	clr.w	($FFFF95A6).l
; $0093EA
	move.w	#$000F,($FFFF95A8).l
; $0093F2
	move.l	#$00009334,d0
; $0093F8
	jsr	($0085EE).l
; $0093FE
	rts

loc_009400:				; $009400
	movem.l	d6,-(a7)
; $009404
	movea.l	($FFFF81C4).w,a1
; $009408
	move.w	#$FFFA,(a1)+
; $00940C
	clr.w	(a1)+
; $00940E
	move.l	#$FFFF9422,(a1)+
; $009414
	move.w	#$0040,(a1)+
; $009418
	move.l	a1,($FFFF81C4).w
; $00941C
	move.w	#$0000,($FFFF95AE).l
; $009424
	movem.l	(a7)+,d6
; $009428
	rts

; ★ ═══ 任务调度器初始化 $942A ═══
loc_00942A:				; $00942A
	movem.l	a6/d6,-(a7)
; $00942E