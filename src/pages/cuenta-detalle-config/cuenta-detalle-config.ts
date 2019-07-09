import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';





@Component({
  selector: 'page-cuenta-detalle-config',
  templateUrl: 'cuenta-detalle-config.html',
})
export class CuentaDetalleConfigPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaDetalleConfigPage');
  }

  public salir(){
      this.viewCtrl.dismiss();

  }

}
