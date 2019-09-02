import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';
//import { ContactsPage } from '../contacts/contacts';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { AlertController } from 'ionic-angular';

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
    payPart: any = [];
    //Formulario
    manualDivision: any;
    hidden: any;
    disabled: any;
    public chooseContacts:any = [];
    //Variables de la API
    addConceptForm: any;
    addParticipantsForm: any;
    addTotalAccountForm: any;
    addDivisionType: any;
    successAutAccount: any;
    //
    //test: [{ 'id':string,'cantidad': number }];
    test: any = [];
    finalfinal: any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController,public cAP: ContactsApiProvider,public aTP: ApiTestProvider,public alertCtrl: AlertController) {
    this.chooseContacts = this.cAP.contactsList;
    this.automaticDivisionView();
    this.checkAmount();
  }
  //---------------------------------------------------------------------------------------------------------
  //Estas dos funciones llenas de magia hacen lo chido
  updateOption(id){
    var $this = this;
    id.forEach(function(key,index){
      if(id.length > Object.keys($this.test).length ){
        $this.test[key] = {id:key,cantidad:0};
      }
      if(id.length < Object.keys($this.test).length ){
          for (var prop in $this.test) {
            if(id.find(element => element == prop)){
            }else{
              delete $this.test[prop];
            }
          }
      }
    });
    //Objeto convertirlo a arreglo con las cantidades que dio cada quién
    this.finalfinal = Object.keys(this.test).map(function(key) {
      return $this.test[key];
    });
    console.log(this.finalfinal);
  }
  llenado(id,valor){
    this.test[id].cantidad = valor;
  }
  //---------------------------------------------------------------------------------------------------------
  //Envío de información del formulario
  sendFormAccount(){
    //Variables enviadas a la solicitud
    this.addDivisionType = this.manualDivision;
    this.addConceptForm = this.conceptForm;
    this.addTotalAccountForm = this.totalAccountForm;
    this.addParticipantsForm = this.participantsForm;
    //------------------------------------------------------------------------------------------------------------------------
    //Agregar cuenta con divisió automática
    if(this.addDivisionType == true){
      Promise.all([
        //Ejecuta la función de agregar la cuenta
        this.successAutAccount = this.aTP.createAutomaticAccount(this.addConceptForm,this.addTotalAccountForm,this.addParticipantsForm,this.addDivisionType)
      ]).then(data=>{
        if(this.aTP.statusAddAutAccount == 200){
          this.successToAddAlert();
          this.closeModal();
        }else{
          this.failedToAddAlert();
        }
      })
      return this.addParticipantsForm,this.addConceptForm,this.addConceptForm,this.addDivisionType;
    }else{
    //--------------------------------------------------------------------------------------------------------------------------
    //Agregar cuenta con división manual


    }
  }
  //Obtener cantidades
  getQuantity(){
    console.log(this.finalfinal);
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
  //------------------------------------------------------------------------------------------------------------
  //Alerta de añadir contacto fallida
  failedToAddAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error :( ',
      subTitle: 'No se pudo crear la cuenta'
    });
    alert.present();
  }
  //---------------------------------------------------------------------------------------------------
  //Alerta de añadir contacto exitosa
  successToAddAlert() {
    let alert = this.alertCtrl.create({
      title: 'Éxito',
      subTitle: 'Cuenta creada con éxito',
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
