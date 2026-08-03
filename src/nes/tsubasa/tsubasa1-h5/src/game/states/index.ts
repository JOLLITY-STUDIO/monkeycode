/**
 * 游戏状态处理器统一导出
 * 
 * 每个 GameState 一个文件，各自实现 enter/update/exit 生命周期。
 * 在 main.ts 中通过此 index 统一导入并注册到 GameLoop。
 */

export { IStateHandler, StateBase, StateContext } from './StateBase';
export { State00_InitTitle } from './State00_InitTitle';
export { State01_TitleLoop } from './State01_TitleLoop';
export { State02_MenuSelect } from './State02_MenuSelect';
export { State03_TeamSelect } from './State03_TeamSelect';
export { State04_MatchMain } from './State04_MatchMain';
export { State05_MatchEvent } from './State05_MatchEvent';
export { State06_Transition } from './State06_Transition';
export { State07_Result } from './State07_Result';

import { IStateHandler } from './StateBase';
import { State00_InitTitle } from './State00_InitTitle';
import { State01_TitleLoop } from './State01_TitleLoop';
import { State02_MenuSelect } from './State02_MenuSelect';
import { State03_TeamSelect } from './State03_TeamSelect';
import { State04_MatchMain } from './State04_MatchMain';
import { State05_MatchEvent } from './State05_MatchEvent';
import { State06_Transition } from './State06_Transition';
import { State07_Result } from './State07_Result';

/**
 * 所有状态处理器实例 (按 GameState 编号排序)
 * 在 main.ts 中遍历此数组注册到 GameLoop
 */
export const ALL_STATE_HANDLERS: IStateHandler[] = [
  new State00_InitTitle(),
  new State01_TitleLoop(),
  new State02_MenuSelect(),
  new State03_TeamSelect(),
  new State04_MatchMain(),
  new State05_MatchEvent(),
  new State06_Transition(),
  new State07_Result(),
];
