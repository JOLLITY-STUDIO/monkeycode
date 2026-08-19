const fs = require('fs');
const path = require('path');
const outFile = path.join(process.cwd(), '_diag_out.txt');
const lines = [];
try {
  const ts = require(path.join(process.cwd(), 'node_modules/typescript'));
  const cfgPath = path.join(process.cwd(), 'tsconfig.json');
  const cfg = ts.readConfigFile(cfgPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, process.cwd());
  const prog = ts.createProgram(parsed.fileNames, parsed.options);
  const ds = ts.getPreEmitDiagnostics(prog);
  lines.push('FILES=' + parsed.fileNames.length + ' DIAGS=' + ds.length);
  for (const d of ds) {
    const pos = d.file && d.file.getLineAndCharacterOfPosition(d.start || 0);
    const loc = d.file ? d.file.fileName + ':' + (pos ? pos.line + 1 : 1) + ':' + (pos ? pos.character + 1 : 1) : '?';
    lines.push(loc + ': ' + ts.flattenDiagnosticMessageText(d.messageText, ' '));
  }
} catch (e) {
  lines.push('EXCEPTION: ' + (e && e.stack ? e.stack : String(e)));
}
fs.writeFileSync(outFile, lines.join('\n'), 'utf8');
