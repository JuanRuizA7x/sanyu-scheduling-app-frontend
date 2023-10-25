import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { AssignWorkShiftComponent } from './components/assign-work-shift/assign-work-shift.component';
import { ExtendScheduleComponent } from './components/extend-schedule/extend-schedule.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';

@NgModule({
  declarations: [
    AssignWorkShiftComponent,
    ExtendScheduleComponent,
    UploadFileComponent,
    GenerateReportComponent
  ],
  imports: [
    AdministratorRoutingModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    RippleModule,
    TableModule,
    ToastModule
  ]
})
export class AdministratorModule { }
