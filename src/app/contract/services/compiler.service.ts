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
    const params = devdoc.params || {};
    return {
      ...devdoc,
      params:  inputs.map(({name, type}) => ({ name, type, description: params[name] || '' })),
      return: { outputs, description: devdoc.return || '' }
    };
  }

  /** Return a well formated documentation from a code */
  public getDocFromCode(code: string): Partial<ContractDoc> {
    const compiled = this.compileOne(code);
    const names = this.getContractsName(compiled);
    const contract = this.getContractFromCode(code);
    const doc = this.getDoc(contract);
    return { ...doc, name: names[0], code };
  }

  /** Return the contract details from a code */
  public getContractFromCode(code: string) {
    const compiled = this.compileOne(code);
    const names = this.getContractsName(compiled);
    return compiled.contracts[`:${names[0]}`];
  }

  /** Return the name of each contract depending on the name of the contract in the code */
  public getContractsName(compiled: Compiled): string[] {
    return Object.keys(compiled.contracts).map(name => {
      const names = name.split(':');
      return names[names.length - 1];
    });
  }

  /** Compile One Contract */
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
