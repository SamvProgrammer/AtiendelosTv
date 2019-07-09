import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { MesasProvider } from '../../providers/mesas/mesas';

/**
 * Generated class for the CuentasMesasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cuentas-mesas',
  templateUrl: 'cuentas-mesas.html',
})
export class CuentasMesasPage {

  public arreglo: any = [];
  public indice = -1;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private mesasPrd: MesasProvider,private viewCtrl:ViewController,private alertCtrl:AlertController) {
    let sucursal = navParams.get("id_sucursal");
    this.mesasPrd.getActivos(sucursal, false).subscribe(datos => {
      for (let item of datos)
        item.colorear = item.ocupada;
      this.arreglo = datos;
    });
  }

  ionViewDidLoad() {
    this.indice = -1;
  }

  public marcar(indice) {
    for (let item of this.arreglo) {
      item.clase = false;
      item.colorear = item.ocupada;
    }

    this.arreglo[indice].colorear = false;
    this.arreglo[indice].clase = true;



    this.indice = indice;
  }

  public salir() {
    this.viewCtrl.dismiss();
  }

  public agregarMesa():any{
     let dialgoResult = this.alertCtrl.create({message:"¿Deseas ocupar mesa?",buttons:[
       {text:"Sí",handler:()=>{
          this.viewCtrl.dismiss({mesa:this.arreglo[this.indice]});
       }},{text:"No"}
     ]});
     dialgoResult.present();
  }

}
