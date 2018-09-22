import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { ProdutosPage } from '../produtos/produtos';
import { PessoasPage } from '../pessoas/pessoas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root = PessoasPage;
  public tab2Root = ProdutosPage;

  private conta: Conta = <Conta>{};

  constructor(public navParams: NavParams) {
    let newBillParam: boolean = this.navParams.get('isNovaConta');
    if(newBillParam) {
      this.conta.nome = this.navParams.get('nomeNovaConta');
      this.conta.total = 0;
    }
    else {
      // search old bill and fill object with it
    }
  }


}
