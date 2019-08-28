import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  myUserName: any;
  userContacts: any;
  successContactList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTestProvider: ApiTestProvider) {

    this.myUserName = apiTestProvider.userName;
  }

}
