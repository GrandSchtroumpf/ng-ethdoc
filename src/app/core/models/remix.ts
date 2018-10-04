export interface RemixMsg {
  action: RemixAction;
  key: RemixKey;
  type: RemixType;
  value: any[];
  id: number;
}


export type RemixAction = 'request' | 'response' | 'notification';
export type RemixKey = 'app' | 'compiler' | 'txlistener' | 'config' | 'udapp' | 'editor';

export type RemixType = 'unfocus' | 'focus' | 'compilationFinished' | 'compilationData' | 'newTransaction' | string; // TODO complete

export enum remixAction {
  request = 'request',
  response = 'response',
  notif = 'notification'
}

export enum remixKey {
  app = 'app',
  compiler = 'compiler',
  txlistener = 'txlistener',
  config = 'config',
  udapp = 'udapp',
  editor = 'editor'
}
