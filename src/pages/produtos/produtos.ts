import { ContaService } from './../../services/conta-service';
import { ProdutoPessoa } from './../../models/produto-pessoa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { ProdutoModalPage } from '../produto-modal/produto-modal';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  public conta: Conta;
  public produtosPessoas: Array<ProdutoPessoa>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _contaService: ContaService,
    public _events: Events) {
    this.conta = this.navParams.data;
    this._events.subscribe('update-conta', (conta) => {
      this.conta = conta
      this.initExpandableList();
    });
  }

  ionViewDidLoad() {
    this.initExpandableList();
  }

  ionViewDidEnter() {
  }

  private initExpandableList() {
    this.produtosPessoas = this._contaService.criaListaProdutoComPessoas(this.conta);
    this.produtosPessoas.forEach(element => {
      element.expanded = false;
      element.total = 0 as number;
      element.consumidores.forEach(consumidor => {
        element.total = element.total + Number(consumidor.produto.preco.replace(/\./g, '').replace(',', '.')) * consumidor.quantidade;
      });
    });
  }

  public expandItem(item) {
    item.expanded = !item.expanded;
  }

  public openProdutoModal() {
    let modal = this.modalCtrl.create(ProdutoModalPage);
    modal.onDidDismiss(produto => {
      if (produto != null) {
        // atualiza lista de produtos
      }
    });
    modal.present();
  }

}
