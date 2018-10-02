import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ContractDoc } from './../../models/contract';

import { Compiler } from './../../services/compiler.service';
import { ContractService } from './../../services/contract.service';
import { MonacoFile } from 'ngx-monaco';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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

  private async compile(code: string) {
    const compiled = await this.compiler.compileOne(code);
    if (Object.keys(compiled.contracts).length === 0) {
      throw new Error('Got compilation errors : ' + compiled.errors);
    }
    const contractName = Object.keys(compiled.contracts)[0];
    return this.compiler.getDoc(compiled.contracts[contractName]);
  }

  public save(event: KeyboardEvent, contract: ContractDoc) {
    event.preventDefault();
    this.compile(this.code)
      .then(doc => this.service.update({...contract, ...doc, code: this.code}))
      .then(() => this.snackBar.open('Saved', 'close', {duration: 2000}))
      .catch(err => {
        this.snackBar.open('Cannot compile or save', 'close', {duration: 2000});
        console.error('Cannot compile', err);
      });
  }

}
