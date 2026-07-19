; ==================================================================
; DMA 子系统初始化
; ROM: $0086B0–$008A70 | Lines: 22836–23378
; Type: CODE
; ==================================================================
;
; DMA 初始化 ($86B4)。
;

; $0086B0
	ori.l	#$009C40E7,(a4)
; $0086B6
	not.?	#$2700
; $0086BA
	move.w	#$0100,(Z80_BUSREQ).l
; $0086C2
	move.w	#$0100,(Z80_RESET).l
; $0086CA
	lea	(Z80_RAM).l,a1
; $0086D0
	lea	($1EC000).l,a0
; $0086D6
	move.w	#$1FFF,d0

loc_0086DA:				; $0086DA
	move.b	(a0)+,d7

loc_0086DC:				; $0086DC
	move.b	d7,(a1)
; $0086DE
	move.b	(a1),d6
; $0086E0
	cmp.b	d6,d7
; $0086E2
	bne.s	loc_0086DC
; $0086E4
	addq.l	#1,a1
; $0086E6
	dbf	d0,loc_0086DA
; $0086EA
	move.w	#$0000,(Z80_RESET).l
; $0086F2
	move.w	#$00BF,d1

loc_0086F6:				; $0086F6
	nop
; $0086F8
	dbf	d1,loc_0086F6
; $0086FC
	move.w	#$0100,(Z80_RESET).l
; $008704
	bsr.w	loc_008990
; $008708
	rte

loc_00870A:				; $00870A
	movem.l	a7/a6/a5/a4/d7/d6/d5,-(a7)
; $00870E
	negx.?	-(a7)
; $008710
	move.b	($FFFF8180).l,($FFFF817A).l
; $00871A
	move.b	($FFFF8181).l,($FFFF817B).l
; $008724
	move.b	($FFFF817C).l,($FFFF817E).l
; $00872E
	move.b	($FFFF817D).l,($FFFF817F).l
; $008738
	bsr.w	loc_008978
; $00873C
	lea	($FFFF8180).l,a1
; $008742
	lea	(IO_DATA_1).l,a0
; $008748
	moveq	#0,d0
; $00874A
	bsr.w	loc_008872
; $00874E
	bsr.w	loc_008990
; $008752
	lea	($FFFF8184).l,a1
; $008758
	lea	($FFFF8186).l,a2
; $00875E
	move.b	($FFFF8179).l,($FFFF8182).l
; $008768
	move.b	($FFFF8180).l,d1
; $00876E
	cmp.b	($FFFF817A).l,d1
; $008774
	beq.s	loc_00877A
; $008776
	clr.w	(a1)
; $008778
	bra.s	loc_008796

loc_00877A:				; $00877A
	tst.w	(a1)
; $00877C
	bne.s	loc_008788
; $00877E
	move.w	#$0001,(a1)
; $008782
	move.w	#$001A,(a2)
; $008786
	bra.s	loc_008796

loc_008788:				; $008788
	subq.w	#1,(a2)
; $00878A
	bne.s	loc_008796
; $00878C
	move.b	d1,($FFFF8182).l
; $008792
	move.w	#$0003,(a2)

loc_008796:				; $008796
	move.b	($FFFF8180).l,d1
; $00879C
	move.b	($FFFF8181).l,d2
; $0087A2
	move.b	d1,($FFFF8178).l
; $0087A8
	move.b	d2,($FFFF8179).l
; $0087AE
	andi.b	#$78,($0FFFFF).l
; $0087B6
	andi.b	#$79,($0FFFFF).l
; $0087BE
	moveq	#0,d3
; $0087C0
	move.b	($FFFFA4A6).w,d3
; $0087C4
	btst	#7,d1
; $0087C8
	beq.w	loc_0087D2
; $0087CC
	bchg	d3,($FFFF8178).l

loc_0087D2:				; $0087D2
	btst	#7,d2
; $0087D6
	beq.w	loc_0087E0
; $0087DA
	bchg	d3,($FFFF8179).l

loc_0087E0:				; $0087E0
	move.b	($FFFFA4A7).w,d3
; $0087E4
	btst	#6,d1
; $0087E8
	beq.w	loc_0087F2
; $0087EC
	bchg	d3,($FFFF8178).l

loc_0087F2:				; $0087F2
	btst	#6,d2
; $0087F6
	beq.w	loc_008800
; $0087FA
	bchg	d3,($FFFF8179).l

loc_008800:				; $008800
	move.b	($FFFFA4A8).w,d3
; $008804
	btst	#4,d1
; $008808
	beq.w	loc_008812
; $00880C
	bchg	d3,($FFFF8178).l

