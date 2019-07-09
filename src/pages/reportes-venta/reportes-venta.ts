import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ReportesProvider } from '../../providers/reportes/reportes';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

import { ReportesVentaFechaPage } from '../reportes-venta-fecha/reportes-venta-fecha';

/**
 * Generated class for the ReportesVentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-reportes-venta',
  templateUrl: 'reportes-venta.html',
})
export class ReportesVentaPage {

  id_sucursal: any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private reportesPrd: ReportesProvider,
    private usuariosPrd: UsuariosProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.id_sucursal = this.usuariosPrd.getSucursal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportesVentaPage');
  }

  public salir() {


  }


  public totales(): any {
    let mensaje = this.alertCtrl.create({
      message: "¿Desea visualizar el reporte?", buttons: [
        {
          text: "Sí", handler: () => {

            let cargando = this.loadingCtrl.create({ content: "Cargando reporte" });
            this.reportesPrd.getHistoricoCuentas(this.id_sucursal).subscribe(datos => {
              cargando.dismiss();
              this.reportesPrd.crearReporte(datos);
            });
          }
        }, "No"
      ]
    });

    mensaje.present();
  }

  public fechaReportes(opcion) {
    switch (opcion) {
      case 1:
        this.navCtrl.push(ReportesVentaFechaPage, { nombre_reporte: "Reporte por fechas", opcion: opcion });
        break;
      case 2:
        this.navCtrl.push(ReportesVentaFechaPage, { nombre_reporte: "Reporte por mesas", opcion: opcion });
        break;
      case 3:
        this.navCtrl.push(ReportesVentaFechaPage, { nombre_reporte: "Reporte por meseros", opcion: opcion });
        break;
      case 4:
        this.navCtrl.push(ReportesVentaFechaPage, { nombre_reporte: "Reporte por sucursales", opcion: opcion });
        break;
      case 5:
        this.navCtrl.push(ReportesVentaFechaPage, { nombre_reporte: "Reporte detalle por mesa", opcion: opcion });
        break;
      case 6:
        this.navCtrl.push(ReportesVentaFechaPage, { nombre_reporte: "Reporte por barra y cocina", opcion: opcion });
        break;
      default:
        break;

    }
  }


}
