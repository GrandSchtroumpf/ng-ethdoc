import { Component, OnInit, Input } from '@angular/core';
import { ContractDoc } from './../../models/contract';
import { Compiler } from '../../services/compiler.service';

@Component({
  selector: 'contract-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input()
  public contract: ContractDoc;
  @Input()
  public network: string;

  private showAbi: boolean;
  public compiled: any;
  public code: string;

  constructor(public compiler: Compiler) { }

  ngOnInit() {
    this.updateCode();
  }

  private updateCode() {
    let abi: string;
    if (this.showAbi && !!this.compiled) {
      abi = `
const abi = ${this.compiled.interface};
const bytecode = '${this.compiled.bytecode}';`;
    } else {
      abi = `
const abi = [];      // Here goes the ABI of the contract
const bytecode = ''; // Here goes the bytecode of the contract`;
    }
    this.code = `const ethers = require('ethers');

const provider = ethers.getDefaultProvider('${this.network || 'default'}');
${abi}
const ${this.contract.name}Contract = new ethers.Contract(contractAddress, abi, provider);
    `;
  }

  public compile() {
    const compiled = this.compiler.compileOne(this.contract.code);
    const contractName = Object.keys(compiled.contracts)[0];
    this.compiled = compiled.contracts[contractName];
    this.showAbi = true;
    this.updateCode();
  }

}
