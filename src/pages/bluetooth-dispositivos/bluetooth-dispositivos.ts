import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the BluetoothDispositivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-bluetooth-dispositivos',
  templateUrl: 'bluetooth-dispositivos.html',
})
export class BluetoothDispositivosPage {

  public arreglo: any = [];
  public tipo;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bt: BluetoothSerial, private loadCtrl: LoadingController,private storage:Storage) {
  }

  ionViewDidLoad() {
    let cargando = this.loadCtrl.create({ content: "Cargando" });
    cargando.present();
    this.bt.list().then(datos => {
      console.log(JSON.stringify(datos));
      this.arreglo = datos;
      cargando.dismiss();
    }).catch(err => {
      console.log(JSON.stringify(err))
      cargando.dismiss();
    });

    this.tipo = this.navParams.get("tipo");
  }


  public conectar(obj) {
   
    let cargando = this.loadCtrl.create({ content: "Conectando a impresora" });
    cargando.present();
    let objblue = {
      mac:obj.address,
      conectar:true
    }
    this.storage.set(this.tipo,objblue);

    this.bt.connect(obj.address).subscribe(datos => {
      console.log(JSON.stringify(datos));
      cargando.dismiss();
      this.navCtrl.pop();
      let mensajeConectado = `DISPOSITIVO SE CONECTO A LA\nIMPRESORA DE TIPO ${this.tipo}\n\n\n\n\n\n\n\n\n\n`;
      this.bt.write(mensajeConectado);
    }, err => {
      console.log(JSON.stringify(err));
      cargando.dismiss();
    });
  }

  public actualizando(refresher): any {


    this.bt.list().then(datos => {
      console.log(JSON.stringify(datos));
      this.arreglo = datos;
      refresher.complete();
    }).catch(err => {
      console.log(JSON.stringify(err))
      refresher.complete();
    });
  }

}
