"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareInitService = exports.PLAYER_SLOTS = void 0;
const ram_init_table_1 = require("../../data/tables/ram-init-table");
const palette_table_1 = require("../../data/tables/palette-table");
/** boot 时复制到 $05EB（8 字节） */
const BOOT_05EB_TABLE = [0x13, 0x07, 0x19, 0x00, 0x00, 0xaf, 0x2e, 0xfd];
/**
 * 球员数据槽表（32 项，$0300-$042C 区间）
 * 原 PLAYER_PTR_TABLE 为 16-bit LE 数字数组，查找逻辑（ID → RAM 基址）反推。
 * 具象化后：每项带 playerId，Service 直接 find(playerId).baseAddr。
 */
exports.PLAYER_SLOTS = [
    { playerId: 0, baseAddr: 0x0300 },
    { playerId: 1, baseAddr: 0x030c },
    { playerId: 2, baseAddr: 0x0318 },
    { playerId: 3, baseAddr: 0x0324 },
    { playerId: 4, baseAddr: 0x0330 },
    { playerId: 5, baseAddr: 0x033c },
    { playerId: 6, baseAddr: 0x0348 },
    { playerId: 7, baseAddr: 0x0354 },
    { playerId: 8, baseAddr: 0x0360 },
    { playerId: 9, baseAddr: 0x036c },
    { playerId: 10, baseAddr: 0x0378 },
    { playerId: 11, baseAddr: 0x0384 },
    { playerId: 12, baseAddr: 0x0390 },
    { playerId: 13, baseAddr: 0x039c },
    { playerId: 14, baseAddr: 0x03a8 },
    { playerId: 15, baseAddr: 0x03b4 },
    { playerId: 16, baseAddr: 0x03c0 },
    { playerId: 17, baseAddr: 0x03cc },
    { playerId: 18, baseAddr: 0x03d8 },
    { playerId: 19, baseAddr: 0x03e4 },
    { playerId: 20, baseAddr: 0x03f0 },
    { playerId: 21, baseAddr: 0x03fc },
    { playerId: 22, baseAddr: 0x0408 },
    { playerId: 23, baseAddr: 0x040c },
    { playerId: 24, baseAddr: 0x0410 },
    { playerId: 25, baseAddr: 0x0414 },
    { playerId: 26, baseAddr: 0x0418 },
    { playerId: 27, baseAddr: 0x041c },
    { playerId: 28, baseAddr: 0x0420 },
    { playerId: 29, baseAddr: 0x0424 },
    { playerId: 30, baseAddr: 0x0428 },
    { playerId: 31, baseAddr: 0x042c },
];
/** 默认基址（球员 ID 未注册时 fallback） */
const DEFAULT_PLAYER_BASE = 0x0300;
/** 按 ID 查球员数据基址（具名查询，替代原 idx 算术） */
function getPlayerBase(playerId) {
    const entry = exports.PLAYER_SLOTS.find(s => s.playerId === (playerId & 0x1f));
    return entry?.baseAddr ?? DEFAULT_PLAYER_BASE;
}
class HardwareInitService {
    constructor(store) {
        this.store = store;
        /** H5 任务回调表（原 CPU 栈跳转 → 函数调用）；未注册回调的槽只做 RAM 状态推进 */
        this.taskCallbacks = new Array(7).fill(null);
        /** 最近触发槽（$CB0F 挂起目标） */
        this.lastFiredSlot = 0;
    }
    /**
     * RESET 序列：
     * 1. RAM 清零 + RAM_INIT_TABLE
     * 2. OAM 全部 $F8
     * 3. 游戏 RAM 大块清零（$0468-$05FF / $0668-$06FE / $003A-$00DE）
     * 4. CTRL=$08 / MASK=$1E / bank 基址=0
     * 5. 调色板渲染流头（$046C/D/E）
     * 6. 调色板装载 BG($046F) + SPR($047F)
     * 7. 渲染队列入队调色板流 [$046C]
     * 8. BOOT_05EB 表复制
     * 9. 注册 boot 三个任务
     * 10. 开 NMI（CTRL |= $80, $0019 同步）
     * 11. CHR 请求表初始（req0=0, req1=2, $0022=0）
     * 12. 帧计数归零
     */
    reset() {
        const store = this.store;
        store.reset();
        store.loadInitTable(ram_init_table_1.RAM_INIT_TABLE);
        for (let i = 0x200; i < 0x300; i++)
            store.writeByte(i, ram_init_table_1.OAM_HIDE_VALUE);
        this.clearGameRam();
        store.scene.flags = 0x00;
        store.writeByte(0x063f, 0x00);
        store.ppuState.ctrl = 0x08;
        store.ppuState.mask = 0x1e;
        store.writeByte(0x046c, 0x20);
        store.writeByte(0x046d, 0x00);
        store.writeByte(0x046e, 0x3f);
        this.loadPaletteAt(0x00, 0x12);
        this.loadPaletteAt(0x10, 0x12);
        this.queueRenderEntry(0x00, 0x046c);
        for (let i = 0; i < BOOT_05EB_TABLE.length; i++) {
            store.writeByte(0x05eb + i, BOOT_05EB_TABLE[i]);
        }
        this.registerTask(0, 0x28, 0x21, 0xca);
        this.registerTask(1, 0x50, 0x1d, 0xd1);
        this.registerTask(2, 0x78, 0x85, 0xeb);
        const ctrl = store.ppuState.ctrl | 0x80;
        store.ppuState.ctrl = ctrl;
        store.writeByte(0x0019, ctrl);
        store.ppuState.chrSelBase = 0x00;
        store.writeByte(0x0490, 0x00);
        store.writeByte(0x0491, 0x02);
        store.frame = 0;
    }
    /**
     * 调色板装载：index → 16 字节 → $046F+x。
     * 装载后 $046C=$20（流长度标记，供队列入队）。
     * @param x  目标偏移（0 或 $10）
     * @param index 调色板表索引
     */
    loadPaletteAt(x, index) {
        const store = this.store;
        const item = (0, palette_table_1.loadPalette)(index & 0xff);
        for (let i = 0; i < 16; i++) {
            store.writeByte(0x046f + x + i, item[i]);
        }
        store.writeByte(0x046c, 0x20);
    }
    /**
     * $0498 渲染队列入队。
     * 条目 3 字节 [bank, ptrLo, ptrHi]，指向 RLE 流（$0498 队列消费）。
     * 流头：[count][addrLo][addrHi][data×count]，0 终止。
     * @param bank PRG bank 号（H5 已无 PRG 流读取，仅保留 RAM 视图）
     * @param ptr 流起始 CPU 地址（RAM 区读 store）
     */
    queueRenderEntry(bank, ptr) {
        const store = this.store;
        const count = store.readByte(0x0498);
        if (count >= 0x54)
            return;
        store.writeByte(0x0499 + count * 3, bank & 0xff);
        store.writeByte(0x049a + count * 3, ptr & 0xff);
        store.writeByte(0x049b + count * 3, (ptr >> 8) & 0xff);
        store.writeByte(0x0498, (count + 1) & 0xff);
    }
    /** 游戏 RAM 大块清零（$0468-$05FF / $0668-$06FE / $003A-$00DE） */
    clearGameRam() {
        const store = this.store;
        for (let a = 0x0468; a <= 0x05ff; a++)
            store.writeByte(a, 0x00);
        for (let a = 0x0668; a <= 0x06fe; a++)
            store.writeByte(a, 0x00);
        for (let a = 0x003a; a <= 0x00de; a++)
            store.writeByte(a, 0x00);
    }
    /**
     * 清空 NameTable 0/1（$2000 与 $2400 起各 0x04C0 字节 + 64 属性）。
     * 经 DataStore VRAM 写透直接落地 PPU。
     */
    clearNameTables() {
        this.clearOneNameTable(0x20);
        this.clearOneNameTable(0x24);
    }
    /** 清单个 NT（基址高字节 0x20/0x24） */
    clearOneNameTable(hi) {
        const store = this.store;
        const base = hi << 8;
        for (let i = 0; i < 0x04c0; i++)
            store.writeByte(base + i, 0x00);
        for (let i = 0; i < 64; i++)
            store.writeByte(base + 0x04c0 + i, 0x00);
    }
    /**
     * 场景切换前序：关 IRQ / 隐藏 OAM / 清 NT / PPU CTRL+MASK / bank 基址=0
     */
    prepareScene(sceneId) {
        const store = this.store;
        store.writeByte(0x0469, 0x00);
        for (let i = 0x200; i < 0x300; i++)
            store.writeByte(i, ram_init_table_1.OAM_HIDE_VALUE);
        this.clearNameTables();
        store.ppuState.ctrl = 0x08;
        store.ppuState.mask = 0x1e;
        store.ppuState.chrSelBase = 0x00;
        void sceneId;
    }
    /**
     * 主循环 tick（任务调度器）：
     * 7 个任务槽 × 4 字节 [state, sp, entryHi, entryLo]：
     * - state=0 空槽跳过
     * - state=$FF 首次启动 → 执行回调
     * - state=N 倒计时；DEC-1；到 0 → 执行回调
     * H5 由 BootRouter 每帧调用。
     */
    tick() {
        const store = this.store;
        const slots = HardwareInitService.TASK_SLOTS;
        for (let i = 0; i < slots.length; i++) {
            const x = slots[i];
            const st = store.readByte(x);
            if (st === 0)
                continue;
            if (st === 0xff) {
                this.dispatchTask(i, x);
                continue;
            }
            const n = (st - 1) & 0xff;
            store.writeByte(x, n);
            if (n !== 0)
                continue;
            this.dispatchTask(i, x);
        }
    }
    /** 槽触发 → 执行 H5 回调（原 RTS 弹栈跳入口） */
    dispatchTask(i, x) {
        const store = this.store;
        const fn = this.taskCallbacks[i];
        store.writeByte(x, 0x00);
        this.lastFiredSlot = i;
        if (fn)
            fn();
    }
    /**
     * 触发任务（槽 sp≠0 且状态==0 → 状态=1，下一帧执行）。
     */
    triggerTask(slotIndex) {
        const store = this.store;
        const x = HardwareInitService.TASK_SLOTS[slotIndex] ?? 0x0001;
        if (store.readByte(x + 1) === 0)
            return;
        if (store.readByte(x) !== 0)
            return;
        store.writeByte(x, 0x01);
    }
    /**
     * 音频请求入队（$0700 起 5 槽，空槽写入 A）。
     * 消费方：AudioService。
     */
    requestAudio(a) {
        const store = this.store;
        for (let x = 0; x < 5; x++) {
            if (store.readByte(0x0700 + x) === 0) {
                store.writeByte(0x0700 + x, a & 0xff);
                return;
            }
        }
    }
    /**
     * SE 请求（$0518=SE id，$0516=$80 待待消标志，$0005 清槽）。
     * 消费方：AudioService。
     */
    playSe(seId) {
        const store = this.store;
        store.writeByte(0x0518, seId);
        store.writeByte(0x0516, 0x80);
        store.writeByte(0x0005, 0x00);
    }
    /**
     * 球员数据指针查表。
     * A = $05FB ^ $0B；A <<= 1；ptr = PLAYER_PTR_TABLE[A>>1]（16bit LE）。
     * 结果写入 $0034/$0035（原版间接指针视图），并返回。
     */
    resolvePlayerPointer() {
        const store = this.store;
        const a = ((store.readByte(0x05fb) ^ 0x0b) << 1) & 0xff;
        const ptr = getPlayerBase(a >> 1);
        store.writeByte(0x0034, ptr & 0xff);
        store.writeByte(0x0035, (ptr >> 8) & 0xff);
        return ptr;
    }
    /**
     * 除 12 网格偏移（菜单 12 列布局）。
     * 入 A（0-255）；商 q=A/12、余 r=A%12。
     * 出 {x=r*8+$54, y=q*8+$34}（网格坐标）。
     */
    gridOffsetBy12(a) {
        let v = a & 0xff;
        let q = 0;
        while (v >= 0x0c) {
            v -= 0x0c;
            q++;
        }
        return { x: ((v * 8 + 0x54) & 0xff), y: ((q * 8 + 0x34) & 0xff) };
    }
    /**
     * 场地像素坐标 → 瓦片网格换算。
     * X=px-$30（0..$A0），Y=py-$50（0..$60）内才有效；
     * 循环 DEX/ADC#$0C 累积行偏移：col 递减至负 → 返回 A；
     * A 溢出回 0 → 返回 $FF（越界/网格线命中）。
     */
    fieldCoordToTile(px, py) {
        let x = px - 0x30;
        if (x < 0)
            return 0xff;
        if (x >= 0xa0)
            return 0xff;
        let col = x >>> 3;
        let a = py - 0x50;
        if (a < 0)
            return 0xff;
        if (a >= 0x60)
            return 0xff;
        a >>>= 3;
        col--;
        if (col < 0)
            return a & 0xff;
        for (;;) {
            a = (a + 0x0c) & 0xff;
            if (a === 0)
                return 0xff;
            col--;
            if (col < 0)
                return a & 0xff;
        }
    }
    /**
     * 清空球员数据（ID 0-$15，共 22 项）：
     *   逐项查 PLAYER_SLOTS → [baseAddr+$0A]=0；
     *   ID==0 或 ID==$0B 时额外 [baseAddr+$07]=0。
     */
    clearAllPlayers() {
        const store = this.store;
        for (let id = 0; id < 0x16; id++) {
            const base = getPlayerBase(id);
            store.writeByte(base + 0x0a, 0x00);
            if (id === 0 || id === 0x0b) {
                store.writeByte(base + 0x07, 0x00);
            }
        }
    }
    /**
     * 按 ID 查球员数据基址（PLAYER_SLOTS 具名查询）。
     * 结果写入 $0034/$0035（原版间接指针视图），并返回。
     */
    resolvePlayerPointerById(id) {
        const store = this.store;
        const ptr = getPlayerBase(id & 0xff);
        store.writeByte(0x0034, ptr & 0xff);
        store.writeByte(0x0035, (ptr >> 8) & 0xff);
        return ptr;
    }
    /**
     * 球员碰撞检测：
     * 球员指针指向数据的 [y+6]（X 坐标）、[y+8]（Y 坐标）；
     * 与 $0635/$0637 差值的绝对值均 < $0047（半径）→ 碰撞（返回 true）。
     */
    checkPlayerCollision(ptr) {
        const store = this.store;
        const dx = Math.abs((store.readByte(ptr + 6) & 0xff) - store.readByte(0x0635));
        if (dx >= store.readByte(0x0047))
            return false;
        const dy = Math.abs((store.readByte(ptr + 8) & 0xff) - store.readByte(0x0637));
        if (dy >= store.readByte(0x0047))
            return false;
        return true;
    }
    /**
     * 16bit × 16bit 乘法（$0067/$0068 × $0069/$006A → $006B-$006E 32bit）。
     * 逐位 ROR 移位累加（ROR $0068 → ROR $0067 → 进位入累加器高位）。
     */
    mult16() {
        const store = this.store;
        let lo = store.readByte(0x0068);
        let hi = store.readByte(0x0067);
        const m = store.readByte(0x0069) | (store.readByte(0x006a) << 8);
        let acc = 0;
        for (let i = 0; i < 16; i++) {
            const bit = lo & 1;
            lo = (lo >>> 1) | (hi << 7);
            hi >>>= 1;
            let carry = 0;
            if (bit === 1) {
                const sum = acc + m;
                acc = sum & 0xffffffff;
                carry = (sum >>> 32) & 1;
            }
            acc = ((acc >>> 1) | (carry << 31)) & 0xffffffff;
        }
        store.writeByte(0x006b, acc & 0xff);
        store.writeByte(0x006c, (acc >>> 8) & 0xff);
        store.writeByte(0x006d, (acc >>> 16) & 0xff);
        store.writeByte(0x006e, (acc >>> 24) & 0xff);
    }
    /**
     * 16bit ÷ 16bit（$006F/$0070 ÷ $0071/$0074 → 商 $006F/$0070、余 $0072/$0073）。
     * 恢复除除：每次迭代余数左移并入被除后最高位，够减则减并置商位。
     */
    div16() {
        const store = this.store;
        let q = store.readByte(0x006f) | (store.readByte(0x0070) << 8);
        const d = store.readByte(0x0071) | (store.readByte(0x0074) << 8);
        let r = 0;
        for (let i = 0; i < 16; i++) {
            const bit = (q >>> 15) & 1;
            q = (q << 1) & 0xffff;
            r = ((r << 1) | bit) & 0xffff;
            if (r >= d) {
                r = (r - d) & 0xffff;
                q |= 1;
            }
        }
        store.writeByte(0x006f, q & 0xff);
        store.writeByte(0x0070, (q >>> 8) & 0xff);
        store.writeByte(0x0072, r & 0xff);
        store.writeByte(0x0073, (r >>> 8) & 0xff);
    }
    /**
     * 注册任务（H5 回调版）：
     * - 入口地址写入 $0101+sp（hi@+0/lo@+1）
     * - 槽状态置 $FF
     * - 注册 H5 回调（原 CPU 入口对应函数）
     */
    registerTask(slotIndex, sp, entryHi, entryLo, fn) {
        const store = this.store;
        const x = HardwareInitService.TASK_SLOTS[slotIndex] ?? 0x0001;
        store.writeByte(0x0101 + sp, entryHi);
        store.writeByte(0x0102 + sp, entryLo);
        store.writeByte(x, 0xff);
        if (fn)
            this.taskCallbacks[slotIndex] = fn;
    }
    /**
     * 挂起当前任务（最近触发槽）：置 countdown。
     * 0 = 下一帧恢复。
     */
    suspendTask(countdown) {
        const store = this.store;
        const x = HardwareInitService.TASK_SLOTS[this.lastFiredSlot] ?? 0x0001;
        store.writeByte(x, countdown & 0xff);
    }
}
exports.HardwareInitService = HardwareInitService;
/** 任务槽基址（7 个槽 × 4 字节） */
HardwareInitService.TASK_SLOTS = [0x0001, 0x0005, 0x0009, 0x000d, 0x0011, 0x0015, 0x0019];
