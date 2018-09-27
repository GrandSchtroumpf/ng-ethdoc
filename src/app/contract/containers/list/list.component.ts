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

  constructor(private service: ContractService) { }

  ngOnInit() {
    this.contracts$ = this.service.contracts$;
  }

}
