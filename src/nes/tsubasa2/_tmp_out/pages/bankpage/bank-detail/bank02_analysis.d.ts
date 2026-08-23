declare const data: {
    bankId: number;
    baseAddr: number;
    prgOffset: number;
    stats: {
        totalLines: number;
        codeBytes: number;
        dataBytes: number;
        unaccessedBytes: number;
        subroutineCount: number;
        dataTableCount: number;
        jsrCount: number;
        jmpCount: number;
        ldaDataCount: number;
        note: string;
    };
    subroutines: ({
        startLine: number;
        endLine: number;
        startAddr: number;
        endAddr: number;
        startBankAddr: string;
        endBankAddr: string;
        length: number;
        name: string;
        displayName: string;
        note?: undefined;
    } | {
        startLine: number;
        endLine: number;
        startAddr: number;
        endAddr: number;
        startBankAddr: string;
        endBankAddr: string;
        length: number;
        name: string;
        displayName: string;
        note: string;
    })[];
    dataTables: ({
        startLine: number;
        endLine: number;
        startAddr: number;
        endAddr: number;
        startBankAddr: string;
        endBankAddr: string;
        length: number;
        displayName: string;
        knownName?: undefined;
    } | {
        startLine: number;
        endLine: number;
        startAddr: number;
        endAddr: number;
        startBankAddr: string;
        endBankAddr: string;
        length: number;
        knownName: string;
        displayName: string;
    })[];
    refs: ({
        from: number;
        fromBankAddr: string;
        to: number;
        op: string;
        line: number;
        kind?: undefined;
    } | {
        from: number;
        fromBankAddr: string;
        to: number;
        op: string;
        line: number;
        kind: string;
    })[];
    blocks: {
        type: string;
        startAddr: number;
        endAddr: number;
        startLine: number;
        endLine: number;
        length: number;
    }[];
};
export default data;
