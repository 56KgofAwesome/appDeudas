import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';
//import { HomePage } from '../home/home';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { AlertController } from 'ionic-angular';
import { AccountsApiProvider } from '../../providers/accounts-api/accounts-api';

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
    addMyPay: any;
    successAutAccount: any;
    succesManAccount: any;
    //
    //test: [{ 'id':string,'cantidad': number }];
    test: any = [];
    finalfinal: any =[];
    //
    quantitysArray: any =[];
    arrSum: any;
    totalSumForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController,public cAP: ContactsApiProvider,public aTP: ApiTestProvider,public alertCtrl: AlertController,public accountsAPI: AccountsApiProvider) {
    this.chooseContacts = this.cAP.contactsList;
    this.manualDivision = false;
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
    this.addTotalAccountForm = parseInt(this.totalAccountForm,10);
    this.addParticipantsForm = this.participantsForm;
    this.addMyPay = parseInt(this.myPay,10);
    /*//------------------------------------------------------------------------------------------------------------------------
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
    }else{
    //--------------------------------------------------------------------------------------------------------------------------
    //Agregar cuenta con división manual
    //Guardamos en un arrar las cantidades individuales para sumarlas
      var $this = this;
      this.finalfinal.forEach(function(element){
        //Arreglo con las cantidades
        $this.quantitysArray.push(parseInt(element.cantidad,10));
      })
        //Suma de cada una de las cantidades
        this.arrSum = $this.quantitysArray.reduce(suma);
        this.totalSumForm = (this.arrSum + this.addMyPay);
        //Validación de cuentas correctas
        if(this.totalSumForm == this.totalAccountForm){
            Promise.all([
              this.succesManAccount = this.aTP.createManualAccount(this.addConceptForm,this.addTotalAccountForm,this.addParticipantsForm,this.addMyPay,this.quantitysArray,this.arrSum)
            ]).then(data=>{
                if(this.aTP.statusManAccount == 200){
                  this.successToAddAlert();
                  this.closeModal();
                }else{
                  this.failedToAddAlert();
                }
            })
        }else{
          this.failedToAddAlert();
          this.closeModal();
        }
      }
      //Función que suma los valores
      function suma(total,num){
            return total + num;
          }*/
    if( this.addDivisionType === false){
        Promise.all([
            this.aTP.createAutomaticAccount(this.addConceptForm,this.addTotalAccountForm,this.addParticipantsForm)
        ]).then(data=>{
          if(this.aTP.statusAddAutAccount == 200){
            this.successToAddAlert();
            this.closeModal();
          }else{
            this.failedToAddAlert();
          }
        })
      //var splitAmount = this.addTotalAccountForm / parseInt(this.addParticipantsForm.length + 1);
        /*this.finalfinal.forEach(function(i){
          i.cantidad = splitAmount;
        })
        console.log(this.finalfinal);*/
    }else{
      console.log('aqui va la de pagos');
      console.log(this.addConceptForm );
      console.log(this.addTotalAccountForm);
      console.log(this.addParticipantsForm);
      console.log(this.addDivisionType);
      console.log(this.addMyPay);

      var splitAmount = this.addTotalAccountForm / parseInt(this.addParticipantsForm.length + 1);

      this.finalfinal.forEach(function(i){
        i.cantidad = splitAmount;
      })
      console.log(this.finalfinal);


    }








  }
  //------------------------------------------------------------------------------------------------------------
  //Obtener cantidades
  getQuantity(){
    console.log(this.finalfinal);
  }
  //-----------------------------------------------------------------------------------------------------------
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
      return this.hidden=false;
    }else{
      return this.hidden=true;
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
