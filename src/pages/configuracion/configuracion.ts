import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { ConfiguracionEnlaceProductoinventarioPage } from '../configuracion-enlace-productoinventario/configuracion-enlace-productoinventario';
import { BluetoothPage } from '../bluetooth/bluetooth';
import { Storage } from '@ionic/storage';
import { GlobalesProvider } from '../../providers/globales/globales';


/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  public notificacion;
  public cancelacion;
  public autorizacion;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private globales: GlobalesProvider, private alertCtrl: AlertController,
  private toasCtrl:ToastController) {
  }

  ionViewDidLoad() {
    let configuraciones = this.globales.getConfiguraciones();
    if (configuraciones != null || configuraciones != undefined) {
      this.notificacion = configuraciones.notificacion;
      this.cancelacion = configuraciones.cancelacion;
      this.autorizacion = configuraciones.autorizacion;
    }
  }


  public abrirpagina(): any {

    this.navCtrl.push(ConfiguracionEnlaceProductoinventarioPage);
  }

  public abrirpaginabluetooth() {
    this.navCtrl.push(BluetoothPage);
  }

  public guardarCambios() {
    let alerta = this.alertCtrl.create({
      subTitle: "¿Deseas guardar cambios?",
      message: "Guardando configuraciones de la aplicación",
      buttons: [{
        text: "Si", handler: () => {
          let obj = {
            notificacion: this.notificacion,
            cancelacion:this.cancelacion,
            autorizacion:this.autorizacion
          }

          this.storage.set("configuraciones", obj);
          this.globales.setConfiguraciones(obj);
          let toast=this.toasCtrl.create({message:"Configuraciones de la aplicación guardadas con exito",duration:1500});
          toast.present();
        }
      }, "No"]
    });
    alerta.present();
  }


}
