// 通用转换: bank04/05/06 旧 JSON + BYTES → 按场景段拆分的扁平格式
const fs = require('fs');
const path = require('path');

const OP_NAMES = {
  0xE8:'tableLoad',0xE9:'fadeIn',0xEA:'fadeOutClear',0xEB:'animSeq',0xEC:'textSeq',
  0xED:'findSlot',0xEE:'clearText',0xEF:'spriteFlip',0xF0:'textPos',0xF1:'textPtr',
  0xF2:'lineLen',0xF3:'palette',0xF4:'subDispatch',0xF5:'setPtr',0xF6:'waitAnim',
  0xF7:'toggle',0xF8:'external',0xF9:'flagBit',0xFA:'sceneLoad',0xFB:'clearBuf',
  0xFC:'vramAdvance',0xFD:'fillWait',0xFE:'jump',0xFF:'end',
};
const OP_OPERANDS = {
  0xE8:1, 0xE9:0, 0xEA:0, 0xEB:0, 0xEC:2, 0xED:0, 0xEE:0, 0xEF:0,
  0xF0:2, 0xF1:2, 0xF2:1, 0xF3:1, 0xF4:1, 0xF5:1, 0xF6:1, 0xF7:0,
  0xF8:2, 0xF9:0, 0xFA:1, 0xFB:0, 0xFC:0, 0xFD:0, 0xFE:2, 0xFF:0,
};
const WAIT_FRAMES = [1,10,20,40,60,80,120,240];
const CHAR_MAP = {
  0x00:' ',0x01:'ア',0x02:'イ',0x03:'ウ',0x04:'エ',0x05:'オ',0x06:'カ',0x07:'キ',
  0x08:'ク',0x09:'ケ',0x0A:'コ',0x0B:'サ',0x0C:'シ',0x0D:'ス',0x0E:'セ',0x0F:'ソ',
  0x10:'タ',0x11:'チ',0x12:'ツ',0x13:'テ',0x14:'ト',0x15:'ナ',0x16:'ニ',0x17:'ヌ',
  0x18:'ネ',0x19:'ノ',0x1A:'ハ',0x1B:'ヒ',0x1C:'フ',0x1D:'ヘ',0x1E:'ホ',0x1F:'マ',
  0x20:'ヤ',0x21:'ユ',0x22:'ヨ',0x23:'ラ',0x24:'リ',0x25:'ル',0x26:'レ',0x27:'ロ',
  0x28:'ワ',0x29:'ン',0x2A:'゛',0x2B:'゜',0x2C:'ー',0x2D:'ッ',0x2E:'、',0x2F:'。',
  0x30:'0',0x31:'1',0x32:'2',0x33:'3',0x34:'4',0x35:'5',0x36:'6',0x37:'7',
  0x38:'8',0x39:'9',0x3A:'A',0x3B:'B',0x3C:'C',0x3D:'D',0x3E:'E',0x3F:'F',
  0x40:'G',0x41:'H',0x42:'I',0x43:'J',0x44:'K',0x45:'L',0x46:'M',0x47:'N',
  0x48:'O',0x49:'P',0x4A:'Q',0x4B:'R',0x4C:'S',0x4D:'T',0x4E:'U',0x4F:'V',
  0x50:'W',0x51:'X',0x52:'Y',0x53:'Z',
};

function parseInstrs(bytes, start, end) {
  const instrs = [];
  let i = start;
  while (i < end) {
    const b = bytes[i];
    if (b === undefined) break;
    if (b < 0xD8) {
      const s = i;
      while (i < end && bytes[i] < 0xD8) i++;
      instrs.push({ type:'text', bytes: bytes.slice(s, i) });
    } else if (b >= 0xD8 && b <= 0xDF) {
      instrs.push({ type:'wait', bytes:[b], val: WAIT_FRAMES[b-0xD8] });
      i++;
    } else if (b >= 0xE1 && b <= 0xE7) {
      instrs.push({ type:'lineEdit', bytes:[b] });
      i++;
    } else if (b >= 0xE8) {
      const name = OP_NAMES[b] || '?';
      const n = OP_OPERANDS[b] !== undefined ? OP_OPERANDS[b] : 0;
      const ops = [];
      for (let j = 1; j <= n && i+j < end; j++) ops.push(bytes[i+j]);
      instrs.push({ type:'longOp', bytes:[b,...ops], op:b, name, operands:ops });
      i += 1 + n;
    } else { i++; }
  }
  return instrs;
}

