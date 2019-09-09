import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ContactsApiProvider } from '../../providers/contacts-api/contacts-api';
import { AccountsApiProvider } from '../../providers/accounts-api/accounts-api';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public chooseDestinatary:any = [];
  conceptPaymentForm: any;
  totalPaymentForm: any;
  destinataryForm: any;
  indBalance: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cAP: ContactsApiProvider,public accountsAP: AccountsApiProvider,public alertCtrl: AlertController,public view: ViewController) {
      this.chooseDestinatary = this.cAP.contactsList;
      this.indBalance = this.navParams.get('indBalance');
  }
  //------------------------------------------------------------------------------------------------------------------
  //Registrar nuevo abono
  sendFormPayment(){
    Promise.all([
      this.accountsAP.newPayment(this.destinataryForm,this.totalPaymentForm)
    ]).then(data=>{
        if(data[0] == 200){
          this.successToAddPaymentAlert();
          this.closeModal();
        }else{
          this.failedToAddPaymentAlert();
        }
    })
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

}
