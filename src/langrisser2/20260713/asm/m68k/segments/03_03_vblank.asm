; ==================================================================
; VBlank/HBlank 中断
; ROM: $0082B0–$008600 | Lines: 22316–22728
; Type: CODE
; ==================================================================
;
; VBlank ($82B4): 60Hz 帧心跳。HBlank ($84B8)。任务队列 ($8294)。
;

; $0082AE
	movem.l	(a7)+,d6/a7
; $0082B2
	rts
; ★ ━━━ VBLANK — 场扫描中断 / 60Hz 主心跳 ━━━
; ★   清除 VDP 中断标志 → 帧计数递增 → 输入扫描 (控制器状态更新)
; ★   → 任务队列填充 → DMA 命令处理 → 显示列表刷新
; ★ ═══ VBLANK — 场扫描中断 / 60Hz 任务调度核心 $82B4 ═══
; ★ 清除 VDP 中断标志 → 帧计数递增 → 控制器状态更新
; ★ → 任务队列填充 (调用 $FF8004 指向的函数) → DMA 命令处理 → 显示刷新
; $0082B4
	not.?	#$2700
; $0082B8
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $0082BC
	tst.w	(VDP_CTRL).l
; $0082C2
	move.b	($FFFF8178).w,d0
; $0082C6
	cmpi.b	#$F0,d0
; $0082CA
	beq.w	loc_0084AA
; $0082CE
	addq.w	#1,($FFFF815C).l
; $0082D4
	addq.w	#5,($FFFF8164).l
; $0082DA
	tst.w	($FFFF8160).l
; $0082E0
	beq.w	loc_0082F6
; $0082E4
	clr.w	($FFFF815E).l
; $0082EA
	move.w	#$8014,(VDP_CTRL).l	; VDP reg #0 = $14 (Mode1: DispOff)
; $0082F2
	bra.w	loc_0082FE

loc_0082F6:				; $0082F6
	move.w	#$8004,(VDP_CTRL).l	; VDP reg #0 = $04 (Mode1: off)

loc_0082FE:				; $0082FE
	movem.l	a6,-(a7)
; $008302
	move.w	#$8100,d1
; $008306
	move.b	($FFFF81A9).w,d1
; $00830A
	ori.b	#$40,d1
; $00830E
	move.w	d1,(VDP_CTRL).l
; $008314
	move.b	d1,($FFFF81A9).w
; $008318
	movem.l	(a7)+,a6
; $00831C
	tst.w	($FFFF8170).l
; $008322
	beq.w	loc_008334
; $008326
	tst.w	($FFFFAE92).w
; $00832A
	bne.w	loc_008334
; $00832E
	jsr	($008F4E).l

loc_008334:				; $008334
	tst.w	($FFFF816A).l
; $00833A
	bne.w	loc_0084A4
; $00833E
	tst.w	($FFFF816E).l
; $008344
	beq.w	loc_00834E
; $008348
	jsr	($02DD98).l

loc_00834E:				; $00834E
	jsr	($00870A).l
; $008354
	jsr	($009074).l
; $00835A
	cmpi.w	#$95AE,($000001).w
; $008360
	bne.w	loc_00836A
; $008364
	jsr	($009400).l

loc_00836A:				; $00836A
	jsr	($000270).w
; $00836E
	jsr	($008A6C).l
; $008374
	lea	($00861C).l,a0
; $00837A
	jsr	($008A20).l
; $008380
	bne.w	loc_00838C
; $008384
	eori.w	#$8174,($01FFFF).l

loc_00838C:				; $00838C
	tst.w	($FFFF8174).l
; $008392
	beq.w	loc_0083CE
; $008396
	lea	($008630).l,a0
; $00839C
	jsr	($008A20).l
; $0083A2
	bne.w	loc_0083AE
; $0083A6
	eori.w	#$8176,($01FFFF).l

loc_0083AE:				; $0083AE
	tst.w	($FFFF8176).l
