export class MatchHudService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 刷新 HUD 到渲染缓冲（每帧调用）
     *
     * 行为：
     * 1. 读 ram_0468/0469 → 时间
     * 2. 读 ram_044E/0450 → 比分
     * 3. 转换为 BCD 字符（'0'-'9' tile 索引 16-25）
     * 4. 写入 OAM HUD 字符区（$0200 起 12 字节 = 4 字符 × 3 字节）
     *
     * NMI 渲染时通过 $04 字符队列同步刷出。
     */
    refresh() {
        const minutes = this.store.readByte(0x0468) & 0xff;
        const seconds = this.store.readByte(0x0469) & 0xff;
        const homeScore = this.store.readByte(0x044e) & 0xff;
        const awayScore = this.store.readByte(0x0450) & 0xff;
        // BCD 转换（每字节 → 2 个 tile：十位 + 个位）
        const minHi = Math.floor(minutes / 10);
        const minLo = minutes % 10;
        const secHi = Math.floor(seconds / 10);
        const secLo = seconds % 10;
        const homeHi = Math.floor(homeScore / 10);
        const homeLo = homeScore % 10;
        const awayHi = Math.floor(awayScore / 10);
        const awayLo = awayScore % 10;
        // 写入 OAM HUD 区（按 [y, tile, attr, x] 格式）
        // 简化：使用固定 Y=8 行，X 位置按列布局
        const hudY = 8;
        const tiles = [
            this.toTileDigit(homeHi), this.toTileDigit(homeLo),
            this.toTileDigit(minHi), this.toTileDigit(minLo),
            this.toTileDigit(secHi), this.toTileDigit(secLo),
            this.toTileDigit(awayHi), this.toTileDigit(awayLo),
        ];
        for (let i = 0; i < 8; i++) {
            const base = 0x0200 + i * 4;
            this.store.writeByte(base, hudY); // y
            this.store.writeByte(base + 1, tiles[i]); // tile
            this.store.writeByte(base + 2, 0x02); // attr (palette 2)
            this.store.writeByte(base + 3, 32 + i * 12); // x
        }
        // 触发 HUD 队列消费：ram_0515 |= 0x80
        this.store.writeByte(0x0515, (this.store.readByte(0x0515) | 0x80) & 0xff);
    }
    /**
     * 写入比赛时间到 ram_0468/0469。
     */
    setTimer(minutes, seconds) {
        this.store.writeByte(0x0468, Math.max(0, Math.min(255, minutes)) & 0xff);
        this.store.writeByte(0x0469, Math.max(0, Math.min(59, seconds)) & 0xff);
    }
    /**
     * 写入双方比分。
     */
    setScore(home, away) {
        this.store.writeByte(0x044e, Math.max(0, Math.min(255, home)) & 0xff);
        this.store.writeByte(0x0450, Math.max(0, Math.min(255, away)) & 0xff);
    }
    /**
     * 数字 → HUD tile 索引（简化为 '0' + digit）。
     * 真实实现应查 CharMap.toTile()。
     */
    toTileDigit(d) {
        return 16 + (d & 0x0f); // tile 16..25 对应 '0'..'9'
    }
    /**
     * 体力条绘制：按体力比例（0..255）映射 0..16 tile。
     * 当前 stub：只更新 ram_0620+slot；NT 缓冲留空（待 V0.5 真实实现）。
     */
    drawStaminaBar(slot, stamina) {
        if (slot < 0 || slot >= 22)
            return;
        this.store.writeByte(0x0620 + slot, stamina & 0xff);
        // TODO V0.5+: 写 NT 缓冲体力条（16 tile 进度条 sprite 装载）
    }
    /** 查询当前时间 */
    getTimer() {
        return {
            minutes: this.store.readByte(0x0468) & 0xff,
            seconds: this.store.readByte(0x0469) & 0xff,
        };
    }
    /** 查询当前比分 */
    getScore() {
        return {
            home: this.store.readByte(0x044e) & 0xff,
            away: this.store.readByte(0x0450) & 0xff,
        };
    }
}
