import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorRoutingModule } from './contractor-routing.module';
import { NotifyWorkShiftComponent } from './components/notify-work-shift/notify-work-shift.component';



@NgModule({
  declarations: [
    NotifyWorkShiftComponent
  ],
  imports: [
    CommonModule,
    ContractorRoutingModule
  ]
})
export class ContractorModule { }
