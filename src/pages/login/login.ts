import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ApiTestProvider } from '../../providers/api-test/api-test';
//Imports necesarios
import { Http, Response, RequestOptions,Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
//Libreria para las alertas
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mail: string = "";
  password: string = "";
  disabled: any;
  response: any;
  options: any;
  constructor(public navCtrl: NavController,public navParams: NavParams, public apiTestProvider: ApiTestProvider,public http: Http,public alertCtrl: AlertController) {
    this.validateForm();
  }

  //Función para conectar con el servidor al momento de hacer login
  validateUser(){
    //Construimos los encabezados de la comunicación
    var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
    this.options = new RequestOptions({ headers: headers });
    //Construimos el body del mensaje
    let body = {
      mail: this.mail,
      password: this.password
    };
    //Enviamos la petición
    //post(url,body,headers)
    this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userLogin'+'&username='+this.mail+'&password='+this.password,this.options)
      .subscribe(data => {
        //Guardamos el status de la conexión y respuesta con los datos que enviamos
        var respuesta = data.json();
        console.log(respuesta.status);
        //Validamos que el status y la respuesta
        if(respuesta.status=='200'){
          this.goToHome();
        }else{
          //una alerta de que no existe el usuario
          this.incorrectAlert();
        }
      });
    }
  //Función que manda al Home si todo se validó bien
  goToHome(){
    this.navCtrl.push(HomePage);
  };
  //Ir a la página de registro
  goToFormRegister(){
    this.navCtrl.push(RegisterPage);
  }
  //Función del botón de Login
  goToMain(){
    this.validateUser();
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
    if( this.mail == '' || this.password == ''){
      return this.disabled = true;
    }else{
      return this.disabled = false;
    }
  }

}
