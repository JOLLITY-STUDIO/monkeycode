// Find specific routine addresses in _b00_shared_full.txt
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '_b00_shared_full.txt');
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

const targets = ['8920', '82A9', 'C527', 'C50C', 'C53C', 'C54B', '997A', '997E', '88CA', '9895', '98E8', '98EA', '9D73', '9D8E', '9DB5', '9DEE', '9E0C', '9E4F', '9E7C', '9D27', '9D50', '9B28', '9B5E', '9B6F', '9B74', '9B7F', '9BE3', '9BE8', '9C0D', '9C28', '9C3A', '9C3C', '9C71', '9CC9', '9CD3', '9D08', '89A3', '9BA0', '9FA8', '9CE7', '9BCA'];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const t of targets) {
    // match address patterns like "8920" as a 4-hex label
    if (new RegExp(`\\b${t}\\b`).test(line)) {
      console.log(`${String(i).padStart(5)}: ${line}`);
    }
  }
}
