/**
 * 簡易 6502 反匯編器 - 逐行解析版
 * 用法: node tools/disasm_hex_blocks.mjs 01 [bank_number]
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ADDR_IMPL=0,ADDR_IMM=1,ADDR_ZP=2,ADDR_ZPX=3,ADDR_ZPY=4;
const ADDR_REL=5,ADDR_ABS=6,ADDR_ABSX=7,ADDR_ABSY=8;
const ADDR_IND=9,ADDR_INDX=10,ADDR_INDY=11,ADDR_ACC=12;

const MAP={
  0xA9:{m:'LDA',d:ADDR_IMM,s:2},0xA5:{m:'LDA',d:ADDR_ZP,s:2},0xB5:{m:'LDA',d:ADDR_ZPX,s:2},
  0xAD:{m:'LDA',d:ADDR_ABS,s:3},0xBD:{m:'LDA',d:ADDR_ABSX,s:3},0xB9:{m:'LDA',d:ADDR_ABSY,s:3},
  0xA1:{m:'LDA',d:ADDR_INDX,s:2},0xB1:{m:'LDA',d:ADDR_INDY,s:2},
  0xA2:{m:'LDX',d:ADDR_IMM,s:2},0xA6:{m:'LDX',d:ADDR_ZP,s:2},0xB6:{m:'LDX',d:ADDR_ZPY,s:2},
  0xAE:{m:'LDX',d:ADDR_ABS,s:3},0xBE:{m:'LDX',d:ADDR_ABSY,s:3},
  0xA0:{m:'LDY',d:ADDR_IMM,s:2},0xA4:{m:'LDY',d:ADDR_ZP,s:2},0xB4:{m:'LDY',d:ADDR_ZPX,s:2},
  0xAC:{m:'LDY',d:ADDR_ABS,s:3},0xBC:{m:'LDY',d:ADDR_ABSX,s:3},
  0x85:{m:'STA',d:ADDR_ZP,s:2},0x95:{m:'STA',d:ADDR_ZPX,s:2},0x8D:{m:'STA',d:ADDR_ABS,s:3},
  0x9D:{m:'STA',d:ADDR_ABSX,s:3},0x99:{m:'STA',d:ADDR_ABSY,s:3},
  0x81:{m:'STA',d:ADDR_INDX,s:2},0x91:{m:'STA',d:ADDR_INDY,s:2},
  0x86:{m:'STX',d:ADDR_ZP,s:2},0x96:{m:'STX',d:ADDR_ZPY,s:2},0x8E:{m:'STX',d:ADDR_ABS,s:3},
  0x84:{m:'STY',d:ADDR_ZP,s:2},0x94:{m:'STY',d:ADDR_ZPX,s:2},0x8C:{m:'STY',d:ADDR_ABS,s:3},
  0xAA:{m:'TAX',d:ADDR_IMPL,s:1},0xA8:{m:'TAY',d:ADDR_IMPL,s:1},0x8A:{m:'TXA',d:ADDR_IMPL,s:1},
  0x98:{m:'TYA',d:ADDR_IMPL,s:1},0xBA:{m:'TSX',d:ADDR_IMPL,s:1},0x9A:{m:'TXS',d:ADDR_IMPL,s:1},
  0x48:{m:'PHA',d:ADDR_IMPL,s:1},0x08:{m:'PHP',d:ADDR_IMPL,s:1},0x68:{m:'PLA',d:ADDR_IMPL,s:1},
  0x28:{m:'PLP',d:ADDR_IMPL,s:1},
  0x4C:{m:'JMP',d:ADDR_ABS,s:3},0x6C:{m:'JMP',d:ADDR_IND,s:3},0x20:{m:'JSR',d:ADDR_ABS,s:3},
  0x60:{m:'RTS',d:ADDR_IMPL,s:1},0x40:{m:'RTI',d:ADDR_IMPL,s:1},
  0x90:{m:'BCC',d:ADDR_REL,s:2},0xB0:{m:'BCS',d:ADDR_REL,s:2},0xF0:{m:'BEQ',d:ADDR_REL,s:2},
  0x30:{m:'BMI',d:ADDR_REL,s:2},0xD0:{m:'BNE',d:ADDR_REL,s:2},0x10:{m:'BPL',d:ADDR_REL,s:2},
  0x50:{m:'BVC',d:ADDR_REL,s:2},0x70:{m:'BVS',d:ADDR_REL,s:2},
  0x18:{m:'CLC',d:ADDR_IMPL,s:1},0x38:{m:'SEC',d:ADDR_IMPL,s:1},0x58:{m:'CLI',d:ADDR_IMPL,s:1},
  0x78:{m:'SEI',d:ADDR_IMPL,s:1},0xD8:{m:'CLD',d:ADDR_IMPL,s:1},0xF8:{m:'SED',d:ADDR_IMPL,s:1},
  0xB8:{m:'CLV',d:ADDR_IMPL,s:1},
  0x69:{m:'ADC',d:ADDR_IMM,s:2},0x65:{m:'ADC',d:ADDR_ZP,s:2},0x75:{m:'ADC',d:ADDR_ZPX,s:2},
  0x6D:{m:'ADC',d:ADDR_ABS,s:3},0x7D:{m:'ADC',d:ADDR_ABSX,s:3},0x79:{m:'ADC',d:ADDR_ABSY,s:3},
  0x61:{m:'ADC',d:ADDR_INDX,s:2},0x71:{m:'ADC',d:ADDR_INDY,s:2},
  0xE9:{m:'SBC',d:ADDR_IMM,s:2},0xE5:{m:'SBC',d:ADDR_ZP,s:2},0xF5:{m:'SBC',d:ADDR_ZPX,s:2},
  0xED:{m:'SBC',d:ADDR_ABS,s:3},0xFD:{m:'SBC',d:ADDR_ABSX,s:3},0xF9:{m:'SBC',d:ADDR_ABSY,s:3},
  0xE1:{m:'SBC',d:ADDR_INDX,s:2},0xF1:{m:'SBC',d:ADDR_INDY,s:2},
  0xC9:{m:'CMP',d:ADDR_IMM,s:2},0xC5:{m:'CMP',d:ADDR_ZP,s:2},0xD5:{m:'CMP',d:ADDR_ZPX,s:2},
  0xCD:{m:'CMP',d:ADDR_ABS,s:3},0xDD:{m:'CMP',d:ADDR_ABSX,s:3},0xD9:{m:'CMP',d:ADDR_ABSY,s:3},
  0xC1:{m:'CMP',d:ADDR_INDX,s:2},0xD1:{m:'CMP',d:ADDR_INDY,s:2},
  0xE0:{m:'CPX',d:ADDR_IMM,s:2},0xE4:{m:'CPX',d:ADDR_ZP,s:2},0xEC:{m:'CPX',d:ADDR_ABS,s:3},
  0xC0:{m:'CPY',d:ADDR_IMM,s:2},0xC4:{m:'CPY',d:ADDR_ZP,s:2},0xCC:{m:'CPY',d:ADDR_ABS,s:3},
  0x29:{m:'AND',d:ADDR_IMM,s:2},0x25:{m:'AND',d:ADDR_ZP,s:2},0x35:{m:'AND',d:ADDR_ZPX,s:2},
  0x2D:{m:'AND',d:ADDR_ABS,s:3},0x3D:{m:'AND',d:ADDR_ABSX,s:3},0x39:{m:'AND',d:ADDR_ABSY,s:3},
  0x21:{m:'AND',d:ADDR_INDX,s:2},0x31:{m:'AND',d:ADDR_INDY,s:2},
  0x49:{m:'EOR',d:ADDR_IMM,s:2},0x45:{m:'EOR',d:ADDR_ZP,s:2},0x55:{m:'EOR',d:ADDR_ZPX,s:2},
  0x4D:{m:'EOR',d:ADDR_ABS,s:3},0x5D:{m:'EOR',d:ADDR_ABSX,s:3},0x59:{m:'EOR',d:ADDR_ABSY,s:3},
  0x41:{m:'EOR',d:ADDR_INDX,s:2},0x51:{m:'EOR',d:ADDR_INDY,s:2},
  0x09:{m:'ORA',d:ADDR_IMM,s:2},0x05:{m:'ORA',d:ADDR_ZP,s:2},0x15:{m:'ORA',d:ADDR_ZPX,s:2},
  0x0D:{m:'ORA',d:ADDR_ABS,s:3},0x1D:{m:'ORA',d:ADDR_ABSX,s:3},0x19:{m:'ORA',d:ADDR_ABSY,s:3},
  0x01:{m:'ORA',d:ADDR_INDX,s:2},0x11:{m:'ORA',d:ADDR_INDY,s:2},
  0x24:{m:'BIT',d:ADDR_ZP,s:2},0x2C:{m:'BIT',d:ADDR_ABS,s:3},
  0x0A:{m:'ASL',d:ADDR_ACC,s:1},0x06:{m:'ASL',d:ADDR_ZP,s:2},0x16:{m:'ASL',d:ADDR_ZPX,s:2},
  0x0E:{m:'ASL',d:ADDR_ABS,s:3},0x1E:{m:'ASL',d:ADDR_ABSX,s:3},
  0x4A:{m:'LSR',d:ADDR_ACC,s:1},0x46:{m:'LSR',d:ADDR_ZP,s:2},0x56:{m:'LSR',d:ADDR_ZPX,s:2},
  0x4E:{m:'LSR',d:ADDR_ABS,s:3},0x5E:{m:'LSR',d:ADDR_ABSX,s:3},
  0x2A:{m:'ROL',d:ADDR_ACC,s:1},0x26:{m:'ROL',d:ADDR_ZP,s:2},0x36:{m:'ROL',d:ADDR_ZPX,s:2},
  0x2E:{m:'ROL',d:ADDR_ABS,s:3},0x3E:{m:'ROL',d:ADDR_ABSX,s:3},
  0x6A:{m:'ROR',d:ADDR_ACC,s:1},0x66:{m:'ROR',d:ADDR_ZP,s:2},0x76:{m:'ROR',d:ADDR_ZPX,s:2},
  0x6E:{m:'ROR',d:ADDR_ABS,s:3},0x7E:{m:'ROR',d:ADDR_ABSX,s:3},
  0xE6:{m:'INC',d:ADDR_ZP,s:2},0xF6:{m:'INC',d:ADDR_ZPX,s:2},0xEE:{m:'INC',d:ADDR_ABS,s:3},
  0xFE:{m:'INC',d:ADDR_ABSX,s:3},
  0xC6:{m:'DEC',d:ADDR_ZP,s:2},0xD6:{m:'DEC',d:ADDR_ZPX,s:2},0xCE:{m:'DEC',d:ADDR_ABS,s:3},
  0xDE:{m:'DEC',d:ADDR_ABSX,s:3},
  0xE8:{m:'INX',d:ADDR_IMPL,s:1},0xC8:{m:'INY',d:ADDR_IMPL,s:1},0xCA:{m:'DEX',d:ADDR_IMPL,s:1},
  0x88:{m:'DEY',d:ADDR_IMPL,s:1},0xEA:{m:'NOP',d:ADDR_IMPL,s:1},0x00:{m:'BRK',d:ADDR_IMPL,s:1},
};

function fmtOp(mode,b1,b2){const lo=b1&0xFF,hi=b2&0xFF,abs=(hi<<8)|lo;
  const h1=lo.toString(16).padStart(2,'0'),h2=abs.toString(16).padStart(4,'0');
  switch(mode){case ADDR_IMPL:return'';case ADDR_IMM:return`#$${h1}`;
  case ADDR_ZP:return`$${h1}`;case ADDR_ZPX:return`$${h1},X`;case ADDR_ZPY:return`$${h1},Y`;
  case ADDR_ABS:return`$${h2}`;case ADDR_ABSX:return`$${h2},X`;case ADDR_ABSY:return`$${h2},Y`;
  case ADDR_IND:return`($${h2})`;case ADDR_INDX:return`($${h1},X)`;case ADDR_INDY:return`($${h1}),Y`;
  case ADDR_REL:{const off=(lo&0x80)?lo-256:lo;return`$${off>=0?'+':''}${off}`;}
  case ADDR_ACC:return'A';default:return`?$${h1}`;}
}

function disasm(bytes,baseAddr){const r=[];let a=baseAddr,i=0;
  while(i<bytes.length){const op=bytes[i];const d=MAP[op];
    if(!d){r.push(`$${a.toString(16).padStart(4,'0')}:  .byte $${op.toString(16).padStart(2,'0')}  ; UNKNOWN`);a++;i++;continue;}
    const b1=d.s>1?bytes[i+1]??0:0,b2=d.s>2?bytes[i+2]??0:0;
    const opStr=fmtOp(d.d,b1,b2);let hint='';
    if(d.d===ADDR_REL){const t=(a+d.s+((b1&0x80)?b1-256:b1))&0xFFFF;hint=` ; → $${t.toString(16).padStart(4,'0')}`}
    const hex=bytes.slice(i,i+d.s).map(b=>b.toString(16).padStart(2,'0')).join(' ');
    r.push(`$${a.toString(16).padStart(4,'0')}  ${hex.padEnd(9)}${d.m} ${opStr}${hint}`.trimEnd());
    i+=d.s;a+=d.s;}
  return r;}

function parseHexArray(text){
  return text.replace(/0x/gi,'').replace(/,/g,' ').split(/\s+/).filter(s=>s.length>0).map(s=>parseInt(s,16));
}

function main(){
  const bankId=process.argv[2]||'01';
  const srcName=bankId==='02'?'prg_bank_02_nmi_renderer.ts':`prg_bank_${bankId.padStart(2,'0')}_match_jump.ts`;
  const srcPath=resolve(__dirname,'..','tsubasa-hex2asm','prg_banks',srcName);
  if(!readFileSync)process.exit(1);
  const content=readFileSync(srcPath,'utf-8');
  const lines=content.split('\n');
  const out=[`; ============================================`,`; Disassembly: PRG Bank ${bankId}`,`; ============================================`];

  // Line-by-line parser
  let inCodeBlock=false, codeName='', startAddr=0, endAddr=0, hexLines=[];
  let totalBytes=0;

  for(let i=0;i<lines.length;i++){
    const line=lines[i].trim();
    // Detect code block start
    const funcMatch = line.match(/function (CODE_\$([0-9A-F]+)_\$([0-9A-F]+))\(\)/i);
    if(funcMatch && funcMatch[1] !== 'CODE_XXX'){
      inCodeBlock=true; codeName=funcMatch[1];
      startAddr=parseInt(funcMatch[2],16); endAddr=parseInt(funcMatch[3],16);
      hexLines=[];
      continue;
    }
    // Collect hex lines inside return [
    if(inCodeBlock){
      if(line.startsWith('return [')) continue; // skip
      if(line === '];' || line === '];'){
        // end of block
        const hexStr = hexLines.join(' ');
        const bytes = parseHexArray(hexStr);
        out.push('',`; -- CODE: $${startAddr.toString(16).padStart(4,'0')}-$${endAddr.toString(16).padStart(4,'0')} (${bytes.length} bytes) --`,'');
        out.push(...disasm(bytes,startAddr));
        totalBytes+=bytes.length;
        inCodeBlock=false;
        continue;
      }
      if(line.includes('0x')){
        hexLines.push(line);
      }
    }
  }

  out.push('',`; Total: ${totalBytes} code bytes disassembled`);
  const outPath=resolve(__dirname,'..',`disasm_bank${bankId.padStart(2,'0')}.txt`);
  writeFileSync(outPath, out.join('\n'), 'utf-8');
  console.log(`Done! → ${outPath} (${totalBytes} bytes)`);
}

main();
