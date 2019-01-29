import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pessoa } from '../../models/pessoa';

@IonicPage()
@Component({
  selector: 'page-pessoa-modal',
  templateUrl: 'pessoa-modal.html',
})
export class PessoaModalPage {

  public pessoa: Pessoa = <Pessoa>{};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PessoaModalPage');
  }

  public add(): void {
    
  }

}
