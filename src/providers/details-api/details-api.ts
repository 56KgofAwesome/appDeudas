import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
@Injectable()
export class DetailsApiProvider {


  detailID: any;
  options: any;
  detailsData: any;

  constructor(public httpC: HttpClient,public http: Http) {

  }
  //---------------------------------------------------------------------------------
  //Obtener los detalles de la compra
  getDetails(detailID){
    return new Promise((resolve)=>{
      var headers = new Headers({'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php','m=userDetail'+'&d_paymentid='+detailID,this.options)
        .subscribe(data => {
          var respuestaDetails = data.json();
          this.detailsData = respuestaDetails.data;
          resolve(this.detailsData);//Regresa data, no todo el json, duh
        });
      })
  }


}
