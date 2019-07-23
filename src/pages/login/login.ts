import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { SucursalesProvider } from '../../providers/sucursales/sucursales';
import { Storage } from '@ionic/storage';
import { CocinaPage } from '../cocina/cocina';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public invalido: boolean = false;
  public arreglo = [];
  public sucursal: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private toasCtrl: ToastController, private usuariosPdr: UsuariosProvider, private loadCtrl: LoadingController,
    private sucursalesPrd: SucursalesProvider) {
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {

    let obj = {
      login: "Cocinero",
      password: "12345",
      idSucursal: 3
    }

    this.usuariosPdr.ingresarSistema(obj).subscribe(datos => {
      let ingresar = datos.entrar;
      if (ingresar == true) {
        let toas = this.toasCtrl.create({ message: "Sistema ingresado con exito", duration: 1500 });
        toas.present();
        this.usuariosPdr.guardarUsuario(datos);
        this.storage.set('obj', datos);
        this.storage.set('logeado', true);
        console.log(datos);
        this.navCtrl.setRoot(CocinaPage);
      } else {
        let toas = this.toasCtrl.create({ message: "Usuario / Contraseña invalidos", duration: 1500 });
        toas.present();
      }
    });



  }

  public ingresar(usuario, contra): any {
    let strUsuario = usuario.value;
    let strContra = contra.value;
    let toas = this.toasCtrl.create({ message: "Usuario y/o Contraseña invalidos", duration: 2000 });

    if (strUsuario.trim() == "") {
      this.invalido = true;
      toas.present();
      return;
    }

    if (strContra.trim() == "") {
      this.invalido = true;
      toas.present();
      return;
    }

    let obj = {
      login: "Admin",
      password: "12345",
      idSucursal: 3
    }

    this.usuariosPdr.ingresarSistema(obj).subscribe(datos => {
      let ingresar = datos.entrar;
      if (ingresar == true) {
        let toas = this.toasCtrl.create({ message: "Sistema ingresado con exito", duration: 1500 });
        toas.present();
        this.usuariosPdr.guardarUsuario(datos);
        this.storage.set('obj', datos);
        this.storage.set('logeado', true);
        console.log(datos);
        this.navCtrl.setRoot(CocinaPage);
      } else {
        let toas = this.toasCtrl.create({ message: "Usuario / Contraseña invalidos", duration: 1500 });
        toas.present();
      }
    });
  }

}
