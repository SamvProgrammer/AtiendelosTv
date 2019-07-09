import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, DateTime, LoadingController, Platform } from 'ionic-angular';
import { GlobalesProvider } from '../../providers/globales/globales';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { MesasProvider } from '../../providers/mesas/mesas';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { CuentasDetallePage } from '../cuentas-detalle/cuentas-detalle';
import { CuentasResumenPage } from '../cuentas-resumen/cuentas-resumen';
import { TicketsPage } from '../tickets/tickets';
import { CuentasMesasPage } from '../cuentas-mesas/cuentas-mesas';
import { ImpresionesProvider } from '../../providers/impresiones/impresiones';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Storage } from '@ionic/storage';
import { SocketProvider } from '../../providers/socket/socket';





@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html',
})
export class CuentasPage {
  public id_sucursal;
  public id_usuario;
  public arreglo: any = [];
  public menutogle: boolean = false;
  public boolCancelar: boolean = false;
  public boolCobrar: boolean = false;
  public indice;
  public contador = 0;
  public indiceAnterior = -1;
  public dateAnterior: any;
  private load;

  constructor(public navCtrl: NavController, public navParams: NavParams, private globales: GlobalesProvider,
    private usuariosPrd: UsuariosProvider, private mesasPrd: MesasProvider, private ticketsprd: TicketsProvider,
    private toasCtrl: ToastController, private modalCtrl: ModalController, private alertCtrl: AlertController,
    private impresionesPrd: ImpresionesProvider, private bt: BluetoothSerial, private storage: Storage,
    private loadCtrl: LoadingController, private sockets: SocketProvider,private platform:Platform) {
  }

  ionViewDidLoad() {
  }

  public registrarPromesa(){
    let configuraciones = this.globales.getConfiguraciones();
     console.log("Es aqui?");
    if(configuraciones != null  ){
      if (configuraciones.cancelacion == true) {
        this.sockets.suscribirRecibirAutorizados().then(respuesta => {
          this.load.dismissAll();
          this.cancelando();
        });
      }
    }
  }

  ionViewDidEnter() {
    this.id_sucursal = this.usuariosPrd.getSucursal();
    this.id_usuario = this.usuariosPrd.getIdUsuario();
    this.mesasPrd.getActivosUsuarioEspecifico(this.id_sucursal, true, this.id_usuario).subscribe(datos => {
      for (let item of datos)
        item.colorear = item.ocupada;
      this.arreglo = datos;
    });

    this.menutogle = true;
    this.boolCancelar = false;
    this.boolCobrar = false;
  }

  public salir() {
    this.globales.cerrarAplicacion();
  }

  public marcar(indice) {
    for (let item of this.arreglo) {
      item.clase = false;
      item.colorear = item.ocupada;
    }

    this.arreglo[indice].colorear = false;
    this.arreglo[indice].clase = true;

    if (this.arreglo[indice].ocupada == true) {
      this.boolCancelar = true;
      this.boolCobrar = true;
    } else {
      this.boolCancelar = false;
      this.boolCobrar = false;
    }

    this.menutogle = true;
    this.indice = indice;


    if (this.indice == this.indiceAnterior) {
      var tiempoActual: any = new Date();
      let tiempoTranscurrido = tiempoActual - this.dateAnterior;
      if (tiempoTranscurrido > 250) {
        this.contador = 0;
        this.dateAnterior = new Date();
      }
      this.contador = this.contador + 1;
      if (this.contador == 2) {
        this.traerDetalleProductos();
        this.dateAnterior = new Date();
      } else if (this.contador > 2) {
        this.contador = 1;
      }

    } else {
      this.dateAnterior = new Date();
      this.indiceAnterior = this.indice;
      this.contador = 1;
    }


  }

  public agregar() {

    let idUser = this.usuariosPrd.getIdUsuario();
    let idSucursal = this.usuariosPrd.getSucursal();



    let mostrarMesasDesocupadas = this.modalCtrl.create(CuentasMesasPage, { id_sucursal: this.id_sucursal });
    mostrarMesasDesocupadas.present();
    mostrarMesasDesocupadas.onDidDismiss(datos => {
      if (datos != undefined) {
        let mesa = datos.mesa;
        let objMesa = {
          id_mesa: mesa.id_mesa,
          id_tipo: mesa.id_tipo,
          id_sucursal: mesa.id_sucursal,
          ocupada: true
        };

        this.mesasPrd.modificar(objMesa).subscribe(datosMesa => {
          mesa.ocupada = true;
          mesa.colorear = true;

          let obj = {
            idUser: idUser,
            idSucursal: idSucursal,
            idMesa: mesa.id_mesa
          }



          this.ticketsprd.insert(obj).subscribe(datosTicket => {
            let modal = this.modalCtrl.create(CuentasDetallePage, { objTicket: datosTicket });
            modal.present();
            modal.onDidDismiss(cerrando => {
              this.mesasPrd.getActivosUsuarioEspecifico(this.id_sucursal, true, this.id_usuario).subscribe(datos => {
                for (let item of datos)
                  item.colorear = item.ocupada;
                this.arreglo = datos;
              });
            });
          });
        });
      }
    });

  }

