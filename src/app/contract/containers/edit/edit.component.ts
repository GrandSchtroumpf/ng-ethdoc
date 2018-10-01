import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ContractDoc } from './../../models/contract';

import { Compiler } from './../../services/compiler.service';
import { ContractService } from './../../services/contract.service';
import { MonacoFile } from 'ngx-monaco';


@Component({
  selector: 'contract-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public contract$: Observable<ContractDoc>;
  public file: MonacoFile;
  public code: string;

  constructor(
    private compiler: Compiler,
    private service: ContractService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.contract$ = this.route.data.pipe(
      map(data => data.contract),
      tap(doc => this.setFile(doc))
    );
  }

  private setFile({name, code}: ContractDoc) {
    this.code = code || '';
    this.file = { uri: `${name}.sol`, language: 'sol', content: this.code };
  }

  private compile(code: string) {
    const compiled = this.compiler.compileOne(code);
    const contractName = Object.keys(compiled.contracts)[0];
    return this.compiler.getDoc(compiled.contracts[contractName]);
  }

  public save(event: KeyboardEvent, contract: ContractDoc) {
    event.preventDefault();
    const doc = this.compile(this.code);
    this.service.add({...contract, ...doc, code: this.code});
  }

}
