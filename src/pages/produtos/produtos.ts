import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { ProdutoModalPage } from '../produto-modal/produto-modal';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  public conta: Conta;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.conta = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ProdutosPage');
  }

  public openProdutoModal() {
    let modal = this.modalCtrl.create(ProdutoModalPage);
    modal.onDidDismiss(produto => {
      if(produto != null) {
        // atualiza lista de produtos
      }
    });
    modal.present();
  }

}
