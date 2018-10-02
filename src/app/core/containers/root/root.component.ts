import { Component, OnInit, HostListener } from '@angular/core';
import { Remix } from '../../services/remix.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private remix: Remix) { }

  @HostListener('window:message', ['$event'])
  onMessage(e: MessageEvent) {
    this.remix.getMsg(e);
  }

  ngOnInit() {

  }

}
