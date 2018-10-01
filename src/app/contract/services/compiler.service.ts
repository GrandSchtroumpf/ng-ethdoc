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

    /** Get params from a methods, combining abi and devdoc */
    const getParams = (inputs, params) => {
      return inputs.reduce((all, {name, type}) => {
        const description = params[name] || null;
        const param = { type, description };
        return { ...all, [name]: param };
      }, {});
    };
    /** Get return value of a methods, combining abi and devdoc */
    const getReturns = (outputs, description) => {
      return outputs.reduce((all, { name, type }) => {
        return { ...all, [name || 'anonymous']: { type, description }};
      }, {});
    };
    /** Get all documentation data for one method */
    const getDocForMethod = ({name, inputs, outputs}, devdoc) => {
      console.log({devdoc});
      return {
        [name]: {
          ...devdoc,
          params: getParams(inputs, devdoc.params),
          return: getReturns(outputs, devdoc.return)
        }
      };
    };

    const metadata = JSON.parse(contract.metadata);
    const abi = metadata.output.abi;
    /** Get doc from all methods */
    const methods = abi.reduce((acc: Object, def) => {

     // Get the method: need to use includes because method looks like that : "methodName(type param)" and not "methodName"
      for (const key in metadata.output.devdoc.methods) {
        if (key.includes(def.name)) {
          const methodDoc = {
            ...metadata.output.devdoc.methods[key],
            ...metadata.output.userdoc.methods[key]
          };
          return { ...acc, ...getDocForMethod(def, methodDoc) };
        }
      }
      return acc; // if no doc provided for this method
    }, {});

    return { ...metadata.output.devdoc, methods };

  }
}
