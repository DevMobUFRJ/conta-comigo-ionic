import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { PessoaModalPage } from '../pessoa-modal/pessoa-modal';
import { Consumidor } from '../../models/consumidor';
import { Pessoa } from '../../models/pessoa';
import { Produto } from '../../models/produto';
import { ContaService } from '../../services/conta/conta-service';
import { PessoaProduto } from '../../models/pessoa-produto';

@IonicPage()
@Component({
  selector: 'page-pessoas',
  templateUrl: 'pessoas.html',
})
export class PessoasPage {

  public conta: Conta;
  public pessoasProdutos: Array<PessoaProduto>

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private contaService: ContaService) {
    this.conta = this.navParams.data;
    this.conta.pessoas = [];
    this.conta.pessoas.push(
      <Pessoa> {
        id: 1,
        nome: 'Pessoa 1'
      },
      <Pessoa> {
        id: 2,
        nome: 'Pessoa 2'
      },
    );

    this.conta.consumidores = [];
    this.conta.consumidores.push(
      <Consumidor> {
        id: 1,
        pessoa: this.conta.pessoas[0],
        quantidade: 5,
        produto: <Produto> {
          id: 1,
          nome: 'Produto 1',
          preco: 59.9
        }
      },
      <Consumidor> {
        id: 2,
        pessoa: this.conta.pessoas[0],
        quantidade: 5,
        produto: <Produto> {
          id: 2,
          nome: 'Produto 2',
          preco: 29.9
        }
      },
      <Consumidor> {
        id: 3,
        pessoa: this.conta.pessoas[1],
        quantidade: 3,
        produto: <Produto> {
          id: 1,
          nome: 'Produto 1',
          preco: 59.9
        }
      }
    );

    this.pessoasProdutos = this.contaService.criaListaPessoaComProdutos(this.conta);

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
