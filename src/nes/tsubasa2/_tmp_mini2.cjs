const ts = require('typescript');
const cases = {
  'A: no class fields, constructor assigns': `class PPU {
  constructor(nes) {
    this.nes = nes;
    this.showSpr0Hit = false;
  }
}
`,
  'B: with class field + constructor assigns': `class PPU {
  STATUS_VRAMWRITE = 4;
  constructor(nes) {
    this.nes = nes;
  }
}
`,
  'C: explicit field declarations + constructor assigns': `class PPU {
  STATUS_VRAMWRITE = 4;
  nes: any;
  showSpr0Hit: boolean;
  constructor(nes) {
    this.nes = nes;
    this.showSpr0Hit = false;
  }
}
`,
};
const opts = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  noEmit: true,
};
for (const [name, code] of Object.entries(cases)) {
  const sf = ts.createSourceFile('mini.ts', code, ts.ScriptTarget.ES2020, true);
  const host = ts.createCompilerHost(opts);
  const orig = host.getSourceFile.bind(host);
  host.getSourceFile = (f, lang, onErr, nf) => (f === 'mini.ts' ? sf : orig(f, lang, onErr, nf));
  const prog = ts.createProgram(['mini.ts'], opts, host);
  const errs = ts.getPreEmitDiagnostics(prog).map((d) => ts.flattenDiagnosticMessageText(d.messageText, ' ').split(':')[0]);
  console.log(name, '->', errs.length === 0 ? 'OK' : errs.slice(0, 3).join(' | '));
}
