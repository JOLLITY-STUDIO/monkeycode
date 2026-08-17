/**
 * 批量扫描所有 SID 的加载状态
 */
import { SidPlayer } from '../pages/mini-audio-page/sid-player';
import { ALL_SID_DATA, getSid } from '../pages/mini-audio-page/sid-data';

const ids = Object.keys(ALL_SID_DATA).map(k => parseInt(k, 16)).sort((a, b) => a - b);

console.log('SID Scan Report:');
console.log('─'.repeat(70));

let total = 0, working = 0, noChannels = 0, noData = 0;

for (const id of ids) {
  total++;
  const sid = getSid(id);
  if (!sid) { console.log(`0x${id.toString(16).padStart(2, '0').toUpperCase()}  ERROR: no sid data`); noData++; continue; }
  try {
    const p = new SidPlayer(48000, () => {});
    const loaded = p.load(id);
    if (!loaded) {
      console.log(`0x${id.toString(16).padStart(2, '0').toUpperCase()}  ERROR: load failed  chs=${sid.channels.length}`);
      noData++;
      continue;
    }
    const mask = (p as any).activeMask;
    if (mask === 0) {
      const totalBytes = sid.channels.reduce((s, c) => s + c.trackBytes.length, 0);
      const chList = sid.channels.map(c => `ch${c.ch}`).join(',');
      console.log(`0x${id.toString(16).padStart(2, '0').toUpperCase()}  NO_CHANNELS  activeMask=0  bytes=${totalBytes}  chDefs=[${chList}]`);
      noChannels++;
    } else {
      const activeCh = (p as any).channels.map((c: any, i: number) => c.active ? i : -1).filter((x: number) => x >= 0).join(',');
      console.log(`0x${id.toString(16).padStart(2, '0').toUpperCase()}  OK  activeMask=0x${mask.toString(16)}  active=[${activeCh}]`);
      working++;
    }
    p.stop();
  } catch (e: any) {
    console.log(`0x${id.toString(16).padStart(2, '0').toUpperCase()}  ERROR: ${e.message}`);
  }
}

console.log('─'.repeat(70));
console.log(`Total: ${total}  Working: ${working}  NoChannels: ${noChannels}  NoData: ${noData}`);
