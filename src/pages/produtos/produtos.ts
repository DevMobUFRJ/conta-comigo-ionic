import { ContaService } from './../../services/conta-service';
import { ProdutoPessoa } from './../../models/produto-pessoa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { ProdutoModalPage } from '../produto-modal/produto-modal';
import { Consumidor } from '../../models/consumidor';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  public conta: Conta;
  public produtosPessoas: Array<ProdutoPessoa>;

  public valorGorjeta: number = 10;
  public gorjetaIs: boolean = false;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private _contaService: ContaService, public _events: Events) {
    this.conta = this.navParams.data;

    this._events.subscribe('update-gorjeta', (valor, is) => {
      this.valorGorjeta = valor;
      this.gorjetaIs = is;
    });
    
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

  public calcValorTotal(produtoPessoa: ProdutoPessoa): string {
    return `R$ ${(produtoPessoa.valorTotal * (this.gorjetaIs ? 1 + (this.valorGorjeta / 100) : 1)).toFixed(2)}`
  }

  public calcValorPorProduto(consumidor: Consumidor): string {
    return `${consumidor.pessoa.nome} - ${consumidor.quantidade} x ${(consumidor.produto.preco * (this.gorjetaIs ? 1 + (this.valorGorjeta / 100) : 1)).toFixed(2)} =
    R$ ${(consumidor.produto.preco * consumidor.quantidade * (this.gorjetaIs ? 1 + (this.valorGorjeta / 100) : 1)).toFixed(2)}`;
  }

  public maisGorjeta() {
    this.valorGorjeta++;
    this._events.publish('update-gorjeta', this.valorGorjeta, this.gorjetaIs);
  }

  public switchGorjeta() {
    this.gorjetaIs = !this.gorjetaIs;
    this._events.publish('update-gorjeta', this.valorGorjeta, this.gorjetaIs);
  }

  public menosGorjeta() {
    this.valorGorjeta--;
    this._events.publish('update-gorjeta', this.valorGorjeta, this.gorjetaIs);
  }

}