; $0083B4
	beq.w	loc_0083CE
; $0083B8
	move.b	($FFFF8179).w,d0
; $0083BC
	bset	#6,($FFFF8179).w
; $0083C2
	btst	#6,d0
; $0083C6
	bne.w	loc_0083CE
; $0083CA
	bra.w	loc_00849E

loc_0083CE:				; $0083CE
	clr.b	($FFFFA6C6).w
; $0083D2
	move.w	#$0001,($FFFF816A).l
; $0083DA
	not.?	#$2000
; $0083DE
	cmpi.w	#$AE94,($000001).w
; $0083E4
	beq.w	loc_0083EC
; $0083E8
	jsr	($0003AE).w

loc_0083EC:				; $0083EC
	move.w	#$05AA,d0
; $0083F0
	move.w	#$0016,d1
; $0083F4
	move.w	#$0010,d2
; $0083F8
	jsr	($009498).l
; $0083FE
	movea.l	($FFFF8004).l,a1
; $008404
	jsr	(a1)
; $008406
	move.w	#$002A,d0
; $00840A
	move.w	#$0016,d1
; $00840E
	move.w	#$0040,d2
; $008412
	jsr	($009498).l
; $008418
	move.w	#$0000,d0
; $00841C
	move.w	#$002A,d1
; $008420
	move.w	#$0001,d2
; $008424
	jsr	($009498).l
; $00842A
	move.w	#$070A,d0
; $00842E
	move.w	#$002E,d1
; $008432
	move.w	#$0001,d2
; $008436
	jsr	($009498).l
; $00843C
	move.w	#$0738,d0
; $008440
	move.w	#$0022,d1
; $008444
	move.w	#$0010,d2
; $008448
	jsr	($009498).l
; $00844E
	jsr	($000426).w
; $008452
	lea	($008636).l,a0
; $008458
	jsr	($008A20).l
; $00845E
	bne.w	loc_008478
; $008462
	move.w	#$0001,($FFFFA6DC).w
; $008468
	move.b	#$65,($FFFFA6DA).w
; $00846E
	clr.b	($FFFFA6DB).w
; $008472
	jsr	($00FD7A).l

loc_008478:				; $008478
	lea	($00864C).l,a0
; $00847E
	jsr	($008A20).l
; $008484
	bne.w	loc_00849E
; $008488
	move.w	#$0002,($FFFFA6DC).w
; $00848E
	move.b	#$5C,($FFFFA6DA).w
; $008494
	clr.b	($FFFFA6DB).w
; $008498
	jsr	($00FD7A).l

loc_00849E:				; $00849E
	clr.w	($FFFF816A).l

loc_0084A4:				; $0084A4
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $0084A8
	rte

loc_0084AA:				; $0084AA
	move.l	#$50414452,($FFFFFF04).l
; $0084B4
	bra.w	loc_008000
; ★ HBLANK — 行扫描中断
; $0084B8
	movem.l	a7,-(a7)
; $0084BC
	not.?	#$2700
; $0084C0
	addq.w	#1,($FFFF815E).l
; $0084C6
	move.w	($FFFF815E).l,d0
; $0084CC
	tst.w	($FFFF816E).l
; $0084D2
	bne.w	loc_00853C
; $0084D6
	tst.w	($FFFF8170).l
; $0084DC
	beq.w	loc_00857C
; $0084E0
	cmpi.w	#$0082,d0
; $0084E4
	blt.w	loc_00857C
; $0084E8
	subi.w	#$0082,d0
; $0084EC
	cmpi.w	#$001F,d0
; $0084F0
	beq.w	loc_008574
; $0084F4
	btst	#0,d0
; $0084F8
	bne.w	loc_00857C
; $0084FC
	movem.l	a6/d6/d5,-(a7)
; $008500
	add.w	d0,d0
; $008502
	moveq	#0,d1
; $008504
	move.w	#$C040,d1
