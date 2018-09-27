import { ContractDoc } from './../../models/contract';
import { Component, OnInit } from '@angular/core';

import { Compiler } from './../../services/compiler.service';
import { ContractService } from './../../services/contract.service';


@Component({
  selector: 'contract-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private compiler: Compiler,
    private service: ContractService
  ) { }

  ngOnInit() {
  }

  public compile(code: string) {
    const compiled = this.compiler.compileOne(code);
    console.log('compiled', compiled);
    const contractName = Object.keys(compiled.contracts)[0];
    const doc = this.compiler.getDoc(compiled.contracts[contractName]);
    console.log('Doc', doc);
    // this.add(doc);
  }

  public add(doc: ContractDoc) {
    this.service.add(doc);
  }
}
