import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketsProvider } from '../tickets/tickets';
import { SucursalesProvider } from '../sucursales/sucursales';
import { UsuariosProvider } from '../usuarios/usuarios';
import { CurrencyPipe } from '@angular/common';

/*
  Generated class for the ImpresionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImpresionesProvider {

  private id_sucursal;
  private nombre_sucursal = "";
  private total = 0;

  constructor(public http: HttpClient, private ticketsprd: TicketsProvider,
    private sucursalPrd: SucursalesProvider, private usuariosPrd: UsuariosProvider,
    private currency: CurrencyPipe) {
    this.id_sucursal = usuariosPrd.getSucursal();
    this.sucursalPrd.getEspecifico(this.id_sucursal).subscribe(datos => {
      this.nombre_sucursal = datos.nombre;
    });
  }


  public getPreticket(datosTicket) {
   console.log(datosTicket);
    var promise = new Promise((resolve, reject) => {
      this.ticketsprd.getTicketsDetalleAgrupado(datosTicket.id_ticket).subscribe(datos => {
        if(datos.length > 0){
          let productosaux = "";
          let f = new Date();
          this.total = 0;
          for (let i of datos) { 
            this.total = this.total + i.precio_total;
            let cantidad = i.cantidad;
            let nombre = i.nombre;
            let unitario = this.currency.transform(i.unitario);
            let precioTotalCantidad = this.currency.transform(i.precio_total);
    
    
            productosaux = productosaux +`  ${cantidad}    `+nombre + "\n" + `\t\t${precioTotalCantidad}\n`;
           }
    
          let mensaje = "";
    
          let sucursal = "       TICKET DE COMPRA\n     NOMBRE DEL RESTAURANTE\n_______________________________\n\n\nSucursal: " + this.nombre_sucursal + "\n";
          let fecha ="Fecha:\t"+ f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()+"\n";
          let mesero = "Mesero:\tSantiago\n";
          let cuenta = "Folio:\t" + datosTicket.id_folio + "\n";
          let mesa = "Mesa:\t"+datosTicket.id_mesa+"\n";
          let lineas = "_______________________________\n";
          let lineas2 = "    PRODUCTOS CONSUMIDOS\n"+lineas;
          let productos ="===============================\nCant. | Nombre\n===============================\n"+ productosaux+"\n===============================\n";
          let total = "\tTotal:" + this.currency.transform(this.total)+"\n\t----------------\n  GRACIAS POR SU PREFERENCIA\n\n\n\n\n-------------------------------\n\n";
    
    
          mensaje = sucursal+fecha+mesero + cuenta +mesa+ lineas + lineas2 +"\n"+ productos  + total;
          console.log(mensaje);
          resolve(mensaje);
        }else{
          reject("Mesa no contiene productos ordenados.");
        }
      });
    });
    return promise;
    

  }

}
