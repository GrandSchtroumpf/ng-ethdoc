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

  /** Get all documentation data for one method */
  private getDocForMethod({ inputs, outputs }, devdoc) {
    return {
      ...devdoc,
      params:  inputs.map(({name, type}) => ({ name, type, description: devdoc.params[name] || '' })),
      return: { outputs, description: devdoc.return || '' }
    };
  }

  public compileOne(code: string): Compiled {
    return this.solc.compile(code, 1);
  }


  /**
   * Get the Documentation of a contract
   * @param contract The compiled contract to get the documentation from
   */
  public getDoc(contract: Contract): Partial<ContractDoc> {
    const metadata = JSON.parse(contract.metadata);
    const abi = metadata.output.abi;
    // Get doc from all methods
    const methods = abi.map(def => {
      const {name, payable, type, constant, stateMutability } = def;
      let methodDoc = {};
      // Get the method: need to use includes because method looks like that : "methodName(type param)" and not "methodName"
      for (const key in metadata.output.devdoc.methods) {
        if (key.includes(name)) {
          methodDoc = {
            ...metadata.output.devdoc.methods[key],
            ...metadata.output.userdoc.methods[key]
          };
        }
      }
      return { name, payable, type, constant, stateMutability, ...this.getDocForMethod(def, methodDoc) };
    });
    const { title, author } = metadata.output.devdoc;
    return {title, author, methods};
  }
}
