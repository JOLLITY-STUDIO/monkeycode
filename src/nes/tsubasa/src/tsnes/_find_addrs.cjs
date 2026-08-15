const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
const pats = [
  'A000:', 'A01E:', 'A10D:', 'A39B:', 'A4EB:', 'A64C:', 'A6D2:', 'AF79:',
  'AF8A:', 'AFC2:', 'B050:', '9E4F:', '9D27:', '9D50:', '9DB5:', '9DEE:',
  '9E0C:', '9E7C:', '9D08:', '997A:', '997E:', '99F0:', '9895:', '97AB:',
  '97AD:', '97B6:', '97B8:', '8920:', '82A9:', '8464:', 'A63C:', '9C3A:',
  '9BE8:', '9C28:', '9C71:', '9CC9:', '9CD3:', '9C0D:', '9D73:', '9D8E:',
  '9C3C:', 'B1BB:', 'B1C9:', 'B1D3:', 'B1DE:', 'B255:', 'B0C0:', 'B016:',
  'B02E:', 'B045:', '88CA:', '98EA:', '9BA0:', '9FA8:', '9CA0:', '9CAA:',
  '9CB4:', '9CE0:', '9CF2:', '9D0D:', '9D20:'
];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const p of pats) {
    if (line.indexOf(p) > -1 && /^\s*[0-9A-F]{6}/.test(line) && line.includes(p)) {
      console.log((i + 1) + ': ' + line.trim());
      break;
    }
  }
}
