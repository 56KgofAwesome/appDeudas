import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
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
  //Variabes del formulario account
  conceptForm: any;
  totalAccountForm: any;
  participantsForm: any;
  succesToAddAccount: any;
  public selectContacts:any = [];

  constructor(public alertCtrl: AlertController,public apiTestProvider: ApiTestProvider,navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.selectContacts = this.apiTestProvider.contactsList;
    console.log(this.selectContacts);
  }

  //TEST FORM ACCOUNT
  newAccount(){
    this.succesToAddAccount = this.apiTestProvider.createAccount(this.conceptForm,this.totalAccountForm,this.participantsForm);
    Promise.all([
        this.succesToAddAccount
    ]).then(data=>{
      //console.log(data[0].status);
      var statusOkAddAccount =  data[0].status;
      console.log(statusOkAddAccount);
      if(statusOkAddAccount == '200'){
        this.successToAddAccountAlert();
      }else{
        this.failedToAddAccountAlert();
      }
    })
  }

  //Alerta de nueva compra exitosa
  successToAddAccountAlert() {
    let alert = this.alertCtrl.create({
      title: 'Éxito',
      subTitle: 'Cuenta creada con éxito',
    });
    alert.present();
  }
  //Alerta de fracaso al añadir cuenta exitosa
  failedToAddAccountAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error :() ',
      subTitle: 'No se pudo crear la cuenta',
    });
    alert.present();
  }
  //Funcion para cerrar el modal
  closeModal(){
    this.view.dismiss();
  }
}
