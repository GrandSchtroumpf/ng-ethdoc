import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';

declare const web3;

@Injectable({ providedIn: 'root' })
export class EthersService {

  private _provider = new BehaviorSubject<ethers.providers.Web3Provider>(null);
  public provider$ = this._provider.asObservable();

  constructor() {
    this._provider.next(new ethers.providers.Web3Provider(web3.currentProvider));
  }

  public deploy() {
    const provider = this._provider.getValue();

  }
}
