/**
 * 验证脚本：启动游戏，逐步推进到比赛设置画面，dump阵型和球员数据
 * 
 * 运行: npx tsx _verify_formation.ts
 */
import { TsubasaNes } from './src/tsnes/tsubasa-code/tsubasa_nes';

const n = new TsubasaNes({ onFrame() {}, emulateSound: false });

// 加速跑帧
function runFrames(count: number) {
  for (let i = 0; i < count; i++) n.frame();
}

function dumpRam(label: string) {
  const m = (n as any).cpu.mem as Uint8Array;
  const sceneId = m[0x26];
  const dispatchIdx = m[0x27];
  const stageNum = m[0x2B];
  const half = m[0x2A];
  const rosterFlag = m[0x2C];
  
  console.log(`\n=== ${label} ===`);
  console.log(`  Scene=$26=0x${sceneId.toString(16)} Stage=$2B=${stageNum} Half=$2A=${half} RosterFlag=$2C=${rosterFlag} Dispatch=$27=${dispatchIdx}`);
  
  // 阵型RAM $0408-$042B (10条目 × 4字节)
  console.log(`  Formation RAM $0408:`, [...Array(10)].map((_, i) => {
    const base = 0x408 + i * 4;
    return `[${i}]=${m[base].toString(16).padStart(2,'0')} ${m[base+1].toString(16).padStart(2,'0')} ${m[base+2].toString(16).padStart(2,'0')} ${m[base+3].toString(16).padStart(2,'0')}`;
  }).join(' | '));
  
  // 球员阵容RAM $0300-$037B (11球员 × 12字节)
  console.log(`  Roster RAM $0300:`);
  for (let i = 0; i < 11; i++) {
    const base = 0x300 + i * 12;
    const bytes = [...Array(12)].map((_, j) => m[base + j].toString(16).padStart(2,'0'));
    console.log(`    Player ${i}: ID=${bytes[0]} data=[${bytes.join(' ')}]`);
  }

  // 球员坐标 $0446+ 
  console.log(`  Field players $0446-$047F:`, [...Array(0x3A)].map((_, i) => m[0x446 + i].toString(16).padStart(2,'0')).join(' '));
}

console.log('=== 初始化 ===');
dumpRam('Init');

// 跑几帧让初始化完成
runFrames(10);
dumpRam('After 10 frames');

// 持续跑到场景推进（$26 > 0 或进入 match setup）
for (let batch = 0; batch < 200; batch++) {
  runFrames(10);
  const sceneId = (n as any).cpu.mem[0x26];
  if (sceneId > 0) {
    console.log(`\n*** Scene changed to 0x${sceneId.toString(16)} after ~${(batch+1)*10} frames ***`);
    break;
  }
}
dumpRam('After scene change');

// 继续跑，看阵型RAM有没有被填充
for (let batch = 0; batch < 50; batch++) {
  runFrames(20);
  const m = (n as any).cpu.mem;
  // 检查 $0408 是否非零
  if (m[0x408] !== 0) {
    console.log(`\n*** Formation data appeared at $0408 after ~${(batch+1)*20} more frames ***`);
    dumpRam('Formation loaded');
    break;
  }
}
dumpRam('Final state');
