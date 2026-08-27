"use strict";
/**
 * 天游戏 2 — 翻译层头契约（业务语义，无硬件窗口概念）
 *
 * iNES header 字节保留作为版本标识（解包需要），但 H5 已无 MMC3 / bank 切换语义：
 *   - 数据全部声明式表（SceneTable / SongCatalog / SkillTable 等）
 *   - 状态通过具名视图访问（store.scene / store.palette / store.audioState ...）
 *   - bank 编号、CHR/PRG 切换粒度、MMC3 寄存器 → 全部省略
 *
 * 渲染参数（Mirroring）保留作为业务配置项。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = exports.Mirroring = exports.HEADER = void 0;
exports.HEADER = new Uint8Array([
    0x4e, 0x45, 0x53, 0x1a, // "NES\x1a"（仅作版本标识）
    0x10, // PRG: 256KB
    0x10, // CHR: 128KB
    0x40, // mapper 4 | Horizontal mirroring
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);
var Mirroring;
(function (Mirroring) {
    Mirroring[Mirroring["Horizontal"] = 0] = "Horizontal";
    Mirroring[Mirroring["Vertical"] = 1] = "Vertical";
})(Mirroring || (exports.Mirroring = Mirroring = {}));
exports.CONFIG = {
    mirroring: Mirroring.Horizontal,
};
