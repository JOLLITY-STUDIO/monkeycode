declare const data: {
    bankId: number;
    baseAddr: number;
    bankAddrBase: number;
    mappedVia: string;
    stats: {
        totalBytes: number;
        codeBytes: number;
        dataBytes: number;
        unaccessedBytes: number;
        subroutineCount: number;
        dataTableCount: number;
        note: string;
    };
    structure: {
        blockCount: number;
        blockSize: number;
        blockRange: {
            start: number;
            end: number;
        };
        pointerTable: {
            offset: number;
            count: number;
            entrySize: number;
            targetRange: {
                start: number;
                end: number;
            };
            endMark: number;
        };
        rosterArea: {
            offset: number;
            end: number;
            format: string;
        };
        ffFill: {
            offset: number;
            length: number;
        };
    };
    rosterPointers: number[];
    consumers: {
        bank: number;
        count: number;
        addresses: string[];
        desc: string;
    }[];
    loaders: {
        bank: number;
        pattern: string;
        desc: string;
    }[];
    dataTables: {
        name: string;
        bankAddr: string;
        length: string;
        desc: string;
    }[];
};
export default data;
