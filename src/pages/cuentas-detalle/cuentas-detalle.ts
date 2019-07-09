import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides, ToastController, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { CuentasTotalPage } from '../cuentas-total/cuentas-total';
import { CuentaDetalleConfigPage } from '../cuenta-detalle-config/cuenta-detalle-config';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { ip } from '../../assets/direcciones';
import { Storage } from '@ionic/storage';
import { ConfiguracionMeseroProvider } from '../../providers/configuracion-mesero/configuracion-mesero';
import { GlobalesProvider } from '../../providers/globales/globales';
import { CuentasDetalleAntesdeenviarPage } from '../cuentas-detalle-antesdeenviar/cuentas-detalle-antesdeenviar';



@Component({
  selector: 'page-cuentas-detalle',
  templateUrl: 'cuentas-detalle.html',
})
export class CuentasDetallePage {

  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  public arreglo = [];
  public arregloCategoria = [];
  public objTicket;
  public arregloPedidoCliente:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private toastCtrl: ToastController, private alertaCtrl: AlertController, private actionSheetCtrl: ActionSheetController,
    private productosPrd: ProductosProvider, private modalCtrl: ModalController,
    private ticketsPrd: TicketsProvider, private categoriasPrd: CategoriasProvider, private storage: Storage,
    private meseroConfiguPrd:ConfiguracionMeseroProvider,private globales:GlobalesProvider) {


    this.storage.get("listaproductosdetallemesa").then(valor => {
      console.log("listaproductosdetallemesa");
      this.arreglo = valor.listaproductos;
      for (let x of this.arreglo) {
        for (let y of x.productos) {
          y.cantidad = 1;
          y.ruta_imagen = "data:image/png;base64," + y.ruta_imagen;
        }
      }
    

      this.arregloCategoria = valor.categorias;

    });

    this.objTicket = navParams.get("objTicket");

    this.arregloPedidoCliente.cliente1 = [];

    this.storage.get(this.objTicket.id_ticket).then(storagepedido => {
       if(storagepedido != null || storagepedido != undefined){
          this.arregloPedidoCliente = storagepedido;
       }
    });
  }


  ionViewDidEnter() {
    this.slideChanged();
  }

  ionViewDidLeave(){
    this.storage.set(this.objTicket.id_ticket,this.arregloPedidoCliente);
  }


  selectedTab(index) {
    this.slider.slideTo(index);
  }



  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    let slides_count = this.segments.nativeElement.childElementCount;
    this.page = currentIndex.toString();
    if (this.page >= slides_count)
      this.page = (slides_count - 1).toString();


    this.centerScroll();
  }


  centerScroll() {
    if (!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }


  sizeLeft() {
    let size = 0;
    for (let i = 0; i < this.page; i++) {
      size += this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }


  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }


  smoothScrollTo(endX) {
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }

  public salir() {
    this.viewCtrl.dismiss();
  }

  public getcantidad(indice, indice2): any {

    return this.arreglo[indice].productos[indice2].cantidad;
  }

  public restar(indice, indice2): any {
    let cantidad = this.arreglo[indice].productos[indice2].cantidad;
    if (cantidad == 1)
      cantidad = 1;
    else
      cantidad = cantidad - 1;

    this.arreglo[indice].productos[indice2].cantidad = cantidad;
  }

  public sumar(indice, indice2): any {
    let cantidad = this.arreglo[indice].productos[indice2].cantidad;
    cantidad = cantidad + 1;
    this.arreglo[indice].productos[indice2].cantidad = cantidad;

  }



  public addMesa(obj) {
    let aviso = this.alertaCtrl.create({
      subTitle: "Aviso",
      message: "¿Deseas agregar producto a la mesa?",
      buttons: [{
        text: "sí",
        handler: () => {
          this.agregandoProducto(obj);
        }
      },
        "No"]
    });

    aviso.present();
  }

  public agregandoProducto(obj) {
    let id_ticket = this.objTicket.id_ticket;
    let id_producto = obj.id_producto;
    let cantidad = obj.cantidad;
    let observaciones = obj.observaciones;
    let objDetalleTicket = {
      id_ticket: id_ticket,
      id_producto: id_producto,
      cantidad: cantidad,
      observaciones: observaciones,
      nombre:obj.nombre,
      ruta_imagen : "",
      servido:false,
      notificacion:obj.notificacion
    }
    
    if(objDetalleTicket.observaciones == null){
      objDetalleTicket.observaciones = "";
    }

    if(this.configuracionNotificacion() == true){
         this.insertaTiempoRealWebService(objDetalleTicket);
         obj.cantidad = 1;
    }else{
      objDetalleTicket.ruta_imagen = obj.ruta_imagen;
      objDetalleTicket.servido = false;
       this.insertarDetalleConsumidor(objDetalleTicket);
       obj.cantidad = 1;
    }

    obj.observaciones = "";
  }

  public insertarDetalleConsumidor(obj){
      let arreglo = this.arregloPedidoCliente.cliente1;
      arreglo.push(obj);
      let mensaje = this.toastCtrl.create({message:"Producto agregado a la orden a enviar",duration:1500});
      mensaje.present();
  }

  public insertaTiempoRealWebService(objDetalleTicket){
    this.ticketsPrd.insertDetalle(objDetalleTicket).subscribe(datosDetalle => {
      let toast = this.toastCtrl.create({
        message: "Producto agregado a la mesa",
        duration: 1500
      });
      toast.present();
    }
    );
  }

  public configuracionNotificacion():boolean{
     let configuraciones = this.globales.getConfiguraciones();
     let enviarNotificacion = false;
     if(configuraciones != null || configuraciones != undefined){
       enviarNotificacion = configuraciones.notificacion;
     }

     console.log(enviarNotificacion);
     return enviarNotificacion;
  }

  public verCuenta() {
    if(this.configuracionNotificacion() == true){
      this.verCuentaNotificacionTiempoReal();
    }else{
       this.verCuentaSinNotificacion();
    }
  }

  public verCuentaSinNotificacion(){
    let ventana = this.modalCtrl.create(CuentasDetalleAntesdeenviarPage, { arreglo: this.arregloPedidoCliente });
    ventana.present();
    ventana.onDidDismiss(datos => {
       if(datos != null || datos != undefined){
          if(datos.servido == true){
              for(let llave in this.arregloPedidoCliente){
                   for(let item of this.arregloPedidoCliente[llave]){
                          item.servido = true;
                   }
              }
          }  
       }
    });
  }

  public verCuentaNotificacionTiempoReal(){
    let ventana = this.modalCtrl.create(CuentasTotalPage, { id_ticket: this.objTicket.id_ticket });
      ventana.present();
      ventana.onDidDismiss(datos => {
        if (datos) {
          this.viewCtrl.dismiss({ id_ticket: datos.id_ticket, billete: datos.billete });
        }
      });
  }

  public configuracion() {
    let configuracion = this.modalCtrl.create(CuentaDetalleConfigPage);
    configuracion.present();
  }

  public agregar(indice) {
    console.log(indice);
  }


  public agregarObservaciones(obj){
    console.log("Presionando");
      let mensaje = this.alertaCtrl.create({subTitle:"Agregar observaciones a la orden",message:"Las observaciones seran agregadas a la orden despues de agregar a la orden",
    inputs:[{type:"text",placeholder:"Observaciones",name:"observaciones"}],buttons:[{
      text:"Aceptar",handler:(datos)=>{
        obj.observaciones = datos.observaciones;

      }
    },"Cancelar"]});

    mensaje.present();
  }

}
