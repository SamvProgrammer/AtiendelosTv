import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { SucursalesProvider } from '../../providers/sucursales/sucursales';
import { TicketsPage } from '../tickets/tickets';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { ReportesProvider } from '../../providers/reportes/reportes';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { ip } from '../../assets/direcciones';
import { GlobalesProvider } from '../../providers/globales/globales';



/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  public arreglo: any = [];
  public fecha;
  public id_sucursal;


  constructor(public navCtrl: NavController, public navParams: NavParams, private ticktPrd: TicketsProvider,
    private usuariosPrd: UsuariosProvider, private sucursalesPrd: SucursalesProvider,
    private reportePrd: ReportesProvider, private document: DocumentViewer, private platadorma: Platform,
    private alertCtrl: AlertController, private file: File, private ft: FileTransfer,
    private toasCtrl: ToastController, private loadCtrl: LoadingController,
    private globales: GlobalesProvider) {

    this.id_sucursal = usuariosPrd.getSucursal();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let dia: string = "";
    let mes: string = "";

    if (dd < 10) {
      dia = "0" + dd;
    } else {
      dia = "" + dd;
    }

    if (mm < 10) {
      mes = '0' + mm;
    } else {
      mes = "" + mm;
    }

    this.fecha = yyyy + '-' + mes + '-' + dia;
    this.ticktPrd.getTicketsCanceladosCobrados(this.id_sucursal, undefined).subscribe(datos => {
      this.arreglo = datos;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

  public buscar() {

    this.ticktPrd.getTicketsCanceladosCobrados(this.id_sucursal, this.fecha).subscribe(datos => {
      this.arreglo = datos;
      console.log(this.arreglo);
    });
  }

  public entrarDetalle(obj) {
    this.navCtrl.push(TicketsPage, { id_ticket: obj.id_ticket });
  }

  public reporte(): any {

    const fileTransfer: FileTransferObject = this.ft.create();
    const options: DocumentViewerOptions = {
      title: 'Reporte'
    }

    let cargando = this.loadCtrl.create({ content: "Generando reporte" });
    cargando.present();
    this.reportePrd.getHistoricoCuentas(this.id_sucursal).subscribe(datos => {
      cargando.dismiss();
      this.reportePrd.crearReporte(datos);
    });
  }


  public salir() {
    this.globales.cerrarAplicacion();
  }

}
