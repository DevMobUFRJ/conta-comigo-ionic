import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Pessoa } from '../../models/pessoa';
import { ContaService } from '../../services/conta-service';
import { PessoaService } from '../../services/pessoa-service';

@IonicPage()
@Component({
  selector: 'page-pessoa-modal',
  templateUrl: 'pessoa-modal.html',
})
export class PessoaModalPage {

  public pessoa: Pessoa = <Pessoa>{};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _pessoaService: PessoaService,
    private _contaService: ContaService,
    public _viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  public add(): void {
    this._pessoaService.add(this.pessoa);
    this.dismiss();
  }

  dismiss() {
    this._viewCtrl.dismiss({ 'pessoa': this.pessoa });
  }

}
