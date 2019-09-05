import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndividualBalancePage } from './individual-balance';

@NgModule({
  declarations: [
    IndividualBalancePage,
  ],
  imports: [
    IonicPageModule.forChild(IndividualBalancePage),
  ],
})
export class IndividualBalancePageModule {}
