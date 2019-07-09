import { Component } from '@angular/core';

import { BarPage } from '../bar/bar';
import { CocinaPage } from '../cocina/cocina';
import { MenuPage } from '../menu/menu';
import { TransaccionesdiaPage } from '../transaccionesdia/transaccionesdia';
import { CuentasPage } from '../cuentas/cuentas';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import {AmbosPage} from '../ambos/ambos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab2Root = BarPage;
  tab3Root = CocinaPage;
  tab4Root = AmbosPage;



  constructor(private usuariosPrd:UsuariosProvider) {

  }

  public bar():boolean{
    return this.usuariosPrd.activarBar() == true;
  }
 
  public cocina():boolean{
    return this.usuariosPrd.activarCocina() == true;
  }

  public ambos():boolean{
    return this.usuariosPrd.activarAmbos() == true;
  }
 
  
}
