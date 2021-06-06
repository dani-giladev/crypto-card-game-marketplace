import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCardsPageRoutingModule } from './my-cards-routing.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { MyCardsPage } from './my-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCardsPageRoutingModule
  ],
  declarations: [MyCardsPage, CardComponent]
})
export class MyCardsPageModule {}
