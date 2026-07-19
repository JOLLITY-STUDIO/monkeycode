; ==================================================================
; ★ 任务链: 阶段分派器 ★
; ROM: $01C800–$01CA00 | Lines: 66921–67191
; Type: CODE
; ==================================================================
;
; $1C834(flag)→队列 $1C854(16阶段分派器, 跳转表 $1C8A4-$1C9FA)。阶段0: 标题。
;

; $01C802
	move.l	#$0001C80C,($FFFF8004).w
; $01C80A
	rts

loc_01C80C:				; $01C80C
	move.l	#$0005DF40,($FFFF95A2).w
; $01C814
	move.w	#$0001,($FFFF95A6).w
; $01C81A
	move.w	#$000F,($FFFF95A8).w
; $01C820
	move.l	#$0001C834,($FFFF8004).w
; $01C828
	move.l	#$00009334,d0
; $01C82E
	jmp	($0085EE).l
; ★ ━━━ 任务 1C834: DMA flag + 队列 1C854 (阶段分派器) ━━━
; ★ ═══ 任务 1C834: DMA flag + 队列 1C854 ═══
; $01C834
	jsr	($00C7F6).l
; $01C83A
	jsr	($00C91E).l
; $01C840
	movea.l	($FFFF81C4).w,a0
; $01C844
	move.w	#$FFF5,(a0)+
; $01C848
	move.w	#$C000,(a0)+
; $01C84C
	move.w	#$0000,(a0)+
; $01C850
	move.w	#$0800,(a0)+
; ★ ━━━ 任务 1C854: 阶段分派器 (16 阶段, 表在 1C8A4-1C9FA) ━━━
; ★   阶段 0: 标题画面初始化 (→ C92C → C93A → C944)
; ★ ═══ 任务 1C854: 阶段分派器 (16阶段, 跳转表 $1C8A4-$1C9FA) ═══
; ★ 阶段0: 标题画面初始化 → C92C→C93A→C944→C9AA; 阶段1-15: 各游戏系统
; $01C854
	move.w	#$0002,(a0)+
; $01C858
	move.w	#$FFF5,(a0)+
; $01C85C
	move.w	#$E000,(a0)+
; $01C860
	move.w	#$005D,(a0)+
; $01C864
	move.w	#$0800,(a0)+
; $01C868
	move.w	#$0002,(a0)+
; $01C86C
	move.l	a0,($FFFF81C4).w
; $01C870
	lea	($FFFF94A2).w,a1
; $01C874
	lea	($082114).l,a2
; $01C87A
	jsr	($009208).l
; $01C880
	move.l	#$FFFF94A2,($FFFF95A2).w
; $01C888
	move.w	#$0001,($FFFF95A6).w
; $01C88E
	move.w	#$0001,($FFFF95A8).w
; $01C894
	move.l	#$0001C8A8,($FFFF8004).w
; $01C89C
	move.l	#$00009334,d0
; $01C8A2
	jmp	($0085EE).l
; $01C8A8
	lea	($FFFFA4CC).w,a1
; $01C8AC
	move.w	($FFFFAE90).l,d0
; $01C8B2
	add.w	d0,d0
; $01C8B4
	add.w	d0,d0
; $01C8B6
	jmp	($2,pc,d0.w)
; $01C8BA
	bra.w	loc_01C8FA
; $01C8BE
	bra.w	loc_01C914
; $01C8C2
	bra.w	loc_01C930
; $01C8C6
	bra.w	loc_01C938
; $01C8CA
	bra.w	loc_01C940
; $01C8CE
	bra.w	loc_01C948
; $01C8D2
	bra.w	loc_01C984
; $01C8D6
	bra.w	loc_01C98C
; $01C8DA
	bra.w	loc_01CA50
; $01C8DE
	bra.w	loc_01CA50
; $01C8E2
	bra.w	loc_01CA50
; $01C8E6
	bra.w	loc_01CA50
; $01C8EA
	bra.w	loc_01CA50
; $01C8EE
	bra.w	loc_01CA50
; $01C8F2
	bra.w	loc_01C994
; $01C8F6
	bra.w	loc_01CA50

loc_01C8FA:				; $01C8FA
	moveq	#0,d0
; $01C8FC
	moveq	#0,d1
