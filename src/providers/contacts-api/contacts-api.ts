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
  contactsList: any;
  constructor(public httpClient: HttpClient,public http: Http,public aTP: ApiTestProvider ) {
  }
  //Obtener la lista de contactos del usuario
  getContactsList(){
    return new Promise((resolve)=>{
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userContact'+'&c_userid='+this.aTP.userId,this.options)
        .subscribe(data => {
          var respuestaContactList = data.json();
          this.contactsList = respuestaContactList.data;
          resolve(respuestaContactList);
          //console.log(this.contactsList);//Imprime la lista de contactos
        });
      })
    }
  //---------------------------------------------------------------------------------------------------
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
          //console.log(this.requestsListData);//Imprime lista de solicitudes
        });
      })
  }
  //---------------------------------------------------------------------------------------------------
  //Enviar solicitud de contacto
  sendContactRequest(){
  }
  //-----------------------------------------------------------------------------------------------------
  //Enviar respuesta de solicitud
  sendRequestAnswer(answerRequest,requestID){
    return new Promise((resolve)=>{
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userAnswer'+'&c_id='+requestID+'&c_answer='+answerRequest,this.options)
        .subscribe(data => {
        resolve();
        });
    })
  }
  //-----------------------------------------------------------------------------------------------------
}
