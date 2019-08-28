import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';
import { Http,RequestOptions,Headers } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  public requestList: any;
  successRequests: any;

  successContacts: any;
  requestContactList: any;
  notificationRequests: any;
  contactsList: any;

  acceptRequest: any;
  denialRequest: any;

  requestID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTestProvider: ApiTestProvider,public contactsAPI: ContactsApiProvider,public http: Http) {
    this.showRequests();
    this.showContactsList();
  }
  //Mostrar las solicitudes pendientes
  showRequests(){
    Promise.all([
      this.successRequests  = this.contactsAPI.getContactRequests()
    ]).then(data=>{
      this.requestList = this.contactsAPI.requestsListData;
      this.notificationRequests = this.requestList.length;//Cantidad de notificaciones
    })
  }
  //-----------------------------------------------------------------------------------
  //Mostrar todos los contactos
  showContactsList(){
    Promise.all([
      this.successContacts = this.contactsAPI.getContactsList()
    ]).then(data=>{
        this.contactsList = this.contactsAPI.contactsList;
    })

  }
  //-----------------------------------------------------------------------------------
  accept(requestID){
    var answerRequest = 1;
    Promise.all([
      this.acceptRequest = this.contactsAPI.sendRequestAnswer(answerRequest,requestID)
    ]).then(data=>{
      this.showRequests();
        this.showContactsList();
    })
  }
  reject(requestID){
    var answerRequest = 2;
    Promise.all([

    ]).then(data=>{

    })
  }


}
