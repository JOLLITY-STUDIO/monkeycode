; ==================================================================
; 游戏主体逻辑
; ROM: $010000–$01C800 | Lines: 39729–66921
; Type: CODE
; ==================================================================
;
; 战斗系统、角色管理、事件脚本等核心逻辑 ($010000-$01C7FF)。
;

; $010000
	move.w	($FFFFA6EE).l,d4
; $010006
	move.w	($FFFFA6F0).l,d5
; $01000C
	jsr	($00A78C).l
; $010012
	bra.w	loc_01006C

loc_010016:				; $010016
	move.w	($FFFFA6F0).l,d0
; $01001C
	cmp.w	($FFFFA6E0).l,d0
; $010022
	beq.w	loc_010036
; $010026
	bcs.w	loc_010032
; $01002A
	ori.b	#$02,d1
; $01002E
	bra.w	loc_010036

loc_010032:				; $010032
	ori.b	#$01,d1

loc_010036:				; $010036
	move.w	($FFFFA6EE).l,d0
; $01003C
	cmp.w	($FFFFA6DE).l,d0
; $010042
	beq.w	loc_010056
; $010046
	bcs.w	loc_010052
; $01004A
	ori.b	#$08,d1
; $01004E
	bra.w	loc_010056

loc_010052:				; $010052
	ori.b	#$04,d1

loc_010056:				; $010056
	move.b	d1,($FFFFA616).w
; $01005A
	andi.w	#$000F,d1
; $01005E
	bne.w	loc_01007E
; $010062
	cmpi.b	#$30,($000001).w
; $010068
	bhi.w	loc_01007E

loc_01006C:				; $01006C
	clr.b	($FFFFA615).w
; $010070
	move.b	#$01,($FFFFA6F6).l

loc_010078:				; $010078
	jsr	($008608).l

loc_01007E:				; $01007E
	rts

loc_010080:				; $010080
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $010084
	move.w	($FFFFA6E0).l,d0
; $01008A
	mulu.w	($FFFF9F2C).w,d0
; $01008E
	add.w	($FFFFA6DE).l,d0
; $010094
	lsl.w	#1,d0
; $010096
	lea	($FF3000).l,a0
; $01009C
	move.b	($0,a0,d0.w),d0
; ── $100A0-$100D8: 精灵属性 VDP 命令构造 (非 LZSS) ──
; ★ 注: LZSS 解压函数位置待定位 (由 $99B2 资源加载、$99FA 类型分发调用)
; ★ LZSS 格式: [outSize:2B] [stream]; 滑动窗口 4096B; flag LSB-first; offset=12bit; len=3-18
; ★ offset=0 → 自引用重复前一字节 (非结束标记); 解压在 dst=outSize 时停止
; $0100A0
	andi.w	#$00FF,d0
; $0100A4
	bsr.w	loc_0108AC
; $0100A8
	movea.l	($FFFF81C4).w,a1
; $0100AC
	lea	($FFFFA7EE).l,a0
; $0100B2
	movea.w	#$1160,a2
; $0100B6
	moveq	#2,d0

loc_0100B8:				; $0100B8
	move.w	(a0)+,d1
; $0100BA
	beq.w	loc_0100DA
; $0100BE
	subq.w	#1,d1
; $0100C0
	andi.l	#$0000FFFF,d1
; $0100C6
	rol.l	#7,d1
; $0100C8
	addi.l	#$00060668,d1
; $0100CE
	move.w	#$FFF9,(a1)+
; $0100D2
	move.w	a2,(a1)+
; $0100D4
	move.l	d1,(a1)+
; $0100D6
	move.w	#$0040,(a1)+

loc_0100DA:				; $0100DA
	lea	$80(a2),a2
; $0100DE
	dbf	d0,loc_0100B8
; $0100E2
	cmpi.w	#$AE92,(rom).w
; $0100E8
	beq.w	loc_0100F6
; $0100EC
	cmpi.b	#$60,($000001).w
; $0100F2
	beq.w	loc_010108

loc_0100F6:				; $0100F6
	lea	($FFFFA714).l,a0
; $0100FC
	move.w	#$006B,d0

loc_010100:				; $010100
	ori.w	#$8000,(a0)+
; $010104
	dbf	d0,loc_010100

loc_010108:				; $010108
	lea	($FFFFA714).l,a0
; $01010E
	move.w	#$DC04,d0
; $010112
	moveq	#2,d1

loc_010114:				; $010114
	move.w	#$FFF9,(a1)+
; $010118
	move.w	d0,(a1)+
; $01011A
	move.l	a0,(a1)+
; $01011C
	move.w	#$0024,(a1)+
; $010120
	lea	$48(a0),a0
; $010124
	addi.w	#$0080,d0
; $010128
	dbf	d1,loc_010114
; $01012C
	move.l	a1,($FFFF81C4).w
; $010130
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $010134
	rts

loc_010136:				; $010136
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d5/d4/d3/d2/d1,-(a7)
; $01013A
	lea	($FFFFA714).l,a6
; $010140
	move.w	#$0020,d0
; $010144
	move.w	#$006B,d1
; $010148
	movea.l	a6,a0

loc_01014A:				; $01014A
	move.w	d0,(a0)+
; $01014C
	dbf	d1,loc_01014A
; $010150
	move.w	($FFFFA6E0).l,d0
; $010156
	mulu.w	($FFFF9F2C).w,d0
; $01015A
	add.w	($FFFFA6DE).l,d0
; $010160
	lsl.w	#1,d0
; $010162
	move.w	d0,($FFFFA70A).l
; $010168
	lea	($FF3000).l,a0
; $01016E
	move.b	($0,a0,d0.w),d0
; $010172
	andi.w	#$00FF,d0
; $010176
	move.b	d0,($FFFFA7F4).l
; $01017C
	lea	($080B58).l,a0
; $010182
	move.b	($0,a0,d0.w),d1
; $010186
	move.b	d1,($FFFFA7F5).l
; $01018C
	moveq	#3,d2
; $01018E
	moveq	#0,d3
; $010190
	moveq	#0,d4
; $010192
	moveq	#1,d5
; $010194
	movea.l	#$FFFFA764,a0
; $01019A
	bsr.w	loc_01077E
; $01019E
	tst.b	($FFFFA617).w
; $0101A2
	beq.w	loc_0101B2
; $0101A6
	movea.l	($FFFFA62C).w,a0
; $0101AA
	move.b	$0(a0),d1
; $0101AE
	bsr.w	loc_01066E

loc_0101B2:				; $0101B2
	move.w	($FFFFA70A).l,d0
; $0101B8
	lea	($FF5000).l,a0
; $0101BE
	moveq	#0,d6
; $0101C0
	move.b	($0,a0,d0.w),d6
; $0101C4
	bmi.w	loc_0105AC
; $0101C8
	move.w	d6,d1
; $0101CA
	lea	($05E5D8).l,a3
; $0101D0
	add.w	d1,d1
; $0101D2
	add.w	d1,d1
; $0101D4
	movea.l	($0,a3,d1.w),a4
; $0101D8
	movea.l	a4,a5
; $0101DA
	clr.w	($FFFFA7F6).l
; $0101E0
	moveq	#0,d7
; $0101E2
	move.b	($1,a0,d0.w),d7
; $0101E6
	beq.w	loc_010342
; $0101EA
	move.w	d7,d1
; $0101EC
	add.w	d1,d1
; $0101EE
	add.w	d1,d1
; $0101F0
	movea.l	($50,a3,d1.w),a5
; $0101F4
	adda.l	a4,a5
; $0101F6
	btst	#6,$2(a5)
; $0101FC
	beq.w	loc_01020C
; $010200
	move.w	#$0001,($FFFFA7F6).l
; $010208
	bra.w	loc_010342

loc_01020C:				; $01020C
	lea	($05EDDC).l,a3
; $010212
	moveq	#0,d1
; $010214
	move.b	$0(a5),d1
; $010218
	mulu.w	#$001C,d1
; $01021C
	move.b	($B,a3,d1.w),($FFFFA70C).l
; $010224
	move.b	($C,a3,d1.w),($FFFFA70D).l
; $01022C
	move.b	$46(a4),($FFFFA70F).l
; $010234
	move.b	$47(a4),($FFFFA710).l
; $01023C
	btst	#3,$8(a4)
; $010242
	bne.w	loc_01029E
; $010246
	move.b	$45(a4),($FFFFA70E).l
; $01024E
	bsr.w	loc_010936
; $010252
	move.b	$6(a4),d2
; $010256
	sub.b	$6(a5),d2
; $01025A
	bpl.w	loc_010260
; $01025E
	neg.b	d2

loc_010260:				; $010260
	move.b	$7(a4),d3
; $010264
	sub.b	$7(a5),d3
; $010268
	bpl.w	loc_01026E
; $01026C
	neg.b	d3

loc_01026E:				; $01026E
	add.b	d2,d3
; $010270
	cmp.b	($FFFFA70E).l,d3
; $010276
	bgt.w	loc_01029E
; $01027A
	btst	#0,$8(a4)
; $010280
	beq.w	loc_01028A
; $010284
	addq.b	#4,($FFFFA70F).l

loc_01028A:				; $01028A
	btst	#1,$8(a4)
; $010290
	beq.w	loc_01029A
; $010294
	addq.b	#4,($FFFFA710).l

loc_01029A:				; $01029A
	bra.w	loc_0102AA

loc_01029E:				; $01029E
	clr.b	($FFFFA70F).l
; $0102A4
	clr.b	($FFFFA710).l

loc_0102AA:				; $0102AA
	move.b	($FFFFA70F).l,d1
; $0102B0
	moveq	#3,d2
; $0102B2
	moveq	#1,d3
; $0102B4
	moveq	#1,d4
; $0102B6
	moveq	#0,d5
; $0102B8
	movea.l	#$FFFFA7C4,a0
; $0102BE
	bsr.w	loc_01077E
; $0102C2
	move.w	#$0044,$B8(a6)
; $0102C8
	move.b	($FFFFA70D).l,d1
; $0102CE
	moveq	#2,d2
; $0102D0
	moveq	#0,d3
; $0102D2
	moveq	#0,d4
; $0102D4
	moveq	#0,d5
; $0102D6
	movea.l	#$FFFFA7CE,a0
; $0102DC
	bsr.w	loc_01077E
; $0102E0
	move.b	($FFFFA710).l,d1
; $0102E6
	moveq	#3,d2
; $0102E8
	moveq	#1,d3
; $0102EA
	moveq	#1,d4
; $0102EC
	moveq	#0,d5
; $0102EE
	movea.l	#$FFFFA7D2,a0
; $0102F4
	bsr.w	loc_01077E
; $0102F8
	move.w	#$0048,$C6(a6)
; $0102FE
	move.w	#$0050,$C8(a6)
; $010304
	moveq	#0,d1
; $010306
	move.b	$3(a5),d1
; $01030A
	addi.w	#$0030,d1
; $01030E
	move.w	d1,$CA(a6)
; $010312
	cmpi.b	#$05,$7(a5)
; $010318
	bne.w	loc_010454
; $01031C
	move.w	#$004D,$CE(a6)
; $010322
	move.w	#$0050,$D0(a6)
; $010328
	move.b	$5D(a4),d1
; $01032C
	moveq	#2,d2
; $01032E
	moveq	#0,d3
; $010330
	moveq	#0,d4
; $010332
	moveq	#0,d5
; $010334
	movea.l	#$FFFFA7E6,a0
; $01033A
	bsr.w	loc_01077E
; $01033E
	bra.w	loc_010454

loc_010342:				; $010342
	move.b	$3A(a4),($FFFFA70C).l
; $01034A
	move.b	$3B(a4),($FFFFA70D).l
; $010352
	move.b	$38(a4),($FFFFA70E).l
; $01035A
	moveq	#0,d0
; $01035C
	move.b	$9(a4),d0
; $010360
	cmpi.w	#$0026,d0
; $010364
	bne.w	loc_01036C
; $010368
	move.w	#$000C,d0

loc_01036C:				; $01036C
	move.w	d0,($FFFFA7EE).l
; $010372
	beq.w	loc_010392
; $010376
	bsr.w	loc_010920
; $01037A
	move.w	#$208B,$82(a6)
; $010380
	move.w	#$208C,$84(a6)
; $010386
	move.w	#$208D,$CA(a6)
; $01038C
	move.w	#$208E,$CC(a6)

loc_010392:				; $010392
	moveq	#0,d0
; $010394
	move.b	$A(a4),d0
; $010398
	move.w	d0,($FFFFA7F0).l
; $01039E
	beq.w	loc_0103BE
; $0103A2
	bsr.w	loc_010920
; $0103A6
	move.w	#$208F,$86(a6)
; $0103AC
	move.w	#$2090,$88(a6)
; $0103B2
	move.w	#$2091,$CE(a6)
; $0103B8
	move.w	#$2092,$D0(a6)

loc_0103BE:				; $0103BE
	moveq	#0,d0
; $0103C0
	move.b	$B(a4),d0
; $0103C4
	move.w	d0,($FFFFA7F2).l
; $0103CA
	beq.w	loc_0103EA
; $0103CE
	bsr.w	loc_010920
; $0103D2
	move.w	#$2093,$8A(a6)
; $0103D8
	move.w	#$2094,$8C(a6)
; $0103DE
	move.w	#$2095,$D2(a6)
; $0103E4
	move.w	#$2096,$D4(a6)

loc_0103EA:				; $0103EA
	movea.l	#$FFFFA74A,a1
; $0103F0
	move.w	#$0000,d0
; $0103F4
	bsr.w	loc_0106B0
; $0103F8
	move.w	#$0044,$B2(a6)
; $0103FE
	move.b	($FFFFA70D).l,d1
; $010404
	moveq	#2,d2
; $010406
	moveq	#0,d3
; $010408
	moveq	#0,d4
; $01040A
	moveq	#0,d5
; $01040C
	movea.l	#$FFFFA7C8,a0
; $010412
	bsr.w	loc_01077E
; $010416
	move.w	#$004D,$BA(a6)
; $01041C
	move.w	#$0050,$BC(a6)
; $010422
	move.b	($FFFFA70E).l,d1
; $010428
	moveq	#2,d2
; $01042A
	moveq	#0,d3
; $01042C
	moveq	#0,d4
; $01042E
	moveq	#0,d5
; $010430
	movea.l	#$FFFFA7D2,a0
; $010436
	bsr.w	loc_01077E
; $01043A
	move.w	#$0048,$C4(a6)
; $010440
	move.w	#$0050,$C6(a6)
; $010446
	moveq	#0,d1
; $010448
	move.b	$3(a5),d1
; $01044C
	addi.w	#$0030,d1
; $010450
	move.w	d1,$C8(a6)

loc_010454:				; $010454
	move.w	#$0041,$AA(a6)
; $01045A
	move.b	($FFFFA70C).l,d1
; $010460
	moveq	#2,d2
; $010462
	moveq	#0,d3
; $010464
	moveq	#0,d4
; $010466
	moveq	#0,d5
; $010468
	movea.l	#$FFFFA7C0,a0
; $01046E
	bsr.w	loc_01077E
; $010472
	move.w	#$004C,$A4(a6)
; $010478
	moveq	#0,d1
; $01047A
	move.b	$2E(a4),d1
; $01047E
	addi.w	#$0030,d1
; $010482
	move.w	d1,$A6(a6)
; $010486
	moveq	#0,d1
; $010488
	move.b	$0(a5),d1
; $01048C
	bsr.w	loc_01066E
; $010490
	clr.l	($FFFFA70C).l
; $010496
	clr.l	($FFFFA710).l
; $01049C
	move.b	$8(a4),d0
; $0104A0
	btst	#0,d0
; $0104A4
	beq.w	loc_0104B0
; $0104A8
	move.b	#$01,($FFFFA70C).l

loc_0104B0:				; $0104B0
	btst	#1,d0
; $0104B4
	beq.w	loc_0104C0
; $0104B8
	move.b	#$01,($FFFFA70D).l

loc_0104C0:				; $0104C0
	btst	#2,d0
; $0104C4
	beq.w	loc_0104D0
; $0104C8
	move.b	#$01,($FFFFA70E).l

loc_0104D0:				; $0104D0
	move.b	$2(a5),d1
; $0104D4
	btst	#3,d1
; $0104D8
	beq.w	loc_0104E4
; $0104DC
	move.b	#$01,($FFFFA710).l

loc_0104E4:				; $0104E4
	btst	#3,d0
; $0104E8
	beq.w	loc_0104F4
; $0104EC
	move.b	#$01,($FFFFA711).l

loc_0104F4:				; $0104F4
	tst.b	$5C(a4)
; $0104F8
	beq.w	loc_01050E
; $0104FC
	btst	#5,$8(a4)
; $010502
	bne.w	loc_01050E
; $010506
	move.b	#$01,($FFFFA712).l

loc_01050E:				; $01050E
	btst	#4,d1
; $010512
	beq.w	loc_01051E
; $010516
	move.b	#$01,($FFFFA713).l

loc_01051E:				; $01051E
	lea	($FFFFA70C).l,a0
; $010524
	moveq	#7,d0
; $010526
	move.w	#$0060,d1
; $01052A
	movea.l	#$FFFFA716,a2

loc_010530:				; $010530
	tst.b	(a0)+
; $010532
	beq.w	loc_010538
; $010536
	move.w	d1,(a2)

loc_010538:				; $010538
	addq.w	#1,d1
; $01053A
	addq.w	#2,a2
; $01053C
	dbf	d0,loc_010530
; $010540
	move.b	$0(a5),($FFFFA7EC).l
; $010548
	btst	#0,$20(a4)
; $01054E
	beq.w	loc_01055C
; $010552
	clr.b	($FFFFA7ED).l
; $010558
	bra.w	loc_010564

loc_01055C:				; $01055C
	move.b	#$FF,($FFFFA7ED).l

loc_010564:				; $010564
	movea.l	a5,a1
; $010566
	bsr.w	loc_010856
; $01056A
	move.b	$0(a5),d1
; $01056E
	lea	($05E6D6).l,a1
; $010574
	tst.w	($FFFFA7F6).l
; $01057A
	beq.w	loc_010586
; $01057E
	moveq	#0,d1
; $010580
	lea	($05E5CA).l,a1

loc_010586:				; $010586
	movea.l	#$FFFFA738,a2
; $01058C
	moveq	#72,d0
; $01058E
	bsr.w	loc_01071C
; $010592
	move.b	$1(a5),d1
; $010596
	lea	($0618E8).l,a1
; $01059C
	movea.l	#$FFFFA726,a2
; $0105A2
	moveq	#72,d0
; $0105A4
	bsr.w	loc_01071C
; $0105A8
	bra.w	loc_010644

loc_0105AC:				; $0105AC
	move.w	#$0F46,d0
; $0105B0
	jsr	($009580).l
; $0105B6
	clr.l	($FFFFA7EE).l
; $0105BC
	clr.w	($FFFFA7F2).l
; $0105C2
	movea.l	#$FFFFA774,a0
; $0105C8
	move.w	#$0053,(a0)+
; $0105CC
	move.w	#$0043,(a0)+
; $0105D0
	move.w	#$0045,(a0)+
; $0105D4
	move.w	#$004E,(a0)+
; $0105D8
	move.w	#$0041,(a0)+
; $0105DC
	move.w	#$0052,(a0)+
; $0105E0
	move.w	#$0049,(a0)+
; $0105E4
	move.w	#$004F,(a0)+
; $0105E8
	move.w	($FFFFA49C).w,d1
; $0105EC
	cmpi.w	#$001B,d1
; $0105F0
	ble.w	loc_010606
; $0105F4
	subi.w	#$001B,d1
; $0105F8
	move.w	#$0020,(a0)+
; $0105FC
	move.w	#$003F,(a0)+
; $010600
	moveq	#1,d2
; $010602
	bra.w	loc_010608

loc_010606:				; $010606
	moveq	#3,d2

loc_010608:				; $010608
	moveq	#0,d3
; $01060A
	moveq	#0,d4
; $01060C
	moveq	#0,d5
; $01060E
	bsr.w	loc_010780
; $010612
	movea.l	#$FFFFA790,a0
; $010618
	move.w	#$0054,(a0)+
; $01061C
	move.w	#$0055,(a0)+
; $010620
	move.w	#$0052,(a0)+
; $010624
	move.w	#$004E,(a0)+
; $010628
	move.w	($FFFFA5F0).w,d1
; $01062C
	cmpi.w	#$03E8,d1
; $010630
	bcs.w	loc_010638
; $010634
	move.w	#$03E7,d1

loc_010638:				; $010638
	moveq	#3,d2
; $01063A
	moveq	#0,d3
; $01063C
	moveq	#0,d4
; $01063E
	moveq	#0,d5
; $010640
	bsr.w	loc_010780

loc_010644:				; $010644
	movea.l	#$FFFFA75E,a2
; $01064A
	move.w	#$209F,d0
; $01064E
	move.w	d0,(a2)+
; $010650
	addq.w	#1,d0
; $010652
	move.w	d0,(a2)+
; $010654
	addq.w	#1,d0
; $010656
	move.w	d0,(a2)+
; $010658
	addq.w	#1,d0
; $01065A
	lea	$42(a2),a2
; $01065E
	move.w	d0,(a2)+
; $010660
	addq.w	#1,d0
; $010662
	move.w	d0,(a2)+
; $010664
	addq.w	#1,d0
; $010666
	move.w	d0,(a2)+
; $010668
	movem.l	(a7)+,d1/d2/d3/d4/d5/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $01066C
	rts

loc_01066E:				; $01066E
	movem.l	a6/a5/a4/a3/a2/d7,-(a7)
; $010672
	lea	($05EDDC).l,a0
; $010678
	andi.w	#$00FF,d1
; $01067C
	mulu.w	#$001C,d1
; $010680
	move.w	($4,a0,d1.w),d2
; $010684
	moveq	#0,d1
; $010686
	move.b	($FFFFA7F4).l,d1
; $01068C
	add.w	d1,d2
; $01068E
	move.b	($0,a0,d2.w),d1
; $010692
	sub.b	($FFFFA7F5).l,d1
; $010698
	moveq	#3,d2
; $01069A
	moveq	#1,d3
; $01069C
	moveq	#0,d4
; $01069E
	moveq	#1,d5
; $0106A0
	movea.l	#$FFFFA7AC,a0
; $0106A6
	bsr.w	loc_01077E
; $0106AA
	movem.l	(a7)+,d7/a2/a3/a4/a5/a6
; $0106AE
	rts

loc_0106B0:				; $0106B0
	movem.l	a7/a6/a5/a4/a3/d7/d6,-(a7)
; $0106B4
	movea.l	a1,a0
; $0106B6
	moveq	#32,d2
; $0106B8
	or.w	d0,d2
; $0106BA
	moveq	#8,d1

loc_0106BC:				; $0106BC
	move.w	d2,(a0)+
; $0106BE
	dbf	d1,loc_0106BC
; $0106C2
	lea	($05EDDC).l,a0
; $0106C8
	moveq	#0,d1
; $0106CA
	move.b	$0(a4),d1
; $0106CE
	mulu.w	#$001C,d1
; $0106D2
	moveq	#0,d4
; $0106D4
	move.b	($14,a0,d1.w),d4
; $0106D8
	subq.w	#1,d4
; $0106DA
	moveq	#0,d2
; $0106DC
	move.b	$2F(a4),d2
; $0106E0
	move.w	#$00E0,(a1)
; $0106E4
	or.w	d0,(a1)+
; $0106E6
	move.w	#$00E2,d1
; $0106EA
	or.w	d0,d1
; $0106EC
	btst	#0,$20(a4)
; $0106F2
	bne.w	loc_0106FA
; $0106F6
	addi.w	#$0009,d1

loc_0106FA:				; $0106FA
	move.w	d2,d3
; $0106FC
	cmpi.w	#$0008,d2
; $010700
	bmi.w	loc_010706
; $010704
	moveq	#8,d3

loc_010706:				; $010706
	sub.w	d3,d2
; $010708
	add.w	d1,d3
; $01070A
	move.w	d3,(a1)+
; $01070C
	dbf	d4,loc_0106FA
; $010710
	move.w	#$00E1,(a1)
; $010714
	or.w	d0,(a1)
; $010716
	movem.l	(a7)+,d6/d7/a3/a4/a5/a6/a7
; $01071A
	rts

loc_01071C:				; $01071C
	movem.l	a7/a6/d6/d5,-(a7)
; $010720
	cmpa.l	#$000618E8,a1
; $010726
	bne.w	loc_01073A
; $01072A
	cmpi.b	#$01,d1
; $01072E
	bne.w	loc_01073A
; $010732
	lea	($FFFFA5CC).w,a1
; $010736
	bra.w	loc_010746

loc_01073A:				; $01073A
	andi.w	#$00FF,d1
; $01073E
	add.w	d1,d1
; $010740
	add.w	d1,d1
; $010742
	movea.l	($0,a1,d1.w),a1

loc_010746:				; $010746
	move.b	(a1)+,d1
; $010748
	cmpi.b	#$FF,d1
; $01074C
	beq.w	loc_010778
; $010750
	cmpi.b	#$DE,d1
; $010754
	beq.w	loc_010760
; $010758
	cmpi.b	#$DF,d1
; $01075C
	bne.w	loc_01076A

loc_010760:				; $010760
	andi.w	#$00FF,d1
; $010764
	move.w	d1,(a2)
; $010766
	bra.w	loc_010746

loc_01076A:				; $01076A
	andi.w	#$00FF,d1
; $01076E
	adda.w	#$0002,a2
; $010772
	move.w	d1,($0,a2,d0.w)
; $010776
	bra.s	loc_010746

loc_010778:				; $010778
	movem.l	(a7)+,d5/d6/a6/a7
; $01077C
	rts

loc_01077E:				; $01077E
	movem.w	d1/d4/a0/a1/a2/a5/a6/a7,d1
; $010782
	lsr.w	-(a0)
; $010784
	move.w	#$0020,d6
; $010788
	tst.w	d4
; $01078A
	beq.w	loc_010792
; $01078E
	move.w	#$0030,d6

loc_010792:				; $010792
	moveq	#5,d0
; $010794
	lea	($FFFFA6FA).l,a1
; $01079A
	movea.l	a1,a2

loc_01079C:				; $01079C
	move.w	d6,(a1)+
; $01079E
	dbf	d0,loc_01079C
; $0107A2
	move.w	#$0020,($FFFFA6FA).l
; $0107AA
	move.w	#$0030,($FFFFA704).l
; $0107B2
	move.w	#$003B,($FFFFA706).l
; $0107BA
	move.w	d2,d0
; $0107BC
	tst.w	d1
; $0107BE
	bmi.w	loc_0107CA
; $0107C2
	move.w	#$002B,(a2)
; $0107C6
	bra.w	loc_0107D0

loc_0107CA:				; $0107CA
	move.w	#$002D,(a2)
; $0107CE
	neg.w	d1

loc_0107D0:				; $0107D0
	addq.l	#2,a2
; $0107D2
	clr.w	($FFFFA708).l
; $0107D8
	lea	($01084C).l,a1
; $0107DE
	moveq	#0,d0

loc_0107E0:				; $0107E0
	moveq	#0,d4
; $0107E2
	move.w	($0,a1,d0.w),d6

loc_0107E6:				; $0107E6
	cmp.w	d6,d1
; $0107E8
	bmi.w	loc_0107F4
; $0107EC
	sub.w	d6,d1
; $0107EE
	addq.w	#1,d4
; $0107F0
	bra.w	loc_0107E6

loc_0107F4:				; $0107F4
	tst.w	($FFFFA708).l
; $0107FA
	bne.w	loc_010804
; $0107FE
	tst.w	d4
; $010800
	beq.w	loc_010812

loc_010804:				; $010804
	addi.w	#$0030,d4
; $010808
	move.w	d4,(a2)
; $01080A
	move.w	#$0001,($FFFFA708).l

loc_010812:				; $010812
	addq.l	#2,a2
; $010814
	addq.w	#2,d0
; $010816
	cmpi.w	#$000A,d0
; $01081A
	bne.w	loc_0107E0
; $01081E
	lea	($FFFFA6FA).l,a1
; $010824
	moveq	#6,d0
; $010826
	sub.w	d2,d0
; $010828
	add.w	d0,d0
; $01082A
	tst.w	d3
; $01082C
	beq.w	loc_010834
; $010830
	move.w	(a1),($0,a1,d0.w)

loc_010834:				; $010834
	adda.w	d0,a1
; $010836
	tst.w	d5
; $010838
	beq.w	loc_01083E
; $01083C
	addq.w	#1,d2

loc_01083E:				; $01083E
	subq.w	#1,d2

loc_010840:				; $010840
	move.w	(a1)+,(a0)+
; $010842
	dbf	d2,loc_010840
; $010846
	movem.l	(a7)+,d5/d6/d7/a1/a3/a5/a6/a7
; $01084A
	rts
; $01084C
	move.l	(a0),-(a3)
; $01084E
	bchg	d1,$64(a0)
; $010852
	ori.b	#$01,a2

loc_010856:				; $010856
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $01085A
	move.w	#$0F46,d0
; $01085E
	jsr	($009580).l
; $010864
	jsr	($0094FC).l
; $01086A
	move.w	#$0F46,$0(a0)
; $010870
	jsr	($011610).l
; $010876
	move.w	#$2000,d2
; $01087A
	add.w	d1,d2
; $01087C
	tst.b	($FFFFA7ED).l
; $010882
	beq.w	loc_01088A
; $010886
	ori.w	#$0800,d2

loc_01088A:				; $01088A
	cmpi.w	#$AE92,(rom).w
; $010890
	beq.w	loc_01089E
; $010894
	cmpi.b	#$60,($000001).w
; $01089A
	beq.w	loc_0108A2

loc_01089E:				; $01089E
	ori.w	#$8000,d2

loc_0108A2:				; $0108A2
	move.w	d2,$2(a0)
; $0108A6
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $0108AA
	rts

loc_0108AC:				; $0108AC
	movem.l	a7/a6/d7,-(a7)
; $0108B0
	lsl.w	#5,d0
; $0108B2
	add.w	d0,d0
; $0108B4
	move.w	d0,d1
; $0108B6
	add.w	d1,d1
; $0108B8
	add.w	d1,d0
; $0108BA
	andi.l	#$0000FFFF,d0
; $0108C0
	addi.l	#$00080CBC,d0
; $0108C6
	movea.l	($FFFF81C4).w,a0
; $0108CA
	move.w	#$FFF9,(a0)+
; $0108CE
	move.w	#$13E0,(a0)+
; $0108D2
	move.l	d0,(a0)+
; $0108D4
	move.w	#$0060,(a0)+
; $0108D8
	move.l	a0,($FFFF81C4).w
; $0108DC
	movem.l	(a7)+,d7/a6/a7
; $0108E0
	rts

loc_0108E2:				; $0108E2
	movem.l	a7/a6/a5/a4/a3/a2/d7/d6,-(a7)
; $0108E6
	moveq	#0,d1
; $0108E8
	move.w	#$0017,d2
; $0108EC
	move.w	#$D000,d3
; $0108F0
	move.w	#$8000,d4
; $0108F4
	cmpi.w	#$AE92,(rom).w
; $0108FA
	beq.w	loc_01090C
; $0108FE
	cmpi.b	#$60,(rom).w
; $010904
	beq.w	loc_01090C
; $010908
	move.w	#$0000,d4

loc_01090C:				; $01090C
	clr.w	d5
; $01090E
	lea	($05E55C).l,a1
; $010914
	jsr	($0095EC).l
; $01091A
	movem.l	(a7)+,d6/d7/a2/a3/a4/a5/a6/a7
; $01091E
	rts

loc_010920:				; $010920
	movem.l	a6/d6,-(a7)
; $010924
	lea	($FFFFA70C).l,a1
; $01092A
	moveq	#0,d1
; $01092C
	bsr.w	loc_010A28
; $010930
	movem.l	(a7)+,d6/a6
; $010934
	rts

loc_010936:				; $010936
	movem.l	a7/a6/d6,-(a7)
; $01093A
	moveq	#1,d1
; $01093C
	lea	($FFFFA70C).l,a1
; $010942
	moveq	#0,d0
; $010944
	move.b	$9(a4),d0
; $010948
	bsr.w	loc_010A28
; $01094C
	move.b	$A(a4),d0
; $010950
	bsr.w	loc_010A28
; $010954
	move.b	$B(a4),d0
; $010958
	bsr.w	loc_010A28
; $01095C
	movem.l	(a7)+,d6/a6/a7
; $010960
	rts

loc_010962:				; $010962
	movem.l	a7/a6/d6/d5,-(a7)
; $010966
	movea.l	a1,a2
; $010968
	clr.b	($FFFFA70C).l
; $01096E
	lea	($FFFFA70C).l,a1
; $010974
	moveq	#2,d1
; $010976
	moveq	#0,d0
; $010978
	move.b	$9(a2),d0
; $01097C
	bsr.w	loc_010A28
; $010980
	move.b	$A(a2),d0
; $010984
	bsr.w	loc_010A28
; $010988
	move.b	$B(a2),d0
; $01098C
	bsr.w	loc_010A28
; $010990
	move.b	($FFFFA70C).l,d0
; $010996
	add.b	d0,($FFFF9F5C).w
; $01099A
	movem.l	(a7)+,d5/d6/a6/a7
; $01099E
	rts

loc_0109A0:				; $0109A0
	movem.l	a7/a6/d6,-(a7)
; $0109A4
	lea	($FFFF9F5C).w,a1
; $0109A8
	moveq	#3,d1
; $0109AA
	moveq	#0,d0
; $0109AC
	move.b	$9(a3),d0
; $0109B0
	bsr.w	loc_010A28
; $0109B4
	move.b	$A(a3),d0
; $0109B8
	bsr.w	loc_010A28
; $0109BC
	move.b	$B(a3),d0
; $0109C0
	bsr.w	loc_010A28
; $0109C4
	movem.l	(a7)+,d6/a6/a7
; $0109C8
	rts

loc_0109CA:				; $0109CA
	moveq	#4,d1
; $0109CC
	bra.w	loc_0109DE

loc_0109D0:				; $0109D0
	moveq	#5,d1
; $0109D2
	bra.w	loc_0109DE

loc_0109D6:				; $0109D6
	moveq	#7,d1
; $0109D8
	bra.w	loc_0109DE

loc_0109DC:				; $0109DC
	moveq	#8,d1

loc_0109DE:				; $0109DE
	movem.l	a7,-(a7)
; $0109E2
	moveq	#0,d0
; $0109E4
	move.b	$9(a0),d0
; $0109E8
	bsr.w	loc_010A28
; $0109EC
	move.b	$A(a0),d0
; $0109F0
	bsr.w	loc_010A28
; $0109F4
	move.b	$B(a0),d0
; $0109F8
	bsr.w	loc_010A28
; $0109FC
	movem.l	(a7)+,a7
; $010A00
	rts

loc_010A02:				; $010A02
	moveq	#8,d1
; $010A04
	movem.l	a7,-(a7)
; $010A08
	moveq	#0,d0
; $010A0A
	move.b	$9(a0),d0
; $010A0E
	bsr.w	loc_010A28
; $010A12
	move.b	$A(a0),d0
; $010A16
	bsr.w	loc_010A28
; $010A1A
	move.b	$B(a0),d0
; $010A1E
	bsr.w	loc_010A28
; $010A22
	movem.l	(a7)+,a7
; $010A26
	rts

loc_010A28:				; $010A28
	movem.l	a7/a6/a5/a4/a3/d7/d6/d5,-(a7)
; $010A2C
	moveq	#0,d4
; $010A2E
	rol.w	#3,d0
; $010A30
	lea	($060530).l,a0
; $010A36
	add.w	d1,d1
; $010A38
	add.w	d1,d1
; $010A3A
	movea.l	($56,pc,d1.w),a2
; $010A3E
	moveq	#3,d2

loc_010A40:				; $010A40
	moveq	#0,d1
; $010A42
	move.b	($0,a0,d0.w),d1
; $010A46
	cmpi.b	#$FF,d1
; $010A4A
	beq.w	loc_010A86
; $010A4E
	add.w	d1,d1
; $010A50
	cmpi.w	#$0010,d1
; $010A54
	bne.w	loc_010A5C
; $010A58
	move.w	#$0001,d4

loc_010A5C:				; $010A5C
	move.w	($0,a2,d1.w),d1
; $010A60
	cmpi.w	#$FFFF,d1
; $010A64
	beq.w	loc_010A86
; $010A68
	move.b	($1,a0,d0.w),d3
; $010A6C
	add.b	($0,a1,d1.w),d3
; $010A70
	cmpi.b	#$64,d3
; $010A74
	bmi.w	loc_010A82
; $010A78
	moveq	#99,d3
; $010A7A
	tst.w	d4
; $010A7C
	beq.w	loc_010A82
; $010A80
	moveq	#100,d3

loc_010A82:				; $010A82
	move.b	d3,($0,a1,d1.w)

loc_010A86:				; $010A86
	addq.w	#2,d0
; $010A88
	dbf	d2,loc_010A40
; $010A8C
	movem.l	(a7)+,d5/d6/d7/a3/a4/a5/a6/a7
; $010A90
	rts
; $010A92
	dc.w	$0001
; ★ ━━━ 角色能力表加载 ━━━
; ★ ═══ 角色能力表加载 $10A94 ═══
; $010A94
	dc.w	$0ABA
; $010A96
	dc.w	$0001
; $010A98
	dc.w	$0AD0
; $010A9A
	dc.w	$0001
; $010A9C
	dc.w	$0AE6
; $010A9E
	dc.w	$0001
; $010AA0
	dc.w	$0AFC
; $010AA2
	dc.w	$0001
; $010AA4
	dc.w	$0B12
; $010AA6
	dc.w	$0001
; $010AA8
	dc.w	$0B28
; $010AAA
	dc.w	$0001
; $010AAC
	dc.w	$0B3E
; $010AAE
	dc.w	$0001
; $010AB0
	dc.w	$0B54
; $010AB2
	dc.w	$0001
; $010AB4
	dc.w	$0B6A
; $010AB6
	dc.w	$0001
; $010AB8
	dc.w	$0B80
; $010ABA
	dc.w	$0000
; $010ABC
	dc.w	$0001
; $010ABE
	dc.w	$FFFF
; $010AC0
	dc.w	$FFFF
; $010AC2
	dc.w	$FFFF
; $010AC4
	dc.w	$FFFF
; $010AC6
	dc.w	$FFFF
; $010AC8
	dc.w	$FFFF
; $010ACA
	dc.w	$FFFF
; $010ACC
	dc.w	$FFFF
; $010ACE
	dc.w	$FFFF
; $010AD0
	dc.w	$FFFF
; $010AD2
	dc.w	$FFFF
; $010AD4
	dc.w	$FFFF
; $010AD6
	dc.w	$0002
; $010AD8
	dc.w	$0003
; $010ADA
	dc.w	$0004
; $010ADC
	dc.w	$FFFF
; $010ADE
	dc.w	$FFFF
; $010AE0
	dc.w	$FFFF
; $010AE2
	dc.w	$FFFF
; $010AE4
	dc.w	$FFFF
; $010AE6
	dc.w	$FFFF
; $010AE8
	dc.w	$FFFF
; $010AEA
	dc.w	$FFFF
; $010AEC
	dc.w	$0000
; $010AEE
	dc.w	$FFFF
; $010AF0
	dc.w	$FFFF
; $010AF2
	dc.w	$FFFF
; $010AF4
	dc.w	$FFFF
; $010AF6
	dc.w	$FFFF
; $010AF8
	dc.w	$FFFF
; $010AFA
	dc.w	$FFFF
; $010AFC
	dc.w	$FFFF
; $010AFE
	dc.w	$FFFF
; $010B00
	dc.w	$0000
; $010B02
	dc.w	$FFFF
; $010B04
	dc.w	$FFFF
; $010B06
	dc.w	$FFFF
; $010B08
	dc.w	$FFFF
; $010B0A
	dc.w	$FFFF
; $010B0C
	dc.w	$FFFF
; $010B0E
	dc.w	$FFFF
; $010B10
	dc.w	$FFFF
; $010B12
	ori.b	#$19,(a7)
; $010B16
	dc.w	$FFFF
; $010B18
	dc.w	$FFFF
; $010B1A
	dc.w	$FFFF
; $010B1C
	dc.w	$FFFF
; $010B1E
	dc.w	$FFFF
; $010B20
	dc.w	$FFFF
; $010B22
	dc.w	$FFFF
; $010B24
	dc.w	$FFFF
; $010B26
	dc.w	$FFFF
; $010B28
	dc.w	$FFFF
; $010B2A
	dc.w	$FFFF
; $010B2C
	dc.w	$FFFF
; $010B2E
	ori.b	#$1B,a5
; $010B32
	ori.b	#$FF,(a5)+
; $010B36
	dc.w	$FFFF
; $010B38
	dc.w	$FFFF
; $010B3A
	dc.w	$FFFF
; $010B3C
	dc.w	$FFFF
; $010B3E
	ori.b	#$03,d1
; $010B42
	ori.b	#$0D,a1
; $010B46
	ori.b	#$11,a7
; $010B4A
	dc.w	$FFFF
; $010B4C
	dc.w	$FFFF
; $010B4E
	dc.w	$FFFF
; $010B50
	dc.w	$FFFF
; $010B52
	dc.w	$FFFF
; $010B54
	dc.w	$FFFF
; $010B56
	dc.w	$FFFF
; $010B58
	dc.w	$FFFF
; $010B5A
	dc.w	$FFFF
; $010B5C
	dc.w	$FFFF
; $010B5E
	dc.w	$FFFF
; $010B60
	ori.b	#$FF,d0
; $010B64
	dc.w	$FFFF
; $010B66
	dc.w	$FFFF
; $010B68
	dc.w	$FFFF
; $010B6A
	dc.w	$FFFF
; $010B6C
	dc.w	$FFFF
; $010B6E
	dc.w	$FFFF
; $010B70
	dc.w	$FFFF
; $010B72
	dc.w	$FFFF
; $010B74
	dc.w	$FFFF
; $010B76
	dc.w	$FFFF
; $010B78
	ori.b	#$01,d0
; $010B7C
	dc.w	$FFFF
; $010B7E
	ori.b	#$FF,d1
; $010B82
	dc.w	$FFFF
; $010B84
	dc.w	$FFFF
; $010B86
	dc.w	$FFFF
; $010B88
	dc.w	$FFFF
; $010B8A
	dc.w	$FFFF
; $010B8C
	dc.w	$FFFF
; $010B8E
	dc.w	$FFFF
; $010B90
	dc.w	$FFFF
; $010B92
	dc.w	$FFFF
; $010B94
	ori.b	#$48,d1
; $010B98
	movea.l	($FFFFA628).w,a2
; $010B9C
	moveq	#0,d0
; $010B9E
	move.b	$3A(a2),d0
; $010BA2
	move.w	d0,(a0)+
; $010BA4
	move.b	$3B(a2),d0
; $010BA8
	move.w	d0,(a0)+
; $010BAA
	move.b	$38(a2),d0
; $010BAE
	move.w	d0,(a0)+
; $010BB0
	move.b	$39(a2),d0
; $010BB4
	move.w	d0,(a0)+
; $010BB6
	move.b	$44(a2),d0
; $010BBA
	move.w	d0,(a0)+
; $010BBC
	move.b	$2E(a2),d0
; $010BC0
	move.w	d0,(a0)+
; $010BC2
	move.b	$45(a2),d0
; $010BC6
	move.w	d0,(a0)+
; $010BC8
	move.b	$46(a2),d0
; $010BCC
	move.w	d0,(a0)+
; $010BCE
	move.b	$47(a2),d0
; $010BD2
	move.w	d0,(a0)+
; $010BD4
	move.w	#$0006,d1
; $010BD8
	moveq	#0,d0
; $010BDA
	move.b	$9(a2),d0
; $010BDE
	bsr.w	loc_010A28
; $010BE2
	move.b	$A(a2),d0
; $010BE6
	bsr.w	loc_010A28
; $010BEA
	move.b	$B(a2),d0
; $010BEE
	bsr.w	loc_010A28
; $010BF2
	rts

loc_010BF4:				; $010BF4
	movem.l	a7/a6/d7/d6,-(a7)
; $010BF8
	lea	($05E64A).l,a0
; $010BFE
	lea	($FFFFA4CC).w,a1
; $010C02
	moveq	#9,d0

loc_010C04:				; $010C04
	moveq	#13,d1

loc_010C06:				; $010C06
	move.b	(a0)+,(a1)+
; $010C08
	dbf	d1,loc_010C06
; $010C0C
	moveq	#9,d1

loc_010C0E:				; $010C0E
	clr.b	(a1)+
; $010C10
	dbf	d1,loc_010C0E
; $010C14
	dbf	d0,loc_010C04
; $010C18
	movem.l	(a7)+,d6/d7/a6/a7
; $010C1C
	rts

loc_010C1E:				; $010C1E
	movem.l	a7/a6/d7,-(a7)
; $010C22
	lea	($FF4000).l,a0
; $010C28
	move.w	#$03FF,d0
; $010C2C
	moveq	#0,d1

loc_010C2E:				; $010C2E
	move.l	d1,(a0)+
; $010C30
	dbf	d0,loc_010C2E
; $010C34
	lea	($FF5000).l,a0
; $010C3A
	move.w	#$03FF,d0
; $010C3E
	moveq	#-1,d1

loc_010C40:				; $010C40
	move.l	d1,(a0)+
; $010C42
	dbf	d0,loc_010C40
; $010C46
	movem.l	(a7)+,d7/a6/a7
; $010C4A
	rts

loc_010C4C:				; $010C4C
	movem.l	a7/a6/a5/d7/d6/d5,-(a7)
; $010C50
	bsr.w	loc_010C1E
; $010C54
	lea	($FF603C).l,a0
; $010C5A
	moveq	#0,d0

loc_010C5C:				; $010C5C
	moveq	#0,d1

loc_010C5E:				; $010C5E
	movea.l	a0,a1
; $010C60
	moveq	#2,d2

loc_010C62:				; $010C62
	clr.l	(a0)+
; $010C64
	dbf	d2,loc_010C62
; $010C68
	move.b	#$FF,(a1)
; $010C6C
	move.b	#$0A,$3(a1)
; $010C72
	move.b	d0,$4(a1)
; $010C76
	move.b	d1,$5(a1)
; $010C7A
	addq.w	#1,d1
; $010C7C
	cmpi.w	#$0008,d1
; $010C80
	bne.w	loc_010C5E
; $010C84
	addq.w	#1,d0
; $010C86
	cmpi.w	#$0014,d0
; $010C8A
	bne.w	loc_010C5C
; $010C8E
	lea	($FF5000).l,a0
; $010C94
	lea	($FF4000).l,a1
; $010C9A
	move.w	#$03FF,d0
; $010C9E
	moveq	#-1,d1
; $010CA0
	move.l	#$F0FFF0FF,d2

loc_010CA6:				; $010CA6
	move.l	d1,(a0)+
; $010CA8
	exg	d2,a1
; $010CAA
	dbf	d0,loc_010CA6
; $010CAE
	lea	($FF603C).l,a1
; $010CB4
	lea	($18005E).l,a0
; $010CBA
	move.w	($FFFFA49C).w,d0
; $010CBE
	subq.w	#1,d0
; $010CC0
	add.w	d0,d0
; $010CC2
	add.w	d0,d0
; $010CC4
	movea.l	($0,a0,d0.w),a0
; $010CC8
	move.w	(a0)+,d0
; $010CCA
	move.b	d0,($FFFFA610).w
; $010CCE
	move.w	(a0)+,d0
; $010CD0
	move.b	d0,($FFFFA611).w
; $010CD4
	bsr.w	loc_010E64
; $010CD8
	movea.l	(a0),a0
; $010CDA
	move.w	(a0)+,d0
; $010CDC
	subq.w	#1,d0

loc_010CDE:				; $010CDE
	moveq	#0,d2
; $010CE0
	move.b	$1A(a0),d2
; $010CE4
	cmpi.b	#$0B,d2
; $010CE8
	bhi.w	loc_010CFC
; $010CEC
	bne.w	loc_010CF4
; $010CF0
	move.w	#$0004,d2

loc_010CF4:				; $010CF4
	bsr.w	loc_010D1E
; $010CF8
	bra.w	loc_010D0C

loc_010CFC:				; $010CFC
	bsr.w	loc_010FA6
; $010D00
	adda.w	#$000C,a1
; $010D04
	move.b	d1,$1(a1)
; $010D08
	adda.w	#$000C,a1

loc_010D0C:				; $010D0C
	dbf	d0,loc_010CDE
; $010D10
	bsr.w	loc_011038
; $010D14
	bsr.w	loc_011208
; $010D18
	movem.l	(a7)+,d5/d6/d7/a5/a6/a7
; $010D1C
	rts

loc_010D1E:				; $010D1E
	movem.l	a6/a5/a4/d4/d3,-(a7)
; $010D22
	lea	($FFFFA4CC).w,a3
; $010D26
	move.b	d2,$1(a1)
; $010D2A
	move.b	$8(a0),$20(a1)
; $010D30
	subq.w	#1,d2
; $010D32
	rol.w	#3,d2
; $010D34
	move.w	d2,d1
; $010D36
	add.w	d2,d2
; $010D38
	add.w	d2,d1
; $010D3A
	move.b	($0,a3,d1.w),$0(a1)
; $010D40
	move.b	($1,a3,d1.w),d2
; $010D44
	move.b	d2,$38(a1)
; $010D48
	move.b	d2,$39(a1)
; $010D4C
	move.w	($2,a3,d1.w),$2E(a1)
; $010D52
	move.w	($4,a3,d1.w),$3A(a1)
; $010D58
	move.l	($6,a3,d1.w),$50(a1)
; $010D5E
	move.b	$4(a0),$14(a1)
; $010D64
	move.b	($C,a3,d1.w),$15(a1)
; $010D6A
	move.b	$1C(a0),$5F(a1)
; $010D70
	move.b	(a0),$8(a1)
; $010D74
	move.b	($E,a3,d1.w),$9(a1)
; $010D7A
	move.b	($F,a3,d1.w),$A(a1)
; $010D80
	move.b	($10,a3,d1.w),$B(a1)
; $010D86
	move.b	$6(a0),$16(a1)
; $010D8C
	move.b	$7(a0),$17(a1)
; $010D92
	move.b	$9(a0),$21(a1)
; $010D98
	move.w	$A(a0),$22(a1)
; $010D9E
	move.w	$C(a0),$2C(a1)
; $010DA4
	move.w	$18(a0),$6(a1)
; $010DAA
	clr.b	$5E(a1)
; $010DAE
	cmpi.b	#$0B,$1D(a1)
; $010DB4
	bne.w	loc_010DD0
; $010DB8
	move.b	$39(a1),d2
; $010DBC
	add.b	d2,d2
; $010DBE
	cmpi.b	#$64,d2
; $010DC2
	bmi.w	loc_010DC8
; $010DC6
	moveq	#99,d2

loc_010DC8:				; $010DC8
	move.b	d2,$38(a1)
; $010DCC
	move.b	d2,$39(a1)

loc_010DD0:				; $010DD0
	moveq	#0,d2
; $010DD2
	move.b	$0(a1),d2
; $010DD6
	mulu.w	#$001C,d2
; $010DDA
	lea	($05EDDC).l,a4
; $010DE0
	adda.w	d2,a4
; $010DE2
	move.b	$D(a4),$44(a1)
; $010DE8
	move.b	$E(a4),$45(a1)
; $010DEE
	move.b	$F(a4),d2
; $010DF2
	add.b	($16,a3,d1.w),d2
; $010DF6
	move.b	d2,$46(a1)
; $010DFA
	move.b	$10(a4),$47(a1)
; $010E00
	move.b	$13(a4),$50(a1)
; $010E06
	lea	($082A56).l,a4
; $010E0C
	moveq	#0,d2
; $010E0E
	move.b	$1(a1),d2
; $010E12
	subq.w	#1,d2
; $010E14
	add.w	d2,d2
; $010E16
	move.w	d2,d3
; $010E18
	add.w	d2,d2
; $010E1A
	add.w	d3,d2
; $010E1C
	move.b	($3,a4,d2.w),d3
; $010E20
	add.b	d3,$46(a1)
; $010E24
	move.b	($4,a4,d2.w),d3
; $010E28
	add.b	d3,$47(a1)
; $010E2C
	move.b	($5,a4,d2.w),d3
; $010E30
	add.b	d3,$44(a1)
; $010E34
	move.b	$1A(a0),d3
; $010E38
	move.b	d3,$1(a1)
; $010E3C
	lea	$1E(a0),a0
; $010E40
	moveq	#5,d2

loc_010E42:				; $010E42
	adda.w	#$000C,a1
; $010E46
	move.b	(a0)+,$0(a1)
; $010E4A
	move.b	d3,$1(a1)
; $010E4E
	dbf	d2,loc_010E42
; $010E52
	adda.w	#$000C,a1
; $010E56
	move.b	d3,$1(a1)
; $010E5A
	adda.w	#$000C,a1
; $010E5E
	movem.l	(a7)+,d3/d4/a4/a5/a6
; $010E62
	rts

loc_010E64:				; $010E64
	movem.l	d5/d4/d3/d2,-(a7)
; $010E68
	movea.l	a1,a5
; $010E6A
	movea.l	(a0)+,a2
; $010E6C
	lea	($FFFFA4CC).w,a3
; $010E70
	move.w	(a2)+,d0
; $010E72
	move.w	d0,d4
; $010E74
	beq.w	loc_010F7C
; $010E78
	subq.w	#1,d0

loc_010E7A:				; $010E7A
	move.w	(a2)+,d1
; $010E7C
	move.b	d1,$1(a1)
; $010E80
	move.b	#$01,$20(a1)
; $010E86
	subq.w	#1,d1
; $010E88
	rol.w	#3,d1
; $010E8A
	move.w	d1,d2
; $010E8C
	add.w	d1,d1
; $010E8E
	add.w	d2,d1
; $010E90
	move.b	($0,a3,d1.w),$0(a1)
; $010E96
	move.b	($1,a3,d1.w),d2
; $010E9A
	move.b	d2,$38(a1)
; $010E9E
	move.b	d2,$39(a1)
; $010EA2
	move.w	($2,a3,d1.w),$2E(a1)
; $010EA8
	move.w	($4,a3,d1.w),$3A(a1)
; $010EAE
	move.l	($6,a3,d1.w),$50(a1)
; $010EB4
	move.b	($C,a3,d1.w),$15(a1)
; $010EBA
	move.b	($D,a3,d1.w),$5F(a1)
; $010EC0
	move.b	($E,a3,d1.w),$9(a1)
; $010EC6
	move.b	($F,a3,d1.w),$A(a1)
; $010ECC
	move.b	($10,a3,d1.w),$B(a1)
; $010ED2
	move.b	($11,a3,d1.w),$16(a1)
; $010ED8
	clr.b	$5E(a1)
; $010EDC
	cmpi.b	#$0B,$1D(a1)
; $010EE2
	bne.w	loc_010EFE
; $010EE6
	move.b	$39(a1),d2
; $010EEA
	add.b	d2,d2
; $010EEC
	cmpi.b	#$64,d2
; $010EF0
	bmi.w	loc_010EF6
; $010EF4
	moveq	#99,d2

loc_010EF6:				; $010EF6
	move.b	d2,$38(a1)
; $010EFA
	move.b	d2,$39(a1)

loc_010EFE:				; $010EFE
	moveq	#0,d2
; $010F00
	move.b	$0(a1),d2
; $010F04
	mulu.w	#$001C,d2
; $010F08
	lea	($05EDDC).l,a4
; $010F0E
	adda.w	d2,a4
; $010F10
	move.b	$D(a4),$44(a1)
; $010F16
	move.b	$E(a4),$45(a1)
; $010F1C
	move.b	$F(a4),d2
; $010F20
	add.b	($16,a3,d1.w),d2
; $010F24
	move.b	d2,$46(a1)
; $010F28
	move.b	$10(a4),$47(a1)
; $010F2E
	move.b	$13(a4),$50(a1)
; $010F34
	lea	($082A56).l,a4
; $010F3A
	moveq	#0,d2
; $010F3C
	move.b	$1(a1),d2
; $010F40
	subq.w	#1,d2
; $010F42
	add.w	d2,d2
; $010F44
	move.w	d2,d3
; $010F46
	add.w	d2,d2
; $010F48
	add.w	d3,d2
; $010F4A
	move.b	($3,a4,d2.w),d3
; $010F4E
	add.b	d3,$46(a1)
; $010F52
	move.b	($4,a4,d2.w),d3
; $010F56
	add.b	d3,$47(a1)
; $010F5A
	move.b	($5,a4,d2.w),d3
; $010F5E
	add.b	d3,$44(a1)
; $010F62
	move.b	$1(a1),d3
; $010F66
	moveq	#6,d2

loc_010F68:				; $010F68
	adda.w	#$000C,a1
; $010F6C
	move.b	d3,$1(a1)
; $010F70
	dbf	d2,loc_010F68
; $010F74
	adda.w	#$000C,a1
; $010F78
	dbf	d0,loc_010E7A

loc_010F7C:				; $010F7C
	movea.l	(a0)+,a2
; $010F7E
	tst.w	d4
; $010F80
	beq.w	loc_010FA0
; $010F84
	subq.w	#1,d4
; $010F86
	move.w	(a2)+,d0
; $010F88
	beq.w	loc_010FA0

loc_010F8C:				; $010F8C
	move.w	(a2)+,d0
; $010F8E
	move.b	d0,$6(a5)
; $010F92
	move.w	(a2)+,d0
; $010F94
	move.b	d0,$7(a5)
; $010F98
	adda.w	#$0060,a5
; $010F9C
	dbf	d4,loc_010F8C

loc_010FA0:				; $010FA0
	movem.l	(a7)+,d2/d3/d4/d5
; $010FA4
	rts

loc_010FA6:				; $010FA6
	move.l	(a0)+,$8(a1)
; $010FAA
	move.l	(a0)+,$14(a1)
; $010FAE
	move.l	(a0)+,$20(a1)
; $010FB2
	move.l	(a0)+,$2C(a1)
; $010FB6
	move.l	(a0)+,$38(a1)
; $010FBA
	move.l	(a0)+,$50(a1)
; $010FBE
	move.w	(a0)+,$6(a1)
; $010FC2
	move.b	(a0)+,d1
; $010FC4
	move.b	d1,$1(a1)
; $010FC8
	moveq	#0,d2
; $010FCA
	move.b	(a0)+,d2
; $010FCC
	move.b	d2,$0(a1)
; $010FD0
	move.b	(a0)+,$5F(a1)
; $010FD4
	adda.w	#$0001,a0
; $010FD8
	mulu.w	#$001C,d2
; $010FDC
	lea	($05EDDC).l,a2
; $010FE2
	adda.w	d2,a2
; $010FE4
	move.b	$D(a2),$44(a1)
; $010FEA
	move.b	$E(a2),$45(a1)
; $010FF0
	move.b	$F(a2),$46(a1)
; $010FF6
	move.b	$10(a2),$47(a1)
; $010FFC
	move.b	$13(a2),$50(a1)
; $011002
	cmpi.b	#$0B,$1D(a1)
; $011008
	bne.w	loc_011024
; $01100C
	move.b	$39(a1),d2
; $011010
	add.b	d2,d2
; $011012
	cmpi.b	#$64,d2
; $011016
	bmi.w	loc_01101C
; $01101A
	moveq	#99,d2

loc_01101C:				; $01101C
	move.b	d2,$38(a1)
; $011020
	move.b	d2,$39(a1)

loc_011024:				; $011024
	moveq	#5,d2

loc_011026:				; $011026
	adda.w	#$000C,a1
; $01102A
	move.b	(a0)+,$0(a1)
; $01102E
	move.b	d1,$1(a1)
; $011032
	dbf	d2,loc_011026
; $011036
	rts

loc_011038:				; $011038
	movem.l	d7,-(a7)
; $01103C
	lea	($FF4000).l,a1
; $011042
	moveq	#0,d1
; $011044
	move.w	#$03FF,d0

loc_011048:				; $011048
	move.l	d1,(a1)+
; $01104A
	dbf	d0,loc_011048
; $01104E
	lea	($FF3000).l,a1
; $011054
	lea	($FF4000).l,a2
; $01105A
	lea	($FF603C).l,a0
; $011060
	move.w	#$0014,($FFFFA8CA).l

loc_011068:				; $011068
	moveq	#0,d1
; $01106A
	move.b	$0(a0),d1
; $01106E
	cmpi.b	#$FF,d1
; $011072
	beq.w	loc_01112A
; $011076
	btst	#7,$8(a0)
; $01107C
	bne.w	loc_01112A
; $011080
	btst	#7,$2(a0)
; $011086
	bne.w	loc_01112A
; $01108A
	cmpi.w	#$AE92,($000001).w
; $011090
	beq.w	loc_01109E
; $011094
	cmpi.b	#$20,$1(a0)
; $01109A
	beq.w	loc_01112A

loc_01109E:				; $01109E
	moveq	#0,d4
; $0110A0
	moveq	#0,d5
; $0110A2
	move.b	$6(a0),d4
; $0110A6
	move.b	$7(a0),d5
; $0110AA
	move.w	d4,($FFFFA8C6).l
; $0110B0
	move.w	d5,($FFFFA8C8).l
; $0110B6
	beq.w	loc_0110D6
; $0110BA
	tst.w	d4
; $0110BC
	beq.w	loc_0110D6
; $0110C0
	move.w	d5,d3
; $0110C2
	mulu.w	($FFFF9F2C).w,d3
; $0110C6
	add.w	d4,d3
; $0110C8
	add.w	d3,d3
; $0110CA
	move.b	($0,a2,d3.w),d2
; $0110CE
	andi.b	#$0F,d2
; $0110D2
	beq.w	loc_0110F6

loc_0110D6:				; $0110D6
	bsr.w	loc_011834
; $0110DA
	moveq	#0,d4
; $0110DC
	moveq	#0,d5
; $0110DE
	move.b	$6(a0),d4
; $0110E2
	move.b	$7(a0),d5
; $0110E6
	move.w	d4,($FFFFA8C6).l
; $0110EC
	move.w	d5,($FFFFA8C8).l
; $0110F2
	bra.w	loc_0110FC

loc_0110F6:				; $0110F6
	ori.b	#$00,($F,a2,d0.w)

loc_0110FC:				; $0110FC
	moveq	#6,d0

loc_0110FE:				; $0110FE
	adda.w	#$000C,a0
; $011102
	moveq	#0,d1
; $011104
	move.b	$0(a0),d1
; $011108
	cmpi.b	#$FF,d1
; $01110C
	beq.w	loc_01111E
; $011110
	btst	#7,$2(a0)
; $011116
	bne.w	loc_01111E
; $01111A
	bsr.w	loc_011834

loc_01111E:				; $01111E
	dbf	d0,loc_0110FE
; $011122
	adda.w	#$000C,a0
; $011126
	bra.w	loc_01112E

loc_01112A:				; $01112A
	adda.w	#$0060,a0

loc_01112E:				; $01112E
	subq.w	#1,($FFFFA8CA).l
; $011134
	bne.w	loc_011068
; $011138
	movem.l	(a7)+,d7
; $01113C
	rts

loc_01113E:				; $01113E
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $011142
	lea	($FF5000).l,a2
; $011148
	lea	($FF603C).l,a0
; $01114E
	movea.l	a0,a1
; $011150
	move.w	#$0014,($FFFFA8CC).l

loc_011158:				; $011158
	move.w	#$0008,($FFFFA8CA).l
; $011160
	move.l	a0,($FFFFA8D0).l
; $011166
	bsr.w	loc_011972
; $01116A
	beq.w	loc_0111A8

loc_01116E:				; $01116E
	cmpi.b	#$00,$FF(a0)
; $011174
	beq.w	loc_01119C
; $011178
	btst	#7,$2(a0)
; $01117E
	bne.w	loc_01119C
; $011182
	moveq	#0,d0
; $011184
	move.b	$7(a0),d0
; $011188
	mulu.w	($FFFF9F2C).w,d0
; $01118C
	moveq	#0,d1
; $01118E
	move.b	$6(a0),d1
; $011192
	add.w	d1,d0
; $011194
	add.w	d0,d0
; $011196
	move.w	$4(a0),($0,a2,d0.w)

loc_01119C:				; $01119C
	adda.w	#$000C,a0
; $0111A0
	subq.w	#1,($FFFFA8CA).l
; $0111A6
	bne.s	loc_01116E

loc_0111A8:				; $0111A8
	adda.w	#$0060,a1
; $0111AC
	movea.l	a1,a0
; $0111AE
	subq.w	#1,($FFFFA8CC).l
; $0111B4
	bne.s	loc_011158
; $0111B6
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $0111BA
	rts

loc_0111BC:				; $0111BC
	movem.l	a7/a6/a5/d7/d6/d5/d4,-(a7)
; $0111C0
	lea	($FF4000).l,a1
; $0111C6
	lea	($FF5000).l,a0
; $0111CC
	lea	($FF603C).l,a2
; $0111D2
	moveq	#0,d0
; $0111D4
	move.w	#$07FF,d1

loc_0111D8:				; $0111D8
	moveq	#0,d2
; $0111DA
	move.b	($0,a0,d0.w),d2
; $0111DE
	cmpi.b	#$FF,d2
; $0111E2
	beq.w	loc_0111FC
; $0111E6
	mulu.w	#$0060,d2
; $0111EA
	movea.l	a2,a3
; $0111EC
	adda.l	d2,a3
; $0111EE
	move.b	$20(a3),d2
; $0111F2
	andi.b	#$00,(-$10,a1,d0.w)
; $0111F8
	or.b	d2,($0,a1,d0.w)

loc_0111FC:				; $0111FC
	addq.w	#2,d0
; $0111FE
	dbf	d1,loc_0111D8
; $011202
	movem.l	(a7)+,d4/d5/d6/d7/a5/a6/a7
; $011206
	rts

loc_011208:				; $011208
	movem.l	a7/a6/a5/a4/a3/a1/d7/d6/d5/d4/d3,-(a7)
; $01120C
	lea	($FFFFA7FE).l,a2
; $011212
	moveq	#23,d0
; $011214
	moveq	#-1,d1

loc_011216:				; $011216
	move.l	d1,(a2)+
; $011218
	dbf	d0,loc_011216
; $01121C
	moveq	#19,d0
; $01121E
	movea.w	#$6000,a0
; $011222
	lea	($FF603C).l,a1
; $011228
	lea	($FFFFA7FE).l,a2

loc_01122E:				; $01122E
	move.b	$20(a1),d1
; $011232
	move.b	$5C(a1),d2
; $011236
	beq.w	loc_01123C
; $01123A
	move.b	d2,d1

loc_01123C:				; $01123C
	btst	#0,d1
; $011240
	beq.w	loc_0112C8
; $011244
	move.b	$0(a1),d1
; $011248
	cmpi.b	#$FF,d1
; $01124C
	beq.w	loc_0112C8
; $011250
	bsr.w	loc_011580
; $011254
	move.w	d1,d4
; $011256
	rol.l	#7,d1
; $011258
	move.l	d1,d2
; $01125A
	movea.l	($FFFF81C4).w,a4
; $01125E
	addi.l	#$00052980,d2
; $011264
	movea.l	a2,a3
; $011266
	move.w	d1,(a3)+
; $011268
	move.w	a0,d3
; $01126A
	lsr.w	#5,d3
; $01126C
	move.w	d3,(a3)
; $01126E
	move.w	#$FFF9,(a4)+
; $011272
	move.w	a0,(a4)+
; $011274
	move.l	d2,(a4)+
; $011276
	move.w	#$0040,(a4)+
; $01127A
	move.l	d1,d2
; $01127C
	addi.l	#$00058280,d2
; $011282
	move.w	a0,d3
; $011284
	addi.w	#$2000,d3
; $011288
	move.w	#$FFF9,(a4)+
; $01128C
	move.w	d3,(a4)+
; $01128E
	move.l	d2,(a4)+
; $011290
	move.w	#$0040,(a4)+
; $011294
	move.l	a4,($FFFF81C4).w
; $011298
	movea.w	a0,a3
; $01129A
	movem.l	a7/d7/d6,-(a7)
; $01129E
	move.w	d4,d0
; $0112A0
	lea	($0510C0).l,a0
; $0112A6
	jsr	($011F38).l
; $0112AC
	moveq	#0,d0
; $0112AE
	move.w	a3,d1
; $0112B0
	addi.w	#$3600,d1
; $0112B4
	jsr	($011F7C).l
; $0112BA
	jsr	($008A6C).l
; $0112C0
	movem.l	(a7)+,d6/d7/a7
; $0112C4
	lea	$80(a0),a0

loc_0112C8:				; $0112C8
	adda.w	#$0060,a1
; $0112CC
	adda.w	#$0004,a2
; $0112D0
	dbf	d0,loc_01122E
; $0112D4
	moveq	#19,d0
; $0112D6
	movea.w	#$6500,a0
; $0112DA
	lea	($FF603C).l,a1
; $0112E0
	lea	($FFFFA7FE).l,a2

loc_0112E6:				; $0112E6
	move.b	$20(a1),d1
; $0112EA
	move.b	$5C(a1),d2
; $0112EE
	beq.w	loc_0112F4
; $0112F2
	move.b	d2,d1

loc_0112F4:				; $0112F4
	btst	#0,d1
; $0112F8
	bne.w	loc_011374
; $0112FC
	move.b	$0(a1),d1
; $011300
	cmpi.b	#$FF,d1
; $011304
	beq.w	loc_011374
; $011308
	bsr.w	loc_011580
; $01130C
	move.w	d1,d4
; $01130E
	rol.l	#7,d1
; $011310
	move.l	d1,d2
; $011312
	lea	($FFFFA7FE).l,a3

loc_011318:				; $011318
	cmpa.l	a2,a3
; $01131A
	beq.w	loc_011332
; $01131E
	cmp.w	(a3),d1
; $011320
	bne.w	loc_01132A
; $011324
	move.l	(a3),(a2)
; $011326
	bra.w	loc_011374

loc_01132A:				; $01132A
	adda.w	#$0004,a3
; $01132E
	bra.w	loc_011318

loc_011332:				; $011332
	movea.l	($FFFF81C4).w,a4
; $011336
	addi.l	#$00052980,d2
; $01133C
	movea.l	a2,a3
; $01133E
	move.w	d1,(a3)+
; $011340
	move.w	a0,d3
; $011342
	lsr.w	#5,d3
; $011344
	move.w	d3,(a3)
; $011346
	move.w	#$FFF9,(a4)+
; $01134A
	move.w	a0,(a4)+
; $01134C
	move.l	d2,(a4)+
; $01134E
	move.w	#$0040,(a4)+
; $011352
	move.l	d1,d2
; $011354
	addi.l	#$00058280,d2
; $01135A
	move.w	a0,d3
; $01135C
	addi.w	#$2000,d3
; $011360
	move.w	#$FFF9,(a4)+
; $011364
	move.w	d3,(a4)+
; $011366
	move.l	d2,(a4)+
; $011368
	move.w	#$0040,(a4)+
; $01136C
	move.l	a4,($FFFF81C4).w
; $011370
	lea	$80(a0),a0

loc_011374:				; $011374
	adda.w	#$0060,a1
; $011378
	adda.w	#$0004,a2
; $01137C
	dbf	d0,loc_0112E6
; $011380
	movea.w	#$6900,a0
; $011384
	lea	($FFFFA84E).l,a2
; $01138A
	movea.w	#$7600,a3
; $01138E
	moveq	#98,d0
; $011390
	moveq	#15,d6

loc_011392:				; $011392
	move.w	d0,d1
; $011394
	move.w	d1,(a2)+
; $011396
	move.w	a0,d2
; $011398
	lsr.w	#5,d2
; $01139A
	move.w	d2,(a2)+
; $01139C
	bsr.w	loc_0115F0
; $0113A0
	move.w	d1,d4
; $0113A2
	rol.l	#7,d1
; $0113A4
	move.l	d1,d2
; $0113A6
	movea.l	($FFFF81C4).w,a4
; $0113AA
	addi.l	#$00052980,d2
; $0113B0
	move.w	#$FFF9,(a4)+
; $0113B4
	move.w	a0,(a4)+
; $0113B6
	move.l	d2,(a4)+
; $0113B8
	move.w	#$0040,(a4)+
; $0113BC
	move.l	d1,d2
; $0113BE
	addi.l	#$00058280,d2
; $0113C4
	move.w	a0,d3
; $0113C6
	addi.w	#$2000,d3
; $0113CA
	move.w	#$FFF9,(a4)+
; $0113CE
	move.w	d3,(a4)+
; $0113D0
	move.l	d2,(a4)+
; $0113D2
	move.w	#$0040,(a4)+
; $0113D6
	move.l	a4,($FFFF81C4).w
; $0113DA
	movem.l	a7/d7,-(a7)
; $0113DE
	move.w	d4,d0
; $0113E0
	lea	($0510C0).l,a0
; $0113E6
	jsr	($011F38).l
; $0113EC
	moveq	#0,d0
; $0113EE
	move.w	a3,d1
; $0113F0
	jsr	($011F7C).l
; $0113F6
	jsr	($008A6C).l
; $0113FC
	lea	$80(a3),a3
; $011400
	movem.l	(a7)+,d7/a7
; $011404
	lea	$80(a0),a0
; $011408
	addq.w	#1,d0
; $01140A
	dbf	d6,loc_011392
; $01140E
	moveq	#19,d0
; $011410
	movea.w	#$7100,a0
; $011414
	lea	($FF603C).l,a1
; $01141A
	lea	($FFFFA88E).l,a2

loc_011420:				; $011420
	move.b	$20(a1),d1
; $011424
	move.b	$5C(a1),d2
; $011428
	beq.w	loc_01142E
; $01142C
	move.b	d2,d1

loc_01142E:				; $01142E
	btst	#0,d1
; $011432
	bne.w	loc_0114C8
; $011436
	adda.w	#$000C,a1
; $01143A
	moveq	#5,d6

loc_01143C:				; $01143C
	moveq	#0,d1
; $01143E
	move.b	$0(a1),d1
; $011442
	cmpi.b	#$FF,d1
; $011446
	beq.w	loc_0114B8
; $01144A
	btst	#6,$2(a1)
; $011450
	bne.w	loc_0114B8
; $011454
	lea	($FFFFA88E).l,a4

loc_01145A:				; $01145A
	cmpa.l	a2,a4
; $01145C
	beq.w	loc_01146E
; $011460
	cmp.w	(a4),d1
; $011462
	beq.w	loc_0114B8
; $011466
	adda.w	#$0004,a4
; $01146A
	bra.w	loc_01145A

loc_01146E:				; $01146E
	move.w	d1,(a2)+
; $011470
	move.w	a0,d2
; $011472
	lsr.w	#5,d2
; $011474
	move.w	d2,(a2)+
; $011476
	bsr.w	loc_011580
; $01147A
	move.w	d1,d4
; $01147C
	rol.l	#7,d1
; $01147E
	move.l	d1,d2
; $011480
	movea.l	($FFFF81C4).w,a4
; $011484
	addi.l	#$00052980,d2
; $01148A
	move.w	#$FFF9,(a4)+
; $01148E
	move.w	a0,(a4)+
; $011490
	move.l	d2,(a4)+
; $011492
	move.w	#$0040,(a4)+
; $011496
	move.l	d1,d2
; $011498
	addi.l	#$00058280,d2
; $01149E
	move.w	a0,d3
; $0114A0
	addi.w	#$2000,d3
; $0114A4
	move.w	#$FFF9,(a4)+
; $0114A8
	move.w	d3,(a4)+
; $0114AA
	move.l	d2,(a4)+
; $0114AC
	move.w	#$0040,(a4)+
; $0114B0
	move.l	a4,($FFFF81C4).w
; $0114B4
	lea	$80(a0),a0

loc_0114B8:				; $0114B8
	adda.w	#$000C,a1
; $0114BC
	dbf	d6,loc_01143C
; $0114C0
	adda.w	#$000C,a1
; $0114C4
	bra.w	loc_0114CC

loc_0114C8:				; $0114C8
	adda.w	#$0060,a1

loc_0114CC:				; $0114CC
	dbf	d0,loc_011420
; $0114D0
	moveq	#19,d0
; $0114D2
	movea.w	#$7E00,a0
; $0114D6
	lea	($FF603C).l,a1
; $0114DC
	lea	($FFFFA8B6).l,a2
; $0114E2
	movea.w	#$9B00,a3
; $0114E6
	adda.w	#$0054,a1

loc_0114EA:				; $0114EA
	moveq	#0,d1
; $0114EC
	move.b	$0(a1),d1
; $0114F0
	cmpi.b	#$FF,d1
; $0114F4
	beq.w	loc_011572
; $0114F8
	moveq	#0,d2
; $0114FA
	move.b	$4(a1),d2
; $0114FE
	move.w	d2,(a2)+
; $011500
	move.w	a0,d2
; $011502
	lsr.w	#5,d2
; $011504
	move.w	d2,(a2)+
; $011506
	bsr.w	loc_011580
; $01150A
	move.w	d1,d4
; $01150C
	rol.l	#7,d1
; $01150E
	move.l	d1,d2
; $011510
	movea.l	($FFFF81C4).w,a4
; $011514
	addi.l	#$00052980,d2
; $01151A
	move.w	#$FFF9,(a4)+
; $01151E
	move.w	a0,(a4)+
; $011520
	move.l	d2,(a4)+
; $011522
	move.w	#$0040,(a4)+
; $011526
	move.l	d1,d2
; $011528
	addi.l	#$00058280,d2
; $01152E
	move.w	a0,d3
; $011530
	addi.w	#$2000,d3
; $011534
	move.w	#$FFF9,(a4)+
; $011538
	move.w	d3,(a4)+
; $01153A
	move.l	d2,(a4)+
; $01153C
	move.w	#$0040,(a4)+
; $011540
	move.l	a4,($FFFF81C4).w
; $011544
	movem.l	a7/d7/d6,-(a7)
; $011548
	move.w	d4,d0
; $01154A
	lea	($0510C0).l,a0
; $011550
	jsr	($011F38).l
; $011556
	moveq	#0,d0
; $011558
	move.w	a3,d1
; $01155A
	jsr	($011F7C).l
; $011560
	jsr	($008A6C).l
; $011566
	lea	$80(a3),a3
; $01156A
	movem.l	(a7)+,d6/d7/a7
; $01156E
	lea	$80(a0),a0

loc_011572:				; $011572
	adda.w	#$0060,a1
; $011576
	dbf	d0,loc_0114EA
; $01157A
	movem.l	(a7)+,d3/d4/d5/d6/d7/a1/a3/a4/a5/a6/a7
; $01157E
	rts

loc_011580:				; $011580
	movem.l	a5/a4/d5,-(a7)
; $011584
	tst.b	$5(a1)
; $011588
	bne.w	loc_0115D4
; $01158C
	moveq	#0,d2
; $01158E
	move.b	$1(a1),d2
; $011592
	cmpi.w	#$000B,d2
; $011596
	bgt.w	loc_0115D4
; $01159A
	bne.w	loc_0115A2
; $01159E
	move.w	#$0004,d2

loc_0115A2:				; $0115A2
	subq.w	#1,d2
; $0115A4
	add.w	d2,d2
; $0115A6
	add.w	d2,d2
; $0115A8
	lea	($05DB80).l,a2
; $0115AE
	movea.l	($0,a2,d2.w),a2

loc_0115B2:				; $0115B2
	move.b	(a2)+,d3
; $0115B4
	cmpi.b	#$FF,d3
; $0115B8
	beq.w	loc_0115D4
; $0115BC
	cmp.b	d1,d3
; $0115BE
	beq.w	loc_0115CA
; $0115C2
	adda.w	#$0002,a2
; $0115C6
	bra.w	loc_0115B2

loc_0115CA:				; $0115CA
	move.b	(a2)+,d1
; $0115CC
	asl.w	#8,d1
; $0115CE
	move.b	(a2)+,d1
; $0115D0
	bra.w	loc_0115E4

loc_0115D4:				; $0115D4
	andi.w	#$00FF,d1
; $0115D8
	add.w	d1,d1
; $0115DA
	lea	($05DDE6).l,a2
; $0115E0
	move.w	($0,a2,d1.w),d1

loc_0115E4:				; $0115E4
	andi.l	#$0000FFFF,d1
; $0115EA
	movem.l	(a7)+,d5/a4/a5
; $0115EE
	rts

loc_0115F0:				; $0115F0
	movem.l	d5,-(a7)
; $0115F4
	andi.w	#$00FF,d1
; $0115F8
	add.w	d1,d1
; $0115FA
	lea	($05DDE6).l,a2
; $011600
	move.w	($0,a2,d1.w),d1
; $011604
	andi.l	#$0000FFFF,d1
; $01160A
	movem.l	(a7)+,d5
; $01160E
	rts

loc_011610:				; $011610
	movem.l	a7/a5/d7/d6,-(a7)
; $011614
	movea.l	a1,a0
; $011616
	moveq	#0,d2
; $011618
	move.b	$5(a1),d2
; $01161C
	beq.w	loc_011632
; $011620
	lea	($05E628).l,a0
; $011626
	add.w	d2,d2
; $011628
	add.w	d2,d2
; $01162A
	move.l	($0,a0,d2.w),d0
; $01162E
	movea.l	a1,a0
; $011630
	suba.l	d0,a0

loc_011632:				; $011632
	move.b	$20(a0),d0
; $011636
	move.b	$5C(a0),d1
; $01163A
	beq.w	loc_011640
; $01163E
	move.b	d1,d0

loc_011640:				; $011640
	btst	#6,$2(a1)
; $011646
	bne.w	loc_011650
; $01164A
	tst.w	d2
; $01164C
	bne.w	loc_011666

loc_011650:				; $011650
	lea	($FFFFA7FE).l,a0
; $011656
	move.b	$4(a1),d2
; $01165A
	add.w	d2,d2
; $01165C
	add.w	d2,d2
; $01165E
	move.w	($2,a0,d2.w),d1
; $011662
	bra.w	loc_0116DA

loc_011666:				; $011666
	cmpi.b	#$05,$7(a1)
; $01166C
	beq.w	loc_01169A
; $011670
	btst	#0,d0
; $011674
	beq.w	loc_0116BC
; $011678
	moveq	#0,d1
; $01167A
	move.b	$0(a1),d1
; $01167E
	lea	($FFFFA84E).l,a0
; $011684
	moveq	#15,d0

loc_011686:				; $011686
	cmp.w	(a0)+,d1
; $011688
	beq.w	loc_011694
; $01168C
	adda.w	#$0002,a0
; $011690
	dbf	d0,loc_011686

loc_011694:				; $011694
	move.w	(a0),d1
; $011696
	bra.w	loc_0116DA

loc_01169A:				; $01169A
	moveq	#0,d0
; $01169C
	move.b	$4(a1),d0
; $0116A0
	lea	($FFFFA8B6).l,a0
; $0116A6
	moveq	#3,d1

loc_0116A8:				; $0116A8
	cmp.w	(a0)+,d0
; $0116AA
	beq.w	loc_0116B6
; $0116AE
	adda.w	#$0002,a0
; $0116B2
	dbf	d1,loc_0116A8

loc_0116B6:				; $0116B6
	move.w	(a0),d1
; $0116B8
	bra.w	loc_0116DA

loc_0116BC:				; $0116BC
	moveq	#0,d1
; $0116BE
	move.b	$0(a1),d1
; $0116C2
	lea	($FFFFA88E).l,a0
; $0116C8
	moveq	#9,d0

loc_0116CA:				; $0116CA
	cmp.w	(a0)+,d1
; $0116CC
	beq.w	loc_0116D8
; $0116D0
	adda.w	#$0002,a0
; $0116D4
	dbf	d0,loc_0116CA

loc_0116D8:				; $0116D8
	move.w	(a0),d1

loc_0116DA:				; $0116DA
	movem.l	(a7)+,d6/d7/a5/a7
; $0116DE
	rts

loc_0116E0:				; $0116E0
	movem.l	a7/d7,-(a7)
; $0116E4
	lea	($FFFFA84E).l,a0
; $0116EA
	moveq	#25,d0

loc_0116EC:				; $0116EC
	cmp.w	(a0)+,d1
; $0116EE
	beq.w	loc_0116FE
; $0116F2
	adda.w	#$0002,a0
; $0116F6
	dbf	d0,loc_0116EC
; $0116FA
	bra.w	loc_011700

loc_0116FE:				; $0116FE
	move.w	(a0),d1

loc_011700:				; $011700
	movem.l	(a7)+,d7/a7
; $011704
	rts

loc_011706:				; $011706
	movem.l	d7,-(a7)
; $01170A
	lea	($FF4000).l,a1
; $011710
	move.l	#$80008000,d1
; $011716
	move.w	#$03FF,d0

loc_01171A:				; $01171A
	or.l	d1,(a1)+
; $01171C
	dbf	d0,loc_01171A
; $011720
	lea	($FF3000).l,a1
; $011726
	lea	($FF4000).l,a2
; $01172C
	move.w	d4,($FFFFA8C6).l
; $011732
	move.w	d5,($FFFFA8C8).l
; $011738
	move.w	d5,d3
; $01173A
	mulu.w	($FFFF9F2C).w,d3
; $01173E
	add.w	d4,d3
; $011740
	add.w	d3,d3
; $011742
	moveq	#0,d1
; $011744
	move.b	$0(a0),d1
; $011748
	bsr.w	loc_011834
; $01174C
	moveq	#6,d0

loc_01174E:				; $01174E
	adda.w	#$000C,a0
; $011752
	moveq	#0,d1
; $011754
	move.b	$0(a0),d1
; $011758
	cmpi.b	#$FF,d1
; $01175C
	beq.w	loc_01176E
; $011760
	btst	#7,$2(a0)
; $011766
	bne.w	loc_01176E
; $01176A
	bsr.w	loc_011834

loc_01176E:				; $01176E
	dbf	d0,loc_01174E
; $011772
	movem.l	(a7)+,d7
; $011776
	moveq	#7,d0

loc_011778:				; $011778
	moveq	#0,d4
; $01177A
	moveq	#0,d3
; $01177C
	move.b	$6(a0),d4
; $011780
	move.b	$7(a0),d3
; $011784
	mulu.w	($FFFF9F2C).w,d3
; $011788
	add.w	d4,d3
; $01178A
	add.w	d3,d3
; $01178C
	andi.b	#$00,(-$10,a2,d0.w)
; $011792
	adda.w	#$000C,a0
; $011796
	dbf	d0,loc_011778
; $01179A
	rts

loc_01179C:				; $01179C
	movem.l	d7,-(a7)
; $0117A0
	lea	($FF4000).l,a1
; $0117A6
	move.l	#$80008000,d1
; $0117AC
	move.w	#$03FF,d0

loc_0117B0:				; $0117B0
	or.l	d1,(a1)+
; $0117B2
	dbf	d0,loc_0117B0
; $0117B6
	lea	($FF3000).l,a1
; $0117BC
	lea	($FF4000).l,a2
; $0117C2
	moveq	#0,d4
; $0117C4
	move.b	$6(a0),d4
; $0117C8
	moveq	#0,d5
; $0117CA
	move.b	$7(a0),d5
; $0117CE
	move.w	d4,($FFFFA8C6).l
; $0117D4
	move.w	d5,($FFFFA8C8).l
; $0117DA
	move.w	d5,d3
; $0117DC
	mulu.w	($FFFF9F2C).w,d3
; $0117E0
	add.w	d4,d3
; $0117E2
	add.w	d3,d3
; $0117E4
	moveq	#6,d0

loc_0117E6:				; $0117E6
	adda.w	#$000C,a0
; $0117EA
	moveq	#0,d1
; $0117EC
	move.b	$0(a0),d1
; $0117F0
	cmpi.b	#$FF,d1
; $0117F4
	beq.w	loc_011806
; $0117F8
	btst	#7,$2(a0)
; $0117FE
	bne.w	loc_011806
; $011802
	bsr.w	loc_011834

loc_011806:				; $011806
	dbf	d0,loc_0117E6
; $01180A
	movem.l	(a7)+,d7
; $01180E
	moveq	#7,d0

loc_011810:				; $011810
	moveq	#0,d4
; $011812
	moveq	#0,d3
; $011814
	move.b	$6(a0),d4
; $011818
	move.b	$7(a0),d3
; $01181C
	mulu.w	($FFFF9F2C).w,d3
; $011820
	add.w	d4,d3
; $011822
	add.w	d3,d3
; $011824
	andi.b	#$00,(-$10,a2,d0.w)
; $01182A
	adda.w	#$000C,a0
; $01182E
	dbf	d0,loc_011810
; $011832
	rts

loc_011834:				; $011834
	movem.l	a6/a5/a4/a3/a2/a1/a0/d4/d3,-(a7)
; $011838
	mulu.w	#$001C,d1
; $01183C
	lea	($05EDDC).l,a3
; $011842
	adda.w	($2,a3,d1.w),a3
; $011846
	move.w	($FFFFA8C6).l,d4
; $01184C
	move.w	($FFFFA8C8).l,d5
; $011852
	bsr.w	loc_01190E
; $011856
	beq.w	loc_0118F8
; $01185A
	lea	($0118FE).l,a4
; $011860
	moveq	#7,d6

loc_011862:				; $011862
	move.w	($FFFFA8C6).l,d4
; $011868
	add.b	(a4)+,d4
; $01186A
	move.w	($FFFFA8C8).l,d5
; $011870
	add.b	(a4)+,d5
; $011872
	bsr.w	loc_01190E
; $011876
	beq.w	loc_0118F8
; $01187A
	dbf	d6,loc_011862
; $01187E
	moveq	#2,d1

loc_011880:				; $011880
	move.w	d1,d6
; $011882
	moveq	#0,d7

loc_011884:				; $011884
	tst.w	d6
; $011886
	beq.w	loc_0118F2
; $01188A
	move.w	($FFFFA8C6).l,d4
; $011890
	sub.w	d6,d4
; $011892
	move.w	($FFFFA8C8).l,d5
; $011898
	sub.w	d7,d5
; $01189A
	bsr.w	loc_01190E
; $01189E
	beq.w	loc_0118F8
; $0118A2
	move.w	($FFFFA8C6).l,d4
; $0118A8
	add.w	d6,d4
; $0118AA
	move.w	($FFFFA8C8).l,d5
; $0118B0
	add.w	d7,d5
; $0118B2
	bsr.w	loc_01190E
; $0118B6
	beq.w	loc_0118F8
; $0118BA
	move.w	($FFFFA8C6).l,d4
; $0118C0
	add.w	d7,d4
; $0118C2
	move.w	($FFFFA8C8).l,d5
; $0118C8
	sub.w	d6,d5
; $0118CA
	bsr.w	loc_01190E
; $0118CE
	beq.w	loc_0118F8
; $0118D2
	move.w	($FFFFA8C6).l,d4
; $0118D8
	sub.w	d7,d4
; $0118DA
	move.w	($FFFFA8C8).l,d5
; $0118E0
	add.w	d6,d5
; $0118E2
	bsr.w	loc_01190E
; $0118E6
	beq.w	loc_0118F8
; $0118EA
	subq.w	#1,d6
; $0118EC
	addq.w	#1,d7
; $0118EE
	bra.w	loc_011884

loc_0118F2:				; $0118F2
	addq.w	#1,d1
; $0118F4
	bra.w	loc_011880

loc_0118F8:				; $0118F8
	movem.l	(a7)+,d3/d4/a0/a1/a2/a3/a4/a5/a6
; $0118FC
	rts
; $0118FE
	dc.w	$FF00
; $011900
	btst	d0,d0
; $011902
	ori.?	#?,?ea(7,7)
; $011904
	ori.b	#$01,d1
; $011908
	bchg	d0,?ea(7,7)
; $01190A
	dc.w	$FFFF
; $01190C
	btst	d0,d1

loc_01190E:				; $01190E
	tst.w	d4
; $011910
	ble.w	loc_011956
; $011914
	cmp.w	($FFFF9F2C).w,d4
; $011918
	bge.w	loc_011956
; $01191C
	move.w	d5,d3
; $01191E
	ble.w	loc_011956
; $011922
	cmp.w	($FFFF9F2E).w,d5
; $011926
	bge.w	loc_011956
; $01192A
	mulu.w	($FFFF9F2C).w,d3
; $01192E
	add.w	d4,d3
; $011930
	add.w	d3,d3
; $011932
	moveq	#0,d2
; $011934
	move.b	($0,a1,d3.w),d2
; $011938
	tst.b	($0,a3,d2.w)
; $01193C
	bmi.w	loc_011956
; $011940
	move.b	($0,a2,d3.w),d2
; $011944
	andi.b	#$0F,d2
; $011948
	bne.w	loc_011956
; $01194C
	bsr.w	loc_01195C
; $011950
	ori	#$75,ccr

loc_011956:				; $011956
	andi.b	#$75,#$FB

loc_01195C:				; $01195C
	move.b	d4,$6(a0)
; $011960
	move.b	d5,$7(a0)
; $011964
	ori.b	#$00,($F,a2,d0.w)
; $01196A
	andi.b	#$00,($7F,a2,d0.w)
; $011970
	rts

loc_011972:				; $011972
	movem.l	d7,-(a7)
; $011976
	movea.l	($FFFFA8D0).l,a0
; $01197C
	cmpi.b	#$00,$FF(a0)
; $011982
	beq.w	loc_0119A4
; $011986
	btst	#7,$2(a0)
; $01198C
	bne.w	loc_0119A4
; $011990
	btst	#7,$8(a0)
; $011996
	bne.w	loc_0119A4
; $01199A
	andi.b	#$DF,#$FB
; $0119A0
	btst	d0,d0
; $0119A2
	rts

loc_0119A4:				; $0119A4
	ori	#$DF,ccr
; $0119AA
	btst	d0,d0
; $0119AC
	rts
; $0119AE
	clr.w	($FFFFA8D4).l
; $0119B4
	lea	($FF603C).l,a0
; $0119BA
	moveq	#19,d0

loc_0119BC:				; $0119BC
	move.l	a0,($FFFFA8D0).l
; $0119C2
	bsr.w	loc_011972
; $0119C6
	beq.w	loc_011AAC
; $0119CA
	tst.b	$3(a0)
; $0119CE
	bne.w	loc_011A86
; $0119D2
	btst	#4,$8(a0)
; $0119D8
	beq.w	loc_011A5A
; $0119DC
	bset	#4,$8(a0)
; $0119E2
	bchg	#5,$8(a0)
; $0119E8
	move.b	$5C(a0),d1
; $0119EC
	bne.w	loc_0119F6
; $0119F0
	move.b	$20(a0),$5C(a0)

loc_0119F6:				; $0119F6
	move.b	#$0A,$3(a0)
; $0119FC
	move.b	#$01,$16(a0)
; $011A02
	clr.b	$17(a0)
; $011A06
	moveq	#44,d1
; $011A08
	move.b	d1,$0(a0)
; $011A0C
	mulu.w	#$001C,d1
; $011A10
	lea	($05EDDC).l,a1
; $011A16
	adda.w	d1,a1
; $011A18
	move.b	$D(a1),$44(a0)
; $011A1E
	move.b	$E(a1),$45(a0)
; $011A24
	move.b	$F(a1),$46(a0)
; $011A2A
	move.b	$10(a1),$46(a0)
; $011A30
	move.b	$A(a1),d0
; $011A34
	move.b	d0,$38(a0)
; $011A38
	move.b	d0,$39(a0)
; $011A3C
	move.b	$13(a1),$50(a0)
; $011A42
	move.b	$5E(a0),$20(a0)
; $011A48
	bsr.w	loc_0111BC
; $011A4C
	bsr.w	loc_011208
; $011A50
	jsr	($00A6EA).l
; $011A56
	bra.w	loc_011A86

loc_011A5A:				; $011A5A
	moveq	#7,d1

loc_011A5C:				; $011A5C
	cmpi.b	#$00,$FF(a0)
; $011A62
	beq.w	loc_011A7A
; $011A66
	btst	#7,$2(a0)
; $011A6C
	bne.w	loc_011A7A
; $011A70
	ori.b	#$02,$80(a0)
; $011A76
	bsr.w	loc_011B10

loc_011A7A:				; $011A7A
	adda.w	#$000C,a0
; $011A7E
	dbf	d1,loc_011A5C
; $011A82
	bra.w	loc_011AAC

loc_011A86:				; $011A86
	moveq	#6,d1

loc_011A88:				; $011A88
	adda.w	#$000C,a0
; $011A8C
	btst	#7,$2(a0)
; $011A92
	bne.w	loc_011AA8
; $011A96
	tst.b	$3(a0)
; $011A9A
	bne.w	loc_011AA8
; $011A9E
	ori.b	#$02,$80(a0)
; $011AA4
	bsr.w	loc_011B10

loc_011AA8:				; $011AA8
	dbf	d1,loc_011A88

loc_011AAC:				; $011AAC
	movea.l	($FFFFA8D0).l,a0
; $011AB2
	adda.w	#$0060,a0
; $011AB6
	dbf	d0,loc_0119BC
; $011ABA
	tst.w	($FFFFA8D4).l
; $011AC0
	beq.w	loc_011AF2
; $011AC4
	move.l	#$00011ACC,($FFFF8004).w
; $011ACC
	move.l	($FFFF810C).w,d0
; $011AD0
	cmpi.l	#$0000B744,d0
; $011AD6
	bne.w	loc_011ADC
; $011ADA
	rts

loc_011ADC:				; $011ADC
	move.w	#$80E6,d0
; $011AE0
	movea.w	#$A000,a1
; $011AE4
	jsr	($0099B2).l
; $011AEA
	move.l	#$00011AF2,($FFFF8004).w

loc_011AF2:				; $011AF2
	tst.w	($FFFFA8D4).l
; $011AF8
	bne.w	loc_011B0E
; $011AFC
	jsr	($010136).l
; $011B02
	jsr	($010080).l
; $011B08
	jsr	($008608).l

loc_011B0E:				; $011B0E
	rts

loc_011B10:				; $011B10
	movem.l	a7/a3/a2/d7/d6,-(a7)
; $011B14
	moveq	#0,d4
; $011B16
	move.b	$6(a0),d4
; $011B1A
	moveq	#0,d5
; $011B1C
	move.b	$7(a0),d5
; $011B20
	move.w	d4,d0
; $011B22
	sub.w	($FFFF9F24).w,d0
; $011B26
	blt.w	loc_011BBA
; $011B2A
	cmpi.w	#$000F,d0
; $011B2E
	bgt.w	loc_011BBA
; $011B32
	move.w	d5,d0
; $011B34
	sub.w	($FFFF9F26).w,d0
; $011B38
	blt.w	loc_011BBA
; $011B3C
	cmpi.w	#$0009,d0
; $011B40
	bgt.w	loc_011BBA
; $011B44
	movea.l	a0,a1
; $011B46
	jsr	($0094DC).l
; $011B4C
	bne.w	loc_011BBA
; $011B50
	move.w	#$0F70,$0(a0)
; $011B56
	move.w	d4,$2(a0)
; $011B5A
	move.w	d5,$4(a0)
; $011B5E
	move.w	d4,d0
; $011B60
	sub.w	($FFFF9F24).w,d0
; $011B64
	mulu.w	#$0018,d0
; $011B68
	subq.w	#8,d0
; $011B6A
	addi.w	#$0080,d0
; $011B6E
	move.w	d0,$C(a0)
; $011B72
	move.w	d5,d0
; $011B74
	sub.w	($FFFF9F26).w,d0
; $011B78
	mulu.w	#$0018,d0
; $011B7C
	subq.w	#8,d0
; $011B7E
	addi.w	#$0080,d0
; $011B82
	move.w	d0,$6(a0)
; $011B86
	move.w	#$0500,d0
; $011B8A
	ori.w	#$8000,d0
; $011B8E
	move.w	d0,$A(a0)
; $011B92
	move.b	#$05,$8(a0)
; $011B98
	move.w	#$0000,$E(a0)
; $011B9E
	move.w	#$0004,$10(a0)
; $011BA4
	move.w	#$0004,$12(a0)
; $011BAA
	move.w	#$0002,$14(a0)
; $011BB0
	addq.w	#1,($FFFFA8D4).l
; $011BB6
	bra.w	loc_011BE4

loc_011BBA:				; $011BBA
	move.w	#$0100,(Z80_BUSREQ).l

loc_011BC2:				; $011BC2
	btst	#0,(Z80_BUSREQ).l
; $011BCA
	bne.s	loc_011BC2
; $011BCC
	move.b	#$00,($A01FFE).l
; $011BD4
	move.b	#$4F,($A01FFF).l
; $011BDC
	move.w	#$0000,(Z80_BUSREQ).l

loc_011BE4:				; $011BE4
	move.w	d5,d0
; $011BE6
	mulu.w	($FFFF9F2C).w,d0
; $011BEA
	add.w	d4,d0
; $011BEC
	add.w	d0,d0
; $011BEE
	lea	($FF4000).l,a0
; $011BF4
	andi.b	#$00,(-$10,a0,d0.w)
; $011BFA
	lea	($FF5000).l,a0
; $011C00
	move.w	#$FFFF,($0,a0,d0.w)
; $011C06
	tst.b	$5(a1)
; $011C0A
	bne.w	loc_011C1A
; $011C0E
	jsr	($00AA18).l
; $011C14
	jsr	($00A6EA).l

loc_011C1A:				; $011C1A
	movem.l	(a7)+,d6/d7/a2/a3/a7
; $011C1E
	rts
; $011C20
	bsr.w	loc_010C1E
; $011C24
	move.w	#$0013,d0

loc_011C28:				; $011C28
	move.w	d0,($FFFFA8CE).l
; $011C2E
	lea	($FF603C).l,a0
; $011C34
	moveq	#19,d2
; $011C36
	sub.w	d0,d2
; $011C38
	move.w	d2,($FFFFA8D6).l
; $011C3E
	mulu.w	#$0060,d2
; $011C42
	adda.w	d2,a0
; $011C44
	move.l	a0,($FFFFA8D0).l
; $011C4A
	bsr.w	loc_011972
; $011C4E
	beq.w	loc_011C80
; $011C52
	cmpi.b	#$20,$1(a0)
; $011C58
	bne.w	loc_011C6C
; $011C5C
	moveq	#0,d4
; $011C5E
	move.b	$6(a0),d4
; $011C62
	moveq	#0,d5
; $011C64
	move.b	$7(a0),d5
; $011C68
	bsr.w	loc_011706

loc_011C6C:				; $011C6C
	move.l	#$00011C80,($FFFF8004).w
; $011C74
	move.l	#$00011C92,d0
; $011C7A
	jmp	($0085EE).l

loc_011C80:				; $011C80
	move.w	($FFFFA8CE).l,d0
; $011C86
	dbf	d0,loc_011C28
; $011C8A
	jsr	($008608).l
; $011C90
	rts
; $011C92
	lea	($FF603C).l,a0
; $011C98
	move.w	($FFFFA8D6).l,d2
; $011C9E
	mulu.w	#$0060,d2
; $011CA2
	adda.w	d2,a0
; $011CA4
	move.l	a0,($FFFFA8D0).l
; $011CAA
	bsr.w	loc_011972
; $011CAE
	beq.w	loc_011D96
; $011CB2
	moveq	#0,d2
; $011CB4
	move.b	$6(a0),d2
; $011CB8
	pea	d2
; $011CBA
	move.b	$7(a0),d2
; $011CBE
	move.l	d2,($FFFFA6EE).w
; $011CC2
	move.b	#$01,($FFFFA6F9).w
; $011CC8
	move.l	#$00011CDC,($FFFF8004).w
; $011CD0
	move.l	#$0000FFBA,d0
; $011CD6
	jmp	($0085EE).l
; $011CDC
	move.w	#$0007,d1

loc_011CE0:				; $011CE0
	move.w	($FFFFA8D6).l,d0
; $011CE6
	move.w	d1,($FFFFA8CC).l
; $011CEC
	lea	($FF603C).l,a0
; $011CF2
	move.w	($FFFFA8D6).l,d2
; $011CF8
	mulu.w	#$0060,d2
; $011CFC
	adda.w	d2,a0
; $011CFE
	movea.l	a0,a1
; $011D00
	moveq	#7,d2
; $011D02
	sub.w	d1,d2
; $011D04
	mulu.w	#$000C,d2
; $011D08
	adda.w	d2,a1
; $011D0A
	cmpi.b	#$00,$FF(a1)
; $011D10
	beq.w	loc_011D8C
; $011D14
	btst	#7,$2(a1)
; $011D1A
	bne.w	loc_011D8C
; $011D1E
	lea	($FF5000).l,a2
; $011D24
	moveq	#0,d5
; $011D26
	move.b	$7(a1),d5
; $011D2A
	move.w	d5,d2
; $011D2C
	mulu.w	($FFFF9F2C).w,d2
; $011D30
	moveq	#0,d4
; $011D32
	move.b	$6(a1),d4
; $011D36
	add.w	d4,d2
; $011D38
	add.w	d2,d2
; $011D3A
	move.w	$4(a1),($0,a2,d2.w)
; $011D40
	lea	($FF4000).l,a2
; $011D46
	move.b	$20(a0),($0,a2,d2.w)
; $011D4C
	jsr	($00C254).l
; $011D52
	move.w	#$0002,($FFFFA61C).w
; $011D58
	btst	#4,($FFFF8178).w
; $011D5E
	beq.w	loc_011D68
; $011D62
	move.w	#$0001,($FFFFA61C).w

loc_011D68:				; $011D68
	cmpi.w	#$A8CC,($07FFFF).l
; $011D70
	bne.w	loc_011D78
; $011D74
	addq.w	#5,($FFFFA61C).w

loc_011D78:				; $011D78
	move.l	#$00011D8C,($FFFF8004).w
; $011D80
	move.l	#$0000F68E,d0
; $011D86
	jmp	($0085EE).l

loc_011D8C:				; $011D8C
	move.w	($FFFFA8CC).l,d1
; $011D92
	dbf	d1,loc_011CE0

loc_011D96:				; $011D96
	move.b	#$00,($FFFFA6F9).w
; $011D9C
	jsr	($008608).l
; $011DA2
	rts

loc_011DA4:				; $011DA4
	movem.l	a6/d7,-(a7)
; $011DA8
	lea	($FF603C).l,a0
; $011DAE
	move.w	#$0013,d1

loc_011DB2:				; $011DB2
	cmp.b	$1(a0),d0
; $011DB6
	beq.w	loc_011DCC
; $011DBA
	adda.w	#$0060,a0
; $011DBE
	dbf	d1,loc_011DB2
; $011DC2
	ori	#$DF,ccr
; $011DC8
	btst	d0,d2
; $011DCA
	rts

loc_011DCC:				; $011DCC
	move.l	a0,d0
; $011DCE
	andi.b	#$DF,#$FB
; $011DD4
	btst	d0,d2
; $011DD6
	rts

loc_011DD8:				; $011DD8
	movem.l	a7/a6/a5/a4/d7/d6,-(a7)
; $011DDC
	lea	($FF603C).l,a0
; $011DE2
	lea	($FFFFA4CC).w,a1
; $011DE6
	moveq	#19,d0

loc_011DE8:				; $011DE8
	btst	#5,$8(a0)
; $011DEE
	bne.w	loc_011ECC
; $011DF2
	moveq	#0,d1
; $011DF4
	move.b	$1(a0),d1
; $011DF8
	beq.w	loc_011ECC
; $011DFC
	cmpi.w	#$000B,d1
; $011E00
	bhi.w	loc_011ECC
; $011E04
	bne.w	loc_011E0C
; $011E08
	move.w	#$0004,d1

loc_011E0C:				; $011E0C
	subq.w	#1,d1
; $011E0E
	rol.w	#3,d1
; $011E10
	move.w	d1,d2
; $011E12
	add.w	d1,d1
; $011E14
	add.w	d2,d1
; $011E16
	move.b	$0(a0),($0,a1,d1.w)
; $011E1C
	move.w	$2E(a0),($2,a1,d1.w)
; $011E22
	move.w	$3A(a0),($4,a1,d1.w)
; $011E28
	move.l	$50(a0),($6,a1,d1.w)
; $011E2E
	move.b	$9(a0),($E,a1,d1.w)
; $011E34
	move.b	$A(a0),($F,a1,d1.w)
; $011E3A
	move.b	$B(a0),($10,a1,d1.w)
; $011E40
	moveq	#0,d2
; $011E42
	move.b	$5E(a0),d2
; $011E46
	add.w	($12,a1,d1.w),d2
; $011E4A
	bcc.w	loc_011E50
; $011E4E
	moveq	#-1,d2

loc_011E50:				; $011E50
	move.w	d2,($12,a1,d1.w)
; $011E54
	btst	#7,$2(a0)
; $011E5A
	bne.w	loc_011E66
; $011E5E
	tst.b	$3(a0)
; $011E62
	bne.w	loc_011E78

loc_011E66:				; $011E66
	addq.b	#1,($14,a1,d1.w)
; $011E6A
	bcc.w	loc_011EC6
; $011E6E
	move.b	#$FF,($14,a1,d1.w)
; $011E74
	bra.w	loc_011EC6

loc_011E78:				; $011E78
	move.l	a0,-(a7)
; $011E7A
	moveq	#6,d2
; $011E7C
	moveq	#5,d3

loc_011E7E:				; $011E7E
	adda.w	#$000C,a0
; $011E82
	cmpi.b	#$00,$FF(a0)
; $011E88
	beq.w	loc_011E98
; $011E8C
	btst	#7,$2(a0)
; $011E92
	beq.w	loc_011E98
; $011E96
	subq.b	#1,d2

loc_011E98:				; $011E98
	dbf	d3,loc_011E7E
; $011E9C
	movea.l	(a7)+,a0
; $011E9E
	add.b	($15,a1,d1.w),d2
; $011EA2
	cmpi.b	#$10,d2
; $011EA6
	bcs.w	loc_011EC2
; $011EAA
	addq.b	#1,($16,a1,d1.w)
; $011EAE
	cmpi.b	#$16,($8,a1,d0.w)
; $011EB4
	bcs.w	loc_011EBE
; $011EB8
	move.b	#$08,($16,a1,d1.w)

loc_011EBE:				; $011EBE
	subi.b	#$10,d2

loc_011EC2:				; $011EC2
	move.b	d2,($15,a1,d1.w)

loc_011EC6:				; $011EC6
	move.b	$16(a0),($11,a1,d1.w)

loc_011ECC:				; $011ECC
	adda.w	#$0060,a0
; $011ED0
	dbf	d0,loc_011DE8
; $011ED4
	movem.l	(a7)+,d6/d7/a4/a5/a6/a7
; $011ED8
	rts

loc_011EDA:				; $011EDA
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $011EDE
	lea	($FF603C).l,a0
; $011EE4
	lea	($FFFFA4CC).w,a1
; $011EE8
	moveq	#19,d0

loc_011EEA:				; $011EEA
	btst	#5,$8(a0)
; $011EF0
	bne.w	loc_011F2A
; $011EF4
	moveq	#0,d1
; $011EF6
	move.b	$1(a0),d1
; $011EFA
	beq.w	loc_011F2A
; $011EFE
	cmpi.w	#$000B,d1
; $011F02
	bhi.w	loc_011F2A
; $011F06
	bne.w	loc_011F0E
; $011F0A
	move.w	#$0004,d1

loc_011F0E:				; $011F0E
	subq.w	#1,d1
; $011F10
	rol.w	#3,d1
; $011F12
	move.w	d1,d2
; $011F14
	add.w	d1,d1
; $011F16
	add.w	d2,d1
; $011F18
	move.b	$9(a0),($E,a1,d1.w)
; $011F1E
	move.b	$A(a0),($F,a1,d1.w)
; $011F24
	move.b	$B(a0),($10,a1,d1.w)

loc_011F2A:				; $011F2A
	adda.w	#$0060,a0
; $011F2E
	dbf	d0,loc_011EEA
; $011F32
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $011F36
	rts

loc_011F38:				; $011F38
	andi.l	#$0000FFFF,d0
; $011F3E
	roxl.w	#6,d0
; $011F40
	adda.l	d0,a0
; $011F42
	lea	($FFFFA8D8).l,a1
; $011F48
	moveq	#0,d2
; $011F4A
	move.w	#$001F,d5

loc_011F4E:				; $011F4E
	move.w	(a0)+,d4
; $011F50
	moveq	#0,d0
; $011F52
	move.l	d0,d1
; $011F54
	move.w	#$0007,d3

loc_011F58:				; $011F58
	asl.l	#4,d0
; $011F5A
	add.w	d4,d4
; $011F5C
	add.l	d0,d2
; $011F5E
	dbf	d3,loc_011F58
; $011F62
	move.w	#$0007,d3

loc_011F66:				; $011F66
	asl.l	#4,d1
; $011F68
	add.w	d4,d4
; $011F6A
	add.l	d1,d2
; $011F6C
	dbf	d3,loc_011F66
; $011F70
	add.l	d0,d0
; $011F72
	add.l	d0,d1
; $011F74
	move.l	d1,(a1)+
; $011F76
	dbf	d5,loc_011F4E
; $011F7A
	rts

loc_011F7C:				; $011F7C
	rol.w	#7,d0
; $011F7E
	add.w	d0,d1
; $011F80
	movea.l	($FFFF81C4).w,a0
; $011F84
	move.w	#$FFF9,(a0)+
; ★ ━━━ SRAM 读取 / 存档初始化 ━━━
; ★ ═══ SRAM 读取 / 存档初始化 $11F88 ═══
; $011F88
	move.w	d1,(a0)+
; $011F8A
	move.l	#$FFFFA8D8,(a0)+
; $011F90
	move.w	#$0040,(a0)+
; $011F94
	move.l	a0,($FFFF81C4).w
; $011F98
	rts

loc_011F9A:				; $011F9A
	movem.l	a7/d7/d6,-(a7)
; $011F9E
	lea	($011FBA).l,a0
; $011FA4
	lea	($FFFFA95C).l,a1
; $011FAA
	move.w	#$0007,d0

loc_011FAE:				; $011FAE
	move.l	(a0)+,(a1)+
; $011FB0
	dbf	d0,loc_011FAE
; $011FB4
	movem.l	(a7)+,d6/d7/a7
; $011FB8
	rts
; $011FBA
	dc.w	$0000
; $011FBC
	dc.w	$0600
; $011FBE
	dc.w	$0000
; $011FC0
	dc.w	$0EEE
; $011FC2
	bset	#102,d0
; $011FC6
	addi.l	#$00E00EE0,$446(a4)
; $011FCE
	ori.b	#$00,d6
; $011FD2
	ori.l	#$004E000A,a6
; $011FD8
	ori.?	#?,a6
; $011FDA
	move.l	#$00FF603C,($FFFFA9F2).l
; $011FE4
	clr.w	($FFFFA9F6).l
; $011FEA
	move.l	#$00011FF2,($FFFF8004).w

loc_011FF2:				; $011FF2
	movea.l	($FFFFA9F2).l,a0
; $011FF8
	move.l	a0,($FFFFA8D0).w
; $011FFC
	jsr	($011972).l
; $012002
	beq.w	loc_01205A
; $012006
	move.b	$5C(a0),d0
; $01200A
	bne.w	loc_012012
; $01200E
	move.b	$20(a0),d0

loc_012012:				; $012012
	cmp.b	($FFFFA9F0).l,d0
; $012018
	bne.w	loc_01205A
; $01201C
	btst	#3,$17(a0)
; $012022
	beq.w	loc_012038
; $012026
	move.b	$2C(a0),d1
; $01202A
	bsr.w	loc_0120B6
; $01202E
	beq.w	loc_012038
; $012032
	cmpa.l	d1,a0
; $012034
	bne.w	loc_01205A

loc_012038:				; $012038
	clr.l	($FFFFA97E).l
; $01203E
	move.l	#$00012052,($FFFF8004).w
; $012046
	move.l	#$0001222C,d0
; $01204C
	jmp	($0085EE).l
; $012052
	tst.b	($FFFFAA10).w
; $012056
	bne.w	loc_0120A6

loc_01205A:				; $01205A
	move.b	($FFFFA9F6).l,d0
; $012060
	addq.b	#1,d0
; $012062
	cmpi.b	#$14,d0
; $012066
	beq.w	loc_012086
; $01206A
	move.b	d0,($FFFFA9F6).l
; $012070
	addi.l	#$FFFFA9F2,($000060).l
; $01207A
	move.l	#$00011FF2,($FFFF8004).w
; $012082
	bra.w	loc_011FF2

loc_012086:				; $012086
	lea	($FF603C).l,a0
; $01208C
	move.w	#$009F,d0

loc_012090:				; $012090
	andi.b	#$02,$FE(a0)
; $012096
	adda.w	#$000C,a0
; $01209A
	dbf	d0,loc_012090
; $01209E
	jsr	($008608).l
; $0120A4
	rts

loc_0120A6:				; $0120A6
	jsr	($008608).l
; $0120AC
	move.l	#$0000CC9E,($FFFF8004).w
; $0120B4
	rts

loc_0120B6:				; $0120B6
	movem.l	a5/d6,-(a7)
; $0120BA
	lea	($FF603C).l,a1
; $0120C0
	moveq	#19,d2

loc_0120C2:				; $0120C2
	cmp.b	$1(a1),d1
; $0120C6
	beq.w	loc_0120DA
; $0120CA
	adda.w	#$0060,a1
; $0120CE
	dbf	d2,loc_0120C2

loc_0120D2:				; $0120D2
	moveq	#0,d1
; $0120D4
	movem.l	(a7)+,d6/a5
; $0120D8
	rts

loc_0120DA:				; $0120DA
	cmpi.b	#$00,$FF(a1)
; $0120E0
	beq.w	loc_0120D2
; $0120E4
	btst	#7,$2(a1)
; $0120EA
	bne.w	loc_0120D2
; $0120EE
	btst	#7,$8(a1)
; $0120F4
	bne.w	loc_0120D2
; $0120F8
	move.l	a1,d1
; $0120FA
	movem.l	(a7)+,d6/a5
; $0120FE
	rts

loc_012100:				; $012100
	movem.l	a6/a5/a4/a3/a2/a1/a0/d7/d6/d5,-(a7)
; $012104
	move.w	($FFFFA6E6).w,d1
; $012108
	move.w	($FFFFA6E8).w,d2
; $01210C
	move.w	d2,d3
; $01210E
	mulu.w	($FFFF9F2C).w,d3
; $012112
	add.w	d1,d3
; $012114
	add.w	d3,d3
; $012116
	lea	($FF5000).l,a0
; $01211C
	moveq	#0,d4
; $01211E
	move.b	($0,a0,d3.w),d4
; $012122
	lea	($05E5D8).l,a1
; $012128
	add.w	d4,d4
; $01212A
	add.w	d4,d4
; $01212C
	movea.l	($0,a1,d4.w),a1
; $012130
	movea.l	a1,a2
; $012132
	bsr.w	loc_0146CC
; $012136
	beq.w	loc_012198
; $01213A
	move.b	$20(a1),d4
; $01213E
	lea	($FF603C).l,a1
; $012144
	moveq	#19,d5

loc_012146:				; $012146
	bsr.w	loc_0146CC
; $01214A
	beq.w	loc_012190
; $01214E
	btst	#4,$17(a1)
; $012154
	bne.w	loc_012190
; $012158
	move.b	d4,d6
; $01215A
	and.b	$20(a1),d6
; $01215E
	bne.w	loc_012190
; $012162
	move.l	a1,($FFFFA8D0).w
; $012166
	jsr	($011972).l
; $01216C
	beq.w	loc_012190
; $012170
	move.b	d1,d6
; $012172
	sub.b	$6(a1),d6
; $012176
	bcc.w	loc_01217C
; $01217A
	neg.b	d6

loc_01217C:				; $01217C
	move.b	d2,d7
; $01217E
	sub.b	$7(a1),d7
; $012182
	bcc.w	loc_012188
; $012186
	neg.b	d7

loc_012188:				; $012188
	add.b	d7,d6
; $01218A
	cmp.b	d0,d6
; $01218C
	ble.w	loc_0121A0

loc_012190:				; $012190
	adda.w	#$0060,a1
; $012194
	dbf	d5,loc_012146

loc_012198:				; $012198
	ori	#$00,ccr
; $01219E
	ori.b	#$3C,d6
; $0121A2
	ori.?	#?,(-$21,pc,d4.l)
; $0121A6
	bchg	d3,?ea(7,6)
; $0121A8
	rts

loc_0121AA:				; $0121AA
	movem.l	a6/a4/a3/d7/d6/d5,-(a7)
; $0121AE
	movea.l	($FFFFA9F2).l,a0
; $0121B4
	move.b	$20(a0),($FFFFA626).w
; $0121BA
	lea	($FF603C).l,a1
; $0121C0
	moveq	#19,d1

loc_0121C2:				; $0121C2
	btst	#3,$17(a1)
; $0121C8
	beq.w	loc_01221E
; $0121CC
	move.l	a1,($FFFFA8D0).w
; $0121D0
	jsr	($011972).l
; $0121D6
	beq.w	loc_01221E
; $0121DA
	lea	($FF4000).l,a2
; $0121E0
	moveq	#7,d2

loc_0121E2:				; $0121E2
	move.b	$0(a1),d3
; $0121E6
	cmpi.b	#$FF,d3
; $0121EA
	beq.w	loc_012212
; $0121EE
	btst	#7,$2(a1)
; $0121F4
	bne.w	loc_012212
; $0121F8
	moveq	#0,d3
; $0121FA
	move.b	$6(a1),d3
; $0121FE
	moveq	#0,d4
; $012200
	move.b	$7(a1),d4
; $012204
	mulu.w	($FFFF9F2C).w,d4
; $012208
	add.w	d3,d4
; $01220A
	add.w	d4,d4
; $01220C
	ori.b	#$00,($F,a2,d0.w)

loc_012212:				; $012212
	adda.w	#$000C,a1
; $012216
	dbf	d2,loc_0121E2
; $01221A
	bra.w	loc_012222

loc_01221E:				; $01221E
	adda.w	#$0060,a1

loc_012222:				; $012222
	dbf	d1,loc_0121C2
; $012226
	movem.l	(a7)+,d5/d6/d7/a3/a4/a6
; $01222A
	rts
; $01222C
	bsr.w	loc_0121AA
; $012230
	movea.l	($FFFFA9F2).l,a0
; $012236
	movea.l	($FFFF8108).l,a0
; $01223C
	move.l	#$000129BC,(a0)
; $012242
	lea	$28(a0),a0
; $012246
	move.l	a0,($FFFF8108).l
; $01224C
	move.b	#$01,($FFFFA9EF).l
; $012254
	moveq	#0,d0
; $012256
	jsr	($00FF8A).l
; $01225C
	move.b	#$00,($FFFFA9EE).l
; $012264
	move.l	#$00012278,($FFFF8004).w
; $01226C
	move.l	#$000119AE,d0
; $012272
	jmp	($0085EE).l
; $012278
	tst.b	($FFFFAA10).w
; $01227C
	bne.w	loc_0122AC
; $012280
	move.l	#$00012294,($FFFF8004).w
; $012288
	move.l	#$00014834,d0
; $01228E
	jmp	($0085EE).l
; $012294
	cmpi.b	#$EE,($01FFFF).l
; $01229C
	beq.w	loc_0122C2
; $0122A0
	cmpi.b	#$EF,($00FFFF).l
; $0122A8
	bne.w	loc_0122C0

loc_0122AC:				; $0122AC
	jsr	($0111BC).l
; $0122B2
	move.b	#$00,($FFFFA9EE).l
; $0122BA
	jsr	($008608).l

loc_0122C0:				; $0122C0
	rts

loc_0122C2:				; $0122C2
	cmpi.w	#$A49E,(rom).w
; $0122C8
	beq.w	loc_0122D8
; $0122CC
	cmpi.w	#$A984,($05FFFF).l
; $0122D4
	beq.w	loc_01231E

loc_0122D8:				; $0122D8
	move.l	($FFFFA6DE).w,d0
; $0122DC
	cmp.l	($FFFFA6EE).w,d0
; $0122E0
	beq.w	loc_01231E
; $0122E4
	move.b	#$01,($FFFFA6F9).w
; $0122EA
	move.l	#$000122FE,($FFFF8004).w
; $0122F2
	move.l	#$00012946,d0
; $0122F8
	jmp	($0085EE).l
; $0122FE
	move.b	#$00,($FFFFA6F9).w
; $012304
	move.w	#$0005,($FFFFA61C).w
; $01230A
	move.l	#$0001231E,($FFFF8004).w
; $012312
	move.l	#$0000F68E,d0
; $012318
	jmp	($0085EE).l

loc_01231E:				; $01231E
	move.w	($FFFFA984).l,d0
; $012324
	subq.w	#1,d0
; $012326
	add.w	d0,d0
; $012328
	add.w	d0,d0
; $01232A
	jmp	($2,pc,d0.w)
; $01232E
	bra.w	loc_01234E
; $012332
	bra.w	loc_01241A
; $012336
	bra.w	loc_0125CA
; $01233A
	bra.w	loc_012884
; $01233E
	bra.w	loc_01234E
; $012342
	bra.w	loc_0128C0
; $012346
	bra.w	loc_0128D0
; $01234A
	bra.w	loc_0128EC

loc_01234E:				; $01234E
	cmpi.w	#$A49E,(rom).w
; $012354
	beq.w	loc_012364
; $012358
	cmpi.w	#$A984,($05FFFF).l
; $012360
	beq.w	loc_0123B2

loc_012364:				; $012364
	move.l	($FFFFA6E6).w,d0
; $012368
	cmp.l	($FFFFA6DE).w,d0
; $01236C
	beq.w	loc_0123E8
; $012370
	moveq	#1,d0
; $012372
	jsr	($00FF8A).l
; $012378
	move.b	#$00,($FFFFA6F9).w
; $01237E
	move.l	($FFFFA6E6).w,($FFFFA6EE).w
; $012384
	move.l	#$00012398,($FFFF8004).w
; $01238C
	move.l	#$00012946,d0
; $012392
	jmp	($0085EE).l
; $012398
	move.w	#$0005,($FFFFA61C).w
; $01239E
	move.l	#$000123B2,($FFFF8004).w
; $0123A6
	move.l	#$0000F68E,d0
; $0123AC
	jmp	($0085EE).l

loc_0123B2:				; $0123B2
	movea.l	($FFFFA62C).w,a0
; $0123B6
	move.w	($FFFFA6E6).w,d5
; $0123BA
	move.w	($FFFFA6E8).w,d6
; $0123BE
	bsr.w	loc_013CDA
; $0123C2
	move.l	#$000123CC,($FFFF8004).w

loc_0123CA:				; $0123CA
	rts
; $0123CC
	tst.b	($FFFF9FEB).w
; $0123D0
	bne.w	loc_0123CA
; $0123D4
	move.l	#$000123E8,($FFFF8004).w
; $0123DC
	move.l	#$0001295A,d0
; $0123E2
	jmp	($0085EE).l

loc_0123E8:				; $0123E8
	move.l	($FFFFA6DE).w,($FFFFA6E2).w
; $0123EE
	moveq	#0,d0
; $0123F0
	jsr	($00FF8A).l
; $0123F6
	bchg	#3,($FFFFAA11).w
; $0123FC
	move.l	#$00012410,($FFFF8004).w
; $012404
	move.l	#$00014DBE,d0
; $01240A
	jmp	($0085EE).l
; $012410
	move.l	#$00012254,($FFFF8004).w
; $012418
	rts

loc_01241A:				; $01241A
	movea.l	($FFFFA6F2).w,a0
; $01241E
	moveq	#2,d0
; $012420
	movea.l	($FFFFA62C).w,a1
; $012424
	tst.b	$5(a1)
; $012428
	bne.w	loc_012440
; $01242C
	move.b	$9(a1),d1
; $012430
	cmpi.b	#$0F,d1
; $012434
	beq.w	loc_012464
; $012438
	cmpi.b	#$10,d1
; $01243C
	beq.w	loc_012464

loc_012440:				; $012440
	moveq	#0,d1
; $012442
	move.b	$0(a1),d1
; $012446
	mulu.w	#$001C,d1
; $01244A
	lea	($05EDDC).l,a1
; $012450
	move.b	($6,a1,d1.w),d1
; $012454
	cmpi.b	#$0F,d1
; $012458
	beq.w	loc_012464
; $01245C
	cmpi.b	#$10,d1
; $012460
	bne.w	loc_012466

loc_012464:				; $012464
	moveq	#3,d0

loc_012466:				; $012466
	jsr	($00FF8A).l
; $01246C
	move.b	#$00,($FFFFA6F9).w
; $012472
	move.l	($FFFFA6EA).w,($FFFFA6EE).w
; $012478
	move.l	#$0001248C,($FFFF8004).w
; $012480
	move.l	#$00012946,d0
; $012486
	jmp	($0085EE).l
; $01248C
	move.w	#$0005,($FFFFA61C).w
; $012492
	move.l	#$000124A6,($FFFF8004).w
; $01249A
	move.l	#$0000F68E,d0
; $0124A0
	jmp	($0085EE).l
; $0124A6
	move.l	#$000124BA,($FFFF8004).w
; $0124AE
	move.l	#$00012912,d0
; $0124B4
	jmp	($0085EE).l
; $0124BA
	bchg	#1,($FFFFAA11).w
; $0124C0
	move.l	#$000124D4,($FFFF8004).w
; $0124C8
	move.l	#$00014DBE,d0
; $0124CE
	jmp	($0085EE).l
; $0124D4
	movea.l	($FFFFA62C).w,a0
; $0124D8
	btst	#6,$2(a0)
; $0124DE
	beq.w	loc_0124FC
; $0124E2
	clr.b	$3(a0)
; $0124E6
	movea.l	($FFFFA634).w,a0
; $0124EA
	btst	#6,$2(a0)
; $0124F0
	beq.w	loc_012566
; $0124F4
	clr.b	$3(a0)
; $0124F8
	bra.w	loc_012566

loc_0124FC:				; $0124FC
	movea.l	($FFFFA634).w,a0
; $012500
	btst	#6,$2(a0)
; $012506
	beq.w	loc_012512
; $01250A
	clr.b	$3(a0)
; $01250E
	bra.w	loc_012566

loc_012512:				; $012512
	move.w	#$0000,($FFFFAE92).w
; $012518
	move.l	#$0001252C,($FFFF8004).w
; $012520
	move.l	#$000180C0,d0
; $012526
	jmp	($0085EE).l
; $01252C
	lea	($FFFFA662).w,a0
; $012530
	move.w	$6(a0),d0
; $012534
	sub.w	($FFFFA692).w,d0
; $012538
	bpl.w	loc_01253E
; $01253C
	moveq	#0,d0

loc_01253E:				; $01253E
	movea.l	($FFFFA62C).w,a0
; $012542
	move.b	d0,$3(a0)
; $012546
	lea	($FFFFA694).w,a0
; $01254A
	move.w	$6(a0),d1
; $01254E
	sub.w	($FFFFA6C4).w,d1
; $012552
	bpl.w	loc_012558
; $012556
	moveq	#0,d1

loc_012558:				; $012558
	movea.l	($FFFFA634).w,a0
; $01255C
	move.b	d1,$3(a0)
; $012560
	jsr	($00E0FE).l

loc_012566:				; $012566
	jsr	($00A6EA).l
; $01256C
	movea.l	($FFFFA62C).w,a0
; $012570
	ori.b	#$02,$1(a0)
; $012576
	moveq	#0,d4
; $012578
	move.b	$6(a0),d4
; $01257C
	moveq	#0,d5
; $01257E
	move.b	$7(a0),d5
; $012582
	jsr	($00C254).l
; $012588
	moveq	#0,d0
; $01258A
	jsr	($00FF8A).l
; $012590
	bchg	#2,($FFFFAA11).w
; $012596
	bchg	#6,($FFFFAA11).w
; $01259C
	move.l	#$000125B0,($FFFF8004).w
; $0125A4
	move.l	#$00014DBE,d0
; $0125AA
	jmp	($0085EE).l
; $0125B0
	move.l	#$00012254,($FFFF8004).w
; $0125B8
	move.l	#$0000DA8A,d0
; $0125BE
	jsr	($0085EE).l
; $0125C4
	jmp	($00DA8A).l

loc_0125CA:				; $0125CA
	move.l	($FFFFA6DE).w,($FFFFA6E2).w
; $0125D0
	moveq	#4,d0
; $0125D2
	jsr	($00FF8A).l
; $0125D8
	jsr	($00AA8E).l
; $0125DE
	jsr	($00A6EA).l
; $0125E4
	move.b	#$00,($FFFFA6F9).w
; $0125EA
	move.l	($FFFFA6E6).w,($FFFFA6EE).w
; $0125F0
	move.l	#$00012604,($FFFF8004).w
; $0125F8
	move.l	#$0000FFBA,d0
; $0125FE
	jmp	($0085EE).l
; $012604
	moveq	#5,d0
; $012606
	jsr	($00FF8A).l
; $01260C
	move.l	#$00012620,($FFFF8004).w
; $012614
	move.l	#$00012912,d0
; $01261A
	jmp	($0085EE).l
; $012620
	move.w	#$0005,($FFFFA61C).w
; $012626
	move.l	#$0001263A,($FFFF8004).w
; $01262E
	move.l	#$0000F68E,d0
; $012634
	jmp	($0085EE).l
; $01263A
	move.w	($FFFFA6E6).w,d0
; $01263E
	move.w	($FFFFA6E8).w,d1
; $012642
	mulu.w	($FFFF9F2C).w,d1
; $012646
	add.w	d0,d1
; $012648
	add.w	d1,d1
; $01264A
	move.w	d1,($FFFFA620).w
; $01264E
	jsr	($00AB72).l
; $012654
	clr.w	($FFFFA49A).w
; $012658
	jsr	($00B698).l
; $01265E
	beq.w	loc_01267C
; $012662
	bchg	#1,($FFFFAA11).w
; $012668
	move.l	#$0001267C,($FFFF8004).w
; $012670
	move.l	#$00014DBE,d0
; $012676
	jmp	($0085EE).l

loc_01267C:				; $01267C
	move.l	#$0001269E,($FFFF8004).w
; $012684
	movem.l	a7/d7,-(a7)
; $012688
	move.l	#$0000DA50,d0
; $01268E
	jsr	($0085EE).l
; $012694
	movem.l	(a7)+,d7/a7
; $012698
	jmp	($00DA50).l
; $01269E
	jsr	($00ACF8).l
; $0126A4
	move.l	($FFFFA6E2).w,d2
; $0126A8
	move.l	($FFFFA6DE).w,d3
; $0126AC
	move.l	($FFFFA958).w,d4
; $0126B0
	move.w	#$0000,d4
; $0126B4
	movea.l	($FFFFA628).w,a0
; $0126B8
	move.b	$2E(a0),d4
; $0126BC
	move.l	#$000126D6,($FFFF8004).w
; $0126C4
	move.l	#$0001E0EA,d0
; $0126CA
	jsr	($0085EE).l
; $0126D0
	jmp	($01E0EA).l
; $0126D6
	cmpi.w	#$A958,($000004).w
; $0126DC
	bne.w	loc_0126F8
; $0126E0
	move.w	($FFFFA6DE).w,d4
; $0126E4
	move.w	($FFFFA6E0).w,d5
; $0126E8
	jsr	($00C698).l
; $0126EE
	move.l	#$000126F8,($FFFF8004).w
; $0126F6
	rts

loc_0126F8:				; $0126F8
	cmpi.w	#$A958,($000008).w
; $0126FE
	bne.w	loc_012770
; $012702
	lea	($FF4000).l,a0
; $012708
	lea	($FF1000).l,a1
; $01270E
	moveq	#0,d2
; $012710
	move.w	($FFFF9F2E).w,d1
; $012714
	subq.w	#1,d1
; $012716
	moveq	#0,d5

loc_012718:				; $012718
	move.w	($FFFF9F2C).w,d0
; $01271C
	subq.w	#1,d0
; $01271E
	moveq	#0,d4

loc_012720:				; $012720
	tst.w	(a0)+
; $012722
	bmi.w	loc_01272C
; $012726
	move.w	d4,(a1)+
; $012728
	move.w	d5,(a1)+
; $01272A
	addq.w	#1,d2

loc_01272C:				; $01272C
	addq.w	#1,d4
; $01272E
	dbf	d0,loc_012720
; $012732
	addq.w	#1,d5
; $012734
	dbf	d1,loc_012718
; $012738
	move.w	d2,d1
; $01273A
	beq.w	loc_012770
; $01273E
	asr.w	#4,d1
; $012740
	move.w	d2,d3
; $012742
	lea	($FF1000).l,a0

loc_012748:				; $012748
	move.w	d3,d2
; $01274A
	jsr	($0085A2).l
; $012750
	add.w	d2,d2
; $012752
	add.w	d2,d2
; $012754
	move.w	($0,a0,d2.w),d4
; $012758
	move.w	($2,a0,d2.w),d5
; $01275C
	jsr	($00C698).l
; $012762
	dbf	d1,loc_012748
; $012766
	move.l	#$00012770,($FFFF8004).w
; $01276E
	rts

loc_012770:				; $012770
	jsr	($01113E).l
; $012776
	jsr	($0111BC).l
; $01277C
	move.l	#$00012790,($FFFF8004).w
; $012784
	move.l	#$0000ADDC,d0
; $01278A
	jmp	($0085EE).l
; $012790
	cmpi.w	#$A958,($000007).w
; $012796
	bne.w	loc_0127D2
; $01279A
	lea	($FF603C).l,a0
; $0127A0
	move.w	#$009F,d0

loc_0127A4:				; $0127A4
	tst.b	$3(a0)
; $0127A8
	bne.w	loc_0127B2
; $0127AC
	ori.b	#$02,$80(a0)

loc_0127B2:				; $0127B2
	adda.w	#$000C,a0
; $0127B6
	dbf	d0,loc_0127A4
; $0127BA
	jsr	($010C1E).l
; $0127C0
	jsr	($01113E).l
; $0127C6
	jsr	($0111BC).l
; $0127CC
	jsr	($00A766).l

loc_0127D2:				; $0127D2
	movea.l	($FFFFA628).w,a0
; $0127D6
	move.w	($FFFFA958).w,d0
; $0127DA
	rol.w	#3,d0
; $0127DC
	lea	($08203C).l,a1
; $0127E2
	move.w	($4,a1,d0.w),d1
; $0127E6
	moveq	#0,d2
; $0127E8
	move.b	$38(a0),d2
; $0127EC
	sub.w	d1,d2
; $0127EE
	bge.w	loc_0127F4
; $0127F2
	moveq	#0,d2

loc_0127F4:				; $0127F4
	move.b	d2,$38(a0)
; $0127F8
	jsr	($00F0AC).l
; $0127FE
	movea.l	($FFFFA62C).w,a0
; $012802
	ori.b	#$02,$1(a0)
; $012808
	moveq	#0,d4
; $01280A
	move.b	$6(a0),d4
; $01280E
	moveq	#0,d5
; $012810
	move.b	$7(a0),d5
; $012814
	jsr	($00C254).l
; $01281A
	jsr	($00B698).l
; $012820
	beq.w	loc_012844
; $012824
	bchg	#6,($FFFFAA11).w
; $01282A
	bchg	#2,($FFFFAA11).w
; $012830
	move.l	#$00012844,($FFFF8004).w
; $012838
	move.l	#$00014DBE,d0
; $01283E
	jmp	($0085EE).l

loc_012844:				; $012844
	bchg	#6,($FFFFAA11).w
; $01284A
	bchg	#5,($FFFFAA11).w
; $012850
	bchg	#3,($FFFFAA11).w
; $012856
	move.l	#$0001286A,($FFFF8004).w
; $01285E
	move.l	#$00014DBE,d0
; $012864
	jmp	($0085EE).l
; $01286A
	move.l	#$00012254,($FFFF8004).w
; $012872
	move.l	#$0000DA8A,d0
; $012878
	jsr	($0085EE).l
; $01287E
	jmp	($00DA8A).l

loc_012884:				; $012884
	move.b	#$00,($FFFFA6F6).w
; $01288A
	move.l	#$0001289E,($FFFF8004).w
; $012892
	move.l	#$0000F172,d0
; $012898
	jmp	($0085EE).l
; $01289E
	move.b	#$01,($FFFFA6F6).w
; $0128A4
	moveq	#0,d4
; $0128A6
	move.b	$6(a0),d4
; $0128AA
	moveq	#0,d5
; $0128AC
	move.b	$7(a0),d5
; $0128B0
	jsr	($00C254).l
; $0128B6
	move.l	#$00012254,($FFFF8004).w
; $0128BE
	rts

loc_0128C0:				; $0128C0
	move.l	($FFFFA6DE).w,($FFFFA6E2).w
; $0128C6
	move.l	#$00012254,($FFFF8004).w
; $0128CE
	rts

loc_0128D0:				; $0128D0
	bchg	#0,($FFFFAA11).w
; $0128D6
	move.l	#$00012254,($FFFF8004).w
; $0128DE
	move.l	#$00014DBE,d0
; $0128E4
	jsr	($0085EE).l
; $0128EA
	rts

loc_0128EC:				; $0128EC
	movea.l	($FFFFA62C).w,a0
; $0128F0
	ori.b	#$02,$1(a0)
; $0128F6
	moveq	#0,d4
; $0128F8
	move.b	$6(a0),d4
; $0128FC
	moveq	#0,d5
; $0128FE
	move.b	$7(a0),d5
; $012902
	jsr	($00C254).l
; $012908
	move.l	#$00012254,($FFFF8004).w
; $012910
	rts
; $012912
	move.b	#$00,($FFFF9FEA).w
; $012918
	move.w	#$0450,d0
; $01291C
	jsr	($00955C).l
; $012922
	lea	($FFFF9F62).w,a1
; $012926
	moveq	#3,d1
; $012928
	jsr	($009192).l
; $01292E
	move.l	#$00012938,($FFFF8004).w
; $012936
	rts
; $012938
	jsr	($00A6EA).l
; $01293E
	jsr	($008608).l
; $012944
	rts
; $012946
	move.l	#$0001295A,($FFFF8004).w
; $01294E
	move.l	#$0000FFBA,d0
; $012954
	jmp	($0085EE).l
; $01295A
	move.w	($FFFFA6E0).w,d1
; $01295E
	mulu.w	($FFFF9F2C).w,d1
; $012962
	add.w	($FFFFA6DE).w,d1
; $012966
	add.w	d1,d1
; $012968
	lea	($FF5000).l,a0
; $01296E
	moveq	#0,d0
; $012970
	move.b	($0,a0,d1.w),d0
; $012974
	bmi.w	loc_0129AE
; $012978
	move.w	($FFFF9FE4).w,($FFFF9FF4).w
; $01297E
	move.w	d0,($FFFF9FE4).w
; $012982
	cmp.w	($FFFF9FF4).w,d0
; $012986
	beq.w	loc_0129AE
; $01298A
	lea	($FFFF9F62).w,a1
; $01298E
	moveq	#3,d1
; $012990
	jsr	($009192).l
; $012996
	moveq	#-1,d0
; $012998
	jsr	($00A89C).l
; $01299E
	jsr	($00A16A).l
; $0129A4
	move.l	#$000129AE,($FFFF8004).w
; $0129AC
	rts

loc_0129AE:				; $0129AE
	jsr	($00A6EA).l
; $0129B4
	jsr	($008608).l
; $0129BA
	rts

loc_0129BC:				; $0129BC
	clr.w	($FFFFA9E4).l
; $0129C2
	movea.l	($FFFFA9F2).l,a0
; $0129C8
	move.l	a0,($FFFFA628).w
; $0129CC
	move.l	a0,($FFFFA62C).w
; $0129D0
	moveq	#0,d0
; $0129D2
	move.b	$6(a0),d0
; $0129D6
	pea	d0
; $0129D8
	move.b	$7(a0),d0
; $0129DC
	move.l	d0,($FFFFA6E2).w
; $0129E0
	bsr.w	loc_013F46
; $0129E4
	tst.b	($FFFFA6C6).w
; $0129E8
	bne.w	loc_0129F8
; $0129EC
	cmpi.b	#$F0,($01FFFF).l
; $0129F4
	beq.w	loc_0131EE

loc_0129F8:				; $0129F8
	move.b	$2(a0),d0
; $0129FC
	andi.b	#$09,d0
; $012A00
	bne.w	loc_0131EE
; $012A04
	move.w	#$0007,($FFFFA984).l
; $012A0C
	move.l	($FFFFA6DE).w,($FFFFA6EE).w
; $012A12
	bsr.w	loc_01458E
; $012A16
	move.l	a0,($FFFFA8D0).w
; $012A1A
	jsr	($011972).l
; $012A20
	beq.w	loc_0133D4
; $012A24
	bsr.w	loc_0121AA
; $012A28
	move.b	$2(a0),d0
; $012A2C
	andi.b	#$09,d0
; $012A30
	bne.w	loc_0131EE
; $012A34
	cmpi.b	#$03,$7(a0)
; $012A3A
	bgt.w	loc_012BAC
; $012A3E
	btst	#4,$2(a0)
; $012A44
	bne.w	loc_012B8C
; $012A48
	move.l	$50(a0),d0
; $012A4C
	lsr.l	#1,d0
; $012A4E
	bcc.w	loc_012B8C
; $012A52
	andi.l	#$00001E00,d0
; $012A58
	beq.w	loc_012B8C
; $012A5C
	clr.l	($FFFFA986).l
; $012A62
	clr.l	($FFFFA98A).l
; $012A68
	btst	#9,d0
; $012A6C
	beq.w	loc_012A90
; $012A70
	lea	($08203C).l,a2
; $012A76
	move.w	$4C(a2),d1
; $012A7A
	cmp.b	$38(a0),d1
; $012A7E
	bpl.w	loc_012A90
; $012A82
	lea	($FFFFA984).l,a2
; $012A88
	move.w	#$0009,(a2)
; $012A8C
	bsr.w	loc_013FA4

loc_012A90:				; $012A90
	btst	#10,d0
; $012A94
	beq.w	loc_012AD4
; $012A98
	lea	($08203C).l,a2
; $012A9E
	move.w	$54(a2),d1
; $012AA2
	cmp.b	$38(a0),d1
; $012AA6
	bpl.w	loc_012AD4
; $012AAA
	lea	($FFFFA98E).l,a2
; $012AB0
	move.w	#$000A,(a2)
; $012AB4
	bsr.w	loc_013FA4
; $012AB8
	move.w	-$8(a2),d2
; $012ABC
	cmp.w	$2(a2),d2
; $012AC0
	bge.w	loc_012AD4
; $012AC4
	move.w	(a2),-$A(a2)
; $012AC8
	move.l	$2(a2),-$8(a2)
; $012ACE
	move.l	$6(a2),-$4(a2)

loc_012AD4:				; $012AD4
	btst	#11,d0
; $012AD8
	beq.w	loc_012B18
; $012ADC
	lea	($08203C).l,a2
; $012AE2
	move.w	$5C(a2),d1
; $012AE6
	cmp.b	$38(a0),d1
; $012AEA
	bpl.w	loc_012B18
; $012AEE
	lea	($FFFFA98E).l,a2
; $012AF4
	move.w	#$000B,(a2)
; $012AF8
	bsr.w	loc_013FA4
; $012AFC
	move.w	-$8(a2),d2
; $012B00
	cmp.w	$2(a2),d2
; $012B04
	bge.w	loc_012B18
; $012B08
	move.w	(a2),-$A(a2)
; $012B0C
	move.l	$2(a2),-$8(a2)
; $012B12
	move.l	$6(a2),-$4(a2)

loc_012B18:				; $012B18
	btst	#12,d0
; $012B1C
	beq.w	loc_012B5C
; $012B20
	lea	($08203C).l,a2
; $012B26
	move.w	$64(a2),d1
; $012B2A
	cmp.b	$38(a0),d1
; $012B2E
	bpl.w	loc_012B5C
; $012B32
	lea	($FFFFA98E).l,a2
; $012B38
	move.w	#$000C,(a2)
; $012B3C
	bsr.w	loc_013FA4
; $012B40
	move.w	-$8(a2),d2
; $012B44
	cmp.w	$2(a2),d2
; $012B48
	bge.w	loc_012B5C
; $012B4C
	move.w	(a2),-$A(a2)
; $012B50
	move.l	$2(a2),-$8(a2)
; $012B56
	move.l	$6(a2),-$4(a2)

loc_012B5C:				; $012B5C
	move.w	($FFFFA986).l,d2
; $012B62
	cmpi.w	#$0004,d2
; $012B66
	bmi.w	loc_012B8C
; $012B6A
	move.w	($FFFFA984).l,($FFFFA958).w
; $012B72
	move.l	($FFFFA98A).l,($FFFFA6E6).w
; $012B7A
	move.l	($FFFFA6E2).w,($FFFFA6EE).w
; $012B80
	move.w	#$0003,($FFFFA984).l
; $012B88
	bra.w	loc_012B94

loc_012B8C:				; $012B8C
	move.w	#$0004,($FFFFA984).l

loc_012B94:				; $012B94
	moveq	#0,d0
; $012B96
	move.b	$6(a0),d0
; $012B9A
	pea	d0
; $012B9C
	move.b	$7(a0),d0
; $012BA0
	move.l	d0,($FFFFA6EE).w
; $012BA4
	bsr.w	loc_01458E
; $012BA8
	bra.w	loc_0131EE

loc_012BAC:				; $012BAC
	bsr.w	loc_01471C
; $012BB0
	move.b	$17(a0),d0
; $012BB4
	btst	#0,d0
; $012BB8
	beq.w	loc_012BE0
; $012BBC
	move.w	$6(a0),d1
; $012BC0
	cmp.w	$22(a0),d1
; $012BC4
	beq.w	loc_012BD8
; $012BC8
	bsr.w	loc_013A2C
; $012BCC
	tst.b	($FFFFAA10).w
; $012BD0
	bne.w	loc_0133D4
; $012BD4
	bsr.w	loc_01471C

loc_012BD8:				; $012BD8
	ori.b	#$7C,($01FFFF).l

loc_012BE0:				; $012BE0
	btst	#0,$2(a0)
; $012BE6
	bne.w	loc_0131EE
; $012BEA
	btst	#1,d0
; $012BEE
	beq.w	loc_012C10
; $012BF2
	moveq	#0,d1
; $012BF4
	move.b	$21(a0),d1
; $012BF8
	bsr.w	loc_0120B6
; $012BFC
	beq.w	loc_012C10
; $012C00
	bsr.w	loc_013B3C
; $012C04
	tst.b	($FFFFAA10).w
; $012C08
	bne.w	loc_0133D4
; $012C0C
	bsr.w	loc_01471C

loc_012C10:				; $012C10
	btst	#0,$2(a0)
; $012C16
	bne.w	loc_0131EE
; $012C1A
	btst	#2,d0
; $012C1E
	beq.w	loc_012C40
; $012C22
	moveq	#0,d1
; $012C24
	move.b	$2C(a0),d1
; $012C28
	bsr.w	loc_0120B6
; $012C2C
	beq.w	loc_012C40
; $012C30
	bsr.w	loc_013C3E
; $012C34
	ori.b	#$7C,($01FFFF).l
; $012C3C
	bsr.w	loc_01471C

loc_012C40:				; $012C40
	btst	#0,$2(a0)
; $012C46
	bne.w	loc_0131EE
; $012C4A
	btst	#3,d0
; $012C4E
	beq.w	loc_012C78
; $012C52
	moveq	#0,d1
; $012C54
	move.b	$2C(a0),d1
; $012C58
	bsr.w	loc_0120B6
; $012C5C
	beq.w	loc_012C78
; $012C60
	ori.b	#$7C,($02FFFF).l
; $012C68
	bsr.w	loc_013C3E
; $012C6C
	ori.b	#$7C,($01FFFF).l
; $012C74
	bsr.w	loc_01471C

loc_012C78:				; $012C78
	move.b	$2(a0),d0
; $012C7C
	btst	#0,d0
; $012C80
	bne.w	loc_0131EE
; $012C84
	btst	#4,d0
; $012C88
	bne.w	loc_0130A0
; $012C8C
	moveq	#0,d1
; $012C8E
	move.b	$14(a0),d1
; $012C92
	beq.w	loc_0130A0
; $012C96
	jsr	($0085A0).l
; $012C9C
	cmp.w	d2,d1
; $012C9E
	bmi.w	loc_0130A0
; $012CA2
	move.l	$50(a0),d1
; $012CA6
	lsr.l	#1,d1
; $012CA8
	bcc.w	loc_0130A0
; $012CAC
	tst.b	$38(a0)
; $012CB0
	beq.w	loc_013078
; $012CB4
	lea	($FF603C).l,a1
; $012CBA
	lea	($FF1000).l,a2
; $012CC0
	moveq	#19,d0

loc_012CC2:				; $012CC2
	move.l	a1,($FFFFA8D0).w
; $012CC6
	jsr	($011972).l
; $012CCC
	beq.w	loc_012D2C
; $012CD0
	btst	#2,($FFFFA97C).l
; $012CD8
	beq.w	loc_012CF2
; $012CDC
	btst	#4,$17(a1)
; $012CE2
	beq.w	loc_012CF2
; $012CE6
	move.b	$20(a1),d5
; $012CEA
	and.b	$20(a0),d5
; $012CEE
	beq.w	loc_012D2C

loc_012CF2:				; $012CF2
	move.w	$6(a1),(a2)+
; $012CF6
	move.l	a1,(a2)+
; $012CF8
	moveq	#0,d5
; $012CFA
	move.b	$20(a1),d5
; $012CFE
	move.w	d5,(a2)+
; $012D00
	moveq	#6,d3
; $012D02
	move.l	a1,d2

loc_012D04:				; $012D04
	adda.w	#$000C,a1
; $012D08
	move.b	$0(a1),d4
; $012D0C
	cmpi.b	#$FF,d4
; $012D10
	beq.w	loc_012D26
; $012D14
	btst	#7,$2(a1)
; $012D1A
	bne.w	loc_012D26
; $012D1E
	move.w	$6(a1),(a2)+
; $012D22
	move.l	a1,(a2)+
; $012D24
	move.w	d5,(a2)+

loc_012D26:				; $012D26
	dbf	d3,loc_012D04
; $012D2A
	movea.l	d2,a1

loc_012D2C:				; $012D2C
	adda.w	#$0060,a1
; $012D30
	dbf	d0,loc_012CC2
; $012D34
	move.l	#$FFFFFFFF,(a2)+
; $012D3A
	move.l	#$FFFFFFFF,(a2)+
; $012D40
	moveq	#19,d5
; $012D42
	lea	($FF603C).l,a1
; $012D48
	lea	($FF2000).l,a2
; $012D4E
	moveq	#0,d2
; $012D50
	moveq	#0,d3
; $012D52
	move.b	$6(a0),d2
; $012D56
	move.b	$7(a0),d3

loc_012D5A:				; $012D5A
	move.w	#$FFFF,(a2)
; $012D5E
	move.l	a1,$2(a2)
; $012D62
	move.l	a1,($FFFFA8D0).w
; $012D66
	jsr	($011972).l
; $012D6C
	beq.w	loc_012D92
; $012D70
	moveq	#0,d0
; $012D72
	move.b	$6(a1),d0
; $012D76
	sub.w	d2,d0
; $012D78
	bpl.w	loc_012D7E
; $012D7C
	neg.w	d0

loc_012D7E:				; $012D7E
	move.w	d0,d4
; $012D80
	moveq	#0,d0
; $012D82
	move.b	$7(a1),d0
; $012D86
	sub.w	d3,d0
; $012D88
	bpl.w	loc_012D8E
; $012D8C
	neg.w	d0

loc_012D8E:				; $012D8E
	add.w	d0,d4
; $012D90
	move.w	d4,(a2)

loc_012D92:				; $012D92
	adda.w	#$0006,a2
; $012D96
	adda.w	#$0060,a1
; $012D9A
	dbf	d5,loc_012D5A
; $012D9E
	lea	($08203C).l,a1
; $012DA4
	moveq	#21,d5

loc_012DA6:				; $012DA6
	lsr.l	#1,d1
; $012DA8
	bcc.w	loc_01302C
; $012DAC
	cmpi.w	#$0003,d5
; $012DB0
	beq.w	loc_01302C
; $012DB4
	cmpi.w	#$0002,d5
; $012DB8
	beq.w	loc_01302C
; $012DBC
	move.w	$4(a1),d2
; $012DC0
	cmp.b	$38(a0),d2
; $012DC4
	bpl.w	loc_01302C
; $012DC8
	moveq	#21,d2
; $012DCA
	sub.w	d5,d2
; $012DCC
	move.w	d2,($FFFFA958).w
; $012DD0
	moveq	#0,d0
; $012DD2
	move.b	$6(a0),d0
; $012DD6
	pea	d0
; $012DD8
	move.b	$7(a0),d0
; $012DDC
	move.l	d0,($FFFFA6E2).w
; $012DE0
	jsr	($00AA58).l
; $012DE6
	moveq	#0,d0
; $012DE8
	move.b	($FFFF9F5C).w,d0
; $012DEC
	subq.w	#1,d0
; $012DEE
	move.w	d0,($FFFFA9E8).l
; $012DF4
	moveq	#19,d4
; $012DF6
	lea	($FF2000).l,a2
; $012DFC
	lea	($FFFFA984).l,a3

loc_012E02:				; $012E02
	cmpi.w	#$FFFF,(a2)
; $012E06
	beq.w	loc_013024
; $012E0A
	move.w	($FFFFA9E8).l,d0
; $012E10
	cmp.w	(a2),d0
; $012E12
	bls.w	loc_013024
; $012E16
	clr.l	($FFFFA00C).w
; $012E1A
	movea.l	$2(a2),a4
; $012E1E
	moveq	#0,d0
; $012E20
	move.b	$6(a4),d0
; $012E24
	pea	d0
; $012E26
	move.b	$7(a4),d0
; $012E2A
	move.l	d0,($FFFFA6E6).w
; $012E2E
	cmpi.w	#$0006,$1(a1)
; $012E34
	bne.w	loc_012E42
; $012E38
	btst	#4,$17(a0)
; $012E3E
	bne.w	loc_01302C

loc_012E42:				; $012E42
	move.w	$2(a1),d0
; $012E46
	bmi.w	loc_012EE6
; $012E4A
	moveq	#0,d2
; $012E4C
	move.b	$2E(a0),d2
; $012E50
	roxr.w	#2,d2
; $012E52
	add.w	d2,d0
; $012E54
	move.w	d0,($FFFFA9EA).l
; $012E5A
	lea	($FF1000).l,a4
; $012E60
	move.b	$20(a0),d7
; $012E64
	cmpi.w	#$0006,$1(a1)
; $012E6A
	beq.w	loc_012E8C

loc_012E6E:				; $012E6E
	move.b	$7(a4),d2
; $012E72
	cmpi.b	#$FF,d2
; $012E76
	beq.w	loc_012FAE
; $012E7A
	and.b	d7,d2
; $012E7C
	beq.w	loc_012E84
; $012E80
	bsr.w	loc_012EAA

loc_012E84:				; $012E84
	adda.w	#$0008,a4
; $012E88
	bra.w	loc_012E6E

loc_012E8C:				; $012E8C
	move.b	$7(a4),d2
; $012E90
	cmpi.b	#$FF,d2
; $012E94
	beq.w	loc_012FAE
; $012E98
	and.b	d7,d2
; $012E9A
	bne.w	loc_012EA2
; $012E9E
	bsr.w	loc_012EAA

loc_012EA2:				; $012EA2
	adda.w	#$0008,a4
; $012EA6
	bra.w	loc_012E8C

loc_012EAA:				; $012EAA
	moveq	#0,d2
; $012EAC
	moveq	#0,d3
; $012EAE
	move.b	(a4),d2
; $012EB0
	move.b	$1(a4),d3
; $012EB4
	move.w	($FFFFA6E6).w,d6
; $012EB8
	sub.w	d2,d6
; $012EBA
	bpl.w	loc_012EC0
; $012EBE
	neg.w	d6

loc_012EC0:				; $012EC0
	move.w	d6,d2
; $012EC2
	move.w	($FFFFA6E8).w,d6
; $012EC6
	sub.w	d3,d6
; $012EC8
	bpl.w	loc_012ECE
; $012ECC
	neg.w	d6

loc_012ECE:				; $012ECE
	add.w	d6,d2
; $012ED0
	cmp.w	($FFFFA9EA).l,d2
; $012ED6
	bgt.w	loc_012EE4
; $012EDA
	movea.l	$2(a4),a5
; $012EDE
	jsr	($00B5E0).l

loc_012EE4:				; $012EE4
	rts

loc_012EE6:				; $012EE6
	move.w	#$0013,d7
; $012EEA
	sub.w	d4,d7
; $012EEC
	add.w	d7,d7
; $012EEE
	add.w	d7,d7
; $012EF0
	lea	($05E5D8).l,a5
; $012EF6
	movea.l	($0,a5,d7.w),a5
; $012EFA
	move.b	$20(a0),d7
; $012EFE
	cmpi.w	#$8000,d0
; $012F02
	beq.w	loc_012F9E
; $012F06
	cmpi.w	#$8001,d0
; $012F0A
	beq.w	loc_012F7A
; $012F0E
	cmpi.w	#$8004,d0
; $012F12
	beq.w	loc_012F7A
; $012F16
	cmpi.w	#$8002,d0
; $012F1A
	beq.w	loc_012F6C
; $012F1E
	move.b	$20(a5),d2
; $012F22
	and.b	d7,d2
; $012F24
	bne.w	loc_013024
; $012F28
	btst	#4,$17(a3)
; $012F2E
	beq.w	loc_012F42
; $012F32
	btst	#2,($FFFFA97C).l
; $012F3A
	beq.w	loc_012F42
; $012F3E
	bra.w	loc_013024

loc_012F42:				; $012F42
	moveq	#7,d2

loc_012F44:				; $012F44
	move.b	$0(a5),d3
; $012F48
	cmpi.b	#$FF,d3
; $012F4C
	beq.w	loc_012F60
; $012F50
	btst	#7,$2(a5)
; $012F56
	bne.w	loc_012F60
; $012F5A
	jsr	($00B5E0).l

loc_012F60:				; $012F60
	adda.w	#$000C,a5
; $012F64
	dbf	d2,loc_012F44
; $012F68
	bra.w	loc_012FAE

loc_012F6C:				; $012F6C
	move.b	$20(a5),d2
; $012F70
	and.b	d7,d2
; $012F72
	beq.w	loc_013024
; $012F76
	bra.w	loc_012F42

loc_012F7A:				; $012F7A
	move.b	$20(a5),d2
; $012F7E
	and.b	d7,d2
; $012F80
	bne.w	loc_013024
; $012F84
	btst	#4,$17(a3)
; $012F8A
	beq.w	loc_012FA8
; $012F8E
	btst	#2,($FFFFA97C).l
; $012F96
	beq.w	loc_012FA8
; $012F9A
	bra.w	loc_013024

loc_012F9E:				; $012F9E
	move.b	$20(a5),d2
; $012FA2
	and.b	d7,d2
; $012FA4
	beq.w	loc_013024

loc_012FA8:				; $012FA8
	jsr	($00B5E0).l

loc_012FAE:				; $012FAE
	cmpi.w	#$A958,($00000F).w
; $012FB4
	bne.w	loc_012FC2
; $012FB8
	moveq	#5,d0
; $012FBA
	bsr.w	loc_012100
; $012FBE
	beq.w	loc_013024

loc_012FC2:				; $012FC2
	cmpi.w	#$A958,($000010).w
; $012FC8
	bne.w	loc_012FD6
; $012FCC
	moveq	#5,d0
; $012FCE
	bsr.w	loc_012100
; $012FD2
	beq.w	loc_013024

loc_012FD6:				; $012FD6
	cmpi.w	#$A958,($000014).w
; $012FDC
	bne.w	loc_012FEA
; $012FE0
	moveq	#7,d0
; $012FE2
	bsr.w	loc_012100
; $012FE6
	beq.w	loc_013024

loc_012FEA:				; $012FEA
	cmpi.b	#$0E,($000046).w
; $012FF0
	bpl.w	loc_013024
; $012FF4
	move.l	($FFFFA00C).w,d0
; $012FF8
	andi.l	#$FFFF00FF,d0
; $012FFE
	pea	d0
; $013000
	tst.w	d0
; $013002
	beq.w	loc_013024
; $013006
	cmp.w	$2(a3),d0
; $01300A
	ble.w	loc_013024
; $01300E
	move.w	($FFFFA958).w,(a3)
; $013012
	pea	d0
; $013014
	move.l	d0,$2(a3)
; $013018
	move.w	($FFFFA6E6).w,$6(a3)
; $01301E
	move.w	($FFFFA6E8).w,$8(a3)

loc_013024:				; $013024
	adda.w	#$0006,a2
; $013028
	dbf	d4,loc_012E02

loc_01302C:				; $01302C
	addq.w	#8,a1
; $01302E
	dbf	d5,loc_012DA6
; $013032
	cmpi.w	#$A984,($FFFFFFFF).l
; $01303A
	beq.w	loc_01306C
; $01303E
	move.w	($FFFFA984).l,($FFFFA958).w
; $013046
	move.w	($FFFFA98A).l,($FFFFA6E6).w
; $01304E
	move.w	($FFFFA98C).l,($FFFFA6E8).w
; $013056
	move.l	($FFFFA6E2).w,($FFFFA6EE).w
; $01305C
	move.w	#$0003,($FFFFA984).l
; $013064
	bsr.w	loc_01458E
; $013068
	bra.w	loc_0131EE

loc_01306C:				; $01306C
	move.b	$39(a0),d0
; $013070
	cmp.b	$38(a0),d0
; $013074
	beq.w	loc_0130A0

loc_013078:				; $013078
	tst.b	$39(a0)
; $01307C
	beq.w	loc_0130A0
; $013080
	move.w	#$0004,($FFFFA984).l
; $013088
	moveq	#0,d0
; $01308A
	move.b	$6(a0),d0
; $01308E
	pea	d0
; $013090
	move.b	$7(a0),d0
; $013094
	move.l	d0,($FFFFA6EE).w
; $013098
	bsr.w	loc_01458E
; $01309C
	bra.w	loc_0131EE

loc_0130A0:				; $0130A0
	move.b	$2(a0),d0
; $0130A4
	andi.b	#$89,d0
; $0130A8
	bne.w	loc_0131EE
; $0130AC
	bsr.w	loc_01471C
; $0130B0
	btst	#0,($FFFFA97C).l
; $0130B8
	bne.w	loc_013130
; $0130BC
	jsr	($0145F8).l
; $0130C2
	bsr.w	loc_0145AC
; $0130C6
	moveq	#-1,d0
; $0130C8
	moveq	#0,d1
; $0130CA
	bsr.w	loc_01418C
; $0130CE
	cmpi.w	#$A984,($FFFFFFFF).l
; $0130D6
	beq.w	loc_013158
; $0130DA
	move.w	($FFFFA98C).l,d4
; $0130E0
	move.w	d4,($FFFFA6E6).w
; $0130E4
	move.w	($FFFFA98E).l,d5
; $0130EA
	move.w	d5,($FFFFA6E8).w
; $0130EE
	moveq	#0,d0
; $0130F0
	move.b	$6(a0),d0
; $0130F4
	pea	d0
; $0130F6
	move.b	$7(a0),d0
; $0130FA
	move.l	d0,($FFFFA6EE).w
; $0130FE
	cmp.l	($FFFFA6E6).w,d0
; $013102
	beq.w	loc_013120
; $013106
	jsr	($00BF0A).l
; $01310C
	move.w	#$0001,($FFFFA984).l
; $013114
	bsr.w	loc_01458E
; $013118
	tst.b	($FFFFAA10).w
; $01311C
	bne.w	loc_0133D4

loc_013120:				; $013120
	bsr.w	loc_014736
; $013124
	tst.b	($FFFFAA10).w
; $013128
	bne.w	loc_0133D4
; $01312C
	bra.w	loc_0131EE

loc_013130:				; $013130
	btst	#1,($FFFFA97C).l
; $013138
	bne.w	loc_0131EE
; $01313C
	moveq	#-1,d0
; $01313E
	moveq	#-1,d1
; $013140
	bsr.w	loc_01418C
; $013144
	cmpi.w	#$A984,($FFFFFFFF).l
; $01314C
	beq.w	loc_0131EE
; $013150
	bsr.w	loc_014736
; $013154
	bra.w	loc_0131EE

loc_013158:				; $013158
	move.b	#$FF,$8(a6)
; $01315E
	move.w	#$0001,$A(a6)
; $013164
	move.w	#$FFFF,$C(a6)
; $01316A
	move.l	(a6),($FFFFA9F8).l
; $013170
	move.l	#$0000B744,(a6)
; $013176
	jsr	($00B744).l
; $01317C
	move.l	($FFFFA9F8).l,(a6)
; $013182
	clr.w	($FFFFA9E4).l
; $013188
	cmpi.w	#$000C,-$1(a6)
; $01318E
	beq.w	loc_0131EE
; $013192
	move.l	($FFFFA62C).w,$12(a6)
; $013198
	move.w	#$0001,$16(a6)
; $01319E
	jsr	($00BB80).l
; $0131A4
	bsr.w	loc_013D44
; $0131A8
	move.w	d4,d0
; $0131AA
	pea	d0
; $0131AC
	move.w	d5,d0
; $0131AE
	move.l	d0,($FFFFA6E6).w
; $0131B2
	moveq	#0,d0
; $0131B4
	move.b	$6(a0),d0
; $0131B8
	pea	d0
; $0131BA
	move.b	$7(a0),d0
; $0131BE
	move.l	d0,($FFFFA6EE).w
; $0131C2
	cmp.l	($FFFFA6E6).w,d0
; $0131C6
	beq.w	loc_0131EE
; $0131CA
	jsr	($00BF0A).l
; $0131D0
	move.w	#$0001,($FFFFA984).l
; $0131D8
	bsr.w	loc_01458E
; $0131DC
	move.w	#$0008,($FFFFA984).l
; $0131E4
	move.l	($FFFFA6DE).w,($FFFFA6EE).w
; $0131EA
	bsr.w	loc_01458E

loc_0131EE:				; $0131EE
	tst.b	($FFFFAA10).w
; $0131F2
	bne.w	loc_0133D4
; $0131F6
	movea.l	($FFFFA628).w,a0
; $0131FA
	btst	#7,$2(a0)
; $013200
	bne.w	loc_0133D4
; $013204
	tst.b	($FFFFA6C6).w
; $013208
	bne.w	loc_013218
; $01320C
	cmpi.b	#$F0,($01FFFF).l
; $013214
	beq.w	loc_013256

loc_013218:				; $013218
	move.b	$2(a0),d0
; $01321C
	andi.b	#$09,d0
; $013220
	bne.w	loc_013256
; $013224
	cmpi.b	#$03,$A(a0)
; $01322A
	bne.w	loc_01323A
; $01322E
	move.b	$38(a0),d0
; $013232
	cmp.b	$39(a0),d0
; $013236
	beq.w	loc_013256

loc_01323A:				; $01323A
	move.w	#$0004,($FFFFA984).l
; $013242
	moveq	#0,d0
; $013244
	move.b	$6(a0),d0
; $013248
	pea	d0
; $01324A
	move.b	$7(a0),d0
; $01324E
	move.l	d0,($FFFFA6EE).w
; $013252
	bsr.w	loc_01458E

loc_013256:				; $013256
	tst.b	$5C(a0)
; $01325A
	bne.w	loc_013268
; $01325E
	cmpi.b	#$16,$3(a0)
; $013264
	beq.w	loc_01338E

loc_013268:				; $013268
	tst.l	($FFFFA97E).l
; $01326E
	bne.w	loc_0132D0
; $013272
	move.l	a0,($FFFFA8D0).w
; $013276
	jsr	($011972).l
; $01327C
	beq.w	loc_0133D4
; $013280
	lea	($FF603C).l,a1
; $013286
	moveq	#19,d1

loc_013288:				; $013288
	btst	#3,$17(a1)
; $01328E
	beq.w	loc_0132C4
; $013292
	move.b	$1(a0),d0
; $013296
	cmp.b	$2C(a1),d0
; $01329A
	bne.w	loc_0132C4
; $01329E
	move.l	a1,($FFFFA8D0).w
; $0132A2
	jsr	($011972).l
; $0132A8
	beq.w	loc_0132C4
; $0132AC
	move.l	a0,($FFFFA97E).l
; $0132B2
	move.l	a1,($FFFFA9F2).l
; $0132B8
	move.b	$20(a1),($FFFFA626).w
; $0132BE
	movea.l	a1,a0
; $0132C0
	bra.w	loc_0129BC

loc_0132C4:				; $0132C4
	lea	$60(a1),a1
; $0132C8
	dbf	d1,loc_013288
; $0132CC
	bra.w	loc_0132F0

loc_0132D0:				; $0132D0
	movea.l	($FFFFA97E).l,a0
; $0132D6
	move.l	($FFFFA9F2).l,($FFFFA97E).l
; $0132E0
	move.l	a0,($FFFFA9F2).l
; $0132E6
	move.l	a0,($FFFFA628).w
; $0132EA
	move.b	$20(a0),($FFFFA626).w

loc_0132F0:				; $0132F0
	move.l	a0,($FFFFA8D0).w
; $0132F4
	jsr	($011972).l
; $0132FA
	beq.w	loc_0133D4

loc_0132FE:				; $0132FE
	movea.l	($FFFFA628).w,a0
; $013302
	bsr.w	loc_013F46
; $013306
	jsr	($00BED4).l
; $01330C
	beq.w	loc_01338E
; $013310
	cmpi.w	#$A49E,(rom).w
; $013316
	beq.w	loc_013336
; $01331A
	moveq	#0,d0
; $01331C
	move.b	$6(a0),d0
; $013320
	pea	d0
; $013322
	move.b	$7(a0),d0
; $013326
	move.l	d0,($FFFFA6EE).w
; $01332A
	move.w	#$0006,($FFFFA984).l
; $013332
	bsr.w	loc_01458E

loc_013336:				; $013336
	tst.b	($FFFFAA10).w
; $01333A
	bne.w	loc_0133D4
; $01333E
	movea.l	a0,a1
; $013340
	lea	($FFFFA9D4).l,a2
; $013346
	moveq	#6,d0

loc_013348:				; $013348
	adda.w	#$000C,a1
; $01334C
	clr.w	(a2)
; $01334E
	move.b	$0(a1),d1
; $013352
	cmpi.b	#$FF,d1
; $013356
	beq.w	loc_013366
; $01335A
	move.b	$2(a1),d1
; $01335E
	andi.b	#$89,d1
; $013362
	beq.w	loc_01336A

loc_013366:				; $013366
	move.w	#$FFFF,(a2)

loc_01336A:				; $01336A
	adda.w	#$0002,a2
; $01336E
	dbf	d0,loc_013348
; $013372
	moveq	#0,d0
; $013374
	move.b	$16(a0),d0
; $013378
	tst.b	$5C(a0)
; $01337C
	beq.w	loc_013384
; $013380
	move.w	#$0001,d0

loc_013384:				; $013384
	move.w	d0,($FFFFA982).l
; $01338A
	bsr.w	loc_0133DE

loc_01338E:				; $01338E
	tst.b	($FFFFAA10).w
; $013392
	bne.w	loc_0133D4
; $013396
	tst.w	($FFFFA97E).l
; $01339C
	beq.w	loc_0133D4
; $0133A0
	cmpa.l	($FFFFA97E).l,a0
; $0133A6
	beq.w	loc_0133D4
; $0133AA
	movea.l	($FFFFA97E).l,a0
; $0133B0
	move.l	a0,($FFFFA8D0).w
; $0133B4
	jsr	($011972).l
; $0133BA
	beq.w	loc_0133D4
; $0133BE
	move.l	a0,($FFFFA628).w
; $0133C2
	move.b	$20(a0),($FFFFA626).w
; $0133C8
	ori.b	#$7C,($02FFFF).l
; $0133D0
	bra.w	loc_0132FE

loc_0133D4:				; $0133D4
	move.b	#$00,($FFFFA9EF).l
; $0133DC
	rts

loc_0133DE:				; $0133DE
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $0133E2
	move.w	#$00FF,($FFFFA9E2).l

loc_0133EA:				; $0133EA
	bsr.w	loc_0139CE
; $0133EE
	beq.w	loc_0135C8
; $0133F2
	move.l	a0,($FFFFA62C).w
; $0133F6
	clr.w	($FFFFA9E4).l
; $0133FC
	btst	#6,$2(a0)
; $013402
	bne.w	loc_013578
; $013406
	move.b	$3(a0),d0
; $01340A
	cmpi.b	#$07,d0
; $01340E
	bgt.w	loc_013422
; $013412
	bsr.w	loc_0136A8
; $013416
	tst.b	($FFFFAA10).w
; $01341A
	bne.w	loc_0135E0
; $01341E
	bra.w	loc_0135AA

loc_013422:				; $013422
	cmpi.w	#$A982,($01FFFF).l
; $01342A
	bne.w	loc_013436
; $01342E
	bsr.w	loc_0135E6
; $013432
	bne.w	loc_0135AA

loc_013436:				; $013436
	movea.l	($FFFFA628).w,a1
; $01343A
	moveq	#0,d0
; $01343C
	move.b	$6(a1),d0
; $013440
	moveq	#0,d1
; $013442
	move.b	$7(a1),d1
; $013446
	mulu.w	($FFFF9F2C).w,d1
; $01344A
	add.w	d1,d0
; $01344C
	add.w	d0,d0
; $01344E
	moveq	#0,d1
; $013450
	lea	($FF4000).l,a1
; $013456
	move.b	($2,a1,d0.w),d2
; $01345A
	andi.b	#$0F,d2
; $01345E
	bne.w	loc_013464
; $013462
	addq.w	#1,d1

loc_013464:				; $013464
	move.b	(-$2,a1,d0.w),d2
; $013468
	andi.b	#$0F,d2
; $01346C
	bne.w	loc_013472
; $013470
	addq.w	#1,d1

loc_013472:				; $013472
	move.w	($FFFF9F2C).w,d3
; $013476
	add.w	d3,d3
; $013478
	sub.w	d3,d0
; $01347A
	move.b	($0,a1,d0.w),d2
; $01347E
	andi.b	#$0F,d2
; $013482
	bne.w	loc_013488
; $013486
	addq.w	#1,d1

loc_013488:				; $013488
	add.w	d3,d0
; $01348A
	add.w	d3,d0
; $01348C
	move.b	($0,a1,d0.w),d2
; $013490
	andi.b	#$0F,d2
; $013494
	bne.w	loc_01349A
; $013498
	addq.w	#1,d1

loc_01349A:				; $01349A
	movea.l	($FFFFA628).w,a1
; $01349E
	move.b	$6(a1),d3
; $0134A2
	sub.b	$6(a0),d3
; $0134A6
	bcc.w	loc_0134AC
; $0134AA
	neg.b	d3

loc_0134AC:				; $0134AC
	move.b	$7(a1),d4
; $0134B0
	sub.b	$7(a0),d4
; $0134B4
	bcc.w	loc_0134BA
; $0134B8
	neg.b	d4

loc_0134BA:				; $0134BA
	add.b	d3,d4
; $0134BC
	cmpi.b	#$01,d4
; $0134C0
	bne.w	loc_0134C6
; $0134C4
	addq.w	#1,d1

loc_0134C6:				; $0134C6
	tst.w	d1
; $0134C8
	beq.w	loc_013550
; $0134CC
	movea.l	($FFFFA628).w,a1
; $0134D0
	lea	($FFFFA9D4).l,a2
; $0134D6
	move.b	$6(a1),d3
; $0134DA
	move.b	$7(a1),d4
; $0134DE
	moveq	#0,d2
; $0134E0
	moveq	#6,d0

loc_0134E2:				; $0134E2
	adda.w	#$000C,a1
; $0134E6
	move.w	(a2)+,d5
; $0134E8
	and.w	($FFFFA9E2).l,d5
; $0134EE
	bne.w	loc_013522
; $0134F2
	btst	#0,$2(a1)
; $0134F8
	bne.w	loc_013522
; $0134FC
	move.b	$6(a1),d5
; $013500
	sub.b	d3,d5
; $013502
	bcc.w	loc_013508
; $013506
	neg.b	d5

loc_013508:				; $013508
	move.b	$7(a1),d6
; $01350C
	sub.b	d4,d6
; $01350E
	bcc.w	loc_013514
; $013512
	neg.b	d6

loc_013514:				; $013514
	add.b	d6,d5
; $013516
	cmpi.b	#$01,d5
; $01351A
	bne.w	loc_013520
; $01351E
	addq.w	#1,d1

loc_013520:				; $013520
	addq.w	#1,d2

loc_013522:				; $013522
	dbf	d0,loc_0134E2
; $013526
	cmp.w	d1,d2
; $013528
	bgt.w	loc_013550
; $01352C
	cmpi.w	#$A982,($02FFFF).l
; $013534
	bne.w	loc_013540
; $013538
	bsr.w	loc_0135E6
; $01353C
	bne.w	loc_0135AA

loc_013540:				; $013540
	bsr.w	loc_0136A8
; $013544
	tst.b	($FFFFAA10).w
; $013548
	bne.w	loc_0135E0
; $01354C
	bra.w	loc_0135AA

loc_013550:				; $013550
	cmpi.w	#$A982,($02FFFF).l
; $013558
	beq.w	loc_013564
; $01355C
	bsr.w	loc_0135E6
; $013560
	bne.w	loc_0135AA

loc_013564:				; $013564
	cmpi.w	#$A9E2,($FF00FFFF).l
; $01356C
	beq.w	loc_013540
; $013570
	bsr.w	loc_0138F6
; $013574
	bra.w	loc_0135AA

loc_013578:				; $013578
	movea.l	($FFFFA628).w,a1
; $01357C
	moveq	#0,d1
; $01357E
	moveq	#6,d0

loc_013580:				; $013580
	adda.w	#$000C,a1
; $013584
	move.b	$2(a1),d2
; $013588
	btst	#7,d2
; $01358C
	bne.w	loc_01359A
; $013590
	btst	#6,d2
; $013594
	bne.w	loc_01359A
; $013598
	addq.w	#1,d1

loc_01359A:				; $01359A
	dbf	d0,loc_013580
; $01359E
	cmpi.w	#$0003,d1
; $0135A2
	ble.w	loc_013540
; $0135A6
	bsr.w	loc_0138F6

loc_0135AA:				; $0135AA
	moveq	#0,d0
; $0135AC
	move.b	$5(a0),d0
; $0135B0
	subq.w	#1,d0
; $0135B2
	add.w	d0,d0
; $0135B4
	lea	($FFFFA9D4).l,a1
; $0135BA
	move.w	($FFFFA9E2).l,d1
; $0135C0
	or.w	d1,($0,a1,d0.w)
; $0135C4
	bra.w	loc_0133EA

loc_0135C8:				; $0135C8
	cmpi.w	#$A9E2,($FFFFFF).l
; $0135D0
	bne.w	loc_0135E0
; $0135D4
	move.w	#$FF00,($FFFFA9E2).l
; $0135DC
	bra.w	loc_0133EA

loc_0135E0:				; $0135E0
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $0135E4
	rts

loc_0135E6:				; $0135E6
	movem.l	a7/a6/a3/a2/d6/d5,-(a7)
; $0135EA
	btst	#1,($FFFFA97C).l
; $0135F2
	bne.w	loc_01369E
; $0135F6
	btst	#0,$2(a0)
; $0135FC
	bne.w	loc_01369E
; $013600
	bsr.w	loc_0145F8
; $013604
	bsr.w	loc_0145AC
; $013608
	bsr.w	loc_014076
; $01360C
	lea	($FF4000).l,a1
; $013612
	move.w	#$07FF,d0

loc_013616:				; $013616
	tst.b	(a1)
; $013618
	bpl.w	loc_013628
; $01361C
	adda.w	#$0002,a1
; $013620
	dbf	d0,loc_013616
; $013624
	bra.w	loc_01369E

loc_013628:				; $013628
	bsr.w	loc_01471C
; $01362C
	bsr.w	loc_01455C
; $013630
	moveq	#0,d1
; $013632
	bsr.w	loc_01418C
; $013636
	cmpi.w	#$A984,($FFFFFFFF).l
; $01363E
	beq.w	loc_01369E
; $013642
	move.w	($FFFFA98C).l,d4
; $013648
	move.w	d4,($FFFFA6E6).w
; $01364C
	move.w	($FFFFA98E).l,d5
; $013652
	move.w	d5,($FFFFA6E8).w
; $013656
	moveq	#0,d0
; $013658
	move.b	$6(a0),d0
; $01365C
	pea	d0
; $01365E
	move.b	$7(a0),d0
; $013662
	move.l	d0,($FFFFA6EE).w
; $013666
	cmp.l	($FFFFA6E6).w,d0
; $01366A
	beq.w	loc_013680
; $01366E
	jsr	($00BF0A).l
; $013674
	move.w	#$0005,($FFFFA984).l
; $01367C
	bsr.w	loc_01458E

loc_013680:				; $013680
	bsr.w	loc_014736
; $013684
	move.w	#$0008,($FFFFA984).l
; $01368C
	move.l	($FFFFA6DE).w,($FFFFA6EE).w
; $013692
	bsr.w	loc_01458E
; $013696
	andi.b	#$00,#$FB
; $01369C
	ori.b	#$3C,d6
; $0136A0
	ori.b	#$DF,d4
; $0136A4
	addi.b	#$E7,($75,a3,d4.l)
; $0136AA
	dc.w	$FC60
; $0136AC
	bsr.w	loc_0145F8
; $0136B0
	bsr.w	loc_0145AC
; $0136B4
	moveq	#0,d4
; $0136B6
	move.b	$6(a0),d4
; $0136BA
	moveq	#0,d5
; $0136BC
	move.b	$7(a0),d5
; $0136C0
	movea.l	($FFFFA628).w,a1
; $0136C4
	moveq	#0,d0
; $0136C6
	move.b	$6(a1),d0
; $0136CA
	moveq	#0,d1
; $0136CC
	move.b	$7(a1),d1
; $0136D0
	move.w	d1,d2
; $0136D2
	mulu.w	($FFFF9F2C).w,d2
; $0136D6
	add.w	d0,d2
; $0136D8
	add.w	d2,d2
; $0136DA
	lea	($FFFFA984).l,a2
; $0136E0
	lea	($FF4000).l,a1
; $0136E6
	tst.b	($2,a1,d2.w)
; $0136EA
	bmi.w	loc_0136FC
; $0136EE
	move.w	d0,d3
; $0136F0
	addq.w	#1,d3
; $0136F2
	move.w	d3,(a2)
; $0136F4
	move.w	d1,$2(a2)
; $0136F8
	bsr.w	loc_0137C8

loc_0136FC:				; $0136FC
	tst.b	(-$2,a1,d2.w)
; $013700
	bmi.w	loc_013712
; $013704
	move.w	d0,d3
; $013706
	subq.w	#1,d3
; $013708
	move.w	d3,(a2)
; $01370A
	move.w	d1,$2(a2)
; $01370E
	bsr.w	loc_0137C8

loc_013712:				; $013712
	move.w	d2,d3
; $013714
	sub.w	($FFFF9F2C).w,d3
; $013718
	sub.w	($FFFF9F2C).w,d3
; $01371C
	tst.b	($0,a1,d3.w)
; $013720
	bmi.w	loc_013732
; $013724
	move.w	d1,d3
; $013726
	subq.w	#1,d3
; $013728
	move.w	d0,(a2)
; $01372A
	move.w	d3,$2(a2)
; $01372E
	bsr.w	loc_0137C8

loc_013732:				; $013732
	move.w	d2,d3
; $013734
	add.w	($FFFF9F2C).w,d3
; $013738
	add.w	($FFFF9F2C).w,d3
; $01373C
	tst.b	($0,a1,d3.w)
; $013740
	bmi.w	loc_013752
; $013744
	move.w	d1,d3
; $013746
	addq.w	#1,d3
; $013748
	move.w	d0,(a2)
; $01374A
	move.w	d3,$2(a2)
; $01374E
	bsr.w	loc_0137C8

loc_013752:				; $013752
	move.w	#$FFFF,(a2)
; $013756
	lea	($FFFFA984).l,a2

loc_01375C:				; $01375C
	move.w	(a2),d1
; $01375E
	bmi.w	loc_0137BE
; $013762
	move.w	$2(a2),d2
; $013766
	move.w	$4(a2),d3

loc_01376A:				; $01376A
	adda.w	#$0006,a2
; $01376E
	tst.w	(a2)
; $013770
	bmi.w	loc_013780
; $013774
	cmp.w	$4(a2),d3
; $013778
	ble.w	loc_01375C
; $01377C
	bra.w	loc_01376A

loc_013780:				; $013780
	move.w	d1,($FFFFA6E6).w
; $013784
	move.w	d2,($FFFFA6E8).w
; $013788
	moveq	#0,d0
; $01378A
	move.b	$6(a0),d0
; $01378E
	pea	d0
; $013790
	move.b	$7(a0),d0
; $013794
	move.l	d0,($FFFFA6EE).w
; $013798
	cmp.l	($FFFFA6E6).w,d0
; $01379C
	beq.w	loc_0137C2
; $0137A0
	move.w	d1,d4
; $0137A2
	move.w	d2,d5
; $0137A4
	jsr	($00BF0A).l
; $0137AA
	move.w	#$0005,($FFFFA984).l
; $0137B2
	bsr.w	loc_01458E
; $0137B6
	bsr.w	loc_0138A2
; $0137BA
	bra.w	loc_0137C2

loc_0137BE:				; $0137BE
	bsr.w	loc_0138F6

loc_0137C2:				; $0137C2
	movem.l	(a7)+,d5/d6/a2/a3/a4/a5/a6/a7
; $0137C6
	rts

loc_0137C8:				; $0137C8
	movem.l	a7/a6,-(a7)
; $0137CC
	move.w	d4,d0
; $0137CE
	sub.w	(a2)+,d0
; $0137D0
	bcc.w	loc_0137D6
; $0137D4
	neg.w	d0

loc_0137D6:				; $0137D6
	move.w	d5,d1
; $0137D8
	sub.w	(a2)+,d1
; $0137DA
	bcc.w	loc_0137E0
; $0137DE
	neg.w	d1

loc_0137E0:				; $0137E0
	add.w	d0,d1
; $0137E2
	move.w	d1,(a2)+
; $0137E4
	movem.l	(a7)+,a6/a7
; $0137E8
	rts

loc_0137EA:				; $0137EA
	movem.l	a7/a6/a3/a2/d7/d6/d5,-(a7)
; $0137EE
	moveq	#0,d0
; $0137F0
	move.b	$6(a0),d0
; $0137F4
	move.w	d0,$4(a6)
; $0137F8
	move.b	$7(a0),d0
; $0137FC
	move.w	d0,$6(a6)
; $013800
	move.b	#$FF,$8(a6)
; $013806
	move.w	#$0001,$A(a6)
; $01380C
	move.b	#$01,$C(a6)
; $013812
	clr.b	$D(a6)
; $013816
	movea.l	($FFFFA628).w,a1
; $01381A
	moveq	#0,d0
; $01381C
	move.b	$6(a1),d0
; $013820
	move.w	d0,$E(a6)
; $013824
	moveq	#0,d1
; $013826
	move.b	$7(a1),d1
; $01382A
	move.w	d1,$10(a6)
; $01382E
	move.l	(a6),($FFFFA9F8).l
; $013834
	move.l	#$0000B744,(a6)
; $01383A
	jsr	($00B744).l
; $013840
	bsr.w	loc_0145AC
; $013844
	move.l	($FFFFA9F8).l,(a6)
; $01384A
	clr.w	($FFFFA9E4).l
; $013850
	move.l	a0,$12(a6)
; $013854
	move.w	#$0000,$16(a6)
; $01385A
	jsr	($00BB80).l
; $013860
	jsr	($013D44).l
; $013866
	move.w	d4,($FFFFA6E6).w
; $01386A
	move.w	d5,($FFFFA6E8).w
; $01386E
	moveq	#0,d0
; $013870
	move.b	$6(a0),d0
; $013874
	pea	d0
; $013876
	move.b	$7(a0),d0
; $01387A
	move.l	d0,($FFFFA6EE).w
; $01387E
	cmp.l	($FFFFA6E6).w,d0
; $013882
	beq.w	loc_01389C
; $013886
	jsr	($00BF0A).l
; $01388C
	move.w	#$0005,($FFFFA984).l
; $013894
	bsr.w	loc_01458E
; $013898
	bsr.w	loc_0138A2

loc_01389C:				; $01389C
	movem.l	(a7)+,d5/d6/d7/a2/a3/a6/a7
; $0138A0
	rts

loc_0138A2:				; $0138A2
	btst	#1,($FFFFA97C).l
; $0138AA
	bne.w	loc_0138E2
; $0138AE
	cmpi.w	#$A982,($02FFFF).l
; $0138B6
	beq.w	loc_0138E2
; $0138BA
	btst	#6,$2(a0)
; $0138C0
	bne.w	loc_0138E2
; $0138C4
	bsr.w	loc_01471C
; $0138C8
	bsr.w	loc_01455C
; $0138CC
	moveq	#-1,d1
; $0138CE
	bsr.w	loc_01418C
; $0138D2
	cmpi.w	#$A984,($FFFFFFFF).l
; $0138DA
	beq.w	loc_0138E2
; $0138DE
	bsr.w	loc_014736

loc_0138E2:				; $0138E2
	move.w	#$0008,($FFFFA984).l
; $0138EA
	move.l	($FFFFA6DE).w,($FFFFA6EE).w
; $0138F0
	bsr.w	loc_01458E
; $0138F4
	rts

loc_0138F6:				; $0138F6
	movem.l	a7/a6/a5/a3/a2/d6/d5,-(a7)
; $0138FA
	bsr.w	loc_0145F8
; $0138FE
	bsr.w	loc_0145AC
; $013902
	bsr.w	loc_014076
; $013906
	cmpi.w	#$A982,($02FFFF).l
; $01390E
	beq.w	loc_01392A
; $013912
	lea	($FF4000).l,a1
; $013918
	move.w	#$07FF,d0

loc_01391C:				; $01391C
	tst.b	(a1)
; $01391E
	bpl.w	loc_013932
; $013922
	adda.w	#$0002,a1
; $013926
	dbf	d0,loc_01391C

loc_01392A:				; $01392A
	bsr.w	loc_0137EA
; $01392E
	bra.w	loc_0139C8

loc_013932:				; $013932
	movea.l	($FFFFA628).w,a1
; $013936
	moveq	#0,d0
; $013938
	move.b	$6(a1),d0
; $01393C
	moveq	#0,d1
; $01393E
	move.b	$7(a1),d1
; $013942
	move.w	($FFFF9F2C).w,d2
; $013946
	mulu.w	d2,d1
; $013948
	add.w	d1,d0
; $01394A
	add.w	d0,d0
; $01394C
	lea	($FF4000).l,a1
; $013952
	ori.b	#$02,(-$-80,a1,d0.w)
; $013958
	ori.b	#$FE,(-$-80,a1,d0.w)
; $01395E
	add.w	d2,d2
; $013960
	sub.w	d2,d0
; $013962
	ori.b	#$00,(-$-80,a1,d0.w)
; $013968
	add.w	d2,d0
; $01396A
	add.w	d2,d0
; $01396C
	ori.b	#$00,(-$-80,a1,d0.w)
; $013972
	lea	($FF4000).l,a1
; $013978
	move.w	#$07FF,d0

loc_01397C:				; $01397C
	tst.b	(a1)
; $01397E
	bpl.w	loc_01398E
; $013982
	adda.w	#$0002,a1
; $013986
	dbf	d0,loc_01397C
; $01398A
	bra.w	loc_0139C8

loc_01398E:				; $01398E
	bsr.w	loc_013E90
; $013992
	move.w	d4,($FFFFA6E6).w
; $013996
	move.w	d5,($FFFFA6E8).w
; $01399A
	moveq	#0,d0
; $01399C
	move.b	$6(a0),d0
; $0139A0
	pea	d0
; $0139A2
	move.b	$7(a0),d0
; $0139A6
	move.l	d0,($FFFFA6EE).w
; $0139AA
	cmp.l	($FFFFA6E6).w,d0
; $0139AE
	beq.w	loc_0139C8
; $0139B2
	jsr	($00BF0A).l
; $0139B8
	move.w	#$0005,($FFFFA984).l
; $0139C0
	bsr.w	loc_01458E
; $0139C4
	bsr.w	loc_0138A2

loc_0139C8:				; $0139C8
	movem.l	(a7)+,d5/d6/a2/a3/a5/a6/a7
; $0139CC
	rts

loc_0139CE:				; $0139CE
	movem.l	a7/a6/a5/a4/a3/d6,-(a7)
; $0139D2
	move.w	($FFFFA9E2).l,d4
; $0139D8
	moveq	#0,d1
; $0139DA
	moveq	#-1,d2
; $0139DC
	movea.l	($FFFFA628).w,a0
; $0139E0
	lea	($FFFFA9D4).l,a1
; $0139E6
	moveq	#6,d0

loc_0139E8:				; $0139E8
	adda.w	#$000C,a0
; $0139EC
	move.w	(a1)+,d3
; $0139EE
	and.w	d4,d3
; $0139F0
	bne.w	loc_013A0E
; $0139F4
	move.b	$2(a0),d3
; $0139F8
	andi.b	#$89,d3
; $0139FC
	bne.w	loc_013A0E
; $013A00
	move.b	$3(a0),d3
; $013A04
	cmp.b	d2,d3
; $013A06
	ble.w	loc_013A0E
; $013A0A
	move.b	d3,d2
; $013A0C
	move.l	a0,d1

loc_013A0E:				; $013A0E
	dbf	d0,loc_0139E8
; $013A12
	tst.l	d1
; $013A14
	beq.w	loc_013A22
; $013A18
	movea.l	d1,a0
; $013A1A
	andi.b	#$00,#$FB
; $013A20
	ori.b	#$3C,d6
; $013A24
	ori.b	#$DF,d4
; $013A28
	andi.b	#$75,(a7)+

loc_013A2C:				; $013A2C
	movem.l	a7,-(a7)
; $013A30
	moveq	#0,d0
; $013A32
	move.b	$6(a0),d0
; $013A36
	move.w	d0,$4(a6)
; $013A3A
	move.b	$7(a0),d0
; $013A3E
	move.w	d0,$6(a6)
; $013A42
	move.b	#$FF,$8(a6)
; $013A48
	move.w	#$0001,$A(a6)
; $013A4E
	move.b	#$01,$C(a6)
; $013A54
	clr.b	$D(a6)
; $013A58
	moveq	#0,d0
; $013A5A
	move.b	$22(a0),d0
; $013A5E
	move.w	d0,$E(a6)
; $013A62
	moveq	#0,d1
; $013A64
	move.b	$23(a0),d1
; $013A68
	move.w	d1,$10(a6)
; $013A6C
	move.l	(a6),($FFFFA9F8).l
; $013A72
	move.l	#$0000B744,(a6)
; $013A78
	jsr	($00B744).l
; $013A7E
	move.l	($FFFFA9F8).l,(a6)
; $013A84
	clr.w	($FFFFA9E4).l
; $013A8A
	move.l	($FFFFA62C).w,$12(a6)
; $013A90
	move.w	#$0001,$16(a6)
; $013A96
	jsr	($00BB80).l

loc_013A9C:				; $013A9C
	btst	#0,($FFFFA97C).l
; $013AA4
	bne.w	loc_013B36
; $013AA8
	jsr	($013D44).l
; $013AAE
	move.w	d4,($FFFFA6E6).w
; $013AB2
	move.w	d5,($FFFFA6E8).w
; $013AB6
	moveq	#0,d0
; $013AB8
	move.b	$6(a0),d0
; $013ABC
	pea	d0
; $013ABE
	move.b	$7(a0),d0
; $013AC2
	cmp.l	($FFFFA6E6).w,d0
; $013AC6
	beq.w	loc_013AD0
; $013ACA
	jsr	($00BF0A).l

loc_013AD0:				; $013AD0
	moveq	#0,d0
; $013AD2
	move.b	$6(a0),d0
; $013AD6
	pea	d0
; $013AD8
	move.b	$7(a0),d0
; $013ADC
	move.l	d0,($FFFFA6EE).w
; $013AE0
	cmp.l	($FFFFA6E6).w,d0
; $013AE4
	beq.w	loc_013B36
; $013AE8
	move.w	#$0001,($FFFFA984).l
; $013AF0
	bsr.w	loc_01458E
; $013AF4
	tst.b	($FFFFAA10).w
; $013AF8
	bne.w	loc_013B24
; $013AFC
	btst	#1,($FFFFA97C).l
; $013B04
	bne.w	loc_013B24
; $013B08
	bsr.w	loc_01471C
; $013B0C
	moveq	#-1,d0
; $013B0E
	moveq	#-1,d1
; $013B10
	bsr.w	loc_01418C
; $013B14
	cmpi.w	#$A984,($FFFFFFFF).l
; $013B1C
	beq.w	loc_013B24
; $013B20
	bsr.w	loc_014736

loc_013B24:				; $013B24
	move.w	#$0008,($FFFFA984).l
; $013B2C
	move.l	($FFFFA6DE).w,($FFFFA6EE).w
; $013B32
	bsr.w	loc_01458E

loc_013B36:				; $013B36
	movem.l	(a7)+,a7
; $013B3A
	rts

loc_013B3C:				; $013B3C
	movem.l	a7,-(a7)
; $013B40
	movea.l	d1,a1
; $013B42
	moveq	#0,d0
; $013B44
	move.b	$6(a0),d0
; $013B48
	move.w	d0,$4(a6)
; $013B4C
	move.b	$7(a0),d0
; $013B50
	move.w	d0,$6(a6)
; $013B54
	move.b	#$FF,$8(a6)
; $013B5A
	move.w	#$0001,$A(a6)
; $013B60
	move.b	#$01,$C(a6)
; $013B66
	clr.b	$D(a6)
; $013B6A
	moveq	#0,d0
; $013B6C
	move.b	$6(a1),d0
; $013B70
	move.w	d0,$E(a6)
; $013B74
	moveq	#0,d1
; $013B76
	move.b	$7(a1),d1
; $013B7A
	move.w	d1,$10(a6)
; $013B7E
	move.l	(a6),($FFFFA9F8).l
; $013B84
	move.l	#$0000B744,(a6)
; $013B8A
	jsr	($00B744).l
; $013B90
	move.l	($FFFFA9F8).l,(a6)
; $013B96
	clr.w	($FFFFA9E4).l
; $013B9C
	move.l	($FFFFA62C).w,$12(a6)
; $013BA2
	move.w	#$0001,$16(a6)
; $013BA8
	jsr	($00BB80).l
; $013BAE
	moveq	#0,d0
; $013BB0
	move.b	$4(a1),d0
; $013BB4
	moveq	#0,d1
; $013BB6
	btst	#0,($FFFFA97C).l
; $013BBE
	beq.w	loc_013BC4
; $013BC2
	moveq	#-1,d1

loc_013BC4:				; $013BC4
	bsr.w	loc_01418C
; $013BC8
	jsr	($013DF8).l
; $013BCE
	cmpi.w	#$A984,($FFFFFFFF).l
; $013BD6
	beq.w	loc_013A9C
; $013BDA
	move.w	($FFFFA98C).l,d4
; $013BE0
	move.w	d4,($FFFFA6E6).w
; $013BE4
	move.w	($FFFFA98E).l,d5
; $013BEA
	move.w	d5,($FFFFA6E8).w
; $013BEE
	moveq	#0,d0
; $013BF0
	move.b	$6(a0),d0
; $013BF4
	pea	d0
; $013BF6
	move.b	$7(a0),d0
; $013BFA
	cmp.l	($FFFFA6E6).w,d0
; $013BFE
	beq.w	loc_013C08
; $013C02
	jsr	($00BF0A).l

loc_013C08:				; $013C08
	moveq	#0,d0
; $013C0A
	move.b	$6(a0),d0
; $013C0E
	pea	d0
; $013C10
	move.b	$7(a0),d0
; $013C14
	move.l	d0,($FFFFA6EE).w
; $013C18
	cmp.l	($FFFFA6E6).w,d0
; $013C1C
	beq.w	loc_013C34
; $013C20
	move.w	#$0001,($FFFFA984).l
; $013C28
	bsr.w	loc_01458E
; $013C2C
	tst.b	($FFFFAA10).w
; $013C30
	bne.w	loc_013C38

loc_013C34:				; $013C34
	bsr.w	loc_014736

loc_013C38:				; $013C38
	movem.l	(a7)+,a7
; $013C3C
	rts

loc_013C3E:				; $013C3E
	movem.l	a7,-(a7)
; $013C42
	movea.l	d1,a1
; $013C44
	moveq	#0,d0
; $013C46
	move.b	$6(a0),d0
; $013C4A
	move.w	d0,$4(a6)
; $013C4E
	move.b	$7(a0),d0
; $013C52
	move.w	d0,$6(a6)
; $013C56
	move.b	#$FF,$8(a6)
; $013C5C
	move.w	#$0001,$A(a6)
; $013C62
	moveq	#0,d0
; $013C64
	move.b	$6(a1),d0
; $013C68
	move.w	d0,$E(a6)
; $013C6C
	moveq	#0,d1
; $013C6E
	move.b	$7(a1),d1
; $013C72
	move.w	d1,$10(a6)
; $013C76
	sub.w	$4(a6),d0
; $013C7A
	bcc.w	loc_013C80
; $013C7E
	neg.w	d0

loc_013C80:				; $013C80
	sub.w	$6(a6),d1
; $013C84
	bcc.w	loc_013C8A
; $013C88
	neg.w	d1

loc_013C8A:				; $013C8A
	add.w	d1,d0
; $013C8C
	move.b	$2D(a0),d1
; $013C90
	cmp.b	d1,d0
; $013C92
	beq.w	loc_013CD4
; $013C96
	move.b	#$01,$C(a6)
; $013C9C
	move.b	d1,$D(a6)
; $013CA0
	move.l	(a6),($FFFFA9F8).l
; $013CA6
	move.l	#$0000B744,(a6)
; $013CAC
	jsr	($00B744).l
; $013CB2
	move.l	($FFFFA9F8).l,(a6)
; $013CB8
	clr.w	($FFFFA9E4).l
; $013CBE
	move.l	($FFFFA62C).w,$12(a6)
; $013CC4
	move.w	#$0001,$16(a6)
; $013CCA
	jsr	($00BB80).l
; $013CD0
	bra.w	loc_013A9C

loc_013CD4:				; $013CD4
	movem.l	(a7)+,a7
; $013CD8
	rts

loc_013CDA:				; $013CDA
	movem.l	a7/d5,-(a7)
; $013CDE
	lea	($FF6028).l,a2
; $013CE4
	lea	($FF4000).l,a1
; $013CEA
	moveq	#0,d3
; $013CEC
	move.b	$6(a0),d3
; $013CF0
	moveq	#0,d4
; $013CF2
	move.b	$7(a0),d4
; $013CF6
	move.w	d3,($FFFFA6E2).w
; $013CFA
	move.w	d4,($FFFFA6E4).w
; $013CFE
	move.w	d4,d0
; $013D00
	mulu.w	($FFFF9F2C).w,d0
; $013D04
	add.w	d3,d0
; $013D06
	add.w	d0,d0
; $013D08
	move.w	($0,a1,d0.w),d2
; $013D0C
	andi.w	#$0000,(-$1,a1,a7.w)
; $013D12
	move.w	d6,d0
; $013D14
	mulu.w	($FFFF9F2C).w,d0
; $013D18
	add.w	d5,d0
; $013D1A
	add.w	d0,d0
; $013D1C
	andi.w	#$0F00,d2
; $013D20
	or.w	d2,($0,a1,d0.w)
; $013D24
	move.b	d5,$6(a0)
; $013D28
	move.b	d6,$7(a0)
; $013D2C
	moveq	#0,d1
; $013D2E
	move.b	$4(a0),d1
; $013D32
	moveq	#0,d2
; $013D34
	move.b	$5(a0),d2
; $013D38
	jsr	($00C304).l
; $013D3E
	movem.l	(a7)+,d5/a7
; $013D42
	rts

loc_013D44:				; $013D44
	movem.l	a7/a6/a5/a4/a1/a0/d7/d6/d5/d4,-(a7)
; $013D48
	lea	($FF4000).l,a1
; $013D4E
	lea	($FF3000).l,a3
; $013D54
	moveq	#0,d0
; $013D56
	move.b	$0(a0),d0
; $013D5A
	mulu.w	#$001C,d0
; $013D5E
	lea	($05EDDC).l,a2
; $013D64
	adda.w	($4,a2,d0.w),a2
; $013D68
	moveq	#0,d1
; $013D6A
	move.b	$6(a0),d1
; $013D6E
	moveq	#0,d2
; $013D70
	move.b	$7(a0),d2
; $013D74
	moveq	#0,d3
; $013D76
	clr.w	($FFFFA9E6).l
; $013D7C
	moveq	#0,d5
; $013D7E
	move.w	#$0000,d0

loc_013D82:				; $013D82
	moveq	#0,d4

loc_013D84:				; $013D84
	move.w	($0,a1,d0.w),d7
; $013D88
	bmi.w	loc_013DD8
; $013D8C
	moveq	#0,d6
; $013D8E
	move.b	($0,a3,d0.w),d6
; $013D92
	move.b	($0,a2,d6.w),d6
; $013D96
	tst.b	d3
; $013D98
	beq.w	loc_013DCC
; $013D9C
	cmp.b	d3,d7
; $013D9E
	bgt.w	loc_013DD8
; $013DA2
	bmi.w	loc_013DCC
; $013DA6
	btst	#13,d3
; $013DAA
	bne.w	loc_013DBA
; $013DAE
	btst	#13,d7
; $013DB2
	bne.w	loc_013DCC
; $013DB6
	bra.w	loc_013DC2

loc_013DBA:				; $013DBA
	btst	#13,d7
; $013DBE
	beq.w	loc_013DD8

loc_013DC2:				; $013DC2
	cmp.w	($FFFFA9E6).l,d6
; $013DC8
	blt.w	loc_013DD8

loc_013DCC:				; $013DCC
	move.w	d4,d1
; $013DCE
	move.w	d5,d2
; $013DD0
	move.w	d7,d3
; $013DD2
	move.w	d6,($FFFFA9E6).l

loc_013DD8:				; $013DD8
	addq.w	#2,d0
; $013DDA
	addq.w	#1,d4
; $013DDC
	cmp.w	($FFFF9F2C).w,d4
; $013DE0
	bne.w	loc_013D84
; $013DE4
	addq.w	#1,d5
; $013DE6
	cmp.w	($FFFF9F2E).w,d5
; $013DEA
	bne.w	loc_013D82
; $013DEE
	move.w	d1,d4
; $013DF0
	move.w	d2,d5
; $013DF2
	movem.l	(a7)+,d4/d5/d6/d7/a0/a1/a4/a5/a6/a7
; $013DF6
	rts

loc_013DF8:				; $013DF8
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3,-(a7)
; $013DFC
	lea	($FF4000).l,a4
; $013E02
	lea	($FF3000).l,a3
; $013E08
	moveq	#0,d0
; $013E0A
	move.b	$0(a0),d0
; $013E0E
	mulu.w	#$001C,d0
; $013E12
	lea	($05EDDC).l,a2
; $013E18
	adda.w	($4,a2,d0.w),a2
; $013E1C
	moveq	#0,d1
; $013E1E
	move.b	$6(a0),d1
; $013E22
	moveq	#0,d2
; $013E24
	move.b	$7(a0),d2
; $013E28
	moveq	#0,d3
; $013E2A
	clr.w	($FFFFA9E6).l
; $013E30
	moveq	#0,d5
; $013E32
	move.w	#$0000,d0

loc_013E36:				; $013E36
	moveq	#0,d4

loc_013E38:				; $013E38
	move.w	($0,a4,d0.w),d7
; $013E3C
	bmi.w	loc_013E70
; $013E40
	moveq	#0,d6
; $013E42
	move.b	($0,a3,d0.w),d6
; $013E46
	move.b	($0,a2,d6.w),d6
; $013E4A
	tst.b	d3
; $013E4C
	beq.w	loc_013E64
; $013E50
	cmp.b	d3,d7
; $013E52
	bgt.w	loc_013E70
; $013E56
	bmi.w	loc_013E64
; $013E5A
	cmp.w	($FFFFA9E6).l,d6
; $013E60
	blt.w	loc_013E70

loc_013E64:				; $013E64
	move.w	d4,d1
; $013E66
	move.w	d5,d2
; $013E68
	move.b	d7,d3
; $013E6A
	move.w	d6,($FFFFA9E6).l

loc_013E70:				; $013E70
	addq.w	#2,d0
; $013E72
	addq.w	#1,d4
; $013E74
	cmp.w	($FFFF9F2C).w,d4
; $013E78
	bne.w	loc_013E38
; $013E7C
	addq.w	#1,d5
; $013E7E
	cmp.w	($FFFF9F2E).w,d5
; $013E82
	bne.w	loc_013E36
; $013E86
	move.w	d1,d4
; $013E88
	move.w	d2,d5
; $013E8A
	movem.l	(a7)+,d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $013E8E
	rts

loc_013E90:				; $013E90
	movem.l	a7/a6/a5/a4/a1/a0/d7/d6/d5/d4,-(a7)
; $013E94
	lea	($FF4000).l,a1
; $013E9A
	lea	($FF3000).l,a3
; $013EA0
	moveq	#0,d0
; $013EA2
	move.b	$0(a0),d0
; $013EA6
	mulu.w	#$001C,d0
; $013EAA
	lea	($05EDDC).l,a2
; $013EB0
	adda.w	($4,a2,d0.w),a2
; $013EB4
	moveq	#0,d1
; $013EB6
	move.b	$6(a0),d1
; $013EBA
	moveq	#0,d2
; $013EBC
	move.b	$7(a0),d2
; $013EC0
	move.w	#$00FF,d3
; $013EC4
	clr.w	($FFFFA9E6).l
; $013ECA
	moveq	#0,d5
; $013ECC
	move.w	#$0000,d0

loc_013ED0:				; $013ED0
	moveq	#0,d4

loc_013ED2:				; $013ED2
	move.w	($0,a1,d0.w),d7
; $013ED6
	bmi.w	loc_013F26
; $013EDA
	moveq	#0,d6
; $013EDC
	move.b	($0,a3,d0.w),d6
; $013EE0
	move.b	($0,a2,d6.w),d6
; $013EE4
	tst.b	d3
; $013EE6
	beq.w	loc_013F1A
; $013EEA
	cmp.b	($FFFFA9E6).l,d6
; $013EF0
	bgt.w	loc_013F1A
; $013EF4
	bne.w	loc_013F26
; $013EF8
	btst	#13,d3
; $013EFC
	bne.w	loc_013F0C
; $013F00
	btst	#13,d7
; $013F04
	bne.w	loc_013F1A
; $013F08
	bra.w	loc_013F14

loc_013F0C:				; $013F0C
	btst	#13,d7
; $013F10
	beq.w	loc_013F26

loc_013F14:				; $013F14
	cmp.b	d3,d7
; $013F16
	bgt.w	loc_013F26

loc_013F1A:				; $013F1A
	move.w	d4,d1
; $013F1C
	move.w	d5,d2
; $013F1E
	move.w	d7,d3
; $013F20
	move.b	d6,($FFFFA9E6).l

loc_013F26:				; $013F26
	addq.w	#2,d0
; $013F28
	addq.w	#1,d4
; $013F2A
	cmp.w	($FFFF9F2C).w,d4
; $013F2E
	bne.w	loc_013ED2
; $013F32
	addq.w	#1,d5
; $013F34
	cmp.w	($FFFF9F2E).w,d5
; $013F38
	bne.w	loc_013ED0
; $013F3C
	move.w	d1,d4
; $013F3E
	move.w	d2,d5
; $013F40
	movem.l	(a7)+,d4/d5/d6/d7/a0/a1/a4/a5/a6/a7
; $013F44
	rts

loc_013F46:				; $013F46
	movem.l	a7,-(a7)
; $013F4A
	clr.b	($FFFFA97C).l
; $013F50
	move.b	$17(a0),d0
; $013F54
	btst	#4,d0
; $013F58
	beq.w	loc_013F64
; $013F5C
	ori.b	#$7C,($02FFFF).l

loc_013F64:				; $013F64
	btst	#7,d0
; $013F68
	beq.w	loc_013F74
; $013F6C
	ori.b	#$7C,($04FFFF).l

loc_013F74:				; $013F74
	btst	#5,d0
; $013F78
	beq.w	loc_013F84
; $013F7C
	ori.b	#$7C,($08FFFF).l

loc_013F84:				; $013F84
	tst.b	$5C(a0)
; $013F88
	bne.w	loc_013F9E
; $013F8C
	cmpi.b	#$16,$2(a0)
; $013F92
	bne.w	loc_013F9E
; $013F96
	ori.b	#$7C,($02FFFF).l

loc_013F9E:				; $013F9E
	movem.l	(a7)+,a7
; $013FA2
	rts

loc_013FA4:				; $013FA4
	movem.l	a7,-(a7)
; $013FA8
	clr.l	$2(a2)
; $013FAC
	clr.l	$6(a2)
; $013FB0
	move.w	(a2),($FFFFA958).w
; $013FB4
	moveq	#0,d0
; $013FB6
	move.b	$6(a0),d0
; $013FBA
	move.w	d0,($FFFFA6E6).w
; $013FBE
	move.b	$7(a0),d1
; $013FC2
	move.w	d1,($FFFFA6E8).w
; $013FC6
	mulu.w	($FFFF9F2C).w,d1
; $013FCA
	add.w	d1,d0
; $013FCC
	add.w	d0,d0
; $013FCE
	move.w	d0,($FFFFA620).w
; $013FD2
	cmpi.w	#$000B,(a2)
; $013FD6
	bpl.w	loc_014056
; $013FDA
	bsr.w	loc_014028
; $013FDE
	addq.w	#1,($FFFFA6E6).w
; $013FE2
	addq.w	#1,($FFFFA620).w
; $013FE6
	bsr.w	loc_014028
; $013FEA
	subq.w	#2,($FFFFA6E6).w
; $013FEE
	subq.w	#4,($FFFFA620).w
; $013FF2
	bsr.w	loc_014028
; $013FF6
	addq.w	#1,($FFFFA6E6).w
; $013FFA
	subq.w	#1,($FFFFA6E8).w
; $013FFE
	move.w	($FFFF9F2C).w,d0
; $014002
	add.w	d0,d0
; $014004
	addq.w	#2,d0
; $014006
	sub.w	d0,($FFFFA620).w
; $01400A
	bsr.w	loc_014028
; $01400E
	addq.w	#2,($FFFFA6E8).w
; $014012
	move.w	($FFFF9F2C).w,d0
; $014016
	add.w	d0,d0
; $014018
	add.w	d0,d0
; $01401A
	add.w	d0,($FFFFA620).w
; $01401E
	bsr.w	loc_014028

loc_014022:				; $014022
	movem.l	(a7)+,a7
; $014026
	rts

loc_014028:				; $014028
	jsr	($00AB72).l
; $01402E
	beq.w	loc_014054
; $014032
	jsr	($00ACF8).l
; $014038
	pea	d0
; $01403A
	cmp.w	$2(a2),d0
; $01403E
	ble.w	loc_014054
; $014042
	pea	d0
; $014044
	move.l	d0,$2(a2)
; $014048
	move.w	($FFFFA6E6).w,$6(a2)
; $01404E
	move.w	($FFFFA6E8).w,$8(a2)

loc_014054:				; $014054
	rts

loc_014056:				; $014056
	move.w	($FFFFA6E6).w,$6(a2)
; $01405C
	move.w	($FFFFA6E8).w,$8(a2)
; $014062
	jsr	($00AB72).l
; $014068
	jsr	($00ACF8).l
; $01406E
	move.l	d0,$2(a2)
; $014072
	bra.w	loc_014022

loc_014076:				; $014076
	movem.l	a7/a6/a5/a4/a3/a2/d7/d6,-(a7)
; $01407A
	jsr	($00BB60).l
; $014080
	movea.l	($FFFFA628).w,a1
; $014084
	moveq	#0,d1
; $014086
	move.b	$45(a1),d1
; $01408A
	move.b	d1,($FFFF9F5C).w
; $01408E
	beq.w	loc_014096
; $014092
	addq.b	#1,($FFFF9F5C).w

loc_014096:				; $014096
	jsr	($010962).l
; $01409C
	btst	#3,$8(a1)
; $0140A2
	beq.w	loc_0140AA
; $0140A6
	clr.b	($FFFF9F5C).w

loc_0140AA:				; $0140AA
	moveq	#0,d4
; $0140AC
	move.b	$6(a1),d4
; $0140B0
	moveq	#0,d5
; $0140B2
	move.b	$7(a1),d5
; $0140B6
	movea.w	d5,a1
; $0140B8
	lea	($FF4000).l,a0
; $0140BE
	moveq	#0,d1
; $0140C0
	move.b	($FFFF9F5C).w,d1
; $0140C4
	beq.w	loc_014162

loc_0140C8:				; $0140C8
	tst.w	d1
; $0140CA
	beq.w	loc_01410C
; $0140CE
	subq.w	#1,d1
; $0140D0
	move.w	d4,d2
; $0140D2
	sub.w	d1,d2
; $0140D4
	move.w	d1,d0
; $0140D6
	add.w	d0,d0

loc_0140D8:				; $0140D8
	tst.w	d5
; $0140DA
	beq.w	loc_014100
; $0140DE
	tst.w	d2
; $0140E0
	ble.w	loc_014100
; $0140E4
	move.w	d2,d3
; $0140E6
	addq.w	#1,d3
; $0140E8
	cmp.w	($FFFF9F2C).w,d3
; $0140EC
	bge.w	loc_014100
; $0140F0
	move.w	d5,d3
; $0140F2
	mulu.w	($FFFF9F2C).w,d3
; $0140F6
	add.w	d2,d3
; $0140F8
	add.w	d3,d3
; $0140FA
	ori.b	#$00,($20,a0,d0.w)

loc_014100:				; $014100
	addq.w	#1,d2
; $014102
	dbf	d0,loc_0140D8
; $014106
	subq.w	#1,d5
; $014108
	bra.w	loc_0140C8

loc_01410C:				; $01410C
	move.w	a1,d5
; $01410E
	addq.w	#1,d5
; $014110
	moveq	#0,d1
; $014112
	move.b	($FFFF9F5C).w,d1
; $014116
	subq.w	#1,d1

loc_014118:				; $014118
	tst.w	d1
; $01411A
	beq.w	loc_014162
; $01411E
	subq.w	#1,d1
; $014120
	move.w	d4,d2
; $014122
	sub.w	d1,d2
; $014124
	move.w	d1,d0
; $014126
	add.w	d0,d0

loc_014128:				; $014128
	move.w	d5,d3
; $01412A
	addq.w	#1,d3
; $01412C
	cmp.w	($FFFF9F2E).w,d3
; $014130
	bge.w	loc_014156
; $014134
	tst.w	d2
; $014136
	ble.w	loc_014156
; $01413A
	move.w	d2,d3
; $01413C
	addq.w	#1,d3
; $01413E
	cmp.w	($FFFF9F2C).w,d3
; $014142
	bge.w	loc_014156
; $014146
	move.w	d5,d3
; $014148
	mulu.w	($FFFF9F2C).w,d3
; $01414C
	add.w	d2,d3
; $01414E
	add.w	d3,d3
; $014150
	ori.b	#$00,($20,a0,d0.w)

loc_014156:				; $014156
	addq.w	#1,d2
; $014158
	dbf	d0,loc_014128
; $01415C
	addq.w	#1,d5
; $01415E
	bra.w	loc_014118

loc_014162:				; $014162
	lea	($FF4000).l,a1
; $014168
	move.w	#$07FF,d0

loc_01416C:				; $01416C
	move.b	(a1),d1
; $01416E
	bmi.w	loc_01417E
; $014172
	btst	#5,d1
; $014176
	bne.w	loc_01417E
; $01417A
	ori.b	#$80,(a1)

loc_01417E:				; $01417E
	adda.w	#$0002,a1
; $014182
	dbf	d0,loc_01416C
; $014186
	movem.l	(a7)+,d6/d7/a2/a3/a4/a5/a6/a7
; $01418A
	rts

loc_01418C:				; $01418C
	movem.l	a7/a6/a4/a3/a1/a0/d6/d5,-(a7)
; $014190
	move.w	d0,($FFFFA9EC).l
; $014196
	lea	($FF4000).l,a1
; $01419C
	lea	($FF5000).l,a2
; $0141A2
	moveq	#0,d6
; $0141A4
	moveq	#0,d7
; $0141A6
	move.b	$6(a0),d6
; $0141AA
	move.b	$7(a0),d7
; $0141AE
	move.w	d7,d3
; $0141B0
	mulu.w	($FFFF9F2C).w,d3
; $0141B4
	add.w	d6,d3
; $0141B6
	add.w	d3,d3
; $0141B8
	bsr.w	loc_01425A
; $0141BC
	tst.w	d1
; $0141BE
	bne.w	loc_0141F8
; $0141C2
	moveq	#0,d3
; $0141C4
	moveq	#0,d6
; $0141C6
	moveq	#0,d7

loc_0141C8:				; $0141C8
	move.b	($0,a1,d3.w),d0
; $0141CC
	bmi.w	loc_0141DC
; $0141D0
	andi.b	#$0F,d0
; $0141D4
	bne.w	loc_0141DC
; $0141D8
	bsr.w	loc_01425A

loc_0141DC:				; $0141DC
	addq.w	#2,d3
; $0141DE
	addq.w	#1,d6
; $0141E0
	cmp.w	($FFFF9F2C).w,d6
; $0141E4
	beq.w	loc_0141EC
; $0141E8
	bra.w	loc_0141C8

loc_0141EC:				; $0141EC
	moveq	#0,d6
; $0141EE
	addq.w	#1,d7
; $0141F0
	cmp.w	($FFFF9F2E).w,d7
; $0141F4
	bne.w	loc_0141C8

loc_0141F8:				; $0141F8
	lea	($FFFFA984).l,a1
; $0141FE
	lea	($FFFFA99E).l,a2
; $014204
	tst.w	(a2)
; $014206
	bmi.w	loc_014254
; $01420A
	tst.b	$5(a0)
; $01420E
	bne.w	loc_01421C
; $014212
	jsr	($00BED4).l
; $014218
	bne.w	loc_014228

loc_01421C:				; $01421C
	btst	#3,($FFFFA97C).l
; $014224
	bne.w	loc_01424C

loc_014228:				; $014228
	move.w	$4(a2),d4
; $01422C
	cmp.w	$4(a6),d4
; $014230
	bgt.w	loc_014254
; $014234
	blt.w	loc_01424C
; $014238
	cmp.w	$2(a6),d3
; $01423C
	blt.w	loc_014254
; $014240
	bgt.w	loc_01424C
; $014244
	cmp.w	$6(a6),d1
; $014248
	blt.w	loc_014254

loc_01424C:				; $01424C
	moveq	#5,d0

loc_01424E:				; $01424E
	move.l	(a2)+,(a1)+
; $014250
	dbf	d0,loc_01424E

loc_014254:				; $014254
	movem.l	(a7)+,d5/d6/a0/a1/a3/a4/a6/a7
; $014258
	rts

loc_01425A:				; $01425A
	movem.l	a7/a6/a5/a4/a3/a2/d6/d4,-(a7)
; $01425E
	cmpi.b	#$03,$5(a0)
; $014264
	blt.w	loc_01433A
; $014268
	moveq	#0,d1
; $01426A
	move.b	$0(a0),d1
; $01426E
	mulu.w	#$001C,d1
; $014272
	move.b	#$02,($FFFF9F5C).w
; $014278
	lea	($05EDDC).l,a1
; $01427E
	move.b	($6,a1,d1.w),d0
; $014282
	cmpi.b	#$0F,d0
; $014286
	beq.w	loc_01429C
; $01428A
	cmpi.b	#$10,d0
; $01428E
	bne.w	loc_0142A2
; $014292
	move.b	#$07,($FFFF9F5C).w
; $014298
	bra.w	loc_0142A2

loc_01429C:				; $01429C
	move.b	#$04,($FFFF9F5C).w

loc_0142A2:				; $0142A2
	move.w	d6,d4
; $0142A4
	move.w	d7,d5
; $0142A6
	movea.w	d5,a3
; $0142A8
	lea	($FF4000).l,a1
; $0142AE
	moveq	#0,d1
; $0142B0
	move.b	($FFFF9F5C).w,d1
; $0142B4
	beq.w	loc_01433A

loc_0142B8:				; $0142B8
	tst.w	d1
; $0142BA
	beq.w	loc_0142F0
; $0142BE
	subq.w	#1,d1
; $0142C0
	move.w	d4,d2
; $0142C2
	sub.w	d1,d2
; $0142C4
	move.w	d1,d0
; $0142C6
	add.w	d0,d0

loc_0142C8:				; $0142C8
	tst.w	d5
; $0142CA
	ble.w	loc_0142E4
; $0142CE
	tst.w	d2
; $0142D0
	ble.w	loc_0142E4
; $0142D4
	move.w	d2,d3
; $0142D6
	addq.w	#1,d3
; $0142D8
	cmp.w	($FFFF9F2C).w,d3
; $0142DC
	bge.w	loc_0142E4
; $0142E0
	bsr.w	loc_014340

loc_0142E4:				; $0142E4
	addq.w	#1,d2
; $0142E6
	dbf	d0,loc_0142C8
; $0142EA
	subq.w	#1,d5
; $0142EC
	bra.w	loc_0142B8

loc_0142F0:				; $0142F0
	move.w	a3,d5
; $0142F2
	addq.w	#1,d5
; $0142F4
	moveq	#0,d1
; $0142F6
	move.b	($FFFF9F5C).w,d1
; $0142FA
	subq.w	#1,d1

loc_0142FC:				; $0142FC
	tst.w	d1
; $0142FE
	beq.w	loc_01433A
; $014302
	subq.w	#1,d1
; $014304
	move.w	d4,d2
; $014306
	sub.w	d1,d2
; $014308
	move.w	d1,d0
; $01430A
	add.w	d0,d0

loc_01430C:				; $01430C
	move.w	d5,d3
; $01430E
	addq.w	#1,d3
; $014310
	cmp.w	($FFFF9F2E).w,d3
; $014314
	bge.w	loc_01432E
; $014318
	tst.w	d2
; $01431A
	ble.w	loc_01432E
; $01431E
	move.w	d2,d3
; $014320
	addq.w	#1,d3
; $014322
	cmp.w	($FFFF9F2C).w,d3
; $014326
	bge.w	loc_01432E
; $01432A
	bsr.w	loc_014340

loc_01432E:				; $01432E
	addq.w	#1,d2
; $014330
	dbf	d0,loc_01430C
; $014334
	addq.w	#1,d5
; $014336
	bra.w	loc_0142FC

loc_01433A:				; $01433A
	movem.l	(a7)+,d4/d6/a2/a3/a4/a5/a6/a7
; $01433E
	rts

loc_014340:				; $014340
	movem.l	a7/a6/a3/d7/d1,-(a7)
; $014344
	move.w	d5,d3
; $014346
	mulu.w	($FFFF9F2C).w,d3
; $01434A
	add.w	d2,d3
; $01434C
	add.w	d3,d3
; $01434E
	move.b	($0,a1,d3.w),d0
; $014352
	andi.b	#$0F,d0
; $014356
	beq.w	loc_014556
; $01435A
	and.b	($FFFFA626).w,d0
; $01435E
	bne.w	loc_014556
; $014362
	moveq	#0,d0
; $014364
	move.b	($0,a2,d3.w),d0
; $014368
	move.w	d0,($FFFFA99C).l
; $01436E
	add.w	d0,d0
; $014370
	add.w	d0,d0
; $014372
	lea	($05E5D8).l,a4
; $014378
	movea.l	($0,a4,d0.w),a4
; $01437C
	bsr.w	loc_0146E0
; $014380
	beq.w	loc_014556
; $014384
	btst	#2,($FFFFA97C).l
; $01438C
	beq.w	loc_01439A
; $014390
	btst	#4,$17(a4)
; $014396
	bne.w	loc_014556

loc_01439A:				; $01439A
	move.w	d6,($FFFFA6E6).w
; $01439E
	move.w	d7,($FFFFA6E8).w
; $0143A2
	move.l	a4,($FFFFA630).w
; $0143A6
	moveq	#0,d0
; $0143A8
	move.b	($1,a2,d3.w),d0
; $0143AC
	add.w	d0,d0
; $0143AE
	add.w	d0,d0
; $0143B0
	lea	($05E628).l,a5
; $0143B6
	adda.l	($0,a5,d0.w),a4
; $0143BA
	move.l	a4,($FFFFA634).w
; $0143BE
	moveq	#0,d0
; $0143C0
	move.b	$6(a4),d0
; $0143C4
	move.w	d0,($FFFFA6EA).w
; $0143C8
	move.b	$7(a4),d0
; $0143CC
	move.w	d0,($FFFFA6EC).w
; $0143D0
	jsr	($00E392).l
; $0143D6
	lea	($FFFFA984).l,a6
; $0143DC
	lea	($FFFFA662).w,a4
; $0143E0
	lea	($FFFFA694).w,a5
; $0143E4
	tst.w	$6(a5)
; $0143E8
	beq.w	loc_014556
; $0143EC
	tst.b	$5(a0)
; $0143F0
	bne.w	loc_0143FE
; $0143F4
	jsr	($00BED4).l
; $0143FA
	bne.w	loc_014426

loc_0143FE:				; $0143FE
	btst	#3,($FFFFA97C).l
; $014406
	beq.w	loc_014426
; $01440A
	move.w	($FFFFA99C).l,d0
; $014410
	cmp.w	($FFFFA9EC).l,d0
; $014416
	beq.w	loc_0144F6
; $01441A
	cmpi.w	#$A9EC,($FFFFFFFF).l
; $014422
	beq.w	loc_0144F6

loc_014426:				; $014426
	move.w	$2E(a4),d3
; $01442A
	move.w	$2E(a5),d4
; $01442E
	move.w	$6(a4),d0
; $014432
	sub.w	d4,d0
; $014434
	move.w	$6(a5),d1
; $014438
	sub.w	d3,d1
; $01443A
	tst.b	$5(a0)
; $01443E
	beq.w	loc_014470
; $014442
	btst	#3,($FFFFA97C).l
; $01444A
	bne.w	loc_01447C
; $01444E
	movea.l	($FFFFA628).w,a0
; $014452
	tst.b	$5C(a0)
; $014456
	bne.w	loc_014464
; $01445A
	cmpi.b	#$16,$1(a0)
; $014460
	bne.w	loc_014470

loc_014464:				; $014464
	tst.w	d0
; $014466
	ble.w	loc_014470
; $01446A
	tst.w	d1
; $01446C
	ble.w	loc_014484

loc_014470:				; $014470
	cmpi.w	#$0008,d0
; $014474
	blt.w	loc_014556
; $014478
	bra.w	loc_014484

loc_01447C:				; $01447C
	cmpi.w	#$0006,d0
; $014480
	blt.w	loc_014556

loc_014484:				; $014484
	move.w	$6(a4),d0
; $014488
	cmpi.w	#$0008,d0
; $01448C
	bpl.w	loc_014498
; $014490
	tst.w	$E(a5)
; $014494
	bne.w	loc_014556

loc_014498:				; $014498
	move.w	$22(a4),d1
; $01449C
	tst.w	(a6)
; $01449E
	bmi.w	loc_0144C2
; $0144A2
	cmp.w	$4(a6),d4
; $0144A6
	bgt.w	loc_014556
; $0144AA
	blt.w	loc_0144C2
; $0144AE
	cmp.w	$2(a6),d3
; $0144B2
	blt.w	loc_014556
; $0144B6
	bgt.w	loc_0144C2
; $0144BA
	cmp.w	$6(a6),d1
; $0144BE
	blt.w	loc_014556

loc_0144C2:				; $0144C2
	move.w	#$0001,(a6)
; $0144C6
	move.w	d3,$2(a6)
; $0144CA
	move.w	d4,$4(a6)
; $0144CE
	move.w	d1,$6(a6)
; $0144D2
	move.w	d6,$8(a6)
; $0144D6
	move.w	d7,$A(a6)
; $0144DA
	move.w	($FFFFA6EA).w,$C(a6)
; $0144E0
	move.w	($FFFFA6EC).w,$E(a6)
; $0144E6
	move.l	($FFFFA630).w,$10(a6)
; $0144EC
	move.l	($FFFFA634).w,$14(a6)
; $0144F2
	bra.w	loc_014556

loc_0144F6:				; $0144F6
	lea	$1A(a6),a6
; $0144FA
	moveq	#0,d0
; $0144FC
	moveq	#0,d1
; $0144FE
	tst.w	$E(a5)
; $014502
	beq.w	loc_014524
; $014506
	move.w	$12(a5),d4
; $01450A
	move.w	$10(a5),d0
; $01450E
	move.w	$14(a5),d1
; $014512
	beq.w	loc_014524
; $014516
	cmp.w	d1,d0
; $014518
	bge.w	loc_014526
; $01451C
	mulu.w	d0,d4
; $01451E
	divu.w	d1,d4
; $014520
	bra.w	loc_014526

loc_014524:				; $014524
	moveq	#0,d4

loc_014526:				; $014526
	moveq	#0,d0
; $014528
	moveq	#0,d1
; $01452A
	tst.w	$E(a4)
; $01452E
	beq.w	loc_014550
; $014532
	move.w	$12(a4),d3
; $014536
	move.w	$10(a4),d0
; $01453A
	move.w	$14(a4),d1
; $01453E
	beq.w	loc_014550
; $014542
	cmp.w	d1,d0
; $014544
	bge.w	loc_014498
; $014548
	mulu.w	d0,d3
; $01454A
	divu.w	d1,d3
; $01454C
	bra.w	loc_014498

loc_014550:				; $014550
	moveq	#0,d3
; $014552
	bra.w	loc_014498

loc_014556:				; $014556
	movem.l	(a7)+,d1/d7/a3/a6/a7
; $01455A
	rts

loc_01455C:				; $01455C
	movem.l	a6/a5/d7,-(a7)
; $014560
	moveq	#-1,d2
; $014562
	movea.l	($FFFFA628).w,a0
; $014566
	btst	#1,$17(a0)
; $01456C
	beq.w	loc_014586
; $014570
	moveq	#0,d1
; $014572
	move.b	$21(a0),d1
; $014576
	bsr.w	loc_0120B6
; $01457A
	beq.w	loc_014586
; $01457E
	movea.l	d1,a0
; $014580
	moveq	#0,d2
; $014582
	move.b	$4(a0),d2

loc_014586:				; $014586
	move.w	d2,d0
; $014588
	movem.l	(a7)+,d7/a5/a6
; $01458C
	rts

loc_01458E:				; $01458E
	move.b	#$01,($FFFFA9EE).l

loc_014596:				; $014596
	tst.b	($FFFFAA10).w
; $01459A
	bne.w	loc_0145AA
; $01459E
	cmpi.b	#$EE,($00FFFF).l
; $0145A6
	bne.w	loc_014596

loc_0145AA:				; $0145AA
	rts

loc_0145AC:				; $0145AC
	movem.l	a7/a6/a5/a4/d6,-(a7)
; $0145B0
	lea	($FF4000).l,a1
; $0145B6
	moveq	#0,d2
; $0145B8
	move.w	#$07FF,d1

loc_0145BC:				; $0145BC
	move.b	($0,a1,d2.w),d3
; $0145C0
	bmi.w	loc_0145D2
; $0145C4
	andi.b	#$0F,d3
; $0145C8
	beq.w	loc_0145D2
; $0145CC
	ori.b	#$00,(-$-80,a1,d0.w)

loc_0145D2:				; $0145D2
	addq.w	#2,d2
; $0145D4
	dbf	d1,loc_0145BC
; $0145D8
	moveq	#0,d0
; $0145DA
	move.b	$6(a0),d0
; $0145DE
	moveq	#0,d1
; $0145E0
	move.b	$7(a0),d1
; $0145E4
	mulu.w	($FFFF9F2C).w,d1
; $0145E8
	add.w	d1,d0
; $0145EA
	add.w	d0,d0
; $0145EC
	andi.b	#$00,($7F,a1,d0.w)
; $0145F2
	movem.l	(a7)+,d6/a4/a5/a6/a7
; $0145F6
	rts

loc_0145F8:				; $0145F8
	movem.l	a7/a6/d7/d6/d4,-(a7)
; $0145FC
	tst.w	($FFFFA9E4).l
; $014602
	bmi.w	loc_01469E
; $014606
	moveq	#0,d1
; $014608
	tst.b	$5(a0)
; $01460C
	bne.w	loc_014650
; $014610
	move.b	$44(a0),d1
; $014614
	addq.b	#1,d1
; $014616
	move.b	d1,($FFFF9F5C).w
; $01461A
	movea.l	a0,a3
; $01461C
	jsr	($0109A0).l
; $014622
	btst	#6,$17(a0)
; $014628
	bne.w	loc_014644
; $01462C
	move.b	($FFFF9F5C).w,d1
; $014630
	jsr	($00BED4).l
; $014636
	beq.w	loc_014650
; $01463A
	subq.b	#1,d1
; $01463C
	bpl.w	loc_014650
; $014640
	bra.w	loc_01464E

loc_014644:				; $014644
	move.b	($FFFF9F5C).w,d1
; $014648
	lsr.b	#1,d1
; $01464A
	bne.w	loc_014650

loc_01464E:				; $01464E
	moveq	#1,d1

loc_014650:				; $014650
	moveq	#0,d0
; $014652
	move.b	$6(a0),d0
; $014656
	move.w	d0,$4(a6)
; $01465A
	move.b	$7(a0),d0
; $01465E
	move.w	d0,$6(a6)
; $014662
	move.b	d1,$8(a6)
; $014666
	move.w	#$0000,$A(a6)
; $01466C
	move.b	#$00,$C(a6)
; $014672
	clr.b	$D(a6)
; $014676
	move.l	(a6),($FFFFA9F8).l
; $01467C
	move.l	#$0000B744,(a6)
; $014682
	jsr	($00B744).l
; $014688
	bsr.w	loc_0145AC
; $01468C
	move.l	($FFFFA9F8).l,(a6)
; $014692
	move.w	#$FFFF,($FFFFA9E4).l
; $01469A
	bra.w	loc_0146C6

loc_01469E:				; $01469E
	lea	($FF4000).l,a0
; $0146A4
	movea.l	a0,a1
; $0146A6
	addq.l	#1,a0
; $0146A8
	move.w	#$07FF,d0

loc_0146AC:				; $0146AC
	tst.b	(a0)
; $0146AE
	bne.w	loc_0146BA
; $0146B2
	ori.b	#$80,(a1)
; $0146B6
	bra.w	loc_0146BE

loc_0146BA:				; $0146BA
	andi.b	#$7F,(a1)

loc_0146BE:				; $0146BE
	addq.w	#2,a0
; $0146C0
	addq.w	#2,a1
; $0146C2
	dbf	d0,loc_0146AC

loc_0146C6:				; $0146C6
	movem.l	(a7)+,d4/d6/d7/a6/a7
; $0146CA
	rts

loc_0146CC:				; $0146CC
	movem.l	d7,-(a7)
; $0146D0
	movea.l	a1,a0
; $0146D2
	bra.w	loc_0146E6

loc_0146D6:				; $0146D6
	movem.l	d7,-(a7)
; $0146DA
	movea.l	a3,a0
; $0146DC
	bra.w	loc_0146E6

loc_0146E0:				; $0146E0
	movem.l	d7,-(a7)
; $0146E4
	movea.l	a4,a0

loc_0146E6:				; $0146E6
	movem.l	a6,-(a7)
; $0146EA
	btst	#3,$17(a0)
; $0146F0
	beq.w	loc_01470E
; $0146F4
	move.b	$2C(a0),d1
; $0146F8
	bsr.w	loc_0120B6
; $0146FC
	beq.w	loc_01470E
; $014700
	cmpm.l	(a0)+,(a1)+
; $014702
	beq.w	loc_01470E
; $014706
	ori	#$00,ccr
; $01470C
	ori.b	#$3C,d6
; $014710
	ori.?	#?,(-$21,pc,d4.l)
; $014714
	ori.b	#$DF,d2
; $014718
	btst	d0,d0
; $01471A
	rts

loc_01471C:				; $01471C
	movem.l	a7/a6/d6,-(a7)
; $014720
	moveq	#19,d0
; $014722
	moveq	#-1,d1
; $014724
	lea	($FFFFA984).l,a1

loc_01472A:				; $01472A
	move.l	d1,(a1)+
; $01472C
	dbf	d0,loc_01472A
; $014730
	movem.l	(a7)+,d6/a6/a7
; $014734
	rts

loc_014736:				; $014736
	moveq	#0,d0
; $014738
	move.b	$6(a0),d0
; $01473C
	pea	d0
; $01473E
	move.b	$7(a0),d0
; $014742
	move.l	d0,($FFFFA6EE).w
; $014746
	move.w	($FFFFA990).l,($FFFFA6EA).w
; $01474E
	move.w	($FFFFA992).l,($FFFFA6EC).w
; $014756
	move.l	($FFFFA994).l,($FFFFA630).w
; $01475E
	move.l	($FFFFA998).l,($FFFFA634).w
; $014766
	move.w	#$0002,($FFFFA984).l
; $01476E
	bra.w	loc_01458E
; $014772
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $014776
	moveq	#12,d1
; $014778
	move.b	#$89,d2
; $01477C
	jsr	($00899A).l
; $014782
	jsr	($00A6EA).l
; $014788
	move.b	#$01,($FFFFA6F8).w

loc_01478E:				; $01478E
	btst	#7,($FFFF8179).w
; $014794
	beq.w	loc_01478E
; $014798
	move.b	#$00,($FFFFA6F8).w
; $01479E
	moveq	#12,d1
; $0147A0
	move.b	#$81,d2
; $0147A4
	jsr	($00899A).l
; $0147AA
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $0147AE
	rts
; $0147B0
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $0147B4
	moveq	#12,d1
; $0147B6
	move.b	#$89,d2
; $0147BA
	jsr	($00899A).l
; $0147C0
	jsr	($00A6EA).l
; $0147C6
	move.b	#$01,($FFFFA6F8).w

loc_0147CC:				; $0147CC
	btst	#6,($FFFF8179).w
; $0147D2
	beq.w	loc_0147CC
; $0147D6
	move.b	#$00,($FFFFA6F8).w
; $0147DC
	moveq	#12,d1
; $0147DE
	move.b	#$81,d2
; $0147E2
	jsr	($00899A).l
; $0147E8
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $0147EC
	rts
; $0147EE
	moveq	#12,d1
; $0147F0
	move.b	#$89,d2
; $0147F4
	jsr	($00899A).l
; $0147FA
	jsr	($00A6EA).l
; $014800
	move.b	#$01,($FFFFA6F8).w
; $014806
	move.l	#$00014810,($FFFF8004).w
; $01480E
	rts
; $014810
	btst	#7,($FFFF8179).w
; $014816
	beq.w	loc_014832
; $01481A
	move.b	#$00,($FFFFA6F8).w
; $014820
	moveq	#12,d1
; $014822
	move.b	#$81,d2
; $014826
	jsr	($00899A).l
; $01482C
	jsr	($008608).l

loc_014832:				; $014832
	rts
; $014834
	lea	($FF603C).l,a0
; $01483A
	lea	($05EDDC).l,a1
; $014840
	moveq	#19,d0

loc_014842:				; $014842
	move.l	a0,($FFFFA8D0).w
; $014846
	moveq	#7,d1
; $014848
	moveq	#-1,d2
; $01484A
	lea	($FFFFAA00).l,a3

loc_014850:				; $014850
	move.w	d2,(a3)+
; $014852
	dbf	d1,loc_014850
; $014856
	move.l	a0,($FFFFA9FC).l
; $01485C
	lea	($FFFFAA00).l,a3
; $014862
	moveq	#0,d1
; $014864
	move.b	$1(a0),d1
; $014868
	move.w	d1,(a3)+
; $01486A
	moveq	#0,d1
; $01486C
	move.b	$0(a0),d1
; $014870
	cmpi.b	#$2E,$A(a0)
; $014876
	beq.w	loc_014B28
; $01487A
	mulu.w	#$001C,d1
; $01487E
	move.b	($14,a1,d1.w),d2
; $014882
	rol.b	#3,d2
; $014884
	cmp.b	$2F(a0),d2
; $014888
	bhi.w	loc_014D4A
; $01488C
	sub.b	d2,$2F(a0)
; $014890
	addq.b	#1,$2E(a0)
; $014894
	moveq	#0,d2
; $014896
	move.b	$2E(a0),d2
; $01489A
	moveq	#0,d3
; $01489C
	move.b	($B,a1,d1.w),d3
; $0148A0
	bsr.w	loc_014B0C
; $0148A4
	move.b	$3A(a0),d3
; $0148A8
	add.b	d4,d3
; $0148AA
	cmpi.b	#$64,d3
; $0148AE
	bmi.w	loc_0148BE
; $0148B2
	moveq	#99,d4
; $0148B4
	moveq	#0,d3
; $0148B6
	move.b	$3A(a0),d3
; $0148BA
	sub.w	d3,d4
; $0148BC
	moveq	#99,d3

loc_0148BE:				; $0148BE
	move.b	d3,$3A(a0)
; $0148C2
	move.w	d4,(a3)+
; $0148C4
	moveq	#0,d3
; $0148C6
	move.b	($C,a1,d1.w),d3
; $0148CA
	bsr.w	loc_014B0C
; $0148CE
	move.b	$3B(a0),d3
; $0148D2
	add.b	d4,d3
; $0148D4
	cmpi.b	#$64,d3
; $0148D8
	bmi.w	loc_0148E8
; $0148DC
	moveq	#99,d4
; $0148DE
	moveq	#0,d3
; $0148E0
	move.b	$3B(a0),d3
; $0148E4
	sub.w	d3,d4
; $0148E6
	moveq	#99,d3

loc_0148E8:				; $0148E8
	move.b	d3,$3B(a0)
; $0148EC
	move.w	d4,(a3)+
; $0148EE
	moveq	#0,d3
; $0148F0
	move.b	($A,a1,d1.w),d3
; $0148F4
	bsr.w	loc_014B0C
; $0148F8
	moveq	#0,d5
; $0148FA
	move.b	$1(a0),d5
; $0148FE
	cmpi.w	#$000B,d5
; $014902
	bhi.w	loc_01494E
; $014906
	bne.w	loc_01490E
; $01490A
	move.w	#$0004,d5

loc_01490E:				; $01490E
	subq.w	#1,d5
; $014910
	rol.w	#3,d5
; $014912
	move.w	d5,d6
; $014914
	add.w	d6,d6
; $014916
	add.w	d5,d6
; $014918
	lea	($FFFFA4CC).w,a4
; $01491C
	move.b	($1,a4,d6.w),d3
; $014920
	add.b	d4,d3
; $014922
	cmpi.b	#$64,d3
; $014926
	bmi.w	loc_014936
; $01492A
	moveq	#99,d4
; $01492C
	moveq	#0,d3
; $01492E
	move.b	($1,a4,d6.w),d3
; $014932
	sub.w	d3,d4
; $014934
	moveq	#99,d3

loc_014936:				; $014936
	move.b	d3,($1,a4,d6.w)
; $01493A
	move.b	$39(a0),d3
; $01493E
	add.b	d4,d3
; $014940
	cmpi.b	#$64,d3
; $014944
	bmi.w	loc_014968
; $014948
	moveq	#99,d3
; $01494A
	bra.w	loc_014968

loc_01494E:				; $01494E
	move.b	$39(a0),d3
; $014952
	add.b	d4,d3
; $014954
	cmpi.b	#$64,d3
; $014958
	bmi.w	loc_014968
; $01495C
	moveq	#99,d4
; $01495E
	moveq	#0,d3
; $014960
	move.b	$39(a0),d3
; $014964
	sub.w	d3,d4
; $014966
	moveq	#99,d3

loc_014968:				; $014968
	move.b	d3,$39(a0)
; $01496C
	move.w	d4,(a3)+
; $01496E
	moveq	#3,d3

loc_014970:				; $014970
	moveq	#0,d4
; $014972
	move.b	($16,a1,d1.w),d4
; $014976
	bmi.w	loc_0149AE
; $01497A
	lea	($0829CC).l,a4
; $014980
	move.w	d4,d5
; $014982
	add.w	d5,d5
; $014984
	cmp.w	($0,a4,d5.w),d2
; $014988
	bcs.w	loc_0149AE
; $01498C
	lea	($0829FA).l,a4
; $014992
	add.w	d5,d5
; $014994
	move.l	($0,a4,d5.w),d5
; $014998
	move.l	d5,d6
; $01499A
	and.l	$50(a0),d5
; $01499E
	bne.w	loc_0149AE
; $0149A2
	ori.b	#$01,d6
; $0149A6
	or.l	d6,$50(a0)
; $0149AA
	move.w	d4,(a3)+
; $0149AC
	addq.w	#1,d4

loc_0149AE:				; $0149AE
	adda.w	#$0001,a1
; $0149B2
	dbf	d3,loc_014970
; $0149B6
	move.l	a0,($FFFFA8D0).w
; $0149BA
	jsr	($011972).l
; $0149C0
	beq.w	loc_0149F4
; $0149C4
	moveq	#0,d0
; $0149C6
	move.b	$6(a0),d0
; $0149CA
	pea	d0
; $0149CC
	move.b	$7(a0),d0
; $0149D0
	move.l	d0,($FFFFA6EE).w
; $0149D4
	move.b	#$01,($FFFFA6F9).w
; $0149DA
	move.l	#$000149EE,($FFFF8004).w
; $0149E2
	move.l	#$0000FFBA,d0
; $0149E8
	jmp	($0085EE).l
; $0149EE
	move.b	#$00,($FFFFA6F9).w

loc_0149F4:				; $0149F4
	lea	($FFFFAA34).w,a1
; $0149F8
	lea	($082A92).l,a2
; $0149FE
	movea.l	($FFFFA9FC).l,a0
; $014A04
	moveq	#0,d0
; $014A06
	move.b	$5F(a0),d0
; $014A0A
	move.w	d0,($FFFFAA2E).w
; $014A0E
	lea	($FFFFAA00).l,a0
; $014A14
	move.w	#$FFF7,(a1)+
; $014A18
	move.w	(a0)+,(a1)+
; $014A1A
	moveq	#0,d0
; $014A1C
	bsr.w	loc_014AEA
; $014A20
	move.w	#$FFFE,(a1)+
; $014A24
	moveq	#1,d0
; $014A26
	bsr.w	loc_014AEA
; $014A2A
	move.w	#$FFFE,(a1)+
; $014A2E
	move.w	(a0)+,d1
; $014A30
	beq.w	loc_014A46
; $014A34
	moveq	#2,d0
; $014A36
	bsr.w	loc_014AEA
; $014A3A
	addq.w	#4,d1
; $014A3C
	move.w	d1,d0
; $014A3E
	bsr.w	loc_014AEA
; $014A42
	move.w	#$FFFE,(a1)+

loc_014A46:				; $014A46
	move.w	(a0)+,d1
; $014A48
	beq.w	loc_014A5E
; $014A4C
	moveq	#3,d0
; $014A4E
	bsr.w	loc_014AEA
; $014A52
	addq.w	#4,d1
; $014A54
	move.w	d1,d0
; $014A56
	bsr.w	loc_014AEA
; $014A5A
	move.w	#$FFFE,(a1)+

loc_014A5E:				; $014A5E
	move.w	(a0)+,d1
; $014A60
	beq.w	loc_014A76
; $014A64
	moveq	#4,d0
; $014A66
	bsr.w	loc_014AEA
; $014A6A
	addq.w	#4,d1
; $014A6C
	move.w	d1,d0
; $014A6E
	bsr.w	loc_014AEA
; $014A72
	move.w	#$FFFE,(a1)+

loc_014A76:				; $014A76
	moveq	#3,d2

loc_014A78:				; $014A78
	move.w	(a0)+,d0
; $014A7A
	bmi.w	loc_014A9C
; $014A7E
	lea	($082BA2).l,a2
; $014A84
	bsr.w	loc_014AEA
; $014A88
	moveq	#7,d0
; $014A8A
	lea	($082A92).l,a2
; $014A90
	bsr.w	loc_014AEA
; $014A94
	move.w	#$FFFE,(a1)+
; $014A98
	dbf	d2,loc_014A78

loc_014A9C:				; $014A9C
	move.w	#$FFFF,-(a1)
; $014AA0
	move.l	#$00014ACE,($FFFF8004).w
; $014AA8
	move.l	#$0000DA8A,d0
; $014AAE
	jsr	($0085EE).l
; $014AB4
	move.l	#$0002B3AA,d0
; $014ABA
	jsr	($0085EE).l
; $014AC0
	move.l	#$0000DA50,d0
; $014AC6
	jsr	($0085EE).l
; $014ACC
	rts
; $014ACE
	jsr	($0108E2).l
; $014AD4
	jsr	($010136).l
; $014ADA
	jsr	($010080).l
; $014AE0
	move.l	#$00014834,($FFFF8004).w
; $014AE8
	rts

loc_014AEA:				; $014AEA
	movem.l	a7/d4,-(a7)
; $014AEE
	add.w	d0,d0
; $014AF0
	add.w	d0,d0
; $014AF2
	movea.l	($0,a2,d0.w),a3

loc_014AF6:				; $014AF6
	move.w	(a3)+,d0
; $014AF8
	cmpi.w	#$FFFF,d0
; $014AFC
	beq.w	loc_014B06
; $014B00
	move.w	d0,(a1)+
; $014B02
	bra.w	loc_014AF6

loc_014B06:				; $014B06
	movem.l	(a7)+,d4/a7
; $014B0A
	rts

loc_014B0C:				; $014B0C
	lea	($082922).l,a2
; $014B12
	add.w	d3,d3
; $014B14
	move.w	d3,d4
; $014B16
	add.w	d3,d3
; $014B18
	add.w	d3,d3
; $014B1A
	add.w	d4,d3
; $014B1C
	add.w	d2,d3
; $014B1E
	subq.w	#1,d3
; $014B20
	moveq	#0,d4
; $014B22
	move.b	($0,a2,d3.w),d4
; $014B26
	rts

loc_014B28:				; $014B28
	btst	#5,$8(a0)
; $014B2E
	bne.w	loc_014D4A
; $014B32
	moveq	#0,d1
; $014B34
	move.b	$1(a0),d1
; $014B38
	cmpi.w	#$000B,d1
; $014B3C
	bhi.w	loc_014D4A
; $014B40
	bne.w	loc_014B48
; $014B44
	move.w	#$0004,d1

loc_014B48:				; $014B48
	move.b	$5C(a0),d2
; $014B4C
	bne.w	loc_014B54
; $014B50
	move.b	$20(a0),d2

loc_014B54:				; $014B54
	btst	#0,d2
; $014B58
	beq.w	loc_014D4A
; $014B5C
	subq.w	#1,d1
; $014B5E
	add.w	d1,d1
; $014B60
	add.w	d1,d1
; $014B62
	lea	($08253A).l,a2
; $014B68
	movea.l	($0,a2,d1.w),a2
; $014B6C
	moveq	#0,d2
; $014B6E
	move.b	$0(a0),d2
; $014B72
	cmpi.b	#$0B,$1A(a0)
; $014B78
	bne.w	loc_014B82
; $014B7C
	bsr.w	loc_014D5A
; $014B80
	move.w	(a2),d2

loc_014B82:				; $014B82
	move.w	(a2)+,d3
; $014B84
	cmpi.w	#$FFFF,d3
; $014B88
	beq.w	loc_014D4A
; $014B8C
	cmp.w	d2,d3
; $014B8E
	bne.w	loc_014D42
; $014B92
	move.w	(a2)+,(a3)+
; $014B94
	move.w	(a2)+,(a3)+
; $014B96
	move.w	(a2)+,(a3)+
; $014B98
	move.l	a0,($FFFFA8D0).w
; $014B9C
	jsr	($011972).l
; $014BA2
	beq.w	loc_014BD6
; $014BA6
	moveq	#0,d0
; $014BA8
	move.b	$6(a0),d0
; $014BAC
	pea	d0
; $014BAE
	move.b	$7(a0),d0
; $014BB2
	move.l	d0,($FFFFA6EE).w
; $014BB6
	move.b	#$01,($FFFFA6F9).w
; $014BBC
	move.l	#$00014BD0,($FFFF8004).w
; $014BC4
	move.l	#$0000FFBA,d0
; $014BCA
	jmp	($0085EE).l
; $014BD0
	move.b	#$00,($FFFFA6F9).w

loc_014BD6:				; $014BD6
	movea.l	($FFFF81C4).w,a2
; $014BDA
	move.w	#$BD00,d3
; $014BDE
	movea.l	($FFFFA9FC).l,a1
; $014BE4
	lea	($FFFFAA02).l,a0
; $014BEA
	moveq	#2,d2

loc_014BEC:				; $014BEC
	move.w	(a0)+,d1
; $014BEE
	cmpi.w	#$FFFF,d1
; $014BF2
	beq.w	loc_014C10
; $014BF6
	jsr	($011580).l
; $014BFC
	rol.l	#7,d1
; $014BFE
	move.w	#$FFF9,(a2)+
; $014C02
	move.w	d3,(a2)+
; $014C04
	addi.l	#$00052980,d1
; $014C0A
	move.l	d1,(a2)+
; $014C0C
	move.w	#$0040,(a2)+

loc_014C10:				; $014C10
	addi.w	#$0080,d3
; $014C14
	dbf	d2,loc_014BEC
; $014C18
	move.l	a2,($FFFF81C4).w
; $014C1C
	move.l	#$00014C4A,($FFFF8004).w
; $014C24
	move.l	#$0000DA8A,d0
; $014C2A
	jsr	($0085EE).l
; $014C30
	move.l	#$0002BBD4,d0
; $014C36
	jsr	($0085EE).l
; $014C3C
	move.l	#$0000DA50,d0
; $014C42
	jsr	($0085EE).l
; $014C48
	rts
; $014C4A
	lea	($FFFFAA00).l,a0
; $014C50
	move.w	(a0)+,d0
; $014C52
	add.w	d0,d0
; $014C54
	move.w	($0,a0,d0.w),d0
; $014C58
	movea.l	($FFFFA9FC).l,a0
; $014C5E
	move.b	d0,$0(a0)
; $014C62
	move.b	#$01,$2E(a0)
; $014C68
	lea	($05EDDC).l,a1
; $014C6E
	mulu.w	#$001C,d0
; $014C72
	move.b	($D,a1,d0.w),$44(a0)
; $014C78
	move.b	($E,a1,d0.w),$45(a0)
; $014C7E
	move.b	($F,a1,d0.w),$46(a0)
; $014C84
	move.b	($10,a1,d0.w),$47(a0)
; $014C8A
	move.b	($13,a1,d0.w),$50(a0)
; $014C90
	moveq	#0,d1
; $014C92
	move.b	($1A,a1,d0.w),d1
; $014C96
	moveq	#0,d2
; $014C98
	move.b	($1B,a1,d0.w),d2
; $014C9C
	moveq	#0,d3
; $014C9E
	move.b	$1(a0),d3
; $014CA2
	cmpi.w	#$000B,d3
; $014CA6
	bne.w	loc_014CAE
; $014CAA
	move.w	#$0004,d3

loc_014CAE:				; $014CAE
	subq.w	#1,d3
; $014CB0
	rol.w	#3,d3
; $014CB2
	move.w	d3,d4
; $014CB4
	add.w	d3,d3
; $014CB6
	add.w	d4,d3
; $014CB8
	lea	($FFFFA4CC).w,a1
; $014CBC
	move.w	($A,a1,d3.w),d4
; $014CC0
	cmpi.w	#$FFFF,d1
; $014CC4
	beq.w	loc_014CCA
; $014CC8
	bchg	d1,d4

loc_014CCA:				; $014CCA
	cmpi.w	#$FFFF,d2
; $014CCE
	beq.w	loc_014CD4
; $014CD2
	bchg	d2,d4

loc_014CD4:				; $014CD4
	move.w	d4,($A,a1,d3.w)
; $014CD8
	move.b	($16,a1,d3.w),d0
; $014CDC
	add.b	d0,$46(a0)
; $014CE0
	lea	($082A56).l,a1
; $014CE6
	moveq	#0,d0
; $014CE8
	move.b	$1(a0),d0
; $014CEC
	cmpi.w	#$000B,d0
; $014CF0
	bne.w	loc_014CF8
; $014CF4
	move.w	#$0004,d0

loc_014CF8:				; $014CF8
	subq.w	#1,d0
; $014CFA
	add.w	d0,d0
; $014CFC
	move.w	d0,d1
; $014CFE
	add.w	d0,d0
; $014D00
	add.w	d1,d0
; $014D02
	move.b	($3,a1,d0.w),d1
; $014D06
	add.b	d1,$46(a0)
; $014D0A
	move.b	($4,a1,d0.w),d1
; $014D0E
	add.b	d1,$47(a0)
; $014D12
	move.b	($5,a1,d0.w),d1
; $014D16
	add.b	d1,$44(a0)
; $014D1A
	jsr	($011208).l
; $014D20
	jsr	($00A6EA).l
; $014D26
	jsr	($0108E2).l
; $014D2C
	jsr	($010136).l
; $014D32
	jsr	($010080).l
; $014D38
	move.l	#$00014834,($FFFF8004).w
; $014D40
	rts

loc_014D42:				; $014D42
	adda.w	#$0006,a2
; $014D46
	bra.w	loc_014B82

loc_014D4A:				; $014D4A
	adda.w	#$0060,a0
; $014D4E
	dbf	d0,loc_014842
; $014D52
	jsr	($008608).l
; $014D58
	rts

loc_014D5A:				; $014D5A
	movem.l	a7/a6/d6,-(a7)
; $014D5E
	move.b	#$00,$B(a0)
; $014D64
	lea	($FFFFC7F2).w,a1
; $014D68
	moveq	#0,d0
; $014D6A
	move.b	$1(a0),d0
; $014D6E
	addi.w	#$1A00,d0
; $014D72
	moveq	#39,d1

loc_014D74:				; $014D74
	cmp.w	(a1)+,d0
; $014D76
	beq.w	loc_014D82
; $014D7A
	dbf	d1,loc_014D74
; $014D7E
	bra.w	loc_014D86

loc_014D82:				; $014D82
	move.w	#$FFFF,-(a1)

loc_014D86:				; $014D86
	movem.l	(a7)+,d6/a6/a7
; $014D8A
	rts

loc_014D8C:				; $014D8C
	movem.l	a7/d7,-(a7)
; $014D90
	lea	($FFFFA5F2).w,a0
; $014D94
	moveq	#29,d0

loc_014D96:				; $014D96
	clr.b	(a0)+
; $014D98
	dbf	d0,loc_014D96
; $014D9C
	clr.b	($FFFFAA10).l
; $014DA2
	lea	($FFFFAE50).l,a0
; $014DA8
	move.l	a0,($FFFFAE4C).l
; $014DAE
	moveq	#5,d0

loc_014DB0:				; $014DB0
	move.w	#$FFFF,(a0)+
; $014DB4
	dbf	d0,loc_014DB0
; $014DB8
	movem.l	(a7)+,d7/a7
; $014DBC
	rts
; $014DBE
	moveq	#12,d1
; $014DC0
	jsr	($0089C4).l
; $014DC6
	move.w	d0,($FFFFAE40).l
; $014DCC
	move.l	#$00014DD4,($FFFF8004).w
; $014DD4
	tst.b	($FFFFAA11).l
; $014DDA
	beq.w	loc_014E3E
; $014DDE
	clr.l	($FFFFAA16).l
; $014DE4
	move.w	($FFFFA49C).w,d0
; $014DE8
	subq.w	#1,d0
; $014DEA
	add.w	d0,d0
; $014DEC
	add.w	d0,d0
; $014DEE
	lea	($18011A).l,a0
; $014DF4
	movea.l	($0,a0,d0.w),a0
; $014DF8
	move.b	($FFFFAA11).l,d0
; $014DFE
	btst	#7,d0
; $014E02
	bne.w	loc_014E54
; $014E06
	btst	#6,d0
; $014E0A
	bne.w	loc_015678
; $014E0E
	btst	#0,d0
; $014E12
	bne.w	loc_014E96
; $014E16
	btst	#1,d0
; $014E1A
	bne.w	loc_014F70
; $014E1E
	btst	#2,d0
; $014E22
	bne.w	loc_0150B0
; $014E26
	btst	#5,d0
; $014E2A
	bne.w	loc_01521E
; $014E2E
	btst	#3,d0
; $014E32
	bne.w	loc_01531E
; $014E36
	btst	#4,d0
; $014E3A
	bne.w	loc_0155DE

loc_014E3E:				; $014E3E
	moveq	#12,d1
; $014E40
	move.w	($FFFFAE40).l,d2
; $014E46
	jsr	($00899A).l
; $014E4C
	jsr	($008608).l
; $014E52
	rts

loc_014E54:				; $014E54
	movea.l	$14(a0),a0
; $014E58
	move.l	a0,($FFFFAA12).l
; $014E5E
	movea.l	(a0),a0
; $014E60
	move.l	#$00014E84,($FFFFAA20).l
; $014E6A
	move.l	a0,($FFFFAA28).l
; $014E70
	move.l	#$FFFFAE5C,($FFFFAA1A).l
; $014E7A
	clr.w	($FFFFAA1E).l
; $014E80
	bra.w	loc_015824
; $014E84
	bset	#7,($FFFFAA11).l
; $014E8C
	move.l	#$00014DD4,($FFFF8004).w
; $014E94
	rts

loc_014E96:				; $014E96
	movea.l	(a0),a0

loc_014E98:				; $014E98
	tst.b	($FFFFAA10).l
; $014E9E
	bne.w	loc_014F5E
; $014EA2
	move.l	a0,($FFFFAA12).l
; $014EA8
	move.b	(a0),d0
; $014EAA
	cmpi.b	#$FF,d0
; $014EAE
	beq.w	loc_014F5E
; $014EB2
	lea	($FFFFA5F2).w,a1

loc_014EB6:				; $014EB6
	cmpi.b	#$08,d0
; $014EBA
	bcs.w	loc_014EC6
; $014EBE
	addq.w	#1,a1
; $014EC0
	subq.b	#8,d0
; $014EC2
	bra.w	loc_014EB6

loc_014EC6:				; $014EC6
	btst	d0,(a1)
; $014EC8
	bne.w	loc_014F50
; $014ECC
	movea.l	($FFFFA628).w,a2
; $014ED0
	move.b	$1(a0),d1
; $014ED4
	cmpi.b	#$FF,d1
; $014ED8
	beq.w	loc_014EF6
; $014EDC
	cmp.b	$1(a2),d1
; $014EE0
	bne.w	loc_014F50
; $014EE4
	moveq	#0,d1
; $014EE6
	move.b	$2(a0),d1
; $014EEA
	beq.w	loc_014EF6
; $014EEE
	cmp.w	($FFFFA5F0).w,d1
; $014EF2
	bne.w	loc_014F50

loc_014EF6:				; $014EF6
	move.l	a2,($FFFFAA16).l
; $014EFC
	movea.l	$4(a0),a0
; $014F00
	move.l	a1,($FFFFAA1A).l
; $014F06
	move.w	d0,($FFFFAA1E).l
; $014F0C
	move.l	#$00014F50,($FFFFAA20).l
; $014F16
	move.l	a0,($FFFFAA28).l
; $014F1C
	moveq	#0,d1
; $014F1E
	move.b	$6(a2),d1
; $014F22
	pea	d1
; $014F24
	move.b	$7(a2),d1
; $014F28
	move.l	d1,($FFFFA6EE).w
; $014F2C
	move.b	#$01,($FFFFA6F9).w
; $014F32
	move.l	#$00014F46,($FFFF8004).w
; $014F3A
	move.l	#$0000FFBA,d0
; $014F40
	jmp	($0085EE).l
; $014F46
	move.b	#$00,($FFFFA6F9).w
; $014F4C
	bra.w	loc_015824

loc_014F50:				; $014F50
	movea.l	($FFFFAA12).l,a0
; $014F56
	adda.w	#$0008,a0
; $014F5A
	bra.w	loc_014E98

loc_014F5E:				; $014F5E
	bset	#0,($FFFFAA11).l
; $014F66
	move.l	#$00014DD4,($FFFF8004).w
; $014F6E
	rts

loc_014F70:				; $014F70
	lea	($FFFFAE34).l,a1
; $014F76
	movea.l	($FFFFA6F2).w,a2
; $014F7A
	move.w	$1A(a2),(a1)+
; $014F7E
	move.l	$16(a2),(a1)+
; $014F82
	move.w	$1C(a2),(a1)+
; $014F86
	move.l	($FFFFA6DE).w,(a1)+
; $014F8A
	movea.l	$4(a0),a0

loc_014F8E:				; $014F8E
	tst.b	($FFFFAA10).l
; $014F94
	bne.w	loc_01505A
; $014F98
	move.l	a0,($FFFFAA12).l
; $014F9E
	move.b	(a0),d0
; $014FA0
	cmpi.b	#$FF,d0
; $014FA4
	beq.w	loc_01505A
; $014FA8
	lea	($FFFFA5F2).w,a1

loc_014FAC:				; $014FAC
	cmpi.b	#$08,d0
; $014FB0
	bcs.w	loc_014FBC
; $014FB4
	addq.w	#1,a1
; $014FB6
	subq.b	#8,d0
; $014FB8
	bra.w	loc_014FAC

loc_014FBC:				; $014FBC
	btst	d0,(a1)
; $014FBE
	bne.w	loc_01504C
; $014FC2
	movea.l	($FFFFA628).w,a2
; $014FC6
	movea.l	($FFFFA630).w,a3
; $014FCA
	move.b	$1(a0),d1
; $014FCE
	cmpi.b	#$FF,d1
; $014FD2
	beq.w	loc_014FF4
; $014FD6
	cmpi.b	#$02,$FF(a0)
; $014FDC
	beq.w	loc_014FEC
; $014FE0
	cmp.b	$1(a2),d1
; $014FE4
	bne.w	loc_01504C
; $014FE8
	bra.w	loc_014FF4

loc_014FEC:				; $014FEC
	cmp.b	$1(a2),d1
; $014FF0
	beq.w	loc_01504C

loc_014FF4:				; $014FF4
	move.b	$3(a0),d1
; $014FF8
	cmpi.b	#$FF,d1
; $014FFC
	beq.w	loc_015028
; $015000
	cmpi.b	#$04,$FF(a0)
; $015006
	beq.w	loc_015020
; $01500A
	cmpa.l	#$00000000,a3
; $015010
	beq.w	loc_01504C
; $015014
	cmp.b	$1(a3),d1
; $015018
	bne.w	loc_01504C
; $01501C
	bra.w	loc_015028

loc_015020:				; $015020
	cmp.b	$1(a3),d1
; $015024
	beq.w	loc_01504C

loc_015028:				; $015028
	movea.l	$6(a0),a0
; $01502C
	move.l	a1,($FFFFAA1A).l
; $015032
	move.w	d0,($FFFFAA1E).l
; $015038
	move.l	#$0001504C,($FFFFAA20).l
; $015042
	move.l	a0,($FFFFAA28).l
; $015048
	bra.w	loc_015824

loc_01504C:				; $01504C
	movea.l	($FFFFAA12).l,a0
; $015052
	adda.w	#$000A,a0
; $015056
	bra.w	loc_014F8E

loc_01505A:				; $01505A
	lea	($FFFFAE3C).l,a1
; $015060
	movea.l	($FFFFA6F2).w,a0
; $015064
	move.l	(a1),($FFFFA6EE).w
; $015068
	move.b	#$01,($FFFFA6F9).w
; $01506E
	move.l	#$00015082,($FFFF8004).w
; $015076
	move.l	#$0000FFBA,d0
; $01507C
	jmp	($0085EE).l
; $015082
	move.b	#$00,($FFFFA6F9).w
; $015088
	lea	($FFFFAE34).l,a1
; $01508E
	movea.l	($FFFFA6F2).w,a0
; $015092
	move.w	(a1)+,$1A(a0)
; $015096
	move.l	(a1)+,$16(a0)
; $01509A
	move.w	(a1)+,$1C(a0)
; $01509E
	bset	#1,($FFFFAA11).l
; $0150A6
	move.l	#$00014DD4,($FFFF8004).w
; $0150AE
	rts

loc_0150B0:				; $0150B0
	movea.l	$8(a0),a0

loc_0150B4:				; $0150B4
	tst.b	($FFFFAA10).l
; $0150BA
	bne.w	loc_01520C
; $0150BE
	move.l	a0,($FFFFAA12).l
; $0150C4
	move.b	(a0),d0
; $0150C6
	cmpi.b	#$FF,d0
; $0150CA
	beq.w	loc_01520C
; $0150CE
	lea	($FFFFA5F2).w,a1

loc_0150D2:				; $0150D2
	cmpi.b	#$08,d0
; $0150D6
	bcs.w	loc_0150E2
; $0150DA
	addq.w	#1,a1
; $0150DC
	subq.b	#8,d0
; $0150DE
	bra.w	loc_0150D2

loc_0150E2:				; $0150E2
	btst	d0,(a1)
; $0150E4
	bne.w	loc_0151EA
; $0150E8
	moveq	#0,d5
; $0150EA
	moveq	#0,d3
; $0150EC
	move.b	$1(a0),d3
; $0150F0
	cmpi.b	#$FF,d3
; $0150F4
	beq.w	loc_015160
; $0150F8
	subq.w	#1,d3
; $0150FA
	moveq	#2,d4

loc_0150FC:				; $0150FC
	move.b	($0,a0,d4.w),d1
; $015100
	beq.w	loc_01514A
; $015104
	moveq	#19,d2
; $015106
	lea	($FF603C).l,a2

loc_01510C:				; $01510C
	cmp.b	$1(a2),d1
; $015110
	beq.w	loc_015120
; $015114
	adda.w	#$0060,a2
; $015118
	dbf	d2,loc_01510C
; $01511C
	bra.w	loc_0151EA

loc_015120:				; $015120
	btst	#7,$2(a2)
; $015126
	bne.w	loc_015142
; $01512A
	btst	#7,$8(a2)
; $015130
	bne.w	loc_015144
; $015134
	tst.b	$3(a2)
; $015138
	bne.w	loc_0151EA
; $01513C
	move.l	a2,($FFFFAA16).l

loc_015142:				; $015142
	addq.w	#1,d5

loc_015144:				; $015144
	addq.w	#1,d4
; $015146
	dbf	d3,loc_0150FC

loc_01514A:				; $01514A
	tst.w	d5
; $01514C
	beq.w	loc_0151EA
; $015150
	moveq	#0,d1
; $015152
	move.b	$1(a0),d1
; $015156
	addq.w	#2,d1
; $015158
	movea.l	($0,a0,d1.w),a0
; $01515C
	bra.w	loc_0151CA

loc_015160:				; $015160
	movea.l	($FFFFA628).w,a2
; $015164
	movea.l	($FFFFA630).w,a3
; $015168
	move.b	$2(a0),d1
; $01516C
	cmpi.b	#$FF,d1
; $015170
	beq.w	loc_015192
; $015174
	cmpi.b	#$03,$FF(a0)
; $01517A
	beq.w	loc_01518A
; $01517E
	cmp.b	$1(a2),d1
; $015182
	bne.w	loc_0151EA
; $015186
	bra.w	loc_015192

loc_01518A:				; $01518A
	cmp.b	$1(a2),d1
; $01518E
	beq.w	loc_0151EA

loc_015192:				; $015192
	move.b	$4(a0),d1
; $015196
	cmpi.b	#$FF,d1
; $01519A
	beq.w	loc_0151C6
; $01519E
	cmpi.b	#$05,$FF(a0)
; $0151A4
	beq.w	loc_0151BE
; $0151A8
	cmpa.l	#$00000000,a3
; $0151AE
	beq.w	loc_0151EA
; $0151B2
	cmp.b	$1(a3),d1
; $0151B6
	bne.w	loc_0151EA
; $0151BA
	bra.w	loc_0151C6

loc_0151BE:				; $0151BE
	cmp.b	$1(a3),d1
; $0151C2
	beq.w	loc_0151EA

loc_0151C6:				; $0151C6
	movea.l	$6(a0),a0

loc_0151CA:				; $0151CA
	move.l	a1,($FFFFAA1A).l
; $0151D0
	move.w	d0,($FFFFAA1E).l
; $0151D6
	move.l	#$000151EA,($FFFFAA20).l
; $0151E0
	move.l	a0,($FFFFAA28).l
; $0151E6
	bra.w	loc_015824

loc_0151EA:				; $0151EA
	movea.l	($FFFFAA12).l,a0
; $0151F0
	moveq	#10,d0
; $0151F2
	cmpi.b	#$01,$FF(a0)
; $0151F8
	beq.w	loc_015206
; $0151FC
	moveq	#0,d1
; $0151FE
	move.b	$1(a0),d1
; $015202
	add.w	d1,d0
; $015204
	subq.w	#4,d0

loc_015206:				; $015206
	adda.w	d0,a0
; $015208
	bra.w	loc_0150B4

loc_01520C:				; $01520C
	bset	#2,($FFFFAA11).l
; $015214
	move.l	#$00014DD4,($FFFF8004).w
; $01521C
	rts

loc_01521E:				; $01521E
	movea.l	$8(a0),a0

loc_015222:				; $015222
	tst.b	($FFFFAA10).l
; $015228
	bne.w	loc_01530C
; $01522C
	move.l	a0,($FFFFAA12).l
; $015232
	move.b	(a0),d0
; $015234
	cmpi.b	#$FF,d0
; $015238
	beq.w	loc_01530C
; $01523C
	lea	($FFFFA5F2).w,a1

loc_015240:				; $015240
	cmpi.b	#$08,d0
; $015244
	bcs.w	loc_015250
; $015248
	addq.w	#1,a1
; $01524A
	subq.b	#8,d0
; $01524C
	bra.w	loc_015240

loc_015250:				; $015250
	btst	d0,(a1)
; $015252
	bne.w	loc_0152EA
; $015256
	moveq	#0,d5
; $015258
	moveq	#0,d3
; $01525A
	move.b	$1(a0),d3
; $01525E
	cmpi.b	#$FF,d3
; $015262
	beq.w	loc_0152EA
; $015266
	subq.w	#1,d3
; $015268
	moveq	#2,d4

loc_01526A:				; $01526A
	move.b	($0,a0,d4.w),d1
; $01526E
	beq.w	loc_0152B8
; $015272
	moveq	#19,d2
; $015274
	lea	($FF603C).l,a2

loc_01527A:				; $01527A
	cmp.b	$1(a2),d1
; $01527E
	beq.w	loc_01528E
; $015282
	adda.w	#$0060,a2
; $015286
	dbf	d2,loc_01527A
; $01528A
	bra.w	loc_0152EA

loc_01528E:				; $01528E
	btst	#7,$2(a2)
; $015294
	bne.w	loc_0152B0
; $015298
	btst	#7,$8(a2)
; $01529E
	bne.w	loc_0152B2
; $0152A2
	tst.b	$3(a2)
; $0152A6
	bne.w	loc_0152EA
; $0152AA
	move.l	a2,($FFFFAA16).l

loc_0152B0:				; $0152B0
	addq.w	#1,d5

loc_0152B2:				; $0152B2
	addq.w	#1,d4
; $0152B4
	dbf	d3,loc_01526A

loc_0152B8:				; $0152B8
	tst.w	d5
; $0152BA
	beq.w	loc_0152EA
; $0152BE
	moveq	#0,d1
; $0152C0
	move.b	$1(a0),d1
; $0152C4
	addq.w	#2,d1
; $0152C6
	movea.l	($0,a0,d1.w),a0
; $0152CA
	move.l	a1,($FFFFAA1A).l
; $0152D0
	move.w	d0,($FFFFAA1E).l
; $0152D6
	move.l	#$000152EA,($FFFFAA20).l
; $0152E0
	move.l	a0,($FFFFAA28).l
; $0152E6
	bra.w	loc_015824

loc_0152EA:				; $0152EA
	movea.l	($FFFFAA12).l,a0
; $0152F0
	moveq	#10,d0
; $0152F2
	cmpi.b	#$01,$FF(a0)
; $0152F8
	beq.w	loc_015306
; $0152FC
	moveq	#0,d1
; $0152FE
	move.b	$1(a0),d1
; $015302
	add.w	d1,d0
; $015304
	subq.w	#4,d0

loc_015306:				; $015306
	adda.w	d0,a0
; $015308
	bra.w	loc_015222

loc_01530C:				; $01530C
	bset	#5,($FFFFAA11).l
; $015314
	move.l	#$00014DD4,($FFFF8004).w
; $01531C
	rts

loc_01531E:				; $01531E
	movea.l	$C(a0),a0

loc_015322:				; $015322
	tst.b	($FFFFAA10).l
; $015328
	bne.w	loc_015566
; $01532C
	move.l	a0,($FFFFAA12).l
; $015332
	move.b	(a0),d0
; $015334
	cmpi.b	#$FF,d0
; $015338
	beq.w	loc_015566
; $01533C
	lea	($FFFFA5F2).w,a1

loc_015340:				; $015340
	cmpi.b	#$08,d0
; $015344
	bcs.w	loc_015350
; $015348
	addq.w	#1,a1
; $01534A
	subq.b	#8,d0
; $01534C
	bra.w	loc_015340

loc_015350:				; $015350
	btst	d0,(a1)
; $015352
	bne.w	loc_015558
; $015356
	moveq	#19,d2
; $015358
	move.b	$1(a0),d1
; $01535C
	cmpi.b	#$FF,d1
; $015360
	beq.w	loc_01548C
; $015364
	cmpi.b	#$F0,d1
; $015368
	beq.w	loc_015384
; $01536C
	cmpi.b	#$F1,d1
; $015370
	beq.w	loc_015384
; $015374
	cmpi.b	#$F2,d1
; $015378
	beq.w	loc_015384
; $01537C
	cmpi.b	#$F3,d1
; $015380
	bne.w	loc_015462

loc_015384:				; $015384
	moveq	#0,d4
; $015386
	move.b	$4(a0),d4
; $01538A
	moveq	#0,d5
; $01538C
	move.b	$5(a0),d5
; $015390
	moveq	#0,d6
; $015392
	move.b	$6(a0),d6
; $015396
	moveq	#0,d7
; $015398
	move.b	$7(a0),d7
; $01539C
	sub.w	d4,d6
; $01539E
	sub.w	d5,d7
; $0153A0
	lea	($FF4000).l,a2
; $0153A6
	lea	($FF5000).l,a3
; $0153AC
	mulu.w	($FFFF9F2C).w,d5
; $0153B0
	add.w	d4,d5
; $0153B2
	add.w	d5,d5

loc_0153B4:				; $0153B4
	move.w	d5,d3
; $0153B6
	move.w	d6,d4

loc_0153B8:				; $0153B8
	move.b	($0,a2,d3.w),d2
; $0153BC
	andi.b	#$0F,d2
; $0153C0
	cmpi.b	#$F0,d1
; $0153C4
	bne.w	loc_0153E6
; $0153C8
	cmpi.b	#$01,d2
; $0153CC
	bne.w	loc_015404
; $0153D0
	tst.b	($1,a3,d3.w)
; $0153D4
	bne.w	loc_0153E6
; $0153D8
	bsr.w	loc_015578
; $0153DC
	beq.w	loc_0153E6
; $0153E0
	movea.l	a4,a2
; $0153E2
	bra.w	loc_015526

loc_0153E6:				; $0153E6
	cmpi.b	#$F1,d1
; $0153EA
	bne.w	loc_015404
; $0153EE
	cmpi.b	#$01,d2
; $0153F2
	bne.w	loc_015404
; $0153F6
	bsr.w	loc_015578
; $0153FA
	beq.w	loc_015404
; $0153FE
	movea.l	a4,a2
; $015400
	bra.w	loc_015526

loc_015404:				; $015404
	cmpi.b	#$F2,d1
; $015408
	bne.w	loc_01542C
; $01540C
	andi.l	#$0000000C,d2
; $015412
	beq.w	loc_01544C
; $015416
	tst.b	($1,a3,d3.w)
; $01541A
	bne.w	loc_01542C
; $01541E
	bsr.w	loc_015578
; $015422
	beq.w	loc_01542C
; $015426
	movea.l	a4,a2
; $015428
	bra.w	loc_015526

loc_01542C:				; $01542C
	cmpi.b	#$F3,d1
; $015430
	bne.w	loc_01544C
; $015434
	andi.l	#$0000000C,d2
; $01543A
	beq.w	loc_01544C
; $01543E
	bsr.w	loc_015578
; $015442
	beq.w	loc_01544C
; $015446
	movea.l	a4,a2
; $015448
	bra.w	loc_015526

loc_01544C:				; $01544C
	addq.w	#2,d3
; $01544E
	dbf	d4,loc_0153B8
; $015452
	move.w	($FFFF9F2C).w,d3
; $015456
	add.w	d3,d3
; $015458
	add.w	d3,d5
; $01545A
	dbf	d7,loc_0153B4
; $01545E
	bra.w	loc_015558

loc_015462:				; $015462
	lea	($FF603C).l,a2

loc_015468:				; $015468
	cmp.b	$1(a2),d1
; $01546C
	beq.w	loc_01547C
; $015470
	adda.w	#$0060,a2
; $015474
	dbf	d2,loc_015468
; $015478
	bra.w	loc_015558

loc_01547C:				; $01547C
	move.l	a2,($FFFFA8D0).w
; $015480
	jsr	($011972).l
; $015486
	beq.w	loc_015558
; $01548A
	moveq	#0,d2

loc_01548C:				; $01548C
	move.b	$2(a0),d1
; $015490
	beq.w	loc_0154E8
; $015494
	lea	($FF603C).l,a3
; $01549A
	moveq	#19,d2

loc_01549C:				; $01549C
	cmp.b	$1(a3),d1
; $0154A0
	beq.w	loc_0154B0
; $0154A4
	adda.w	#$0060,a3
; $0154A8
	dbf	d2,loc_01549C
; $0154AC
	bra.w	loc_015558

loc_0154B0:				; $0154B0
	move.l	a3,($FFFFA8D0).w
; $0154B4
	jsr	($011972).l
; $0154BA
	beq.w	loc_015558
; $0154BE
	move.b	$6(a3),d2
; $0154C2
	move.b	$7(a3),d3
; $0154C6
	sub.b	$6(a2),d2
; $0154CA
	bpl.w	loc_0154D0
; $0154CE
	neg.b	d2

loc_0154D0:				; $0154D0
	sub.b	$7(a2),d3
; $0154D4
	bpl.w	loc_0154DA
; $0154D8
	neg.b	d3

loc_0154DA:				; $0154DA
	add.b	d3,d2
; $0154DC
	cmp.b	$3(a0),d2
; $0154E0
	bls.w	loc_015526
; $0154E4
	bra.w	loc_015558

loc_0154E8:				; $0154E8
	move.b	$4(a0),d4
; $0154EC
	move.b	$5(a0),d5
; $0154F0
	move.b	$6(a0),d6
; $0154F4
	move.b	$7(a0),d7

loc_0154F8:				; $0154F8
	move.l	a2,($FFFFA8D0).w
; $0154FC
	jsr	($011972).l
; $015502
	beq.w	loc_015550
; $015506
	move.b	$6(a2),d3
; $01550A
	cmp.b	d4,d3
; $01550C
	bcs.w	loc_015550
; $015510
	cmp.b	d6,d3
; $015512
	bhi.w	loc_015550
; $015516
	move.b	$7(a2),d3
; $01551A
	cmp.b	d5,d3
; $01551C
	bcs.w	loc_015550
; $015520
	cmp.b	d7,d3
; $015522
	bhi.w	loc_015550

loc_015526:				; $015526
	move.l	a2,($FFFFAA16).l
; $01552C
	movea.l	$8(a0),a0
; $015530
	move.l	a1,($FFFFAA1A).l
; $015536
	move.w	d0,($FFFFAA1E).l
; $01553C
	move.l	#$00015558,($FFFFAA20).l
; $015546
	move.l	a0,($FFFFAA28).l
; $01554C
	bra.w	loc_015824

loc_015550:				; $015550
	adda.w	#$0060,a2
; $015554
	dbf	d2,loc_0154F8

loc_015558:				; $015558
	movea.l	($FFFFAA12).l,a0
; $01555E
	adda.w	#$000C,a0
; $015562
	bra.w	loc_015322

loc_015566:				; $015566
	bset	#3,($FFFFAA11).l
; $01556E
	move.l	#$00014DD4,($FFFF8004).w
; $015576
	rts

loc_015578:				; $015578
	movem.l	a7/d7/d6,-(a7)
; $01557C
	moveq	#0,d0
; $01557E
	move.b	($0,a3,d3.w),d0
; $015582
	lea	($05E5D8).l,a0
; $015588
	add.w	d0,d0
; $01558A
	add.w	d0,d0
; $01558C
	movea.l	($0,a0,d0.w),a0
; $015590
	movea.l	a0,a4
; $015592
	btst	#7,$8(a0)
; $015598
	bne.w	loc_0155D4
; $01559C
	btst	#7,$2(a0)
; $0155A2
	bne.w	loc_0155D4
; $0155A6
	tst.b	$3(a0)
; $0155AA
	beq.w	loc_0155D4
; $0155AE
	moveq	#0,d0
; $0155B0
	move.b	($1,a3,d3.w),d0
; $0155B4
	lea	($05E628).l,a1
; $0155BA
	add.w	d0,d0
; $0155BC
	add.w	d0,d0
; $0155BE
	adda.l	($0,a1,d0.w),a0
; $0155C2
	btst	#7,$2(a0)
; $0155C8
	bne.w	loc_0155D4
; $0155CC
	andi.b	#$00,#$FB
; $0155D2
	ori.b	#$3C,d6
; $0155D6
	ori.b	#$DF,d4
; $0155DA
	btst	d1,d1
; $0155DC
	rts

loc_0155DE:				; $0155DE
	movea.l	$10(a0),a0

loc_0155E2:				; $0155E2
	tst.b	($FFFFAA10).l
; $0155E8
	bne.w	loc_015666
; $0155EC
	move.l	a0,($FFFFAA12).l
; $0155F2
	move.b	(a0),d0
; $0155F4
	cmpi.b	#$FF,d0
; $0155F8
	beq.w	loc_015666
; $0155FC
	lea	($FFFFA5F2).w,a1

loc_015600:				; $015600
	cmpi.b	#$08,d0
; $015604
	bcs.w	loc_015610
; $015608
	addq.w	#1,a1
; $01560A
	subq.b	#8,d0
; $01560C
	bra.w	loc_015600

loc_015610:				; $015610
	btst	d0,(a1)
; $015612
	bne.w	loc_015658
; $015616
	move.b	($FFFFA614).w,d1
; $01561A
	cmp.b	$1(a0),d1
; $01561E
	bne.w	loc_015658
; $015622
	move.w	($FFFFA5F0).w,d1
; $015626
	move.w	$2(a0),d2
; $01562A
	beq.w	loc_015634
; $01562E
	cmp.w	d2,d1
; $015630
	bne.w	loc_015658

loc_015634:				; $015634
	movea.l	$4(a0),a0
; $015638
	move.l	a1,($FFFFAA1A).l
; $01563E
	move.w	d0,($FFFFAA1E).l
; $015644
	move.l	#$00015658,($FFFFAA20).l
; $01564E
	move.l	a0,($FFFFAA28).l
; $015654
	bra.w	loc_015824

loc_015658:				; $015658
	movea.l	($FFFFAA12).l,a0
; $01565E
	adda.w	#$0008,a0
; $015662
	bra.w	loc_0155E2

loc_015666:				; $015666
	bset	#4,($FFFFAA11).l
; $01566E
	move.l	#$00014DD4,($FFFF8004).w
; $015676
	rts

loc_015678:				; $015678
	lea	($FF603C).l,a0
; $01567E
	move.w	#$0014,($FFFFAA1E).l

loc_015686:				; $015686
	move.l	a0,($FFFFA8D0).w
; $01568A
	move.b	$5C(a0),d0
; $01568E
	bne.w	loc_015696
; $015692
	move.b	$20(a0),d0

loc_015696:				; $015696
	btst	#0,d0
; $01569A
	bne.w	loc_015800
; $01569E
	tst.b	$5E(a0)
; $0156A2
	beq.w	loc_015800
; $0156A6
	cmpi.w	#$A49C,($00001B).w
; $0156AC
	beq.w	loc_015800
; $0156B0
	moveq	#0,d1
; $0156B2
	move.b	$9(a0),d1
; $0156B6
	beq.w	loc_015728
; $0156BA
	cmpi.b	#$0E,d1
; $0156BE
	beq.w	loc_015728
; $0156C2
	cmpi.b	#$26,d1
; $0156C6
	beq.w	loc_015728
; $0156CA
	cmpi.b	#$0D,d1
; $0156CE
	bne.w	loc_0156DA
; $0156D2
	cmpi.b	#$9C,($00001B).w
; $0156D8
	bhi.s	loc_015728

loc_0156DA:				; $0156DA
	clr.b	$9(a0)
; $0156DE
	move.w	d1,($FFFFAE42).l
; $0156E4
	move.l	#$00015706,($FFFF8004).w
; $0156EC
	movem.l	a7/d7,-(a7)
; $0156F0
	move.l	#$00017CA0,d0
; $0156F6
	jsr	($0085EE).l
; $0156FC
	movem.l	(a7)+,d7/a7
; $015700
	jmp	($017CA0).l
; $015706
	move.l	#$00015728,($FFFF8004).w
; $01570E
	movem.l	a7/d7,-(a7)
; $015712
	move.l	#$00017D16,d0
; $015718
	jsr	($0085EE).l
; $01571E
	movem.l	(a7)+,d7/a7
; $015722
	jmp	($017D16).l

loc_015728:				; $015728
	movea.l	($FFFFA8D0).w,a0
; $01572C
	moveq	#0,d1
; $01572E
	move.b	$A(a0),d1
; $015732
	beq.w	loc_015794
; $015736
	cmpi.b	#$15,d1
; $01573A
	bne.w	loc_015746
; $01573E
	cmpi.b	#$9C,($00001B).w
; $015744
	bhi.s	loc_015794

loc_015746:				; $015746
	clr.b	$A(a0)
; $01574A
	move.w	d1,($FFFFAE42).l
; $015750
	move.l	#$00015772,($FFFF8004).w
; $015758
	movem.l	a7/d7,-(a7)
; $01575C
	move.l	#$00017CA0,d0
; $015762
	jsr	($0085EE).l
; $015768
	movem.l	(a7)+,d7/a7
; $01576C
	jmp	($017CA0).l
; $015772
	move.l	#$00015794,($FFFF8004).w
; $01577A
	movem.l	a7/d7,-(a7)
; $01577E
	move.l	#$00017D16,d0
; $015784
	jsr	($0085EE).l
; $01578A
	movem.l	(a7)+,d7/a7
; $01578E
	jmp	($017D16).l

loc_015794:				; $015794
	movea.l	($FFFFA8D0).w,a0
; $015798
	moveq	#0,d1
; $01579A
	move.b	$B(a0),d1
; $01579E
	beq.w	loc_015800
; $0157A2
	cmpi.b	#$24,d1
; $0157A6
	bne.w	loc_0157B2
; $0157AA
	cmpi.b	#$9C,($00001B).w
; $0157B0
	bhi.s	loc_015800

loc_0157B2:				; $0157B2
	clr.b	$B(a0)
; $0157B6
	move.w	d1,($FFFFAE42).l
; $0157BC
	move.l	#$000157DE,($FFFF8004).w
; $0157C4
	movem.l	a7/d7,-(a7)
; $0157C8
	move.l	#$00017CA0,d0
; $0157CE
	jsr	($0085EE).l
; $0157D4
	movem.l	(a7)+,d7/a7
; $0157D8
	jmp	($017CA0).l
; $0157DE
	move.l	#$00015800,($FFFF8004).w
; $0157E6
	movem.l	a7/d7,-(a7)
; $0157EA
	move.l	#$00017D16,d0
; $0157F0
	jsr	($0085EE).l
; $0157F6
	movem.l	(a7)+,d7/a7
; $0157FA
	jmp	($017D16).l

loc_015800:				; $015800
	movea.l	($FFFFA8D0).w,a0
; $015804
	adda.w	#$0060,a0
; $015808
	subq.w	#1,($FFFFAA1E).l
; $01580E
	bne.w	loc_015686
; $015812
	bset	#6,($FFFFAA11).l
; $01581A
	move.l	#$00014DD4,($FFFF8004).w
; $015822
	rts

loc_015824:				; $015824
	moveq	#0,d0
; $015826
	jsr	($00FF8A).l
; $01582C
	movea.l	($FFFFAA28).l,a0

loc_015832:				; $015832
	move.w	#$FFFF,($FFFFAA2E).l
; $01583A
	move.w	#$FFFF,($FFFFAA34).l
; $015842
	move.l	#$FFFFAA34,($FFFFAA30).l
; $01584C
	move.l	a0,($FFFFAA28).l
; $015852
	moveq	#0,d0
; $015854
	move.b	(a0)+,d0
; $015856
	cmpi.b	#$FF,d0
; $01585A
	beq.w	loc_01596A
; $01585E
	add.w	d0,d0
; $015860
	add.w	d0,d0
; $015862
	jmp	($2,pc,d0.w)
; $015866
	bra.w	loc_015980
; $01586A
	bra.w	loc_015A04
; $01586E
	bra.w	loc_015A2A
; $015872
	bra.w	loc_015B5C
; $015876
	bra.w	loc_015B86
; $01587A
	bra.w	loc_015BC2
; $01587E
	bra.w	loc_015BFE
; $015882
	bra.w	loc_015C3C
; $015886
	bra.w	loc_015C7A
; $01588A
	bra.w	loc_015CAC
; $01588E
	bra.w	loc_015CEA
; $015892
	bra.w	loc_015D28
; $015896
	bra.w	loc_015D5A
; $01589A
	bra.w	loc_015DA6
; $01589E
	bra.w	loc_015EA4
; $0158A2
	bra.w	loc_015FBE
; $0158A6
	bra.w	loc_015FC2
; $0158AA
	bra.w	loc_016130
; $0158AE
	bra.w	loc_0161BE
; $0158B2
	bra.w	loc_01624C
; $0158B6
	bra.w	loc_01626C
; $0158BA
	bra.w	loc_016330
; $0158BE
	bra.w	loc_0163BA
; $0158C2
	bra.w	loc_0163CE
; $0158C6
	bra.w	loc_0163EC
; $0158CA
	bra.w	loc_016400
; $0158CE
	bra.w	loc_01642E
; $0158D2
	bra.w	loc_01645C
; $0158D6
	bra.w	loc_01646E
; $0158DA
	bra.w	loc_016482
; $0158DE
	bra.w	loc_015E38
; $0158E2
	bra.w	loc_016584
; $0158E6
	bra.w	loc_01663E
; $0158EA
	bra.w	loc_01661C
; $0158EE
	bra.w	loc_01666C
; $0158F2
	bra.w	loc_01672E
; $0158F6
	bra.w	loc_0167B2
; $0158FA
	bra.w	loc_016886
; $0158FE
	bra.w	loc_016A1C
; $015902
	bra.w	loc_016D46
; $015906
	bra.w	loc_016DD8
; $01590A
	bra.w	loc_016DF0
; $01590E
	bra.w	loc_016E2C
; $015912
	bra.w	loc_016ECA
; $015916
	bra.w	loc_016F1A
; $01591A
	bra.w	loc_016F7A
; $01591E
	bra.w	loc_01718A
; $015922
	bra.w	loc_017206
; $015926
	bra.w	loc_0173B4
; $01592A
	bra.w	loc_01743E
; $01592E
	bra.w	loc_017484
; $015932
	bra.w	loc_017508
; $015936
	bra.w	loc_017568
; $01593A
	bra.w	loc_017596
; $01593E
	bra.w	loc_0175C0
; $015942
	bra.w	loc_01766E
; $015946
	bra.w	loc_01769C
; $01594A
	bra.w	loc_0176D2
; $01594E
	bra.w	loc_0176F8
; $015952
	bra.w	loc_01774E
; $015956
	bra.w	loc_017772

loc_01595A:				; $01595A
	movea.l	($FFFFAA28).l,a0
; $015960
	adda.w	($FFFFAA2C).l,a0
; $015966
	bra.w	loc_015832

loc_01596A:				; $01596A
	movea.l	($FFFFAA1A).l,a1
; $015970
	move.w	($FFFFAA1E).l,d0
; $015976
	bchg	d0,(a1)
; $015978
	movea.l	($FFFFAA20).l,a0
; $01597E
	jmp	(a0)

loc_015980:				; $015980
	move.w	#$0004,($FFFFAA2C).l
; $015988
	move.b	(a0)+,d0
; $01598A
	beq.w	loc_01595A
; $01598E
	cmpi.b	#$FF,d0
; $015992
	beq.w	loc_0159B0
; $015996
	jsr	($011DA4).l
; $01599C
	beq.w	loc_01595A
; $0159A0
	movea.l	d0,a1
; $0159A2
	moveq	#0,d0
; $0159A4
	move.b	$6(a1),d0
; $0159A8
	move.b	$7(a1),d1
; $0159AC
	bra.w	loc_0159B8

loc_0159B0:				; $0159B0
	moveq	#0,d0
; $0159B2
	move.b	(a0)+,d0
; $0159B4
	moveq	#0,d1
; $0159B6
	move.b	(a0)+,d1

loc_0159B8:				; $0159B8
	tst.w	d0
; $0159BA
	beq.w	loc_01595A
; $0159BE
	move.w	d0,($FFFFA6EE).w
; $0159C2
	addq.w	#1,d0
; $0159C4
	cmp.w	($FFFF9F2C).w,d0
; $0159C8
	bcc.w	loc_01595A
; $0159CC
	tst.w	d1
; $0159CE
	beq.w	loc_01595A
; $0159D2
	move.w	d1,($FFFFA6F0).w
; $0159D6
	addq.w	#1,d0
; $0159D8
	cmp.w	($FFFF9F2E).w,d1
; $0159DC
	bcc.w	loc_01595A
; $0159E0
	move.b	#$01,($FFFFA6F9).w
; $0159E6
	move.l	#$000159FA,($FFFF8004).w
; $0159EE
	move.l	#$0000FFBA,d0
; $0159F4
	jmp	($0085EE).l
; $0159FA
	move.b	#$00,($FFFFA6F9).w
; $015A00
	bra.w	loc_01595A

loc_015A04:				; $015A04
	move.w	#$0002,($FFFFAA2C).l
; $015A0C
	moveq	#0,d0
; $015A0E
	move.b	(a0)+,d0
; $015A10
	movea.l	($FFFFAA30).l,a1
; $015A16
	move.w	#$FFF9,(a1)+
; $015A1A
	move.w	d0,(a1)+
; $015A1C
	move.l	a1,($FFFFAA30).l
; $015A22
	move.w	#$FFFF,(a1)
; $015A26
	bra.w	loc_01595A

loc_015A2A:				; $015A2A
	move.w	#$0008,($FFFFAA2C).l
; $015A32
	moveq	#0,d0
; $015A34
	move.b	(a0)+,d0
; $015A36
	cmpi.b	#$74,d0
; $015A3A
	bne.w	loc_015A52
; $015A3E
	movea.l	($FFFFAA16).l,a1
; $015A44
	cmpa.l	#$00000000,a1
; $015A4A
	beq.w	loc_015A52
; $015A4E
	move.b	$1(a1),d0

loc_015A52:				; $015A52
	bsr.w	loc_017C78
; $015A56
	moveq	#0,d1
; $015A58
	move.b	(a0)+,d1
; $015A5A
	bne.w	loc_015A72
; $015A5E
	movea.l	($FFFFAA16).l,a1
; $015A64
	cmpa.l	#$00000000,a1
; $015A6A
	beq.w	loc_015A72
; $015A6E
	move.b	$5F(a1),d1

loc_015A72:				; $015A72
	move.w	d1,($FFFFAA2E).l
; $015A78
	cmpi.b	#$FF,d1
; $015A7C
	bne.w	loc_015A88
; $015A80
	move.w	#$FFFF,($FFFFAA2E).l

loc_015A88:				; $015A88
	move.b	(a0)+,d1
; $015A8A
	movea.l	($FFFFAA30).l,a2
; $015A90
	movea.l	(a0)+,a1

loc_015A92:				; $015A92
	move.w	(a1)+,d2
; $015A94
	move.w	d2,(a2)+
; $015A96
	cmpi.w	#$FFFF,d2
; $015A9A
	bne.w	loc_015A92
; $015A9E
	move.l	a2,($FFFFAA30).l
; $015AA4
	tst.b	d1
; $015AA6
	beq.w	loc_015B2A
; $015AAA
	jsr	($011DA4).l
; $015AB0
	beq.w	loc_015B2A
; $015AB4
	movea.l	d0,a1
; $015AB6
	moveq	#0,d0
; $015AB8
	move.b	$6(a1),d0
; $015ABC
	beq.w	loc_015B2A
; $015AC0
	move.w	d0,($FFFFA6EE).w
; $015AC4
	addq.w	#1,d0
; $015AC6
	cmp.w	($FFFF9F2C).w,d0
; $015ACA
	bcc.w	loc_015B2A
; $015ACE
	move.b	$7(a1),d0
; $015AD2
	beq.w	loc_015B2A
; $015AD6
	move.w	d0,($FFFFA6F0).w
; $015ADA
	addq.w	#1,d0
; $015ADC
	cmp.w	($FFFF9F2E).w,d0
; $015AE0
	bcc.w	loc_015B2A
; $015AE4
	moveq	#0,d0
; $015AE6
	move.b	$6(a1),d0
; $015AEA
	moveq	#0,d1
; $015AEC
	move.b	$7(a1),d1
; $015AF0
	mulu.w	($FFFF9F2C).w,d1
; $015AF4
	add.w	d0,d1
; $015AF6
	add.w	d1,d1
; $015AF8
	lea	($FF5000).l,a0
; $015AFE
	move.w	($0,a0,d1.w),d0
; $015B02
	cmp.w	$4(a1),d0
; $015B06
	bne.w	loc_015B2A
; $015B0A
	move.b	#$01,($FFFFA6F9).w
; $015B10
	move.l	#$00015B24,($FFFF8004).w
; $015B18
	move.l	#$0000FFBA,d0
; $015B1E
	jmp	($0085EE).l
; $015B24
	move.b	#$00,($FFFFA6F9).w

loc_015B2A:				; $015B2A
	move.l	#$00015B58,($FFFF8004).w
; $015B32
	move.l	#$0000DA8A,d0
; $015B38
	jsr	($0085EE).l
; $015B3E
	move.l	#$0002B3AA,d0
; $015B44
	jsr	($0085EE).l
; $015B4A
	move.l	#$0000DA50,d0
; $015B50
	jsr	($0085EE).l
; $015B56
	rts
; $015B58
	bra.w	loc_01595A

loc_015B5C:				; $015B5C
	move.w	#$0002,($FFFFAA2C).l
; $015B64
	moveq	#0,d0
; $015B66
	move.b	(a0)+,d0
; $015B68
	move.w	d0,($FFFFAE42).l
; $015B6E
	move.l	#$00015B82,($FFFF8004).w
; $015B76
	move.l	#$00017D16,d0
; $015B7C
	jmp	($0085EE).l
; $015B82
	bra.w	loc_01595A

loc_015B86:				; $015B86
	clr.w	($FFFFAA2C).l
; $015B8C
	move.b	(a0),d0
; $015B8E
	jsr	($011DA4).l
; $015B94
	beq.w	loc_015BA6
; $015B98
	move.l	d0,($FFFFA8D0).w
; $015B9C
	jsr	($011972).l
; $015BA2
	bne.w	loc_015BB4

loc_015BA6:				; $015BA6
	movea.l	$1(a0),a0
; $015BAA
	move.l	a0,($FFFFAA28).l
; $015BB0
	bra.w	loc_01595A

loc_015BB4:				; $015BB4
	lea	$5(a0),a0
; $015BB8
	move.l	a0,($FFFFAA28).l
; $015BBE
	bra.w	loc_01595A

loc_015BC2:				; $015BC2
	clr.w	($FFFFAA2C).l
; $015BC8
	move.b	(a0),d0
; $015BCA
	jsr	($011DA4).l
; $015BD0
	beq.w	loc_015BE2
; $015BD4
	move.l	d0,($FFFFA8D0).w
; $015BD8
	jsr	($011972).l
; $015BDE
	bne.w	loc_015BF0

loc_015BE2:				; $015BE2
	lea	$5(a0),a0
; $015BE6
	move.l	a0,($FFFFAA28).l
; $015BEC
	bra.w	loc_01595A

loc_015BF0:				; $015BF0
	movea.l	$1(a0),a0
; $015BF4
	move.l	a0,($FFFFAA28).l
; $015BFA
	bra.w	loc_01595A

loc_015BFE:				; $015BFE
	clr.w	($FFFFAA2C).l
; $015C04
	move.b	(a0),d0
; $015C06
	lea	($FFFFA5F2).w,a1

loc_015C0A:				; $015C0A
	cmpi.b	#$08,d0
; $015C0E
	bcs.w	loc_015C1A
; $015C12
	addq.w	#1,a1
; $015C14
	subq.b	#8,d0
; $015C16
	bra.w	loc_015C0A

loc_015C1A:				; $015C1A
	btst	d0,(a1)
; $015C1C
	bne.w	loc_015C2E
; $015C20
	movea.l	$1(a0),a0
; $015C24
	move.l	a0,($FFFFAA28).l
; $015C2A
	bra.w	loc_01595A

loc_015C2E:				; $015C2E
	lea	$5(a0),a0
; $015C32
	move.l	a0,($FFFFAA28).l
; $015C38
	bra.w	loc_01595A

loc_015C3C:				; $015C3C
	clr.w	($FFFFAA2C).l
; $015C42
	move.b	(a0),d0
; $015C44
	lea	($FFFFA5F2).w,a1

loc_015C48:				; $015C48
	cmpi.b	#$08,d0
; $015C4C
	bcs.w	loc_015C58
; $015C50
	addq.w	#1,a1
; $015C52
	subq.b	#8,d0
; $015C54
	bra.w	loc_015C48

loc_015C58:				; $015C58
	btst	d0,(a1)
; $015C5A
	bne.w	loc_015C6C
; $015C5E
	lea	$5(a0),a0
; $015C62
	move.l	a0,($FFFFAA28).l
; $015C68
	bra.w	loc_01595A

loc_015C6C:				; $015C6C
	movea.l	$1(a0),a0
; $015C70
	move.l	a0,($FFFFAA28).l
; $015C76
	bra.w	loc_01595A

loc_015C7A:				; $015C7A
	move.w	#$0004,($FFFFAA2C).l
; $015C82
	move.b	$1(a0),d0
; $015C86
	lea	($FFFFA5F2).w,a1

loc_015C8A:				; $015C8A
	cmpi.b	#$08,d0
; $015C8E
	bcs.w	loc_015C9A
; $015C92
	addq.w	#1,a1
; $015C94
	subq.b	#8,d0
; $015C96
	bra.w	loc_015C8A

loc_015C9A:				; $015C9A
	tst.b	(a0)
; $015C9C
	beq.w	loc_015CA6
; $015CA0
	bset	d0,(a1)
; $015CA2
	bra.w	loc_01595A

loc_015CA6:				; $015CA6
	bchg	d0,(a1)
; $015CA8
	bra.w	loc_01595A

loc_015CAC:				; $015CAC
	clr.w	($FFFFAA2C).l
; $015CB2
	move.b	(a0),d0
; $015CB4
	lea	($FFFFA5BC).w,a1

loc_015CB8:				; $015CB8
	cmpi.b	#$08,d0
; $015CBC
	bcs.w	loc_015CC8
; $015CC0
	addq.w	#1,a1
; $015CC2
	subq.b	#8,d0
; $015CC4
	bra.w	loc_015CB8

loc_015CC8:				; $015CC8
	btst	d0,(a1)
; $015CCA
	bne.w	loc_015CDC
; $015CCE
	movea.l	$1(a0),a0
; $015CD2
	move.l	a0,($FFFFAA28).l
; $015CD8
	bra.w	loc_01595A

loc_015CDC:				; $015CDC
	lea	$5(a0),a0
; $015CE0
	move.l	a0,($FFFFAA28).l
; $015CE6
	bra.w	loc_01595A

loc_015CEA:				; $015CEA
	clr.w	($FFFFAA2C).l
; $015CF0
	move.b	(a0),d0
; $015CF2
	lea	($FFFFA5BC).w,a1

loc_015CF6:				; $015CF6
	cmpi.b	#$08,d0
; $015CFA
	bcs.w	loc_015D06
; $015CFE
	addq.w	#1,a1
; $015D00
	subq.b	#8,d0
; $015D02
	bra.w	loc_015CF6

loc_015D06:				; $015D06
	btst	d0,(a1)
; $015D08
	beq.w	loc_015D1A
; $015D0C
	movea.l	$1(a0),a0
; $015D10
	move.l	a0,($FFFFAA28).l
; $015D16
	bra.w	loc_01595A

loc_015D1A:				; $015D1A
	lea	$5(a0),a0
; $015D1E
	move.l	a0,($FFFFAA28).l
; $015D24
	bra.w	loc_01595A

loc_015D28:				; $015D28
	move.w	#$0004,($FFFFAA2C).l
; $015D30
	move.b	$1(a0),d0
; $015D34
	lea	($FFFFA5BC).w,a1

loc_015D38:				; $015D38
	cmpi.b	#$08,d0
; $015D3C
	bcs.w	loc_015D48
; $015D40
	addq.w	#1,a1
; $015D42
	subq.b	#8,d0
; $015D44
	bra.w	loc_015D38

loc_015D48:				; $015D48
	tst.b	(a0)
; $015D4A
	beq.w	loc_015D54
; $015D4E
	bset	d0,(a1)
; $015D50
	bra.w	loc_01595A

loc_015D54:				; $015D54
	bchg	d0,(a1)
; $015D56
	bra.w	loc_01595A

loc_015D5A:				; $015D5A
	move.w	#$0004,($FFFFAA2C).l
; $015D62
	lea	($FFFFA610).w,a1
; $015D66
	move.b	(a0)+,d0
; $015D68
	move.b	#$03,d2
; $015D6C
	cmpi.b	#$01,d0
; $015D70
	beq.w	loc_015D7C
; $015D74
	adda.w	#$0001,a1
; $015D78
	move.b	#$0C,d2

loc_015D7C:				; $015D7C
	move.b	(a1),d0
; $015D7E
	move.b	(a0),(a1)
; $015D80
	and.b	($FFFFA614).w,d2
; $015D84
	beq.w	loc_01595A
; $015D88
	cmp.b	(a0),d0
; $015D8A
	beq.w	loc_01595A
; $015D8E
	move.l	#$00015DA2,($FFFF8004).w
; $015D96
	move.l	#$0000FD5A,d0
; $015D9C
	jmp	($0085EE).l
; $015DA2
	bra.w	loc_01595A

loc_015DA6:				; $015DA6
	move.w	#$0004,($FFFFAA2C).l
; $015DAE
	moveq	#0,d0
; $015DB0
	move.b	(a0)+,d0
; $015DB2
	jsr	($011DA4).l
; $015DB8
	beq.w	loc_01595A
; $015DBC
	movea.l	d0,a1
; $015DBE
	btst	#7,$8(a1)
; $015DC4
	beq.w	loc_01595A
; $015DC8
	moveq	#0,d4
; $015DCA
	move.b	(a0)+,d4
; $015DCC
	cmpi.b	#$FF,d4
; $015DD0
	beq.w	loc_015DE4
; $015DD4
	move.b	d4,$6(a1)
; $015DD8
	moveq	#0,d5
; $015DDA
	move.b	(a0)+,d5
; $015DDC
	move.b	d5,$7(a1)
; $015DE0
	bra.w	loc_015DF6

loc_015DE4:				; $015DE4
	bset	#7,$2(a1)
; $015DEA
	moveq	#0,d4
; $015DEC
	move.b	$6(a1),d4
; $015DF0
	moveq	#0,d5
; $015DF2
	move.b	$7(a1),d5

loc_015DF6:				; $015DF6
	jsr	($01113E).l
; $015DFC
	jsr	($0111BC).l
; $015E02
	bset	#7,$8(a1)
; $015E08
	moveq	#0,d0
; $015E0A
	move.b	$4(a1),d0
; $015E0E
	move.w	d0,($FFFFA8D6).w
; $015E12
	movea.l	a1,a0
; $015E14
	jsr	($011706).l
; $015E1A
	jsr	($011208).l
; $015E20
	move.l	#$00015E34,($FFFF8004).w
; $015E28
	move.l	#$00011C92,d0
; $015E2E
	jmp	($0085EE).l
; $015E34
	bra.w	loc_01595A

loc_015E38:				; $015E38
	move.w	#$0002,($FFFFAA2C).l
; $015E40
	moveq	#0,d0
; $015E42
	move.b	(a0)+,d0
; $015E44
	jsr	($011DA4).l
; $015E4A
	beq.w	loc_01595A
; $015E4E
	movea.l	d0,a1
; $015E50
	moveq	#6,d4
; $015E52
	move.l	a1,-(a7)
; $015E54
	adda.w	#$000C,a1

loc_015E58:				; $015E58
	bset	#7,$2(a1)
; $015E5E
	adda.w	#$000C,a1
; $015E62
	dbf	d4,loc_015E58
; $015E66
	movea.l	(a7)+,a1
; $015E68
	moveq	#0,d4
; $015E6A
	move.b	$6(a1),d4
; $015E6E
	moveq	#0,d5
; $015E70
	move.b	$7(a1),d5
; $015E74
	moveq	#0,d0
; $015E76
	move.b	$4(a1),d0
; $015E7A
	move.w	d0,($FFFFA8D6).w
; $015E7E
	movea.l	a1,a0
; $015E80
	jsr	($01179C).l
; $015E86
	jsr	($011208).l
; $015E8C
	move.l	#$00015EA0,($FFFF8004).w
; $015E94
	move.l	#$00011C92,d0
; $015E9A
	jmp	($0085EE).l
; $015EA0
	bra.w	loc_01595A

loc_015EA4:				; $015EA4
	move.w	#$0002,($FFFFAA2C).l
; $015EAC
	moveq	#0,d0
; $015EAE
	move.b	(a0)+,d0
; $015EB0
	jsr	($011DA4).l
; $015EB6
	beq.w	loc_01595A
; $015EBA
	move.l	d0,($FFFFA8D0).w
; $015EBE
	jsr	($011972).l
; $015EC4
	beq.w	loc_01595A
; $015EC8
	movea.l	d0,a1
; $015ECA
	ori.b	#$08,$80(a1)
; $015ED0
	move.l	a1,($FFFFAA30).l
; $015ED6
	moveq	#0,d0
; $015ED8
	move.b	$6(a1),d0
; $015EDC
	beq.w	loc_015F24
; $015EE0
	move.w	d0,($FFFFA6EE).w
; $015EE4
	addq.w	#1,d0
; $015EE6
	cmp.w	($FFFF9F2C).w,d0
; $015EEA
	bcc.w	loc_015F24
; $015EEE
	move.b	$7(a1),d0
; $015EF2
	beq.w	loc_015F24
; $015EF6
	move.w	d0,($FFFFA6F0).w
; $015EFA
	addq.w	#1,d0
; $015EFC
	cmp.w	($FFFF9F2E).w,d0
; $015F00
	bcc.w	loc_015F24
; $015F04
	move.b	#$01,($FFFFA6F9).w
; $015F0A
	move.l	#$00015F1E,($FFFF8004).w
; $015F12
	move.l	#$0000FFBA,d0
; $015F18
	jmp	($0085EE).l
; $015F1E
	move.b	#$00,($FFFFA6F9).w

loc_015F24:				; $015F24
	movea.l	($FFFFAA30).l,a1
; $015F2A
	move.w	#$0008,($FFFFAA2E).l

loc_015F32:				; $015F32
	lea	($FF4000).l,a2
; $015F38
	lea	($FF5000).l,a3
; $015F3E
	move.l	a1,($FFFFAA30).l
; $015F44
	cmpi.b	#$00,$FF(a1)
; $015F4A
	beq.w	loc_015FA6
; $015F4E
	btst	#7,$2(a1)
; $015F54
	bne.w	loc_015FA6
; $015F58
	moveq	#0,d4
; $015F5A
	move.b	$6(a1),d4
; $015F5E
	moveq	#0,d5
; $015F60
	move.b	$7(a1),d5
; $015F64
	move.w	d5,d3
; $015F66
	mulu.w	($FFFF9F2C).w,d3
; $015F6A
	add.w	d4,d3
; $015F6C
	add.w	d3,d3
; $015F6E
	move.w	($0,a3,d3.w),d2
; $015F72
	cmp.w	$4(a1),d2
; $015F76
	bne.w	loc_015FA6
; $015F7A
	move.w	#$FFFF,($0,a3,d3.w)
; $015F80
	andi.b	#$00,(-$10,a2,d0.w)
; $015F86
	jsr	($00C254).l
; $015F8C
	move.w	#$0003,($FFFFA61C).w
; $015F92
	move.l	#$00015FA6,($FFFF8004).w
; $015F9A
	move.l	#$0000F68E,d0
; $015FA0
	jmp	($0085EE).l

loc_015FA6:				; $015FA6
	movea.l	($FFFFAA30).l,a1
; $015FAC
	adda.w	#$000C,a1
; $015FB0
	subq.w	#1,($FFFFAA2E).l
; $015FB6
	bne.w	loc_015F32
; $015FBA
	bra.w	loc_01595A

loc_015FBE:				; $015FBE
	bra.w	loc_01595A

loc_015FC2:				; $015FC2
	move.w	#$0004,($FFFFAA2C).l
; $015FCA
	moveq	#0,d0
; $015FCC
	move.b	(a0)+,d0
; $015FCE
	cmpi.b	#$74,d0
; $015FD2
	bne.w	loc_015FEA
; $015FD6
	movea.l	($FFFFAA16).l,a1
; $015FDC
	cmpa.l	#$00000000,a1
; $015FE2
	beq.w	loc_01595A
; $015FE6
	bra.w	loc_016040

loc_015FEA:				; $015FEA
	cmpi.b	#$F3,d0
; $015FEE
	bne.w	loc_016034
; $015FF2
	moveq	#0,d3
; $015FF4
	move.b	(a0)+,d3
; $015FF6
	moveq	#0,d4
; $015FF8
	move.b	(a0)+,d4
; $015FFA
	lea	($FF603C).l,a1
; $016000
	moveq	#19,d1

loc_016002:				; $016002
	move.l	a1,($FFFFA8D0).w
; $016006
	jsr	($011972).l
; $01600C
	beq.w	loc_016028
; $016010
	move.b	$5C(a1),d2
; $016014
	bne.w	loc_01601C
; $016018
	move.b	$20(a1),d2

loc_01601C:				; $01601C
	andi.b	#$0C,d2
; $016020
	beq.w	loc_016028
; $016024
	move.b	d4,($0,a1,d3.w)

loc_016028:				; $016028
	adda.w	#$0060,a1
; $01602C
	dbf	d1,loc_016002
; $016030
	bra.w	loc_01595A

loc_016034:				; $016034
	jsr	($011DA4).l
; $01603A
	beq.w	loc_01595A
; $01603E
	movea.l	d0,a1

loc_016040:				; $016040
	moveq	#0,d0
; $016042
	move.b	(a0)+,d0
; $016044
	cmpi.b	#$09,d0
; $016048
	bne.w	loc_016128
; $01604C
	moveq	#0,d1
; $01604E
	move.b	$1(a1),d1
; $016052
	cmpi.b	#$0B,d1
; $016056
	bhi.w	loc_016128
; $01605A
	bne.w	loc_016062
; $01605E
	move.w	#$0004,d1

loc_016062:				; $016062
	move.b	$9(a1),d2
; $016066
	cmpi.b	#$00,d2
; $01606A
	beq.w	loc_016090
; $01606E
	asl.w	#8,d2
; $016070
	or.w	d2,d1
; $016072
	lea	($FFFFC7F2).w,a2
; $016076
	moveq	#39,d2

loc_016078:				; $016078
	cmp.w	(a2),d1
; $01607A
	beq.w	loc_01608A
; $01607E
	adda.w	#$0002,a2
; $016082
	dbf	d2,loc_016078
; $016086
	bra.w	loc_016090

loc_01608A:				; $01608A
	move.b	#$FF,$1(a2)

loc_016090:				; $016090
	moveq	#0,d2
; $016092
	move.b	(a0),d2
; $016094
	move.w	d2,($FFFFAE42).l
; $01609A
	move.l	#$000160BC,($FFFF8004).w
; $0160A2
	movem.l	a7/d7,-(a7)
; $0160A6
	move.l	#$00017D16,d0
; $0160AC
	jsr	($0085EE).l
; $0160B2
	movem.l	(a7)+,d7/a7
; $0160B6
	jmp	($017D16).l
; $0160BC
	movea.l	($FFFFAA28).l,a0
; $0160C2
	adda.w	#$0001,a0
; $0160C6
	move.b	(a0)+,d0
; $0160C8
	cmpi.b	#$74,d0
; $0160CC
	bne.w	loc_0160E4
; $0160D0
	movea.l	($FFFFAA16).l,a1
; $0160D6
	cmpa.l	#$00000000,a1
; $0160DC
	beq.w	loc_01595A
; $0160E0
	bra.w	loc_0160F0

loc_0160E4:				; $0160E4
	jsr	($011DA4).l
; $0160EA
	beq.w	loc_01595A
; $0160EE
	movea.l	d0,a1

loc_0160F0:				; $0160F0
	moveq	#0,d0
; $0160F2
	move.b	(a0)+,d0
; $0160F4
	move.b	$1(a1),d1
; $0160F8
	cmpi.b	#$0B,d1
; $0160FC
	bne.w	loc_016104
; $016100
	move.w	#$0004,d1

loc_016104:				; $016104
	move.b	(a0),d2
; $016106
	lea	($FFFFC7F2).w,a2
; $01610A
	moveq	#39,d3

loc_01610C:				; $01610C
	cmp.b	(a2),d2
; $01610E
	beq.w	loc_01611E
; $016112
	adda.w	#$0002,a2
; $016116
	dbf	d3,loc_01610C
; $01611A
	bra.w	loc_01595A

loc_01611E:				; $01611E
	asl.w	#8,d2
; $016120
	andi.w	#$00FF,d1
; $016124
	or.w	d2,d1
; $016126
	move.w	d1,(a2)

loc_016128:				; $016128
	move.b	(a0),($0,a1,d0.w)
; $01612C
	bra.w	loc_01595A

loc_016130:				; $016130
	move.w	#$0004,($FFFFAA2C).l
; $016138
	moveq	#0,d0
; $01613A
	move.b	(a0)+,d0
; $01613C
	cmpi.b	#$74,d0
; $016140
	bne.w	loc_016158
; $016144
	movea.l	($FFFFAA16).l,a1
; $01614A
	cmpa.l	#$00000000,a1
; $016150
	beq.w	loc_01595A
; $016154
	bra.w	loc_0161AE

loc_016158:				; $016158
	cmpi.b	#$F3,d0
; $01615C
	bne.w	loc_0161A2
; $016160
	moveq	#0,d3
; $016162
	move.b	(a0)+,d3
; $016164
	moveq	#0,d4
; $016166
	move.b	(a0)+,d4
; $016168
	lea	($FF603C).l,a1
; $01616E
	moveq	#19,d1

loc_016170:				; $016170
	move.l	a1,($FFFFA8D0).w
; $016174
	jsr	($011972).l
; $01617A
	beq.w	loc_016196
; $01617E
	move.b	$5C(a1),d2
; $016182
	bne.w	loc_01618A
; $016186
	move.b	$20(a1),d2

loc_01618A:				; $01618A
	andi.b	#$0C,d2
; $01618E
	beq.w	loc_016196
; $016192
	bchg	d4,($0,a1,d3.w)

loc_016196:				; $016196
	adda.w	#$0060,a1
; $01619A
	dbf	d1,loc_016170
; $01619E
	bra.w	loc_01595A

loc_0161A2:				; $0161A2
	jsr	($011DA4).l
; $0161A8
	beq.w	loc_01595A
; $0161AC
	movea.l	d0,a1

loc_0161AE:				; $0161AE
	moveq	#0,d0
; $0161B0
	move.b	(a0)+,d0
; $0161B2
	moveq	#0,d1
; $0161B4
	move.b	(a0)+,d1
; $0161B6
	bchg	d1,($0,a1,d0.w)
; $0161BA
	bra.w	loc_01595A

loc_0161BE:				; $0161BE
	move.w	#$0004,($FFFFAA2C).l
; $0161C6
	moveq	#0,d0
; $0161C8
	move.b	(a0)+,d0
; $0161CA
	cmpi.b	#$74,d0
; $0161CE
	bne.w	loc_0161E6
; $0161D2
	movea.l	($FFFFAA16).l,a1
; $0161D8
	cmpa.l	#$00000000,a1
; $0161DE
	beq.w	loc_01595A
; $0161E2
	bra.w	loc_01623C

loc_0161E6:				; $0161E6
	cmpi.b	#$F3,d0
; $0161EA
	bne.w	loc_016230
; $0161EE
	moveq	#0,d3
; $0161F0
	move.b	(a0)+,d3
; $0161F2
	moveq	#0,d4
; $0161F4
	move.b	(a0)+,d4
; $0161F6
	lea	($FF603C).l,a1
; $0161FC
	moveq	#19,d1

loc_0161FE:				; $0161FE
	move.l	a1,($FFFFA8D0).w
; $016202
	jsr	($011972).l
; $016208
	beq.w	loc_016224
; $01620C
	move.b	$5C(a1),d2
; $016210
	bne.w	loc_016218
; $016214
	move.b	$20(a1),d2

loc_016218:				; $016218
	andi.b	#$0C,d2
; $01621C
	beq.w	loc_016224
; $016220
	bset	d4,($0,a1,d3.w)

loc_016224:				; $016224
	adda.w	#$0060,a1
; $016228
	dbf	d1,loc_0161FE
; $01622C
	bra.w	loc_01595A

loc_016230:				; $016230
	jsr	($011DA4).l
; $016236
	beq.w	loc_01595A
; $01623A
	movea.l	d0,a1

loc_01623C:				; $01623C
	moveq	#0,d0
; $01623E
	move.b	(a0)+,d0
; $016240
	moveq	#0,d1
; $016242
	move.b	(a0)+,d1
; $016244
	bset	d1,($0,a1,d0.w)
; $016248
	bra.w	loc_01595A

loc_01624C:				; $01624C
	move.w	#$0002,($FFFFAA2C).l
; $016254
	move.l	#$00016268,($FFFF8004).w
; $01625C
	move.l	#$000119AE,d0
; $016262
	jmp	($0085EE).l
; $016268
	bra.w	loc_01595A

loc_01626C:				; $01626C
	move.b	#$02,($FFFFAA10).l
; $016274
	moveq	#0,d0
; $016276
	move.b	(a0),d0
; $016278
	move.w	d0,($FFFFA612).w
; $01627C
	lea	($FFFFC7F2).w,a1
; $016280
	moveq	#39,d1

loc_016282:				; $016282
	cmpi.b	#$26,(a1)
; $016286
	beq.w	loc_016296
; $01628A
	adda.w	#$0002,a1
; $01628E
	dbf	d1,loc_016282
; $016292
	bra.w	loc_0162B6

loc_016296:				; $016296
	move.b	#$0C,(a1)+
; $01629A
	move.b	(a1),d0
; $01629C
	cmpi.b	#$FF,d0
; $0162A0
	beq.w	loc_0162B6
; $0162A4
	jsr	($011DA4).l
; $0162AA
	beq.w	loc_0162B6
; $0162AE
	movea.l	d0,a1
; $0162B0
	move.b	#$0C,$9(a1)

loc_0162B6:				; $0162B6
	lea	($FFFFA4AA).w,a1
; $0162BA
	move.w	($FFFFA49C).w,d0
; $0162BE
	subq.w	#1,d0
; $0162C0
	move.w	($FFFFA5F0).w,d2
; $0162C4
	move.w	($FFFFA4CA).w,d1
; $0162C8
	add.w	d2,d1
; $0162CA
	bcc.w	loc_0162D2
; $0162CE
	move.w	#$FFFF,d1

loc_0162D2:				; $0162D2
	move.w	d1,($FFFFA4CA).w
; $0162D6
	move.b	d2,($0,a1,d0.w)
; $0162DA
	move.w	($FFFFA49C).w,d0
; $0162DE
	cmpi.w	#$000D,d0
; $0162E2
	beq.w	loc_01630E
; $0162E6
	cmpi.w	#$0013,d0
; $0162EA
	beq.w	loc_016302
; $0162EE
	cmpi.w	#$001A,d0
; $0162F2
	bne.w	loc_01596A
; $0162F6
	move.w	#$0014,d0
; $0162FA
	move.w	#$0002,d1
; $0162FE
	bra.w	loc_016316

loc_016302:				; $016302
	move.w	#$0015,d0
; $016306
	move.w	#$0001,d1
; $01630A
	bra.w	loc_016316

loc_01630E:				; $01630E
	move.w	#$000F,d0
; $016312
	move.w	#$0000,d1

loc_016316:				; $016316
	lea	($FFFFA5C8).w,a1
; $01631A
	jsr	($011DA4).l
; $016320
	beq.w	loc_01596A
; $016324
	movea.l	d0,a2
; $016326
	move.b	$5E(a2),($0,a1,d1.w)
; $01632C
	bra.w	loc_01596A

loc_016330:				; $016330
	move.l	#$00016344,($FFFF8004).w
; $016338
	move.l	#$0000FCE2,d0
; $01633E
	jmp	($0085EE).l
; $016344
	move.b	#$2F,($FFFFA6DA).w
; $01634A
	clr.b	($FFFFA6DB).w
; $01634E
	jsr	($00FD7A).l
; $016354
	lea	($FFFFAA34).l,a1
; $01635A
	movea.l	($082AB6).l,a2
; $016360
	move.w	#$FFFF,($FFFFAA2E).l
; $016368
	move.w	#$FFFE,(a1)+

loc_01636C:				; $01636C
	move.w	(a2)+,d0
; $01636E
	move.w	d0,(a1)+
; $016370
	cmpi.w	#$FFFF,d0
; $016374
	bne.w	loc_01636C
; $016378
	move.l	#$000163A6,($FFFF8004).w
; $016380
	move.l	#$0000DA8A,d0
; $016386
	jsr	($0085EE).l
; $01638C
	move.l	#$0002B3AA,d0
; $016392
	jsr	($0085EE).l
; $016398
	move.l	#$0000DA50,d0
; $01639E
	jsr	($0085EE).l
; $0163A4
	rts
; $0163A6
	move.w	($FFFFA49C).w,d0
; $0163AA
	move.w	d0,($FFFFA612).w
; $0163AE
	move.b	#$FF,($FFFFAA10).l
; $0163B6
	bra.w	loc_01596A

loc_0163BA:				; $0163BA
	clr.w	($FFFFAA2C).l
; $0163C0
	movea.l	$1(a0),a0
; $0163C4
	move.l	a0,($FFFFAA28).l
; $0163CA
	bra.w	loc_01595A

loc_0163CE:				; $0163CE
	clr.w	($FFFFAA2C).l
; $0163D4
	lea	$5(a0),a1
; $0163D8
	move.l	a1,($FFFFAA24).l
; $0163DE
	movea.l	$1(a0),a0
; $0163E2
	move.l	a0,($FFFFAA28).l
; $0163E8
	bra.w	loc_01595A

loc_0163EC:				; $0163EC
	clr.w	($FFFFAA2C).l
; $0163F2
	move.l	($FFFFAA24).l,($FFFFAA28).l
; $0163FC
	bra.w	loc_01595A

loc_016400:				; $016400
	clr.w	($FFFFAA2C).l
; $016406
	move.b	(a0),d0
; $016408
	cmp.b	($FFFFAE4A).l,d0
; $01640E
	beq.w	loc_016420
; $016412
	movea.l	$1(a0),a0
; $016416
	move.l	a0,($FFFFAA28).l
; $01641C
	bra.w	loc_01595A

loc_016420:				; $016420
	lea	$5(a0),a0
; $016424
	move.l	a0,($FFFFAA28).l
; $01642A
	bra.w	loc_01595A

loc_01642E:				; $01642E
	clr.w	($FFFFAA2C).l
; $016434
	move.b	(a0),d0
; $016436
	cmp.b	($FFFFAE4A).l,d0
; $01643C
	bne.w	loc_01644E
; $016440
	movea.l	$1(a0),a0
; $016444
	move.l	a0,($FFFFAA28).l
; $01644A
	bra.w	loc_01595A

loc_01644E:				; $01644E
	lea	$5(a0),a0
; $016452
	move.l	a0,($FFFFAA28).l
; $016458
	bra.w	loc_01595A

loc_01645C:				; $01645C
	move.w	#$0002,($FFFFAA2C).l
; $016464
	clr.w	($FFFFAE4A).l
; $01646A
	bra.w	loc_01595A

loc_01646E:				; $01646E
	move.w	#$0002,($FFFFAA2C).l
; $016476
	move.b	(a0),d0
; $016478
	add.b	d0,($FFFFAE4A).l
; $01647E
	bra.w	loc_01595A

loc_016482:				; $016482
	clr.w	($FFFFAA2C).l
; $016488
	moveq	#0,d0
; $01648A
	move.b	(a0)+,d0
; $01648C
	bsr.w	loc_017C78
; $016490
	moveq	#0,d1
; $016492
	move.b	(a0)+,d1
; $016494
	cmpi.b	#$FF,d1
; $016498
	bne.w	loc_01649E
; $01649C
	moveq	#-1,d1

loc_01649E:				; $01649E
	move.w	d1,($FFFFAA2E).l
; $0164A4
	move.b	(a0)+,d1
; $0164A6
	movea.l	($FFFFAA30).l,a2
; $0164AC
	movea.l	(a0)+,a1

loc_0164AE:				; $0164AE
	move.w	(a1)+,d2
; $0164B0
	move.w	d2,(a2)+
; $0164B2
	cmpi.w	#$FFFF,d2
; $0164B6
	bne.w	loc_0164AE
; $0164BA
	move.l	a2,($FFFFAA30).l
; $0164C0
	tst.b	d1
; $0164C2
	beq.w	loc_016520
; $0164C6
	jsr	($011DA4).l
; $0164CC
	beq.w	loc_016520
; $0164D0
	movea.l	d0,a1
; $0164D2
	moveq	#0,d0
; $0164D4
	move.b	$6(a1),d0
; $0164D8
	beq.w	loc_016520
; $0164DC
	move.w	d0,($FFFFA6EE).w
; $0164E0
	addq.w	#1,d0
; $0164E2
	cmp.w	($FFFF9F2C).w,d0
; $0164E6
	bcc.w	loc_016520
; $0164EA
	move.b	$7(a1),d0
; $0164EE
	beq.w	loc_016520
; $0164F2
	move.w	d0,($FFFFA6F0).w
; $0164F6
	addq.w	#1,d0
; $0164F8
	cmp.w	($FFFF9F2E).w,d0
; $0164FC
	bcc.w	loc_016520
; $016500
	move.b	#$01,($FFFFA6F9).w
; $016506
	move.l	#$0001651A,($FFFF8004).w
; $01650E
	move.l	#$0000FFBA,d0
; $016514
	jmp	($0085EE).l
; $01651A
	move.b	#$00,($FFFFA6F9).w

loc_016520:				; $016520
	clr.w	($FFFFAE48).l
; $016526
	move.l	#$00016554,($FFFF8004).w
; $01652E
	move.l	#$0000DA8A,d0
; $016534
	jsr	($0085EE).l
; $01653A
	move.l	#$0002B39E,d0
; $016540
	jsr	($0085EE).l
; $016546
	move.l	#$0000DA50,d0
; $01654C
	jsr	($0085EE).l
; $016552
	rts
; $016554
	movea.l	($FFFFAA28).l,a0
; $01655A
	adda.w	#$0001,a0
; $01655E
	tst.w	($FFFFAE48).l
; $016564
	beq.w	loc_016576
; $016568
	movea.l	$7(a0),a0
; $01656C
	move.l	a0,($FFFFAA28).l
; $016572
	bra.w	loc_01595A

loc_016576:				; $016576
	lea	$B(a0),a0
; $01657A
	move.l	a0,($FFFFAA28).l
; $016580
	bra.w	loc_01595A

loc_016584:				; $016584
	move.w	#$0006,($FFFFAA2C).l
; $01658C
	move.w	($FFFFA49C).w,d0
; $016590
	subq.w	#1,d0
; $016592
	add.w	d0,d0
; $016594
	add.w	d0,d0
; $016596
	lea	($061CB0).l,a1
; $01659C
	movea.l	($0,a1,d0.w),a1
; $0165A0
	adda.w	#$0004,a1
; $0165A4
	lea	($FF3000).l,a2
; $0165AA
	movea.l	($FFFF9F54).w,a3
; $0165AE
	movea.l	($FFFF9F58).w,a4
; $0165B2
	moveq	#0,d1
; $0165B4
	move.b	(a0)+,d1
; $0165B6
	moveq	#0,d2
; $0165B8
	move.b	(a0)+,d2
; $0165BA
	moveq	#0,d3
; $0165BC
	move.b	(a0)+,d3
; $0165BE
	moveq	#0,d4
; $0165C0
	move.b	(a0)+,d4
; $0165C2
	sub.w	d1,d3
; $0165C4
	sub.w	d2,d4

loc_0165C6:				; $0165C6
	move.w	d2,d7
; $0165C8
	mulu.w	($FFFF9F2C).w,d7
; $0165CC
	add.w	d1,d7
; $0165CE
	move.w	d7,d6
; $0165D0
	add.w	d6,d6
; $0165D2
	move.w	d3,d5

loc_0165D4:				; $0165D4
	cmpi.b	#$01,($7,a2,d0.w)
; $0165DA
	bne.w	loc_016604
; $0165DE
	moveq	#0,d0
; $0165E0
	move.b	($0,a1,d7.w),d0
; $0165E4
	add.w	d0,d0
; $0165E6
	bcs.w	loc_0165F4
; $0165EA
	move.b	($0,a3,d0.w),($0,a2,d6.w)
; $0165F0
	bra.w	loc_0165FE

loc_0165F4:				; $0165F4
	andi.w	#$00FF,d0
; $0165F8
	move.b	($0,a4,d0.w),($0,a2,d6.w)

loc_0165FE:				; $0165FE
	move.b	($0,a1,d7.w),($1,a2,d6.w)

loc_016604:				; $016604
	addq.w	#2,d6
; $016606
	addq.w	#1,d7
; $016608
	dbf	d5,loc_0165D4
; $01660C
	addq.w	#1,d2
; $01660E
	dbf	d4,loc_0165C6
; $016612
	jsr	($00A740).l
; $016618
	bra.w	loc_01595A

loc_01661C:				; $01661C
	move.w	#$0004,($FFFFAA2C).l
; $016624
	moveq	#0,d1
; $016626
	move.b	(a0)+,d1
; $016628
	moveq	#0,d2
; $01662A
	move.b	(a0)+,d2
; $01662C
	moveq	#0,d3
; $01662E
	move.b	(a0)+,d3
; $016630
	bsr.w	loc_017AD8
; $016634
	jsr	($00A740).l
; $01663A
	bra.w	loc_01595A

loc_01663E:				; $01663E
	move.w	#$0006,($FFFFAA2C).l
; $016646
	moveq	#4,d2
; $016648
	jsr	($0085A2).l
; $01664E
	move.b	($0,a0,d2.w),d0
; $016652
	lea	($FFFFA5F2).w,a1

loc_016656:				; $016656
	cmpi.b	#$08,d0
; $01665A
	bcs.w	loc_016666
; $01665E
	addq.w	#1,a1
; $016660
	subq.b	#8,d0
; $016662
	bra.w	loc_016656

loc_016666:				; $016666
	bchg	d0,(a1)
; $016668
	bra.w	loc_01595A

loc_01666C:				; $01666C
	move.w	#$0004,($FFFFAA2C).l
; $016674
	move.w	($FFFFA5F0).w,d2
; $016678
	cmp.b	$2(a0),d2
; $01667C
	bcc.w	loc_01595A
; $016680
	add.w	d2,d2
; $016682
	addq.w	#4,d2
; $016684
	cmpi.b	#$14,($000001).w
; $01668A
	bne.w	loc_016690
; $01668E
	subq.w	#1,d2

loc_016690:				; $016690
	tst.w	d2
; $016692
	beq.w	loc_01595A
; $016696
	moveq	#0,d0
; $016698
	move.b	(a0),d0
; $01669A
	moveq	#0,d1
; $01669C
	move.b	$1(a0),d1
; $0166A0
	jsr	($017B1C).l
; $0166A6
	lea	($FF4000).l,a1
; $0166AC
	lea	($FF5000).l,a2
; $0166B2
	move.w	#$00F0,d3
; $0166B6
	move.w	($FFFF9F2E).w,d2
; $0166BA
	subq.w	#1,d2

loc_0166BC:				; $0166BC
	move.w	($FFFF9F2C).w,d1
; $0166C0
	subq.w	#1,d1
; $0166C2
	move.w	d2,d4
; $0166C4
	mulu.w	($FFFF9F2C).w,d4
; $0166C8
	move.w	d4,d5

loc_0166CA:				; $0166CA
	move.w	d5,d4
; $0166CC
	add.w	d1,d4
; $0166CE
	add.w	d4,d4
; $0166D0
	tst.b	($0,a1,d4.w)
; $0166D4
	bmi.w	loc_01670E
; $0166D8
	jsr	($017AD8).l
; $0166DE
	moveq	#0,d6
; $0166E0
	move.b	($0,a2,d4.w),d6
; $0166E4
	bmi.w	loc_01670E
; $0166E8
	add.w	d6,d6
; $0166EA
	add.w	d6,d6
; $0166EC
	lea	($05E5D8).l,a3
; $0166F2
	movea.l	($0,a3,d6.w),a3
; $0166F6
	moveq	#0,d6
; $0166F8
	move.b	($1,a2,d4.w),d6
; $0166FC
	add.w	d6,d6
; $0166FE
	add.w	d6,d6
; $016700
	lea	($05E628).l,a4
; $016706
	adda.l	($0,a4,d6.w),a3
; $01670A
	clr.b	$3(a3)

loc_01670E:				; $01670E
	subq.w	#1,d1
; $016710
	bne.w	loc_0166CA
; $016714
	subq.w	#1,d2
; $016716
	bne.w	loc_0166BC
; $01671A
	jsr	($00A6EA).l
; $016720
	move.l	#$0001672A,($FFFF8004).w
; $016728
	rts
; $01672A
	bra.w	loc_01595A

loc_01672E:				; $01672E
	move.w	#$0002,($FFFFAA2C).l
; $016736
	move.b	(a0),d0
; $016738
	beq.w	loc_016782
; $01673C
	move.l	#$0005DFC0,($FFFF95A2).w
; $016744
	move.w	d0,($FFFF95A6).w
; $016748
	move.w	#$000F,($FFFF95A8).w
; $01674E
	move.l	#$00016762,($FFFF8004).w
; $016756
	move.l	#$0000DA50,d0
; $01675C
	jmp	($0085EE).l
; $016762
	lea	($FFFF9522).w,a1
; $016766
	jsr	($0091D0).l
; $01676C
	move.l	#$0001595A,($FFFF8004).w
; $016774
	move.l	#$00009334,d0
; $01677A
	jsr	($0085EE).l
; $016780
	rts

loc_016782:				; $016782
	move.l	#$FFFF9522,($FFFF95A2).w
; $01678A
	move.w	#$000F,($FFFF95A8).w
; $016790
	move.l	#$0001595A,($FFFF8004).w
; $016798
	move.l	#$0000DA8A,d0
; $01679E
	jsr	($0085EE).l
; $0167A4
	move.l	#$00009334,d0
; $0167AA
	jsr	($0085EE).l
; $0167B0
	rts

loc_0167B2:				; $0167B2
	move.w	#$0004,($FFFFAA2C).l
; $0167BA
	moveq	#0,d1
; $0167BC
	move.b	(a0),d1
; $0167BE
	cmpi.b	#$06,d1
; $0167C2
	bne.w	loc_0167CC
; $0167C6
	moveq	#24,d0
; $0167C8
	bra.w	loc_0167E4

loc_0167CC:				; $0167CC
	cmpi.b	#$02,d1
; $0167D0
	bne.w	loc_0167DA
; $0167D4
	moveq	#25,d0
; $0167D6
	bra.w	loc_0167E4

loc_0167DA:				; $0167DA
	cmpi.b	#$03,d1
; $0167DE
	bne.w	loc_0167E4
; $0167E2
	moveq	#26,d0

loc_0167E4:				; $0167E4
	lea	($FFFFA5BC).w,a1

loc_0167E8:				; $0167E8
	cmpi.b	#$08,d0
; $0167EC
	bcs.w	loc_0167FA
; $0167F0
	adda.w	#$0001,a1
; $0167F4
	subq.b	#8,d0
; $0167F6
	bra.w	loc_0167E8

loc_0167FA:				; $0167FA
	btst	d0,(a1)
; $0167FC
	bne.w	loc_01595A
; $016800
	bchg	d0,(a1)
; $016802
	move.w	$1(a0),($FFFFAE42).l
; $01680A
	move.w	d1,d0
; $01680C
	cmpi.b	#$03,d1
; $016810
	bne.w	loc_016818
; $016814
	move.w	#$000C,d0

loc_016818:				; $016818
	jsr	($011DA4).l
; $01681E
	beq.w	loc_01595A
; $016822
	movea.l	d0,a1
; $016824
	moveq	#0,d0
; $016826
	move.b	$2F(a1),d0
; $01682A
	add.w	d0,($FFFFAE42).l
; $016830
	move.l	a1,($FFFFA628).w
; $016834
	move.l	a1,($FFFFA62C).w
; $016838
	cmpi.b	#$03,d1
; $01683C
	bne.w	loc_016844
; $016840
	bsr.w	loc_017806

loc_016844:				; $016844
	move.l	#$0001684C,($FFFF8004).w
; $01684C
	tst.w	($FFFFAE42).l
; $016852
	beq.w	loc_01595A
; $016856
	move.w	($FFFFAE42).l,d0
; $01685C
	move.w	d0,d1
; $01685E
	subi.w	#$0100,d0
; $016862
	bcs.w	loc_01686A
; $016866
	move.w	#$00FF,d1

loc_01686A:				; $01686A
	sub.w	d1,($FFFFAE42).l
; $016870
	movea.l	($FFFFA628).w,a1
; $016874
	move.b	d1,$2F(a1)
; $016878
	move.l	#$00014834,d0
; $01687E
	jsr	($0085EE).l
; $016884
	rts

loc_016886:				; $016886
	move.w	#$0004,($FFFFAA2C).l
; $01688E
	move.b	(a0),d0
; $016890
	moveq	#0,d1
; $016892
	move.b	$1(a0),d1
; $016896
	move.w	d1,($FFFFA6E6).w
; $01689A
	move.b	$2(a0),d1
; $01689E
	move.w	d1,($FFFFA6E8).w
; $0168A2
	move.w	#$0003,($FFFFA958).w
; $0168A8
	jsr	($011DA4).l
; $0168AE
	beq.w	loc_01595A
; $0168B2
	movea.l	d0,a1
; $0168B4
	move.l	a1,($FFFFA628).w
; $0168B8
	move.l	a1,($FFFFA62C).w
; $0168BC
	move.l	#$000168DE,($FFFF8004).w
; $0168C4
	movem.l	a7/d7,-(a7)
; $0168C8
	move.l	#$00017A82,d0
; $0168CE
	jsr	($0085EE).l
; $0168D4
	movem.l	(a7)+,d7/a7
; $0168D8
	jmp	($017A82).l
; $0168DE
	moveq	#4,d0
; $0168E0
	jsr	($00FF8A).l
; $0168E6
	move.l	($FFFFA6E6).w,($FFFFA6EE).w
; $0168EC
	move.l	#$00016900,($FFFF8004).w
; $0168F4
	move.l	#$0000FFBA,d0
; $0168FA
	jmp	($0085EE).l
; $016900
	move.w	#$000A,($FFFFA61C).w
; $016906
	move.l	#$0001691A,($FFFF8004).w
; $01690E
	move.l	#$0000F68E,d0
; $016914
	jmp	($0085EE).l
; $01691A
	move.w	($FFFFA6E6).w,d0
; $01691E
	move.w	($FFFFA6E8).w,d1
; $016922
	mulu.w	($FFFF9F2C).w,d1
; $016926
	add.w	d0,d1
; $016928
	add.w	d1,d1
; $01692A
	move.w	d1,($FFFFA620).w
; $01692E
	jsr	($00AB72).l
; $016934
	clr.w	($FFFFA49A).w
; $016938
	move.l	#$0001695A,($FFFF8004).w
; $016940
	movem.l	a7/d7,-(a7)
; $016944
	move.l	#$0000DA50,d0
; $01694A
	jsr	($0085EE).l
; $016950
	movem.l	(a7)+,d7/a7
; $016954
	jmp	($00DA50).l
; $01695A
	jsr	($00ACF8).l
; $016960
	move.l	($FFFFA6E2).w,d2
; $016964
	move.l	($FFFFA6DE).w,d3
; $016968
	move.l	($FFFFA958).w,d4
; $01696C
	move.w	#$0000,d4
; $016970
	movea.l	($FFFFA628).w,a0
; $016974
	move.b	$2E(a0),d4
; $016978
	move.l	#$00016992,($FFFF8004).w
; $016980
	move.l	#$0001E0EA,d0
; $016986
	jsr	($0085EE).l
; $01698C
	jmp	($01E0EA).l
; $016992
	move.l	#$000169A6,($FFFF8004).w
; $01699A
	move.l	#$0000ADDC,d0
; $0169A0
	jmp	($0085EE).l
; $0169A6
	movea.l	($FFFFA628).w,a0
; $0169AA
	move.w	($FFFFA958).w,d0
; $0169AE
	rol.w	#3,d0
; $0169B0
	lea	($08203C).l,a1
; $0169B6
	move.w	($4,a1,d0.w),d1
; $0169BA
	moveq	#0,d2
; $0169BC
	move.b	$38(a0),d2
; $0169C0
	sub.w	d1,d2
; $0169C2
	bge.w	loc_0169C8
; $0169C6
	moveq	#0,d2

loc_0169C8:				; $0169C8
	move.b	d2,$38(a0)
; $0169CC
	jsr	($00F0AC).l
; $0169D2
	movea.l	($FFFFA62C).w,a0
; $0169D6
	ori.b	#$02,$1(a0)
; $0169DC
	moveq	#0,d4
; $0169DE
	move.b	$6(a0),d4
; $0169E2
	moveq	#0,d5
; $0169E4
	move.b	$7(a0),d5
; $0169E8
	jsr	($00C254).l
; $0169EE
	moveq	#0,d0
; $0169F0
	jsr	($00FF8A).l
; $0169F6
	move.l	#$00016A18,($FFFF8004).w
; $0169FE
	movem.l	a7/d7,-(a7)
; $016A02
	move.l	#$0000DA8A,d0
; $016A08
	jsr	($0085EE).l
; $016A0E
	movem.l	(a7)+,d7/a7
; $016A12
	jmp	($00DA8A).l
; $016A18
	bra.w	loc_01595A

loc_016A1C:				; $016A1C
	move.w	#$0006,($FFFFAA2C).l
; $016A24
	move.b	(a0),d0
; $016A26
	jsr	($011DA4).l
; $016A2C
	beq.w	loc_01595A
; $016A30
	move.l	d0,($FFFFA62C).w
; $016A34
	move.l	d0,($FFFFA628).w
; $016A38
	moveq	#0,d1
; $016A3A
	move.b	$2(a0),d1
; $016A3E
	move.w	d1,($FFFFA6EA).w
; $016A42
	move.b	$3(a0),d1
; $016A46
	move.w	d1,($FFFFA6EC).w
; $016A4A
	move.b	$1(a0),d1
; $016A4E
	cmpi.b	#$00,d1
; $016A52
	beq.w	loc_016A6A
; $016A56
	cmpi.b	#$01,d1
; $016A5A
	beq.w	loc_016B44
; $016A5E
	cmpi.b	#$02,d1
; $016A62
	beq.w	loc_016C60
; $016A66
	bra.w	loc_01595A

loc_016A6A:				; $016A6A
	move.w	#$0017,($FFFFA958).w
; $016A70
	movea.l	($FFFFA628).w,a1
; $016A74
	move.l	#$00016A96,($FFFF8004).w
; $016A7C
	movem.l	a7/d7,-(a7)
; $016A80
	move.l	#$00017A82,d0
; $016A86
	jsr	($0085EE).l
; $016A8C
	movem.l	(a7)+,d7/a7
; $016A90
	jmp	($017A82).l
; $016A96
	moveq	#4,d0
; $016A98
	jsr	($00FF8A).l
; $016A9E
	move.w	#$000A,($FFFFA61C).w
; $016AA4
	move.l	#$00016AB8,($FFFF8004).w
; $016AAC
	move.l	#$0000F68E,d0
; $016AB2
	jmp	($0085EE).l
; $016AB8
	move.l	#$00016ADA,($FFFF8004).w
; $016AC0
	movem.l	a7/d7,-(a7)
; $016AC4
	move.l	#$0000DA50,d0
; $016ACA
	jsr	($0085EE).l
; $016AD0
	movem.l	(a7)+,d7/a7
; $016AD4
	jmp	($00DA50).l
; $016ADA
	move.l	($FFFFA6DE).w,d2
; $016ADE
	move.l	($FFFFA6DE).w,d3
; $016AE2
	move.l	($FFFFA958).w,d4
; $016AE6
	move.w	#$0000,d4
; $016AEA
	movea.l	($FFFFA628).w,a0
; $016AEE
	move.b	$2E(a0),d4
; $016AF2
	move.l	#$00016B0C,($FFFF8004).w
; $016AFA
	move.l	#$0001E0EA,d0
; $016B00
	jsr	($0085EE).l
; $016B06
	jmp	($01E0EA).l
; $016B0C
	movea.l	($FFFFA628).w,a0
; $016B10
	ori.b	#$08,$80(a0)
; $016B16
	moveq	#0,d0
; $016B18
	jsr	($00FF8A).l
; $016B1E
	move.l	#$00016B40,($FFFF8004).w
; $016B26
	movem.l	a7/d7,-(a7)
; $016B2A
	move.l	#$0000DA8A,d0
; $016B30
	jsr	($0085EE).l
; $016B36
	movem.l	(a7)+,d7/a7
; $016B3A
	jmp	($00DA8A).l
; $016B40
	bra.w	loc_01595A

loc_016B44:				; $016B44
	move.w	#$0018,($FFFFA958).w
; $016B4A
	movea.l	($FFFFA628).w,a1
; $016B4E
	move.l	#$00016B70,($FFFF8004).w
; $016B56
	movem.l	a7/d7,-(a7)
; $016B5A
	move.l	#$00017A82,d0
; $016B60
	jsr	($0085EE).l
; $016B66
	movem.l	(a7)+,d7/a7
; $016B6A
	jmp	($017A82).l
; $016B70
	moveq	#4,d0
; $016B72
	jsr	($00FF8A).l
; $016B78
	move.w	#$000A,($FFFFA61C).w
; $016B7E
	move.l	#$00016B92,($FFFF8004).w
; $016B86
	move.l	#$0000F68E,d0
; $016B8C
	jmp	($0085EE).l
; $016B92
	move.l	#$00016BB4,($FFFF8004).w
; $016B9A
	movem.l	a7/d7,-(a7)
; $016B9E
	move.l	#$0000DA50,d0
; $016BA4
	jsr	($0085EE).l
; $016BAA
	movem.l	(a7)+,d7/a7
; $016BAE
	jmp	($00DA50).l
; $016BB4
	move.l	($FFFFA6DE).w,d2
; $016BB8
	move.l	($FFFFA6DE).w,d3
; $016BBC
	move.l	($FFFFA958).w,d4
; $016BC0
	move.w	#$0000,d4
; $016BC4
	movea.l	($FFFFA628).w,a0
; $016BC8
	move.b	$2E(a0),d4
; $016BCC
	move.l	#$00016BE6,($FFFF8004).w
; $016BD4
	move.l	#$0001E0EA,d0
; $016BDA
	jsr	($0085EE).l
; $016BE0
	jmp	($01E0EA).l
; $016BE6
	movea.l	($FFFFA628).w,a0
; $016BEA
	cmpi.b	#$01,$E(a0)
; $016BF0
	beq.w	loc_016C20
; $016BF4
	move.w	($FFFFA958).w,d0
; $016BF8
	rol.w	#3,d0
; $016BFA
	lea	($08203C).l,a1
; $016C00
	move.w	($4,a1,d0.w),d1
; $016C04
	moveq	#0,d2
; $016C06
	move.b	$38(a0),d2
; $016C0A
	sub.w	d1,d2
; $016C0C
	bge.w	loc_016C12
; $016C10
	moveq	#0,d2

loc_016C12:				; $016C12
	move.b	d2,$38(a0)
; $016C16
	movea.l	($FFFFA62C).w,a0
; $016C1A
	ori.b	#$02,$1(a0)

loc_016C20:				; $016C20
	moveq	#0,d4
; $016C22
	move.b	$6(a0),d4
; $016C26
	moveq	#0,d5
; $016C28
	move.b	$7(a0),d5
; $016C2C
	jsr	($00C254).l
; $016C32
	moveq	#0,d0
; $016C34
	jsr	($00FF8A).l
; $016C3A
	move.l	#$00016C5C,($FFFF8004).w
; $016C42
	movem.l	a7/d7,-(a7)
; $016C46
	move.l	#$0000DA8A,d0
; $016C4C
	jsr	($0085EE).l
; $016C52
	movem.l	(a7)+,d7/a7
; $016C56
	jmp	($00DA8A).l
; $016C5C
	bra.w	loc_01595A

loc_016C60:				; $016C60
	move.w	#$0019,($FFFFA958).w
; $016C66
	movea.l	($FFFFA628).w,a0
; $016C6A
	bset	#7,$8(a0)
; $016C70
	lea	($FF3000).l,a1
; $016C76
	lea	($FF4000).l,a2
; $016C7C
	moveq	#0,d1
; $016C7E
	move.b	$0(a0),d1
; $016C82
	move.l	($FFFFA6EA).w,($FFFFA8C6).w
; $016C88
	jsr	($011834).l
; $016C8E
	moveq	#0,d0
; $016C90
	move.b	$6(a0),d1
; $016C94
	move.w	d1,d0
; $016C96
	pea	d0
; $016C98
	move.b	$7(a0),d2
; $016C9C
	move.w	d2,d0
; $016C9E
	mulu.w	($FFFF9F2C).w,d2
; $016CA2
	add.w	d1,d2
; $016CA4
	add.w	d2,d2
; $016CA6
	andi.b	#$00,(-$10,a2,d0.w)
; $016CAC
	movea.l	a0,a1
; $016CAE
	move.l	#$00016CD0,($FFFF8004).w
; $016CB6
	movem.l	a7/d7,-(a7)
; $016CBA
	move.l	#$00017A82,d0
; $016CC0
	jsr	($0085EE).l
; $016CC6
	movem.l	(a7)+,d7/a7
; $016CCA
	jmp	($017A82).l
; $016CD0
	move.w	#$000A,($FFFFA61C).w
; $016CD6
	move.l	#$00016CEA,($FFFF8004).w
; $016CDE
	move.l	#$0000F68E,d0
; $016CE4
	jmp	($0085EE).l
; $016CEA
	move.l	#$00016D0C,($FFFF8004).w
; $016CF2
	movem.l	a7/d7,-(a7)
; $016CF6
	move.l	#$0000DA50,d0
; $016CFC
	jsr	($0085EE).l
; $016D02
	movem.l	(a7)+,d7/a7
; $016D06
	jmp	($00DA50).l
; $016D0C
	moveq	#4,d0
; $016D0E
	jsr	($00FF8A).l
; $016D14
	move.l	($FFFFA6DE).w,d2
; $016D18
	move.l	($FFFFA6DE).w,d3
; $016D1C
	move.l	($FFFFA958).w,d4
; $016D20
	move.w	#$0000,d4
; $016D24
	movea.l	($FFFFA628).w,a0
; $016D28
	move.b	$2E(a0),d4
; $016D2C
	move.l	#$00016BE6,($FFFF8004).w
; $016D34
	move.l	#$0001E0EA,d0
; $016D3A
	jsr	($0085EE).l
; $016D40
	jmp	($01E0EA).l

loc_016D46:				; $016D46
	move.b	(a0),d7
; $016D48
	moveq	#0,d6
; $016D4A
	move.b	$1(a0),d6
; $016D4E
	move.w	d6,d0
; $016D50
	addq.w	#3,d0
; $016D52
	move.w	d0,($FFFFAA2C).l
; $016D58
	subq.w	#1,d6
; $016D5A
	moveq	#2,d5

loc_016D5C:				; $016D5C
	move.b	($0,a0,d5.w),d0
; $016D60
	cmpi.b	#$FF,d0
; $016D64
	beq.w	loc_016DAC
; $016D68
	jsr	($011DA4).l
; $016D6E
	beq.w	loc_016DBE
; $016D72
	movea.l	d0,a1
; $016D74
	move.l	d0,($FFFFA8D0).w
; $016D78
	jsr	($011972).l
; $016D7E
	beq.w	loc_016DBE
; $016D82
	tst.b	d7
; $016D84
	beq.w	loc_016DA6
; $016D88
	moveq	#6,d1

loc_016D8A:				; $016D8A
	adda.w	#$000C,a1
; $016D8E
	cmpi.b	#$00,$FF(a1)
; $016D94
	beq.w	loc_016DA2
; $016D98
	btst	#7,$2(a1)
; $016D9E
	bne.w	loc_016DBE

loc_016DA2:				; $016DA2
	dbf	d1,loc_016D8A

loc_016DA6:				; $016DA6
	addq.w	#1,d5
; $016DA8
	dbf	d6,loc_016D5C

loc_016DAC:				; $016DAC
	move.w	($FFFFAA2C).l,d0
; $016DB2
	addq.w	#4,d0
; $016DB4
	move.w	d0,($FFFFAA2C).l
; $016DBA
	bra.w	loc_01595A

loc_016DBE:				; $016DBE
	move.w	($FFFFAA2C).l,d0
; $016DC4
	clr.w	($FFFFAA2C).l
; $016DCA
	subq.w	#1,d0
; $016DCC
	move.l	($0,a0,d0.w),($FFFFAA28).l
; $016DD4
	bra.w	loc_01595A

loc_016DD8:				; $016DD8
	move.w	#$0002,($FFFFAA2C).l
; $016DE0
	jsr	($01113E).l
; $016DE6
	jsr	($0111BC).l
; $016DEC
	bra.w	loc_01595A

loc_016DF0:				; $016DF0
	clr.w	($FFFFAA2C).l
; $016DF6
	movea.l	($FFFFAA16).l,a1
; $016DFC
	cmpa.l	#$00000000,a1
; $016E02
	beq.w	loc_016E10
; $016E06
	move.b	(a0),d0
; $016E08
	cmp.b	$15(a1),d0
; $016E0C
	beq.w	loc_016E1E

loc_016E10:				; $016E10
	movea.l	$1(a0),a0
; $016E14
	move.l	a0,($FFFFAA28).l
; $016E1A
	bra.w	loc_01595A

loc_016E1E:				; $016E1E
	lea	$5(a0),a0
; $016E22
	move.l	a0,($FFFFAA28).l
; $016E28
	bra.w	loc_01595A

loc_016E2C:				; $016E2C
	clr.w	($FFFFAA2C).l
; $016E32
	lea	($FF603C).l,a1
; $016E38
	move.b	(a0),d0
; $016E3A
	moveq	#19,d1

loc_016E3C:				; $016E3C
	cmp.b	$9(a1),d0
; $016E40
	bne.w	loc_016EA0
; $016E44
	move.b	$0(a1),d2
; $016E48
	cmpi.b	#$FF,d2
; $016E4C
	beq.w	loc_016EA0
; $016E50
	btst	#7,$2(a1)
; $016E56
	bne.w	loc_016EA0
; $016E5A
	btst	#7,$8(a1)
; $016E60
	bne.w	loc_016EA0
; $016E64
	move.b	$5C(a1),d2
; $016E68
	bne.w	loc_016E70
; $016E6C
	move.b	$20(a1),d2

loc_016E70:				; $016E70
	cmp.b	$1(a0),d2
; $016E74
	bne.w	loc_016EA0
; $016E78
	move.b	$6(a1),d3
; $016E7C
	cmp.b	$2(a0),d3
; $016E80
	bcs.w	loc_016EA0
; $016E84
	cmp.b	$4(a0),d3
; $016E88
	bhi.w	loc_016EA0
; $016E8C
	move.b	$7(a1),d3
; $016E90
	cmp.b	$3(a0),d3
; $016E94
	bcs.w	loc_016EA0
; $016E98
	cmp.b	$5(a0),d3
; $016E9C
	bls.w	loc_016EB6

loc_016EA0:				; $016EA0
	adda.w	#$0060,a1
; $016EA4
	dbf	d1,loc_016E3C
; $016EA8
	movea.l	$7(a0),a0
; $016EAC
	move.l	a0,($FFFFAA28).l
; $016EB2
	bra.w	loc_01595A

loc_016EB6:				; $016EB6
	move.l	a1,($FFFFAA16).l
; $016EBC
	lea	$B(a0),a0
; $016EC0
	move.l	a0,($FFFFAA28).l
; $016EC6
	bra.w	loc_01595A

loc_016ECA:				; $016ECA
	clr.w	($FFFFAA2C).l
; $016ED0
	movea.l	($FFFFAA16).l,a1
; $016ED6
	cmpa.l	#$00000000,a1
; $016EDC
	beq.w	loc_016EFE
; $016EE0
	move.b	$1(a0),d0
; $016EE4
	move.b	$1(a1),d1
; $016EE8
	tst.b	(a0)
; $016EEA
	beq.w	loc_016EF8
; $016EEE
	cmp.b	d1,d0
; $016EF0
	bne.w	loc_016F0C
; $016EF4
	bra.w	loc_016EFE

loc_016EF8:				; $016EF8
	cmp.b	d1,d0
; $016EFA
	beq.w	loc_016F0C

loc_016EFE:				; $016EFE
	movea.l	$3(a0),a0
; $016F02
	move.l	a0,($FFFFAA28).l
; $016F08
	bra.w	loc_01595A

loc_016F0C:				; $016F0C
	lea	$7(a0),a0
; $016F10
	move.l	a0,($FFFFAA28).l
; $016F16
	bra.w	loc_01595A

loc_016F1A:				; $016F1A
	clr.w	($FFFFAA2C).l
; $016F20
	moveq	#0,d0
; $016F22
	move.b	(a0),d0
; $016F24
	cmpi.b	#$74,d0
; $016F28
	bne.w	loc_016F40
; $016F2C
	movea.l	($FFFFAA16).l,a1
; $016F32
	cmpa.l	#$00000000,a1
; $016F38
	beq.w	loc_01595A
; $016F3C
	bra.w	loc_016F4C

loc_016F40:				; $016F40
	jsr	($011DA4).l
; $016F46
	beq.w	loc_01595A
; $016F4A
	movea.l	d0,a1

loc_016F4C:				; $016F4C
	moveq	#0,d0
; $016F4E
	move.b	$1(a0),d0
; $016F52
	move.b	($0,a1,d0.w),d0
; $016F56
	cmp.b	$2(a0),d0
; $016F5A
	beq.w	loc_016F6C
; $016F5E
	movea.l	$3(a0),a0
; $016F62
	move.l	a0,($FFFFAA28).l
; $016F68
	bra.w	loc_01595A

loc_016F6C:				; $016F6C
	lea	$7(a0),a0
; $016F70
	move.l	a0,($FFFFAA28).l
; $016F76
	bra.w	loc_01595A

loc_016F7A:				; $016F7A
	move.w	#$0002,($FFFFAA2C).l
; $016F82
	lea	($FF603C).l,a2
; $016F88
	moveq	#19,d1

loc_016F8A:				; $016F8A
	cmpi.b	#$09,$26(a2)
; $016F90
	beq.w	loc_016FA0
; $016F94
	adda.w	#$0060,a2
; $016F98
	dbf	d1,loc_016F8A
; $016F9C
	bra.w	loc_01595A

loc_016FA0:				; $016FA0
	movea.l	($FFFFA628).w,a1
; $016FA4
	cmpa.l	a2,a1
; $016FA6
	beq.w	loc_016FBC
; $016FAA
	tst.b	$3(a1)
; $016FAE
	beq.w	loc_016FD2
; $016FB2
	move.l	a1,($FFFFAE44).l
; $016FB8
	bra.w	loc_016FE8

loc_016FBC:				; $016FBC
	movea.l	($FFFFA630).w,a1
; $016FC0
	tst.b	$3(a1)
; $016FC4
	beq.w	loc_016FD2
; $016FC8
	move.l	a1,($FFFFAE44).l
; $016FCE
	bra.w	loc_016FE8

loc_016FD2:				; $016FD2
	move.w	#$0001,d0
; $016FD6
	jsr	($011DA4).l
; $016FDC
	beq.w	loc_01595A
; $016FE0
	movea.l	d0,a1
; $016FE2
	move.l	a1,($FFFFAE44).l

loc_016FE8:				; $016FE8
	move.b	$1(a2),d0
; $016FEC
	cmpi.b	#$0A,d0
; $016FF0
	bhi.w	loc_017012
; $016FF4
	lea	($FFFFC7F2).w,a3
; $016FF8
	moveq	#39,d1

loc_016FFA:				; $016FFA
	cmpi.b	#$26,(a3)
; $016FFE
	beq.w	loc_01700E
; $017002
	adda.w	#$0002,a3
; $017006
	dbf	d1,loc_016FFA
; $01700A
	bra.w	loc_017012

loc_01700E:				; $01700E
	move.w	#$FFFF,(a3)

loc_017012:				; $017012
	move.b	#$00,$9(a2)
; $017018
	move.b	$1(a1),d0
; $01701C
	cmpi.b	#$0A,d0
; $017020
	bhi.w	loc_0170D0
; $017024
	move.b	$9(a1),d0
; $017028
	cmpi.b	#$00,d0
; $01702C
	beq.w	loc_017054
; $017030
	lea	($FFFFC7F2).w,a3
; $017034
	moveq	#39,d1

loc_017036:				; $017036
	cmp.b	(a3),d0
; $017038
	beq.w	loc_017048
; $01703C
	adda.w	#$0002,a3
; $017040
	dbf	d1,loc_017036
; $017044
	bra.w	loc_017054

loc_017048:				; $017048
	move.b	#$FF,$1(a3)
; $01704E
	move.b	#$00,$9(a1)

loc_017054:				; $017054
	move.w	#$0026,($FFFFAE42).l
; $01705C
	move.l	#$0001707E,($FFFF8004).w
; $017064
	movem.l	a7/d7,-(a7)
; $017068
	move.l	#$00017D16,d0
; $01706E
	jsr	($0085EE).l
; $017074
	movem.l	(a7)+,d7/a7
; $017078
	jmp	($017D16).l
; $01707E
	movea.l	($FFFFAE44).l,a1
; $017084
	lea	($FFFFC7F2).w,a3
; $017088
	moveq	#39,d1

loc_01708A:				; $01708A
	cmpi.b	#$26,(a3)
; $01708E
	beq.w	loc_01709E
; $017092
	adda.w	#$0002,a3
; $017096
	dbf	d1,loc_01708A
; $01709A
	bra.w	loc_01595A

loc_01709E:				; $01709E
	move.b	$1(a1),$1(a3)
; $0170A4
	lea	($FF603C).l,a3
; $0170AA
	moveq	#19,d1

loc_0170AC:				; $0170AC
	move.b	$1(a3),d0
; $0170B0
	cmpi.b	#$0A,d0
; $0170B4
	bls.w	loc_0170C4
; $0170B8
	move.b	#$22,$17(a3)
; $0170BE
	move.b	$1(a1),$21(a3)

loc_0170C4:				; $0170C4
	adda.w	#$0060,a3
; $0170C8
	dbf	d1,loc_0170AC
; $0170CC
	bra.w	loc_0170DC

loc_0170D0:				; $0170D0
	move.b	#$01,$17(a1)
; $0170D6
	move.w	#$1701,$22(a1)

loc_0170DC:				; $0170DC
	move.b	#$26,$9(a1)
; $0170E2
	moveq	#0,d0
; $0170E4
	move.b	$5F(a1),d0
; $0170E8
	move.w	d0,($FFFFAA2E).l
; $0170EE
	move.l	#$FFFFAA34,($FFFFAA30).l
; $0170F8
	moveq	#0,d0
; $0170FA
	move.b	$1(a1),d0
; $0170FE
	bsr.w	loc_017C78
; $017102
	movea.l	($FFFFAA30).l,a3
; $017108
	suba.w	#$0004,a3
; $01710C
	movea.l	($082A92).l,a2

loc_017112:				; $017112
	move.w	(a2)+,d0
; $017114
	move.w	d0,(a3)+
; $017116
	cmpi.w	#$FFFF,d0
; $01711A
	bne.w	loc_017112
; $01711E
	move.w	#$FFFE,-(a3)
; $017122
	adda.w	#$0002,a3
; $017126
	move.w	#$000C,d1
; $01712A
	lea	($001066).l,a2
; $017130
	subq.w	#1,d1
; $017132
	add.w	d1,d1
; $017134
	add.w	d1,d1
; $017136
	movea.l	($0,a2,d1.w),a2

loc_01713A:				; $01713A
	move.w	(a2)+,d0
; $01713C
	move.w	d0,(a3)+
; $01713E
	cmpi.w	#$FFFF,d0
; $017142
	bne.w	loc_01713A
; $017146
	suba.w	#$0002,a3
; $01714A
	movea.l	($082AC6).l,a2

loc_017150:				; $017150
	move.w	(a2)+,d0
; $017152
	move.w	d0,(a3)+
; $017154
	cmpi.w	#$FFFF,d0
; $017158
	bne.w	loc_017150
; $01715C
	move.l	#$0001595A,($FFFF8004).w
; $017164
	move.l	#$0000DA8A,d0
; $01716A
	jsr	($0085EE).l
; $017170
	move.l	#$0002B3AA,d0
; $017176
	jsr	($0085EE).l
; $01717C
	move.l	#$0000DA50,d0
; $017182
	jsr	($0085EE).l
; $017188
	rts

loc_01718A:				; $01718A
	move.w	#$0004,($FFFFAA2C).l
; $017192
	move.b	(a0),d0
; $017194
	jsr	($011DA4).l
; $01719A
	beq.w	loc_01595A
; $01719E
	move.b	$1(a0),d7
; $0171A2
	move.l	d0,($FFFFAE44).l
; $0171A8
	movea.l	d0,a0
; $0171AA
	moveq	#7,d0

loc_0171AC:				; $0171AC
	clr.b	$2(a0)
; $0171B0
	move.b	#$0A,$3(a0)
; $0171B6
	adda.w	#$000C,a0
; $0171BA
	dbf	d0,loc_0171AC
; $0171BE
	lea	($18005E).l,a0
; $0171C4
	move.w	($FFFFA49C).w,d0
; $0171C8
	subq.w	#1,d0
; $0171CA
	add.w	d0,d0
; $0171CC
	add.w	d0,d0
; $0171CE
	movea.l	($0,a0,d0.w),a0
; $0171D2
	adda.w	#$000C,a0
; $0171D6
	movea.l	(a0),a0
; $0171D8
	move.w	(a0)+,d0
; $0171DA
	subq.w	#1,d0

loc_0171DC:				; $0171DC
	cmp.b	$1A(a0),d7
; $0171E0
	beq.w	loc_0171F0
; $0171E4
	adda.w	#$0024,a0
; $0171E8
	dbf	d0,loc_0171DC
; $0171EC
	bra.w	loc_01595A

loc_0171F0:				; $0171F0
	movea.l	($FFFFAE44).l,a1
; $0171F6
	jsr	($010FA6).l
; $0171FC
	jsr	($011208).l
; $017202
	bra.w	loc_01595A

loc_017206:				; $017206
	move.w	#$0002,($FFFFAA2C).l
; $01720E
	move.w	#$0040,($FFFFAE48).l
; $017216
	lea	($FF1000).l,a1
; $01721C
	move.w	#$008F,d0

loc_017220:				; $017220
	clr.l	(a1)+
; $017222
	dbf	d0,loc_017220
; $017226
	move.l	#$0001722E,($FFFF8004).w
; $01722E
	lea	($FF1000).l,a1
; $017234
	lea	($0173A2).l,a0
; $01723A
	moveq	#8,d7

loc_01723C:				; $01723C
	moveq	#64,d2
; $01723E
	jsr	($0085A2).l

loc_017244:				; $017244
	move.b	($0,a1,d2.w),d1
; $017248
	beq.w	loc_01725C
; $01724C
	addq.w	#1,d2
; $01724E
	cmpi.w	#$0040,d2
; $017252
	bne.w	loc_017244
; $017256
	moveq	#0,d2
; $017258
	bra.w	loc_017244

loc_01725C:				; $01725C
	move.b	#$01,($0,a1,d2.w)
; $017262
	adda.w	#$0040,a1
; $017266
	moveq	#0,d3
; $017268
	move.w	d2,d3
; $01726A
	divu.w	#$0008,d3
; $01726E
	move.w	d3,d4
; $017270
	pea	d3
; $017272
	add.w	d4,d4
; $017274
	add.w	d4,d4
; $017276
	cmpi.b	#$04,d3
; $01727A
	bcs.w	loc_017280
; $01727E
	addq.w	#2,d4

loc_017280:				; $017280
	andi.w	#$0003,d3
; $017284
	move.w	#$F000,d5
; $017288
	move.w	#$B000,d6
; $01728C
	add.w	d3,d3
; $01728E
	add.w	d3,d3
; $017290
	ror.w	d3,d5
; $017292
	ror.w	d3,d6
; $017294
	eori.w	#$FFFF,d5
; $017298
	move.w	(a0)+,d1
; $01729A
	lsl.w	#5,d1
; $01729C
	add.w	d1,d4
; $01729E
	addi.w	#$2000,d4
; $0172A2
	movea.l	($FFFF81C4).w,a3
; $0172A6
	move.w	#$FFF7,(a3)+
; $0172AA
	move.w	d4,(a3)+
; $0172AC
	move.l	#$FFFFAA30,(a3)+
; $0172B2
	move.w	#$0001,(a3)+
; $0172B6
	move.l	a3,($FFFF81C4).w
; $0172BA
	jsr	($008A6C).l
; $0172C0
	movea.l	($FFFF81C4).w,a3
; $0172C4
	move.w	#$FFF8,(a3)+
; $0172C8
	move.w	d4,(a3)+
; $0172CA
	move.w	#$0001,(a3)+
; $0172CE
	move.w	($FFFFAA30).l,d3
; $0172D4
	and.w	d5,d3
; $0172D6
	or.w	d6,d3
; $0172D8
	move.w	d3,(a3)+
; $0172DA
	move.l	a3,($FFFF81C4).w
; $0172DE
	jsr	($008A6C).l
; $0172E4
	dbf	d7,loc_01723C
; $0172E8
	subq.w	#1,($FFFFAE48).l
; $0172EE
	beq.w	loc_0172F4
; $0172F2
	rts

loc_0172F4:				; $0172F4
	lea	($FF603C).l,a0
; $0172FA
	moveq	#19,d0

loc_0172FC:				; $0172FC
	move.l	a0,($FFFFA8D0).w
; $017300
	jsr	($011972).l
; $017306
	beq.w	loc_01736C
; $01730A
	moveq	#7,d1
; $01730C
	movea.l	a0,a1

loc_01730E:				; $01730E
	moveq	#0,d4
; $017310
	move.b	$0(a1),d4
; $017314
	cmpi.b	#$FF,d4
; $017318
	beq.w	loc_017364
; $01731C
	btst	#7,$2(a1)
; $017322
	bne.w	loc_017364
; $017326
	moveq	#0,d2
; $017328
	move.b	$7(a1),d2
; $01732C
	mulu.w	($FFFF9F2C).w,d2
; $017330
	moveq	#0,d3
; $017332
	move.b	$6(a1),d3
; $017336
	add.w	d3,d2
; $017338
	add.w	d2,d2
; $01733A
	lea	($FF3000).l,a2
; $017340
	cmpi.b	#$00,($E,a2,d0.w)
; $017346
	bne.w	loc_017364
; $01734A
	mulu.w	#$001C,d4
; $01734E
	lea	($05EDDC).l,a2
; $017354
	adda.w	($2,a2,d4.w),a2
; $017358
	tst.b	$F(a2)
; $01735C
	bpl.w	loc_017364
; $017360
	clr.b	$3(a1)

loc_017364:				; $017364
	adda.w	#$000C,a1
; $017368
	dbf	d1,loc_01730E

loc_01736C:				; $01736C
	adda.w	#$0060,a0
; $017370
	dbf	d0,loc_0172FC
; $017374
	move.w	($FFFF9F2E).w,d0
; $017378
	subq.w	#1,d0
; $01737A
	lea	($FF3000).l,a1

loc_017380:				; $017380
	move.w	($FFFF9F2C).w,d1
; $017384
	subq.w	#1,d1

loc_017386:				; $017386
	cmpi.b	#$0E,(a1)
; $01738A
	bne.w	loc_017392
; $01738E
	move.b	#$0F,(a1)

loc_017392:				; $017392
	adda.w	#$0002,a1
; $017396
	dbf	d1,loc_017386
; $01739A
	dbf	d0,loc_017380
; $01739E
	bra.w	loc_01595A
; $0173A2
	bchg	d0,(a5)+
; $0173A4
	bchg	d0,(a6)+
; $0173A6
	bchg	d0,(a7)+
; $0173A8
	bchg	d0,$1EE(a5)
; $0173AC
	bchg	d0,$1FD(a7)
; $0173B0
	bchg	d0,?ea(7,6)
; $0173B2
	bchg	d0,?ea(7,7)

loc_0173B4:				; $0173B4
	clr.w	($FFFFAA2C).l
; $0173BA
	lea	($FFFFA4AA).w,a1
; $0173BE
	moveq	#25,d0

loc_0173C0:				; $0173C0
	tst.b	(a1)+
; $0173C2
	beq.w	loc_017422
; $0173C6
	dbf	d0,loc_0173C0
; $0173CA
	adda.w	#$0001,a1
; $0173CE
	moveq	#2,d0

loc_0173D0:				; $0173D0
	tst.b	(a1)+
; $0173D2
	beq.w	loc_017422
; $0173D6
	dbf	d0,loc_0173D0
; $0173DA
	lea	($FF603C).l,a1
; $0173E0
	moveq	#19,d0

loc_0173E2:				; $0173E2
	move.b	$1(a1),d1
; $0173E6
	cmpi.b	#$0B,d1
; $0173EA
	bhi.w	loc_017400
; $0173EE
	btst	#7,$2(a1)
; $0173F4
	bne.w	loc_017422
; $0173F8
	tst.b	$3(a1)
; $0173FC
	beq.w	loc_017422

loc_017400:				; $017400
	adda.w	#$0060,a1
; $017404
	dbf	d0,loc_0173E2
; $017408
	lea	($FFFFA4CC).w,a1
; $01740C
	moveq	#9,d0

loc_01740E:				; $01740E
	tst.b	$14(a1)
; $017412
	bne.w	loc_017422
; $017416
	adda.w	#$0018,a1
; $01741A
	dbf	d0,loc_01740E
; $01741E
	bra.w	loc_017430

loc_017422:				; $017422
	movea.l	$1(a0),a0
; $017426
	move.l	a0,($FFFFAA28).l
; $01742C
	bra.w	loc_01595A

loc_017430:				; $017430
	lea	$5(a0),a0
; $017434
	move.l	a0,($FFFFAA28).l
; $01743A
	bra.w	loc_01595A

loc_01743E:				; $01743E
	move.w	#$0002,($FFFFAA2C).l
; $017446
	lea	($FFFFC7F2).w,a1
; $01744A
	moveq	#39,d1

loc_01744C:				; $01744C
	cmpi.b	#$08,(a1)
; $017450
	beq.w	loc_017460
; $017454
	adda.w	#$0002,a1
; $017458
	dbf	d1,loc_01744C
; $01745C
	bra.w	loc_01595A

loc_017460:				; $017460
	move.b	#$09,(a1)+
; $017464
	move.b	(a1),d0
; $017466
	cmpi.b	#$FF,d0
; $01746A
	beq.w	loc_017480
; $01746E
	jsr	($011DA4).l
; $017474
	beq.w	loc_017480
; $017478
	movea.l	d0,a1
; $01747A
	move.b	#$09,$9(a1)

loc_017480:				; $017480
	bra.w	loc_01595A

loc_017484:				; $017484
	move.w	#$0002,($FFFFAA2C).l
; $01748C
	move.b	(a0),d0
; $01748E
	beq.w	loc_0174D8
; $017492
	move.l	#$0005DF40,($FFFF95A2).w
; $01749A
	move.w	d0,($FFFF95A6).w
; $01749E
	move.w	#$000F,($FFFF95A8).w
; $0174A4
	move.l	#$000174B8,($FFFF8004).w
; $0174AC
	move.l	#$0000DA50,d0
; $0174B2
	jmp	($0085EE).l
; $0174B8
	lea	($FFFF9522).w,a1
; $0174BC
	jsr	($0091D0).l
; $0174C2
	move.l	#$0001595A,($FFFF8004).w
; $0174CA
	move.l	#$00009334,d0
; $0174D0
	jsr	($0085EE).l
; $0174D6
	rts

loc_0174D8:				; $0174D8
	move.l	#$FFFF9522,($FFFF95A2).w
; $0174E0
	move.w	#$000F,($FFFF95A8).w
; $0174E6
	move.l	#$0001595A,($FFFF8004).w
; $0174EE
	move.l	#$0000DA8A,d0
; $0174F4
	jsr	($0085EE).l
; $0174FA
	move.l	#$00009334,d0
; $017500
	jsr	($0085EE).l
; $017506
	rts

loc_017508:				; $017508
	move.w	#$0002,($FFFFAA2C).l
; $017510
	move.b	(a0),d0
; $017512
	beq.w	loc_01753C
; $017516
	lea	($FF4000).l,a0
; $01751C
	move.l	#$80008000,d1
; $017522
	move.w	#$03FF,d0

loc_017526:				; $017526
	or.l	d1,(a0)+
; $017528
	dbf	d0,loc_017526
; $01752C
	jsr	($00F5A8).l
; $017532
	jsr	($00A6EA).l
; $017538
	bra.w	loc_01755E

loc_01753C:				; $01753C
	lea	($FF4000).l,a0
; $017542
	move.l	#$7FFF7FFF,d1
; $017548
	move.w	#$03FF,d0

loc_01754C:				; $01754C
	exg	d1,a0
; $01754E
	dbf	d0,loc_01754C
; $017552
	jsr	($00F5C6).l
; $017558
	jsr	($00A6EA).l

loc_01755E:				; $01755E
	move.l	#$0001595A,($FFFF8004).w
; $017566
	rts

loc_017568:				; $017568
	move.w	#$0002,($FFFFAA2C).l
; $017570
	movea.l	($FFFFAE4C).l,a2
; $017576
	moveq	#0,d0
; $017578
	move.b	(a0),d0
; $01757A
	move.w	d0,(a2)+
; $01757C
	jsr	($011DA4).l
; $017582
	beq.w	loc_01595A
; $017586
	movea.l	d0,a1
; $017588
	move.w	$6(a1),(a2)+
; $01758C
	move.l	a2,($FFFFAE4C).l
; $017592
	bra.w	loc_01595A

loc_017596:				; $017596
	move.w	#$0002,($FFFFAA2C).l
; $01759E
	lea	($FFFFAE50).l,a2

loc_0175A4:				; $0175A4
	cmpa.l	($FFFFAE4C).l,a2
; $0175AA
	beq.w	loc_01595A
; $0175AE
	move.w	(a2)+,d0
; $0175B0
	jsr	($011DA4).l
; $0175B6
	movea.l	d0,a1
; $0175B8
	move.w	(a2)+,$6(a1)
; $0175BC
	bra.w	loc_0175A4

loc_0175C0:				; $0175C0
	move.w	#$0004,($FFFFAA2C).l
; $0175C8
	move.b	(a0),d0
; $0175CA
	jsr	($011DA4).l
; $0175D0
	beq.w	loc_01595A
; $0175D4
	movea.l	d0,a1
; $0175D6
	move.b	$1(a0),d0
; $0175DA
	cmpi.b	#$FF,d0
; $0175DE
	beq.w	loc_0175EC
; $0175E2
	move.b	d0,$6(a1)
; $0175E6
	move.b	$2(a0),$7(a1)

loc_0175EC:				; $0175EC
	moveq	#0,d0
; $0175EE
	move.b	$6(a1),d0
; $0175F2
	pea	d0
; $0175F4
	move.b	$7(a1),d0
; $0175F8
	move.l	d0,($FFFFA6EE).w
; $0175FC
	move.l	a1,($FFFFAE44).l
; $017602
	move.b	#$01,($FFFFA6F9).w
; $017608
	move.l	#$0001761C,($FFFF8004).w
; $017610
	move.l	#$0000FFBA,d0
; $017616
	jmp	($0085EE).l
; $01761C
	move.b	#$00,($FFFFA6F9).w
; $017622
	movea.l	($FFFFAE44).l,a1
; $017628
	lea	($FF5000).l,a2
; $01762E
	moveq	#0,d4
; $017630
	move.b	$6(a1),d4
; $017634
	moveq	#0,d5
; $017636
	move.b	$7(a1),d5
; $01763A
	move.w	d5,d0
; $01763C
	mulu.w	($FFFF9F2C).w,d0
; $017640
	add.w	d4,d0
; $017642
	add.w	d0,d0
; $017644
	move.w	$4(a1),($0,a2,d0.w)
; $01764A
	lea	($FF4000).l,a2
; $017650
	move.b	$20(a1),d2
; $017654
	andi.b	#$00,(-$10,a2,d0.w)
; $01765A
	or.b	d2,($0,a2,d0.w)
; $01765E
	jsr	($00C254).l
; $017664
	move.l	#$0001595A,($FFFF8004).w
; $01766C
	rts

loc_01766E:				; $01766E
	move.w	#$0004,($FFFFAA2C).l
; $017676
	move.b	(a0),d0
; $017678
	jsr	($011DA4).l
; $01767E
	beq.w	loc_01595A
; $017682
	move.b	(a0),d0
; $017684
	tst.b	$1(a0)
; $017688
	beq.w	loc_017694
; $01768C
	bsr.w	loc_0177D0
; $017690
	bra.w	loc_01595A

loc_017694:				; $017694
	bsr.w	loc_0177A4
; $017698
	bra.w	loc_01595A

loc_01769C:				; $01769C
	move.w	#$0002,($FFFFAA2C).l
; $0176A4
	move.l	#$FFFF94A2,($FFFF95A2).w
; $0176AC
	moveq	#0,d0
; $0176AE
	move.b	(a0),d0
; $0176B0
	move.w	d0,($FFFF95A6).w
; $0176B4
	move.w	#$000F,($FFFF95A8).w
; $0176BA
	move.l	#$000176CE,($FFFF8004).w
; $0176C2
	move.l	#$00009334,d0
; $0176C8
	jmp	($0085EE).l
; $0176CE
	bra.w	loc_01595A

loc_0176D2:				; $0176D2
	move.w	#$0002,($FFFFAA2C).l
; $0176DA
	lea	($FF4000).l,a0
; $0176E0
	lea	($FF5000).l,a1
; $0176E6
	moveq	#-1,d1
; $0176E8
	move.w	#$03FF,d0

loc_0176EC:				; $0176EC
	clr.l	(a0)+
; $0176EE
	move.l	d1,(a1)+
; $0176F0
	dbf	d0,loc_0176EC
; $0176F4
	bra.w	loc_01595A

loc_0176F8:				; $0176F8
	move.w	#$0004,($FFFFAA2C).l
; $017700
	moveq	#0,d0
; $017702
	move.b	(a0)+,d0
; $017704
	jsr	($011DA4).l
; $01770A
	beq.w	loc_01595A
; $01770E
	movea.l	d0,a1
; $017710
	move.b	(a0)+,d0
; $017712
	beq.w	loc_017732
; $017716
	tst.b	$5C(a1)
; $01771A
	bne.w	loc_017724
; $01771E
	move.b	$20(a1),$5C(a1)

loc_017724:				; $017724
	move.b	d0,$20(a1)
; $017728
	ori.b	#$02,$20(a1)
; $01772E
	bra.w	loc_01595A

loc_017732:				; $017732
	move.b	$5C(a1),d0
; $017736
	beq.w	loc_017744
; $01773A
	move.b	$5C(a1),$20(a1)
; $017740
	clr.b	$5C(a1)

loc_017744:				; $017744
	bset	#5,$2(a1)
; $01774A
	bra.w	loc_01595A

loc_01774E:				; $01774E
	move.w	#$0002,($FFFFAA2C).l
; $017756
	moveq	#0,d0
; $017758
	move.b	(a0),d0
; $01775A
	move.b	($12,pc,d0.w),($FFFFA6DA).w
; $017760
	clr.b	($FFFFA6DB).w
; $017764
	jsr	($00FD7A).l
; $01776A
	bra.w	loc_01595A
; $01776E
	bmi.s	loc_0177DC
; $017770
	dc.w	$FD00

loc_017772:				; $017772
	move.w	#$0002,($FFFFAA2C).l
; $01777A
	tst.b	(a0)
; $01777C
	bne.w	loc_017796
; $017780
	jsr	($0094DC).l
; $017786
	move.w	#$1038,$0(a0)
; $01778C
	move.w	#$00C8,$2(a0)
; $017792
	bra.w	loc_01595A

loc_017796:				; $017796
	move.w	#$1038,d0
; $01779A
	jsr	($00955C).l
; $0177A0
	bra.w	loc_01595A

loc_0177A4:				; $0177A4
	movem.l	a7/d7,-(a7)
; $0177A8
	lea	($FF603C).l,a0
; $0177AE
	moveq	#19,d1

loc_0177B0:				; $0177B0
	cmp.b	$1(a0),d0
; $0177B4
	beq.w	loc_0177C4
; $0177B8
	adda.w	#$0060,a0
; $0177BC
	dbf	d1,loc_0177B0
; $0177C0
	bra.w	loc_0177CA

loc_0177C4:				; $0177C4
	ori.b	#$08,$80(a0)

loc_0177CA:				; $0177CA
	movem.l	(a7)+,d7/a6
; $0177CE
	rts

loc_0177D0:				; $0177D0
	movem.l	a6/d7,-(a7)
; $0177D4
	lea	($FF603C).l,a0
; $0177DA
	moveq	#19,d1

loc_0177DC:				; $0177DC
	cmp.b	$1(a0),d0
; $0177E0
	beq.w	loc_0177F0
; $0177E4
	adda.w	#$0060,a0
; $0177E8
	dbf	d1,loc_0177DC
; $0177EC
	bra.w	loc_017800

loc_0177F0:				; $0177F0
	moveq	#6,d1

loc_0177F2:				; $0177F2
	adda.w	#$000C,a0
; $0177F6
	ori.b	#$02,$80(a0)
; $0177FC
	dbf	d1,loc_0177F2

loc_017800:				; $017800
	movem.l	(a7)+,d7/a6
; $017804
	rts

loc_017806:				; $017806
	movem.l	a6/a5/a4/d6/d4/d3,-(a7)
; $01780A
	lea	($FFFFA4CC).w,a3
; $01780E
	move.b	d1,$1(a1)
; $017812
	move.b	#$03,$20(a1)
; $017818
	subq.w	#1,d1
; $01781A
	rol.w	#3,d1
; $01781C
	move.w	d1,d2
; $01781E
	add.w	d1,d1
; $017820
	add.w	d2,d1
; $017822
	move.b	($0,a3,d1.w),$0(a1)
; $017828
	move.b	($1,a3,d1.w),d2
; $01782C
	move.b	d2,$38(a1)
; $017830
	move.b	d2,$39(a1)
; $017834
	move.w	($2,a3,d1.w),$2E(a1)
; $01783A
	move.w	($4,a3,d1.w),$3A(a1)
; $017840
	move.l	($6,a3,d1.w),$50(a1)
; $017846
	move.b	($C,a3,d1.w),$15(a1)
; $01784C
	move.b	($D,a3,d1.w),$5F(a1)
; $017852
	move.b	($E,a3,d1.w),$9(a1)
; $017858
	move.b	($F,a3,d1.w),$A(a1)
; $01785E
	move.b	($10,a3,d1.w),$B(a1)
; $017864
	clr.b	$5E(a1)
; $017868
	clr.b	$5C(a1)
; $01786C
	cmpi.b	#$0B,$1D(a1)
; $017872
	bne.w	loc_01788E
; $017876
	move.b	$39(a1),d2
; $01787A
	add.b	d2,d2
; $01787C
	cmpi.b	#$64,d2
; $017880
	bmi.w	loc_017886
; $017884
	moveq	#99,d2

loc_017886:				; $017886
	move.b	d2,$38(a1)
; $01788A
	move.b	d2,$39(a1)

loc_01788E:				; $01788E
	moveq	#0,d2
; $017890
	move.b	$0(a1),d2
; $017894
	mulu.w	#$001C,d2
; $017898
	lea	($05EDDC).l,a4
; $01789E
	adda.w	d2,a4
; $0178A0
	move.b	$D(a4),$44(a1)
; $0178A6
	move.b	$E(a4),$45(a1)
; $0178AC
	move.b	$F(a4),d2
; $0178B0
	add.b	($16,a3,d1.w),d2
; $0178B4
	move.b	d2,$46(a1)
; $0178B8
	move.b	$10(a4),$47(a1)
; $0178BE
	move.b	$13(a4),$50(a1)
; $0178C4
	lea	($082A56).l,a4
; $0178CA
	moveq	#0,d2
; $0178CC
	move.b	$1(a1),d2
; $0178D0
	subq.w	#1,d2
; $0178D2
	add.w	d2,d2
; $0178D4
	move.w	d2,d3
; $0178D6
	add.w	d2,d2
; $0178D8
	add.w	d3,d2
; $0178DA
	move.b	($3,a4,d2.w),d3
; $0178DE
	add.b	d3,$46(a1)
; $0178E2
	move.b	($4,a4,d2.w),d3
; $0178E6
	add.b	d3,$47(a1)
; $0178EA
	move.b	($5,a4,d2.w),d3
; $0178EE
	add.b	d3,$44(a1)
; $0178F2
	move.b	$1(a1),d3
; $0178F6
	jsr	($01113E).l
; $0178FC
	jsr	($0111BC).l
; $017902
	jsr	($011208).l
; $017908
	moveq	#0,d4
; $01790A
	move.b	$6(a1),d4
; $01790E
	moveq	#0,d5
; $017910
	move.b	$7(a1),d5
; $017914
	jsr	($00C254).l
; $01791A
	movem.l	(a7)+,d3/d4/d6/a4/a5/a6
; $01791E
	rts
; $017920
	lea	($FFFF9422).w,a0
; $017924
	lea	($FFFF9522).w,a1
; $017928
	move.w	#$001F,d0

loc_01792C:				; $01792C
	move.l	(a0)+,(a1)+
; $01792E
	dbf	d0,loc_01792C
; $017932
	movea.l	($FFFFA628).w,a0
; $017936
	ori.b	#$08,$40(a0)
; $01793C
	move.l	#$00017956,($FFFF8004).w
; $017944
	move.l	#$0000DA8A,d0
; $01794A
	jsr	($0085EE).l
; $017950
	jmp	($00DA8A).l
; $017956
	movea.l	($FFFFA628).w,a0
; $01795A
	ori.b	#$08,$40(a0)
; $017960
	moveq	#-1,d0
; $017962
	jsr	($00A89C).l
; $017968
	jsr	($00A16A).l
; $01796E
	lea	($FFFF9F62).w,a1
; $017972
	moveq	#3,d1
; $017974
	jsr	($009192).l
; $01797A
	move.l	#$00017984,($FFFF8004).w
; $017982
	rts
; $017984
	jsr	($00A6EA).l
; $01798A
	move.l	#$00017994,($FFFF8004).w
; $017992
	rts
; $017994
	movea.l	($FFFFA628).w,a0
; $017998
	lea	($FF3000).l,a1
; $01799E
	lea	($FF4000).l,a2
; $0179A4
	moveq	#0,d1
; $0179A6
	move.b	$0(a0),d1
; $0179AA
	move.l	($FFFFA6EA).w,($FFFFA8C6).w
; $0179B0
	jsr	($011834).l
; $0179B6
	moveq	#0,d0
; $0179B8
	move.b	$6(a0),d1
; $0179BC
	move.w	d1,d0
; $0179BE
	pea	d0
; $0179C0
	move.b	$7(a0),d2
; $0179C4
	move.w	d2,d0
; $0179C6
	mulu.w	($FFFF9F2C).w,d2
; $0179CA
	add.w	d1,d2
; $0179CC
	add.w	d2,d2
; $0179CE
	andi.b	#$00,(-$10,a2,d0.w)
; $0179D4
	move.l	d0,($FFFFA6EE).w
; $0179D8
	move.l	#$000179FA,($FFFF8004).w
; $0179E0
	movem.l	a7/d7,-(a7)
; $0179E4
	move.l	#$0000FFBA,d0
; $0179EA
	jsr	($0085EE).l
; $0179F0
	movem.l	(a7)+,d7/a7
; $0179F4
	jmp	($00FFBA).l
; $0179FA
	movea.l	($FFFFA628).w,a0
; $0179FE
	move.w	($FFFFA6DE).w,d4
; $017A02
	move.w	($FFFFA6E0).w,d5
; $017A06
	jsr	($011706).l
; $017A0C
	movea.l	($FFFFA628).w,a0
; $017A10
	bset	#6,$8(a0)
; $017A16
	move.b	$4(a0),d0
; $017A1A
	jsr	($00A89C).l
; $017A20
	jsr	($00A16A).l
; $017A26
	lea	($FFFF9F62).w,a1
; $017A2A
	moveq	#3,d1
; $017A2C
	jsr	($009192).l
; $017A32
	move.l	#$00017A3C,($FFFF8004).w
; $017A3A
	rts
; $017A3C
	jsr	($01113E).l
; $017A42
	jsr	($0111BC).l
; $017A48
	jsr	($00A6EA).l
; $017A4E
	move.l	#$00017A62,($FFFF8004).w
; $017A56
	move.l	#$0000DA50,d0
; $017A5C
	jmp	($0085EE).l
; $017A62
	lea	($FFFF9422).w,a0
; $017A66
	lea	($FFFF9522).w,a1
; $017A6A
	move.w	#$001F,d0

loc_017A6E:				; $017A6E
	move.l	(a1)+,(a0)+
; $017A70
	dbf	d0,loc_017A6E
; $017A74
	move.w	#$0001,($FFFF95AE).w
; $017A7A
	jsr	($008608).l
; $017A80
	rts

loc_017A82:				; $017A82
	moveq	#0,d0
; $017A84
	move.b	$6(a1),d0
; $017A88
	beq.w	loc_017AD0
; $017A8C
	move.w	d0,($FFFFA6EE).w
; $017A90
	addq.w	#1,d0
; $017A92
	cmp.w	($FFFF9F2C).w,d0
; $017A96
	bcc.w	loc_017AD0
; $017A9A
	move.b	$7(a1),d0
; $017A9E
	beq.w	loc_017AD0
; $017AA2
	move.w	d0,($FFFFA6F0).w
; $017AA6
	addq.w	#1,d0
; $017AA8
	cmp.w	($FFFF9F2E).w,d0
; $017AAC
	bcc.w	loc_017AD0
; $017AB0
	move.b	#$01,($FFFFA6F9).w
; $017AB6
	move.l	#$00017ACA,($FFFF8004).w
; $017ABE
	move.l	#$0000FFBA,d0
; $017AC4
	jmp	($0085EE).l
; $017ACA
	move.b	#$00,($FFFFA6F9).w

loc_017AD0:				; $017AD0
	jsr	($008608).l
; $017AD6
	rts

loc_017AD8:				; $017AD8
	movem.l	a7/a3/d5/d4/d3,-(a7)
; $017ADC
	lea	($FF3000).l,a2
; $017AE2
	movea.l	($FFFF9F54).w,a3
; $017AE6
	movea.l	($FFFF9F58).w,a4
; $017AEA
	move.w	d2,d4
; $017AEC
	mulu.w	($FFFF9F2C).w,d4
; $017AF0
	add.w	d1,d4
; $017AF2
	add.w	d4,d4
; $017AF4
	moveq	#0,d0
; $017AF6
	move.b	d3,d0
; $017AF8
	add.w	d0,d0
; $017AFA
	bcs.w	loc_017B08
; $017AFE
	move.b	($0,a3,d0.w),($0,a2,d4.w)
; $017B04
	bra.w	loc_017B12

loc_017B08:				; $017B08
	andi.w	#$00FF,d0
; $017B0C
	move.b	($0,a4,d0.w),($0,a2,d4.w)

loc_017B12:				; $017B12
	move.b	d3,($1,a2,d4.w)
; $017B16
	movem.l	(a7)+,d3/d4/d5/a3/a7
; $017B1A
	rts

loc_017B1C:				; $017B1C
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2,-(a7)
; $017B20
	lea	($FF1000).l,a4
; $017B26
	movea.l	a4,a5
; $017B28
	move.w	d0,(a4)+
; $017B2A
	move.w	d1,(a4)+
; $017B2C
	mulu.w	($FFFF9F2C).w,d1
; $017B30
	add.w	d0,d1
; $017B32
	add.w	d1,d1
; $017B34
	move.w	d1,d0
; $017B36
	move.w	d1,(a4)+
; $017B38
	move.w	#$FFFF,(a4)
; $017B3C
	move.b	d2,($FFFF9F5C).w
; $017B40
	lea	($FF4000).l,a1
; $017B46
	movea.l	a1,a0
; $017B48
	move.l	#$FF00FF00,d2
; $017B4E
	move.w	#$03FF,d1

loc_017B52:				; $017B52
	exg	d2,a1
; $017B54
	dbf	d1,loc_017B52
; $017B58
	lea	($FF3000).l,a1
; $017B5E
	move.b	($FFFF9F5C).w,($1,a0,d0.w)

loc_017B64:				; $017B64
	move.w	(a5)+,d4
; $017B66
	cmpi.w	#$FFFF,d4
; $017B6A
	beq.w	loc_017BCE
; $017B6E
	move.w	(a5)+,d5
; $017B70
	move.w	(a5)+,d6
; $017B72
	move.b	($1,a0,d6.w),d7
; $017B76
	move.w	d4,d1
; $017B78
	addq.w	#1,d1
; $017B7A
	move.w	d5,d2
; $017B7C
	move.w	d6,d3
; $017B7E
	addq.w	#2,d3
; $017B80
	bsr.w	loc_017BFA
; $017B84
	move.w	d4,d1
; $017B86
	subq.w	#1,d1
; $017B88
	move.w	d5,d2
; $017B8A
	move.w	d6,d3
; $017B8C
	subq.w	#2,d3
; $017B8E
	bsr.w	loc_017BFA
; $017B92
	move.w	d4,d1
; $017B94
	move.w	d5,d2
; $017B96
	subq.w	#1,d2
; $017B98
	move.w	d6,d3
; $017B9A
	sub.w	($FFFF9F2C).w,d3
; $017B9E
	sub.w	($FFFF9F2C).w,d3
; $017BA2
	bsr.w	loc_017BFA
; $017BA6
	move.w	d4,d1
; $017BA8
	move.w	d5,d2
; $017BAA
	addq.w	#1,d2
; $017BAC
	move.w	d6,d3
; $017BAE
	add.w	($FFFF9F2C).w,d3
; $017BB2
	add.w	($FFFF9F2C).w,d3
; $017BB6
	bsr.w	loc_017BFA
; $017BBA
	cmpa.l	#$00FF2000,a5
; $017BC0
	blt.w	loc_017B64
; $017BC4
	lea	($FF1000).l,a5
; $017BCA
	bra.w	loc_017B64

loc_017BCE:				; $017BCE
	movea.l	a0,a1
; $017BD0
	addq.l	#1,a0
; $017BD2
	move.w	#$07FF,d0

loc_017BD6:				; $017BD6
	tst.b	(a0)
; $017BD8
	bne.w	loc_017BE4
; $017BDC
	ori.b	#$80,(a1)
; $017BE0
	bra.w	loc_017BE8

loc_017BE4:				; $017BE4
	andi.b	#$7F,(a1)

loc_017BE8:				; $017BE8
	adda.w	#$0002,a0
; $017BEC
	adda.w	#$0002,a1
; $017BF0
	dbf	d0,loc_017BD6
; $017BF4
	movem.l	(a7)+,d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $017BF8
	rts

loc_017BFA:				; $017BFA
	movem.l	a7/a1/a0,-(a7)
; $017BFE
	cmpi.w	#$0000,d1
; $017C02
	ble.w	loc_017C72
; $017C06
	move.w	($FFFF9F2C).w,d0
; $017C0A
	subq.w	#1,d0
; $017C0C
	cmp.w	d0,d1
; $017C0E
	bge.w	loc_017C72
; $017C12
	cmpi.w	#$0000,d2
; $017C16
	ble.w	loc_017C72
; $017C1A
	move.w	($FFFF9F2E).w,d0
; $017C1E
	subq.w	#1,d0
; $017C20
	cmp.w	d0,d2
; $017C22
	bge.w	loc_017C72
; $017C26
	moveq	#0,d6
; $017C28
	move.b	($0,a1,d3.w),d6
; $017C2C
	cmpi.b	#$06,d6
; $017C30
	beq.w	loc_017C72
; $017C34
	cmpi.b	#$0D,d6
; $017C38
	beq.w	loc_017C72
; $017C3C
	cmpi.b	#$14,d6
; $017C40
	beq.w	loc_017C72
; $017C44
	move.b	($1,a0,d3.w),d0
; $017C48
	subq.b	#1,d7
; $017C4A
	bls.w	loc_017C72
; $017C4E
	cmp.b	d0,d7
; $017C50
	bls.w	loc_017C72
; $017C54
	move.b	d7,($1,a0,d3.w)
; $017C58
	move.w	d1,(a4)+
; $017C5A
	move.w	d2,(a4)+
; $017C5C
	move.w	d3,(a4)+
; $017C5E
	cmpa.l	#$00FF2000,a4
; $017C64
	blt.w	loc_017C6E
; $017C68
	lea	($FF1000).l,a4

loc_017C6E:				; $017C6E
	move.w	#$FFFF,(a4)

loc_017C72:				; $017C72
	movem.l	(a7)+,a0/a1/a7
; $017C76
	rts

loc_017C78:				; $017C78
	movem.l	a7/d5,-(a7)
; $017C7C
	movea.l	($FFFFAA30).l,a2
; $017C82
	tst.w	d0
; $017C84
	beq.w	loc_017C94
; $017C88
	move.w	#$FFF7,(a2)+
; $017C8C
	move.w	d0,(a2)+
; $017C8E
	move.w	#$FFF7,(a2)+
; $017C92
	clr.w	(a2)+

loc_017C94:				; $017C94
	move.l	a2,($FFFFAA30).l
; $017C9A
	movem.l	(a7)+,d5/a7
; $017C9E
	rts

loc_017CA0:				; $017CA0
	move.w	d1,($FFFFAE42).l
; $017CA6
	lea	($FFFFAA34).l,a1
; $017CAC
	lea	($001066).l,a2
; $017CB2
	subq.w	#1,d1
; $017CB4
	add.w	d1,d1
; $017CB6
	add.w	d1,d1
; $017CB8
	movea.l	($0,a2,d1.w),a2
; $017CBC
	move.w	#$FFFF,($FFFFAA2E).l

loc_017CC4:				; $017CC4
	move.w	(a2)+,d0
; $017CC6
	move.w	d0,(a1)+
; $017CC8
	cmpi.w	#$FFFF,d0
; $017CCC
	bne.w	loc_017CC4
; $017CD0
	move.w	#$FFFE,-(a1)
; $017CD4
	adda.w	#$0002,a1
; $017CD8
	movea.l	($082ABA).l,a2

loc_017CDE:				; $017CDE
	move.w	(a2)+,d0
; $017CE0
	move.w	d0,(a1)+
; $017CE2
	cmpi.w	#$FFFF,d0
; $017CE6
	bne.w	loc_017CDE
; $017CEA
	jsr	($008608).l
; $017CF0
	move.l	#$0000DA8A,d0
; $017CF6
	jsr	($0085EE).l
; $017CFC
	move.l	#$0002B3AA,d0
; $017D02
	jsr	($0085EE).l
; $017D08
	move.l	#$0000DA50,d0
; $017D0E
	jsr	($0085EE).l
; $017D14
	rts

loc_017D16:				; $017D16
	move.w	($FFFFAE42).l,d0
; $017D1C
	lea	($FFFFC7F2).w,a1
; $017D20
	moveq	#39,d1

loc_017D22:				; $017D22
	move.w	(a1),d2
; $017D24
	bmi.w	loc_017D7E
; $017D28
	adda.w	#$0002,a1
; $017D2C
	dbf	d1,loc_017D22
; $017D30
	move.l	#$00017D52,($FFFF8004).w
; $017D38
	movem.l	a7/d7,-(a7)
; $017D3C
	move.l	#$0000DA50,d0
; $017D42
	jsr	($0085EE).l
; $017D48
	movem.l	(a7)+,d7/a7
; $017D4C
	jmp	($00DA50).l
; $017D52
	move.l	#$00017D66,($FFFF8004).w
; $017D5A
	move.l	#$00026236,d0
; $017D60
	jmp	($0085EE).l
; $017D66
	move.l	#$00017D7A,($FFFF8004).w
; $017D6E
	move.l	#$0000DA8A,d0
; $017D74
	jmp	($0085EE).l
; $017D7A
	bra.w	loc_017D84

loc_017D7E:				; $017D7E
	move.b	d0,(a1)+
; $017D80
	move.b	#$FF,(a1)

loc_017D84:				; $017D84
	jsr	($008608).l
; $017D8A
	rts
; $017D8C
	lea	($FFFFAA34).l,a0
; $017D92
	lea	($FFFFC7F2).w,a1
; $017D96
	moveq	#39,d0
; $017D98
	moveq	#0,d1
; $017D9A
	moveq	#0,d2

loc_017D9C:				; $017D9C
	move.b	$1(a1),d3
; $017DA0
	cmpi.b	#$FF,d3
; $017DA4
	bne.w	loc_017DCA
; $017DA8
	moveq	#0,d3
; $017DAA
	move.b	(a1),d3
; $017DAC
	cmpi.b	#$08,d3
; $017DB0
	beq.w	loc_017DCA
; $017DB4
	cmpi.b	#$09,d3
; $017DB8
	beq.w	loc_017DCA
; $017DBC
	cmpi.b	#$26,d3
; $017DC0
	beq.w	loc_017DCA
; $017DC4
	move.w	d1,(a0)+
; $017DC6
	move.w	d3,(a0)+
; $017DC8
	addq.w	#1,d2

loc_017DCA:				; $017DCA
	addq.w	#1,d1
; $017DCC
	adda.w	#$0002,a1
; $017DD0
	dbf	d0,loc_017D9C
; $017DD4
	move.w	($FFFFAE42).l,d3
; $017DDA
	cmpi.b	#$08,d3
; $017DDE
	beq.w	loc_017DF8
; $017DE2
	cmpi.b	#$09,d3
; $017DE6
	beq.w	loc_017DF8
; $017DEA
	cmpi.b	#$26,d3
; $017DEE
	beq.w	loc_017DF8
; $017DF2
	move.w	d1,(a0)+
; $017DF4
	move.w	d3,(a0)+
; $017DF6
	addq.w	#1,d2

loc_017DF8:				; $017DF8
	move.w	#$FFFF,(a0)
; $017DFC
	lea	($FFFFAAFC).l,a0
; $017E02
	move.w	d2,d0

loc_017E04:				; $017E04
	move.w	d0,d1
; $017E06
	cmpi.b	#$05,d0
; $017E0A
	bls.w	loc_017E10
; $017E0E
	moveq	#5,d1

loc_017E10:				; $017E10
	move.w	d1,(a0)+
; $017E12
	sub.w	d1,d0
; $017E14
	bne.w	loc_017E04
; $017E18
	move.w	#$FFFF,(a0)
; $017E1C
	clr.w	($FFFFAE5E).l
; $017E22
	clr.w	($FFFFAE60).l
; $017E28
	move.l	#$00017E32,($FFFF8004).w
; $017E30
	rts
; $017E32
	btst	#0,($FFFF8179).w
; $017E38
	beq.w	loc_017E62
; $017E3C
	move.w	($FFFFAE60).l,d0
; $017E42
	subq.w	#1,d0
; $017E44
	bcc.w	loc_017E5C
; $017E48
	lea	($FFFFAAFC).l,a0
; $017E4E
	move.w	($FFFFAE5E).l,d1
; $017E54
	add.w	d1,d1
; $017E56
	move.w	($0,a0,d1.w),d0
; $017E5A
	subq.w	#1,d0

loc_017E5C:				; $017E5C
	move.w	d0,($FFFFAE60).l

loc_017E62:				; $017E62
	btst	#1,($FFFF8179).w
; $017E68
	beq.w	loc_017E94
; $017E6C
	move.w	($FFFFAE60).l,d0
; $017E72
	addq.w	#1,d0
; $017E74
	lea	($FFFFAAFC).l,a0
; $017E7A
	move.w	($FFFFAE5E).l,d1
; $017E80
	add.w	d1,d1
; $017E82
	move.w	($0,a0,d1.w),d1
; $017E86
	cmp.w	d1,d0
; $017E88
	bcs.w	loc_017E8E
; $017E8C
	moveq	#0,d0

loc_017E8E:				; $017E8E
	move.w	d0,($FFFFAE60).l

loc_017E94:				; $017E94
	btst	#3,($FFFF8179).w
; $017E9A
	beq.w	loc_017ECE
; $017E9E
	lea	($FFFFAAFC).l,a0
; $017EA4
	move.w	($FFFFAE5E).l,d0
; $017EAA
	addq.w	#1,d0
; $017EAC
	add.w	d0,d0
; $017EAE
	move.w	($0,a0,d0.w),d0
; $017EB2
	bmi.w	loc_017ECE
; $017EB6
	addq.w	#1,($FFFFAE5E).l
; $017EBC
	subq.w	#1,d0
; $017EBE
	cmp.w	($FFFFAE60).l,d0
; $017EC4
	bcc.w	loc_017ECE
; $017EC8
	move.w	d0,($FFFFAE60).l

loc_017ECE:				; $017ECE
	btst	#2,($FFFF8179).w
; $017ED4
	beq.w	loc_017EE8
; $017ED8
	tst.w	($FFFFAE5E).l
; $017EDE
	beq.w	loc_017EE8
; $017EE2
	subq.w	#1,($FFFFAE5E).l

loc_017EE8:				; $017EE8
	btst	#5,($FFFF8179).w
; $017EEE
	beq.w	loc_017F36
; $017EF2
	move.w	($FFFFAE5E).l,d0
; $017EF8
	mulu.w	#$0005,d0
; $017EFC
	add.w	($FFFFAE60).l,d0
; $017F02
	add.w	d0,d0
; $017F04
	add.w	d0,d0
; $017F06
	lea	($FFFFAA34).l,a0
; $017F0C
	move.w	($0,a0,d0.w),d0
; $017F10
	cmpi.w	#$0028,d0
; $017F14
	beq.w	loc_017F2E
; $017F18
	lea	($FFFFC7F2).w,a0
; $017F1C
	add.w	d0,d0
; $017F1E
	move.w	($FFFFAE42).l,d1
; $017F24
	move.b	d1,($0,a0,d0.w)
; $017F28
	move.b	#$FF,($1,a0,d0.w)

loc_017F2E:				; $017F2E
	jsr	($008608).l
; $017F34
	rts

loc_017F36:				; $017F36
	movea.w	($FFFF904C).w,a3
; $017F3A
	move.w	#$00D0,d3
; $017F3E
	move.w	($FFFFAE60).l,d0
; $017F44
	add.w	d0,d0
; $017F46
	add.w	d0,d0
; $017F48
	add.w	d0,d0
; $017F4A
	add.w	d0,d3
; $017F4C
	move.w	d3,(a3)+
; $017F4E
	move.b	#$00,(a3)+
; $017F52
	addq.b	#1,($FFFF904E).w
; $017F56
	move.b	($FFFF904E).w,(a3)+
; $017F5A
	move.w	#$801F,d4
; $017F5E
	move.w	d4,(a3)+
; $017F60
	move.w	#$00E0,(a3)+
; $017F64
	tst.w	($FFFFAE5E).l
; $017F6A
	beq.w	loc_017F88
; $017F6E
	move.w	#$00D0,(a3)+
; $017F72
	move.b	#$00,(a3)+
; $017F76
	addq.b	#1,($FFFF904E).w
; $017F7A
	move.b	($FFFF904E).w,(a3)+
; $017F7E
	move.w	#$801E,(a3)+
; $017F82
	move.w	#$00D0,(a3)+
; $017F86
	addq.w	#8,d7

loc_017F88:				; $017F88
	lea	($FFFFAAFC).l,a0
; $017F8E
	move.w	($FFFFAE5E).l,d0
; $017F94
	addq.w	#1,d0
; $017F96
	add.w	d0,d0
; $017F98
	move.w	($0,a0,d0.w),d0
; $017F9C
	bmi.w	loc_017FBA
; $017FA0
	move.w	#$00D0,(a3)+
; $017FA4
	move.b	#$00,(a3)+
; $017FA8
	addq.b	#1,($FFFF904E).w
; $017FAC
	move.b	($FFFF904E).w,(a3)+
; $017FB0
	move.w	#$801F,(a3)+
; $017FB4
	move.w	#$0148,(a3)+
; $017FB8
	addq.w	#8,d7

loc_017FBA:				; $017FBA
	lea	($FFFFAAFC).l,a0
; $017FC0
	move.w	($FFFFAE5E).l,d0
; $017FC6
	add.w	d0,d0
; $017FC8
	move.w	($0,a0,d0.w),d1
; $017FCC
	subq.w	#1,d1
; $017FCE
	lea	($FFFFAA34).l,a0
; $017FD4
	lea	($060364).l,a1
; $017FDA
	move.w	($FFFFAE5E).l,d2
; $017FE0
	mulu.w	#$0005,d2
; $017FE4
	add.w	d2,d2
; $017FE6
	add.w	d2,d2
; $017FE8
	addq.w	#2,d2
; $017FEA
	move.w	#$00D0,d3

loc_017FEE:				; $017FEE
	move.w	($0,a0,d2.w),d5
; $017FF2
	add.w	d5,d5
; $017FF4
	add.w	d5,d5
; $017FF6
	movea.l	($0,a1,d5.w),a2
; $017FFA
	move.w	#$00E8,d7

loc_017FFE:				; $017FFE
	move.b	(a2)+,d5
; $018000
	cmpi.b	#$FF,d5
; $018004
	beq.w	loc_018024
; $018008
	move.w	d3,(a3)+
; $01800A
	move.b	#$00,(a3)+
; $01800E
	addq.b	#1,($FFFF904E).w
; $018012
	move.b	($FFFF904E).w,(a3)+
; $018016
	move.w	#$8000,d4
; $01801A
	add.b	d5,d4
; $01801C
	move.w	d4,(a3)+
; $01801E
	move.w	d7,(a3)+
; $018020
	addq.w	#8,d7
; $018022
	bra.s	loc_017FFE

loc_018024:				; $018024
	addq.w	#4,d2
; $018026
	addq.w	#8,d3
; $018028
	dbf	d1,loc_017FEE
; $01802C
	lea	($0180BA).l,a2
; $018032
	moveq	#3,d0
; $018034
	move.w	#$0120,d7

loc_018038:				; $018038
	move.w	#$00F8,(a3)+
; $01803C
	move.b	#$00,(a3)+
; $018040
	addq.b	#1,($FFFF904E).w
; $018044
	move.b	($FFFF904E).w,(a3)+
; $018048
	move.w	#$8000,d4
; $01804C
	add.b	(a2)+,d4
; $01804E
	move.w	d4,(a3)+
; $018050
	move.w	d7,(a3)+
; $018052
	addq.w	#8,d7
; $018054
	dbf	d0,loc_018038
; $018058
	move.w	#$00F8,(a3)+
; $01805C
	move.b	#$00,(a3)+
; $018060
	addq.b	#1,($FFFF904E).w
; $018064
	move.b	($FFFF904E).w,(a3)+
; $018068
	move.w	#$8000,d4
; $01806C
	addi.w	#$0030,d4
; $018070
	add.w	($FFFFAE5E).l,d4
; $018076
	move.w	d4,(a3)+
; $018078
	move.w	d7,(a3)+
; $01807A
	lea	($0180AC).l,a2
; $018080
	moveq	#12,d0
; $018082
	move.w	#$00D8,d7

loc_018086:				; $018086
	move.w	#$00C8,(a3)+
; $01808A
	move.b	#$00,(a3)+
; $01808E
	addq.b	#1,($FFFF904E).w
; $018092
	move.b	($FFFF904E).w,(a3)+
; $018096
	move.w	#$8000,d4
; $01809A
	add.b	(a2)+,d4
; $01809C
	move.w	d4,(a3)+
; $01809E
	move.w	d7,(a3)+
; $0180A0
	addq.w	#8,d7
; $0180A2
	dbf	d0,loc_018086
; $0180A6
	move.w	a3,($FFFF904C).w
; $0180AA
	rts
; $0180AC
	cmpa.l	d3,a6
; $0180AE
	add.b	d4,-(a0)
; $0180B0
	eor.l	d0,(-$2F,a2,a4.w)
; $0180B4
	move.l	?ea(7,6),(a0)
; $0180B6
	adda.l	d0,a6
; $0180B8
	cmpa.w	?ea(7,7),a4
; $0180BA
	addq.w	#8,d1
; $0180BC
	dc.w	$4745
; $0180BE
	dc.w	$FF00
; $0180C0
	jsr	($00F6A0).l
; $0180C6
	clr.w	($FFFFAE62).l
; $0180CC
	clr.w	($FF78F4).l
; $0180D2
	cmpi.w	#$A4A0,($000001).w
; $0180D8
	bne.w	loc_0181B4
; $0180DC
	move.b	#$00,($FFFF9FEA).w
; $0180E2
	move.w	#$0450,d0
; $0180E6
	jsr	($00955C).l
; $0180EC
	move.l	#$0005DF40,($FFFF95A2).w
; $0180F4
	move.w	#$0002,($FFFF95A6).w
; $0180FA
	move.w	#$000F,($FFFF95A8).w
; $018100
	move.l	#$00018114,($FFFF8004).w
; $018108
	move.l	#$00009334,d0
; $01810E
	jmp	($0085EE).l
; $018114
	move.b	#$00,($FFFFA6F6).w
; $01811A
	move.b	#$00,($FFFF9FE2).w
; $018120
	move.b	#$00,($FFFF9FE3).w
; $018126
	move.b	#$00,($FFFF9FFB).w
; $01812C
	move.l	($FFFF9050).w,($FFFFAE70).l
; $018134
	move.l	($FFFF9054).w,($FFFFAE74).l
; $01813C
	jsr	($009020).l
; $018142
	lea	($05DF40).l,a1
; $018148
	lea	($FFFF9562).w,a2
; $01814C
	jsr	($0091B6).l
; $018152
	lea	($FFFF9582).w,a2
; $018156
	jsr	($0091B6).l
; $01815C
	jsr	($01C622).l
; $018162
	jsr	($00F5A8).l
; $018168
	moveq	#16,d1
; $01816A
	jsr	($00C7D0).l
; $018170
	move.w	#$8000,d1
; $018174
	move.w	#$D800,d2
; $018178
	movea.l	($FFFF81C4).w,a1
; $01817C
	lea	($085F82).l,a2
; $018182
	jsr	($0097DC).l
; $018188
	move.l	a1,($FFFF81C4).w
; $01818C
	jsr	($008A6C).l
; $018192
	movea.l	($FFFF81C4).w,a1
; $018196
	move.w	#$FFF5,(a1)+
; $01819A
	move.w	#$C000,(a1)+
; $01819E
	move.w	#$8000,(a1)+
; $0181A2
	move.w	#$0400,(a1)+
; $0181A6
	move.w	#$0002,(a1)+
; $0181AA
	move.l	a1,($FFFF81C4).w
; $0181AE
	jsr	($008A6C).l

loc_0181B4:				; $0181B4
	bsr.w	loc_01B982
; $0181B8
	movea.l	($FFFFA62C).w,a0
; $0181BC
	moveq	#0,d0
; $0181BE
	move.b	$6(a0),d0
; $0181C2
	move.w	d0,d4
; $0181C4
	moveq	#0,d1
; $0181C6
	move.b	$7(a0),d1
; $0181CA
	move.w	d1,d5
; $0181CC
	movea.l	($FFFFA634).w,a1
; $0181D0
	moveq	#0,d2
; $0181D2
	move.b	$6(a1),d2
; $0181D6
	moveq	#0,d3
; $0181D8
	move.b	$7(a1),d3
; $0181DC
	sub.w	d2,d4
; $0181DE
	bcc.w	loc_0181E4
; $0181E2
	neg.w	d4

loc_0181E4:				; $0181E4
	sub.w	d3,d5
; $0181E6
	bcc.w	loc_0181EC
; $0181EA
	neg.w	d5

loc_0181EC:				; $0181EC
	lea	($FF3000).l,a2
; $0181F2
	add.w	d4,d5
; $0181F4
	cmpi.w	#$0001,d5
; $0181F8
	beq.w	loc_0183AE
; $0181FC
	move.w	#$0001,($FFFFAE86).l
; $018204
	move.w	#$0001,($FFFFAE7C).l
; $01820C
	clr.w	($FFFFAE7E).l
; $018212
	mulu.w	($FFFF9F2C).w,d1
; $018216
	add.w	d0,d1
; $018218
	add.w	d1,d1
; $01821A
	moveq	#0,d0
; $01821C
	move.b	($0,a2,d1.w),d0
; $018220
	lea	($082E3A).l,a2
; $018226
	moveq	#0,d1
; $018228
	move.b	($0,a2,d0.w),d1
; $01822C
	move.w	d1,($FFFFAE78).l
; $018232
	cmpi.w	#$A4A0,($000001).w
; $018238
	bne.w	loc_018298
; $01823C
	move.w	d1,d2
; $01823E
	add.w	d1,d1
; $018240
	lea	($08654C).l,a0
; $018246
	move.w	($0,a0,d1.w),d0
; $01824A
	movea.w	#$A000,a1
; $01824E
	jsr	($0099B2).l
; $018254
	move.w	d2,d0
; $018256
	lsl.w	#5,d2
; $018258
	lea	($0830F8).l,a1
; $01825E
	adda.w	d2,a1
; $018260
	lea	($FFFF94E2).w,a2
; $018264
	jsr	($0091B6).l
; $01826A
	add.w	d0,d0
; $01826C
	add.w	d0,d0
; $01826E
	add.w	d0,d0
; $018270
	lea	($083378).l,a0
; $018276
	addq.w	#4,d0
; $018278
	movea.l	($0,a0,d0.w),a2
; $01827C
	move.w	#$4D00,d1
; $018280
	move.w	#$E000,d2
; $018284
	movea.l	($FFFF81C4).w,a1
; $018288
	jsr	($0097DC).l
; $01828E
	move.l	a1,($FFFF81C4).w
; $018292
	jsr	($008A6C).l

loc_018298:				; $018298
	move.w	($FFFFAE78).l,d0
; $01829E
	add.w	d0,d0
; $0182A0
	add.w	d0,d0
; $0182A2
	lea	($01B7BE).l,a0
; $0182A8
	jsr	($0,a0,d0.w)
; $0182AC
	lea	($FF67BC).l,a0
; $0182B2
	lea	($FF1280).l,a1
; $0182B8
	move.w	#$009F,d0

loc_0182BC:				; $0182BC
	move.w	-(a1),(a0)+
; $0182BE
	dbf	d0,loc_0182BC
; $0182C2
	lea	($FF3000).l,a2
; $0182C8
	movea.l	($FFFFA634).w,a0
; $0182CC
	moveq	#0,d0
; $0182CE
	move.b	$6(a0),d0
; $0182D2
	moveq	#0,d1
; $0182D4
	move.b	$7(a0),d1
; $0182D8
	mulu.w	($FFFF9F2C).w,d1
; $0182DC
	add.w	d0,d1
; $0182DE
	add.w	d1,d1
; $0182E0
	moveq	#0,d0
; $0182E2
	move.b	($0,a2,d1.w),d0
; $0182E6
	lea	($082E3A).l,a2
; $0182EC
	moveq	#0,d1
; $0182EE
	move.b	($0,a2,d0.w),d1
; $0182F2
	move.w	d1,($FFFFAE7A).l
; $0182F8
	cmpi.w	#$A4A0,($000001).w
; $0182FE
	bne.w	loc_018380
; $018302
	move.w	d1,d2
; $018304
	add.w	d1,d1
; $018306
	lea	($08654C).l,a0
; $01830C
	move.w	($0,a0,d1.w),d0
; $018310
	movea.w	#$B000,a1
; $018314
	jsr	($0099B2).l
; $01831A
	move.w	d2,d0
; $01831C
	lsl.w	#5,d2
; $01831E
	lea	($0830F8).l,a1
; $018324
	adda.w	d2,a1
; $018326
	lea	($FFFF9502).w,a2
; $01832A
	jsr	($0091B6).l
; $018330
	add.w	d0,d0
; $018332
	add.w	d0,d0
; $018334
	add.w	d0,d0
; $018336
	lea	($083378).l,a0
; $01833C
	addq.w	#4,d0
; $01833E
	movea.l	($0,a0,d0.w),a2
; $018342
	move.w	#$6580,d1
; $018346
	move.w	#$E028,d2
; $01834A
	movea.l	($FFFF81C4).w,a1
; $01834E
	jsr	($0097DC).l
; $018354
	move.l	a1,($FFFF81C4).w
; $018358
	jsr	($008A6C).l
; $01835E
	move.w	#$8100,d1
; $018362
	move.w	#$E026,d2
; $018366
	lea	($0860A8).l,a2
; $01836C
	movea.l	($FFFF81C4).w,a1
; $018370
	jsr	($0097DC).l
; $018376
	move.l	a1,($FFFF81C4).w
; $01837A
	jsr	($008A6C).l

loc_018380:				; $018380
	move.w	($FFFFAE7A).l,d0
; $018386
	add.w	d0,d0
; $018388
	add.w	d0,d0
; $01838A
	lea	($01B7BE).l,a0
; $018390
	jsr	($0,a0,d0.w)
; $018394
	lea	($FF68FC).l,a0
; $01839A
	lea	($FF1140).l,a1
; $0183A0
	move.w	#$009F,d0

loc_0183A4:				; $0183A4
	move.w	(a1)+,(a0)+
; $0183A6
	dbf	d0,loc_0183A4
; $0183AA
	bra.w	loc_018524

loc_0183AE:				; $0183AE
	clr.w	($FFFFAE86).l
; $0183B4
	mulu.w	($FFFF9F2C).w,d1
; $0183B8
	add.w	d0,d1
; $0183BA
	add.w	d1,d1
; $0183BC
	moveq	#0,d0
; $0183BE
	move.b	($0,a2,d1.w),d0
; $0183C2
	mulu.w	($FFFF9F2C).w,d3
; $0183C6
	add.w	d2,d3
; $0183C8
	add.w	d3,d3
; $0183CA
	moveq	#0,d2
; $0183CC
	move.b	($0,a2,d3.w),d2
; $0183D0
	mulu.w	#$001A,d0
; $0183D4
	add.w	d0,d2
; $0183D6
	lea	($082E54).l,a2
; $0183DC
	moveq	#0,d0
; $0183DE
	move.b	($0,a2,d2.w),d0
; $0183E2
	move.w	d0,d1
; $0183E4
	moveq	#0,d3
; $0183E6
	clr.w	($FFFFAE7C).l
; $0183EC
	clr.w	($FFFFAE7E).l
; $0183F2
	cmpi.w	#$0014,d1
; $0183F6
	bls.w	loc_018412
; $0183FA
	subi.w	#$0014,d1
; $0183FE
	move.w	#$0800,d3
; $018402
	move.w	#$0001,($FFFFAE7C).l
; $01840A
	move.w	#$0001,($FFFFAE7E).l

loc_018412:				; $018412
	move.w	d1,d2
; $018414
	move.w	d1,($FFFFAE78).l
; $01841A
	move.w	d3,($FFFFAE7A).l
; $018420
	cmpi.w	#$A4A0,($000001).w
; $018426
	bne.w	loc_0184D6
; $01842A
	add.w	d1,d1
; $01842C
	lea	($08654C).l,a0
; $018432
	move.w	($0,a0,d1.w),d0
; $018436
	movea.w	#$A000,a1
; $01843A
	jsr	($0099B2).l
; $018440
	move.w	d2,d0
; $018442
	lsl.w	#5,d2
; $018444
	lea	($0830F8).l,a1
; $01844A
	adda.w	d2,a1
; $01844C
	lea	($FFFF94E2).w,a2
; $018450
	jsr	($0091B6).l
; $018456
	add.w	d0,d0
; $018458
	add.w	d0,d0
; $01845A
	add.w	d0,d0
; $01845C
	cmpi.w	#$A49C,($00001C).w
; $018462
	bne.w	loc_018476
; $018466
	cmpi.w	#$AE78,($11FFFF).l
; $01846E
	bne.w	loc_018476
; $018472
	move.w	#$00A0,d0

loc_018476:				; $018476
	lea	($083378).l,a0
; $01847C
	movea.l	($0,a0,d0.w),a2
; $018480
	move.w	#$4500,d1
; $018484
	add.w	d3,d1
; $018486
	move.w	#$E000,d2
; $01848A
	tst.w	d3
; $01848C
	beq.w	loc_018494
; $018490
	move.w	#$E028,d2

loc_018494:				; $018494
	movea.l	($FFFF81C4).w,a1
; $018498
	jsr	($0097DC).l
; $01849E
	move.l	a1,($FFFF81C4).w
; $0184A2
	jsr	($008A6C).l
; $0184A8
	addq.w	#4,d0
; $0184AA
	movea.l	($0,a0,d0.w),a2
; $0184AE
	move.w	#$4500,d1
; $0184B2
	add.w	d3,d1
; $0184B4
	move.w	#$E028,d2
; $0184B8
	tst.w	d3
; $0184BA
	beq.w	loc_0184C2
; $0184BE
	move.w	#$E000,d2

loc_0184C2:				; $0184C2
	movea.l	($FFFF81C4).w,a1
; $0184C6
	jsr	($0097DC).l
; $0184CC
	move.l	a1,($FFFF81C4).w
; $0184D0
	jsr	($008A6C).l

loc_0184D6:				; $0184D6
	move.w	($FFFFAE78).l,d0
; $0184DC
	add.w	d0,d0
; $0184DE
	add.w	d0,d0
; $0184E0
	lea	($01B7BE).l,a0
; $0184E6
	jsr	($0,a0,d0.w)
; $0184EA
	tst.w	($FFFFAE7A).l
; $0184F0
	bne.w	loc_01850E
; $0184F4
	lea	($FF67BC).l,a0
; $0184FA
	lea	($FF1000).l,a1
; $018500
	move.w	#$013F,d0

loc_018504:				; $018504
	move.w	(a1)+,(a0)+
; $018506
	dbf	d0,loc_018504
; $01850A
	bra.w	loc_018524

loc_01850E:				; $01850E
	lea	($FF67BC).l,a0
; $018514
	lea	($FF1280).l,a1
; $01851A
	move.w	#$013F,d0

loc_01851E:				; $01851E
	move.w	-(a1),(a0)+
; $018520
	dbf	d0,loc_01851E

loc_018524:				; $018524
	lea	($FF6A3C).l,a2
; $01852A
	moveq	#19,d1
; $01852C
	moveq	#0,d0

loc_01852E:				; $01852E
	movea.l	a2,a1
; $018530
	moveq	#37,d2

loc_018532:				; $018532
	clr.w	(a2)+
; $018534
	dbf	d2,loc_018532
; $018538
	move.w	d0,$2(a1)
; $01853C
	addq.w	#1,d0
; $01853E
	dbf	d1,loc_01852E
; $018542
	movea.l	($FFFFA628).w,a1
; $018546
	lea	($FFFFA662).w,a2
; $01854A
	movea.l	($FFFFA62C).w,a3
; $01854E
	lea	($FFFFAE68).l,a5
; $018554
	moveq	#0,d1
; $018556
	bsr.w	loc_01B400
; $01855A
	movea.l	($FFFFA630).w,a1
; $01855E
	lea	($FFFFA694).w,a2
; $018562
	movea.l	($FFFFA634).w,a3
; $018566
	lea	($FFFFAE6C).l,a5
; $01856C
	moveq	#1,d1
; $01856E
	bsr.w	loc_01B400
; $018572
	bsr.w	loc_01AEB2
; $018576
	moveq	#0,d0
; $018578
	bsr.w	loc_01B25C
; $01857C
	moveq	#1,d0
; $01857E
	bsr.w	loc_01B25C
; $018582
	move.w	($FFFFA668).w,($FFFFAE64).l
; $01858A
	move.w	($FFFFA69A).w,($FFFFAE66).l
; $018592
	clr.w	($FFFFAE84).l
; $018598
	bsr.w	loc_01B048
; $01859C
	cmpi.w	#$A4A0,($000001).w
; $0185A2
	bne.w	loc_0188F0
; $0185A6
	jsr	($0094DC).l
; $0185AC
	move.w	#$1528,$0(a0)
; $0185B2
	lea	($FFFFA662).w,a1
; $0185B6
	move.l	a1,$2(a0)
; $0185BA
	move.w	#$D99A,$6(a0)
; $0185C0
	move.w	#$FFFF,$8(a0)
; $0185C6
	jsr	($0094DC).l
; $0185CC
	move.w	#$1528,$0(a0)
; $0185D2
	lea	($FFFFA694).w,a1
; $0185D6
	move.l	a1,$2(a0)
; $0185DA
	move.w	#$D9B0,$6(a0)
; $0185E0
	move.w	#$FFFF,$8(a0)
; $0185E6
	move.w	#$0001,($FFFF95A6).w
; $0185EC
	jsr	($0094FC).l
; $0185F2
	move.w	#$1568,$0(a0)
; $0185F8
	move.w	($FFFF95A6).w,$2(a0)
; $0185FE
	move.w	#$0001,($FFFF8170).w
; $018604
	move.w	#$0001,($FFFF8160).w
; $01860A
	move.l	#$FFFFA95C,($FFFF95A2).w
; $018612
	move.w	#$0001,($FFFF95A8).w
; $018618
	move.l	#$0001862C,($FFFF8004).w
; $018620
	move.l	#$00009334,d0
; $018626
	jmp	($0085EE).l
; $01862C
	jsr	($00951C).l
; $018632
	move.w	#$12F6,$0(a0)
; $018638
	moveq	#0,d1
; $01863A
	jsr	($018998).l
; $018640
	move.b	#$50,($FFFFA6DA).w
; $018646
	move.b	#$01,($FFFFA6DB).w
; $01864C
	jsr	($00FD7A).l
; $018652
	move.b	#$50,($FFFFA6DA).w
; $018658
	jsr	($00FD7A).l
; $01865E
	move.l	#$FFFF94A2,($FFFF95A2).w
; $018666
	move.w	#$000E,($FFFF95A8).w
; $01866C
	move.l	#$00018680,($FFFF8004).w
; $018674
	move.l	#$00009334,d0
; $01867A
	jmp	($0085EE).l
; $018680
	tst.w	($FFFFAE84).l
; $018686
	bne.w	loc_018690
; $01868A
	bsr.w	loc_01B092
; $01868E
	rts

loc_018690:				; $018690
	move.w	#$000A,($FFFFA61C).w
; $018696
	move.l	#$000186AA,($FFFF8004).w
; $01869E
	move.l	#$0000F68E,d0
; $0186A4
	jmp	($0085EE).l
; $0186AA
	bsr.w	loc_018B44
; $0186AE
	move.w	($FF78F2).l,d0
; $0186B4
	cmp.w	($FF78F4).l,d0
; $0186BA
	bls.w	loc_0186D2
; $0186BE
	move.w	d0,($FF78F4).l
; $0186C4
	cmpi.w	#$0050,d0
; $0186C8
	bls.w	loc_0186D2
; $0186CC
	jsr	($01C5A4).l

loc_0186D2:				; $0186D2
	bsr.w	loc_01B9A4
; $0186D6
	move.w	($FF78F2).l,d0
; $0186DC
	cmp.w	($FF78F4).l,d0
; $0186E2
	bls.w	loc_0186FA
; $0186E6
	move.w	d0,($FF78F4).l
; $0186EC
	cmpi.w	#$0050,d0
; $0186F0
	bls.w	loc_0186FA
; $0186F4
	jsr	($01C5A4).l

loc_0186FA:				; $0186FA
	tst.w	($FF78F2).l
; $018700
	bne.w	loc_01870C
; $018704
	bsr.w	loc_0189DE
; $018708
	beq.w	loc_018714

loc_01870C:				; $01870C
	addq.w	#1,($FFFFAE62).l
; $018712
	rts

loc_018714:				; $018714
	clr.w	($FFFFAE84).l
; $01871A
	moveq	#-1,d1
; $01871C
	jsr	($018998).l
; $018722
	move.l	#$0001872C,($FFFF8004).w
; $01872A
	rts
; $01872C
	bsr.w	loc_018B44
; $018730
	bsr.w	loc_01B9A4
; $018734
	bsr.w	loc_018A4C
; $018738
	beq.w	loc_01873E
; $01873C
	rts

loc_01873E:				; $01873E
	move.b	#$41,($FFFFA6DA).w
; $018744
	clr.b	($FFFFA6DB).w
; $018748
	jsr	($00FD7A).l
; $01874E
	move.w	#$001E,($FFFFA61C).w
; $018754
	move.l	#$00018768,($FFFF8004).w
; $01875C
	move.l	#$0000F68E,d0
; $018762
	jmp	($0085EE).l
; $018768
	move.w	#$1528,d0
; $01876C
	jsr	($00955C).l
; $018772
	lea	($05DF40).l,a1
; $018778
	lea	($FFFF9522).w,a2
; $01877C
	jsr	($0091B6).l
; $018782
	lea	($FFFF9542).w,a2
; $018786
	jsr	($0091B6).l
; $01878C
	move.l	#$00018796,($FFFF8004).w
; $018794
	rts
; $018796
	move.w	#$0001,($FFFF95A6).w
; $01879C
	move.l	#$0005DF40,($FFFF95A2).w
; $0187A4
	move.w	#$000E,($FFFF95A8).w
; $0187AA
	move.l	#$000187BE,($FFFF8004).w
; $0187B2
	move.l	#$00009334,d0
; $0187B8
	jmp	($0085EE).l
; $0187BE
	move.w	#$12F6,d0
; $0187C2
	jsr	($0095A4).l
; $0187C8
	move.w	#$1568,d0
; $0187CC
	jsr	($009580).l
; $0187D2
	jsr	($0094FC).l
; $0187D8
	move.w	#$1568,$0(a0)
; $0187DE
	move.w	($FFFF95A6).w,$2(a0)
; $0187E4
	move.l	#$0005DF40,($FFFF95A2).w
; $0187EC
	move.w	#$0001,($FFFF95A8).w
; $0187F2
	move.l	#$00018806,($FFFF8004).w
; $0187FA
	move.l	#$00009334,d0
; $018800
	jmp	($0085EE).l
; $018806
	move.w	#$0000,($FFFF8170).w
; $01880C
	move.w	#$0000,($FFFF8160).w
; $018812
	move.l	($FFFFAE70).l,($FFFF9050).w
; $01881A
	move.l	($FFFFAE74).l,($FFFF9054).w
; $018822
	jsr	($01C5F8).l
; $018828
	jsr	($011208).l
; $01882E
	move.b	($FFFFA624).w,d0
; $018832
	move.w	($FFFFA6E0).w,d1
; $018836
	mulu.w	($FFFF9F2C).w,d1
; $01883A
	add.w	($FFFFA6DE).w,d1
; $01883E
	add.w	d1,d1
; $018840
	lea	($FF5000).l,a0
; $018846
	tst.w	($0,a0,d1.w)
; $01884A
	bmi.w	loc_018850
; $01884E
	moveq	#-1,d0

loc_018850:				; $018850
	jsr	($00F5C6).l
; $018856
	jsr	($00A89C).l
; $01885C
	move.b	#$01,($FFFFA6F6).w
; $018862
	move.b	#$01,($FFFF9FE2).w
; $018868
	move.b	#$01,($FFFF9FE3).w
; $01886E
	jsr	($0108E2).l
; $018874
	jsr	($00A6EA).l
; $01887A
	jsr	($009FFE).l
; $018880
	move.l	#$0001888A,($FFFF8004).w
; $018888
	rts
; $01888A
	moveq	#23,d1
; $01888C
	jsr	($00C7D0).l
; $018892
	lea	($FFFF94A2).w,a1
; $018896
	lea	($082114).l,a2
; $01889C
	jsr	($009208).l
; $0188A2
	lea	($FFFF94A2).w,a2
; $0188A6
	jsr	($00A122).l
; $0188AC
	move.l	#$FFFF94A2,($FFFF95A2).w
; $0188B4
	move.w	#$0002,($FFFF95A6).w
; $0188BA
	move.w	#$000F,($FFFF95A8).w
; $0188C0
	move.l	#$000188D4,($FFFF8004).w
; $0188C8
	move.l	#$00009334,d0
; $0188CE
	jmp	($0085EE).l
; $0188D4
	move.b	#$01,($FFFF9FFB).w
; $0188DA
	moveq	#-1,d0
; $0188DC
	jsr	($00A89C).l
; $0188E2
	jsr	($00A16A).l
; $0188E8
	jsr	($008608).l
; $0188EE
	rts

loc_0188F0:				; $0188F0
	moveq	#0,d1
; $0188F2
	jsr	($018998).l

loc_0188F8:				; $0188F8
	clr.w	($FF78F8).l
; $0188FE
	bsr.w	loc_018B44
; $018902
	bsr.w	loc_01B9A4
; $018906
	tst.w	($FF78F2).l
; $01890C
	bne.w	loc_018918
; $018910
	bsr.w	loc_0189DE
; $018914
	beq.w	loc_018990

loc_018918:				; $018918
	addq.w	#1,($FFFFAE62).l
; $01891E
	move.w	($FFFFAE62).l,d0
; $018924
	andi.w	#$000F,d0
; $018928
	beq.w	loc_018936
; $01892C
	tst.w	($FF78F8).l
; $018932
	beq.w	loc_0188F8

loc_018936:				; $018936
	lea	($FFFFA662).w,a0
; $01893A
	move.w	$6(a0),d0
; $01893E
	sub.w	($FFFFA692).w,d0
; $018942
	bpl.w	loc_018948
; $018946
	moveq	#0,d0

loc_018948:				; $018948
	movea.l	($FFFFA62C).w,a0
; $01894C
	move.b	d0,$3(a0)
; $018950
	lea	($FFFFA694).w,a0
; $018954
	move.w	$6(a0),d1
; $018958
	sub.w	($FFFFA6C4).w,d1
; $01895C
	bpl.w	loc_018962
; $018960
	moveq	#0,d1

loc_018962:				; $018962
	movea.l	($FFFFA634).w,a0
; $018966
	move.b	d1,$3(a0)
; $01896A
	move.w	($FFFFA6E6).w,d4
; $01896E
	move.w	($FFFFA6E8).w,d5
; $018972
	jsr	($00C254).l
; $018978
	move.w	($FFFFA6EA).w,d4
; $01897C
	move.w	($FFFFA6EC).w,d5
; $018980
	jsr	($00C254).l
; $018986
	move.l	#$000188F8,($FFFF8004).w
; $01898E
	rts

loc_018990:				; $018990
	jsr	($008608).l
; $018996
	rts

loc_018998:				; $018998
	movem.l	a7/d7,-(a7)
; $01899C
	lea	($FF6A3C).l,a0
; $0189A2
	moveq	#19,d0

loc_0189A4:				; $0189A4
	tst.w	$0(a0)
; $0189A8
	beq.w	loc_0189D0
; $0189AC
	move.w	$1C(a0),$16(a0)
; $0189B2
	move.w	$1E(a0),$18(a0)
; $0189B8
	move.w	$20(a0),$1A(a0)
; $0189BE
	tst.w	d1
; $0189C0
	beq.w	loc_0189D0
; $0189C4
	move.w	#$0006,$C(a0)
; $0189CA
	move.w	#$0003,$26(a0)

loc_0189D0:				; $0189D0
	adda.w	#$004C,a0
; $0189D4
	dbf	d0,loc_0189A4
; $0189D8
	movem.l	(a7)+,d7/a7
; $0189DC
	rts

loc_0189DE:				; $0189DE
	movem.l	a7/a6/d7,-(a7)
; $0189E2
	lea	($FF6A3C).l,a0
; $0189E8
	moveq	#19,d0

loc_0189EA:				; $0189EA
	move.w	$C(a0),d1
; $0189EE
	cmpi.w	#$0007,d1
; $0189F2
	beq.w	loc_018A0E
; $0189F6
	cmpi.w	#$0005,d1
; $0189FA
	beq.w	loc_018A0E
; $0189FE
	cmpi.w	#$0003,d1
; $018A02
	beq.w	loc_018A0E
; $018A06
	tst.w	$0(a0)
; $018A0A
	bne.w	loc_018A42

loc_018A0E:				; $018A0E
	adda.w	#$004C,a0
; $018A12
	dbf	d0,loc_0189EA
; $018A16
	lea	($FF6A3C).l,a0
; $018A1C
	moveq	#19,d0

loc_018A1E:				; $018A1E
	tst.w	$0(a0)
; $018A22
	beq.w	loc_018A30
; $018A26
	bsr.w	loc_01A2B8
; $018A2A
	move.w	#$0003,$26(a0)

loc_018A30:				; $018A30
	adda.w	#$004C,a0
; $018A34
	dbf	d0,loc_018A1E
; $018A38
	ori	#$DF,ccr
; $018A3E
	btst	d0,d3
; $018A40
	rts

loc_018A42:				; $018A42
	andi.b	#$DF,#$FB
; $018A48
	btst	d0,d3
; $018A4A
	rts

loc_018A4C:				; $018A4C
	movem.l	a7/a6/d7,-(a7)
; $018A50
	lea	($FF6A3C).l,a0
; $018A56
	moveq	#19,d0

loc_018A58:				; $018A58
	move.w	$C(a0),d1
; $018A5C
	cmpi.w	#$0005,d1
; $018A60
	beq.w	loc_018AA8
; $018A64
	cmpi.w	#$0007,d1
; $018A68
	beq.w	loc_018A74
; $018A6C
	tst.w	$0(a0)
; $018A70
	bne.w	loc_018AA8

loc_018A74:				; $018A74
	adda.w	#$004C,a0
; $018A78
	dbf	d0,loc_018A58
; $018A7C
	lea	($FF6A3C).l,a0
; $018A82
	moveq	#19,d0

loc_018A84:				; $018A84
	tst.w	$0(a0)
; $018A88
	beq.w	loc_018A96
; $018A8C
	bsr.w	loc_01A2B8
; $018A90
	move.w	#$0003,$26(a0)

loc_018A96:				; $018A96
	adda.w	#$004C,a0
; $018A9A
	dbf	d0,loc_018A84
; $018A9E
	ori	#$DF,ccr
; $018AA4
	btst	d0,d3
; $018AA6
	rts

loc_018AA8:				; $018AA8
	andi.b	#$DF,#$FB
; $018AAE
	btst	d0,d3
; $018AB0
	rts

loc_018AB2:				; $018AB2
	movem.l	d6,-(a7)
; $018AB6
	lea	($FFFFA662).w,a1
; $018ABA
	tst.w	$A(a0)
; $018ABE
	beq.w	loc_018AC6
; $018AC2
	lea	($FFFFA694).w,a1

loc_018AC6:				; $018AC6
	move.b	$2C(a1),($FFFFA6DA).w
; $018ACC
	jsr	($018AD8).l
; $018AD2
	movem.l	(a7)+,d6
; $018AD6
	rts

loc_018AD8:				; $018AD8
	move.w	#$0001,($FF78F8).l
; $018AE0
	move.b	#$00,($FFFFA6DB).w
; $018AE6
	jmp	($00FD7A).l

loc_018AEC:				; $018AEC
	move.b	#$65,($FFFFA6DA).w
; $018AF2
	move.w	#$0001,($FF78F8).l
; $018AFA
	move.b	#$01,($FFFFA6DB).w
; $018B00
	jmp	($00FD7A).l

loc_018B06:				; $018B06
	cmpi.w	#$A4A0,($000001).w
; $018B0C
	beq.w	loc_018B2A
; $018B10
	move.b	#$65,($FFFFA6DA).w
; $018B16
	move.w	#$0001,($FF78F8).l
; $018B1E
	move.b	#$01,($FFFFA6DB).w
; $018B24
	jmp	($00FD7A).l

loc_018B2A:				; $018B2A
	rts

loc_018B2C:				; $018B2C
	cmpi.w	#$A4A0,($000001).w
; $018B32
	bne.w	loc_018B42
; $018B36
	move.b	#$01,($FFFFA6DB).w
; $018B3C
	jmp	($00FD7A).l

loc_018B42:				; $018B42
	rts

loc_018B44:				; $018B44
	lea	($FF6A3C).l,a0
; $018B4A
	moveq	#19,d0

loc_018B4C:				; $018B4C
	cmpi.w	#$000C,$5(a0)
; $018B52
	beq.w	loc_018B5E
; $018B56
	tst.w	$0(a0)
; $018B5A
	beq.w	loc_018B84

loc_018B5E:				; $018B5E
	movem.l	a7/d7,-(a7)
; $018B62
	move.w	$6(a0),d1
; $018B66
	add.w	d1,d1
; $018B68
	add.w	d1,d1
; $018B6A
	lea	($018B8E).l,a1
; $018B70
	movea.l	($0,a1,d1.w),a1
; $018B74
	move.w	$C(a0),d1
; $018B78
	add.w	d1,d1
; $018B7A
	add.w	d1,d1
; $018B7C
	jsr	($0,a1,d1.w)
; $018B80
	movem.l	(a7)+,d7/a7

loc_018B84:				; $018B84
	adda.w	#$004C,a0
; $018B88
	dbf	d0,loc_018B4C
; $018B8C
	rts
; $018B8E
	dc.w	$0001
; $018B90
	dc.w	$8C6C
; $018B92
	dc.w	$0001
; $018B94
	dc.w	$8CEA
; $018B96
	dc.w	$0001
; $018B98
	dc.w	$8E8A
; $018B9A
	dc.w	$0001
; $018B9C
	dc.w	$8F92
; $018B9E
	dc.w	$0001
; $018BA0
	dc.w	$8FBA
; $018BA2
	dc.w	$0001
; $018BA4
	dc.w	$8FDA
; $018BA6
	dc.w	$0001
; $018BA8
	dc.w	$8FFA
; $018BAA
	dc.w	$0001
; $018BAC
	dc.w	$901A
; $018BAE
	dc.w	$0001
; $018BB0
	dc.w	$905A
; $018BB2
	dc.w	$0001
; $018BB4
	dc.w	$91DA
; $018BB6
	dc.w	$0001
; $018BB8
	dc.w	$921A
; $018BBA
	dc.w	$0001
; $018BBC
	dc.w	$92F8
; $018BBE
	dc.w	$0001
; $018BC0
	dc.w	$94E0
; $018BC2
	dc.w	$0001
; $018BC4
	dc.w	$9526
; $018BC6
	dc.w	$0001
; $018BC8
	dc.w	$9738
; $018BCA
	dc.w	$0001
; $018BCC
	dc.w	$9758
; $018BCE
	dc.w	$0001
; $018BD0
	dc.w	$9796
; $018BD2
	dc.w	$0001
; $018BD4
	dc.w	$97BC
; $018BD6
	dc.w	$0001
; $018BD8
	dc.w	$97E2
; $018BDA
	dc.w	$0001
; $018BDC
	dc.w	$9808
; $018BDE
	dc.w	$0001
; $018BE0
	dc.w	$9828
; $018BE2
	dc.w	$0001
; $018BE4
	dc.w	$984E
; $018BE6
	dc.w	$0001
; $018BE8
	dc.w	$9874
; $018BEA
	dc.w	$0001
; $018BEC
	dc.w	$989A
; $018BEE
	dc.w	$0001
; $018BF0
	dc.w	$98C0
; $018BF2
	dc.w	$0001
; $018BF4
	dc.w	$98E6
; $018BF6
	dc.w	$0001
; $018BF8
	dc.w	$9906
; $018BFA
	dc.w	$0001
; $018BFC
	dc.w	$9926
; $018BFE
	dc.w	$0001
; $018C00
	dc.w	$994C
; $018C02
	dc.w	$0001
; $018C04
	dc.w	$9972
; $018C06
	dc.w	$0001
; $018C08
	dc.w	$9992
; $018C0A
	dc.w	$0001
; $018C0C
	dc.w	$9ADE
; $018C0E
	dc.w	$0001
; $018C10
	dc.w	$9B04
; $018C12
	dc.w	$0001
; $018C14
	dc.w	$9B2A
; $018C16
	dc.w	$0001
; $018C18
	dc.w	$9B50
; $018C1A
	dc.w	$0001
; $018C1C
	dc.w	$9B76
; $018C1E
	dc.w	$0001
; $018C20
	dc.w	$9B9C
; $018C22
	dc.w	$0001
; $018C24
	dc.w	$9BBC
; $018C26
	dc.w	$0001
; $018C28
	dc.w	$9BFC
; $018C2A
	dc.w	$0001
; $018C2C
	dc.w	$9C7E
; $018C2E
	dc.w	$0001
; $018C30
	dc.w	$9CE4
; $018C32
	dc.w	$0001
; $018C34
	dc.w	$9D3C
; $018C36
	dc.w	$0001
; $018C38
	dc.w	$9DD2
; $018C3A
	dc.w	$0001
; $018C3C
	dc.w	$9E38
; $018C3E
	dc.w	$0001
; $018C40
	dc.w	$9E82
; $018C42
	dc.w	$0001
; $018C44
	dc.w	$9EC2
; $018C46
	dc.w	$0001
; $018C48
	dc.w	$9F0C
; $018C4A
	dc.w	$0001
; $018C4C
	dc.w	$9F2C
; $018C4E
	dc.w	$0001
; $018C50
	dc.w	$9FB0
; $018C52
	dc.w	$0001
; $018C54
	dc.w	$A010
; $018C56
	dc.w	$0001
; $018C58
	dc.w	$A178
; $018C5A
	dc.w	$0001
; $018C5C
	dc.w	$91FA
; $018C5E
	dc.w	$0001
; $018C60
	dc.w	$9BDC
; $018C62
	dc.w	$0001
; $018C64
	dc.w	$903A
; $018C66
	dc.w	$0001
; $018C68
	dc.w	$9EA2

loc_018C6A:				; $018C6A
	rts
; $018C6C
	bra.w	loc_018C8C
; $018C70
	bra.w	loc_018CB0
; $018C74
	bra.w	loc_018CB0
; $018C78
	bra.w	loc_018CB0
; $018C7C
	bra.w	loc_018CBE
; $018C80
	bra.w	loc_01A3A8
; $018C84
	bra.w	loc_01A64C
; $018C88
	bra.w	loc_018C6A

loc_018C8C:				; $018C8C
	tst.w	$4(a0)
; $018C90
	beq.w	loc_01A2D4
; $018C94
	move.w	$2(a0),d1
; $018C98
	andi.w	#$0007,d1
; $018C9C
	add.w	d1,d1
; $018C9E
	cmp.w	($FFFFAE62).l,d1
; $018CA4
	bgt.w	loc_018C6A
; $018CA8
	bsr.w	loc_01A2B8
; $018CAC
	bra.w	loc_01A686

loc_018CB0:				; $018CB0
	move.w	#$0001,$8(a0)
; $018CB6
	move.w	#$0001,d0
; $018CBA
	bra.w	loc_01A360

loc_018CBE:				; $018CBE
	tst.w	$E(a0)
; $018CC2
	beq.w	loc_018CCA
; $018CC6
	bsr.w	loc_01A344

loc_018CCA:				; $018CCA
	move.w	$42(a0),d2
; $018CCE
	cmpi.w	#$0010,d2
; $018CD2
	bge.w	loc_01A2FE
; $018CD6
	addq.w	#1,$42(a0)
; $018CDA
	lea	($01A670).l,a1
; $018CE0
	moveq	#0,d1
; $018CE2
	move.b	($0,a1,d2.w),d1
; $018CE6
	bra.w	loc_01A98E
; $018CEA
	bra.w	loc_018C8C
; $018CEE
	bra.w	loc_018D0A
; $018CF2
	bra.w	loc_018DC4
; $018CF6
	bra.w	loc_018DC4
; $018CFA
	bra.w	loc_018CBE
; $018CFE
	bra.w	loc_01A488
; $018D02
	bra.w	loc_01A64C
; $018D06
	bra.w	loc_018C6A

loc_018D0A:				; $018D0A
	tst.w	$E(a0)
; $018D0E
	beq.w	loc_018D4A
; $018D12
	bsr.w	loc_01A30C
; $018D16
	move.w	#$0001,$26(a0)
; $018D1C
	move.w	#$0138,d1
; $018D20
	tst.w	$A(a0)
; $018D24
	beq.w	loc_018D2C
; $018D28
	move.w	#$0008,d1

loc_018D2C:				; $018D2C
	move.w	d1,$16(a0)
; $018D30
	lea	($FF67BC).l,a1
; $018D36
	add.w	d1,d1
; $018D38
	move.w	($0,a1,d1.w),$18(a0)
; $018D3E
	move.w	$14(a0),$1A(a0)
; $018D44
	move.w	#$0001,$46(a0)

loc_018D4A:				; $018D4A
	move.w	$26(a0),d1
; $018D4E
	beq.w	loc_018D6C
; $018D52
	cmpi.w	#$0003,d1
; $018D56
	bge.w	loc_018D70
; $018D5A
	addq.w	#1,$28(a0)
; $018D5E
	cmpi.w	#$0028,$2(a0)
; $018D64
	bne.w	loc_018D70
; $018D68
	clr.w	$28(a0)

loc_018D6C:				; $018D6C
	addq.w	#1,$26(a0)

loc_018D70:				; $018D70
	addq.w	#1,$42(a0)
; $018D74
	bsr.w	loc_018E18
; $018D78
	moveq	#0,d5
; $018D7A
	bsr.w	loc_01B0F8
; $018D7E
	tst.w	d5
; $018D80
	bne.w	loc_018DA2
; $018D84
	move.w	$10(a0),d1
; $018D88
	cmp.w	$1C(a0),d1
; $018D8C
	beq.w	loc_018DB6
; $018D90
	move.w	$1C(a0),$16(a0)
; $018D96
	move.w	$1E(a0),$18(a0)
; $018D9C
	move.w	$20(a0),$1A(a0)

loc_018DA2:				; $018DA2
	tst.w	$4(a0)
; $018DA6
	beq.w	loc_018C6A
; $018DAA
	bsr.w	loc_01A9D2
; $018DAE
	beq.w	loc_018C6A
; $018DB2
	bra.w	loc_01ACEE

loc_018DB6:				; $018DB6
	move.w	$22(a0),$24(a0)
; $018DBC
	clr.w	$46(a0)
; $018DC0
	bra.w	loc_01A2D4

loc_018DC4:				; $018DC4
	tst.w	$E(a0)
; $018DC8
	beq.w	loc_018DE8
; $018DCC
	bsr.w	loc_01A328
; $018DD0
	move.w	#$0001,$8(a0)
; $018DD6
	move.w	$1C(a0),$16(a0)
; $018DDC
	move.w	$1E(a0),$18(a0)
; $018DE2
	move.w	$20(a0),$1A(a0)

loc_018DE8:				; $018DE8
	move.w	$10(a0),d1
; $018DEC
	cmp.w	$16(a0),d1
; $018DF0
	bne.w	loc_018DFA
; $018DF4
	move.w	$22(a0),$24(a0)

loc_018DFA:				; $018DFA
	tst.w	$44(a0)
; $018DFE
	bne.w	loc_018C6A
; $018E02
	bsr.w	loc_01B0C0
; $018E06
	tst.w	$26(a0)
; $018E0A
	bne.w	loc_01B0F8
; $018E0E
	move.w	#$0003,$26(a0)
; $018E14
	bra.w	loc_01B0F8

loc_018E18:				; $018E18
	lea	($FFFFA662).w,a1
; $018E1C
	tst.w	$A(a0)
; $018E20
	beq.w	loc_018E28
; $018E24
	lea	($FFFFA694).w,a1

loc_018E28:				; $018E28
	move.w	$0(a1),d0
; $018E2C
	cmpi.w	#$008D,d0
; $018E30
	bcs.w	loc_018E3C
; $018E34
	cmpi.w	#$0094,d0
; $018E38
	bcc.w	loc_018E44

loc_018E3C:				; $018E3C
	tst.w	$A(a1)
; $018E40
	bne.w	loc_018E88

loc_018E44:				; $018E44
	cmpi.w	#$AE78,($0DFFFF).l
; $018E4C
	beq.w	loc_018E88
; $018E50
	move.w	$42(a0),d0
; $018E54
	andi.w	#$0001,d0
; $018E58
	bne.w	loc_018E88
; $018E5C
	moveq	#10,d2
; $018E5E
	jsr	($0085A2).l
; $018E64
	cmpi.w	#$0007,d2
; $018E68
	bmi.w	loc_018E88
; $018E6C
	move.w	$10(a0),d1
; $018E70
	move.w	$12(a0),d2
; $018E74
	move.w	$14(a0),d3
; $018E78
	subq.w	#5,d1
; $018E7A
	tst.w	$24(a0)
; $018E7E
	beq.w	loc_01BA46
; $018E82
	addq.w	#5,d1
; $018E84
	bra.w	loc_01BA46

loc_018E88:				; $018E88
	rts
; $018E8A
	bra.w	loc_018C8C
; $018E8E
	bra.w	loc_018EAA
; $018E92
	bra.w	loc_018F3E
; $018E96
	bra.w	loc_018F3E
; $018E9A
	bra.w	loc_018CBE
; $018E9E
	bra.w	loc_01A3A8
; $018EA2
	bra.w	loc_01A64C
; $018EA6
	bra.w	loc_018C6A

loc_018EAA:				; $018EAA
	tst.w	$E(a0)
; $018EAE
	beq.w	loc_018EB6
; $018EB2
	bsr.w	loc_01A30C

loc_018EB6:				; $018EB6
	tst.w	$4(a0)
; $018EBA
	beq.w	loc_01A328
; $018EBE
	cmpi.w	#$0026,$2(a0)
; $018EC4
	bge.w	loc_018EDE
; $018EC8
	addq.w	#1,$28(a0)
; $018ECC
	cmpi.w	#$0028,$4(a0)
; $018ED2
	bne.w	loc_018EDE
; $018ED6
	addq.w	#1,$26(a0)
; $018EDA
	clr.w	$28(a0)

loc_018EDE:				; $018EDE
	tst.l	$2A(a0)
; $018EE2
	bne.w	loc_018EF6

loc_018EE6:				; $018EE6
	bsr.w	loc_01AC1C
; $018EEA
	beq.w	loc_01A2D4
; $018EEE
	movea.l	$2A(a0),a1
; $018EF2
	bra.w	loc_018F0C

loc_018EF6:				; $018EF6
	movea.l	$2A(a0),a1
; $018EFA
	cmpa.l	#$00000000,a1
; $018F00
	beq.w	loc_018EE6
; $018F04
	tst.w	$0(a1)
; $018F08
	beq.w	loc_018EE6

loc_018F0C:				; $018F0C
	bsr.w	loc_01AA18
; $018F10
	bne.w	loc_01ACEE
; $018F14
	move.w	$10(a1),d0
; $018F18
	move.w	$3C(a1),d1
; $018F1C
	lsr.w	#1,d1
; $018F1E
	cmp.w	$10(a0),d0
; $018F22
	blt.w	loc_018F28
; $018F26
	neg.w	d1

loc_018F28:				; $018F28
	add.w	d1,d0
; $018F2A
	move.w	d0,$16(a0)
; $018F2E
	move.w	$12(a1),$18(a0)
; $018F34
	move.w	$14(a1),$1A(a0)
; $018F3A
	bra.w	loc_01B0F8

loc_018F3E:				; $018F3E
	tst.w	$E(a0)
; $018F42
	beq.w	loc_018F62
; $018F46
	bsr.w	loc_01A328
; $018F4A
	move.w	#$0001,$8(a0)
; $018F50
	move.w	$1C(a0),$16(a0)
; $018F56
	move.w	$1E(a0),$18(a0)
; $018F5C
	move.w	$20(a0),$1A(a0)

loc_018F62:				; $018F62
	move.w	$10(a0),d1
; $018F66
	cmp.w	$16(a0),d1
; $018F6A
	bne.w	loc_018F74
; $018F6E
	move.w	$22(a0),$24(a0)

loc_018F74:				; $018F74
	tst.w	$44(a0)
; $018F78
	bne.w	loc_018C6A
; $018F7C
	bsr.w	loc_01B0C0
; $018F80
	tst.w	$26(a0)
; $018F84
	bne.w	loc_01B0F8
; $018F88
	move.w	#$0002,$26(a0)
; $018F8E
	bra.w	loc_01B0F8
; $018F92
	bra.w	loc_018FB2
; $018F96
	bra.w	loc_018EAA
; $018F9A
	bra.w	loc_018F3E
; $018F9E
	bra.w	loc_018F3E
; $018FA2
	bra.w	loc_018CBE
; $018FA6
	bra.w	loc_01A3A8
; $018FAA
	bra.w	loc_01A64C
; $018FAE
	bra.w	loc_018C6A

loc_018FB2:				; $018FB2
	bsr.w	loc_01A2B8
; $018FB6
	bra.w	loc_01A686
; $018FBA
	bra.w	loc_018C8C
; $018FBE
	bra.w	loc_018EAA
; $018FC2
	bra.w	loc_018F3E
; $018FC6
	bra.w	loc_018F3E
; $018FCA
	bra.w	loc_018CBE
; $018FCE
	bra.w	loc_01A5D4
; $018FD2
	bra.w	loc_01A64C
; $018FD6
	bra.w	loc_018C6A
; $018FDA
	bra.w	loc_018C8C
; $018FDE
	bra.w	loc_018EAA
; $018FE2
	bra.w	loc_018F3E
; $018FE6
	bra.w	loc_018F3E
; $018FEA
	bra.w	loc_018CBE
; $018FEE
	bra.w	loc_01A588
; $018FF2
	bra.w	loc_01A64C
; $018FF6
	bra.w	loc_018C6A
; $018FFA
	bra.w	loc_018C8C
; $018FFE
	bra.w	loc_018EAA
; $019002
	bra.w	loc_018F3E
; $019006
	bra.w	loc_018F3E
; $01900A
	bra.w	loc_018CBE
; $01900E
	bra.w	loc_01A50C
; $019012
	bra.w	loc_01A64C
; $019016
	bra.w	loc_018C6A
; $01901A
	bra.w	loc_018C8C
; $01901E
	bra.w	loc_018D0A
; $019022
	bra.w	loc_018DC4
; $019026
	bra.w	loc_018DC4
; $01902A
	bra.w	loc_018CBE
; $01902E
	bra.w	loc_01A3A8
; $019032
	bra.w	loc_01A64C
; $019036
	bra.w	loc_018C6A
; $01903A
	bra.w	loc_018C8C
; $01903E
	bra.w	loc_018D0A
; $019042
	bra.w	loc_018DC4
; $019046
	bra.w	loc_018DC4
; $01904A
	bra.w	loc_018CBE
; $01904E
	bra.w	loc_01A5D4
; $019052
	bra.w	loc_01A64C
; $019056
	bra.w	loc_018C6A
; $01905A
	bra.w	loc_018C8C
; $01905E
	bra.w	loc_01907A
; $019062
	bra.w	loc_01907A
; $019066
	bra.w	loc_019186
; $01906A
	bra.w	loc_018CBE
; $01906E
	bra.w	loc_01A488
; $019072
	bra.w	loc_01A64C
; $019076
	bra.w	loc_018C6A

loc_01907A:				; $01907A
	addq.w	#1,$42(a0)
; $01907E
	move.w	$42(a0),d0
; $019082
	andi.w	#$001F,d0
; $019086
	bne.w	loc_019096
; $01908A
	move.b	#$4D,($FFFFA6DA).w
; $019090
	jsr	($018B2C).l

loc_019096:				; $019096
	tst.w	$E(a0)
; $01909A
	beq.w	loc_019100
; $01909E
	bsr.w	loc_01A30C
; $0190A2
	move.w	#$0001,$26(a0)
; $0190A8
	lea	($FF6D34).l,a1
; $0190AE
	move.w	#$0138,d1
; $0190B2
	tst.w	$A(a0)
; $0190B6
	beq.w	loc_0190C4
; $0190BA
	lea	($FF6A3C).l,a1
; $0190C0
	move.w	#$0008,d1

loc_0190C4:				; $0190C4
	move.w	d1,$16(a0)
; $0190C8
	move.w	$12(a0),$18(a0)
; $0190CE
	move.w	$14(a0),$1A(a0)
; $0190D4
	moveq	#-1,d2
; $0190D6
	moveq	#9,d1
; $0190D8
	tst.w	$0(a1)
; $0190DC
	beq.w	loc_0190EC
; $0190E0
	cmp.w	$12(a1),d2
; $0190E4
	bls.w	loc_0190EC
; $0190E8
	move.w	$12(a1),d2

loc_0190EC:				; $0190EC
	adda.w	#$004C,a1
; $0190F0
	dbf	d1,loc_0190EC
; $0190F4
	cmpi.w	#$FFFF,d2
; $0190F8
	beq.w	loc_019100
; $0190FC
	move.w	d2,$18(a0)

loc_019100:				; $019100
	move.w	$26(a0),d1
; $019104
	beq.w	loc_019122
; $019108
	cmpi.w	#$0004,d1
; $01910C
	bge.w	loc_019126
; $019110
	addq.w	#1,$28(a0)
; $019114
	cmpi.w	#$0028,$2(a0)
; $01911A
	bne.w	loc_019126
; $01911E
	clr.w	$28(a0)

loc_019122:				; $019122
	addq.w	#1,$26(a0)

loc_019126:				; $019126
	tst.w	$44(a0)
; $01912A
	bne.w	loc_01916C

loc_01912E:				; $01912E
	moveq	#0,d5
; $019130
	bsr.w	loc_01B0F8
; $019134
	tst.w	d5
; $019136
	bne.w	loc_019158
; $01913A
	move.w	$10(a0),d1
; $01913E
	cmp.w	$1C(a0),d1
; $019142
	beq.w	loc_01A2D4
; $019146
	move.w	$1C(a0),$16(a0)
; $01914C
	move.w	$1E(a0),$18(a0)
; $019152
	move.w	$20(a0),$1A(a0)

loc_019158:				; $019158
	tst.w	$4(a0)
; $01915C
	beq.w	loc_018C6A
; $019160
	bsr.w	loc_01A9D2
; $019164
	beq.w	loc_018C6A
; $019168
	move.l	a1,$2A(a0)

loc_01916C:				; $01916C
	movea.l	$2A(a0),a1
; $019170
	cmpa.l	#$00000000,a1
; $019176
	beq.w	loc_01912E
; $01917A
	tst.w	$0(a1)
; $01917E
	beq.w	loc_01912E
; $019182
	bra.w	loc_01ACEE

loc_019186:				; $019186
	tst.w	$E(a0)
; $01918A
	beq.w	loc_0191AA
; $01918E
	bsr.w	loc_01A328
; $019192
	move.w	#$0001,$8(a0)
; $019198
	move.w	$1C(a0),$16(a0)
; $01919E
	move.w	$1E(a0),$18(a0)
; $0191A4
	move.w	$20(a0),$1A(a0)

loc_0191AA:				; $0191AA
	move.w	$10(a0),d1
; $0191AE
	cmp.w	$16(a0),d1
; $0191B2
	bne.w	loc_0191BC
; $0191B6
	move.w	$22(a0),$24(a0)

loc_0191BC:				; $0191BC
	tst.w	$44(a0)
; $0191C0
	bne.w	loc_018C6A
; $0191C4
	bsr.w	loc_01B0C0
; $0191C8
	tst.w	$26(a0)
; $0191CC
	bne.w	loc_01B0F8
; $0191D0
	move.w	#$0004,$26(a0)
; $0191D6
	bra.w	loc_01B0F8
; $0191DA
	bra.w	loc_018C8C
; $0191DE
	bra.w	loc_01907A
; $0191E2
	bra.w	loc_01907A
; $0191E6
	bra.w	loc_019186
; $0191EA
	bra.w	loc_018CBE
; $0191EE
	bra.w	loc_01A3A8
; $0191F2
	bra.w	loc_01A64C
; $0191F6
	bra.w	loc_018C6A
; $0191FA
	bra.w	loc_018C8C
; $0191FE
	bra.w	loc_019096
; $019202
	bra.w	loc_019096
; $019206
	bra.w	loc_019186
; $01920A
	bra.w	loc_018CBE
; $01920E
	bra.w	loc_01A3A8
; $019212
	bra.w	loc_01A64C
; $019216
	bra.w	loc_018C6A
; $01921A
	bra.w	loc_018C8C
; $01921E
	bra.w	loc_01923A
; $019222
	bra.w	loc_018CB0
; $019226
	bra.w	loc_018CB0
; $01922A
	bra.w	loc_0192C8
; $01922E
	bra.w	loc_01A3A8
; $019232
	bra.w	loc_01A64C
; $019236
	bra.w	loc_018C6A

loc_01923A:				; $01923A
	tst.w	$E(a0)
; $01923E
	beq.w	loc_019246
; $019242
	bsr.w	loc_01A30C

loc_019246:				; $019246
	tst.w	$4(a0)
; $01924A
	beq.w	loc_0192AE
; $01924E
	move.w	#$0006,$26(a0)
; $019254
	tst.l	$2A(a0)
; $019258
	bne.w	loc_01926C

loc_01925C:				; $01925C
	bsr.w	loc_01AC1C
; $019260
	beq.w	loc_0192AE
; $019264
	movea.l	$2A(a0),a1
; $019268
	bra.w	loc_019278

loc_01926C:				; $01926C
	movea.l	$2A(a0),a1
; $019270
	tst.w	$0(a1)
; $019274
	beq.w	loc_01925C

loc_019278:				; $019278
	bsr.w	loc_01AA18
; $01927C
	bne.w	loc_0192C0
; $019280
	move.w	$10(a1),d0
; $019284
	move.w	$3C(a1),d1
; $019288
	cmp.w	$10(a0),d0
; $01928C
	blt.w	loc_019292
; $019290
	neg.w	d1

loc_019292:				; $019292
	add.w	d1,d0
; $019294
	move.w	d0,$16(a0)
; $019298
	move.w	$12(a1),$18(a0)
; $01929E
	move.w	$14(a1),$1A(a0)
; $0192A4
	move.w	#$0001,$3A(a0)
; $0192AA
	bra.w	loc_01B0F8

loc_0192AE:				; $0192AE
	clr.w	$3A(a0)
; $0192B2
	move.w	#$0003,$C(a0)
; $0192B8
	move.w	#$0001,d0
; $0192BC
	bra.w	loc_01A360

loc_0192C0:				; $0192C0
	clr.w	$3A(a0)
; $0192C4
	bra.w	loc_01ACEE

loc_0192C8:				; $0192C8
	tst.w	$E(a0)
; $0192CC
	beq.w	loc_0192D4
; $0192D0
	bsr.w	loc_01A344

loc_0192D4:				; $0192D4
	clr.w	$3A(a0)
; $0192D8
	move.w	$42(a0),d2
; $0192DC
	cmpi.w	#$0010,d2
; $0192E0
	bge.w	loc_01A2B8
; $0192E4
	addq.w	#1,$42(a0)
; $0192E8
	lea	($01A670).l,a1
; $0192EE
	moveq	#0,d1
; $0192F0
	move.b	($0,a1,d2.w),d1
; $0192F4
	bra.w	loc_01A98E
; $0192F8
	bra.w	loc_018C8C
; $0192FC
	bra.w	loc_019318
; $019300
	bra.w	loc_01941E
; $019304
	bra.w	loc_018DC4
; $019308
	bra.w	loc_018CBE
; $01930C
	bra.w	loc_0194BA
; $019310
	bra.w	loc_01A64C
; $019314
	bra.w	loc_018C6A

loc_019318:				; $019318
	move.w	$2(a0),d0
; $01931C
	beq.w	loc_019328
; $019320
	cmpi.w	#$000A,d0
; $019324
	bne.w	loc_018C6A

loc_019328:				; $019328
	move.w	$42(a0),d0
; $01932C
	andi.w	#$0003,d0
; $019330
	bne.w	loc_019376
; $019334
	movea.l	a0,a1
; $019336
	movea.l	a0,a2
; $019338
	adda.w	#$0130,a1
; $01933C
	adda.w	#$00E4,a2
; $019340
	moveq	#3,d0

loc_019342:				; $019342
	move.w	#$0025,d1
; $019346
	move.w	$2(a1),d2

loc_01934A:				; $01934A
	move.w	(a2)+,(a1)+
; $01934C
	dbf	d1,loc_01934A
; $019350
	move.w	d2,$2(a2)
; $019354
	move.w	#$FFFF,$38(a2)
; $01935A
	tst.w	d0
; $01935C
	bne.w	loc_01936A
; $019360
	clr.w	$0(a2)
; $019364
	move.w	#$0005,$C(a2)

loc_01936A:				; $01936A
	suba.w	#$0098,a1
; $01936E
	suba.w	#$0098,a2
; $019372
	dbf	d0,loc_019342

loc_019376:				; $019376
	tst.w	$E(a0)
; $01937A
	beq.w	loc_0193B6
; $01937E
	bsr.w	loc_01A30C
; $019382
	move.w	#$0001,$26(a0)
; $019388
	move.w	#$0138,d1
; $01938C
	tst.w	$A(a0)
; $019390
	beq.w	loc_019398
; $019394
	move.w	#$0008,d1

loc_019398:				; $019398
	move.w	d1,$16(a0)
; $01939C
	lea	($FF67BC).l,a1
; $0193A2
	add.w	d1,d1
; $0193A4
	move.w	($0,a1,d1.w),$18(a0)
; $0193AA
	move.w	$14(a0),$1A(a0)
; $0193B0
	move.w	#$0001,$46(a0)

loc_0193B6:				; $0193B6
	move.w	$26(a0),d1
; $0193BA
	beq.w	loc_0193D8
; $0193BE
	cmpi.w	#$0005,d1
; $0193C2
	bge.w	loc_0193DC
; $0193C6
	addq.w	#1,$28(a0)
; $0193CA
	cmpi.w	#$0028,$1(a0)
; $0193D0
	bne.w	loc_0193DC
; $0193D4
	clr.w	$28(a0)

loc_0193D8:				; $0193D8
	addq.w	#1,$26(a0)

loc_0193DC:				; $0193DC
	addq.w	#1,$42(a0)
; $0193E0
	moveq	#0,d5
; $0193E2
	bsr.w	loc_01B0F8
; $0193E6
	tst.w	d5
; $0193E8
	bne.w	loc_01940A
; $0193EC
	move.w	$10(a0),d1
; $0193F0
	cmp.w	$1C(a0),d1
; $0193F4
	beq.w	loc_01A2C6
; $0193F8
	move.w	$1C(a0),$16(a0)
; $0193FE
	move.w	$1E(a0),$18(a0)
; $019404
	move.w	$20(a0),$1A(a0)

loc_01940A:				; $01940A
	tst.w	$4(a0)
; $01940E
	beq.w	loc_018C6A
; $019412
	bsr.w	loc_01A9D2
; $019416
	beq.w	loc_018C6A
; $01941A
	bra.w	loc_01ACEE

loc_01941E:				; $01941E
	move.w	$2(a0),d0
; $019422
	beq.w	loc_01942E
; $019426
	cmpi.w	#$000A,d0
; $01942A
	bne.w	loc_018C6A

loc_01942E:				; $01942E
	move.w	$42(a0),d0
; $019432
	andi.w	#$0001,d0
; $019436
	bne.w	loc_01947C
; $01943A
	movea.l	a0,a1
; $01943C
	movea.l	a0,a2
; $01943E
	adda.w	#$0130,a1
; $019442
	adda.w	#$00E4,a2
; $019446
	moveq	#3,d0

loc_019448:				; $019448
	move.w	#$0025,d1
; $01944C
	move.w	$2(a1),d2

loc_019450:				; $019450
	move.w	(a2)+,(a1)+
; $019452
	dbf	d1,loc_019450
; $019456
	move.w	d2,$2(a2)
; $01945A
	move.w	#$FFFF,$38(a2)
; $019460
	tst.w	d0
; $019462
	bne.w	loc_019470
; $019466
	clr.w	$0(a2)
; $01946A
	move.w	#$0005,$C(a2)

loc_019470:				; $019470
	suba.w	#$0098,a1
; $019474
	suba.w	#$0098,a2
; $019478
	dbf	d0,loc_019448

loc_01947C:				; $01947C
	tst.w	$E(a0)
; $019480
	beq.w	loc_01948C
; $019484
	move.w	#$0001,d0
; $019488
	bra.w	loc_01A360

loc_01948C:				; $01948C
	addq.w	#1,$42(a0)
; $019490
	cmpi.w	#$0042,$A(a0)
; $019496
	ble.w	loc_018C6A
; $01949A
	move.w	$22(a0),$24(a0)
; $0194A0
	clr.w	$46(a0)
; $0194A4
	moveq	#3,d0
; $0194A6
	movea.l	a0,a1

loc_0194A8:				; $0194A8
	adda.w	#$004C,a1
; $0194AC
	move.w	#$0007,$C(a1)
; $0194B2
	dbf	d0,loc_0194A8
; $0194B6
	bra.w	loc_01A2D4

loc_0194BA:				; $0194BA
	move.w	$2(a0),d0
; $0194BE
	beq.w	loc_0194CA
; $0194C2
	cmpi.w	#$000A,d0
; $0194C6
	bne.w	loc_018C6A

loc_0194CA:				; $0194CA
	moveq	#4,d0
; $0194CC
	movea.l	a0,a1

loc_0194CE:				; $0194CE
	adda.w	#$004C,a1
; $0194D2
	move.w	#$0007,$C(a1)
; $0194D8
	dbf	d0,loc_0194CE
; $0194DC
	bra.w	loc_01A488
; $0194E0
	bra.w	loc_018C8C
; $0194E4
	bra.w	loc_019318
; $0194E8
	bra.w	loc_01941E
; $0194EC
	bra.w	loc_018DC4
; $0194F0
	bra.w	loc_018CBE
; $0194F4
	bra.w	loc_019500
; $0194F8
	bra.w	loc_01A64C
; $0194FC
	bra.w	loc_018C6A

loc_019500:				; $019500
	move.w	$2(a0),d0
; $019504
	beq.w	loc_019510
; $019508
	cmpi.w	#$000A,d0
; $01950C
	bne.w	loc_018C6A

loc_019510:				; $019510
	moveq	#4,d0
; $019512
	movea.l	a0,a1

loc_019514:				; $019514
	adda.w	#$004C,a1
; $019518
	move.w	#$0007,$C(a1)
; $01951E
	dbf	d0,loc_019514
; $019522
	bra.w	loc_01A3A8
; $019526
	bra.w	loc_019546
; $01952A
	bra.w	loc_0196F4
; $01952E
	bra.w	loc_01956C
; $019532
	bra.w	loc_0196F4
; $019536
	bra.w	loc_018CBE
; $01953A
	bra.w	loc_01A3A8
; $01953E
	bra.w	loc_01A64C
; $019542
	bra.w	loc_018C6A

loc_019546:				; $019546
	tst.w	$4(a0)
; $01954A
	beq.w	loc_01A2D4
; $01954E
	move.w	$2(a0),d1
; $019552
	andi.w	#$0007,d1
; $019556
	add.w	d1,d1
; $019558
	add.w	d1,d1
; $01955A
	cmp.w	($FFFFAE62).l,d1
; $019560
	bgt.w	loc_018C6A
; $019564
	bsr.w	loc_01A2C6
; $019568
	bra.w	loc_01A686

loc_01956C:				; $01956C
	moveq	#0,d2

loc_01956E:				; $01956E
	tst.w	$E(a0)
; $019572
	beq.w	loc_01957A
; $019576
	bsr.w	loc_01A31A

loc_01957A:				; $01957A
	addq.w	#1,$42(a0)
; $01957E
	move.w	$42(a0),d1
; $019582
	cmpi.w	#$0020,d1
; $019586
	blt.w	loc_0195E8
; $01958A
	bne.w	loc_0195BA
; $01958E
	tst.w	$4(a0)
; $019592
	beq.w	loc_01A2D4
; $019596
	bsr.w	loc_01AB7A
; $01959A
	beq.w	loc_01960A
; $01959E
	movea.l	$2A(a0),a1
; $0195A2
	exg	a0,a1
; $0195A4
	bsr.w	loc_01AABC
; $0195A8
	exg	a0,a1
; $0195AA
	add.w	d1,$48(a1)
; $0195AE
	bsr.w	loc_01BB2A
; $0195B2
	subq.w	#1,$4(a0)
; $0195B6
	bra.w	loc_018C6A

loc_0195BA:				; $0195BA
	move.w	$1C(a0),$16(a0)
; $0195C0
	move.w	$1E(a0),$18(a0)
; $0195C6
	move.w	$20(a0),$1A(a0)
; $0195CC
	move.w	#$0002,$26(a0)
; $0195D2
	bsr.w	loc_01B0F8
; $0195D6
	cmpi.w	#$0060,d1
; $0195DA
	blt.w	loc_018C6A
; $0195DE
	move.w	#$0000,$C(a0)
; $0195E4
	bra.w	loc_018C6A

loc_0195E8:				; $0195E8
	move.w	$22(a0),$24(a0)
; $0195EE
	move.w	$1C(a0),$16(a0)
; $0195F4
	move.w	$1E(a0),$18(a0)
; $0195FA
	move.w	$20(a0),$1A(a0)
; $019600
	move.w	#$0002,$26(a0)
; $019606
	bra.w	loc_01B0F8

loc_01960A:				; $01960A
	move.w	#$0000,d1
; $01960E
	lea	($FF6A3C).l,a1
; $019614
	move.w	$22(a0),$24(a0)
; $01961A
	tst.w	$A(a0)
; $01961E
	bne.w	loc_01962C
; $019622
	move.w	#$0140,d1
; $019626
	lea	($FF6D34).l,a1

loc_01962C:				; $01962C
	cmpi.w	#$AE92,($000001).w
; $019632
	beq.w	loc_01964C
; $019636
	moveq	#9,d0

loc_019638:				; $019638
	tst.w	$0(a1)
; $01963C
	bne.w	loc_01964C
; $019640
	adda.w	#$004C,a1
; $019644
	dbf	d0,loc_019638
; $019648
	bra.w	loc_019650

loc_01964C:				; $01964C
	bsr.w	loc_01BBAE

loc_019650:				; $019650
	subq.w	#1,$4(a0)
; $019654
	bra.w	loc_018C6A

loc_019658:				; $019658
	move.w	$1C(a0),$16(a0)
; $01965E
	move.w	$1E(a0),$18(a0)
; $019664
	move.w	$20(a0),$1A(a0)
; $01966A
	move.w	#$0002,$26(a0)
; $019670
	bsr.w	loc_01B0F8
; $019674
	tst.w	$E(a0)
; $019678
	beq.w	loc_019684
; $01967C
	move.w	#$0002,d0
; $019680
	bsr.w	loc_01A360

loc_019684:				; $019684
	tst.w	$4(a0)
; $019688
	beq.w	loc_01A2D4
; $01968C
	addq.w	#1,$42(a0)
; $019690
	move.w	$42(a0),d1
; $019694
	cmpi.w	#$000C,d1
; $019698
	blt.w	loc_018C6A
; $01969C
	bne.w	loc_0196E2
; $0196A0
	bsr.w	loc_01AB7A
; $0196A4
	beq.w	loc_01A2D4
; $0196A8
	movea.l	$2A(a0),a1
; $0196AC
	move.w	$10(a0),d0
; $0196B0
	cmp.w	$10(a1),d0
; $0196B4
	blt.w	loc_0196C6
; $0196B8
	beq.w	loc_0196CA
; $0196BC
	move.w	#$0800,$24(a0)
; $0196C2
	bra.w	loc_0196CA

loc_0196C6:				; $0196C6
	clr.w	$24(a0)

loc_0196CA:				; $0196CA
	exg	a0,a1
; $0196CC
	bsr.w	loc_01AABC
; $0196D0
	exg	a0,a1
; $0196D2
	add.w	d1,$48(a1)
; $0196D6
	bsr.w	loc_01BB2A
; $0196DA
	subq.w	#1,$4(a0)
; $0196DE
	bra.w	loc_018C6A

loc_0196E2:				; $0196E2
	cmpi.w	#$0018,d1
; $0196E6
	blt.w	loc_018C6A
; $0196EA
	move.w	#$0000,$C(a0)
; $0196F0
	bra.w	loc_018C6A

loc_0196F4:				; $0196F4
	tst.w	$E(a0)
; $0196F8
	beq.w	loc_01971E
; $0196FC
	bsr.w	loc_01A328
; $019700
	move.w	#$0001,$8(a0)
; $019706
	move.w	$1C(a0),$16(a0)
; $01970C
	move.w	$1E(a0),$18(a0)
; $019712
	move.w	$20(a0),$1A(a0)
; $019718
	move.w	#$0002,$26(a0)

loc_01971E:				; $01971E
	tst.w	$44(a0)
; $019722
	bne.w	loc_018C6A
; $019726
	bsr.w	loc_01B0C0
; $01972A
	bsr.w	loc_01B0F8
; $01972E
	move.w	$22(a0),$24(a0)
; $019734
	bra.w	loc_018C6A
; $019738
	bra.w	loc_019546
; $01973C
	bra.w	loc_0196F4
; $019740
	bra.w	loc_01956C
; $019744
	bra.w	loc_0196F4
; $019748
	bra.w	loc_018CBE
; $01974C
	bra.w	loc_01A488
; $019750
	bra.w	loc_01A64C
; $019754
	bra.w	loc_018C6A
; $019758
	bra.w	loc_019546
; $01975C
	bra.w	loc_0196F4
; $019760
	bra.w	loc_019778
; $019764
	bra.w	loc_0196F4
; $019768
	bra.w	loc_018CBE
; $01976C
	bra.w	loc_01A488
; $019770
	bra.w	loc_01A64C
; $019774
	bra.w	loc_018C6A

loc_019778:				; $019778
	moveq	#1,d2

loc_01977A:				; $01977A
	lea	($FFFFA662).w,a1
; $01977E
	tst.w	$A(a0)
; $019782
	beq.w	loc_01978A
; $019786
	lea	($FFFFA694).w,a1

loc_01978A:				; $01978A
	tst.w	$A(a1)
; $01978E
	beq.w	loc_019658
; $019792
	bra.w	loc_01956E
; $019796
	bra.w	loc_019546
; $01979A
	bra.w	loc_0196F4
; $01979E
	bra.w	loc_0197B6
; $0197A2
	bra.w	loc_0196F4
; $0197A6
	bra.w	loc_018CBE
; $0197AA
	bra.w	loc_01A488
; $0197AE
	bra.w	loc_01A64C
; $0197B2
	bra.w	loc_018C6A

loc_0197B6:				; $0197B6
	moveq	#2,d2
; $0197B8
	bra.w	loc_01977A
; $0197BC
	bra.w	loc_019546
; $0197C0
	bra.w	loc_0196F4
; $0197C4
	bra.w	loc_0197DC
; $0197C8
	bra.w	loc_0196F4
; $0197CC
	bra.w	loc_018CBE
; $0197D0
	bra.w	loc_01A488
; $0197D4
	bra.w	loc_01A64C
; $0197D8
	bra.w	loc_018C6A

loc_0197DC:				; $0197DC
	moveq	#3,d2
; $0197DE
	bra.w	loc_01977A
; $0197E2
	bra.w	loc_019546
; $0197E6
	bra.w	loc_0196F4
; $0197EA
	bra.w	loc_019802
; $0197EE
	bra.w	loc_0196F4
; $0197F2
	bra.w	loc_018CBE
; $0197F6
	bra.w	loc_01A488
; $0197FA
	bra.w	loc_01A64C
; $0197FE
	bra.w	loc_018C6A

loc_019802:				; $019802
	moveq	#4,d2
; $019804
	bra.w	loc_01977A
; $019808
	bra.w	loc_019546
; $01980C
	bra.w	loc_0196F4
; $019810
	bra.w	loc_0197B6
; $019814
	bra.w	loc_0196F4
; $019818
	bra.w	loc_018CBE
; $01981C
	bra.w	loc_01A3A8
; $019820
	bra.w	loc_01A64C
; $019824
	bra.w	loc_018C6A
; $019828
	bra.w	loc_019546
; $01982C
	bra.w	loc_0196F4
; $019830
	bra.w	loc_019848
; $019834
	bra.w	loc_0196F4
; $019838
	bra.w	loc_018CBE
; $01983C
	bra.w	loc_01A3A8
; $019840
	bra.w	loc_01A64C
; $019844
	bra.w	loc_018C6A

loc_019848:				; $019848
	moveq	#5,d2
; $01984A
	bra.w	loc_01977A
; $01984E
	bra.w	loc_019546
; $019852
	bra.w	loc_0196F4
; $019856
	bra.w	loc_01986E
; $01985A
	bra.w	loc_0196F4
; $01985E
	bra.w	loc_018CBE
; $019862
	bra.w	loc_01A3A8
; $019866
	bra.w	loc_01A64C
; $01986A
	bra.w	loc_018C6A

loc_01986E:				; $01986E
	moveq	#6,d2
; $019870
	bra.w	loc_01977A
; $019874
	bra.w	loc_019546
; $019878
	bra.w	loc_0196F4
; $01987C
	bra.w	loc_019894
; $019880
	bra.w	loc_0196F4
; $019884
	bra.w	loc_018CBE
; $019888
	bra.w	loc_01A3A8
; $01988C
	bra.w	loc_01A64C
; $019890
	bra.w	loc_018C6A

loc_019894:				; $019894
	moveq	#7,d2
; $019896
	bra.w	loc_01977A
; $01989A
	bra.w	loc_019546
; $01989E
	bra.w	loc_0196F4
; $0198A2
	bra.w	loc_0198BA
; $0198A6
	bra.w	loc_0196F4
; $0198AA
	bra.w	loc_018CBE
; $0198AE
	bra.w	loc_01A3A8
; $0198B2
	bra.w	loc_01A64C
; $0198B6
	bra.w	loc_018C6A

loc_0198BA:				; $0198BA
	moveq	#8,d2
; $0198BC
	bra.w	loc_01977A
; $0198C0
	bra.w	loc_019546
; $0198C4
	bra.w	loc_0196F4
; $0198C8
	bra.w	loc_0198E0
; $0198CC
	bra.w	loc_0196F4
; $0198D0
	bra.w	loc_018CBE
; $0198D4
	bra.w	loc_01A3A8
; $0198D8
	bra.w	loc_01A64C
; $0198DC
	bra.w	loc_018C6A

loc_0198E0:				; $0198E0
	moveq	#9,d2
; $0198E2
	bra.w	loc_01977A
; $0198E6
	bra.w	loc_019546
; $0198EA
	bra.w	loc_0196F4
; $0198EE
	bra.w	loc_019778
; $0198F2
	bra.w	loc_0196F4
; $0198F6
	bra.w	loc_018CBE
; $0198FA
	bra.w	loc_01A3A8
; $0198FE
	bra.w	loc_01A64C
; $019902
	bra.w	loc_018C6A
; $019906
	bra.w	loc_019546
; $01990A
	bra.w	loc_0196F4
; $01990E
	bra.w	loc_019802
; $019912
	bra.w	loc_0196F4
; $019916
	bra.w	loc_018CBE
; $01991A
	bra.w	loc_01A3A8
; $01991E
	bra.w	loc_01A64C
; $019922
	bra.w	loc_018C6A
; $019926
	bra.w	loc_019546
; $01992A
	bra.w	loc_0196F4
; $01992E
	bra.w	loc_019946
; $019932
	bra.w	loc_0196F4
; $019936
	bra.w	loc_018CBE
; $01993A
	bra.w	loc_01A588
; $01993E
	bra.w	loc_01A64C
; $019942
	bra.w	loc_018C6A

loc_019946:				; $019946
	moveq	#10,d2
; $019948
	bra.w	loc_01977A
; $01994C
	bra.w	loc_019546
; $019950
	bra.w	loc_0196F4
; $019954
	bra.w	loc_01996C
; $019958
	bra.w	loc_0196F4
; $01995C
	bra.w	loc_018CBE
; $019960
	bra.w	loc_01A50C
; $019964
	bra.w	loc_01A64C
; $019968
	bra.w	loc_018C6A

loc_01996C:				; $01996C
	moveq	#11,d2
; $01996E
	bra.w	loc_01977A
; $019972
	bra.w	loc_019546
; $019976
	bra.w	loc_0196F4
; $01997A
	bra.w	loc_0197B6
; $01997E
	bra.w	loc_0196F4
; $019982
	bra.w	loc_018CBE
; $019986
	bra.w	loc_01A5D4
; $01998A
	bra.w	loc_01A64C
; $01998E
	bra.w	loc_018C6A
; $019992
	bra.w	loc_019546
; $019996
	bra.w	loc_0196F4
; $01999A
	bra.w	loc_0199B2
; $01999E
	bra.w	loc_0196F4
; $0199A2
	bra.w	loc_018CBE
; $0199A6
	bra.w	loc_01A3A8
; $0199AA
	bra.w	loc_01A64C
; $0199AE
	bra.w	loc_018C6A

loc_0199B2:				; $0199B2
	moveq	#0,d2

loc_0199B4:				; $0199B4
	tst.w	$E(a0)
; $0199B8
	beq.w	loc_0199C0
; $0199BC
	bsr.w	loc_01A31A

loc_0199C0:				; $0199C0
	tst.w	$4(a0)
; $0199C4
	beq.w	loc_01A2D4
; $0199C8
	addq.w	#1,$42(a0)
; $0199CC
	move.w	$42(a0),d1
; $0199D0
	lea	($FFFFA662).w,a1
; $0199D4
	tst.w	$A(a0)
; $0199D8
	beq.w	loc_0199E0
; $0199DC
	lea	($FFFFA694).w,a1

loc_0199E0:				; $0199E0
	moveq	#12,d4
; $0199E2
	moveq	#24,d3
; $0199E4
	tst.w	$A(a1)
; $0199E8
	beq.w	loc_019A04
; $0199EC
	move.w	$0(a1),d0
; $0199F0
	cmpi.w	#$008D,d0
; $0199F4
	bcs.w	loc_019A00
; $0199F8
	cmpi.w	#$0094,d0
; $0199FC
	bls.w	loc_019A04

loc_019A00:				; $019A00
	moveq	#32,d4
; $019A02
	moveq	#96,d3

loc_019A04:				; $019A04
	cmp.w	d4,d1
; $019A06
	blt.w	loc_019A6E
; $019A0A
	bne.w	loc_019A5E
; $019A0E
	bsr.w	loc_01AB7A
; $019A12
	beq.w	loc_019A90
; $019A16
	movea.l	$2A(a0),a1
; $019A1A
	move.w	$10(a0),d0
; $019A1E
	cmp.w	$10(a1),d0
; $019A22
	blt.w	loc_019A34
; $019A26
	beq.w	loc_019A38
; $019A2A
	move.w	#$0800,$24(a0)
; $019A30
	bra.w	loc_019A38

loc_019A34:				; $019A34
	clr.w	$24(a0)

loc_019A38:				; $019A38
	exg	a0,a1
; $019A3A
	bsr.w	loc_01AABC
; $019A3E
	exg	a0,a1
; $019A40
	add.w	d1,$48(a1)
; $019A44
	bsr.w	loc_01BC30
; $019A48
	subq.w	#1,$4(a0)
; $019A4C
	move.w	#$0000,$34(a0)
; $019A52
	clr.w	$36(a0)
; $019A56
	clr.w	$38(a0)
; $019A5A
	bra.w	loc_018C6A

loc_019A5E:				; $019A5E
	cmp.w	d3,d1
; $019A60
	blt.w	loc_018C6A
; $019A64
	move.w	#$0000,$C(a0)
; $019A6A
	bra.w	loc_018C6A

loc_019A6E:				; $019A6E
	move.w	$22(a0),$24(a0)
; $019A74
	move.w	$1C(a0),$16(a0)
; $019A7A
	move.w	$1E(a0),$18(a0)
; $019A80
	move.w	$20(a0),$1A(a0)
; $019A86
	move.w	#$0002,$26(a0)
; $019A8C
	bra.w	loc_01B0F8

loc_019A90:				; $019A90
	move.w	#$0000,d1
; $019A94
	lea	($FF6A3C).l,a1
; $019A9A
	tst.w	$A(a0)
; $019A9E
	bne.w	loc_019AAC
; $019AA2
	move.w	#$0140,d1
; $019AA6
	lea	($FF6D34).l,a1

loc_019AAC:				; $019AAC
	cmpi.w	#$AE92,($000001).w
; $019AB2
	beq.w	loc_019ACC
; $019AB6
	moveq	#9,d0

loc_019AB8:				; $019AB8
	tst.w	$0(a1)
; $019ABC
	bne.w	loc_019ACC
; $019AC0
	adda.w	#$004C,a1
; $019AC4
	dbf	d0,loc_019AB8
; $019AC8
	bra.w	loc_019AD0

loc_019ACC:				; $019ACC
	bsr.w	loc_01BCB4

loc_019AD0:				; $019AD0
	subq.w	#1,$4(a0)
; $019AD4
	move.w	$22(a0),$24(a0)
; $019ADA
	bra.w	loc_018C6A
; $019ADE
	bra.w	loc_019546
; $019AE2
	bra.w	loc_0196F4
; $019AE6
	bra.w	loc_019AFE
; $019AEA
	bra.w	loc_0196F4
; $019AEE
	bra.w	loc_018CBE
; $019AF2
	bra.w	loc_01A3A8
; $019AF6
	bra.w	loc_01A64C
; $019AFA
	bra.w	loc_018C6A

loc_019AFE:				; $019AFE
	moveq	#1,d2
; $019B00
	bra.w	loc_0199B4
; $019B04
	bra.w	loc_019546
; $019B08
	bra.w	loc_0196F4
; $019B0C
	bra.w	loc_019B24
; $019B10
	bra.w	loc_0196F4
; $019B14
	bra.w	loc_018CBE
; $019B18
	bra.w	loc_01A3A8
; $019B1C
	bra.w	loc_01A64C
; $019B20
	bra.w	loc_018C6A

loc_019B24:				; $019B24
	moveq	#2,d2
; $019B26
	bra.w	loc_0199B4
; $019B2A
	bra.w	loc_019546
; $019B2E
	bra.w	loc_0196F4
; $019B32
	bra.w	loc_019B4A
; $019B36
	bra.w	loc_0196F4
; $019B3A
	bra.w	loc_018CBE
; $019B3E
	bra.w	loc_01A3A8
; $019B42
	bra.w	loc_01A64C
; $019B46
	bra.w	loc_018C6A

loc_019B4A:				; $019B4A
	moveq	#3,d2
; $019B4C
	bra.w	loc_0199B4
; $019B50
	bra.w	loc_019546
; $019B54
	bra.w	loc_0196F4
; $019B58
	bra.w	loc_019B70
; $019B5C
	bra.w	loc_0196F4
; $019B60
	bra.w	loc_018CBE
; $019B64
	bra.w	loc_01A3A8
; $019B68
	bra.w	loc_01A64C
; $019B6C
	bra.w	loc_018C6A

loc_019B70:				; $019B70
	moveq	#4,d2
; $019B72
	bra.w	loc_0199B4
; $019B76
	bra.w	loc_019546
; $019B7A
	bra.w	loc_0196F4
; $019B7E
	bra.w	loc_019B96
; $019B82
	bra.w	loc_0196F4
; $019B86
	bra.w	loc_018CBE
; $019B8A
	bra.w	loc_01A5D4
; $019B8E
	bra.w	loc_01A64C
; $019B92
	bra.w	loc_018C6A

loc_019B96:				; $019B96
	moveq	#5,d2
; $019B98
	bra.w	loc_0199B4
; $019B9C
	bra.w	loc_019546
; $019BA0
	bra.w	loc_0196F4
; $019BA4
	bra.w	loc_019AFE
; $019BA8
	bra.w	loc_0196F4
; $019BAC
	bra.w	loc_018CBE
; $019BB0
	bra.w	loc_01A5D4
; $019BB4
	bra.w	loc_01A64C
; $019BB8
	bra.w	loc_018C6A
; $019BBC
	bra.w	loc_019546
; $019BC0
	bra.w	loc_0196F4
; $019BC4
	bra.w	loc_019B70
; $019BC8
	bra.w	loc_0196F4
; $019BCC
	bra.w	loc_018CBE
; $019BD0
	bra.w	loc_01A488
; $019BD4
	bra.w	loc_01A64C
; $019BD8
	bra.w	loc_018C6A
; $019BDC
	bra.w	loc_019546
; $019BE0
	bra.w	loc_0196F4
; $019BE4
	bra.w	loc_0199B2
; $019BE8
	bra.w	loc_0196F4
; $019BEC
	bra.w	loc_018CBE
; $019BF0
	bra.w	loc_01A5D4
; $019BF4
	bra.w	loc_01A64C
; $019BF8
	bra.w	loc_018C6A
; $019BFC
	bra.w	loc_018C8C
; $019C00
	bra.w	loc_019C1C
; $019C04
	bra.w	loc_019C6E
; $019C08
	bra.w	loc_018F3E
; $019C0C
	bra.w	loc_018CBE
; $019C10
	bra.w	loc_01A3A8
; $019C14
	bra.w	loc_01A64C
; $019C18
	bra.w	loc_018C6A

loc_019C1C:				; $019C1C
	tst.w	$E(a0)
; $019C20
	beq.w	loc_019C34
; $019C24
	bsr.w	loc_01A28A
; $019C28
	move.b	#$4A,($FFFFA6DA).w
; $019C2E
	jsr	($018B2C).l

loc_019C34:				; $019C34
	tst.w	$4(a0)
; $019C38
	beq.w	loc_01A2D4
; $019C3C
	tst.w	$8(a0)
; $019C40
	bne.w	loc_019C6E
; $019C44
	addq.w	#1,$42(a0)
; $019C48
	cmpi.w	#$0042,$10(a0)
; $019C4E
	bls.w	loc_018C6A
; $019C52
	move.w	$3C(a0),d0
; $019C56
	tst.w	$A(a0)
; $019C5A
	beq.w	loc_019C60
; $019C5E
	neg.w	d0

loc_019C60:				; $019C60
	move.w	$10(a0),d1
; $019C64
	add.w	d0,d1
; $019C66
	bsr.w	loc_01C05E
; $019C6A
	bra.w	loc_01A31A

loc_019C6E:				; $019C6E
	addq.w	#1,$42(a0)
; $019C72
	cmpi.w	#$0042,$40(a0)
; $019C78
	bhi.w	loc_01A2D4
; $019C7C
	rts
; $019C7E
	bra.w	loc_018C8C
; $019C82
	bra.w	loc_019C9E
; $019C86
	bra.w	loc_019C6E
; $019C8A
	bra.w	loc_018F3E
; $019C8E
	bra.w	loc_018CBE
; $019C92
	bra.w	loc_01A3A8
; $019C96
	bra.w	loc_01A64C
; $019C9A
	bra.w	loc_018C6A

loc_019C9E:				; $019C9E
	tst.w	$E(a0)
; $019CA2
	beq.w	loc_019CB6
; $019CA6
	bsr.w	loc_01A28A
; $019CAA
	move.b	#$4A,($FFFFA6DA).w
; $019CB0
	jsr	($018B2C).l

loc_019CB6:				; $019CB6
	tst.w	$4(a0)
; $019CBA
	beq.w	loc_01A2D4
; $019CBE
	tst.w	$8(a0)
; $019CC2
	bne.w	loc_019C6E
; $019CC6
	tst.w	$42(a0)
; $019CCA
	bne.w	loc_019CD2
; $019CCE
	bsr.w	loc_01C0DA

loc_019CD2:				; $019CD2
	addq.w	#1,$42(a0)
; $019CD6
	cmpi.w	#$0042,$20(a0)
; $019CDC
	ble.w	loc_018C6A
; $019CE0
	bra.w	loc_01A31A
; $019CE4
	bra.w	loc_018C8C
; $019CE8
	bra.w	loc_019D04
; $019CEC
	bra.w	loc_019C6E
; $019CF0
	bra.w	loc_018F3E
; $019CF4
	bra.w	loc_018CBE
; $019CF8
	bra.w	loc_01A3A8
; $019CFC
	bra.w	loc_01A64C
; $019D00
	bra.w	loc_018C6A

loc_019D04:				; $019D04
	tst.w	$E(a0)
; $019D08
	beq.w	loc_019D10
; $019D0C
	bsr.w	loc_01A28A

loc_019D10:				; $019D10
	tst.w	$4(a0)
; $019D14
	beq.w	loc_01A2D4
; $019D18
	tst.w	$8(a0)
; $019D1C
	bne.w	loc_019C6E
; $019D20
	addq.w	#1,$42(a0)
; $019D24
	cmpi.w	#$0042,$10(a0)
; $019D2A
	bls.w	loc_018C6A
; $019D2E
	bsr.w	loc_01C11E
; $019D32
	move.w	#$0001,$8(a0)
; $019D38
	bra.w	loc_01A31A
; $019D3C
	bra.w	loc_018C8C
; $019D40
	bra.w	loc_019D5C
; $019D44
	bra.w	loc_019DC2
; $019D48
	bra.w	loc_018F3E
; $019D4C
	bra.w	loc_018CBE
; $019D50
	bra.w	loc_01A3A8
; $019D54
	bra.w	loc_01A64C
; $019D58
	bra.w	loc_018C6A

loc_019D5C:				; $019D5C
	tst.w	$E(a0)
; $019D60
	beq.w	loc_019D68
; $019D64
	bsr.w	loc_01A28A

loc_019D68:				; $019D68
	tst.w	$4(a0)
; $019D6C
	beq.w	loc_01A2D4
; $019D70
	tst.w	$8(a0)
; $019D74
	bne.w	loc_019DC2
; $019D78
	moveq	#48,d4
; $019D7A
	moveq	#19,d0
; $019D7C
	moveq	#0,d5

loc_019D7E:				; $019D7E
	moveq	#60,d2
; $019D80
	jsr	($0085A2).l
; $019D86
	roxl.w	#2,d2
; $019D88
	move.w	d2,d1
; $019D8A
	addi.w	#$0028,d1
; $019D8E
	cmpi.w	#$AE92,($000001).w
; $019D94
	bne.w	loc_019D9C
; $019D98
	subi.w	#$0014,d1

loc_019D9C:				; $019D9C
	moveq	#15,d2
; $019D9E
	jsr	($0085A2).l
; $019DA4
	move.w	d2,d3
; $019DA6
	addq.w	#1,d3
; $019DA8
	bsr.w	loc_01C220
; $019DAC
	addi.w	#$000A,d4
; $019DB0
	eori.w	#$0001,d5
; $019DB4
	dbf	d0,loc_019D7E
; $019DB8
	move.w	#$0001,$8(a0)
; $019DBE
	bra.w	loc_01A31A

loc_019DC2:				; $019DC2
	addq.w	#1,$42(a0)
; $019DC6
	cmpi.w	#$0042,$70(a0)
; $019DCC
	bhi.w	loc_01A2D4
; $019DD0
	rts
; $019DD2
	bra.w	loc_018C8C
; $019DD6
	bra.w	loc_019DF2
; $019DDA
	bra.w	loc_019C6E
; $019DDE
	bra.w	loc_018F3E
; $019DE2
	bra.w	loc_018CBE
; $019DE6
	bra.w	loc_01A3A8
; $019DEA
	bra.w	loc_01A64C
; $019DEE
	bra.w	loc_018C6A

loc_019DF2:				; $019DF2
	tst.w	$E(a0)
; $019DF6
	beq.w	loc_019DFE
; $019DFA
	bsr.w	loc_01A28A

loc_019DFE:				; $019DFE
	tst.w	$4(a0)
; $019E02
	beq.w	loc_01A2D4
; $019E06
	tst.w	$8(a0)
; $019E0A
	bne.w	loc_019C6E
; $019E0E
	tst.w	$42(a0)
; $019E12
	bne.w	loc_019E26
; $019E16
	bsr.w	loc_01C292
; $019E1A
	move.b	#$4A,($FFFFA6DA).w
; $019E20
	jsr	($018B2C).l

loc_019E26:				; $019E26
	addq.w	#1,$42(a0)
; $019E2A
	cmpi.w	#$0042,$20(a0)
; $019E30
	ble.w	loc_018C6A
; $019E34
	bra.w	loc_01A31A
; $019E38
	bra.w	loc_018C8C
; $019E3C
	bra.w	loc_019E58
; $019E40
	bra.w	loc_019186
; $019E44
	bra.w	loc_019186
; $019E48
	bra.w	loc_018CBE
; $019E4C
	bra.w	loc_01A3A8
; $019E50
	bra.w	loc_01A64C
; $019E54
	bra.w	loc_018C6A

loc_019E58:				; $019E58
	tst.w	$E(a0)
; $019E5C
	beq.w	loc_019E64
; $019E60
	bsr.w	loc_01A30C

loc_019E64:				; $019E64
	tst.w	$4(a0)
; $019E68
	beq.w	loc_01A2D4
; $019E6C
	tst.w	$8(a0)
; $019E70
	bne.w	loc_01A2D4
; $019E74
	move.w	#$0001,$8(a0)
; $019E7A
	bsr.w	loc_01C360
; $019E7E
	bra.w	loc_01A2D4
; $019E82
	bra.w	loc_018C8C
; $019E86
	bra.w	loc_019E58
; $019E8A
	bra.w	loc_019186
; $019E8E
	bra.w	loc_019186
; $019E92
	bra.w	loc_018CBE
; $019E96
	bra.w	loc_01A488
; $019E9A
	bra.w	loc_01A64C
; $019E9E
	bra.w	loc_018C6A
; $019EA2
	bra.w	loc_018C8C
; $019EA6
	bra.w	loc_019E58
; $019EAA
	bra.w	loc_019186
; $019EAE
	bra.w	loc_019186
; $019EB2
	bra.w	loc_018CBE
; $019EB6
	bra.w	loc_01A5D4
; $019EBA
	bra.w	loc_01A64C
; $019EBE
	bra.w	loc_018C6A
; $019EC2
	bra.w	loc_019546
; $019EC6
	bra.w	loc_0196F4
; $019ECA
	bra.w	loc_019EE2
; $019ECE
	bra.w	loc_0196F4
; $019ED2
	bra.w	loc_018CBE
; $019ED6
	bra.w	loc_01A3A8
; $019EDA
	bra.w	loc_01A64C
; $019EDE
	bra.w	loc_018C6A

loc_019EE2:				; $019EE2
	tst.w	$E(a0)
; $019EE6
	beq.w	loc_019EEE
; $019EEA
	bsr.w	loc_01A31A

loc_019EEE:				; $019EEE
	tst.w	$4(a0)
; $019EF2
	beq.w	loc_01A2D4
; $019EF6
	tst.w	$8(a0)
; $019EFA
	bne.w	loc_01A2D4
; $019EFE
	bsr.w	loc_01C41A
; $019F02
	move.w	#$0001,$8(a0)
; $019F08
	bra.w	loc_01A2C6
; $019F0C
	bra.w	loc_019546
; $019F10
	bra.w	loc_0196F4
; $019F14
	bra.w	loc_019EE2
; $019F18
	bra.w	loc_0196F4
; $019F1C
	bra.w	loc_018CBE
; $019F20
	bra.w	loc_01A488
; $019F24
	bra.w	loc_01A64C
; $019F28
	bra.w	loc_018C6A
; $019F2C
	bra.w	loc_018C8C
; $019F30
	bra.w	loc_019F4C
; $019F34
	bra.w	loc_019C6E
; $019F38
	bra.w	loc_018CB0
; $019F3C
	bra.w	loc_019F80
; $019F40
	bra.w	loc_01A3A8
; $019F44
	bra.w	loc_01A64C
; $019F48
	bra.w	loc_018C6A

loc_019F4C:				; $019F4C
	tst.w	$E(a0)
; $019F50
	beq.w	loc_019F58
; $019F54
	bsr.w	loc_01A28A

loc_019F58:				; $019F58
	tst.w	$4(a0)
; $019F5C
	beq.w	loc_01A2D4
; $019F60
	tst.w	$8(a0)
; $019F64
	bne.w	loc_019C6E
; $019F68
	addq.w	#1,$42(a0)
; $019F6C
	move.w	$42(a0),d0
; $019F70
	cmpi.w	#$002B,d0
; $019F74
	bcs.w	loc_018C6A
; $019F78
	bsr.w	loc_01B9FE
; $019F7C
	bra.w	loc_01A31A

loc_019F80:				; $019F80
	tst.w	$E(a0)
; $019F84
	beq.w	loc_019F90
; $019F88
	clr.w	$42(a0)
; $019F8C
	clr.w	$E(a0)

loc_019F90:				; $019F90
	move.w	$42(a0),d2
; $019F94
	cmpi.w	#$0010,d2
; $019F98
	bge.w	loc_01A2AA
; $019F9C
	addq.w	#1,$42(a0)
; $019FA0
	lea	($01A670).l,a1
; $019FA6
	moveq	#0,d1
; $019FA8
	move.b	($0,a1,d2.w),d1
; $019FAC
	bra.w	loc_01A98E
; $019FB0
	bra.w	loc_019FD0
; $019FB4
	bra.w	loc_019F4C
; $019FB8
	bra.w	loc_019FFA
; $019FBC
	bra.w	loc_018CB0
; $019FC0
	bra.w	loc_019F80
; $019FC4
	bra.w	loc_01A5D4
; $019FC8
	bra.w	loc_01A64C
; $019FCC
	bra.w	loc_018C6A

loc_019FD0:				; $019FD0
	move.w	#$0001,$46(a0)
; $019FD6
	tst.w	$4(a0)
; $019FDA
	beq.w	loc_01A2D4
; $019FDE
	move.w	$2(a0),d1
; $019FE2
	andi.w	#$0007,d1
; $019FE6
	add.w	d1,d1
; $019FE8
	cmp.w	($FFFFAE62).l,d1
; $019FEE
	bgt.w	loc_018C6A
; $019FF2
	bsr.w	loc_01A2B8
; $019FF6
	bra.w	loc_01A686

loc_019FFA:				; $019FFA
	move.w	#$0001,$46(a0)
; $01A000
	addq.w	#1,$42(a0)
; $01A004
	cmpi.w	#$0042,$40(a0)
; $01A00A
	bhi.w	loc_01A2D4
; $01A00E
	rts
; $01A010
	bra.w	loc_01A030
; $01A014
	bra.w	loc_019C6E
; $01A018
	bra.w	loc_01A05C
; $01A01C
	bra.w	loc_0196F4
; $01A020
	bra.w	loc_01A148
; $01A024
	bra.w	loc_01A5D4
; $01A028
	bra.w	loc_01A64C
; $01A02C
	bra.w	loc_018C6A

loc_01A030:				; $01A030
	move.w	#$0001,$46(a0)
; $01A036
	tst.w	$4(a0)
; $01A03A
	beq.w	loc_01A2B8
; $01A03E
	move.w	$2(a0),d1
; $01A042
	andi.w	#$0007,d1
; $01A046
	add.w	d1,d1
; $01A048
	add.w	d1,d1
; $01A04A
	cmp.w	($FFFFAE62).l,d1
; $01A050
	bgt.w	loc_018C6A
; $01A054
	bsr.w	loc_01A2C6
; $01A058
	bra.w	loc_01A686

loc_01A05C:				; $01A05C
	tst.w	$E(a0)
; $01A060
	beq.w	loc_01A068
; $01A064
	bsr.w	loc_01A31A

loc_01A068:				; $01A068
	tst.w	$4(a0)
; $01A06C
	beq.w	loc_01A2B8
; $01A070
	addq.w	#1,$42(a0)
; $01A074
	move.w	$42(a0),d1
; $01A078
	cmpi.w	#$000C,d1
; $01A07C
	blt.w	loc_01A0D8
; $01A080
	bne.w	loc_01A0C6
; $01A084
	bsr.w	loc_01AB7A
; $01A088
	beq.w	loc_01A0FA
; $01A08C
	movea.l	$2A(a0),a1
; $01A090
	move.w	$10(a0),d0
; $01A094
	cmp.w	$10(a1),d0
; $01A098
	blt.w	loc_01A0AA
; $01A09C
	beq.w	loc_01A0AE
; $01A0A0
	move.w	#$0800,$24(a0)
; $01A0A6
	bra.w	loc_01A0AE

loc_01A0AA:				; $01A0AA
	clr.w	$24(a0)

loc_01A0AE:				; $01A0AE
	exg	a0,a1
; $01A0B0
	bsr.w	loc_01AABC
; $01A0B4
	exg	a0,a1
; $01A0B6
	add.w	d1,$48(a1)
; $01A0BA
	bsr.w	loc_01BD36
; $01A0BE
	subq.w	#1,$4(a0)
; $01A0C2
	bra.w	loc_018C6A

loc_01A0C6:				; $01A0C6
	cmpi.w	#$0018,d1
; $01A0CA
	blt.w	loc_018C6A
; $01A0CE
	move.w	#$0000,$C(a0)
; $01A0D4
	bra.w	loc_018C6A

loc_01A0D8:				; $01A0D8
	move.w	$22(a0),$24(a0)
; $01A0DE
	move.w	$1C(a0),$16(a0)
; $01A0E4
	move.w	$1E(a0),$18(a0)
; $01A0EA
	move.w	$20(a0),$1A(a0)
; $01A0F0
	move.w	#$0002,$26(a0)
; $01A0F6
	bra.w	loc_01B0F8

loc_01A0FA:				; $01A0FA
	move.w	#$0000,d1
; $01A0FE
	lea	($FF6A3C).l,a1
; $01A104
	tst.w	$A(a0)
; $01A108
	bne.w	loc_01A116
; $01A10C
	move.w	#$0140,d1
; $01A110
	lea	($FF6D34).l,a1

loc_01A116:				; $01A116
	cmpi.w	#$AE92,($000001).w
; $01A11C
	beq.w	loc_01A136
; $01A120
	moveq	#9,d0

loc_01A122:				; $01A122
	tst.w	$0(a1)
; $01A126
	bne.w	loc_01A136
; $01A12A
	adda.w	#$004C,a1
; $01A12E
	dbf	d0,loc_01A122
; $01A132
	bra.w	loc_01A13A

loc_01A136:				; $01A136
	bsr.w	loc_01BE0A

loc_01A13A:				; $01A13A
	subq.w	#1,$4(a0)
; $01A13E
	move.w	$22(a0),$24(a0)
; $01A144
	bra.w	loc_018C6A

loc_01A148:				; $01A148
	tst.w	$E(a0)
; $01A14C
	beq.w	loc_01A158
; $01A150
	clr.w	$42(a0)
; $01A154
	clr.w	$E(a0)

loc_01A158:				; $01A158
	move.w	$42(a0),d2
; $01A15C
	cmpi.w	#$0010,d2
; $01A160
	bge.w	loc_01A2AA
; $01A164
	addq.w	#1,$42(a0)
; $01A168
	lea	($01A673).l,a1
; $01A16E
	moveq	#0,d1
; $01A170
	move.b	($0,a1,d2.w),d1
; $01A174
	bra.w	loc_01A98E
; $01A178
	bra.w	loc_019546
; $01A17C
	bra.w	loc_0196F4
; $01A180
	bra.w	loc_01A198
; $01A184
	bra.w	loc_0196F4
; $01A188
	bra.w	loc_018CBE
; $01A18C
	bra.w	loc_01A3A8
; $01A190
	bra.w	loc_01A64C
; $01A194
	bra.w	loc_018C6A

loc_01A198:				; $01A198
	tst.w	$E(a0)
; $01A19C
	beq.w	loc_01A1A4
; $01A1A0
	bsr.w	loc_01A31A

loc_01A1A4:				; $01A1A4
	tst.w	$4(a0)
; $01A1A8
	beq.w	loc_01A2D4
; $01A1AC
	addq.w	#1,$42(a0)
; $01A1B0
	move.w	$42(a0),d1
; $01A1B4
	cmpi.w	#$000C,d1
; $01A1B8
	blt.w	loc_01A21A
; $01A1BC
	bne.w	loc_01A208
; $01A1C0
	move.w	#$0007,$42(a0)
; $01A1C6
	bsr.w	loc_01AB7A
; $01A1CA
	beq.w	loc_01A23C
; $01A1CE
	movea.l	$2A(a0),a1
; $01A1D2
	move.w	$10(a0),d0
; $01A1D6
	cmp.w	$10(a1),d0
; $01A1DA
	blt.w	loc_01A1EC
; $01A1DE
	beq.w	loc_01A1F0
; $01A1E2
	move.w	#$0800,$24(a0)
; $01A1E8
	bra.w	loc_01A1F0

loc_01A1EC:				; $01A1EC
	clr.w	$24(a0)

loc_01A1F0:				; $01A1F0
	exg	a0,a1
; $01A1F2
	bsr.w	loc_01AABC
; $01A1F6
	exg	a0,a1
; $01A1F8
	add.w	d1,$48(a1)
; $01A1FC
	bsr.w	loc_01BF02
; $01A200
	subq.w	#1,$4(a0)
; $01A204
	bra.w	loc_018C6A

loc_01A208:				; $01A208
	cmpi.w	#$0018,d1
; $01A20C
	blt.w	loc_018C6A
; $01A210
	move.w	#$0000,$C(a0)
; $01A216
	bra.w	loc_018C6A

loc_01A21A:				; $01A21A
	move.w	$22(a0),$24(a0)
; $01A220
	move.w	$1C(a0),$16(a0)
; $01A226
	move.w	$1E(a0),$18(a0)
; $01A22C
	move.w	$20(a0),$1A(a0)
; $01A232
	move.w	#$0002,$26(a0)
; $01A238
	bra.w	loc_01B0F8

loc_01A23C:				; $01A23C
	move.w	#$0000,d1
; $01A240
	lea	($FF6A3C).l,a1
; $01A246
	tst.w	$A(a0)
; $01A24A
	bne.w	loc_01A258
; $01A24E
	move.w	#$0140,d1
; $01A252
	lea	($FF6D34).l,a1

loc_01A258:				; $01A258
	cmpi.w	#$AE92,($000001).w
; $01A25E
	beq.w	loc_01A278
; $01A262
	moveq	#9,d0

loc_01A264:				; $01A264
	tst.w	$0(a1)
; $01A268
	bne.w	loc_01A278
; $01A26C
	adda.w	#$004C,a1
; $01A270
	dbf	d0,loc_01A264
; $01A274
	bra.w	loc_01A27C

loc_01A278:				; $01A278
	bsr.w	loc_01BF9C

loc_01A27C:				; $01A27C
	subq.w	#1,$4(a0)
; $01A280
	move.w	$22(a0),$24(a0)
; $01A286
	bra.w	loc_018C6A

loc_01A28A:				; $01A28A
	move.w	#$0000,$34(a0)
; $01A290
	clr.w	$36(a0)
; $01A294
	clr.w	$38(a0)
; $01A298
	clr.w	$26(a0)
; $01A29C
	clr.w	$28(a0)
; $01A2A0
	clr.w	$42(a0)
; $01A2A4
	clr.w	$E(a0)
; $01A2A8
	rts

loc_01A2AA:				; $01A2AA
	move.w	#$0000,$C(a0)
; $01A2B0
	move.w	#$0001,$E(a0)
; $01A2B6
	rts

loc_01A2B8:				; $01A2B8
	move.w	#$0001,$C(a0)
; $01A2BE
	move.w	#$0001,$E(a0)
; $01A2C4
	rts

loc_01A2C6:				; $01A2C6
	move.w	#$0002,$C(a0)
; $01A2CC
	move.w	#$0001,$E(a0)
; $01A2D2
	rts

loc_01A2D4:				; $01A2D4
	move.w	#$0003,$C(a0)
; $01A2DA
	move.w	#$0001,$E(a0)
; $01A2E0
	rts

loc_01A2E2:				; $01A2E2
	move.w	#$0004,$C(a0)
; $01A2E8
	move.w	#$0001,$E(a0)
; $01A2EE
	rts

loc_01A2F0:				; $01A2F0
	move.w	#$0005,$C(a0)
; $01A2F6
	move.w	#$0001,$E(a0)
; $01A2FC
	rts

loc_01A2FE:				; $01A2FE
	move.w	#$0000,$C(a0)
; $01A304
	move.w	#$0000,d0
; $01A308
	bra.w	loc_01A360

loc_01A30C:				; $01A30C
	move.w	#$0001,$C(a0)
; $01A312
	move.w	#$0001,d0
; $01A316
	bra.w	loc_01A360

loc_01A31A:				; $01A31A
	move.w	#$0002,$C(a0)
; $01A320
	move.w	#$0002,d0
; $01A324
	bra.w	loc_01A360

loc_01A328:				; $01A328
	move.w	#$0003,$C(a0)
; $01A32E
	move.w	#$0000,d0
; $01A332
	bra.w	loc_01A360

loc_01A336:				; $01A336
	move.w	#$0007,$C(a0)
; $01A33C
	move.w	#$0000,d0
; $01A340
	bra.w	loc_01A360

loc_01A344:				; $01A344
	move.w	#$0004,$C(a0)
; $01A34A
	move.w	#$0003,d0
; $01A34E
	bra.w	loc_01A360

loc_01A352:				; $01A352
	move.w	#$0005,$C(a0)
; $01A358
	move.w	#$0004,d0
; $01A35C
	bra.w	loc_01A360

loc_01A360:				; $01A360
	movem.l	a6/d6/d5,-(a7)
; $01A364
	move.w	$34(a0),d1
; $01A368
	move.w	d0,$34(a0)
; $01A36C
	cmp.w	d0,d1
; $01A36E
	beq.w	loc_01A392
; $01A372
	movea.l	$30(a0),a1
; $01A376
	add.w	d0,d0
; $01A378
	add.w	d0,d0
; $01A37A
	movea.l	($0,a1,d0.w),a2
; $01A37E
	add.w	d1,d1
; $01A380
	add.w	d1,d1
; $01A382
	cmpa.l	($0,a1,d1.w),a2
; $01A386
	beq.w	loc_01A392
; $01A38A
	clr.w	$36(a0)
; $01A38E
	clr.w	$38(a0)

loc_01A392:				; $01A392
	clr.w	$26(a0)
; $01A396
	clr.w	$28(a0)
; $01A39A
	clr.w	$42(a0)
; $01A39E
	clr.w	$E(a0)
; $01A3A2
	movem.l	(a7)+,d5/d6/a6
; $01A3A6
	rts

loc_01A3A8:				; $01A3A8
	tst.w	$E(a0)
; $01A3AC
	beq.w	loc_01A3B4
; $01A3B0
	bsr.w	loc_01A352

loc_01A3B4:				; $01A3B4
	move.w	$42(a0),d1
; $01A3B8
	bne.w	loc_01A3F8
; $01A3BC
	move.w	#$003C,d2
; $01A3C0
	move.w	#$0005,d1
; $01A3C4
	bsr.w	loc_01A8C2
; $01A3C8
	tst.w	$24(a0)
; $01A3CC
	bne.w	loc_01A3D4
; $01A3D0
	neg.w	d1
; $01A3D2
	lsr.w	#1,d1

loc_01A3D4:				; $01A3D4
	move.w	d1,$16(a0)
; $01A3D8
	move.w	d2,$18(a0)
; $01A3DC
	clr.w	$1A(a0)
; $01A3E0
	clr.w	$20(a0)
; $01A3E4
	move.w	$10(a0),d1
; $01A3E8
	asl.w	#4,d1
; $01A3EA
	move.w	d1,$1C(a0)
; $01A3EE
	move.w	$12(a0),d1
; $01A3F2
	asl.w	#4,d1
; $01A3F4
	move.w	d1,$1E(a0)

loc_01A3F8:				; $01A3F8
	addq.w	#1,$42(a0)
; $01A3FC
	tst.w	$1A(a0)
; $01A400
	bne.w	loc_01A462
; $01A404
	move.w	$16(a0),d1
; $01A408
	move.w	$18(a0),d2
; $01A40C
	move.w	$1C(a0),d3
; $01A410
	move.w	$1E(a0),d4
; $01A414
	move.w	#$0001,d5
; $01A418
	bsr.w	loc_01A8EE
; $01A41C
	move.w	d2,$18(a0)
; $01A420
	move.w	$1C(a0),d1
; $01A424
	move.w	d3,$1C(a0)
; $01A428
	move.w	d4,$1E(a0)
; $01A42C
	sub.w	d1,d3
; $01A42E
	asr.w	#4,d3
; $01A430
	move.w	d3,d1
; $01A432
	bsr.w	loc_01A90A
; $01A436
	move.w	$10(a0),d0
; $01A43A
	lea	($FF67BC).l,a1
; $01A440
	add.w	d0,d0
; $01A442
	move.w	($0,a1,d0.w),d0
; $01A446
	asr.w	#4,d4
; $01A448
	cmp.w	d0,d4
; $01A44A
	ble.w	loc_01A45C
; $01A44E
	move.w	d0,d4
; $01A450
	tst.w	d2
; $01A452
	bmi.w	loc_01A45C
; $01A456
	move.w	#$0001,$1A(a0)

loc_01A45C:				; $01A45C
	move.w	d4,$12(a0)
; $01A460
	rts

loc_01A462:				; $01A462
	addq.w	#1,$20(a0)
; $01A466
	move.w	$20(a0),d1
; $01A46A
	cmpi.w	#$002D,d1
; $01A46E
	bgt.w	loc_01A336
; $01A472
	btst	#0,d1
; $01A476
	beq.w	loc_01A482
; $01A47A
	move.w	#$FFFF,$3A(a0)
; $01A480
	rts

loc_01A482:				; $01A482
	clr.w	$3A(a0)
; $01A486
	rts

loc_01A488:				; $01A488
	tst.w	$E(a0)
; $01A48C
	beq.w	loc_01A4B0
; $01A490
	bsr.w	loc_01A352
; $01A494
	move.w	$10(a0),d1
; $01A498
	move.w	$12(a0),d2
; $01A49C
	move.w	$14(a0),d3
; $01A4A0
	tst.w	$2E(a0)
; $01A4A4
	beq.w	loc_01A4AC
; $01A4A8
	bra.w	loc_01BADA

loc_01A4AC:				; $01A4AC
	bra.w	loc_01BA8A

loc_01A4B0:				; $01A4B0
	move.w	$42(a0),d1
; $01A4B4
	bne.w	loc_01A3F8
; $01A4B8
	tst.w	$36(a0)
; $01A4BC
	beq.w	loc_01A50A
; $01A4C0
	tst.w	$38(a0)
; $01A4C4
	beq.w	loc_01A50A
; $01A4C8
	move.w	#$003C,d2
; $01A4CC
	move.w	#$0005,d1
; $01A4D0
	bsr.w	loc_01A8C2
; $01A4D4
	tst.w	$24(a0)
; $01A4D8
	bne.w	loc_01A4E0
; $01A4DC
	neg.w	d1
; $01A4DE
	lsr.w	#1,d1

loc_01A4E0:				; $01A4E0
	move.w	d1,$16(a0)
; $01A4E4
	move.w	d2,$18(a0)
; $01A4E8
	clr.w	$1A(a0)
; $01A4EC
	clr.w	$20(a0)
; $01A4F0
	move.w	$10(a0),d1
; $01A4F4
	asl.w	#4,d1
; $01A4F6
	move.w	d1,$1C(a0)
; $01A4FA
	move.w	$12(a0),d1
; $01A4FE
	subq.w	#8,d1
; $01A500
	asl.w	#4,d1
; $01A502
	move.w	d1,$1E(a0)
; $01A506
	bra.w	loc_01A3F8

loc_01A50A:				; $01A50A
	rts

loc_01A50C:				; $01A50C
	bsr.w	loc_01A352
; $01A510
	movea.l	a0,a1
; $01A512
	move.w	$10(a0),d1
; $01A516
	move.w	$12(a0),d2
; $01A51A
	move.w	$14(a0),d3
; $01A51E
	move.w	$3C(a0),d0
; $01A522
	sub.w	d0,d1
; $01A524
	lsr.w	#1,d0
; $01A526
	subq.w	#1,d0

loc_01A528:				; $01A528
	moveq	#60,d4
; $01A52A
	jsr	($01C534).l
; $01A530
	addq.w	#4,d1
; $01A532
	dbf	d0,loc_01A528
; $01A536
	subq.w	#6,d2
; $01A538
	move.w	$10(a0),d1
; $01A53C
	move.w	$3C(a0),d0
; $01A540
	sub.w	d0,d1
; $01A542
	addq.w	#8,d1
; $01A544
	lsr.w	#1,d0
; $01A546
	subq.w	#4,d0
; $01A548
	bpl.w	loc_01A54E
; $01A54C
	moveq	#0,d0

loc_01A54E:				; $01A54E
	moveq	#60,d4
; $01A550
	jsr	($01C534).l
; $01A556
	addq.w	#4,d1
; $01A558
	dbf	d0,loc_01A54E
; $01A55C
	subq.w	#6,d2
; $01A55E
	move.w	$10(a0),d1
; $01A562
	move.w	$3C(a0),d0
; $01A566
	sub.w	d0,d1
; $01A568
	addi.w	#$0010,d1
; $01A56C
	lsr.w	#1,d0
; $01A56E
	subq.w	#8,d0
; $01A570
	bpl.w	loc_01A576
; $01A574
	moveq	#0,d0

loc_01A576:				; $01A576
	moveq	#60,d4
; $01A578
	jsr	($01C534).l
; $01A57E
	addq.w	#4,d1
; $01A580
	dbf	d0,loc_01A576
; $01A584
	bra.w	loc_01A336

loc_01A588:				; $01A588
	bsr.w	loc_01A352
; $01A58C
	movea.l	a0,a1
; $01A58E
	move.w	$10(a0),d1
; $01A592
	move.w	$12(a0),d2
; $01A596
	move.w	$14(a0),d3
; $01A59A
	move.w	$3C(a0),d5
; $01A59E
	sub.w	d5,d1
; $01A5A0
	lsr.w	#1,d5
; $01A5A2
	move.w	d5,d0
; $01A5A4
	lsr.w	#1,d0
; $01A5A6
	add.w	d0,d1
; $01A5A8
	moveq	#3,d0

loc_01A5AA:				; $01A5AA
	moveq	#60,d4
; $01A5AC
	jsr	($01C534).l
; $01A5B2
	add.w	d5,d1
; $01A5B4
	dbf	d0,loc_01A5AA
; $01A5B8
	subq.w	#8,d2
; $01A5BA
	move.w	$10(a0),d1
; $01A5BE
	sub.w	d5,d1
; $01A5C0
	moveq	#2,d0

loc_01A5C2:				; $01A5C2
	moveq	#60,d4
; $01A5C4
	jsr	($01C534).l
; $01A5CA
	add.w	d5,d1
; $01A5CC
	dbf	d0,loc_01A5C2
; $01A5D0
	bra.w	loc_01A336

loc_01A5D4:				; $01A5D4
	tst.w	$E(a0)
; $01A5D8
	beq.w	loc_01A5E4
; $01A5DC
	clr.w	$42(a0)
; $01A5E0
	clr.w	$E(a0)

loc_01A5E4:				; $01A5E4
	addq.w	#1,$42(a0)
; $01A5E8
	move.w	$42(a0),d0
; $01A5EC
	cmpi.w	#$0064,d0
; $01A5F0
	bcs.w	loc_01A5FA
; $01A5F4
	eori.w	#$003A,$1(a0)

loc_01A5FA:				; $01A5FA
	cmpi.w	#$0082,d0
; $01A5FE
	bcs.w	loc_01A60E
; $01A602
	cmpi.w	#$00A0,d0
; $01A606
	blt.w	loc_01A64A
; $01A60A
	bra.w	loc_01A336

loc_01A60E:				; $01A60E
	subq.w	#1,d0
; $01A610
	andi.w	#$0007,d0
; $01A614
	bne.w	loc_01A64A
; $01A618
	move.w	$10(a0),d1
; $01A61C
	move.w	$3C(a0),d3
; $01A620
	addq.w	#8,d3
; $01A622
	move.w	d3,d2
; $01A624
	lsl.w	#1,d2
; $01A626
	jsr	($0085A2).l
; $01A62C
	sub.w	d3,d2
; $01A62E
	add.w	d2,d1
; $01A630
	move.w	$12(a0),d0
; $01A634
	move.w	$3E(a0),d2
; $01A638
	jsr	($0085A2).l
; $01A63E
	sub.w	d2,d0
; $01A640
	move.w	d0,d2
; $01A642
	move.w	$14(a0),d3
; $01A646
	bsr.w	loc_01BADA

loc_01A64A:				; $01A64A
	rts

loc_01A64C:				; $01A64C
	bsr.w	loc_01B0C0
; $01A650
	move.w	#$0003,$26(a0)
; $01A656
	moveq	#0,d5
; $01A658
	bsr.w	loc_01B0F8
; $01A65C
	tst.w	d5
; $01A65E
	bne.w	loc_01A66E
; $01A662
	move.w	#$0007,$C(a0)
; $01A668
	move.w	$22(a0),$24(a0)

loc_01A66E:				; $01A66E
	rts
; $01A670
	btst	d2,d4
; $01A672
	btst	d1,d3
; $01A674
	andi.b	#$01,d2
; $01A678
	btst	d0,d1
; $01A67A
	ori.b	#$00,d0
; $01A67E
	ori.b	#$00,d0
; $01A682
	ori.b	#$00,d0

loc_01A686:				; $01A686
	move.w	$6(a0),d1
; $01A68A
	add.w	d1,d1
; $01A68C
	add.w	d1,d1
; $01A68E
	lea	($018B8E).l,a1
; $01A694
	movea.l	($0,a1,d1.w),a1
; $01A698
	move.w	$C(a0),d1
; $01A69C
	add.w	d1,d1
; $01A69E
	add.w	d1,d1
; $01A6A0
	jmp	($0,a1,d1.w)
; $01A6A4
	dc.w	$0000
; $01A6A6
	dc.w	$0004
; $01A6A8
	dc.w	$0008
; $01A6AA
	dc.w	$000D
; $01A6AC
	ori.b	#$16,(a1)
; $01A6B0
	ori.b	#$1F,(a2)+
; $01A6B4
	ori.b	#$28,-(a3)
; $01A6B8
	ori.b	#$35,$30(a4)
; $01A6BE
	ori.b	#$46,($3D0042).l
; $01A6C6
	ori.w	#$004F,a2
; $01A6CA
	ori.w	#$0057,(a3)
; $01A6CE
	ori.w	#$005F,(a3)+
; $01A6D2
	ori.w	#$0068,-(a4)
; $01A6D6
	ori.w	#$0074,$70(a4)
; $01A6DC
	ori.w	#$007F,($00007C).w
; $01A6E2
	ori.l	#$0087008B,d3
; $01A6E8
	ori.l	#$00920096,a7
; $01A6EE
	ori.l	#$009D00A1,(a2)+
; $01A6F4
	ori.l	#$00A700AB,-(a4)
; $01A6FA
	ori.l	#$00B500B8,$B1(a6)
; $01A702
	ori.l	#$00C100C4,(-$42,pc,d0.w)
; $01A70A
	ori.?	#?,d6
; $01A70C
	ori.?	#?,a1
; $01A70E
	ori.?	#?,a4
; $01A710
	ori.?	#?,a7
; $01A712
	ori.?	#?,(a1)
; $01A714
	ori.?	#?,(a4)
; $01A716
	ori.?	#?,(a6)
; $01A718
	ori.?	#?,(a1)+
; $01A71A
	ori.?	#?,(a3)+
; $01A71C
	ori.?	#?,(a5)+
; $01A71E
	ori.?	#?,(a7)+
; $01A720
	ori.?	#?,-(a2)
; $01A722
	ori.?	#?,-(a4)
; $01A724
	ori.?	#?,-(a6)
; $01A726
	ori.?	#?,$E9(a0)
; $01A72A
	ori.?	#?,$ED(a3)
; $01A72E
	ori.?	#?,$F0(a6)
; $01A732
	ori.?	#?,(-$D,a2,d0.w)
; $01A736
	ori.?	#?,(-$A,a4,d0.w)
; $01A73A
	ori.?	#?,(-$8,a7,d0.w)
; $01A73E
	ori.?	#?,($FA00FB).l
; $01A744
	ori.?	#?,#$00FC
; $01A748
	ori.?	#?,?ea(7,5)
; $01A74A
	ori.?	#?,?ea(7,6)
; $01A74C
	ori.?	#?,?ea(7,6)
; $01A74E
	ori.?	#?,?ea(7,7)
; $01A750
	ori.?	#?,?ea(7,7)
; $01A752
	ori.?	#?,?ea(7,7)
; $01A754
	ori.?	#?,?ea(7,7)
; $01A756
	ori.?	#?,?ea(7,7)
; $01A758
	btst	d0,d0
; $01A75A
	ori.?	#?,?ea(7,7)
; $01A75C
	ori.?	#?,?ea(7,7)
; $01A75E
	ori.?	#?,?ea(7,7)
; $01A760
	ori.?	#?,?ea(7,7)
; $01A762
	ori.?	#?,?ea(7,7)
; $01A764
	ori.?	#?,?ea(7,6)
; $01A766
	ori.?	#?,?ea(7,6)
; $01A768
	ori.?	#?,?ea(7,5)
; $01A76A
	ori.?	#?,#$00FC
; $01A76E
	ori.?	#?,(-$6,pc,d0.w)
; $01A772
	ori.?	#?,($F800F7).l
; $01A778
	ori.?	#?,(-$C,a6,d0.w)
; $01A77C
	ori.?	#?,(-$E,a3,d0.w)
; $01A780
	ori.?	#?,(-$11,a0,d0.w)
; $01A784
	ori.?	#?,$EB(a5)
; $01A788
	ori.?	#?,$E8(a1)
; $01A78C
	ori.?	#?,-(a6)
; $01A78E
	ori.?	#?,-(a4)
; $01A790
	ori.?	#?,-(a2)
; $01A792
	ori.?	#?,(a7)+
; $01A794
	ori.?	#?,(a5)+
; $01A796
	ori.?	#?,(a3)+
; $01A798
	ori.?	#?,(a1)+
; $01A79A
	ori.?	#?,(a6)
; $01A79C
	ori.?	#?,(a4)
; $01A79E
	ori.?	#?,(a1)
; $01A7A0
	ori.?	#?,a7
; $01A7A2
	ori.?	#?,a4
; $01A7A4
	ori.?	#?,a1
; $01A7A6
	ori.?	#?,d6
; $01A7A8
	ori.?	#?,d4
; $01A7AA
	ori.?	#?,d1
; $01A7AC
	ori.l	#$00BB00B8,?ea(7,6)
; $01A7B2
	ori.l	#$00AE00AB,(-$4F,a5,d0.w)
; $01A7BA
	ori.l	#$00A400A1,-(a7)
; $01A7C0
	ori.l	#$009A0096,(a5)+
; $01A7C6
	ori.l	#$008F008B,(a2)
; $01A7CC
	ori.l	#$00830080,d7
; $01A7D2
	ori.w	#$0074,sr
; $01A7D8
	ori.w	#$0068,($6C,a0,d0.w)
; $01A7DE
	ori.w	#$005F,-(a4)
; $01A7E2
	ori.w	#$0057,(a3)+
; $01A7E6
	ori.w	#$004F,(a3)
; $01A7EA
	ori.w	#$0046,a2
; $01A7EE
	ori.w	#$003D,d2
; $01A7F2
	ori.b	#$2C,($350030).l
; $01A7FA
	ori.b	#$1F,$23(a0)
; $01A800
	ori.b	#$16,(a2)+
; $01A804
	ori.b	#$0D,(a1)
; $01A808
	ori.b	#$04,a0
; $01A80C
	ori.b	#$FC,d0
; $01A810
	dc.w	$FFF8
; $01A812
	dc.w	$FFF3
; $01A814
	dc.w	$FFEF
; $01A816
	dc.w	$FFEA
; $01A818
	dc.w	$FFE6
; $01A81A
	dc.w	$FFE1
; $01A81C
	dc.w	$FFDD
; $01A81E
	dc.w	$FFD8
; $01A820
	dc.w	$FFD4
; $01A822
	dc.w	$FFD0
; $01A824
	dc.w	$FFCB
; $01A826
	dc.w	$FFC7
; $01A828
	dc.w	$FFC3
; $01A82A
	dc.w	$FFBE
; $01A82C
	dc.w	$FFBA
; $01A82E
	dc.w	$FFB6
; $01A830
	dc.w	$FFB1
; $01A832
	dc.w	$FFAD
; $01A834
	dc.w	$FFA9
; $01A836
	dc.w	$FFA5
; $01A838
	dc.w	$FFA1
; $01A83A
	dc.w	$FF9C
; $01A83C
	dc.w	$FF98
; $01A83E
	dc.w	$FF94
; $01A840
	dc.w	$FF90
; $01A842
	dc.w	$FF8C
; $01A844
	dc.w	$FF88
; $01A846
	dc.w	$FF84
; $01A848
	dc.w	$FF81
; $01A84A
	dc.w	$FF7D
; $01A84C
	dc.w	$FF79
; $01A84E
	dc.w	$FF75
; $01A850
	dc.w	$FF71
; $01A852
	dc.w	$FF6E
; $01A854
	dc.w	$FF6A
; $01A856
	dc.w	$FF66
; $01A858
	dc.w	$FF63
; $01A85A
	dc.w	$FF5F
; $01A85C
	dc.w	$FF5C
; $01A85E
	dc.w	$FF59
; $01A860
	dc.w	$FF55
; $01A862
	dc.w	$FF52
; $01A864
	dc.w	$FF4F
; $01A866
	dc.w	$FF4C
; $01A868
	dc.w	$FF48
; $01A86A
	dc.w	$FF45
; $01A86C
	dc.w	$FF42
; $01A86E
	dc.w	$FF3F
; $01A870
	dc.w	$FF3C
; $01A872
	dc.w	$FF3A
; $01A874
	dc.w	$FF37
; $01A876
	dc.w	$FF34
; $01A878
	dc.w	$FF31
; $01A87A
	dc.w	$FF2F
; $01A87C
	dc.w	$FF2C
; $01A87E
	dc.w	$FF2A
; $01A880
	dc.w	$FF27
; $01A882
	dc.w	$FF25
; $01A884
	dc.w	$FF23
; $01A886
	dc.w	$FF21
; $01A888
	dc.w	$FF1E
; $01A88A
	dc.w	$FF1C
; $01A88C
	dc.w	$FF1A
; $01A88E
	dc.w	$FF18
; $01A890
	dc.w	$FF17
; $01A892
	dc.w	$FF15
; $01A894
	dc.w	$FF13
; $01A896
	dc.w	$FF12
; $01A898
	dc.w	$FF10
; $01A89A
	dc.w	$FF0E
; $01A89C
	dc.w	$FF0D
; $01A89E
	dc.w	$FF0C
; $01A8A0
	dc.w	$FF0A
; $01A8A2
	dc.w	$FF09
; $01A8A4
	dc.w	$FF08
; $01A8A6
	dc.w	$FF07
; $01A8A8
	dc.w	$FF06
; $01A8AA
	dc.w	$FF05
; $01A8AC
	dc.w	$FF04
; $01A8AE
	dc.w	$FF04
; $01A8B0
	dc.w	$FF03
; $01A8B2
	dc.w	$FF02
; $01A8B4
	dc.w	$FF02
; $01A8B6
	dc.w	$FF01
; $01A8B8
	dc.w	$FF01
; $01A8BA
	dc.w	$FF01
; $01A8BC
	dc.w	$FF01
; $01A8BE
	dc.w	$FF01
; $01A8C0
	dc.w	$FF01

loc_01A8C2:				; $01A8C2
	movem.l	a7/a4/d6,-(a7)
; $01A8C6
	lea	($01A6A4).l,a1
; $01A8CC
	add.w	d2,d2
; $01A8CE
	move.w	d2,d3
; $01A8D0
	move.w	d1,d2
; $01A8D2
	neg.w	d2
; $01A8D4
	move.w	($0,a1,d3.w),d0
; $01A8D8
	muls.w	d0,d2
; $01A8DA
	asr.w	#4,d2
; $01A8DC
	addi.w	#$00B4,d3
; $01A8E0
	move.w	($0,a1,d3.w),d0
; $01A8E4
	muls.w	d0,d1
; $01A8E6
	asr.w	#4,d1
; $01A8E8
	movem.l	(a7)+,d6/a4/a7
; $01A8EC
	rts

loc_01A8EE:				; $01A8EE
	movem.l	a7/a2,-(a7)
; $01A8F2
	move.w	d5,d0
; $01A8F4
	muls.w	d1,d0
; $01A8F6
	add.w	d0,d3
; $01A8F8
	move.w	d5,d0
; $01A8FA
	muls.w	d2,d0
; $01A8FC
	add.w	d0,d4
; $01A8FE
	muls.w	#$0003,d5
; $01A902
	add.w	d5,d2
; $01A904
	movem.l	(a7)+,a2/a7
; $01A908
	rts

loc_01A90A:				; $01A90A
	movem.l	a6/a5/d6,-(a7)
; $01A90E
	move.w	$10(a0),d2
; $01A912
	tst.w	d1
; $01A914
	bmi.w	loc_01A924
; $01A918
	add.w	d1,d2
; $01A91A
	move.w	d2,d1
; $01A91C
	add.w	$3C(a0),d2
; $01A920
	bra.w	loc_01A92C

loc_01A924:				; $01A924
	add.w	d1,d2
; $01A926
	move.w	d2,d1
; $01A928
	sub.w	$3C(a0),d2

loc_01A92C:				; $01A92C
	sub.w	$14(a0),d2
; $01A930
	tst.w	$40(a0)
; $01A934
	beq.w	loc_01A940
; $01A938
	add.w	$14(a0),d2
; $01A93C
	add.w	$14(a0),d2

loc_01A940:				; $01A940
	cmpi.w	#$0138,d2
; $01A944
	bgt.w	loc_01A954
; $01A948
	cmpi.w	#$0008,d2
; $01A94C
	bmi.w	loc_01A954
; $01A950
	move.w	d1,$10(a0)

loc_01A954:				; $01A954
	movem.l	(a7)+,d6/a5/a6
; $01A958
	rts

loc_01A95A:				; $01A95A
	movem.l	a7/d6,-(a7)
; $01A95E
	tst.w	$2E(a0)
; $01A962
	bne.w	loc_01A988
; $01A966
	move.w	$10(a0),d0
; $01A96A
	beq.w	loc_01A97A
; $01A96E
	cmpi.w	#$0140,d0
; $01A972
	blt.w	loc_01A97A
; $01A976
	move.w	#$013F,d0

loc_01A97A:				; $01A97A
	add.w	d0,d0
; $01A97C
	lea	($FF67BC).l,a1
; $01A982
	move.w	($0,a1,d0.w),$12(a0)

loc_01A988:				; $01A988
	movem.l	(a7)+,d6/a7
; $01A98C
	rts

loc_01A98E:				; $01A98E
	movem.l	a6/a5/d6,-(a7)
; $01A992
	tst.w	$24(a0)
; $01A996
	bne.w	loc_01A99C
; $01A99A
	neg.w	d1

loc_01A99C:				; $01A99C
	bsr.w	loc_01A90A
; $01A9A0
	move.w	$10(a0),d1
; $01A9A4
	lea	($FF67BC).l,a1
; $01A9AA
	add.w	d1,d1
; $01A9AC
	move.w	($0,a1,d1.w),d2
; $01A9B0
	tst.w	$2E(a0)
; $01A9B4
	bne.w	loc_01A9C0
; $01A9B8
	move.w	d2,$12(a0)
; $01A9BC
	bra.w	loc_01A9CC

loc_01A9C0:				; $01A9C0
	cmp.w	$12(a0),d2
; $01A9C4
	bge.w	loc_01A9CC
; $01A9C8
	move.w	d2,$12(a0)

loc_01A9CC:				; $01A9CC
	movem.l	(a7)+,d6/a5/a6
; $01A9D0
	rts

loc_01A9D2:				; $01A9D2
	movem.l	a7,-(a7)
; $01A9D6
	lea	($FF6A3C).l,a1
; $01A9DC
	tst.w	$A(a0)
; $01A9E0
	bne.w	loc_01A9EA
; $01A9E4
	lea	($FF6D34).l,a1

loc_01A9EA:				; $01A9EA
	moveq	#9,d0

loc_01A9EC:				; $01A9EC
	tst.w	$0(a1)
; $01A9F0
	beq.w	loc_01A9FC
; $01A9F4
	bsr.w	loc_01AA18
; $01A9F8
	bne.w	loc_01AA0E

loc_01A9FC:				; $01A9FC
	adda.w	#$004C,a1
; $01AA00
	dbf	d0,loc_01A9EC
; $01AA04
	ori	#$DF,ccr
; $01AA0A
	ori.b	#$75,d1

loc_01AA0E:				; $01AA0E
	andi.b	#$DF,#$FB
; $01AA14
	ori.b	#$75,d1

loc_01AA18:				; $01AA18
	movem.l	a6/a5/a4,-(a7)
; $01AA1C
	move.w	$10(a1),d1
; $01AA20
	move.w	$10(a0),d2
; $01AA24
	cmp.w	d1,d2
; $01AA26
	bgt.w	loc_01AA2C
; $01AA2A
	exg	a1,a2

loc_01AA2C:				; $01AA2C
	move.w	$12(a0),d3
; $01AA30
	sub.w	$12(a1),d3
; $01AA34
	bpl.w	loc_01AA3A
; $01AA38
	neg.w	d3

loc_01AA3A:				; $01AA3A
	cmp.w	$3E(a1),d3
; $01AA3E
	bgt.w	loc_01AA50
; $01AA42
	sub.w	d1,d2
; $01AA44
	sub.w	$3C(a0),d2
; $01AA48
	sub.w	$3C(a1),d2
; $01AA4C
	ble.w	loc_01AA5A

loc_01AA50:				; $01AA50
	ori	#$DF,ccr
; $01AA56
	ori.b	#$75,a6

loc_01AA5A:				; $01AA5A
	andi.b	#$DF,#$FB
; $01AA60
	ori.b	#$75,a6

loc_01AA64:				; $01AA64
	movem.l	a5/a4/a3/d7,-(a7)
; $01AA68
	moveq	#9,d2
; $01AA6A
	lea	($FF6A3C).l,a0
; $01AA70
	tst.w	$A(a1)
; $01AA74
	bne.w	loc_01AA7E
; $01AA78
	lea	($FF6D34).l,a0

loc_01AA7E:				; $01AA7E
	tst.w	$4(a1)
; $01AA82
	beq.w	loc_01AAB6
; $01AA86
	tst.w	$0(a0)
; $01AA8A
	beq.w	loc_01AAAE
; $01AA8E
	move.w	$3C(a0),d3
; $01AA92
	move.w	$10(a0),d4
; $01AA96
	sub.w	d3,d4
; $01AA98
	cmp.w	d1,d4
; $01AA9A
	bgt.w	loc_01AAAE
; $01AA9E
	move.w	$10(a0),d4
; $01AAA2
	add.w	d3,d4
; $01AAA4
	cmp.w	d0,d4
; $01AAA6
	blt.w	loc_01AAAE
; $01AAAA
	bsr.w	loc_01AAEC

loc_01AAAE:				; $01AAAE
	adda.w	#$004C,a0
; $01AAB2
	dbf	d2,loc_01AA7E

loc_01AAB6:				; $01AAB6
	movem.l	(a7)+,d7/a3/a4/a5
; $01AABA
	rts

loc_01AABC:				; $01AABC
	movem.l	a5/d7/d6/d5/d4/d3,-(a7)
; $01AAC0
	tst.w	$0(a0)
; $01AAC4
	beq.w	loc_01AAE6
; $01AAC8
	lea	($FFFFA662).w,a2
; $01AACC
	lea	($FFFFA694).w,a3
; $01AAD0
	tst.w	$A(a1)
; $01AAD4
	beq.w	loc_01AADA
; $01AAD8
	exg	a2,a3

loc_01AADA:				; $01AADA
	tst.w	$4(a1)
; $01AADE
	beq.w	loc_01AAE6
; $01AAE2
	bsr.w	loc_01AE60

loc_01AAE6:				; $01AAE6
	movem.l	(a7)+,d3/d4/d5/d6/d7/a5
; $01AAEA
	rts

loc_01AAEC:				; $01AAEC
	movem.l	a6/a5/d7/d6/d5/d4,-(a7)
; $01AAF0
	tst.w	$0(a0)
; $01AAF4
	beq.w	loc_01AB74
; $01AAF8
	lea	($FFFFA662).w,a2
; $01AAFC
	lea	($FFFFA694).w,a3
; $01AB00
	tst.w	$A(a1)
; $01AB04
	beq.w	loc_01AB0A
; $01AB08
	exg	a2,a3

loc_01AB0A:				; $01AB0A
	tst.w	$4(a1)
; $01AB0E
	beq.w	loc_01AB74
; $01AB12
	bsr.w	loc_01AE60
; $01AB16
	add.w	d1,$30(a3)
; $01AB1A
	subq.w	#1,$4(a1)
; $01AB1E
	tst.w	$46(a0)
; $01AB22
	bne.w	loc_01AB2E
; $01AB26
	clr.w	$26(a0)
; $01AB2A
	clr.w	$28(a0)

loc_01AB2E:				; $01AB2E
	tst.w	d1
; $01AB30
	bne.w	loc_01AB52
; $01AB34
	tst.w	($FF78F6).l
; $01AB3A
	beq.w	loc_01AB48
; $01AB3E
	jsr	($018AEC).l
; $01AB44
	bra.w	loc_01AB74

loc_01AB48:				; $01AB48
	jsr	($018B06).l
; $01AB4E
	bra.w	loc_01AB74

loc_01AB52:				; $01AB52
	jsr	($018AB2).l
; $01AB58
	sub.w	d1,$0(a0)
; $01AB5C
	beq.w	loc_01AB70
; $01AB60
	tst.w	$46(a0)
; $01AB64
	bne.w	loc_01AB74
; $01AB68
	bsr.w	loc_01A2E2
; $01AB6C
	bra.w	loc_01AB74

loc_01AB70:				; $01AB70
	bsr.w	loc_01A2F0

loc_01AB74:				; $01AB74
	movem.l	(a7)+,d4/d5/d6/d7/a5/a6
; $01AB78
	rts

loc_01AB7A:				; $01AB7A
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d6,-(a7)
; $01AB7E
	move.w	$10(a0),d1
; $01AB82
	move.w	$12(a0),d2
; $01AB86
	move.w	$14(a0),d3
; $01AB8A
	moveq	#0,d5
; $01AB8C
	lea	($FF6A3C).l,a1
; $01AB92
	moveq	#9,d0
; $01AB94
	tst.w	$A(a0)
; $01AB98
	bne.w	loc_01ABA2
; $01AB9C
	lea	($FF6D34).l,a1

loc_01ABA2:				; $01ABA2
	move.w	$0(a1),d7
; $01ABA6
	beq.w	loc_01ABF2
; $01ABAA
	cmp.w	$48(a1),d7
; $01ABAE
	ble.w	loc_01ABF2
; $01ABB2
	tst.w	d5
; $01ABB4
	beq.w	loc_01ABDC
; $01ABB8
	cmp.w	$14(a1),d3
; $01ABBC
	beq.w	loc_01ABD2
; $01ABC0
	move.w	$14(a0),d7
; $01ABC4
	cmp.w	d7,d3
; $01ABC6
	beq.w	loc_01ABF2
; $01ABCA
	cmp.w	$14(a1),d7
; $01ABCE
	beq.w	loc_01ABDC

loc_01ABD2:				; $01ABD2
	bsr.w	loc_01ACB6
; $01ABD6
	cmp.w	d6,d7
; $01ABD8
	bgt.w	loc_01ABF2

loc_01ABDC:				; $01ABDC
	move.l	a1,d4
; $01ABDE
	move.w	$10(a1),d1
; $01ABE2
	move.w	$12(a1),d2
; $01ABE6
	move.w	$14(a1),d3
; $01ABEA
	moveq	#1,d5
; $01ABEC
	bsr.w	loc_01ACB6
; $01ABF0
	move.w	d7,d6

loc_01ABF2:				; $01ABF2
	adda.w	#$004C,a1
; $01ABF6
	dbf	d0,loc_01ABA2
; $01ABFA
	tst.w	d5
; $01ABFC
	beq.w	loc_01AC0E
; $01AC00
	move.l	d4,$2A(a0)
; $01AC04
	andi.b	#$DF,#$FB
; $01AC0A
	andi.?	#?,?ea(7,7)
; $01AC0C
	rts

loc_01AC0E:				; $01AC0E
	clr.l	$2A(a0)
; $01AC12
	ori	#$DF,ccr
; $01AC18
	andi.?	#?,?ea(7,7)
; $01AC1A
	rts

loc_01AC1C:				; $01AC1C
	movem.l	a7,-(a7)
; $01AC20
	move.w	$10(a0),d1
; $01AC24
	move.w	$12(a0),d2
; $01AC28
	move.w	$14(a0),d3
; $01AC2C
	moveq	#0,d5
; $01AC2E
	lea	($FF6A3C).l,a1
; $01AC34
	moveq	#9,d0
; $01AC36
	tst.w	$A(a0)
; $01AC3A
	bne.w	loc_01AC44
; $01AC3E
	lea	($FF6D34).l,a1

loc_01AC44:				; $01AC44
	tst.w	$0(a1)
; $01AC48
	beq.w	loc_01AC8C
; $01AC4C
	tst.w	d5
; $01AC4E
	beq.w	loc_01AC76
; $01AC52
	cmp.w	$14(a1),d3
; $01AC56
	beq.w	loc_01AC6C
; $01AC5A
	move.w	$14(a0),d7
; $01AC5E
	cmp.w	d7,d3
; $01AC60
	beq.w	loc_01AC8C
; $01AC64
	cmp.w	$14(a1),d7
; $01AC68
	beq.w	loc_01AC76

loc_01AC6C:				; $01AC6C
	bsr.w	loc_01ACB6
; $01AC70
	cmp.w	d6,d7
; $01AC72
	bgt.w	loc_01AC8C

loc_01AC76:				; $01AC76
	move.l	a1,d4
; $01AC78
	move.w	$10(a1),d1
; $01AC7C
	move.w	$12(a1),d2
; $01AC80
	move.w	$14(a1),d3
; $01AC84
	moveq	#1,d5
; $01AC86
	bsr.w	loc_01ACB6
; $01AC8A
	move.w	d7,d6

loc_01AC8C:				; $01AC8C
	adda.w	#$004C,a1
; $01AC90
	dbf	d0,loc_01AC44
; $01AC94
	tst.w	d5
; $01AC96
	beq.w	loc_01ACA8
; $01AC9A
	move.l	d4,$2A(a0)
; $01AC9E
	andi.b	#$DF,#$FB
; $01ACA4
	ori.b	#$75,d1

loc_01ACA8:				; $01ACA8
	clr.l	$2A(a0)
; $01ACAC
	ori	#$DF,ccr
; $01ACB2
	ori.b	#$75,d1

loc_01ACB6:				; $01ACB6
	movem.l	a1,-(a7)
; $01ACBA
	move.w	$10(a1),d7
; $01ACBE
	sub.w	$10(a0),d7
; $01ACC2
	bge.w	loc_01ACC8
; $01ACC6
	neg.w	d7

loc_01ACC8:				; $01ACC8
	move.w	$12(a1),d6
; $01ACCC
	sub.w	$12(a0),d6
; $01ACD0
	bge.w	loc_01ACD6
; $01ACD4
	neg.w	d6

loc_01ACD6:				; $01ACD6
	add.w	d6,d7
; $01ACD8
	move.w	$14(a1),d6
; $01ACDC
	sub.w	$14(a0),d6
; $01ACE0
	bge.w	loc_01ACE6
; $01ACE4
	neg.w	d6

loc_01ACE6:				; $01ACE6
	add.w	d6,d7
; $01ACE8
	movem.l	(a7)+,a1
; $01ACEC
	rts

loc_01ACEE:				; $01ACEE
	movem.l	a7/a6/a5/d7/d6/d5/d4/d3,-(a7)
; $01ACF2
	tst.w	$0(a1)
; $01ACF6
	beq.w	loc_01AE5A
; $01ACFA
	move.w	$46(a0),d0
; $01ACFE
	bne.w	loc_01AD0A
; $01AD02
	clr.w	$26(a0)
; $01AD06
	clr.w	$28(a0)

loc_01AD0A:				; $01AD0A
	move.w	$46(a1),d1
; $01AD0E
	bne.w	loc_01AD1A
; $01AD12
	clr.w	$26(a1)
; $01AD16
	clr.w	$28(a1)

loc_01AD1A:				; $01AD1A
	add.w	d0,d1
; $01AD1C
	bne.w	loc_01ADAC
; $01AD20
	move.w	$44(a0),d0
; $01AD24
	bne.w	loc_01AD60
; $01AD28
	cmpi.w	#$0034,$5(a0)
; $01AD2E
	beq.w	loc_01AD38
; $01AD32
	move.w	$34(a0),$4A(a0)

loc_01AD38:				; $01AD38
	move.w	#$0005,d0
; $01AD3C
	bsr.w	loc_01A360
; $01AD40
	exg	a0,a1
; $01AD42
	cmpi.w	#$0034,$5(a0)
; $01AD48
	beq.w	loc_01AD52
; $01AD4C
	move.w	$34(a0),$4A(a0)

loc_01AD52:				; $01AD52
	move.w	#$0005,d0
; $01AD56
	bsr.w	loc_01A360
; $01AD5A
	exg	a0,a1
; $01AD5C
	move.l	a0,$2A(a1)

loc_01AD60:				; $01AD60
	cmpi.w	#$0014,d0
; $01AD64
	bgt.w	loc_01ADAC
; $01AD68
	moveq	#2,d2
; $01AD6A
	jsr	($0085A2).l
; $01AD70
	addq.w	#1,d2
; $01AD72
	btst	#3,d0
; $01AD76
	beq.w	loc_01AD7C
; $01AD7A
	neg.w	d2

loc_01AD7C:				; $01AD7C
	move.w	$12(a0),d1
; $01AD80
	cmp.w	$12(a1),d1
; $01AD84
	beq.w	loc_01AD8A
; $01AD88
	lsr.w	#1,d2

loc_01AD8A:				; $01AD8A
	move.w	d2,d1
; $01AD8C
	bsr.w	loc_01A90A
; $01AD90
	bsr.w	loc_01A95A
; $01AD94
	exg	a0,a1
; $01AD96
	bsr.w	loc_01A90A
; $01AD9A
	bsr.w	loc_01A95A
; $01AD9E
	exg	a0,a1
; $01ADA0
	addq.w	#1,$44(a0)
; $01ADA4
	addq.w	#1,$44(a1)
; $01ADA8
	bra.w	loc_01AE5A

loc_01ADAC:				; $01ADAC
	cmpi.w	#$0034,$5(a0)
; $01ADB2
	bne.w	loc_01ADBE
; $01ADB6
	move.w	$4A(a0),d0
; $01ADBA
	bsr.w	loc_01A360

loc_01ADBE:				; $01ADBE
	exg	a0,a1
; $01ADC0
	cmpi.w	#$0034,$5(a0)
; $01ADC6
	bne.w	loc_01ADD2
; $01ADCA
	move.w	$4A(a0),d0
; $01ADCE
	bsr.w	loc_01A360

loc_01ADD2:				; $01ADD2
	exg	a0,a1
; $01ADD4
	clr.w	$44(a0)
; $01ADD8
	clr.w	$44(a1)
; $01ADDC
	moveq	#1,d2
; $01ADDE
	lea	($FFFFA662).w,a2
; $01ADE2
	lea	($FFFFA694).w,a3
; $01ADE6
	tst.w	$A(a0)
; $01ADEA
	beq.w	loc_01ADF0

loc_01ADEE:				; $01ADEE
	exg	a2,a3

loc_01ADF0:				; $01ADF0
	tst.w	$4(a0)
; $01ADF4
	beq.w	loc_01AE54
; $01ADF8
	move.w	$6(a0),d1
; $01ADFC
	lea	($01C5C0).l,a4
; $01AE02
	tst.b	($0,a4,d1.w)
; $01AE06
	beq.w	loc_01AE54
; $01AE0A
	bsr.w	loc_01AE60
; $01AE0E
	add.w	d1,$30(a3)
; $01AE12
	subq.w	#1,$4(a0)
; $01AE16
	tst.w	d1
; $01AE18
	bne.w	loc_01AE26
; $01AE1C
	jsr	($018AEC).l
; $01AE22
	bra.w	loc_01AE54

loc_01AE26:				; $01AE26
	exg	a0,a1
; $01AE28
	jsr	($018AB2).l
; $01AE2E
	exg	a0,a1
; $01AE30
	subq.w	#1,$0(a1)
; $01AE34
	beq.w	loc_01AE4A
; $01AE38
	tst.w	$46(a1)
; $01AE3C
	bne.w	loc_01AE54
; $01AE40
	exg	a0,a1
; $01AE42
	bsr.w	loc_01A2E2
; $01AE46
	bra.w	loc_01AE56

loc_01AE4A:				; $01AE4A
	exg	a0,a1
; $01AE4C
	bsr.w	loc_01A2F0
; $01AE50
	bra.w	loc_01AE56

loc_01AE54:				; $01AE54
	exg	a0,a1

loc_01AE56:				; $01AE56
	dbf	d2,loc_01ADEE

loc_01AE5A:				; $01AE5A
	movem.l	(a7)+,d3/d4/d5/d6/d7/a5/a6/a7
; $01AE5E
	rts

loc_01AE60:				; $01AE60
	movem.l	a7/a5,-(a7)
; $01AE64
	moveq	#0,d1
; $01AE66
	moveq	#36,d2
; $01AE68
	jsr	($0085A2).l
; $01AE6E
	tst.w	d2
; $01AE70
	beq.w	loc_01AE9C
; $01AE74
	moveq	#1,d0

loc_01AE76:				; $01AE76
	move.w	$14(a2),d2
; $01AE7A
	jsr	($0085A2).l
; $01AE80
	cmp.w	$10(a2),d2
; $01AE84
	bgt.w	loc_01AEAC
; $01AE88
	tst.w	d0
; $01AE8A
	beq.w	loc_01AE9C
; $01AE8E
	moveq	#0,d0
; $01AE90
	tst.w	$2E(a2)
; $01AE94
	beq.w	loc_01AE76
; $01AE98
	subq.w	#1,$2E(a2)

loc_01AE9C:				; $01AE9C
	moveq	#36,d2
; $01AE9E
	jsr	($0085A2).l
; $01AEA4
	tst.w	d2
; $01AEA6
	beq.w	loc_01AEAC
; $01AEAA
	moveq	#1,d1

loc_01AEAC:				; $01AEAC
	movem.l	(a7)+,a5/a7
; $01AEB0
	rts

loc_01AEB2:				; $01AEB2
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5,-(a7)
; $01AEB6
	tst.w	($FFFFAE86).l
; $01AEBC
	bne.w	loc_01B038
; $01AEC0
	moveq	#-1,d4
; $01AEC2
	moveq	#-1,d5
; $01AEC4
	moveq	#0,d6
; $01AEC6
	moveq	#0,d7
; $01AEC8
	lea	($05EDDC).l,a2
; $01AECE
	lea	($FFFFA662).w,a0
; $01AED2
	move.w	$0(a0),d0
; $01AED6
	mulu.w	#$001C,d0
; $01AEDA
	tst.b	($8,a2,d0.w)
; $01AEDE
	bne.w	loc_01AEE4
; $01AEE2
	moveq	#0,d4

loc_01AEE4:				; $01AEE4
	lea	($FFFFA694).w,a0
; $01AEE8
	move.w	$0(a0),d0
; $01AEEC
	mulu.w	#$001C,d0
; $01AEF0
	tst.b	($8,a2,d0.w)
; $01AEF4
	bne.w	loc_01AEFA
; $01AEF8
	moveq	#0,d5

loc_01AEFA:				; $01AEFA
	lea	($086118).l,a1
; $01AF00
	movea.l	($FFFFAE68).l,a0
; $01AF06
	move.w	$C(a0),d6
; $01AF0A
	movea.l	($FFFFAE6C).l,a0
; $01AF10
	move.w	$C(a0),d7
; $01AF14
	lea	($086118).l,a1
; $01AF1A
	adda.w	($FFFFAE78).l,a1
; $01AF20
	move.w	d6,d1
; $01AF22
	mulu.w	#$0014,d1
; $01AF26
	moveq	#0,d2
; $01AF28
	move.b	($0,a1,d1.w),d2
; $01AF2C
	move.w	d7,d1
; $01AF2E
	mulu.w	#$0014,d1
; $01AF32
	moveq	#0,d3
; $01AF34
	move.b	($0,a1,d1.w),d3
; $01AF38
	lea	($FFFFA694).w,a0
; $01AF3C
	tst.w	$E(a0)
; $01AF40
	beq.w	loc_01AFE0
; $01AF44
	tst.w	d2
; $01AF46
	bne.w	loc_01AF88
; $01AF4A
	clr.w	($FFFFAE80).l
; $01AF50
	lea	($FFFFA662).w,a0
; $01AF54
	tst.w	$A(a0)
; $01AF58
	bne.w	loc_01AF74
; $01AF5C
	movea.l	($FFFFA628).w,a1
; $01AF60
	move.b	$9(a1),d0
; $01AF64
	cmpi.b	#$0F,d0
; $01AF68
	beq.w	loc_01AF88
; $01AF6C
	cmpi.b	#$10,d0
; $01AF70
	beq.w	loc_01AF88

loc_01AF74:				; $01AF74
	cmpi.w	#$0002,d6
; $01AF78
	beq.w	loc_01AF90
; $01AF7C
	tst.w	d5
; $01AF7E
	bne.w	loc_01AF88
; $01AF82
	tst.w	d3
; $01AF84
	beq.w	loc_01AF90

loc_01AF88:				; $01AF88
	move.w	#$0002,($FFFFAE80).l

loc_01AF90:				; $01AF90
	tst.w	d3
; $01AF92
	bne.w	loc_01AFD4
; $01AF96
	clr.w	($FFFFAE82).l
; $01AF9C
	lea	($FFFFA694).w,a0
; $01AFA0
	tst.w	$A(a0)
; $01AFA4
	bne.w	loc_01AFC0
; $01AFA8
	movea.l	($FFFFA630).w,a1
; $01AFAC
	move.b	$9(a1),d0
; $01AFB0
	cmpi.b	#$0F,d0
; $01AFB4
	beq.w	loc_01AFD4
; $01AFB8
	cmpi.b	#$10,d0
; $01AFBC
	beq.w	loc_01AFD4

loc_01AFC0:				; $01AFC0
	cmpi.w	#$0002,d7
; $01AFC4
	beq.w	loc_01B042
; $01AFC8
	tst.w	d4
; $01AFCA
	bne.w	loc_01AFD4
; $01AFCE
	tst.w	d2
; $01AFD0
	beq.w	loc_01B042

loc_01AFD4:				; $01AFD4
	move.w	#$0002,($FFFFAE82).l
; $01AFDC
	bra.w	loc_01B042

loc_01AFE0:				; $01AFE0
	clr.l	($FFFFAE80).l
; $01AFE6
	tst.w	d2
; $01AFE8
	bne.w	loc_01B02C
; $01AFEC
	lea	($FFFFA662).w,a0
; $01AFF0
	tst.w	$A(a0)
; $01AFF4
	bne.w	loc_01B010
; $01AFF8
	movea.l	($FFFFA628).w,a1
; $01AFFC
	move.b	$9(a1),d0
; $01B000
	cmpi.b	#$0F,d0
; $01B004
	beq.w	loc_01B02C
; $01B008
	cmpi.b	#$10,d0
; $01B00C
	beq.w	loc_01B02C

loc_01B010:				; $01B010
	cmpi.w	#$0002,d6
; $01B014
	beq.w	loc_01B042
; $01B018
	tst.w	d5
; $01B01A
	bne.w	loc_01B02C
; $01B01E
	move.w	d2,d0
; $01B020
	add.w	d0,d0
; $01B022
	move.w	d0,($FFFFAE80).l
; $01B028
	bra.w	loc_01B042

loc_01B02C:				; $01B02C
	move.w	#$0002,($FFFFAE80).l
; $01B034
	bra.w	loc_01B042

loc_01B038:				; $01B038
	move.l	#$00020002,($FFFFAE80).l

loc_01B042:				; $01B042
	movem.l	(a7)+,d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $01B046
	rts

loc_01B048:				; $01B048
	movem.l	a7/d7,-(a7)
; $01B04C
	lea	($FF702C).l,a0
; $01B052
	moveq	#39,d0

loc_01B054:				; $01B054
	clr.w	(a0)
; $01B056
	adda.w	#$000C,a0
; $01B05A
	dbf	d0,loc_01B054
; $01B05E
	movem.l	(a7)+,d7/a7
; $01B062
	rts

loc_01B064:				; $01B064
	movem.l	a7,-(a7)
; $01B068
	lea	($FF702C).l,a2
; $01B06E
	moveq	#39,d0

loc_01B070:				; $01B070
	tst.w	(a2)
; $01B072
	beq.w	loc_01B088
; $01B076
	adda.w	#$000C,a2
; $01B07A
	dbf	d0,loc_01B070
; $01B07E
	andi.b	#$DF,#$FB
; $01B084
	ori.b	#$75,d1

loc_01B088:				; $01B088
	ori	#$DF,ccr
; $01B08E
	ori.b	#$75,d1

loc_01B092:				; $01B092
	moveq	#0,d5
; $01B094
	lea	($FF6A3C).l,a0
; $01B09A
	moveq	#19,d0

loc_01B09C:				; $01B09C
	tst.w	$0(a0)
; $01B0A0
	beq.w	loc_01B0A8
; $01B0A4
	bsr.w	loc_01B0F8

loc_01B0A8:				; $01B0A8
	adda.w	#$004C,a0
; $01B0AC
	dbf	d0,loc_01B09C
; $01B0B0
	tst.w	d5
; $01B0B2
	bne.w	loc_01B0BE
; $01B0B6
	move.w	#$0001,($FFFFAE84).l

loc_01B0BE:				; $01B0BE
	rts

loc_01B0C0:				; $01B0C0
	movem.l	a7,-(a7)
; $01B0C4
	move.w	$10(a0),d0
; $01B0C8
	cmp.w	$16(a0),d0
; $01B0CC
	bne.w	loc_01B0EA
; $01B0D0
	move.w	$14(a0),d0
; $01B0D4
	cmp.w	$1A(a0),d0
; $01B0D8
	bne.w	loc_01B0EA
; $01B0DC
	move.w	#$0000,d0
; $01B0E0
	bsr.w	loc_01A360
; $01B0E4
	movem.l	(a7)+,a7
; $01B0E8
	rts

loc_01B0EA:				; $01B0EA
	move.w	#$0001,d0
; $01B0EE
	bsr.w	loc_01A360
; $01B0F2
	movem.l	(a7)+,a7
; $01B0F6
	rts

loc_01B0F8:				; $01B0F8
	movem.l	a6/a5/a4/a3/d6,-(a7)
; $01B0FC
	lea	($FF67BC).l,a1
; $01B102
	move.w	$26(a0),d1
; $01B106
	beq.w	loc_01B22C
; $01B10A
	subq.w	#1,d1

loc_01B10C:				; $01B10C
	move.w	$10(a0),d2
; $01B110
	sub.w	$16(a0),d2
; $01B114
	beq.w	loc_01B176
; $01B118
	moveq	#1,d5
; $01B11A
	tst.w	$2E(a0)
; $01B11E
	bne.w	loc_01B15A
; $01B122
	move.w	$10(a0),d3
; $01B126
	bpl.w	loc_01B12C
; $01B12A
	moveq	#0,d3

loc_01B12C:				; $01B12C
	cmpi.w	#$0140,d3
; $01B130
	blt.w	loc_01B138
; $01B134
	move.w	#$013F,d3

loc_01B138:				; $01B138
	add.w	d3,d3
; $01B13A
	move.w	$12(a0),d4
; $01B13E
	sub.w	($0,a1,d3.w),d4
; $01B142
	beq.w	loc_01B15A
; $01B146
	bpl.w	loc_01B152
; $01B14A
	addq.w	#1,$12(a0)
; $01B14E
	bra.w	loc_01B176

loc_01B152:				; $01B152
	subq.w	#1,$12(a0)
; $01B156
	bra.w	loc_01B176

loc_01B15A:				; $01B15A
	tst.w	d2
; $01B15C
	bpl.w	loc_01B16C
; $01B160
	addq.w	#1,$10(a0)
; $01B164
	clr.w	$24(a0)
; $01B168
	bra.w	loc_01B176

loc_01B16C:				; $01B16C
	subq.w	#1,$10(a0)
; $01B170
	move.w	#$0800,$24(a0)

loc_01B176:				; $01B176
	move.w	$14(a0),d2
; $01B17A
	sub.w	$1A(a0),d2
; $01B17E
	beq.w	loc_01B1C6
; $01B182
	moveq	#1,d5
; $01B184
	tst.w	d2
; $01B186
	bpl.w	loc_01B1AC
; $01B18A
	move.w	$10(a0),d4
; $01B18E
	sub.w	$16(a0),d4
; $01B192
	bpl.w	loc_01B198
; $01B196
	neg.w	d4

loc_01B198:				; $01B198
	move.w	d2,d3
; $01B19A
	neg.w	d3
; $01B19C
	ror.w	#3,d4
; $01B19E
	cmp.w	d3,d4
; $01B1A0
	bgt.w	loc_01B1C6
; $01B1A4
	addq.w	#1,$14(a0)
; $01B1A8
	bra.w	loc_01B1C6

loc_01B1AC:				; $01B1AC
	move.w	$10(a0),d4
; $01B1B0
	sub.w	$16(a0),d4
; $01B1B4
	bpl.w	loc_01B1BA
; $01B1B8
	neg.w	d4

loc_01B1BA:				; $01B1BA
	ror.w	#3,d4
; $01B1BC
	cmp.w	d2,d4
; $01B1BE
	bgt.w	loc_01B1C6
; $01B1C2
	subq.w	#1,$14(a0)

loc_01B1C6:				; $01B1C6
	dbf	d1,loc_01B10C
; $01B1CA
	move.w	$26(a0),d1
; $01B1CE
	tst.w	$2E(a0)
; $01B1D2
	beq.w	loc_01B22C
; $01B1D6
	move.w	$12(a0),d2
; $01B1DA
	sub.w	$18(a0),d2
; $01B1DE
	move.w	d2,d4
; $01B1E0
	beq.w	loc_01B22C
; $01B1E4
	bmi.w	loc_01B1EE
; $01B1E8
	neg.w	d1
; $01B1EA
	bra.w	loc_01B1F0

loc_01B1EE:				; $01B1EE
	neg.w	d2

loc_01B1F0:				; $01B1F0
	neg.w	d4
; $01B1F2
	moveq	#1,d5
; $01B1F4
	move.w	$10(a0),d3
; $01B1F8
	sub.w	$16(a0),d3
; $01B1FC
	bpl.w	loc_01B202
; $01B200
	neg.w	d3

loc_01B202:				; $01B202
	cmp.w	d2,d3
; $01B204
	blt.w	loc_01B20A
; $01B208
	lsr.w	#1,d1

loc_01B20A:				; $01B20A
	cmp.w	d1,d2
; $01B20C
	bgt.w	loc_01B212
; $01B210
	move.w	d4,d1

loc_01B212:				; $01B212
	add.w	d1,$12(a0)
; $01B216
	move.w	$10(a0),d1
; $01B21A
	add.w	d1,d1
; $01B21C
	move.w	($0,a1,d1.w),d1
; $01B220
	cmp.w	$12(a0),d1
; $01B224
	bge.w	loc_01B22C
; $01B228
	move.w	d1,$12(a0)

loc_01B22C:				; $01B22C
	move.w	$10(a0),d1
; $01B230
	cmp.w	$16(a0),d1
; $01B234
	bne.w	loc_01B256
; $01B238
	move.w	$12(a0),d1
; $01B23C
	cmp.w	$18(a0),d1
; $01B240
	bne.w	loc_01B256
; $01B244
	move.w	$14(a0),d1
; $01B248
	cmp.w	$1A(a0),d1
; $01B24C
	bne.w	loc_01B256
; $01B250
	move.w	$22(a0),$24(a0)

loc_01B256:				; $01B256
	movem.l	(a7)+,d6/a3/a4/a5/a6
; $01B25A
	rts

loc_01B25C:				; $01B25C
	movem.l	a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $01B260
	lea	($FFFFA662).w,a0
; $01B264
	lea	($FF6A3C).l,a1
; $01B26A
	moveq	#0,d7
; $01B26C
	moveq	#0,d5
; $01B26E
	lea	($FFFFAE7C).l,a4
; $01B274
	movea.l	($FFFFAE68).l,a5
; $01B27A
	tst.w	d0
; $01B27C
	beq.w	loc_01B2A6
; $01B280
	lea	($FFFFA694).w,a0
; $01B284
	lea	($FF6D34).l,a1
; $01B28A
	move.w	#$0140,d7
; $01B28E
	move.w	#$0800,d5
; $01B292
	lea	($FFFFAE7E).l,a4
; $01B298
	movea.l	($FFFFAE6C).l,a5
; $01B29E
	tst.w	(a4)
; $01B2A0
	bne.w	loc_01B2A6
; $01B2A4
	addq.w	#8,d7

loc_01B2A6:				; $01B2A6
	move.w	$0(a0),d1
; $01B2AA
	mulu.w	#$001C,d1
; $01B2AE
	tst.w	$A(a0)
; $01B2B2
	beq.w	loc_01B2EA
; $01B2B6
	lea	($05EDDC).l,a2
; $01B2BC
	moveq	#0,d2
; $01B2BE
	move.b	($14,a2,d1.w),d2
; $01B2C2
	move.w	$6(a0),d3

loc_01B2C6:				; $01B2C6
	movea.l	a1,a2
; $01B2C8
	move.w	d2,d4
; $01B2CA
	subq.w	#1,d4

loc_01B2CC:				; $01B2CC
	addq.w	#1,$0(a2)
; $01B2D0
	move.w	$E(a0),d6
; $01B2D4
	add.w	d6,$4(a2)
; $01B2D8
	adda.w	#$004C,a2
; $01B2DC
	subq.w	#1,d3
; $01B2DE
	beq.w	loc_01B2F6
; $01B2E2
	dbf	d4,loc_01B2CC
; $01B2E6
	bra.w	loc_01B2C6

loc_01B2EA:				; $01B2EA
	move.w	$6(a0),$0(a1)
; $01B2F0
	move.w	$12(a0),$4(a1)

loc_01B2F6:				; $01B2F6
	moveq	#0,d6
; $01B2F8
	lea	($05EDDC).l,a2
; $01B2FE
	tst.b	($8,a2,d1.w)
; $01B302
	beq.w	loc_01B30A
; $01B306
	move.w	#$0001,d6

loc_01B30A:				; $01B30A
	lea	($082E12).l,a2
; $01B310
	lea	($FF67BC).l,a3
; $01B316
	moveq	#9,d1

loc_01B318:				; $01B318
	tst.w	$0(a1)
; $01B31C
	beq.w	loc_01B3FA
; $01B320
	move.w	#$0000,$C(a1)
; $01B326
	move.w	d5,$22(a1)
; $01B32A
	move.w	d5,$24(a1)
; $01B32E
	move.w	(a2)+,d2
; $01B330
	tst.w	(a4)
; $01B332
	beq.w	loc_01B340
; $01B336
	tst.w	d7
; $01B338
	bne.w	loc_01B340
; $01B33C
	subi.w	#$0010,d2

loc_01B340:				; $01B340
	tst.w	d7
; $01B342
	bne.w	loc_01B352
; $01B346
	move.w	d2,$10(a1)
; $01B34A
	move.w	d2,$1C(a1)
; $01B34E
	bra.w	loc_01B360

loc_01B352:				; $01B352
	move.w	d7,d4
; $01B354
	sub.w	d2,d4
; $01B356
	move.w	d4,d2
; $01B358
	move.w	d2,$10(a1)
; $01B35C
	move.w	d2,$1C(a1)

loc_01B360:				; $01B360
	tst.w	d0
; $01B362
	bne.w	loc_01B380
; $01B366
	tst.w	($FFFFAE86).l
; $01B36C
	bne.w	loc_01B380
; $01B370
	cmpi.w	#$A4A0,($000001).w
; $01B376
	bne.w	loc_01B380
; $01B37A
	subi.w	#$0010,$78(a1)

loc_01B380:				; $01B380
	move.w	(a2)+,d3
; $01B382
	move.w	d3,$14(a1)
; $01B386
	move.w	d3,$20(a1)
; $01B38A
	add.w	d2,d2
; $01B38C
	move.w	($0,a3,d2.w),d3
; $01B390
	tst.w	d6
; $01B392
	bne.w	loc_01B3A2
; $01B396
	move.w	d3,$12(a1)
; $01B39A
	move.w	d3,$1E(a1)
; $01B39E
	bra.w	loc_01B3B4

loc_01B3A2:				; $01B3A2
	cmpi.w	#$0040,d3
; $01B3A6
	ble.w	loc_01B3AC
; $01B3AA
	moveq	#64,d3

loc_01B3AC:				; $01B3AC
	move.w	d3,$12(a1)
; $01B3B0
	move.w	d3,$1E(a1)

loc_01B3B4:				; $01B3B4
	move.w	d6,$2E(a1)
; $01B3B8
	move.w	#$0008,$26(a1)
; $01B3BE
	move.w	d0,$A(a1)
; $01B3C2
	move.l	(a5),$30(a1)
; $01B3C6
	move.w	$4(a5),$3C(a1)
; $01B3CC
	move.w	$6(a5),$3E(a1)
; $01B3D2
	move.w	d0,d2
; $01B3D4
	add.w	d2,d2
; $01B3D6
	lea	($FFFFAE7C).l,a6
; $01B3DC
	move.w	($0,a6,d2.w),$40(a1)
; $01B3E2
	lea	($FFFFAE80).l,a6
; $01B3E8
	move.w	($0,a6,d2.w),d2
; $01B3EC
	move.w	($8,a5,d2.w),$6(a1)
; $01B3F2
	adda.w	#$004C,a1
; $01B3F6
	dbf	d1,loc_01B318

loc_01B3FA:				; $01B3FA
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6
; $01B3FE
	rts

loc_01B400:				; $01B400
	movem.l	a6/a5/d7/d6/d5/d3,-(a7)
; $01B404
	cmpi.w	#$A4A0,($000001).w
; $01B40A
	bne.w	loc_01B4BE
; $01B40E
	bsr.w	loc_01B4DC
; $01B412
	bsr.w	loc_01B5F4
; $01B416
	moveq	#0,d0
; $01B418
	move.b	$5F(a1),d0
; $01B41C
	subq.w	#1,d0
; $01B41E
	move.w	d0,d2
; $01B420
	movem.l	d5,-(a7)
; $01B424
	lea	($0977A6).l,a0
; $01B42A
	move.b	($0,a0,d0.w),d0
; $01B42E
	subq.w	#1,d0
; $01B430
	jsr	($01C61C).l
; $01B436
	movea.w	#$3880,a1
; $01B43A
	tst.w	d1
; $01B43C
	bne.w	loc_01B444
; $01B440
	movea.w	#$3400,a1

loc_01B444:				; $01B444
	jsr	($0099B2).l
; $01B44A
	lea	($0976A6).l,a0
; $01B450
	moveq	#0,d0
; $01B452
	move.b	($0,a0,d2.w),d0
; $01B456
	lsl.w	#5,d0
; $01B458
	lea	($0978A6).l,a1
; $01B45E
	adda.w	d0,a1
; $01B460
	lea	($FFFF9542).w,a2
; $01B464
	lea	($0860E8).l,a0
; $01B46A
	move.w	#$DA3E,d2
; $01B46E
	movea.w	#$7000,a4
; $01B472
	tst.w	d1
; $01B474
	bne.w	loc_01B48A
; $01B478
	lea	($FFFF9522).w,a2
; $01B47C
	lea	($0860B8).l,a0
; $01B482
	move.w	#$DA06,d2
; $01B486
	movea.w	#$6000,a4

loc_01B48A:				; $01B48A
	jsr	($0091B6).l
; $01B490
	movem.l	(a7),d5
; $01B494
	move.w	#$8000,d1
; $01B498
	tst.w	$C(a2)
; $01B49C
	bne.w	loc_01B4A4
; $01B4A0
	move.w	#$0000,d1

loc_01B4A4:				; $01B4A4
	movea.l	($FFFF81C4).w,a1
; $01B4A8
	movea.l	a0,a2
; $01B4AA
	jsr	($0097DC).l
; $01B4B0
	move.l	a1,($FFFF81C4).w
; $01B4B4
	jsr	($008A6C).l
; $01B4BA
	movem.l	(a7)+,d5

loc_01B4BE:				; $01B4BE
	jsr	($01B74C).l
; $01B4C4
	cmpi.w	#$A4A0,($000001).w
; $01B4CA
	bne.w	loc_01B4D6
; $01B4CE
	movea.l	a4,a1
; $01B4D0
	jsr	($0099B2).l

loc_01B4D6:				; $01B4D6
	movem.l	(a7)+,d3/d5/d6/d7/a5/a6
; $01B4DA
	rts

loc_01B4DC:				; $01B4DC
	movem.l	a7/a6/a5/a4/d7/d6/d5,-(a7)
; $01B4E0
	move.w	d1,-(a7)
; $01B4E2
	move.l	a1,-(a7)
; $01B4E4
	movea.l	a1,a0
; $01B4E6
	movea.l	($FFFF81C4).w,a1
; $01B4EA
	move.w	#$FFF8,(a1)+
; $01B4EE
	tst.w	d1
; $01B4F0
	bne.w	loc_01B51A
; $01B4F4
	moveq	#0,d1
; $01B4F6
	move.b	$0(a0),d1
; $01B4FA
	lea	($05EDDC).l,a0
; $01B500
	mulu.w	#$001C,d1
; $01B504
	moveq	#0,d0
; $01B506
	move.b	($14,a0,d1.w),d0
; $01B50A
	moveq	#7,d1
; $01B50C
	sub.w	d0,d1
; $01B50E
	add.w	d1,d1
; $01B510
	addi.w	#$D894,d1
; $01B514
	move.w	d1,(a1)+
; $01B516
	bra.w	loc_01B51E

loc_01B51A:				; $01B51A
	move.w	#$D8AA,(a1)+

loc_01B51E:				; $01B51E
	movea.l	(a7)+,a0
; $01B520
	moveq	#0,d1
; $01B522
	move.b	$0(a0),d1
; $01B526
	move.b	$20(a0),d3
; $01B52A
	lea	($05EDDC).l,a0
; $01B530
	mulu.w	#$001C,d1
; $01B534
	moveq	#0,d0
; $01B536
	move.b	($14,a0,d1.w),d0
; $01B53A
	subq.w	#1,d0
; $01B53C
	move.w	d0,d1
; $01B53E
	addq.w	#3,d1
; $01B540
	move.w	d1,(a1)+
; $01B542
	move.w	$4(a2),d2
; $01B546
	move.w	#$80E0,(a1)+
; $01B54A
	move.w	#$80E2,d1
; $01B54E
	btst	#0,d3
; $01B552
	bne.w	loc_01B55A
; $01B556
	addi.w	#$0009,d1

loc_01B55A:				; $01B55A
	move.w	d2,d3
; $01B55C
	cmpi.w	#$0008,d2
; $01B560
	bmi.w	loc_01B566
; $01B564
	moveq	#8,d3

loc_01B566:				; $01B566
	sub.w	d3,d2
; $01B568
	add.w	d1,d3
; $01B56A
	move.w	d3,(a1)+
; $01B56C
	dbf	d0,loc_01B55A
; $01B570
	move.w	#$80E1,(a1)+
; $01B574
	move.l	a1,($FFFF81C4).w
; $01B578
	lea	($FFFFA714).w,a2
; $01B57C
	moveq	#17,d0

loc_01B57E:				; $01B57E
	move.w	#$8020,(a2)+
; $01B582
	dbf	d0,loc_01B57E
; $01B586
	lea	($05E6D6).l,a1
; $01B58C
	lea	($FFFFA714).w,a2
; $01B590
	move.b	$0(a3),d1
; $01B594
	move.w	#$0010,d0
; $01B598
	jsr	($01071C).l
; $01B59E
	lea	($FFFFA714).w,a2
; $01B5A2
	moveq	#17,d0

loc_01B5A4:				; $01B5A4
	ori.w	#$8000,(a2)+
; $01B5A8
	dbf	d0,loc_01B5A4
; $01B5AC
	move.w	(a7)+,d1
; $01B5AE
	move.w	#$D884,d2
; $01B5B2
	tst.w	d1
; $01B5B4
	beq.w	loc_01B5BC
; $01B5B8
	move.w	#$D8BC,d2

loc_01B5BC:				; $01B5BC
	movea.l	($FFFF81C4).w,a1
; $01B5C0
	move.w	#$FFF9,(a1)+
; $01B5C4
	move.w	d2,(a1)+
; $01B5C6
	move.l	#$FFFFA716,(a1)+
; $01B5CC
	move.w	#$0008,(a1)+
; $01B5D0
	move.w	#$FFF9,(a1)+
; $01B5D4
	addi.w	#$0080,d2
; $01B5D8
	move.w	d2,(a1)+
; $01B5DA
	move.l	#$FFFFA726,(a1)+
; $01B5E0
	move.w	#$0008,(a1)+
; $01B5E4
	move.l	a1,($FFFF81C4).w
; $01B5E8
	jsr	($008A6C).l
; $01B5EE
	movem.l	(a7)+,d5/d6/d7/a4/a5/a6/a7
; $01B5F2
	rts

loc_01B5F4:				; $01B5F4
	movem.l	a7/a6/a5/a4/a3/a2/d7/d6,-(a7)
; $01B5F8
	movea.l	($FFFF81C4).w,a1
; $01B5FC
	tst.w	d1
; $01B5FE
	bne.w	loc_01B63C
; $01B602
	move.w	#$FFF9,(a1)+
; $01B606
	move.w	#$DB96,(a1)+
; $01B60A
	move.l	#$FFFFA714,(a1)+
; $01B610
	move.w	#$0005,(a1)+
; $01B614
	move.w	#$FFF9,(a1)+
; $01B618
	move.w	#$DC16,(a1)+
; $01B61C
	move.l	#$FFFFA71E,(a1)+
; $01B622
	move.w	#$0005,(a1)+
; $01B626
	move.w	#$FFF9,(a1)+
; $01B62A
	move.w	#$DD16,(a1)+
; $01B62E
	move.l	#$FFFFA728,(a1)+
; $01B634
	move.w	#$0006,(a1)+
; $01B638
	bra.w	loc_01B672

loc_01B63C:				; $01B63C
	move.w	#$FFF9,(a1)+
; $01B640
	move.w	#$DBB0,(a1)+
; $01B644
	move.l	#$FFFFA714,(a1)+
; $01B64A
	move.w	#$0005,(a1)+
; $01B64E
	move.w	#$FFF9,(a1)+
; $01B652
	move.w	#$DC30,(a1)+
; $01B656
	move.l	#$FFFFA71E,(a1)+
; $01B65C
	move.w	#$0005,(a1)+
; $01B660
	move.w	#$FFF9,(a1)+
; $01B664
	move.w	#$DD30,(a1)+
; $01B668
	move.l	#$FFFFA728,(a1)+
; $01B66E
	move.w	#$0006,(a1)+

loc_01B672:				; $01B672
	move.l	a1,($FFFF81C4).w
; $01B676
	lea	($FFFFA714).w,a0
; $01B67A
	move.w	$16(a2),d1
; $01B67E
	moveq	#2,d2
; $01B680
	moveq	#0,d3
; $01B682
	moveq	#0,d4
; $01B684
	moveq	#0,d5
; $01B686
	jsr	($010780).l
; $01B68C
	adda.w	#$0004,a0
; $01B690
	move.w	$1A(a2),d1
; $01B694
	moveq	#3,d2
; $01B696
	moveq	#1,d3
; $01B698
	moveq	#0,d4
; $01B69A
	moveq	#0,d5
; $01B69C
	jsr	($010780).l
; $01B6A2
	adda.w	#$0006,a0
; $01B6A6
	move.w	$18(a2),d1
; $01B6AA
	moveq	#2,d2
; $01B6AC
	moveq	#0,d3
; $01B6AE
	moveq	#0,d4
; $01B6B0
	moveq	#0,d5
; $01B6B2
	jsr	($010780).l
; $01B6B8
	adda.w	#$0004,a0
; $01B6BC
	move.w	$1C(a2),d1
; $01B6C0
	moveq	#3,d2
; $01B6C2
	moveq	#1,d3
; $01B6C4
	moveq	#0,d4
; $01B6C6
	moveq	#0,d5
; $01B6C8
	jsr	($010780).l
; $01B6CE
	adda.w	#$0006,a0
; $01B6D2
	move.w	$26(a2),d1
; $01B6D6
	mulu.w	($FFFF9F2C).w,d1
; $01B6DA
	add.w	$24(a2),d1
; $01B6DE
	add.w	d1,d1
; $01B6E0
	lea	($FF3000).l,a1
; $01B6E6
	moveq	#0,d0
; $01B6E8
	move.b	($0,a1,d1.w),d0
; $01B6EC
	lea	($080B58).l,a1
; $01B6F2
	moveq	#0,d1
; $01B6F4
	move.b	($0,a1,d0.w),d1
; $01B6F8
	moveq	#2,d2
; $01B6FA
	moveq	#0,d3
; $01B6FC
	moveq	#0,d4
; $01B6FE
	moveq	#0,d5
; $01B700
	jsr	($010780).l
; $01B706
	adda.w	#$0004,a0
; $01B70A
	lea	($05EDDC).l,a1
; $01B710
	move.w	$0(a2),d2
; $01B714
	mulu.w	#$001C,d2
; $01B718
	move.w	($4,a1,d2.w),d2
; $01B71C
	add.w	d0,d2
; $01B71E
	moveq	#0,d0
; $01B720
	move.b	($0,a1,d2.w),d0
; $01B724
	sub.w	d1,d0
; $01B726
	move.w	d0,d1
; $01B728
	moveq	#3,d2
; $01B72A
	moveq	#1,d3
; $01B72C
	moveq	#0,d4
; $01B72E
	moveq	#1,d5
; $01B730
	jsr	($010780).l
; $01B736
	lea	($FFFFA714).w,a0
; $01B73A
	move.w	#$000F,d0

loc_01B73E:				; $01B73E
	ori.w	#$8000,(a0)+
; $01B742
	dbf	d0,loc_01B73E
; $01B746
	movem.l	(a7)+,d6/d7/a2/a3/a4/a5/a6/a7
; $01B74A
	rts

loc_01B74C:				; $01B74C
	movem.l	a5/a4/d5,-(a7)
; $01B750
	moveq	#0,d0
; $01B752
	move.b	$0(a3),d0
; $01B756
	tst.b	$5(a3)
; $01B75A
	bne.w	loc_01B7AA
; $01B75E
	moveq	#0,d2
; $01B760
	move.b	$1(a3),d2
; $01B764
	cmpi.w	#$000B,d2
; $01B768
	bgt.w	loc_01B7AA
; $01B76C
	bne.w	loc_01B774
; $01B770
	move.w	#$0004,d2

loc_01B774:				; $01B774
	subq.w	#1,d2
; $01B776
	add.w	d2,d2
; $01B778
	add.w	d2,d2
; $01B77A
	lea	($087726).l,a2
; $01B780
	movea.l	($0,a2,d2.w),a2

loc_01B784:				; $01B784
	move.w	(a2),d3
; $01B786
	cmpi.w	#$FFFF,d3
; $01B78A
	beq.w	loc_01B7AA
; $01B78E
	cmp.w	d0,d3
; $01B790
	beq.w	loc_01B79C
; $01B794
	adda.w	#$0012,a2
; $01B798
	bra.w	loc_01B784

loc_01B79C:				; $01B79C
	adda.w	#$0002,a2
; $01B7A0
	move.w	(a2)+,d0
; $01B7A2
	move.l	a2,(a5)
; $01B7A4
	movem.l	(a7)+,d5/a4/a5
; $01B7A8
	rts

loc_01B7AA:				; $01B7AA
	asl.w	#4,d0
; $01B7AC
	lea	($08840A).l,a2
; $01B7B2
	adda.w	d0,a2
; $01B7B4
	move.w	(a2)+,d0
; $01B7B6
	move.l	a2,(a5)
; $01B7B8
	movem.l	(a7)+,d5/a4/a5
; $01B7BC
	rts
; $01B7BE
	bra.w	loc_01B80E
; $01B7C2
	bra.w	loc_01B80E
; $01B7C6
	bra.w	loc_01B80E
; $01B7CA
	bra.w	loc_01B80E
; $01B7CE
	bra.w	loc_01B824
; $01B7D2
	bra.w	loc_01B80E
; $01B7D6
	bra.w	loc_01B80E
; $01B7DA
	bra.w	loc_01B8A4
; $01B7DE
	bra.w	loc_01B8A4
; $01B7E2
	bra.w	loc_01B80E
; $01B7E6
	bra.w	loc_01B80E
; $01B7EA
	bra.w	loc_01B80E
; $01B7EE
	bra.w	loc_01B80E
; $01B7F2
	bra.w	loc_01B80E
; $01B7F6
	bra.w	loc_01B8D0
; $01B7FA
	bra.w	loc_01B80E
; $01B7FE
	bra.w	loc_01B904
; $01B802
	bra.w	loc_01B80E
; $01B806
	bra.w	loc_01B80E
; $01B80A
	bra.w	loc_01B956

loc_01B80E:				; $01B80E
	lea	($FF1000).l,a0
; $01B814
	move.w	#$0070,d2
; $01B818
	move.w	#$013F,d0

loc_01B81C:				; $01B81C
	move.w	d2,(a0)+
; $01B81E
	dbf	d0,loc_01B81C
; $01B822
	rts

loc_01B824:				; $01B824
	lea	($FF1000).l,a0
; $01B82A
	move.w	#$0068,d2
; $01B82E
	move.w	#$0077,d0

loc_01B832:				; $01B832
	move.w	d2,(a0)+
; $01B834
	dbf	d0,loc_01B832
; $01B838
	move.w	#$000F,d0

loc_01B83C:				; $01B83C
	move.w	#$0001,d1
; $01B840
	subq.w	#1,d2

loc_01B842:				; $01B842
	move.w	d2,(a0)+
; $01B844
	dbf	d1,loc_01B842
; $01B848
	dbf	d0,loc_01B83C
; $01B84C
	move.w	#$001F,d0

loc_01B850:				; $01B850
	move.w	d2,(a0)+
; $01B852
	dbf	d0,loc_01B850
; $01B856
	move.w	#$000B,d3
; $01B85A
	moveq	#0,d4
; $01B85C
	move.w	#$0017,d0

loc_01B860:				; $01B860
	add.w	d3,d4
; $01B862
	move.w	d4,d5
; $01B864
	asr.w	#4,d5
; $01B866
	move.w	d2,d6
; $01B868
	sub.w	d5,d6
; $01B86A
	move.w	d6,(a0)+
; $01B86C
	dbf	d0,loc_01B860
; $01B870
	move.w	d6,d2
; $01B872
	move.w	#$001F,d0

loc_01B876:				; $01B876
	move.w	d2,(a0)+
; $01B878
	dbf	d0,loc_01B876
; $01B87C
	move.w	#$000B,d3
; $01B880
	moveq	#0,d4
; $01B882
	move.w	#$0017,d0

loc_01B886:				; $01B886
	add.w	d3,d4
; $01B888
	move.w	d4,d5
; $01B88A
	asr.w	#4,d5
; $01B88C
	move.w	d2,d6
; $01B88E
	sub.w	d5,d6
; $01B890
	move.w	d6,(a0)+
; $01B892
	dbf	d0,loc_01B886
; $01B896
	move.w	d6,d2
; $01B898
	move.w	#$0037,d0

loc_01B89C:				; $01B89C
	move.w	d2,(a0)+
; $01B89E
	dbf	d0,loc_01B89C
; $01B8A2
	rts

loc_01B8A4:				; $01B8A4
	lea	($FF1000).l,a0
; $01B8AA
	move.w	#$0070,d2
; $01B8AE
	move.w	#$00A7,d0

loc_01B8B2:				; $01B8B2
	move.w	d2,(a0)+
; $01B8B4
	dbf	d0,loc_01B8B2
; $01B8B8
	move.w	#$000F,d0

loc_01B8BC:				; $01B8BC
	subq.w	#2,d2
; $01B8BE
	move.w	d2,(a0)+
; $01B8C0
	dbf	d0,loc_01B8BC
; $01B8C4
	move.w	#$0087,d0

loc_01B8C8:				; $01B8C8
	move.w	d2,(a0)+
; $01B8CA
	dbf	d0,loc_01B8C8
; $01B8CE
	rts

loc_01B8D0:				; $01B8D0
	lea	($FF1000).l,a0
; $01B8D6
	move.w	#$006C,d2
; $01B8DA
	move.w	#$002F,d0

loc_01B8DE:				; $01B8DE
	move.w	d2,(a0)+
; $01B8E0
	dbf	d0,loc_01B8DE
; $01B8E4
	move.w	#$0003,d0

loc_01B8E8:				; $01B8E8
	addq.w	#1,d2
; $01B8EA
	move.w	#$0003,d1

loc_01B8EE:				; $01B8EE
	move.w	d2,(a0)+
; $01B8F0
	dbf	d1,loc_01B8EE
; $01B8F4
	dbf	d0,loc_01B8E8
; $01B8F8
	move.w	#$00FF,d0

loc_01B8FC:				; $01B8FC
	move.w	d2,(a0)+
; $01B8FE
	dbf	d0,loc_01B8FC
; $01B902
	rts

loc_01B904:				; $01B904
	lea	($FF1000).l,a0
; $01B90A
	move.w	#$0070,d2
; $01B90E
	move.w	#$009F,d0

loc_01B912:				; $01B912
	move.w	d2,(a0)+
; $01B914
	dbf	d0,loc_01B912
; $01B918
	subi.w	#$0010,d2
; $01B91C
	move.w	#$000F,d0

loc_01B920:				; $01B920
	btst	#0,d0
; $01B924
	beq.w	loc_01B92A
; $01B928
	subq.w	#1,d2

loc_01B92A:				; $01B92A
	move.w	d2,(a0)+
; $01B92C
	dbf	d0,loc_01B920
; $01B930
	move.w	#$0040,d2
; $01B934
	move.w	#$0007,d0

loc_01B938:				; $01B938
	move.w	d2,(a0)+
; $01B93A
	dbf	d0,loc_01B938
; $01B93E
	move.w	#$0007,d0

loc_01B942:				; $01B942
	addq.w	#1,d2
; $01B944
	move.w	d2,(a0)+
; $01B946
	dbf	d0,loc_01B942
; $01B94A
	move.w	#$007F,d0

loc_01B94E:				; $01B94E
	move.w	d2,(a0)+
; $01B950
	dbf	d0,loc_01B94E
; $01B954
	rts

loc_01B956:				; $01B956
	lea	($FF1000).l,a0
; $01B95C
	move.w	#$0074,d2
; $01B960
	move.w	#$005F,d0

loc_01B964:				; $01B964
	move.w	d2,(a0)+
; $01B966
	dbf	d0,loc_01B964
; $01B96A
	move.w	#$0007,d0

loc_01B96E:				; $01B96E
	subq.w	#1,d2
; $01B970
	move.w	d2,(a0)+
; $01B972
	dbf	d0,loc_01B96E
; $01B976
	move.w	#$00D7,d0

loc_01B97A:				; $01B97A
	move.w	d2,(a0)+
; $01B97C
	dbf	d0,loc_01B97A
; $01B980
	rts

loc_01B982:				; $01B982
	movem.l	a6/d6,-(a7)
; $01B986
	clr.w	($FF78F2).l
; $01B98C
	lea	($FF720C).l,a1
; $01B992
	moveq	#79,d1

loc_01B994:				; $01B994
	clr.w	(a1)
; $01B996
	adda.w	#$0016,a1
; $01B99A
	dbf	d1,loc_01B994
; $01B99E
	movem.l	(a7)+,d6/a6
; $01B9A2
	rts

loc_01B9A4:				; $01B9A4
	movem.l	d7/d1,-(a7)
; $01B9A8
	lea	($FF720C).l,a6
; $01B9AE
	move.w	#$0050,($FF78F0).l

loc_01B9B6:				; $01B9B6
	move.l	a6,($FF78EC).l
; $01B9BC
	tst.w	(a6)
; $01B9BE
	beq.w	loc_01B9C6
; $01B9C2
	movea.w	(a6),a0
; $01B9C4
	jsr	(a0)

loc_01B9C6:				; $01B9C6
	movea.l	($FF78EC).l,a6
; $01B9CC
	adda.w	#$0016,a6
; $01B9D0
	subq.w	#1,($FF78F0).l
; $01B9D6
	bne.w	loc_01B9B6
; $01B9DA
	movem.l	(a7)+,d1/d7
; $01B9DE
	rts

loc_01B9E0:				; $01B9E0
	lea	($FF720C).l,a0
; $01B9E6
	moveq	#79,d0

loc_01B9E8:				; $01B9E8
	tst.w	(a0)
; $01B9EA
	beq.w	loc_01B9FA
; $01B9EE
	adda.w	#$0016,a0
; $01B9F2
	dbf	d0,loc_01B9E8
; $01B9F6
	moveq	#1,d0
; $01B9F8
	rts

loc_01B9FA:				; $01B9FA
	moveq	#0,d0
; $01B9FC
	rts

loc_01B9FE:				; $01B9FE
	movem.l	a7/d7/d6,-(a7)
; $01BA02
	move.w	#$0001,$46(a0)
; $01BA08
	movea.l	a0,a1
; $01BA0A
	jsr	($01B9E0).l
; $01BA10
	move.w	#$1608,$0(a0)
; $01BA16
	addq.w	#1,($FF78F2).l
; $01BA1C
	move.w	#$0005,$2(a0)
; $01BA22
	move.l	a1,$12(a0)
; $01BA26
	lea	($FFFF9442).w,a1
; $01BA2A
	lea	($05DFE0).l,a0
; $01BA30
	move.w	#$0017,d0

loc_01BA34:				; $01BA34
	move.l	(a0)+,(a1)+
; $01BA36
	dbf	d0,loc_01BA34
; $01BA3A
	move.w	#$0001,($FFFF95AE).w
; $01BA40
	movem.l	(a7)+,d6/d7/a7
; $01BA44
	rts

loc_01BA46:				; $01BA46
	movem.l	a7/d7/d6,-(a7)
; $01BA4A
	movea.l	a0,a1
; $01BA4C
	jsr	($01B9E0).l
; $01BA52
	bne.w	loc_01BA84
; $01BA56
	move.w	#$169C,$0(a0)
; $01BA5C
	addq.w	#1,($FF78F2).l
; $01BA62
	move.w	d1,$2(a0)
; $01BA66
	move.w	d2,$4(a0)
; $01BA6A
	move.w	d3,$6(a0)
; $01BA6E
	clr.w	$A(a0)
; $01BA72
	move.w	#$FFFF,$C(a0)
; $01BA78
	move.l	#$000863A2,$E(a0)
; $01BA80
	move.l	a1,$12(a0)

loc_01BA84:				; $01BA84
	movem.l	(a7)+,d6/d7/a7
; $01BA88
	rts

loc_01BA8A:				; $01BA8A
	movem.l	a7/d7/d6,-(a7)
; $01BA8E
	movea.l	a0,a1
; $01BA90
	jsr	($01B9E0).l
; $01BA96
	bne.w	loc_01BAC8
; $01BA9A
	move.w	#$169C,$0(a0)
; $01BAA0
	addq.w	#1,($FF78F2).l
; $01BAA6
	move.w	d1,$2(a0)
; $01BAAA
	move.w	d2,$4(a0)
; $01BAAE
	move.w	d3,$6(a0)
; $01BAB2
	clr.w	$A(a0)
; $01BAB6
	move.w	#$FFFF,$C(a0)
; $01BABC
	move.l	#$000862CE,$E(a0)
; $01BAC4
	move.l	a1,$12(a0)

loc_01BAC8:				; $01BAC8
	move.b	#$5B,($FFFFA6DA).w
; $01BACE
	jsr	($018B2C).l
; $01BAD4
	movem.l	(a7)+,d6/d7/a7
; $01BAD8
	rts

loc_01BADA:				; $01BADA
	movem.l	a7/d7/d6,-(a7)
; $01BADE
	movea.l	a0,a1
; $01BAE0
	jsr	($01B9E0).l
; $01BAE6
	bne.w	loc_01BB18
; $01BAEA
	move.w	#$169C,$0(a0)
; $01BAF0
	addq.w	#1,($FF78F2).l
; $01BAF6
	move.w	d1,$2(a0)
; $01BAFA
	move.w	d2,$4(a0)
; $01BAFE
	move.w	d3,$6(a0)
; $01BB02
	clr.w	$A(a0)
; $01BB06
	move.w	#$FFFF,$C(a0)
; $01BB0C
	move.l	#$00086350,$E(a0)
; $01BB14
	move.l	a1,$12(a0)

loc_01BB18:				; $01BB18
	move.b	#$5B,($FFFFA6DA).w
; $01BB1E
	jsr	($018B2C).l
; $01BB24
	movem.l	(a7)+,d6/d7/a7
; $01BB28
	rts

loc_01BB2A:				; $01BB2A
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $01BB2E
	movea.l	a0,a1
; $01BB30
	jsr	($01B9E0).l
; $01BB36
	lea	($001770).l,a2
; $01BB3C
	add.w	d2,d2
; $01BB3E
	move.w	($0,a2,d2.w),$0(a0)
; $01BB44
	addq.w	#1,($FF78F2).l
; $01BB4A
	asl.w	#8,d1
; $01BB4C
	move.w	d1,$8(a0)
; $01BB50
	move.w	$10(a1),$2(a0)
; $01BB56
	move.w	$12(a1),d0
; $01BB5A
	move.w	$3E(a1),d1
; $01BB5E
	lsr.w	#1,d1
; $01BB60
	sub.w	d1,d0
; $01BB62
	lsr.w	#1,d1
; $01BB64
	sub.w	d1,d0
; $01BB66
	move.w	d0,$4(a0)
; $01BB6A
	move.w	$14(a1),$6(a0)
; $01BB70
	clr.w	$A(a0)
; $01BB74
	clr.w	$C(a0)
; $01BB78
	move.w	$40(a1),$10(a0)
; $01BB7E
	movea.l	$2A(a1),a1
; $01BB82
	move.l	a1,$12(a0)
; $01BB86
	move.w	$2(a0),d0
; $01BB8A
	clr.w	$E(a0)
; $01BB8E
	cmp.w	$10(a1),d0
; $01BB92
	ble.w	loc_01BB9C
; $01BB96
	move.w	#$0800,$E(a0)

loc_01BB9C:				; $01BB9C
	move.b	#$66,($FFFFA6DA).w
; $01BBA2
	jsr	($018B2C).l
; $01BBA8
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $01BBAC
	rts

loc_01BBAE:				; $01BBAE
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $01BBB2
	movea.l	a0,a1
; $01BBB4
	jsr	($01B9E0).l
; $01BBBA
	lea	($001770).l,a2
; $01BBC0
	add.w	d2,d2
; $01BBC2
	move.w	($0,a2,d2.w),$0(a0)
; $01BBC8
	addq.w	#1,($FF78F2).l
; $01BBCE
	clr.w	$12(a0)
; $01BBD2
	move.w	d1,$14(a0)
; $01BBD6
	clr.w	$8(a0)
; $01BBDA
	move.w	$10(a1),$2(a0)
; $01BBE0
	move.w	$12(a1),d0
; $01BBE4
	move.w	$3E(a1),d1
; $01BBE8
	lsr.w	#1,d1
; $01BBEA
	sub.w	d1,d0
; $01BBEC
	lsr.w	#1,d1
; $01BBEE
	sub.w	d1,d0
; $01BBF0
	move.w	d0,$4(a0)
; $01BBF4
	move.w	$14(a1),$6(a0)
; $01BBFA
	clr.w	$A(a0)
; $01BBFE
	clr.w	$C(a0)
; $01BC02
	move.w	$40(a1),$10(a0)
; $01BC08
	move.w	$2(a0),d0
; $01BC0C
	clr.w	$E(a0)
; $01BC10
	cmp.w	$14(a0),d0
; $01BC14
	ble.w	loc_01BC1E
; $01BC18
	move.w	#$0800,$E(a0)

loc_01BC1E:				; $01BC1E
	move.b	#$66,($FFFFA6DA).w
; $01BC24
	jsr	($018B2C).l
; $01BC2A
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $01BC2E
	rts

loc_01BC30:				; $01BC30
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $01BC34
	movea.l	a0,a1
; $01BC36
	jsr	($01B9E0).l
; $01BC3C
	lea	($001D9A).l,a2
; $01BC42
	add.w	d2,d2
; $01BC44
	move.w	($0,a2,d2.w),$0(a0)
; $01BC4A
	addq.w	#1,($FF78F2).l
; $01BC50
	asl.w	#8,d1
; $01BC52
	move.w	d1,$8(a0)
; $01BC56
	move.w	$10(a1),$2(a0)
; $01BC5C
	move.w	$12(a1),d0
; $01BC60
	move.w	$3E(a1),d1
; $01BC64
	lsr.w	#1,d1
; $01BC66
	sub.w	d1,d0
; $01BC68
	lsr.w	#1,d1
; $01BC6A
	sub.w	d1,d0
; $01BC6C
	move.w	d0,$4(a0)
; $01BC70
	move.w	$14(a1),$6(a0)
; $01BC76
	clr.w	$A(a0)
; $01BC7A
	clr.w	$C(a0)
; $01BC7E
	move.w	$40(a1),$10(a0)
; $01BC84
	movea.l	$2A(a1),a1
; $01BC88
	move.l	a1,$12(a0)
; $01BC8C
	move.w	$2(a0),d0
; $01BC90
	clr.w	$E(a0)
; $01BC94
	cmp.w	$10(a1),d0
; $01BC98
	ble.w	loc_01BCA2
; $01BC9C
	move.w	#$0800,$E(a0)

loc_01BCA2:				; $01BCA2
	move.b	#$5F,($FFFFA6DA).w
; $01BCA8
	jsr	($018B2C).l
; $01BCAE
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $01BCB2
	rts

loc_01BCB4:				; $01BCB4
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $01BCB8
	movea.l	a0,a1
; $01BCBA
	jsr	($01B9E0).l
; $01BCC0
	lea	($001D9A).l,a2
; $01BCC6
	add.w	d2,d2
; $01BCC8
	move.w	($0,a2,d2.w),$0(a0)
; $01BCCE
	addq.w	#1,($FF78F2).l
; $01BCD4
	clr.w	$12(a0)
; $01BCD8
	move.w	d1,$14(a0)
; $01BCDC
	clr.w	$8(a0)
; $01BCE0
	move.w	$10(a1),$2(a0)
; $01BCE6
	move.w	$12(a1),d0
; $01BCEA
	move.w	$3E(a1),d1
; $01BCEE
	lsr.w	#1,d1
; $01BCF0
	sub.w	d1,d0
; $01BCF2
	lsr.w	#1,d1
; $01BCF4
	sub.w	d1,d0
; $01BCF6
	move.w	d0,$4(a0)
; $01BCFA
	move.w	$14(a1),$6(a0)
; $01BD00
	clr.w	$A(a0)
; $01BD04
	clr.w	$C(a0)
; $01BD08
	move.w	$40(a1),$10(a0)
; $01BD0E
	move.w	$2(a0),d0
; $01BD12
	clr.w	$E(a0)
; $01BD16
	cmp.w	$14(a0),d0
; $01BD1A
	ble.w	loc_01BD24
; $01BD1E
	move.w	#$0800,$E(a0)

loc_01BD24:				; $01BD24
	move.b	#$5F,($FFFFA6DA).w
; $01BD2A
	jsr	($018B2C).l
; $01BD30
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $01BD34
	rts

loc_01BD36:				; $01BD36
	movem.l	a7/a6/d7/d6/d5/d4,-(a7)
; $01BD3A
	movea.l	a0,a2
; $01BD3C
	move.w	#$235A,d2
; $01BD40
	jsr	($01B9E0).l
; $01BD46
	move.w	d2,$0(a0)
; $01BD4A
	movea.l	a0,a1
; $01BD4C
	addq.w	#1,($FF78F2).l
; $01BD52
	jsr	($01B9E0).l
; $01BD58
	move.w	d2,$0(a0)
; $01BD5C
	addq.w	#1,($FF78F2).l
; $01BD62
	exg	a0,a2
; $01BD64
	asl.w	#8,d1
; $01BD66
	move.w	d1,$8(a1)
; $01BD6A
	move.w	#$0001,$8(a2)
; $01BD70
	move.w	$10(a0),d0
; $01BD74
	move.w	$3C(a0),d1
; $01BD78
	tst.w	$22(a0)
; $01BD7C
	beq.w	loc_01BD82
; $01BD80
	neg.w	d1

loc_01BD82:				; $01BD82
	add.w	d1,d0
; $01BD84
	move.w	d0,$2(a1)
; $01BD88
	move.w	d0,$2(a2)
; $01BD8C
	move.w	$12(a0),d0
; $01BD90
	move.w	$3E(a0),d1
; $01BD94
	lsr.w	#1,d1
; $01BD96
	sub.w	d1,d0
; $01BD98
	lsr.w	#1,d1
; $01BD9A
	sub.w	d1,d0
; $01BD9C
	addq.w	#8,d0
; $01BD9E
	move.w	d0,$4(a1)
; $01BDA2
	move.w	d0,$4(a2)
; $01BDA6
	move.w	$14(a0),d0
; $01BDAA
	move.w	d0,$6(a1)
; $01BDAE
	move.w	d0,$6(a2)
; $01BDB2
	move.w	#$0400,$A(a1)
; $01BDB8
	move.w	#$1000,$A(a2)
; $01BDBE
	clr.w	$C(a1)
; $01BDC2
	clr.w	$C(a2)
; $01BDC6
	move.w	$40(a0),d0
; $01BDCA
	move.w	d0,$10(a1)
; $01BDCE
	move.w	d0,$10(a2)
; $01BDD2
	movea.l	$2A(a0),a3
; $01BDD6
	move.l	a3,$12(a1)
; $01BDDA
	move.l	a3,$12(a2)
; $01BDDE
	moveq	#0,d1
; $01BDE0
	move.w	$10(a0),d0
; $01BDE4
	cmp.w	$10(a3),d0
; $01BDE8
	ble.w	loc_01BDF0
; $01BDEC
	move.w	#$0800,d1

loc_01BDF0:				; $01BDF0
	move.w	d1,$E(a1)
; $01BDF4
	move.w	d1,$E(a2)
; $01BDF8
	move.b	#$5F,($FFFFA6DA).w
; $01BDFE
	jsr	($018B2C).l
; $01BE04
	movem.l	(a7)+,d4/d5/d6/d7/a6/a7
; $01BE08
	rts

loc_01BE0A:				; $01BE0A
	movem.l	a7/a6/d7/d6/d5/d4,-(a7)
; $01BE0E
	movea.l	a0,a2
; $01BE10
	move.w	#$235A,d2
; $01BE14
	jsr	($01B9E0).l
; $01BE1A
	move.w	d2,$0(a0)
; $01BE1E
	movea.l	a0,a1
; $01BE20
	addq.w	#1,($FF78F2).l
; $01BE26
	jsr	($01B9E0).l
; $01BE2C
	move.w	d2,$0(a0)
; $01BE30
	addq.w	#1,($FF78F2).l
; $01BE36
	exg	a0,a2
; $01BE38
	move.w	#$0000,$8(a1)
; $01BE3E
	move.w	#$0000,$8(a2)
; $01BE44
	move.w	$10(a0),d0
; $01BE48
	move.w	$3C(a0),d1
; $01BE4C
	tst.w	$22(a0)
; $01BE50
	beq.w	loc_01BE56
; $01BE54
	neg.w	d1

loc_01BE56:				; $01BE56
	add.w	d1,d0
; $01BE58
	move.w	d0,$2(a1)
; $01BE5C
	move.w	d0,$2(a2)
; $01BE60
	move.w	$12(a0),d0
; $01BE64
	move.w	$3E(a0),d1
; $01BE68
	lsr.w	#1,d1
; $01BE6A
	sub.w	d1,d0
; $01BE6C
	lsr.w	#1,d1
; $01BE6E
	sub.w	d1,d0
; $01BE70
	addq.w	#8,d0
; $01BE72
	move.w	d0,$4(a1)
; $01BE76
	move.w	d0,$4(a2)
; $01BE7A
	move.w	$14(a0),d0
; $01BE7E
	move.w	d0,$6(a1)
; $01BE82
	move.w	d0,$6(a2)
; $01BE86
	move.w	#$0400,$A(a1)
; $01BE8C
	move.w	#$1000,$A(a2)
; $01BE92
	clr.w	$C(a1)
; $01BE96
	clr.w	$C(a2)
; $01BE9A
	move.w	$40(a0),d0
; $01BE9E
	move.w	d0,$10(a1)
; $01BEA2
	move.w	d0,$10(a2)
; $01BEA6
	clr.w	$12(a1)
; $01BEAA
	clr.w	$12(a2)
; $01BEAE
	move.w	$2(a1),d0
; $01BEB2
	moveq	#0,d1
; $01BEB4
	addi.w	#$00C0,d0
; $01BEB8
	tst.w	$A(a0)
; $01BEBC
	beq.w	loc_01BEC8
; $01BEC0
	subi.w	#$0180,d0
; $01BEC4
	move.w	#$0800,d1

loc_01BEC8:				; $01BEC8
	move.w	d1,$E(a1)
; $01BECC
	move.w	d1,$E(a2)
; $01BED0
	jsr	($0085A0).l
; $01BED6
	subi.w	#$0032,d2
; $01BEDA
	add.w	d0,d2
; $01BEDC
	move.w	d2,$14(a1)
; $01BEE0
	jsr	($0085A0).l
; $01BEE6
	subi.w	#$0032,d2
; $01BEEA
	add.w	d0,d2
; $01BEEC
	move.w	d2,$14(a2)
; $01BEF0
	move.b	#$5F,($FFFFA6DA).w
; $01BEF6
	jsr	($018B2C).l
; $01BEFC
	movem.l	(a7)+,d4/d5/d6/d7/a6/a7
; $01BF00
	rts

loc_01BF02:				; $01BF02
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $01BF06
	movea.l	a0,a1
; $01BF08
	move.w	#$25D6,d2
; $01BF0C
	jsr	($01B9E0).l
; $01BF12
	move.w	d2,$0(a0)
; $01BF16
	addq.w	#1,($FF78F2).l
; $01BF1C
	move.w	d1,$8(a0)
; $01BF20
	move.w	$10(a1),$2(a0)
; $01BF26
	move.w	$12(a1),d0
; $01BF2A
	move.w	$3E(a1),d1
; $01BF2E
	lsr.w	#1,d1
; $01BF30
	sub.w	d1,d0
; $01BF32
	move.w	d0,$4(a0)
; $01BF36
	move.w	$14(a1),$6(a0)
; $01BF3C
	clr.w	$A(a0)
; $01BF40
	move.w	$40(a1),$10(a0)
; $01BF46
	movea.l	$2A(a1),a1
; $01BF4A
	move.l	a1,$12(a0)
; $01BF4E
	moveq	#0,d1
; $01BF50
	move.w	$10(a1),d0
; $01BF54
	sub.w	$2(a0),d0
; $01BF58
	beq.w	loc_01BF64
; $01BF5C
	movem.l	d0/d7/a0/a1/a2/a3/a4/a5,d0
; $01BF60
	ori.b	#$00,a5

loc_01BF64:				; $01BF64
	move.w	#$0006,d2
; $01BF68
	jsr	($0085A2).l
; $01BF6E
	subq.w	#3,d2
; $01BF70
	add.w	d2,d1
; $01BF72
	neg.w	d1
; $01BF74
	move.w	d1,$C(a0)
; $01BF78
	move.w	#$0006,d2
; $01BF7C
	jsr	($0085A2).l
; $01BF82
	addq.w	#4,d2
; $01BF84
	neg.w	d2
; $01BF86
	move.w	d2,$E(a0)
; $01BF8A
	move.b	#$5F,($FFFFA6DA).w
; $01BF90
	jsr	($018B2C).l
; $01BF96
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $01BF9A
	rts

loc_01BF9C:				; $01BF9C
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $01BFA0
	movea.l	a0,a1
; $01BFA2
	move.w	#$25D6,d2
; $01BFA6
	jsr	($01B9E0).l
; $01BFAC
	move.w	d2,$0(a0)
; $01BFB0
	addq.w	#1,($FF78F2).l
; $01BFB6
	clr.w	$8(a0)
; $01BFBA
	move.w	$10(a1),$2(a0)
; $01BFC0
	move.w	$12(a1),d0
; $01BFC4
	move.w	$3E(a1),d1
; $01BFC8
	lsr.w	#1,d1
; $01BFCA
	sub.w	d1,d0
; $01BFCC
	move.w	d0,$4(a0)
; $01BFD0
	move.w	$14(a1),$6(a0)
; $01BFD6
	clr.w	$A(a0)
; $01BFDA
	move.w	$40(a1),$10(a0)
; $01BFE0
	clr.w	$12(a0)
; $01BFE4
	move.w	$2(a0),d0
; $01BFE8
	moveq	#0,d1
; $01BFEA
	addi.w	#$00C0,d0
; $01BFEE
	tst.w	$A(a1)
; $01BFF2
	beq.w	loc_01BFFE
; $01BFF6
	subi.w	#$0180,d0
; $01BFFA
	move.w	#$0800,d1

loc_01BFFE:				; $01BFFE
	move.w	d1,$E(a0)
; $01C002
	jsr	($0085A0).l
; $01C008
	subi.w	#$0032,d2
; $01C00C
	add.w	d0,d2
; $01C00E
	move.w	d2,$14(a0)
; $01C012
	moveq	#0,d1
; $01C014
	move.w	d2,d0
; $01C016
	sub.w	$2(a0),d0
; $01C01A
	beq.w	loc_01C026
; $01C01E
	movem.l	d0/d7/a0/a1/a2/a3/a4/a5,d0
; $01C022
	ori.b	#$00,a5

loc_01C026:				; $01C026
	move.w	#$0006,d2
; $01C02A
	jsr	($0085A2).l
; $01C030
	subq.w	#3,d2
; $01C032
	add.w	d2,d1
; $01C034
	neg.w	d1
; $01C036
	move.w	d1,$C(a0)
; $01C03A
	move.w	#$0006,d2
; $01C03E
	jsr	($0085A2).l
; $01C044
	addq.w	#4,d2
; $01C046
	neg.w	d2
; $01C048
	move.w	d2,$E(a0)
; $01C04C
	move.b	#$5F,($FFFFA6DA).w
; $01C052
	jsr	($018B2C).l
; $01C058
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $01C05C
	rts

loc_01C05E:				; $01C05E
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $01C062
	move.w	#$0001,$8(a0)
; $01C068
	movea.l	a0,a1
; $01C06A
	jsr	($01B9E0).l
; $01C070
	move.w	#$281A,$0(a0)
; $01C076
	addq.w	#1,($FF78F2).l
; $01C07C
	move.w	d1,$2(a0)
; $01C080
	bmi.w	loc_01C094
; $01C084
	cmpi.w	#$0140,d1
; $01C088
	blt.w	loc_01C096
; $01C08C
	move.w	#$013F,d1
; $01C090
	bra.w	loc_01C096

loc_01C094:				; $01C094
	moveq	#0,d1

loc_01C096:				; $01C096
	add.w	d1,d1
; $01C098
	lea	($FF67BC).l,a2
; $01C09E
	move.w	($0,a2,d1.w),d1
; $01C0A2
	move.w	d1,$4(a0)
; $01C0A6
	move.w	$14(a1),$6(a0)
; $01C0AC
	move.w	#$0005,$8(a0)
; $01C0B2
	clr.w	$A(a0)
; $01C0B6
	move.w	#$FFFF,$C(a0)
; $01C0BC
	move.l	#$0008626C,$E(a0)
; $01C0C4
	move.l	a1,$12(a0)
; $01C0C8
	move.b	#$5D,($FFFFA6DA).w
; $01C0CE
	jsr	($018B2C).l
; $01C0D4
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $01C0D8
	rts

loc_01C0DA:				; $01C0DA
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $01C0DE
	movea.l	a0,a1
; $01C0E0
	jsr	($01B9E0).l
; $01C0E6
	move.w	#$2964,$0(a0)
; $01C0EC
	addq.w	#1,($FF78F2).l
; $01C0F2
	move.l	#$00086186,$E(a0)
; $01C0FA
	move.l	a1,$12(a0)
; $01C0FE
	clr.w	$8(a0)
; $01C102
	move.w	#$FFFF,$A(a0)
; $01C108
	clr.w	$C(a0)
; $01C10C
	move.b	#$68,($FFFFA6DA).w
; $01C112
	jsr	($018B2C).l
; $01C118
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $01C11C
	rts

loc_01C11E:				; $01C11E
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $01C122
	movea.l	a0,a1
; $01C124
	jsr	($01B9E0).l
; $01C12A
	move.w	#$2B58,$0(a0)
; $01C130
	addq.w	#1,($FF78F2).l
; $01C136
	move.w	#$00A0,d2
; $01C13A
	move.w	$10(a1),d0
; $01C13E
	move.w	$3C(a1),d1
; $01C142
	tst.w	$A(a1)
; $01C146
	beq.w	loc_01C154
; $01C14A
	sub.w	d1,d0
; $01C14C
	addi.w	#$0010,d2
; $01C150
	bra.w	loc_01C15A

loc_01C154:				; $01C154
	add.w	d1,d0
; $01C156
	subi.w	#$0010,d2

loc_01C15A:				; $01C15A
	move.w	d0,$2(a0)
; $01C15E
	move.w	$12(a1),d0
; $01C162
	move.w	$3E(a1),d1
; $01C166
	lsr.w	#1,d1
; $01C168
	addq.w	#8,d1
; $01C16A
	sub.w	d1,d0
; $01C16C
	move.w	d0,$4(a0)
; $01C170
	move.w	$14(a1),$6(a0)
; $01C176
	move.l	a1,$12(a0)
; $01C17A
	clr.w	$8(a0)
; $01C17E
	move.w	d2,$A(a0)
; $01C182
	move.b	#$FF,$C(a0)
; $01C188
	clr.b	$D(a0)
; $01C18C
	move.l	#$00086232,$E(a0)
; $01C194
	move.b	#$62,($FFFFA6DA).w
; $01C19A
	jsr	($018B2C).l
; $01C1A0
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $01C1A4
	rts

loc_01C1A6:				; $01C1A6
	movem.l	a7/a6/a5/a4/d7,-(a7)
; $01C1AA
	jsr	($01B9E0).l
; $01C1B0
	move.w	#$2D30,$0(a0)
; $01C1B6
	addq.w	#1,($FF78F2).l
; $01C1BC
	move.w	d1,$2(a0)
; $01C1C0
	move.w	d2,$4(a0)
; $01C1C4
	move.w	d3,$6(a0)
; $01C1C8
	asl.w	#4,d1
; $01C1CA
	move.w	d1,$E(a0)
; $01C1CE
	asl.w	#4,d2
; $01C1D0
	move.w	d2,$10(a0)
; $01C1D4
	moveq	#2,d2
; $01C1D6
	jsr	($0085A2).l
; $01C1DC
	move.w	d2,d1
; $01C1DE
	addq.w	#1,d1
; $01C1E0
	moveq	#11,d2
; $01C1E2
	jsr	($0085A2).l
; $01C1E8
	subq.w	#5,d2
; $01C1EA
	add.w	d2,d4
; $01C1EC
	move.w	d4,d2
; $01C1EE
	cmpi.w	#$00B4,d2
; $01C1F2
	ble.w	loc_01C1FA
; $01C1F6
	subi.w	#$00B4,d2

loc_01C1FA:				; $01C1FA
	bsr.w	loc_01A8C2
; $01C1FE
	cmpi.w	#$00B4,d4
; $01C202
	ble.w	loc_01C208
; $01C206
	neg.w	d2

loc_01C208:				; $01C208
	roxl.w	#2,d1
; $01C20A
	move.w	d1,$8(a0)
; $01C20E
	move.w	d2,$A(a0)
; $01C212
	clr.w	$C(a0)
; $01C216
	move.l	a1,$12(a0)
; $01C21A
	movem.l	(a7)+,d7/a4/a5/a6/a7
; $01C21E
	rts

loc_01C220:				; $01C220
	movem.l	a7/a6/d7/d6,-(a7)
; $01C224
	move.w	d1,d0
; $01C226
	tst.w	d0
; $01C228
	bmi.w	loc_01C23C
; $01C22C
	cmpi.w	#$0140,d0
; $01C230
	blt.w	loc_01C23E
; $01C234
	move.w	#$013F,d0
; $01C238
	bra.w	loc_01C23E

loc_01C23C:				; $01C23C
	moveq	#0,d0

loc_01C23E:				; $01C23E
	lea	($FF67BC).l,a1
; $01C244
	add.w	d0,d0
; $01C246
	move.w	($0,a1,d0.w),d2
; $01C24A
	movea.l	a0,a1
; $01C24C
	jsr	($01B9E0).l
; $01C252
	move.w	#$2E2E,$0(a0)
; $01C258
	addq.w	#1,($FF78F2).l
; $01C25E
	move.l	a1,$12(a0)
; $01C262
	move.w	$40(a1),$A(a0)
; $01C268
	move.w	d1,$2(a0)
; $01C26C
	move.w	d2,$4(a0)
; $01C270
	move.w	d3,$6(a0)
; $01C274
	clr.w	$8(a0)
; $01C278
	move.w	d4,$C(a0)
; $01C27C
	move.w	d5,$E(a0)
; $01C280
	move.b	#$60,($FFFFA6DA).w
; $01C286
	jsr	($018B2C).l
; $01C28C
	movem.l	(a7)+,d6/d7/a6/a7
; $01C290
	rts

loc_01C292:				; $01C292
	movem.l	a7/a6/d7/d6,-(a7)
; $01C296
	movea.l	a0,a1
; $01C298
	jsr	($01B9E0).l
; $01C29E
	move.w	#$2F2E,$0(a0)
; $01C2A4
	addq.w	#1,($FF78F2).l
; $01C2AA
	move.l	#$00086404,$E(a0)
; $01C2B2
	move.l	a1,$12(a0)
; $01C2B6
	move.w	#$FFFF,$2(a0)
; $01C2BC
	clr.w	$4(a0)
; $01C2C0
	clr.w	$8(a0)
; $01C2C4
	clr.w	$A(a0)
; $01C2C8
	clr.w	$C(a0)
; $01C2CC
	movem.l	(a7)+,d6/d7/a6/a7
; $01C2D0
	rts

loc_01C2D2:				; $01C2D2
	movem.l	a7/a6/a5/a4/a3/d6/d5,-(a7)
; $01C2D6
	lea	($086186).l,a1
; $01C2DC
	tst.w	d7
; $01C2DE
	bne.w	loc_01C2FA
; $01C2E2
	addq.w	#1,d6
; $01C2E4
	move.w	d6,d0
; $01C2E6
	cmp.w	(a1),d0
; $01C2E8
	bcs.w	loc_01C2EE
; $01C2EC
	moveq	#0,d0

loc_01C2EE:				; $01C2EE
	move.w	d0,d6
; $01C2F0
	add.w	d0,d0
; $01C2F2
	add.w	d0,d0
; $01C2F4
	movea.l	($2,a1,d0.w),a2
; $01C2F8
	move.w	(a2),d7

loc_01C2FA:				; $01C2FA
	subq.w	#1,d7
; $01C2FC
	move.w	d6,d0
; $01C2FE
	add.w	d0,d0
; $01C300
	add.w	d0,d0
; $01C302
	movea.l	($2,a1,d0.w),a1
; $01C306
	adda.w	#$0002,a1
; $01C30A
	jsr	($01B064).l
; $01C310
	bne.w	loc_01C35A
; $01C314
	move.w	$10(a0),d1
; $01C318
	move.w	$12(a0),d2
; $01C31C
	move.w	$14(a0),d3
; $01C320
	move.w	$3E(a0),d0
; $01C324
	add.w	d4,d1
; $01C326
	lsr.w	d5,d0
; $01C328
	sub.w	d0,d2
; $01C32A
	sub.w	d3,d2
; $01C32C
	tst.w	$40(a0)
; $01C330
	beq.w	loc_01C33A
; $01C334
	add.w	d3,d1
; $01C336
	bra.w	loc_01C33C

loc_01C33A:				; $01C33A
	sub.w	d3,d1

loc_01C33C:				; $01C33C
	move.w	#$0001,$0(a2)
; $01C342
	move.w	d3,$2(a2)
; $01C346
	add.w	(a1)+,d2
; $01C348
	move.w	d2,$4(a2)
; $01C34C
	add.w	(a1)+,d1
; $01C34E
	move.w	d1,$A(a2)
; $01C352
	move.w	(a1)+,$6(a2)
; $01C356
	move.w	(a1)+,$8(a2)

loc_01C35A:				; $01C35A
	movem.l	(a7)+,d5/d6/a3/a4/a5/a6/a7
; $01C35E
	rts

loc_01C360:				; $01C360
	movem.l	a7/a6/d7/d6,-(a7)
; $01C364
	movea.l	a0,a1
; $01C366
	jsr	($01B9E0).l
; $01C36C
	move.w	#$3100,$0(a0)
; $01C372
	addq.w	#1,($FF78F2).l
; $01C378
	move.l	#$000864BA,$E(a0)
; $01C380
	move.l	a1,$12(a0)
; $01C384
	move.w	#$FFFF,$2(a0)
; $01C38A
	clr.w	$4(a0)
; $01C38E
	clr.w	$6(a0)
; $01C392
	clr.w	$8(a0)
; $01C396
	clr.w	$A(a0)
; $01C39A
	clr.w	$C(a0)
; $01C39E
	movem.l	(a7)+,d6/d7/a6/a7
; $01C3A2
	rts

loc_01C3A4:				; $01C3A4
	movem.l	a7/a6/d7/d6/d5,-(a7)
; $01C3A8
	movea.l	a0,a1
; $01C3AA
	jsr	($01B9E0).l
; $01C3B0
	move.w	#$328E,$0(a0)
; $01C3B6
	addq.w	#1,($FF78F2).l
; $01C3BC
	move.w	d1,$2(a0)
; $01C3C0
	bmi.w	loc_01C3D4
; $01C3C4
	cmpi.w	#$0140,d1
; $01C3C8
	blt.w	loc_01C3D6
; $01C3CC
	move.w	#$013F,d1
; $01C3D0
	bra.w	loc_01C3D6

loc_01C3D4:				; $01C3D4
	moveq	#0,d1

loc_01C3D6:				; $01C3D6
	add.w	d1,d1
; $01C3D8
	lea	($FF67BC).l,a2
; $01C3DE
	move.w	($0,a2,d1.w),d1
; $01C3E2
	move.w	d1,$4(a0)
; $01C3E6
	move.w	$14(a1),$6(a0)
; $01C3EC
	move.w	#$0001,$8(a0)
; $01C3F2
	clr.w	$A(a0)
; $01C3F6
	move.w	#$FFFF,$C(a0)
; $01C3FC
	move.l	#$0008626C,$E(a0)
; $01C404
	move.l	a1,$12(a0)
; $01C408
	move.b	#$5D,($FFFFA6DA).w
; $01C40E
	jsr	($018B2C).l
; $01C414
	movem.l	(a7)+,d5/d6/d7/a6/a7
; $01C418
	rts

loc_01C41A:				; $01C41A
	movem.l	a7/d7/d6,-(a7)
; $01C41E
	movea.l	a0,a1
; $01C420
	jsr	($01B9E0).l
; $01C426
	move.w	#$33D8,$0(a0)
; $01C42C
	addq.w	#1,($FF78F2).l
; $01C432
	clr.w	$2(a0)
; $01C436
	move.w	#$0005,$4(a0)
; $01C43C
	clr.w	$6(a0)
; $01C440
	move.l	a1,$12(a0)
; $01C444
	move.b	#$61,($FFFFA6DA).w
; $01C44A
	jsr	($018B2C).l
; $01C450
	movem.l	(a7)+,d6/d7/a7
; $01C454
	rts

loc_01C456:				; $01C456
	movem.l	a7/a6/a5/d7/d6/d5,-(a7)
; $01C45A
	movea.l	a0,a1
; $01C45C
	jsr	($01B9E0).l
; $01C462
	move.w	#$347C,$0(a0)
; $01C468
	addq.w	#1,($FF78F2).l
; $01C46E
	move.l	a1,$12(a0)
; $01C472
	move.w	$14(a1),$6(a0)
; $01C478
	moveq	#0,d1
; $01C47A
	move.w	#$013F,d2
; $01C47E
	tst.w	$A(a1)
; $01C482
	beq.w	loc_01C48C
; $01C486
	move.w	#$013F,d1
; $01C48A
	moveq	#0,d2

loc_01C48C:				; $01C48C
	move.w	d1,$2(a0)
; $01C490
	move.w	d2,$8(a0)
; $01C494
	move.w	$12(a1),d0
; $01C498
	move.w	$3E(a1),d1
; $01C49C
	lsr.w	#1,d1
; $01C49E
	sub.w	d1,d0
; $01C4A0
	move.w	d0,$4(a0)
; $01C4A4
	clr.w	$A(a0)
; $01C4A8
	move.w	#$0003,d2
; $01C4AC
	jsr	($0085A2).l
; $01C4B2
	addq.w	#8,d2
; $01C4B4
	move.w	d2,$C(a0)
; $01C4B8
	move.w	#$0002,d2
; $01C4BC
	jsr	($0085A2).l
; $01C4C2
	addq.w	#2,d2
; $01C4C4
	move.w	d2,$E(a0)
; $01C4C8
	clr.w	$10(a0)
; $01C4CC
	movem.l	(a7)+,d5/d6/d7/a5/a6/a7
; $01C4D0
	rts

loc_01C4D2:				; $01C4D2
	movem.l	a7/a5/d7/d6/d5,-(a7)
; $01C4D6
	movea.l	a0,a1
; $01C4D8
	jsr	($01B9E0).l
; $01C4DE
	move.w	#$35A6,$0(a0)
; $01C4E4
	addq.w	#1,($FF78F2).l
; $01C4EA
	clr.w	$A(a0)
; $01C4EE
	move.w	#$FFFF,$C(a0)
; $01C4F4
	move.l	#$000863A2,$E(a0)
; $01C4FC
	move.l	a1,$12(a0)
; $01C500
	move.w	#$0050,d2
; $01C504
	jsr	($0085A2).l
; $01C50A
	addi.w	#$0078,d2
; $01C50E
	move.w	d2,$2(a0)
; $01C512
	lea	($FF67BC).l,a2
; $01C518
	add.w	d2,d2
; $01C51A
	move.w	($0,a2,d2.w),$4(a0)
; $01C520
	move.w	#$0010,d2
; $01C524
	jsr	($0085A2).l
; $01C52A
	move.w	d2,$6(a0)
; $01C52E
	movem.l	(a7)+,d5/d6/d7/a5/a7
; $01C532
	rts

loc_01C534:				; $01C534
	movem.l	a7/a6/a5/a4/d7,-(a7)
; $01C538
	jsr	($01B9E0).l
; $01C53E
	move.w	#$36AE,$0(a0)
; $01C544
	addq.w	#1,($FF78F2).l
; $01C54A
	move.w	d1,$2(a0)
; $01C54E
	move.w	d2,$4(a0)
; $01C552
	asl.w	#4,d1
; $01C554
	move.w	d1,$E(a0)
; $01C558
	asl.w	#4,d2
; $01C55A
	move.w	d2,$10(a0)
; $01C55E
	moveq	#16,d2
; $01C560
	jsr	($0085A2).l
; $01C566
	subq.w	#8,d2
; $01C568
	asl.w	#8,d2
; $01C56A
	or.w	d2,d3
; $01C56C
	move.w	d3,$6(a0)
; $01C570
	moveq	#3,d2
; $01C572
	jsr	($0085A2).l
; $01C578
	move.w	d2,d1
; $01C57A
	addq.w	#2,d1
; $01C57C
	move.w	#$003C,d2
; $01C580
	jsr	($0085A2).l
; $01C586
	add.w	d2,d4
; $01C588
	move.w	d4,d2
; $01C58A
	bsr.w	loc_01A8C2
; $01C58E
	move.w	d1,$8(a0)
; $01C592
	move.w	d2,$A(a0)
; $01C596
	clr.w	$C(a0)
; $01C59A
	move.l	a1,$12(a0)
; $01C59E
	movem.l	(a7)+,d7/a4/a5/a6/a7
; $01C5A2
	rts

loc_01C5A4:				; $01C5A4
	nop
; $01C5A6
	nop
; $01C5A8
	nop
; $01C5AA
	nop
; $01C5AC
	nop
; $01C5AE
	nop
; $01C5B0
	nop
; $01C5B2
	nop
; $01C5B4
	nop
; $01C5B6
	nop
; $01C5B8
	nop
; $01C5BA
	nop
; $01C5BC
	bra.w	loc_01C5A4
; $01C5C0
	btst	d0,d1
; $01C5C2
	btst	d0,d1
; $01C5C4
	btst	d0,d1
; $01C5C6
	btst	d0,d1
; $01C5C8
	btst	d0,d1
; $01C5CA
	btst	d0,d1
; $01C5CC
	btst	d0,d0
; $01C5CE
	ori.b	#$00,d0
; $01C5D2
	ori.b	#$00,d0
; $01C5D6
	ori.b	#$00,d0
; $01C5DA
	ori.b	#$00,d0
; $01C5DE
	ori.b	#$00,d0
; $01C5E2
	ori.b	#$00,d0
; $01C5E6
	ori.b	#$00,d0
; $01C5EA
	ori.b	#$00,d0
; $01C5EE
	ori.b	#$00,d0
; $01C5F2
	ori.b	#$01,d1
; $01C5F6
	ori.b	#$38,d0
; $01C5FA
	dc.w	$A49C
; $01C5FC
	subq.w	#1,d1
; $01C5FE
	add.w	d1,d1
; $01C600
	add.w	d1,d1
; $01C602
	lea	($061C34).l,a0
; $01C608
	move.l	($0,a0,d1.w),d1
; $01C60C
	pea	d1
; $01C60E
	move.w	d1,d0
; $01C610
	movea.w	#$2000,a1
; $01C614
	jsr	($0099B2).l
; $01C61A
	rts

loc_01C61C:				; $01C61C
	addi.w	#$80E7,d0
; $01C620
	rts

loc_01C622:				; $01C622
	move.w	#$80DF,d0
; $01C626
	movea.w	#$2000,a1
; $01C62A
	jsr	($0099B2).l
; $01C630
	bra.w	loc_01C634

loc_01C634:				; $01C634
	move.w	#$80E6,d0
; $01C638
	movea.w	#$2A00,a1
; $01C63C
	jsr	($0099B2).l
; $01C642
	move.w	#$802E,d0
; $01C646
	movea.w	#$8000,a1
; $01C64A
	jmp	($0099B2).l
; $01C650
	rts
; $01C652
	move.b	#$00,($FFFF9FEA).w
; $01C658
	move.w	#$0450,d0
; $01C65C
	jsr	($00955C).l
; $01C662
	move.l	#$0005DF40,($FFFF95A2).w
; $01C66A
	move.w	#$0001,($FFFF95A6).w
; $01C670
	move.w	#$000F,($FFFF95A8).w
; $01C676
	move.l	#$0001C68A,($FFFF8004).w
; $01C67E
	move.l	#$00009334,d0
; $01C684
	jmp	($0085EE).l
; $01C68A
	move.w	#$0000,($FFFF816E).w
; $01C690
	jsr	($00942A).l
; $01C696
	move.w	#$0001,($FFFFAE92).l
; $01C69E
	move.w	#$0001,($FFFFA49E).w
; $01C6A4
	move.w	#$0001,($FFFFA4A2).w
; $01C6AA
	move.b	#$30,($FFFFA6DA).w
; $01C6B0
	clr.b	($FFFFA6DB).w
; $01C6B4
	jsr	($00FD7A).l
; $01C6BA
	move.l	#$0001C6C4,($FFFF8004).w
; $01C6C2
	rts
; $01C6C4
	jsr	($00C7F6).l
; $01C6CA
	move.w	#$001B,($FFFFA49C).w
; $01C6D0
	jsr	($009EC4).l
; $01C6D6
	jsr	($009172).l
; $01C6DC
	jsr	($009020).l
; $01C6E2
	jsr	($00C7B8).l
; $01C6E8
	jsr	($010C1E).l
; $01C6EE
	jsr	($00CC58).l
; $01C6F4
	jsr	($00F5A8).l
; $01C6FA
	lea	($FF4000).l,a0
; $01C700
	move.l	#$80008000,d1
; $01C706
	move.w	#$03FF,d0

loc_01C70A:				; $01C70A
	or.l	d1,(a0)+
; $01C70C
	dbf	d0,loc_01C70A
; $01C710
	move.w	#$000F,d4
; $01C714
	move.w	#$0011,d5
; $01C718
	jsr	($00A78C).l
; $01C71E
	move.b	#$00,($FFFFA6F8).w
; $01C724
	move.b	#$00,($FFFFA6F6).w
; $01C72A
	lea	($FFFF94A2).w,a1
; $01C72E
	lea	($082114).l,a2
; $01C734
	jsr	($009208).l
; $01C73A
	lea	($FFFF94A2).w,a2
; $01C73E
	jsr	($00A122).l
; $01C744
	move.l	#$FFFF94A2,($FFFF95A2).w
; $01C74C
	move.w	#$0003,($FFFF95A6).w
; $01C752
	move.w	#$000F,($FFFF95A8).w
; $01C758
	move.l	#$0001C76C,($FFFF8004).w
; $01C760
	move.l	#$00009334,d0
; $01C766
	jmp	($0085EE).l
; $01C76C
	clr.w	($FFFFD180).w

loc_01C770:				; $01C770
	addq.w	#1,($FFFFD180).w
; $01C774
	cmpi.w	#$D180,($000021).w
; $01C77A
	bcc.w	loc_01C7B8
; $01C77E
	cmpi.w	#$D180,($00001C).w
; $01C784
	bne.w	loc_01C7A0
; $01C788
	lea	($FFFFA4AA).w,a0
; $01C78C
	move.w	#$001A,d0

loc_01C790:				; $01C790
	tst.b	(a0)+
; $01C792
	beq.w	loc_01C7B8
; $01C796
	dbf	d0,loc_01C790
; $01C79A
	move.w	#$0020,($FFFFD180).w

loc_01C7A0:				; $01C7A0
	move.l	#$0001C7B4,($FFFF8004).w
; $01C7A8
	move.l	#$0002A8FA,d0
; $01C7AE
	jmp	($0085EE).l
; $01C7B4
	bra.w	loc_01C770

loc_01C7B8:				; $01C7B8
	move.w	#$0450,d0
; $01C7BC
	jsr	($00955C).l
; $01C7C2
	move.l	#$0005DF40,($FFFF95A2).w
; $01C7CA
	move.w	#$0003,($FFFF95A6).w
; $01C7D0
	move.w	#$000F,($FFFF95A8).w
; $01C7D6
	move.b	#$00,($FFFF9FEA).w
; $01C7DC
	move.l	#$0001C7F0,($FFFF8004).w
; $01C7E4
	move.l	#$00009334,d0
; $01C7EA
	jmp	($0085EE).l
; $01C7F0
	jsr	($00942A).l
; $01C7F6
	jsr	($00F5C6).l
; $01C7FC
	clr.w	($FFFFAE90).l
; $01C802