  public preticketImprimir() {

    let idSucursal = this.usuariosPrd.getSucursal();

    let objTicket = {
      id_mesa: this.arreglo[this.indice].id_mesa,
      id_sucursal: idSucursal
    }


    this.ticketsprd.getTicketEspecifico(objTicket).subscribe(datosTicket => {
      this.impresionesPrd.getPreticket(datosTicket).then(mensaje => {

        if(this.platform.is('cordova')){
          this.globales.conectarCajero(mensaje);
        }

        
      }).catch(err => {
        let toast = this.toasCtrl.create({ message: err, duration: 1500 });
        toast.present();
      });
    });

  }

  public cancelar() {
    this.registrarPromesa();
    let alerta = this.alertCtrl.create({
      subTitle: "Aviso",
      message: "¿Deseas cancelar la cuenta?",
      buttons: [{
        text: "Sí", handler: () => {
          let configuraciones = this.globales.getConfiguraciones();
         
          if(configuraciones != null || configuraciones != undefined){
            
              if (configuraciones.cancelacion == true) {
                console.log("Entra a la autorizacion");
                this.load = this.loadCtrl.create({ content: "Esperando autorización de cancelación" });
                this.load.present();
                let solicitud_cancelacion = {
                  usuario: this.usuariosPrd.getIdUsuario(),
                  idSucursal: this.usuariosPrd.getSucursal(),
                  tipoMensaje: 'CANCELACION'
                };
                this.sockets.enviarCancelacion(solicitud_cancelacion);
              } else {
                this.cancelando();
                console.log("Entra al otro tranquilo");
              }
            
          }else{
            this.cancelando();
          }
        }
      }, "No"]
    });
    alerta.present();
  }


  public cancelando() {
    let idSucursal = this.usuariosPrd.getSucursal();

    let objTicket = {
      id_mesa: this.arreglo[this.indice].id_mesa,
      id_sucursal: idSucursal
    }
    this.ticketsprd.getTicketEspecifico(objTicket).subscribe(datosTicket => {
      let id_ticket = datosTicket.id_ticket;
      this.ticketsprd.cancelar(id_ticket).subscribe(datos => {
        let toas = this.toasCtrl.create({
          message: "Cuenta cancelada correctamente",
          duration: 1500
        });
        toas.present();
        this.mesasPrd.getActivosUsuarioEspecifico(this.id_sucursal, true, this.id_usuario).subscribe(datos => {
          for (let item of datos)
            item.colorear = item.ocupada;
          this.arreglo = datos;
        });
      });
    });
    this.ionViewDidEnter();
  }

  public agregarProductos() {
    console.log("agregando productos");
    let objTicket = {
      id_mesa: this.arreglo[this.indice].id_mesa,
      id_sucursal: this.id_sucursal
    }

    this.ticketsprd.getTicketEspecifico(objTicket).subscribe(datosTicket => {
      let modal = this.modalCtrl.create(CuentasDetallePage, { objTicket: datosTicket });
      modal.present();
      modal.onDidDismiss(datos => {
        if (datos) {
          this.arreglo[this.indice].ocupada = false;
          this.arreglo[this.indice].colorear = false;
          this.navCtrl.push(TicketsPage, { id_ticket: datos.id_ticket, billete: datos.billete });
        }
      });
    });
  }

  public traerDetalleProductos() {
    let objTicket = {
      id_mesa: this.arreglo[this.indice].id_mesa,
      id_sucursal: this.id_sucursal
    }

    this.ticketsprd.getTicketEspecifico(objTicket).subscribe(datosTicket => {
      let modal = this.modalCtrl.create(CuentasDetallePage, { objTicket: datosTicket });
      modal.present();
      modal.onDidDismiss(datos => {
        if (datos) {
          this.arreglo[this.indice].ocupada = false;
          this.arreglo[this.indice].colorear = false;
          this.navCtrl.push(TicketsPage, { id_ticket: datos.id_ticket, billete: datos.billete });
        }
      });
    });
  }

}
