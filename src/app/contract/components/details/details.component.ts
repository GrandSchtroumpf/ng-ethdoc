import { ContractDoc } from './../../models/contract';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'contract-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input()
  public contract: ContractDoc;
  @Input()
  public network: string;

  constructor() { }

  ngOnInit() {
  }

}
