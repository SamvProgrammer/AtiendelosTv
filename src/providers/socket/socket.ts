import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ip } from '../../assets/direcciones';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform, LoadingController } from 'ionic-angular';


@Injectable()
export class SocketProvider {
  public stompClient: Stomp;
  public cancelaciones: any = [];
  public load;
  public metodo;
  constructor(private notificaciones: LocalNotifications, private platform: Platform,private loadCtrl:LoadingController) {
    console.log('Hello SocketProvider Provider');
  }

  public conectar() {
    let urlSocket = `${ip}/conectarSocket`;

    let promesa = new Promise((resolve, error) => {
      let socketCliente = new SockJS(urlSocket);
      this.stompClient = Stomp.over(socketCliente);

      this.stompClient.connect({}, (conectado) => {
        resolve("conexion con exito");
      }, (error) => {
        error("Error al conectar con el socket");
      });
    });

    return promesa;
  }


  public suscribirRecibirCancelaciones() {
    console.log("Se para recibir cancelaciones");
    this.stompClient.subscribe('/suscribirse/obtenercancelaciones_meseros', (datos) => {
      var cuerpo = JSON.parse(datos.body);
      let id_usuario = cuerpo.usuario;
      let id_sucursal = cuerpo.idSucursal;
      let tipo = cuerpo.tipoMensaje;


      this.cancelaciones.push(cuerpo);
      if (this.platform.is('cordova')) {
        this.notificaciones.schedule({
          id: 1,
          title: "Atención",
          text: "Solicitud de cancelación",
          data: { datos: JSON.stringify(cuerpo) },
          trigger: { at: new Date(new Date().getTime()) }
        });

      }

    });
  }

  public suscribirRecibirAutorizados() {
    
    var promesa = new Promise((echo,error)=>{
      this.stompClient.subscribe('/suscribirse/obtenercancelaciones_autorizados', (datos) => {
             echo("realizado");
      });
    });

    return promesa;
  }

  public enviarCancelacion(obj) {
    this.stompClient.send("/entrada/pedir.cancelacion", {}, JSON.stringify(obj));
  }

  public enviarAutorizacion(obj) {
    this.stompClient.send("/entrada/autorizar.cancelacion", {}, JSON.stringify(obj));
  }

  public getCancelaciones() {
    return this.cancelaciones;
  }

}
