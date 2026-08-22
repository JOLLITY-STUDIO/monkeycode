const ts = require('typescript');
const cases = {
  'D: param typed any': `class PPU {
  constructor(nes: any) {
    this.nes = nes;
  }
}
`,
  'E: param typed any + use strict': `class PPU {
  constructor(nes: any) {
    this.nes = nes;
  }
}
`,
  'F: declare field + param typed any': `class PPU {
  nes: any;
  constructor(nes: any) {
    this.nes = nes;
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