function splitScenes(instrs) {
  const scenes = [];
  let cur = [];
  for (const ins of instrs) {
    cur.push(ins);
    if (ins.type === 'longOp' && (ins.op === 0xFA || ins.op === 0xFE || ins.op === 0xFF)) {
      scenes.push(cur);
      cur = [];
    }
  }
  if (cur.length > 0) scenes.push(cur);
  return scenes;
}

function instrComment(ins) {
  if (ins.type === 'text') {
    const txt = ins.bytes.map(b=>CHAR_MAP[b]||'?').join('');
    return `"${txt}"`;
  }
  if (ins.type === 'wait') return `wait(${ins.val}帧)`;
  if (ins.type === 'lineEdit') return `lineEdit(0x${ins.bytes[0].toString(16)})`;
  if (ins.type === 'longOp') {
    const ops = ins.operands.map(o=>'0x'+o.toString(16)).join(',');
    return `$${ins.op.toString(16).toUpperCase()} ${ins.name}(${ops})`;
  }
  return '?';
}

// 从 asm 提取 bank 原始字节
function readBankBytes(bankNum) {
  const bn = String(bankNum).padStart(2,'0');
  const bytes = [];
  for (const f of ['data_tables.s','data_maps.s','data_tail.s']) {
    const p = path.join('asm/bank'+bn, f);
    if (!fs.existsSync(p)) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
    for (const l of lines) {
      const m = l.match(/\.byte\s+(.+)/);
      if (!m) continue;
      for (const v of m[1].split(',').map(s=>s.trim())) {
        const bm = v.match(/^\$?([0-9A-Fa-f]{2})$/);
        if (bm) bytes.push(parseInt(bm[1],16));
      }
    }
  }
  return bytes;
}

// 从旧 JSON 文件提取脚本数 + entryAddr
function readOldScripts(bankNum) {
  const bn = String(bankNum).padStart(2,'0');
  const src = fs.readFileSync(`src/game/prg/data/scene/textscript/scripts-bank-${bn}.ts`,'utf8');
  const scripts = [];
  const re = /id:\s*(\d+),\s*idHex:\s*'([^']+)',\s*bank:\s*(\d+),\s*entryAddr:\s*(0x[0-9a-fA-F]+)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    scripts.push({ id: +m[1], idHex: m[2], entryAddr: parseInt(m[3]) });
  }
  return scripts;
}

