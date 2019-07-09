import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { CategoriasProvider } from '../../providers/categorias/categorias';


/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  private direccion = "";
  private obj;


  constructor(public http: HttpClient,private storage: Storage,private cargandoCtrl:LoadingController,
  private productosPrd:ProductosProvider,private categoriasPrd:CategoriasProvider) {
    this.direccion = direcciones.usuarios;
  }

  public gets():Observable<any>{    
   return this.http.get(this.direccion);;
  }

  public eliminar(id):Observable<any>{
   return this.http.delete(this.direccion+"/"+id);;
  }

  public insertar(obj):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.post(this.direccion,json,httpOptions);
  }

  public modificar(obj):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.put(this.direccion,json,httpOptions);
  }

  public ingresarSistema(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = this.direccion + "/login";
    let json = JSON.stringify(obj);
    return this.http.post(url, json, httpOptions);
  }

  public guardarUsuario(obj) {
    this.obj = obj;

    this.productosPrd.getCategoriaConListaproductos().subscribe(listadoproductos => {
      this.categoriasPrd.gets().subscribe(categorias=>{
         let objetoGuardar = {
           categorias:categorias,
           listaproductos:listadoproductos
         };

         this.storage.set("listaproductosdetallemesa",objetoGuardar);
      });
    });
  }

  public getUsuario() {
    console.log("obteniendo usuario");
    console.log(this.obj);
    return this.obj;
  }

  public getSucursal(){
    return this.obj.id_sucursal;
  }

  public getIdUsuario(){
    return this.obj.id;
  }

  public activarMenu(): boolean {
    return this.obj.menu;
  }

  public activarBar(): boolean {
    return this.obj.bar;
  }
  public activarCocina(): boolean {
    return this.obj.cocina;
  }
  public activarAmbos(): boolean {
    return true;
  }


}
