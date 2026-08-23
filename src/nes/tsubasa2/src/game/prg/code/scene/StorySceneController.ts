/**
 * StorySceneController — 剧情场景（原 bank18/19 剧情）
 *
 * @bank 18/19（剧情脚本数据与播放）
 *
 * V0.1 stub：注册契约；剧情脚本引擎（ScriptEngine）在 V0.4 覆盖。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class StorySceneController extends SceneController {
  readonly sceneId = 4;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  onEnter(): void {
    // TODO V0.4: 装载剧情脚本并进入播放
  }

  onUpdate(frame: number): void {
    // TODO V0.4: 剧情文本打字 / 等待 / 选项
    void frame;
  }

  onRender(): void {
    // TODO V0.4: 剧情文本渲染
  }
}
