import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,FabContainer,AlertController,ToastController} from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { ProductosCategoriaAddPage } from '../productos-categoria-add/productos-categoria-add';
import { ProductosProductosPage } from '../productos-productos/productos-productos';
import { GlobalesProvider } from '../../providers/globales/globales';



@Component({
  selector: 'page-productos-categoria',
  templateUrl: 'productos-categoria.html',
})
export class ProductosCategoriaPage {

  public arreglo:any = [];
  public mostrarBoton:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private categoriasPrd:CategoriasProvider,private alertaCtrl:AlertController,private toasCtrl:ToastController,
private globales:GlobalesProvider) {
    this.trerCarritos();

    this.mostrarBoton = navParams.get("esProductos");
  }

  ionViewDidLoad() {
    this.trerCarritos();
  }

 public trerCarritos():any{
            this.categoriasPrd.gets().subscribe(datos => {this.arreglo = datos;});
 }

  ionViewDidEnter(){
    this.trerCarritos();

  }
  public actualizando(refresher): any {
    this.categoriasPrd.gets().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public agregar(fab:FabContainer){
      fab.close();
      this.navCtrl.push(ProductosCategoriaAddPage,{boton:"Agregar"});
  }

  public actualizar(obj:any){
    this.navCtrl.push(ProductosCategoriaAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
     let id = obj.id;
     let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
      this.categoriasPrd.eliminar(id).subscribe(resp => {
        this.categoriasPrd.gets().subscribe(res => {
          this.arreglo = res;
        });
        let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
        toas.present();
     });

     }},"Cancelar"]});
     

     alerta.present();

  }



  public abrirproductos(obj){
    this.navCtrl.push(ProductosProductosPage,{categoria:obj});
  }

  public salir(){
    this.globales.cerrarAplicacion();
  }

}
