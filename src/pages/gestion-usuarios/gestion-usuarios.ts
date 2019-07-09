import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalesProvider } from '../../providers/globales/globales';
import { UsuariosPage } from '../usuarios/usuarios';
import { RolesPage } from '../roles/roles';

/**
 * Generated class for the GestionUsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-gestion-usuarios',
  templateUrl: 'gestion-usuarios.html',
})
export class GestionUsuariosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private globales: GlobalesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionUsuariosPage');
  }


  public salir() {
    this.globales.cerrarAplicacion();
  }

  public abrirVentana(ventana) {
    switch (ventana) {
      case "usuarios":
        this.navCtrl.push(UsuariosPage);
        break;
      case "roles":
        this.navCtrl.push(RolesPage);
        break;
      default:
        break;
    }
  }

}
