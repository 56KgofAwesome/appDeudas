import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';

@Injectable()
export class ApiTestProvider {
  username: string = "";
  password: string = "";
  disabled: any;
  response: any;
  options: any;
  url: 'http://www.immosystem.com.mx/immo_practicas/immoApp.php';

  constructor(public httpClient: HttpClient,public http: Http) { }
  validateUser(body){
    //Construimos los encabezados de la comunicación
    var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
    this.options = new RequestOptions({ headers: headers });
    //Enviamos la petición
    //post(url,body,headers)
    this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php',body,this.options)
      .subscribe(data => {
        //Guardamos el status de la conexión y respuesta con los datos que enviamos
        var respuesta = data.json();
        console.log(respuesta.status);
      });
    }
}
