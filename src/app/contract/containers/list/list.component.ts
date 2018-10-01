import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { ContractDoc } from './../../models/contract';

@Component({
  selector: 'contract-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public contracts$: Observable<ContractDoc[]>;
  public newContract: boolean;

  constructor(private service: ContractService) { }

  ngOnInit() {
    this.contracts$ = this.service.contracts$;
  }

  public save(name: string) {
    this.newContract = false;
    if (!name || name.length === 0) { return; }
    this.service.add({name})
      .then(() => console.log('success'))
      .catch((err) => console.error(err));
  }
}
