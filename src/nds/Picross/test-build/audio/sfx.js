export class Sfx {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.ensure();
    }
    /** 惰性创建 AudioContext（首次用户手势后可 resume） */
    ensure() {
        if (this.ctx)
            return true;
        try {
            const g = typeof wx !== "undefined" ? wx : null;
            if (g && typeof g.createWebAudioContext === "function") {
                this.ctx = g.createWebAudioContext();
            }
            else if (typeof window !== "undefined") {
                const w = window;
                const AC = w.AudioContext || w.webkitAudioContext;
                if (AC)
                    this.ctx = new AC();
            }
        }
        catch (e) {
            this.ctx = null;
        }
        return !!this.ctx;
    }
    setMuted(m) {
        this.muted = m;
    }
    play(kind) {
        if (this.muted || !this.ensure())
            return;
        const ctx = this.ctx;
        if (ctx.state === "suspended" && ctx.resume)
            ctx.resume();
        const t0 = ctx.currentTime;
        switch (kind) {
            case "tap": // 涂黑：短促方波
                this.tone(660, t0, 0.06, "square", 0.12);
                break;
            case "cross": // 画叉：清脆三角波
                this.tone(440, t0, 0.05, "triangle", 0.1);
                break;
            case "clear": // 清除：下滑
                this.sweep(520, 300, t0, 0.05, 0.08);
                break;
            case "mistake": // 失误：低音下坠
                this.sweep(220, 110, t0, 0.25, 0.22);
                break;
            case "win": // 完成：上行琶音 C-E-G-C
                [523, 659, 784, 1047].forEach((f, i) => this.tone(f, t0 + i * 0.12, 0.12, "triangle", 0.16));
                break;
        }
    }
    tone(freq, start, dur, type, vol) {
        const ctx = this.ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(vol, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.02);
    }
    sweep(f0, f1, start, dur, vol) {
        const ctx = this.ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f0, start);
        osc.frequency.exponentialRampToValueAtTime(f1, start + dur);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(vol, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.02);
    }
}
