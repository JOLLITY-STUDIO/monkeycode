"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniAudioBridge = void 0;
const Tsubasa2AudioPlayer_1 = require("../../../../../mini-audio/mini-audio/bgm-data/Tsubasa2AudioPlayer");
const index_1 = require("../../../../../mini-audio/mini-audio/bgm-data/bgm-sid/index");
// 完整 PRG Bank 数据 (8KB each) — player 内部 _nesAddrToOffset = nesAddr - bgmNesBase
// 必须按 entry.bank 选对应 bank 的 raw + 正确的 nesBase (CPU 起始地址)
const prg_bank_12_1 = __importDefault(require("../../../../../mini-audio/mini-audio/rom-data/prg-bank-12"));
const prg_bank_13_1 = __importDefault(require("../../../../../mini-audio/mini-audio/rom-data/prg-bank-13"));
const prg_bank_14_1 = __importDefault(require("../../../../../mini-audio/mini-audio/rom-data/prg-bank-14"));
const prg_bank_15_1 = __importDefault(require("../../../../../mini-audio/mini-audio/rom-data/prg-bank-15"));
/** 各 PRG bank 的 NES CPU 基地址 */
const BANK_NES_BASE = {
    12: 0x8000,
    13: 0xa000,
    14: 0xa000,
    15: 0xa000,
};
/** 按 bankId (12/13/14/15) 取 PRG_BANK_XX 数据 */
const BANK_DATA = {
    12: prg_bank_12_1.default,
    13: prg_bank_13_1.default,
    14: prg_bank_14_1.default,
    15: prg_bank_15_1.default,
};
/**
 * Mini-audio BGM 接收 range (id 0x30-0x5B 共 43 个，
 * 其中 BGM_0x4A 和 BGM_0x5B 在 mini-audio 标记 silent=true = 单字节 0xFF 立即结束)
 */
