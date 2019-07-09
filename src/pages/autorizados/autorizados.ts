import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalesProvider } from '../../providers/globales/globales';
import { SocketProvider } from '../../providers/socket/socket';

/**
 * Generated class for the AutorizadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-autorizados',
  templateUrl: 'autorizados.html',
})
export class AutorizadosPage {

  private arreglo:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private globales:GlobalesProvider,private sockets:SocketProvider) {
    this.arreglo = this.sockets.getCancelaciones();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutorizadosPage');
  }

  public salir(){
    this.globales.cerrarAplicacion();
  }


  public autorizar(obj,indice){
      obj.tipoMensaje = 'AUTORIZADO'
      this.sockets.enviarAutorizacion(obj);
      this.arreglo.splice(indice,1);
  }



}
