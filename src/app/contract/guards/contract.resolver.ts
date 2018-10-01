import { ContractService } from './../services/contract.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, first, filter } from 'rxjs/operators';
import { ContractDoc } from '../models/contract';

@Injectable({ providedIn: 'root' })
export class ContractResolver implements Resolve<ContractDoc> {

  constructor(
    private service: ContractService,

  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ContractDoc> {
    const name = route.params.name;
    return this.service.contracts$.pipe(
      filter(contracts => !!contracts),
      first(),
      map(contracts => contracts.find(c => c.name === name))
    );
  }
}
