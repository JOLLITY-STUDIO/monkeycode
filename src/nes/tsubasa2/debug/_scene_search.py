#!/usr/bin/env python
import os, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = r'd:\studio\github\monkeycode\src\nes\tsubasa2\src\game'
terms = ['changeScene','SceneId','TITLE_SCENE','MENU_SCENE','enum Scene','OPENG','TITLE','MENU']
for root, dirs, files in os.walk(ROOT):
    for fn in files:
        if fn.endswith('.ts'):
            p = os.path.join(root, fn)
            with open(p, 'r', encoding='utf-8', errors='replace') as f:
                data = f.read()
            hits = []
            for term in terms:
                if term in data:
                    hits.append(term)
            if hits:
                print(f'{p}: {hits}')
