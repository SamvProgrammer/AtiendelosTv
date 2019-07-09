import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer ,AlertController,ToastController} from 'ionic-angular';
import { InventarioProvider } from '../../providers/inventario/inventario';
import { InventariosAddPage } from '../inventarios-add/inventarios-add';
import { LocalNotifications } from '@ionic-native/local-notifications';



@Component({
  selector: 'page-inventarios',
  templateUrl: 'inventarios.html',
})
export class InventariosPage {
  private arreglo: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private inventarioPrd: InventarioProvider,private alertaCtrl:AlertController,
  private toasCtrl:ToastController,private notificaciones:LocalNotifications) {
  }

  ionViewDidEnter() {
    this.inventarioPrd.gets().subscribe(datos => {
      this.arreglo = datos;
      
    });

    this.notificaciones.schedule({
      text: 'Solicitud de cancelación',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
   });
  }

  public agregar(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(InventariosAddPage, { boton: "Agregar" })
  }

  public actualizando(refresher): any {
    this.inventarioPrd.gets().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public actualizar(obj:any){
    this.navCtrl.push(InventariosAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
    let id = obj.id_inventario;
    let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
     this.inventarioPrd.eliminar(id).subscribe(resp => {
       this.inventarioPrd.gets().subscribe(res => {
         this.arreglo = res;
       });
       let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
       toas.present();
    });

    }},"Cancelar"]});
    

    alerta.present();

 }




}
