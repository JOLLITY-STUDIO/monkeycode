/**
 * _ram_dump.ts — 在 H5 frame 30 时打印关键 RAM 字节（$0075/$0076/$005D/$0048）
 * 用法：node scripts/_ram_dump.cjs
 */
import * as fs from 'fs';
import * as path from 'path';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot();

const FRAMES = 30;
for (let i = 0; i < FRAMES; i++) {
  game.frame(runtime);
}

const store: any = (game as any).store;
const dump = (a: number[]) => a.map(b => '0x' + b.toString(16).padStart(2, '0')).join(' ');
console.log('=== frame 30 RAM dump ===');
console.log('$0022 (chrSelBase): 0x' + store.readByte(0x0022).toString(16).padStart(2, '0'));
console.log('$0048:             0x' + store.readByte(0x0048).toString(16).padStart(2, '0'));
console.log('$005B:             0x' + store.readByte(0x005B).toString(16).padStart(2, '0'));
console.log('$005C:             0x' + store.readByte(0x005C).toString(16).padStart(2, '0'));
console.log('$005D:             0x' + store.readByte(0x005D).toString(16).padStart(2, '0'));
console.log('$005E:             0x' + store.readByte(0x005E).toString(16).padStart(2, '0'));
console.log('$005F:             0x' + store.readByte(0x005F).toString(16).padStart(2, '0'));
console.log('$0075:             0x' + store.readByte(0x0075).toString(16).padStart(2, '0'));
console.log('$0076:             0x' + store.readByte(0x0076).toString(16).padStart(2, '0'));
console.log('$0077:             0x' + store.readByte(0x0077).toString(16).padStart(2, '0'));
console.log('$007A:             0x' + store.readByte(0x007A).toString(16).padStart(2, '0'));
console.log('$007C-$008D (scene3 tbl):',
  dump([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(i => store.readByte(0x007C + i))));
