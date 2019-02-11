import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ContaService } from '../../services/conta-service';
import { Conta } from '../../models/conta';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public conta: Conta = null;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private _contaService: ContaService,
    private _loadingCtrl: LoadingController,
    private _events: Events) {
  }

  public ionViewWillEnter() {
    let loadingConta = this._loadingCtrl.create({ content: 'Carregando conta...' });
    loadingConta.present();
    this._contaService.getConta().then(c => {
      this.conta = c;
      this._events.publish('update-conta', this.conta);
      loadingConta.dismiss();
    });
  }

  public novaConta(): void {
    let alert = this.alertCtrl.create({
      title: 'Nova Conta',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Criar',
          handler: data => {
            this.navCtrl.push(TabsPage, {
              nomeNovaConta: data.name,
              isNovaConta: true
            });
          }
        }
      ]
    });

    alert.present();
  }

  public existeContaAntiga(): boolean {
    return (this.conta == undefined || this.conta == null) ? false : true;
  }

  public contaAntiga(): void {
    this.navCtrl.push(TabsPage, {
      isNovaConta: false,
      contaAntiga: this.conta
    });
  }

}
