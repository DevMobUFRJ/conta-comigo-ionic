import { Consumidor } from './../models/consumidor';
import { Injectable } from "@angular/core";
import { ContaService } from "./conta-service";
import { LoadingController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { Produto } from "../models/produto";
import { Conta } from "../models/conta";
import { Pessoa } from '../models/pessoa';


@Injectable()
export class ProdutoService {

  constructor(private storage: Storage,
    private _contaService: ContaService,
    private _loadingCtrl: LoadingController) {
  }

  public add(produto: Produto, conta: Conta, quantidadeConsumida: number, pessoasSelecionadas: boolean[]): void {
    const load = this._loadingCtrl.create({ content: 'Salvando produto...' });
    load.present();
    this.insereConsumidoresNaConta(conta, produto, quantidadeConsumida, pessoasSelecionadas);
    this.storage.get('produtos').then(ps => {
      this.addApenasProduto(ps, produto);
      conta.produtos.push(produto);
      this._contaService.updateConta(conta);
      load.dismiss();
    });
  }

  private insereConsumidoresNaConta(conta: Conta, produto: Produto, quantidadeConsumida: number, pessoasSelecionadas: boolean[]) {
    let pessoas: Pessoa[] = pessoasSelecionadas.map((ps, i) => {
      if (ps) return conta.pessoas[i];
      else return null;
    }).filter(p => p != null);

    pessoas.forEach(p => {
      conta.consumidores.push(<Consumidor>{
        pessoa: p,
        produto: produto,
        quantidade: quantidadeConsumida / pessoas.length
      });
    });
  }

  private addApenasProduto(ps: Array<Produto>, produto: Produto): void {
    if (ps == undefined || ps == null) {
      this.storage.set('produtos', [produto]);
    }
    else {
      this.storage.set('produtos', ps.concat([produto]))
    }
  }

}
