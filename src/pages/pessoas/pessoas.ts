import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Conta } from '../../models/conta';

@IonicPage()
@Component({
  selector: 'page-pessoas',
  templateUrl: 'pessoas.html',
})
export class PessoasPage {

  public conta: Conta = <Conta>{};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.conta = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PessoasPage');
  }

}
