/**
 * GameSystemService — 游戏主循环 / 场景调度 / 渲染原语
 * @bank 00 ($8000-$9FFF)
 *
 * 职责: mainLoop 主循环、脚本分派器 $84E7、共享渲染原语
 * (ntClear/ppuBufAlloc/oamFlagClear 等)、协程调度 $9EED。
 *
 * 命名规范: 旧名 Bank00Service → 新名 GameSystemService (见 .codebuddy/rules/新架构命名规范.mdc)
 *
 * TODO: 逐段覆盖 asm/bank00/code_*.s
 */
import { DataStore } from '../../data/store/DataStore';

export class GameSystemService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 每帧推进 (原 mainLoop) */
  update(frame: number): void {
    // TODO: 翻译 asm/bank00 主循环
    void frame;
  }

  /** 场景装载 (原 sceneLoad) */
  loadScene(sceneId: number): void {
    // TODO: 翻译 $8AF7 sceneLoad
    void sceneId;
  }
}

export default GameSystemService;
