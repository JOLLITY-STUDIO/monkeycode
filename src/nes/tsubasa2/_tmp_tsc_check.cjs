const fs = require('fs');
let out = [];
try {
  const ts = require('typescript');
  out.push('ts loaded');
  const p = 'tsconfig.json';
  const cfg = ts.readConfigFile(p, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, '.');
  out.push('files: ' + parsed.fileNames.length);
  const host = ts.createCompilerHost(parsed.options);
  const program = ts.createProgram(parsed.fileNames, parsed.options, host);
  const diags = ts.getPreEmitDiagnostics(program);
  const errs = diags.filter(d => d.category === ts.DiagnosticCategory.Error);
  out.push('ERRORS: ' + errs.length);
  errs.slice(0, 25).forEach(d => {
    const f = d.file ? d.file.fileName : '(none)';
    let line = '';
    if (d.file && d.start != null) {
      const pos = d.file.getLineAndCharacterOfPosition(d.start);
      line = ':' + (pos.line + 1);
    }
    out.push(f + line + ' ' + ts.flattenDiagnosticMessageText(d.messageText, ' '));
  });
} catch (e) {
  out.push('EXC: ' + (e && e.message ? e.message : String(e)));
  out.push((e && e.stack) || '');
}
fs.writeFileSync('_tmp_tsc_result.txt', out.join('\n'));
console.log('done ' + out.length + ' lines');
