; ==================================================================
; ★ 游戏主初始化 & 标题画面分流 ★
; ROM: $00C810–$00CC00 | Lines: 32899–33402
; Type: CODE
; ==================================================================
;
; $C816: 主初始化 → ★$FF78FA=0xFFFF(Demo模式!)
; $C91E: 字体加载(res $8001→VRAM $0000)
; $C9AA: ★★分流: $FF78FA=0→正常标题; ≠0→Demo路径
;

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