import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalesProvider } from '../../providers/globales/globales';
import { ProductosCategoriaPage } from '../productos-categoria/productos-categoria';
import { ProductosProductosPage } from '../productos-productos/productos-productos';


@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private globales:GlobalesProvider) {
  }

  ionViewDidLoad() {
    
  }


  public salir(){
    this.globales.cerrarAplicacion();
  }

  public abrirVentana(obj){
    switch(obj){
      case "productos":
          this.navCtrl.push(ProductosCategoriaPage,{esProductos:true});
      break;
      case "categorias":
      this.navCtrl.push(ProductosCategoriaPage,{esProductos:false});
      break;
    }
  }

  
}
