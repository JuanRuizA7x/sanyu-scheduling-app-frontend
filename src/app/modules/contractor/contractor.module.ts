import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ContractorRoutingModule } from './contractor-routing.module';
import { NotifyWorkShiftComponent } from './components/notify-work-shift/notify-work-shift.component';



@NgModule({
  declarations: [
    NotifyWorkShiftComponent
  ],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    ContractorRoutingModule,
    FullCalendarModule,
    TagModule,
    ToastModule
  ]
})
export class ContractorModule { }
