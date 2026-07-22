/**
 * 对比 jsNes CPU/PPU trace vs disasm CPU/PPU trace
 * 用法: node scripts/_cmp_trace.mjs
 * 
 * 读取:
 *   test_output/opening_jsnes_4500_trace.json   (jsNes 参考)
 *   test_output/opening_jsnes_ppu.json          (jsNes PPU 参考)
 *   test_output/opening_disasm_cpu.json         (disasm CPU 输出)
 *   test_output/opening_disasm_ppu.json         (disasm PPU 输出)
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const out = join(root, 'test_output');

const h2 = v => v.toString(16).padStart(2,'0');
const h4 = v => v.toString(16).padStart(4,'0');

// ─── 加载 JSON ────────────────────────────────────────────────
function load(path) {
  if (!existsSync(path)) {
    console.log(`  [SKIP] 文件不存在: ${path}`);
    return null;
  }
  return JSON.parse(readFileSync(path, 'utf8'));
}

const jsnes_cpu = load(join(out, 'opening_jsnes_4500_trace.json'));
const jsnes_ppu = load(join(out, 'opening_jsnes_ppu.json'));
const disasm_cpu = load(join(out, 'opening_disasm_cpu.json'));
const disasm_ppu = load(join(out, 'opening_disasm_ppu.json'));

// ─── CPU 逐帧对比 ────────────────────────────────────────────
if (jsnes_cpu && disasm_cpu) {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  CPU trace 对比 (z26/z27/z4A/z4B/z4C)');
  console.log('═══════════════════════════════════════════════════════');

  const jsnesFrames = jsnes_cpu.frames;
  const disasmFrames = disasm_cpu.frames;
  const minLen = Math.min(jsnesFrames.length, disasmFrames.length);

  let firstDiff = -1;
  let diffCount = 0;
  const showFirst = 20;

  for (let i = 0; i < minLen; i++) {
    const j = jsnesFrames[i];
    const d = disasmFrames[i];
    const keys = ['z26','z27','z4A','z4B','z4C'];
    const diffs = keys.filter(k => j[k] !== d[k]);

    if (diffs.length > 0) {
      diffCount++;
      if (firstDiff < 0) firstDiff = i;

      if (diffCount <= showFirst) {
        console.log(`  F${i.toString().padStart(4)}  DIFF [${diffs.join(',')}]:  jsNes=${h2(j.z26)}${h2(j.z27)}${h2(j.z4A)}${h2(j.z4B)}${h2(j.z4C)}  disasm=${h2(d.z26)}${h2(d.z27)}${h2(d.z4A)}${h2(d.z4B)}${h2(d.z4C)}`);
      }
    }
  }

  if (diffCount === 0) {
    console.log(`  ✅ 全部 ${minLen} 帧 CPU 状态完全一致!`);
  } else {
    console.log(`\n  共 ${diffCount}/${minLen} 帧不一致, 首次分叉: F${firstDiff}`);
  }

  // 场景变化对比
  if (jsnes_cpu.sceneChanges && disasm_cpu.sceneChanges) {
    const jSc = jsnes_cpu.sceneChanges;
    const dSc = disasm_cpu.sceneChanges;
    console.log(`\n  --- 场景切换对比 ---`);
    console.log(`  jsNes: ${jSc.length} 次切换, disasm: ${dSc.length} 次切换`);

    const maxSc = Math.max(jSc.length, dSc.length);
    for (let i = 0; i < Math.min(maxSc, 30); i++) {
      const j = jSc[i] || {};
      const d = dSc[i] || {};
      console.log(`  #${i.toString().padStart(2)}  jsNes: F${String(j.frame||'-').padStart(4)} ${j.scene||'--'} ${j['$4C']||'--'}   disasm: F${String(d.frame||'-').padStart(4)} ${d.scene||'--'} ${d['$4C']||'--'}`);
    }
  }

  // $4C 变化对比
  if (jsnes_cpu['$4C_changes'] && disasm_cpu['$4C_changes']) {
    const j4c = jsnes_cpu['$4C_changes'];
    const d4c = disasm_cpu['$4C_changes'];
    console.log(`\n  --- $4C 变化对比 ---`);
    console.log(`  jsNes: ${j4c.length} 次变化`);
    j4c.forEach(c => console.log(`    F${String(c.frame).padStart(4)}  ${c['$4C']}  ${c.scene}`));
    console.log(`  disasm: ${d4c.length} 次变化`);
    d4c.forEach(c => console.log(`    F${String(c.frame).padStart(4)}  ${c['$4C']}  ${c.scene}`));
  }
}

// ─── PPU 对比 (关键帧) ───────────────────────────────────────
if (jsnes_ppu && disasm_ppu) {
  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`  PPU trace 对比 (palette / reg / CPU状态)`);
  console.log(`═══════════════════════════════════════════════════════`);

  const jFrames = jsnes_ppu.frames;
  const dFrames = disasm_ppu.frames;

  // Build map by frame
  const dMap = {};
  dFrames.forEach(f => dMap[f.frame] = f);

  let ppuMatches = 0, ppuDiffs = 0;
  for (const jf of jFrames) {
    const df = dMap[jf.frame];
    if (!df) continue;

    const jp = jf.ppu;
    const dp = df.ppu;

    // 调色板对比
    const palMatch = jp.imgPalette === dp.imgPalette && jp.sprPalette === dp.sprPalette;

    if (palMatch) {
      ppuMatches++;
    } else {
      ppuDiffs++;
      if (ppuDiffs <= 5) {
        console.log(`\n  F${jf.frame.toString().padStart(4)} PPU DIFF:`);
        console.log(`    cpu:  jsNes z4C=${h2(jf.cpu.z4C)} z26=${h2(jf.cpu.z26)}  disasm z4C=${h2(df.cpu.z4C)} z26=${h2(df.cpu.z26)}`);
        console.log(`    mask: jsNes=$${h2(jp.reg.mask)}  disasm=$${h2(dp.reg.mask)}`);
        console.log(`    imgPal: jsNes nz=${jp.imgPalNonZero}/16  disasm nz=${dp.imgPalNonZero}/16`);
        console.log(`    sprPal: jsNes nz=${jp.sprPalNonZero}/16  disasm nz=${dp.sprPalNonZero}/16`);
        // 只显示前 8 字节的调色板差异
        const imgjs = jp.imgPalette.slice(0,16);
        const imgds = dp.imgPalette.slice(0,16);
        for (let i = 0; i < 8; i++) {
          if (imgjs[i] !== imgds[i]) {
            console.log(`    imgPal[${i}]: jsNes=$${h2(parseInt(imgjs[i],16)|0)} disasm=$${h2(parseInt(imgds[i],16)|0)}`);
          }
        }
      }
    }
  }
  console.log(`\n  PPU 关键帧对比: ${ppuMatches} 一致 / ${ppuDiffs} 差异`);

} else {
  if (!disasm_ppu) {
    console.log(`\n  [提示] opening_disasm_ppu.json 不存在，无法对比 PPU`);
    console.log(`  请先运行: npx tsx scripts/_trace_opening_disasm.ts`);
  }
}

console.log(`\nDone.`);
