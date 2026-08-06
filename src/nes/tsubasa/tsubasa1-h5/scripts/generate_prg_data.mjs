/**
 * 生成 prg_data.ts — 从 prg_bulk.json 转换
 * 解决微信小程序无法直接 import JSON 的问题
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PRG_BULK = join(PROJECT_ROOT, 'src', 'data', 'raw', 'prg_bulk.json');
const OUTPUT = join(PROJECT_ROOT, 'src', 'data', 'raw', 'prg_bank_data.ts');

const bulk = JSON.parse(readFileSync(PRG_BULK, 'utf-8'));

const lines = [];
lines.push(`/**`);
lines.push(` * PRG Bank 数据 — 自动生成`);
lines.push(` * 从 prg_bulk.json 转换，用于微信小程序环境`);
lines.push(` * 生成时间: ${new Date().toISOString()}`);
lines.push(` */`);
lines.push(``);
lines.push(`export const PRG_BANK_BASE64: Record<number, string> = {`);

for (const entry of bulk) {
  const { bankId, base64 } = entry;
  // 截断长字符串用于可读性
  const preview = base64.substring(0, 40);
  lines.push(`  ${bankId}: /* ${preview}... */`);
  lines.push(`    '${base64}',`);
}

lines.push(`};`);
lines.push(``);
lines.push(`/** 初始化所有PRG Bank到PrgLoader */`);
lines.push(`export function loadAllPrgBanks(loadFn: (bankId: number, data: Uint8Array) => void): void {`);
lines.push(`  for (const [bankIdStr, base64] of Object.entries(PRG_BANK_BASE64)) {`);
lines.push(`    const bankId = parseInt(bankIdStr, 10);`);
lines.push(`    const binary = atob(base64);`);
lines.push(`    const data = new Uint8Array(binary.length);`);
lines.push(`    for (let i = 0; i < binary.length; i++) {`);
lines.push(`      data[i] = binary.charCodeAt(i);`);
lines.push(`    }`);
lines.push(`    loadFn(bankId, data);`);
lines.push(`  }`);
lines.push(`}`);

const output = lines.join('\n');
writeFileSync(OUTPUT, output, 'utf-8');
const sizeMB = (output.length / 1024 / 1024).toFixed(2);
console.log(`✅ 生成 ${OUTPUT} (${sizeMB} MB)`);
