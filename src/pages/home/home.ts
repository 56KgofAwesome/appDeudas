import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myUserName: any;
  successToListAcc: any;
  public allAccounts: [];

  constructor(public navCtrl: NavController, public apiTestProvider: ApiTestProvider) {
    this.show();
    //console.log(this.allAccounts);
  }
  show(){
    this.successToListAcc = this.apiTestProvider.getAccountsList();
    Promise.all([
      this.successToListAcc
    ]).then(data=>{
      this.allAccounts = this.apiTestProvider.accountsList;
      //console.log(this.allAccounts);
      //console.log(data[0]);
    })
  }

}
