import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Contract, ContractDoc } from './../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private collection: AngularFirestoreCollection<ContractDoc>;
  public contracts = new BehaviorSubject<ContractDoc[]>(null);
  public contracts$ = this.contracts.asObservable();

  constructor(private db: AngularFirestore) {
    this.collection = this.db.collection<ContractDoc>('contracts');
    this.collection.valueChanges()
      .subscribe(contracts => this.contracts.next(contracts));
  }

  public add(doc: Partial<ContractDoc>) {
    return this.collection.doc<ContractDoc>(doc.name).set(doc as ContractDoc);
  }

  public update(doc: Partial<ContractDoc>) {
    return this.collection.doc<ContractDoc>(doc.name).update(doc);
  }
}
