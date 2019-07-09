import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


/*
  Generated class for the GlobalesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalesProvider {
  private configuraciones;
  constructor(public http: HttpClient, private alertCtrl: AlertController, private appCtrl: App,
    private storage: Storage, private bt: BluetoothSerial) {

  }

  public cerrarAplicacion() {
    let alerta = this.alertCtrl.create({
      message: "¿Deseas salir de la aplicación?", subTitle: "Aviso",
      buttons: [{
        text: "Si", handler: () => {
          this.appCtrl.getRootNavs()[1].setRoot(LoginPage);
          this.storage.set("logeado", false);
        }
      }, "No"]
    });
    alerta.present();

  }

  public getConfiguraciones() {
    return this.configuraciones;
  }

  public setConfiguraciones(obj) {
    this.configuraciones = obj;
  }

  public valida(obj): boolean {

    let validado: boolean = false;
    if (obj != null || obj != undefined) {

      validado = true;
    }
    return validado;
  }


  public conectarCajero(mensaje) {


    var promesa = new Promise((resolver, errores) => {

      this.storage.get("cajero").then(configuracionimpresora => {

        this.bt.isConnected().then(() => {
          this.bt.disconnect().then(conectado => {
            let mac = configuracionimpresora.mac;
            this.bt.connect(mac).subscribe(datosconectador => {
              this.bt.write(mensaje);
              resolver("Se resuelve");
            }, error => {
              errores("No se pudo conectar");
            });
          }).catch(disconecteerror => {
            errores("No se pudo desconectar");
          });
        }).catch(() => {
          let mac = configuracionimpresora.mac;
          this.bt.connect(mac).subscribe(datosconectador => {
            this.bt.write(mensaje);
            resolver("Se resuelve");
          },error =>{
             errores("No se pudo desconectar");
          });

        });

      }).catch(error => {
        errores("Hay error no existe mac de impresora");
      });

    });


    return promesa;

  }


  public conectarCocina(mensaje) {


   

    var promesa = new Promise((resolver, errores) => {

      this.storage.get("cocina").then(configuracionimpresora => {

        this.bt.isConnected().then(() => {
          this.bt.disconnect().then(conectado => {
            let mac = configuracionimpresora.mac;
            this.bt.connect(mac).subscribe(datosconectador => {
              this.bt.write(mensaje);
              resolver("Se resuelve");
            }, error => {
              errores("No se pudo conectar");
            });
          }).catch(disconecteerror => {
            errores("No se pudo desconectar");
          });
        }).catch(() => {
          let mac = configuracionimpresora.mac;
          this.bt.connect(mac).subscribe(datosconectador => {
            this.bt.write(mensaje);
            resolver("Se resuelve");
          },error =>{
             errores("No se pudo desconectar");
          });

        });

      }).catch(error => {
        errores("Hay error no existe mac de impresora");
      });

    });


    return promesa;
  }

  public conectarBarra(mensaje) {



    var promesa = new Promise((resolver, errores) => {

      this.storage.get("barra").then(configuracionimpresora => {

        this.bt.isConnected().then(() => {
          this.bt.disconnect().then(conectado => {
            let mac = configuracionimpresora.mac;
            this.bt.connect(mac).subscribe(datosconectador => {
              this.bt.write(mensaje);
              resolver("Se resuelve");
            }, error => {
              errores("No se pudo conectar");
            });
          }).catch(disconecteerror => {
            errores("No se pudo desconectar");
          });
        }).catch(() => {
          let mac = configuracionimpresora.mac;
          this.bt.connect(mac).subscribe(datosconectador => {
            this.bt.write(mensaje);
            resolver("Se resuelve");
          },error =>{
             errores("No se pudo desconectar");
          });

        });

      }).catch(error => {
        errores("Hay error no existe mac de impresora");
      });

    });


    return promesa;
  }

}
