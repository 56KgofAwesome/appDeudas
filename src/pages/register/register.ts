import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ApiTestProvider } from '../../providers/api-test/api-test';
import { Http, Response, RequestOptions,Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

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

  username:  string = "";
  email: string = "";
  password: string = "";
  options: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController) {
    this.validateRegForm();
  }

  ionViewDidLoad() {

  }
  //Validar el formulario
  validateRegForm(){
    if(this.name == '' || this.password == '' || this.email ==''){
      return this.disabled=true;
    }else{
      return this.disabled=false;
    }
  }
  //Registrar a un nuevo usuario
  register() {
    /*console.log(this.name);
    console.log(this.email);
    console.log(this.password);*/
    var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
    this.options = new RequestOptions({ headers: headers });

    let body = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    //Enviamos la petición
    //post(url,body,headers)
    this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userRegister'+'&email='+this.email+'&password='+this.password+'&username='+this.username,this.options)
      .subscribe(data => {
        //Guardamos el status de la conexión y respuesta con los datos que enviamos
        var respuesta = data.json();
        console.log(respuesta.status);
        //Validamos que el status y la respuesta
        if(respuesta.status=='200'){
          console.log('Wohoo');
          this.successAlert();
          this.goToLogin();
        }else{
          //una alerta de que no existe el usuario
          console.log('Nope');
        }
      });
    }
  //Ir a la página de Login
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  //Función de alerta de éxito
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Éxito!',
      subTitle: 'Usuario creado con éxito'
    });
    alert.present();
  }
  //Función de alerta de error
  incorrectAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error :( ',
      subTitle: 'No se pudo crear su usuario',
      buttons: ['Intentar de nuevo']
    });
    alert.present();
  }

}
