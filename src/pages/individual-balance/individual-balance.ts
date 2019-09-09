import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { AlertController } from 'ionic-angular';
import { AccountsApiProvider } from '../../providers/accounts-api/accounts-api';

@IonicPage()
@Component({
  selector: 'page-individual-balance',
  templateUrl: 'individual-balance.html',
})
export class IndividualBalancePage {
  idContact: any;
  nameContact: any;

  individualBalance: any;
  arr: any = [];

  balance: any;
  paymentQuantity: any;

  disabled: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public aTP: ApiTestProvider,public modal: ModalController,public alertCtrl: AlertController,public accountsAP: AccountsApiProvider,public view: ViewController) {
    this.checkBalance();
    this.getIndividualBalance();
  }
  //--------------------------------------------------------------------------------------------
  //Botón para abonar
  payment(){
    this.idContact = this.navParams.get('idContact');
    this.individualBalance = this.arr.data;
    var newBalance = parseInt(this.paymentQuantity) + this.individualBalance;
    if(newBalance > 0){
      this.incorrectAlert();
    }else{
      Promise.all([
        this.accountsAP.newPayment(this.idContact,this.paymentQuantity)
      ]).then(data=>{
          if(data[0] == 200){
            this.successToAddPaymentAlert();
            this.closeModal();
          }else{
            this.failedToAddPaymentAlert();
          }
      })
    }
  }
  //-------------------------------------------------------------------------------------------
  //Obtener balance con usuario específico
  getIndividualBalance(){
    this.idContact = this.navParams.get('idContact');
    this.nameContact = this.navParams.get('nameContact');
      Promise.all([
        this.aTP.getIndividualBalance(this.idContact)
      ]).then(data=>{
        console.log(data);
        this.arr = data[0]
        this.individualBalance =this.arr.data;
      })
  }
  //-------------------------------------------------------------------------------------------
  //Mostrar el estado de la deuda
  checkBalance(){
    if(this.individualBalance >= 0){
      return this.disabled = true;
    }else{
      return this.disabled = false;
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  //Alerta de nueva compra exitosa
  successToAddPaymentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Éxito',
      subTitle: 'Abono registrado con éxito',
    });
    alert.present();
  }
  //----------------------------------------------------------------------------------------------------------------------
  //Alerta de fracaso al añadir cuenta exitosa
  failedToAddPaymentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error :( ',
      subTitle: 'No se pudo registrar el abono',
    });
    alert.present();
  }
  //-------------------------------------------------------------------------------------------------------------------
  //Funcion para cerrar el modal
  closeModal(){
    this.view.dismiss();
  }
  //----------------------------------------------------------------------------------------------------------
  //Alerta de usuario incorrecto
  incorrectAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atención!',
      subTitle: 'No puedes abonar mas de lo que debes',
      buttons: ['Reintentar']
    });
    alert.present();
  }
}
