/**
 * MatchStartSceneController — meeting 完后进入主比赛 (链路终点)
 *
 * 链路位置：...→Scene23→Meeting(300)→MatchStart(400)
 *
 * 行为：
 *   - onEnter(): 写 marker
 *   - onUpdate(): 等用户输入（按 START 跳到正式比赛 / 按 A 继续剧情）
 *
 * 当前为 stub：链路走通阶段。具体比赛页 (字段 / 选择对手 / 比赛流程)
 * 由 MatchEngineService 等已存在的 Service 实现，对应 controller 待 V0.6
 * 添加。本 controller 仅作为 chain advance 终点。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

/** MatchStart scene id — meeting 后的下一站 */
export const MATCH_START_SCENE_ID = 0x400;

export class MatchStartSceneController extends SceneController {
  readonly sceneId = MATCH_START_SCENE_ID;
  onEnter(): void {
    this.store.writeByte(0x0001, MATCH_START_SCENE_ID & 0xff);
  }
  onUpdate(_frame: number): number | undefined {
    // match start 页面稳定显示 — 等用户按 START 进入比赛（待 V0.6 接入）
    return undefined;
  }
}
