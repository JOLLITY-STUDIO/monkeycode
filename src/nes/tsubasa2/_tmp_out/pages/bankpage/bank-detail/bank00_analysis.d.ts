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
        note3: string;
        tecmoTheater: {
            traceFile: string;
            frameRange: string;
            type: string;
            sceneId: string;
            bootChain: string;
            note: string;
            keyFunctions: {
                addr: string;
                name: string;
                role: string;
            }[];
        };
    };
    jumpTable: {
        index: number;
        lo: string;
        hi: string;
        target: string;
        desc: string;
    }[];
    entryPoints: {
        addr: string;
        name: string;
        desc: string;
    }[];
    sceneInitFlow: {
        desc: string;
        steps: ({
            step: number;
            addr: string;
            asmLine: number;
            asm: string;
            action: string;
        } | {
            step: number;
            addr: string;
            asmLine: null;
            asm: null;
            action: string;
        } | {
            step: string;
            addr: string;
            asmLine: number;
            asm: string;
            action: string;
        })[];
    };
    subroutines: ({
        bankAddr: string;
        name: string;
        asmLine: number;
        length: string;
        desc: string;
        note: string;
        crossRefs?: undefined;
    } | {
        bankAddr: string;
        name: string;
        asmLine: number;
        length: string;
        desc: string;
        note?: undefined;
        crossRefs?: undefined;
    } | {
        bankAddr: string;
        name: string;
        asmLine: number;
        length: string;
        desc: string;
        note: string;
        crossRefs: {
            from: string;
            bankAddr: string;
            asmLine: number;
            op: string;
            desc: string;
        }[];
    })[];
    dataTables: {
        bankAddr: string;
        name: string;
        length: string;
        desc: string;
    }[];
    bankDependencies: {
        summary: string;
        directSwitches: {
            bank: number;
            count: string;
            via: string;
            desc: string;
        }[];
        viaBank30: {
            bank: number;
            count: string;
            via: string;
            desc: string;
        }[];
        bank30Calls: {
            addr: string;
            desc: string;
        }[];
        bank31Interface: string;
        notReferenced: string;
    };
    ramVariables: {
        addr: string;
        name: string;
        note: string;
    }[];
    crossReferences: {
        calledFrom: {
            from: string;
            desc: string;
        }[];
        callsTo: {
            to: string;
            desc: string;
        }[];
    };
};
export default data;
