export interface ContractDoc {
  name: string;
  code: string;
  owner: string;
  title: string;
  author: string;
  methods: {
    [method: string]: MethodDoc;
  };
}

export interface MethodDoc {
  name: string;
  author: string;
  details: string;
  notice: string;
  constant: boolean;
  payable: boolean;
  stateMutability: 'pure' | 'payable';
  type: 'function' | 'constructor';
  params: {
      name: string;
      type: string;
      description: string;
      // Only for memory usage
      value?: any;
  }[];
  return: {
    description,
    outputs: {
      name: string,
      type: string,
      // Only for memory usage
      value?: any;
    }[];
  };

}

export interface Compiled {
  contracts: {
    [name: string]: Contract;
  };
  sourceList: string[];
  sources: {
    [name: string]: SolidityAST
  };
  errors: string[];
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
