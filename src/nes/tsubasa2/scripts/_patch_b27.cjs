const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank27-data.ts';
let c = fs.readFileSync(p, 'utf8');
const oldFn = `/** 读 bank27 原始字节
(CPU 地址) */
export function readB27(cpuAddr: number): number {
  const off = cpuAddr - B27_CPU_BASE;
  return off >= 0 && off < B27_DATA.length ? B27_DATA[off] : 0;
}`;
const newFn = `/**
 * 读 bank27 原始字节 (CPU 地址)
 *
 * bank27 代码经 $A000-$BFFF 窗口访问本 bank 的表数据
 * (物理偏移 = cpuAddr - 0xA000), 与 $8000-$9FFF 窗口同源。
 */
export function readB27(cpuAddr: number): number {
  let off = cpuAddr - B27_CPU_BASE;
  if (cpuAddr >= 0xA000) off = cpuAddr - 0xA000;
  return off >= 0 && off < B27_DATA.length ? B27_DATA[off] : 0;
}`;
if (!c.includes(oldFn)) {
  console.log('oldFn NOT found');
  console.log(JSON.stringify(c.slice(c.indexOf('export function readB27') - 40, c.indexOf('export function readB27') + 200)));
  process.exit(1);
}
c = c.replace(oldFn, newFn);
fs.writeFileSync(p, c);
console.log('patched OK');
