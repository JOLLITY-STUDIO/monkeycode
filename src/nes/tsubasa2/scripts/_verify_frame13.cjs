/**
 * _verify_frame13.cjs — 检查 frame 1-13 H5 端内部状态是否符合 13.log 时序期望
 *
 * emu-reference 没有 frame 1-13, 我们用 13.log 的时序基准 + emu-reference frame-30 的 CHR banks
 * 反推 frame 13 期望状态, 然后核对 H5 端:
 *
 * 期望:
 *   - CHR banks: [0, 1, 2, 3, 0, 0, 0, 0]  (boot task 0 仅装载 CHR0-3)
 *   - Palette BG[0] = $0F (Tecmo logo 黑底)
 *   - OAM 全部隐藏 ($F8)
 *   - NT 至少部分 NT3 行已写 (boot task 2)
 *
 * 实际:
 *   - H5 frame-013 内的 state (OAM/N/Palette/PT) 应该跟这个期望*接近*
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const H5 = path.join(ROOT, 'output', 'ppu-trace');
const EMU = path.join(ROOT, 'output', 'emu-reference');

function loadJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; } }

console.log('═══════════════════════════════════════════════════════════════════');
console.log('FRAME 1-13 时序一致性验证 (H5 vs 期望,13.log 时序基准)');
console.log('═══════════════════════════════════════════════════════════════════\n');

const FRAMES = [1, 5, 9, 13];

for (const f of FRAMES) {
  const dir = path.join(H5, `frame-${String(f).padStart(3, '0')}`);
  if (!fs.existsSync(dir)) { console.log(`frame ${f}: MISSING dir`); continue; }
  console.log(`── frame ${f} ────────────────────────────────────────────`);

  const oam = loadJson(path.join(dir, 'oam.json')) || [];
  const pal = loadJson(path.join(dir, 'palette.json')) || {};
  const nt0 = loadJson(path.join(dir, 'nt0.json')) || {};
  const pt = loadJson(path.join(dir, 'pt.json')) || [];
  const chrSw = loadJson(path.join(dir, 'chr-switches.json')) || {};

  // OAM 状态
  const visible = oam.filter(s => s.y !== 248);
  const hidden = oam.filter(s => s.y === 248);
  console.log(`  OAM: total=${oam.length}  visible=${visible.length}  hidden=${hidden.length}`);
  if (visible.length > 0) {
    console.log(`  First 4 visible sprites:`);
    visible.slice(0, 4).forEach((s, i) => {
      console.log(`    s${s.idx}: y=${s.y} t=$${(s.tile||0).toString(16).padStart(2,'0')} a=$${(s.attr||0).toString(16).padStart(2,'0')} x=${s.x}`);
    });
  }

  // Palette BG/SPR
  console.log(`  Palette BG[0..7]: ${(pal.bg||[]).slice(0,8).map(v=>'$'+v.toString(16).padStart(2,'0')).join(' ')}`);
  console.log(`  Palette SPR[0..7]: ${(pal.spr||[]).slice(0,8).map(v=>'$'+v.toString(16).padStart(2,'0')).join(' ')}`);

  // NT 状态 (有多少非零 tile?)
  const tiles = nt0.tiles || [];
  const nonZero = tiles.filter(t => t !== 0).length;
  console.log(`  NT0: total=${tiles.length}  non-zero=${nonZero}  (boot task 2 应写 NT3 不是 NT0)`);

  // PT 状态
  let ptNonEmpty = 0;
  for (let i = 0; i < 512; i++) {
    const t = pt[i];
    if (!t) continue;
    const hasPixel = t.plane0.some(b => b !== 0) || t.plane1.some(b => b !== 0);
    if (hasPixel) ptNonEmpty++;
  }
  console.log(`  PT: 512 tiles, non-empty=${ptNonEmpty} (CHR 被读 1280 byte 应至少有 ~80 tile 有内容)`);

  // CHR 切换
  const bl = chrSw.bankMapByScanline || [];
  console.log(`  CHR switches: ${bl.length} entries`);
  if (bl.length > 0) {
    bl.slice(0, 3).forEach((b, i) => {
      console.log(`    sc=${b.scanline} banks=[${b.banks.join(',')}]`);
    });
  }
  console.log('');
}

// 与 emu-reference frame-030 对照看 CHR 是否一致
console.log('── 对照: emu-reference frame-030 CHR banks (boot 早期应一致) ──');
const emuChrSw30 = loadJson(path.join(EMU, 'frame-030', 'chr-switches.json'));
if (emuChrSw30) {
  const last = emuChrSw30.bankMapByScanline?.[emuChrSw30.bankMapByScanline.length - 1];
  if (last) console.log(`  emu f030 last sc=${last.scanline} banks=[${last.banks.join(',')}]`);
}
