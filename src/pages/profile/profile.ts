import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { AccountsApiProvider } from '../../providers/accounts-api/accounts-api';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  myUserName: any;
  userContacts: any;
  successContactList: any;
  public globalUserBalance: any;
  succesToGetBalance: any;
  globalBalance: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTestProvider: ApiTestProvider,public accountsAPI: AccountsApiProvider) {
    this.myUserName = apiTestProvider.userName;
    this.showBalance();
  }
  //--------------------------------------------------------------------------------------------
  //Muestra el balance general del usuario
  showBalance(){
    Promise.all([
      this.succesToGetBalance = this.accountsAPI.getBalance()
    ]).then(data=>{
        this.globalBalance = this.accountsAPI.globalUserBalance;
        //console.log(this.globalBalance);
    })
  }
  //-----------------------------------------------------------------------------------------------
  //Pull to refresh
   doRefresh(refresher) {
    this.showBalance();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
