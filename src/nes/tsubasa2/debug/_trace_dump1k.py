#!/usr/bin/env python
"""Dump first 1000 chars of opening-all.log for inspection."""
with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read(2000)
print(data)
