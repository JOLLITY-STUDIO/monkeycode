/**
 * Bank 12 — Audio Manager Service (音频引擎服务层)
 *
 * 对外接口适配层，内部委托给 Bank12AudioEngine + PapuOutput。
 * 保持 Tsubasa2.ts 调用兼容: setBankData / requestPlay / stopAll / update。
 *
 * 架构:
 *   Bank12AudioService (对外接口)
 *     → Bank12AudioEngine (核心引擎: 音序器/命令分发/音量/APU 写入)
 *       → PapuOutput (PAPU + AudioContext 桥接)
 *
 * 数据流:
 *   setBankData(bank12, bank15) → engine.setSeBankData + 解析 BGM header
 *   requestPlay(0x31) → engine.load(trackSQ1/2/TRI/NOISE, sharedRaw)
 *   update() → engine.tick() → papu.writeReg + papu.clockFrameCounter
 *
 * 原始入口 (Bank 12 ROM):
 *   $8002: 音频主循环 — NMI 每帧调用
 *   $8349: 音乐播放初始化
 *   $83CB: 音序读取器
 *   $84C9: 音频命令分发器 ($E0-$FF)
 *   $816E: APU 寄存器写入
 *   $81DB: 音量/衰减处理
 */

import type { DataStore } from '../data/DataStore';
import { PapuOutput } from '../core/engine/audio/PapuOutput';
import { Bank12AudioEngine } from './bank12_audio_engine';

// ═══════════════════════════════════════════════════════════════
// 兼容类型导出 (保持 WebAudioOutput 等旧代码的 import 兼容)
// ═══════════════════════════════════════════════════════════════

/** 单个音频通道波形类型 (兼容旧接口) */
export enum ChannelType {
  OFF = 0,
  SQUARE_TRI = 1,
  SPECIAL = 2,
}

/** APU 输出事件 (兼容旧接口，新引擎直接写 PAPU 寄存器) */
export interface ApuWriteEvent {
  addr: number;
  value: number;
}

/** 音频输出接口 (兼容旧接口，新引擎使用 PapuOutput) */
export interface IAudioOutput {
  writeApu(events: ApuWriteEvent[]): void;
  setChannel(index: number, freq: number, volume: number, duty: number): void;
  silenceAll(): void;
}

// ═══════════════════════════════════════════════════════════════
// BGM 数据映射 (Bank 15)
// ═══════════════════════════════════════════════════════════════

/** BGM ID → Bank15 ROM 偏移 */
export const BGM_DATA_MAP: Record<number, number> = {
  0x31: 0x800D, // TECMO Theater BGM
};

/**
 * 音效指针表 (Bank 12 $8BDA, 31 entries × 2B)
 * 引擎内部从 seBankData 直接读取，此处保留兼容导出
 */
export const SE_POINTER_TABLE: number[] = [
  0x42, 0x8E, 0x5B, 0x8E, 0x68, 0x8E, 0x89, 0x8E, 0xCF, 0x8E, 0xAD, 0x8F,
  0x14, 0x8F, 0xA4, 0x90, 0x35, 0x92, 0xCC, 0x96, 0x49, 0x97, 0x81, 0x91,
  0xEA, 0x91, 0x1D, 0x91, 0x79, 0x90, 0x5A, 0x8F, 0xBB, 0x8F, 0x2D, 0x94,
  0x62, 0x94, 0xC6, 0x94, 0xE4, 0x9D, 0xFD, 0x9D, 0x59, 0x93, 0x53, 0x96,
  0x7F, 0x9E, 0x77, 0x97, 0x1E, 0x9B, 0xD3, 0x9E, 0xCD, 0x9A, 0x50, 0x9B,
  0x9D, 0x9B, 0x00, 0xFF,
];

// ═══════════════════════════════════════════════════════════════
// Bank12AudioService
// ═══════════════════════════════════════════════════════════════

export class Bank12AudioService {
  /** PAPU + AudioContext 桥接 */
  private _papu: PapuOutput;
  /** 核心音频引擎 */
  private _engine: Bank12AudioEngine;

  // Bank 数据缓存 (setBankData 注入)
  private _bank12: Uint8Array = new Uint8Array(0);
  private _bank15: Uint8Array = new Uint8Array(0);

  constructor(_store: DataStore, _audioOut?: IAudioOutput) {
    // 忽略旧的 IAudioOutput，改用 PapuOutput (PAPU 完整模拟 NES APU)
    this._papu = new PapuOutput();
    this._engine = new Bank12AudioEngine(this._papu);
  }

  // ──────────────────────────────────────────────
  // Bank 数据注入 (替代 MMC3 映射)
  // ──────────────────────────────────────────────

