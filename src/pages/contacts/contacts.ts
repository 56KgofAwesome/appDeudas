import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';
import { Http,RequestOptions,Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  public requestList: any;
  successRequests: any;

  public selectedSegment = 'contactos';//Para mostrar por defecto los contactos

  successContacts: any;
  requestContactList: any;
  notificationRequests: any;
  contactsList: any;

  acceptRequest: any;
  denialRequest: any;

  requestID: any;
  usernameToAdd: any;
  successToSend: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTestProvider: ApiTestProvider,public contactsAPI: ContactsApiProvider,public http: Http,public alertCtrl: AlertController) {
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
  //-------------------------------------------------------------------------------------------------
  //Mostrar todos los contactos
  showContactsList(){
    Promise.all([
      this.successContacts = this.contactsAPI.getContactsList()
    ]).then(data=>{
        this.contactsList = this.contactsAPI.contactsList;
    })

  }
  //--------------------------------------------------------------------------------------------------
  //Confirmación de solicitud de amistad
  accept(requestID){
    var answerRequest = 1;
    Promise.all([
      this.acceptRequest = this.contactsAPI.sendRequestAnswer(answerRequest,requestID)
    ]).then(data=>{
          if(this.contactsAPI.statusRequest == '200'){
            this.showRequests();
            this.showContactsList();
          }else{
            this.errorAlert();
          }
    })
  }
  //--------------------------------------------------------------------------------------------------
  //Rechazo de solicitud de amistad
  reject(requestID){
    var answerRequest = 0;
    Promise.all([
      this.acceptRequest = this.contactsAPI.sendRequestAnswer(answerRequest,requestID)
    ]).then(data=>{
      if(this.contactsAPI.statusRequest == '200'){
        this.showRequests();
        this.showContactsList();
      }else{
        this.errorAlert();
      }
    })
  }
  //-------------------------------------------------------------------------------------------------
  //Formulario para agregar usuario
  addContactForm() {
    let alert = this.alertCtrl.create({
      title: 'Añadir Contacto',
      inputs: [
        {
          name: 'contactUsername',
          placeholder: 'Nombre de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Añadir contacto',
          handler: data => {
            var inputAddContactForm = data.contactUsername;
            this.sendContactRequestData(inputAddContactForm);
          }
        }
      ]
    });
    alert.present();
  }
  //-------------------------------------------------------------------------------------------------
  //Envío de solicitud de contacto
  sendContactRequestData(inputAddContactForm){
    this.successToSend = this.contactsAPI.sendContactRequest(inputAddContactForm);
    Promise.all([
      this.successToSend
    ]).then(data=>{
        var statusRequest =data[0].data;
      if(statusRequest == '200'){
        this.successToAddAlert();
      }else{
        this.failedToAddAlert();
      }
    })
  }
  //---------------------------------------------------------------------------------------------------
  //Alerta de añadir contacto fallida
  failedToAddAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error :( ',
      subTitle: 'No se pudo agregar al usuario'
    });
    alert.present();
  }
  //---------------------------------------------------------------------------------------------------
  //Alerta de añadir contacto exitosa
  successToAddAlert() {
    let alert = this.alertCtrl.create({
      title: 'Éxito',
      subTitle: 'Solicitud enviada con éxito',
    });
    alert.present();
  }
  //--------------------------------------------------------------------------------------------------------
  //Alerta de Error
  errorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Ha ocurrido un error :( '
    });
    alert.present();
  }
}
