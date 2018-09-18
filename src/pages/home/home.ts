import { Component } from '@angular/core';
import { NavController, AlertController, Alert } from 'ionic-angular';
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
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            console.log(data);
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log(data);
            this.navCtrl.push(TabsPage, {
              newBill: true
            });
          }
        }
      ]
    });

    alert.present();
  }

  public savedBill(): void {
    this.navCtrl.push(TabsPage, {
      newBill: false
    });
  }

}
