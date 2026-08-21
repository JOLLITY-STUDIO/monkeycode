const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const cfgPath = path.resolve('tsconfig.play.json');
const cfg = ts.readConfigFile(cfgPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, path.dirname(cfgPath));
const prog = ts.createProgram(parsed.fileNames, parsed.options);
const ds = ts.getPreEmitDiagnostics(prog);
console.log('files=' + parsed.fileNames.length + ' diagnostics=' + ds.length);
for (const d of ds.slice(0, 60)) {
  const f = d.file ? d.file.fileName.replace(/.*tsubasa2[\\/]/, '') : '';
  console.log(f + (d.start !== undefined ? ':' + d.start : ''));
  console.log('  ' + ts.flattenDiagnosticMessageText(d.messageText, '\n').split('\n')[0]);
}
