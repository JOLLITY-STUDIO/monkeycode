/**
 * Scene12Controller — 场景 12（bank02 $8603-$861C 实证），同 11 但装载场景数据 8
 *
 * 行为：if ($000D != 0) { $000D=0; $000E=0; } else { loadChrConfig(0x30); loadSceneData(8); }
 * 两分支均返回 2 = hub
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
export class Scene12Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 12;
        this.prim = new RenderingPrimitivesService(store);
    }
    onEnter() {
        const store = this.store;
        if (store.readByte(0x000d) !== 0) {
            store.writeByte(0x000d, 0);
            store.writeByte(0x000e, 0);
        }
        else {
            this.prim.loadChrConfig(0x30);
            this.prim.loadSceneData(8);
        }
    }
    onUpdate(_frame) {
        return 0x02; // → hub
    }
}
