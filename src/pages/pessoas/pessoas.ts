import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { PessoaModalPage } from '../pessoa-modal/pessoa-modal';
import { ContaService } from '../../services/conta-service';
import { PessoaProduto } from '../../models/pessoa-produto';

@IonicPage()
@Component({
  selector: 'page-pessoas',
  templateUrl: 'pessoas.html',
})
export class PessoasPage {

  public conta: Conta;
  public pessoasProdutos: Array<PessoaProduto>
  itemExpandHeight: number = 200;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController, 
              private _contaService: ContaService,
              private _events: Events) 
  { 
    this.conta = this.navParams.data;
    this._events.subscribe('update-conta', (conta) => this.conta = conta);
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.pessoasProdutos = this._contaService.criaListaPessoaComProdutos(this.conta);
    this.pessoasProdutos.forEach(element => {
      element.expanded = false;
    });
  }

  public openPessoaModal() {
    let modal = this.modalCtrl.create(PessoaModalPage);
    modal.onDidDismiss(pessoa => {
      if(pessoa != null) {
        // atualiza lista de pessoas
      }
    });
    modal.present();
  }

  public expandItem(item){
    item.expanded = !item.expanded;
  }

}
