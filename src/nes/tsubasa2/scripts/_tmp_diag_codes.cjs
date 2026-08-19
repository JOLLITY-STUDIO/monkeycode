const fs = require('fs');
const ts = require('typescript');
const cfgPath = 'tsconfig.json';
const cfg = ts.readConfigFile(cfgPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, process.cwd());
const prog = ts.createProgram(parsed.fileNames, parsed.options);
const ds = ts.getPreEmitDiagnostics(prog);
const lines = ['FILES=' + parsed.fileNames.length + ' DIAGS=' + ds.length];
for (const d of ds) {
  const pos = d.file && d.file.getLineAndCharacterOfPosition(d.start || 0);
  lines.push((d.file ? d.file.fileName : '?') + ':' + (pos ? pos.line + 1 : 1) + ':' + (pos ? pos.character + 1 : 1) + ' [' + d.code + '] ' + ts.flattenDiagnosticMessageText(d.messageText, ' '));
}
fs.writeFileSync('_tmp_diag_codes_out.txt', lines.join('\n'), 'utf8');
