; ==================================================================
; 任务调度器 & 通用 DMA
; ROM: $009430–$0097E0 | Lines: 24990–25580
; Type: CODE
; ==================================================================
;
; 任务调度器 ($942A)。通用 DMA ($97DC)。
;

; $00942E
	movea.l	#$FFFF95B8,a1
; $009434
	move.w	#$0000,d1

loc_009438:				; $009438
	clr.w	(a1)
; $00943A
	adda.w	#$002A,a1
; $00943E
	dbf	d1,loc_009438
; $009442
	movea.l	#$FFFF95E2,a1
; $009448
	move.w	#$003F,d1

loc_00944C:				; $00944C
	clr.w	(a1)
; $00944E
	adda.w	#$0016,a1
; $009452
	dbf	d1,loc_00944C
; $009456
	movea.l	#$FFFF9B62,a1
; $00945C
	move.w	#$000F,d1

loc_009460:				; $009460
	clr.w	(a1)
; $009462
	adda.w	#$0016,a1
; $009466
	dbf	d1,loc_009460
; $00946A
	movea.l	#$FFFF9CC2,a1
; $009470
	move.w	#$0000,d1

loc_009474:				; $009474
	clr.w	(a1)
; $009476
	adda.w	#$002E,a1
; $00947A
	dbf	d1,loc_009474
; $00947E
	movea.l	#$FFFF9CF0,a1
; $009484
	move.w	#$000F,d1

loc_009488:				; $009488
	clr.w	(a1)
; $00948A
	adda.w	#$0022,a1
; $00948E
	dbf	d1,loc_009488
; $009492
	movem.l	(a7)+,d6/a6
; $009496
	rts

loc_009498:				; $009498
	lea	($FFFF95B8).l,a6
; $00949E
	adda.w	d0,a6
; $0094A0
	move.w	d1,($FFFF95B4).l
; $0094A6
	move.w	d2,($FFFF95B6).l

loc_0094AC:				; $0094AC
	move.l	a6,($FFFF95B0).l
; $0094B2
	tst.w	(a6)
; $0094B4
	beq.w	loc_0094BC
; $0094B8
	movea.w	(a6),a0
; $0094BA
	jsr	(a0)

loc_0094BC:				; $0094BC
	movea.l	($FFFF95B0).l,a6
; $0094C2
	adda.w	($FFFF95B4).l,a6
; $0094C8
	subq.w	#1,($FFFF95B6).l
; $0094CE
	bne.s	loc_0094AC
; $0094D0
	rts

loc_0094D2:				; $0094D2
	movea.l	#$FFFF95B8,a0
; $0094D8
	moveq	#0,d0
; $0094DA
	rts

loc_0094DC:				; $0094DC
	movea.l	#$FFFF95E2,a0
; $0094E2
	move.w	#$003F,d0

loc_0094E6:				; $0094E6
	tst.w	(a0)
; $0094E8
	beq.w	loc_0094F8
; $0094EC
	adda.w	#$0016,a0
; $0094F0
	dbf	d0,loc_0094E6
; $0094F4
	moveq	#1,d0
; $0094F6
	rts

loc_0094F8:				; $0094F8
	moveq	#0,d0
; $0094FA
	rts

loc_0094FC:				; $0094FC
	movea.l	#$FFFF9B62,a0
; $009502
	move.w	#$000F,d0

loc_009506:				; $009506
	tst.w	(a0)
; $009508
	beq.w	loc_009518
; $00950C
	adda.w	#$0016,a0
; $009510
	dbf	d0,loc_009506
; $009514
	moveq	#1,d0
; $009516
	rts

loc_009518:				; $009518
	moveq	#0,d0
; $00951A
	rts

loc_00951C:				; $00951C
	movea.l	#$FFFF9CC2,a0
; $009522
	move.w	#$0000,d0

loc_009526:				; $009526
	tst.w	(a0)
; $009528
	beq.w	loc_009538
; $00952C
	adda.w	#$002E,a0
; $009530
	dbf	d0,loc_009526
; $009534
	moveq	#1,d0
; $009536
	rts

loc_009538:				; $009538
	moveq	#0,d0
; $00953A
	rts

loc_00953C:				; $00953C
	movea.l	#$FFFF9CF0,a0
; $009542
	move.w	#$000F,d0

loc_009546:				; $009546
	tst.w	(a0)
; $009548
	beq.w	loc_009558
; $00954C
	adda.w	#$0022,a0
; $009550
	dbf	d0,loc_009546
; $009554
	moveq	#1,d0
; $009556
	rts

loc_009558:				; $009558
	moveq	#0,d0
; $00955A
	rts

loc_00955C:				; $00955C
	movem.l	a6/d6,-(a7)
; $009560
	movea.l	#$FFFF95E2,a1
; $009566
	move.w	#$003F,d1

loc_00956A:				; $00956A
	cmp.w	(a1),d0
; $00956C
	bne.w	loc_009572
; $009570
	clr.w	(a1)

