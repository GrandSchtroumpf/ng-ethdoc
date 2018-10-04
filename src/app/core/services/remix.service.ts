import { RemixMsg } from "./../models/remix";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class Remix {
  private remixUrl = [
    "http://remix-alpha.ethereum.org",
    "http://remix.ethereum.org",
    "https://remix-alpha.ethereum.org",
    "https://remix.ethereum.org"
  ];
  private source: Window;
  private msgId = 0;
  public parentIsRemix: boolean;

  // Store of remix values
  public currentFile = new BehaviorSubject<string>(null);

  constructor(router: Router) {
    // if (this.remixUrl.indexOf(window.parent.) !== -1) { return; }
    this.source = window.parent;
    this.parentIsRemix = true; // TODO: wait for handshake
  }

  private dispatchEvent(event: RemixMsg) {
    if (event.action === "request") {
      return;
    }
    if (event.key === "editor" && event.type === "getCurrentFile") {
      this.request("editor", "getFile", [event.value[0]]);
    } else if (event.key === "editor" && event.type === "getFile") {
      this.currentFile.next(event.value[0]);
    }
  }

  public getMsg(event: MessageEvent) {
    if (this.remixUrl.indexOf(event.origin) === -1) {
      return;
    }
    console.log({ event });
    this.source = event.source as Window;
    this.parentIsRemix = true;
    this.dispatchEvent(JSON.parse(event.data));
  }

  public postMsg(message: Partial<RemixMsg>) {
    const msg = JSON.stringify({ ...message, id: this.msgId });
    console.log({msg});
    this.source.postMessage(msg, "*");
    this.msgId++;
  }

  public request(key, type, value: any[] = []) {
    this.postMsg({ action: "request", key, type, value });
  }
}
