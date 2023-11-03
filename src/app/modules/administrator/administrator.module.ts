import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { NgxSpinnerModule } from 'ngx-spinner';
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
    FileUploadModule,
    FormsModule,
    FullCalendarModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    NgxSpinnerModule,
    RippleModule,
    TableModule,
    ToastModule
  ]
})
export class AdministratorModule { }
