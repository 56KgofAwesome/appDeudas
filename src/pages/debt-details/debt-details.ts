import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailsApiProvider } from '../../providers/details-api/details-api';
import {ApiTestProvider } from '../../providers/api-test/api-test';

@IonicPage()
@Component({
  selector: 'page-debt-details',
  templateUrl: 'debt-details.html',
})
export class DebtDetailsPage {

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
    commentDetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public detAP: DetailsApiProvider,public aTP: ApiTestProvider) {
      this.showDetails();
  }
  //-------------------------------------------------------------------------------
  //Mostrar los detalles de la deuda
  showDetails(){
    this.detailID = this.navParams.get('data');
    this.detailName = this.navParams.get('name');
    this.detailDate = this.navParams.get('date');
    this.detailTotal = this.navParams.get('total');
    Promise.all([
      this.detAP.getDetails(this.detailID)
    ]).then(data=>{
      //Objeto convertido a Array
      var result = Object.keys(data[0][0]).map(function(key) {
        return [Number(key), data[0][0][key]];
      });
      this.arr = result[0][1];
        this.myDetailPay = this.arr[1].d_pay;
        this.myDetailName = this.arr[1].d_partyName;
        this.myDetailID = this.arr[1].d_origin;
        this.myDetailDebt = this.arr[1].d_deudap;
      this.commentDetail = result[1][1][0].p_comment;
    })

  }
}
