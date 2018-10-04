import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { Remix } from '../../services/remix.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(
    private remix: Remix,
    private router: Router
  ) { }

  @HostListener('window:message', ['$event'])
  onMessage(e: MessageEvent) {
    this.remix.getMsg(e);
  }

  ngOnInit() {
    if (this.remix.parentIsRemix) {
      this.router.navigate(['contract/preview']);
    }
  }

}
