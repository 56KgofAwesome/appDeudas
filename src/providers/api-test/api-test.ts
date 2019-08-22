import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';

@Injectable()
export class ApiTestProvider {
  url: 'http://www.immosystem.com.mx/immo_practicas/immoApp.php';
  //Variables para construir el Login
  username: string = "";
  password: string = "";
  response: any;
  options: any;
  userId: any;
  //Variables para construir el Añadir contacto
  statusAddNew: any;
  //Variables del form
  disabled: any;
  constructor(public httpClient: HttpClient,public http: Http) { }

  //Funcipón que valida conexió para loguearte
  validateUser(body){
    //La función validateUser espera una promesa
    return new Promise((resolve)=>{
      //Construimos los encabezados de la comunicación
      var headers = new Headers({"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",'Accept':'application/json'});
      this.options = new RequestOptions({ headers: headers });
      //Enviamos la petición
      //post(url,body,headers)
      //La variable 'a' va a recibir todo lo que ejecute el .post
      this.http.post('http://www.immosystem.com.mx/immo_practicas/immoApp.php',body,this.options)
        .subscribe(data => {
          //Guardamos el status de la conexión y respuesta con los datos que enviamos
          var respuesta = data.json();
          //la función resolve devuelve a la variable 'respuesta'
          resolve(respuesta);
            this.userId = respuesta.data.userid;
            console.log(this.userId);
        });

    })

    }
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
            //console.log(this.statusAddNew);//200

        });
  })
}
}
