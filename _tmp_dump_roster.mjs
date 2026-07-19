import { readFileSync } from 'fs';

const ROM = readFileSync('_pynasm_tool/nesrc/tsubasa2/tsubasa2.nes');
const PRG = ROM.slice(16);

// 根据搜索确认: 序列 02 03 04 05 06 07 08 在 file offset 0x4A57
// bank=2, CPU $8A47 (= bank 2 PRG offset 0x0A47, 双映射到 $AA47)
const ROSTER_OFFSET = 0x4A57 - 0x10; // PRG offset (skip header)

console.log('=== 对手阵容表 (Bank 2, $8A47/$AA47) ===\n');

function hex(arr, len) {
    return Array.from(arr.slice(0, len))
        .map(b => '0x' + b.toString(16).padStart(2,'0').toUpperCase())
        .join(' ');
}

const data = PRG.slice(ROSTER_OFFSET, ROSTER_OFFSET + 0x60);

// Group 0: 11 players + ctrl
const G0_players = data.slice(0x00, 0x0B);
const G0_ctrl = data[0x0B];

// Group 1: 11 players + ctrl  
const G1_players = data.slice(0x0C, 0x17);
const G1_ctrl = data[0x17];

// Group 2: 11 players + 10 bench + ctrl
const G2_players = data.slice(0x18, 0x23);
const G2_bench = data.slice(0x23, 0x2D);
const G2_ctrl = data[0x2D];

console.log('Group 0 (S0-S5, S12-S15):');
console.log('  场上 11 人:', hex(G0_players, 11));
console.log('  阵型控制:', '0x' + G0_ctrl.toString(16).padStart(2,'0'));

console.log('\nGroup 1 (S6-S11):');
console.log('  场上 11 人:', hex(G1_players, 11));
console.log('  阵型控制:', '0x' + G1_ctrl.toString(16).padStart(2,'0'));

console.log('\nGroup 2 (S16+):');
console.log('  场上 11 人:', hex(G2_players, 11));
console.log('  Bench 10人:', hex(G2_bench, 10));
console.log('  阵型控制:', '0x' + G2_ctrl.toString(16).padStart(2,'0'));

// ACE 表 ($AA75 = roster + 0x2E)
console.log('\nACE 球员表:');
for (let s = 0; s < 22; s++) {
    console.log(`  S${s.toString().padStart(2)}: 0x${data[0x2E + s].toString(16).padStart(2,'0')}`);
}

// 关卡表 Bank 00
const bank00 = PRG.slice(0, 0x2000);
const TYPE_OFF = 0x03BA;
const EVENT_OFF = 0x03DC;
const PROG_OFF = 0x03FE;

const STAGES = [
    'S0  南葛中 vs 大友中','S1','S2','S3','S4','S5',
    'S6','S7','S8','S9','S10','S11',
    'S12','S13','S14','S15',
    'S16','S17','S18','S19','S20','S21'
];

console.log('\n关卡配置 (Bank 0 $83BA/$83DC/$83FE):');
console.log('  关卡     | Type | Event | Progress | 阵容组');
for (let s = 0; s < 22; s++) {
    const t = bank00[TYPE_OFF + s];
    const e = bank00[EVENT_OFF + s];
    const p = bank00[PROG_OFF + s];
    let group = 'N/A';
    if (s >= 16) group = 'G2';
    else if (s >= 12) group = 'G0(复用)';
    else if (s >= 6) group = 'G1';
    else group = 'G0';
    if (t | e | p) {
        console.log(`  ${STAGES[s].padEnd(17)} | 0x${t.toString(16).padStart(2)} | 0x${e.toString(16).padStart(2)}  | 0x${p.toString(16).padStart(2)}       | ${group}`);
    }
}

// 解释
console.log('\n类型码: 0x03=常规比赛, 0x01=过场剧情, 0x00=结束/无效');
console.log('Event=0 表示无赛前事件');
