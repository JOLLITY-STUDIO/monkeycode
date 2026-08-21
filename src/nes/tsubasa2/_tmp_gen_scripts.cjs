const fs = require('fs');
const data = JSON.parse(fs.readFileSync('_tmp_bank_full_bytes.json', 'utf8'));

const SINGLE = {
  0x00:' ', 0x01:'ア',0x02:'イ',0x03:'ウ',0x04:'エ',0x05:'オ',
  0x06:'カ',0x07:'キ',0x08:'ク',0x09:'ケ',0x0a:'コ',0x0b:'サ',0x0c:'シ',0x0d:'ス',0x0e:'セ',0x0f:'ソ',
  0x10:'タ',0x11:'チ',0x12:'ツ',0x13:'テ',0x14:'ト',0x15:'ナ',0x16:'ニ',0x17:'ヌ',0x18:'ネ',0x19:'ノ',
  0x1a:'ハ',0x1b:'ヒ',0x1c:'フ',0x1d:'ヘ',0x1e:'ホ',0x1f:'マ',0x20:'ミ',0x21:'ム',0x22:'メ',0x23:'モ',
  0x24:'ヤ',0x25:'ユ',0x26:'ヨ',0x27:'ラ',0x28:'リ',0x29:'ル',0x2a:'レ',0x2b:'ロ',0x2c:'ワ',0x2d:'ヲ',0x2e:'ン',
  0x2f:'ァ',0x30:'ィ',0x31:'ゥ',0x32:'ェ',
  0x33:'0',0x34:'1',0x35:'2',0x36:'3',0x37:'4',0x38:'5',0x39:'6',0x3a:'7',0x3b:'8',0x3c:'9',
  0x3d:'+',0x3e:'-',0x3f:'.',0x40:'/',
  0x41:'A',0x42:'B',0x43:'C',0x44:'D',0x45:'E',0x46:'F',0x47:'G',0x48:'H',0x49:'I',0x4a:'J',
  0x4b:'K',0x4c:'L',0x4d:'M',0x4e:'N',0x4f:'O',0x50:'P',0x51:'Q',0x52:'R',0x53:'S',0x54:'T',
  0x55:'U',0x56:'V',0x57:'W',0x58:'X',0x59:'Y',0x5a:'Z',
  0x5b:'!',0x5c:'?',0x5d:'、',0x5e:'。',0x5f:'・',
  0x60:'ー',0x61:'、',0x62:'。',0x63:'・',0x64:'：',0x65:'；',0x66:'(',0x67:')',0x68:'「',0x69:'」',
  0x6a:'［',0x6b:'］',0x6c:'『',0x6d:'』',0x6e:'…',0x6f:'〜',0x70:'ー',0x71:'゛',0x72:'゜',0x73:'、',
  0x74:'。',0x75:'・',0x76:'ー',0x77:'＝',0x78:'、',0x79:'・',0x7a:'・',0x7b:'・',0x7c:'…',0x7d:'…',0x7e:'ー',0x7f:'ー',
  0x80:'ヴ',0x81:'ガ',0x82:'ギ',0x83:'グ',0x84:'ゲ',0x85:'ゴ',0x86:'ザ',0x87:'ジ',0x88:'ズ',0x89:'ゼ',
  0x8a:'ゾ',0x8b:'ダ',0x8c:'ヂ',0x8d:'ヅ',0x8e:'デ',0x8f:'ド',0x90:'バ',0x91:'ビ',0x92:'ブ',0x93:'ベ',
  0x94:'ボ',0x95:'パ',0x96:'ピ',0x97:'プ',0x98:'ペ',0x99:'ポ',0x9a:'・',0x9b:'ー',0x9c:'、',0x9d:'。',0x9e:'・',0x9f:'　',
};
const DOUBLE = {
  0xa0:'ガ',0xa1:'ギ',0xa2:'グ',0xa3:'ゲ',0xa4:'ゴ',0xa5:'ザ',0xa6:'ジ',0xa7:'ズ',0xa8:'ゼ',0xa9:'ゾ',
  0xaa:'ダ',0xab:'ヂ',0xac:'ヅ',0xad:'デ',0xae:'ド',0xaf:'バ',0xb0:'ビ',0xb1:'ブ',0xb2:'ベ',0xb3:'ボ',
  0xb4:'パ',0xb5:'ピ',0xb6:'プ',0xb7:'ペ',0xb8:'ポ',
  0xb9:'A',0xba:'B',0xbb:'C',0xbc:'D',0xbd:'E',0xbe:'F',0xbf:'G',0xc0:'H',0xc1:'I',0xc2:'J',
  0xc3:'K',0xc4:'L',0xc5:'M',0xc6:'N',0xc7:'O',0xc8:'P',0xc9:'Q',0xca:'R',0xcb:'S',0xcc:'T',
  0xcd:'U',0xce:'V',0xcf:'W',0xd0:'X',0xd1:'Y',0xd2:'Z',0xd3:'ー',0xd4:'・',0xd5:'・',0xd6:'・',0xd7:'・',
};
function decodeChar(code) {
  if (code < 0xa0) return SINGLE[code] ?? `[${code.toString(16).toUpperCase()}]`;
  return DOUBLE[code] ?? `[${code.toString(16).toUpperCase()}]`;
}

