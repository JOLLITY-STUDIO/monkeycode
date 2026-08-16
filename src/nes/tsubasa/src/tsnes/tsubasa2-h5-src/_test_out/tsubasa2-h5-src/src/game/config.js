"use strict";
/**
 * H5 游戏配置对象
 *
 * 来源: Captain Tsubasa II - Super Striker (Japan)
 * 不是 NES 模拟器，只保留渲染/布局必要的参数。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = exports.Mirroring = void 0;
// ═══════════════════════════════════════════
// NameTable 拼接方式
// ═══════════════════════════════════════════
var Mirroring;
(function (Mirroring) {
    Mirroring[Mirroring["Horizontal"] = 0] = "Horizontal";
    Mirroring[Mirroring["Vertical"] = 1] = "Vertical";
})(Mirroring || (exports.Mirroring = Mirroring = {}));
exports.CONFIG = {
    mirroring: Mirroring.Horizontal,
};
