#!/usr/bin/env python3
"""Search GitHub HTML for SSEQ parser repos, then download the top candidate."""
import os
import re
import urllib.request
import urllib.parse

OUT = os.path.join(os.path.dirname(__file__), '..', 'work', 'sseq_parser')


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=90).read()


def main():
    q = urllib.parse.quote('sseq2mid language:C')
    html = get(f'https://github.com/search?q={q}&type=repositories').decode('utf-8', 'replace')
    repos = re.findall(r'href="/([A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+)"', html)
    seen = []
    for r in repos:
        if r not in seen and not r.startswith(('search', 'settings', 'features', 'topics')):
            seen.append(r)
    for r in seen[:20]:
        print(r)


if __name__ == '__main__':
    main()
