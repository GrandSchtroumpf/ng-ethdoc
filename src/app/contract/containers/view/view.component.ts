import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContractDoc } from '../../models/contract';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'contract-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public contract$: Observable<ContractDoc>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.contract$ = this.route.data.pipe(map(data => data.contract));
  }

}
