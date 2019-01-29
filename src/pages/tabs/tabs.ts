import { Component } from '@angular/core';
import { NavParams, LoadingController, Events } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { ProdutosPage } from '../produtos/produtos';
import { PessoasPage } from '../pessoas/pessoas';
import { ContaService } from '../../services/conta/conta-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root = PessoasPage;
  public tab2Root = ProdutosPage;

  private conta: Conta = <Conta>{};

  constructor(public navParams: NavParams, 
              private contaService: ContaService, 
              private _loadingCtrl: LoadingController,
              private _events: Events) 
  {
    if(this.navParams.get('isNovaConta')) {
      this.conta = this.contaService.criaConta(this.navParams.get('nomeNovaConta'));
    }
    else {
      let loadingConta = this._loadingCtrl.create({content: 'Carregando conta...'});
      loadingConta.present();
      this.contaService.getConta().then(c => {
        this.conta = c
        this._events.publish('update-conta', this.conta);
        loadingConta.dismiss();
      });
    }
  }


}
