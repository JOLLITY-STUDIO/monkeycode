/**
 * ResultSceneController — 结果场景（场景号 3）
 *
 * @bank 02 ($A581)
 *
 * 对应原始地址：$A581（跳转表第 3 项）— 比赛结果/队伍评价（原 ResultController）。
 *
 * V0.1 stub：注册契约；真实实现在 V0.5/V0.7 覆盖。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class ResultSceneController extends SceneController {
  readonly sceneId = 3;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  onEnter(): void {
    // TODO V0.5: 翻译 $A581 结果场景（比分 / 评价 / 奖励）
  }

  onUpdate(frame: number): void {
    // TODO V0.5: 结果流转
    void frame;
  }
}
