import { Injectable } from "@angular/core";
import { ContaService } from "./conta-service";
import { LoadingController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { Produto } from "../models/produto";
import { Conta } from "../models/conta";


@Injectable()
export class ProdutoService {

  constructor(private storage: Storage,
    private _contaService: ContaService,
    private _loadingCtrl: LoadingController) {
  }

  public add(produto: Produto, conta: Conta): void {
    const load = this._loadingCtrl.create({ content: 'Salvando produto...' });
    load.present();
    this.storage.get('produtos').then(ps => {
      this.addApenasProduto(ps, produto);
      conta.produtos.push(produto);
      this._contaService.updateConta(conta);
      load.dismiss();
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
