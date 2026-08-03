跳转表分析结果
原始 ROM 中 $81FD 开始的跳转表（8 个状态，每个 2 字节小端序指针）：

状态	ROM数据	目标地址	H5枚举	功能
0	A1 82	$82A1	INIT_TITLE	初始化/标题画面设置
1	A7 82	$82A7	TITLE_LOOP	标题画面主循环
2	76 82	$8276	MENU_SELECT	菜单/模式选择
3	CD 85	$85CD	TEAM_SELECT	队伍选择/剧情
4	B9 87	$87B9	MATCH_MAIN	比赛主循环
5	0D 82	$820D	MATCH_EVENT	比赛事件/过场
6	64 82	$8264	MATCH_TRANSITION	半场/比赛过渡
7	70 82	$8270	RESULT_SCREEN	结算/结果画面
关于 $00A9：这是状态 5 代码体（820D）的第一条指令 `LDA #00`（opcode $A9），不是第 9 个状态。游戏只有 0-7 共 8 个状态。