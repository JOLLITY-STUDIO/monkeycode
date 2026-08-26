"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene15Controller = void 0;
/**
 * Scene15Controller — 场景 15 NT 缓冲逐记录零填充
 *
 * @bank 02 ($A650 入口，CPU $A651-$A69B)
 *
 * 行为（已对照 ROM 字节级验证，表 CPU $AA97，24 条 3 字节记录）：
 *   遍历 SCENE15_AA97_TABLE：
 *     ntAddr = (((($007B & 1) << 2) | (flag & $7F)) << 8 | addrLo) & $3FFF
 *     向 NT 缓冲追加 count & $3F 个 $00（$9B28 强制 count&$3F）
 *     追加后判定：flag bit7 → 返回 2 (hub)；flag bit6 → 等 2 帧再下一条；
 *     否则（bit6 清）→ 立即处理下一条
 * 等帧用基类 scheduleAfter 替代 PRG $9FA8 pushState 模式。
 */
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
const scene_bank02_tables_1 = require("../../data/tables/scene-bank02-tables");
const NEXT = 0x02;
/** NT 缓冲单条容量上限（appendNtBuffer 0x40 字节含 3 字节头） */
const CHUNK = 0x3d;
class Scene15Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 15;
        this.cursor = 0;
        /** 等 2 帧（flag bit6）调度态 */
        this.waiting = false;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.cursor = 0;
        this.waiting = false;
    }
    onUpdate(_frame) {
        if (this.waiting)
            return undefined;
        const table = scene_bank02_tables_1.SCENE15_AA97_TABLE;
        if (this.cursor >= table.length)
            return NEXT;
        const rec = table[this.cursor];
        const store = this.store;
        // ntAddr 高位 = (($007B&1)<<2) | (flag&$7F)，整表 & $3FFF
        const addrHi = (((store.readByte(0x007b) & 1) << 2) | (rec.flag & 0x7f)) & 0xff;
        const ntAddr = ((addrHi << 8) | (rec.addrLo & 0xff)) & 0x3fff;
        const len = rec.count & 0x3f; // $9B28 强制 count&$3F
        // 追加零填充（按 CHUNK 分片，防 NT 缓冲 0x40 容量溢出）
        let written = 0;
        while (written < len) {
            const n = Math.min(CHUNK, len - written);
            this.prim.ntBufferAppend({ vertical: false, ntAddr: (ntAddr + written) & 0x3fff, data: new Array(n).fill(0) });
            written += n;
        }
        this.cursor++;
        if ((rec.flag & 0x80) !== 0)
            return NEXT; // bit7 → 结束
        if ((rec.flag & 0x40) !== 0) {
            // bit6 → 等 2 帧后处理下一条
            this.waiting = true;
            this.scheduleAfter(2, () => { this.waiting = false; });
        }
        return undefined;
    }
}
exports.Scene15Controller = Scene15Controller;