// Fixed operand byte counts for long ops (0xE8-0xFF).
// -1 => variable (reads until $FF). -2 => variable/conditional.
const OPERAND_COUNT = {
  0xe8:1, 0xe9:0, 0xea:0, 0xeb:0, 0xec:-1, 0xed:1, 0xee:0, 0xef:0,
  0xf0:2, 0xf1:2, 0xf2:1, 0xf3:-2, 0xf4:1, 0xf5:-1, 0xf6:1, 0xf7:0,
  0xf8:2, 0xf9:0, 0xfa:1, 0xfb:0, 0xfc:0, 0xfd:0, 0xfe:2, 0xff:0,
};
const LONG_OP_NAMES = {
  0xe8:'tableLoad',0xe9:'fadeIn',0xea:'fadeOut+clear',0xeb:'animSeq',0xec:'textSeq',
  0xed:'findSlot',0xee:'clearText',0xef:'spriteFlip',0xf0:'textPos',0xf1:'textPtr',
  0xf2:'lineLen',0xf3:'palette',0xf4:'subDispatch',0xf5:'setPtr',0xf6:'waitAnim',
  0xf7:'toggle',0xf8:'external',0xf9:'flagBit',0xfa:'sceneLoad',0xfb:'clearBuf',
  0xfc:'vramAdvance',0xfd:'fillWait',0xfe:'jump',0xff:'end',
};

const CONFIG = { bank03: 0x10, bank04: 0x10, bank05: 0x40, bank06: 0x06 };
const outFiles = {};

for (const bank of ['bank03','bank04','bank05','bank06']) {
  const arr = data[bank];
  const count = CONFIG[bank];
  const bankNum = parseInt(bank.slice(4), 10);
  const scripts = [];
  for (let i = 0; i < count; i++) {
    const absPtr = (arr[i*2+1] << 8) | arr[i*2];
    const start = absPtr - 0xa000;
    let end;
    if (i + 1 < count) {
      end = (((arr[(i+1)*2+1]) << 8) | arr[(i+1)*2]) - 0xa000;
    } else { end = arr.length; }
    if (end <= start) end = arr.length;

    const instructions = [];
    let text = '';
    let p = start;
    const MAX = Math.min(end, arr.length);
    while (p < MAX) {
      const code = arr[p];
      if (code < 0xd8) {
        const ch = decodeChar(code);
        text += ch;
        instructions.push({ opcode: code, type: 'text', text: ch });
        p++;
      } else if (code < 0xe0) {
        instructions.push({ opcode: code, type: 'wait', operand: code - 0xd8 });
        text += '　'; p++;
      } else if (code < 0xe8) {
        instructions.push({ opcode: code, type: 'line_edit' }); p++;
      } else {
        const name = LONG_OP_NAMES[code] ?? 'op' + code.toString(16).toUpperCase();
        const op = { opcode: code, type: 'long_op', note: name };
        instructions.push(op);
        p++;
        if (code === 0xff) break;
        const oc = OPERAND_COUNT[code];
        if (oc === -1) { // variable: read until $FF
          while (p < MAX && arr[p] !== 0xff) p++;
          if (p < MAX) p++; // consume $FF
        } else if (oc === -2) { // palette: 0/1/2 operand bytes depending on first
          // heuristic: $F3 followed by param
          if (p < MAX) p++;
          const a = arr[p-1];
          if (a === 0xff || a === 0x80 || (a & 0x80) || a === 0) {
            // 0xff: 2 more params; 0x80-bit or small: 0 more after; 0: 0
            if (a === 0xff) { if (p+1 < MAX) p += 2; }
          } else {
            if (p < MAX) p++;
          }
        } else {
          for (let k = 0; k < oc && p < MAX; k++) p++;
        }
      }
    }
    scripts.push({
      id: i, idHex: '0x' + i.toString(16).padStart(2,'0').toUpperCase(),
      bank: bankNum, entryAddr: start, instructions, text,
    });
  }
  outFiles[bank] = scripts;
}

