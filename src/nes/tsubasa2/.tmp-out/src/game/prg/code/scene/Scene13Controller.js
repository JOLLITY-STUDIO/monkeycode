/**
 * Scene13Controller — 场景 13 装载 CHR 0x20 + 装载场景数据 7（bank02 $861D-$8629 实证）
 *
 * 行为：loadChrConfig(0x20) + loadSceneData(7) → 返回 2 = hub
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
export class Scene13Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 13;
        this.prim = new RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.loadChrConfig(0x20);
        this.prim.loadSceneData(7);
    }
    onUpdate(_frame) {
        return 0x02; // → hub
    }
}
