import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcccountsFormPage } from './acccounts-form';

@NgModule({
  declarations: [
    AcccountsFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AcccountsFormPage),
  ],
})
export class AcccountsFormPageModule {}
