import * as fs from 'fs';

for(let i=0; i<=31; i++) {
  const n = i.toString().padStart(2,'0');
  const content = fs.readFileSync(`_tmp_bzk_out/bank_${n}.asm`,'utf8');
  const lines = content.split('\n');
  
  // Find CDL stats line
  let code=0, data=0, unacc=0;
  let lastAccessed = 0;  // last line with code or data access
  let firstUnacc = -1;
  let totalLines = 0;
  let tailCount = 0;
  
  for(let j=0; j<lines.length; j++) {
    const line = lines[j];
    const m = line.match(/^; CDL: code=(\d+) data=(\d+) unacc/);
    if(m) { code=parseInt(m[1]); data=parseInt(m[2]); continue; }
    
    const isUnacc = line.includes('------') && line.includes('.byte');
    const isAccessed = (line.includes('C-----') || line.includes('-D')) && line.includes('.byte');
    
    if(isAccessed) lastAccessed = j;
    if(isUnacc && isAccessed) { /* shouldn't happen */ }
    if(isUnacc) unacc++;
  }
  
  // Count unaccessed lines AFTER the last accessed line
  for(let j=lastAccessed+1; j<lines.length; j++) {
    const line = lines[j];
    if(line.includes('------') && line.includes('.byte')) tailCount++;
    else break;
  }
  
  let tailOnly = tailCount === unacc;
  let marker = tailOnly ? '✅ 全是尾部' : (tailCount >= unacc*0.9 ? '~ 主要是尾部' : '  混在中间');
  
  console.log(
    `Bank ${String(i).padStart(2)}  unacc=${String(unacc).padStart(5)}  tail=${String(tailCount).padStart(5)}  ` +
    `tail%=${(tailCount/unacc*100).toFixed(0).padStart(3)}%  ${marker}`
  );
}
