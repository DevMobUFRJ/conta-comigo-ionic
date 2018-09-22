import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  public newBill(): void {
    let alert = this.alertCtrl.create({
      title: 'Nova Conta',
      inputs: [
        {
          name: 'username',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Criar',
          handler: data => {
            this.navCtrl.push(TabsPage, {
              nomeNovaConta: data.username,
              isNovaConta: true
            });
          }
        }
      ]
    });

    alert.present();
  }

  public savedBill(): void {
    this.navCtrl.push(TabsPage, {
      isNovaConta: false
    });
  }

}
