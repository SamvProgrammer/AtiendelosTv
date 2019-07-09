import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ReportesProvider } from '../../providers/reportes/reportes';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';


/**
 * Generated class for the ReportesVentaFechaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-reportes-venta-fecha',
  templateUrl: 'reportes-venta-fecha.html',
})
export class ReportesVentaFechaPage {

  public f1;
  public f2;

  public nombrereporte;
  public opcion = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private reportePrd: ReportesProvider, private loadctrl: LoadingController,
    private usuariosPrd: UsuariosProvider) {

    this.nombrereporte = this.navParams.get("nombre_reporte");
    this.opcion = this.navParams.get("opcion");
  }

  ionViewDidLoad() {
    
  }


  public salir() {


  }




  public reporte() {
    let mensaje = this.alertCtrl.create({
      message: "¿Deseas generar el reporte?", buttons: [{
        text: "Sí", handler: () => {
          let cargando = this.loadctrl.create({ content: "Generando reporte" });
          cargando.present();
          let fecha1 = this.f1;
          let fecha2 = this.f2;
          let obj = {
            f1: fecha1,
            f2: fecha2,
            idsucursal: this.usuariosPrd.getSucursal()
          };

          switch (this.opcion) {
            case 1:
              this.reportePrd.getVentaPorFecha(obj).subscribe(datos => {
                cargando.dismiss();
                this.reportePrd.crearReporte(datos);
              });
              break;
            case 2:
              this.reportePrd.getVentaPorFechaMesa(obj).subscribe(datos => {
                cargando.dismiss();
                this.reportePrd.crearReporte(datos);
              });
              break;

            case 3:
              this.reportePrd.getVentaPorFechaMesero(obj).subscribe(datos => {
                cargando.dismiss();
                this.reportePrd.crearReporte(datos);
              });
              break;
              case 4:
              this.reportePrd.getVentaPorFechaSucursales(obj).subscribe(datos => {
                cargando.dismiss();
                this.reportePrd.crearReporte(datos);
              });
              break;
              case 5:
                  //Código a realizar
              break;
              case 6:
              this.reportePrd.getVentaPorFechaBarracocina(obj).subscribe(datos => {
                cargando.dismiss();
                this.reportePrd.crearReporte(datos);
              });
              break;
            default:
              break;
          }

        }
      }, "No"]
    });
    mensaje.present();
  }

}

