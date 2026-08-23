declare const data: {
    bankId: number;
    baseAddr: number;
    bankAddrBase: number;
    stats: {
        totalLines: number;
        codeBytes: number;
        dataBytes: number;
        unaccessedBytes: number;
        subroutineCount: number;
        dataTableCount: number;
        note: string;
        note2: string;
    };
    dataSections: ({
        bankAddr: string;
        offset: string;
        lines: string;
        length: string;
        name: string;
        desc: string;
        format: string;
        sample: {
            index: number;
            lo: string;
            hi: string;
            target: string;
        }[];
        note: string;
        opcodes?: undefined;
        dataTypes?: undefined;
        verify?: undefined;
    } | {
        bankAddr: string;
        offset: string;
        lines: string;
        length: string;
        name: string;
        desc: string;
        format: string;
        opcodes: {
            code: string;
            desc: string;
        }[];
        dataTypes: {
            range: string;
            desc: string;
        }[];
        sample?: undefined;
        note?: undefined;
        verify?: undefined;
    } | {
        bankAddr: string;
        offset: string;
        length: string;
        name: string;
        desc: string;
        lines?: undefined;
        format?: undefined;
        sample?: undefined;
        note?: undefined;
        opcodes?: undefined;
        dataTypes?: undefined;
        verify?: undefined;
    } | {
        bankAddr: string;
        offset: string;
        lines: string;
        length: string;
        name: string;
        desc: string;
        verify: string;
        format?: undefined;
        sample?: undefined;
        note?: undefined;
        opcodes?: undefined;
        dataTypes?: undefined;
    } | {
        bankAddr: string;
        offset: string;
        lines: string;
        length: string;
        name: string;
        desc: string;
        format?: undefined;
        sample?: undefined;
        note?: undefined;
        opcodes?: undefined;
        dataTypes?: undefined;
        verify?: undefined;
    })[];
    dataFormat: {
        pointerTable: {
            desc: string;
            entrySize: string;
            totalEntries: string;
            addressing: string;
        };
        commandStream: {
            desc: string;
            sample: string;
        };
        entityRecord: {
            desc: string;
            fields: {
                offset: number;
                size: number;
                name: string;
            }[];
        };
    };
    bankRelations: {
        summary: string;
        knownCallers: {
            bank: string;
            status: string;
            desc: string;
        }[];
        note: string;
    };
    quality: {
        cdlCoverage: string;
        paddingStart: string;
        issues: string[];
    };
};
export default data;
