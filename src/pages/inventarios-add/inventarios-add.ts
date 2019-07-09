import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController,FabContainer } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioProvider } from '../../providers/inventario/inventario';



/**
 * Generated class for the InventariosAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-inventarios-add',
  templateUrl: 'inventarios-add.html',
})
export class InventariosAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  private variable;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private inventarioPrd: InventarioProvider,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl:ToastController
  ) {
    this.variable = this.parametros.get("parametro");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id_inventario;
      this.myForm = this.createMyForm(this.variable);
    }
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      descripcion: [obj.descripcion, Validators.required],
      cantidad: [obj.cantidad, Validators.required],
      unidad: [obj.unidad_medida, Validators.required]
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let descripcion = obj.descripcion;
    let cantidad = obj.cantidad;
    let unidad_medida = obj.unidad;



    obj = {
      descripcion:descripcion,
      cantidad:cantidad,
      unidad_medida:unidad_medida
    }
    
    if (this.boton == "Actualizar") {
      obj.id_inventario = this.variable.id_inventario;      
        this.inventarioPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.inventarioPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }


}
