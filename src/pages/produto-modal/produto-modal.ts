import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto-service';
import { ContaService } from '../../services/conta-service';
import { Conta } from '../../models/conta';
import { Consumidor } from '../../models/consumidor';

@IonicPage()
@Component({
  selector: 'page-produto-modal',
  templateUrl: 'produto-modal.html',
})
export class ProdutoModalPage {

  public produto: Produto = <Produto>{};
  public conta: Conta = <Conta>{};

  public quantidadeConsumida: number;
  public qntdsDiferentes: boolean = false;
  public marcadas: Array<boolean> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _produtoService: ProdutoService,
    private _contaService: ContaService,
    private _loadingCtrl: LoadingController,
    public _viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    let loadingConta = this._loadingCtrl.create({ content: 'Carregando...' });
    loadingConta.present();
    this._contaService.getConta().then(c => {
      this.conta = c;
      this.conta.pessoas.forEach(p => this.marcadas.push(false));
      loadingConta.dismiss();
    });
  }

  ionViewDidLoad() {
  }

  public add(): void {
    let cont = 0;
    this.marcadas.forEach((m, i) => {
      if (m) {
        cont++;
        this.conta.consumidores.push(<Consumidor>{
          pessoa: this.conta.pessoas[i],
          produto: this.produto,
          quantidade: 0
        });
      }
    });
    const qntdIndividual = this.quantidadeConsumida / cont;
    this.conta.consumidores.forEach(c => c.quantidade = qntdIndividual);
    this._produtoService.add(this.produto, this.conta);
    this.dismiss();
  }

  // public mostraQntdDiferente(i: number) {
  //   return this.qntdsDiferentes && this.marcadas[i];
  // }

  dismiss() {
    this._viewCtrl.dismiss({ 'produto': this.produto });
  }

  cancelaProduto() {
    this._viewCtrl.dismiss({ 'produto': null });
  }

}
