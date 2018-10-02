import { ContractRouterModule } from './contract-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@devdoc/shared';
import { MonacoEditorModule } from 'ngx-monaco';


import { ViewComponent } from './containers/view/view.component';
import { ListComponent } from './containers/list/list.component';
import { EditComponent } from './containers/edit/edit.component';
import { MethodComponent } from './components/method/method.component';
import { PreviewComponent } from './containers/preview/preview.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ContractRouterModule,
    FormsModule,
    MonacoEditorModule.forRoot()
  ],
  declarations: [ViewComponent, ListComponent, EditComponent, MethodComponent, PreviewComponent, DetailsComponent]
})
export class ContractModule { }
