import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { ContractDoc } from './../../models/contract';
import { Compiler } from '../../services/compiler.service';

@Component({
  selector: 'contract-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  @Input()
  public contract: ContractDoc;
  @Input()
  public network: string;

  private showAbi: boolean;
  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;
  public compiled: any;
  public code: string;

  constructor(
    private compiler: Compiler,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.updateCode();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
    this.compiled = this.compiler.getContractFromCode(this.contract.code);
    console.log({ compiled: this.compiled });
    this.showAbi = true;
    this.updateCode();
  }

}
