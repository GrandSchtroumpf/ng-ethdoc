import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { HomeComponent } from './containers/home/home.component';
import { RootComponent } from './containers/root/root.component';

import { MaterialModule } from '@devdoc/shared';
import { CoreRouterModule } from './core-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    CoreRouterModule
  ],
  declarations: [HomeComponent, RootComponent],
  bootstrap: [RootComponent]
})
export class CoreModule { }
