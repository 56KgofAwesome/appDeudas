import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebtDetailsPage } from './debt-details';

@NgModule({
  declarations: [
    DebtDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DebtDetailsPage),
  ],
})
export class DebtDetailsPageModule {}
