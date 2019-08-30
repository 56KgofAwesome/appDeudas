import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,ViewController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { AccountsApiProvider } from '../../providers/accounts-api/accounts-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myUserName: any;
  successToListAcc: any;
  public allMyBuys: any;
  public allMyDebts: any;
  username: any;

  constructor(public navCtrl: NavController, public apiTestProvider: ApiTestProvider,public accountsAPI: AccountsApiProvider,public modal: ModalController,public view: ViewController,public navParams: NavParams) {
    this.username =  this.apiTestProvider.userName;
    this.showAccounts();
  }
  //-------------------------------------------------------------------------------------
  //Muestra todas las cuentas
  showAccounts(){
    Promise.all([
      this.successToListAcc = this.accountsAPI.getAccounts()
    ]).then(data=>{
        this.allMyBuys = this.accountsAPI.buysList;
        this.allMyDebts = this.accountsAPI.debtsList;
        /*
        console.log(this.allMyBuys);
        console.log(this.allMyDebts);*/
    })
  }
  //--------------------------------------------------------------------------------------
  //Formulario de crear cuenta
  addAccountForm(){
    const modalForm = this.modal.create('NewAccountPage');
    modalForm.present();
  }
}
