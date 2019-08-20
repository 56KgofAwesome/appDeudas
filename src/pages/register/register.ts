import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name:  string = "";
  email: string = "";
  password: string = "";



  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  }

  ionViewDidLoad() {

  }
  //Validar el formulario
  validateRegForm(){
    if(this.name == '' || this.password == '' || this.email ==''){
      return this.disabled=true;
    }else{
      return this.disabled==false;
    }
  }
  //Registrar a un nuevo usuario
  register() {
    console.log(this.name);
    console.log(this.email);
    console.log(this.password);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    /*this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php', JSON.stringify(body), {headers: headers})
      .subscribe(data => {
        console.log(data);
         alert("Usuario registrado");
      });*/
    }
  //Ir a la página de Login
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
