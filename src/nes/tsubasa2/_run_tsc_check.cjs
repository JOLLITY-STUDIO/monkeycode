const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const cfgPath = path.resolve('tsconfig.play.json');
const cfg = ts.readConfigFile(cfgPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, path.dirname(cfgPath));
const prog = ts.createProgram(parsed.fileNames, parsed.options);
const ds = ts.getPreEmitDiagnostics(prog);
const lines = [];
lines.push('files=' + parsed.fileNames.length + ' diagnostics=' + ds.length);
for (const d of ds) {
  const f = d.file ? d.file.fileName.replace(/.*tsubasa2[\\/]/, '') : '';
  lines.push(f + ': ' + ts.flattenDiagnosticMessageText(d.messageText, '\n').split('\n')[0]);
}
fs.writeFileSync(path.resolve('_tsc_err.txt'), lines.join('\n'));
const rel = lines.filter(l => l.includes('bank20') || l.includes('prg-bank-20') || l.includes('prg-bank-21') || l.includes('prg-bank-31') || l.includes('bank20-data'));
fs.writeFileSync(path.resolve('_tsc_b20.txt'), rel.join('\n') + ' count=' + rel.length);
process.exit(0);
