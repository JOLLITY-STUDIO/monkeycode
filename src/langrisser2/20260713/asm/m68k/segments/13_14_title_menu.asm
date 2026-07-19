; ==================================================================
; 标题菜单 & Demo 逻辑
; ROM: $00CC00–$010000 | Lines: 33402–39729
; Type: CODE
; ==================================================================
;
; $CA0A 菜单处理。$CA72 Demo 循环。$CAF2 部署汇聚。
;

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
	tst.b	($FFFF9F30).w
; $00FFF4
	bne.w	loc_010016
; ★ ━━━ Nibble RLE 解压 (资源类型 0x01) ━━━
; ★ ═══ Nibble RLE 解压 (资源类型 0x01) $FFF8 ═══
; $00FFF8
	move.b	#$00,($FFFFA6F6).l
; $010000