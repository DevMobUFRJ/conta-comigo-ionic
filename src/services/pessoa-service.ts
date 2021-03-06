import { Injectable } from "@angular/core";
import { Conta } from "../models/conta";
import { Pessoa } from "../models/pessoa";
import { PessoaProduto } from "../models/pessoa-produto";
import { ContaService } from "./conta-service";
import { LoadingController } from "ionic-angular";
import { Storage } from '@ionic/storage';


@Injectable()
export class PessoaService {

  constructor(private storage: Storage,
    private _contaService: ContaService,
    private _loadingCtrl: LoadingController) {
  }

  public add(pessoa: Pessoa): void {
    const load = this._loadingCtrl.create({ content: 'Salvando participantes...' });
    load.present();
    this._contaService.getConta().then(c => {
      this.storage.get('pessoas').then(ps => {
        if (ps == undefined || ps == null) {
          this.storage.set('pessoas', [pessoa]);
        }
        else {
          this.storage.set('pessoas', ps.concat([pessoa]))
        }
      });
      c.pessoas.push(pessoa);
      this._contaService.updateConta(c);
      load.dismiss();
    });
  }

}
