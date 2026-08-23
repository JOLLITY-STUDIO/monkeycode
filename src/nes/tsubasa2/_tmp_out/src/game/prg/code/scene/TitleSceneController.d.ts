/**
 * TitleSceneController — 标题菜单场景
 * @bank 00 (标题 Cut 0x17)
 *
 * 职责: 标题菜单光标/确认 (KICK OFF / CONTINUE)。
 *
 * 命名规范: 旧名 TitleSceneController → 新名 TitleSceneController (不变)。
 *
 * TODO: 翻译标题菜单状态机
 */
import { DataStore } from '../../data/store/DataStore';
export declare class TitleSceneController {
    protected _store: DataStore;
    constructor(store: DataStore);
    /** 每帧推进标题菜单 */
    update(frame: number): void;
}
export default TitleSceneController;
