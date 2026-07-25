import * as fs from 'fs';
fs.writeFileSync('test_output/_ping.txt', 'tsx works: ' + new Date().toISOString());
