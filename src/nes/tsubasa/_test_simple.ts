import { tsDispatch } from './src/tsnes/tsubasa-code/prg_banks/bank_00';
import type { CpuCtx } from './src/tsnes/tsubasa-code/_cpu_ctx';
import * as fs from 'fs';

// 简易 mock
const mem = new Uint8Array(0x10000);
let pc = 0;

const ctx: CpuCtx = {
  load(addr: number) { return mem[addr]; },
  store(addr: number, val: number) { mem[addr] = val; },
  push(val: number) {},
  pop(): number { return 0; },
  push16(val: number) {},
  setPC(addr: number) { pc = addr; },
  advanceCycles(n: number) {},
};

// 测试 idx=0 → 应该跳转到 $8165
ctx.store(0x27, 0);
tsDispatch(ctx);

fs.writeFileSync('test_output/_ts_dispatch_out.txt',
  `target=$${pc.toString(16)} expected=$8165 ${pc === 0x8165 ? 'PASS' : 'FAIL'}\n`);
