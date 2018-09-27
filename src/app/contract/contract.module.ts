import { ContractRouterModule } from './contract-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@devdoc/shared';


import { ViewComponent } from './containers/view/view.component';
import { ListComponent } from './containers/list/list.component';
import { EditComponent } from './containers/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ContractRouterModule,
  ],
  declarations: [ViewComponent, ListComponent, EditComponent]
})
export class ContractModule { }
