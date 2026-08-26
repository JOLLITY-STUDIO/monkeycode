/**
 * Scene4Controller — 场景 4 隐藏全部 OAM（bank02 $85A3-$85A8 实证）
 *
 * 行为（PRG $85A3）：JSR $9B7F（hideOam）→ 返回 2 = hub
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
const NEXT = 0x02;
export class Scene4Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 4;
        this.prim = new RenderingPrimitivesService(store);
    }
    onEnter() {
        this.prim.hideOam();
    }
    onUpdate(_frame) {
        return NEXT;
    }
}
