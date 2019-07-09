import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController,AlertController } from 'ionic-angular';
import { GlobalesProvider } from '../../providers/globales/globales';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { MesasProvider } from '../../providers/mesas/mesas';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { CuentasDetallePage } from '../cuentas-detalle/cuentas-detalle';
import { CuentasResumenPage } from '../cuentas-resumen/cuentas-resumen';
import { TicketsPage } from '../tickets/tickets';





@Component({
  selector: 'page-caja-mesa',
  templateUrl: 'caja-mesa.html',
})
export class CajaMesaPage {
  public id_sucursal;
  public arreglo: any = [];
  public menutogle: boolean = false;
  public boolCancelar: boolean = false;
  public boolCobrar: boolean = false;
  public indice;

  constructor(public navCtrl: NavController, public navParams: NavParams, private globales: GlobalesProvider,
    private usuariosPrd: UsuariosProvider, private mesasPrd: MesasProvider, private ticketsprd: TicketsProvider,
    private toasCtrl: ToastController, private modalCtrl: ModalController,private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.id_sucursal = this.usuariosPrd.getSucursal();
    this.mesasPrd.getActivos(this.id_sucursal,true).subscribe(datos => {
      for (let item of datos)
        item.colorear = item.ocupada;
      this.arreglo = datos;
    });

    this.menutogle = false;
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
  }

  public agregar() {

    let idUser = this.usuariosPrd.getIdUsuario();
    let idSucursal = this.usuariosPrd.getSucursal();

    if (this.arreglo[this.indice].ocupada == true) {

      let objTicket = {
        id_mesa: this.arreglo[this.indice].id_mesa,
        id_sucursal: idSucursal
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
    } else {

      let objMesa = {
        id_mesa: this.arreglo[this.indice].id_mesa,
        id_tipo: this.arreglo[this.indice].id_tipo,
        id_sucursal: this.arreglo[this.indice].id_sucursal,
        ocupada: true
      };

      this.mesasPrd.modificar(objMesa).subscribe(datosMesa => {
        this.arreglo[this.indice].ocupada = true;
        this.arreglo[this.indice].colorear = true;

        let obj = {
          idUser: idUser,
          idSucursal: idSucursal,
          idMesa: this.arreglo[this.indice].id_mesa
        }

        this.ticketsprd.insert(obj).subscribe(datosTicket => {
          let modal = this.modalCtrl.create(CuentasDetallePage, { objTicket: datosTicket });
          modal.present();
        });
      });
    }
  }

  public cobrar() {

    let idSucursal = this.usuariosPrd.getSucursal();

    let objTicket = {
      id_mesa: this.arreglo[this.indice].id_mesa,
      id_sucursal: idSucursal
    }

    this.ticketsprd.getTicketEspecifico(objTicket).subscribe(datosTicket => {
      let modal = this.modalCtrl.create(CuentasResumenPage, { id_ticket: datosTicket.id_ticket });
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

  public cancelar() {
    let alerta = this.alertCtrl.create({
      subTitle:"Aviso",
      message:"¿Deseas cancelar la cuenta?",
      buttons:[{text:"Sí",handler:()=>{
          this.cancelando();
      }},"No"]
    });
    alerta.present();
  }


  public cancelando(){
    let idSucursal = this.usuariosPrd.getSucursal();

    let objTicket = {
      id_mesa: this.arreglo[this.indice].id_mesa,
      id_sucursal: idSucursal
    }
    this.ticketsprd.getTicketEspecifico(objTicket).subscribe(datosTicket => {
      let id_ticket = datosTicket.id_ticket;
      console.log(id_ticket);
      this.ticketsprd.cancelar(id_ticket).subscribe(datos => {
        let toas = this.toasCtrl.create({
          message:"Cuenta cancelada correctamente",
          duration:1500
        });
        toas.present();
        this.arreglo[this.indice].ocupada = false;
        this.arreglo[this.indice].colorear = false;
      });
    });
  }


}
