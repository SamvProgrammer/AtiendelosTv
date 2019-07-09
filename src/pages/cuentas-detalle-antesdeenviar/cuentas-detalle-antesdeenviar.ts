import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, Platform } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { Storage } from '@ionic/storage';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { GlobalesProvider } from '../../providers/globales/globales';

/**
 * Generated class for the CuentasDetalleAntesdeenviarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cuentas-detalle-antesdeenviar',
  templateUrl: 'cuentas-detalle-antesdeenviar.html',
})
export class CuentasDetalleAntesdeenviarPage {

  public arreglo: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private alertCtrl: AlertController,private ticketPrd:TicketsProvider,
  private toasCtrl:ToastController,private plataforma:Platform,private storage:Storage,private usuariosPrd:UsuariosProvider,
  private globales:GlobalesProvider) {
    let aux = this.navParams.get("arreglo");
    for (let llave in aux) {
      let arregloAux = aux[llave];
      this.arreglo.push(arregloAux);
    }
    console.log(this.arreglo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasDetalleAntesdeenviarPage');
  }



  public salir() {
    this.viewCtrl.dismiss();
  }

  public confirmar() {
    let alerta = this.alertCtrl.create({
      subTitle: "¿Deseas confirmar la orden?",
      message: "Confirmar la orden notificara a cocina y barra lo que se pidio",
      buttons: [{
        text: "sí", handler: () => {

          this.enviandoOrden();
        }
      }, "no"]
    });

    alerta.present();
  }


  public enviandoOrden(){


    let arregloPedidosCopia = {};
    for(let llave in this.arreglo){
       arregloPedidosCopia[llave] = [];
       for(let item of this.arreglo[llave]){
            let obj = {};
            for(let llave2 in item){
               obj[llave2] = item[llave2];
            }
            arregloPedidosCopia[llave].push(obj);
       }
    }

    let arregloEnviar = [];
    for(let x in arregloPedidosCopia){
        for(let y of arregloPedidosCopia[x]){
              if(y != null || y != undefined){
                 if(y.servido != true){
                     arregloEnviar.push(y);
                 }
              }
        }

    }


    for(let item of arregloEnviar){
       item.ruta_imagen = "";

    }

    
    this.ticketPrd.insertDetalleLista(arregloEnviar).subscribe(datos =>{
      console.log("Ya enviada la orden a la cocina");
      console.log(arregloEnviar);

      let mensajeCocina = "_______________________________\n     PEDIDOS\n     COCINA\n_______________________________\n     PRODUCTO\n";
      let mensajeBarra = "_______________________________\n     PEDIDOS\n     BARRA\n_______________________________\n     PRODUCTO\n";

      for(let item of arregloEnviar){
         if(item.notificacion == 1){
            let aux = "";
            aux = aux + `*${item.nombre}\n Cantidad:\t${item.cantidad}\n Mesa:\t\t${"3"}\n Mesero:${this.usuariosPrd.getUsuario().nombre}\n`;
            aux = aux + " Observaciones:"+item.observaciones+"\n-----------------------\n";
            mensajeCocina = mensajeCocina + aux;
         }else {
            let aux = "";
            aux = aux + `*${item.nombre}\n Cantidad:\t${item.cantidad}\n Mesa:\t\t${"3"}\n Mesero:${this.usuariosPrd.getUsuario().nombre}\n`;
            aux = aux + " Observaciones:"+item.observaciones+"\n-----------------------\n";
            mensajeBarra = mensajeBarra + aux;

         }
      }

      mensajeBarra = mensajeBarra + "_______________________________\n\n";
      mensajeCocina = mensajeCocina + "_______________________________\n\n";
      this.globales.conectarCocina(mensajeCocina).then(cocina =>{
        this.globales.conectarBarra(mensajeBarra).then(barra =>{
            
        });
      });

      let toas = this.toasCtrl.create({message:"Orden enviada correctamente",duration:1500});
      toas.present();


      this.viewCtrl.dismiss({servido:true});


      

    });
    
  
  }

  public eliminarLista(obj,indice,indicepadre){
      if(obj.servido != true){
        let mensaje = this.alertCtrl.create({
          subTitle:"¿Deseas eliminar elemento de la orden?",
          message:"Se eliminara el elemento de la orden antes de ser enviado a concina",
          buttons:[{text:"Sí",handler:()=>{
           let arreglo1 = this.arreglo[indicepadre];
           arreglo1.splice(indice,1);
           let toas = this.toasCtrl.create({message:"Producto eliminado de la orden",duration:1500});
           toas.present();
          }},"No"]
      });
      mensaje.present();
      }
  }
}
