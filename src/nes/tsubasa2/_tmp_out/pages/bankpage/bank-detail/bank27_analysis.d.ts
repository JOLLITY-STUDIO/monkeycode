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
    };
    subroutines: {
        startBankAddr: string;
        name: string;
        asmLine: number;
        length: string;
        desc: string;
        note: string;
    }[];
    dataTables: {
        name: string;
        bankAddr: string;
        length: string;
        desc: string;
    }[];
    deps: {
        dependsOn: {
            bank: number;
            what: string;
        }[];
        usedBy: {
            bank: number;
            what: string;
        }[];
    };
    ramMap: {
        addr: string;
        name: string;
        desc: string;
    }[];
    crossRefs: {
        addr: string;
        desc: string;
        locations: string;
    }[];
    architecture: {
        role: string;
        pattern: string;
        h5Files: string[];
    };
};
export default data;
