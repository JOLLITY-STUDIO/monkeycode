/**
 * TitleSceneController — 标题场景（场景号 1）
 *
 * @bank 02 ($A559)
 *
 * 对应原始地址：$A559（跳转表第 1 项）— 标题画面 + 菜单（新游戏/继续/密码）。
 *
 * V0.1 stub：注册契约；真实实现在 V0.3（标题链路）覆盖。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class TitleSceneController extends SceneController {
  readonly sceneId = 1;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  onEnter(): void {
    // TODO V0.3: 翻译 $A559 标题序列（LOGO/NT/调色板/菜单光标）
  }

  onUpdate(frame: number): void {
    // TODO V0.3: 标题菜单输入（Start 新游戏 / 密码 / 继续）
    void frame;
  }

  onRender(): void {
    // TODO V0.3: 标题渲染
  }
}
