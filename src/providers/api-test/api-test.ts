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
  //
  statusAddAutAccount: any;
  statusManAccount: any;

  constructor(public httpClient: HttpClient,public http: Http) {

   }
  //-------------------------------------------------------------------------------------------------------------------
  //Balance Individual
  getIndividualBalance(contactID){
    return new Promise((resolve)=>{
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userBalanceShare'+'&d_origin='+contactID+'&d_destiny='+this.userId,this.options)
        .subscribe(data => {
            var indBalance = data.json();
            resolve(indBalance);
        });
  })
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
  createAutomaticAccount(addConceptForm,addTotalAccountForm,addParticipantsForm){
    return new Promise((resolve)=>{
      //Valida la división automática
      var participantsString = addParticipantsForm.toString();
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userPayment'+'&p_userid='+this.userId+'&p_name='+addConceptForm+'&p_pay='+addTotalAccountForm+'&p_type='+1+'&p_party='+participantsString,this.options)
        .subscribe(data => {
          var respuestaCreateAccount = data.json();
          this.statusAddAutAccount = respuestaCreateAccount.status;
          resolve(respuestaCreateAccount);
        });
      })
  }
  //----------------------------------------------------------------------------------------------------------------------
  //Función para crear cuenta maual
  createManualAccount(addConceptForm,addTotalAccountForm,addParticipantsForm,addMyPay,quantitysArray,p_depositTotal){
    return new Promise((resolve)=>{
      //Arrays to String
      var quantitysString = quantitysArray.toString();
      var participantsString = addParticipantsForm.toString();
      //----------------------------------------------------
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userPayment'+'&p_userid='+this.userId+'&p_name='+addConceptForm+'&p_pay='+addTotalAccountForm+'&p_type='+0+'&p_party='+participantsString+'&p_payuser='+addMyPay+'&p_depositTotal='+p_depositTotal+'&p_monto='+quantitysString,this.options)
        .subscribe(data => {
          var respuestaCreateManAccount = data.json();
          this.statusManAccount = respuestaCreateManAccount.status;
          resolve(respuestaCreateManAccount);
        });

    })
  }
}
