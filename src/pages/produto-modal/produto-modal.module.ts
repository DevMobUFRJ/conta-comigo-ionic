import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoModalPage } from './produto-modal';

@NgModule({
  declarations: [
    ProdutoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoModalPage),
  ],
})
export class ProdutoModalPageModule {}
