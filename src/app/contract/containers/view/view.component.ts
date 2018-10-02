import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContractDoc } from '../../models/contract';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EthersService } from '../../services/ethers.service';

@Component({
  selector: 'contract-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public contract$: Observable<ContractDoc>;
  public network$: Observable<string>;

  constructor(
    private ethers: EthersService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.contract$ = this.route.data.pipe(map(data => data.contract));
    this.network$ = this.ethers.provider$.pipe(
      switchMap(provider => provider.getNetwork()),
      map(network => network.name)
    );
  }

}
