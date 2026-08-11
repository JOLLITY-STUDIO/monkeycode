/**
 * 分析所有 BGM SID 轨道: 实际播放时长（one-shot 下播完即停）— 输出到文件
 */
import * as fs from 'fs';
import { Tsubasa2AudioPlayer } from './mini-audio/bgm-data/Tsubasa2AudioPlayer';
import { BGM_SID_LIST } from './mini-audio/bgm-data/bgm-sid/index';
import { PRG_BANKS } from './rom-data/index';

const MAX_FRAMES = 60 * 120; // 上限 120 秒

function analyze(entry: any) {
  const player = new Tsubasa2AudioPlayer(16000);
  player.setPrgRom(PRG_BANKS);
  player.setOneShot(true);

  let voicedFrames = 0;
  let lastVoicedFrame = -1;
  let frame = 0;
  let ended = false;
  player.setSampleCallback((l, r) => {
    const m = Math.abs((l + r) / 2);
    if (m > 0.001) { voicedFrames++; lastVoicedFrame = frame; }
  });

  player.load(
    entry.trackSQ1, entry.trackSQ2, entry.trackTRI, entry.trackNOISE,
    entry.raw, entry.nesBase, entry.headerOffset,
  );
  player.start();
  for (let i = 0; i < 30; i++) player.tick();
  voicedFrames = 0;
  lastVoicedFrame = -1;
  for (frame = 0; frame < MAX_FRAMES; frame++) {
    player.tick();
    if (player.progress.playing === false && frame > 2) { ended = true; break; }
  }
  const secs = Math.round((frame / 60) * 10) / 10;
  const voicedSecs = Math.round(((lastVoicedFrame + 1) / 60) * 10) / 10;
  const vf = Math.round(voicedFrames / ((lastVoicedFrame + 1) || 1) * 100);
  player.stop();
  return { secs, voicedSecs, voicedPct: vf, ended };
}

const out: string[] = [];
for (const e of BGM_SID_LIST) {
  const r = analyze(e);
  const flag = e.silent ? 'SILENT' : (r.voicedSecs < 0.2 ? '??无声' : (r.secs < 10 ? 'SHORT<10s' : (r.ended ? 'ended' : '>120s')));
  out.push(
    `${e.id.padEnd(6)} type=${String(e.type).padEnd(7)} bank=${String(e.bank).padEnd(2)} ` +
    `播到停=${String(r.secs).padStart(6)}s 有声末=${String(r.voicedSecs).padStart(6)}s 有声率=${String(r.voicedPct).padStart(3)}% ` +
    `${r.ended ? '自然停' : '超时'} [${flag}] ${e.name}`
  );
}
fs.writeFileSync('_bgm_dur_result.txt', out.join('\n'), 'utf8');
console.log('done, ' + out.length + ' tracks');
