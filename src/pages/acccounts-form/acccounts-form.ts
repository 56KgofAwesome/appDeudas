import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AcccountsFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acccounts-form',
  templateUrl: 'acccounts-form.html',
})
export class AcccountsFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }
  //Funcion para cerrar el modal
  closeModal(){
    this.view.dismiss();
  }
}