loc_009572:				; $009572
	adda.w	#$0016,a1
; $009576
	dbf	d1,loc_00956A
; $00957A
	movem.l	(a7)+,d6/a6
; $00957E
	rts

loc_009580:				; $009580
	movem.l	a6/d6,-(a7)
; $009584
	movea.l	#$FFFF9B62,a1
; $00958A
	move.w	#$000F,d1

loc_00958E:				; $00958E
	cmp.w	(a1),d0
; $009590
	bne.w	loc_009596
; $009594
	clr.w	(a1)

loc_009596:				; $009596
	adda.w	#$0016,a1
; $00959A
	dbf	d1,loc_00958E
; $00959E
	movem.l	(a7)+,d6/a6
; $0095A2
	rts

loc_0095A4:				; $0095A4
	movem.l	a6/d6,-(a7)
; $0095A8
	movea.l	#$FFFF9CC2,a1
; $0095AE
	move.w	#$0000,d1

loc_0095B2:				; $0095B2
	cmp.w	(a1),d0
; $0095B4
	bne.w	loc_0095BA
; $0095B8
	clr.w	(a1)

loc_0095BA:				; $0095BA
	adda.w	#$002E,a1
; $0095BE
	dbf	d1,loc_0095B2
; $0095C2
	movem.l	(a7)+,d6/a6
; $0095C6
	rts

loc_0095C8:				; $0095C8
	movem.l	a6/d6,-(a7)
; $0095CC
	movea.l	#$FFFF9CF0,a1
; $0095D2
	move.w	#$000F,d1

loc_0095D6:				; $0095D6
	cmp.w	(a1),d0
; $0095D8
	bne.w	loc_0095DE
; $0095DC
	clr.w	(a1)

loc_0095DE:				; $0095DE
	adda.w	#$0022,a1
; $0095E2
	dbf	d1,loc_0095D6
; $0095E6
	movem.l	(a7)+,d6/a6
; $0095EA
	rts

loc_0095EC:				; $0095EC
	movem.l	a7/a6/a5/a4/a3/a2/a0/d7/d6/d5,-(a7)
; $0095F0
	bsr.w	loc_0097C8
; $0095F4
	move.w	d0,($FFFF9F10).l
; $0095FA
	move.w	d4,($FFFF9F16).l
; $009600
	move.w	d5,($FFFF9F18).l
; $009606
	move.w	#$0002,d1
; $00960A
	move.w	$2(a1),d2
; $00960E
	add.w	d2,d2
; $009610
	addq.w	#6,d2
; $009612
	move.w	$2(a1),d3
; $009616
	move.w	$4(a1),d4
; $00961A
	subq.w	#1,d3
; $00961C
	subq.w	#1,d4
; $00961E
	move.w	#$0006,($FFFF9F12).l
; $009626
	btst	#11,d5
; $00962A
	beq.s	loc_00963C
; $00962C
	move.w	$2(a1),d0
; $009630
	subq.w	#1,d0
; $009632
	add.w	d0,d0
; $009634
	add.w	d0,($FFFF9F12).l
; $00963A
	neg.w	d1

loc_00963C:				; $00963C
	btst	#12,d5
; $009640
	beq.s	loc_00965A
; $009642
	move.w	$2(a1),d7
; $009646
	addq.w	#3,d7
; $009648
	add.w	d7,d7
; $00964A
	move.w	$4(a1),d0
; $00964E
	subq.w	#1,d0
; $009650
	mulu.w	d0,d7
; $009652
	add.w	d7,($FFFF9F12).l
; $009658
	neg.w	d2

loc_00965A:				; $00965A
	cmpi.w	#$0001,(a1)
; $00965E
	beq.s	loc_009664
; $009660
	exg	a1,a2
; $009662
	exg	a3,a4

loc_009664:				; $009664
	move.w	d1,($FFFF9F1A).l
; $00966A
	move.w	d2,($FFFF9F1C).l
; $009670
	move.w	d3,($FFFF9F1E).l
; $009676
	move.w	d4,($FFFF9F20).l
; $00967C
	movea.l	a1,a2
; $00967E
	movea.l	($FFFF81C4).w,a1
; $009682
	movea.w	a1,a0
; $009684
	adda.w	($FFFF9F12).l,a0
; $00968A
	move.l	a0,($FFFF9F12).l
; $009690
	move.w	($FFFF9F10).l,d1
; $009696
	move.w	$2(a2),d2
; $00969A
	move.w	$4(a2),d3
; $00969E
	subq.w	#1,d3

loc_0096A0:				; $0096A0
	move.w	#$FFF8,(a1)+
; $0096A4
	move.w	d1,(a1)+
; $0096A6
	move.w	d2,(a1)+
; $0096A8
	addi.w	#$0080,d1
; $0096AC
	adda.w	d2,a1
; $0096AE
	adda.w	d2,a1
; $0096B0
	dbf	d3,loc_0096A0
; $0096B4
	move.l	a1,($FFFF81C4).w
