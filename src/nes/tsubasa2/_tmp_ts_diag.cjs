const ts = require('typescript');
const fs = require('fs');
const opts = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  strict: true,
  esModuleInterop: true,
  skipLibCheck: true,
  noEmit: true,
};
const files = ['src/core/ppu/index.ts'];
const prog = ts.createProgram(files, opts);
const diags = ts.getPreEmitDiagnostics(prog);
console.log('diags:', diags.length);
const out = [];
for (const d of diags) {
  const f = d.file ? d.file.fileName : '?';
  const pos = d.file ? d.file.getLineAndCharacterOfPosition(d.start) : {};
  const msg = ts.flattenDiagnosticMessageText(d.messageText, ' ');
  out.push(`${f}(${pos.line + 1},${pos.character + 1}): ${msg}`);
}
console.log(out.slice(0, 50).join('\n'));
fs.writeFileSync('_tmp_ts_diag_out.txt', out.join('\n'));
