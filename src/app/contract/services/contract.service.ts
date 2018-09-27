import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contract, ContractDoc } from './../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public contracts$: Observable<ContractDoc[]>;

  constructor(private db: AngularFirestore) {
    this.contracts$ = this.db.collection<ContractDoc>('contracts').valueChanges();
  }

  public add(doc: ContractDoc) {
    this.db.collection('contracts').add(doc);
  }
}
