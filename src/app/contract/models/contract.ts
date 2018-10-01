export interface Compiled {
  contracts: {
    [name: string]: Contract;
  };
  sourceList: string[];
  sources: {
    [name: string]: SolidityAST
  };
}


export interface Contract {
  assembly: {
    ['.code']: Opecode[];
    ['.data']: {
      ['.auxdata']: string;
      ['.code']: Opecode[];
    }
  };
  bytecode: string;
  functionHashes: {
    [functionName: string]: string;
  };
  interface: string;
  metadata: string;
  opecode: string;
}

export interface ContractDoc {
  name: string;
  code: string;
  title: string;
  author: string;
  methods: {
    [method: string]: MethodDoc;
  };
}

export interface MethodDoc {
  author: string;
  details: string;
  notice: string;
  params: {
    [name: string]: string;
  };
  return: string;
}

export interface Opecode {
  begin: number;
  end: number;
  name: 'PUSH' | 'MSTORE' | 'CALLVALUE' | string; // TODO : add all opecodes
  value: string;
}

// TODO : complete
export interface SolidityAST {
  id: number;
}
