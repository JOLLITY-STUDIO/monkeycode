"""定位 Bank 0 中读取 Bank 7 的函数"""
import os

def find_bank7_refs():
    asm_path = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'banks', 'bank_00_code.asm')
    
    with open(asm_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find references to Bank 7 address range ($C000-$FFFF)
    refs = []
    for i, line in enumerate(lines):
        if '$C0' in line or '$D0' in line or '$E0' in line or '$F0' in line:
            # Check for specific instruction patterns
            if any(pat in line for pat in ['LDA $C', 'LDA $D', 'LDA $E', 'LDA $F', 
                                            'STA $C', 'STA $D', 'STA $E', 'STA $F',
                                            'CMP $C', 'CMP $D', 'CMP $E', 'CMP $F',
                                            'LDX $C', 'LDX $D', 'LDX $E', 'LDX $F',
                                            'LDY $C', 'LDY $D', 'LDY $E', 'LDY $F',
                                            'ADC $C', 'ADC $D', 'ADC $E', 'ADC $F',
                                            'SBC $C', 'SBC $D', 'SBC $E', 'SBC $F',
                                            'AND $C', 'AND $D', 'AND $E', 'AND $F',
                                            'ORA $C', 'ORA $D', 'ORA $E', 'ORA $F',
                                            'BIT $C', 'BIT $D', 'BIT $E', 'BIT $F',
                                            'JSR $C', 'JSR $D',
                                            '$C000', '$C001', '$C002', '$C003', '$C004', '$C005']):
                refs.append((i+1, line.rstrip()))
    
    print(f'Found {len(refs)} Bank 7 ($C000-$FFFF) references in Bank 0:')
    for line_num, line in refs:
        print(f'  Line {line_num}: {line.strip()}')
    
    # Also find the function at $83F0
    print('\n=== Function at $83F0 ===')
    in_func = False
    func_lines = []
    for i, line in enumerate(lines):
        if '00:83F0:' in line or '00:83E0:' in line:
            in_func = True
        if in_func:
            func_lines.append((i+1, line.rstrip()))
            if 'RTS' in line and ': 60' in line:
                break
            if len(func_lines) > 30:
                break
    
    for line_num, line in func_lines[-30:]:
        print(f'  Line {line_num}: {line.strip()}')

if __name__ == '__main__':
    find_bank7_refs()
