/**
 * 状态导出索引
 *
 * ASM 跳转表 $81FD 只有 8 条目 (State 0-7):
 *   State 0: 开场动画+标题 (Bank 1 sub 0)
 *   State 1: Bank 5 sub D
 *   State 2: Bank 6 sub 0
 *   State 3: 比赛初始化 (自动→State 4)
 *   State 4: 比赛主循环
 *   State 5: 状态转换管理器
 *   State 6: 事件处理 (Bank 6 sub 3)
 *   State 7: 比赛结果 (Bank 6 sub 1)
 *
 * 注意: 当前 TS state 文件名是旧命名, 需要后续根据 Bank 5/6 分析重命名。
 */

export { StateBase } from './StateBase';
export { State00_InitTitle } from './State00_InitTitle';
export { State01_TitleLoop } from './State01_TitleLoop';
export { State02_MenuSelect } from './State02_MenuSelect';
export { State03_MemberSelect } from './State03_MemberSelect';
export { State04_MatchMain } from './State04_MatchMain';
export { State05_MatchEvent } from './State05_MatchEvent';
export { State06_Halftime } from './State06_Halftime';
export { State07_MatchResult } from './State07_MatchResult';
export { StateTest } from './StateTest';
