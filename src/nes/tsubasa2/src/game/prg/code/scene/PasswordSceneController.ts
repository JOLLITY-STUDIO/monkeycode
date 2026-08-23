/**
 * PasswordSceneController — 密码场景（场景号 2）
 *
 * @bank 02 ($A57B)
 *
 * 对应原始地址：$A57B（跳转表第 2 项）— 密码输入/校验（原 PasswordController）。
 *
 * V0.1 stub：注册契约；真实实现在 V0.3 覆盖。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class PasswordSceneController extends SceneController {
  readonly sceneId = 2;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  onEnter(): void {
    // TODO V0.3: 翻译 $A57B 密码场景（字符表 / 输入缓冲 / 校验）
  }

  onUpdate(frame: number): void {
    // TODO V0.3: 密码输入
    void frame;
  }
}