; $01C8FE
	move.w	#$0078,d1
; $01C902
	move.b	($14,a1,d1.w),d1
; $01C906
	cmpi.b	#$02,d1
; $01C90A
	bcs.w	loc_01C9B4
; $01C90E
	addq.w	#1,d0
; $01C910
	bra.w	loc_01C9B4

loc_01C914:				; $01C914
	move.w	#$0002,d0
; $01C918
	moveq	#0,d1
; $01C91A
	move.w	#$0048,d1
; $01C91E
	move.b	($14,a1,d1.w),d1
; $01C922
	cmpi.b	#$02,d1
; $01C926
	bcs.w	loc_01C9B4
; $01C92A
	addq.w	#1,d0
; $01C92C
	bra.w	loc_01C9B4

loc_01C930:				; $01C930
	move.w	#$0004,d0
; $01C934
	bra.w	loc_01C9B4

loc_01C938:				; $01C938
	move.w	#$0005,d0
; $01C93C
	bra.w	loc_01C9B4

loc_01C940:				; $01C940
	move.w	#$0006,d0
; $01C944
	bra.w	loc_01C9B4

loc_01C948:				; $01C948
	move.w	#$0007,d0
; $01C94C
	moveq	#0,d1
; $01C94E
	move.w	#$00C0,d1
; $01C952
	move.w	($12,a1,d1.w),d2
; $01C956
	move.b	($14,a1,d1.w),d1
; $01C95A
	bne.w	loc_01C96C
; $01C95E
	cmpi.w	#$0062,d2
; $01C962
	bcc.w	loc_01C9B4
; $01C966
	addq.w	#1,d0
; $01C968
	bra.w	loc_01C9B4

loc_01C96C:				; $01C96C
	addq.w	#1,d0
; $01C96E
	cmpi.b	#$02,d1
; $01C972
	bcc.w	loc_01C97E
; $01C976
	cmpi.w	#$009B,d2
; $01C97A
	bcc.w	loc_01C9B4

loc_01C97E:				; $01C97E
	addq.w	#1,d0
; $01C980
	bra.w	loc_01C9B4

loc_01C984:				; $01C984
	move.w	#$000A,d0
; $01C988
	bra.w	loc_01C9B4

loc_01C98C:				; $01C98C
	move.w	#$000B,d0
; $01C990
	bra.w	loc_01C9B4

loc_01C994:				; $01C994
	move.w	#$000C,d0
; $01C998
	move.w	#$0018,d1
; $01C99C
	tst.b	($14,a1,d1.w)
; $01C9A0
	bne.w	loc_01C9B2
; $01C9A4
	move.w	#$0000,d1
; $01C9A8
	cmpi.w	#$1012,(-$38,a1,d0.w)
; $01C9AE
	bcc.w	loc_01C9B4

loc_01C9B2:				; $01C9B2
	addq.w	#1,d0

loc_01C9B4:				; $01C9B4
	add.w	d0,d0
; $01C9B6
	add.w	d0,d0
; $01C9B8
	lea	($0953AE).l,a0
; $01C9BE
	movea.l	($0,a0,d0.w),a0
; $01C9C2
	move.l	a0,($FFFFAE9E).l
; $01C9C8
	lea	($FFFFAA34).w,a2
; $01C9CC
	movea.l	($FFFFAE9E).l,a0
; $01C9D2
	move.b	(a0)+,d0
; $01C9D4
	cmpi.b	#$18,d0
; $01C9D8
	beq.w	loc_01CA50
; $01C9DC
	moveq	#0,d0
; $01C9DE
	move.b	(a0)+,d0
; $01C9E0
	move.w	#$FFF7,(a2)+
; $01C9E4
	move.w	d0,(a2)+
; $01C9E6
	move.w	#$FFF7,(a2)+
; $01C9EA
	clr.w	(a2)+
; $01C9EC
	moveq	#0,d0
; $01C9EE
	move.b	(a0)+,d0
; $01C9F0
	move.w	d0,($FFFFAA2E).w
; $01C9F4
	adda.w	#$0001,a0
; $01C9F8
	movea.l	(a0)+,a1
; $01C9FA
	move.l	a0,($FFFFAE9E).l
; $01CA00