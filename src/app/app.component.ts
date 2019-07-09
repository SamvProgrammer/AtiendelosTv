import { Component } from '@angular/core';
import { Platform, App, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { SucursalesProvider } from '../providers/sucursales/sucursales';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Storage } from '@ionic/storage';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';

import { TabsPage } from '../pages/tabs/tabs';
import { MesasPage } from '../pages/mesas/mesas';
import { ProductosPage } from '../pages/productos/productos';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { HistorialPage } from '../pages/historial/historial';
import { InventariosPage } from '../pages/inventarios/inventarios';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { CajaPage } from '../pages/caja/caja';
import { ReportesMenuPage } from '../pages/reportes-menu/reportes-menu';
import { GlobalesProvider } from '../providers/globales/globales';
import { GestionUsuariosPage } from '../pages/gestion-usuarios/gestion-usuarios';
import { SocketProvider } from '../providers/socket/socket';
import { AutorizadosPage } from '../pages/autorizados/autorizados';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  inicio: any = TabsPage;
  mesas: any = MesasPage;
  productos: any = ProductosPage;
  sucursales: any = SucursalesPage;
  historial: any = HistorialPage;
  inventario: any = InventariosPage;
  configuracion: any = ConfiguracionPage;
  caja: any = CajaPage;
  reportes: any = ReportesMenuPage;
  gestionusuarios: any = GestionUsuariosPage;
  autorizados: any = AutorizadosPage;


  public sucursal;
  public arreglo: any = [];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private usuarioPrd: UsuariosProvider,private ringtones: NativeRingtones, private sucursalesPrd: SucursalesProvider, private appCtrl: App,
    private menuCtrl: MenuController, public androidPermissions: AndroidPermissions,
    private storage: Storage, private globales: GlobalesProvider, private socketPrd: SocketProvider, private toasCtrl: ToastController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    usuarioPrd.guardarUsuario({ menu: false } );

    if (platform.is('cordova')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
        .then(success => {

        },
          err => {

          });

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
    }

    this.storage.get("configuraciones").then(valor => {
      this.globales.setConfiguraciones(valor);

      //esto lo saco de configuraciones para ver si se conecta con el socket automaticamente para recibir notificaciones en tiempo real...
      let configuracion = this.globales.getConfiguraciones();
      console.log(configuracion);
      if (configuracion != undefined || configuracion != null) {
        if (configuracion.cancelacion != undefined || configuracion.autorizacion != undefined) {
          this.socketPrd.conectar().then(mensaje => {
            if (configuracion.cancelacion != undefined) {
              if (configuracion.cancelacion == true) {
                this.socketPrd.suscribirRecibirAutorizados().then(datos => {

                });
              }
            }

            if (configuracion.autorizacion != undefined) {
              if (configuracion.autorizacion == true) {
                this.socketPrd.suscribirRecibirCancelaciones();
              }
            }
          }).catch(error => {
            let mensaje = toasCtrl.create({ message: "Error al crear conexión con el socket" });
            mensaje.present();
          });
        }
      }
    });




    
  }

  ionViewDidEnter() {
  }


  public activaMenu(): boolean {
    return this.usuarioPrd.activarMenu() == true;
  }

  public onSelectChange(evento) {
    let id_sucursal = evento;
    let usuario = this.usuarioPrd.getUsuario();
    usuario.id_sucursal = id_sucursal;
    this.usuarioPrd.guardarUsuario(usuario);
    this.appCtrl.getRootNavs()[1].setRoot(TabsPage)
  }


  public openPage(pagina) {
    this.menuCtrl.close();
    this.rootPage = pagina;
  }

}
