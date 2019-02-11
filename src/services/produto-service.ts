import { Injectable } from "@angular/core";
import { ContaService } from "./conta-service";
import { LoadingController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { Produto } from "../models/produto";


@Injectable()
export class ProdutoService {

  constructor(private storage: Storage,
    private _contaService: ContaService,
    private _loadingCtrl: LoadingController) {
  }

  public add(produto: Produto): void {
    const load = this._loadingCtrl.create({ content: 'Salvando produto...' });
    load.present();
    this._contaService.getConta().then(c => {
      this.storage.get('produtos').then(ps => {
        if (ps == undefined || ps == null) {
          this.storage.set('produtos', [produto]);
        }
        else {
          this.storage.set('produtos', ps.concat([produto]))
        }
      });
      c.produtos.push(produto);
      this._contaService.updateConta(c);
      load.dismiss();
    });
  }

}
