import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaModalPage } from './pessoa-modal';

@NgModule({
  declarations: [
    PessoaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PessoaModalPage),
  ],
})
export class PessoaModalPageModule {}
