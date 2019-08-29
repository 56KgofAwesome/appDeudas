import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { AccountsApiProvider } from '../../providers/accounts-api/accounts-api';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myUserName: any;
  successToListAcc: any;
  public allAccounts: any;

  constructor(public navCtrl: NavController, public apiTestProvider: ApiTestProvider,public accountsAPI: AccountsApiProvider) {
    this.accountsAPI.getAccounts();
  }
  //-------------------------------------------------------------------------------------
  

}
