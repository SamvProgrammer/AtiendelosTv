import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Platform } from 'ionic-angular';

/*
  Generated class for the ReportesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportesProvider {

  public ruta:string="";
  constructor(public http: HttpClient,private ft:FileTransfer,private platform:Platform, private file: File,
    private document: DocumentViewer) {
    this.ruta = direcciones.reportes;
  }

  public getHistoricoCuentas(id_sucursal):Observable<any>{
    let dire = this.ruta+"/ticket/"+id_sucursal;
    return this.http.get(dire);    
  }

 public getVentaPorFecha(obj){

  let f1 = obj.f1;
  let f2 = obj.f2;
  let id_sucursal = obj.idsucursal;

  let dire = this.ruta+"/ticket/"+id_sucursal+"/fechas?fecha1="+f1+"&fecha2="+f2;
    return this.http.get(dire);    
 }

 public getVentaPorFechaMesa(obj){

  let f1 = obj.f1;
  let f2 = obj.f2;
  let id_sucursal = obj.idsucursal;

  let dire = this.ruta+"/ticket/mesas/"+id_sucursal+"/fechas?fecha1="+f1+"&fecha2="+f2;
    return this.http.get(dire);    
 }
 public getVentaPorFechaMesero(obj){

  let f1 = obj.f1;
  let f2 = obj.f2;
  let id_sucursal = obj.idsucursal;

  let dire = this.ruta+"/ticket/meseros/"+id_sucursal+"/fechas?fecha1="+f1+"&fecha2="+f2;
    return this.http.get(dire);    
 }

 public getVentaPorFechaSucursales(obj){

  let f1 = obj.f1;
  let f2 = obj.f2;

  let dire = this.ruta+"/ticket/sucursales/fechas?fecha1="+f1+"&fecha2="+f2;
    return this.http.get(dire);    
 }

 public getVentaPorFechaBarracocina(obj){

  let f1 = obj.f1;
  let f2 = obj.f2;
  let id_sucursal = obj.idsucursal;

  let dire = this.ruta+"/ticket/barracocina/"+id_sucursal+"/fechas?fecha1="+f1+"&fecha2="+f2;
    return this.http.get(dire);    
 }


  public crearReporte(datos): any {

    const fileTransfer: FileTransferObject = this.ft.create();
    const options: DocumentViewerOptions = {
      title: 'Reporte',
      print:{enabled:true}
    }

      if (this.platform.is('cordova')) {
        let filename = "reporte.pdf";
        const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
        this.file.writeFile(writeDirectory, filename, this.convertBaseb64ToBlob(datos.respuesta, 'data:application/pdf;base64'), {replace: true})
        .then(() => {
            
            this.document.viewDocument(writeDirectory+filename,'application/pdf',options);
        })
        .catch(() => {
            console.error('Error writing pdf file');
        });        
      } else {
        console.log(datos);
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64," + datos.respuesta+"'></iframe>")
      }
  }
  public convertBaseb64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         const slice = byteCharacters.slice(offset, offset + sliceSize);
         const byteNumbers = new Array(slice.length);
         for (let i = 0; i < slice.length; i++) {
             byteNumbers[i] = slice.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
    }
   return new Blob(byteArrays, {type: contentType});
}

}