loc_008812:				; $008812
	btst	#4,d2
; $008816
	beq.w	loc_008820
; $00881A
	bchg	d3,($FFFF8179).l

loc_008820:				; $008820
	move.b	($FFFFA4A9).w,d3
; $008824
	btst	#5,d1
; $008828
	beq.w	loc_008832
; $00882C
	bchg	d3,($FFFF8178).l

loc_008832:				; $008832
	btst	#5,d2
; $008836
	beq.w	loc_008840
; $00883A
	bchg	d3,($FFFF8179).l

loc_008840:				; $008840
	move.b	($FFFF8178).l,d1
; $008846
	cmp.b	($FFFF81A7).l,d1
; $00884C
	beq.w	loc_00886A
; $008850
	moveq	#30,d2
; $008852
	lea	($FFFF8188).l,a1
; $008858
	lea	($FFFF8189).l,a2

loc_00885E:				; $00885E
	move.b	(a2)+,(a1)+
; $008860
	dbf	d2,loc_00885E
; $008864
	move.b	d1,($FFFF81A7).l

loc_00886A:				; $00886A
	not.?	(a7)+
; $00886C
	movem.l	(a7)+,d5/d6/d7/a4/a5/a6/a7
; $008870
	rts

loc_008872:				; $008872
	bsr.w	loc_0088A2
; $008876
	andi.w	#$000E,d0
; $00887A
	add.w	d0,d0
; $00887C
	jsr	($4,pc,d0.w)
; $008880
	rts
; $008882
	bra.w	loc_0088D8
; $008886
	bra.w	loc_0088D8
; $00888A
	bra.w	loc_0088D8
; $00888E
	bra.w	loc_0088D8
; $008892
	bra.w	loc_0088D8
; $008896
	bra.w	loc_0088D8
; $00889A
	bra.w	loc_0088DE
; $00889E
	bra.w	loc_0088D8

loc_0088A2:				; $0088A2
	movem.l	a5/a4,-(a7)
; $0088A6
	moveq	#0,d0
; $0088A8
	move.b	#$70,(a0)
; $0088AC
	bsr.s	loc_0088BE
; $0088AE
	pea	d1
; $0088B0
	move.b	#$30,(a0)
; $0088B4
	add.w	d0,d0
; $0088B6
	bsr.s	loc_0088BE
; $0088B8
	movem.l	(a7)+,a4/a5
; $0088BC
	rts

loc_0088BE:				; $0088BE
	move.b	(a0),d1
; $0088C0
	move.b	d1,d2
; $0088C2
	andi.b	#$0C,d2
; $0088C6
	beq.s	loc_0088CA
; $0088C8
	addq.w	#1,d0

loc_0088CA:				; $0088CA
	add.w	d0,d0
; $0088CC
	move.b	d1,d3
; $0088CE
	andi.w	#$0003,d3
; $0088D2
	beq.s	loc_0088D6
; $0088D4
	addq.w	#1,d0

loc_0088D6:				; $0088D6
	rts

loc_0088D8:				; $0088D8
	move.b	#$40,(a0)
; $0088DC
	rts

loc_0088DE:				; $0088DE
	move.b	#$40,$6(a0)
; $0088E4
	moveq	#2,d3

loc_0088E6:				; $0088E6
	move.l	d1,d0
; $0088E8
	andi.b	#$0F,d0
; $0088EC
	beq.s	loc_008926
; $0088EE
	move.b	#$40,(a0)
; $0088F2
	moveq	#0,d1
; $0088F4
	move.b	$0(a0),d1
; $0088F8
	move.b	#$00,(a0)
; $0088FC
	pea	d1
; $0088FE
	move.b	$0(a0),d1
; $008902
	dbf	d3,loc_0088E6
; $008906
	move.b	#$40,$6(a0)
; $00890C
	move.w	d1,d0
; $00890E
	pea	d1
; $008910
	move.b	#$40,(a0)
; $008914
	roxl.b	#2,d0
; $008916
	andi.w	#$00C0,d0
; $00891A
	andi.w	#$003F,d1
; $00891E
	or.b	d1,d0
; $008920
	not.b	d0
; $008922
	bsr.s	loc_008964
; $008924
	rts

loc_008926:				; $008926
	move.b	#$40,(a0)
; $00892A
	moveq	#0,d2
; $00892C
	move.b	$0(a0),d2
; $008930
	move.b	#$00,(a0)
; $008934
	pea	d2
; $008936
	move.b	$0(a0),d2
; $00893A
	move.w	d1,d0
; $00893C
	pea	d1
; $00893E
	roxl.b	#2,d0
; $008940
	andi.w	#$00C0,d0
