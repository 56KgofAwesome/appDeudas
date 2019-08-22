import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { ProfilePage } from '../profile/profile';
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

  public selectContacts:any = [];

  constructor(public apiTestProvider: ApiTestProvider,  navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.selectContacts = this.apiTestProvider.contactsList.data;
    console.log(this.selectContacts);
  }
  //Funcion para cerrar el modal
  closeModal(){
    this.view.dismiss();
  }
}
