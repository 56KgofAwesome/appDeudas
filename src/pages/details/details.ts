import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,RequestOptions,Headers } from '@angular/http';
import { DetailsApiProvider } from '../../providers/details-api/details-api';
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
  detailsParticipants: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public detAP: DetailsApiProvider) {
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
        this.succesToDetail = this.detAP.getDetails(this.detailID)
    ]).then(data=>{
      console.log(data);
      data.forEach(function(element){
        console.log(element);
      })
    })

  }

}
