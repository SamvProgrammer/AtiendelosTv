import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportesVentaPage } from '../reportes-venta/reportes-venta';

/**
 * Generated class for the ReportesMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-reportes-menu',
  templateUrl: 'reportes-menu.html',
})
export class ReportesMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportesMenuPage');
  }

  public salir(){
      
  }

  public abrir(obj){
    
    switch(obj){
      case 'ventas':
         this.navCtrl.push(ReportesVentaPage);
      break;
      case 'productos':
      break;
      default:
      break;
    }

  }

}
