import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoasPage } from './pessoas';

@NgModule({
  declarations: [
    PessoasPage,
  ],
  exports: [
    PessoasPage
  ],
  imports: [
    IonicPageModule.forChild(PessoasPage),
  ],
})
export class PessoasPageModule {}
