import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  successAccountsList: any;



  constructor(public navCtrl: NavController, public apiTestProvider: ApiTestProvider) {

  }
  showAccountsList(){
    Promise.all([
      this.successAccountsList
    ]).then(data=>{
        var statusOk =  data[0].status;
        //var userId =  data[0].data.userid;
        console.log(statusOk);
    })
  }

}
