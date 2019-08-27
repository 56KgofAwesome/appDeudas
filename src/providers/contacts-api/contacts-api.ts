import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { ApiTestProvider } from '../api-test/api-test';

@Injectable()
export class ContactsApiProvider {
  //getContactRequest
  options:any;
  requestsListData: any;
  requestList: any[];
  constructor(public httpClient: HttpClient,public http: Http,public aTP: ApiTestProvider ) {
    this.requestList = this.requestsListData;
    console.log(this.requestList);
  }
  //Obtener la lista de contactos del usuario
  getContactsList(){
  }
  //Obtener las solicitudes de contacto
  getContactRequests(){
    return new Promise((resolve)=>{
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=get_userRequest'+'&c_userid='+this.aTP.userId,this.options)
        .subscribe(data => {
          var respuestaRequest = data.json();
          resolve(respuestaRequest);
          this.requestsListData = respuestaRequest[0].pendientes;
          //console.log(this.requestsListData[0].pendientes);//Lista de Solitudes pendientes por aceptar
        });
      })
  }
  //Enviar solicitud de contacto
  sendContactRequest(){

  }
}
