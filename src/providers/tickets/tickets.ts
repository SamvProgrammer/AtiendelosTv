import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the TicketsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TicketsProvider {

  private data: Observable<any>;
  private direccion = "";

  constructor(public http: HttpClient) {
    this.direccion = direcciones.tickets;
  }

  public getTickets(id_sucursal): Observable<any> {
    let filtrarDireccion = this.direccion + "/sucursal/" + id_sucursal;
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }

  public getTicketEspecifico(obj) : Observable<any>{
    let id_sucursal = obj.id_sucursal;
    let id_mesa = obj.id_mesa;

    let filtrarDireccion = this.direccion + "/sucursal/" + id_sucursal + "/mesa/"+id_mesa;
    return  this.http.get(filtrarDireccion);

  }
  public getTicketsCanceladosCobrados(id_carrito, fecha): Observable<any> {
    let auxFecha = "";

    if (fecha == undefined) {
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

      auxFecha = yyyy + '-' + mes + '-' + dia;
    } else {
      auxFecha = fecha;
    }


    let filtrarDireccion = this.direccion + "/sucursal/" + id_carrito + "/fecha/" + auxFecha;
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }

  public insert(obj): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(this.direccion, json, httpOptions);
  }

  public cancelar(id_Ticket): Observable<any> {
    let filtrarDireccion = this.direccion + "/cancelar/" + id_Ticket;
    this.data = this.http.delete(filtrarDireccion);
    return this.data;
  }


  public insertDetalle(obj): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let ruta = this.direccion + "/detalle";
    let json = JSON.stringify(obj);
    return this.http.post(ruta, json, httpOptions);
  }

  public insertDetalleLista(obj): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let ruta = this.direccion + "/detalle/lista";
    let json = JSON.stringify(obj);
    return this.http.post(ruta, json, httpOptions);
  }

  public getTicketsDetalle(id_ticket): Observable<any> {
    let filtrarDireccion = this.direccion + "/detalle/" + id_ticket;
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }
  public getTicketsDetalleAgrupado(id_ticket): Observable<any> {
    let filtrarDireccion = this.direccion + "/detalle/agrupado/" + id_ticket;
    console.log(filtrarDireccion);
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }

  public getTicketsDetalleAgrupadoTicketFinal(id_ticket): Observable<any> {
    let filtrarDireccion = this.direccion + "/detalle/agrupado/ticketfinal/" + id_ticket;
    console.log(filtrarDireccion);
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }

  public cobrarTicket(obj): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let ruta = this.direccion + "/cobrado";
    let json = JSON.stringify(obj);
    return this.http.put(ruta, json, httpOptions);
  }


  public notificaciones(id_sucursal,lugar): Observable<any> {
    let filtrarDireccion = this.direccion + "/notificaciones/" + id_sucursal +"/lugar/"+lugar;
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }

  public notificacionesambos(id_sucursal): Observable<any> {
    let filtrarDireccion = this.direccion + "/notificaciones/" + id_sucursal;
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }

  public detallecocineroactualizar(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let ruta = this.direccion + "/detallecocinero";
    let json = JSON.stringify(obj);

    this.data = this.http.put(ruta, json, httpOptions);
    return this.data;
  }

  public getNotificacion(): Observable<any> {
    let filtrarDireccion = this.direccion + "/notificacion";
    this.data = this.http.get(filtrarDireccion);
    return this.data;
  }


  public actualizarDetalleTicket(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let filtrarDireccion = this.direccion + "/detalle";
    let json = JSON.stringify(obj);
    this.data = this.http.put(filtrarDireccion, json, httpOptions);
    return this.data;
  }


  public eliminarDetalleTicket(id): Observable<any> {
    let filtrarDireccion = this.direccion + "/detalle/" + id;
    return this.http.delete(filtrarDireccion);
  }

  public cancelarDetalleTicket(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let filtrarDireccion = this.direccion + "/detalle";
    console.log(obj);
    let json = JSON.stringify(obj);

    return this.http.put(filtrarDireccion, json, httpOptions);
  }

}
