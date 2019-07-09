import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CortecajaProvider } from '../../providers/cortecaja/cortecaja';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the CajaCortePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-caja-corte',
  templateUrl: 'caja-corte.html',
})
export class CajaCortePage {

  public fecha;
  public efectivo: any = [];
  public salidas: any = [];
  public totales = 0;
  public totalSalida = 0;
  public id_sucursal;
  public id_usuario;
  public aparecer = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cortePrd: CortecajaProvider,
    private usuariosPrd: UsuariosProvider, private alertCtrl: AlertController) {
    this.id_sucursal = usuariosPrd.getSucursal();
    this.id_usuario = usuariosPrd.getIdUsuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CajaCortePage');
  }


  public buscar() {

    let obj = {
      fecha: this.fecha,
      idsucursal: this.usuariosPrd.getSucursal()

    };
    
    
this.aparecer = true;
    this.cortePrd.totalCortecaja(obj).subscribe(datos => {
      this.efectivo = datos;
      let total = 0;
      for (let item of this.efectivo) {
        switch (item.tipo_pago) {
          case 'E':
            item.tipo_pago = 'Efectivo';
            break;
          case 'C':
            item.tipo_pago = 'Cortesia';
            break;
          case 'T':
            item.tipo_pago = 'Tarjeta credito/debito';
            break;
          default:
            item.tipo_pago = 'Otros';
            break;
        }
        total = total + item.total;
      }
      this.totales = total;

      let obj2 = { tipo_pago: "TOTAL", total: total };
      this.efectivo.push(obj2);
      this.cortePrd.getGastos(obj).subscribe(cortegastos => {
          this.salidas = cortegastos;
          this.totalSalida = 0;
          for(let i of this.salidas){
            i.dinero = i.total;
            this.totalSalida = this.totalSalida + Number(i.dinero);
          }
      });
    });

    console.log(this.fecha);
  }


  public addSalidas() {
    let alerta = this.alertCtrl.create({

      subTitle: "Agregando salidas de efectivo",
      inputs: [{
        type: "text",
        name: "nombre",
        placeholder: "Nombre gasto", label: "Nombre salida"

      }, {
        type: "number",
        name: "dinero",
        placeholder: "Cantidad", label: "Cantidad"

      }], buttons: [{
        text: "Aceptar", handler: datos => {
          this.salidas.push(datos);
          this.totalSalida = 0;
          for (let i of this.salidas) {
            this.totalSalida = this.totalSalida + Number(i.dinero);
          }
        }
      }]
    });
    alerta.present();
  }

  public corte() {

    console.log(this.fecha);
    let alerta = this.alertCtrl.create({
      message: "¿Deseas realizar el corte de caja?",
      buttons: [{
        text: "Sí", handler: () => {
          if (this.salidas.length != 0) {
            for (let item of this.salidas) {
              item.idUsuario = this.id_usuario;
              item.idSucursal = this.id_sucursal;
              item.fechaAux = this.fecha;
              item.total = item.dinero;
            }
            this.cortePrd.addGastos(this.salidas).subscribe(realizado => {
              this.verCorte();
            });
          }
        }
      }, "no"]
    });

    alerta.present();


  }

  public verCorte() {
       let alerta = this.alertCtrl.create({
         message:"Imprimir reporte",
         subTitle:"Reporte",
         inputs:[{
          type: "radio",
          value: "1",
          name: "impresora",
          label: "Impresora",
          checked: true
        }],
         buttons:[{
           text:"Aceptar",
           handler : datos =>{
             if(datos == 1){
                console.log("Enviando a impresora");
             }
           }
         }]
       });
       alerta.present();
  }

  public actualizar(i){
    
    let alerta = this.alertCtrl.create({

      subTitle: "Modificando Salida de efectivo",
      inputs: [{
        type: "text",
        name: "nombre",
        placeholder: "Nombre gasto", label: "Nombre salida",
        value:i.nombre

      }, {
        type: "number",
        name: "dinero",
        placeholder: "Cantidad", label: "Cantidad",
        value:i.dinero

      }], buttons: [{
        text: "Aceptar", handler: datos => {
          i.nombre = datos.nombre;
          i.dinero = datos.dinero;
          this.totalSalida = 0;
          for (let i of this.salidas) {
            this.totalSalida = this.totalSalida + Number(i.dinero);
          }
        }
      }]
    });
    alerta.present();
  }

}
