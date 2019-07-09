import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasProvider } from '../../providers/categorias/categorias';



/**
 * Generated class for the ProductosCategoriaAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-productos-categoria-add',
  templateUrl: 'productos-categoria-add.html',
})
export class ProductosCategoriaAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  public arregloRoles: any = [];
  public arregloCarrito: any = [];
  private variable;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl:ToastController,
    private productoscategoriasPrd:CategoriasProvider
  ) {
    this.variable = this.parametros.get("parametro");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id;
      this.myForm = this.createMyForm(this.variable);
    }
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      descripcion: [obj.descripcion, Validators.required]
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let nombre = obj.nombre;
    let descripcion = obj.descripcion;

    obj = {
      nombre: nombre,
      descripcion: descripcion
    }
    
    if (this.boton == "Actualizar") {
      obj.id = this.variable.id;      
        this.productoscategoriasPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        },err => {
          console.log(JSON.stringify(err));
        });
    } else {
       this.productoscategoriasPrd.insertar(obj).subscribe(datos => {
        
         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       },err => {
        console.log(JSON.stringify(err));
      });
    }

    this.navCtrl.pop();
  }
}
