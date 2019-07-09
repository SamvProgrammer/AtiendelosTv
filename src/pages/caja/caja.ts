import { Component } from '@angular/core';
import { CajaCortePage } from '../caja-corte/caja-corte';
import { CajaMesaPage } from '../caja-mesa/caja-mesa';


/**
 * Generated class for the CajaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-caja',
  templateUrl: 'caja.html',
})
export class CajaPage {
  tab1Root=CajaMesaPage;
  tab2Root=CajaCortePage;


  constructor() {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CajaPage');
  }

}