; $008508
	add.w	d0,d1
; $00850A
	pea	d1
; $00850C
	lea	($FFFF9562).w,a2
; $008510
	adda.w	d0,a2

loc_008512:				; $008512
	move.w	(VDP_HVCOUNTER).l,d0
; $008518
	andi.w	#$00FF,d0
; $00851C
	cmpi.w	#$0098,d0
; $008520
	bls.w	loc_008512
; $008524
	lea	(VDP_DATA).l,a1
; $00852A
	move.l	d1,(VDP_CTRL).l
; $008530
	move.w	(a2)+,(a1)
; $008532
	move.w	(a2),(a1)
; $008534
	movem.l	(a7)+,d5/d6/a6
; $008538
	bra.w	loc_00857C

loc_00853C:				; $00853C
	cmpi.w	#$00A9,d0
; $008540
	bne.w	loc_00857C

loc_008544:				; $008544
	move.w	(VDP_HVCOUNTER).l,d0
; $00854A
	andi.w	#$00FF,d0
; $00854E
	cmpi.w	#$0078,d0
; $008552
	bmi.w	loc_008544
; $008556
	movem.l	a6,-(a7)
; $00855A
	move.w	#$8100,d1
; $00855E
	move.b	($FFFF81A9).w,d1
; $008562
	andi.b	#$BF,d1
; $008566
	move.w	d1,(VDP_CTRL).l
; $00856C
	move.b	d1,($FFFF81A9).w
; $008570
	movem.l	(a7)+,a6

loc_008574:				; $008574
	move.w	#$8004,(VDP_CTRL).l	; VDP reg #0 = $04 (Mode1: off)

loc_00857C:				; $00857C
	movem.l	(a7)+,a7
; $008580
	rte

loc_008582:				; $008582
	move.l	#$C0000000,(VDP_CTRL).l	; VDP CRAM write addr=$0000
; $00858C
	move.w	#$003F,d1

loc_008590:				; $008590
	move.w	#$000E,(VDP_DATA).l
; $008598
	dbf	d1,loc_008590

loc_00859C:				; $00859C
	nop
; $00859E
	bra.s	loc_00859C

loc_0085A0:				; $0085A0
	moveq	#100,d2

loc_0085A2:				; $0085A2
	move.l	d1,-(a7)
; $0085A4
	tst.w	d2
; $0085A6
	beq.w	loc_0085EA

loc_0085AA:				; $0085AA
	move.l	($FFFF8164).l,d1
; $0085B0
	add.l	d1,d1
; $0085B2
	add.l	d1,d1
; $0085B4
	add.l	d1,d1
; $0085B6
	sub.l	($FFFF8164).l,d1
; $0085BC
	addi.l	#$5D79B3F1,d1
; $0085C2
	move.l	d1,($FFFF8164).l
; $0085C8
	pea	d1
; $0085CA
	cmp.w	d1,d2
; $0085CC
	bhi.s	loc_0085DA

loc_0085CE:				; $0085CE
	andi.w	#$00FF,d1
; $0085D2
	cmp.w	d1,d2
; $0085D4
	bhi.s	loc_0085DA
; $0085D6
	sub.w	d2,d1
; $0085D8
	bra.s	loc_0085CE

loc_0085DA:				; $0085DA
	cmp.w	($FFFF8168).l,d1
; $0085E0
	beq.s	loc_0085AA
; $0085E2
	move.w	d1,($FFFF8168).l
; $0085E8
	move.w	d1,d2

loc_0085EA:				; $0085EA
	move.l	(a7)+,d1
; $0085EC
	rts

; ★ ═══ 控制器读取 (Joypad Read) $85EE ═══
loc_0085EE:				; $0085EE
	movea.l	($FFFF8000).l,a0
; $0085F4
	move.l	($FFFF8004).l,-(a0)
; $0085FA
	move.l	a0,($FFFF8000).l
; $008600