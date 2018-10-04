import { Component, OnInit } from '@angular/core';
import { AuthService } from '@devdoc/core';
import { ContractService } from '../../services/contract.service';
import { Observable } from 'rxjs';
import { ContractDoc } from '../../models/contract';

@Component({
  selector: 'contract-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  public contract$: Observable<ContractDoc>;

  constructor(
    private service: ContractService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.service.getContractFromRemix();
    this.contract$ = this.service.contract$;
  }

  public save(contract: ContractDoc) {
    console.log({contract});
    this.auth.isLoggedIn()
      .then((isLoggedIn) => isLoggedIn ? Promise.resolve() : this.auth.login())
      .then(() => this.service.add(contract))
      .catch(err => console.error('Could not save contract', err));
  }
}