function convert(bankNum) {
  const bn = String(bankNum).padStart(2,'0');
  console.log(`\n=== bank${bankNum} ===`);
  const bytes = readBankBytes(bankNum);
  console.log(`字节: ${bytes.length}`);
  
  // 从入口指针表提取脚本数和 entryAddr
  // bank03/04/05: 入口表在 offset 0; bank06: 也是
  // 但脚本数不同: bank3=16, bank4=16, bank5=64, bank6=剩余
  // 用旧 JSON 的脚本数和 entryAddr 更可靠
  const oldScripts = readOldScripts(bankNum);
  console.log(`旧 JSON 脚本数: ${oldScripts.length}`);
  
  // 如果旧 JSON 没找到, 从入口表推 (前 16/16/64 项)
  let scripts;
  if (oldScripts.length > 0) {
    scripts = oldScripts;
  } else {
    // 默认 16 个
    scripts = [];
    for (let i = 0; i < 16; i++) {
      const ptr = (bytes[i*2+1] << 8) | bytes[i*2];
      scripts.push({ id:i, idHex:'0x'+i.toString(16).padStart(2,'0'), entryAddr: ptr - 0xA000 });
    }
  }
  
  const out = [];
  out.push('/**');
  out.push(` * SCRIPTS_BANK_${bn} — bank${bankNum} 剧情脚本 ($A000-$BFFF 窗口)`);
  out.push(` * @bank ${bn}`);
  out.push(' *');
  out.push(' * 按场景段拆分: 每个脚本 = 多个场景段, 每段一个 readonly number[]。');
  out.push(' * 场景段边界 = sceneLoad(0xFA) / jump(0xFE) / end(0xFF)。');
  out.push(' * ScriptEngine 按场景段推进, 每段 = 指令 + 文本 + 特效。');
  out.push(' *');
  out.push(' * 指令分类:');
  out.push(' *   < 0xD8       文本字符');
  out.push(' *   0xD8-0xDF    等待帧');
  out.push(' *   0xE1-0xE7    行编辑');
  out.push(' *   0xE8-0xFF    长指令 (带 operand)');
  out.push(' */');
  out.push('');
  
  const allScriptScenes = [];
  let totalScenes = 0;
  for (let s = 0; s < scripts.length; s++) {
    const sc = scripts[s];
    const start = sc.entryAddr;
    const end = s+1 < scripts.length ? scripts[s+1].entryAddr : bytes.length;
    if (start >= bytes.length) { console.log(`  脚本${sc.idHex} entryAddr=${start} 超出,跳过`); continue; }
    const instrs = parseInstrs(bytes, start, end);
    const scenes = splitScenes(instrs);
    totalScenes += scenes.length;
    out.push(`// ═══ 脚本 ${sc.idHex} (entryAddr=0x${start.toString(16)}, ${end-start}B, ${scenes.length}个场景段) ═══`);
    const sceneNames = [];
    for (let si = 0; si < scenes.length; si++) {
      const sceneInstrs = scenes[si];
      const sceneBytes = sceneInstrs.flatMap(ins => ins.bytes);
      const name = `SCRIPT_${sc.idHex}_SCENE_${si}`;
      sceneNames.push(name);
      out.push(`/** ${name} — 场景段${si} (${sceneBytes.length}B) */`);
      out.push(`export const ${name}: readonly number[] = [`);
      for (const ins of sceneInstrs) {
        const hex = ins.bytes.map(b=>'0x'+b.toString(16).padStart(2,'0')).join(', ');
        out.push(`  ${hex},  // ${instrComment(ins)}`);
      }
      out.push(`];`);
      out.push('');
    }
    out.push(`/** 脚本 ${sc.idHex} 的场景段列表 */`);
    out.push(`export const SCRIPT_${sc.idHex}: readonly (readonly number[])[] = [`);
    for (const n of sceneNames) out.push(`  ${n},`);
    out.push(`];`);
    out.push('');
    allScriptScenes.push(`SCRIPT_${sc.idHex}`);
  }
  
  out.push(`/** bank${bankNum} 全部脚本 (index = 脚本 id, 每项 = 场景段数组) */`);
  out.push(`export const SCRIPTS_BANK_${bn}: readonly (readonly (readonly number[])[])[] = [`);
  for (const n of allScriptScenes) out.push(`  ${n},`);
  out.push('];');
  out.push('');
  
  // 保留 BYTES
  out.push(`/** bank${bankNum} 原始字节 (入口指针表 + 脚本流, 供 ScriptLoader 解析入口) */`);
  out.push(`export const SCRIPT_BANK_${bn}_BYTES: readonly number[] = [`);
  for (let i = 0; i < bytes.length; i += 16) {
    out.push(`  ${bytes.slice(i, i+16).join(', ')},`);
  }
  out.push('];');
  out.push('');
  out.push(`export default SCRIPTS_BANK_${bn};`);
  
  fs.writeFileSync(`src/game/prg/data/scene/textscript/scripts-bank-${bn}.ts`, out.join('\n'));
  console.log(`生成: ${out.length} 行, ${scripts.length} 脚本, ${totalScenes} 场景段`);
}

// bank04: id 0x10-0x1F (16个), bank05: id 0x20-0x5F (64个), bank06: id 0x60+ 
// 但旧 JSON 的 id 是相对 bank 内的 (0-based), entryAddr 是 bank 内偏移
convert(4);
convert(5);
convert(6);
console.log('\n全部完成');
