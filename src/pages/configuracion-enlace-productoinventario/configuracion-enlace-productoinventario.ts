import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { ConfiguracionEnlaceProductoinventarioAddPage } from '../../pages/configuracion-enlace-productoinventario-add/configuracion-enlace-productoinventario-add';



@Component({
  selector: 'page-configuracion-enlace-productoinventario',
  templateUrl: 'configuracion-enlace-productoinventario.html',
})
export class ConfiguracionEnlaceProductoinventarioPage {

  public arreglo: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private productosPrd: ProductosProvider) {


  }
  ionViewDidEnter() {
    this.traerProductos();
  }

  public traerProductos(): any {

    this.productosPrd.getProductos().subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public agregarInventario(obj):any{

      this.navCtrl.push(ConfiguracionEnlaceProductoinventarioAddPage,{obj:obj});
  }

}
