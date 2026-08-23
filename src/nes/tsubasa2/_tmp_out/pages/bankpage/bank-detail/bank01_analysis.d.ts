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
    jumpTable: {
        bankAddr: string;
        target: string;
        desc: string;
    }[];
    calledFromBank30: {
        note: string;
        entryPoints: {
            addr: string;
            caller: string;
            desc: string;
        }[];
    };
    subroutines: ({
        startBankAddr: string;
        name: string;
        length: string;
        desc: string;
        note: string;
    } | {
        startBankAddr: string;
        name: string;
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
    ramMap: {
        addr: string;
        name: string;
        desc: string;
    }[];
    crossRefs: {
        addr: string;
        name: string;
        desc: string;
    }[];
    internalRefs: {
        caller: string;
        callee: string;
        desc: string;
    }[];
    architecture: {
        role: string;
        pattern: string;
        bootFlow: string;
        menuFlow: string;
        dataFlow: string;
        dependees: string[];
        note: string;
    };
    menuStructure: {
        totalScreens: number;
        totalItems: number;
        note: string;
        possibleItems: string[];
    };
};
export default data;
