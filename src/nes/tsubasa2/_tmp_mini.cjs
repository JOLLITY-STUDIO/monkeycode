const ts = require('typescript');
const fs = require('fs');
const code = `class PPU {
  STATUS_VRAMWRITE = 4;
  constructor(nes) {
    this.nes = nes;
    this.showSpr0Hit = false;
  }
  foo() { return this.nes; }
}
export default PPU;
`;
const sf = ts.createSourceFile('mini.ts', code, ts.ScriptTarget.ES2020, true);
const opts = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  strict: true,
  esModuleInterop: true,
  noEmit: true,
};
const host = ts.createCompilerHost(opts);
const orig = host.getSourceFile.bind(host);
host.getSourceFile = (f, lang, onErr, nf) => {
  if (f === 'mini.ts') return sf;
  return orig(f, lang, onErr, nf);
};
const prog = ts.createProgram(['mini.ts'], opts, host);
for (const d of ts.getPreEmitDiagnostics(prog)) {
  const pos = d.file.getLineAndCharacterOfPosition(d.start);
  console.log(`${d.file.fileName}(${pos.line + 1},${pos.character + 1}): ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`);
}
console.log('---done---');
console.log('ts version:', ts.version);
