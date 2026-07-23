// @ts-nocheck — auto-generated de-CPU functions, mutates imported state
﻿// func_FFF0.ts
// Address range: $FFF0-$FFF5
// Instructions: 3
// Total hits: 3
// First seen at frame: 0

import { A, X, Y, PC, SP, C, Z, I, D, V, N, setZN, mem, zp, setZp, indX, indY, push, pull, pushWord, pullWord, FLAGS_BYTE, SET_FLAGS } from './state';
import { instrTable } from './instr_table';

export function funcFFF0(): void {
  // hits: 3
  // pc range: $FFF0-$FFF5
  // --- pc FFF0 ---
  // $FFF0: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc FFF1 ---
  // $FFF1: BRK
  // BRK (halt for now)
  return;

  // --- pc FFF5 ---
  // $FFF5: JMP $C503
  PC = 0xC503;
  return;

  // fall-through end

}

