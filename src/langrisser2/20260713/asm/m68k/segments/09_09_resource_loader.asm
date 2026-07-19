; ==================================================================
; ★ 资源加载系统 (LZSS/RLE/位平面) ★
; ROM: $0097E0–$00FFF0 | Lines: 25580–39721
; Type: CODE
; ==================================================================
;
; ★★★ 资源加载完整实现 ★★★
; $99B2 通用入口 → $9A0E 指针对表 (ROM $0B0000, ×4) → $99FA 类型分发
; $99F0 跳转表: [1]→$9A38 RLE, [2]→$9C10 位平面, [3]→$9DFE ★LZSS
; LZSS 算法 ($9DFE-$9EC2): 窗口4096B@$FF0000 填充空格, flag LSB-first
;   match: offset=byte0|((byte1&0xF0)<<4), length=(byte1&0x0F)+2(2-17)
;

; $0097E0
	move.l	$2(a2),d3
; $0097E4
	move.l	d3,d0
; $0097E6
	pea	d0
; $0097E8
	moveq	#2,d6
; $0097EA
	move.w	d0,d7
; $0097EC
	addq.w	#3,d7

loc_0097EE:				; $0097EE
	add.w	d7,d7
; $0097F0
	move.w	d7,d4
; $0097F2
	move.w	d7,d5
; $0097F4
	mulu.w	d3,d5
; $0097F6
	movea.l	a1,a3
; $0097F8
	adda.w	d5,a3
; $0097FA
	subi.l	#$00010001,d3
; $009800
	clr.w	($FFFF9F1C).l
; $009806
	btst	#11,d1
; $00980A
	beq.w	loc_00981E
; $00980E
	move.w	d6,d5
; $009810
	pea	d3
; $009812
	mulu.w	d3,d5
; $009814
	pea	d3
; $009816
	add.w	d5,($FFFF9F1C).l
; $00981C
	neg.w	d6

loc_00981E:				; $00981E
	btst	#12,d1
; $009822
	beq.w	loc_009832
; $009826
	move.w	d7,d5
; $009828
	mulu.w	d3,d5
; $00982A
	add.w	d5,($FFFF9F1C).l
; $009830
	neg.w	d7

loc_009832:				; $009832
	cmpi.w	#$0002,(a2)
; $009836
	bne.w	loc_00983E
; $00983A
	exg	a6,a7
; $00983C
	pea	d3

loc_00983E:				; $00983E
	move.w	d6,($FFFF9F10).l
; $009844
	move.w	d7,($FFFF9F12).l
; $00984A
	move.l	d3,($FFFF9F14).l
; $009850
	move.w	d4,d7
; $009852
	move.w	d0,d3
; $009854
	pea	d0
; $009856
	subq.w	#1,d0
; $009858
	moveq	#0,d4
; $00985A
	move.w	d2,d5

loc_00985C:				; $00985C
	move.w	#$FFF8,($0,a1,d4.w)
; $009862
	move.w	d5,($2,a1,d4.w)
; $009866
	move.w	d3,($4,a1,d4.w)
; $00986A
	addi.w	#$0080,d5
; $00986E
	add.w	d7,d4
; $009870
	dbf	d0,loc_00985C
; $009874
	lea	$6(a2),a2
; $009878
	move.w	($FFFF9F1C).l,d7
; $00987E
	move.w	($FFFF9F10).l,d6
; $009884
	move.w	($FFFF9F16).l,d4
; $00988A
	clr.w	($FFFF9F1E).l
; $009890
	clr.w	($FFFF9F20).l
; $009896
	clr.b	($FFFF9F18).l
; $00989C
	moveq	#0,d2

loc_00989E:				; $00989E
	move.w	d7,d3
; $0098A0
	move.w	($FFFF9F14).l,d5

loc_0098A6:				; $0098A6
	bsr.w	loc_0098D6
; $0098AA
	add.w	d1,d0
; $0098AC
	eor.w	d2,d0
; $0098AE
	add.w	($FFFF9F1E).l,d0
; $0098B4
	add.w	($FFFF9F20).l,d0
; $0098BA
	move.w	d0,($6,a1,d3.w)
; $0098BE
	add.w	d6,d3
; $0098C0
	dbf	d5,loc_0098A6
; $0098C4
	add.w	($FFFF9F12).l,d7
; $0098CA
	dbf	d4,loc_00989E

loc_0098CE:				; $0098CE
	movea.l	a3,a1
; $0098D0
	movem.l	(a7)+,d4/d5/a0/a1/a2/a3/a4/a5/a6/a7
; $0098D4
	rts

loc_0098D6:				; $0098D6
	moveq	#0,d0
; $0098D8
	tst.b	($FFFF9F18).l
; $0098DE
	bne.w	loc_00997C
; $0098E2
	move.b	(a2)+,d0
; $0098E4
	cmpi.w	#$00FF,d0
; $0098E8
	beq.w	loc_009994
; $0098EC
	cmpi.w	#$00F7,d0
; $0098F0
	beq.w	loc_00991A
; $0098F4
	cmpi.w	#$00F8,d0
; $0098F8
	beq.w	loc_009920
; $0098FC
	cmpi.w	#$00F9,d0
; $009900
	beq.w	loc_00992A
; $009904
	cmpi.w	#$00FE,d0
; $009908
	beq.w	loc_00996A
; $00990C
	cmpi.w	#$00FA,d0
; $009910
	bne.w	loc_00993A
; $009914
	moveq	#0,d2
; $009916
	bra.w	loc_0098D6

loc_00991A:				; $00991A
	move.b	(a2)+,d0
; $00991C
	bra.w	loc_009992

loc_009920:				; $009920
	move.b	(a2)+,($FFFF9F1E).l
; $009926
	bra.w	loc_0098D6

loc_00992A:				; $00992A
	moveq	#0,d0
; $00992C
	move.b	(a2)+,d0
; $00992E
	ror.w	#3,d0
; $009930
	move.w	d0,($FFFF9F20).l
; $009936
	bra.w	loc_0098D6

loc_00993A:				; $00993A
	cmpi.w	#$00FB,d0
; $00993E
	bne.w	loc_00994A
; $009942
	move.w	#$0800,d2
; $009946
	bra.w	loc_0098D6

loc_00994A:				; $00994A
	cmpi.w	#$00FC,d0
; $00994E
	bne.w	loc_00995A
; $009952
	move.w	#$1000,d2
; $009956
	bra.w	loc_0098D6

loc_00995A:				; $00995A
	cmpi.w	#$00FD,d0
; $00995E
	bne.w	loc_009992
; $009962
	move.w	#$1800,d2
; $009966
	bra.w	loc_0098D6

loc_00996A:				; $00996A
	move.b	d0,($FFFF9F18).l
; $009970
	move.b	(a2)+,($FFFF9F1B).l
; $009976
	move.b	(a2)+,($FFFF9F1A).l

loc_00997C:				; $00997C
	move.b	($FFFF9F1A).l,d0
; $009982
	subq.b	#1,($FFFF9F1B).l
; $009988
	bne.w	loc_009992
; $00998C
	clr.b	($FFFF9F18).l

loc_009992:				; $009992
	rts

loc_009994:				; $009994
	move.l	(a7)+,d0
; $009996
	bra.w	loc_0098CE
; $00999A
	movem.l	a7/d7/d6,-(a7)

loc_00999E:				; $00999E
	move.w	(a0)+,d0
; $0099A0
	cmpi.w	#$FFFF,d0
; $0099A4
	beq.s	loc_0099AC
; $0099A6
	movea.l	(a0)+,a1
; $0099A8
	bsr.s	loc_0099B2
; $0099AA
	bra.s	loc_00999E

loc_0099AC:				; $0099AC
	movem.l	(a7)+,d6/d7/a7
; $0099B0
	rts

; ★ ═══ 资源加载 (通用加载 + DMA 传输) $99B2 ═══
; ★ 调用链: $9A0E(指针表查找) → $99FA(类型分发) → 解压到 $FF1000 → DMA→VRAM
loc_0099B2:				; $0099B2
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $0099B6
	move.w	d0,d2
; $0099B8
	bpl.s	loc_0099C2
; $0099BA
	move.l	a1,d1
; $0099BC
	lea	($FF1000).l,a1

loc_0099C2:				; $0099C2
	andi.w	#$7FFF,d0
; $0099C6
	bsr.s	loc_009A0E
; $0099C8
	bsr.s	loc_0099FA
; $0099CA
	tst.w	d2
; $0099CC
	bpl.s	loc_0099EA
; $0099CE
	movea.l	($FFFF81C4).w,a1
; $0099D2
	move.w	#$FFF9,(a1)+
; $0099D6
	move.w	d1,(a1)+
; $0099D8
	move.l	#$00FF1000,(a1)+
; $0099DE
	lsr.w	#1,d0
; $0099E0
	move.w	d0,(a1)+
; $0099E2
	move.l	a1,($FFFF81C4).w
; $0099E6
	bsr.w	loc_008A6C

loc_0099EA:				; $0099EA
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $0099EE
	rts
; $0099F0
	ori.b	#$20,($48,a0,d0.w)
; $0099F6
	subi.b	#$BA,a6

; ★ FUN_000099fa — 资源类型分发: RLE(0x01) / 位平面(0x02) / LZSS(0x03)
loc_0099FA:				; $0099FA
	move.l	a0,-(a7)
; $0099FC
	moveq	#0,d0
; $0099FE
	move.b	(a0)+,d0
; $009A00
	add.w	d0,d0
; $009A02
	move.w	(-$14,pc,d0.w),d0
; $009A06
	jsr	(-$18,pc,d0.w)
; $009A0A
	movea.l	(a7)+,a0
; $009A0C
	rts

; ★ FUN_00009a0e — 资源指针表查找 (ROM $0B0000, 2字节偏移)
loc_009A0E:				; $009A0E
	move.w	d0,-(a7)
; $009A10
	movea.l	#$000B0000,a0
; $009A16
	roxl.w	#2,d0
; $009A18
	movea.l	($0,a0,d0.w),a0
; $009A1C
	move.w	(a7)+,d0
; $009A1E
	rts
; $009A20
	move.b	(a0)+,d0
; $009A22
	asl.w	#8,d0
; $009A24
	move.b	(a0)+,d0
; $009A26
	movem.l	a7/d7/d6,-(a7)
; $009A2A
	subq.w	#1,d0

loc_009A2C:				; $009A2C
	move.b	(a0)+,(a1)+
; $009A2E
	dbf	d0,loc_009A2C
; $009A32
	movem.l	(a7)+,d6/d7/a7
; $009A36
	rts
; $009A38
	movem.l	a5/a4/a3/a2/a1/a0/d7/d6,-(a7)
; $009A3C
	move.b	(a0)+,d6
; $009A3E
	asl.w	#8,d6
; $009A40
	move.b	(a0)+,d6
; $009A42
	moveq	#0,d0
; $009A44
	moveq	#127,d3
; $009A46
	moveq	#0,d7
; $009A48
	moveq	#3,d2

loc_009A4A:				; $009A4A
	moveq	#0,d4
; $009A4C
	eori.b	#$01,d0
; $009A50
	beq.s	loc_009A58
; $009A52
	move.b	(a0),d4
; $009A54
	asr.b	#4,d4
; $009A56
	bra.s	loc_009A5E

loc_009A58:				; $009A58
	move.b	(a0)+,d4
; $009A5A
	andi.b	#$0F,d4

loc_009A5E:				; $009A5E
	cmp.b	d3,d4
; $009A60
	bne.s	loc_009A8C
; $009A62
	moveq	#0,d4
; $009A64
	eori.b	#$01,d0
; $009A68
	beq.s	loc_009A70
; $009A6A
	move.b	(a0),d4
; $009A6C
	asr.b	#4,d4
; $009A6E
	bra.s	loc_009A76

loc_009A70:				; $009A70
	move.b	(a0)+,d4
; $009A72
	andi.b	#$0F,d4

loc_009A76:				; $009A76
	asl.w	#4,d5
; $009A78
	or.b	d3,d5
; $009A7A
	dbf	d2,loc_009A84
; $009A7E
	moveq	#3,d2
; $009A80
	move.w	d5,(a1)+
; $009A82
	addq.w	#2,d7

loc_009A84:				; $009A84
	dbf	d4,loc_009A76
; $009A88
	move.w	d3,d4
; $009A8A
	bra.s	loc_009A9E

loc_009A8C:				; $009A8C
	move.b	d4,d3
; $009A8E
	asl.w	#4,d5
; $009A90
	or.b	d3,d5
; $009A92
	dbf	d2,loc_009A9E
; $009A96
	moveq	#3,d2
; $009A98
	or.b	d3,d5
; $009A9A
	move.w	d5,(a1)+
; $009A9C
	addq.w	#2,d7

loc_009A9E:				; $009A9E
	cmp.w	d6,d7
; $009AA0
	bcs.s	loc_009A4A
; $009AA2
	move.w	d7,d0
; $009AA4
	movem.l	(a7)+,d6/d7/a0/a1/a2/a3/a4/a5
; $009AA8
	rts
; $009AAA
	movem.l	a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $009AAE
	movea.l	a1,a6
; $009AB0
	lea	($FF0000).l,a3
; $009AB6
	moveq	#0,d0
; $009AB8
	move.b	(a0)+,d0
; $009ABA
	negx.?	-(a7)
; $009ABC
	andi.w	#$007F,d0
; $009AC0
	move.w	d0,d4
; $009AC2
	subq.w	#1,d4
; $009AC4
	neg.?	(a7)+
; $009AC6
	bpl.s	loc_009AD0
; $009AC8
	bsr.w	loc_009B3C
; $009ACC
	bra.w	loc_009B36

loc_009AD0:				; $009AD0
	move.b	(a0)+,d5
; $009AD2
	asl.w	#8,d5
; $009AD4
	move.b	(a0)+,d5
; $009AD6
	lea	($0,a0,d5.w),a1
; $009ADA
	movea.l	a1,a2
; $009ADC
	move.w	d5,d6
; $009ADE
	mulu.w	d0,d6
; $009AE0
	rol.w	#3,d6
; $009AE2
	move.w	d6,-(a7)
; $009AE4
	move.w	d0,d5
; $009AE6
	cmpi.w	#$0002,d5
; $009AEA
	beq.s	loc_009AF0
; $009AEC
	eori.w	#$0005,d5

loc_009AF0:				; $009AF0
	subq.w	#1,d5

loc_009AF2:				; $009AF2
	move.w	d5,d1
; $009AF4
	movea.l	a3,a4

loc_009AF6:				; $009AF6
	move.b	(a0)+,d6
; $009AF8
	moveq	#7,d2

loc_009AFA:				; $009AFA
	move.w	d4,d3
; $009AFC
	lsl.b	#1,d6
; $009AFE
	bcc.s	loc_009B10

loc_009B00:				; $009B00
	move.b	(a1)+,(a4)+
; $009B02
	dbf	d3,loc_009B00
; $009B06
	dbf	d2,loc_009AFA
; $009B0A
	dbf	d1,loc_009AF6
; $009B0E
	bra.s	loc_009B1E

loc_009B10:				; $009B10
	clr.b	(a4)+
; $009B12
	dbf	d3,loc_009B10
; $009B16
	dbf	d2,loc_009AFA
; $009B1A
	dbf	d1,loc_009AF6

loc_009B1E:				; $009B1E
	movea.l	a3,a4
; $009B20
	move.w	#$000F,d2

loc_009B24:				; $009B24
	move.b	(a4)+,(a6)+
; $009B26
	move.b	$F(a4),(a6)+
; $009B2A
	dbf	d2,loc_009B24
; $009B2E
	cmpa.l	a2,a0
; $009B30
	bcs.w	loc_009AF2
; $009B34
	move.w	(a7)+,d0

loc_009B36:				; $009B36
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6
; $009B3A
	rts

loc_009B3C:				; $009B3C
	lea	($FF0FF0).l,a5
; $009B42
	move.w	#$0007,d5

loc_009B46:				; $009B46
	move.b	(a0),d1
; $009B48
	asr.b	#4,d1
; $009B4A
	move.b	d1,(a5)+
; $009B4C
	move.b	(a0)+,d1
; $009B4E
	andi.b	#$0F,d1
; $009B52
	move.b	d1,(a5)+
; $009B54
	dbf	d5,loc_009B46
; $009B58
	lea	($FF0FF0).l,a5
; $009B5E
	move.b	(a0)+,d5
; $009B60
	asl.w	#8,d5
; $009B62
	move.b	(a0)+,d5
; $009B64
	lea	($0,a0,d5.w),a1
; $009B68
	movea.l	a1,a2
; $009B6A
	move.w	d5,d6
; $009B6C
	mulu.w	d0,d6
; $009B6E
	rol.w	#3,d6
; $009B70
	move.w	d6,-(a7)
; $009B72
	move.w	d0,d5
; $009B74
	cmpi.w	#$0002,d5
; $009B78
	beq.s	loc_009B7E
; $009B7A
	eori.w	#$0005,d5

loc_009B7E:				; $009B7E
	subq.w	#1,d5

loc_009B80:				; $009B80
	move.w	d5,d1
; $009B82
	movea.l	a3,a4

loc_009B84:				; $009B84
	move.b	(a0)+,d6
; $009B86
	moveq	#7,d2

loc_009B88:				; $009B88
	move.w	d4,d3
; $009B8A
	lsl.b	#1,d6
; $009B8C
	bcc.s	loc_009B9E

loc_009B8E:				; $009B8E
	move.b	(a1)+,(a4)+
; $009B90
	dbf	d3,loc_009B8E
; $009B94
	dbf	d2,loc_009B88
; $009B98
	dbf	d1,loc_009B84
; $009B9C
	bra.s	loc_009BAC

loc_009B9E:				; $009B9E
	clr.b	(a4)+
; $009BA0
	dbf	d3,loc_009B9E
; $009BA4
	dbf	d2,loc_009B88
; $009BA8
	dbf	d1,loc_009B84

loc_009BAC:				; $009BAC
	movea.l	a3,a4
; $009BAE
	moveq	#3,d2

loc_009BB0:				; $009BB0
	move.w	#$000F,d1
; $009BB4
	clr.w	d3
; $009BB6
	lsl.w	$18(a4)
; $009BBA
	lsl.w	#1,d3
; $009BBC
	lsl.w	$8(a4)
; $009BC0
	lsl.w	#1,d3
; $009BC2
	lsl.w	$10(a4)
; $009BC6
	lsl.w	#1,d3
; $009BC8
	lsl.w	$0(a4)
; $009BCC
	lsl.w	#1,d3

loc_009BCE:				; $009BCE
	move.b	($0,a5,d3.w),d3
; $009BD2
	lsr.w	#1,d3
; $009BD4
	roxl.w	$0(a4)
; $009BD8
	lsr.b	#1,d3
; $009BDA
	roxl.w	$10(a4)
; $009BDE
	lsr.b	#1,d3
; $009BE0
	roxl.w	$8(a4)
; $009BE4
	lsr.b	#1,d3
; $009BE6
	roxl.w	$18(a4)
; $009BEA
	lsr.b	#5,d3
; $009BEC
	dbf	d1,loc_009BCE
; $009BF0
	addq.w	#2,a4
; $009BF2
	dbf	d2,loc_009BB0
; $009BF6
	movea.l	a3,a4
; $009BF8
	move.w	#$000F,d2

loc_009BFC:				; $009BFC
	move.b	(a4)+,(a6)+
; $009BFE
	move.b	$F(a4),(a6)+
; $009C02
	dbf	d2,loc_009BFC
; $009C06
	cmpa.l	a2,a0
; $009C08
	bcs.w	loc_009B80
; $009C0C
	move.w	(a7)+,d0
; $009C0E
	rts
; $009C10
	movem.l	a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $009C14
	movea.l	a1,a6
; $009C16
	lea	($FF0000).l,a3
; $009C1C
	moveq	#0,d0
; $009C1E
	move.b	(a0)+,d0
; $009C20
	negx.?	-(a7)
; $009C22
	andi.w	#$007F,d0
; $009C26
	move.w	d0,d4
; $009C28
	subq.w	#1,d4
; $009C2A
	neg.?	(a7)+
; $009C2C
	bpl.s	loc_009C36
; $009C2E
	bsr.w	loc_009CFC
; $009C32
	bra.w	loc_009CF6

loc_009C36:				; $009C36
	move.b	(a0)+,d5
; $009C38
	asl.w	#8,d5
; $009C3A
	move.b	(a0)+,d5
; $009C3C
	lea	($0,a0,d5.w),a1
; $009C40
	movea.l	a1,a2
; $009C42
	move.w	d5,d6
; $009C44
	mulu.w	d0,d6
; $009C46
	rol.w	#3,d6
; $009C48
	move.w	d6,-(a7)
; $009C4A
	move.w	d0,d5
; $009C4C
	cmpi.w	#$0002,d5
; $009C50
	beq.s	loc_009C56
; $009C52
	eori.w	#$0005,d5

loc_009C56:				; $009C56
	subq.w	#1,d5

loc_009C58:				; $009C58
	move.w	d5,d1
; $009C5A
	movea.l	a3,a4

loc_009C5C:				; $009C5C
	move.b	(a0)+,d6
; $009C5E
	moveq	#7,d2

loc_009C60:				; $009C60
	move.w	d4,d3
; $009C62
	lsl.b	#1,d6
; $009C64
	bcc.s	loc_009C76

loc_009C66:				; $009C66
	move.b	(a1)+,(a4)+
; $009C68
	dbf	d3,loc_009C66
; $009C6C
	dbf	d2,loc_009C60
; $009C70
	dbf	d1,loc_009C5C
; $009C74
	bra.s	loc_009C84

loc_009C76:				; $009C76
	clr.b	(a4)+
; $009C78
	dbf	d3,loc_009C76
; $009C7C
	dbf	d2,loc_009C60
; $009C80
	dbf	d1,loc_009C5C

loc_009C84:				; $009C84
	movea.l	a3,a4
; $009C86
	moveq	#3,d2

loc_009C88:				; $009C88
	moveq	#3,d1

loc_009C8A:				; $009C8A
	asl.w	$18(a4)
; $009C8E
	lsl.w	#1,d3
; $009C90
	asl.w	$8(a4)
; $009C94
	lsl.w	#1,d3
; $009C96
	asl.w	$10(a4)
; $009C9A
	lsl.w	#1,d3
; $009C9C
	asl.w	(a4)
; $009C9E
	lsl.w	#1,d3
; $009CA0
	asl.w	$18(a4)
; $009CA4
	lsl.w	#1,d3
; $009CA6
	asl.w	$8(a4)
; $009CAA
	lsl.w	#1,d3
; $009CAC
	asl.w	$10(a4)
; $009CB0
	lsl.w	#1,d3
; $009CB2
	asl.w	(a4)
; $009CB4
	lsl.w	#1,d3
; $009CB6
	asl.w	$18(a4)
; $009CBA
	lsl.w	#1,d3
; $009CBC
	asl.w	$8(a4)
; $009CC0
	lsl.w	#1,d3
; $009CC2
	asl.w	$10(a4)
; $009CC6
	lsl.w	#1,d3
; $009CC8
	asl.w	(a4)
; $009CCA
	lsl.w	#1,d3
; $009CCC
	asl.w	$18(a4)
; $009CD0
	lsl.w	#1,d3
; $009CD2
	asl.w	$8(a4)
; $009CD6
	lsl.w	#1,d3
; $009CD8
	asl.w	$10(a4)
; $009CDC
	lsl.w	#1,d3
; $009CDE
	asl.w	(a4)
; $009CE0
	lsl.w	#1,d3
; $009CE2
	move.w	d3,(a6)+
; $009CE4
	dbf	d1,loc_009C8A
; $009CE8
	addq.w	#2,a4
; $009CEA
	dbf	d2,loc_009C88
; $009CEE
	cmpa.l	a2,a0
; $009CF0
	bcs.w	loc_009C58
; $009CF4
	move.w	(a7)+,d0

loc_009CF6:				; $009CF6
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6
; $009CFA
	rts

loc_009CFC:				; $009CFC
	lea	($FF0FF0).l,a5
; $009D02
	move.w	#$0007,d5

loc_009D06:				; $009D06
	move.b	(a0),d1
; $009D08
	asr.b	#4,d1
; $009D0A
	move.b	d1,(a5)+
; $009D0C
	move.b	(a0)+,d1
; $009D0E
	andi.b	#$0F,d1
; $009D12
	move.b	d1,(a5)+
; $009D14
	dbf	d5,loc_009D06
; $009D18
	lea	($FF0FF0).l,a5
; $009D1E
	move.b	(a0)+,d5
; $009D20
	asl.w	#8,d5
; $009D22
	move.b	(a0)+,d5
; $009D24
	lea	($0,a0,d5.w),a1
; $009D28
	movea.l	a1,a2
; $009D2A
	move.w	d5,d6
; $009D2C
	mulu.w	d0,d6
; $009D2E
	rol.w	#3,d6
; $009D30
	move.w	d6,-(a7)
; $009D32
	move.w	d0,d5
; $009D34
	cmpi.w	#$0002,d5
; $009D38
	beq.s	loc_009D3E
; $009D3A
	eori.w	#$0005,d5

loc_009D3E:				; $009D3E
	subq.w	#1,d5

loc_009D40:				; $009D40
	move.w	d5,d1
; $009D42
	movea.l	a3,a4

loc_009D44:				; $009D44
	move.b	(a0)+,d6
; $009D46
	moveq	#7,d2

loc_009D48:				; $009D48
	move.w	d4,d3
; $009D4A
	lsl.b	#1,d6
; $009D4C
	bcc.s	loc_009D5E

loc_009D4E:				; $009D4E
	move.b	(a1)+,(a4)+
; $009D50
	dbf	d3,loc_009D4E
; $009D54
	dbf	d2,loc_009D48
; $009D58
	dbf	d1,loc_009D44
; $009D5C
	bra.s	loc_009D6C

loc_009D5E:				; $009D5E
	clr.b	(a4)+
; $009D60
	dbf	d3,loc_009D5E
; $009D64
	dbf	d2,loc_009D48
; $009D68
	dbf	d1,loc_009D44

loc_009D6C:				; $009D6C
	movea.l	a3,a4
; $009D6E
	moveq	#3,d2

loc_009D70:				; $009D70
	moveq	#3,d1

loc_009D72:				; $009D72
	clr.w	d3
; $009D74
	asl.w	$18(a4)
; $009D78
	lsl.w	#1,d3
; $009D7A
	asl.w	$8(a4)
; $009D7E
	lsl.w	#1,d3
; $009D80
	asl.w	$10(a4)
; $009D84
	lsl.w	#1,d3
; $009D86
	asl.w	(a4)
; $009D88
	lsl.w	#1,d3
; $009D8A
	move.b	($0,a5,d3.w),d7
; $009D8E
	asl.w	#4,d7
; $009D90
	clr.w	d3
; $009D92
	asl.w	$18(a4)
; $009D96
	lsl.w	#1,d3
; $009D98
	asl.w	$8(a4)
; $009D9C
	lsl.w	#1,d3
; $009D9E
	asl.w	$10(a4)
; $009DA2
	lsl.w	#1,d3
; $009DA4
	asl.w	(a4)
; $009DA6
	lsl.w	#1,d3
; $009DA8
	or.b	($0,a5,d3.w),d7
; $009DAC
	asl.w	#4,d7
; $009DAE
	clr.w	d3
; $009DB0
	asl.w	$18(a4)
; $009DB4
	lsl.w	#1,d3
; $009DB6
	asl.w	$8(a4)
; $009DBA
	lsl.w	#1,d3
; $009DBC
	asl.w	$10(a4)
; $009DC0
	lsl.w	#1,d3
; $009DC2
	asl.w	(a4)
; $009DC4
	lsl.w	#1,d3
; $009DC6
	or.b	($0,a5,d3.w),d7
; $009DCA
	asl.w	#4,d7
; $009DCC
	clr.w	d3
; $009DCE
	asl.w	$18(a4)
; $009DD2
	lsl.w	#1,d3
; $009DD4
	asl.w	$8(a4)
; $009DD8
	lsl.w	#1,d3
; $009DDA
	asl.w	$10(a4)
; $009DDE
	lsl.w	#1,d3
; $009DE0
	asl.w	(a4)
; $009DE2
	lsl.w	#1,d3
; $009DE4
	or.b	($0,a5,d3.w),d7
; $009DE8
	move.w	d7,(a6)+
; $009DEA
	dbf	d1,loc_009D72
; $009DEE
	addq.w	#2,a4
; $009DF0
	dbf	d2,loc_009D70
; $009DF4
	cmpa.l	a2,a0
; $009DF6
	bcs.w	loc_009D40
; $009DFA
	move.w	(a7)+,d0
; $009DFC
	rts
; ★ ═══ $009DFE: LZSS 解压函数 (资源类型 0x03) ═══
; ★ 入口: a0=源数据指针(已跳过type字节), a1=目标缓冲区
; ★ 格式: [outSize:2B big-endian] [compressed stream]
; ★ 滑动窗口: 4096B @ $FF0000; flag byte LSB-first
; ★ literal: 直接字节 → 写入窗口+输出
; ★ match: offset(12bit) + length(3-18) → 从窗口复制
; ★ offset=0 → 结束标志
; $009DFE
	movem.l	a6/a5/a4/a3/a2/a1/a0/d7/d6/d5,-(a7)
; $009E02: 保存目标指针
	movea.l	a1,a2
; $009E04: 读取输出大小 (2B big-endian)
	move.b	(a0)+,d7
; $009E06
	asl.w	#8,d7
; $009E08
	move.b	(a0)+,d7
; $009E0A: d7 = outSize (剩余字节计数)
	move.w	d7,-(a7)
; $009E0C: 滑动窗口起始地址 = $FF0000
	lea	($FF0000).l,a2
; $009E12: 256次循环 × 16B = 4096B 窗口初始化
	move.w	#$00FF,d6
; $009E16: 用空格 $20 填充整个滑动窗口
	move.l	#$20202020,d3

; ── 滑动窗口初始化循环: 填充 4096B ($20202020) ──
loc_009E1C:				; $009E1C
	move.l	d3,(a2)+
; $009E1E
	move.l	d3,(a2)+
; $009E20
	move.l	d3,(a2)+
; $009E22
	move.l	d3,(a2)+
; $009E24
	dbf	d6,loc_009E1C
; ── 初始化完成, 开始主解压循环 ──
; $009E28: a2=destPtr(输出指针)
	movea.l	a1,a2
; $009E2A: a1=窗口基址 $FF0000
	lea	($FF0000).l,a1
; $009E30: d6=窗口写入位置 $0FEE (4078)
	move.w	#$0FEE,d6
; $009E34: d3=前一个literal字节(高16位=已输出字数)
	moveq	#0,d3

; ═══ 主解压循环 ═══
; ── 读取 flag byte ──
loc_009E36:				; $009E36
	move.b	(a0)+,d5	; d5=flag byte (8个标志位)
; $009E38
	moveq	#7,d4		; 处理8个标志位 (0-7)

; ── flag bit 处理循环 ──
loc_009E3A:				; $009E3A
	lsr.b	#1,d5		; 右移取出最低位 → C flag
; $009E3C
	bcc.s	loc_009E6A	; C=0 → 压缩匹配(match); C=1 → 直接字节(literal)

; ═ 直接字节(literal)分支 ═
; $009E3E
	moveq	#0,d0
; $009E40: 读取一个文本字节
	move.b	(a0)+,d0
; $009E42: 存入滑动窗口 @ ($FF0000 + d6)
	move.b	d0,($0,a1,d6.w)
; $009E46: 输出计数 +1
	addq.w	#1,d3
; $009E48
	pea	d3
; $009E4A: 检查是否累积了2个字节(高8位有数据)
	btst	#16,d3		; bit 16=1 表示已有前字节
; $009E4E
	bne.s	loc_009E56	; 已有前字节 → 配对输出word
; $009E50: 存为高字节, 等待下一个
	asl.w	#8,d3
; $009E52
	or.w	d3,d0		; d0的高8位=前字节
; $009E54: 输出完整word到目标
	move.w	d0,(a2)+

loc_009E56:				; $009E56
	move.b	d0,d3		; 保存当前字节到d3
; $009E58
	pea	d3
; $009E5A: 窗口写入指针 +1, 保持在 0-4095
	addq.w	#1,d6
; $009E5C
	andi.w	#$0FFF,d6	; mod 4096
; $009E60: 剩余输出大小 -1
	subq.w	#1,d7
; $009E62: outSize耗尽 → 解压完成
	beq.s	loc_009EBC
; $009E64: 继续下一位标志
	dbf	d4,loc_009E3A
; $009E68: flag byte用完, 读取新flag byte
	bra.s	loc_009E36

; ═ 压缩匹配(match)分支 ═
; ★ 读取2B: [oooo|oooo ooool|llll] → offset(12bit) + length(3-18)
loc_009E6A:				; $009E6A
	moveq	#0,d0
; $009E6C
	moveq	#0,d1
; $009E6E: 读offset高8位
	move.b	(a0)+,d0
; $009E70: 读offset低4位 + length高4位
	move.b	(a0)+,d1
; $009E72
	move.b	d1,d2
; $009E74
	andi.w	#$000F,d2
; $009E78
	addq.w	#2,d2
; $009E7A
	asl.w	#4,d1
; $009E7C
	andi.w	#$0F00,d1
; $009E80
	or.w	d0,d1

loc_009E82:				; $009E82
	moveq	#0,d0
; $009E84
	move.b	($0,a1,d1.w),d0
; $009E88
	move.b	d0,($0,a1,d6.w)
; $009E8C
	addq.w	#1,d3
; $009E8E
	pea	d3
; $009E90
	btst	#16,d3
; $009E94
	bne.s	loc_009E9C
; $009E96
	asl.w	#8,d3
; $009E98
	or.w	d3,d0
; $009E9A
	move.w	d0,(a2)+

loc_009E9C:				; $009E9C
	move.b	d0,d3
; $009E9E
	pea	d3
; $009EA0
	addq.w	#1,d1
; $009EA2
	andi.w	#$0FFF,d1
; $009EA6
	addq.w	#1,d6
; $009EA8
	andi.w	#$0FFF,d6
; $009EAC
	subq.w	#1,d7
; $009EAE
	beq.s	loc_009EBC
; $009EB0
	dbf	d2,loc_009E82
; $009EB4
	dbf	d4,loc_009E3A
; $009EB8
	bra.w	loc_009E36

loc_009EBC:				; $009EBC
	move.w	(a7)+,d0
; $009EBE
	movem.l	(a7)+,d5/d6/d7/a0/a1/a2/a3/a4/a5/a6
; $009EC2
	rts

loc_009EC4:				; $009EC4
	movem.l	a7/a6/a5/d7/d6/d5,-(a7)
; $009EC8
	move.w	($FFFFA49C).w,d0
; $009ECC
	subq.w	#1,d0
; $009ECE
	add.w	d0,d0
; $009ED0
	add.w	d0,d0
; $009ED2
	lea	($061CB0).l,a1
; $009ED8
	movea.l	($0,a1,d0.w),a1
; $009EDC
	move.w	(a1)+,($FFFF9F2C).l
; $009EE2
	move.w	(a1)+,($FFFF9F2E).l
; $009EE8
	tst.w	($FF78FA).l
; $009EEE
	beq.w	loc_009F12
; $009EF2
	lea	($FF3000).l,a0
; $009EF8
	move.w	($FFFF9F2C).l,d1
; $009EFE
	mulu.w	($FFFF9F2E).l,d1
; $009F04
	subq.w	#1,d1
; $009F06
	move.w	d1,d2

loc_009F08:				; $009F08
	move.b	(a1)+,d0
; $009F0A
	move.b	d0,(a0)+
; $009F0C
	move.b	d0,(a0)+
; $009F0E
	dbf	d1,loc_009F08

loc_009F12:				; $009F12
	move.w	($FFFFA49C).w,d0
; $009F16
	subq.w	#1,d0
; $009F18
	add.w	d0,d0
; $009F1A
	add.w	d0,d0
; $009F1C
	move.w	d0,d1
; $009F1E
	add.w	d0,d0
; $009F20
	lea	($061E24).l,a1
; $009F26
	move.l	($0,a1,d0.w),($FFFF9F54).l
; $009F2E
	move.l	($4,a1,d0.w),($FFFF9F58).l
; $009F36
	lea	($061D2C).l,a1
; $009F3C
	move.l	($0,a1,d0.w),($FFFF9F4C).l
; $009F44
	move.l	($4,a1,d0.w),($FFFF9F50).l
; $009F4C
	lea	($082142).l,a1
; $009F52
	move.w	d1,d0
; $009F54
	move.l	($0,a1,d0.w),($FFFF9FF6).l
; $009F5C
	tst.w	($FF78FA).l
; $009F62
	beq.w	loc_009F9A
; $009F66
	movea.l	($FFFF9F54).l,a1
; $009F6C
	movea.l	($FFFF9F58).l,a2
; $009F72
	lea	($FF3000).l,a0

loc_009F78:				; $009F78
	move.w	(a0),d0
; $009F7A
	add.w	d0,d0
; $009F7C
	bcs.w	loc_009F8C
; $009F80
	andi.w	#$00FF,d0
; $009F84
	move.b	($0,a1,d0.w),(a0)
; $009F88
	bra.w	loc_009F94

loc_009F8C:				; $009F8C
	andi.w	#$00FF,d0
; $009F90
	move.b	($0,a2,d0.w),(a0)

loc_009F94:				; $009F94
	addq.w	#2,a0
; $009F96
	dbf	d2,loc_009F78

loc_009F9A:				; $009F9A
	clr.w	($FFFF9F24).l
; $009FA0
	clr.w	($FFFF9F26).l
; $009FA6
	bsr.w	loc_00C7B8
; $009FAA
	lea	($FF4000).l,a0
; $009FB0
	move.w	#$03FF,d1
; $009FB4
	moveq	#0,d2

loc_009FB6:				; $009FB6
	move.l	d2,(a0)+
; $009FB8
	dbf	d1,loc_009FB6
; $009FBC
	movem.l	(a7)+,d5/d6/d7/a5/a6/a7
; $009FC0
	rts

loc_009FC2:				; $009FC2
	movem.l	a6/a5/d7/d6/d5,-(a7)
; $009FC6
	move.w	($FFFFA49C).w,d1
; $009FCA
	subq.w	#1,d1
; $009FCC
	add.w	d1,d1
; $009FCE
	add.w	d1,d1
; $009FD0
	lea	($061C34).l,a0
; $009FD6
	move.l	($0,a0,d1.w),d1
; $009FDA
	move.w	d1,d0
; $009FDC
	movea.w	#$4000,a1
; $009FE0
	bsr.w	loc_0099B2
; $009FE4
	pea	d1
; $009FE6
	move.w	d1,d0
; $009FE8
	movea.w	#$2000,a1
; $009FEC
	bsr.w	loc_0099B2
; $009FF0
	bsr.w	loc_009FFE
; $009FF4
	bsr.w	loc_00A0AC
; $009FF8
	movem.l	(a7)+,d5/d6/d7/a5/a6
; $009FFC
	rts

loc_009FFE:				; $009FFE
	movem.l	a7/d7,-(a7)
; $00A002
	cmpi.w	#$A49C,($00000B).w
; $00A008
	beq.w	loc_00A026
; $00A00C
	cmpi.w	#$A49C,($00000C).w
; $00A012
	beq.w	loc_00A032
; $00A016
	cmpi.w	#$A49C,($000017).w
; $00A01C
	beq.w	loc_00A032
; $00A020
	moveq	#-1,d0
; $00A022
	bra.w	loc_00A03A

loc_00A026:				; $00A026
	lea	($080674).l,a0
; $00A02C
	moveq	#1,d0
; $00A02E
	bra.w	loc_00A03A

loc_00A032:				; $00A032
	lea	($080328).l,a0
; $00A038
	moveq	#0,d0

loc_00A03A:				; $00A03A
	move.l	a0,($FFFF9FFC).l
; $00A040
	move.b	d0,($FFFFA000).l
; $00A046
	moveq	#0,d1
; $00A048
	bsr.w	loc_00A052
; $00A04C
	movem.l	(a7)+,d7/a7
; $00A050
	rts

; ★ FUN_0000a052 — 精灵数据加载
loc_00A052:				; $00A052
	movem.l	a7/a6/a5/d7/d6,-(a7)
; $00A056
	movea.l	($FFFF9FFC).l,a0
; $00A05C
	move.b	($FFFFA000).l,d0
; $00A062
	cmpi.b	#$FF,d0
; $00A066
	beq.w	loc_00A0A6
; $00A06A
	asl.w	#8,d0
; $00A06C
	add.w	d1,d1
; $00A06E
	add.w	d1,d1
; $00A070
	addq.w	#4,d1
; $00A072
	movea.l	($0,a0,d1.w),a0
; $00A076
	movea.l	($FFFF81C4).w,a1
; $00A07A
	move.w	#$2000,d2

loc_00A07E:				; $00A07E
	move.w	(a0)+,d1
; $00A080
	cmpi.w	#$FFFF,d1
; $00A084
	beq.w	loc_00A0A2
; $00A088
	add.w	d0,d1
; $00A08A
	lsl.w	#5,d1
; $00A08C
	add.w	d2,d1
; $00A08E
	move.w	#$FFF9,(a1)+
; $00A092
	move.w	d1,(a1)+
; $00A094
	move.l	a0,(a1)+
; $00A096
	move.w	#$0010,(a1)+
; $00A09A
	adda.w	#$0020,a0
; $00A09E
	bra.w	loc_00A07E

loc_00A0A2:				; $00A0A2
	move.l	a1,($FFFF81C4).w

loc_00A0A6:				; $00A0A6
	movem.l	(a7)+,d6/d7/a5/a6/a7
; $00A0AA
	rts

loc_00A0AC:				; $00A0AC
	movem.l	a7/a6/d7/d6,-(a7)
; $00A0B0
	move.b	#$00,($FFFF9FFB).l
; $00A0B8
	moveq	#0,d0
; $00A0BA
	moveq	#3,d1
; $00A0BC
	lea	($FFFF9FF6).l,a0

loc_00A0C2:				; $00A0C2
	tst.b	(a0)+
; $00A0C4
	beq.w	loc_00A0CE
; $00A0C8
	addq.w	#1,d0
; $00A0CA
	dbf	d1,loc_00A0C2

loc_00A0CE:				; $00A0CE
	move.b	d0,($FFFF9FFA).l
; $00A0D4
	jsr	($0094DC).l
; $00A0DA
	move.w	#$04AC,$0(a0)
; $00A0E0
	clr.w	$2(a0)
; $00A0E4
	move.w	#$000A,$4(a0)
; $00A0EA
	move.w	#$0000,$6(a0)
; $00A0F0
	move.b	($FFFF9FFA).l,$8(a0)
; $00A0F8
	cmpi.w	#$A000,($FFFFFFFF).l
; $00A100
	beq.w	loc_00A114
; $00A104
	movea.l	($FFFF9FFC).l,a1
; $00A10A
	move.w	(a1),$A(a0)
; $00A10E
	move.w	#$0000,$C(a0)

loc_00A114:				; $00A114
	move.b	#$01,($FFFF9FFB).l
; $00A11C
	movem.l	(a7)+,d6/d7/a6/a7
; $00A120
	rts

loc_00A122:				; $00A122
	movem.l	a7/d7/d6/d5,-(a7)
; $00A126
	move.w	($FFFFA49C).w,d0
; $00A12A
	subq.w	#1,d0
; $00A12C
	add.w	d0,d0
; $00A12E
	add.w	d0,d0
; $00A130
	lea	($0821BE).l,a1
; $00A136
	movea.l	($0,a1,d0.w),a1
; $00A13A
	lea	($FFFF9F62).l,a0
; $00A140
	move.w	#$001F,d0

loc_00A144:				; $00A144
	move.l	(a1)+,(a0)+
; $00A146
	dbf	d0,loc_00A144
; $00A14A
	lea	($FFFF9F62).l,a1
; $00A150
	lea	$40(a2),a2
; $00A154
	jsr	($0091B6).l
; $00A15A
	lea	$20(a2),a2
; $00A15E
	jsr	($0091B6).l
; $00A164
	movem.l	(a7)+,d5/d6/d7/a7
; $00A168
	rts

loc_00A16A:				; $00A16A
	movem.l	a7/d7/d6,-(a7)
; $00A16E
	move.w	#$0450,d0
; $00A172
	bsr.w	loc_00955C
; $00A176
	move.w	#$0588,d0
; $00A17A
	bsr.w	loc_00955C
; $00A17E
	jsr	($0094DC).l
; $00A184
	move.w	#$0588,$0(a0)
; $00A18A
	clr.w	$2(a0)
; $00A18E
	move.l	#$FFFF9F62,$4(a0)
; $00A196
	move.l	#$FFFF9F62,$8(a0)
; $00A19E
	move.w	($FFFF9FE4).l,$C(a0)
; $00A1A6
	moveq	#0,d0
; $00A1A8
	move.w	($FFFF9FE4).l,d0
; $00A1AE
	lea	($05E5D8).l,a1
; $00A1B4
	add.w	d0,d0
; $00A1B6
	add.w	d0,d0
; $00A1B8
	movea.l	($0,a1,d0.w),a1
; $00A1BC
	cmpi.b	#$20,$1(a1)
; $00A1C2
	beq.w	loc_00A1E0
; $00A1C6
	addi.l	#$00200004,$0(a0)
; $00A1CE
	cmpi.b	#$20,$3(a1)
; $00A1D4
	beq.w	loc_00A1E0
; $00A1D8
	addi.l	#$00200004,$0(a0)

loc_00A1E0:				; $00A1E0
	addi.l	#$00200004,$0(a0)
; $00A1E8
	move.b	#$01,($FFFF9FEA).l
; $00A1F0
	movem.l	(a7)+,d6/d7/a7
; $00A1F4
	rts

loc_00A1F6:				; $00A1F6
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2,-(a7)
; $00A1FA
	negx.?	-(a7)
; $00A1FC
	not.?	#$2700
; $00A200
	lea	(VDP_CTRL).l,a4
; $00A206
	lea	(VDP_DATA).l,a5
; $00A20C
	movea.w	d0,a1
; $00A20E
	movea.w	d2,a2
; $00A210
	movea.w	d4,a3

loc_00A212:				; $00A212
	move.w	a1,d0
; $00A214
	move.w	a2,d2
; $00A216
	move.w	a3,d4

loc_00A218:				; $00A218
	move.b	#$00,($FFFFA002).l
; $00A220
	tst.w	d4
; $00A222
	bmi.w	loc_00A24A
; $00A226
	tst.w	d5
; $00A228
	bmi.w	loc_00A24A
; $00A22C
	cmp.w	($FFFF9F2C).l,d4
; $00A232
	bpl.w	loc_00A24A
; $00A236
	cmp.w	($FFFF9F2E).l,d5
; $00A23C
	bpl.w	loc_00A24A
; $00A240
	bsr.w	loc_00A836
; $00A244
	move.w	(a0),d7
; $00A246
	bra.w	loc_00A254

loc_00A24A:				; $00A24A
	move.b	#$01,($FFFFA002).l
; $00A252
	moveq	#127,d7

loc_00A254:				; $00A254
	bsr.w	loc_00A698
; $00A258
	tst.b	($FFFF9F36).l
; $00A25E
	beq.s	loc_00A264
; $00A260
	bsr.w	loc_00A28E

loc_00A264:				; $00A264
	tst.b	($FFFF9F37).l
; $00A26A
	beq.w	loc_00A272
; $00A26E
	bsr.w	loc_00A404

loc_00A272:				; $00A272
	addq.w	#3,d0
; $00A274
	addq.w	#1,d4
; $00A276
	subq.w	#1,d2
; $00A278
	bne.w	loc_00A218
; $00A27C
	addq.w	#3,d1
; $00A27E
	addq.w	#1,d5
; $00A280
	subq.w	#1,d3
; $00A282
	bne.w	loc_00A212
; $00A286
	not.?	(a7)+
; $00A288
	movem.l	(a7)+,d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $00A28C
	rts

loc_00A28E:				; $00A28E
	movem.l	a7/a6/a5/a4/d6/d5/d4,-(a7)
; $00A292
	lea	($FFFF9F3A).l,a2
; $00A298
	movea.l	a2,a1
; $00A29A
	movea.l	($FFFF9F4C).l,a3
; $00A2A0
	move.w	#$4100,d3
; $00A2A4
	btst	#7,d7
; $00A2A8
	beq.w	loc_00A2B6
; $00A2AC
	movea.l	($FFFF9F50).l,a3
; $00A2B2
	move.w	#$4200,d3

loc_00A2B6:				; $00A2B6
	tst.b	($FFFF9F39).l
; $00A2BC
	beq.w	loc_00A2C4
; $00A2C0
	ori.w	#$6000,d3

loc_00A2C4:				; $00A2C4
	andi.w	#$007F,d7
; $00A2C8
	adda.w	d7,a3
; $00A2CA
	rol.w	#3,d7
; $00A2CC
	adda.w	d7,a3
; $00A2CE
	move.b	(a3)+,d3
; $00A2D0
	move.w	d3,(a1)+
; $00A2D2
	move.b	(a3)+,d3
; $00A2D4
	move.w	d3,(a1)+
; $00A2D6
	move.b	(a3)+,d3
; $00A2D8
	move.w	d3,(a1)+
; $00A2DA
	move.b	(a3)+,d3
; $00A2DC
	move.w	d3,(a1)+
; $00A2DE
	move.b	(a3)+,d3
; $00A2E0
	move.w	d3,(a1)+
; $00A2E2
	move.b	(a3)+,d3
; $00A2E4
	move.w	d3,(a1)+
; $00A2E6
	move.b	(a3)+,d3
; $00A2E8
	move.w	d3,(a1)+
; $00A2EA
	move.b	(a3)+,d3
; $00A2EC
	move.w	d3,(a1)+
; $00A2EE
	move.b	(a3)+,d3
; $00A2F0
	move.w	d3,(a1)+
; $00A2F2
	moveq	#2,d2
; $00A2F4
	bsr.w	loc_00C700
; $00A2F8
	move.w	($FFFF9054).w,d2

loc_00A2FC:				; $00A2FC
	ror.w	#3,d2
; $00A2FE
	add.w	d2,d0
; $00A300
	andi.w	#$003F,d0
; $00A304
	cmpi.w	#$003F,d0
; $00A308
	beq.w	loc_00A334
; $00A30C
	cmpi.w	#$003E,d0
; $00A310
	beq.w	loc_00A37A
; $00A314
	bsr.w	loc_00A3EC
; $00A318
	move.w	#$0080,d0
; $00A31C
	bsr.w	loc_00A820
; $00A320
	bsr.w	loc_00A3EC
; $00A324
	move.w	#$0080,d0
; $00A328
	bsr.w	loc_00A820
; $00A32C
	bsr.w	loc_00A3EC
; $00A330
	bra.w	loc_00A3BC

loc_00A334:				; $00A334
	move.l	d7,d2
; $00A336
	bsr.w	loc_00A3C2
; $00A33A
	moveq	#2,d0
; $00A33C
	bsr.w	loc_00A80A
; $00A340
	bsr.w	loc_00A3D6
; $00A344
	move.l	d2,d7
; $00A346
	move.w	#$0080,d0
; $00A34A
	bsr.w	loc_00A820
; $00A34E
	move.l	d7,d2
; $00A350
	bsr.w	loc_00A3C2
; $00A354
	moveq	#2,d0
; $00A356
	bsr.w	loc_00A80A
; $00A35A
	bsr.w	loc_00A3D6
; $00A35E
	move.l	d2,d7
; $00A360
	move.w	#$0080,d0
; $00A364
	bsr.w	loc_00A820
; $00A368
	bsr.w	loc_00A3C2
; $00A36C
	moveq	#2,d0
; $00A36E
	bsr.w	loc_00A80A
; $00A372
	bsr.w	loc_00A3D6
; $00A376
	bra.w	loc_00A3BC

loc_00A37A:				; $00A37A
	move.l	d7,d2
; $00A37C
	bsr.w	loc_00A3D6
; $00A380
	moveq	#4,d0
; $00A382
	bsr.w	loc_00A80A
; $00A386
	bsr.w	loc_00A3C2
; $00A38A
	move.l	d2,d7
; $00A38C
	move.w	#$0080,d0
; $00A390
	bsr.w	loc_00A820
; $00A394
	move.l	d7,d2
; $00A396
	bsr.w	loc_00A3D6
; $00A39A
	moveq	#4,d0
; $00A39C
	bsr.w	loc_00A80A
; $00A3A0
	bsr.w	loc_00A3C2
; $00A3A4
	move.l	d2,d7
; $00A3A6
	move.w	#$0080,d0
; $00A3AA
	bsr.w	loc_00A820
; $00A3AE
	bsr.w	loc_00A3D6
; $00A3B2
	moveq	#4,d0
; $00A3B4
	bsr.w	loc_00A80A
; $00A3B8
	bsr.w	loc_00A3C2

loc_00A3BC:				; $00A3BC
	movem.l	(a7)+,d4/d5/d6/a4/a5/a6/a7
; $00A3C0
	rts

loc_00A3C2:				; $00A3C2
	move.l	d7,d0
; $00A3C4
	add.l	d0,d0
; $00A3C6
	add.l	d0,d0
; $00A3C8
	roxr.w	#2,d0
; $00A3CA
	ori.w	#$4000,d0
; $00A3CE
	pea	d0
; $00A3D0
	move.l	d0,(a4)
; $00A3D2
	move.w	(a2)+,(a5)
; $00A3D4
	rts

loc_00A3D6:				; $00A3D6
	move.l	d7,d0
; $00A3D8
	add.l	d0,d0
; $00A3DA
	add.l	d0,d0
; $00A3DC
	roxr.w	#2,d0
; $00A3DE
	ori.w	#$4000,d0
; $00A3E2
	pea	d0
; $00A3E4
	move.l	d0,(a4)
; $00A3E6
	move.w	(a2)+,(a5)
; $00A3E8
	move.w	(a2)+,(a5)
; $00A3EA
	rts

loc_00A3EC:				; $00A3EC
	move.l	d7,d0
; $00A3EE
	add.l	d0,d0
; $00A3F0
	add.l	d0,d0
; $00A3F2
	roxr.w	#2,d0
; $00A3F4
	ori.w	#$4000,d0
; $00A3F8
	pea	d0
; $00A3FA
	move.l	d0,(a4)
; $00A3FC
	move.w	(a2)+,(a5)
; $00A3FE
	move.w	(a2)+,(a5)
; $00A400
	move.w	(a2)+,(a5)
; $00A402
	rts

loc_00A404:				; $00A404
	movem.l	a7/a6/a5/a4/d6/d5/d4,-(a7)
; $00A408
	lea	($FFFF9F3A).l,a2
; $00A40E
	moveq	#0,d6
; $00A410
	tst.b	($FFFF9F38).l
; $00A416
	bne.w	loc_00A420
; $00A41A
	move.l	#$80008000,d6

loc_00A420:				; $00A420
	move.l	d6,(a2)+
; $00A422
	move.l	d6,(a2)+
; $00A424
	move.l	d6,(a2)+
; $00A426
	move.l	d6,(a2)+
; $00A428
	move.w	d6,(a2)
; $00A42A
	moveq	#0,d2
; $00A42C
	bsr.w	loc_00C700
; $00A430
	cmpi.b	#$02,($01FFFF).l
; $00A438
	beq.w	loc_00A440
; $00A43C
	bsr.w	loc_00A44E

loc_00A440:				; $00A440
	move.w	($FFFF9050).w,d2
; $00A444
	lea	($FFFF9F3A).l,a2
; $00A44A
	bra.w	loc_00A2FC

loc_00A44E:				; $00A44E
	movem.l	a7/a3/d7/d3,-(a7)
; $00A452
	moveq	#0,d6
; $00A454
	move.w	d5,d6
; $00A456
	mulu.w	($FFFF9F2C).l,d6
; $00A45C
	add.w	d4,d6
; $00A45E
	add.w	d6,d6
; $00A460
	lea	($FF5000).l,a3
; $00A466
	adda.w	d6,a3
; $00A468
	moveq	#0,d1
; $00A46A
	move.b	(a3)+,d1
; $00A46C
	cmpi.b	#$FF,d1
; $00A470
	beq.w	loc_00A692
; $00A474
	lea	($FFFF9F3A).l,a4
; $00A47A
	move.w	d1,d3
; $00A47C
	add.w	d3,d3
; $00A47E
	moveq	#0,d2
; $00A480
	move.b	(a3),d2
; $00A482
	beq.w	loc_00A488
; $00A486
	addq.w	#1,d3

loc_00A488:				; $00A488
	moveq	#0,d0
; $00A48A
	cmp.w	($FFFF9FE4).l,d1
; $00A490
	bne.w	loc_00A4BA
; $00A494
	tst.b	($FFFF9FE3).l
; $00A49A
	beq.w	loc_00A4BA
; $00A49E
	btst	#0,d3
; $00A4A2
	beq.w	loc_00A4B0
; $00A4A6
	move.b	($FFFF9FE9).l,d0
; $00A4AC
	bra.w	loc_00A4B6

loc_00A4B0:				; $00A4B0
	move.b	($FFFF9FE7).l,d0

loc_00A4B6:				; $00A4B6
	addi.w	#$0068,d0

loc_00A4BA:				; $00A4BA
	lea	($FF6000).l,a3
; $00A4C0
	move.b	($0,a3,d3.w),d3
; $00A4C4
	lea	($05E5D8).l,a3
; $00A4CA
	add.w	d1,d1
; $00A4CC
	add.w	d1,d1
; $00A4CE
	movea.l	($0,a3,d1.w),a1
; $00A4D2
	add.w	d2,d2
; $00A4D4
	add.w	d2,d2
; $00A4D6
	movea.l	($50,a3,d2.w),a3
; $00A4DA
	adda.l	a1,a3
; $00A4DC
	moveq	#0,d4
; $00A4DE
	move.b	$2(a3),d4
; $00A4E2
	tst.w	d2
; $00A4E4
	bne.w	loc_00A4FA
; $00A4E8
	moveq	#0,d1
; $00A4EA
	move.b	$16(a1),d1
; $00A4EE
	addi.w	#$00F4,d1
; $00A4F2
	or.w	d1,$A(a4)
; $00A4F6
	bra.w	loc_00A502

loc_00A4FA:				; $00A4FA
	btst	#6,d4
; $00A4FE
	beq.w	loc_00A54A

loc_00A502:				; $00A502
	jsr	($011610).l
; $00A508
	move.w	d1,d6
; $00A50A
	cmpi.b	#$20,$1(a1)
; $00A510
	bne.w	loc_00A534
; $00A514
	move.b	$5C(a1),d1
; $00A518
	beq.w	loc_00A524
; $00A51C
	cmpi.b	#$01,d1
; $00A520
	bne.w	loc_00A534

loc_00A524:				; $00A524
	btst	#0,d4
; $00A528
	beq.w	loc_00A534
; $00A52C
	addi.w	#$01B0,d6
; $00A530
	bra.w	loc_00A5B6

loc_00A534:				; $00A534
	btst	#3,d4
; $00A538
	bne.w	loc_00A5B6
; $00A53C
	tst.b	d3
; $00A53E
	beq.w	loc_00A5B6
; $00A542
	addi.w	#$0100,d6
; $00A546
	bra.w	loc_00A5B6

loc_00A54A:				; $00A54A
	movea.l	a1,a0
; $00A54C
	movea.l	a3,a1
; $00A54E
	jsr	($011610).l
; $00A554
	move.w	d1,d6
; $00A556
	movea.l	a1,a3
; $00A558
	movea.l	a0,a1
; $00A55A
	move.b	$5(a3),d2
; $00A55E
	cmpi.b	#$07,d2
; $00A562
	beq.w	loc_00A590
; $00A566
	cmpi.b	#$20,$1(a1)
; $00A56C
	bne.w	loc_00A534
; $00A570
	move.b	$5C(a1),d1
; $00A574
	beq.w	loc_00A580
; $00A578
	cmpi.b	#$01,d1
; $00A57C
	bne.w	loc_00A534

loc_00A580:				; $00A580
	btst	#0,d4
; $00A584
	beq.w	loc_00A534
; $00A588
	addi.w	#$0068,d6
; $00A58C
	bra.w	loc_00A5B6

loc_00A590:				; $00A590
	cmpi.b	#$20,$1(a1)
; $00A596
	bne.w	loc_00A534
; $00A59A
	move.b	$5C(a1),d1
; $00A59E
	beq.w	loc_00A5AA
; $00A5A2
	cmpi.b	#$01,d1
; $00A5A6
	bne.w	loc_00A534

loc_00A5AA:				; $00A5AA
	btst	#0,d4
; $00A5AE
	beq.w	loc_00A534
; $00A5B2
	addi.w	#$00E8,d6

loc_00A5B6:				; $00A5B6
	ori.w	#$2000,d6
; $00A5BA
	movea.l	a4,a2
; $00A5BC
	btst	#0,$20(a1)
; $00A5C2
	beq.w	loc_00A5FA
; $00A5C6
	or.w	d6,(a2)+
; $00A5C8
	addq.w	#2,d6
; $00A5CA
	or.w	d6,(a2)+
; $00A5CC
	subq.w	#1,d6
; $00A5CE
	addq.w	#2,a2
; $00A5D0
	or.w	d6,(a2)+
; $00A5D2
	addq.w	#2,d6
; $00A5D4
	or.w	d6,(a2)+
; $00A5D6
	moveq	#0,d1
; $00A5D8
	move.b	$3(a3),d1
; $00A5DC
	addi.w	#$2080,d1
; $00A5E0
	or.w	d1,$10(a4)
; $00A5E4
	moveq	#1,d2
; $00A5E6
	cmp.b	$20(a1),d2
; $00A5EA
	beq.w	loc_00A626
; $00A5EE
	tst.w	d0
; $00A5F0
	beq.w	loc_00A626
; $00A5F4
	addq.w	#3,d0
; $00A5F6
	bra.w	loc_00A626

loc_00A5FA:				; $00A5FA
	ori.w	#$0800,d6
; $00A5FE
	move.w	d6,d1
; $00A600
	addq.w	#2,d1
; $00A602
	or.w	d1,(a2)+
; $00A604
	or.w	d6,(a2)+
; $00A606
	addq.w	#1,d6
; $00A608
	addq.w	#1,d1
; $00A60A
	addq.w	#2,a2
; $00A60C
	or.w	d1,(a2)+
; $00A60E
	or.w	d6,(a2)+
; $00A610
	moveq	#0,d1
; $00A612
	move.b	$3(a3),d1
; $00A616
	addi.w	#$0080,d1
; $00A61A
	or.w	d1,$10(a4)
; $00A61E
	tst.w	d0
; $00A620
	beq.w	loc_00A626
; $00A624
	addq.w	#6,d0

loc_00A626:				; $00A626
	move.w	d4,d1
; $00A628
	andi.b	#$18,d1
; $00A62C
	bne.w	loc_00A658
; $00A630
	move.b	$8(a1),d1
; $00A634
	move.w	d1,d2
; $00A636
	andi.b	#$07,d1
; $00A63A
	bne.w	loc_00A658
; $00A63E
	btst	#3,d2
; $00A642
	bne.w	loc_00A658
; $00A646
	tst.b	$5C(a1)
; $00A64A
	beq.w	loc_00A65E
; $00A64E
	btst	#5,$8(a1)
; $00A654
	bne.w	loc_00A65E

loc_00A658:				; $00A658
	ori.w	#$0004,$A6(a4)

loc_00A65E:				; $00A65E
	or.w	d0,$C(a4)
; $00A662
	moveq	#0,d0
; $00A664
	moveq	#1,d2
; $00A666
	cmp.b	($FFFFA614).w,d2
; $00A66A
	bne.w	loc_00A67C
; $00A66E
	moveq	#3,d2
; $00A670
	cmp.b	$20(a1),d2
; $00A674
	bne.w	loc_00A67C
; $00A678
	move.w	#$005E,d0

loc_00A67C:				; $00A67C
	btst	#0,d4
; $00A680
	beq.w	loc_00A688
; $00A684
	move.w	#$07D4,d0

loc_00A688:				; $00A688
	andi.w	#$000E,-$800(a4)
; $00A68E
	or.w	d0,$E(a4)

loc_00A692:				; $00A692
	movem.l	(a7)+,d3/d7/a3/a7
; $00A696
	rts

loc_00A698:				; $00A698
	movem.l	a0/d7,-(a7)
; $00A69C
	move.b	#$00,($FFFF9F38).l
; $00A6A4
	move.b	#$00,($FFFF9F39).l
; $00A6AC
	cmpi.w	#$007F,d7
; $00A6B0
	beq.w	loc_00A6E4
; $00A6B4
	move.w	d5,d7
; $00A6B6
	mulu.w	($FFFF9F2C).l,d7
; $00A6BC
	add.w	d4,d7
; $00A6BE
	add.w	d7,d7
; $00A6C0
	lea	($FF4000).l,a0
; $00A6C6
	move.b	($0,a0,d7.w),d7
; $00A6CA
	bpl.w	loc_00A6D6
; $00A6CE
	move.b	#$01,($FFFF9F38).l

loc_00A6D6:				; $00A6D6
	roxl.b	#2,d7
; $00A6D8
	bcc.w	loc_00A6E4
; $00A6DC
	move.b	#$01,($FFFF9F39).l

loc_00A6E4:				; $00A6E4
	movem.l	(a7)+,d7/a0
; $00A6E8
	rts

loc_00A6EA:				; $00A6EA
	movem.l	a7/a6/a5/a4/a3/a2/d7/d6,-(a7)
; $00A6EE
	cmpi.b	#$EA,($00FFFF).l
; $00A6F6
	beq.w	loc_00A724
; $00A6FA
	move.w	($FFFF9FF4).l,d2
; $00A700
	move.w	($FFFF9FE4).l,d0
; $00A706
	bsr.w	loc_00A89C
; $00A70A
	cmp.w	d2,d0
; $00A70C
	beq.w	loc_00A724
; $00A710
	jsr	($00A16A).l
; $00A716
	lea	($FFFF9F62).l,a1
; $00A71C
	moveq	#3,d1
; $00A71E
	jsr	($009192).l

loc_00A724:				; $00A724
	jsr	($0094DC).l
; $00A72A
	move.w	#$05D6,(a0)
; $00A72E
	jsr	($010136).l
; $00A734
	jsr	($010080).l
; $00A73A
	movem.l	(a7)+,d6/d7/a2/a3/a4/a5/a6/a7
; $00A73E
	rts

loc_00A740:				; $00A740
	move.w	d0,-(a7)
; $00A742
	move.b	#$01,($FFFF9F36).l
; $00A74A
	move.b	($FFFF9F37).l,d0
; $00A750
	move.b	#$00,($FFFF9F37).l
; $00A758
	bsr.w	loc_00A6EA
; $00A75C
	move.b	d0,($FFFF9F37).l
; $00A762
	move.w	(a7)+,d0
; $00A764
	rts

loc_00A766:				; $00A766
	move.w	d0,-(a7)
; $00A768
	move.b	($FFFF9F36).l,d0
; $00A76E
	move.b	#$00,($FFFF9F36).l
; $00A776
	move.b	#$01,($FFFF9F37).l
; $00A77E
	bsr.w	loc_00A6EA
; $00A782
	move.b	d0,($FFFF9F36).l
; $00A788
	move.w	(a7)+,d0
; $00A78A
	rts

loc_00A78C:				; $00A78C
	movem.l	a7/a6/a5/a4/a3/a2,-(a7)
; $00A790
	move.w	d4,-(a7)
; $00A792
	move.w	d5,-(a7)
; $00A794
	move.w	d4,d0
; $00A796
	subq.w	#6,d0
; $00A798
	bge.w	loc_00A7A2
; $00A79C
	moveq	#0,d0
; $00A79E
	bra.w	loc_00A7B4

loc_00A7A2:				; $00A7A2
	move.w	($FFFF9F2C).l,d1
; $00A7A8
	subi.w	#$000E,d1
; $00A7AC
	cmp.w	d1,d0
; $00A7AE
	ble.w	loc_00A7B4
; $00A7B2
	move.w	d1,d0

loc_00A7B4:				; $00A7B4
	move.w	d0,d4
; $00A7B6
	move.w	d5,d0
; $00A7B8
	subq.w	#4,d0
; $00A7BA
	bge.w	loc_00A7C4
; $00A7BE
	moveq	#0,d0
; $00A7C0
	bra.w	loc_00A7D4

loc_00A7C4:				; $00A7C4
	move.w	($FFFF9F2E).l,d1
; $00A7CA
	subq.w	#8,d1
; $00A7CC
	cmp.w	d1,d0
; $00A7CE
	ble.w	loc_00A7D4
; $00A7D2
	move.w	d1,d0

loc_00A7D4:				; $00A7D4
	move.w	d0,d5
; $00A7D6
	moveq	#-4,d0
; $00A7D8
	moveq	#-4,d1
; $00A7DA
	moveq	#16,d2
; $00A7DC
	moveq	#11,d3
; $00A7DE
	subq.w	#1,d4
; $00A7E0
	subq.w	#1,d5
; $00A7E2
	bsr.w	loc_00A1F6
; $00A7E6
	addq.w	#1,d4
; $00A7E8
	addq.w	#1,d5
; $00A7EA
	move.w	d4,($FFFF9F24).l
; $00A7F0
	move.w	d5,($FFFF9F26).l
; $00A7F6
	move.w	(a7)+,d1
; $00A7F8
	move.w	(a7)+,d0
; $00A7FA
	sub.w	d4,d0
; $00A7FC
	sub.w	d5,d1
; $00A7FE
	jsr	($00FDFE).l
; $00A804
	movem.l	(a7)+,a2/a3/a4/a5/a6/a7
; $00A808
	rts

loc_00A80A:				; $00A80A
	pea	d0
; $00A80C
	move.w	d7,d0
; $00A80E
	andi.w	#$FF80,d0
; $00A812
	pea	d0
; $00A814
	add.w	d0,d7
; $00A816
	andi.w	#$007F,d7
; $00A81A
	pea	d0
; $00A81C
	or.w	d0,d7
; $00A81E
	rts

loc_00A820:				; $00A820
	pea	d0
; $00A822
	move.w	d7,d0
; $00A824
	andi.w	#$F000,d0
; $00A828
	pea	d0
; $00A82A
	add.w	d0,d7
; $00A82C
	andi.w	#$0FFF,d7
; $00A830
	pea	d0
; $00A832
	or.w	d0,d7
; $00A834
	rts

loc_00A836:				; $00A836
	move.l	d0,-(a7)
; $00A838
	move.w	($FFFF9F2C).l,d0
; $00A83E
	mulu.w	d5,d0
; $00A840
	add.w	d4,d0
; $00A842
	add.w	d0,d0
; $00A844
	lea	($FF3000).l,a0
; $00A84A
	adda.w	d0,a0
; $00A84C
	move.l	(a7)+,d0
; $00A84E
	rts

loc_00A850:				; $00A850
	movem.l	a7/a6/d7,-(a7)
; $00A854
	move.w	($FFFFA6E0).w,d0
; $00A858
	mulu.w	($FFFF9F2C).l,d0
; $00A85E
	add.w	($FFFFA6DE).w,d0
; $00A862
	add.w	d0,d0
; $00A864
	lea	($FF5000).l,a0
; $00A86A
	moveq	#0,d1
; $00A86C
	move.b	($0,a0,d0.w),d1
; $00A870
	bmi.w	loc_00A888
; $00A874
	move.w	($FFFF9FE4).l,($FFFF9FF4).l
; $00A87E
	move.w	d1,($FFFF9FE4).l
; $00A884
	bra.w	loc_00A892

loc_00A888:				; $00A888
	move.w	($FFFF9FE4).l,($FFFF9FF4).l

loc_00A892:				; $00A892
	bsr.w	loc_00A6EA
; $00A896
	movem.l	(a7)+,d7/a6/a7
; $00A89A
	rts

loc_00A89C:				; $00A89C
	movem.l	a7/a6/a5/a4/a3/a2/d7/d6,-(a7)
; $00A8A0
	bsr.w	loc_00AA18
; $00A8A4
	cmpi.b	#$FF,d0
; $00A8A8
	bne.w	loc_00A8D4
; $00A8AC
	move.w	($FFFFA6E0).w,d0
; $00A8B0
	mulu.w	($FFFF9F2C).l,d0
; $00A8B6
	add.w	($FFFFA6DE).w,d0
; $00A8BA
	add.w	d0,d0
; $00A8BC
	lea	($FF5000).l,a0
; $00A8C2
	move.b	($0,a0,d0.w),d0
; $00A8C6
	cmpi.b	#$FF,d0
; $00A8CA
	bne.w	loc_00A8D4
; $00A8CE
	move.w	($FFFF9FE4).l,d0

loc_00A8D4:				; $00A8D4
	andi.w	#$00FF,d0
; $00A8D8
	move.w	($FFFF9FE4).l,($FFFF9FF4).l
; $00A8E2
	move.w	d0,($FFFF9FE4).l
; $00A8E8
	add.w	d0,d0
; $00A8EA
	add.w	d0,d0
; $00A8EC
	lea	($05E5D8).l,a1
; $00A8F2
	movea.l	($0,a1,d0.w),a1
; $00A8F6
	btst	#7,$2(a1)
; $00A8FC
	bne.w	loc_00AA12
; $00A900
	btst	#7,$8(a1)
; $00A906
	bne.w	loc_00AA12
; $00A90A
	btst	#6,$8(a1)
; $00A910
	bne.w	loc_00AA12
; $00A914
	moveq	#0,d1
; $00A916
	move.b	$45(a1),d1
; $00A91A
	move.b	d1,($FFFF9F5C).l
; $00A920
	beq.w	loc_00A92A
; $00A924
	addq.b	#1,($FFFF9F5C).l

loc_00A92A:				; $00A92A
	jsr	($010962).l
; $00A930
	tst.b	($FFFF9F5C).l
; $00A936
	beq.w	loc_00A93A

loc_00A93A:				; $00A93A
	btst	#3,$8(a1)
; $00A940
	beq.w	loc_00A94C
; $00A944
	move.b	#$01,($FFFF9F5C).l

loc_00A94C:				; $00A94C
	moveq	#0,d4
; $00A94E
	move.b	$6(a1),d4
; $00A952
	moveq	#0,d5
; $00A954
	move.b	$7(a1),d5
; $00A958
	movea.w	d5,a1
; $00A95A
	lea	($FF4000).l,a0
; $00A960
	moveq	#0,d1
; $00A962
	move.b	($FFFF9F5C).l,d1
; $00A968
	beq.w	loc_00AA12

loc_00A96C:				; $00A96C
	tst.w	d1
; $00A96E
	beq.w	loc_00A9B4
; $00A972
	subq.w	#1,d1
; $00A974
	move.w	d4,d2
; $00A976
	sub.w	d1,d2
; $00A978
	move.w	d1,d0
; $00A97A
	add.w	d0,d0

loc_00A97C:				; $00A97C
	tst.w	d5
; $00A97E
	beq.w	loc_00A9A8
; $00A982
	tst.w	d2
; $00A984
	ble.w	loc_00A9A8
; $00A988
	move.w	d2,d3
; $00A98A
	addq.w	#1,d3
; $00A98C
	cmp.w	($FFFF9F2C).l,d3
; $00A992
	bge.w	loc_00A9A8
; $00A996
	move.w	d5,d3
; $00A998
	mulu.w	($FFFF9F2C).l,d3
; $00A99E
	add.w	d2,d3
; $00A9A0
	add.w	d3,d3
; $00A9A2
	ori.b	#$00,($40,a0,d0.w)

loc_00A9A8:				; $00A9A8
	addq.w	#1,d2
; $00A9AA
	dbf	d0,loc_00A97C
; $00A9AE
	subq.w	#1,d5
; $00A9B0
	bra.w	loc_00A96C

loc_00A9B4:				; $00A9B4
	move.w	a1,d5
; $00A9B6
	addq.w	#1,d5
; $00A9B8
	moveq	#0,d1
; $00A9BA
	move.b	($FFFF9F5C).l,d1
; $00A9C0
	subq.w	#1,d1

loc_00A9C2:				; $00A9C2
	tst.w	d1
; $00A9C4
	beq.w	loc_00AA12
; $00A9C8
	subq.w	#1,d1
; $00A9CA
	move.w	d4,d2
; $00A9CC
	sub.w	d1,d2
; $00A9CE
	move.w	d1,d0
; $00A9D0
	add.w	d0,d0

loc_00A9D2:				; $00A9D2
	move.w	d5,d3
; $00A9D4
	addq.w	#1,d3
; $00A9D6
	cmp.w	($FFFF9F2E).l,d3
; $00A9DC
	bge.w	loc_00AA06
; $00A9E0
	tst.w	d2
; $00A9E2
	ble.w	loc_00AA06
; $00A9E6
	move.w	d2,d3
; $00A9E8
	addq.w	#1,d3
; $00A9EA
	cmp.w	($FFFF9F2C).l,d3
; $00A9F0
	bge.w	loc_00AA06
; $00A9F4
	move.w	d5,d3
; $00A9F6
	mulu.w	($FFFF9F2C).l,d3
; $00A9FC
	add.w	d2,d3
; $00A9FE
	add.w	d3,d3
; $00AA00
	ori.b	#$00,($40,a0,d0.w)

loc_00AA06:				; $00AA06
	addq.w	#1,d2
; $00AA08
	dbf	d0,loc_00A9D2
; $00AA0C
	addq.w	#1,d5
; $00AA0E
	bra.w	loc_00A9C2

loc_00AA12:				; $00AA12
	movem.l	(a7)+,d6/d7/a2/a3/a4/a5/a6/a7
; $00AA16
	rts

loc_00AA18:				; $00AA18
	movem.l	a7/a6/d7,-(a7)
; $00AA1C
	lea	($FF4000).l,a0
; $00AA22
	move.l	#$BFFFBFFF,d1
; $00AA28
	move.w	#$03FF,d0

loc_00AA2C:				; $00AA2C
	exg	d1,a0
; $00AA2E
	dbf	d0,loc_00AA2C
; $00AA32
	movem.l	(a7)+,d7/a6/a7
; $00AA36
	rts

loc_00AA38:				; $00AA38
	movem.l	a7/a6/d7,-(a7)
; $00AA3C
	lea	($FF4000).l,a0
; $00AA42
	move.l	#$80008000,d1
; $00AA48
	move.w	#$03FF,d0

loc_00AA4C:				; $00AA4C
	or.l	d1,(a0)+
; $00AA4E
	dbf	d0,loc_00AA4C
; $00AA52
	movem.l	(a7)+,d7/a6/a7
; $00AA56
	rts

loc_00AA58:				; $00AA58
	movem.l	a7/a6/d7/d6,-(a7)
; $00AA5C
	move.w	($FFFFA958).w,d0
; $00AA60
	rol.w	#3,d0
; $00AA62
	lea	($08203C).l,a0
; $00AA68
	lea	($FFFF9F5C).l,a1
; $00AA6E
	move.w	($0,a0,d0.w),d1
; $00AA72
	addq.w	#1,d1
; $00AA74
	move.b	d1,(a1)
; $00AA76
	cmpi.w	#$0001,d1
; $00AA7A
	beq.w	loc_00AA88
; $00AA7E
	movea.l	($FFFFA628).w,a0
; $00AA82
	jsr	($0109D6).l

loc_00AA88:				; $00AA88
	movem.l	(a7)+,d6/d7/a6/a7
; $00AA8C
	rts

loc_00AA8E:				; $00AA8E
	movem.l	a7/a6/a5/a4/a3/a2/d7/d6,-(a7)
; $00AA92
	bsr.w	loc_00AA58
; $00AA96
	movea.l	($FFFFA62C).w,a1
; $00AA9A
	move.w	($FFFFA6E2).w,d4
; $00AA9E
	move.w	($FFFFA6E4).w,d5
; $00AAA2
	movea.w	d5,a1

loc_00AAA4:				; $00AAA4
	bsr.w	loc_00AA38
; $00AAA8
	lea	($FF4000).l,a0
; $00AAAE
	moveq	#0,d1
; $00AAB0
	move.b	($FFFF9F5C).l,d1
; $00AAB6
	beq.w	loc_00AB6A

loc_00AABA:				; $00AABA
	tst.w	d1
; $00AABC
	beq.w	loc_00AB02
; $00AAC0
	subq.w	#1,d1
; $00AAC2
	move.w	d4,d2
; $00AAC4
	sub.w	d1,d2
; $00AAC6
	move.w	d1,d0
; $00AAC8
	add.w	d0,d0

loc_00AACA:				; $00AACA
	tst.w	d5
; $00AACC
	beq.w	loc_00AAF6
; $00AAD0
	tst.w	d2
; $00AAD2
	ble.w	loc_00AAF6
; $00AAD6
	move.w	d2,d3
; $00AAD8
	addq.w	#1,d3
; $00AADA
	cmp.w	($FFFF9F2C).l,d3
; $00AAE0
	bge.w	loc_00AAF6
; $00AAE4
	move.w	d5,d3
; $00AAE6
	mulu.w	($FFFF9F2C).l,d3
; $00AAEC
	add.w	d2,d3
; $00AAEE
	add.w	d3,d3
; $00AAF0
	andi.b	#$00,($7F,a0,d0.w)

loc_00AAF6:				; $00AAF6
	addq.w	#1,d2
; $00AAF8
	dbf	d0,loc_00AACA
; $00AAFC
	subq.w	#1,d5
; $00AAFE
	bra.w	loc_00AABA

loc_00AB02:				; $00AB02
	move.w	a1,d5
; $00AB04
	addq.w	#1,d5
; $00AB06
	moveq	#0,d1
; $00AB08
	move.b	($FFFF9F5C).l,d1
; $00AB0E
	subq.w	#1,d1

loc_00AB10:				; $00AB10
	tst.w	d1
; $00AB12
	beq.w	loc_00AB60
; $00AB16
	subq.w	#1,d1
; $00AB18
	move.w	d4,d2
; $00AB1A
	sub.w	d1,d2
; $00AB1C
	move.w	d1,d0
; $00AB1E
	add.w	d0,d0

loc_00AB20:				; $00AB20
	move.w	d5,d3
; $00AB22
	addq.w	#1,d3
; $00AB24
	cmp.w	($FFFF9F2E).l,d3
; $00AB2A
	bge.w	loc_00AB54
; $00AB2E
	tst.w	d2
; $00AB30
	ble.w	loc_00AB54
; $00AB34
	move.w	d2,d3
; $00AB36
	addq.w	#1,d3
; $00AB38
	cmp.w	($FFFF9F2C).l,d3
; $00AB3E
	bge.w	loc_00AB54
; $00AB42
	move.w	d5,d3
; $00AB44
	mulu.w	($FFFF9F2C).l,d3
; $00AB4A
	add.w	d2,d3
; $00AB4C
	add.w	d3,d3
; $00AB4E
	andi.b	#$00,($7F,a0,d0.w)

loc_00AB54:				; $00AB54
	addq.w	#1,d2
; $00AB56
	dbf	d0,loc_00AB20
; $00AB5A
	addq.w	#1,d5
; $00AB5C
	bra.w	loc_00AB10

loc_00AB60:				; $00AB60
	andi.b	#$DF,#$FB
; $00AB66
	btst	d1,?ea(7,7)
; $00AB68
	rts

loc_00AB6A:				; $00AB6A
	ori	#$00,ccr
; $00AB70
	dc.w	$FFF4

loc_00AB72:				; $00AB72
	movem.l	a7/a6/a5/a4/a3/a2/d7/d6,-(a7)
; $00AB76
	bsr.w	loc_00AA38
; $00AB7A
	move.w	($FFFFA958).w,d0
; $00AB7E
	rol.w	#3,d0
; $00AB80
	lea	($08203C).l,a0
; $00AB86
	move.w	($2,a0,d0.w),d3
; $00AB8A
	bmi.w	loc_00ABB2
; $00AB8E
	addq.w	#1,d3
; $00AB90
	movea.l	($FFFFA628).w,a0
; $00AB94
	moveq	#0,d1
; $00AB96
	move.b	$2E(a0),d1
; $00AB9A
	roxr.w	#2,d1
; $00AB9C
	add.w	d1,d3
; $00AB9E
	move.b	d3,($FFFF9F5C).l
; $00ABA4
	move.w	($FFFFA6E6).w,d4
; $00ABA8
	move.w	($FFFFA6E8).w,d5
; $00ABAC
	movea.w	d5,a1
; $00ABAE
	bra.w	loc_00AAA4

loc_00ABB2:				; $00ABB2
	lea	($FF5000).l,a1
; $00ABB8
	move.w	($FFFFA620).w,d1
; $00ABBC
	move.b	($0,a1,d1.w),d0
; $00ABC0
	bmi.w	loc_00AB6A
; $00ABC4
	move.b	($1,a1,d1.w),d1
; $00ABC8
	movea.l	($FFFFA628).w,a1
; $00ABCC
	move.b	$20(a1),d2
; $00ABD0
	add.w	d0,d0
; $00ABD2
	add.w	d0,d0
; $00ABD4
	lea	($05E5D8).l,a1
; $00ABDA
	movea.l	($0,a1,d0.w),a1
; $00ABDE
	cmpi.w	#$8000,d3
; $00ABE2
	beq.w	loc_00ACC2
; $00ABE6
	cmpi.w	#$8001,d3
; $00ABEA
	beq.w	loc_00AC7E
; $00ABEE
	cmpi.w	#$8004,d3
; $00ABF2
	beq.w	loc_00AC68
; $00ABF6
	cmpi.w	#$8002,d3
; $00ABFA
	beq.w	loc_00AC1C
; $00ABFE
	cmpi.w	#$8005,d3
; $00AC02
	beq.w	loc_00AC9C
; $00AC06
	and.b	$20(a1),d2
; $00AC0A
	bne.w	loc_00AB6A
; $00AC0E
	jsr	($0146CC).l
; $00AC14
	beq.w	loc_00AB6A
; $00AC18
	bra.w	loc_00AC24

loc_00AC1C:				; $00AC1C
	and.b	$20(a1),d2
; $00AC20
	beq.w	loc_00AB6A

loc_00AC24:				; $00AC24
	lea	($FF4000).l,a0
; $00AC2A
	moveq	#7,d0

loc_00AC2C:				; $00AC2C
	moveq	#0,d1
; $00AC2E
	moveq	#0,d2
; $00AC30
	cmpi.b	#$00,$FF(a1)
; $00AC36
	beq.w	loc_00AC5C
; $00AC3A
	btst	#7,$2(a1)
; $00AC40
	bne.w	loc_00AC5C
; $00AC44
	move.b	$6(a1),d1
; $00AC48
	move.b	$7(a1),d2
; $00AC4C
	mulu.w	($FFFF9F2C).l,d2
; $00AC52
	add.w	d1,d2
; $00AC54
	add.w	d2,d2
; $00AC56
	andi.b	#$00,($7F,a0,d0.w)

loc_00AC5C:				; $00AC5C
	adda.w	#$000C,a1
; $00AC60
	dbf	d0,loc_00AC2C
; $00AC64
	bra.w	loc_00ACEE

loc_00AC68:				; $00AC68
	and.b	$20(a1),d2
; $00AC6C
	bne.w	loc_00AB6A
; $00AC70
	jsr	($0146CC).l
; $00AC76
	beq.w	loc_00AB6A
; $00AC7A
	bra.w	loc_00ACD0

loc_00AC7E:				; $00AC7E
	and.b	$20(a1),d2
; $00AC82
	bne.w	loc_00AB6A
; $00AC86
	jsr	($0146CC).l
; $00AC8C
	beq.w	loc_00AB6A
; $00AC90
	cmpi.b	#$00,d1
; $00AC94
	bne.w	loc_00AB6A
; $00AC98
	bra.w	loc_00ACD0

loc_00AC9C:				; $00AC9C
	and.b	$20(a1),d2
; $00ACA0
	bne.w	loc_00AB6A
; $00ACA4
	jsr	($0146CC).l
; $00ACAA
	beq.w	loc_00AB6A
; $00ACAE
	cmpi.b	#$00,d1
; $00ACB2
	beq.w	loc_00ACD0
; $00ACB6
	cmpi.b	#$07,d1
; $00ACBA
	beq.w	loc_00ACD0
; $00ACBE
	bra.w	loc_00AB6A

loc_00ACC2:				; $00ACC2
	and.b	$20(a1),d2
; $00ACC6
	beq.w	loc_00AB6A
; $00ACCA
	tst.b	d1
; $00ACCC
	bne.w	loc_00AB6A

loc_00ACD0:				; $00ACD0
	lea	($05E628).l,a0
; $00ACD6
	andi.w	#$00FF,d1
; $00ACDA
	add.w	d1,d1
; $00ACDC
	add.w	d1,d1
; $00ACDE
	adda.l	($0,a0,d1.w),a1
; $00ACE2
	lea	($FF4000).l,a0
; $00ACE8
	moveq	#0,d0
; $00ACEA
	bra.w	loc_00AC2C

loc_00ACEE:				; $00ACEE
	andi.b	#$DF,#$FB
; $00ACF4
	btst	d1,?ea(7,7)
; $00ACF6
	rts

loc_00ACF8:				; $00ACF8
	movem.l	a6/a5/a4/a3/d7/d6/d5/d4/d3,-(a7)
; $00ACFC
	move.b	#$00,($FFFFA010).l
; $00AD04
	movea.l	($FFFFA628).w,a0
; $00AD08
	lea	($FFFFA70C).w,a1
; $00AD0C
	clr.w	(a1)
; $00AD0E
	jsr	($0109DC).l
; $00AD14
	move.b	$2E(a0),$2(a1)
; $00AD1A
	move.w	($FFFFA958).w,d0
; $00AD1E
	rol.w	#3,d0
; $00AD20
	lea	($08203C).l,a0
; $00AD26
	move.w	($6,a0,d0.w),d1
; $00AD2A
	lea	($FF4000).l,a1
; $00AD30
	lea	($FF5000).l,a2
; $00AD36
	clr.l	($FFFFA00C).l
; $00AD3C
	move.w	#$1000,d2

loc_00AD40:				; $00AD40
	subq.w	#2,d2
; $00AD42
	tst.w	($0,a1,d2.w)
; $00AD46
	bmi.w	loc_00ADCA
; $00AD4A
	moveq	#0,d3
; $00AD4C
	move.b	($0,a2,d2.w),d3
; $00AD50
	cmpi.b	#$FF,d3
; $00AD54
	beq.w	loc_00ADCA
; $00AD58
	lea	($05E5D8).l,a3
; $00AD5E
	add.w	d3,d3
; $00AD60
	add.w	d3,d3
; $00AD62
	movea.l	($0,a3,d3.w),a3
; $00AD66
	move.l	a3,($FFFFA004).l
; $00AD6C
	movea.l	($FFFFA628).w,a4
; $00AD70
	move.b	$20(a3),d3
; $00AD74
	and.b	$20(a4),d3
; $00AD78
	beq.w	loc_00AD86
; $00AD7C
	tst.w	d1
; $00AD7E
	bne.w	loc_00ADCA
; $00AD82
	bra.w	loc_00AD96

loc_00AD86:				; $00AD86
	tst.w	d1
; $00AD88
	beq.w	loc_00ADCA
; $00AD8C
	jsr	($0146D6).l
; $00AD92
	beq.w	loc_00ADCA

loc_00AD96:				; $00AD96
	moveq	#0,d3
; $00AD98
	move.b	($1,a2,d2.w),d3
; $00AD9C
	lea	($05E628).l,a4
; $00ADA2
	add.w	d3,d3
; $00ADA4
	add.w	d3,d3
; $00ADA6
	adda.l	($0,a4,d3.w),a3
; $00ADAA
	move.l	a3,($FFFFA008).l
; $00ADB0
	bsr.w	loc_00B4DC
; $00ADB4
	clr.b	($FFFFA710).w
; $00ADB8
	move.w	($FFFFA958).w,d3
; $00ADBC
	add.w	d3,d3
; $00ADBE
	add.w	d3,d3
; $00ADC0
	lea	($00AEB8).l,a4
; $00ADC6
	jsr	($0,a4,d3.w)

loc_00ADCA:				; $00ADCA
	tst.w	d2
; $00ADCC
	bne.w	loc_00AD40
; $00ADD0
	move.l	($FFFFA00C).l,d0
; $00ADD6
	movem.l	(a7)+,d3/d4/d5/d6/d7/a3/a4/a5/a6
; $00ADDA
	rts
; $00ADDC
	clr.w	($FFFFA61A).w
; $00ADE0
	movea.l	($FFFFA628).w,a0
; $00ADE4
	lea	($FFFFA70C).w,a1
; $00ADE8
	clr.w	(a1)
; $00ADEA
	jsr	($0109DC).l
; $00ADF0
	move.b	$2E(a0),$2(a1)
; $00ADF6
	move.w	($FFFFA958).w,d0
; $00ADFA
	rol.w	#3,d0
; $00ADFC
	lea	($08203C).l,a0
; $00AE02
	move.w	($6,a0,d0.w),d1
; $00AE06
	lea	($FF4000).l,a1
; $00AE0C
	lea	($FF5000).l,a2
; $00AE12
	clr.l	($FFFFA00C).l
; $00AE18
	move.w	#$1000,d2

loc_00AE1C:				; $00AE1C
	subq.w	#2,d2
; $00AE1E
	tst.w	($0,a1,d2.w)
; $00AE22
	bmi.w	loc_00AE92
; $00AE26
	moveq	#0,d3
; $00AE28
	move.b	($0,a2,d2.w),d3
; $00AE2C
	cmpi.b	#$FF,d3
; $00AE30
	beq.w	loc_00AE92
; $00AE34
	lea	($05E5D8).l,a3
; $00AE3A
	add.w	d3,d3
; $00AE3C
	add.w	d3,d3
; $00AE3E
	movea.l	($0,a3,d3.w),a3
; $00AE42
	move.l	a3,($FFFFA004).l
; $00AE48
	movea.l	($FFFFA628).w,a4
; $00AE4C
	move.b	$20(a3),d3
; $00AE50
	and.b	$20(a4),d3
; $00AE54
	beq.w	loc_00AE62
; $00AE58
	tst.w	d1
; $00AE5A
	bne.w	loc_00AE92
; $00AE5E
	bra.w	loc_00AE72

loc_00AE62:				; $00AE62
	tst.w	d1
; $00AE64
	beq.w	loc_00AE92
; $00AE68
	jsr	($0146D6).l
; $00AE6E
	beq.w	loc_00AE92

loc_00AE72:				; $00AE72
	moveq	#0,d3
; $00AE74
	move.b	($1,a2,d2.w),d3
; $00AE78
	lea	($05E628).l,a4
; $00AE7E
	add.w	d3,d3
; $00AE80
	add.w	d3,d3
; $00AE82
	adda.l	($0,a4,d3.w),a3
; $00AE86
	move.l	a3,($FFFFA008).l
; $00AE8C
	movea.l	a3,a0
; $00AE8E
	bsr.w	loc_00B5F8

loc_00AE92:				; $00AE92
	tst.w	d2
; $00AE94
	bne.w	loc_00AE1C
; $00AE98
	move.l	($FFFFA00C).l,d0
; $00AE9E
	move.l	#$0000AEA8,($FFFF8004).w
; $00AEA6
	rts
; $00AEA8
	tst.w	($FFFFA61A).w
; $00AEAC
	bne.w	loc_00AEB6
; $00AEB0
	jsr	($008608).l

loc_00AEB6:				; $00AEB6
	rts
; $00AEB8
	bra.w	loc_00AF14
; $00AEBC
	bra.w	loc_00AF22
; $00AEC0
	bra.w	loc_00AF32
; $00AEC4
	bra.w	loc_00AF6A
; $00AEC8
	bra.w	loc_00AF78
; $00AECC
	bra.w	loc_00AF88
; $00AED0
	bra.w	loc_00AF98
; $00AED4
	bra.w	loc_00AFC4
; $00AED8
	bra.w	loc_00B00A
; $00AEDC
	bra.w	loc_00B026
; $00AEE0
	bra.w	loc_00B072
; $00AEE4
	bra.w	loc_00B026
; $00AEE8
	bra.w	loc_00B072
; $00AEEC
	bra.w	loc_00B07E
; $00AEF0
	bra.w	loc_00B0F8
; $00AEF4
	bra.w	loc_00B178
; $00AEF8
	bra.w	loc_00B1BA
; $00AEFC
	bra.w	loc_00B1FC
; $00AF00
	bra.w	loc_00B272
; $00AF04
	bra.w	loc_00B274
; $00AF08
	bra.w	loc_00B276
; $00AF0C
	bra.w	loc_00B2B8
; $00AF10
	bra.w	loc_00B372

loc_00AF14:				; $00AF14
	moveq	#0,d0
; $00AF16
	move.b	($FFFFA70E).w,d0
; $00AF1A
	lsr.b	#1,d0
; $00AF1C
	add.b	d0,d0
; $00AF1E
	bra.w	loc_00B3CA

loc_00AF22:				; $00AF22
	moveq	#0,d0
; $00AF24
	move.b	($FFFFA70E).w,d0
; $00AF28
	lsr.b	#1,d0
; $00AF2A
	addi.b	#$14,d0
; $00AF2E
	bra.w	loc_00B3CA

loc_00AF32:				; $00AF32
	movem.l	a6,-(a7)
; $00AF36
	moveq	#0,d0
; $00AF38
	move.b	($FFFFA70E).w,d0
; $00AF3C
	lsr.b	#1,d0
; $00AF3E
	addq.b	#5,d0
; $00AF40
	lea	($FF3000).l,a0
; $00AF46
	move.b	($0,a0,d2.w),d1
; $00AF4A
	cmpi.b	#$06,d1
; $00AF4E
	beq.w	loc_00AF5A
; $00AF52
	cmpi.b	#$14,d1
; $00AF56
	bne.w	loc_00AF60

loc_00AF5A:				; $00AF5A
	move.b	#$01,($FFFFA710).w

loc_00AF60:				; $00AF60
	bsr.w	loc_00B3CA
; $00AF64
	movem.l	(a7)+,a6
; $00AF68
	rts

loc_00AF6A:				; $00AF6A
	moveq	#0,d0
; $00AF6C
	move.b	($FFFFA70E).w,d0
; $00AF70
	lsr.b	#1,d0
; $00AF72
	addq.b	#3,d0
; $00AF74
	bra.w	loc_00B3CA

loc_00AF78:				; $00AF78
	moveq	#0,d0
; $00AF7A
	move.b	($FFFFA70E).w,d0
; $00AF7E
	lsr.b	#1,d0
; $00AF80
	addi.b	#$0A,d0
; $00AF84
	bra.w	loc_00B3CA

loc_00AF88:				; $00AF88
	moveq	#0,d0
; $00AF8A
	move.b	($FFFFA70E).w,d0
; $00AF8E
	lsr.b	#1,d0
; $00AF90
	addq.b	#2,d0
; $00AF92
	add.w	d0,d0
; $00AF94
	bra.w	loc_00B3CA

loc_00AF98:				; $00AF98
	movem.l	a6,-(a7)
; $00AF9C
	moveq	#0,d0
; $00AF9E
	move.b	($FFFFA70E).w,d0
; $00AFA2
	lsr.b	#1,d0
; $00AFA4
	addq.b	#2,d0
; $00AFA6
	add.w	d0,d0
; $00AFA8
	move.b	($FFFFA713).w,d1
; $00AFAC
	cmpi.b	#$05,d1
; $00AFB0
	bne.w	loc_00AFBA
; $00AFB4
	move.b	#$01,($FFFFA710).w

loc_00AFBA:				; $00AFBA
	bsr.w	loc_00B3CA
; $00AFBE
	movem.l	(a7)+,a6
; $00AFC2
	rts

loc_00AFC4:				; $00AFC4
	cmpa.l	($FFFFA004).l,a3
; $00AFCA
	beq.w	loc_00B008
; $00AFCE
	cmpi.b	#$13,($00000E).w
; $00AFD4
	beq.w	loc_00AFE2
; $00AFD8
	cmpi.b	#$13,($00000D).w
; $00AFDE
	bne.w	loc_00B008

loc_00AFE2:				; $00AFE2
	moveq	#0,d0
; $00AFE4
	move.b	$3(a3),d0
; $00AFE8
	add.w	d0,($FFFFA00C).l
; $00AFEE
	addq.w	#1,($FFFFA00E).l
; $00AFF4
	cmpi.b	#$10,($01FFFF).l
; $00AFFC
	bne.w	loc_00B008
; $00B000
	clr.b	$3(a3)
; $00B004
	bsr.w	loc_00B44E

loc_00B008:				; $00B008
	rts

loc_00B00A:				; $00B00A
	cmpi.b	#$13,($000005).w
; $00B010
	beq.w	loc_00B024
; $00B014
	moveq	#0,d0
; $00B016
	move.b	($FFFFA70E).w,d0
; $00B01A
	lsr.b	#1,d0
; $00B01C
	addq.b	#5,d0
; $00B01E
	add.w	d0,d0
; $00B020
	bra.w	loc_00B3CA

loc_00B024:				; $00B024
	rts

loc_00B026:				; $00B026
	moveq	#10,d0
; $00B028
	sub.b	$3(a3),d0
; $00B02C
	beq.w	loc_00B070
; $00B030
	cmpi.b	#$03,d0
; $00B034
	ble.w	loc_00B03A
; $00B038
	moveq	#3,d0

loc_00B03A:				; $00B03A
	btst	#6,$2(a3)
; $00B040
	bne.w	loc_00B050
; $00B044
	add.w	d0,($FFFFA00C).l
; $00B04A
	addq.w	#1,($FFFFA00E).l

loc_00B050:				; $00B050
	cmpi.b	#$10,($01FFFF).l
; $00B058
	bne.w	loc_00B070
; $00B05C
	add.b	d0,$3(a3)
; $00B060
	btst	#6,$2(a3)
; $00B066
	bne.w	loc_00B070
; $00B06A
	addq.b	#1,($FFFFA49A).l

loc_00B070:				; $00B070
	rts

loc_00B072:				; $00B072
	moveq	#10,d0
; $00B074
	sub.b	$3(a3),d0
; $00B078
	bne.w	loc_00B03A
; $00B07C
	rts

loc_00B07E:				; $00B07E
	movem.l	a5/d3,-(a7)
; $00B082
	moveq	#0,d2
; $00B084
	move.b	$4(a3),d2
; $00B088
	add.w	d2,d2
; $00B08A
	add.w	d2,d2
; $00B08C
	lea	($05E5D8).l,a4
; $00B092
	movea.l	($0,a4,d2.w),a4
; $00B096
	jsr	($0146E0).l
; $00B09C
	beq.w	loc_00B0F2
; $00B0A0
	cmpi.b	#$13,($00000E).w
; $00B0A6
	beq.w	loc_00B0F2
; $00B0AA
	btst	#3,$2(a3)
; $00B0B0
	bne.w	loc_00B0F2
; $00B0B4
	cmpi.b	#$10,($01FFFF).l
; $00B0BC
	bne.w	loc_00B0DC
; $00B0C0
	bsr.w	loc_00B394
; $00B0C4
	beq.w	loc_00B0D2
; $00B0C8
	ori.b	#$02,$8(a3)
; $00B0CE
	bra.w	loc_00B0F2

loc_00B0D2:				; $00B0D2
	jsr	($00B484).l
; $00B0D8
	bra.w	loc_00B0F2

loc_00B0DC:				; $00B0DC
	bsr.w	loc_00B374
; $00B0E0
	move.b	d0,($FFFFA00E).l
; $00B0E6
	addq.w	#1,($FFFFA00C).l
; $00B0EC
	addq.b	#1,($FFFFA00F).l

loc_00B0F2:				; $00B0F2
	movem.l	(a7)+,d3/a5
; $00B0F6
	rts

loc_00B0F8:				; $00B0F8
	movem.l	a5/d3,-(a7)
; $00B0FC
	moveq	#0,d2
; $00B0FE
	move.b	$4(a3),d2
; $00B102
	add.w	d2,d2
; $00B104
	add.w	d2,d2
; $00B106
	lea	($05E5D8).l,a4
; $00B10C
	movea.l	($0,a4,d2.w),a4
; $00B110
	jsr	($0146E0).l
; $00B116
	beq.w	loc_00B172
; $00B11A
	move.b	$5(a3),d0
; $00B11E
	beq.w	loc_00B12A
; $00B122
	cmpi.b	#$07,d0
; $00B126
	bne.w	loc_00B172

loc_00B12A:				; $00B12A
	btst	#4,$2(a3)
; $00B130
	bne.w	loc_00B172
; $00B134
	cmpi.b	#$10,($01FFFF).l
; $00B13C
	bne.w	loc_00B15C
; $00B140
	bsr.w	loc_00B394
; $00B144
	beq.w	loc_00B152
; $00B148
	ori.b	#$02,$10(a3)
; $00B14E
	bra.w	loc_00B172

loc_00B152:				; $00B152
	jsr	($00B484).l
; $00B158
	bra.w	loc_00B172

loc_00B15C:				; $00B15C
	bsr.w	loc_00B374
; $00B160
	move.b	d0,($FFFFA00E).l
; $00B166
	addq.w	#1,($FFFFA00C).l
; $00B16C
	addq.b	#1,($FFFFA00F).l

loc_00B172:				; $00B172
	movem.l	(a7)+,d3/a5
; $00B176
	rts

loc_00B178:				; $00B178
	movea.l	($FFFFA004).l,a0
; $00B17E
	btst	#1,$8(a0)
; $00B184
	bne.w	loc_00B1B8
; $00B188
	tst.b	$5(a3)
; $00B18C
	beq.w	loc_00B1B8
; $00B190
	btst	#6,$2(a3)
; $00B196
	bne.w	loc_00B1B8
; $00B19A
	addq.w	#1,($FFFFA00C).l
; $00B1A0
	addq.w	#1,($FFFFA00E).l
; $00B1A6
	cmpi.b	#$10,($01FFFF).l
; $00B1AE
	bne.w	loc_00B1B8
; $00B1B2
	ori.b	#$08,$2(a0)

loc_00B1B8:				; $00B1B8
	rts

loc_00B1BA:				; $00B1BA
	movea.l	($FFFFA004).l,a0
; $00B1C0
	btst	#0,$8(a0)
; $00B1C6
	bne.w	loc_00B1FA
; $00B1CA
	tst.b	$5(a3)
; $00B1CE
	beq.w	loc_00B1FA
; $00B1D2
	btst	#6,$2(a3)
; $00B1D8
	bne.w	loc_00B1FA
; $00B1DC
	addq.w	#1,($FFFFA00C).l
; $00B1E2
	addq.w	#1,($FFFFA00E).l
; $00B1E8
	cmpi.b	#$10,($01FFFF).l
; $00B1F0
	bne.w	loc_00B1FA
; $00B1F4
	ori.b	#$08,$1(a0)

loc_00B1FA:				; $00B1FA
	rts

loc_00B1FC:				; $00B1FC
	movem.l	a5/d3,-(a7)
; $00B200
	moveq	#0,d2
; $00B202
	move.b	$4(a3),d2
; $00B206
	add.w	d2,d2
; $00B208
	add.w	d2,d2
; $00B20A
	lea	($05E5D8).l,a4
; $00B210
	movea.l	($0,a4,d2.w),a4
; $00B214
	jsr	($0146E0).l
; $00B21A
	beq.w	loc_00B26C
; $00B21E
	movea.l	($FFFFA004).l,a0
; $00B224
	btst	#3,$8(a0)
; $00B22A
	bne.w	loc_00B26C
; $00B22E
	cmpi.b	#$10,($01FFFF).l
; $00B236
	bne.w	loc_00B256
; $00B23A
	bsr.w	loc_00B394
; $00B23E
	beq.w	loc_00B24C
; $00B242
	ori.b	#$08,$8(a0)
; $00B248
	bra.w	loc_00B26C

loc_00B24C:				; $00B24C
	jsr	($00B484).l
; $00B252
	bra.w	loc_00B26C

loc_00B256:				; $00B256
	bsr.w	loc_00B374
; $00B25A
	move.b	d0,($FFFFA00E).l
; $00B260
	addq.w	#1,($FFFFA00C).l
; $00B266
	addq.b	#1,($FFFFA00F).l

loc_00B26C:				; $00B26C
	movem.l	(a7)+,d3/a5
; $00B270
	rts

loc_00B272:				; $00B272
	rts

loc_00B274:				; $00B274
	rts

loc_00B276:				; $00B276
	movea.l	($FFFFA004).l,a0
; $00B27C
	btst	#2,$8(a0)
; $00B282
	bne.w	loc_00B2B6
; $00B286
	tst.b	$5(a3)
; $00B28A
	beq.w	loc_00B2B6
; $00B28E
	btst	#6,$2(a3)
; $00B294
	bne.w	loc_00B2B6
; $00B298
	addq.w	#1,($FFFFA00C).l
; $00B29E
	addq.w	#1,($FFFFA00E).l
; $00B2A4
	cmpi.b	#$10,($01FFFF).l
; $00B2AC
	bne.w	loc_00B2B6
; $00B2B0
	ori.b	#$08,$4(a0)

loc_00B2B6:				; $00B2B6
	rts

loc_00B2B8:				; $00B2B8
	movem.l	a5/d6/d3,-(a7)
; $00B2BC
	moveq	#0,d2
; $00B2BE
	move.b	$4(a3),d2
; $00B2C2
	add.w	d2,d2
; $00B2C4
	add.w	d2,d2
; $00B2C6
	lea	($05E5D8).l,a4
; $00B2CC
	movea.l	($0,a4,d2.w),a4
; $00B2D0
	jsr	($0146E0).l
; $00B2D6
	beq.w	loc_00B36C
; $00B2DA
	cmpi.b	#$13,($00000E).w
; $00B2E0
	beq.w	loc_00B36C
; $00B2E4
	cmpi.b	#$10,($01FFFF).l
; $00B2EC
	bne.w	loc_00B356
; $00B2F0
	bsr.w	loc_00B394
; $00B2F4
	beq.w	loc_00B34C
; $00B2F8
	movea.l	($FFFFA004).l,a0
; $00B2FE
	move.b	$5C(a0),d0
; $00B302
	beq.w	loc_00B30A
; $00B306
	move.b	d0,$20(a0)

loc_00B30A:				; $00B30A
	move.b	$20(a0),$5C(a0)
; $00B310
	movea.l	($FFFFA628).w,a1
; $00B314
	move.b	$20(a1),$20(a0)
; $00B31A
	cmpi.b	#$5C,$1(a0)
; $00B320
	beq.w	loc_00B334
; $00B324
	cmpi.b	#$20,$1(a0)
; $00B32A
	bne.w	loc_00B334
; $00B32E
	move.b	#$03,$20(a0)

loc_00B334:				; $00B334
	move.b	$5C(a0),d0
; $00B338
	cmp.b	$20(a0),d0
; $00B33C
	bne.w	loc_00B344
; $00B340
	clr.b	$5C(a0)

loc_00B344:				; $00B344
	bsr.w	loc_0111BC
; $00B348
	bra.w	loc_00B36C

loc_00B34C:				; $00B34C
	jsr	($00B484).l
; $00B352
	bra.w	loc_00B36C

loc_00B356:				; $00B356
	bsr.w	loc_00B374
; $00B35A
	move.b	d0,($FFFFA00E).l
; $00B360
	addq.w	#1,($FFFFA00C).l
; $00B366
	addq.b	#1,($FFFFA00F).l

loc_00B36C:				; $00B36C
	movem.l	(a7)+,d3/d6/a5
; $00B370
	rts

loc_00B372:				; $00B372
	rts

loc_00B374:				; $00B374
	movem.l	a6,-(a7)
; $00B378
	move.b	($FFFFA70E).w,d1
; $00B37C
	sub.b	($FFFFA712).w,d1
; $00B380
	movem.w	d0/d1/d3/d6/a1/a7,d1
; $00B384
	add.w	d1,d1
; $00B386
	moveq	#0,d0
; $00B388
	move.b	($FFFFA711).w,d0
; $00B38C
	sub.w	d1,d0
; $00B38E
	movem.l	(a7)+,a6
; $00B392
	rts

loc_00B394:				; $00B394
	bsr.w	loc_00B374
; $00B398
	cmpi.b	#$11,($000064).w
; $00B39E
	beq.w	loc_00B3C4
; $00B3A2
	moveq	#101,d2
; $00B3A4
	jsr	($0085A2).l
; $00B3AA
	cmp.w	d2,d0
; $00B3AC
	bgt.w	loc_00B3C4
; $00B3B0
	addq.w	#1,($FFFFA00C).l
; $00B3B6
	addq.w	#1,($FFFFA00E).l
; $00B3BC
	andi.b	#$00,#$F7
; $00B3C2
	ori.b	#$3C,d6
; $00B3C6
	ori.b	#$75,a0

loc_00B3CA:				; $00B3CA
	moveq	#0,d1
; $00B3CC
	move.b	$4(a3),d1
; $00B3D0
	add.w	d1,d1
; $00B3D2
	add.w	d1,d1
; $00B3D4
	lea	($05E5D8).l,a4
; $00B3DA
	movea.l	($0,a4,d1.w),a4
; $00B3DE
	jsr	($0146E0).l
; $00B3E4
	beq.w	loc_00B44C
; $00B3E8
	moveq	#100,d1
; $00B3EA
	sub.b	($FFFFA711).w,d1
; $00B3EE
	beq.w	loc_00B44C
; $00B3F2
	mulu.w	d1,d0
; $00B3F4
	beq.w	loc_00B3FC
; $00B3F8
	divu.w	#$0064,d0

loc_00B3FC:				; $00B3FC
	add.b	($FFFFA710).w,d0
; $00B400
	add.b	($FFFFA70C).w,d0
; $00B404
	bne.w	loc_00B40A
; $00B408
	moveq	#1,d0

loc_00B40A:				; $00B40A
	cmp.b	$3(a3),d0
; $00B40E
	ble.w	loc_00B416
; $00B412
	move.b	$3(a3),d0

loc_00B416:				; $00B416
	add.w	d0,($FFFFA00C).l
; $00B41C
	addq.w	#1,($FFFFA00E).l
; $00B422
	cmpi.b	#$10,($01FFFF).l
; $00B42A
	bne.w	loc_00B44C
; $00B42E
	btst	#6,$2(a3)
; $00B434
	beq.w	loc_00B440
; $00B438
	clr.b	$3(a3)
; $00B43C
	bra.w	loc_00B44C

loc_00B440:				; $00B440
	sub.b	d0,$3(a3)
; $00B444
	bne.w	loc_00B44C
; $00B448
	bsr.w	loc_00B44E

loc_00B44C:				; $00B44C
	rts

loc_00B44E:				; $00B44E
	movem.l	d6,-(a7)
; $00B452
	moveq	#0,d0
; $00B454
	move.b	$0(a3),d0
; $00B458
	mulu.w	#$001C,d0
; $00B45C
	lea	($05EDDC).l,a1
; $00B462
	move.b	($12,a1,d0.w),d0
; $00B466
	add.b	d0,($FFFFA49A).l
; $00B46C
	bcc.w	loc_00B478
; $00B470
	move.b	#$FF,($FFFFA49A).l

loc_00B478:				; $00B478
	addq.b	#1,($FFFFA49B).l
; $00B47E
	movem.l	(a7)+,d6
; $00B482
	rts

loc_00B484:				; $00B484
	movem.l	a7/a6/a5/d7,-(a7)
; $00B488
	jsr	($0094DC).l
; $00B48E
	move.w	#$0A2A,$0(a0)
; $00B494
	moveq	#0,d1
; $00B496
	move.b	$6(a3),d1
; $00B49A
	moveq	#0,d2
; $00B49C
	move.b	$7(a3),d2
; $00B4A0
	move.w	d1,d0
; $00B4A2
	sub.w	($FFFF9F24).l,d0
; $00B4A8
	mulu.w	#$0018,d0
; $00B4AC
	subq.w	#4,d0
; $00B4AE
	addi.w	#$0080,d0
; $00B4B2
	move.w	d0,$2(a0)
; $00B4B6
	move.w	d2,d0
; $00B4B8
	sub.w	($FFFF9F26).l,d0
; $00B4BE
	mulu.w	#$0018,d0
; $00B4C2
	subq.w	#4,d0
; $00B4C4
	addi.w	#$0080,d0
; $00B4C8
	move.w	d0,$4(a0)
; $00B4CC
	move.w	#$003C,$6(a0)
; $00B4D2
	addq.w	#1,($FFFFA61A).w
; $00B4D6
	movem.l	(a7)+,d7/a5/a6/a7
; $00B4DA
	rts

loc_00B4DC:				; $00B4DC
	movem.l	a6/d6,-(a7)
; $00B4E0
	lea	($FFFFA710).w,a1
; $00B4E4
	clr.w	(a1)
; $00B4E6
	movea.l	($FFFFA004).l,a0
; $00B4EC
	move.b	$2E(a0),$2(a1)
; $00B4F2
	btst	#2,$8(a0)
; $00B4F8
	beq.w	loc_00B502
; $00B4FC
	addi.b	#$01,$32(a1)

loc_00B502:				; $00B502
	movea.l	($FFFFA008).l,a3
; $00B508
	cmpa.l	a3,a0
; $00B50A
	bne.w	loc_00B51C
; $00B50E
	jsr	($0109DC).l
; $00B514
	move.b	$50(a0),d0
; $00B518
	add.b	d0,$1(a1)

loc_00B51C:				; $00B51C
	jsr	($010A02).l
; $00B522
	moveq	#0,d0
; $00B524
	move.b	$0(a3),d0
; $00B528
	mulu.w	#$001C,d0
; $00B52C
	cmpa.l	a3,a0
; $00B52E
	beq.w	loc_00B540
; $00B532
	lea	($05EDDC).l,a0
; $00B538
	move.b	($13,a0,d0.w),d1
; $00B53C
	add.b	d1,$1(a1)

loc_00B540:				; $00B540
	cmpi.b	#$01,$64(a1)
; $00B546
	bmi.w	loc_00B550
; $00B54A
	move.b	#$64,$1(a1)

loc_00B550:				; $00B550
	lea	($05EDDC).l,a0
; $00B556
	move.b	($6,a0,d0.w),$3(a1)
; $00B55C
	movem.l	(a7)+,d6/a6
; $00B560
	rts

loc_00B562:				; $00B562
	movem.l	a7/a6/a5/d7/d6/d5,-(a7)
; $00B566
	bsr.w	loc_00AA8E
; $00B56A
	move.w	($FFFFA6E8).w,d0
; $00B56E
	mulu.w	($FFFF9F2C).l,d0
; $00B574
	add.w	($FFFFA6E6).w,d0
; $00B578
	add.w	d0,d0
; $00B57A
	lea	($FF5000).l,a0
; $00B580
	moveq	#0,d1
; $00B582
	move.b	($0,a0,d0.w),d1
; $00B586
	lea	($05E5D8).l,a0
; $00B58C
	add.w	d1,d1
; $00B58E
	add.w	d1,d1
; $00B590
	movea.l	($0,a0,d1.w),a1
; $00B594
	movea.l	($FFFFA004).l,a1
; $00B59A
	moveq	#0,d0
; $00B59C
	move.b	$0(a1),d0
; $00B5A0
	mulu.w	#$001C,d0
; $00B5A4
	lea	($05EDDC).l,a2
; $00B5AA
	adda.w	($2,a2,d0.w),a2
; $00B5AE
	lea	($FF4000).l,a0
; $00B5B4
	lea	($FF3000).l,a1
; $00B5BA
	moveq	#0,d0
; $00B5BC
	move.w	#$07FF,d2

loc_00B5C0:				; $00B5C0
	moveq	#0,d1
; $00B5C2
	move.b	($0,a1,d0.w),d1
; $00B5C6
	move.b	($0,a2,d1.w),d1
; $00B5CA
	bpl.w	loc_00B5D4
; $00B5CE
	ori.b	#$00,(-$-80,a0,d0.w)

loc_00B5D4:				; $00B5D4
	addq.w	#2,d0
; $00B5D6
	dbf	d2,loc_00B5C0
; $00B5DA
	movem.l	(a7)+,d5/d6/d7/a5/a6/a7
; $00B5DE
	rts

loc_00B5E0:				; $00B5E0
	movem.l	a7/a6/a5/a4/d7/d6/d5/d4/d3,-(a7)
; $00B5E4
	movea.l	a5,a3
; $00B5E6
	move.l	a3,($FFFFA008).l
; $00B5EC
	move.b	#$00,($FFFFA010).l
; $00B5F4
	bra.w	loc_00B612

loc_00B5F8:				; $00B5F8
	movem.l	a7/a6/a5/a4/d7/d6/d5/d4/d3,-(a7)
; $00B5FC
	clr.l	($FFFFA00C).l
; $00B602
	movea.l	a0,a3
; $00B604
	move.l	a3,($FFFFA008).l
; $00B60A
	move.b	#$01,($FFFFA010).l

loc_00B612:				; $00B612
	movea.l	($FFFFA628).w,a0
; $00B616
	lea	($FFFFA70C).w,a1
; $00B61A
	clr.w	(a1)
; $00B61C
	jsr	($0109DC).l
; $00B622
	move.b	$2E(a0),$2(a1)
; $00B628
	move.w	($FFFFA958).w,d0
; $00B62C
	rol.w	#3,d0
; $00B62E
	lea	($08203C).l,a0
; $00B634
	move.w	($6,a0,d0.w),d1
; $00B638
	lea	($FF4000).l,a1
; $00B63E
	lea	($FF5000).l,a2
; $00B644
	moveq	#0,d2
; $00B646
	moveq	#0,d3
; $00B648
	move.b	$6(a3),d2
; $00B64C
	move.b	$7(a3),d3
; $00B650
	mulu.w	($FFFF9F2C).l,d3
; $00B656
	add.w	d3,d2
; $00B658
	add.w	d2,d2
; $00B65A
	moveq	#0,d3
; $00B65C
	move.b	$5(a3),d3
; $00B660
	mulu.w	#$000C,d3
; $00B664
	suba.w	d3,a3
; $00B666
	move.l	a3,($FFFFA004).l
; $00B66C
	movea.l	($FFFFA628).w,a4
; $00B670
	bsr.w	loc_00B4DC
; $00B674
	clr.b	($FFFFA710).w
; $00B678
	move.w	($FFFFA958).w,d3
; $00B67C
	add.w	d3,d3
; $00B67E
	add.w	d3,d3
; $00B680
	lea	($00AEB8).l,a4
; $00B686
	jsr	($0,a4,d3.w)
; $00B68A
	move.b	#$00,($FFFFA010).l
; $00B692
	movem.l	(a7)+,d3/d4/d5/d6/d7/a4/a5/a6/a7
; $00B696
	rts

loc_00B698:				; $00B698
	movem.l	a7/a6/d7,-(a7)
; $00B69C
	move.w	($FFFFA958).w,d0
; $00B6A0
	add.w	d0,d0
; $00B6A2
	add.w	d0,d0
; $00B6A4
	jmp	($2,pc,d0.w)
; $00B6A8
	bra.w	loc_00B704
; $00B6AC
	bra.w	loc_00B704
; $00B6B0
	bra.w	loc_00B704
; $00B6B4
	bra.w	loc_00B736
; $00B6B8
	bra.w	loc_00B736
; $00B6BC
	bra.w	loc_00B736
; $00B6C0
	bra.w	loc_00B736
; $00B6C4
	bra.w	loc_00B736
; $00B6C8
	bra.w	loc_00B736
; $00B6CC
	bra.w	loc_00B736
; $00B6D0
	bra.w	loc_00B736
; $00B6D4
	bra.w	loc_00B736
; $00B6D8
	bra.w	loc_00B736
; $00B6DC
	bra.w	loc_00B736
; $00B6E0
	bra.w	loc_00B704
; $00B6E4
	bra.w	loc_00B736
; $00B6E8
	bra.w	loc_00B736
; $00B6EC
	bra.w	loc_00B704
; $00B6F0
	bra.w	loc_00B736
; $00B6F4
	bra.w	loc_00B736
; $00B6F8
	bra.w	loc_00B736
; $00B6FC
	bra.w	loc_00B736
; $00B700
	bra.w	loc_00B736

loc_00B704:				; $00B704
	lea	($FF5000).l,a0
; $00B70A
	move.w	($FFFFA620).w,d1
; $00B70E
	move.b	($0,a0,d1.w),d1
; $00B712
	cmpi.b	#$FF,d1
; $00B716
	beq.w	loc_00B736
; $00B71A
	andi.w	#$00FF,d1
; $00B71E
	add.w	d1,d1
; $00B720
	add.w	d1,d1
; $00B722
	lea	($05E5D8).l,a0
; $00B728
	move.l	($0,a0,d1.w),($FFFFA630).w
; $00B72E
	andi.b	#$00,#$FB
; $00B734
	ori.b	#$B8,a2
; $00B738
	dc.w	$A630
; $00B73A
	ori	#$DF,ccr
; $00B740
	btst	d0,d3
; $00B742
	rts

loc_00B744:				; $00B744
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2,-(a7)
; $00B748
	lea	($FF1000).l,a4
; $00B74E
	movea.l	a4,a5
; $00B750
	move.w	$4(a6),d1
; $00B754
	move.w	$6(a6),d0
; $00B758
	move.w	d1,(a4)+
; $00B75A
	move.w	d0,(a4)+
; $00B75C
	mulu.w	($FFFF9F2C).l,d0
; $00B762
	add.w	d1,d0
; $00B764
	add.w	d0,d0
; $00B766
	move.w	d0,d1
; $00B768
	move.w	d0,(a4)+
; $00B76A
	move.w	#$FFFF,(a4)
; $00B76E
	lea	($FF5000).l,a0
; $00B774
	moveq	#0,d2
; $00B776
	move.b	($0,a0,d1.w),d2
; $00B77A
	cmpi.b	#$FF,d2
; $00B77E
	beq.w	loc_00B994
; $00B782
	moveq	#0,d4
; $00B784
	moveq	#0,d3
; $00B786
	move.b	($1,a0,d1.w),d3
; $00B78A
	beq.w	loc_00B790
; $00B78E
	addq.w	#1,d4

loc_00B790:				; $00B790
	add.w	d2,d2
; $00B792
	add.w	d2,d2
; $00B794
	lea	($05E5D8).l,a2
; $00B79A
	movea.l	($0,a2,d2.w),a3
; $00B79E
	movea.l	a3,a1
; $00B7A0
	move.b	$20(a1),($FFFF9F60).l
; $00B7A8
	jsr	($0146CC).l
; $00B7AE
	bne.w	loc_00B7BA
; $00B7B2
	move.b	#$0F,($FFFF9F60).l

loc_00B7BA:				; $00B7BA
	add.w	d3,d3
; $00B7BC
	add.w	d3,d3
; $00B7BE
	adda.l	($50,a2,d3.w),a1
; $00B7C2
	moveq	#0,d1
; $00B7C4
	move.b	$0(a1),d1
; $00B7C8
	mulu.w	#$001C,d1
; $00B7CC
	move.w	d1,($FFFF9F5E).l
; $00B7D2
	lea	($05EDDC).l,a2
; $00B7D8
	tst.w	d4
; $00B7DA
	beq.w	loc_00B7F0
; $00B7DE
	btst	#6,$2(a1)
; $00B7E4
	bne.w	loc_00B7F0
; $00B7E8
	move.b	($D,a2,d1.w),d1
; $00B7EC
	bra.w	loc_00B7F4

loc_00B7F0:				; $00B7F0
	move.b	$44(a3),d1

loc_00B7F4:				; $00B7F4
	tst.b	$8(a6)
; $00B7F8
	beq.w	loc_00B808
; $00B7FC
	move.b	$8(a6),($FFFF9F5C).l
; $00B804
	bra.w	loc_00B816

loc_00B808:				; $00B808
	addq.b	#1,d1
; $00B80A
	move.b	d1,($FFFF9F5C).l
; $00B810
	jsr	($0109A0).l

loc_00B816:				; $00B816
	move.w	($FFFF9F5E).l,d1
; $00B81C
	adda.w	($2,a2,d1.w),a2
; $00B820
	lea	($FF4000).l,a1
; $00B826
	movea.l	a1,a0
; $00B828
	move.l	#$FF00FF00,d2
; $00B82E
	move.w	#$03FF,d1

loc_00B832:				; $00B832
	exg	d2,a1
; $00B834
	dbf	d1,loc_00B832
; $00B838
	lea	($FF3000).l,a1
; $00B83E
	bsr.w	loc_00BA74
; $00B842
	move.b	($FFFF9F5C).l,($1,a0,d0.w)

loc_00B84A:				; $00B84A
	move.w	(a5)+,d4
; $00B84C
	cmpi.w	#$FFFF,d4
; $00B850
	beq.w	loc_00B972
; $00B854
	move.w	(a5)+,d5
; $00B856
	move.w	(a5)+,d6
; $00B858
	move.b	($1,a0,d6.w),d7
; $00B85C
	move.w	d4,d1
; $00B85E
	addq.w	#1,d1
; $00B860
	move.w	d5,d2
; $00B862
	move.w	d6,d3
; $00B864
	addq.w	#2,d3
; $00B866
	bsr.w	loc_00B9A2
; $00B86A
	move.w	d4,d1
; $00B86C
	subq.w	#1,d1
; $00B86E
	move.w	d5,d2
; $00B870
	move.w	d6,d3
; $00B872
	subq.w	#2,d3
; $00B874
	bsr.w	loc_00B9A2
; $00B878
	move.w	d4,d1
; $00B87A
	move.w	d5,d2
; $00B87C
	subq.w	#1,d2
; $00B87E
	move.w	d6,d3
; $00B880
	sub.w	($FFFF9F2C).l,d3
; $00B886
	sub.w	($FFFF9F2C).l,d3
; $00B88C
	bsr.w	loc_00B9A2
; $00B890
	move.w	d4,d1
; $00B892
	move.w	d5,d2
; $00B894
	addq.w	#1,d2
; $00B896
	move.w	d6,d3
; $00B898
	add.w	($FFFF9F2C).l,d3
; $00B89E
	add.w	($FFFF9F2C).l,d3
; $00B8A4
	bsr.w	loc_00B9A2
; $00B8A8
	tst.b	$C(a6)
; $00B8AC
	beq.w	loc_00B95E
; $00B8B0
	bmi.w	loc_00B8E8
; $00B8B4
	movem.l	a7/a6,-(a7)
; $00B8B8
	move.w	d4,d0
; $00B8BA
	move.w	d5,d1
; $00B8BC
	sub.w	$E(a6),d0
; $00B8C0
	bpl.w	loc_00B8C6
; $00B8C4
	neg.w	d0

loc_00B8C6:				; $00B8C6
	sub.w	$10(a6),d1
; $00B8CA
	bpl.w	loc_00B8D0
; $00B8CE
	neg.w	d1

loc_00B8D0:				; $00B8D0
	add.w	d1,d0
; $00B8D2
	addq.w	#1,d0
; $00B8D4
	cmp.b	$D(a6),d0
; $00B8D8
	bne.w	loc_00B8E0
; $00B8DC
	bsr.w	loc_00BA32

loc_00B8E0:				; $00B8E0
	movem.l	(a7)+,a6/a7
; $00B8E4
	bra.w	loc_00B95E

loc_00B8E8:				; $00B8E8
	movem.l	a7/a6/d4/d3,-(a7)
; $00B8EC
	move.b	($1,a0,d6.w),d1
; $00B8F0
	beq.w	loc_00B95A
; $00B8F4
	move.b	($0,a0,d6.w),d1
; $00B8F8
	andi.b	#$0F,d1
; $00B8FC
	beq.w	loc_00B95A
; $00B900
	and.b	($FFFF9F60).l,d1
; $00B906
	bne.w	loc_00B95A
; $00B90A
	lea	($FF5000).l,a3
; $00B910
	moveq	#0,d1
; $00B912
	move.b	($0,a3,d0.w),d1
; $00B916
	add.w	d1,d1
; $00B918
	add.w	d1,d1
; $00B91A
	lea	($05E5D8).l,a3
; $00B920
	movea.l	($0,a3,d1.w),a3
; $00B924
	jsr	($0146D6).l
; $00B92A
	beq.w	loc_00B95A
; $00B92E
	btst	#4,$17(a3)
; $00B934
	beq.w	loc_00B942
; $00B938
	btst	#2,($FFFFA97C).w
; $00B93E
	bne.w	loc_00B95A

loc_00B942:				; $00B942
	move.w	d4,$E(a6)
; $00B946
	move.w	d5,$10(a6)
; $00B94A
	move.b	#$01,$C(a6)
; $00B950
	move.b	#$01,$D(a6)
; $00B956
	bsr.w	loc_00BA74

loc_00B95A:				; $00B95A
	movem.l	(a7)+,d3/d4/a6/a7

loc_00B95E:				; $00B95E
	cmpa.l	#$00FF2000,a5
; $00B964
	blt.w	loc_00B84A
; $00B968
	lea	($FF1000).l,a5
; $00B96E
	bra.w	loc_00B84A

loc_00B972:				; $00B972
	movea.l	a0,a1
; $00B974
	addq.l	#1,a0
; $00B976
	move.w	#$07FF,d0

loc_00B97A:				; $00B97A
	tst.b	(a0)
; $00B97C
	bne.w	loc_00B988
; $00B980
	ori.b	#$80,(a1)
; $00B984
	bra.w	loc_00B98C

loc_00B988:				; $00B988
	andi.b	#$7F,(a1)

loc_00B98C:				; $00B98C
	addq.w	#2,a0
; $00B98E
	addq.w	#2,a1
; $00B990
	dbf	d0,loc_00B97A

loc_00B994:				; $00B994
	move.b	#$01,($FFFF9F35).l
; $00B99C
	movem.l	(a7)+,d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $00B9A0
	rts

loc_00B9A2:				; $00B9A2
	movem.l	a7/a1/a0,-(a7)
; $00B9A6
	cmpi.w	#$0000,d1
; $00B9AA
	ble.w	loc_00BA2C
; $00B9AE
	move.w	($FFFF9F2C).l,d0
; $00B9B4
	subq.w	#1,d0
; $00B9B6
	cmp.w	d0,d1
; $00B9B8
	bge.w	loc_00BA2C
; $00B9BC
	cmpi.w	#$0000,d2
; $00B9C0
	ble.w	loc_00BA2C
; $00B9C4
	move.w	($FFFF9F2E).l,d0
; $00B9CA
	subq.w	#1,d0
; $00B9CC
	cmp.w	d0,d2
; $00B9CE
	bge.w	loc_00BA2C
; $00B9D2
	tst.w	$A(a6)
; $00B9D6
	bne.w	loc_00B9F0
; $00B9DA
	move.b	($0,a0,d3.w),d6
; $00B9DE
	andi.b	#$0F,d6
; $00B9E2
	beq.w	loc_00B9F0
; $00B9E6
	and.b	($FFFF9F60).l,d6
; $00B9EC
	beq.w	loc_00BA2C

loc_00B9F0:				; $00B9F0
	moveq	#0,d6
; $00B9F2
	move.b	($0,a1,d3.w),d6
; $00B9F6
	move.b	($0,a2,d6.w),d6
; $00B9FA
	bmi.w	loc_00BA2C
; $00B9FE
	move.b	($1,a0,d3.w),d0
; $00BA02
	sub.b	d6,d7
; $00BA04
	bls.w	loc_00BA2C
; $00BA08
	cmp.b	d0,d7
; $00BA0A
	bls.w	loc_00BA2C
; $00BA0E
	move.b	d7,($1,a0,d3.w)
; $00BA12
	move.w	d1,(a4)+
; $00BA14
	move.w	d2,(a4)+
; $00BA16
	move.w	d3,(a4)+
; $00BA18
	cmpa.l	#$00FF2000,a4
; $00BA1E
	blt.w	loc_00BA28
; $00BA22
	lea	($FF1000).l,a4

loc_00BA28:				; $00BA28
	move.w	#$FFFF,(a4)

loc_00BA2C:				; $00BA2C
	movem.l	(a7)+,a0/a1/a7
; $00BA30
	rts

loc_00BA32:				; $00BA32
	movem.l	a7/a6/a2/d7,-(a7)
; $00BA36
	mulu.w	($FFFF9F2C).l,d5
; $00BA3C
	add.w	d4,d5
; $00BA3E
	add.w	d5,d5
; $00BA40
	adda.w	#$0001,a0
; $00BA44
	move.b	($0,a0,d5.w),d0
; $00BA48
	cmpi.b	#$02,d0
; $00BA4C
	bcs.w	loc_00BA6E
; $00BA50
	subq.b	#1,d0
; $00BA52
	move.w	#$07FF,d1

loc_00BA56:				; $00BA56
	move.b	(a0),d5
; $00BA58
	beq.w	loc_00BA66
; $00BA5C
	sub.b	d0,d5
; $00BA5E
	bcc.w	loc_00BA64
; $00BA62
	moveq	#0,d5

loc_00BA64:				; $00BA64
	move.b	d5,(a0)

loc_00BA66:				; $00BA66
	adda.w	#$0002,a0
; $00BA6A
	dbf	d1,loc_00BA56

loc_00BA6E:				; $00BA6E
	movem.l	(a7)+,d7/a2/a6/a7
; $00BA72
	rts

loc_00BA74:				; $00BA74
	movem.l	a6/a5/a4/a3/a2/a1/a0,-(a7)
; $00BA78
	moveq	#0,d1
; $00BA7A
	tst.b	$C(a6)
; $00BA7E
	beq.w	loc_00BB26
; $00BA82
	bmi.w	loc_00BB2A
; $00BA86
	move.w	$E(a6),($FFFFA8C6).w
; $00BA8C
	move.w	$10(a6),($FFFFA8C8).w
; $00BA92
	move.w	($FFFFA8C8).w,d2
; $00BA96
	mulu.w	($FFFF9F2C).l,d2
; $00BA9C
	add.w	($FFFFA8C6).w,d2
; $00BAA0
	add.w	d2,d2
; $00BAA2
	moveq	#0,d1
; $00BAA4
	move.b	$D(a6),d1
; $00BAA8
	bne.w	loc_00BABC
; $00BAAC
	moveq	#0,d3
; $00BAAE
	move.b	($0,a1,d2.w),d3
; $00BAB2
	move.b	($0,a2,d3.w),d3
; $00BAB6
	bpl.w	loc_00BB24
; $00BABA
	moveq	#1,d1

loc_00BABC:				; $00BABC
	move.w	d1,d6
; $00BABE
	moveq	#0,d7

loc_00BAC0:				; $00BAC0
	tst.w	d6
; $00BAC2
	beq.w	loc_00BB1E
; $00BAC6
	move.w	($FFFFA8C6).w,d4
; $00BACA
	sub.w	d6,d4
; $00BACC
	move.w	($FFFFA8C8).w,d5
; $00BAD0
	sub.w	d7,d5
; $00BAD2
	bsr.w	loc_00BB30
; $00BAD6
	beq.w	loc_00BB24
; $00BADA
	move.w	($FFFFA8C6).w,d4
; $00BADE
	add.w	d6,d4
; $00BAE0
	move.w	($FFFFA8C8).w,d5
; $00BAE4
	add.w	d7,d5
; $00BAE6
	bsr.w	loc_00BB30
; $00BAEA
	beq.w	loc_00BB24
; $00BAEE
	move.w	($FFFFA8C6).w,d4
; $00BAF2
	add.w	d7,d4
; $00BAF4
	move.w	($FFFFA8C8).w,d5
; $00BAF8
	sub.w	d6,d5
; $00BAFA
	bsr.w	loc_00BB30
; $00BAFE
	beq.w	loc_00BB24
; $00BB02
	move.w	($FFFFA8C6).w,d4
; $00BB06
	sub.w	d7,d4
; $00BB08
	move.w	($FFFFA8C8).w,d5
; $00BB0C
	add.w	d6,d5
; $00BB0E
	bsr.w	loc_00BB30
; $00BB12
	beq.w	loc_00BB24
; $00BB16
	subq.w	#1,d6
; $00BB18
	addq.w	#1,d7
; $00BB1A
	bra.w	loc_00BAC0

loc_00BB1E:				; $00BB1E
	addq.w	#1,d1
; $00BB20
	bra.w	loc_00BABC

loc_00BB24:				; $00BB24
	addq.w	#1,d1

loc_00BB26:				; $00BB26
	move.b	d1,$D(a6)

loc_00BB2A:				; $00BB2A
	movem.l	(a7)+,a0/a1/a2/a3/a4/a5/a6
; $00BB2E
	rts

loc_00BB30:				; $00BB30
	tst.w	d4
; $00BB32
	ble.w	loc_00BB5A
; $00BB36
	move.w	d5,d3
; $00BB38
	ble.w	loc_00BB5A
; $00BB3C
	mulu.w	($FFFF9F2C).l,d3
; $00BB42
	add.w	d4,d3
; $00BB44
	add.w	d3,d3
; $00BB46
	moveq	#0,d2
; $00BB48
	move.b	($0,a1,d3.w),d2
; $00BB4C
	tst.b	($0,a2,d2.w)
; $00BB50
	bmi.w	loc_00BB5A
; $00BB54
	ori	#$75,ccr

loc_00BB5A:				; $00BB5A
	andi.b	#$75,#$FB

loc_00BB60:				; $00BB60
	movem.l	a7/a6/d7,-(a7)
; $00BB64
	lea	($FF4000).l,a0
; $00BB6A
	move.l	#$DFFFDFFF,d1
; $00BB70
	move.w	#$03FF,d0

loc_00BB74:				; $00BB74
	exg	d1,a0
; $00BB76
	dbf	d0,loc_00BB74
; $00BB7A
	movem.l	(a7)+,d7/a6/a7
; $00BB7E
	rts

loc_00BB80:				; $00BB80
	movem.l	a7/a6/a5/a4/a3/a2/a1/d7/d6/d5/d4,-(a7)
; $00BB84
	bsr.w	loc_00BB60
; $00BB88
	movea.l	$12(a6),a2
; $00BB8C
	moveq	#0,d0
; $00BB8E
	move.b	$0(a2),d0
; $00BB92
	mulu.w	#$001C,d0
; $00BB96
	lea	($05EDDC).l,a2
; $00BB9C
	adda.w	($2,a2,d0.w),a2
; $00BBA0
	bsr.w	loc_00BE44
; $00BBA4
	lea	($FF1000).l,a4
; $00BBAA
	movea.l	a4,a5
; $00BBAC
	move.w	d4,(a4)+
; $00BBAE
	move.w	d5,(a4)+
; $00BBB0
	move.w	d0,(a4)+
; $00BBB2
	move.w	#$FFFF,(a4)
; $00BBB6
	lea	($FF3000).l,a1
; $00BBBC
	lea	($FF4000).l,a0
; $00BBC2
	ori.b	#$00,($20,a0,d0.w)

loc_00BBC8:				; $00BBC8
	move.w	(a5)+,d4
; $00BBCA
	cmpi.w	#$FFFF,d4
; $00BBCE
	beq.w	loc_00BC44
; $00BBD2
	move.w	(a5)+,d5
; $00BBD4
	move.w	(a5)+,d6
; $00BBD6
	move.b	($1,a0,d6.w),d7
; $00BBDA
	moveq	#0,d0
; $00BBDC
	move.b	($0,a1,d6.w),d0
; $00BBE0
	add.b	($0,a2,d0.w),d7
; $00BBE4
	move.w	d4,d1
; $00BBE6
	addq.w	#1,d1
; $00BBE8
	move.w	d5,d2
; $00BBEA
	move.w	d6,d3
; $00BBEC
	addq.w	#2,d3
; $00BBEE
	bsr.w	loc_00BD6E
; $00BBF2
	move.w	d4,d1
; $00BBF4
	subq.w	#1,d1
; $00BBF6
	move.w	d5,d2
; $00BBF8
	move.w	d6,d3
; $00BBFA
	subq.w	#2,d3
; $00BBFC
	bsr.w	loc_00BD6E
; $00BC00
	move.w	d4,d1
; $00BC02
	move.w	d5,d2
; $00BC04
	subq.w	#1,d2
; $00BC06
	move.w	d6,d3
; $00BC08
	sub.w	($FFFF9F2C).l,d3
; $00BC0E
	sub.w	($FFFF9F2C).l,d3
; $00BC14
	bsr.w	loc_00BD6E
; $00BC18
	move.w	d4,d1
; $00BC1A
	move.w	d5,d2
; $00BC1C
	addq.w	#1,d2
; $00BC1E
	move.w	d6,d3
; $00BC20
	add.w	($FFFF9F2C).l,d3
; $00BC26
	add.w	($FFFF9F2C).l,d3
; $00BC2C
	bsr.w	loc_00BD6E
; $00BC30
	cmpa.l	#$00FF2000,a5
; $00BC36
	blt.w	loc_00BBC8
; $00BC3A
	lea	($FF1000).l,a5
; $00BC40
	bra.w	loc_00BBC8

loc_00BC44:				; $00BC44
	move.b	#$00,$8(a6)
; $00BC4A
	move.w	#$0000,$A(a6)
; $00BC50
	move.w	$C(a6),-(a7)
; $00BC54
	move.b	#$00,$C(a6)
; $00BC5A
	clr.b	$D(a6)
; $00BC5E
	bsr.w	loc_00BDD4
; $00BC62
	move.l	(a6),($FFFFA012).l
; $00BC68
	move.l	#$0000B744,(a6)
; $00BC6E
	bsr.w	loc_00B744
; $00BC72
	move.l	($FFFFA012).l,(a6)
; $00BC78
	move.w	(a7)+,$C(a6)
; $00BC7C
	bsr.w	loc_00BE44
; $00BC80
	lea	($FF4000).l,a0
; $00BC86
	move.b	($0,a0,d0.w),d1
; $00BC8A
	bmi.w	loc_00BCA4
; $00BC8E
	andi.b	#$0F,d1
; $00BC92
	bne.w	loc_00BCA4
; $00BC96
	bsr.w	loc_00AA38
; $00BC9A
	andi.b	#$00,($7F,a0,d0.w)
; $00BCA0
	bra.w	loc_00BD60

loc_00BCA4:				; $00BCA4
	tst.w	$16(a6)
; $00BCA8
	bne.w	loc_00BCD6
; $00BCAC
	move.w	#$07FF,d0

loc_00BCB0:				; $00BCB0
	move.b	(a0),d1
; $00BCB2
	bmi.w	loc_00BCCA
; $00BCB6
	btst	#5,d1
; $00BCBA
	beq.w	loc_00BCC6
; $00BCBE
	andi.b	#$0F,d1
; $00BCC2
	beq.w	loc_00BCCA

loc_00BCC6:				; $00BCC6
	ori.b	#$80,(a0)

loc_00BCCA:				; $00BCCA
	adda.w	#$0002,a0
; $00BCCE
	dbf	d0,loc_00BCB0
; $00BCD2
	bra.w	loc_00BD3A

loc_00BCD6:				; $00BCD6
	move.w	($FFFF9F2C).l,d2
; $00BCDC
	move.w	#$07FF,d0
; $00BCE0
	sub.w	d2,d0
; $00BCE2
	add.w	d2,d2
; $00BCE4
	adda.w	d2,a0

loc_00BCE6:				; $00BCE6
	move.b	(a0),d1
; $00BCE8
	bmi.w	loc_00BD32
; $00BCEC
	btst	#5,d1
; $00BCF0
	bne.w	loc_00BD26
; $00BCF4
	move.b	$2(a0),d3
; $00BCF8
	btst	#5,d3
; $00BCFC
	bne.w	loc_00BD26
; $00BD00
	move.b	-$2(a0),d3
; $00BD04
	btst	#5,d3
; $00BD08
	bne.w	loc_00BD26
; $00BD0C
	move.b	($0,a0,d2.w),d3
; $00BD10
	btst	#5,d3
; $00BD14
	bne.w	loc_00BD26
; $00BD18
	movea.l	a0,a1
; $00BD1A
	suba.w	d2,a1
; $00BD1C
	move.b	(a1),d3
; $00BD1E
	btst	#5,d3
; $00BD22
	beq.w	loc_00BD2E

loc_00BD26:				; $00BD26
	andi.b	#$0F,d1
; $00BD2A
	beq.w	loc_00BD32

loc_00BD2E:				; $00BD2E
	ori.b	#$80,(a0)

loc_00BD32:				; $00BD32
	adda.w	#$0002,a0
; $00BD36
	dbf	d0,loc_00BCE6

loc_00BD3A:				; $00BD3A
	movea.l	$12(a6),a0
; $00BD3E
	moveq	#0,d0
; $00BD40
	moveq	#0,d1
; $00BD42
	move.b	$6(a0),d0
; $00BD46
	move.b	$7(a0),d1
; $00BD4A
	mulu.w	($FFFF9F2C).l,d1
; $00BD50
	add.w	d1,d0
; $00BD52
	add.w	d0,d0
; $00BD54
	lea	($FF4000).l,a0
; $00BD5A
	andi.b	#$00,($7F,a0,d0.w)

loc_00BD60:				; $00BD60
	move.b	#$01,($FFFF9F35).l
; $00BD68
	movem.l	(a7)+,d4/d5/d6/d7/a1/a2/a3/a4/a5/a6/a7
; $00BD6C
	rts

loc_00BD6E:				; $00BD6E
	movem.l	a7/a1/a0,-(a7)
; $00BD72
	cmpi.w	#$0000,d1
; $00BD76
	ble.w	loc_00BDCE
; $00BD7A
	cmp.w	($FFFF9F2C).l,d1
; $00BD80
	bge.w	loc_00BDCE
; $00BD84
	cmpi.w	#$0000,d2
; $00BD88
	ble.w	loc_00BDCE
; $00BD8C
	cmp.w	($FFFF9F2E).l,d2
; $00BD92
	bge.w	loc_00BDCE
; $00BD96
	btst	#5,($0,a0,d3.w)
; $00BD9C
	bne.w	loc_00BDCE
; $00BDA0
	move.b	($1,a0,d3.w),d0
; $00BDA4
	beq.w	loc_00BDCE
; $00BDA8
	cmp.b	d0,d7
; $00BDAA
	bne.w	loc_00BDCE
; $00BDAE
	ori.b	#$00,($20,a0,d0.w)
; $00BDB4
	cmpa.l	#$00FF2000,a4
; $00BDBA
	blt.w	loc_00BDC4
; $00BDBE
	lea	($FF1000).l,a4

loc_00BDC4:				; $00BDC4
	move.w	d1,(a4)+
; $00BDC6
	move.w	d2,(a4)+
; $00BDC8
	move.w	d3,(a4)+
; $00BDCA
	move.w	#$FFFF,(a4)

loc_00BDCE:				; $00BDCE
	movem.l	(a7)+,a0/a1/a7
; $00BDD2
	rts

loc_00BDD4:				; $00BDD4
	movem.l	a6/d7,-(a7)
; $00BDD8
	movea.l	$12(a6),a0
; $00BDDC
	tst.b	$5(a0)
; $00BDE0
	bne.w	loc_00BE3E
; $00BDE4
	move.b	$44(a0),d1
; $00BDE8
	addq.b	#1,d1
; $00BDEA
	move.b	d1,($FFFF9F5C).l
; $00BDF0
	movem.l	d4,-(a7)
; $00BDF4
	movea.l	a0,a3
; $00BDF6
	jsr	($0109A0).l
; $00BDFC
	movem.l	(a7)+,d4
; $00BE00
	btst	#6,$17(a0)
; $00BE06
	bne.w	loc_00BE28
; $00BE0A
	move.b	($FFFF9F5C).l,d1
; $00BE10
	move.b	d1,$8(a6)
; $00BE14
	bsr.w	loc_00BED4
; $00BE18
	beq.w	loc_00BE3E
; $00BE1C
	subq.b	#1,$8(a6)
; $00BE20
	bpl.w	loc_00BE3E
; $00BE24
	bra.w	loc_00BE38

loc_00BE28:				; $00BE28
	move.b	($FFFF9F5C).l,d1
; $00BE2E
	lsr.b	#1,d1
; $00BE30
	move.b	d1,$8(a6)
; $00BE34
	bne.w	loc_00BE3E

loc_00BE38:				; $00BE38
	move.b	#$01,$8(a6)

loc_00BE3E:				; $00BE3E
	movem.l	(a7)+,d7/a6
; $00BE42
	rts

loc_00BE44:				; $00BE44
	lea	($FF4000).l,a0
; $00BE4A
	move.w	$E(a6),d2
; $00BE4E
	move.w	$10(a6),d3
; $00BE52
	move.w	d2,d4
; $00BE54
	move.w	d3,d5
; $00BE56
	moveq	#0,d0
; $00BE58
	move.b	$D(a6),d0
; $00BE5C
	beq.w	loc_00BEC6
; $00BE60
	subq.w	#1,d0
; $00BE62
	move.w	d0,d6
; $00BE64
	moveq	#0,d7
; $00BE66
	move.w	d0,d1
; $00BE68
	add.w	d1,d1
; $00BE6A
	add.w	d1,d1

loc_00BE6C:				; $00BE6C
	move.w	d2,d4
; $00BE6E
	move.w	d3,d5
; $00BE70
	add.w	d6,d4
; $00BE72
	add.w	d7,d5
; $00BE74
	cmpi.w	#$0001,d4
; $00BE78
	bmi.w	loc_00BEAC
; $00BE7C
	cmp.w	($FFFF9F2C).l,d2
; $00BE82
	bge.w	loc_00BEAC
; $00BE86
	cmpi.w	#$0001,d5
; $00BE8A
	bmi.w	loc_00BEAC
; $00BE8E
	cmp.w	($FFFF9F2C).l,d5
; $00BE94
	bge.w	loc_00BEAC
; $00BE98
	move.w	d5,d0
; $00BE9A
	mulu.w	($FFFF9F2C).l,d0
; $00BEA0
	add.w	d4,d0
; $00BEA2
	add.w	d0,d0
; $00BEA4
	move.w	($0,a0,d0.w),d0
; $00BEA8
	bpl.w	loc_00BEC6

loc_00BEAC:				; $00BEAC
	move.w	d7,d0
; $00BEAE
	tst.w	d6
; $00BEB0
	ble.w	loc_00BEB6
; $00BEB4
	addq.w	#2,d7

loc_00BEB6:				; $00BEB6
	subq.w	#1,d7
; $00BEB8
	tst.w	d0
; $00BEBA
	bge.w	loc_00BEC0
; $00BEBE
	addq.w	#2,d6

loc_00BEC0:				; $00BEC0
	subq.w	#1,d6
; $00BEC2
	dbf	d1,loc_00BE6C

loc_00BEC6:				; $00BEC6
	move.w	d5,d0
; $00BEC8
	mulu.w	($FFFF9F2C).l,d0
; $00BECE
	add.w	d4,d0
; $00BED0
	add.w	d0,d0
; $00BED2
	rts

loc_00BED4:				; $00BED4
	movem.l	a7/a6/d7,-(a7)
; $00BED8
	moveq	#6,d0

loc_00BEDA:				; $00BEDA
	adda.w	#$000C,a0
; $00BEDE
	move.b	$0(a0),d1
; $00BEE2
	cmpi.b	#$FF,d1
; $00BEE6
	beq.w	loc_00BEF4
; $00BEEA
	btst	#7,$2(a0)
; $00BEF0
	beq.w	loc_00BF00

loc_00BEF4:				; $00BEF4
	dbf	d0,loc_00BEDA
; $00BEF8
	ori	#$00,ccr
; $00BEFE
	ori.b	#$3C,d6
; $00BF02
	ori.?	#?,(-$21,pc,d4.l)
; $00BF06
	btst	d0,d3
; $00BF08
	rts

loc_00BF0A:				; $00BF0A
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3,-(a7)
; $00BF0E
	lea	($FF6028).l,a2
; $00BF14
	movea.l	($FFFFA62C).w,a1
; $00BF18
	moveq	#0,d0
; $00BF1A
	move.b	$0(a1),d0
; $00BF1E
	mulu.w	#$001C,d0
; $00BF22
	lea	($05EDDC).l,a1
; $00BF28
	adda.w	($2,a1,d0.w),a1
; $00BF2C
	lea	($FF3000).l,a4
; $00BF32
	lea	($FF4000).l,a3
; $00BF38
	movea.l	a3,a0
; $00BF3A
	move.l	#$80008000,d2
; $00BF40
	move.w	#$03FF,d1

loc_00BF44:				; $00BF44
	or.l	d2,(a3)+
; $00BF46
	dbf	d1,loc_00BF44
; $00BF4A
	move.w	d5,d0
; $00BF4C
	mulu.w	($FFFF9F2C).l,d0
; $00BF52
	add.w	d4,d0
; $00BF54
	add.w	d0,d0
; $00BF56
	andi.w	#$0000,(-$1,a0,d7.l)

loc_00BF5C:				; $00BF5C
	move.b	($1,a0,d0.w),d1
; $00BF60
	moveq	#0,d5
; $00BF62
	move.b	(-$1,a0,d0.w),d3
; $00BF66
	cmp.b	d3,d1
; $00BF68
	bge.w	loc_00BF86
; $00BF6C
	moveq	#0,d2
; $00BF6E
	move.b	($0,a4,d0.w),d2
; $00BF72
	move.b	($0,a1,d2.w),d2
; $00BF76
	sub.b	d2,d3
; $00BF78
	cmp.b	d3,d1
; $00BF7A
	bne.w	loc_00BF86
; $00BF7E
	move.w	d0,d5
; $00BF80
	subq.w	#2,d5
; $00BF82
	move.b	#$08,d7

loc_00BF86:				; $00BF86
	move.b	($3,a0,d0.w),d3
; $00BF8A
	cmp.b	d3,d1
; $00BF8C
	bge.w	loc_00BFAA
; $00BF90
	moveq	#0,d2
; $00BF92
	move.b	($0,a4,d0.w),d2
; $00BF96
	move.b	($0,a1,d2.w),d2
; $00BF9A
	sub.b	d2,d3
; $00BF9C
	cmp.b	d3,d1
; $00BF9E
	bne.w	loc_00BFAA
; $00BFA2
	move.w	d0,d5
; $00BFA4
	addq.w	#2,d5
; $00BFA6
	move.b	#$04,d7

loc_00BFAA:				; $00BFAA
	move.w	($FFFF9F2C).l,d6
; $00BFB0
	add.w	d6,d6
; $00BFB2
	move.w	d0,d4
; $00BFB4
	sub.w	d6,d4
; $00BFB6
	move.b	($1,a0,d4.w),d3
; $00BFBA
	cmp.b	d3,d1
; $00BFBC
	bge.w	loc_00BFD8
; $00BFC0
	moveq	#0,d2
; $00BFC2
	move.b	($0,a4,d0.w),d2
; $00BFC6
	move.b	($0,a1,d2.w),d2
; $00BFCA
	sub.b	d2,d3
; $00BFCC
	cmp.b	d3,d1
; $00BFCE
	bne.w	loc_00BFD8
; $00BFD2
	move.w	d4,d5
; $00BFD4
	move.b	#$02,d7

loc_00BFD8:				; $00BFD8
	move.w	d0,d4
; $00BFDA
	add.w	d6,d4
; $00BFDC
	move.b	($1,a0,d4.w),d3
; $00BFE0
	cmp.b	d3,d1
; $00BFE2
	bge.w	loc_00BFFE
; $00BFE6
	moveq	#0,d2
; $00BFE8
	move.b	($0,a4,d0.w),d2
; $00BFEC
	move.b	($0,a1,d2.w),d2
; $00BFF0
	sub.b	d2,d3
; $00BFF2
	cmp.b	d3,d1
; $00BFF4
	bne.w	loc_00BFFE
; $00BFF8
	move.w	d4,d5
; $00BFFA
	move.b	#$01,d7

loc_00BFFE:				; $00BFFE
	tst.w	d5
; $00C000
	beq.w	loc_00C012
; $00C004
	move.w	d5,d0
; $00C006
	andi.w	#$0000,(-$1,a0,d7.l)
; $00C00C
	move.b	d7,(a2)+
; $00C00E
	bra.w	loc_00BF5C

loc_00C012:				; $00C012
	clr.b	(a2)
; $00C014
	movem.l	(a7)+,d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $00C018
	rts

loc_00C01A:				; $00C01A
	movem.l	a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4,-(a7)
; $00C01E
	movea.l	($FFFFA62C).w,a1
; $00C022
	tst.b	$5(a1)
; $00C026
	bne.w	loc_00C03E
; $00C02A
	move.b	$9(a1),d1
; $00C02E
	cmpi.b	#$0F,d1
; $00C032
	beq.w	loc_00C07C
; $00C036
	cmpi.b	#$10,d1
; $00C03A
	beq.w	loc_00C070

loc_00C03E:				; $00C03E
	moveq	#0,d1
; $00C040
	move.b	$0(a1),d1
; $00C044
	mulu.w	#$001C,d1
; $00C048
	move.w	d1,($FFFF9F5E).l
; $00C04E
	move.b	#$02,($FFFF9F5C).l
; $00C056
	lea	($05EDDC).l,a1
; $00C05C
	move.b	($6,a1,d1.w),d0
; $00C060
	cmpi.b	#$0F,d0
; $00C064
	beq.w	loc_00C07C
; $00C068
	cmpi.b	#$10,d0
; $00C06C
	bne.w	loc_00C084

loc_00C070:				; $00C070
	move.b	#$07,($FFFF9F5C).l
; $00C078
	bra.w	loc_00C084

loc_00C07C:				; $00C07C
	move.b	#$04,($FFFF9F5C).l

loc_00C084:				; $00C084
	move.w	($FFFFA6E6).w,d4
; $00C088
	move.w	($FFFFA6E8).w,d5
; $00C08C
	movea.w	d5,a1
; $00C08E
	bsr.w	loc_00AA38
; $00C092
	lea	($FF5000).l,a2
; $00C098
	lea	($FF4000).l,a0
; $00C09E
	moveq	#0,d1
; $00C0A0
	move.b	($FFFF9F5C).l,d1
; $00C0A6
	beq.w	loc_00C1B0

loc_00C0AA:				; $00C0AA
	tst.w	d1
; $00C0AC
	beq.w	loc_00C122
; $00C0B0
	subq.w	#1,d1
; $00C0B2
	move.w	d4,d2
; $00C0B4
	sub.w	d1,d2
; $00C0B6
	move.w	d1,d0
; $00C0B8
	add.w	d0,d0

loc_00C0BA:				; $00C0BA
	tst.w	d5
; $00C0BC
	ble.w	loc_00C116
; $00C0C0
	tst.w	d2
; $00C0C2
	ble.w	loc_00C116
; $00C0C6
	move.w	d2,d3
; $00C0C8
	addq.w	#1,d3
; $00C0CA
	cmp.w	($FFFF9F2C).l,d3
; $00C0D0
	bge.w	loc_00C116
; $00C0D4
	move.w	d5,d3
; $00C0D6
	mulu.w	($FFFF9F2C).l,d3
; $00C0DC
	add.w	d2,d3
; $00C0DE
	add.w	d3,d3
; $00C0E0
	moveq	#0,d6
; $00C0E2
	move.b	($0,a2,d3.w),d6
; $00C0E6
	bmi.w	loc_00C10E
; $00C0EA
	add.w	d6,d6
; $00C0EC
	add.w	d6,d6
; $00C0EE
	lea	($05E5D8).l,a3
; $00C0F4
	movea.l	($0,a3,d6.w),a3
; $00C0F8
	jsr	($0146D6).l
; $00C0FE
	beq.w	loc_00C116
; $00C102
	move.b	$20(a3),d6
; $00C106
	and.b	($FFFFA626).w,d6
; $00C10A
	bne.w	loc_00C116

loc_00C10E:				; $00C10E
	andi.b	#$00,($7F,a0,d0.w)
; $00C114
	moveq	#1,d7

loc_00C116:				; $00C116
	addq.w	#1,d2
; $00C118
	dbf	d0,loc_00C0BA
; $00C11C
	subq.w	#1,d5
; $00C11E
	bra.w	loc_00C0AA

loc_00C122:				; $00C122
	move.w	a1,d5
; $00C124
	addq.w	#1,d5
; $00C126
	moveq	#0,d1
; $00C128
	move.b	($FFFF9F5C).l,d1
; $00C12E
	subq.w	#1,d1

loc_00C130:				; $00C130
	tst.w	d1
; $00C132
	beq.w	loc_00C1B0
; $00C136
	subq.w	#1,d1
; $00C138
	move.w	d4,d2
; $00C13A
	sub.w	d1,d2
; $00C13C
	move.w	d1,d0
; $00C13E
	add.w	d0,d0

loc_00C140:				; $00C140
	move.w	d5,d3
; $00C142
	addq.w	#1,d3
; $00C144
	cmp.w	($FFFF9F2E).l,d3
; $00C14A
	bge.w	loc_00C1A4
; $00C14E
	tst.w	d2
; $00C150
	ble.w	loc_00C1A4
; $00C154
	move.w	d2,d3
; $00C156
	addq.w	#1,d3
; $00C158
	cmp.w	($FFFF9F2C).l,d3
; $00C15E
	bge.w	loc_00C1A4
; $00C162
	move.w	d5,d3
; $00C164
	mulu.w	($FFFF9F2C).l,d3
; $00C16A
	add.w	d2,d3
; $00C16C
	add.w	d3,d3
; $00C16E
	moveq	#0,d6
; $00C170
	move.b	($0,a2,d3.w),d6
; $00C174
	bmi.w	loc_00C19C
; $00C178
	add.w	d6,d6
; $00C17A
	add.w	d6,d6
; $00C17C
	lea	($05E5D8).l,a3
; $00C182
	movea.l	($0,a3,d6.w),a3
; $00C186
	jsr	($0146D6).l
; $00C18C
	beq.w	loc_00C1A4
; $00C190
	move.b	$20(a3),d6
; $00C194
	and.b	($FFFFA626).w,d6
; $00C198
	bne.w	loc_00C1A4

loc_00C19C:				; $00C19C
	andi.b	#$00,($7F,a0,d0.w)
; $00C1A2
	moveq	#1,d7

loc_00C1A4:				; $00C1A4
	addq.w	#1,d2
; $00C1A6
	dbf	d0,loc_00C140
; $00C1AA
	addq.w	#1,d5
; $00C1AC
	bra.w	loc_00C130

loc_00C1B0:				; $00C1B0
	move.w	#$07FF,d1
; $00C1B4
	moveq	#1,d0

loc_00C1B6:				; $00C1B6
	move.b	(a0),d2
; $00C1B8
	bmi.w	loc_00C1CC
; $00C1BC
	andi.b	#$0F,d2
; $00C1C0
	beq.w	loc_00C1CC
; $00C1C4
	and.b	($FFFFA626).w,d2
; $00C1C8
	beq.w	loc_00C1D6

loc_00C1CC:				; $00C1CC
	addq.l	#2,a0
; $00C1CE
	dbf	d1,loc_00C1B6
; $00C1D2
	andi.b	#$DF,#$FB
; $00C1D8
	bchg	d7,?ea(7,6)
; $00C1DA
	rts

loc_00C1DC:				; $00C1DC
	movem.l	a7/d7,-(a7)
; $00C1E0
	jsr	($0094DC).l
; $00C1E6
	move.w	#$0A66,$0(a0)
; $00C1EC
	clr.w	$2(a0)
; $00C1F0
	move.w	#$0006,$4(a0)
; $00C1F6
	move.w	($FFFF9FE4).l,$6(a0)
; $00C1FE
	clr.w	$8(a0)
; $00C202
	lea	($FF6000).l,a0
; $00C208
	moveq	#9,d0

loc_00C20A:				; $00C20A
	clr.l	(a0)+
; $00C20C
	dbf	d0,loc_00C20A
; $00C210
	move.l	#$00008002,($FFFF9FE6).l
; $00C21A
	move.b	#$01,($FFFF9FE3).l
; $00C222
	movem.l	(a7)+,d7/a7
; $00C226
	rts

loc_00C228:				; $00C228
	movem.l	a7/d7,-(a7)
; $00C22C
	jsr	($0094DC).l
; $00C232
	move.w	#$0BC6,$0(a0)
; $00C238
	clr.w	$2(a0)
; $00C23C
	clr.w	$4(a0)
; $00C240
	move.w	#$000F,$6(a0)
; $00C246
	move.b	#$01,($FFFF9FE2).l
; $00C24E
	movem.l	(a7)+,d7/a7
; $00C252
	rts

loc_00C254:				; $00C254
	movem.l	a7/a6/a5/a1/a0/d7/d3/d2,-(a7)
; $00C258
	lea	(VDP_CTRL).l,a4
; $00C25E
	lea	(VDP_DATA).l,a5
; $00C264
	move.b	#$00,($FFFFA002).l
; $00C26C
	move.w	d4,d0
; $00C26E
	sub.w	($FFFF9F24).l,d0
; $00C274
	blt.w	loc_00C2E4
; $00C278
	cmpi.w	#$000E,d0
; $00C27C
	bgt.w	loc_00C2E4
; $00C280
	move.w	d5,d1
; $00C282
	sub.w	($FFFF9F26).l,d1
; $00C288
	blt.w	loc_00C2E4
; $00C28C
	cmpi.w	#$0008,d1
; $00C290
	bgt.w	loc_00C2E4
; $00C294
	move.w	d0,d2
; $00C296
	add.w	d0,d0
; $00C298
	add.w	d2,d0
; $00C29A
	subq.w	#1,d0
; $00C29C
	move.w	d1,d2
; $00C29E
	add.w	d1,d1
; $00C2A0
	add.w	d2,d1
; $00C2A2
	subq.w	#1,d1
; $00C2A4
	bsr.w	loc_00A836
; $00C2A8
	move.w	(a0)+,d7
; $00C2AA
	bsr.w	loc_00A698
; $00C2AE
	move.w	d4,d6
; $00C2B0
	bmi.w	loc_00C2E4
; $00C2B4
	move.w	d5,d6
; $00C2B6
	bmi.w	loc_00C2E4
; $00C2BA
	cmp.w	($FFFF9F2C).l,d4
; $00C2C0
	bpl.w	loc_00C2E4
; $00C2C4
	cmp.w	($FFFF9F2E).l,d5
; $00C2CA
	bpl.w	loc_00C2E4
; $00C2CE
	tst.b	($FFFF9F37).l
; $00C2D4
	beq.w	loc_00C2E4
; $00C2D8
	negx.?	-(a7)
; $00C2DA
	not.?	#$2700
; $00C2DE
	bsr.w	loc_00A404
; $00C2E2
	not.?	(a7)+

loc_00C2E4:				; $00C2E4
	movem.l	(a7)+,d2/d3/d7/a0/a1/a5/a6/a7
; $00C2E8
	rts

loc_00C2EA:				; $00C2EA
	jsr	($0094FC).l
; $00C2F0
	move.w	#$0C1A,$0(a0)
; $00C2F6
	move.w	d4,$2(a0)
; $00C2FA
	move.w	d5,$4(a0)
; $00C2FE
	move.w	d3,$6(a0)
; $00C302
	rts

loc_00C304:				; $00C304
	movem.l	a7/d6/d5/d4,-(a7)
; $00C308
	lea	($FF6028).l,a2
; $00C30E
	jsr	($00951C).l
; $00C314
	move.w	#$0C48,$0(a0)
; $00C31A
	move.w	d1,d0
; $00C31C
	asl.w	#8,d0
; $00C31E
	or.w	d2,d0
; $00C320
	move.w	d0,$2C(a0)
; $00C324
	move.w	d3,$26(a0)
; $00C328
	move.w	d4,$24(a0)
; $00C32C
	move.w	d5,$2A(a0)
; $00C330
	move.w	d6,$28(a0)
; $00C334
	lea	($00090C).w,a1
; $00C338
	move.w	($FFFFA49E).w,d0
; $00C33C
	btst	#4,($FFFF8178).w
; $00C342
	beq.w	loc_00C348
; $00C346
	moveq	#1,d0

loc_00C348:				; $00C348
	addq.w	#3,d0
; $00C34A
	add.w	d0,d0
; $00C34C
	adda.w	d0,a1
; $00C34E
	move.b	(a1)+,$1E(a0)
; $00C352
	move.b	(a1),$1C(a0)
; $00C356
	clr.w	$20(a0)
; $00C35A
	move.w	d3,d0
; $00C35C
	sub.w	($FFFF9F24).l,d0
; $00C362
	mulu.w	#$0018,d0
; $00C366
	subq.w	#8,d0
; $00C368
	move.w	d0,$1A(a0)
; $00C36C
	move.w	d4,d0
; $00C36E
	sub.w	($FFFF9F26).l,d0
; $00C374
	mulu.w	#$0018,d0
; $00C378
	subq.w	#8,d0
; $00C37A
	move.w	d0,$16(a0)
; $00C37E
	add.w	d1,d1
; $00C380
	add.w	d1,d1
; $00C382
	lea	($05E5D8).l,a3
; $00C388
	movea.l	($0,a3,d1.w),a1
; $00C38C
	move.b	$20(a1),d5
; $00C390
	add.w	d2,d2
; $00C392
	add.w	d2,d2
; $00C394
	adda.l	($50,a3,d2.w),a1
; $00C398
	jsr	($011610).l
; $00C39E
	move.w	d1,d2
; $00C3A0
	btst	#0,d5
; $00C3A4
	bne.w	loc_00C3AC
; $00C3A8
	ori.w	#$0800,d2

loc_00C3AC:				; $00C3AC
	ori.w	#$A000,d2
; $00C3B0
	move.w	d2,$18(a0)
; $00C3B4
	moveq	#0,d1

loc_00C3B6:				; $00C3B6
	move.b	(a2)+,d2
; $00C3B8
	beq.w	loc_00C3C6
; $00C3BC
	move.b	d2,($2,a0,d1.w)
; $00C3C0
	addq.w	#1,d1
; $00C3C2
	bra.w	loc_00C3B6

loc_00C3C6:				; $00C3C6
	move.w	d1,$22(a0)
; $00C3CA
	addq.b	#1,($FFFF9FEB).l
; $00C3D0
	move.w	d4,d5
; $00C3D2
	move.w	d3,d4
; $00C3D4
	move.w	#$FFFF,d3
; $00C3D8
	jsr	($00C2EA).l
; $00C3DE
	movem.l	(a7)+,d4/d5/d6/a7
; $00C3E2
	rts

loc_00C3E4:				; $00C3E4
	move.l	#$22222222,d1
; $00C3EA
	lea	($FF0000).l,a1
; $00C3F0
	moveq	#7,d0

loc_00C3F2:				; $00C3F2
	move.l	d1,(a1)+
; $00C3F4
	dbf	d0,loc_00C3F2
; $00C3F8
	move.w	#$08FF,d0

loc_00C3FC:				; $00C3FC
	clr.l	(a1)+
; $00C3FE
	dbf	d0,loc_00C3FC
; $00C402
	lea	($FF3000).l,a0
; $00C408
	lea	($FF0020).l,a1
; $00C40E
	lea	($FF0024).l,a2
; $00C414
	lea	($FF0028).l,a3
; $00C41A
	lea	($080B72).l,a4
; $00C420
	move.w	($FFFF9F2C).l,d0
; $00C426
	add.w	d0,d0
; $00C428
	add.w	($FFFF9F2C).l,d0
; $00C42E
	move.w	d0,d7
; $00C430
	ror.w	#3,d7
; $00C432
	andi.w	#$0007,d0
; $00C436
	beq.w	loc_00C43C
; $00C43A
	addq.w	#1,d7

loc_00C43C:				; $00C43C
	move.w	d7,($FFFFA496).l
; $00C442
	lsl.w	#5,d7
; $00C444
	subi.w	#$0020,d7
; $00C448
	moveq	#0,d5
; $00C44A
	move.w	($FFFF9F2E).l,d1
; $00C450
	subq.w	#1,d1

loc_00C452:				; $00C452
	move.w	($FFFF9F2C).l,d2
; $00C458
	subq.w	#1,d2
; $00C45A
	moveq	#0,d4
; $00C45C
	movem.l	d6/d5/d4,-(a7)

loc_00C460:				; $00C460
	moveq	#0,d3
; $00C462
	move.b	(a0),d3
; $00C464
	move.w	d3,d0
; $00C466
	rol.w	#3,d3
; $00C468
	add.w	d0,d3
; $00C46A
	moveq	#2,d6

loc_00C46C:				; $00C46C
	btst	#0,d4
; $00C470
	bne.w	loc_00C490
; $00C474
	move.b	($0,a4,d3.w),d0
; $00C478
	asl.b	#4,d0
; $00C47A
	or.b	d0,(a1)
; $00C47C
	move.b	($1,a4,d3.w),d0
; $00C480
	asl.b	#4,d0
; $00C482
	or.b	d0,(a2)
; $00C484
	move.b	($2,a4,d3.w),d0
; $00C488
	asl.b	#4,d0
; $00C48A
	or.b	d0,(a3)
; $00C48C
	bra.w	loc_00C4A2

loc_00C490:				; $00C490
	move.b	($0,a4,d3.w),d0
; $00C494
	or.b	d0,(a1)+
; $00C496
	move.b	($1,a4,d3.w),d0
; $00C49A
	or.b	d0,(a2)+
; $00C49C
	move.b	($2,a4,d3.w),d0
; $00C4A0
	or.b	d0,(a3)+

loc_00C4A2:				; $00C4A2
	addq.w	#3,d3
; $00C4A4
	addq.w	#1,d4
; $00C4A6
	cmpi.w	#$0008,d4
; $00C4AA
	bne.w	loc_00C4BC
; $00C4AE
	moveq	#0,d4
; $00C4B0
	adda.w	#$001C,a1
; $00C4B4
	adda.w	#$001C,a2
; $00C4B8
	adda.w	#$001C,a3

loc_00C4BC:				; $00C4BC
	dbf	d6,loc_00C46C
; $00C4C0
	adda.w	#$0002,a0
; $00C4C4
	dbf	d2,loc_00C460
; $00C4C8
	tst.w	d4
; $00C4CA
	beq.w	loc_00C4FE

loc_00C4CE:				; $00C4CE
	cmpi.w	#$0008,d4
; $00C4D2
	beq.w	loc_00C4FE
; $00C4D6
	btst	#0,d4
; $00C4DA
	bne.w	loc_00C4EE
; $00C4DE
	ori.b	#$20,(a1)
; $00C4E2
	ori.b	#$20,(a2)
; $00C4E6
	ori.b	#$20,(a3)
; $00C4EA
	bra.w	loc_00C4FA

loc_00C4EE:				; $00C4EE
	dc.l	$190002
; $00C4F2
	dc.l	$1A0002
; $00C4F6
	dc.l	$1B0002

loc_00C4FA:				; $00C4FA
	addq.w	#1,d4
; $00C4FC
	bra.s	loc_00C4CE

loc_00C4FE:				; $00C4FE
	movem.l	(a7)+,d4/d5/d6
; $00C502
	adda.w	#$000C,a1
; $00C506
	adda.w	#$000C,a2
; $00C50A
	adda.w	#$000C,a3
; $00C50E
	addq.w	#3,d5
; $00C510
	andi.w	#$0007,d5
; $00C514
	cmpi.w	#$0006,d5
; $00C518
	bne.w	loc_00C522
; $00C51C
	adda.w	d7,a3
; $00C51E
	bra.w	loc_00C55C

loc_00C522:				; $00C522
	cmpi.w	#$0007,d5
; $00C526
	bne.w	loc_00C532
; $00C52A
	adda.w	d7,a2
; $00C52C
	adda.w	d7,a3
; $00C52E
	bra.w	loc_00C55C

loc_00C532:				; $00C532
	cmpi.w	#$0001,d5
; $00C536
	bne.w	loc_00C542
; $00C53A
	adda.w	d7,a1
; $00C53C
	adda.w	d7,a2
; $00C53E
	bra.w	loc_00C55C

loc_00C542:				; $00C542
	cmpi.w	#$0002,d5
; $00C546
	bne.w	loc_00C550
; $00C54A
	adda.w	d7,a1
; $00C54C
	bra.w	loc_00C55C

loc_00C550:				; $00C550
	tst.w	d5
; $00C552
	bne.w	loc_00C55C
; $00C556
	adda.w	d7,a1
; $00C558
	adda.w	d7,a2
; $00C55A
	adda.w	d7,a3

loc_00C55C:				; $00C55C
	dbf	d1,loc_00C452
; $00C560
	tst.w	d5
; $00C562
	beq.w	loc_00C596

loc_00C566:				; $00C566
	cmpi.w	#$0008,d5
; $00C56A
	beq.w	loc_00C596
; $00C56E
	movem.l	d6,-(a7)
; $00C572
	move.l	#$22222222,d1
; $00C578
	move.w	($FFFFA496).l,d6
; $00C57E
	subq.w	#1,d6

loc_00C580:				; $00C580
	or.l	d1,(a1)
; $00C582
	adda.w	#$0020,a1
; $00C586
	dbf	d6,loc_00C580
; $00C58A
	movem.l	(a7)+,d6
; $00C58E
	adda.w	#$0004,a1
; $00C592
	addq.w	#1,d5
; $00C594
	bra.s	loc_00C566

loc_00C596:				; $00C596
	movea.l	($FFFF81C4).w,a0
; $00C59A
	move.w	#$FFF9,(a0)+
; $00C59E
	move.w	#$2000,(a0)+
; $00C5A2
	move.l	#$00FF0000,(a0)+
; $00C5A8
	move.w	#$1210,(a0)+
; $00C5AC
	move.l	a0,($FFFF81C4).w
; $00C5B0
	jsr	($008A6C).l
; $00C5B6
	move.w	($FFFF9F2C).l,d0
; $00C5BC
	add.w	d0,d0
; $00C5BE
	add.w	($FFFF9F2C).l,d0
; $00C5C4
	move.w	d0,d4
; $00C5C6
	ror.w	#3,d4
; $00C5C8
	andi.w	#$0007,d0
; $00C5CC
	beq.w	loc_00C5D2
; $00C5D0
	addq.w	#1,d4

loc_00C5D2:				; $00C5D2
	moveq	#24,d0
; $00C5D4
	sub.w	d4,d0
; $00C5D6
	lsr.w	#1,d0
; $00C5D8
	move.w	d0,($FFFFA496).l
; $00C5DE
	move.w	($FFFF9F2E).l,d0
; $00C5E4
	add.w	d0,d0
; $00C5E6
	add.w	($FFFF9F2E).l,d0
; $00C5EC
	move.w	d0,d5
; $00C5EE
	ror.w	#3,d5
; $00C5F0
	andi.w	#$0007,d0
; $00C5F4
	beq.w	loc_00C5FA
; $00C5F8
	addq.w	#1,d5

loc_00C5FA:				; $00C5FA
	moveq	#24,d0
; $00C5FC
	sub.w	d5,d0
; $00C5FE
	lsr.w	#1,d0
; $00C600
	move.w	d0,($FFFFA498).l
; $00C606
	move.w	#$2100,d3
; $00C60A
	lea	($FFFFA016).l,a0
; $00C610
	move.w	#$0001,d2
; $00C614
	move.w	($FFFFA498).l,d0
; $00C61A
	beq.w	loc_00C62C
; $00C61E
	subq.w	#1,d0

loc_00C620:				; $00C620
	moveq	#23,d1

loc_00C622:				; $00C622
	move.w	d3,(a0)+
; $00C624
	dbf	d1,loc_00C622
; $00C628
	dbf	d0,loc_00C620

loc_00C62C:				; $00C62C
	move.w	d5,d0
; $00C62E
	subq.w	#1,d0

loc_00C630:				; $00C630
	move.w	($FFFFA496).l,d1
; $00C636
	beq.w	loc_00C642
; $00C63A
	subq.w	#1,d1

loc_00C63C:				; $00C63C
	move.w	d3,(a0)+
; $00C63E
	dbf	d1,loc_00C63C

loc_00C642:				; $00C642
	move.w	d4,d1
; $00C644
	subq.w	#1,d1

loc_00C646:				; $00C646
	move.w	d3,d6
; $00C648
	add.w	d2,d6
; $00C64A
	move.w	d6,(a0)+
; $00C64C
	addq.w	#1,d2
; $00C64E
	dbf	d1,loc_00C646
; $00C652
	moveq	#24,d1
; $00C654
	sub.w	($FFFFA496).l,d1
; $00C65A
	sub.w	d4,d1
; $00C65C
	beq.w	loc_00C668
; $00C660
	subq.w	#1,d1

loc_00C662:				; $00C662
	move.w	d3,(a0)+
; $00C664
	dbf	d1,loc_00C662

loc_00C668:				; $00C668
	dbf	d0,loc_00C630
; $00C66C
	moveq	#24,d0
; $00C66E
	sub.w	($FFFFA498).l,d0
; $00C674
	sub.w	d5,d0
; $00C676
	beq.w	loc_00C688
; $00C67A
	subq.w	#1,d0

loc_00C67C:				; $00C67C
	moveq	#23,d1

loc_00C67E:				; $00C67E
	move.w	d3,(a0)+
; $00C680
	dbf	d1,loc_00C67E
; $00C684
	dbf	d0,loc_00C67C

loc_00C688:				; $00C688
	move.l	($FFFFA496).l,d0
; $00C68E
	rol.l	#3,d0
; $00C690
	move.l	d0,($FFFFA496).l
; $00C696
	rts

loc_00C698:				; $00C698
	movem.l	a7/a6/a5/a4/d7/d6,-(a7)
; $00C69C
	lea	($FF3000).l,a0
; $00C6A2
	move.w	d5,d0
; $00C6A4
	mulu.w	($FFFF9F2C).l,d0
; $00C6AA
	add.w	d4,d0
; $00C6AC
	add.w	d0,d0
; $00C6AE
	movea.l	($FFFF9F54).l,a1
; $00C6B4
	move.b	($1,a0,d0.w),d1
; $00C6B8
	bpl.w	loc_00C6C2
; $00C6BC
	movea.l	($FFFF9F58).l,a1

loc_00C6C2:				; $00C6C2
	move.b	d1,d3
; $00C6C4
	add.w	d3,d3
; $00C6C6
	andi.w	#$00FF,d3
; $00C6CA
	move.b	($1,a1,d3.w),d2
; $00C6CE
	cmp.b	d1,d2
; $00C6D0
	beq.w	loc_00C6FA
; $00C6D4
	movea.l	($FFFF9F54).l,a1
; $00C6DA
	move.b	d2,($1,a0,d0.w)
; $00C6DE
	bpl.w	loc_00C6E8
; $00C6E2
	movea.l	($FFFF9F58).l,a1

loc_00C6E8:				; $00C6E8
	move.b	d2,d3
; $00C6EA
	add.w	d3,d3
; $00C6EC
	andi.w	#$00FF,d3
; $00C6F0
	move.b	($0,a1,d3.w),($0,a0,d0.w)
; $00C6F6
	bsr.w	loc_00A740

loc_00C6FA:				; $00C6FA
	movem.l	(a7)+,d6/d7/a4/a5/a6/a7
; $00C6FE
	rts

loc_00C700:				; $00C700
	movem.l	a7/a6/a5/a4,-(a7)
; $00C704
	moveq	#0,d7
; $00C706
	cmpi.w	#$0000,d2
; $00C70A
	bne.w	loc_00C71E
; $00C70E
	move.w	($FFFF9050).w,d2
; $00C712
	move.w	($FFFF9052).w,d3
; $00C716
	move.w	#$C000,d7
; $00C71A
	bra.w	loc_00C73E

loc_00C71E:				; $00C71E
	cmpi.w	#$0002,d2
; $00C722
	bne.w	loc_00C736
; $00C726
	move.w	($FFFF9054).w,d2
; $00C72A
	move.w	($FFFF9056).w,d3
; $00C72E
	move.w	#$E000,d7
; $00C732
	bra.w	loc_00C73E

loc_00C736:				; $00C736
	moveq	#0,d2
; $00C738
	moveq	#0,d3
; $00C73A
	move.w	#$D000,d7

loc_00C73E:				; $00C73E
	ror.w	#3,d2
; $00C740
	add.w	d2,d0
; $00C742
	andi.w	#$003F,d0
; $00C746
	ror.w	#3,d3
; $00C748
	add.w	d3,d1
; $00C74A
	andi.w	#$001F,d1
; $00C74E
	add.w	d0,d0
; $00C750
	add.w	d0,d7
; $00C752
	rol.w	#7,d1
; $00C754
	add.w	d1,d7
; $00C756
	movem.l	(a7)+,a4/a5/a6/a7
; $00C75A
	rts

loc_00C75C:				; $00C75C
	move.l	a0,-(a7)
; $00C75E
	negx.?	-(a7)
; $00C760
	not.?	#$2700
; $00C764
	movea.l	#$00C00000,a0
; $00C76A
	cmpi.w	#$0000,d0
; $00C76E
	bne.w	loc_00C77C
; $00C772
	move.l	#$0000C000,d0
; $00C778
	bra.w	loc_00C794

loc_00C77C:				; $00C77C
	cmpi.w	#$0001,d0
; $00C780
	bne.w	loc_00C78E
; $00C784
	move.l	#$0000D000,d0
; $00C78A
	bra.w	loc_00C794

loc_00C78E:				; $00C78E
	move.l	#$0000E000,d0

loc_00C794:				; $00C794
	add.l	d0,d0
; $00C796
	add.l	d0,d0
; $00C798
	roxr.w	#2,d0
; $00C79A
	ori.w	#$4000,d0
; $00C79E
	pea	d0
; $00C7A0
	move.l	d0,(VDP_CTRL).l
; $00C7A6
	move.w	#$07FF,d0

loc_00C7AA:				; $00C7AA
	move.w	#$0000,(a0)
; $00C7AE
	dbf	d0,loc_00C7AA
; $00C7B2
	not.?	(a7)+
; $00C7B4
	movea.l	(a7)+,a0
; $00C7B6
	rts

; ★ C7B8: 过渡效果处理
loc_00C7B8:				; $00C7B8
	move.w	d0,-(a7)
; $00C7BA
	moveq	#0,d0
; $00C7BC
	bsr.w	loc_00C75C
; $00C7C0
	moveq	#2,d0
; $00C7C2
	bsr.w	loc_00C75C
; $00C7C6
	moveq	#1,d0
; $00C7C8
	bsr.w	loc_00C75C
; $00C7CC
	move.w	(a7)+,d0
; $00C7CE
	rts

loc_00C7D0:				; $00C7D0
	negx.?	-(a7)
; $00C7D2
	not.?	#$2700
; $00C7D6
	move.w	#$9194,(VDP_CTRL).l	; VDP reg #17 = $94 (WindowH=Right cell=20)
; $00C7DE
	andi.w	#$001F,d1
; $00C7E2
	ori.w	#$9280,d1
; $00C7E6
	move.w	d1,(VDP_CTRL).l
; $00C7EC
	move.w	#$0001,($FFFF8172).w
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
	not.?	(a7)+
; $00C814
	rts

; ★ ═══ C816: ★ 游戏主初始化 ═══
; ★ 流程: 校验 → SRAM初始化($11F9A) → ★ 设 $FF78FA=0xFFFF(默认Demo模式)
; ★ → 场景索引=1(标题画面) → 角色参数初始化 → 队列 1C834
loc_00C816:				; $00C816
	movem.l	a7/a6/d7/d6,-(a7)
; $00C81A
	bsr.w	loc_00FCBA
; $00C81E
	jsr	($011F9A).l
; ★ ★ $FF78FA = 0xFFFF — ROM 启动默认进入 Demo/Attract 模式
; ★   用户按键后 $FF78FA 被清零 → 下次进入 C9AA 走正常标题画面
; ★ ★ move.w #$FFFF,($FF78FA) — ROM 启动默认进 Demo/Attract 模式!
; ★   用户按键后 $FF78FA 被清零 → 下次 C9AA 分流走正常标题
; $00C824
	move.w	#$FFFF,($FF78FA).l
; $00C82C
	move.w	#$0001,($FFFFA49C).l
; $00C834
	move.w	#$0000,($FFFFA49E).l
; $00C83C
	move.w	#$0001,($FFFFA4A0).l
; $00C844
	move.w	#$0001,($FFFFA4A2).l
; $00C84C
	move.w	#$0600,($FFFFA4A4).l
; $00C854
	move.w	#$0600,($FFFFA95E).w
; $00C85A
	move.b	#$07,($FFFFA4A6).l
; $00C862
	move.b	#$06,($FFFFA4A7).l
; $00C86A
	move.b	#$04,($FFFFA4A8).l
; $00C872
	move.b	#$05,($FFFFA4A9).l
; $00C87A
	moveq	#7,d0
; $00C87C
	lea	($FFFFA4AA).l,a0

loc_00C882:				; $00C882
	clr.w	(a0)+
; $00C884
	dbf	d0,loc_00C882
; $00C888
	clr.w	($FFFFA4CA).l
; $00C88E
	jsr	($010BF4).l
; $00C894
	moveq	#11,d0
; $00C896
	lea	($FFFFA5BC).l,a0

loc_00C89C:				; $00C89C
	clr.b	(a0)+
; $00C89E
	dbf	d0,loc_00C89C
; $00C8A2
	clr.l	($FFFFA5C8).l
; $00C8A8
	lea	($0618E8).l,a0
; $00C8AE
	movea.l	$4(a0),a0
; $00C8B2
	lea	($FFFFA5CC).l,a1

loc_00C8B8:				; $00C8B8
	move.b	(a0)+,d0
; $00C8BA
	move.b	d0,(a1)+
; $00C8BC
	cmpi.b	#$FF,d0
; $00C8C0
	bne.w	loc_00C8B8
; $00C8C4
	lea	($09722C).l,a0
; $00C8CA
	movea.l	$4(a0),a0
; $00C8CE
	lea	($FFFFA5DE).l,a1

loc_00C8D4:				; $00C8D4
	move.w	(a0)+,d0
; $00C8D6
	move.w	d0,(a1)+
; $00C8D8
	cmpi.w	#$FFFF,d0
; $00C8DC
	bne.w	loc_00C8D4
; $00C8E0
	move.w	#$0032,($FFFFBD6E).w
; $00C8E6
	moveq	#19,d0
; $00C8E8
	moveq	#-1,d1
; $00C8EA
	lea	($FFFFC7F2).w,a0

loc_00C8EE:				; $00C8EE
	move.l	d1,(a0)+
; $00C8F0
	dbf	d0,loc_00C8EE
; $00C8F4
	move.w	#$0000,($FFFF816E).w
; $00C8FA
	move.w	#$0000,($FFFF8170).w
; $00C900
	move.w	#$0000,($FFFF8172).w
; $00C906
	move.w	#$0000,($FFFFAE92).w
; $00C90C
	move.w	#$0000,($FFFFAE94).w
; $00C912
	clr.w	($FFFFA6DC).l
; $00C918
	movem.l	(a7)+,d6/d7/a6/a7
; $00C91C
	rts

; ★ ═══ C91E: 资源加载辅助 (加载 $8001 字体 → VRAM $0000) ═══
; ★ ROM: move.w #$8001,d0; movea.w #0,a1; jsr $99B2
loc_00C91E:				; $00C91E
	movem.l	a7/d6,-(a7)
; $00C922
	move.w	#$8001,d0
; $00C926
	movea.w	#$0000,a1
; $00C92A
	jsr	($0099B2).l
; $00C930
	movem.l	(a7)+,d6/a7
; $00C934
	rts
; $00C936
	bsr.w	loc_00FCBA
; ★ ━━━ C93A → 队列 C944 (标题画面初始化) ━━━
; ★   ROM: move.l #$C944,(TASK_PTR); rts
; ★ ═══ C93A → 队列 C944: move.l #$C944,(TASK_PTR); rts ═══
; $00C93A
	move.l	#$0000C944,($FFFF8004).w
; $00C942
	rts
; ★ ━━━ C944: 标题画面设置 (→ 队列 C9AA) ━━━
; ★   步骤1: clr.w $A6D4 + clr.w $816E + jsr $942A + jsr $C7F6 + jsr $2D04C
; ★   步骤2: bsr $FCCE + jsr $942A + clr.b $AA10 + jsr $2D04C
; ★   步骤3: 设置 $5DF40 参数 → 队列 C9AA → 播放音效 $9334
; ★ ═══ C944: 标题画面设置 (3步, 最后队列 C9AA) ═══
; ★ 步1: clr $A6D4 + clr $816E + $942A + $C7F6 + $2D04C
; ★ 步2: bsr $FCCE + $942A + clr.b $AA10 + $2D04C
; ★ 步3: 设标题参数($5DF40) + CRAM偏移=2 + $C9AA队列 + 音效$9334
; $00C944
	move.w	#$0000,($FFFFA6D4).l
; $00C94C
	clr.w	($FFFF816E).w
; $00C950
	jsr	($00942A).l
; $00C956
	jsr	($00C7F6).l
; $00C95C
	jsr	($02D04C).l
; $00C962
	cmpi.w	#$A49C,($01FFFF).l
; $00C96A
	bne.w	loc_00C96E

loc_00C96E:				; $00C96E
	bsr.w	loc_00FCCE
; $00C972
	jsr	($00942A).l
; $00C978
	clr.b	($FFFFAA10).w
; $00C97C
	jsr	($02D04C).l
; ★ ★ $33005: move.l #$5DF40,($95A2) — 标题参数指针
; ★ $33005: move.l #$5DF40,($95A2) — 标题参数指针
; $00C982
	move.l	#$0005DF40,($FFFF95A2).w
; ★ ★ $33007: move.w #2,($95A6) — CRAM 偏移
; ★ $33007: move.w #2,($95A6) — CRAM偏移=2
; $00C98A
	move.w	#$0002,($FFFF95A6).w
; ★ ★ $33009: move.w #$F,($95A8) — 参数
; ★ $33009: move.w #$F,($95A8) — 参数=0xF
; $00C990
	move.w	#$000F,($FFFF95A8).w
; ★ ★ $33011: move.l #$C9AA,(TASK_PTR) — 队列 C9AA
; ★ $33011: move.l #$C9AA,(TASK_PTR) — 队列 C9AA
; $00C996
	move.l	#$0000C9AA,($FFFF8004).w
; $00C99E
	move.l	#$00009334,d0
; ★ $33015: jmp $85EE — 播放音效 $9334
; $00C9A4
	jmp	($0085EE).l
; ★ ━━━ ★ C9AA: 场景过渡 / 分流点 ($FF78FA 控制 正常标题 vs Demo) ━━━
; ★ ╔═══ C9AA: ★ 场景过渡 / 分流点 ═══════════════════════════════╗
; ★ ║ jsr $C7F6 → clr.w $A6DC → clr.b $F350                     ║
; ★ ╚═════════════════════════════════════════════════════════════╝
; $00C9AA
	jsr	($00C7F6).l
; $00C9B0
	clr.w	($FFFFA6DC).l
; $00C9B6
	clr.b	($FFFFF350).l
; ★ ★★★ $C9BC: tst.w ($FF78FA) — 关键分流判断 ★★★
; ★   $FF78FA ≠ 0 → bne.w $CA3C (Demo/开场动画路径)
; ★   $FF78FA = 0 → 正常标题画面路径 (加载资源 → 角色初始化 → 队列 CA0A)
; ★ ║ ★★★ tst.w ($FF78FA) — 关键分流 ★★★                        ║
; ★ ║ $FF78FA≠0 → bne.w CA3C (Demo/开场动画路径)                 ║
; ★ ║ $FF78FA=0 → 正常标题画面 (加载资源→角色初始化→队列CA0A)    ║
; $00C9BC
	tst.w	($FF78FA).l
; $00C9C2
	bne.w	loc_00CA3C
; ★   路径 A: 正常标题 — jsr $9EC4 (加载标题场景)
; ★ ── 路径A: 正常标题 ($FF78FA=0) ──
; ★ jsr $9EC4 — 加载标题场景
; $00C9C6
	jsr	($009EC4).l
; ★   路径 A: jsr $C91E (加载资源 $8001 → VRAM $0000, 字体数据)
; ★ jsr $C91E — 加载资源 $8001 (字体) → VRAM $0000
; $00C9CC
	jsr	($00C91E).l
; ★   路径 A: jsr $10C1E (角色初始化)
; ★ jsr $10C1E — 角色初始化
; $00C9D2
	jsr	($010C1E).l
; ★   路径 A: jsr $1113E (角色初始化)
; ★ jsr $1113E — 角色初始化
; $00C9D8
	jsr	($01113E).l
; ★   路径 A: jsr $111BC (角色初始化)
; ★ jsr $111BC — 角色初始化
; $00C9DE
	jsr	($0111BC).l
; ★   路径 A: jsr $11208 (角色初始化)
; ★ jsr $11208 — 角色初始化
; $00C9E4
	jsr	($011208).l
; ★   路径 A: bsr $CC58 (初始化)
; ★ bsr $CC58 — 初始化
; $00C9EA
	bsr.w	loc_00CC58
; ★   路径 A: move.w #5,($A61C) — 定时器 = 5 帧
; ★ move.w #5,($A61C) — 定时器=5帧
; $00C9EE
	move.w	#$0005,($FFFFA61C).l
; ★   路径 A: move.l #$CA0A,(TASK_PTR) — 队列 CA0A 标题菜单
; ★ move.l #$CA0A,(TASK_PTR) — 队列 CA0A(标题菜单)
; $00C9F6
	move.l	#$0000CA0A,($FFFF8004).w
; $00C9FE
	move.l	#$0000F68E,d0
; ★   路径 A: jmp $85EE (播放音效 $F68E)
; ★ jmp $85EE — 播放音效 $F68E
; $00CA04
	jmp	($0085EE).l
; ★   标题画面菜单处理: moveq #1,d0 → $11DA4获取选择 → 无选→CAF2; 有选→坐标→CAF2
; ★ CA0A: 标题画面菜单处理 → $11DA4获取选择 → 无选/有选→CAF2(部署)
; $00CA0A
	moveq	#1,d0
; $00CA0C
	jsr	($011DA4).l
; $00CA12
	beq.w	loc_00CAF2
; $00CA16
	move.l	d0,($FFFFA8D0).w
; $00CA1A
	jsr	($011972).l
; $00CA20
	beq.w	loc_00CAF2
; $00CA24
	movea.l	d0,a0
; $00CA26
	moveq	#0,d4
; $00CA28
	move.b	$6(a0),d4
; $00CA2C
	moveq	#0,d5
; $00CA2E
	move.b	$7(a0),d5
; $00CA32
	jsr	($00A78C).l
; $00CA38
	bra.w	loc_00CAF2

; ★ ── 路径B: Demo/开场动画 ($FF78FA≠0) ──
; ★ ★ CA3C: Demo/Attract 模式入口
loc_00CA3C:				; $00CA3C
	move.l	#$00010001,($FFFFA6DE).w
; ★ jsr $9EC4 (加载场景) → jsr $FA38 (加载 Demo 场景数据)
; ★ jsr $9EC4 — 加载场景
; $00CA44
	jsr	($009EC4).l
; $00CA4A
	jsr	($00FA38).l
; ★ jsr $FA38 (Demo 场景数据加载)
; ★ jsr $FA38 — 加载 Demo 场景数据
; $00CA50
	bsr.w	loc_010C4C
; ★ bsr $10C4C (角色初始化)
; ★ bsr $10C4C — 角色初始化
; $00CA54
	jsr	($014D8C).l
; ★ jsr $14D8C → bsr $9172 (显示列表) → bsr $9020 (输入) → jsr $C7B8 (过渡效果)
; ★ jsr $14D8C → bsr $9172(显示列表) → bsr $9020(输入) → jsr $C7B8(过渡效果)
; $00CA5A
	bsr.w	loc_009172
; $00CA5E
	bsr.w	loc_009020
; $00CA62
	jsr	($00C7B8).l
; ★ move.l #$CA72,(TASK_PTR) — 队列 Demo 循环
; ★ move.l #$CA72,(TASK_PTR) — 队列 Demo 循环
; $00CA68
	move.l	#$0000CA72,($FFFF8004).w
; $00CA70
	rts
; ★ CA72: Demo 循环 → 加载资源 $8001 → 队列 CA94
; ★ CA72: Demo 循环 → 加载资源 $8001 → 队列 CA94 → CAA8(角色遍历) → CAF2
; $00CA72
	move.w	#$8001,d0
; $00CA76
	movea.w	#$0000,a1
; $00CA7A
	jsr	($0099B2).l
; $00CA80
	move.l	#$0000CA94,($FFFF8004).w
; $00CA88
	move.l	#$00025ED8,d0
; $00CA8E
	jmp	($0085EE).l
; ★ CA94: → 队列 CAA8
; ★ CA94: move.l #$CAA8,(TASK_PTR); jmp $85EE($FCE2)
; $00CA94
	move.l	#$0000CAA8,($FFFF8004).w
; $00CA9C
	move.l	#$0000FCE2,d0
; $00CAA2
	jmp	($0085EE).l
; ★ CAA8: 角色遍历 + 坐标设置 → CAF2(部署)
; ★ CAA8: 角色遍历坐标设置 → 汇聚到 CAF2
; $00CAA8
	jsr	($011EDA).l
; $00CAAE
	move.w	#$0001,($FFFFA5F0).l
; $00CAB6
	bsr.w	loc_00CC58
; $00CABA
	lea	($FF603C).l,a0
; $00CAC0
	moveq	#19,d0

loc_00CAC2:				; $00CAC2
	move.l	a0,($FFFFA8D0).w
; $00CAC6
	bsr.w	loc_011972
; $00CACA
	bne.w	loc_00CAE0
; $00CACE
	adda.w	#$0060,a0
; $00CAD2
	dbf	d0,loc_00CAC2
; $00CAD6
	jsr	($00A6EA).l
; $00CADC
	bra.w	loc_00CAF2

loc_00CAE0:				; $00CAE0
	moveq	#0,d4
; $00CAE2
	moveq	#0,d5
; $00CAE4
	move.b	$6(a0),d4
; $00CAE8
	move.b	$7(a0),d5
; $00CAEC
	jsr	($00A78C).l

; ★ ★ CAF2: 汇聚点 — 部署阶段 (正常标题+Demo 两条路径在此合并)
loc_00CAF2:				; $00CAF2
	move.b	#$00,($FFFFA6C7).l
; $00CAFA
	move.b	#$08,($FFFFA9F0).w
; $00CB00
	jsr	($0108E2).l
; $00CB06
	jsr	($010136).l
; $00CB0C
	jsr	($010080).l
; $00CB12
	moveq	#23,d1
; $00CB14
	jsr	($00C7D0).l
; $00CB1A
	jsr	($011208).l
; $00CB20
	jsr	($00C1DC).l
; $00CB26
	lea	($FFFF94A2).w,a1
; $00CB2A
	lea	($082114).l,a2
; $00CB30
	bsr.w	loc_009208
; $00CB34
	lea	($FFFF94A2).w,a2
; $00CB38
	jsr	($00A122).l
; $00CB3E
	move.b	#$01,($FFFFA614).l
; $00CB46
	bsr.w	loc_00FD0E
; $00CB4A
	tst.w	($FF78FA).l
; $00CB50
	beq.w	loc_00CBEA
; $00CB54
	move.w	#$0001,($FFFFA7F8).w
; $00CB5A
	move.b	#$01,($FFFFA6F6).w
; $00CB60
	lea	($FF603C).l,a0
; $00CB66
	moveq	#19,d0

loc_00CB68:				; $00CB68
	move.l	a0,($FFFFA8D0).w
; $00CB6C
	bsr.w	loc_011972
; $00CB70
	bne.w	loc_00CB86
; $00CB74
	adda.w	#$0060,a0
; $00CB78
	dbf	d0,loc_00CB68
; $00CB7C
	jsr	($00A6EA).l
; $00CB82
	bra.w	loc_00CB98

loc_00CB86:				; $00CB86
	moveq	#0,d4
; $00CB88
	moveq	#0,d5
; $00CB8A
	move.b	$6(a0),d4
; $00CB8E
	move.b	$7(a0),d5
; $00CB92
	jsr	($00A78C).l

loc_00CB98:				; $00CB98
	bchg	#7,($FFFFAA11).w
; $00CB9E
	move.l	#$0000CBB2,($FFFF8004).w
; $00CBA6
	move.l	#$00014DBE,d0
; $00CBAC
	jmp	($0085EE).l
; $00CBB2
	lea	($FF603C).l,a0
; $00CBB8
	moveq	#19,d0

loc_00CBBA:				; $00CBBA
	move.l	a0,($FFFFA8D0).w
; $00CBBE
	bsr.w	loc_011972
; $00CBC2
	bne.w	loc_00CBD8
; $00CBC6
	adda.w	#$0060,a0
; $00CBCA
	dbf	d0,loc_00CBBA
; $00CBCE
	jsr	($00A6EA).l
; $00CBD4
	bra.w	loc_00CBEA

loc_00CBD8:				; $00CBD8
	moveq	#0,d4
; $00CBDA
	moveq	#0,d5
; $00CBDC
	move.b	$6(a0),d4
; $00CBE0
	move.b	$7(a0),d5
; $00CBE4
	jsr	($00A78C).l

loc_00CBEA:				; $00CBEA
	clr.w	($FFFFA7F8).w
; $00CBEE
	move.b	#$01,($FFFFA6F6).w
; $00CBF4
	move.l	#$FFFF94A2,($FFFF95A2).w
; $00CBFC
	move.w	#$0002,($FFFF95A6).w
; $00CC02
	move.w	#$000F,($FFFF95A8).w
; $00CC08
	move.l	#$0000CC1C,($FFFF8004).w
; $00CC10
	move.l	#$00009334,d0
; $00CC16
	jmp	($0085EE).l
; $00CC1C
	tst.w	($FF78FA).l
; $00CC22
	beq.w	loc_00CC3A
; $00CC26
	move.l	#$0000CC3A,($FFFF8004).w
; $00CC2E
	move.l	#$00011C20,d0
; $00CC34
	jmp	($0085EE).l

loc_00CC3A:				; $00CC3A
	moveq	#-1,d0
; $00CC3C
	jsr	($00A89C).l
; $00CC42
	jsr	($00A16A).l
; $00CC48
	jsr	($00C228).l
; $00CC4E
	move.l	#$0000D4AE,($FFFF8004).w
; $00CC56
	rts

; ★ CC58: 通用初始化辅助 (bsr $9172 + bsr $9020 + jsr $C7B8)
loc_00CC58:				; $00CC58
	move.b	#$01,($FFFF9F36).w
; $00CC5E
	move.b	#$01,($FFFF9F37).w
; $00CC64
	move.b	#$00,($FFFFA6F8).w
; $00CC6A
	move.b	#$00,($FFFFA6F9).w
; $00CC70
	jsr	($009172).l
; $00CC76
	jsr	($009020).l
; $00CC7C
	jsr	($00C7B8).l
; $00CC82
	move.w	#$8001,d0
; $00CC86
	movea.w	#$0000,a1
; $00CC8A
	jsr	($0099B2).l
; $00CC90
	jsr	($009FC2).l
; $00CC96
	jsr	($00FDAA).l
; $00CC9C
	rts

loc_00CC9E:				; $00CC9E
	cmpi.b	#$10,($00007F).w
; $00CCA4
	bne.w	loc_00CDC6
; $00CCA8
	move.w	($FFFFA49C).l,d0
; $00CCAE
	move.w	d0,($FFFFA612).l
; $00CCB4
	move.b	#$00,($FFFFA6F8).w

loc_00CCBA:				; $00CCBA
	move.l	#$0000CD7A,($FFFF8004).w
; $00CCC2
	btst	#0,($FFFF8179).w
; $00CCC8
	beq.w	loc_00CCE0
; $00CCCC
	move.w	($FFFFA612).l,d0
; $00CCD2
	subq.w	#1,d0
; $00CCD4
	bne.w	loc_00CCDA
; $00CCD8
	moveq	#31,d0

loc_00CCDA:				; $00CCDA
	move.w	d0,($FFFFA612).l

loc_00CCE0:				; $00CCE0
	btst	#1,($FFFF8179).w
; $00CCE6
	beq.w	loc_00CD02
; $00CCEA
	move.w	($FFFFA612).l,d0
; $00CCF0
	addq.w	#1,d0
; $00CCF2
	cmpi.w	#$0020,d0
; $00CCF6
	bcs.w	loc_00CCFC
; $00CCFA
	moveq	#1,d0

loc_00CCFC:				; $00CCFC
	move.w	d0,($FFFFA612).l

loc_00CD02:				; $00CD02
	movea.w	($FFFF904C).w,a2
; $00CD06
	lea	($FFFFA6CA).l,a0
; $00CD0C
	move.w	($FFFFA612).l,d1
; $00CD12
	cmpi.w	#$001B,d1
; $00CD16
	ble.w	loc_00CD1E
; $00CD1A
	subi.w	#$001B,d1

loc_00CD1E:				; $00CD1E
	moveq	#2,d2
; $00CD20
	moveq	#1,d4
; $00CD22
	moveq	#0,d3
; $00CD24
	moveq	#0,d5
; $00CD26
	jsr	($010780).l
; $00CD2C
	move.w	($FFFFA612).l,d1
; $00CD32
	cmpi.w	#$001B,d1
; $00CD36
	ble.w	loc_00CD42
; $00CD3A
	subi.w	#$001B,d1
; $00CD3E
	move.w	#$803F,(a0)

loc_00CD42:				; $00CD42
	moveq	#1,d1
; $00CD44
	moveq	#0,d2
; $00CD46
	move.w	#$00F8,d6
; $00CD4A
	move.w	#$0120,d3

loc_00CD4E:				; $00CD4E
	cmpi.w	#$2000,($20,a0,a0.w)
; $00CD54
	beq.w	loc_00CD6C
; $00CD58
	move.w	d6,(a2)+
; $00CD5A
	move.b	#$00,(a2)+
; $00CD5E
	addq.b	#1,($FFFF904E).w
; $00CD62
	move.b	($FFFF904E).w,(a2)+
; $00CD66
	move.w	($0,a0,d2.w),(a2)+
; $00CD6A
	move.w	d3,(a2)+

loc_00CD6C:				; $00CD6C
	addq.w	#2,d2
; $00CD6E
	addq.w	#8,d3
; $00CD70
	dbf	d1,loc_00CD4E
; $00CD74
	move.w	a2,($FFFF904C).w
; $00CD78
	rts
; $00CD7A
	move.b	($FFFF8179).w,d0
; $00CD7E
	btst	#4,d0
; $00CD82
	bne.w	loc_00CDB8
; $00CD86
	andi.b	#$A0,d0
; $00CD8A
	beq.w	loc_00CCBA
; $00CD8E
	move.b	#$00,($FFFF9F36).w
; $00CD94
	move.b	#$00,($FFFF9F37).w
; $00CD9A
	move.b	#$00,($FFFF9FEA).w
; $00CDA0
	move.w	#$0450,d0
; $00CDA4
	bsr.w	loc_00955C
; $00CDA8
	move.w	($FFFFA612).l,d0
; $00CDAE
	move.w	d0,($FFFFA49C).l
; $00CDB4
	bra.w	loc_00CFC8

loc_00CDB8:				; $00CDB8
	clr.b	($FFFFAA10).w
; $00CDBC
	move.l	#$0000D748,($FFFF8004).w
; $00CDC4
	rts

loc_00CDC6:				; $00CDC6
	tst.b	($FFFFAA10).w
; $00CDCA
	bmi.w	loc_00CF7A
; $00CDCE
	cmpi.w	#$A49C,($1BFFFF).l
; $00CDD6
	bne.w	loc_00CE66
; $00CDDA
	jsr	($011DD8).l
; $00CDE0
	bsr.w	loc_00FCCE
; $00CDE4
	move.w	#$0450,d0
; $00CDE8
	bsr.w	loc_00955C
; $00CDEC
	move.l	#$0005DF40,($FFFF95A2).w
; $00CDF4
	move.w	#$000A,($FFFF95A6).w
; $00CDFA
	move.w	#$000F,($FFFF95A8).w
; $00CE00
	move.b	#$00,($FFFF9FEA).w
; $00CE06
	move.l	#$0000CE1A,($FFFF8004).w
; $00CE0E
	move.l	#$00009334,d0
; $00CE14
	jmp	($0085EE).l
; $00CE1A
	move.b	#$00,($FFFF9F36).w
; $00CE20
	move.b	#$00,($FFFF9F37).w
; $00CE26
	jsr	($00942A).l
; $00CE2C
	jsr	($008294).l
; $00CE32
	move.w	#$000A,($FFFFA61C).l
; $00CE3A
	move.l	#$0000CE4E,($FFFF8004).w
; $00CE42
	move.l	#$0000F68E,d0
; $00CE48
	jmp	($0085EE).l
; $00CE4E
	bsr.w	loc_00FCBA
; $00CE52
	bsr.w	loc_009020
; $00CE56
	jsr	($00C7F6).l
; $00CE5C
	move.l	#$0002F738,($FFFF8004).w
; $00CE64
	rts

loc_00CE66:				; $00CE66
	lea	($18003E).l,a0
; $00CE6C
	move.w	($FFFFA49C).l,d0
; $00CE72
	subq.w	#1,d0
; $00CE74
	move.b	($0,a0,d0.w),d2
; $00CE78
	lea	($FF603C).l,a0
; $00CE7E
	moveq	#19,d0

loc_00CE80:				; $00CE80
	btst	#5,$8(a0)
; $00CE86
	bne.w	loc_00CEB8
; $00CE8A
	move.b	$1(a0),d1
; $00CE8E
	beq.w	loc_00CEB8
; $00CE92
	cmpi.b	#$0B,d1
; $00CE96
	bhi.w	loc_00CEB8
; $00CE9A
	move.l	a0,($FFFFA8D0).w
; $00CE9E
	jsr	($011972).l
; $00CEA4
	beq.w	loc_00CEB8
; $00CEA8
	move.b	$2F(a0),d1
; $00CEAC
	add.b	d2,d1
; $00CEAE
	bcc.w	loc_00CEB4
; $00CEB2
	moveq	#-1,d1

loc_00CEB4:				; $00CEB4
	move.b	d1,$2F(a0)

loc_00CEB8:				; $00CEB8
	adda.w	#$0060,a0
; $00CEBC
	dbf	d0,loc_00CE80
; $00CEC0
	move.l	#$0000CED4,($FFFF8004).w
; $00CEC8
	move.l	#$00014834,d0
; $00CECE
	jmp	($0085EE).l
; $00CED4
	jsr	($011DD8).l
; $00CEDA
	bsr.w	loc_00FCCE
; $00CEDE
	move.w	#$0450,d0
; $00CEE2
	bsr.w	loc_00955C
; $00CEE6
	move.l	#$0005DF40,($FFFF95A2).w
; $00CEEE
	move.w	#$0001,($FFFF95A6).w
; $00CEF4
	move.w	#$000F,($FFFF95A8).w
; $00CEFA
	move.l	#$0000CF0E,($FFFF8004).w
; $00CF02
	move.l	#$00009334,d0
; $00CF08
	jmp	($0085EE).l
; $00CF0E
	move.b	#$00,($FFFF9F36).w
; $00CF14
	move.b	#$00,($FFFF9F37).w
; $00CF1A
	move.b	#$00,($FFFF9FEA).w
; $00CF20
	jsr	($00942A).l
; $00CF26
	jsr	($008294).l
; $00CF2C
	move.w	#$000A,($FFFFA61C).l
; $00CF34
	move.l	#$0000CF48,($FFFF8004).w
; $00CF3C
	move.l	#$0000F68E,d0
; $00CF42
	jmp	($0085EE).l
; $00CF48
	bsr.w	loc_00FCBA
; $00CF4C
	bsr.w	loc_009020
; $00CF50
	jsr	($00C7F6).l
; $00CF56
	move.l	#$0000CF6A,($FFFF8004).w
; $00CF5E
	move.l	#$00029662,d0
; $00CF64
	jmp	($0085EE).l
; $00CF6A
	move.w	($FFFFA612).l,d0
; $00CF70
	move.w	d0,($FFFFA49C).l
; $00CF76
	bra.w	loc_00CFAC

loc_00CF7A:				; $00CF7A
	cmpi.w	#$A49C,($1CFFFF).l
; $00CF82
	bne.w	loc_00CF8E
; $00CF86
	move.b	#$01,($FFFFF350).l

loc_00CF8E:				; $00CF8E
	move.b	#$00,($FFFF9F36).w
; $00CF94
	move.b	#$00,($FFFF9F37).w
; $00CF9A
	move.b	#$00,($FFFF9FEA).w
; $00CFA0
	move.w	#$0450,d0
; $00CFA4
	bsr.w	loc_00955C
; $00CFA8
	bra.w	loc_00CFC8

loc_00CFAC:				; $00CFAC
	move.w	#$0450,d0
; $00CFB0
	bsr.w	loc_00955C
; $00CFB4
	move.l	#$0000CFC8,($FFFF8004).w
; $00CFBC
	move.l	#$00029BFC,d0
; $00CFC2
	jmp	($0085EE).l

loc_00CFC8:				; $00CFC8
	bsr.w	loc_00FCCE
; $00CFCC
	move.l	#$0005DF40,($FFFF95A2).w
; $00CFD4
	move.w	#$0001,($FFFF95A6).w
; $00CFDA
	move.w	#$000F,($FFFF95A8).w
; $00CFE0
	move.l	#$0000CFF4,($FFFF8004).w
; $00CFE8
	move.l	#$00009334,d0
; $00CFEE
	jmp	($0085EE).l
; $00CFF4
	move.w	#$000A,($FFFFA61C).l
; $00CFFC
	move.l	#$0000D010,($FFFF8004).w
; $00D004
	move.l	#$0000F68E,d0
; $00D00A
	jmp	($0085EE).l
; $00D010
	move.b	#$00,($FFFF9F36).w
; $00D016
	move.b	#$00,($FFFF9F37).w
; $00D01C
	move.b	#$00,($FFFF9FEA).w
; $00D022
	jsr	($00942A).l
; $00D028
	jsr	($008294).l
; $00D02E
	bsr.w	loc_00FCBA
; $00D032
	tst.b	($FFFFAA10).w
; $00D036
	bmi.w	loc_00D044
; $00D03A
	move.l	#$0000C936,($FFFF8004).w
; $00D042
	rts

loc_00D044:				; $00D044
	jsr	($00C816).l
; $00D04A
	move.l	#$0000C936,($FFFF8004).w
; $00D052
	move.l	#$0002D0C2,d0
; $00D058
	jsr	($0085EE).l
; $00D05E
	rts

loc_00D060:				; $00D060
	move.w	#$0000,($FFFFA6D6).l
; $00D068
	clr.w	($FFFFA6D8).l
; $00D06E
	move.l	#$0000D078,($FFFF8004).w
; $00D076
	rts
; $00D078
	lea	($05E512).l,a0
; $00D07E
	jsr	($008A20).l
; $00D084
	bne.w	loc_00D090
; $00D088
	move.w	#$0001,($FFFFA6D8).l

loc_00D090:				; $00D090
	btst	#0,($FFFF8179).w
; $00D096
	beq.w	loc_00D0AE
; $00D09A
	move.w	($FFFFA6D6).l,d0
; $00D0A0
	subq.w	#1,d0
; $00D0A2
	bcc.w	loc_00D0A8
; $00D0A6
	moveq	#4,d0

loc_00D0A8:				; $00D0A8
	move.w	d0,($FFFFA6D6).l

loc_00D0AE:				; $00D0AE
	btst	#1,($FFFF8179).w
; $00D0B4
	beq.w	loc_00D0D0
; $00D0B8
	move.w	($FFFFA6D6).l,d0
; $00D0BE
	addq.w	#1,d0
; $00D0C0
	cmpi.w	#$0005,d0
; $00D0C4
	bcs.w	loc_00D0CA
; $00D0C8
	moveq	#0,d0

loc_00D0CA:				; $00D0CA
	move.w	d0,($FFFFA6D6).l

loc_00D0D0:				; $00D0D0
	btst	#5,($FFFF8179).w
; $00D0D6
	beq.w	loc_00D0EC
; $00D0DA
	move.w	($FFFFA6D6).l,d0
; $00D0E0
	jsr	($01E0B0).l
; $00D0E6
	tst.w	d0
; $00D0E8
	bne.w	loc_00D1FA

loc_00D0EC:				; $00D0EC
	btst	#4,($FFFF8179).w
; $00D0F2
	bne.w	loc_00D312
; $00D0F6
	moveq	#4,d1
; $00D0F8
	moveq	#0,d2
; $00D0FA
	move.w	#$00D0,d3
; $00D0FE
	movea.w	($FFFF904C).w,a3

loc_00D102:				; $00D102
	move.w	d2,d0
; $00D104
	jsr	($01E0B0).l
; $00D10A
	tst.w	d0
; $00D10C
	beq.w	loc_00D126
; $00D110
	lea	($00D496).l,a2
; $00D116
	tst.w	d2
; $00D118
	beq.w	loc_00D12C
; $00D11C
	lea	($00D49E).l,a2
; $00D122
	bra.w	loc_00D12C

loc_00D126:				; $00D126
	lea	($00D4A6).l,a2

loc_00D12C:				; $00D12C
	moveq	#7,d5
; $00D12E
	move.w	#$00E8,d7

loc_00D132:				; $00D132
	move.w	d3,(a3)+
; $00D134
	move.b	#$00,(a3)+
; $00D138
	addq.b	#1,($FFFF904E).w
; $00D13C
	move.b	($FFFF904E).w,(a3)+
; $00D140
	move.w	#$8000,d4
; $00D144
	add.b	(a2)+,d4
; $00D146
	move.w	d4,(a3)+
; $00D148
	move.w	d7,(a3)+
; $00D14A
	addq.w	#8,d7
; $00D14C
	dbf	d5,loc_00D132
; $00D150
	tst.w	d0
; $00D152
	beq.w	loc_00D196
; $00D156
	moveq	#0,d6
; $00D158
	move.w	d0,d6
; $00D15A
	divu.w	#$000A,d6
; $00D15E
	move.w	d6,d0
; $00D160
	pea	d6
; $00D162
	move.w	d3,(a3)+
; $00D164
	move.b	#$00,(a3)+
; $00D168
	addq.b	#1,($FFFF904E).w
; $00D16C
	move.b	($FFFF904E).w,(a3)+
; $00D170
	move.w	#$8030,d4
; $00D174
	add.w	d0,d4
; $00D176
	move.w	d4,(a3)+
; $00D178
	addq.w	#8,d7
; $00D17A
	move.w	d7,(a3)+
; $00D17C
	move.w	d3,(a3)+
; $00D17E
	move.b	#$00,(a3)+
; $00D182
	addq.b	#1,($FFFF904E).w
; $00D186
	move.b	($FFFF904E).w,(a3)+
; $00D18A
	move.w	#$8030,d4
; $00D18E
	add.w	d6,d4
; $00D190
	move.w	d4,(a3)+
; $00D192
	addq.w	#8,d7
; $00D194
	move.w	d7,(a3)+

loc_00D196:				; $00D196
	addq.w	#1,d2
; $00D198
	addq.w	#8,d3
; $00D19A
	dbf	d1,loc_00D102
; $00D19E
	move.w	#$00D0,d3
; $00D1A2
	move.w	($FFFFA6D6).l,d0
; $00D1A8
	add.w	d0,d0
; $00D1AA
	add.w	d0,d0
; $00D1AC
	add.w	d0,d0
; $00D1AE
	add.w	d0,d3
; $00D1B0
	move.w	d3,(a3)+
; $00D1B2
	move.b	#$00,(a3)+
; $00D1B6
	addq.b	#1,($FFFF904E).w
; $00D1BA
	move.b	($FFFF904E).w,(a3)+
; $00D1BE
	move.w	#$801F,d4
; $00D1C2
	move.w	d4,(a3)+
; $00D1C4
	move.w	#$00E0,(a3)+
; $00D1C8
	lea	($00D48E).l,a2
; $00D1CE
	moveq	#3,d0
; $00D1D0
	move.w	#$00F8,d7

loc_00D1D4:				; $00D1D4
	move.w	#$00C8,(a3)+
; $00D1D8
	move.b	#$00,(a3)+
; $00D1DC
	addq.b	#1,($FFFF904E).w
; $00D1E0
	move.b	($FFFF904E).w,(a3)+
; $00D1E4
	move.w	#$8000,d4
; $00D1E8
	add.b	(a2)+,d4
; $00D1EA
	move.w	d4,(a3)+
; $00D1EC
	move.w	d7,(a3)+
; $00D1EE
	addq.w	#8,d7
; $00D1F0
	dbf	d0,loc_00D1D4
; $00D1F4
	move.w	a3,($FFFF904C).w
; $00D1F8
	rts

loc_00D1FA:				; $00D1FA
	move.w	($FFFFA6D6).l,d0
; $00D200
	jsr	($01DF08).l
; $00D206
	tst.w	d0
; $00D208
	bne.w	loc_00D060
; $00D20C
	tst.w	($FFFFA6D6).l
; $00D212
	beq.w	loc_00D312
; $00D216
	tst.w	($FFFFA6D8).l
; $00D21C
	beq.w	loc_00D312
; $00D220
	move.w	($FFFFA49C).l,d0
; $00D226
	move.w	d0,($FFFFA612).l
; $00D22C
	move.b	#$00,($FFFFA6F8).w

loc_00D232:				; $00D232
	move.l	#$0000D2F2,($FFFF8004).w
; $00D23A
	btst	#0,($FFFF8179).w
; $00D240
	beq.w	loc_00D258
; $00D244
	move.w	($FFFFA612).l,d0
; $00D24A
	subq.w	#1,d0
; $00D24C
	bne.w	loc_00D252
; $00D250
	moveq	#31,d0

loc_00D252:				; $00D252
	move.w	d0,($FFFFA612).l

loc_00D258:				; $00D258
	btst	#1,($FFFF8179).w
; $00D25E
	beq.w	loc_00D27A
; $00D262
	move.w	($FFFFA612).l,d0
; $00D268
	addq.w	#1,d0
; $00D26A
	cmpi.w	#$0020,d0
; $00D26E
	bcs.w	loc_00D274
; $00D272
	moveq	#1,d0

loc_00D274:				; $00D274
	move.w	d0,($FFFFA612).l

loc_00D27A:				; $00D27A
	movea.w	($FFFF904C).w,a2
; $00D27E
	lea	($FFFFA6CA).l,a0
; $00D284
	move.w	($FFFFA612).l,d1
; $00D28A
	cmpi.w	#$001B,d1
; $00D28E
	ble.w	loc_00D296
; $00D292
	subi.w	#$001B,d1

loc_00D296:				; $00D296
	moveq	#2,d2
; $00D298
	moveq	#1,d4
; $00D29A
	moveq	#0,d3
; $00D29C
	moveq	#0,d5
; $00D29E
	jsr	($010780).l
; $00D2A4
	move.w	($FFFFA612).l,d1
; $00D2AA
	cmpi.w	#$001B,d1
; $00D2AE
	ble.w	loc_00D2BA
; $00D2B2
	subi.w	#$001B,d1
; $00D2B6
	move.w	#$803F,(a0)

loc_00D2BA:				; $00D2BA
	moveq	#1,d1
; $00D2BC
	moveq	#0,d2
; $00D2BE
	move.w	#$00F8,d6
; $00D2C2
	move.w	#$0120,d3

loc_00D2C6:				; $00D2C6
	cmpi.w	#$2000,($20,a0,a0.w)
; $00D2CC
	beq.w	loc_00D2E4
; $00D2D0
	move.w	d6,(a2)+
; $00D2D2
	move.b	#$00,(a2)+
; $00D2D6
	addq.b	#1,($FFFF904E).w
; $00D2DA
	move.b	($FFFF904E).w,(a2)+
; $00D2DE
	move.w	($0,a0,d2.w),(a2)+
; $00D2E2
	move.w	d3,(a2)+

loc_00D2E4:				; $00D2E4
	addq.w	#2,d2
; $00D2E6
	addq.w	#8,d3
; $00D2E8
	dbf	d1,loc_00D2C6
; $00D2EC
	move.w	a2,($FFFF904C).w
; $00D2F0
	rts
; $00D2F2
	move.b	($FFFF8179).w,d0
; $00D2F6
	btst	#4,d0
; $00D2FA
	bne.w	loc_00D060
; $00D2FE
	andi.b	#$A0,d0
; $00D302
	beq.w	loc_00D232
; $00D306
	move.w	($FFFFA612).l,d0
; $00D30C
	move.w	d0,($FFFFA49C).l

loc_00D312:				; $00D312
	jsr	($008608).l
; $00D318
	rts
; $00D31A
	move.w	#$0000,($FFFFA6D6).l
; $00D322
	move.l	#$0000D32C,($FFFF8004).w
; $00D32A
	rts
; $00D32C
	btst	#0,($FFFF8179).w
; $00D332
	beq.w	loc_00D34A
; $00D336
	move.w	($FFFFA6D6).l,d0
; $00D33C
	subq.w	#1,d0
; $00D33E
	bcc.w	loc_00D344
; $00D342
	moveq	#3,d0

loc_00D344:				; $00D344
	move.w	d0,($FFFFA6D6).l

loc_00D34A:				; $00D34A
	btst	#1,($FFFF8179).w
; $00D350
	beq.w	loc_00D36C
; $00D354
	move.w	($FFFFA6D6).l,d0
; $00D35A
	addq.w	#1,d0
; $00D35C
	cmpi.w	#$0004,d0
; $00D360
	bcs.w	loc_00D366
; $00D364
	moveq	#0,d0

loc_00D366:				; $00D366
	move.w	d0,($FFFFA6D6).l

loc_00D36C:				; $00D36C
	btst	#5,($FFFF8179).w
; $00D372
	bne.w	loc_00D478
; $00D376
	btst	#4,($FFFF8179).w
; $00D37C
	bne.w	loc_00D486
; $00D380
	moveq	#3,d1
; $00D382
	moveq	#1,d2
; $00D384
	move.w	#$00D0,d3
; $00D388
	movea.w	($FFFF904C).w,a3

loc_00D38C:				; $00D38C
	move.w	d2,d0
; $00D38E
	jsr	($01E0B0).l
; $00D394
	tst.w	d0
; $00D396
	beq.w	loc_00D3A4
; $00D39A
	lea	($00D49E).l,a2
; $00D3A0
	bra.w	loc_00D3AA

loc_00D3A4:				; $00D3A4
	lea	($00D4A6).l,a2

loc_00D3AA:				; $00D3AA
	moveq	#7,d5
; $00D3AC
	move.w	#$00E8,d7

loc_00D3B0:				; $00D3B0
	move.w	d3,(a3)+
; $00D3B2
	move.b	#$00,(a3)+
; $00D3B6
	addq.b	#1,($FFFF904E).w
; $00D3BA
	move.b	($FFFF904E).w,(a3)+
; $00D3BE
	move.w	#$8000,d4
; $00D3C2
	add.b	(a2)+,d4
; $00D3C4
	move.w	d4,(a3)+
; $00D3C6
	move.w	d7,(a3)+
; $00D3C8
	addq.w	#8,d7
; $00D3CA
	dbf	d5,loc_00D3B0
; $00D3CE
	tst.w	d0
; $00D3D0
	beq.w	loc_00D414
; $00D3D4
	moveq	#0,d6
; $00D3D6
	move.w	d0,d6
; $00D3D8
	divu.w	#$000A,d6
; $00D3DC
	move.w	d6,d0
; $00D3DE
	pea	d6
; $00D3E0
	move.w	d3,(a3)+
; $00D3E2
	move.b	#$00,(a3)+
; $00D3E6
	addq.b	#1,($FFFF904E).w
; $00D3EA
	move.b	($FFFF904E).w,(a3)+
; $00D3EE
	move.w	#$8030,d4
; $00D3F2
	add.w	d0,d4
; $00D3F4
	move.w	d4,(a3)+
; $00D3F6
	addq.w	#8,d7
; $00D3F8
	move.w	d7,(a3)+
; $00D3FA
	move.w	d3,(a3)+
; $00D3FC
	move.b	#$00,(a3)+
; $00D400
	addq.b	#1,($FFFF904E).w
; $00D404
	move.b	($FFFF904E).w,(a3)+
; $00D408
	move.w	#$8030,d4
; $00D40C
	add.w	d6,d4
; $00D40E
	move.w	d4,(a3)+
; $00D410
	addq.w	#8,d7
; $00D412
	move.w	d7,(a3)+

loc_00D414:				; $00D414
	addq.w	#1,d2
; $00D416
	addq.w	#8,d3
; $00D418
	dbf	d1,loc_00D38C
; $00D41C
	move.w	#$00D0,d3
; $00D420
	move.w	($FFFFA6D6).l,d0
; $00D426
	add.w	d0,d0
; $00D428
	add.w	d0,d0
; $00D42A
	add.w	d0,d0
; $00D42C
	add.w	d0,d3
; $00D42E
	move.w	d3,(a3)+
; $00D430
	move.b	#$00,(a3)+
; $00D434
	addq.b	#1,($FFFF904E).w
; $00D438
	move.b	($FFFF904E).w,(a3)+
; $00D43C
	move.w	#$801F,d4
; $00D440
	move.w	d4,(a3)+
; $00D442
	move.w	#$00E0,(a3)+
; $00D446
	lea	($00D492).l,a2
; $00D44C
	moveq	#3,d0
; $00D44E
	move.w	#$00F8,d7

loc_00D452:				; $00D452
	move.w	#$00C8,(a3)+
; $00D456
	move.b	#$00,(a3)+
; $00D45A
	addq.b	#1,($FFFF904E).w
; $00D45E
	move.b	($FFFF904E).w,(a3)+
; $00D462
	move.w	#$8000,d4
; $00D466
	add.b	(a2)+,d4
; $00D468
	move.w	d4,(a3)+
; $00D46A
	move.w	d7,(a3)+
; $00D46C
	addq.w	#8,d7
; $00D46E
	dbf	d0,loc_00D452
; $00D472
	move.w	a3,($FFFF904C).w
; $00D476
	rts

loc_00D478:				; $00D478
	move.w	($FFFFA6D6).l,d0
; $00D47E
	addq.w	#1,d0
; $00D480
	jmp	($01DE94).l

loc_00D486:				; $00D486
	jsr	($008608).l
; $00D48C
	rts
; $00D48E
	dc.w	$4C4F
; $00D490
	dc.w	$4144
; $00D492
	subq.w	#1,d1
; $00D494
	addq.w	#3,d5
; $00D496
	dc.w	$434F
; $00D498
	link	a4,#18766
; $00D49C
	subq.w	#2,d5
; $00D49E
	subq.w	#1,d3
; $00D4A0
	dc.w	$454E
; $00D4A2
	dc.w	$4152
; $00D4A4
	dc.w	$494F
; $00D4A6
	trap	#15
; $00D4A8
	addq.w	#2,a0
; $00D4AA
	dc.w	$494E
; $00D4AC
	dc.w	$4720
; $00D4AE
	move.l	#$0000D4D0,($FFFF8004).w
; $00D4B6
	movem.l	a7/d7,-(a7)
; $00D4BA
	move.l	#$0000DA50,d0
; $00D4C0
	jsr	($0085EE).l
; $00D4C6
	movem.l	(a7)+,d7/a7
; $00D4CA
	jmp	($00DA50).l
; $00D4D0
	move.l	#$0000D4F2,($FFFF8004).w
; $00D4D8
	movem.l	a7/d7,-(a7)
; $00D4DC
	move.l	#$00023D44,d0
; $00D4E2
	jsr	($0085EE).l
; $00D4E8
	movem.l	(a7)+,d7/a7
; $00D4EC
	jmp	($023D44).l
; $00D4F2
	move.b	#$00,($FFFFA6F8).w
; $00D4F8
	move.l	#$0000D526,($FFFF8004).w
; $00D500
	move.l	#$0000DA8A,d0
; $00D506
	jsr	($0085EE).l
; $00D50C
	move.l	#$00023D4C,d0
; $00D512
	jsr	($0085EE).l
; $00D518
	move.l	#$0000DA50,d0
; $00D51E
	jsr	($0085EE).l
; $00D524
	rts
; $00D526
	tst.w	($FF78FA).l
; $00D52C
	beq.w	loc_00D578
; $00D530
	bchg	#4,($FFFFAA11).w
; $00D536
	move.l	#$0000D54A,($FFFF8004).w
; $00D53E
	move.l	#$00014DBE,d0
; $00D544
	jmp	($0085EE).l
; $00D54A
	bchg	#5,($FFFFAA11).w
; $00D550
	move.l	#$0000D564,($FFFF8004).w
; $00D558
	move.l	#$00014DBE,d0
; $00D55E
	jmp	($0085EE).l
; $00D564
	move.l	#$0000D578,($FFFF8004).w
; $00D56C
	move.l	#$000119AE,d0
; $00D572
	jmp	($0085EE).l

loc_00D578:				; $00D578
	moveq	#1,d0
; $00D57A
	move.l	#$0000D59C,($FFFF8004).w
; $00D582
	movem.l	a7/d7,-(a7)
; $00D586
	move.l	#$0000F5E4,d0
; $00D58C
	jsr	($0085EE).l
; $00D592
	movem.l	(a7)+,d7/a7
; $00D596
	jmp	($00F5E4).l
; $00D59C
	move.b	#$03,($FFFFA618).l
; $00D5A4
	move.l	#$0000D5B8,($FFFF8004).w
; $00D5AC
	move.l	#$0000F32E,d0
; $00D5B2
	jmp	($0085EE).l
; $00D5B8
	move.w	#$FFFF,($FF78FA).l
; $00D5C0
	move.l	#$0000D748,($FFFF8004).w
; $00D5C8
	tst.b	($FFFFA6C6).l
; $00D5CE
	beq.w	loc_00D748
; $00D5D2
	move.b	#$01,($FFFFA9F0).w
; $00D5D8
	move.l	#$0000D5EC,($FFFF8004).w
; $00D5E0
	move.l	#$00011FDA,d0
; $00D5E6
	jmp	($0085EE).l
; $00D5EC
	move.b	#$03,($FFFFA614).l
; $00D5F4
	move.b	#$03,($FFFFA9F0).w
; $00D5FA
	move.l	#$0000D60E,($FFFF8004).w
; $00D602
	move.l	#$00011FDA,d0
; $00D608
	jmp	($0085EE).l
; $00D60E
	move.b	#$04,($FFFFA614).l
; $00D616
	move.l	#$0000D62A,($FFFF8004).w
; $00D61E
	move.l	#$0000FD5A,d0
; $00D624
	jmp	($0085EE).l
; $00D62A
	move.l	#$0000D658,($FFFF8004).w
; $00D632
	move.l	#$0000DA8A,d0
; $00D638
	jsr	($0085EE).l
; $00D63E
	move.l	#$00023D54,d0
; $00D644
	jsr	($0085EE).l
; $00D64A
	move.l	#$0000DA50,d0
; $00D650
	jsr	($0085EE).l
; $00D656
	rts
; $00D658
	bchg	#4,($FFFFAA11).w
; $00D65E
	move.l	#$0000D672,($FFFF8004).w
; $00D666
	move.l	#$00014DBE,d0
; $00D66C
	jmp	($0085EE).l
; $00D672
	tst.b	($FFFFAA10).w
; $00D676
	bne.w	loc_00CC9E
; $00D67A
	bchg	#5,($FFFFAA11).w
; $00D680
	move.l	#$0000D694,($FFFF8004).w
; $00D688
	move.l	#$00014DBE,d0
; $00D68E
	jmp	($0085EE).l
; $00D694
	tst.b	($FFFFAA10).w
; $00D698
	bne.w	loc_00CC9E
; $00D69C
	move.l	#$0000D6B0,($FFFF8004).w
; $00D6A4
	move.l	#$000119AE,d0
; $00D6AA
	jmp	($0085EE).l
; $00D6B0
	move.b	#$0C,($FFFFA618).l
; $00D6B8
	move.l	#$0000D6CC,($FFFF8004).w
; $00D6C0
	move.l	#$0000F32E,d0
; $00D6C6
	jmp	($0085EE).l
; $00D6CC
	move.b	#$04,($FFFFA9F0).w
; $00D6D2
	move.l	#$0000D6E6,($FFFF8004).w
; $00D6DA
	move.l	#$00011FDA,d0
; $00D6E0
	jmp	($0085EE).l
; $00D6E6
	move.b	#$08,($FFFFA614).l
; $00D6EE
	move.b	#$08,($FFFFA9F0).w
; $00D6F4
	move.l	#$0000D708,($FFFF8004).w
; $00D6FC
	move.l	#$00011FDA,d0
; $00D702
	jmp	($0085EE).l
; $00D708
	addq.w	#1,($FFFFA5F0).l
; $00D70E
	cmpi.w	#$A5F0,($100FFFF).l
; $00D716
	bcs.w	loc_00D722
; $00D71A
	move.w	#$00FF,($FFFFA5F0).l

loc_00D722:				; $00D722
	move.b	#$01,($FFFFA614).l
; $00D72A
	move.l	#$0000D73E,($FFFF8004).w
; $00D732
	move.l	#$0000FD5A,d0
; $00D738
	jmp	($0085EE).l
; $00D73E
	move.l	#$0000D4F2,($FFFF8004).w
; $00D746
	rts

loc_00D748:				; $00D748
	move.b	#$00,($FFFFA6F8).w
; $00D74E
	move.l	#$0000D770,($FFFF8004).w
; $00D756
	move.l	#$00014834,d0
; $00D75C
	jsr	($0085EE).l
; $00D762
	move.l	#$000119AE,d0
; $00D768
	jsr	($0085EE).l
; $00D76E
	rts
; $00D770
	tst.b	($FFFFAA10).w
; $00D774
	bne.w	loc_00CC9E
; $00D778
	move.b	#$01,($FFFFA6F8).w
; $00D77E
	tst.w	($FFFFA6D4).l
; $00D784
	beq.w	loc_00D798
; $00D788
	move.b	#$00,($FFFFA6F8).w
; $00D78E
	move.l	#$0000FB88,($FFFF8004).w
; $00D796
	rts

loc_00D798:				; $00D798
	lea	($00D7C6).l,a0
; $00D79E
	jsr	($008A20).l
; $00D7A4
	bne.w	loc_00D7E6
; $00D7A8
	eori.b	#$C7,($01FFFF).l
; $00D7B0
	move.b	#$46,($FFFFA6DA).l
; $00D7B8
	clr.b	($FFFFA6DB).l
; $00D7BE
	bsr.w	loc_00FD7A
; $00D7C2
	bra.w	loc_00D7E6
; $00D7C6
	ori.b	#$00,(a5)+
; $00D7CA
	subi.b	#$00,d0
; $00D7CE
	btst	#0,d0
; $00D7D2
	subi.b	#$00,d0
; $00D7D6
	move.b	d0,d0
; $00D7D8
	andi.b	#$00,d0
; $00D7DC
	negx.b	d0
; $00D7DE
	move.b	d0,d0
; $00D7E0
	andi.b	#$00,d0
; $00D7E4
	negx.w	d0

loc_00D7E6:				; $00D7E6
	move.b	#$00,($FFFFA617).l
; $00D7EE
	tst.b	($FFFF9F30).w
; $00D7F2
	bne.w	loc_00D992
; $00D7F6
	cmpi.b	#$79,($000080).w
; $00D7FC
	beq.w	loc_00F2B4
; $00D800
	cmpi.b	#$79,($000020).w
; $00D806
	beq.w	loc_00D862
; $00D80A
	cmpi.b	#$79,($000010).w
; $00D810
	beq.w	loc_00D846
; $00D814
	cmpi.b	#$79,($000040).w
; $00D81A
	bne.w	loc_00D992
; $00D81E
	move.b	#$00,($FFFFA6F8).w
; $00D824
	tst.b	($FFFFA660).l
; $00D82A
	beq.w	loc_00D838
; $00D82E
	bsr.w	loc_00F5C6
; $00D832
	jsr	($00A6EA).l

loc_00D838:				; $00D838
	move.l	#$00000D90,d0
; $00D83E
	jsr	($0085EE).l
; $00D844
	rts

loc_00D846:				; $00D846
	move.b	#$00,($FFFFA6F8).w
; $00D84C
	tst.b	($FFFFA660).l
; $00D852
	beq.w	loc_00D860
; $00D856
	bsr.w	loc_00F5C6
; $00D85A
	jsr	($00A6EA).l

loc_00D860:				; $00D860
	rts

loc_00D862:				; $00D862
	move.b	#$00,($FFFFA6F8).w
; $00D868
	move.l	($FFFFA6DE).w,($FFFFA6E2).w
; $00D86E
	move.l	($FFFFA6DE).w,($FFFFA6E6).w
; $00D874
	move.w	($FFFFA6E4).w,d1
; $00D878
	mulu.w	($FFFF9F2C).w,d1
; $00D87C
	add.w	($FFFFA6E2).w,d1
; $00D880
	add.w	d1,d1
; $00D882
	move.w	d1,($FFFFA61E).l
; $00D888
	move.w	d1,($FFFFA620).l
; $00D88E
	lea	($FF5000).l,a0
; $00D894
	move.b	($1,a0,d1.w),($FFFFA625).l
; $00D89C
	move.b	($0,a0,d1.w),d2
; $00D8A0
	move.b	d2,($FFFFA624).l
; $00D8A6
	cmpi.b	#$FF,d2
; $00D8AA
	beq.w	loc_00DA3A
; $00D8AE
	tst.b	($FFFFA660).l
; $00D8B4
	beq.w	loc_00D8C2
; $00D8B8
	bsr.w	loc_00F5C6
; $00D8BC
	jsr	($00A6EA).l

loc_00D8C2:				; $00D8C2
	lea	($FF5000).l,a0
; $00D8C8
	moveq	#0,d0
; $00D8CA
	move.b	($0,a0,d1.w),d0
; $00D8CE
	add.w	d0,d0
; $00D8D0
	add.w	d0,d0
; $00D8D2
	lea	($05E5D8).l,a1
; $00D8D8
	movea.l	($0,a1,d0.w),a1
; $00D8DC
	move.l	a1,($FFFFA628).l
; $00D8E2
	move.b	$20(a1),($FFFFA626).l
; $00D8EA
	addq.w	#1,d1
; $00D8EC
	moveq	#0,d0
; $00D8EE
	move.b	($0,a0,d1.w),d0
; $00D8F2
	movea.l	($FFFFA628).l,a1
; $00D8F8
	lea	($05E628).l,a0
; $00D8FE
	add.w	d0,d0
; $00D900
	add.w	d0,d0
; $00D902
	adda.l	($0,a0,d0.w),a1
; $00D906
	move.l	a1,($FFFFA62C).l
; $00D90C
	cmpa.l	($FFFFA628).l,a1
; $00D912
	bne.w	loc_00D94C
; $00D916
	cmpi.b	#$20,$1(a1)
; $00D91C
	bne.w	loc_00D94C
; $00D920
	tst.b	$5C(a1)
; $00D924
	beq.w	loc_00D932
; $00D928
	cmpi.b	#$20,$1(a1)
; $00D92E
	bne.w	loc_00D94C

loc_00D932:				; $00D932
	bchg	#0,($FFFFAA11).w
; $00D938
	move.l	#$0000D94C,($FFFF8004).w
; $00D940
	move.l	#$00014DBE,d0
; $00D946
	jmp	($0085EE).l

loc_00D94C:				; $00D94C
	move.l	#$0000D960,($FFFF8004).w
; $00D954
	move.l	#$0000DA50,d0
; $00D95A
	jmp	($0085EE).l
; $00D960
	move.l	#$0000D974,($FFFF8004).w
; $00D968
	move.l	#$000206A2,d0
; $00D96E
	jmp	($0085EE).l
; $00D974
	move.l	#$0000D748,($FFFF8004).w
; $00D97C
	cmpi.b	#$78,($000020).w
; $00D982
	beq.w	loc_00D994
; $00D986
	move.l	#$0000DA8A,d0
; $00D98C
	jsr	($0085EE).l

loc_00D992:				; $00D992
	rts

loc_00D994:				; $00D994
	move.w	($FFFFA6E0).w,d0
; $00D998
	mulu.w	($FFFF9F2C).w,d0
; $00D99C
	add.w	($FFFFA6DE).w,d0
; $00D9A0
	add.w	d0,d0
; $00D9A2
	lea	($FF5000).l,a0
; $00D9A8
	move.b	($0,a0,d0.w),d2
; $00D9AC
	cmpi.b	#$FF,d2
; $00D9B0
	beq.w	loc_00DA26
; $00D9B4
	movea.l	($FFFF8108).l,a0
; $00D9BA
	move.l	#$0000B744,(a0)
; $00D9C0
	move.w	($FFFFA6DE).w,$4(a0)
; $00D9C6
	move.w	($FFFFA6E0).w,$6(a0)
; $00D9CC
	clr.w	$8(a0)
; $00D9D0
	move.w	#$0000,$A(a0)
; $00D9D6
	move.b	#$00,$C(a0)
; $00D9DC
	clr.b	$D(a0)
; $00D9E0
	lea	$28(a0),a0
; $00D9E4
	move.l	a0,($FFFF8108).l
; $00D9EA
	move.b	#$00,($FFFF9F35).w
; $00D9F0
	move.l	#$0000DA8A,d0
; $00D9F6
	jsr	($0085EE).l
; $00D9FC
	move.l	#$0000DA0A,d0
; $00DA02
	jsr	($0085EE).l

loc_00DA08:				; $00DA08
	rts
; $00DA0A
	cmpi.b	#$35,($000001).w
; $00DA10
	bne.w	loc_00DA08
; $00DA14
	bsr.w	loc_00F5A8
; $00DA18
	jsr	($00A6EA).l
; $00DA1E
	jsr	($008608).l
; $00DA24
	rts

loc_00DA26:				; $00DA26
	move.l	#$0000DA3A,($FFFF8004).w
; $00DA2E
	move.l	#$0000DA8A,d0
; $00DA34
	jmp	($0085EE).l

loc_00DA3A:				; $00DA3A
	tst.b	($FFFFA660).l
; $00DA40
	beq.w	loc_00D992
; $00DA44
	bsr.w	loc_00F5C6
; $00DA48
	jsr	($00A6EA).l
; $00DA4E
	rts

loc_00DA50:				; $00DA50
	move.b	#$00,($FFFF9FEA).w
; $00DA56
	move.w	#$0450,d0
; $00DA5A
	bsr.w	loc_00955C
; $00DA5E
	move.b	#$00,($FFFFA6F6).w
; $00DA64
	move.b	#$00,($FFFF9FE2).w
; $00DA6A
	move.b	#$00,($FFFF9FE3).w
; $00DA70
	move.b	#$00,($FFFF9FFB).w
; $00DA76
	jsr	($00AA18).l
; $00DA7C
	jsr	($00A6EA).l
; $00DA82
	jsr	($008608).l
; $00DA88
	rts

loc_00DA8A:				; $00DA8A
	move.w	($FFFFA6E0).w,d0
; $00DA8E
	mulu.w	($FFFF9F2C).w,d0
; $00DA92
	add.w	($FFFFA6DE).w,d0
; $00DA96
	add.w	d0,d0
; $00DA98
	lea	($FF5000).l,a0
; $00DA9E
	tst.w	($0,a0,d0.w)
; $00DAA2
	bmi.w	loc_00DAAC
; $00DAA6
	moveq	#-1,d0
; $00DAA8
	bra.w	loc_00DAB2

loc_00DAAC:				; $00DAAC
	move.b	($FFFFA624).l,d0

loc_00DAB2:				; $00DAB2
	jsr	($00A89C).l
; $00DAB8
	jsr	($00A16A).l
; $00DABE
	lea	($FFFF9F62).w,a1
; $00DAC2
	moveq	#3,d1
; $00DAC4
	jsr	($009192).l
; $00DACA
	move.l	#$0000DAD4,($FFFF8004).w
; $00DAD2
	rts
; $00DAD4
	move.b	#$01,($FFFF9FEA).w
; $00DADA
	move.b	#$01,($FFFFA6F6).w
; $00DAE0
	move.b	#$01,($FFFF9FE2).w
; $00DAE6
	move.b	#$01,($FFFF9FE3).w
; $00DAEC
	move.b	#$01,($FFFF9FFB).w
; $00DAF2
	jsr	($00A6EA).l
; $00DAF8
	jsr	($008608).l
; $00DAFE
	rts

loc_00DB00:				; $00DB00
	move.b	#$00,($FFFFA6F8).w
; $00DB06
	move.l	#$0000DB36,($FFFF8004).w
; $00DB0E
	move.l	#$0000FFBA,d0
; $00DB14
	jsr	($0085EE).l
; $00DB1A
	jmp	($00FFBA).l

loc_00DB20:				; $00DB20
	moveq	#0,d0
; $00DB22
	bsr.w	loc_00FF8A
; $00DB26
	move.b	#$01,($FFFFA6F6).w
; $00DB2C
	move.l	($FFFFA6E2).w,($FFFFA6EE).w
; $00DB32
	bra.w	loc_00DB00
; $00DB36
	move.b	#$00,($FFFFA6F8).w
; $00DB3C
	move.l	#$0000DB50,($FFFF8004).w
; $00DB44
	move.l	#$0000DB66,d0
; $00DB4A
	jmp	($0085EE).l
; $00DB50
	moveq	#0,d0
; $00DB52
	bsr.w	loc_00FF8A

loc_00DB56:				; $00DB56
	jsr	($008608).l
; $00DB5C
	move.l	#$0000D748,($FFFF8004).w
; $00DB64
	rts

loc_00DB66:				; $00DB66
	move.b	#$00,($FFFFA6F8).w
; $00DB6C
	tst.b	($FFFFA660).l
; $00DB72
	beq.w	loc_00DB7A
; $00DB76
	bsr.w	loc_00F5C6

loc_00DB7A:				; $00DB7A
	move.w	($FFFFA6E0).w,d1
; $00DB7E
	mulu.w	($FFFF9F2C).w,d1
; $00DB82
	add.w	($FFFFA6DE).w,d1
; $00DB86
	add.w	d1,d1
; $00DB88
	lea	($FF5000).l,a0
; $00DB8E
	moveq	#0,d0
; $00DB90
	move.b	($0,a0,d1.w),d0
; $00DB94
	bmi.w	loc_00DBCC
; $00DB98
	move.w	($FFFF9FE4).w,($FFFF9FF4).w
; $00DB9E
	move.w	d0,($FFFF9FE4).w
; $00DBA2
	cmp.w	($FFFF9FF4).w,d0
; $00DBA6
	beq.w	loc_00DBCC
; $00DBAA
	jsr	($00A89C).l
; $00DBB0
	jsr	($00A16A).l
; $00DBB6
	lea	($FFFF9F62).w,a1
; $00DBBA
	moveq	#3,d1
; $00DBBC
	jsr	($009192).l
; $00DBC2
	move.l	#$0000DBCC,($FFFF8004).w
; $00DBCA
	rts

loc_00DBCC:				; $00DBCC
	jsr	($00A6EA).l
; $00DBD2
	jsr	($008608).l
; $00DBD8
	rts
; $00DBDA
	jsr	($0111BC).l
; $00DBE0
	movea.l	($FFFF8108).l,a0
; $00DBE6
	move.l	#$0000B744,(a0)
; $00DBEC
	move.w	($FFFFA6E2).w,$4(a0)
; $00DBF2
	move.w	($FFFFA6E4).w,$6(a0)
; $00DBF8
	clr.w	$8(a0)
; $00DBFC
	move.w	#$0000,$A(a0)
; $00DC02
	move.b	#$00,$C(a0)
; $00DC08
	clr.b	$D(a0)
; $00DC0C
	lea	$28(a0),a0
; $00DC10
	move.l	a0,($FFFF8108).l
; $00DC16
	move.b	#$00,($FFFF9F35).w
; $00DC1C
	move.l	#$0000DC32,($FFFF8004).w
; $00DC24
	move.l	#$0000DA8A,d0
; $00DC2A
	jsr	($0085EE).l

loc_00DC30:				; $00DC30
	rts
; $00DC32
	cmpi.b	#$35,($000001).w
; $00DC38
	bne.w	loc_00DC30
; $00DC3C
	moveq	#1,d0
; $00DC3E
	bsr.w	loc_00FF8A

loc_00DC42:				; $00DC42
	jsr	($00A850).l
; $00DC48
	tst.b	($FFFFA660).l
; $00DC4E
	bne.w	loc_00DC56
; $00DC52
	bsr.w	loc_00F5A8

loc_00DC56:				; $00DC56
	move.l	#$0000DC60,($FFFF8004).w
; $00DC5E
	rts
; $00DC60
	tst.b	($FFFF9F30).w
; $00DC64
	bne.w	loc_00DC7C
; $00DC68
	cmpi.b	#$79,($000020).w
; $00DC6E
	beq.w	loc_00DC8C
; $00DC72
	cmpi.b	#$79,($000010).w
; $00DC78
	beq.w	loc_00DB20

loc_00DC7C:				; $00DC7C
	move.b	#$01,($FFFFA6F8).w
; $00DC82
	move.b	#$01,($FFFFA617).l
; $00DC8A
	rts

loc_00DC8C:				; $00DC8C
	move.b	#$00,($FFFFA6F8).w
; $00DC92
	move.w	($FFFFA6DE).w,d0
; $00DC96
	move.w	($FFFFA6E0).w,d1
; $00DC9A
	move.w	d0,($FFFFA6E6).w
; $00DC9E
	move.w	d1,($FFFFA6E8).w
; $00DCA2
	mulu.w	($FFFF9F2C).w,d1
; $00DCA6
	add.w	d0,d1
; $00DCA8
	add.w	d1,d1
; $00DCAA
	move.w	d1,($FFFFA620).l
; $00DCB0
	move.w	($FFFFA6E8).w,d1
; $00DCB4
	cmp.w	($FFFFA6E4).w,d1
; $00DCB8
	bne.w	loc_00DCC4
; $00DCBC
	cmp.w	($FFFFA6E2).w,d0
; $00DCC0
	beq.w	loc_00DCE0

loc_00DCC4:				; $00DCC4
	move.w	($FFFFA620).l,d0
; $00DCCA
	lea	($FF4000).l,a0
; $00DCD0
	move.b	($0,a0,d0.w),d0
; $00DCD4
	bmi.w	loc_00DDDC
; $00DCD8
	andi.b	#$0F,d0
; $00DCDC
	bne.w	loc_00DDDC

loc_00DCE0:				; $00DCE0
	move.b	#$48,($FFFFA6DA).l
; $00DCE8
	clr.b	($FFFFA6DB).l
; $00DCEE
	bsr.w	loc_00FD7A
; $00DCF2
	move.w	($FFFFA6E6).w,d4
; $00DCF6
	move.w	($FFFFA6E8).w,d5
; $00DCFA
	jsr	($00BF0A).l
; $00DD00
	jsr	($00A766).l
; $00DD06
	lea	($FF4000).l,a1
; $00DD0C
	move.w	($FFFFA61E).l,d0
; $00DD12
	move.w	($0,a1,d0.w),d2
; $00DD16
	andi.w	#$0000,(-$1,a1,a7.w)
; $00DD1C
	move.w	($FFFFA620).l,d0
; $00DD22
	andi.w	#$0F00,d2
; $00DD26
	or.w	d2,($0,a1,d0.w)
; $00DD2A
	movea.l	($FFFFA62C).l,a1
; $00DD30
	move.w	($FFFFA6E6).w,d0
; $00DD34
	asl.w	#8,d0
; $00DD36
	or.w	($FFFFA6E8).w,d0
; $00DD3A
	move.w	d0,$6(a1)
; $00DD3E
	moveq	#0,d1
; $00DD40
	move.b	($FFFFA624).l,d1
; $00DD46
	moveq	#0,d2
; $00DD48
	move.b	($FFFFA625).l,d2
; $00DD4E
	move.w	($FFFFA6E2).w,d3
; $00DD52
	move.w	($FFFFA6E4).w,d4
; $00DD56
	move.w	($FFFFA6E6).w,d5
; $00DD5A
	move.w	($FFFFA6E8).w,d6
; $00DD5E
	jsr	($00C304).l
; $00DD64
	moveq	#0,d1
; $00DD66
	move.b	($FFFFA624).l,d1
; $00DD6C
	move.w	($FFFF9FE4).w,($FFFF9FF4).w
; $00DD72
	move.w	d1,($FFFF9FE4).w
; $00DD76
	cmp.w	($FFFF9FF4).w,d1
; $00DD7A
	beq.w	loc_00DD9C
; $00DD7E
	jsr	($00AA18).l
; $00DD84
	jsr	($00A16A).l
; $00DD8A
	lea	($FFFF9F62).w,a1
; $00DD8E
	moveq	#3,d1
; $00DD90
	jsr	($009192).l
; $00DD96
	move.w	($FFFF9FE4).w,($FFFF9FF4).w

loc_00DD9C:				; $00DD9C
	move.l	#$0000DDA6,($FFFF8004).w

loc_00DDA4:				; $00DDA4
	rts
; $00DDA6
	tst.b	($FFFF9FEB).w
; $00DDAA
	bne.w	loc_00DDA4
; $00DDAE
	jsr	($00C01A).l
; $00DDB4
	beq.w	loc_00DF06

loc_00DDB8:				; $00DDB8
	move.b	#$00,($FFFFA6F8).w
; $00DDBE
	move.w	($FFFFA6E6).w,d4
; $00DDC2
	move.w	($FFFFA6E8).w,d5
; $00DDC6
	jsr	($00BF0A).l
; $00DDCC
	jsr	($00A766).l
; $00DDD2
	move.l	#$0000DDEE,($FFFF8004).w

loc_00DDDA:				; $00DDDA
	rts

loc_00DDDC:				; $00DDDC
	move.b	#$5E,($FFFFA6DA).l
; $00DDE4
	clr.b	($FFFFA6DB).l
; $00DDEA
	bra.w	loc_00FD7A
; $00DDEE
	move.b	#$01,($FFFFA617).l
; $00DDF6
	tst.b	($FFFF9F30).w
; $00DDFA
	bne.w	loc_00DDDA
; $00DDFE
	cmpi.b	#$79,($000010).w
; $00DE04
	beq.w	loc_00DE84
; $00DE08
	cmpi.b	#$79,($000020).w
; $00DE0E
	bne.w	loc_00DDDA
; $00DE12
	move.b	#$48,($FFFFA6DA).l
; $00DE1A
	clr.b	($FFFFA6DB).l
; $00DE20
	bsr.w	loc_00FD7A
; $00DE24
	movea.l	($FFFFA62C).l,a0
; $00DE2A
	ori.b	#$02,$1(a0)
; $00DE30
	move.l	#$0000DE52,($FFFF8004).w
; $00DE38
	movem.l	a7/d7,-(a7)
; $00DE3C
	move.l	#$0000DB66,d0
; $00DE42
	jsr	($0085EE).l
; $00DE48
	movem.l	(a7)+,d7/a7
; $00DE4C
	jmp	($00DB66).l
; $00DE52
	moveq	#0,d0
; $00DE54
	bsr.w	loc_00FF8A
; $00DE58
	bchg	#3,($FFFFAA11).w
; $00DE5E
	move.l	#$0000DE72,($FFFF8004).w
; $00DE66
	move.l	#$00014DBE,d0
; $00DE6C
	jmp	($0085EE).l
; $00DE72
	tst.b	($FFFFAA10).w
; $00DE76
	beq.w	loc_00DB56
; $00DE7A
	jsr	($008608).l
; $00DE80
	bra.w	loc_00CC9E

loc_00DE84:				; $00DE84
	move.b	#$00,($FFFFA6F8).w
; $00DE8A
	lea	($FF5000).l,a0
; $00DE90
	lea	($FF4000).l,a1
; $00DE96
	move.w	($FFFFA620).l,d0
; $00DE9C
	move.w	#$FFFF,($0,a0,d0.w)
; $00DEA2
	move.w	($0,a1,d0.w),d2
; $00DEA6
	andi.w	#$0000,(-$1,a1,a7.w)
; $00DEAC
	move.w	($FFFFA61E).l,d0
; $00DEB2
	move.w	($FFFFA624).l,($0,a0,d0.w)
; $00DEBA
	andi.w	#$0F00,d2
; $00DEBE
	or.w	d2,($0,a1,d0.w)
; $00DEC2
	movea.l	($FFFFA62C).l,a1
; $00DEC8
	move.w	($FFFFA6E2).w,d0
; $00DECC
	asl.w	#8,d0
; $00DECE
	or.w	($FFFFA6E4).w,d0
; $00DED2
	move.w	d0,$6(a1)
; $00DED6
	lea	($FF4000).l,a1
; $00DEDC
	move.w	#$07FF,d0

loc_00DEE0:				; $00DEE0
	tst.b	$1(a1)
; $00DEE4
	bne.w	loc_00DEF0
; $00DEE8
	ori.w	#$8000,(a1)+
; $00DEEC
	bra.w	loc_00DEF4

loc_00DEF0:				; $00DEF0
	andi.w	#$7FFF,(a1)+

loc_00DEF4:				; $00DEF4
	dbf	d0,loc_00DEE0
; $00DEF8
	bra.w	loc_00DC42

loc_00DEFC:				; $00DEFC
	moveq	#1,d0
; $00DEFE
	bsr.w	loc_00FF8A
; $00DF02
	bra.w	loc_00DE84

loc_00DF06:				; $00DF06
	move.b	#$00,($FFFFA617).l
; $00DF0E
	bsr.w	loc_00E4FE
; $00DF12
	move.l	#$0000DF22,($FFFF8004).w

loc_00DF1A:				; $00DF1A
	move.b	#$01,($FFFFA6F8).w
; $00DF20
	rts
; $00DF22
	tst.b	($FFFF9F30).w
; $00DF26
	bne.w	loc_00DF1A
; $00DF2A
	cmpi.b	#$79,($000010).w
; $00DF30
	beq.w	loc_00DEFC
; $00DF34
	cmpi.b	#$79,($000020).w
; $00DF3A
	bne.w	loc_00DF1A
; $00DF3E
	move.w	($FFFFA6DE).w,d0
; $00DF42
	move.w	($FFFFA6E0).w,d1
; $00DF46
	cmp.w	($FFFFA6E6).w,d0
; $00DF4A
	bne.w	loc_00E5DA
; $00DF4E
	cmp.w	($FFFFA6E8).w,d1
; $00DF52
	bne.w	loc_00E5DA
; $00DF56
	moveq	#1,d0
; $00DF58
	bsr.w	loc_00FF8A
; $00DF5C
	move.b	#$48,($FFFFA6DA).l
; $00DF64
	clr.b	($FFFFA6DB).l
; $00DF6A
	bsr.w	loc_00FD7A
; $00DF6E
	bra.w	loc_00DDB8

loc_00DF72:				; $00DF72
	move.w	$24(a1),d0
; $00DF76
	move.w	$26(a1),d1
; $00DF7A
	mulu.w	($FFFF9F2C).w,d1
; $00DF7E
	add.w	d1,d0
; $00DF80
	add.w	d0,d0
; $00DF82
	lea	($FF3000).l,a3
; $00DF88
	moveq	#0,d1
; $00DF8A
	move.b	($0,a3,d0.w),d1
; $00DF8E
	move.b	$0(a2),$1(a1)
; $00DF94
	move.b	$2E(a0),$3(a1)
; $00DF9A
	move.b	$2F(a0),$5(a1)
; $00DFA0
	move.b	$3(a2),$7(a1)
; $00DFA6
	btst	#6,$2(a2)
; $00DFAC
	bne.w	loc_00DFBC
; $00DFB0
	move.b	$5(a2),d0
; $00DFB4
	bne.w	loc_00E04C
; $00DFB8
	bra.w	loc_00E000

loc_00DFBC:				; $00DFBC
	clr.w	$16(a1)
; $00DFC0
	clr.w	$18(a1)
; $00DFC4
	clr.w	$1A(a1)
; $00DFC8
	clr.w	$1C(a1)
; $00DFCC
	clr.w	$A(a1)
; $00DFD0
	move.w	$0(a1),d0
; $00DFD4
	mulu.w	#$001C,d0
; $00DFD8
	lea	($05EDDC).l,a3
; $00DFDE
	move.b	($6,a3,d0.w),$9(a1)
; $00DFE4
	movea.l	a3,a4
; $00DFE6
	adda.w	($4,a3,d0.w),a4
; $00DFEA
	move.b	($0,a4,d1.w),$23(a1)
; $00DFF0
	adda.w	($0,a3,d0.w),a3
; $00DFF4
	move.l	a3,$1E(a1)
; $00DFF8
	move.w	#$0001,$C(a1)
; $00DFFE
	rts

loc_00E000:				; $00E000
	move.b	$3A(a0),$17(a1)
; $00E006
	move.b	$3B(a0),$19(a1)
; $00E00C
	clr.w	$1A(a1)
; $00E010
	clr.w	$1C(a1)
; $00E014
	clr.w	$A(a1)
; $00E018
	move.w	$0(a1),d0
; $00E01C
	mulu.w	#$001C,d0
; $00E020
	lea	($05EDDC).l,a3
; $00E026
	move.b	($6,a3,d0.w),$9(a1)
; $00E02C
	movea.l	a3,a4
; $00E02E
	adda.w	($4,a3,d0.w),a4
; $00E032
	move.b	($0,a4,d1.w),$23(a1)
; $00E038
	adda.w	($0,a3,d0.w),a3
; $00E03C
	move.l	a3,$1E(a1)
; $00E040
	move.w	#$0001,$C(a1)
; $00E046
	jmp	($0109CA).l

loc_00E04C:				; $00E04C
	move.b	$46(a0),$1B(a1)
; $00E052
	move.b	$47(a0),$1D(a1)
; $00E058
	move.b	$45(a0),$D(a1)
; $00E05E
	move.w	$0(a1),d0
; $00E062
	mulu.w	#$001C,d0
; $00E066
	lea	($05EDDC).l,a3
; $00E06C
	move.b	($B,a3,d0.w),$17(a1)
; $00E072
	move.b	($C,a3,d0.w),$19(a1)
; $00E078
	move.w	#$0001,$A(a1)
; $00E07E
	move.b	($6,a3,d0.w),$9(a1)
; $00E084
	movea.l	a3,a4
; $00E086
	adda.w	($4,a3,d0.w),a4
; $00E08A
	move.b	($0,a4,d1.w),$23(a1)
; $00E090
	adda.w	($0,a3,d0.w),a3
; $00E094
	move.l	a3,$1E(a1)
; $00E098
	btst	#3,$8(a0)
; $00E09E
	bne.w	loc_00E0F4
; $00E0A2
	jsr	($0109D0).l
; $00E0A8
	move.b	$6(a0),d1
; $00E0AC
	sub.b	$25(a1),d1
; $00E0B0
	bpl.w	loc_00E0B6
; $00E0B4
	neg.b	d1

loc_00E0B6:				; $00E0B6
	move.b	$7(a0),d2
; $00E0BA
	sub.b	$27(a1),d2
; $00E0BE
	bpl.w	loc_00E0C4
; $00E0C2
	neg.b	d2

loc_00E0C4:				; $00E0C4
	add.b	d1,d2
; $00E0C6
	cmp.b	$D(a1),d2
; $00E0CA
	bgt.w	loc_00E0F4
; $00E0CE
	move.w	#$0001,$C(a1)
; $00E0D4
	btst	#0,$8(a0)
; $00E0DA
	beq.w	loc_00E0E2
; $00E0DE
	addq.b	#4,$1B(a1)

loc_00E0E2:				; $00E0E2
	btst	#1,$8(a0)
; $00E0E8
	beq.w	loc_00E0FC
; $00E0EC
	addq.b	#4,$1D(a1)
; $00E0F0
	bra.w	loc_00E0FC

loc_00E0F4:				; $00E0F4
	clr.l	$1A(a1)
; $00E0F8
	clr.w	$C(a1)

loc_00E0FC:				; $00E0FC
	rts

loc_00E0FE:				; $00E0FE
	movem.l	a7/a6/a5/d7/d6/d5/d4,-(a7)
; $00E102
	movea.l	($FFFFA62C).l,a0
; $00E108
	movea.l	($FFFFA634).l,a1
; $00E10E
	btst	#6,$2(a0)
; $00E114
	bne.w	loc_00E22E
; $00E118
	btst	#6,$2(a1)
; $00E11E
	bne.w	loc_00E22E
; $00E122
	tst.b	$3(a0)
; $00E126
	bne.w	loc_00E1B2
; $00E12A
	moveq	#0,d0
; $00E12C
	move.b	$0(a0),d0
; $00E130
	mulu.w	#$001C,d0
; $00E134
	lea	($05EDDC).l,a2
; $00E13A
	move.b	($12,a2,d0.w),d0
; $00E13E
	movea.l	($FFFFA630).l,a2
; $00E144
	cmpi.b	#$09,$A(a2)
; $00E14A
	bne.w	loc_00E156
; $00E14E
	add.b	d0,d0
; $00E150
	bcc.w	loc_00E156
; $00E154
	moveq	#-1,d0

loc_00E156:				; $00E156
	add.b	$2F(a2),d0
; $00E15A
	bcc.w	loc_00E160
; $00E15E
	moveq	#-1,d0

loc_00E160:				; $00E160
	move.b	d0,$2F(a2)
; $00E164
	movea.l	($FFFFA628).l,a3
; $00E16A
	btst	#5,$8(a3)
; $00E170
	bne.w	loc_00E1B2
; $00E174
	move.b	$5C(a3),d0
; $00E178
	bne.w	loc_00E180
; $00E17C
	move.b	$20(a3),d0

loc_00E180:				; $00E180
	btst	#0,d0
; $00E184
	bne.w	loc_00E1B2
; $00E188
	btst	#0,$20(a2)
; $00E18E
	beq.w	loc_00E1B2
; $00E192
	move.b	$5E(a2),d0
; $00E196
	addq.b	#1,d0
; $00E198
	bcc.w	loc_00E19E
; $00E19C
	moveq	#-1,d0

loc_00E19E:				; $00E19E
	move.b	d0,$5E(a2)
; $00E1A2
	cmpa.l	a3,a0
; $00E1A4
	bne.w	loc_00E1B2
; $00E1A8
	move.b	$1(a1),d0
; $00E1AC
	addq.b	#1,d0
; $00E1AE
	move.b	d0,$5E(a3)

loc_00E1B2:				; $00E1B2
	tst.b	$3(a1)
; $00E1B6
	bne.w	loc_00E242
; $00E1BA
	moveq	#0,d0
; $00E1BC
	move.b	$0(a1),d0
; $00E1C0
	mulu.w	#$001C,d0
; $00E1C4
	lea	($05EDDC).l,a2
; $00E1CA
	move.b	($12,a2,d0.w),d0
; $00E1CE
	movea.l	($FFFFA628).l,a2
; $00E1D4
	cmpi.b	#$09,$A(a2)
; $00E1DA
	bne.w	loc_00E1E6
; $00E1DE
	add.b	d0,d0
; $00E1E0
	bcc.w	loc_00E1E6
; $00E1E4
	moveq	#-1,d0

loc_00E1E6:				; $00E1E6
	add.b	$2F(a2),d0
; $00E1EA
	bcc.w	loc_00E1F0
; $00E1EE
	moveq	#-1,d0

loc_00E1F0:				; $00E1F0
	move.b	d0,$2F(a2)
; $00E1F4
	movea.l	($FFFFA630).l,a3
; $00E1FA
	btst	#5,$8(a3)
; $00E200
	bne.w	loc_00E242
; $00E204
	move.b	$5C(a3),d0
; $00E208
	bne.w	loc_00E210
; $00E20C
	move.b	$20(a3),d0

loc_00E210:				; $00E210
	btst	#0,d0
; $00E214
	bne.w	loc_00E242
; $00E218
	btst	#0,$20(a2)
; $00E21E
	beq.w	loc_00E242
; $00E222
	move.b	$5E(a2),d0
; $00E226
	addq.b	#1,d0
; $00E228
	bcc.w	loc_00E22E
; $00E22C
	moveq	#-1,d0

loc_00E22E:				; $00E22E
	move.b	d0,$5E(a2)
; $00E232
	cmpa.l	a3,a1
; $00E234
	bne.w	loc_00E242
; $00E238
	move.b	$1(a0),d0
; $00E23C
	addq.b	#1,d0
; $00E23E
	move.b	d0,$5E(a3)

loc_00E242:				; $00E242
	movea.l	($FFFFA628).l,a1
; $00E248
	cmpa.l	($FFFFA62C).l,a1
; $00E24E
	bne.w	loc_00E284
; $00E252
	cmpi.b	#$00,$5F(a1)
; $00E258
	bne.w	loc_00E284
; $00E25C
	tst.b	$3(a1)
; $00E260
	beq.w	loc_00E2C6
; $00E264
	movea.l	($FFFFA630).l,a0
; $00E26A
	cmpa.l	($FFFFA634).l,a0
; $00E270
	bne.w	loc_00E2E4
; $00E274
	tst.b	$3(a0)
; $00E278
	bne.w	loc_00E2E4
; $00E27C
	bsr.w	loc_00E2EA
; $00E280
	bra.w	loc_00E2E4

loc_00E284:				; $00E284
	movea.l	($FFFFA630).l,a1
; $00E28A
	cmpa.l	($FFFFA634).l,a1
; $00E290
	bne.w	loc_00E2E4
; $00E294
	cmpi.b	#$00,$5F(a1)
; $00E29A
	bne.w	loc_00E2E4
; $00E29E
	tst.b	$3(a1)
; $00E2A2
	beq.w	loc_00E2C6
; $00E2A6
	movea.l	($FFFFA628).l,a0
; $00E2AC
	cmpa.l	($FFFFA62C).l,a0
; $00E2B2
	bne.w	loc_00E2E4
; $00E2B6
	tst.b	$3(a0)
; $00E2BA
	bne.w	loc_00E2E4
; $00E2BE
	bsr.w	loc_00E2EA
; $00E2C2
	bra.w	loc_00E2E4

loc_00E2C6:				; $00E2C6
	lea	($FF603C).l,a0
; $00E2CC
	moveq	#19,d0

loc_00E2CE:				; $00E2CE
	btst	#5,$8(a0)
; $00E2D4
	beq.w	loc_00E2DC
; $00E2D8
	clr.b	$3(a0)

loc_00E2DC:				; $00E2DC
	adda.w	#$0060,a0
; $00E2E0
	dbf	d0,loc_00E2CE

loc_00E2E4:				; $00E2E4
	movem.l	(a7)+,d4/d5/d6/d7/a5/a6/a7
; $00E2E8
	rts

loc_00E2EA:				; $00E2EA
	movem.l	a6/a5/d7,-(a7)
; $00E2EE
	move.l	a1,-(a7)
; $00E2F0
	lea	($FFFFA4CC).l,a1
; $00E2F6
	moveq	#0,d1
; $00E2F8
	move.b	$1(a0),d1
; $00E2FC
	beq.w	loc_00E37A
; $00E300
	cmpi.w	#$0001,d1
; $00E304
	beq.w	loc_00E37A
; $00E308
	cmpi.w	#$000B,d1
; $00E30C
	bhi.w	loc_00E37A
; $00E310
	bne.w	loc_00E318
; $00E314
	move.w	#$0004,d1

loc_00E318:				; $00E318
	subq.w	#1,d1
; $00E31A
	rol.w	#3,d1
; $00E31C
	move.w	d1,d2
; $00E31E
	add.w	d1,d1
; $00E320
	add.w	d2,d1
; $00E322
	move.b	$0(a0),($0,a1,d1.w)
; $00E328
	move.w	$2E(a0),($2,a1,d1.w)
; $00E32E
	move.w	$3A(a0),($4,a1,d1.w)
; $00E334
	move.l	$50(a0),($6,a1,d1.w)
; $00E33A
	move.b	$9(a0),($E,a1,d1.w)
; $00E340
	move.b	$A(a0),($F,a1,d1.w)
; $00E346
	move.b	$B(a0),($10,a1,d1.w)
; $00E34C
	moveq	#0,d2
; $00E34E
	move.b	$5E(a0),d2
; $00E352
	add.w	($12,a1,d1.w),d2
; $00E356
	bcc.w	loc_00E35C
; $00E35A
	moveq	#-1,d2

loc_00E35C:				; $00E35C
	move.w	d2,($12,a1,d1.w)
; $00E360
	addq.b	#1,($14,a1,d1.w)
; $00E364
	bcc.w	loc_00E36E
; $00E368
	move.b	#$FF,($14,a1,d1.w)

loc_00E36E:				; $00E36E
	move.b	$16(a0),($11,a1,d1.w)
; $00E374
	bchg	#4,$8(a0)

loc_00E37A:				; $00E37A
	movea.l	(a7)+,a1
; $00E37C
	move.b	$5C(a1),d1
; $00E380
	bne.w	loc_00E388
; $00E384
	move.b	$20(a1),d1

loc_00E388:				; $00E388
	move.b	d1,$5E(a0)
; $00E38C
	movem.l	(a7)+,d7/a5/a6
; $00E390
	rts

loc_00E392:				; $00E392
	movem.l	a7/a6/a5/d7/d6/d5/d4/d3,-(a7)
; $00E396
	lea	($FFFFA662).l,a0
; $00E39C
	moveq	#24,d0
; $00E39E
	moveq	#0,d1

loc_00E3A0:				; $00E3A0
	move.l	d1,(a0)+
; $00E3A2
	dbf	d0,loc_00E3A0
; $00E3A6
	lea	($FFFFA662).l,a1
; $00E3AC
	movea.l	($FFFFA628).l,a0
; $00E3B2
	movea.l	($FFFFA62C).l,a2
; $00E3B8
	move.w	($FFFFA6E6).w,$24(a1)
; $00E3BE
	move.w	($FFFFA6E8).w,$26(a1)
; $00E3C4
	bsr.w	loc_00DF72
; $00E3C8
	lea	($FFFFA694).l,a1
; $00E3CE
	movea.l	($FFFFA630).l,a0
; $00E3D4
	movea.l	($FFFFA634).l,a2
; $00E3DA
	move.w	($FFFFA6EA).w,$24(a1)
; $00E3E0
	move.w	($FFFFA6EC).w,$26(a1)
; $00E3E6
	bsr.w	loc_00DF72
; $00E3EA
	lea	($FFFFA662).l,a0
; $00E3F0
	movea.l	$1E(a0),a2
; $00E3F4
	move.w	$8(a1),d1
; $00E3F8
	add.w	d1,d1
; $00E3FA
	add.w	d1,d1
; $00E3FC
	move.l	($0,a2,d1.w),$1E(a0)
; $00E402
	movea.l	$1E(a1),a2
; $00E406
	move.w	$8(a0),d1
; $00E40A
	add.w	d1,d1
; $00E40C
	add.w	d1,d1
; $00E40E
	move.l	($0,a2,d1.w),$1E(a1)
; $00E414
	lea	($FFFFA662).l,a0
; $00E41A
	lea	($FFFFA694).l,a1
; $00E420
	bsr.w	loc_00F9C6
; $00E424
	lea	($FFFFA694).l,a0
; $00E42A
	lea	($FFFFA662).l,a1
; $00E430
	bsr.w	loc_00F9C6
; $00E434
	move.w	#$0001,$E(a1)
; $00E43A
	move.w	($FFFFA6E6).w,d0
; $00E43E
	sub.w	($FFFFA6EA).w,d0
; $00E442
	bge.w	loc_00E448
; $00E446
	neg.w	d0

loc_00E448:				; $00E448
	move.w	($FFFFA6E8).w,d1
; $00E44C
	sub.w	($FFFFA6EC).w,d1
; $00E450
	bge.w	loc_00E456
; $00E454
	neg.w	d1

loc_00E456:				; $00E456
	add.w	d0,d1
; $00E458
	cmpi.w	#$0001,d1
; $00E45C
	beq.w	loc_00E4B2
; $00E460
	movea.l	($FFFFA634).l,a3
; $00E466
	tst.b	$5(a3)
; $00E46A
	bne.w	loc_00E482
; $00E46E
	move.b	$9(a3),d2
; $00E472
	cmpi.b	#$0F,d2
; $00E476
	beq.w	loc_00E496
; $00E47A
	cmpi.b	#$10,d2
; $00E47E
	beq.w	loc_00E4A2

loc_00E482:				; $00E482
	move.w	$8(a0),d0
; $00E486
	cmpi.w	#$0010,d0
; $00E48A
	beq.w	loc_00E4A2
; $00E48E
	cmpi.w	#$000F,d0
; $00E492
	bne.w	loc_00E4AA

loc_00E496:				; $00E496
	cmpi.w	#$0003,d1
; $00E49A
	bgt.w	loc_00E4AA
; $00E49E
	bra.w	loc_00E4B2

loc_00E4A2:				; $00E4A2
	cmpi.w	#$0006,d1
; $00E4A6
	ble.w	loc_00E4B2

loc_00E4AA:				; $00E4AA
	clr.w	$E(a0)
; $00E4AE
	bra.w	loc_00E4D2

loc_00E4B2:				; $00E4B2
	cmpi.w	#$0000,$71(a0)
; $00E4B8
	beq.w	loc_00E4AA
; $00E4BC
	movea.l	($FFFFA634).l,a3
; $00E4C2
	btst	#3,$2(a3)
; $00E4C8
	bne.w	loc_00E4AA
; $00E4CC
	move.w	#$0001,$E(a0)

loc_00E4D2:				; $00E4D2
	lea	($FFFFA662).l,a0
; $00E4D8
	tst.w	$6(a0)
; $00E4DC
	beq.w	loc_00E4F8
; $00E4E0
	lea	($FFFFA694).l,a1
; $00E4E6
	tst.w	$6(a1)
; $00E4EA
	beq.w	loc_00E4F8
; $00E4EE
	bsr.w	loc_00F7F0
; $00E4F2
	exg	a0,a1
; $00E4F4
	bsr.w	loc_00F7F0

loc_00E4F8:				; $00E4F8
	movem.l	(a7)+,d3/d4/d5/d6/d7/a5/a6/a7
; $00E4FC
	rts

loc_00E4FE:				; $00E4FE
	lea	($FF4000).l,a0
; $00E504
	move.w	($FFFFA620).l,d0
; $00E50A
	andi.b	#$00,($7F,a0,d0.w)
; $00E510
	bsr.w	loc_00F5A8
; $00E514
	jsr	($00A766).l
; $00E51A
	movea.l	($FFFFA6F2).w,a0
; $00E51E
	moveq	#2,d0
; $00E520
	movea.l	($FFFFA62C).l,a1
; $00E526
	tst.b	$5(a1)
; $00E52A
	bne.w	loc_00E542
; $00E52E
	move.b	$9(a1),d1
; $00E532
	cmpi.b	#$0F,d1
; $00E536
	beq.w	loc_00E566
; $00E53A
	cmpi.b	#$10,d1
; $00E53E
	beq.w	loc_00E566

loc_00E542:				; $00E542
	moveq	#0,d1
; $00E544
	move.b	$0(a1),d1
; $00E548
	mulu.w	#$001C,d1
; $00E54C
	lea	($05EDDC).l,a1
; $00E552
	move.b	($6,a1,d1.w),d1
; $00E556
	cmpi.b	#$0F,d1
; $00E55A
	beq.w	loc_00E566
; $00E55E
	cmpi.b	#$10,d1
; $00E562
	bne.w	loc_00E568

loc_00E566:				; $00E566
	moveq	#3,d0

loc_00E568:				; $00E568
	bsr.w	loc_00FF8A
; $00E56C
	rts
; $00E56E
	move.l	#$0000E586,($FFFF8004).w
; $00E576
	move.l	#$0000DA8A,d0
; $00E57C
	jsr	($0085EE).l
; $00E582
	bra.w	loc_00DA8A
; $00E586
	jsr	($00C01A).l
; $00E58C
	bsr.w	loc_00E4FE
; $00E590
	jsr	($00A766).l
; $00E596
	move.l	#$0000E5A6,($FFFF8004).w

loc_00E59E:				; $00E59E
	move.b	#$01,($FFFFA6F8).w
; $00E5A4
	rts
; $00E5A6
	tst.b	($FFFF9F30).w
; $00E5AA
	bne.w	loc_00E59E
; $00E5AE
	cmpi.b	#$79,($000010).w
; $00E5B4
	beq.w	loc_00E79E
; $00E5B8
	cmpi.b	#$79,($000020).w
; $00E5BE
	bne.w	loc_00E59E
; $00E5C2
	move.w	($FFFFA6DE).w,d0
; $00E5C6
	move.w	($FFFFA6E0).w,d1
; $00E5CA
	cmp.w	($FFFFA6E2).w,d0
; $00E5CE
	bne.w	loc_00E5DA
; $00E5D2
	cmp.w	($FFFFA6E4).w,d1
; $00E5D6
	beq.w	loc_00E79E

loc_00E5DA:				; $00E5DA
	move.b	#$00,($FFFFA6F8).w
; $00E5E0
	move.w	d0,($FFFFA6EA).w
; $00E5E4
	move.w	d1,($FFFFA6EC).w
; $00E5E8
	mulu.w	($FFFF9F2C).w,d1
; $00E5EC
	add.w	d0,d1
; $00E5EE
	add.w	d1,d1
; $00E5F0
	move.w	d1,($FFFFA622).l
; $00E5F6
	lea	($FF4000).l,a0
; $00E5FC
	move.b	($0,a0,d1.w),d0
; $00E600
	bmi.s	loc_00E614
; $00E602
	andi.b	#$0F,d0
; $00E606
	beq.w	loc_00E614
; $00E60A
	and.b	($FFFFA626).l,d0
; $00E610
	beq.w	loc_00E626

loc_00E614:				; $00E614
	move.b	#$5E,($FFFFA6DA).l
; $00E61C
	clr.b	($FFFFA6DB).l
; $00E622
	bra.w	loc_00FD7A

loc_00E626:				; $00E626
	move.b	#$48,($FFFFA6DA).l
; $00E62E
	clr.b	($FFFFA6DB).l
; $00E634
	bsr.w	loc_00FD7A
; $00E638
	lea	($FF5000).l,a0
; $00E63E
	moveq	#0,d0
; $00E640
	move.b	($0,a0,d1.w),d0
; $00E644
	add.w	d0,d0
; $00E646
	add.w	d0,d0
; $00E648
	lea	($05E5D8).l,a1
; $00E64E
	movea.l	($0,a1,d0.w),a1
; $00E652
	move.l	a1,($FFFFA630).l
; $00E658
	addq.w	#1,d1
; $00E65A
	moveq	#0,d0
; $00E65C
	move.b	($0,a0,d1.w),d0
; $00E660
	movea.l	($FFFFA630).l,a1
; $00E666
	lea	($05E628).l,a0
; $00E66C
	add.w	d0,d0
; $00E66E
	add.w	d0,d0
; $00E670
	adda.l	($0,a0,d0.w),a1
; $00E674
	move.l	a1,($FFFFA634).l
; $00E67A
	bsr.w	loc_00F5C6
; $00E67E
	bchg	#1,($FFFFAA11).w
; $00E684
	move.l	#$0000E698,($FFFF8004).w
; $00E68C
	move.l	#$00014DBE,d0
; $00E692
	jmp	($0085EE).l
; $00E698
	movea.l	($FFFFA62C).l,a0
; $00E69E
	btst	#6,$2(a0)
; $00E6A4
	beq.w	loc_00E6B0
; $00E6A8
	clr.b	$3(a0)
; $00E6AC
	bra.w	loc_00E70E

loc_00E6B0:				; $00E6B0
	move.w	#$0000,($FFFFAE92).w
; $00E6B6
	move.l	#$0000E6CA,($FFFF8004).w
; $00E6BE
	move.l	#$000180C0,d0
; $00E6C4
	jmp	($0085EE).l
; $00E6CA
	lea	($FFFFA662).l,a0
; $00E6D0
	move.w	$6(a0),d0
; $00E6D4
	sub.w	($FFFFA692).l,d0
; $00E6DA
	bpl.w	loc_00E6E0
; $00E6DE
	moveq	#0,d0

loc_00E6E0:				; $00E6E0
	movea.l	($FFFFA62C).l,a0
; $00E6E6
	move.b	d0,$3(a0)
; $00E6EA
	lea	($FFFFA694).l,a0
; $00E6F0
	move.w	$6(a0),d1
; $00E6F4
	sub.w	($FFFFA6C4).l,d1
; $00E6FA
	bpl.w	loc_00E700
; $00E6FE
	moveq	#0,d1

loc_00E700:				; $00E700
	movea.l	($FFFFA634).l,a0
; $00E706
	move.b	d1,$3(a0)
; $00E70A
	bsr.w	loc_00E0FE

loc_00E70E:				; $00E70E
	bsr.w	loc_00F5A8
; $00E712
	jsr	($00A6EA).l
; $00E718
	movea.l	($FFFFA62C).l,a0
; $00E71E
	ori.b	#$02,$1(a0)
; $00E724
	move.l	#$0000E746,($FFFF8004).w
; $00E72C
	movem.l	a7/d7,-(a7)
; $00E730
	move.l	#$0000DB66,d0
; $00E736
	jsr	($0085EE).l
; $00E73C
	movem.l	(a7)+,d7/a7
; $00E740
	jmp	($00DB66).l
; $00E746
	move.b	#$00,($FFFFA6F8).w
; $00E74C
	tst.b	($FFFFA660).l
; $00E752
	beq.w	loc_00E75A
; $00E756
	bsr.w	loc_00F5C6

loc_00E75A:				; $00E75A
	jsr	($00A6EA).l
; $00E760
	moveq	#0,d0
; $00E762
	bsr.w	loc_00FF8A
; $00E766
	bchg	#2,($FFFFAA11).w
; $00E76C
	bchg	#3,($FFFFAA11).w
; $00E772
	bchg	#6,($FFFFAA11).w
; $00E778
	move.l	#$0000E78C,($FFFF8004).w
; $00E780
	move.l	#$00014DBE,d0
; $00E786
	jmp	($0085EE).l
; $00E78C
	tst.b	($FFFFAA10).w
; $00E790
	beq.w	loc_00DB56
; $00E794
	jsr	($008608).l
; $00E79A
	bra.w	loc_00CC9E

loc_00E79E:				; $00E79E
	move.l	($FFFFA6E2).w,($FFFFA6EE).w
; $00E7A4
	bra.w	loc_00DB00
; $00E7A8
	move.l	#$0000E7C0,($FFFF8004).w
; $00E7B0
	move.l	#$0000DA8A,d0
; $00E7B6
	jsr	($0085EE).l
; $00E7BC
	bra.w	loc_00DA8A

loc_00E7C0:				; $00E7C0
	moveq	#4,d0
; $00E7C2
	bsr.w	loc_00FF8A
; $00E7C6
	jsr	($00AA8E).l
; $00E7CC
	bsr.w	loc_00F5A8
; $00E7D0
	jsr	($00A6EA).l
; $00E7D6
	move.w	($FFFFA958).w,d0
; $00E7DA
	cmpi.w	#$0013,d0
; $00E7DE
	beq.w	loc_00EBAC
; $00E7E2
	cmpi.w	#$0016,d0
; $00E7E6
	beq.w	loc_00ECEE
; $00E7EA
	move.l	#$0000E806,($FFFF8004).w

loc_00E7F2:				; $00E7F2
	rts

loc_00E7F4:				; $00E7F4
	move.b	#$5E,($FFFFA6DA).l
; $00E7FC
	clr.b	($FFFFA6DB).l
; $00E802
	bra.w	loc_00FD7A
; $00E806
	move.w	($FFFFA958).w,d0
; $00E80A
	add.w	d0,d0
; $00E80C
	add.w	d0,d0
; $00E80E
	add.w	d0,d0
; $00E810
	lea	($08203C).l,a0
; $00E816
	tst.w	($0,a0,d0.w)
; $00E81A
	beq.w	loc_00E824
; $00E81E
	move.b	#$01,($FFFFA6F8).w

loc_00E824:				; $00E824
	tst.b	($FFFF9F30).w
; $00E828
	bne.w	loc_00E7F2
; $00E82C
	cmpi.b	#$79,($000010).w
; $00E832
	beq.w	loc_00EBA2
; $00E836
	cmpi.b	#$79,($000020).w
; $00E83C
	bne.w	loc_00E7F2
; $00E840
	move.b	#$00,($FFFFA6F8).w
; $00E846
	move.w	($FFFFA6DE).w,d0
; $00E84A
	move.w	($FFFFA6E0).w,d1
; $00E84E
	move.w	d0,($FFFFA6E6).w
; $00E852
	move.w	d1,($FFFFA6E8).w
; $00E856
	mulu.w	($FFFF9F2C).w,d1
; $00E85A
	add.w	d0,d1
; $00E85C
	add.w	d1,d1
; $00E85E
	move.w	d1,($FFFFA620).l
; $00E864
	move.w	d1,d0
; $00E866
	lea	($FF4000).l,a0
; $00E86C
	move.b	($0,a0,d0.w),d0
; $00E870
	bmi.w	loc_00E7F4
; $00E874
	jsr	($00AB72).l
; $00E87A
	bne.w	loc_00E896
; $00E87E
	move.b	#$5E,($FFFFA6DA).l
; $00E886
	clr.b	($FFFFA6DB).l
; $00E88C
	bsr.w	loc_00FD7A
; $00E890
	jmp	($00AA8E).l

loc_00E896:				; $00E896
	move.b	#$48,($FFFFA6DA).l
; $00E89E
	clr.b	($FFFFA6DB).l
; $00E8A4
	bsr.w	loc_00FD7A
; $00E8A8
	jsr	($00ACF8).l
; $00E8AE
	moveq	#5,d0
; $00E8B0
	bsr.w	loc_00FF8A
; $00E8B4
	move.b	#$00,($FFFFA6F8).w
; $00E8BA
	jsr	($00A6EA).l
; $00E8C0
	move.l	#$0000E8CA,($FFFF8004).w
; $00E8C8
	rts
; $00E8CA
	move.b	#$01,($FFFFA6F8).w
; $00E8D0
	tst.b	($FFFF9F30).w
; $00E8D4
	bne.w	loc_00E7F2
; $00E8D8
	cmpi.b	#$79,($000010).w
; $00E8DE
	beq.w	loc_00E7C0
; $00E8E2
	cmpi.b	#$79,($000020).w
; $00E8E8
	bne.w	loc_00E7F2
; $00E8EC
	move.b	#$00,($FFFFA6F8).w
; $00E8F2
	move.b	#$48,($FFFFA6DA).l
; $00E8FA
	clr.b	($FFFFA6DB).l
; $00E900
	bsr.w	loc_00FD7A
; $00E904
	move.l	($FFFFA6E6).w,($FFFFA6EE).w
; $00E90A
	move.l	#$0000E91E,($FFFF8004).w
; $00E912
	move.l	#$0000FFBA,d0
; $00E918
	jmp	($0085EE).l
; $00E91E
	bsr.w	loc_00F5C6
; $00E922
	jsr	($00B698).l
; $00E928
	beq.w	loc_00E94A
; $00E92C
	bsr.w	loc_00F5C6
; $00E930
	bchg	#1,($FFFFAA11).w
; $00E936
	move.l	#$0000E94A,($FFFF8004).w
; $00E93E
	move.l	#$00014DBE,d0
; $00E944
	jmp	($0085EE).l

loc_00E94A:				; $00E94A
	move.l	#$0000E96C,($FFFF8004).w
; $00E952
	movem.l	a7/d7,-(a7)
; $00E956
	move.l	#$0000DA50,d0
; $00E95C
	jsr	($0085EE).l
; $00E962
	movem.l	(a7)+,d7/a7
; $00E966
	jmp	($00DA50).l
; $00E96C
	clr.w	($FFFFA49A).w
; $00E970
	move.w	($FFFFA6E2).w,d2
; $00E974
	pea	d2
; $00E976
	move.w	($FFFFA6E4).w,d2
; $00E97A
	move.w	($FFFFA6DE).w,d3
; $00E97E
	pea	d3
; $00E980
	move.w	($FFFFA6E0).w,d3
; $00E984
	move.w	($FFFFA958).w,d4
; $00E988
	pea	d4
; $00E98A
	move.w	#$0000,d4
; $00E98E
	movea.l	($FFFFA628).l,a0
; $00E994
	move.b	$2E(a0),d4
; $00E998
	move.l	#$0000E9B2,($FFFF8004).w
; $00E9A0
	move.l	#$0001E0EA,d0
; $00E9A6
	jsr	($0085EE).l
; $00E9AC
	jmp	($01E0EA).l
; $00E9B2
	cmpi.w	#$A958,($000004).w
; $00E9B8
	bne.w	loc_00E9D4
; $00E9BC
	move.w	($FFFFA6DE).w,d4
; $00E9C0
	move.w	($FFFFA6E0).w,d5
; $00E9C4
	jsr	($00C698).l
; $00E9CA
	move.l	#$0000E9D4,($FFFF8004).w
; $00E9D2
	rts

loc_00E9D4:				; $00E9D4
	cmpi.w	#$A958,($000008).w
; $00E9DA
	bne.w	loc_00EA4C
; $00E9DE
	lea	($FF4000).l,a0
; $00E9E4
	lea	($FF1000).l,a1
; $00E9EA
	moveq	#0,d2
; $00E9EC
	move.w	($FFFF9F2E).w,d1
; $00E9F0
	subq.w	#1,d1
; $00E9F2
	moveq	#0,d5

loc_00E9F4:				; $00E9F4
	move.w	($FFFF9F2C).w,d0
; $00E9F8
	subq.w	#1,d0
; $00E9FA
	moveq	#0,d4

loc_00E9FC:				; $00E9FC
	tst.w	(a0)+
; $00E9FE
	bmi.w	loc_00EA08
; $00EA02
	move.w	d4,(a1)+
; $00EA04
	move.w	d5,(a1)+
; $00EA06
	addq.w	#1,d2

loc_00EA08:				; $00EA08
	addq.w	#1,d4
; $00EA0A
	dbf	d0,loc_00E9FC
; $00EA0E
	addq.w	#1,d5
; $00EA10
	dbf	d1,loc_00E9F4
; $00EA14
	move.w	d2,d1
; $00EA16
	beq.w	loc_00EA4C
; $00EA1A
	asr.w	#4,d1
; $00EA1C
	move.w	d2,d3
; $00EA1E
	lea	($FF1000).l,a0

loc_00EA24:				; $00EA24
	move.w	d3,d2
; $00EA26
	jsr	($0085A2).l
; $00EA2C
	add.w	d2,d2
; $00EA2E
	add.w	d2,d2
; $00EA30
	move.w	($0,a0,d2.w),d4
; $00EA34
	move.w	($2,a0,d2.w),d5
; $00EA38
	jsr	($00C698).l
; $00EA3E
	dbf	d1,loc_00EA24
; $00EA42
	move.l	#$0000EA4C,($FFFF8004).w
; $00EA4A
	rts

loc_00EA4C:				; $00EA4C
	jsr	($01113E).l
; $00EA52
	jsr	($0111BC).l
; $00EA58
	move.l	#$0000EA6C,($FFFF8004).w
; $00EA60
	move.l	#$0000ADDC,d0
; $00EA66
	jmp	($0085EE).l
; $00EA6C
	cmpi.w	#$A958,($000007).w
; $00EA72
	bne.w	loc_00EAAE
; $00EA76
	lea	($FF603C).l,a0
; $00EA7C
	move.w	#$009F,d0

loc_00EA80:				; $00EA80
	tst.b	$3(a0)
; $00EA84
	bne.w	loc_00EA8E
; $00EA88
	ori.b	#$02,$80(a0)

loc_00EA8E:				; $00EA8E
	adda.w	#$000C,a0
; $00EA92
	dbf	d0,loc_00EA80
; $00EA96
	jsr	($010C1E).l
; $00EA9C
	jsr	($01113E).l
; $00EAA2
	jsr	($0111BC).l
; $00EAA8
	jsr	($00A766).l

loc_00EAAE:				; $00EAAE
	movea.l	($FFFFA62C).l,a0
; $00EAB4
	move.w	($FFFFA958).w,d0
; $00EAB8
	cmpi.w	#$0016,d0
; $00EABC
	bne.w	loc_00EAD6
; $00EAC0
	lea	($0820F4).l,a1
; $00EAC6
	move.w	($FFFFA95A).w,d0
; $00EACA
	add.w	d0,d0
; $00EACC
	add.w	d0,d0
; $00EACE
	move.w	($2,a1,d0.w),d1
; $00EAD2
	bra.w	loc_00EAE2

loc_00EAD6:				; $00EAD6
	rol.w	#3,d0
; $00EAD8
	lea	($08203C).l,a1
; $00EADE
	move.w	($4,a1,d0.w),d1

loc_00EAE2:				; $00EAE2
	tst.b	$5(a0)
; $00EAE6
	bne.w	loc_00EB00
; $00EAEA
	moveq	#0,d2
; $00EAEC
	move.b	$38(a0),d2
; $00EAF0
	sub.w	d1,d2
; $00EAF2
	bge.w	loc_00EAF8
; $00EAF6
	moveq	#0,d2

loc_00EAF8:				; $00EAF8
	move.b	d2,$38(a0)
; $00EAFC
	bra.w	loc_00EB18

loc_00EB00:				; $00EB00
	movea.l	($FFFFA628).l,a1
; $00EB06
	moveq	#0,d2
; $00EB08
	move.b	$5D(a1),d2
; $00EB0C
	sub.w	d1,d2
; $00EB0E
	bge.w	loc_00EB14
; $00EB12
	moveq	#0,d2

loc_00EB14:				; $00EB14
	move.b	d2,$5D(a1)

loc_00EB18:				; $00EB18
	ori.b	#$02,$1(a0)
; $00EB1E
	moveq	#0,d0
; $00EB20
	bsr.w	loc_00FF8A
; $00EB24
	move.b	#$01,($FFFFA6F6).w
; $00EB2A
	jsr	($01113E).l
; $00EB30
	jsr	($0111BC).l
; $00EB36
	bsr.w	loc_00F0AC
; $00EB3A
	jsr	($00B698).l
; $00EB40
	beq.w	loc_00EB64
; $00EB44
	bchg	#6,($FFFFAA11).w
; $00EB4A
	bchg	#2,($FFFFAA11).w
; $00EB50
	move.l	#$0000EB64,($FFFF8004).w
; $00EB58
	move.l	#$00014DBE,d0
; $00EB5E
	jmp	($0085EE).l

loc_00EB64:				; $00EB64
	bchg	#6,($FFFFAA11).w
; $00EB6A
	bchg	#5,($FFFFAA11).w
; $00EB70
	bchg	#3,($FFFFAA11).w
; $00EB76
	move.l	#$0000EB8A,($FFFF8004).w
; $00EB7E
	move.l	#$00014DBE,d0
; $00EB84
	jmp	($0085EE).l
; $00EB8A
	move.l	#$0000DB36,($FFFF8004).w
; $00EB92
	move.l	#$0000DA8A,d0
; $00EB98
	jsr	($0085EE).l
; $00EB9E
	bra.w	loc_00DA8A

loc_00EBA2:				; $00EBA2
	move.l	($FFFFA6E2).w,($FFFFA6EE).w
; $00EBA8
	bra.w	loc_00DB00

loc_00EBAC:				; $00EBAC
	move.b	#$00,($FFFFA6F8).w
; $00EBB2
	moveq	#5,d0
; $00EBB4
	bsr.w	loc_00FF8A
; $00EBB8
	move.l	#$0000EBC2,($FFFF8004).w
; $00EBC0
	rts
; $00EBC2
	cmpi.b	#$79,($000010).w
; $00EBC8
	beq.w	loc_00EBA2
; $00EBCC
	cmpi.b	#$79,($000020).w
; $00EBD2
	bne.w	loc_00E7F2
; $00EBD6
	move.b	#$00,($FFFFA6F8).w
; $00EBDC
	move.b	#$48,($FFFFA6DA).l
; $00EBE4
	clr.b	($FFFFA6DB).l
; $00EBEA
	bsr.w	loc_00FD7A
; $00EBEE
	bsr.w	loc_00F5C6
; $00EBF2
	movea.l	($FFFFA628).l,a0
; $00EBF8
	moveq	#0,d1
; $00EBFA
	move.b	$6(a0),d1
; $00EBFE
	move.w	d1,($FFFFA8C6).w
; $00EC02
	move.b	$7(a0),d1
; $00EC06
	move.w	d1,($FFFFA8C8).w
; $00EC0A
	move.b	$0(a0),d1
; $00EC0E
	pea	d1
; $00EC10
	move.b	$3(a0),d1
; $00EC14
	pea	d1
; $00EC16
	lea	($FF3000).l,a1
; $00EC1C
	lea	($FF4000).l,a2
; $00EC22
	movea.w	#$0000,a5
; $00EC26
	moveq	#5,d0

loc_00EC28:				; $00EC28
	adda.w	#$000C,a0
; $00EC2C
	move.b	$0(a0),d2
; $00EC30
	cmpi.b	#$FF,d2
; $00EC34
	beq.w	loc_00EC42
; $00EC38
	btst	#7,$2(a0)
; $00EC3E
	beq.w	loc_00EC5C

loc_00EC42:				; $00EC42
	move.b	d1,$0(a0)
; $00EC46
	pea	d1
; $00EC48
	move.b	d1,$3(a0)
; $00EC4C
	pea	d1
; $00EC4E
	move.b	#$41,$2(a0)
; $00EC54
	bsr.w	loc_011834
; $00EC58
	adda.w	#$0001,a5

loc_00EC5C:				; $00EC5C
	dbf	d0,loc_00EC28
; $00EC60
	cmpa.w	#$0000,a5
; $00EC64
	beq.w	loc_00ECC6
; $00EC68
	move.l	#$0000EC8A,($FFFF8004).w
; $00EC70
	movem.l	a7/d7,-(a7)
; $00EC74
	move.l	#$0000DA50,d0
; $00EC7A
	jsr	($0085EE).l
; $00EC80
	movem.l	(a7)+,d7/a7
; $00EC84
	jmp	($00DA50).l
; $00EC8A
	move.w	($FFFFA6E2).w,d2
; $00EC8E
	pea	d2
; $00EC90
	move.w	($FFFFA6E4).w,d2
; $00EC94
	move.l	d2,d3
; $00EC96
	move.w	($FFFFA958).w,d4
; $00EC9A
	pea	d4
; $00EC9C
	move.w	#$0000,d4
; $00ECA0
	movea.l	d3,a0
; $00ECA2
	move.b	$2E(a0),d4
; $00ECA6
	move.l	#$0000E9B2,($FFFF8004).w
; $00ECAE
	clr.w	($FFFFA49A).w
; $00ECB2
	move.l	#$0001E0EA,d0
; $00ECB8
	jsr	($0085EE).l
; $00ECBE
	jmp	($01E0EA).l
; $00ECC4
	rts

loc_00ECC6:				; $00ECC6
	move.b	#$5E,($FFFFA6DA).l
; $00ECCE
	clr.b	($FFFFA6DB).l
; $00ECD4
	bsr.w	loc_00FD7A
; $00ECD8
	move.l	#$0000DB20,($FFFF8004).w
; $00ECE0
	move.l	#$0000DA8A,d0
; $00ECE6
	jsr	($0085EE).l
; $00ECEC
	rts

loc_00ECEE:				; $00ECEE
	move.b	#$00,($FFFFA6F8).w
; $00ECF4
	moveq	#5,d0
; $00ECF6
	bsr.w	loc_00FF8A
; $00ECFA
	move.l	#$0000ED04,($FFFF8004).w
; $00ED02
	rts
; $00ED04
	cmpi.b	#$79,($000010).w
; $00ED0A
	beq.w	loc_00EBA2
; $00ED0E
	cmpi.b	#$79,($000020).w
; $00ED14
	bne.w	loc_00E7F2
; $00ED18
	move.b	#$00,($FFFFA6F8).w
; $00ED1E
	move.b	#$48,($FFFFA6DA).l
; $00ED26
	clr.b	($FFFFA6DB).l
; $00ED2C
	bsr.w	loc_00FD7A
; $00ED30
	movea.l	($FFFFA628).l,a0
; $00ED36
	adda.w	#$0054,a0
; $00ED3A
	btst	#7,$2(a0)
; $00ED40
	bne.w	loc_00ED6C
; $00ED44
	bchg	#7,$2(a0)
; $00ED4A
	jsr	($010C1E).l
; $00ED50
	jsr	($01113E).l
; $00ED56
	jsr	($0111BC).l
; $00ED5C
	jsr	($00A766).l
; $00ED62
	move.l	#$0000ED6C,($FFFF8004).w
; $00ED6A
	rts

loc_00ED6C:				; $00ED6C
	bsr.w	loc_00F5C6
; $00ED70
	movea.l	($FFFFA628).l,a0
; $00ED76
	moveq	#0,d1
; $00ED78
	move.b	$6(a0),d1
; $00ED7C
	move.w	d1,($FFFFA8C6).w
; $00ED80
	move.b	$7(a0),d1
; $00ED84
	move.w	d1,($FFFFA8C8).w
; $00ED88
	movea.l	a0,a2
; $00ED8A
	adda.w	#$0054,a0
; $00ED8E
	move.w	($FFFFA95A).w,d1
; $00ED92
	add.w	d1,d1
; $00ED94
	add.w	d1,d1
; $00ED96
	lea	($0820F4).l,a1
; $00ED9C
	move.w	($0,a1,d1.w),d1
; $00EDA0
	move.b	d1,$0(a0)
; $00EDA4
	clr.b	$2(a0)
; $00EDA8
	move.b	#$0A,$3(a0)
; $00EDAE
	mulu.w	#$001C,d1
; $00EDB2
	lea	($05EDDC).l,a1
; $00EDB8
	move.b	($A,a1,d1.w),$5D(a2)
; $00EDBE
	bsr.w	loc_011208
; $00EDC2
	jsr	($00A6EA).l
; $00EDC8
	lea	($FF3000).l,a1
; $00EDCE
	lea	($FF4000).l,a2
; $00EDD4
	moveq	#0,d1
; $00EDD6
	move.b	$0(a0),d1
; $00EDDA
	bsr.w	loc_011834
; $00EDDE
	move.l	#$0000EE00,($FFFF8004).w
; $00EDE6
	movem.l	a7/d7,-(a7)
; $00EDEA
	move.l	#$0000DA50,d0
; $00EDF0
	jsr	($0085EE).l
; $00EDF6
	movem.l	(a7)+,d7/a7
; $00EDFA
	jmp	($00DA50).l
; $00EE00
	move.w	($FFFFA6E2).w,d2
; $00EE04
	pea	d2
; $00EE06
	move.w	($FFFFA6E4).w,d2
; $00EE0A
	movea.l	($FFFFA628).l,a0
; $00EE10
	movea.l	a0,a1
; $00EE12
	adda.w	#$0054,a1
; $00EE16
	moveq	#0,d3
; $00EE18
	move.b	$6(a1),d3
; $00EE1C
	pea	d3
; $00EE1E
	move.b	$7(a1),d3
; $00EE22
	move.w	($FFFFA958).w,d4
; $00EE26
	pea	d4
; $00EE28
	move.w	#$0000,d4
; $00EE2C
	move.b	$2E(a0),d4
; $00EE30
	clr.w	($FFFFA49A).w
; $00EE34
	move.l	#$0000EE56,($FFFF8004).w
; $00EE3C
	movem.l	a7/d7,-(a7)
; $00EE40
	move.l	#$0001E0EA,d0
; $00EE46
	jsr	($0085EE).l
; $00EE4C
	movem.l	(a7)+,d7/a7
; $00EE50
	jmp	($01E0EA).l
; $00EE56
	jsr	($011208).l
; $00EE5C
	jsr	($01113E).l
; $00EE62
	jsr	($0111BC).l
; $00EE68
	move.l	#$0000E9B2,($FFFF8004).w
; $00EE70
	rts
; $00EE72
	lea	($FFFF9422).w,a0
; $00EE76
	lea	($FFFF9522).w,a1
; $00EE7A
	move.w	#$001F,d0

loc_00EE7E:				; $00EE7E
	move.l	(a0)+,(a1)+
; $00EE80
	dbf	d0,loc_00EE7E
; $00EE84
	movea.l	($FFFFA004).w,a0
; $00EE88
	ori.b	#$08,$40(a0)
; $00EE8E
	lea	($FFFFA638).l,a1
; $00EE94
	moveq	#8,d0

loc_00EE96:				; $00EE96
	move.w	$6(a0),(a1)+
; $00EE9A
	adda.w	#$000C,a0
; $00EE9E
	dbf	d0,loc_00EE96
; $00EEA2
	move.l	#$0000EEBA,($FFFF8004).w
; $00EEAA
	move.l	#$0000DA8A,d0
; $00EEB0
	jsr	($0085EE).l
; $00EEB6
	bra.w	loc_00DA8A

loc_00EEBA:				; $00EEBA
	movea.l	($FFFFA004).w,a0
; $00EEBE
	ori.b	#$08,$40(a0)
; $00EEC4
	jsr	($00B562).l
; $00EECA
	moveq	#-1,d0
; $00EECC
	jsr	($00A89C).l
; $00EED2
	jsr	($00A16A).l
; $00EED8
	lea	($FFFF9F62).w,a1
; $00EEDC
	moveq	#3,d1
; $00EEDE
	jsr	($009192).l
; $00EEE4
	move.l	#$0000EEEE,($FFFF8004).w
; $00EEEC
	rts
; $00EEEE
	bsr.w	loc_00F5A8
; $00EEF2
	jsr	($00A6EA).l
; $00EEF8
	move.l	#$0000EF02,($FFFF8004).w
; $00EF00
	rts
; $00EF02
	move.b	#$01,($FFFFA6F8).w
; $00EF08
	tst.b	($FFFF9F30).w
; $00EF0C
	bne.w	loc_00F040
; $00EF10
	cmpi.b	#$79,($000010).w
; $00EF16
	beq.w	loc_00F054
; $00EF1A
	cmpi.b	#$79,($000020).w
; $00EF20
	bne.w	loc_00F040
; $00EF24
	move.b	#$00,($FFFFA6F8).w
; $00EF2A
	move.w	($FFFFA6DE).w,d0
; $00EF2E
	move.w	($FFFFA6E0).w,d1
; $00EF32
	move.w	d0,($FFFFA6EA).w
; $00EF36
	move.w	d1,($FFFFA6E8).w
; $00EF3A
	mulu.w	($FFFF9F2C).w,d1
; $00EF3E
	add.w	d0,d1
; $00EF40
	add.w	d1,d1
; $00EF42
	move.w	d1,($FFFFA622).l
; $00EF48
	move.w	d1,d0
; $00EF4A
	lea	($FF4000).l,a0
; $00EF50
	move.b	($0,a0,d0.w),d0
; $00EF54
	bmi.w	loc_00F042
; $00EF58
	andi.b	#$0F,d0
; $00EF5C
	bne.w	loc_00F042
; $00EF60
	move.b	#$48,($FFFFA6DA).l
; $00EF68
	clr.b	($FFFFA6DB).l
; $00EF6E
	bsr.w	loc_00FD7A
; $00EF72
	movea.l	($FFFFA004).w,a0
; $00EF76
	move.w	($FFFFA6DE).w,d4
; $00EF7A
	move.w	($FFFFA6E0).w,d5
; $00EF7E
	bsr.w	loc_011706
; $00EF82
	movea.l	($FFFFA004).w,a0
; $00EF86
	andi.b	#$08,$BF(a0)
; $00EF8C
	move.b	$4(a0),d0
; $00EF90
	jsr	($00A89C).l
; $00EF96
	jsr	($00A16A).l
; $00EF9C
	lea	($FFFF9F62).w,a1
; $00EFA0
	moveq	#3,d1
; $00EFA2
	jsr	($009192).l
; $00EFA8
	move.l	#$0000EFB2,($FFFF8004).w
; $00EFB0
	rts
; $00EFB2
	jsr	($00A6EA).l
; $00EFB8
	move.l	#$0000EFC2,($FFFF8004).w
; $00EFC0
	rts
; $00EFC2
	tst.b	($FFFF9F30).w
; $00EFC6
	bne.w	loc_00F040
; $00EFCA
	cmpi.b	#$79,($000010).w
; $00EFD0
	beq.w	loc_00EEBA
; $00EFD4
	cmpi.b	#$79,($000020).w
; $00EFDA
	bne.w	loc_00F040
; $00EFDE
	move.b	#$48,($FFFFA6DA).l
; $00EFE6
	clr.b	($FFFFA6DB).l
; $00EFEC
	bsr.w	loc_00FD7A
; $00EFF0
	jsr	($01113E).l
; $00EFF6
	jsr	($0111BC).l
; $00EFFC
	bsr.w	loc_00F5C6
; $00F000
	move.l	#$0000F022,($FFFF8004).w
; $00F008
	movem.l	a7/d7,-(a7)
; $00F00C
	move.l	#$0000DA50,d0
; $00F012
	jsr	($0085EE).l
; $00F018
	movem.l	(a7)+,d7/a7
; $00F01C
	jmp	($00DA50).l
; $00F022
	lea	($FFFF9422).w,a0
; $00F026
	lea	($FFFF9522).w,a1
; $00F02A
	move.w	#$001F,d0

loc_00F02E:				; $00F02E
	move.l	(a1)+,(a0)+
; $00F030
	dbf	d0,loc_00F02E
; $00F034
	move.w	#$0001,($FFFF95AE).w
; $00F03A
	jsr	($008608).l

loc_00F040:				; $00F040
	rts

loc_00F042:				; $00F042
	move.b	#$5E,($FFFFA6DA).l
; $00F04A
	clr.b	($FFFFA6DB).l
; $00F050
	bra.w	loc_00FD7A

loc_00F054:				; $00F054
	move.b	#$00,($FFFFA6F8).w
; $00F05A
	bsr.w	loc_00F5C6
; $00F05E
	movea.l	($FFFFA004).w,a0
; $00F062
	bset	#6,$8(a0)
; $00F068
	lea	($FFFFA638).l,a1
; $00F06E
	moveq	#8,d0

loc_00F070:				; $00F070
	move.w	(a1)+,$6(a0)
; $00F074
	adda.w	#$000C,a0
; $00F078
	dbf	d0,loc_00F070
; $00F07C
	jsr	($01113E).l
; $00F082
	jsr	($0111BC).l
; $00F088
	jsr	($008608).l
; $00F08E
	jsr	($008608).l
; $00F094
	move.l	#$0000DB20,($FFFF8004).w
; $00F09C
	move.l	#$0000DA8A,d0
; $00F0A2
	jsr	($0085EE).l
; $00F0A8
	bra.w	loc_00DA8A

loc_00F0AC:				; $00F0AC
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6/d5/d4/d3/d2/d1,-(a7)
; $00F0B0
	movea.l	($FFFFA628).l,a0
; $00F0B6
	moveq	#0,d0
; $00F0B8
	move.b	$2F(a0),d0
; $00F0BC
	add.b	($FFFFA49A).w,d0
; $00F0C0
	bcc.w	loc_00F0C6
; $00F0C4
	moveq	#-1,d0

loc_00F0C6:				; $00F0C6
	cmpi.b	#$09,$A(a0)
; $00F0CC
	bne.w	loc_00F0DA
; $00F0D0
	add.b	($FFFFA49A).w,d0
; $00F0D4
	bcc.w	loc_00F0DA
; $00F0D8
	moveq	#-1,d0

loc_00F0DA:				; $00F0DA
	move.b	d0,$2F(a0)
; $00F0DE
	move.b	$5C(a0),d0
; $00F0E2
	bne.w	loc_00F0EA
; $00F0E6
	move.b	$20(a0),d0

loc_00F0EA:				; $00F0EA
	btst	#0,d0
; $00F0EE
	beq.w	loc_00F14A
; $00F0F2
	move.b	$5E(a0),d0
; $00F0F6
	move.b	($FFFFA49B).w,d1
; $00F0FA
	add.b	d1,d0
; $00F0FC
	bcc.w	loc_00F102
; $00F100
	moveq	#-1,d0

loc_00F102:				; $00F102
	move.b	d0,$5E(a0)
; $00F106
	lea	($FF603C).l,a1
; $00F10C
	moveq	#19,d0

loc_00F10E:				; $00F10E
	move.l	a1,($FFFFA8D0).w
; $00F112
	jsr	($011972).l
; $00F118
	beq.w	loc_00F142
; $00F11C
	tst.b	$3(a1)
; $00F120
	bne.w	loc_00F142
; $00F124
	move.b	$5C(a1),d1
; $00F128
	bne.w	loc_00F130
; $00F12C
	move.b	$20(a1),d1

loc_00F130:				; $00F130
	btst	#0,d1
; $00F134
	bne.w	loc_00F142
; $00F138
	move.b	$1(a0),d1
; $00F13C
	addq.w	#1,d1
; $00F13E
	move.b	d1,$5E(a1)

loc_00F142:				; $00F142
	adda.w	#$0060,a1
; $00F146
	dbf	d0,loc_00F10E

loc_00F14A:				; $00F14A
	movem.l	(a7)+,d1/d2/d3/d4/d5/d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $00F14E
	rts
; $00F150
	move.l	#$0000DB36,($FFFF8004).w
; $00F158
	move.l	#$0000DA8A,d0
; $00F15E
	jsr	($0085EE).l
; $00F164
	move.l	#$0000F172,d0
; $00F16A
	jsr	($0085EE).l
; $00F170
	rts
; $00F172
	move.b	#$00,($FFFFA6F8).w
; $00F178
	clr.w	($FFFFA61A).l
; $00F17E
	move.w	#$80E2,d0
; $00F182
	movea.w	#$A000,a1
; $00F186
	jsr	($0099B2).l
; $00F18C
	move.w	#$0005,($FFFFA61C).l
; $00F194
	move.l	#$0000F1A8,($FFFF8004).w
; $00F19C
	move.l	#$0000F68E,d0
; $00F1A2
	jmp	($0085EE).l
; $00F1A8
	jsr	($0094DC).l
; $00F1AE
	bne.w	loc_00F1D6
; $00F1B2
	clr.w	$10(a0)
; $00F1B6
	movea.l	($FFFFA62C).l,a1
; $00F1BC
	bsr.w	loc_00F246
; $00F1C0
	move.l	#$0000F1CA,($FFFF8004).w
; $00F1C8
	rts
; $00F1CA
	tst.w	($FFFFA61A).l
; $00F1D0
	beq.w	loc_00F1D6
; $00F1D4
	rts

loc_00F1D6:				; $00F1D6
	movea.l	($FFFFA628).l,a0
; $00F1DC
	move.b	$3(a0),d0
; $00F1E0
	addq.b	#3,d0
; $00F1E2
	cmpi.b	#$0A,d0
; $00F1E6
	bmi.w	loc_00F1EE
; $00F1EA
	move.b	#$0A,d0

loc_00F1EE:				; $00F1EE
	move.b	d0,$3(a0)
; $00F1F2
	move.b	$38(a0),d0
; $00F1F6
	addq.b	#2,d0
; $00F1F8
	cmp.b	$39(a0),d0
; $00F1FC
	bmi.w	loc_00F204
; $00F200
	move.b	$39(a0),d0

loc_00F204:				; $00F204
	move.b	d0,$38(a0)
; $00F208
	move.w	($FFFFA6E2).w,d4
; $00F20C
	move.w	($FFFFA6E4).w,d5
; $00F210
	jsr	($00C254).l
; $00F216
	move.w	#$0005,($FFFFA61C).l
; $00F21E
	move.l	#$0000F232,($FFFF8004).w
; $00F226
	move.l	#$0000F68E,d0
; $00F22C
	jmp	($0085EE).l
; $00F232
	movea.l	($FFFFA628).l,a0
; $00F238
	ori.b	#$02,$1(a0)
; $00F23E
	jsr	($008608).l
; $00F244
	rts

loc_00F246:				; $00F246
	movem.l	a7/a6/a5/d6,-(a7)
; $00F24A
	move.w	#$0D00,$0(a0)
; $00F250
	moveq	#0,d1
; $00F252
	move.b	$6(a1),d1
; $00F256
	moveq	#0,d2
; $00F258
	move.b	$7(a1),d2
; $00F25C
	move.w	d1,d0
; $00F25E
	sub.w	($FFFF9F24).w,d0
; $00F262
	mulu.w	#$0018,d0
; $00F266
	subq.w	#8,d0
; $00F268
	addi.w	#$0080,d0
; $00F26C
	move.w	d0,$8(a0)
; $00F270
	move.w	d2,d0
; $00F272
	sub.w	($FFFF9F26).w,d0
; $00F276
	mulu.w	#$0018,d0
; $00F27A
	subq.w	#8,d0
; $00F27C
	addi.w	#$0080,d0
; $00F280
	move.w	d0,$2(a0)
; $00F284
	move.w	#$0504,d0
; $00F288
	ori.w	#$A000,d0
; $00F28C
	move.w	d0,$6(a0)
; $00F290
	move.b	#$05,$4(a0)
; $00F296
	move.w	#$0000,$A(a0)
; $00F29C
	move.w	#$0006,$C(a0)
; $00F2A2
	move.w	#$0006,$E(a0)
; $00F2A8
	addq.w	#1,($FFFFA61A).l
; $00F2AE
	movem.l	(a7)+,d6/a5/a6/a7
; $00F2B2
	rts

loc_00F2B4:				; $00F2B4
	move.b	#$00,($FFFFA6F8).w
; $00F2BA
	bsr.w	loc_00F5C6
; $00F2BE
	clr.b	($FFFFA619).l
; $00F2C4
	move.l	#$0000F2E6,($FFFF8004).w
; $00F2CC
	movem.l	a7/d7,-(a7)
; $00F2D0
	move.l	#$0000DA50,d0
; $00F2D6
	jsr	($0085EE).l
; $00F2DC
	movem.l	(a7)+,d7/a7
; $00F2E0
	jmp	($00DA50).l
; $00F2E6
	move.l	#$0000F2FA,($FFFF8004).w
; $00F2EE
	move.l	#$00022C9A,d0
; $00F2F4
	jmp	($0085EE).l
; $00F2FA
	move.w	($FFFF9FE4).w,d0
; $00F2FE
	move.b	d0,($FFFFA624).l
; $00F304
	move.l	#$0000D748,($FFFF8004).w
; $00F30C
	tst.b	($FFFFA619).l
; $00F312
	beq.w	loc_00F31E
; $00F316
	move.l	#$0000D5D2,($FFFF8004).w

loc_00F31E:				; $00F31E
	move.l	#$0000DA8A,d0
; $00F324
	jsr	($0085EE).l
; $00F32A
	bra.w	loc_00DA8A
; $00F32E
	tst.w	($FF78FA).l
; $00F334
	beq.w	loc_00F4A2
; $00F338
	move.w	#$80E2,d0
; $00F33C
	movea.w	#$A000,a1
; $00F340
	jsr	($0099B2).l
; $00F346
	lea	($FF603C).l,a0
; $00F34C
	clr.w	($FFFFA61A).l
; $00F352
	moveq	#19,d0

loc_00F354:				; $00F354
	move.l	a0,($FFFFA628).l
; $00F35A
	moveq	#0,d1
; $00F35C
	move.b	$5C(a0),d1
; $00F360
	bne.w	loc_00F368
; $00F364
	move.b	$20(a0),d1

loc_00F368:				; $00F368
	and.b	($FFFFA618).l,d1
; $00F36E
	beq.w	loc_00F470
; $00F372
	move.l	a0,($FFFFA8D0).w
; $00F376
	jsr	($011972).l
; $00F37C
	beq.w	loc_00F470
; $00F380
	bsr.w	loc_00F4AA
; $00F384
	lea	($FFFFA70C).w,a1
; $00F388
	clr.w	(a1)
; $00F38A
	jsr	($0109DC).l
; $00F390
	btst	#2,$8(a0)
; $00F396
	beq.w	loc_00F3A0
; $00F39A
	addi.b	#$01,$32(a1)

loc_00F3A0:				; $00F3A0
	move.b	$50(a0),d3
; $00F3A4
	add.b	$1(a1),d3
; $00F3A8
	cmpi.b	#$64,d3
; $00F3AC
	bcs.w	loc_00F3B2
; $00F3B0
	moveq	#100,d3

loc_00F3B2:				; $00F3B2
	move.b	$8(a0),d1
; $00F3B6
	move.b	$5C(a0),d4
; $00F3BA
	beq.w	loc_00F3E4
; $00F3BE
	btst	#5,d1
; $00F3C2
	bne.w	loc_00F3E4
; $00F3C6
	btst	#5,$2(a0)
; $00F3CC
	bne.w	loc_00F3E4
; $00F3D0
	jsr	($0085A0).l
; $00F3D6
	cmp.b	d2,d3
; $00F3D8
	bmi.w	loc_00F3E4
; $00F3DC
	move.b	d4,$20(a0)
; $00F3E0
	clr.b	$5C(a0)

loc_00F3E4:				; $00F3E4
	btst	#3,d1
; $00F3E8
	beq.w	loc_00F3FE
; $00F3EC
	jsr	($0085A0).l
; $00F3F2
	cmp.b	d2,d3
; $00F3F4
	bmi.w	loc_00F3FE
; $00F3F8
	andi.b	#$08,$F7(a0)

loc_00F3FE:				; $00F3FE
	andi.b	#$08,$F8(a0)
; $00F404
	moveq	#7,d4

loc_00F406:				; $00F406
	move.b	$2(a0),d1
; $00F40A
	cmpa.l	($FFFFA628).l,a0
; $00F410
	beq.w	loc_00F434
; $00F414
	moveq	#0,d2
; $00F416
	move.b	$0(a0),d2
; $00F41A
	cmpi.b	#$FF,d2
; $00F41E
	beq.w	loc_00F468
; $00F422
	mulu.w	#$001C,d2
; $00F426
	lea	($05EDDC).l,a1
; $00F42C
	move.b	($13,a1,d2.w),d3
; $00F430
	add.b	($FFFFA70D).w,d3

loc_00F434:				; $00F434
	btst	#3,d1
; $00F438
	beq.w	loc_00F44E
; $00F43C
	jsr	($0085A0).l
; $00F442
	cmp.b	d2,d3
; $00F444
	bmi.w	loc_00F44E
; $00F448
	andi.b	#$02,$F7(a0)

loc_00F44E:				; $00F44E
	btst	#4,d1
; $00F452
	beq.w	loc_00F468
; $00F456
	jsr	($0085A0).l
; $00F45C
	cmp.b	d2,d3
; $00F45E
	bmi.w	loc_00F468
; $00F462
	andi.b	#$02,$EF(a0)

loc_00F468:				; $00F468
	adda.w	#$000C,a0
; $00F46C
	dbf	d4,loc_00F406

loc_00F470:				; $00F470
	movea.l	($FFFFA628).l,a0
; $00F476
	adda.w	#$0060,a0
; $00F47A
	dbf	d0,loc_00F354
; $00F47E
	move.l	#$0000F486,($FFFF8004).w
; $00F486
	tst.w	($FFFFA61A).l
; $00F48C
	bne.w	loc_00F4A8
; $00F490
	jsr	($01113E).l
; $00F496
	jsr	($0111BC).l
; $00F49C
	jsr	($00A6EA).l

loc_00F4A2:				; $00F4A2
	jsr	($008608).l

loc_00F4A8:				; $00F4A8
	rts

loc_00F4AA:				; $00F4AA
	movem.l	a7/a6/a5/a4/d7/d6,-(a7)
; $00F4AE
	moveq	#0,d0
; $00F4B0
	move.b	$6(a0),d0
; $00F4B4
	moveq	#0,d1
; $00F4B6
	move.b	$7(a0),d1
; $00F4BA
	mulu.w	($FFFF9F2C).w,d1
; $00F4BE
	add.w	d1,d0
; $00F4C0
	add.w	d0,d0
; $00F4C2
	move.b	$4(a0),d1
; $00F4C6
	lea	($FF5000).l,a1
; $00F4CC
	move.w	d0,d2
; $00F4CE
	addq.w	#2,d2
; $00F4D0
	cmp.b	($0,a1,d2.w),d1
; $00F4D4
	bne.w	loc_00F4DC
; $00F4D8
	bsr.w	loc_00F516

loc_00F4DC:				; $00F4DC
	subq.w	#4,d2
; $00F4DE
	cmp.b	($0,a1,d2.w),d1
; $00F4E2
	bne.w	loc_00F4EA
; $00F4E6
	bsr.w	loc_00F516

loc_00F4EA:				; $00F4EA
	move.w	($FFFF9F2C).w,d3
; $00F4EE
	add.w	d3,d3
; $00F4F0
	move.w	d0,d2
; $00F4F2
	sub.w	d3,d2
; $00F4F4
	cmp.b	($0,a1,d2.w),d1
; $00F4F8
	bne.w	loc_00F500
; $00F4FC
	bsr.w	loc_00F516

loc_00F500:				; $00F500
	move.w	d0,d2
; $00F502
	add.w	d3,d2
; $00F504
	cmp.b	($0,a1,d2.w),d1
; $00F508
	bne.w	loc_00F510
; $00F50C
	bsr.w	loc_00F516

loc_00F510:				; $00F510
	movem.l	(a7)+,d6/d7/a4/a5/a6/a7
; $00F514
	rts

loc_00F516:				; $00F516
	movem.l	a7/a6/a5/a4/d7/d6/d5,-(a7)
; $00F51A
	moveq	#0,d1
; $00F51C
	move.b	($1,a1,d2.w),d1
; $00F520
	lea	($05E628).l,a2
; $00F526
	add.w	d1,d1
; $00F528
	add.w	d1,d1
; $00F52A
	adda.l	($0,a2,d1.w),a0
; $00F52E
	cmpi.b	#$03,$A(a0)
; $00F534
	beq.w	loc_00F5A2
; $00F538
	moveq	#0,d2
; $00F53A
	move.b	$6(a0),d2
; $00F53E
	moveq	#0,d3
; $00F540
	move.b	$7(a0),d3
; $00F544
	movea.l	a0,a1
; $00F546
	move.w	($FFFF9F24).w,d0
; $00F54A
	cmp.w	d0,d2
; $00F54C
	blt.w	loc_00F58E
; $00F550
	addi.w	#$000E,d0
; $00F554
	cmp.w	d0,d2
; $00F556
	bge.w	loc_00F58E
; $00F55A
	move.w	($FFFF9F26).w,d0
; $00F55E
	cmp.w	d0,d3
; $00F560
	blt.w	loc_00F58E
; $00F564
	addq.w	#8,d0
; $00F566
	cmp.w	d0,d3
; $00F568
	bge.w	loc_00F58E
; $00F56C
	addq.w	#1,($FFFFA61A).l
; $00F572
	jsr	($0094DC).l
; $00F578
	bne.w	loc_00F58E
; $00F57C
	move.w	#$0D6C,$10(a0)
; $00F582
	move.l	a1,$12(a0)
; $00F586
	bsr.w	loc_00F246
; $00F58A
	bra.w	loc_00F5A2

loc_00F58E:				; $00F58E
	move.b	$3(a1),d0
; $00F592
	addq.b	#3,d0
; $00F594
	cmpi.b	#$0A,d0
; $00F598
	ble.w	loc_00F59E
; $00F59C
	moveq	#10,d0

loc_00F59E:				; $00F59E
	move.b	d0,$3(a1)

loc_00F5A2:				; $00F5A2
	movem.l	(a7)+,d5/d6/d7/a4/a5/a6/a7
; $00F5A6
	rts

loc_00F5A8:				; $00F5A8
	movem.l	a6/a5,-(a7)
; $00F5AC
	moveq	#12,d1
; $00F5AE
	move.b	#$89,d2
; $00F5B2
	jsr	($00899A).l
; $00F5B8
	move.b	#$01,($FFFFA660).l
; $00F5C0
	movem.l	(a7)+,a5/a6
; $00F5C4
	rts

loc_00F5C6:				; $00F5C6
	movem.l	a6/a5,-(a7)
; $00F5CA
	moveq	#12,d1
; $00F5CC
	move.b	#$81,d2
; $00F5D0
	jsr	($00899A).l
; $00F5D6
	move.b	#$00,($FFFFA660).l
; $00F5DE
	movem.l	(a7)+,a5/a6
; $00F5E2
	rts

loc_00F5E4:				; $00F5E4
	jsr	($011DA4).l
; $00F5EA
	beq.w	loc_00F686
; $00F5EE
	move.l	d0,($FFFFA8D0).w
; $00F5F2
	jsr	($011972).l
; $00F5F8
	beq.w	loc_00F686
; $00F5FC
	movea.l	d0,a0
; $00F5FE
	moveq	#0,d0
; $00F600
	move.b	$6(a0),d0
; $00F604
	pea	d0
; $00F606
	move.b	$7(a0),d0
; $00F60A
	move.l	d0,($FFFFA6EE).w
; $00F60E
	move.b	#$01,($FFFFA6F9).w
; $00F614
	move.l	#$0000F628,($FFFF8004).w
; $00F61C
	move.l	#$0000FFBA,d0
; $00F622
	jmp	($0085EE).l
; $00F628
	move.b	#$00,($FFFFA6F9).w
; $00F62E
	move.w	($FFFFA6E0).w,d1
; $00F632
	mulu.w	($FFFF9F2C).w,d1
; $00F636
	add.w	($FFFFA6DE).w,d1
; $00F63A
	add.w	d1,d1
; $00F63C
	lea	($FF5000).l,a0
; $00F642
	moveq	#0,d0
; $00F644
	move.b	($0,a0,d1.w),d0
; $00F648
	bmi.w	loc_00F680
; $00F64C
	move.w	($FFFF9FE4).w,($FFFF9FF4).w
; $00F652
	move.w	d0,($FFFF9FE4).w
; $00F656
	cmp.w	($FFFF9FF4).w,d0
; $00F65A
	beq.w	loc_00F680
; $00F65E
	lea	($FFFF9F62).w,a1
; $00F662
	moveq	#3,d1
; $00F664
	jsr	($009192).l
; $00F66A
	jsr	($00A89C).l
; $00F670
	jsr	($00A16A).l
; $00F676
	move.l	#$0000F680,($FFFF8004).w
; $00F67E
	rts

loc_00F680:				; $00F680
	jsr	($00A6EA).l

loc_00F686:				; $00F686
	jsr	($008608).l
; $00F68C
	rts
; $00F68E
	subq.w	#1,($FFFFA61C).l
; $00F694
	bne.w	loc_00F69E
; $00F698
	jsr	($008608).l

loc_00F69E:				; $00F69E
	rts

loc_00F6A0:				; $00F6A0
	lea	($FFFFA662).l,a0
; $00F6A6
	moveq	#24,d0
; $00F6A8
	moveq	#0,d1

loc_00F6AA:				; $00F6AA
	move.l	d1,(a0)+
; $00F6AC
	dbf	d0,loc_00F6AA
; $00F6B0
	lea	($FFFFA662).l,a1
; $00F6B6
	movea.l	($FFFFA628).l,a0
; $00F6BC
	movea.l	($FFFFA62C).l,a2
; $00F6C2
	bsr.w	loc_00F824
; $00F6C6
	lea	($FFFFA694).l,a1
; $00F6CC
	movea.l	($FFFFA630).l,a0
; $00F6D2
	movea.l	($FFFFA634).l,a2
; $00F6D8
	bsr.w	loc_00F824
; $00F6DC
	lea	($FFFFA662).l,a0
; $00F6E2
	movea.l	$1E(a0),a2
; $00F6E6
	move.w	$8(a1),d1
; $00F6EA
	add.w	d1,d1
; $00F6EC
	add.w	d1,d1
; $00F6EE
	move.l	($0,a2,d1.w),$1E(a0)
; $00F6F4
	movea.l	$1E(a1),a2
; $00F6F8
	move.w	$8(a0),d1
; $00F6FC
	add.w	d1,d1
; $00F6FE
	add.w	d1,d1
; $00F700
	move.l	($0,a2,d1.w),$1E(a1)
; $00F706
	lea	($FFFFA662).l,a0
; $00F70C
	lea	($FFFFA694).l,a1
; $00F712
	bsr.w	loc_00F9C6
; $00F716
	lea	($FFFFA694).l,a0
; $00F71C
	lea	($FFFFA662).l,a1
; $00F722
	bsr.w	loc_00F9C6
; $00F726
	move.w	#$0001,$E(a1)
; $00F72C
	move.w	($FFFFA6E6).w,d0
; $00F730
	sub.w	($FFFFA6EA).w,d0
; $00F734
	bge.w	loc_00F73A
; $00F738
	neg.w	d0

loc_00F73A:				; $00F73A
	move.w	($FFFFA6E8).w,d1
; $00F73E
	sub.w	($FFFFA6EC).w,d1
; $00F742
	bge.w	loc_00F748
; $00F746
	neg.w	d1

loc_00F748:				; $00F748
	add.w	d0,d1
; $00F74A
	cmpi.w	#$0001,d1
; $00F74E
	beq.w	loc_00F7A8
; $00F752
	movea.l	($FFFFA634).l,a3
; $00F758
	tst.b	$5(a3)
; $00F75C
	bne.w	loc_00F774
; $00F760
	move.b	$9(a3),d2
; $00F764
	cmpi.b	#$0F,d2
; $00F768
	beq.w	loc_00F788
; $00F76C
	cmpi.b	#$10,d2
; $00F770
	beq.w	loc_00F794

loc_00F774:				; $00F774
	move.w	$8(a0),d0
; $00F778
	cmpi.w	#$0010,d0
; $00F77C
	beq.w	loc_00F794
; $00F780
	cmpi.w	#$000F,d0
; $00F784
	bne.w	loc_00F79C

loc_00F788:				; $00F788
	cmpi.w	#$0003,d1
; $00F78C
	bgt.w	loc_00F79C
; $00F790
	bra.w	loc_00F7A8

loc_00F794:				; $00F794
	cmpi.w	#$0006,d1
; $00F798
	ble.w	loc_00F7A8

loc_00F79C:				; $00F79C
	clr.w	$E(a0)
; $00F7A0
	clr.w	$12(a0)
; $00F7A4
	bra.w	loc_00F7C8

loc_00F7A8:				; $00F7A8
	cmpi.w	#$0000,$71(a0)
; $00F7AE
	beq.w	loc_00F79C
; $00F7B2
	movea.l	($FFFFA634).l,a3
; $00F7B8
	btst	#3,$2(a3)
; $00F7BE
	bne.w	loc_00F79C
; $00F7C2
	move.w	#$0001,$E(a0)

loc_00F7C8:				; $00F7C8
	lea	($FFFFA662).l,a0
; $00F7CE
	tst.w	$6(a0)
; $00F7D2
	beq.w	loc_00F7EE
; $00F7D6
	lea	($FFFFA694).l,a1
; $00F7DC
	tst.w	$6(a1)
; $00F7E0
	beq.w	loc_00F7EE
; $00F7E4
	bsr.w	loc_00F7F0
; $00F7E8
	exg	a0,a1
; $00F7EA
	bsr.w	loc_00F7F0

loc_00F7EE:				; $00F7EE
	rts

loc_00F7F0:				; $00F7F0
	move.l	d1,-(a7)
; $00F7F2
	tst.w	$E(a0)
; $00F7F6
	beq.w	loc_00F818
; $00F7FA
	move.w	$12(a0),d2
; $00F7FE
	move.w	$10(a0),d0
; $00F802
	move.w	$14(a0),d1
; $00F806
	beq.w	loc_00F818
; $00F80A
	cmp.w	d1,d0
; $00F80C
	bge.w	loc_00F81A
; $00F810
	mulu.w	d0,d2
; $00F812
	divu.w	d1,d2
; $00F814
	bra.w	loc_00F81A

loc_00F818:				; $00F818
	moveq	#0,d2

loc_00F81A:				; $00F81A
	move.w	d2,$2E(a0)
; $00F81E
	movem.l	(a7)+,a6
; $00F822
	rts

loc_00F824:				; $00F824
	movem.l	a7/a6/a5/d4/d3,-(a7)
; $00F828
	moveq	#0,d0
; $00F82A
	move.b	$6(a2),d0
; $00F82E
	move.w	d0,$24(a1)
; $00F832
	moveq	#0,d1
; $00F834
	move.b	$7(a2),d1
; $00F838
	move.w	d1,$26(a1)
; $00F83C
	mulu.w	($FFFF9F2C).w,d1
; $00F840
	add.w	d1,d0
; $00F842
	add.w	d0,d0
; $00F844
	lea	($FF3000).l,a3
; $00F84A
	moveq	#0,d1
; $00F84C
	move.b	($0,a3,d0.w),d1
; $00F850
	move.b	$0(a2),$1(a1)
; $00F856
	move.b	$2E(a0),$3(a1)
; $00F85C
	move.b	$2F(a0),$5(a1)
; $00F862
	move.b	$3(a2),$7(a1)
; $00F868
	move.b	$5(a2),d0
; $00F86C
	bne.w	loc_00F8C6
; $00F870
	move.b	$3A(a0),$17(a1)
; $00F876
	move.b	$3B(a0),$19(a1)
; $00F87C
	clr.w	$1A(a1)
; $00F880
	clr.w	$1C(a1)
; $00F884
	clr.w	$A(a1)
; $00F888
	move.w	$0(a1),d0
; $00F88C
	mulu.w	#$001C,d0
; $00F890
	lea	($05EDDC).l,a3
; $00F896
	move.b	($6,a3,d0.w),$9(a1)
; $00F89C
	move.b	($15,a3,d0.w),$2C(a1)
; $00F8A2
	movea.l	a3,a4
; $00F8A4
	adda.w	($4,a3,d0.w),a4
; $00F8A8
	move.b	($0,a4,d1.w),$23(a1)
; $00F8AE
	adda.w	($0,a3,d0.w),a3
; $00F8B2
	move.l	a3,$1E(a1)
; $00F8B6
	move.w	#$0001,$C(a1)
; $00F8BC
	jsr	($0109CA).l
; $00F8C2
	bra.w	loc_00F97C

loc_00F8C6:				; $00F8C6
	move.b	$46(a0),$1B(a1)
; $00F8CC
	move.b	$47(a0),$1D(a1)
; $00F8D2
	move.b	$45(a0),$D(a1)
; $00F8D8
	move.w	$0(a1),d0
; $00F8DC
	mulu.w	#$001C,d0
; $00F8E0
	lea	($05EDDC).l,a3
; $00F8E6
	move.b	($B,a3,d0.w),$17(a1)
; $00F8EC
	move.b	($C,a3,d0.w),$19(a1)
; $00F8F2
	move.w	#$0001,$A(a1)
; $00F8F8
	move.b	($6,a3,d0.w),$9(a1)
; $00F8FE
	move.b	($15,a3,d0.w),$2C(a1)
; $00F904
	movea.l	a3,a4
; $00F906
	adda.w	($4,a3,d0.w),a4
; $00F90A
	move.b	($0,a4,d1.w),$23(a1)
; $00F910
	adda.w	($0,a3,d0.w),a3
; $00F914
	move.l	a3,$1E(a1)
; $00F918
	btst	#3,$8(a0)
; $00F91E
	bne.w	loc_00F974
; $00F922
	jsr	($0109D0).l
; $00F928
	move.b	$6(a0),d1
; $00F92C
	sub.b	$25(a1),d1
; $00F930
	bpl.w	loc_00F936
; $00F934
	neg.b	d1

loc_00F936:				; $00F936
	move.b	$7(a0),d2
; $00F93A
	sub.b	$27(a1),d2
; $00F93E
	bpl.w	loc_00F944
; $00F942
	neg.b	d2

loc_00F944:				; $00F944
	add.b	d1,d2
; $00F946
	cmp.b	$D(a1),d2
; $00F94A
	bgt.w	loc_00F974
; $00F94E
	move.w	#$0001,$C(a1)
; $00F954
	btst	#0,$8(a0)
; $00F95A
	beq.w	loc_00F962
; $00F95E
	addq.b	#4,$1B(a1)

loc_00F962:				; $00F962
	btst	#1,$8(a0)
; $00F968
	beq.w	loc_00F97C
; $00F96C
	addq.b	#4,$1D(a1)
; $00F970
	bra.w	loc_00F97C

loc_00F974:				; $00F974
	clr.l	$1A(a1)
; $00F978
	clr.w	$C(a1)

loc_00F97C:				; $00F97C
	tst.b	$5(a2)
; $00F980
	bne.w	loc_00F99A
; $00F984
	moveq	#0,d0
; $00F986
	move.b	$1(a0),d0
; $00F98A
	cmpi.b	#$0B,d0
; $00F98E
	bgt.w	loc_00F99A
; $00F992
	subq.w	#1,d0
; $00F994
	move.b	($18,pc,d0.w),$2C(a1)

loc_00F99A:				; $00F99A
	moveq	#0,d0
; $00F99C
	move.b	$2C(a1),d0
; $00F9A0
	move.b	($18,pc,d0.w),d0
; $00F9A4
	move.b	d0,$2C(a1)
; $00F9A8
	movem.l	(a7)+,d3/d4/a5/a6/a7
; $00F9AC
	rts
; $00F9AE
	btst	d5,d2
; $00F9B0
	andi.b	#$0B,d2
; $00F9B4
	addi.b	#$00,d6
; $00F9B8
	andi.b	#$52,d0
; $00F9BC
	subq.w	#1,(a4)
; $00F9BE
	subq.w	#3,(a0)+
; $00F9C0
	subq.w	#4,(a2)+
; $00F9C2
	subq.w	#2,(a6)
; $00F9C4
	blt.s	loc_00FA30

loc_00F9C6:				; $00F9C6
	move.w	$16(a0),d0
; $00F9CA
	add.w	$1E(a0),d0
; $00F9CE
	sub.w	$18(a1),d0
; $00F9D2
	sub.w	$20(a1),d0
; $00F9D6
	tst.w	$C(a0)
; $00F9DA
	beq.w	loc_00F9E2
; $00F9DE
	add.w	$1A(a0),d0

loc_00F9E2:				; $00F9E2
	tst.w	$C(a1)
; $00F9E6
	beq.w	loc_00F9EE
; $00F9EA
	sub.w	$1C(a1),d0

loc_00F9EE:				; $00F9EE
	tst.w	d0
; $00F9F0
	bge.w	loc_00F9F6
; $00F9F4
	moveq	#0,d0

loc_00F9F6:				; $00F9F6
	add.w	d0,d0
; $00F9F8
	move.w	d0,d1
; $00F9FA
	add.w	d0,d0
; $00F9FC
	add.w	d0,d0
; $00F9FE
	add.w	d1,d0
; $00FA00
	moveq	#100,d1
; $00FA02
	sub.w	$22(a1),d1
; $00FA06
	mulu.w	d1,d0
; $00FA08
	divu.w	#$0064,d0
; $00FA0C
	move.w	d0,$10(a0)
; $00FA10
	move.w	$6(a0),d0
; $00FA14
	move.w	$A(a0),d1
; $00FA18
	bne.w	loc_00FA20
; $00FA1C
	lsr.w	#1,d0
; $00FA1E
	addq.w	#5,d0

loc_00FA20:				; $00FA20
	move.w	d0,$12(a0)
; $00FA24
	move.w	$2(a0),d1
; $00FA28
	sub.w	$2(a1),d1
; $00FA2C
	add.w	d1,d1
; $00FA2E
	moveq	#100,d0

loc_00FA30:				; $00FA30
	sub.w	d1,d0
; $00FA32
	move.w	d0,$14(a0)
; $00FA36
	rts

loc_00FA38:				; $00FA38
	cmpi.w	#$A49C,($17FFFF).l
; $00FA40
	beq.w	loc_00FA46
; $00FA44
	rts

loc_00FA46:				; $00FA46
	lea	($00FABA).l,a0
; $00FA4C
	bsr.w	loc_00FB46
; $00FA50
	adda.w	#$000A,a0
; $00FA54
	bsr.w	loc_00FB46
; $00FA58
	adda.w	#$000A,a0
; $00FA5C
	bsr.w	loc_00FB46
; $00FA60
	adda.w	#$000A,a0
; $00FA64
	bsr.w	loc_00FB46
; $00FA68
	adda.w	#$000A,a0
; $00FA6C
	bsr.w	loc_00FB46
; $00FA70
	adda.w	#$000A,a0
; $00FA74
	bsr.w	loc_00FB46
; $00FA78
	adda.w	#$000A,a0
; $00FA7C
	bsr.w	loc_00FB46
; $00FA80
	adda.w	#$000A,a0
; $00FA84
	bsr.w	loc_00FB46
; $00FA88
	adda.w	#$000A,a0
; $00FA8C
	bsr.w	loc_00FB46
; $00FA90
	adda.w	#$000A,a0
; $00FA94
	bsr.w	loc_00FB46
; $00FA98
	adda.w	#$000A,a0
; $00FA9C
	bsr.w	loc_00FB46
; $00FAA0
	adda.w	#$000A,a0
; $00FAA4
	bsr.w	loc_00FB46
; $00FAA8
	adda.w	#$000A,a0
; $00FAAC
	bsr.w	loc_00FB46
; $00FAB0
	adda.w	#$000A,a0
; $00FAB4
	bsr.w	loc_00FB46
; $00FAB8
	rts
; $00FABA
	move.b	d7,d4
; $00FABC
	ori.b	#$02,d2
; $00FAC0
	ori.b	#$09,d4
; $00FAC4
	move.b	d7,d4
; $00FAC6
	ori.b	#$06,d6
; $00FACA
	ori.b	#$05,d4
; $00FACE
	move.b	d7,d4
; $00FAD0
	ori.b	#$06,a2
; $00FAD4
	ori.b	#$05,a3
; $00FAD8
	move.b	d7,d4
; $00FADA
	ori.b	#$06,(a3)+
; $00FADE
	ori.b	#$05,a3
; $00FAE2
	move.b	d7,d4
; $00FAE4
	ori.b	#$06,-(a6)
; $00FAE8
	ori.b	#$05,a0
; $00FAEC
	move.b	d7,d4
; $00FAEE
	ori.b	#$04,$2(a2)
; $00FAF4
	ori.b	#$07,d4
; $00FAF8
	ori.b	#$17,d6
; $00FAFC
	ori.b	#$07,a0
; $00FB00
	move.b	d7,d4
; $00FB02
	ori.b	#$12,d6
; $00FB06
	ori.b	#$06,a0
; $00FB0A
	move.b	d7,d4
; $00FB0C
	ori.b	#$12,a5
; $00FB10
	ori.b	#$06,a0
; $00FB14
	move.b	d7,d4
; $00FB16
	ori.b	#$18,a5
; $00FB1A
	ori.b	#$06,a0
; $00FB1E
	move.b	d7,d4
; $00FB20
	ori.b	#$17,-(a2)
; $00FB24
	ori.b	#$07,a0
; $00FB28
	move.b	d7,d4
; $00FB2A
	ori.b	#$12,-(a2)
; $00FB2E
	ori.b	#$06,a0
; $00FB32
	move.b	d7,d4
; $00FB34
	ori.b	#$12,(a3)+
; $00FB38
	ori.b	#$06,a0
; $00FB3C
	move.b	d7,d4
; $00FB3E
	ori.b	#$18,(a3)+
; $00FB42
	ori.b	#$06,a0

loc_00FB46:				; $00FB46
	movem.l	a7/a6/a5/a4/a3/a2/a1/d6,-(a7)
; $00FB4A
	move.w	(a0),d0
; $00FB4C
	move.w	$2(a0),d1
; $00FB50
	move.w	$4(a0),d2
; $00FB54
	move.w	$6(a0),d3
; $00FB58
	move.w	$8(a0),d4
; $00FB5C
	lea	($FF3000).l,a1
; $00FB62
	subq.w	#1,d3
; $00FB64
	subq.w	#1,d4

loc_00FB66:				; $00FB66
	move.w	d2,d6
; $00FB68
	mulu.w	($FFFF9F2C).w,d6
; $00FB6C
	add.w	d1,d6
; $00FB6E
	add.w	d6,d6
; $00FB70
	move.w	d3,d5

loc_00FB72:				; $00FB72
	move.w	d0,($0,a1,d6.w)
; $00FB76
	addq.w	#2,d6
; $00FB78
	dbf	d5,loc_00FB72
; $00FB7C
	addq.w	#1,d2
; $00FB7E
	dbf	d4,loc_00FB66
; $00FB82
	movem.l	(a7)+,d6/a1/a2/a3/a4/a5/a6/a7
; $00FB86
	rts
; $00FB88
	clr.b	($FFFFA6C8).l
; $00FB8E
	move.l	#$0000FB98,($FFFF8004).w
; $00FB96
	rts
; $00FB98
	lea	($05E040).l,a1
; $00FB9E
	btst	#0,($FFFF8179).w
; $00FBA4
	beq.w	loc_00FBCC
; $00FBA8
	move.b	($FFFFA6C8).l,d0
; $00FBAE
	subq.b	#1,d0
; $00FBB0
	bpl.w	loc_00FBC6
; $00FBB4
	moveq	#0,d1

loc_00FBB6:				; $00FBB6
	addq.b	#1,d0
; $00FBB8
	addi.w	#$0010,d1
; $00FBBC
	cmpi.b	#$00,(-$1,a1,d0.w)
; $00FBC2
	bne.w	loc_00FBB6

loc_00FBC6:				; $00FBC6
	move.b	d0,($FFFFA6C8).l

loc_00FBCC:				; $00FBCC
	btst	#1,($FFFF8179).w
; $00FBD2
	beq.w	loc_00FBF6
; $00FBD6
	move.b	($FFFFA6C8).l,d0
; $00FBDC
	addq.b	#1,d0
; $00FBDE
	moveq	#0,d1
; $00FBE0
	move.b	d0,d1
; $00FBE2
	asl.w	#4,d1
; $00FBE4
	cmpi.b	#$00,(-$1,a1,d0.w)
; $00FBEA
	bne.w	loc_00FBF0
; $00FBEE
	moveq	#0,d0

loc_00FBF0:				; $00FBF0
	move.b	d0,($FFFFA6C8).l

loc_00FBF6:				; $00FBF6
	btst	#5,($FFFF8179).w
; $00FBFC
	beq.w	loc_00FC1C
; $00FC00
	moveq	#0,d0
; $00FC02
	move.b	($FFFFA6C8).l,d0
; $00FC08
	asl.w	#4,d0
; $00FC0A
	move.b	($0,a1,d0.w),($FFFFA6DA).l
; $00FC12
	clr.b	($FFFFA6DB).l
; $00FC18
	bsr.w	loc_00FD7A

loc_00FC1C:				; $00FC1C
	btst	#4,($FFFF8179).w
; $00FC22
	beq.w	loc_00FC4C
; $00FC26
	move.w	#$0000,($FFFFA6D4).l
; $00FC2E
	move.l	#$0000FC42,($FFFF8004).w
; $00FC36
	move.l	#$0000FD5A,d0
; $00FC3C
	jmp	($0085EE).l
; $00FC42
	move.l	#$0000D748,($FFFF8004).w
; $00FC4A
	rts

loc_00FC4C:				; $00FC4C
	btst	#6,($FFFF8179).w
; $00FC52
	beq.w	loc_00FC74
; $00FC56
	move.b	#$41,($FFFFA6DA).l
; $00FC5E
	clr.b	($FFFFA6DB).l
; $00FC64
	bsr.w	loc_00FD7A
; $00FC68
	move.b	#$FE,($FFFFA6DA).l
; $00FC70
	bsr.w	loc_00FD7A

loc_00FC74:				; $00FC74
	moveq	#0,d1
; $00FC76
	move.b	($FFFFA6C8).l,d1
; $00FC7C
	asl.w	#4,d1
; $00FC7E
	addq.w	#1,d1
; $00FC80
	movea.w	($FFFF904C).w,a2
; $00FC84
	lea	($05E040).l,a1
; $00FC8A
	move.w	#$00E8,d2
; $00FC8E
	moveq	#14,d0

loc_00FC90:				; $00FC90
	move.w	#$00D0,(a2)+
; $00FC94
	move.b	#$00,(a2)+
; $00FC98
	addq.b	#1,($FFFF904E).w
; $00FC9C
	move.b	($FFFF904E).w,(a2)+
; $00FCA0
	move.w	#$8000,d3
; $00FCA4
	add.b	($0,a1,d1.w),d3
; $00FCA8
	move.w	d3,(a2)+
; $00FCAA
	move.w	d2,(a2)+
; $00FCAC
	addq.w	#1,d1
; $00FCAE
	addq.w	#8,d2
; $00FCB0
	dbf	d0,loc_00FC90
; $00FCB4
	move.w	a2,($FFFF904C).w
; $00FCB8
	rts

loc_00FCBA:				; $00FCBA
	move.b	#$FE,($FFFFA6DA).l
; $00FCC2
	clr.b	($FFFFA6DB).l
; $00FCC8
	bsr.w	loc_00FD7A
; $00FCCC
	rts

loc_00FCCE:				; $00FCCE
	move.b	#$FD,($FFFFA6DA).l
; $00FCD6
	clr.b	($FFFFA6DB).l
; $00FCDC
	bsr.w	loc_00FD7A
; $00FCE0
	rts
; $00FCE2
	bsr.w	loc_00FCCE
; $00FCE6
	move.w	#$000A,($FFFFA61C).l
; $00FCEE
	move.l	#$0000FD02,($FFFF8004).w
; $00FCF6
	move.l	#$0000F68E,d0
; $00FCFC
	jmp	($0085EE).l
; $00FD02
	bsr.w	loc_00FCBA
; $00FD06
	jsr	($008608).l
; $00FD0C
	rts

loc_00FD0E:				; $00FD0E
	lea	($FFFFA610).l,a1
; $00FD14
	move.b	($FFFFA614).l,d0
; $00FD1A
	andi.b	#$03,d0
; $00FD1E
	bne.w	loc_00FD26
; $00FD22
	adda.w	#$0001,a1

loc_00FD26:				; $00FD26
	moveq	#0,d0
; $00FD28
	move.b	(a1),d0
; $00FD2A
	lea	($05E51A).l,a1

loc_00FD30:				; $00FD30
	move.b	(a1)+,d1
; $00FD32
	cmp.b	d1,d0
; $00FD34
	beq.w	loc_00FD48
; $00FD38
	cmpi.b	#$FF,d1
; $00FD3C
	beq.w	loc_00FD48
; $00FD40
	adda.w	#$0001,a1
; $00FD44
	bra.w	loc_00FD30

loc_00FD48:				; $00FD48
	move.b	(a1),($FFFFA6DA).l
; $00FD4E
	clr.b	($FFFFA6DB).l
; $00FD54
	bsr.w	loc_00FD7A
; $00FD58
	rts
; $00FD5A
	move.l	#$0000FD6E,($FFFF8004).w
; $00FD62
	move.l	#$0000FCE2,d0
; $00FD68
	jmp	($0085EE).l
; $00FD6E
	bsr.w	loc_00FD0E
; $00FD72
	jsr	($008608).l
; $00FD78
	rts

loc_00FD7A:				; $00FD7A
	move.w	#$0100,(Z80_BUSREQ).l

loc_00FD82:				; $00FD82
	btst	#0,(Z80_BUSREQ).l
; $00FD8A
	bne.s	loc_00FD82
; $00FD8C
	move.b	($FFFFA6DB).l,($A01FFE).l
; $00FD96
	move.b	($FFFFA6DA).l,($A01FFF).l
; $00FDA0
	move.w	#$0000,(Z80_BUSREQ).l
; $00FDA8
	rts

loc_00FDAA:				; $00FDAA
	movem.l	a7/d7,-(a7)
; $00FDAE
	movea.w	#$95B8,a0
; $00FDB2
	move.w	#$0000,d0

loc_00FDB6:				; $00FDB6
	clr.w	(a0)
; $00FDB8
	adda.w	#$002A,a0
; $00FDBC
	dbf	d0,loc_00FDB6
; $00FDC0
	jsr	($0094D2).l
; $00FDC6
	move.l	a0,($FFFFA6F2).l
; $00FDCC
	move.w	#$0EC2,$0(a0)
; $00FDD2
	move.w	#$001C,$1E(a0)
; $00FDD8
	move.w	#$001C,$22(a0)
; $00FDDE
	move.w	#$0001,$26(a0)
; $00FDE4
	move.w	#$0001,$28(a0)
; $00FDEA
	move.l	#$0000FF6C,$2(a0)
; $00FDF2
	moveq	#-1,d0
; $00FDF4
	bsr.w	loc_00FE46
; $00FDF8
	movem.l	(a7)+,d7/a7
; $00FDFC
	rts

loc_00FDFE:				; $00FDFE
	movem.l	a7/a6/a5/a4/a3/a2/a1/a0/d7/d6,-(a7)
; $00FE02
	movea.l	($FFFFA6F2).l,a0
; $00FE08
	move.w	d0,$28(a0)
; $00FE0C
	add.w	($FFFF9F24).w,d0
; $00FE10
	move.w	d0,($FFFFA6DE).l
; $00FE16
	sub.w	($FFFF9F24).w,d0
; $00FE1A
	mulu.w	#$0018,d0
; $00FE1E
	addq.w	#4,d0
; $00FE20
	move.w	d0,$22(a0)
; $00FE24
	move.w	d1,$26(a0)
; $00FE28
	add.w	($FFFF9F26).w,d1
; $00FE2C
	move.w	d1,($FFFFA6E0).l
; $00FE32
	sub.w	($FFFF9F26).w,d1
; $00FE36
	mulu.w	#$0018,d1
; $00FE3A
	addq.w	#4,d1
; $00FE3C
	move.w	d1,$1E(a0)
; $00FE40
	movem.l	(a7)+,d6/d7/a0/a1/a2/a3/a4/a5/a6/a7
; $00FE44
	rts

loc_00FE46:				; $00FE46
	movem.l	a7/a6/a5/d7/d6/d5,-(a7)
; $00FE4A
	cmpi.w	#$FFFF,d0
; $00FE4E
	bne.w	loc_00FE7E
; $00FE52
	moveq	#0,d1
; $00FE54
	move.w	#$0800,d2
; $00FE58
	movea.l	($0B0008).l,a0
; $00FE5E
	lea	($FF2000).l,a1
; $00FE64
	bsr.w	loc_0099FA
; $00FE68
	movea.l	($FFFF81C4).w,a2
; $00FE6C
	move.w	#$FFF9,(a2)+
; $00FE70
	move.w	#$F7C0,(a2)+
; $00FE74
	move.l	a1,(a2)+
; $00FE76
	move.w	#$0270,(a2)+
; $00FE7A
	move.l	a2,($FFFF81C4).w

loc_00FE7E:				; $00FE7E
	movea.l	($FFFFA6F2).l,a0
; $00FE84
	move.w	d1,$1A(a0)
; $00FE88
	lea	($00FEA2).l,a1
; $00FE8E
	add.w	d1,d1
; $00FE90
	add.w	d1,d1
; $00FE92
	move.l	($0,a1,d1.w),$16(a0)
; $00FE98
	move.w	d2,$1C(a0)
; $00FE9C
	movem.l	(a7)+,d5/d6/d7/a5/a6/a7
; $00FEA0
	rts
; $00FEA2
	dc.w	$0000
; $00FEA4
	dc.w	$FEBE
; $00FEA6
	dc.w	$0000
; $00FEA8
	dc.w	$FED6
; $00FEAA
	dc.w	$0000
; $00FEAC
	dc.w	$FEF4
; $00FEAE
	dc.w	$0000
; $00FEB0
	dc.w	$FF12
; $00FEB2
	dc.w	$0000
; $00FEB4
	dc.w	$FF30
; $00FEB6
	dc.w	$0000
; $00FEB8
	dc.w	$FF4E
; $00FEBA
	dc.w	$0000
; $00FEBC
	dc.w	$FF6C
; $00FEBE
	dc.w	$A7BE
; $00FEC0
	dc.w	$F005
; $00FEC2
	dc.w	$F001
; $00FEC4
	dc.w	$AFBE
; $00FEC6
	dc.w	$F005
; $00FEC8
	dc.w	$0001
; $00FECA
	dc.w	$B7BE
; $00FECC
	dc.w	$0005
; $00FECE
	dc.w	$F001
; $00FED0
	eor.l	d7,?ea(7,6)
; $00FED2
	ori.b	#$00,d5
; $00FED6
	dc.w	$A7C2
; $00FED8
	dc.w	$F805
; $00FEDA
	dc.w	$F801
; $00FEDC
	dc.w	$A7BE
; $00FEDE
	dc.w	$F005
; $00FEE0
	dc.w	$F001
; $00FEE2
	dc.w	$AFBE
; $00FEE4
	dc.w	$F005
; $00FEE6
	ori.b	#$BE,d1
; $00FEEA
	ori.b	#$01,d5
; $00FEEE
	eor.l	d7,?ea(7,6)
; $00FEF0
	ori.b	#$00,d5
; $00FEF4
	dc.w	$A7C6
; $00FEF6
	dc.w	$F805
; $00FEF8
	dc.w	$F801
; $00FEFA
	dc.w	$A7BE
; $00FEFC
	dc.w	$F005
; $00FEFE
	dc.w	$F001
; $00FF00
	dc.w	$AFBE
; $00FF02
	dc.w	$F005
; $00FF04
	ori.b	#$BE,d1
; $00FF08
	ori.b	#$01,d5
; $00FF0C
	eor.l	d7,?ea(7,6)
; $00FF0E
	ori.b	#$00,d5
; $00FF12
	dc.w	$A7CA
; $00FF14
	dc.w	$F805
; $00FF16
	dc.w	$F801
; $00FF18
	dc.w	$A7BE
; $00FF1A
	dc.w	$F005
; $00FF1C
	dc.w	$F001
; $00FF1E
	dc.w	$AFBE
; $00FF20
	dc.w	$F005
; $00FF22
	ori.b	#$BE,d1
; $00FF26
	ori.b	#$01,d5
; $00FF2A
	eor.l	d7,?ea(7,6)
; $00FF2C
	ori.b	#$00,d5
; $00FF30
	dc.w	$A7CE
; $00FF32
	dc.w	$F805
; $00FF34
	dc.w	$F801
; $00FF36
	dc.w	$A7BE
; $00FF38
	dc.w	$F005
; $00FF3A
	dc.w	$F001
; $00FF3C
	dc.w	$AFBE
; $00FF3E
	dc.w	$F005
; $00FF40
	ori.b	#$BE,d1
; $00FF44
	ori.b	#$01,d5
; $00FF48
	eor.l	d7,?ea(7,6)
; $00FF4A
	ori.b	#$00,d5
; $00FF4E
	dc.w	$A7E1
; $00FF50
	dc.w	$F805
; $00FF52
	dc.w	$F801
; $00FF54
	dc.w	$A7DD
; $00FF56
	dc.w	$F005
; $00FF58
	dc.w	$F001
; $00FF5A
	dc.w	$AFDD
; $00FF5C
	dc.w	$F005
; $00FF5E
	ori.b	#$DD,d1
; $00FF62
	ori.b	#$01,d5
; $00FF66
	cmpa.l	(a5)+,a7
; $00FF68
	ori.b	#$00,d5
; $00FF6C
	dc.w	$A7D9
; $00FF6E
	dc.w	$F805
; $00FF70
	dc.w	$F801
; $00FF72
	dc.w	$A7D5
; $00FF74
	dc.w	$F005
; $00FF76
	dc.w	$F001
; $00FF78
	dc.w	$AFD5
; $00FF7A
	dc.w	$F005
; $00FF7C
	ori.b	#$D5,d1
; $00FF80
	ori.b	#$01,d5
; $00FF84
	cmpa.l	(a5),a7
; $00FF86
	ori.b	#$00,d5

loc_00FF8A:				; $00FF8A
	movem.l	a7/a6/a5/d7,-(a7)
; $00FF8E
	moveq	#0,d2
; $00FF90
	btst	#0,($FFFFA626).w
; $00FF96
	beq.w	loc_00FF9E
; $00FF9A
	move.w	#$0800,d2

loc_00FF9E:				; $00FF9E
	movea.l	($FFFFA6F2).l,a0
; $00FFA4
	move.w	d0,$1A(a0)
; $00FFA8
	move.w	#$0000,d0
; $00FFAC
	move.w	$1A(a0),d1
; $00FFB0
	bsr.w	loc_00FE46
; $00FFB4
	movem.l	(a7)+,d7/a5/a6/a7
; $00FFB8
	rts

loc_00FFBA:				; $00FFBA
	move.l	($FFFFA6EE).l,d0
; $00FFC0
	cmp.l	($FFFFA6DE).l,d0
; $00FFC6
	beq.w	loc_010078
; $00FFCA
	move.b	#$01,($FFFFA615).w
; $00FFD0
	move.l	#$0000FFD8,($FFFF8004).w
; $00FFD8
	move.b	($FFFF8178).w,d1
; $00FFDC
	andi.b	#$10,d1
; $00FFE0
	beq.w	loc_010016
; $00FFE4
	cmpi.b	#$F9,($00FFFF).l
; $00FFEC
	beq.w	loc_010016
; $00FFF0