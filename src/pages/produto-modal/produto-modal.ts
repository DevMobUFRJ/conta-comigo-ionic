import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto-service';

@IonicPage()
@Component({
  selector: 'page-produto-modal',
  templateUrl: 'produto-modal.html',
})
export class ProdutoModalPage {

  public produto: Produto = <Produto>{};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _produtoService: ProdutoService,
    public _viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  public add(): void {
    this._produtoService.add(this.produto);
    this.dismiss();
  }

  dismiss() {
    this._viewCtrl.dismiss({ 'produto': this.produto });
  }

}
