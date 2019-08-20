import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiTestProvider } from '../../providers/api-test/api-test';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {




  constructor(public navCtrl: NavController, public apiTestProvider: ApiTestProvider) {
  
  }


}
