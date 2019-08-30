import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';
import { ContactsPage } from '../contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-new-account',
  templateUrl: 'new-account.html',
})
export class NewAccountPage {
    //Variables
    conceptForm: any;
    totalAccountForm: any;
    participantsForm: any;
    myPay: any;
    payPart: any;
    //Formulario
    manualDivision: any;
    hidden: any;
    disabled: any;
    public chooseContacts:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController,public cAP: ContactsApiProvider) {
    this.chooseContacts = this.cAP.contactsList;
    this.automaticDivisionView();
    this.checkAmount();
  }
  //Validación de ajuste de cuentas
  checkAmount(){
    if(this.totalAccountForm >= 0){
      return this.disabled = false;
    }else{
      return this.disabled = true;
    }
  }
  //---------------------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------------------
  //Envío de información del formulario
  sendFormAccount(){
    console.log(this.conceptForm);
    console.log(this.totalAccountForm);
    console.log(this.participantsForm);
  }
  //---------------------------------------------------------------------------------------------------------
  //Control de formulario
  automaticDivisionView(){
    if(this.manualDivision==true){
      return this.hidden=true;
    }else{
      return this.hidden=false;
    }
  }
  //---------------------------------------------------------------------------------------------------------
  //Funcion para cerrar el modal
  closeModal(){
    this.view.dismiss();
  }
}
