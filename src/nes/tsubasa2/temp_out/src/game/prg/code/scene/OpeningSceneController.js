"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpeningSceneController = void 0;
/**
 * OpeningSceneController — 开场场景（场景号 0，boot 入口）
 *
 * @bank 02 ($A4C0-$A559) / 00 (渲染原语)
 *
 * 对应原始地址：$A4C0（跳转表第 0 项，表值=目标-1，实际入口 $A4C1）。
 * 开场序列（bank02/code_sub.s $84C1-$8559）：
 *   JSR $9A0D 渐显 → 等 16 帧 → 0x30 次 {等1帧; $890C OAM 下漂 +1}
 *   → 清 $005B/$007B → $8AF7 CHR 配置 0x17 → $0044=$68 → $8920 场景 3
 *   → $008E→$0090, $008F→$0091 → 等 4 帧 → $9A35 调色板装载 → $88FB 精灵水平翻转
 *   → 滚动循环 {INC $0079; DEC $007C ×2; $0044-=2; until $0044<$03}
 *   → $8920 场景 0 → ram_001B bit0 置位 → 等 240+60 帧 → 清 bit0
 *   → $0090=0/$0091=2 → $99F0 渐隐 → $9B7F 隐藏 OAM → $98A0 清 NT
 *   → $23C0 处 2 行×32 列填 $55 → $8920 场景 1 → LDA #$02; RTS（返回下一场景号）
 *
 * H5 中同步阻塞的 waitFrames 转为状态机逐帧推进（每帧 = 一次 onUpdate）。
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
/** 开场状态机阶段（对应原版 $A4C1-$A559 的时序步骤） */
var OpeningPhase;
(function (OpeningPhase) {
    /** $84C1-$84C8: $9A0D 渐显（若 $004A>0）+ 等 16 帧 */
    OpeningPhase[OpeningPhase["FadeInAndWait16"] = 0] = "FadeInAndWait16";
    /** $84C9-$84D6: 0x30 次循环 {等 1 帧; OAM 下漂 +1} */
    OpeningPhase[OpeningPhase["OamDrift"] = 1] = "OamDrift";
    /** 场景 3 NT 数据逐行写入渲染缓冲（原版 $8AF7 同步展开；H5 分帧） */
    OpeningPhase[OpeningPhase["LoadScene3Nt"] = 2] = "LoadScene3Nt";
    /** $84F4-$84F8: 等 4 帧 */
    OpeningPhase[OpeningPhase["Wait4"] = 3] = "Wait4";
    /** $84FF-$8513: 滚动循环 {等 1 帧; INC $0079; DEC $007C×2; $0044-=2; until <3} */
    OpeningPhase[OpeningPhase["Scroll"] = 4] = "Scroll";
    /** $8520-$8527: 等 240 + 60 帧 */
    OpeningPhase[OpeningPhase["Hold"] = 5] = "Hold";
    /** $8538: $99F0 渐隐 */
    OpeningPhase[OpeningPhase["FadeOut"] = 6] = "FadeOut";
    /** 已返回下一场景号（本控制器不再被调度） */
    OpeningPhase[OpeningPhase["Done"] = 7] = "Done";
})(OpeningPhase || (OpeningPhase = {}));
class OpeningSceneController extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 0;
        this.audio = null;
        this.phase = OpeningPhase.FadeInAndWait16;
        this.counter = 0;
        /** $84C9 的 LDY #$30 循环计数 */
        this.driftY = 0;
        /** 场景 3 NT 已写入行数 */
        this.ntRow = 0;
        /** 240 帧等待已完成、进入 60 帧等待（$8520-$8527） */
        this.holdSecond = false;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    /** 注入音频服务（开场 BGM 播放） */
    attachAudio(audio) {
        this.audio = audio;
    }
    onEnter() {
        this.phase = OpeningPhase.FadeInAndWait16;
        this.counter = 0x10; // LDA #$10; JSR $9FA8（等 16 帧）
        this.driftY = 0;
        this.ntRow = 0;
        this.holdSecond = false;
        // 开场 BGM（V0.6 已实现请求队列；编号对照待确认，暂用 0x01）
        this.audio?.playBgm(0x01);
    }
    onUpdate(frame) {
        void frame;
        const store = this.store;
        switch (this.phase) {
            case OpeningPhase.FadeInAndWait16: {
                // $84C1: JSR $9A0D — BG 渐显一步（boot 时 $004A=0 立即完成）
                if (!this.prim.fadeBgStep())
                    return undefined;
                // $84C6: wait 16 帧（每帧递减计数）
                if (--this.counter > 0)
                    return undefined;
                // $84C9: LDY #$30 进入 OAM 漂移循环
                this.driftY = 0x30;
                this.phase = OpeningPhase.OamDrift;
                return undefined;
            }
            case OpeningPhase.OamDrift: {
                // $84CB-$84D6: 每帧 {等 1 帧 → LDA #$01; JSR $890C; DEY; BNE}
                this.prim.oamDrift(1);
                if (--this.driftY > 0)
                    return undefined;
                // $84D8-$84DC: 清 $005B/$007B
                store.writeByte(0x005b, 0);
                store.writeByte(0x007b, 0);
                // $84DE-$84E9: $8AF7 CHR 配置 0x17 → $0044=$68 → $8920 场景 3
                this.prim.loadChrConfig(0x17);
                store.writeByte(0x0044, 0x68);
                this.prim.loadSceneData(3);
                // 场景 3 NT 数据分帧写入（每帧 4 行，32 行共 8 帧）
                this.ntRow = 0;
                this.prim.queueScene3NametableRows(0, 4);
                this.ntRow = 4;
                this.phase = OpeningPhase.LoadScene3Nt;
                return undefined;
            }
            case OpeningPhase.LoadScene3Nt: {
                if (this.ntRow < 32) {
                    this.prim.queueScene3NametableRows(this.ntRow, 4);
                    this.ntRow += 4;
                    return undefined;
                }
                // $84EC-$84F2: $008E→$0090, $008F→$0091
                store.writeByte(0x0090, store.readByte(0x008e));
                store.writeByte(0x0091, store.readByte(0x008f));
                // $84F4: wait 4 帧
                this.counter = 4;
                this.phase = OpeningPhase.Wait4;
                return undefined;
            }
            case OpeningPhase.Wait4: {
                if (--this.counter > 0)
                    return undefined;
                // $84F9: JSR $9A35 调色板装载（原版 A=$04=BG 组[wait 恢复], X=$0025=SPR 组）
                this.prim.loadPalettesAndFade(0x04, store.readByte(0x0025) & 0x0f);
                // $84FC: JSR $88FB 精灵水平翻转
                this.prim.oamFlipAttrs();
                // $84FF: 进入滚动循环（每轮先等 1 帧）
                this.counter = 1;
                this.phase = OpeningPhase.Scroll;
                return undefined;
            }
            case OpeningPhase.Scroll: {
                if (--this.counter > 0)
                    return undefined;
                // $8504-$850F: INC $0079; DEC $007C ×2; $0044 -= 2
                store.writeByte(0x0079, (store.readByte(0x0079) + 1) & 0xff);
                let c = (store.readByte(0x007c) - 1) & 0xff;
                store.writeByte(0x007c, c);
                c = (store.readByte(0x007c) - 1) & 0xff;
                store.writeByte(0x007c, c);
                const v44 = (store.readByte(0x0044) - 2) & 0xff;
                store.writeByte(0x0044, v44);
                // $8511: CMP #$03; BCS $84FF — 未到 3 继续滚动
                if (v44 >= 3) {
                    this.counter = 1;
                    return undefined;
                }
                // $8515-$851E: $8920 场景 0 → ram_001B |= $01
                this.prim.loadSceneData(0);
                store.writeByte(0x001b, store.readByte(0x001b) | 0x01);
                // $8520-$8527: wait $F0(240) + $3C(60)
                this.counter = 0xf0;
                this.phase = OpeningPhase.Hold;
                return undefined;
            }
            case OpeningPhase.Hold: {
                if (--this.counter > 0)
                    return undefined;
                if (!this.holdSecond) {
                    // $8520 的 240 帧等待完成，接 $8525 的 60 帧等待
                    this.holdSecond = true;
                    this.counter = 0x3c;
                    return undefined;
                }
                // $852A-$852E: ram_001B &= ~$01
                store.writeByte(0x001b, store.readByte(0x001b) & 0xfe);
                // $8530-$8536: $0090=0, $0091=2
                store.writeByte(0x0090, 0);
                store.writeByte(0x0091, 2);
                this.phase = OpeningPhase.FadeOut;
                return undefined;
            }
            case OpeningPhase.FadeOut: {
                // $8538: JSR $99F0 — 渐隐一步（每步 1 帧）
                if (!this.prim.fadeOutStep())
                    return undefined;
                // $853B-$854F: $9B7F 隐藏 OAM → $98A0 清 NT → $23C0 2 行×32 列填 $55
                this.prim.hideOam();
                this.prim.clearNametable();
                this.prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
                // $8552-$8554: $8920 场景 1
                this.prim.loadSceneData(1);
                // $8557-$8559: LDA #$02; RTS → 返回下一场景号 2
                this.phase = OpeningPhase.Done;
                return 0x02;
            }
            default:
                return undefined;
        }
    }
    onRender() {
        // 场景 0 渲染全部由渲染缓冲（$05E8/OAM/调色板）驱动，无需额外绘制
    }
}
exports.OpeningSceneController = OpeningSceneController;
