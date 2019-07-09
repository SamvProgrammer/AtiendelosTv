import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { GlobalesProvider } from '../../providers/globales/globales';
import { MenuSubPage } from '../../pages/menu-sub/menu-sub';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private appCtrl: App,private categoriaPrd:CategoriasProvider,
  private globales:GlobalesProvider) {
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter() {
    this.categoriaPrd.gets().subscribe(datos => {
        this.arreglo = datos;
        
    });
  }

  public salir(): any {    
    this.globales.cerrarAplicacion();
  }

  public subcatalogo(id_categoria){
      this.navCtrl.push(MenuSubPage,{id_categoria:id_categoria});
  }

}
