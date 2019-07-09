import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { SucursalesProvider } from '../../providers/sucursales/sucursales';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public invalido:boolean = false;
  public arreglo = [];
  public sucursal:any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
  private toasCtrl:ToastController,private usuariosPdr:UsuariosProvider,private loadCtrl:LoadingController,
  private sucursalesPrd:SucursalesProvider) {
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {

    this.storage.get('logeado').then((val) => {
        console.log("Se puede ingresar con logeado");
        console.log(val);
        if(val == true){
          this.storage.get('obj').then((objeto) => {
            console.log(objeto);
            this.usuariosPdr.guardarUsuario(objeto);
            this.navCtrl.setRoot(TabsPage);
          });
        }else{
          let cargando = this.loadCtrl.create({content:"Espere, cargando sucursales"});
          cargando.present();
          this.sucursalesPrd.gets().subscribe(datos => {
              this.arreglo = datos;
              cargando.dismiss();
          },error => {
            cargando.dismiss();
            let mensajeError = this.toasCtrl.create({message:"Error al cargar las sucursales,\nNota: Cerrar la aplicación",closeButtonText:"Cerrar",showCloseButton:true});
            mensajeError.present();
          });
        }
    });


    
  }

  public ingresar(usuario,contra):any{
    let strUsuario = usuario.value;
    let strContra = contra.value;
    let toas = this.toasCtrl.create({message:"Usuario y/o Contraseña invalidos",duration:2000});
    
    if(strUsuario.trim() == ""){
       this.invalido = true;
       toas.present();
       return;
    }

    if(strContra.trim() == ""){
      this.invalido = true;
      toas.present();
      return;
    }

    let obj = {
      login:strUsuario,
      password:strContra,
      idSucursal:this.sucursal
    }

    this.usuariosPdr.ingresarSistema(obj).subscribe(datos =>{
        let ingresar = datos.entrar;
        if(ingresar == true){
          let toas = this.toasCtrl.create({message:"Sistema ingresado con exito",duration:1500});
          toas.present();
          this.usuariosPdr.guardarUsuario(datos);
          this.storage.set('obj',datos);
          this.storage.set('logeado',true);
          console.log(datos);
          this.navCtrl.setRoot(TabsPage);
        }else{
          let toas = this.toasCtrl.create({message:"Usuario / Contraseña invalidos",duration:1500});
          toas.present();
        }
    });
  }

}
