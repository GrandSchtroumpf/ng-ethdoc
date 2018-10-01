import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractResolver } from './guards/contract.resolver';

import { ListComponent } from './containers/list/list.component';
import { ViewComponent } from './containers/view/view.component';
import { EditComponent } from './containers/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  {
    path: ':name',
    resolve: {
      contract: ContractResolver
    },
    children: [
      { path: 'edit', component: EditComponent },
      { path: 'view', component: ViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRouterModule {}
