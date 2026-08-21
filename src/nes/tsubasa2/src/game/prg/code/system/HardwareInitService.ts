/**
 * HardwareInitService — 硬件初始化 (RESET 后第一件事)
 * @bank 30 ($C000-$DFFF)
 *
 * 职责: RESET 跳转、公共 API 跳转表、主初始化 $C503-$C6DF。
 * 翻译版不写 MMC3/APU 寄存器, 直接初始化 DataStore 默认值。
 *
 * 命名规范: 旧名 Bank30Service → 新名 HardwareInitService。
 *
 * TODO: 翻译 asm/bank30/code_main.s $C503-$C6DF 初始化链
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from './GameSystemService';
import type { SceneController } from '../scene/SceneController';
import type { SkillService } from '../skill/SkillService';

export class HardwareInitService {
  protected _store: DataStore;
  protected _system: GameSystemService;
  protected _scene: SceneController;
  protected _skill: SkillService;

  constructor(
    store: DataStore,
    system: GameSystemService,
    scene: SceneController,
    skill: SkillService,
  ) {
    this._store = store;
    this._system = system;
    this._scene = scene;
    this._skill = skill;
  }

  /** 初始化 (原 Bank30.init) */
  init(): void {
    // TODO: 翻译 $C503 初始化链
  }
}

export default HardwareInitService;
