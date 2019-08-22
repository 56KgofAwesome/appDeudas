import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
//import { AcccountsFormPage } from '../acccounts-form/acccounts-form';

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

  addContactStatus: any;
  contactUsername: any;
  succesToAdd: any;
  constructor(public apiTestProvider: ApiTestProvider,public view: ViewController, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public modal: ModalController) {
  }


  //Agrega el contacto
  addToContactList(usernameToAdd){
    //console.log(usernameToAdd);//Imprime lo que se ingresó en el input
    this.succesToAdd = this.apiTestProvider.addContact(usernameToAdd);
    Promise.all([
        this.succesToAdd
    ]).then(data=>{
      var statusOkAdd =  data[0].status;
      console.log(statusOkAdd);
      if(statusOkAdd == '200'){
        this.successToAddAlert();
      }else{
        this.failedToAddAlert();
      }
    })
  }
  //Alerta de añadir contacto fallida
  failedToAddAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error :( ',
      subTitle: 'No se pudo agregar al usuario'
    });
    alert.present();
  }
  //Alerta de añadir contacto exitosa
  successToAddAlert() {
    let alert = this.alertCtrl.create({
      title: 'Éxito',
      subTitle: 'Contacto Añadido con éxito',
    });
    alert.present();
  }
  //Modal que abre formulario de crear cuenta
  addAccountForm(){
    const modalForm = this.modal.create('AcccountsFormPage');
    modalForm.present();
  }
  //Pop up con el formulario de agregar un contacto
  addContactForm() {
  let alert = this.alertCtrl.create({
    title: 'Añadir Contacto',
    inputs: [
      {
        name: 'contactUsername',
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
          //en contactInput guardamos lo que se ponga en el input
          var contactInput = data.contactUsername;
          //La variable local contactUsername será igualada al valor del input
          this.contactUsername = contactInput;
          //Ejecuta el guardar el usuario en su lista de contactos
          this.addToContactList(this.contactUsername)
        }
      }
    ]
  });
  alert.present();
}

}
