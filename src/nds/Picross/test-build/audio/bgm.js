const NOTE = (m) => 440 * Math.pow(2, (m - 69) / 12);
/** 4/4 拍、8 小节 × 16 步 = 128 步，16 分音符步进 */
const BARS = 8;
const STEPS = BARS * 16;
/** 旋律（triangle）：轻快上行下行，C 大调 */
const MELODY = [
    76, 79, 81, 79, 76, 72, 74, 76, 76, 79, 81, 79, 76, 72, 74, 0,
    77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 79,
    77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 0,
    74, 77, 76, 74, 72, 0, 74, 0, 72, 74, 72, 0, 0, 0, 0, 0,
    76, 79, 81, 79, 76, 72, 74, 76, 76, 79, 81, 79, 76, 72, 74, 0,
    77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 79,
    77, 81, 79, 76, 74, 72, 74, 0, 76, 79, 81, 84, 81, 79, 76, 0,
    74, 77, 76, 74, 72, 0, 74, 0, 60, 64, 67, 72, 0, 0, 0, 0,
];
/** 贝斯（square 低八度）：C Am F G 根音进行，八分音符 */
const BASS = (() => {
    const roots = [48, 45, 41, 43, 48, 41, 43, 48]; // C Am F G C F G C
    const a = [];
    for (let b = 0; b < BARS; b++) {
        for (let s = 0; s < 16; s++) {
            a.push(s % 2 === 0 ? roots[b] : 0);
        }
    }
    return a;
})();
/** 鼓：每拍底鼓 + 16 分音符踩镲（噪声） */
const KICK = Array.from({ length: STEPS }, (_, i) => (i % 4 === 0 ? 1 : 0));
const HAT = Array.from({ length: STEPS }, (_, i) => (i % 2 === 0 ? 1 : 0));
export class Bgm {
    constructor() {
        this.ctx = null;
        this.master = null;
        this.muted = false;
        this.playing = false;
        this.timer = null;
        this.step = 0;
        this.nextT = 0;
        this.bpm = 112;
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
        if (this.ctx) {
            this.master = this.ctx.createGain();
            this.master.gain.value = this.muted ? 0 : 0.5;
            this.master.connect(this.ctx.destination);
        }
        return !!this.ctx;
    }
    setMuted(m) {
        this.muted = m;
        if (this.master)
            this.master.gain.value = m ? 0 : 0.5;
    }
    /** 播放循环 BGM（幂等） */
    start(_kind = "game") {
        if (!this.ensure() || this.playing)
            return;
        const ctx = this.ctx;
        if (ctx.state === "suspended" && ctx.resume)
            ctx.resume();
        this.playing = true;
        this.step = 0;
        this.nextT = ctx.currentTime + 0.1;
        const stepDur = 60 / this.bpm / 4;
        const lookahead = 0.25;
        const tick = () => {
            if (!this.playing)
                return;
            while (this.nextT < ctx.currentTime + lookahead) {
                this.playStep(this.step, this.nextT, stepDur);
                this.step = (this.step + 1) % STEPS;
                this.nextT += stepDur;
            }
        };
        tick();
        this.timer = setInterval(tick, 40);
    }
    stop() {
        this.playing = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    /** 播放第 s 步（t 为绝对时间） */
    playStep(s, t, stepDur) {
        const m = MELODY[s];
        if (m)
            this.tone(m, t, stepDur * 1.8, "triangle", 0.16);
        const b = BASS[s];
        if (b)
            this.tone(b - 12, t, stepDur * 1.6, "square", 0.1);
        if (KICK[s])
            this.kick(t, stepDur);
        if (HAT[s])
            this.hat(t, s % 4 === 0 ? 0.05 : 0.025);
    }
    tone(midi, start, dur, type, vol) {
        const ctx = this.ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = NOTE(midi);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(vol, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(this.master);
        osc.start(start);
        osc.stop(start + dur + 0.02);
    }
    /** 底鼓：低频正弦快速衰减 */
    kick(start, stepDur) {
        const ctx = this.ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, start);
        osc.frequency.exponentialRampToValueAtTime(45, start + stepDur * 2);
        gain.gain.setValueAtTime(0.5, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + stepDur * 2.5);
        osc.connect(gain);
        gain.connect(this.master);
        osc.start(start);
        osc.stop(start + stepDur * 3);
    }
    /** 踩镲：高通噪声短音 */
    hat(start, vol) {
        const ctx = this.ctx;
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++)
            data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 7000;
        const gain = ctx.createGain();
        gain.gain.value = vol;
        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.master);
        src.start(start);
    }
}
/** 全局单例 */
export const bgm = new Bgm();
