import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';

@Injectable()
export class ApiTestProvider {
  url: 'http://www.immosystem.com.mx/immo_practicas/immoApp.php';
  //Variables para construir el Login
  username: any;
  password: any;
  response: any;
  options: any;
  userId: any;
  userName: any;
  userEmail: any;
  statusLogin: any;
  //Variables para construir el Añadir contacto
  statusAddNew: any;
  //Variables contactos
  contactsList: any;
  //Variables para listar
  accountsList: any;
  concept: any;
  total: any;
  participants: any;
  //Variables para crear cuenta
  newAccount: any
  participantsString: any;
  statusAddNewAccount: any;
  //Variables del form
  disabled: any;
  constructor(public httpClient: HttpClient,public http: Http) {

   }

  //Función que valida conexión para loguearte
  validateUser(body){
    //La función validateUser espera una promesa
    return new Promise((resolve)=>{
      //Construimos los encabezados de la comunicación
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      //Enviamos la petición
      //post(url,body,headers)
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php',body,this.options)
        .subscribe(data => {
          //Recibimos los datos en formato
          var respuestaLogin = data.json();
          //la función resolve devuelve a la variable 'respuestaLogin'
          this.statusLogin = respuestaLogin.status;
            if(this.statusLogin == 100){
              console.log('Respuesta de Login: '+this.statusLogin);
              resolve(respuestaLogin);
            }else{
              //console.log('Respuesta de Login: '+this.statusLogin);
              this.userId = respuestaLogin.data.userid;
              //console.log('User id: '+this.userId);
              this.userName = respuestaLogin.data.username;
              //console.log('Username: '+this.userName);
              this.userEmail = respuestaLogin.data.email;
              //console.log('Email: '+this.userEmail);
              resolve(respuestaLogin);
            }
        });

    })

    }
  //---------------------------------------------------------------------------------------------------------------------
  //Función que agrega a mi lista de contactos
  addContact(usernameToAdd){
    return new Promise((resolve)=>{
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=usernewContact'+'&c_userid='+this.userId+'&c_name='+usernameToAdd,this.options)
        .subscribe(data => {
          //Guardamos el status de la conexión y respuesta con los datos que enviamos
          var respuestaContacto = data.json();
          //console.log(respuestaContacto.status);//imprime 200 si se pudo agregar con éxito
          resolve(respuestaContacto);
            this.statusAddNew = respuestaContacto.status;
            console.log(this.statusAddNew);//200

        });
  })
}
  //---------------------------------------------------------------------------------------------------------------------
  //Funcion para crear compra con divisón automática
  /*createAccount(conceptForm,totalAccountForm,participantsForm){
    //Convertimos el array de participantes a String
    //this.participantsString = participantsForm.toString();
    return new Promise((resolve)=>{
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userPayment'+'&m_name='+conceptForm+'&m_pay='+totalAccountForm+'&m_party='+this.participantsString+'&m_userid='+this.userId,this.options)
        .subscribe(data => {
          //Guardamos el status de la conexión y respuesta con los datos que enviamos
          var newAccountResponse = data.json();
          console.log(newAccountResponse.status);
          resolve(newAccountResponse);

        });
  })
  }*/
}
