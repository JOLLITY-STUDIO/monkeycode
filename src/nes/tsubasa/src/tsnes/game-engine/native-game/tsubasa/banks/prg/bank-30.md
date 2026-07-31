總結一下 — bank-30.ts 所有 CODE 塊已全部翻譯完成：

區塊	地址	大小	函數名
✅ IRQ/NMI 上下文	$C400-$C4B1	178B	nmiContextSwitch/irqContextSwitch
✅ Bank 切換	$C4B2-$C4F3	66B	bankSwitch_Win6/bankSwitch_Win7
✅ 跳轉表 ×5	$C500-$C64D	204B	JTAB_C5xx
✅ 場景初始化	$C64E-$C719	204B	initScene/initSystem
✅ NMI handler	$C71A-$C9B4	667B	nmiInit/nmiMain
✅ PPU 傳輸引擎	$C8FB-$C9B4	186B	ppuXferEngine
✅ 手柄輸入	$C9B5-$C9F0	60B	joypadUpdate
✅ CHR + 顯示	$C9F1-$CA5A	106B	chrBankSwitch/displayInit
✅ 定時器	$CA97-$CB34	158B	frameTimerScheduler/timerInit
✅ PPU/OAM/音效	$CB35-$CBFD	201B	ppuScreenInit/clearOam/audiotrigger
✅ 角色屬性+調色板	$CBFE-$CCE9	236B	charAttrCopy/paletteInit
✅ 乘法/除法/角色	$CCEA-$CD88	159B	multiply16/divide16/getCharData
✅ 坐標+遠調用+菜單	$CDC9-$D02F	615B	tileCoordConvert/farCall/gameModeSelector/memClear...
✅ 角色動畫	$D030-$D0AB	124B	charAnimUpdate
✅ 槽位掃描	$D0D1-$D0F5	37B	playerSlotScan
✅ 比賽初始化	$D0F6-$D182	141B	positionCheck/gameModeSwitch
✅ GP修改+輸入	$D193-$D36D	475B	gpModify/gpApply
✅ 玩家狀態機	$D36E-$D52A	445B	playerStateMachine
✅ 玩家狀態處理	$D565-$D6C9	357B	playerStateHandler ← 新增
✅ 比賽事件處理	$D70C-$D851	326B	matchEventHandler ← 新增
✅ 選擇光標	$D852-$D978	295B	playerSelectCursor ← 新增
✅ 替換 UI	$D979-$DB33	443B	playerSubstitutionUI ← 新增
✅ 場景輔助	$DB34-$DBF2	191B	sceneHelper
✅ 坐標/屬性縮放	$DBF3-$DC81	143B	teamFlagFlip/coordAttrScale ← 新增
✅ 隨機數	$DCDF-$DCEF	17B	randomGen
✅ 移動檢查	$DCFD-$DD62	102B	playerMoveCheck/distanceCheck
✅ 距離計算	$DD63-$DDCA	104B	getDistance/distanceToPixels
✅ 球員初始化	$DDFD-$DE44	72B	playerInit
✅ 比賽事件主循環	$DE52-$DF59	264B	matchEventMain ← 新增
✅ 結果計算	$DF8B-$DFBC	50B	resultCalcDistance
✅ 結果最終計算	$DFD9-$DFFF	39B	matchResultCalc
bank-30 全部 37 個 CODE 塊均已翻譯為 TypeScript。