  /**
   * 设置 Bank 12 (SE 数据) + Bank 15 (BGM 数据)。
   * Tsubasa2.ts 调用: setBankData({ bank12: [..._prg12], bank15: [..._prg15] })
   */
  setBankData(params: {
    bank0D?: number[];
    bank0E?: number[];
    bank0F?: number[];
    bank12?: number[];
    bank15?: number[];
    seTable?: number[];
  }): void {
    if (params.bank12) {
      this._bank12 = new Uint8Array(params.bank12);
      this._engine.setSeBankData(this._bank12);
    }
    if (params.bank15) {
      this._bank15 = new Uint8Array(params.bank15);
    }
  }

  // ──────────────────────────────────────────────
  // 对外接口: 请求播放
  // ──────────────────────────────────────────────

  /**
   * 请求播放音效/音乐。
   * @param seId 音效 ID (0x01-0x72)
   *   0x31: TECMO Theater BGM (从 Bank15 加载)
   *   其他: SE 音效 (从 Bank12 加载)
   */
  requestPlay(seId: number): boolean {
    if (seId >= 0x31 && seId <= 0x35) {
      // BGM: 从 Bank15 解析 header，加载 4 通道
      return this._loadBgm(seId);
    }
    // SE: 直接写入请求槽位
    this._engine.setSeRequest(seId);
    return true;
  }

  /**
   * 从 Bank15 加载 BGM。
   * Bank15 header 格式: [chNum, ptrLo, ptrHi] × N, 0xFF 终止
   * 通道映射: chNum 0-3 → 内部 ch4-7 (SQ1/SQ2/TRI/NOISE)
   */
  private _loadBgm(bgmId: number): boolean {
    const offset = BGM_DATA_MAP[bgmId];
    if (offset === undefined || this._bank15.length === 0) {
      console.warn(`[Bank12] BGM 0x${bgmId.toString(16)}: Bank15 数据未加载`);
      return false;
    }

    const bank = this._bank15;
    let pos = offset;

    // 解析 header: [chNum, ptrLo, ptrHi] × N, 0xFF 终止
    // 通道数据共享 Bank15 同一数组，NES 地址 $A000-$BFFF → 偏移 0
    const tracks: number[][] = [[], [], [], []]; // SQ1, SQ2, TRI, NOISE
    let chCount = 0;

    while (pos < offset + 64 && pos < bank.length) {
      const chNum = bank[pos];
      if (chNum >= 0x80) break;
      pos++;
      const tLo = bank[pos] ?? 0; pos++;
      const tHi = bank[pos] ?? 0; pos++;

      // NES 地址 $A000-$BFFF → 数组偏移
      const cpuPtr = (tLo | (tHi << 8)) & 0xFFFF;
      const trackOff = cpuPtr - 0xA000;
      if (trackOff < 0 || trackOff >= bank.length) continue;

      // chNum 0-3 → 通道索引 0-3 (SQ1/SQ2/TRI/NOISE)
      const trackIdx = chNum & 0x03;
      tracks[trackIdx] = Array.from(bank.slice(trackOff));
      chCount++;
    }

    console.log(`[Bank12] BGM 0x${bgmId.toString(16)}: ${chCount} channels loaded`);

    // 使用 sharedData 模式: 整个 Bank15 作为共享数据
    // nesBase = 0xA000 (Bank15 CPU 基址), headerOffset = BGM header 偏移
    this._engine.load(
      tracks[0], tracks[1], tracks[2], tracks[3],
      Array.from(bank), 0xA000, offset,
    );
    this._engine.start();
    return true;
  }

  /** 停止所有播放 */
  stopAll(): void {
    this._engine.stop();
    this._papu.silence();
  }

  // ──────────────────────────────────────────────
  // 每帧更新 (NMI $8002 入口)
  // ──────────────────────────────────────────────

  /**
   * 每帧调用: 推进音频引擎 + PAPU 帧计数器。
   * Tsubasa2.ts 的 _onFrame 调用。
   */
  update(): void {
    this._engine.tick();
  }

  // ──────────────────────────────────────────────
  // 调试接口
  // ──────────────────────────────────────────────

  /** 获取 PAPU 实例 (调试/高级用途) */
  get papu(): PapuOutput {
    return this._papu;
  }

  /** 获取引擎进度 */
  get progress(): { frame: number; seconds: number; playing: boolean } {
    return this._engine.progress;
  }

  /** 获取当前通道状态（调试用） */
  getDebugState(): object {
    return {
      progress: this._engine.progress,
      bank12Size: this._bank12.length,
      bank15Size: this._bank15.length,
    };
  }
}
