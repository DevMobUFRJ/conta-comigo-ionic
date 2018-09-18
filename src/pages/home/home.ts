import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public newBill(): void {
    this.navCtrl.push(TabsPage, {
      newBill: true
    });
  }

  public savedBill(): void {
    this.navCtrl.push(TabsPage, {
      newBill: false
    });
  }

}
