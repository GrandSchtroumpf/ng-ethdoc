import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Remix {

    private remixUrl = ['https://remix-alpha.ethereum.org', 'https://remix.ethereum.org'];
    private source: Window;
    private msgId = 0;
    public parentIsRemix: boolean;

    constructor() {
        this.source = window.parent;
    }

    public getMsg(event: MessageEvent) {
        // console.log(event);
        if (this.remixUrl.indexOf(event.origin) === -1) { return; }
        this.source = event.source as Window;
        this.parentIsRemix = true;
    }

    public postMsg(message: Object) {
        const msg = JSON.stringify({...message, id: this.msgId});
        this.source.postMessage(msg, '*');
        this.msgId ++;
    }
}
