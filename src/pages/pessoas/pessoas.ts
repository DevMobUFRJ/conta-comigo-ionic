import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { PessoaModalPage } from '../pessoa-modal/pessoa-modal';
import { ContaService } from '../../services/conta-service';
import { PessoaProduto } from '../../models/pessoa-produto';
import { Consumidor } from '../../models/consumidor';

@IonicPage()
@Component({
  selector: 'page-pessoas',
  templateUrl: 'pessoas.html',
})
export class PessoasPage {

  public conta: Conta;
  public pessoasProdutos: Array<PessoaProduto>

  public valorGorjeta: number = 10;
  public gorjetaIs: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private _contaService: ContaService, public _events: Events) {
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
    this.pessoasProdutos = this._contaService.criaListaPessoaComProdutos(this.conta);
  }

  public openPessoaModal() {
    let modal = this.modalCtrl.create(PessoaModalPage);
    modal.onDidDismiss(pessoa => {
      if (pessoa != null) {
      }
    });
    modal.present();
  }

  public expandItem(item) {
    item.expanded = !item.expanded;
  }

  public removePessoa(pessoaProduto) {
    //TODO remoção do banco de pessoaProduto recebida
  }

  public calcValorTotal(pessoaProduto: PessoaProduto): string {
    return `R$ ${(pessoaProduto.total * (this.gorjetaIs ? 1 + (this.valorGorjeta / 100) : 1)).toFixed(2)}`
  }

  public calcValorPorProduto(produtoConsumido: Consumidor): string {
    return `${produtoConsumido.produto.nome} - ${produtoConsumido.quantidade} x
    ${(produtoConsumido.produto.preco * (this.gorjetaIs ? 1 + (this.valorGorjeta / 100) : 1)).toFixed(2)} = R$
    ${(produtoConsumido.produto.preco * produtoConsumido.quantidade * (this.gorjetaIs ? 1 + (this.valorGorjeta / 100) : 1)).toFixed(2)}`;
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
