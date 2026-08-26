#!/usr/bin/env python
"""Count address occurrences."""
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read()
print('total chars:', len(data))
for addr in ['$0026','$4016','$8464','$2000','$2001','$2006','$2007','$8000','$8001','$0700','$0044','$004C']:
    print(f'{addr} count: {data.count(addr)}')