const MINI_AUDIO_BGM_LOW = 0x30;
const MINI_AUDIO_BGM_HIGH = 0x5B;
class MiniAudioBridge {
    constructor(sampleRate, onSample) {
        /** id (0x30-0x5B) → mini-audio BGM SID entry */
        this.bgmMap = new Map();
        /** 上次播放的 BGM ID（用于幂等 + cross-fade） */
        this.lastBgmId = 0;
        /** 当前已加载的 BGM ID（player.isPlaying 时） */
        this.currentBgmId = 0;
        /** BGM 预渲染 PCM 缓存（_initAudio 通过 onPcmReady 订阅此 buffer, 用 AudioBufferSourceNode.loop 播放） */
        this._currentPcm = null;
        /** onPcmReady 监听器列表 (cb 接受 Float32Array mono PCM) */
        this._pcmListeners = [];
        this.sampleRate = sampleRate;
        this.onSample = onSample;
        this.player = new Tsubasa2AudioPlayer_1.Tsubasa2AudioPlayer(sampleRate, onSample);
        // id '0x30' → 48 parseInt → 0x30; entries 43 个
        for (const entry of index_1.BGM_SID_LIST) {
            const id = parseInt(entry.id, 16);
            if (id >= MINI_AUDIO_BGM_LOW && id <= MINI_AUDIO_BGM_HIGH) {
                this.bgmMap.set(id, entry);
            }
        }
        // 调试 trace (一次性)
        console.log(`[MiniAudioBridge] ${this.bgmMap.size} BGM sid loaded (range 0x${MINI_AUDIO_BGM_LOW.toString(16)}-0x${MINI_AUDIO_BGM_HIGH.toString(16)})`);
    }
    /**
     * 内部访问 (未来 Scene 可能要读 PAPU/状态)
     */
    getPlayer() {
        return this.player;
    }
    /**
     * 订阅 pre-rendered PCM (V0.7.2 路径)：
     *   1) playBgm(id) 完成加载+启动+预渲染 ~25 秒 PCM (loop 长度) 后自动触发 cb
     *   2) 已存在的 _currentPcm 会立即触发 (避免初始化 race)
     *   3) index.ts 的 _initAudio 用此 cb 替换 AudioBufferSourceNode.buffer
     *
     * 注意：预渲染是 sync 阻塞 (~1.5s @ 1500 frames × NES CPU 1ms/frame)，发生一次在 playBgm 调用栈内
     */
    onPcmReady(cb) {
        this._pcmListeners.push(cb);
        if (this._currentPcm)
            cb(this._currentPcm, this.sampleRate);
    }
    playBgm(id) {
        const reqId = id & 0xFF;
        if (reqId === this.lastBgmId)
            return; // 幂等：同 BGM 不重复 load
        this.lastBgmId = reqId;
        if (reqId < MINI_AUDIO_BGM_LOW || reqId > MINI_AUDIO_BGM_HIGH) {
            // 不在 mini-audio 范围；silently no-op
            // V0.7+ 从 PRG bank 12 抽 0x01-0x2F SID 后再走 mini-audio.load
            console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} 不在 mini-audio SID 范围 [0x${MINI_AUDIO_BGM_LOW.toString(16)},0x${MINI_AUDIO_BGM_HIGH.toString(16)}]，跳过 (V0.7+ 接 PRG bank 12 SID)`);
            return;
        }
        const entry = this.bgmMap.get(reqId);
        if (!entry || entry.silent) {
            // silent (BGM_0x4A / BGM_0x5B 等空轨道) 或未找到；让 player 停止当前播放
            console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} silent 或未找到，stop current`);
            this.player.stop();
            this.currentBgmId = 0;
            return;
        }
        // 加载 + 启动
        // 关键 (V0.7.2 → V0.7.3 修正):
        //   V0.7.2 错用 NES_BANK_BASE=0x8000 给所有 bank。Bank 13/14/15 在 NES $A000-$BFFF,
        //   chPtr-0x8000 越界 8192 → player 找不到 channel → chMask=0 → renderAll 返 0 samples。
        //   V0.7.3 修正: 按 entry.bank 选对应 PRG_BANK_XX + 正确 nesBase (12→$8000, 13/14/15→$A000)
        //   player 内部 _nesAddrToOffset = chPtr - bgmNesBase，落在 0..8191 范围
        const bankData = BANK_DATA[entry.bank] ?? BANK_DATA[12];
        const bankBase = BANK_NES_BASE[entry.bank] ?? 0x8000;
        const ok = this.player.load(entry.trackSQ1, entry.trackSQ2, entry.trackTRI, entry.trackNOISE, bankData, bankBase, (entry.nesBase | 0) - bankBase);
        if (!ok) {
            console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} load() 返回 false`);
            return;
        }
        // 验证 chMask 已设 (load() 返回 true 不代表 _initChannel 跑了 — 若 headerOffset
        // 越界 sharedData.length, for 循环 0 迭代 → chMask=0 → start() 返 false 静默)
        const bridge = this;
        const chMaskAfterLoad = bridge.player.w?.chMask ?? 0;
        if (chMaskAfterLoad === 0) {
            console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} chMask=0 after load ` +
                `(headerOffset=${((entry.nesBase | 0) - bankBase).toString(16)} may be out of sharedData range ${bankData.length}) — channels 不启动, 准备 silent`);
            // 显式同步 chMask=0 防止 start() 设了 isPlaying=true 但实际无 channel
            this.currentBgmId = 0;
            return;
        }
        const started = this.player.start();
        if (started === false) {
            console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} start() 返回 false (chMask=0)`);
            this.currentBgmId = 0;
            return;
        }
        this.currentBgmId = reqId;
        console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} 启动 — bank=${entry.bank} type=${entry.type} bytes=${entry.bytes} notes=${entry.notes} initPtr=0x${entry.nesBase.toString(16)} chMask=0x${chMaskAfterLoad.toString(16)}`);
        // V0.7.2: 预渲染 ~25 秒 PCM + 通知订阅者
        // 用 player.renderAll(N) 同步生成 Float32Array mono PCM, 一次性循环播放
        // 替代 ScriptProcessorNode 异步 producer/consumer 链 (避免悬挂/buffer 错配)
        try {
            const renderFrames = MiniAudioBridge.RENDER_FRAMES;
            const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
            const pcm = this.player.renderAll(renderFrames);
            const t1 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
            this._currentPcm = pcm;
            console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} 预渲染 ${pcm.length} PCM samples in ${(t1 - t0).toFixed(0)}ms (${renderFrames} frames, ~${renderFrames / 60}s loop)`);
            for (const cb of this._pcmListeners) {
                try {
                    cb(pcm, this.sampleRate);
                }
                catch (e) {
                    console.log('[MiniAudioBridge] onPcmReady listener err:', e);
                }
            }
        }
        catch (e) {
            console.log('[MiniAudioBridge] 预渲染失败，回落到 ScriptProcessorNode 路径:', e.message);
        }
    }
    playSe(id) {
        const reqId = id & 0xFF;
        if (reqId === 0)
            return;
        // 0x31 = 特殊停止所有 SE (跟 ASM `JSR $8349 JMP $80B7` 一致)
        // 0x32-0x71 是 SE 范围；0x72+ 是 BGM 槽位 (mini-audio 不在该 BGM 路由，所以这些不在 SE 触发路径)
        // 0x01-0x30 也是 BGM 范围 (来自 ROM 表)；不在 SE 范围
        if (reqId >= 0x01 && reqId <= 0x71) {
            this.player.setSeRequest(reqId);
        }
        else {
            // 范围外 → 静默忽略
            console.log(`[MiniAudioBridge] SE 0x${reqId.toString(16).padStart(2, '0')} 超出范围 [0x01,0x71]，忽略`);
        }
    }
    stopAll() {
        this.player.stop();
        this.currentBgmId = 0;
        this.lastBgmId = 0;
    }
    update() {
        this.player.tick();
    }
}
exports.MiniAudioBridge = MiniAudioBridge;
/** 预渲染帧数 (~25 sec @ 60Hz; loop 长度, 决定 AudioBufferSourceNode loop buffer 大小) */
MiniAudioBridge.RENDER_FRAMES = 1800;
