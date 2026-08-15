/**
 * 剧情脚本解析器 — 从 bank 3-6 提取并反汇编所有脚本字节码
 *
 * 脚本系统结构（基于反编译分析）:
 *   - 脚本分派器: $84E7 (bank 00)
 *   - 脚本指针: ram_004D/004E (16 位)
 *   - 脚本启动函数: $8464 (输入 A = 脚本 ID)
 *   - 脚本 ID 映射表: $8AEC (bank 00)
 *       ID 0x00-0x0F → bank 03, 偏移 ID×2
 *       ID 0x10-0x1F → bank 04, 偏移 (ID-16)×2
 *       ID 0x20-0x5F → bank 05, 偏移 (ID-32)×2
 *       ID 0x60-0xFE → bank 06, 偏移 (ID-96)×2
 *   - 每个 bank 开头是 2 字节指针表，指向实际脚本字节码
 *
 * 字节码格式:
 *   $00-$D7: 文字字符 (1 字节, 显示文本)
 *   $D8-$DF: 等待帧 (1 字节, 无参数, yield 1/10/20/40/60/80/120/240 帧)
 *   $E0-$E7: 文本格式控制 (1 字节, 无参数, 换行/缩进等)
 *   $E8-$FF: 长指令 (参数长度因指令而异)
 *
 * 已知长指令:
 *   $E8 [sceneDataId]: 加载场景数据 (2 字节, 从 bank 6 偏移 id*19+0x1F00 读取 20 字节)
 *   $E9: yield 2 帧 + 调用 $997E (1 字节)
 *   $EA: 清屏/重置 (1 字节)
 *   $F9 [low] [high]: 跳转到新地址 (3 字节)
 *
 * 用法: node scripts/extract_scripts.cjs [脚本ID]
 *   不带参数: 解析所有脚本
 *   带参数: 只解析指定脚本
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ── 加载所有 32 个 ROM bank ──
const BANKS = [];
for (let i = 0; i < 32; i++) {
  const id = i.toString().padStart(2, '0');
  const p = path.resolve(__dirname, `../../rom-data/prg-bank-${id}.ts`);
  const src = fs.readFileSync(p, 'utf-8');
  const m = src.match(/const PRG_BANK_\d+[\s\S]*?=\s*\[([\s\S]*?)\]/);
  if (!m) throw new Error(`无法解析 bank ${id}`);
  BANKS[i] = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
}
console.log(`已加载 ${BANKS.length} 个 bank`);

// ── 脚本 ID → bank 映射表 ──
function getScriptBank(scriptId) {
  if (scriptId < 0x10) return 3;
  if (scriptId < 0x20) return 4;
  if (scriptId < 0x60) return 5;
  return 6;
}

function getScriptBaseOffset(scriptId) {
  if (scriptId < 0x10) return scriptId * 2;
  if (scriptId < 0x20) return (scriptId - 0x10) * 2;
  if (scriptId < 0x60) return (scriptId - 0x20) * 2;
  return (scriptId - 0x60) * 2;
}

// ── 读取脚本入口指针 ──
function getScriptEntry(scriptId) {
  const bank = getScriptBank(scriptId);
  const off = getScriptBaseOffset(scriptId);
  const lo = BANKS[bank][off];
  const hi = BANKS[bank][off + 1];
  const addr = (hi << 8) | lo;
  return { bank, addr, bankOffset: addr - 0xA000 };
}

// ── 读取 bank 数据中的地址 ──
function readByte(bank, offset) {
  if (offset < 0 || offset >= BANKS[bank].length) return -1;
  return BANKS[bank][offset];
}

function readWord(bank, offset) {
  const lo = readByte(bank, offset);
  const hi = readByte(bank, offset + 1);
  if (lo < 0 || hi < 0) return -1;
  return (hi << 8) | lo;
}

// ── 长指令参数长度表 (opcode → 参数字节数) ──
// 基于 $8545 表处理器代码分析（注意: RTS 会 PC+1，所以表值+1 = 实际入口）
// -1 = 变长指令, 需要特殊处理
const LONG_INSTR_PARAMS = {
  0xE8: 1,  // LOAD_SCENE_DATA [sceneDataId]   入口$8575: INY; LDA(004D),Y; JSR $8920; LDA#2; JMP $8879
  0xE9: 0,  // YIELD2_CHECK                    入口$8580: LDA#2; JSR $9FA8; JSR $997E; LDA#1; JMP $8879
  0xEA: 0,  // CLEAR_RESET (清屏)              入口$858D: JSR $99F0; JSR $9B7F; ...; LDA#1; JMP $8879
  0xEB: 0,  // YIELD_CALL (yield, 调用899A/89A3/88B1) 入口$85C4: JSR $899A; JSR $89A3; JSR $88B1; LDA#1; JMP $8887
  0xEC: 1,  // COND_SET [param] (param==$FF特殊) 入口$85D2: LDY#1; LDA(004D),Y; CMP#$FF; BEQ; JSR $89D2; LDA#2; JMP $8879
  0xED: 1,  // QUEUE_OBJ [param] (写入ram_0700) 入口$85EC: ...; LDY#1; LDA(004D),Y; STA ram_0700,X; LDA#2; JMP $8879
  0xEE: 0,  // CLEAR_WINDOW (调用$98E8清窗)    入口$8604: LDA#$21; ...; JSR $98E8; LDA#1; JMP $8879
  0xEF: 0,  // TOGGLE_FLAG (修改ram_0099)      入口$8618: LDA#2; JSR $9FA8; ...; LDA#1; JMP $8879
  0xF0: 2,  // SET_POS [x][y] (设置ram_004F-0052) 入口$862C: INY; LDA(004D),Y; STA $4F,$51; INY; LDA(004D),Y; STA $50,$52; ADC#3; JMP $84E3
  0xF1: 1,  // LOADsprITE [param] (调用$98E8,查$BB40表) 入口$864A: ...; LDY#1; LDA(004D),Y; ASL; TAY; ...; LDA#2; JMP $8879
  0xF2: 1,  // SET_MODE [param] (设置ram_0055) 入口$8678: INY; LDA(004D),Y; STA ram_0055; LDA#2; JMP $8879
  0xF3: -1, // VAR_LEN [param1][param2?][param3?] 变长! 入口$8682: INY; LDA(004D),Y; 若==$FF则读3字节(总长4), 否则1字节(总长2)
  0xF4: -2, // SUB_DISPATCH [subId][...] 子分派器 入口$86B8: INY; LDA(004D),Y; ASL; TAX; 查$86C6表跳转
  0xF5: -2, // SUB_DISPATCH2 (与F4相同)        入口$86B8 (同F4)
  0xF6: 1,  // CALL_FA8 [param] (调用$9FA8)    入口$87CB: JSR $899A; INY; LDA(004D),Y; JSR $9FA8; LDA#2; JMP $8879
  0xF7: 0,  // TOGGLE_BANK (切换ram_007B)      入口$87D9: LDA ram_0009; BEQ; ...; EOR ram_007B; LDA#1; JMP $8879
  0xF8: -3, // VAR_DATA [p1][p2][...] 变长, 入口$87F8: INY; LDA,Y; STA $ED; INY; LDA,Y; STA $EC; JSR $A212(返回长度); TYA; JMP $8879
  0xF9: 1,  // CALL_8AF7 [param] (清除$5B.bit2) 入口$8814: LDA $5B; AND #$FB; STA $5B; INY; LDA,Y; JSR $8AF7; LDA#2; JMP $8879
  0xFA: 1,  // CALL_8AF7B [param] (设置$5B.bit2) 入口$881B: LDA $5B; ORA #$04; STA $5B; INY; LDA,Y; JSR $8AF7; LDA#2; JMP $8879
  0xFB: 0,  // CALL_9085                       入口$8831: JSR $9085; JMP $84E7
  0xFC: 0,  // ADVANCE_PTR (ram_0051+=0x40)    入口$8837: JSR $899A; LDA#4; JSR $9FA8; ram_0051+=0x40; INC $4D; JMP $84E3
  0xFD: 0,  // YIELD_FA8 (yield, 调用$88B1/$9FA8(4)) 入口$8855: JSR $88B1; LDA#4; JSR $9FA8; LDA#1; JMP $8887
  0xFE: 2,  // SET_PTR [low][high] (设置脚本指针,跳转) 入口$8862: INY; LDA,Y; TAX; INY; LDA,Y; STA $4E; STX $4D; JMP $84E7
  0xFF: 0,  // END (脚本结束, 指针清零)         入口$8870: LDA#0; STA $4D; STA $4E; JMP $9F7E
};

// ── 长指令助记符 ──
const LONG_INSTR_MNEMONIC = {
  0xE8: 'LOAD_SCENE_DATA',
  0xE9: 'YIELD2_CHECK',
  0xEA: 'CLEAR_RESET',
  0xEB: 'YIELD_CALL',
  0xEC: 'COND_SET',
  0xED: 'QUEUE_OBJ',
  0xEE: 'CLEAR_WINDOW',
  0xEF: 'TOGGLE_FLAG',
  0xF0: 'SET_POS',
  0xF1: 'LOADsprITE',
  0xF2: 'SET_MODE',
  0xF3: 'VAR_LEN',
  0xF4: 'SUB_DISPATCH',
  0xF5: 'SUB_DISPATCH2',
  0xF6: 'CALL_FA8',
  0xF7: 'TOGGLE_BANK',
  0xF8: 'VAR_DATA',
  0xF9: 'CALL_8AF7',
  0xFA: 'CALL_8AF7B',
  0xFB: 'CALL_9085',
  0xFC: 'ADVANCE_PTR',
  0xFD: 'YIELD_FA8',
  0xFE: 'SET_PTR',
  0xFF: 'END',
};

// ── 短指令 yield 帧数表 ($8AE6) ──
const SHORT_INSTR_FRAMES = [1, 10, 20, 40, 60, 80, 120, 240];

// ── 字符映射表 (部分) ──
// NES 天使之翼2 使用自定义字符编码，这里只标记可打印范围
function charRepr(b) {
  if (b >= 0x20 && b < 0x80) {
    // 可能是 ASCII 兼容区，但游戏使用日文假名，需要专用字库
    return String.fromCharCode(b);
  }
  return null;
}

// ── 解析单个脚本 ──
function parseScript(scriptId, maxBytes = 0x2000) {
  const entry = getScriptEntry(scriptId);
  const result = {
    id: scriptId,
    idHex: '0x' + scriptId.toString(16).padStart(2, '0').toUpperCase(),
    bank: entry.bank,
    entryAddr: '$' + entry.addr.toString(16).padStart(4, '0').toUpperCase(),
    instructions: [],
    jumps: [],  // 记录所有跳转目标
  };

  // 使用工作栈处理跳转 (支持 $F9 跳转)
  const visited = new Set();  // 已访问的偏移
  const queue = [{ bank: entry.bank, offset: entry.bankOffset, label: 'entry' }];

  while (queue.length > 0) {
    const { bank, offset, label } = queue.shift();
    const key = `${bank}:${offset}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const block = {
      label,
      bank,
      startOffset: offset,
      startAddr: '$' + (0xA000 + offset).toString(16).padStart(4, '0').toUpperCase(),
      instructions: [],
    };

    let pos = offset;
    let textBuffer = '';
    let textStartOffset = -1;

    function flushText() {
      if (textBuffer.length > 0) {
        block.instructions.push({
          offset: textStartOffset,
          addr: '$' + (0xA000 + textStartOffset).toString(16).padStart(4, '0').toUpperCase(),
          type: 'TEXT',
          raw: null,
          text: textBuffer,
        });
        textBuffer = '';
        textStartOffset = -1;
      }
    }

    while (pos < maxBytes) {
      const op = readByte(bank, pos);
      if (op < 0) {
        flushText();
        block.instructions.push({
          offset: pos,
          addr: 'EOF',
          type: 'ERROR',
          raw: null,
          text: '超出 bank 范围',
        });
        break;
      }

      // 文字字符 $00-$D7
      if (op < 0xD8) {
        if (textBuffer.length === 0) textStartOffset = pos;
        const ch = charRepr(op);
        textBuffer += ch ? ch : `[${op.toString(16).padStart(2, '0').toUpperCase()}]`;
        pos++;
        continue;
      }

      // 遇到指令，先刷新文本缓冲
      flushText();

      // 短指令 $D8-$DF (等待帧)
      if (op < 0xE0) {
        const frames = SHORT_INSTR_FRAMES[op - 0xD8];
        block.instructions.push({
          offset: pos,
          addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
          type: 'WAIT',
          raw: op,
          text: `WAIT ${frames}帧`,
        });
        pos++;
        continue;
      }

      // 文本格式控制 $E0-$E7
      if (op < 0xE8) {
        const controlNames = {
          0xE0: 'NEWLINE?', 0xE1: 'CTRL_E1', 0xE2: 'CTRL_E2',
          0xE3: 'CTRL_E3', 0xE4: 'CTRL_E4', 0xE5: 'CTRL_E5',
          0xE6: 'CTRL_E6', 0xE7: 'CTRL_E7',
        };
        block.instructions.push({
          offset: pos,
          addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
          type: 'TEXT_CTRL',
          raw: op,
          text: controlNames[op] || `CTRL_${op.toString(16).toUpperCase()}`,
        });
        pos++;
        continue;
      }

      // 长指令 $E8-$FF
      const paramLen = LONG_INSTR_PARAMS[op];
      const mnemonic = LONG_INSTR_MNEMONIC[op] || `UNK_${op.toString(16).toUpperCase()}`;

      if (paramLen === undefined) {
        // 未知指令，停止
        block.instructions.push({
          offset: pos,
          addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
          type: 'UNKNOWN',
          raw: op,
          text: `UNKNOWN opcode $${op.toString(16).toUpperCase()}`,
        });
        break;
      }

      // ── 变长指令特殊处理 ──
      if (paramLen === -1) {
        // $F3: 若 param1==$FF 则 3 字节参数(总长4), 否则 1 字节参数(总长2)
        const p1 = readByte(bank, pos + 1);
        let actualLen, params, text;
        if (p1 === 0xFF) {
          actualLen = 3;
          params = [p1, readByte(bank, pos + 2), readByte(bank, pos + 3)];
          text = `${mnemonic} $FF $${params[1].toString(16).padStart(2,'0').toUpperCase()} $${params[2].toString(16).padStart(2,'0').toUpperCase()} (3字节, $FF模式)`;
        } else {
          actualLen = 1;
          params = [p1];
          text = `${mnemonic} $${p1.toString(16).padStart(2,'0').toUpperCase()}`;
        }
        block.instructions.push({
          offset: pos, addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
          type: 'LONG_INSTR', raw: op, params, text,
        });
        pos += 1 + actualLen;
        if (op === 0xFF) break;
        continue;
      }

      if (paramLen === -2) {
        // $F4/$F5: 子分派器, param1=subId, 所有子处理器都前进2字节(op+1参数)
        const subId = readByte(bank, pos + 1);
        const subNames = {
          0x00: 'JSR_99B0', 0x01: 'JSR_99D1', 0x02: 'JSR_9A0D',
          0x03: 'JSR_9A1F', 0x04: 'LOOP_FA8', 0x05: 'LOOP2_FA8', 0x06: 'SUB6',
        };
        const subName = subNames[subId] || `SUB_$${subId.toString(16).toUpperCase()}`;
        block.instructions.push({
          offset: pos, addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
          type: 'LONG_INSTR', raw: op, params: [subId],
          text: `${mnemonic} $${subId.toString(16).padStart(2,'0').toUpperCase()} (${subName})`,
        });
        pos += 2;  // opcode + 1 字节参数
        continue;
      }

      if (paramLen === -3) {
        // $F8: VAR_DATA, 子分派器(通过$A484), 参数1=子指令ID
        // 大多数子指令返回 2 (前进2字节: opcode+1参数), 子指令1返回3, 子指令16/17是循环
        const p1 = readByte(bank, pos + 1);
        const p2 = readByte(bank, pos + 2);
        let actualLen, text;
        if (p1 === 0x01) {
          // 子指令 1 返回 3 (前进3字节: opcode+2参数)
          actualLen = 2;
          text = `${mnemonic} sub=$01 $${p2.toString(16).padStart(2,'0').toUpperCase()} (子指令1, 前进3)`;
        } else if (p1 === 0x10 || p1 === 0x11) {
          // 子指令 16/17 是循环, 停止解析
          actualLen = 1;
          text = `${mnemonic} sub=$${p1.toString(16).padStart(2,'0').toUpperCase()} (循环, 停止解析)`;
          block.instructions.push({
            offset: pos, addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
            type: 'LONG_INSTR', raw: op, params: [p1, p2], text,
          });
          break;
        } else {
          // 其他子指令返回 2 (前进2字节: opcode+1参数, "参数2"是下一指令)
          actualLen = 1;
          text = `${mnemonic} sub=$${p1.toString(16).padStart(2,'0').toUpperCase()}`;
        }
        block.instructions.push({
          offset: pos, addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
          type: 'LONG_INSTR', raw: op, params: [p1], text,
        });
        pos += 1 + actualLen;
        continue;
      }

      // ── 固定长度参数读取 ──
      const params = [];
      for (let i = 0; i < paramLen; i++) {
        const p = readByte(bank, pos + 1 + i);
        if (p < 0) {
          block.instructions.push({
            offset: pos, addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
            type: 'ERROR', raw: op, text: '参数超出范围',
          });
          break;
        }
        params.push(p);
      }

      // 特殊处理各指令的显示
      let text = mnemonic;
      if (op === 0xE8 && params.length === 1) {
        text = `LOAD_SCENE_DATA ${params[0]} (bank6偏移 0x${(params[0] * 19 + 0x1F00).toString(16).toUpperCase()})`;
      } else if (op === 0xFE && params.length === 2) {
        // SET_PTR: 设置脚本指针 (跳转)
        const targetAddr = (params[1] << 8) | params[0];
        text = `SET_PTR $${targetAddr.toString(16).padStart(4, '0').toUpperCase()} (设置脚本指针)`;
        // 跟踪跳转目标
        if (targetAddr >= 0xA000 && targetAddr < 0xC000) {
          const targetOffset = targetAddr - 0xA000;
          queue.push({ bank, offset: targetOffset, label: `setptr_from_$${(0xA000+pos).toString(16).toUpperCase()}` });
        } else if (targetAddr >= 0xC000) {
          text += ` (固定bank)`;
        } else if (targetAddr >= 0x8000) {
          text += ` (代码区?)`;
        }
      } else if (op === 0xF0 && params.length === 2) {
        text = `SET_POS x=$${params[0].toString(16).padStart(2,'0').toUpperCase()} y=$${params[1].toString(16).padStart(2,'0').toUpperCase()}`;
      } else if (params.length > 0) {
        text = `${mnemonic} ${params.map(p => '$' + p.toString(16).padStart(2, '0').toUpperCase()).join(' ')}`;
      }

      block.instructions.push({
        offset: pos, addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
        type: 'LONG_INSTR', raw: op, params, text,
      });

      pos += 1 + paramLen;

      // $FF 是脚本结束
      if (op === 0xFF) break;
      // $FE 是跳转, 当前块结束
      if (op === 0xFE) break;
    }

    flushText();
    result.instructions.push(block);
  }

  return result;
}

// ── 格式化输出 ──
function formatScript(script) {
  const lines = [];
  lines.push(`════════════════════════════════════════════════════════════`);
  lines.push(`脚本 ${script.idHex} (ID=${script.id})`);
  lines.push(`  Bank: ${script.bank}`);
  lines.push(`  入口: ${script.entryAddr}`);
  lines.push(`  代码块数: ${script.instructions.length}`);
  lines.push(`────────────────────────────────────────────────────────────`);

  for (const block of script.instructions) {
    lines.push(`  ── ${block.label} (bank ${block.bank}, 偏移 0x${block.startOffset.toString(16).toUpperCase()}, ${block.startAddr}) ──`);
    for (const instr of block.instructions) {
      const offsetStr = '0x' + instr.offset.toString(16).padStart(4, '0').toUpperCase();
      const rawStr = instr.raw !== null && instr.raw !== undefined
        ? '$' + instr.raw.toString(16).padStart(2, '0').toUpperCase()
        : '    ';
      lines.push(`    ${offsetStr} ${instr.addr}  ${rawStr}  ${instr.text}`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

// ── 主程序 ──
const arg = process.argv[2];
if (arg !== undefined) {
  // 解析单个脚本
  const id = parseInt(arg, arg.startsWith('0x') ? 16 : 10);
  const script = parseScript(id);
  console.log(formatScript(script));
} else {
  // 解析所有脚本
  const allScripts = [];
  // bank 3: ID 0x00-0x0F (16 个)
  // bank 4: ID 0x10-0x1F (16 个)
  // bank 5: ID 0x20-0x5F (48 个)
  // bank 6: ID 0x60-0xFE (159 个)
  const scriptIds = [];
  for (let i = 0; i < 0x10; i++) scriptIds.push(i);
  for (let i = 0x10; i < 0x20; i++) scriptIds.push(i);
  for (let i = 0x20; i < 0x60; i++) scriptIds.push(i);
  for (let i = 0x60; i < 0xFF; i++) scriptIds.push(i);

  // 解析所有脚本 (bank 3-6, ID 0x00-0xFE)
  // bank 3: ID 0x00-0x0F (16 个) — 标题/KICK OFF 剧情
  // bank 4: ID 0x10-0x1F (16 个) — 中段剧情
  // bank 5: ID 0x20-0x5F (48 个) — 比赛相关
  // bank 6: ID 0x60-0xFE (159 个) — 大量剧情/对话
  let currentBank = -1;
  for (const id of scriptIds) {
    const bank = getScriptBank(id);
    if (bank !== currentBank) {
      currentBank = bank;
      console.log('════════════════════════════════════════════════════════════');
      const ranges = { 3: '0x00-0x0F', 4: '0x10-0x1F', 5: '0x20-0x5F', 6: '0x60-0xFE' };
      console.log(`解析 bank ${bank} 脚本 (ID ${ranges[bank]})`);
      console.log('════════════════════════════════════════════════════════════');
    }
    try {
      const script = parseScript(id);
      console.log(formatScript(script));
    } catch (e) {
      console.log(`脚本 0x${id.toString(16).toUpperCase()} 解析失败: ${e.message}`);
    }
  }
}
