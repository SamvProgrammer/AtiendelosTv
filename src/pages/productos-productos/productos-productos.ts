import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, AlertController, ToastController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductosProductosAddPage } from '../productos-productos-add/productos-productos-add';
import { GlobalesProvider } from '../../providers/globales/globales';


@Component({
  selector: 'page-productos-productos',
  templateUrl: 'productos-productos.html',
})
export class ProductosProductosPage {

  public arreglo: any = [];
  public categoria;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productosPrd: ProductosProvider, private alertaCtrl: AlertController, private toasCtrl: ToastController,
    private globales: GlobalesProvider) {

    this.categoria = navParams.get("categoria");
  }

  ionViewDidLoad() {
    this.trerCarritos();
  }

  public trerCarritos(): any {
    this.productosPrd.getProductosCategoria(this.categoria.id).subscribe(datos => {
      this.arreglo = datos;
    });
  }

  ionViewDidEnter() {
    this.trerCarritos();

  }
  public actualizando(refresher): any {
    this.productosPrd.getProductos().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public agregar(fab: FabContainer) {
    fab.close();
    console.log(this.categoria.id);
    this.navCtrl.push(ProductosProductosAddPage, { boton: "Agregar", id_categoria: this.categoria.id });
  }

  public actualizar(obj: any) {
    this.navCtrl.push(ProductosProductosAddPage, { parametro: obj, boton: "Actualizar" });
  }

  public eliminar(obj) {
    let id = obj.id_producto;
    let alerta = this.alertaCtrl.create({
      title: "Aviso", subTitle: "¿Deseas eliminar el registro?", buttons: [{
        text: "Aceptar", handler: () => {
          this.productosPrd.eliminar(id).subscribe(resp => {
            this.productosPrd.getProductos().subscribe(res => {
              this.arreglo = res;
            });
            let toas = this.toasCtrl.create({ message: "Registro Eliminado", duration: 1500 });
            toas.present();
          });

        }
      }, "Cancelar"]
    });


    alerta.present();

  }

  public salir() {
    this.globales.cerrarAplicacion();
  }
}
