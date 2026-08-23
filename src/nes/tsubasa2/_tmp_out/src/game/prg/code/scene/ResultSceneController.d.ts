/**
 * ResultSceneController — 赛果场景
 * @bank 00 (RESULT 路由)
 *
 * 职责: 比赛结束后显示赛果。
 *
 * 命名规范: 旧名 ResultController → 新名 ResultSceneController。
 *
 * TODO: 翻译赛果场景
 */
import { DataStore } from '../../data/store/DataStore';
export declare class ResultSceneController {
    protected _store: DataStore;
    constructor(store: DataStore);
    /** 每帧推进赛果场景 */
    update(frame: number): void;
}
export default ResultSceneController;