const dir = 'src/game/prg/data/scene/textscript';
for (const bank of ['bank03','bank04','bank05','bank06']) {
  const scripts = outFiles[bank];
  const bankNum = parseInt(bank.slice(4), 10);
  const bankLabel = 'SCRIPT_BANK_0' + bankNum;
  const bankIdLabel = 'SCRIPT_BANK_0' + bankNum + '_BYTES';
  const bytesArr = data[bank];
  const bytesLines = [];
  for (let bi = 0; bi < bytesArr.length; bi += 32) {
    bytesLines.push(bytesArr.slice(bi, bi + 32).join(','));
  }
  const bytesBody = bytesLines.join(',\n');
  const scriptTs = scripts.map((s) => {
    return `  {\n    id: ${s.id},\n    idHex: '${s.idHex}',\n    bank: ${s.bank},\n    entryAddr: 0x${s.entryAddr.toString(16).toUpperCase()},\n    instructions: [\n${s.instructions.map((ins) => {
      const parts = [`opcode: 0x${ins.opcode.toString(16).padStart(2,'0').toUpperCase()}`, `type: '${ins.type}'`];
      if (ins.operand !== undefined) parts.push(`operand: ${ins.operand}`);
      if (ins.note) parts.push(`note: '${ins.note}'`);
      if (ins.text !== undefined) parts.push(`text: '${ins.text.replace(/'/g,"\\'")}'`);
      return `      { ${parts.join(', ')} }`;
    }).join(',\n')}\n    ],\n    text: '${s.text.replace(/'/g,"\\'")}',\n  }`;
  }).join(',\n');
  const ts = `/**\n * ${bankLabel} — bank${bankNum} 剧情脚本数据 ($A000-$BFFF 窗口)\n *\n * 每个脚本一条 JSON: instructions 数组 (指令流语义) + text 字段 (可读日文)。\n * 由 asm/${bank}/_full.s 逐字节解析 (脚本入口指针表 → 指令流)。\n *\n * 指令分类:\n *   opcode < 0xD8  文本字符 (单/双 tile)\n *   0xD8-0xDF      等待帧\n *   0xE1-0xE7      行编辑\n *   0xE8-0xFF      长指令\n *\n * text 字段为脚本文本区解码的可读日文 (逐字符映射 char-map-table)。\n * 这是脚本翻译层最终产物, 禁止对 PRG_BANK 原始字节随机访问。\n */\nimport type { ScriptDataJson } from './script-types';\n\n/** bank${bankNum} 全部脚本 (index = 脚本 id) */\nexport const ${bankLabel}: readonly ScriptDataJson[] = [\n${scriptTs},\n];\n\n/** bank${bankNum} 原始字节 (供 ScriptLoader 指令流解码, 禁止随机地址访问) */\nexport const ${bankIdLabel}: readonly number[] = [\n${bytesBody}\n];\n\nexport default ${bankLabel};\n`;
  fs.writeFileSync(`${dir}/scripts-bank-0${bankNum}.ts`, ts);
  console.log('wrote', `${dir}/scripts-bank-0${bankNum}.ts`);
}
// remove old wrong-named files
for (const n of [3,4,5,6]) {
  const p = `${dir}/scripts-bank-${n}.ts`;
  if (fs.existsSync(p)) fs.unlinkSync(p);
}
console.log('DONE');
