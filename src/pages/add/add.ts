import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AcccountsFormPage } from '../acccounts-form/acccounts-form';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  constructor(public view: ViewController, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public modal: ModalController) {
  }
  //Pop up cn el formulario de agregar un usuario
  addContactForm() {
  let alert = this.alertCtrl.create({
    title: 'Añadir Contacto',
    inputs: [
      {
        name: 'username',
        placeholder: 'Nombre de usuario'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {}
      },
      {
        text: 'Añadir contacto',
        handler: data => {
          /*if (User.isValid(data.username, data.password)) {
            // logged in!
          } else {
            // invalid login
            return false;
          }*/
        }
      }
    ]
  });
  alert.present();
}
  //Modal que abre formulario de crear cuenta
  addAccountForm(){
    const modalForm = this.modal.create('AcccountsFormPage');
    modalForm.present();
  }

}
