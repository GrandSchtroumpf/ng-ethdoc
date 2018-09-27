import { Contract, Compiled, ContractDoc, MethodDoc } from './../models/contract';
import { Injectable } from '@angular/core';

import * as wrapper from 'solc/wrapper';

@Injectable({
  providedIn: 'root'
})
export class Compiler {

  private solc;

  constructor() {
    this.solc = wrapper(window['Module']);
  }

  private compile(sources) {
    console.log(sources['Test.sol']);
    return this.solc.compile(sources['Test.sol'], 1);
  }

  public compileOne(code: string): Compiled {
    return this.solc.compile(code, 1);
  }

  // TODO : Add more data about the doc (from ABI)

  public getDoc(contract: Contract): ContractDoc {
    const getValueFromSubKey = (collection: Object, subKey: string): Object => {
      for (const key in collection) {
        if (key.includes(subKey)) { return collection[key]; }
      }
      return;
    };
    const metadata = JSON.parse(contract.metadata);
    console.log('metadata', metadata);
    const abi = metadata.output.abi;
    const methods = abi.reduce((acc: Object, def) => {
      const methodDoc = {
        ...getValueFromSubKey(metadata.output.devdoc.methods, def.name),
        ...getValueFromSubKey(metadata.output.userdoc.methods, def.name)
      };
      return { ...acc, [def.name] :  methodDoc };
    }, {});
    return { ...metadata.output.devdoc, methods };

  }
}
