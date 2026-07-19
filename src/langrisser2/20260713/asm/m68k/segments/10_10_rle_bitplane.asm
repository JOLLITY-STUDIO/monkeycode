; ==================================================================
; Nibble RLE & 位平面解压
; ROM: $00FFF0–$010130 | Lines: 39721–39890
; Type: CODE
; ==================================================================
;
; Nibble RLE 解压 ($FFF8, 类型1)。注意: $100A0 不是 LZSS, 是精灵 VDP 命令构造。
;

; $00FFF0
	tst.b	($FFFF9F30).w
; $00FFF4
	bne.w	loc_010016
; ★ ━━━ Nibble RLE 解压 (资源类型 0x01) ━━━
; ★ ═══ Nibble RLE 解压 (资源类型 0x01) $FFF8 ═══
; $00FFF8
	move.b	#$00,($FFFFA6F6).l
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