; $008944
	andi.w	#$003F,d1
; $008948
	or.b	d1,d0
; $00894A
	not.b	d0
; $00894C
	pea	d2
; $00894E
	not.b	d2
; $008950
	andi.w	#$0007,d2
; $008954
	beq.w	loc_00895C
; $008958
	ori.b	#$80,d0

loc_00895C:				; $00895C
	bsr.w	loc_008964
; $008960
	bra.w	loc_0088D8

loc_008964:				; $008964
	move.w	d2,-(a7)
; $008966
	move.b	d0,d1
; $008968
	move.b	(a1),d2
; $00896A
	eor.b	d2,d0
; $00896C
	move.b	d1,(a1)
; $00896E
	and.b	d1,d0
; $008970
	move.b	d0,$1(a1)
; $008974
	move.w	(a7)+,d2
; $008976
	rts

loc_008978:				; $008978
	not.?	#$2700
; $00897C
	move.w	#$0100,(Z80_BUSREQ).l

loc_008984:				; $008984
	btst	#0,(Z80_BUSREQ).l
; $00898C
	bne.s	loc_008984
; $00898E
	rts

loc_008990:				; $008990
	move.w	#$0000,(Z80_BUSREQ).l
; $008998
	rts

loc_00899A:				; $00899A
	movem.l	a6/a5/d6,-(a7)
; $00899E
	lea	($FFFF81A8).l,a1
; $0089A4
	move.b	d2,($0,a1,d1.w)
; $0089A8
	addi.w	#$0080,d1
; $0089AC
	asl.w	#8,d1
; $0089AE
	move.b	d2,d1
; $0089B0
	movea.l	($FFFF81C4).w,a1
; $0089B4
	move.w	#$FFFE,(a1)+
; $0089B8
	move.w	d1,(a1)+
; $0089BA
	move.l	a1,($FFFF81C4).w
; $0089BE
	movem.l	(a7)+,d6/a5/a6
; $0089C2
	rts

loc_0089C4:				; $0089C4
	movem.l	d6,-(a7)
; $0089C8
	move.w	d1,d0
; $0089CA
	addi.w	#$0080,d0
; $0089CE
	asl.w	#8,d0
; $0089D0
	lea	($FFFF81A8).l,a1
; $0089D6
	move.b	($0,a1,d1.w),d0
; $0089DA
	movem.l	(a7)+,d6
; $0089DE
	rts
; $0089E0
	movem.l	a6/a5,-(a7)
; $0089E4
	move.w	#$0001,($FFFF8160).w
; $0089EA
	moveq	#18,d1
; $0089EC
	move.w	#$0002,d2
; $0089F0
	bsr.w	loc_00899A
; $0089F4
	move.w	#$0001,($FFFF816E).w
; $0089FA
	movem.l	(a7)+,a5/a6
; $0089FE
	rts
; $008A00
	movem.l	a6/a5,-(a7)
; $008A04
	move.w	#$0000,($FFFF8160).w
; $008A0A
	moveq	#18,d1
; $008A0C
	move.w	#$0097,d2
; $008A10
	bsr.w	loc_00899A
; $008A14
	move.w	#$0000,($FFFF816E).w
; $008A1A
	movem.l	(a7)+,a5/a6
; $008A1E
	rts

loc_008A20:				; $008A20
	movem.l	a7/a6/d7/d6,-(a7)
; $008A24
	moveq	#32,d0
; $008A26
	move.w	(a0)+,d1
; $008A28
	sub.w	d1,d0
; $008A2A
	lea	($FFFF8188).w,a1
; $008A2E
	adda.w	d0,a1
; $008A30
	subq.w	#1,d1

loc_008A32:				; $008A32
	move.b	(a1)+,d0
; $008A34
	cmp.b	(a0)+,d0
; $008A36
	bne.w	loc_008A56
; $008A3A
	dbf	d1,loc_008A32
; $008A3E
	move.b	(a0),d1
; $008A40
	beq.w	loc_008A4E
; $008A44
	move.b	($FFFF8179).w,d0
; $008A48
	and.w	d1,d0
; $008A4A
	beq.w	loc_008A56

loc_008A4E:				; $008A4E
	ori	#$00,ccr
; $008A54
	ori.b	#$3C,d6
; $008A58
	ori.?	#?,(-$21,pc,d4.l)
; $008A5C
	btst	d1,d3
; $008A5E
	rts
; $008A60
	move.l	#$FFFF81CC,($FFFF81C4).l
; $008A6A
	rts

; ★ ═══ 显示队列 / VDP 命令队列处理 $8A6C ═══
loc_008A6C:				; $008A6C
	negx.?	-(a7)
; $008A6E