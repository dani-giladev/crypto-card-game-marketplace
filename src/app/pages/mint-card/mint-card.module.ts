import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MintCardPageRoutingModule } from './mint-card-routing.module';
import { MintCardFormComponent } from 'src/app/components/mint-card-form/mint-card-form.component';
import { MintCardPage } from './mint-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MintCardPageRoutingModule
  ],
  declarations: [MintCardPage, MintCardFormComponent]
})
export class MintCardPageModule {}
