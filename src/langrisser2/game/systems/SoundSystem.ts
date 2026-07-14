/**
 * SoundSystem — Langrisser II 音乐系统
 * 
 * 基于 Z80 驱动反汇编结果实现
 * 
 * Z80 驱动中的 YM2612 内存映射:
 *   $4000: Port 0 地址寄存器 (Channel 0-2)
 *   $4001: Port 0 数据寄存器
 *   $4002: Port 1 地址寄存器 (Channel 3-5)
 *   $4003: Port 1 数据寄存器
 * 
 * 音乐数据: 从 ROM 提取并硬编码为 TS 文件 (Base64 编码)
 *   - 数据目录: game/data/music/
 *   - 索引文件: MusicIndex.ts
 *   - 音乐数量: 53 首 BGM
 */

import { YM2612 } from '../hw/fm/YM2612.js';
import { GamePhase } from '../core/SceneManager.js';
import { MUSIC_DATA_BY_ID, MUSIC_IDS, decodeBase64ToUint8Array } from '../data/MusicIndex.js';

export class SoundSystem {
  private ym2612 = new YM2612();
  private audioCtx: AudioContext | null = null;
  private audioGain: GainNode | null = null;
  
  private isPlaying = false;
  private currentMusicId = -1;
  private volume = 0.7;
  
  private musicPlayer: MusicPlayer | null = null;
  
  async startAudio(): Promise<void> {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.audioGain = this.audioCtx.createGain();
      this.audioGain.gain.value = this.volume;
      this.audioGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
  }
  
  playMusic(musicId: number): void {
    if (this.currentMusicId === musicId && this.isPlaying) return;
    
    this.stopMusic();
    this.currentMusicId = musicId;
    
    const musicEntry = MUSIC_DATA_BY_ID[musicId];
    if (!musicEntry) {
      console.warn(`Music ${musicId} not found`);
      return;
    }
    
    const musicData = decodeBase64ToUint8Array(musicEntry.base64);
    
    this.isPlaying = true;
    this.musicPlayer = new MusicPlayer(this.ym2612, musicData);
    this.startAudioLoop();
  }
  
  stopMusic(): void {
    this.isPlaying = false;
    this.currentMusicId = -1;
    this.musicPlayer = null;
    this.ym2612.reset();
  }
  
  playSFX(sfxId: number): void {
  }
  
  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioGain) {
      this.audioGain.gain.value = this.volume;
    }
  }
  
  getVolume(): number {
    return this.volume;
  }
  
  isMusicPlaying(): boolean {
    return this.isPlaying;
  }
  
  getCurrentMusicId(): number {
    return this.currentMusicId;
  }
  
  getAvailableMusicIds(): number[] {
    return MUSIC_IDS;
  }
  
  update(): void {
    if (!this.isPlaying || !this.musicPlayer) return;
    this.musicPlayer.update();
  }
  
  private async startAudioLoop(): Promise<void> {
    if (!this.audioCtx) return;
    
    const processAudio = async () => {
      if (!this.isPlaying) return;
      
      if (this.musicPlayer) {
        this.musicPlayer.update();
      }
      
      const samples = 512;
      const output = this.ym2612.update(samples);
      
      const buffer = this.audioCtx.createBuffer(2, samples, this.audioCtx.sampleRate);
      const left = buffer.getChannelData(0);
      const right = buffer.getChannelData(1);
      
      for (let i = 0; i < samples; i++) {
        left[i] = output[i * 2] * this.volume;
        right[i] = output[i * 2 + 1] * this.volume;
      }
      
      const source = this.audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioGain!);
      source.start();
      
      source.onended = () => {
        if (this.isPlaying) {
          processAudio();
        }
      };
    };
    
    processAudio();
  }
  
  playPhaseMusic(phase: GamePhase): void {
    const musicMap: Record<GamePhase, number> = {
      [GamePhase.TITLE]: 0,
      [GamePhase.NAME_INPUT]: 0,
      [GamePhase.SCENARIO_INTRO]: 0,
      [GamePhase.DEPLOY]: 3,
      [GamePhase.BATTLE_MAP]: 1,
      [GamePhase.CHAR_ACTION]: 2,
      [GamePhase.START_MENU]: 0,
      [GamePhase.BATTLE_ANIM]: 0,
      [GamePhase.SHOP]: 4,
      [GamePhase.DIALOGUE]: 5,
      [GamePhase.INTERMISSION]: 6,
      [GamePhase.SAVE_LOAD]: 0,
      [GamePhase.CREDITS]: 8,
      [GamePhase.OPENING]: 7,
    };
    
    const musicId = musicMap[phase];
    if (musicId !== undefined && musicId >= 0) {
      this.playMusic(musicId);
    }
  }
  
  destroy(): void {
    this.stopMusic();
    
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    
    if (this.audioGain) {
      this.audioGain.disconnect();
      this.audioGain = null;
    }
  }
}

class MusicPlayer {
  private ym2612: YM2612;
  private data: Uint8Array;
  private offset = 0;
  
  private currentPort = 0;
  private currentAddr = 0;
  
  constructor(ym2612: YM2612, data: Uint8Array) {
    this.ym2612 = ym2612;
    this.data = data;
  }
  
  update(): void {
    if (this.offset >= this.data.length) {
      this.offset = 0;
      return;
    }
    
    const addrByte = this.data[this.offset];
    
    if (addrByte === 0xFF && this.offset + 1 < this.data.length && this.data[this.offset + 1] === 0xFD) {
      this.offset = 0;
      return;
    }
    
    if (addrByte === 0xFF && this.offset + 1 < this.data.length) {
      this.offset += 2;
      return;
    }
    
    this.currentAddr = addrByte;
    this.currentPort = (this.currentAddr >= 0x80) ? 1 : 0;
    
    if (this.currentPort === 0) {
      this.ym2612.write(0x4000, this.currentAddr & 0x7F);
    } else {
      this.ym2612.write(0x4002, this.currentAddr & 0x7F);
    }
    
    this.offset++;
    
    if (this.offset >= this.data.length) {
      this.offset = 0;
      return;
    }
    
    const data = this.data[this.offset];
    
    if (this.currentPort === 0) {
      this.ym2612.write(0x4001, data);
    } else {
      this.ym2612.write(0x4003, data);
    }
    
    this.offset++;
  }
}

export const soundSystem = new SoundSystem();