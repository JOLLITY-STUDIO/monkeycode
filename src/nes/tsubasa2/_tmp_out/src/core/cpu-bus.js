"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRQ_RESET = exports.IRQ_NMI = exports.IRQ_NORMAL = void 0;
/** IRQ 类型常量 (与原 CPU 类保持一致, 供 bus.requestIrq 使用) */
exports.IRQ_NORMAL = 0;
exports.IRQ_NMI = 1;
exports.IRQ_RESET = 2;
