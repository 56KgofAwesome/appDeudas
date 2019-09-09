import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailsApiProvider } from '../../providers/details-api/details-api';
import {ApiTestProvider } from '../../providers/api-test/api-test';
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  detailID: any;
  succesToDetail: any;
  detailName: any;
  detailDate: any;
  detailTotal: any;
  detailsParticipants: any =[];
  arr: any =[];
  myDetailPay: any;
  myDetailDebt: any;
  myDetailName: any;
  myDetailID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public detAP: DetailsApiProvider,public aTP: ApiTestProvider) {
    this.showDetails();

  }
  //_-------------------------------------------------------------------------------
  //Mostrar los detalles de la compra
  showDetails(){
    this.detailID = this.navParams.get('data');
    this.detailName = this.navParams.get('name');
    this.detailDate = this.navParams.get('date');
    this.detailTotal = this.navParams.get('total');
    Promise.all([
      this.detAP.getDetails(this.detailID)
    ]).then(data=>{
      //console.log(data);
      this.arr = data[0];//Arreglo de arreglo con todos los participantes
      console.log(this.arr);
      this.myDetailPay = this.arr[0].d_pay;
      this.myDetailName = this.arr[0].d_partyName;
      this.myDetailID = this.arr[0].d_origin;
      this.myDetailDebt = this.arr[0].d_deudap;

    })

  }


}
