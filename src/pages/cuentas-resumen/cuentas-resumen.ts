import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
/**
 * Generated class for the CuentasResumenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cuentas-resumen',
  templateUrl: 'cuentas-resumen.html',
})
export class CuentasResumenPage {
  public arreglo: any = [];
  private id_ticket;
  public total = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private ticketsPrd: TicketsProvider, private alertCtrl: AlertController, private toasCtrl: ToastController) {

    this.id_ticket = this.navParams.get("id_ticket");
    this.ticketsPrd.getTicketsDetalleAgrupado(this.id_ticket).subscribe(datos => {
      this.arreglo = datos;
      for (let i of datos) {
        
        this.total = this.total + i.precio_total;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallecuentasResumenPage');
  }


  public salir() {
    this.viewCtrl.dismiss();
  }

  public cobrar(): any {

    let tipoPago = this.alertCtrl.create({
      title:"Tipo de pago",
      message:"Seleccionar el tipo de pago",
      inputs:[
      {type:"radio",label:"Efectivo",value:"E",checked:true},
      {type:"radio",label:"Cortesía",value:"C"},
      {type:"radio",label:"Tarjeta de crédito / débito",value:"T"},
      {type:"radio",label:"Otros",value:"O"}]
    ,buttons:[{text:"Cancelar"},{text:"Aceptar",handler: radio =>{
      let alerta = this.alertCtrl.create({
        title: "Cantidad", inputs: [{ placeholder: "Cantidad", type: "number", name: "cantidad" }],
        buttons: [{
          text: "Cobrar", handler: datos => {
            let cantidad = datos.cantidad;
            if(Number(cantidad) >= Number(this.total)){
              let objEnviar = {
                idTicket: this.id_ticket,
                total: this.total,
                tipoPago:radio
              };
    
              this.ticketsPrd.cobrarTicket(objEnviar).subscribe(datos => {
                let toas = this.toasCtrl.create({ message: datos.respuesta, duration: 1000 });
                toas.present();
                this.viewCtrl.dismiss({ id_ticket: objEnviar.idTicket,billete:cantidad });
              });
  
            }else{
                let alerta = this.alertCtrl.create({title:"Monto incorrecto",subTitle:"El monto ingresado debe ser mayor o igual al monto gastado",
              buttons:[{text:"Aceptar",handler:()=>{}}]});
                alerta.present();
            }
          }
        }]
      });
      alerta.present();
    }}]});
    tipoPago.present();


  }


}
