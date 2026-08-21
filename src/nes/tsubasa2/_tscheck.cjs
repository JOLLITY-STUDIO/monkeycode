const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const cfgPath = path.resolve('tsconfig.json');
const cfg = ts.readConfigFile(cfgPath, ts.sys.readFile);
const p = ts.parseJsonConfigFileContent(cfg.config, ts.sys, path.resolve('.'));
const host = ts.createCompilerHost(p.options);
const prog = ts.createProgram(p.fileNames, p.options, host);
const diags = ts.getPreEmitDiagnostics(prog);
const lines = [];
lines.push('TOTAL errors=' + diags.length);
const targets = ['bank19_auxiliary', 'bank20_match-aux', 'bank11_match-turn', 'bank19-scene-stream', 'bank31-palette-fbcc'];
for (const d of diags) {
  const f = d.file && d.file.fileName;
  if (!f) continue;
  if (targets.some(t => f.includes(t))) {
    lines.push(f + ': ' + ts.flattenDiagnosticMessageText(d.messageText, '\n'));
  }
}
fs.writeFileSync(path.resolve('_tsout.txt'), lines.join('\n'));
