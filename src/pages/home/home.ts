import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,ViewController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { AccountsApiProvider } from '../../providers/accounts-api/accounts-api';
import { DetailsPage } from '../details/details';
import { DebtDetailsPage } from '../debt-details/debt-details';
import { PaymentDetailsPage } from '../payment-details/payment-details';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myUserName: any;
  successToListAcc: any;
  public allMyBuys: any;
  public allMyDebts: any;
  public allMyPayments: any;

  username: any;

  idDetail: any;
  contactsList: any;

  constructor(public navCtrl: NavController, public apiTestProvider: ApiTestProvider,public accountsAPI: AccountsApiProvider,public modal: ModalController,public view: ViewController,public navParams: NavParams,public cAP: ContactsApiProvider) {
    this.contactsList = this.cAP.getContactsList;
    this.username =  this.apiTestProvider.userName;
    this.showAccounts();
    this.cAP.getContactsList();
  }
  //-------------------------------------------------------------------------------------
  //Muestra todas las cuentas
  showAccounts(){
    Promise.all([
      this.successToListAcc = this.accountsAPI.getAccounts()
    ]).then(data=>{
        this.allMyBuys = this.accountsAPI.buysList;
        this.allMyDebts = this.accountsAPI.debtsList;
        this.allMyPayments = this.accountsAPI.paymentsList;
    })
  }
  //--------------------------------------------------------------------------------------
  //Formulario de crear cuenta
  addAccountForm(){
    const modalForm = this.modal.create('NewAccountPage');
    modalForm.present();
  }
  //---------------------------------------------------------------------------------------
  viewDetails(detailID,detailName,detailDate,detailTotal){
    this.navCtrl.push(DetailsPage, {
      data: detailID,
      name: detailName,
      date: detailDate,
      total: detailTotal
    })
  }
  //---------------------------------------------------------------------------------------
  viewDebtDetails(detailID,detailName,detailDate,detailTotal){
    this.navCtrl.push(DebtDetailsPage, {
      data: detailID,
      name: detailName,
      date: detailDate,
      total: detailTotal
    })
  }
  //---------------------------------------------------------------------------------------
  viewPaymentDetails(detailID,detailName,detailDate,detailTotal){
    this.navCtrl.push(PaymentDetailsPage, {
      data: detailID,
      name: detailName,
      date: detailDate,
      total: detailTotal
    })
  }
  //----------------------------------------------------------------------------------------------
  //Formulario de crear cuenta
  addPaymentForm(){
    const modalForm = this.modal.create('PaymentPage');
    modalForm.present();
  }
  //-----------------------------------------------------------------------------------------------
  //Pull to refresh
   doRefresh(refresher) {
    this.showAccounts();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }




}
