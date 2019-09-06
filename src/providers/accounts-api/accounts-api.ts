import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { ApiTestProvider } from '../api-test/api-test';

@Injectable()
export class AccountsApiProvider {
  options: any;
  public accountsList: any;
  public buysList: any;
  public debtsList: any;
  public paymentsList: any;
  public globalUserBalance: any;
  constructor(public httpC: HttpClient, public aTP: ApiTestProvider,public http: Http) {

  }
  //---------------------------------------------------------------------------------------
  //Obtener todas las compras
  getAccounts(){
    return new Promise((resolve)=>{
        var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept': 'application/json'});
        this.options = new RequestOptions({headers: headers});
        this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userMovement'+'&p_userid='+this.aTP.userId+'&p_party='+this.aTP.userId,this.options)
        .subscribe(data=>{
          var respuestaAccountList = data.json();
          if(respuestaAccountList.status == 200){
            this.accountsList = respuestaAccountList[0];//Todos los moviemientos en los que participo
            this.buysList = respuestaAccountList[0].Compras;//Todas las compras que haya registrado
            this.debtsList = respuestaAccountList[0].Deudas;//Todas las cuentas en las que deba
            this.paymentsList = respuestaAccountList[0].Abonos;//Todas las cuentas en las que deba
            resolve(respuestaAccountList);
          }else{
            console.log('No debería mostrar nada');
          }

        })
    })
  }
  //----------------------------------------------------------------------------------------
  //Obtener el balance general del usuario
  getBalance(){
    return new Promise((resolve)=>{
        var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept': 'application/json'});
        this.options = new RequestOptions({headers: headers});
        this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userBalance'+'&d_userid='+this.aTP.userId,this.options)
        .subscribe(data=>{
          var respuestaGetBalance = data.json();
          this.globalUserBalance = respuestaGetBalance.data;
          resolve(respuestaGetBalance);
        })
    })
  }
  //-----------------------------------------------------------------------------------------
  //Nuevo Abono
  newPayment(destinataryID,paymentQuantity){
    return new Promise((resolve)=>{
        var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept': 'application/json'});
        this.options = new RequestOptions({headers: headers});
        this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userDeposit'+'&d_origin='+this.aTP.userId+'&d_destiny='+destinataryID+'&d_pay='+paymentQuantity,this.options)
        .subscribe(data=>{
          var respuestaPayment = data.status;
          resolve(respuestaPayment);
        })
    })
  }
}
