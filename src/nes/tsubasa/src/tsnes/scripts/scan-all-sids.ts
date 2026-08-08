/**
 * 快速批量检查所有 SID（0x30-0x5B）
 */
import { SidPlayer } from '../pages/mini-audio-page/sid-player';
import { ALL_SID_DATA, getSid } from '../pages/mini-audio-page/sid-data';

// Keys are string decimal "48","49"..."91" (from 0x30-0x5B)
const keys = Object.keys(ALL_SID_DATA).map(k => parseInt(k, 10)).sort((a, b) => a - b);

let ok = 0, bad = 0;

for (const id of keys) {
  const hexId = '0x' + id.toString(16).toUpperCase().padStart(2, '0');
  try {
    const sid = getSid(id);
    if (!sid) { console.log(`${hexId} NO_DATA`); bad++; continue; }
    
    const p = new SidPlayer(48000, () => {});
    if (!p.load(id)) { console.log(`${hexId} FAIL_load`); bad++; continue; }
    const mask = (p as any).activeMask;
    if (mask === 0) { 
      const totalBytes = sid.channels.reduce((s, c) => s + c.trackBytes.length, 0);
      console.log(`${hexId} NO_ACTIVE bytes=${totalBytes}`); 
      bad++; continue; 
    }
    p.start();
    const samples: number[] = [];
    (p as any).onSample = (l: number, r: number) => { samples.push((l + r) * 0.5); };
    let frame = 0;
    for (; frame < 60 && (p as any).isPlaying; frame++) p.tick();
    const nonZero = samples.filter(s => Math.abs(s) > 0.001).length;
    const pct = samples.length > 0 ? (nonZero / samples.length * 100).toFixed(0) : '0';
    const tag = nonZero > 500 ? 'OK' : 'SILENT';
    console.log(`${hexId} ${tag} frames=${frame} nonZeroPct=${pct}%`);
    if (tag === 'OK') ok++; else bad++;
    p.stop();
  } catch (e: any) {
    console.log(`${hexId} ERROR: ${e.message}`);
    bad++;
  }
}

console.log(`\nResult: OK=${ok} BAD=${bad} Total=${ok+bad}`);
