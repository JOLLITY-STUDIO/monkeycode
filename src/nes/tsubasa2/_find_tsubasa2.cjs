var fs = require('fs');
var path = require('path');
function walk(d) {
  var r = [];
  fs.readdirSync(d).forEach(function(f) {
    var p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'node_modules' || f === '.git' || f === 'dist') return;
      r = r.concat(walk(p));
    } else if (f.endsWith('.ts') || f.endsWith('.js')) {
      r.push(p);
    }
  });
  return r;
}
var files = walk('.');
console.log('=== Tsubasa2 引用 ===');
files.forEach(function(f) {
  if (f.includes('node_modules')) return;
  var s = fs.readFileSync(f, 'utf8');
  if (s.includes('Tsubasa2')) {
    var lines = s.split('\n');
    lines.forEach(function(l, i) {
      if (l.includes('Tsubasa2') && !l.includes('Tsubasa2.js')) {
        console.log(f + ':' + (i+1) + ': ' + l.trim().slice(0, 80));
      }
    });
  }
});
