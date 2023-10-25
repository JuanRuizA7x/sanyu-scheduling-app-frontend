import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
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
    CalendarModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule
  ]
})
export class AdministratorModule { }
