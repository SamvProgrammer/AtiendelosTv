import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';
/*
  Generated class for the CortecajaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CortecajaProvider {

  private direccion = "";
  private obj;


  constructor(public http: HttpClient) {
    this.direccion = direcciones.cortecaja;
  }

  public totalCortecaja(obj):Observable<any>{
     let idsucursal = obj.idsucursal;
     let fecha = obj.fecha;
     let url = this.direccion+`/sucursal/${idsucursal}/fechas?fecha=${fecha}`;
     return this.http.get(url);

  }

  public getGastos(obj):Observable<any>{
    let idsucursal = obj.idsucursal;
    let fecha = obj.fecha;
    let url = this.direccion+`/sucursal/${idsucursal}/gastos/fechas?fecha=${fecha}`;
    return this.http.get(url);
  }

  public addGastos(lista):Observable<any>{
     let url = this.direccion + "/gastos";

     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(lista);
     console.log(json);
     return this.http.post(url,json,httpOptions);
  }


}
