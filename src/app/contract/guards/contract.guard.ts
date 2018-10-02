import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ContractService } from '../services/contract.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContractGuard implements CanActivate {

  constructor(public service: ContractService) {}

  canActivate(): Observable<boolean> {
    return this.service.contracts$.pipe(
      filter(contracts => !!contracts),
      map(() => true)
    );
  }

}