; $0096B8
	movea.l	a2,a1
; $0096BA
	addq.w	#6,a1
; $0096BC
	movea.l	($FFFF9F12).l,a2
; $0096C2
	clr.w	d5
; $0096C4
	clr.b	($FFFF9F22).l
; $0096CA
	move.w	($FFFF9F16).l,d4
; $0096D0
	move.w	($FFFF9F1E).l,d3

loc_0096D6:				; $0096D6
	clr.w	d2
; $0096D8
	move.b	(a1)+,d2
; $0096DA
	cmpi.b	#$F8,d2
; $0096DE
	bcs.s	loc_00971A
; $0096E0
	lea	($00976A).l,a0
; $0096E6
	subi.w	#$00F8,d2
; $0096EA
	add.w	d2,d2
; $0096EC
	add.w	d2,d2
; $0096EE
	movea.l	($0,a0,d2.w),a0
; $0096F2
	jmp	(a0)
; $0096F4
	clr.w	d5
; $0096F6
	bra.s	loc_0096D6
; $0096F8
	move.w	#$0800,d5
; $0096FC
	bra.s	loc_0096D6
; $0096FE
	move.w	#$1000,d5
; $009702
	bra.s	loc_0096D6
; $009704
	move.w	#$1800,d5
; $009708
	bra.s	loc_0096D6
; $00970A
	move.b	(a1)+,($FFFF9F22).l
; $009710
	subq.b	#1,($FFFF9F22).l
; $009716
	bra.w	loc_0096D6

loc_00971A:				; $00971A
	add.w	d4,d2
; $00971C
	or.w	d5,d2
; $00971E
	move.w	($FFFF9F18).l,d0
; $009724
	eor.w	d0,d2
; $009726
	move.w	d2,(a2)
; $009728
	tst.b	($FFFF9F22).l
; $00972E
	beq.s	loc_009738
; $009730
	subq.b	#1,($FFFF9F22).l
; $009736
	subq.w	#1,a1

loc_009738:				; $009738
	adda.w	($FFFF9F1A).l,a2
; $00973E
	dbf	d3,loc_0096D6
; $009742
	movea.l	($FFFF9F12).l,a2
; $009748
	adda.w	($FFFF9F1C).l,a2
; $00974E
	move.l	a2,($FFFF9F12).l
; $009754
	move.w	($FFFF9F1E).l,d3
; $00975A
	subq.w	#1,($FFFF9F20).l
; $009760
	bcc.w	loc_0096D6
; $009764
	movem.l	(a7)+,d5/d6/d7/a0/a2/a3/a4/a5/a6/a7
; $009768
	rts
; $00976A
	dc.w	$0000
; $00976C
	dc.w	$0000
; $00976E
	dc.w	$0000
; $009770
	dc.w	$0000
; $009772
	dc.w	$0000
; $009774
	dc.w	$96F4
; $009776
	dc.w	$0000
; $009778
	dc.w	$96F8
; $00977A
	dc.w	$0000
; $00977C
	dc.w	$96FE
; $00977E
	dc.w	$0000
; $009780
	dc.w	$9704
; $009782
	dc.w	$0000
; $009784
	dc.w	$970A
; $009786
	dc.w	$0000
; $009788
	dc.w	$9764
; $00978A
	movem.l	a4/a3/d6,-(a7)
; $00978E
	movea.l	($FFFF81C4).w,a1
; $009792
	move.w	d1,d3
; $009794
	addq.w	#1,d3
; $009796
	move.w	d2,d4
; $009798
	asl.w	#8,d4
; $00979A
	move.w	#$FFFC,(a1)+
; $00979E
	move.w	d1,(a1)+
; $0097A0
	move.w	d4,(a1)+
; $0097A2
	move.w	#$0800,(a1)+
; $0097A6
	move.w	#$0002,(a1)+
; $0097AA
	move.w	#$FFFC,(a1)+
; $0097AE
	move.w	d3,(a1)+
; $0097B0
	move.w	d2,(a1)+
; $0097B2
	move.w	#$0800,(a1)+
; $0097B6
	move.w	#$0002,(a1)+
; $0097BA
	move.w	d1,(a1)+
; $0097BC
	move.w	d2,(a1)+
; $0097BE
	move.l	a1,($FFFF81C4).w
; $0097C2
	movem.l	(a7)+,d6/a3/a4
; $0097C6
	rts

loc_0097C8:				; $0097C8
	movem.l	a6/a5,-(a7)
; $0097CC
	move.w	d3,d0
; $0097CE
	add.w	d1,d1
; $0097D0
	add.w	d1,d0
; $0097D2
	rol.w	#7,d2
; $0097D4
	add.w	d2,d0
; $0097D6
	movem.l	(a7)+,a5/a6
; $0097DA
	rts

; ★ ═══ 通用 DMA 传输函数 $97DC ═══
loc_0097DC:				; $0097DC
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d5/d4,-(a7)
; $0097E0