import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MintCardPage } from './mint-card.page';

const routes: Routes = [
  {
    path: '',
    component: MintCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MintCardPageRoutingModule {}
