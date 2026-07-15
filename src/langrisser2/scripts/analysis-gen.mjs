import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', '20260713', 'Langrisser2-68k');
const ANALYSIS_DIR = path.join(OUT_DIR, 'analysis');
const GHIDRA_FILE = path.join(__dirname, '..', 'ghidra-decompile.c');

fs.mkdirSync(ANALYSIS_DIR, { recursive: true });

const ghidraCode = fs.readFileSync(GHIDRA_FILE, 'utf8');

const funcRegex = /^void FUN_([0-9A-Fa-f]{8})\(void\)/gm;
const funcs = [];
let match;
while ((match = funcRegex.exec(ghidraCode)) !== null) {
  const addr = parseInt(match[1], 16);
  funcs.push({ addr, name: match[0] });
}
funcs.sort((a, b) => a.addr - b.addr);

const codeFiles = fs.readdirSync(path.join(OUT_DIR, 'code'));
const codeSegs = codeFiles
  .filter(f => f.endsWith('.asm'))
  .map(f => {
    const match = f.match(/code-(\d+)-\$([0-9A-Fa-f]{6})-\$([0-9A-Fa-f]{6})\.asm/);
    if (!match) return null;
    return {
      idx: parseInt(match[1]),
      start: parseInt(match[2], 16),
      end: parseInt(match[3], 16),
      fname: f,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.start - b.start);

codeSegs.forEach(seg => {
  const segFuncs = funcs.filter(f => f.addr >= seg.start && f.addr <= seg.end);
  
  const lines = [];
  lines.push('# Code Segment Analysis Report');
  lines.push('');
  lines.push(`## Segment: code-${String(seg.idx).padStart(2, '0')}`);
  lines.push('');
  lines.push(`- **Address Range**: \\$${seg.start.toString(16).toUpperCase().padStart(6, '0')} - \\$${seg.end.toString(16).toUpperCase().padStart(6, '0')}`);
  lines.push(`- **Size**: ${seg.end - seg.start} bytes`);
  lines.push(`- **Code File**: [code/${seg.fname}](../code/${seg.fname})`);
  lines.push('');
  
  if (segFuncs.length > 0) {
    lines.push('## Functions in this Segment');
    lines.push('');
    lines.push('| Address | Ghidra Name | Status | Purpose |');
    lines.push('|---------|-------------|--------|---------|');
    
    segFuncs.forEach(f => {
      let status = 'unknown';
      let purpose = '';
      
      if (f.addr === 0x00800A) { status = 'entry'; purpose = 'Reset入口 - 系统初始化'; }
      else if (f.addr === 0x0082B4) { status = 'entry'; purpose = 'VBLANK中断 - 60Hz主心跳'; }
      else if (f.addr === 0x0084B8) { status = 'entry'; purpose = 'HBLANK中断'; }
      else if (f.addr === 0x00C936) { status = 'entry'; purpose = 'Scene_Init - 场景初始化'; }
      
      lines.push(`| \\$${f.addr.toString(16).toUpperCase().padStart(8, '0')} | ${f.name} | ${status} | ${purpose} |`);
    });
    lines.push('');
    
    lines.push('## Call Graph');
    lines.push('');
    lines.push('### Called By (TODO)');
    lines.push('');
    lines.push('*Needs manual analysis*');
    lines.push('');
    lines.push('### Calls (TODO)');
    lines.push('');
    lines.push('*Needs manual analysis*');
    lines.push('');
    
    lines.push('## Registers Used (TODO)');
    lines.push('');
    lines.push('*Needs manual analysis*');
    lines.push('');
    
    lines.push('## Variables (TODO)');
    lines.push('');
    lines.push('*Needs manual analysis*');
    lines.push('');
    
    lines.push('## Function Purpose Summary (TODO)');
    lines.push('');
    lines.push('*Needs manual analysis*');
  } else {
    lines.push('## Functions in this Segment');
    lines.push('');
    lines.push('*No ghidra functions found in this segment*');
  }
  
  const reportFile = path.join(ANALYSIS_DIR, `code-${String(seg.idx).padStart(2, '0')}-analysis.md`);
  fs.writeFileSync(reportFile, lines.join('\n'));
  console.log(`Generated: ${reportFile}`);
});

console.log(`\nGenerated ${codeSegs.length} analysis reports`);
