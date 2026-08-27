/**
 * MiniAudioBridge — 用 mini-audio 已测试的 Tsubasa2AudioPlayer 接入 H5
 *
 * 数据源 (来自 mini-audio 已 ship 的真 byte 流)：
 *   - BGM: bgm-sid/BGM_0x30..0x5B.ts — 共 43 个 SID 完整轨道 (trackSQ1/SQ2/TRI/NOISE + raw + nesBase + headerOffset)
 *   - SE : SEData.ts — Bank 12 $8BDA header 表 + 6 通道 (CH2-7) 聚合轨道
 *
 * 跟 H5 AudioService 的差异：
 *   - 不依赖 H5 FREQUENCY_TABLE / DURATION_TABLE / COMMAND_TABLE (mini-audio 自带)
 *   - 不依赖 H5 DataStore (mini-audio 自带 PAPU + 命令流)
 *   - 不解析 AudioToken；直接消费 NES 字节流 (跟真 NES 行为同)
 *
 * H5 适配：
 *   - playBgm(id): 0x30-0x5B 查 BGM_SID_LIST → player.load(...)；不在范围静默（V0.7+ 接 PRG bank 12 抽 0x01-0x2F 后再支持）
 *   - playSe(id) : 直接 player.setSeRequest(id) (mini-audio 内部有 $8BDA header 表)
 *   - stopAll()  : player.stop() + 清请求槽位
 *   - update()   : player.tick() (一帧 60Hz 推进)
 *
 * 已知限制 (V0.7 follow-up)：
 *   - 0x01-0x2F BGM 不在 mini-audio (用户原话：原 commit 4b6db6d2 fake 占位)；后续从 PRG bank 12 抽 48 个 SID 注入
 *   - SE 内部混响 (PAPU 寄存器写入顺序) 已对齐 mini-audio 测试版；H5 WebAudio 输出仅 PCM stream，无混合
 */
import type { AudioBridge } from './AudioBridge';
import { Tsubasa2AudioPlayer } from '../../../../../mini-audio/mini-audio/bgm-data/Tsubasa2AudioPlayer';
import {
  BGM_SID_LIST,
  type BgmSidEntry,
} from '../../../../../mini-audio/mini-audio/bgm-data/bgm-sid/index';

/**
 * Mini-audio BGM 接收 range (id 0x30-0x5B 共 43 个，
 * 其中 BGM_0x4A 和 BGM_0x5B 在 mini-audio 标记 silent=true = 单字节 0xFF 立即结束)
 */
const MINI_AUDIO_BGM_LOW = 0x30;
const MINI_AUDIO_BGM_HIGH = 0x5B;

export class MiniAudioBridge implements AudioBridge {
  private readonly player: Tsubasa2AudioPlayer;
  /** id (0x30-0x5B) → mini-audio BGM SID entry */
  private readonly bgmMap: Map<number, BgmSidEntry> = new Map();
  /** 上次播放的 BGM ID（用于幂等 + cross-fade） */
  private lastBgmId = 0;
  /** 当前已加载的 BGM ID（player.isPlaying 时） */
  private currentBgmId = 0;

  constructor(sampleRate: number, onSample: (l: number, r: number) => void) {
    this.player = new Tsubasa2AudioPlayer(sampleRate, onSample);

    // id '0x30' → 48 parseInt → 0x30; entries 43 个
    for (const entry of BGM_SID_LIST) {
      const id = parseInt(entry.id, 16);
      if (id >= MINI_AUDIO_BGM_LOW && id <= MINI_AUDIO_BGM_HIGH) {
        this.bgmMap.set(id, entry);
      }
    }

    // 调试 trace (一次性)
    console.log(
      `[MiniAudioBridge] ${this.bgmMap.size} BGM sid loaded (range 0x${MINI_AUDIO_BGM_LOW.toString(16)}-0x${MINI_AUDIO_BGM_HIGH.toString(16)})`,
    );
  }

  /**
   * 内部访问 (未来 Scene 可能要读 PAPU/状态)
   */
  getPlayer(): Tsubasa2AudioPlayer {
    return this.player;
  }

  playBgm(id: number): void {
    const reqId = id & 0xFF;
    if (reqId === this.lastBgmId) return; // 幂等：同 BGM 不重复 load
    this.lastBgmId = reqId;

    if (reqId < MINI_AUDIO_BGM_LOW || reqId > MINI_AUDIO_BGM_HIGH) {
      // 不在 mini-audio 范围；silently no-op
      // V0.7+ 从 PRG bank 12 抽 0x01-0x2F SID 后再走 mini-audio.load
      console.log(
        `[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} 不在 mini-audio SID 范围 [0x${MINI_AUDIO_BGM_LOW.toString(16)},0x${MINI_AUDIO_BGM_HIGH.toString(16)}]，跳过 (V0.7+ 接 PRG bank 12 SID)`,
      );
      return;
    }

    const entry = this.bgmMap.get(reqId);
    if (!entry || entry.silent) {
      // silent (BGM_0x4A / BGM_0x5B 等空轨道) 或未找到；让 player 停止当前播放
      console.log(
        `[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} silent 或未找到，stop current`,
      );
      this.player.stop();
      this.currentBgmId = 0;
      return;
    }

    // 加载 + 启动
    const ok = this.player.load(
      entry.trackSQ1,
      entry.trackSQ2,
      entry.trackTRI,
      entry.trackNOISE,
      entry.raw,
      entry.nesBase,
      entry.headerOffset,
    );
    if (!ok) {
      console.log(`[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} load() 返回 false`);
      return;
    }
    this.player.start();
    this.currentBgmId = reqId;
    console.log(
      `[MiniAudioBridge] BGM 0x${reqId.toString(16).padStart(2, '0')} 启动 — bank=${entry.bank} type=${entry.type} bytes=${entry.bytes} notes=${entry.notes} nesBase=0x${entry.nesBase.toString(16)}`,
    );
  }

  playSe(id: number): void {
    const reqId = id & 0xFF;
    if (reqId === 0) return;
    // 0x31 = 特殊停止所有 SE (跟 ASM `JSR $8349 JMP $80B7` 一致)
    // 0x32-0x71 是 SE 范围；0x72+ 是 BGM 槽位 (mini-audio 不在该 BGM 路由，所以这些不在 SE 触发路径)
    // 0x01-0x30 也是 BGM 范围 (来自 ROM 表)；不在 SE 范围
    if (reqId >= 0x01 && reqId <= 0x71) {
      this.player.setSeRequest(reqId);
    } else {
      // 范围外 → 静默忽略
      console.log(
        `[MiniAudioBridge] SE 0x${reqId.toString(16).padStart(2, '0')} 超出范围 [0x01,0x71]，忽略`,
      );
    }
  }

  stopAll(): void {
    this.player.stop();
    this.currentBgmId = 0;
    this.lastBgmId = 0;
  }

  update(): void {
    this.player.tick();
  }
}
