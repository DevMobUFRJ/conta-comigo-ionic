import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { PessoaModalPage } from '../pessoa-modal/pessoa-modal';

@IonicPage()
@Component({
  selector: 'page-pessoas',
  templateUrl: 'pessoas.html',
})
export class PessoasPage {

  public conta: Conta;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.conta = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PessoasPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter PessoasPage')
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

}
