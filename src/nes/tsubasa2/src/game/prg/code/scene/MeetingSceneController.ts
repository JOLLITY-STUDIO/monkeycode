/**
 * MeetingSceneController — 第一关 meeting 页面 (剧情脚本入口)
 *
 * 链路位置：Scene14→15→16→17→18→20→21→22→23→Meeting (300)
 *
 * 当前为 stub：链路走通阶段，仅标记已到达 meeting 页面。
 * TODO：注入 ScriptEngine.start() 跑第一段剧情脚本
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

/** Meeting scene id（链路终点 — Scene23 完成后跳到这里） */
export const MEETING_SCENE_ID = 0x300;

export class MeetingSceneController extends SceneController {
  readonly sceneId = MEETING_SCENE_ID;
  onEnter(): void {
    // TODO: ScriptEngine.start(firstMeetingScriptId) 跑剧情第一段
    // 当前 stub：仅记录到达，链路走通到此为止
    this.store.writeByte(0x0001, MEETING_SCENE_ID & 0xff);
  }
  onUpdate(_frame: number): number | undefined {
    // meeting 页面稳定显示 — 等用户按 A 跳过/继续（stub 暂不处理）
    return undefined;
  }
}
