import * as fs from 'fs';

const banks = [];
for(let i=0; i<=31; i++) {
  const n = i.toString().padStart(2,'0');
  const content = fs.readFileSync(`_tmp_bzk_out/bank_${n}.asm`,'utf8');
  const lines = content.split('\n');
  let unacc = 0, code = 0, data = 0;
  let unaccRuns = [];
  let runLen = 0;

  for(const line of lines) {
    const m = line.match(/^; CDL: code=(\d+) data=(\d+) unacc/);
    if(m) { code=parseInt(m[1]); data=parseInt(m[2]); continue; }
    const isUnacc = line.includes('------') && line.includes('.byte');
    if(isUnacc) {
      unacc++;
      runLen++;
    } else {
      if(runLen > 0) { unaccRuns.push(runLen); runLen = 0; }
    }
  }
  if(runLen > 0) unaccRuns.push(runLen);

  const total = code + data + unacc;
  const bigRuns = unaccRuns.filter(r => r >= 50).sort((a,b)=>b-a);
  banks.push({
    bank: i, code, data, unacc, total,
    pct: (unacc/total*100).toFixed(1),
    bigRuns: bigRuns.slice(0,3),
    maxRun: unaccRuns.length ? Math.max(...unaccRuns) : 0,
    runs: unaccRuns.length
  });
}

let totalUnacc=0, totalAll=0;
for(const b of banks) { totalUnacc+=b.unacc; totalAll+=b.total; }
console.log(`Overall unaccessed: ${totalUnacc}/${totalAll} = ${(totalUnacc/totalAll*100).toFixed(2)}%`);
console.log('');
console.log('Bnk  Code    Data    Unacc   %unacc  maxRun  blocks      3 biggest runs');
for(const b of banks) {
  console.log(
    String(b.bank).padStart(2)+'   '+
    String(b.code).padStart(5)+'  '+
    String(b.data).padStart(5)+'  '+
    String(b.unacc).padStart(5)+'  '+
    String(b.pct).padStart(5)+'%  '+
    String(b.maxRun).padStart(5)+'   '+
    String(b.runs).padStart(3)+'     '+
    b.bigRuns.join(', ')
  );
}
