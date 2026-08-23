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
    interruptVectors: {
        NMI: {
            bankAddr: string;
            asmLine: number;
            target: string;
            desc: string;
        };
        RESET: {
            bankAddr: string;
            asmLine: number;
            target: string;
            desc: string;
        };
        IRQ: {
            bankAddr: string;
            asmLine: number;
            target: string;
            desc: string;
        };
    };
    jumpTable: {
        bankAddr: string;
        target: string;
        desc: string;
    }[];
    subroutines: ({
        startBankAddr: string;
        name: string;
        asmLine: number;
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
        length: string;
        desc: string;
        note: string;
    } | {
        bankAddr: string;
        displayName: string;
        length: string;
        desc: string;
        note?: undefined;
    })[];
    resetFlow: ({
        step: number;
        addr: string;
        asmLine: string;
        desc: string;
    } | {
        step: number;
        addr: string;
        asmLine: null;
        desc: string;
    } | {
        step: number;
        addr: string;
        asmLine: number;
        desc: string;
    } | {
        step: string;
        addr: string;
        asmLine: null;
        desc: string;
    })[];
    ramMap: {
        addr: string;
        name: string;
        desc: string;
    }[];
    crossRefs: {
        addr: string;
        name: string;
        locations: string;
    }[];
    architecture: {
        role: string;
        pattern: string;
        bootFlow: string;
        nniFlow: string;
        irqFlow: string;
        dependees: string[];
    };
};
export default data;
