import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  requestList: any;
  success: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTestProvider: ApiTestProvider,public contactsAPI: ContactsApiProvider) {
    this.wtf();
  }
  wtf(){
    Promise.all([
      this.success  = this.contactsAPI.getContactRequests()
    ]).then(data=>{
      this.requestList = this.contactsAPI.requestsListData;
    })
  }
}
