import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ApiTestProvider } from '../../providers/api-test/api-test';
//import { TabsPage } from '../tabs/tabs';
//Imports necesarios
import { Http } from '@angular/http';
//import { HttpClient } from '@angular/common/http';
//Libreria para las alertas
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "";
  password: string = "";
  disabled: any;
  response: any;
  options: any;
  success: any;
  constructor(public navCtrl: NavController,public navParams: NavParams, public apiTestProvider: ApiTestProvider,public http: Http,public alertCtrl: AlertController) {
    this.validateForm();
  }

  //Ir a la página de registro
  goToFormRegister(){
    this.navCtrl.push(RegisterPage);
  }
  //Función del botón de Login
  goToMain(){

    this.success = this.apiTestProvider.validateUser('m=userLogin'+'&username='+this.username+'&password='+this.password);
    //Va a esperar todas las promesas
    Promise.all([
      this.success
    ]).then(data=>{
        var statusOk =  data[0].status;
        console.log(statusOk);
        if (statusOk == '200') {
          this.navCtrl.push('TabsPage');
        }else{
          this.incorrectAlert();
        }
    })
  }
  //Alerta de usuario incorrecto
  incorrectAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error :( ',
      subTitle: 'Nombre de usuario o contraseña incorrectos',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  //Validamos el formulario del login
  validateForm(){
    if( this.username == '' || this.password == ''){
      return this.disabled = true;
    }else{
      return this.disabled = false;
    }
  }
}
