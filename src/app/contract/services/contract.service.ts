import { ActivatedRoute } from '@angular/router';
import { map, filter, tap, first } from 'rxjs/operators';
import { Compiler } from './compiler.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Contract, ContractDoc } from './../models/contract';
import { Remix } from '@devdoc/core';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private collection: AngularFirestoreCollection<ContractDoc>;
  public contracts = new BehaviorSubject<ContractDoc[]>(null);
  public contracts$ = this.contracts.asObservable();

  public contract = new BehaviorSubject<ContractDoc>(null);
  public contract$ = this.contract.asObservable();

  constructor(
    private db: AngularFirestore,
    private remix: Remix,
    private compiler: Compiler
  ) {
    this.collection = this.db.collection<ContractDoc>('contracts');
    this.collection.valueChanges()
      .subscribe(contracts => this.contracts.next(contracts));

    // Get current contract from remix
    this.remix.currentFile.pipe(
      filter(code => !!code),
      first(),
      map(code => this.compiler.getDocFromCode(code)),
      tap(console.log),
    ).subscribe((contract: ContractDoc) => this.contract.next(contract));
  }

  public getContractFromRemix() {
    this.remix.request('editor', 'getCurrentFile');
  }

  public add(doc: Partial<ContractDoc>) {
    console.log({doc});
    return this.collection.doc<ContractDoc>(doc.name).set(doc as ContractDoc);
  }

  public update(doc: Partial<ContractDoc>) {
    return this.collection.doc<ContractDoc>(doc.name).update(doc);
  }
}
