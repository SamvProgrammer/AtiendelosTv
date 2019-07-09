import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { TicketsPage } from '../tickets/tickets';
import { GlobalesProvider } from '../../providers/globales/globales';

/**
 * Generated class for the TransaccionesdiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-transaccionesdia',
  templateUrl: 'transaccionesdia.html',
})
export class TransaccionesdiaPage {
  private id_sucursal;
  public arreglo:any = [];
  constructor(public navCtrl: NavController, private ticketsPrd:TicketsProvider,
  private usuariosPrd:UsuariosProvider,private globales:GlobalesProvider) {
      this.id_sucursal = usuariosPrd.getSucursal();
      this.ticketsPrd.getTicketsCanceladosCobrados(this.id_sucursal,undefined).subscribe(datos => {
        this.arreglo = datos;
      });
  }


  ionViewDidEnter(){
    this.ticketsPrd.getTicketsCanceladosCobrados(this.id_sucursal,undefined).subscribe(datos => {
      this.arreglo = datos;
    });

  }
  public actualizandoTransacciones(refresher): any {

    this.ticketsPrd.getTicketsCanceladosCobrados(this.id_sucursal,undefined).subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }



  public reimprimir(obj):any{

    this.navCtrl.push(TicketsPage,{id_ticket:obj.id_ticket});
  }


  public salir(){
    this.globales.cerrarAplicacion();
  }

}
