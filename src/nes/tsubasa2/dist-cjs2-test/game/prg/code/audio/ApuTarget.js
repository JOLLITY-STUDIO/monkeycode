"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullApuTarget = exports.LogApuTarget = void 0;
/** LogApuTarget — 记录寄存器写日志（测试/差分验证用） */
class LogApuTarget {
    constructor() {
        this.logs = [];
        this.frame = 0;
    }
    setFrame(f) { this.frame = f; }
    writeRegister(addr, value) {
        this.logs.push({ addr, value, frame: this.frame });
    }
    clear() { this.logs.length = 0; }
    /** 导出日志摘要（按寄存器分组统计） */
    summary() {
        const counts = {};
        for (const l of this.logs) {
            const k = '$' + l.addr.toString(16);
            counts[k] = (counts[k] ?? 0) + 1;
        }
        return Object.entries(counts)
            .sort((a, b) => parseInt(a[0].slice(1), 16) - parseInt(b[0].slice(1), 16))
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ');
    }
}
exports.LogApuTarget = LogApuTarget;
/** NullApuTarget — 空实现（不输出任何声音，用于无音频环境） */
class NullApuTarget {
    writeRegister(_addr, _value) { }
}
exports.NullApuTarget = NullApuTarget;
