import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';
/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {

  private data:Observable<any>;
  private direccion = "";

  constructor(public http: HttpClient) {
    this.direccion = direcciones.productos;
  }

  public getProductos():Observable<any>{   
    this.data = this.http.get(this.direccion);
    return this.data;
   }
   public getProductosCategoria(id):Observable<any>{   
    this.data = this.http.get(this.direccion+"/categoria/"+id);
    return this.data;
   }

   public getCategoriaConListaproductos():Observable<any>{
       return this.http.get(this.direccion+"/lista/categorias");
   }

   public eliminar(id):Observable<any>{
    this.data = this.http.delete(this.direccion+"/"+id);
    return this.data;
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

   public insertarinsumos(obj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let json = JSON.stringify(obj);
    return this.http.post(this.direccion+"/insumos",json,httpOptions);

   }

   public obtenerinsumos(id):Observable<any>{
      let uri = this.direccion+"/insumos/"+id;
      return this.http.get(uri);
   }

}
