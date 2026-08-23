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
    subroutines: ({
        startBankAddr: string;
        asmLine: number;
        name: string;
        length: string;
        desc: string;
        note: string;
    } | {
        startBankAddr: string;
        name: string;
        asmLine: number;
        length: string;
        desc: string;
        note?: undefined;
    })[];
    dataTables: ({
        bankAddr: string;
        displayName: string;
        asmLine: number;
        length: string;
        desc: string;
        note?: undefined;
    } | {
        bankAddr: string;
        displayName: string;
        length: string;
        desc: string;
        note: string;
        asmLine?: undefined;
    } | {
        bankAddr: string;
        displayName: string;
        asmLine: number;
        length: string;
        desc: string;
        note: string;
    })[];
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
        dependees: string[];
        bootFlow: string;
        nmiFlow: string;
        irqFlow: string;
    };
    debug: {
        modes: {
            key: string;
            label: string;
            desc: string;
            fields: {
                param: string;
                label: string;
                defaultValue: string;
                maxlen: number;
            }[];
            handler: string;
        }[];
    };
};
export default data;
