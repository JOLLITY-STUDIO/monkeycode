/**
 * Scene10Controller — 场景 10 装载 CHR 配置 0 + 装载场景数据 5（bank02 $85DC-$85E8 实证）
 *
 * 行为：loadChrConfig(0x00) + loadSceneData(5) → 返回 2 = hub
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
export class Scene10Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 10;
        this.prim = new RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.loadChrConfig(0x00);
        this.prim.loadSceneData(5);
    }
    onUpdate(_frame) {
        return 0x02; // → hub
    }
}
